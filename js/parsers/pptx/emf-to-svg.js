/**
 * Minimal EMF -> SVG converter with no external dependencies.
 * Supports EMF files that contain a single STRETCHDIBITS record with
 * 24-bit or 32-bit BI_RGB DIB data. For unsupported inputs, returns a
 * lightweight placeholder SVG. This is intentionally small and best-effort.
 */
(function (global) {
    'use strict';

    const EMR_STRETCHDIBITS = 0x51; // 81
    const EMR_BITBLT = 0x4a; // 74
    const BI_RGB = 0; // No compression
    const BI_RLE8 = 1;
    const BI_RLE4 = 2;
    const BI_BITFIELDS = 3;

    const ensureBlob = async (input) => {
        if (input instanceof Blob) return input;
        if (input instanceof ArrayBuffer) return new Blob([input]);
        if (input && input.buffer instanceof ArrayBuffer) return new Blob([input.buffer]);
        throw new Error('Unsupported input type for EMF conversion');
    };

    const placeholderSvg = (label) => {
        const safe = (label || 'EMF image').replace(/</g, '&lt;').replace(/>/g, '&gt;');
        return {
            width: 400,
            height: 200,
            svgText:
                '<svg xmlns="http://www.w3.org/2000/svg" width="400" height="200" viewBox="0 0 400 200" role="img" aria-label="' +
                safe +
                ' unsupported"><rect width="400" height="200" fill="#f3f4f6" stroke="#d1d5db"/><text x="200" y="80" text-anchor="middle" font-family="Arial, sans-serif" font-size="18" fill="#4b5563">EMF not rendered</text><text x="200" y="120" text-anchor="middle" font-family="Arial, sans-serif" font-size="14" fill="#6b7280">Unsupported content</text></svg>'
        };
    };

    const readUint = (dv, offset, size) => {
        if (size === 2) return dv.getUint16(offset, true);
        return dv.getUint32(offset, true);
    };

    const readPalette = (dv, start, count) => {
        const palette = [];
        for (let i = 0; i < count; i++) {
            const b = dv.getUint8(start + i * 4 + 0);
            const g = dv.getUint8(start + i * 4 + 1);
            const r = dv.getUint8(start + i * 4 + 2);
            const a = 255; // palette entries in EMF are RGBQUAD (alpha unused)
            palette.push({ r, g, b, a });
        }
        return palette;
    };

    const computeMaskInfo = (mask) => {
        let shift = 0;
        let bits = 0;
        let m = mask >>> 0;
        if (m === 0) return { shift: 0, bits: 0, scale: 0 };
        while ((m & 1) === 0) {
            shift++;
            m >>>= 1;
        }
        while ((m & 1) === 1) {
            bits++;
            m >>>= 1;
        }
        const scale = bits ? 255 / ((1 << bits) - 1) : 0;
        return { shift, bits, scale };
    };

    const decodeBitmap = (dv, bmiOff, bitsOff, cbBits) => {
        const biSize = readUint(dv, bmiOff, 4);
        if (biSize < 40) return null;

        const width = dv.getInt32(bmiOff + 4, true);
        const heightRaw = dv.getInt32(bmiOff + 8, true);
        const planes = readUint(dv, bmiOff + 12, 2);
        const bitCount = readUint(dv, bmiOff + 14, 2);
        const compression = readUint(dv, bmiOff + 16, 4);
        let clrUsed = readUint(dv, bmiOff + 32, 4);

        if (planes !== 1) return null;
        const topDown = heightRaw < 0;
        const height = Math.abs(heightRaw);
        if (width <= 0 || height <= 0) return null;

        // Determine palette size
        let paletteCount = 0;
        if (bitCount <= 8 && compression !== BI_BITFIELDS) {
            paletteCount = clrUsed && clrUsed > 0 ? clrUsed : (1 << bitCount);
        }
        const palette = paletteCount > 0 ? readPalette(dv, bmiOff + biSize, paletteCount) : null;

        // Bitfields masks
        let rMask = 0, gMask = 0, bMask = 0, aMask = 0;
        if (compression === BI_BITFIELDS) {
            const masksOff = bmiOff + biSize;
            rMask = dv.getUint32(masksOff + 0, true);
            gMask = dv.getUint32(masksOff + 4, true);
            bMask = dv.getUint32(masksOff + 8, true);
            // Optional alpha mask
            aMask = dv.getUint32(masksOff + 12, true);
        }

        // Stride in bytes, aligned to 4-byte rows
        const stride = (() => {
            if (bitCount === 1) return ((width + 31) >> 3) & ~3;
            if (bitCount === 4) return (((width + 7) >> 3) * 4 + 3) & ~3;
            if (bitCount === 8) return (width + 3) & ~3;
            if (bitCount === 16 || bitCount === 15) return ((width * 2 + 3) & ~3);
            if (bitCount === 24) return ((width * 3 + 3) & ~3);
            if (bitCount === 32) return width * 4;
            return null;
        })();
        if (!stride) return null;

        const expectedSize = stride * height;
        const bitsLen = Math.min(cbBits, dv.byteLength - bitsOff);
        if (expectedSize > bitsLen) return null;

        const pixels = new Uint8ClampedArray(width * height * 4);
        const writePixel = (row, col, r, g, b, a = 255) => {
            const dst = (row * width + col) * 4;
            pixels[dst] = r;
            pixels[dst + 1] = g;
            pixels[dst + 2] = b;
            pixels[dst + 3] = a;
        };

        const base = bitsOff;
        const rowLoop = (fnPerRow) => {
            for (let row = 0; row < height; row++) {
                const srcRow = topDown ? row : height - 1 - row;
                const srcOff = base + srcRow * stride;
                fnPerRow(row, srcOff);
            }
        };

        if (bitCount === 24 || bitCount === 32) {
            rowLoop((row, srcOff) => {
                for (let col = 0; col < width; col++) {
                    const b = dv.getUint8(srcOff + col * (bitCount / 8) + 0);
                    const g = dv.getUint8(srcOff + col * (bitCount / 8) + 1);
                    const r = dv.getUint8(srcOff + col * (bitCount / 8) + 2);
                    const a = bitCount === 32 ? dv.getUint8(srcOff + col * 4 + 3) : 255;
                    writePixel(row, col, r, g, b, a);
                }
            });
            return { width, height, pixels };
        }

        if (bitCount === 16 || bitCount === 15) {
            const rInfo = computeMaskInfo(rMask || 0x7c00);
            const gInfo = computeMaskInfo(gMask || 0x03e0);
            const bInfo = computeMaskInfo(bMask || 0x001f);
            const aInfo = computeMaskInfo(aMask);
            rowLoop((row, srcOff) => {
                for (let col = 0; col < width; col++) {
                    const v = dv.getUint16(srcOff + col * 2, true);
                    const r = rInfo.bits ? ((v & rMask) >>> rInfo.shift) * rInfo.scale : 0;
                    const g = gInfo.bits ? ((v & gMask) >>> gInfo.shift) * gInfo.scale : 0;
                    const b = bInfo.bits ? ((v & bMask) >>> bInfo.shift) * bInfo.scale : 0;
                    const a = aInfo.bits ? ((v & aMask) >>> aInfo.shift) * aInfo.scale : 255;
                    writePixel(row, col, r, g, b, a);
                }
            });
            return { width, height, pixels };
        }

        if (bitCount === 8 || bitCount === 4 || bitCount === 1) {
            if (!palette || palette.length === 0) return null;
            const mask = (1 << bitCount) - 1;
            const pixelsPerByte = 8 / bitCount;
            rowLoop((row, srcOff) => {
                let bitPos = 0;
                for (let col = 0; col < width; col++) {
                    const byteIdx = Math.floor(bitPos / 8);
                    const shift = 8 - bitCount - (bitPos % 8);
                    const idx = (dv.getUint8(srcOff + byteIdx) >> shift) & mask;
                    const pal = palette[idx] || { r: 0, g: 0, b: 0, a: 255 };
                    writePixel(row, col, pal.r, pal.g, pal.b, pal.a);
                    bitPos += bitCount;
                }
            });
            return { width, height, pixels };
        }

        if (compression === BI_RLE8 || compression === BI_RLE4) {
            // Not yet supported
            return null;
        }

        return null;
    };

    const decodeStretchDibits = (dv, pos, size) => {
        const offBmi = readUint(dv, pos + 80, 4);
        const cbBmi = readUint(dv, pos + 84, 4);
        const offBits = readUint(dv, pos + 88, 4);
        const cbBits = readUint(dv, pos + 92, 4);

        if (!offBmi || !offBits || !cbBmi || !cbBits) return null;
        if (pos + offBmi + cbBmi > dv.byteLength) return null;
        if (pos + offBits + cbBits > dv.byteLength) return null;

        const bmiOff = pos + offBmi;
        const bitsOff = pos + offBits;
        return decodeBitmap(dv, bmiOff, bitsOff, cbBits);
    };

    const decodeBitBlt = (dv, pos, size) => {
        // BITBLT has similar BMI/Bits layout
        const offBmi = readUint(dv, pos + 80, 4);
        const cbBmi = readUint(dv, pos + 84, 4);
        const offBits = readUint(dv, pos + 88, 4);
        const cbBits = readUint(dv, pos + 92, 4);
        if (!offBmi || !offBits || !cbBmi || !cbBits) return null;
        if (pos + offBmi + cbBmi > dv.byteLength) return null;
        if (pos + offBits + cbBits > dv.byteLength) return null;
        const bmiOff = pos + offBmi;
        const bitsOff = pos + offBits;
        const bmp = decodeBitmap(dv, bmiOff, bitsOff, cbBits);
        if (!bmp) return null;
        // Destination size from record: cxDest/cyDest at offsets 96/100
        const cxDest = dv.getInt32(pos + 96, true);
        const cyDest = dv.getInt32(pos + 100, true);
        if (cxDest > 0 && cyDest > 0) {
            bmp.width = cxDest;
            bmp.height = cyDest;
        }
        return bmp;
    };

    const tryDecodeEmf = (buffer) => {
        const dv = new DataView(buffer);
        if (dv.byteLength < 80) return null;
        // EMF header signature at offset 40 should be 0x464D4520 (' EMF')
        const signature = dv.getUint32(40, true);
        if (signature !== 0x464d4520) return null;

        let pos = 0;
        while (pos + 8 <= dv.byteLength) {
            const type = dv.getUint32(pos, true);
            const size = dv.getUint32(pos + 4, true);
            if (size < 8 || pos + size > dv.byteLength) break;

            if (type === EMR_STRETCHDIBITS) {
                const bmp = decodeStretchDibits(dv, pos, size);
                if (bmp) return bmp;
            } else if (type === EMR_BITBLT) {
                const bmp = decodeBitBlt(dv, pos, size);
                if (bmp) return bmp;
            }
            pos += size;
        }
        return null;
    };

    const bitmapToSvg = (bmp, label) => {
        const { width, height, pixels } = bmp;
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (!ctx) return placeholderSvg(label);
        const img = ctx.createImageData(width, height);
        img.data.set(pixels);
        ctx.putImageData(img, 0, 0);
        const dataUrl = canvas.toDataURL('image/png');
        return {
            width,
            height,
            svgText:
                '<svg xmlns="http://www.w3.org/2000/svg" width="' +
                width +
                '" height="' +
                height +
                '" viewBox="0 0 ' +
                width +
                ' ' +
                height +
                '"><image href="' +
                dataUrl +
                '" width="' +
                width +
                '" height="' +
                height +
                '"/></svg>'
        };
    };

    const emfToSvg = async (input, label) => {
        try {
            const blob = await ensureBlob(input);
            const buffer = await blob.arrayBuffer();
            const decoded = tryDecodeEmf(buffer);
            if (!decoded) return placeholderSvg(label);
            return bitmapToSvg(decoded, label);
        } catch (err) {
            console.warn('EMF conversion failed', err);
            return placeholderSvg(label);
        }
    };

    // UMD-lite export
    const api = { emfToSvg };
    if (typeof module !== 'undefined' && module.exports) {
        module.exports = api;
    } else {
        global.EMFLiteConverter = api;
    }
})(typeof window !== 'undefined' ? window : globalThis);
