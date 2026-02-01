const assert = require('assert');
const zlib = require('zlib');
const { emfToSvg } = require('../js/parsers/pptx/emf-to-svg');

// Minimal CRC32 for PNG chunks
const crcTable = (() => {
    const t = new Uint32Array(256);
    for (let i = 0; i < 256; i++) {
        let c = i;
        for (let k = 0; k < 8; k++) {
            c = (c & 1) ? (0xEDB88320 ^ (c >>> 1)) : (c >>> 1);
        }
        t[i] = c >>> 0;
    }
    return t;
})();

const crc32 = (buf) => {
    let crc = 0xFFFFFFFF;
    for (let i = 0; i < buf.length; i++) {
        crc = crcTable[(crc ^ buf[i]) & 0xFF] ^ (crc >>> 8);
    }
    return (crc ^ 0xFFFFFFFF) >>> 0;
};

const pngChunk = (type, data) => {
    const len = Buffer.alloc(4);
    len.writeUInt32BE(data.length, 0);
    const name = Buffer.from(type, 'ascii');
    const crcBuf = Buffer.alloc(4);
    crcBuf.writeUInt32BE(crc32(Buffer.concat([name, data])), 0);
    return Buffer.concat([len, name, data, crcBuf]);
};

const rgbaToPngBase64 = (width, height, rgba) => {
    const raw = Buffer.alloc((width * 4 + 1) * height);
    for (let y = 0; y < height; y++) {
        const rowStart = y * (width * 4 + 1);
        raw[rowStart] = 0; // filter type None
        const src = rgba.subarray(y * width * 4, (y + 1) * width * 4);
        src.forEach((v, i) => {
            raw[rowStart + 1 + i] = v;
        });
    }

    const ihdr = Buffer.alloc(13);
    ihdr.writeUInt32BE(width, 0);
    ihdr.writeUInt32BE(height, 4);
    ihdr.writeUInt8(8, 8); // bit depth
    ihdr.writeUInt8(6, 9); // color type RGBA
    ihdr.writeUInt8(0, 10); // compression
    ihdr.writeUInt8(0, 11); // filter
    ihdr.writeUInt8(0, 12); // interlace

    const idat = pngChunk('IDAT', zlib.deflateSync(raw));
    const ihdrChunk = pngChunk('IHDR', ihdr);
    const iendChunk = pngChunk('IEND', Buffer.alloc(0));

    const signature = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);
    const png = Buffer.concat([signature, ihdrChunk, idat, iendChunk]);
    return png.toString('base64');
};

class MockCanvasContext {
    constructor(width, height) {
        this.width = width;
        this.height = height;
        this.last = null;
    }
    createImageData(w, h) {
        return { width: w, height: h, data: new Uint8ClampedArray(w * h * 4) };
    }
    putImageData(img) {
        this.last = img;
    }
}

class MockCanvas {
    constructor() {
        this.width = 0;
        this.height = 0;
        this.ctx = new MockCanvasContext(0, 0);
    }
    getContext(type) {
        if (type === '2d') return this.ctx;
        return null;
    }
    toDataURL() {
        if (!this.ctx.last) return 'data:image/png;base64,';
        const base64 = rgbaToPngBase64(this.width, this.height, this.ctx.last.data);
        return `data:image/png;base64,${base64}`;
    }
}

global.document = {
    createElement: (name) => {
        if (name === 'canvas') return new MockCanvas();
        throw new Error(`Unsupported element: ${name}`);
    }
};

global.URL = {
    createObjectURL: () => 'blob:mock'
};

const buildTestEmfBuffer = () => {
    const headerSize = 108;
    const offBmi = 100;
    const cbBmi = 40;
    const offBits = offBmi + cbBmi;
    const cbBits = 16; // 2x2x4 bytes
    const stretchSize = offBits + cbBits;
    const total = headerSize + stretchSize;
    const buffer = new ArrayBuffer(total);
    const dv = new DataView(buffer);
    const bytes = new Uint8Array(buffer);

    // EMR_HEADER
    dv.setUint32(0, 1, true);
    dv.setUint32(4, headerSize, true);
    dv.setUint32(40, 0x464d4520, true); // ' EMF'
    dv.setUint32(44, total, true);

    // EMR_STRETCHDIBITS record
    const pos = headerSize;
    dv.setUint32(pos, 0x51, true);
    dv.setUint32(pos + 4, stretchSize, true);
    dv.setInt32(pos + 44, 2, true); // cxSrc
    dv.setInt32(pos + 48, 2, true); // cySrc
    dv.setUint32(pos + 80, offBmi, true);
    dv.setUint32(pos + 84, cbBmi, true);
    dv.setUint32(pos + 88, offBits, true);
    dv.setUint32(pos + 92, cbBits, true);

    const bmi = pos + offBmi;
    dv.setUint32(bmi, 40, true); // biSize
    dv.setInt32(bmi + 4, 2, true); // biWidth
    dv.setInt32(bmi + 8, 2, true); // biHeight (positive = bottom-up)
    dv.setUint16(bmi + 12, 1, true); // planes
    dv.setUint16(bmi + 14, 32, true); // bitCount
    dv.setUint32(bmi + 16, 0, true); // BI_RGB
    dv.setUint32(bmi + 20, cbBits, true);

    let idx = pos + offBits;
    // bottom row: red, green (BGRA order)
    bytes[idx++] = 0; bytes[idx++] = 0; bytes[idx++] = 255; bytes[idx++] = 255;
    bytes[idx++] = 0; bytes[idx++] = 255; bytes[idx++] = 0; bytes[idx++] = 255;
    // top row: blue, white
    bytes[idx++] = 255; bytes[idx++] = 0; bytes[idx++] = 0; bytes[idx++] = 255;
    bytes[idx++] = 255; bytes[idx++] = 255; bytes[idx++] = 255; bytes[idx++] = 255;

    return buffer;
};

(async () => {
    const emfBuffer = buildTestEmfBuffer();
    const result = await emfToSvg(emfBuffer, 'test');

    assert.strictEqual(result.width, 2);
    assert.strictEqual(result.height, 2);
    assert.ok(result.svgText.includes('image/png'), 'SVG should embed PNG image');
    assert.ok(!result.svgText.includes('Unsupported content'), 'Should not fall back to placeholder');

    console.log('emf-to-svg test passed');
})().catch((err) => {
    console.error(err);
    process.exit(1);
});
