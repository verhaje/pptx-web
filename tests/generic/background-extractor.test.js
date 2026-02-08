/**
 * BackgroundExtractor tests
 */
const { assert, test, suite, el } = require('../helpers/test-harness');

// Minimal mock theme extractor used by BackgroundExtractor
class MockThemeExtractor {
    constructor() {
        this.themeColors = { dk1: '#000000', lt1: '#FFFFFF', accent1: '#5B9BD5' };
        this.defaultThemeColors = { dk1: '#000000', lt1: '#FFFFFF' };
    }
    getSchemeColor(ref) {
        const map = { tx1: 'dk1', bg1: 'lt1', accent1: 'accent1' };
        const key = map[ref] || ref;
        return this.themeColors[key] || this.defaultThemeColors[key] || null;
    }
}

class BackgroundExtractor {
    constructor(themeExtractor) { this.themeExtractor = themeExtractor; this.images = {}; }
    extractColor(element) {
        if (!element) return null;
        const srgb = element.getElementsByTagName('a:srgbClr')[0];
        if (srgb) return '#' + srgb.getAttribute('val');
        const scheme = element.getElementsByTagName('a:schemeClr')[0];
        if (scheme) return this.themeExtractor.getSchemeColor(scheme.getAttribute('val'));
        const sys = element.getElementsByTagName('a:sysClr')[0];
        if (sys) { const lc = sys.getAttribute('lastClr'); return lc ? '#' + lc : null; }
        return null;
    }
    hexToRgb(hex) {
        const r = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return r ? { r: parseInt(r[1],16), g: parseInt(r[2],16), b: parseInt(r[3],16) } : { r:0,g:0,b:0 };
    }
    rgbToHex(r,g,b) {
        return '#' + [r,g,b].map(x => { const h = x.toString(16); return h.length===1 ? '0'+h : h; }).join('');
    }
    rgbToHsl(r,g,b) {
        r/=255;g/=255;b/=255; const mx=Math.max(r,g,b),mn=Math.min(r,g,b); let h,s,l=(mx+mn)/2;
        if(mx===mn){h=s=0}else{const d=mx-mn;s=l>0.5?d/(2-mx-mn):d/(mx+mn);switch(mx){case r:h=((g-b)/d+(g<b?6:0))/6;break;case g:h=((b-r)/d+2)/6;break;case b:h=((r-g)/d+4)/6;break;}}
        return{h,s,l};
    }
    hslToRgb(h,s,l) {
        let r,g,b;
        if(s===0){r=g=b=l}else{const hue2rgb=(p,q,t)=>{if(t<0)t+=1;if(t>1)t-=1;if(t<1/6)return p+(q-p)*6*t;if(t<1/2)return q;if(t<2/3)return p+(q-p)*(2/3-t)*6;return p};const q=l<0.5?l*(1+s):l+s-l*s;const p=2*l-q;r=hue2rgb(p,q,h+1/3);g=hue2rgb(p,q,h);b=hue2rgb(p,q,h-1/3);}
        return{r:Math.round(r*255),g:Math.round(g*255),b:Math.round(b*255)};
    }
    extractGradient(gradFill) {
        const gradient = { type: 'linear', angle: 90, stops: [] };
        const lin = gradFill.getElementsByTagName('a:lin')[0];
        if (lin) { const ang = lin.getAttribute('ang'); if (ang) gradient.angle = parseInt(ang)/60000; }
        const path = gradFill.getElementsByTagName('a:path')[0];
        if (path) gradient.type = path.getAttribute('path') || 'circle';
        const gsLst = gradFill.getElementsByTagName('a:gsLst')[0];
        if (gsLst) {
            const stops = gsLst.getElementsByTagName('a:gs');
            for (const stop of stops) {
                const pos = parseInt(stop.getAttribute('pos')||'0')/1000;
                const color = this.extractColor(stop);
                if (color) gradient.stops.push({ position: pos, color, opacity: 1 });
            }
            gradient.stops.sort((a,b) => a.position - b.position);
        }
        return gradient;
    }
}

suite('BackgroundExtractor', () => {
    const themeEx = new MockThemeExtractor();
    const bgEx = new BackgroundExtractor(themeEx);

    test('extractColor from srgbClr', () => {
        const elem = el('fill', {}, [el('a:srgbClr', { val: 'FF0000' })]);
        assert.strictEqual(bgEx.extractColor(elem), '#FF0000');
    });

    test('extractColor from schemeClr', () => {
        const elem = el('fill', {}, [el('a:schemeClr', { val: 'accent1' })]);
        assert.strictEqual(bgEx.extractColor(elem), '#5B9BD5');
    });

    test('extractColor from schemeClr tx1 resolves to dk1', () => {
        const elem = el('fill', {}, [el('a:schemeClr', { val: 'tx1' })]);
        assert.strictEqual(bgEx.extractColor(elem), '#000000');
    });

    test('extractColor from sysClr with lastClr', () => {
        const elem = el('fill', {}, [el('a:sysClr', { lastClr: 'ABCDEF' })]);
        assert.strictEqual(bgEx.extractColor(elem), '#ABCDEF');
    });

    test('extractColor returns null for empty element', () => {
        assert.strictEqual(bgEx.extractColor(null), null);
        assert.strictEqual(bgEx.extractColor(el('empty')), null);
    });

    test('hexToRgb parses correctly', () => {
        const rgb = bgEx.hexToRgb('#FF8000');
        assert.strictEqual(rgb.r, 255);
        assert.strictEqual(rgb.g, 128);
        assert.strictEqual(rgb.b, 0);
    });

    test('hexToRgb handles invalid input', () => {
        const rgb = bgEx.hexToRgb('invalid');
        assert.strictEqual(rgb.r, 0);
        assert.strictEqual(rgb.g, 0);
        assert.strictEqual(rgb.b, 0);
    });

    test('rgbToHex converts correctly', () => {
        assert.strictEqual(bgEx.rgbToHex(255, 0, 0), '#ff0000');
        assert.strictEqual(bgEx.rgbToHex(0, 255, 0), '#00ff00');
        assert.strictEqual(bgEx.rgbToHex(0, 0, 255), '#0000ff');
        assert.strictEqual(bgEx.rgbToHex(0, 0, 0), '#000000');
        assert.strictEqual(bgEx.rgbToHex(255, 255, 255), '#ffffff');
    });

    test('rgbToHsl and hslToRgb round-trip', () => {
        const testColors = [
            { r: 255, g: 0, b: 0 },
            { r: 0, g: 255, b: 0 },
            { r: 0, g: 0, b: 255 },
            { r: 128, g: 128, b: 128 },
            { r: 255, g: 255, b: 255 },
            { r: 0, g: 0, b: 0 }
        ];
        for (const c of testColors) {
            const hsl = bgEx.rgbToHsl(c.r, c.g, c.b);
            const back = bgEx.hslToRgb(hsl.h, hsl.s, hsl.l);
            assert.ok(Math.abs(back.r - c.r) <= 1, `R mismatch for (${c.r},${c.g},${c.b}): got ${back.r}`);
            assert.ok(Math.abs(back.g - c.g) <= 1, `G mismatch for (${c.r},${c.g},${c.b}): got ${back.g}`);
            assert.ok(Math.abs(back.b - c.b) <= 1, `B mismatch for (${c.r},${c.g},${c.b}): got ${back.b}`);
        }
    });

    test('extractGradient with linear gradient', () => {
        const gradFill = el('a:gradFill', {}, [
            el('a:lin', { ang: '5400000' }),
            el('a:gsLst', {}, [
                el('a:gs', { pos: '0' }, [el('a:srgbClr', { val: 'FF0000' })]),
                el('a:gs', { pos: '100000' }, [el('a:srgbClr', { val: '0000FF' })])
            ])
        ]);
        const grad = bgEx.extractGradient(gradFill);
        assert.strictEqual(grad.type, 'linear');
        assert.strictEqual(grad.angle, 90);
        assert.strictEqual(grad.stops.length, 2);
        assert.strictEqual(grad.stops[0].color, '#FF0000');
        assert.strictEqual(grad.stops[0].position, 0);
        assert.strictEqual(grad.stops[1].color, '#0000FF');
        assert.strictEqual(grad.stops[1].position, 100);
    });

    test('extractGradient with path type', () => {
        const gradFill = el('a:gradFill', {}, [
            el('a:path', { path: 'circle' }),
            el('a:gsLst', {}, [
                el('a:gs', { pos: '0' }, [el('a:srgbClr', { val: 'FFFFFF' })])
            ])
        ]);
        const grad = bgEx.extractGradient(gradFill);
        assert.strictEqual(grad.type, 'circle');
    });

    test('extractGradient stops are sorted by position', () => {
        const gradFill = el('a:gradFill', {}, [
            el('a:gsLst', {}, [
                el('a:gs', { pos: '80000' }, [el('a:srgbClr', { val: '0000FF' })]),
                el('a:gs', { pos: '0' }, [el('a:srgbClr', { val: 'FF0000' })]),
                el('a:gs', { pos: '50000' }, [el('a:srgbClr', { val: '00FF00' })])
            ])
        ]);
        const grad = bgEx.extractGradient(gradFill);
        assert.strictEqual(grad.stops[0].position, 0);
        assert.strictEqual(grad.stops[1].position, 50);
        assert.strictEqual(grad.stops[2].position, 80);
    });
});
