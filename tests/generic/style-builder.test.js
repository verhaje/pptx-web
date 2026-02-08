/**
 * StyleBuilder tests
 */
const { assert, test, suite } = require('../helpers/test-harness');

class StyleBuilder {
    createBackgroundStyle(bg) {
        if (!bg) return '';
        switch (bg.type) {
            case 'solid': return bg.color ? `background-color: ${bg.color};` : '';
            case 'gradient': return this.createGradientStyle(bg.gradient);
            case 'image': return bg.image ? `background-image: url('${bg.image}'); background-size: cover; background-position: center;` : '';
            case 'pattern': return bg.color ? `background-color: ${bg.color};` : '';
            default: return '';
        }
    }
    createGradientStyle(gradient) {
        if (!gradient || !gradient.stops || gradient.stops.length === 0) return '';
        const stopsStr = gradient.stops.map(s => {
            let c = s.color;
            if (s.opacity !== undefined && s.opacity < 1) c = this.hexToRgbaForGradient(s.color, s.opacity);
            return `${c} ${s.position}%`;
        }).join(', ');
        if (gradient.type === 'linear' || !gradient.type) {
            const cssAngle = (gradient.angle + 90) % 360;
            return `background: linear-gradient(${cssAngle}deg, ${stopsStr});`;
        } else if (gradient.type === 'circle' || gradient.type === 'rect') {
            return `background: radial-gradient(circle, ${stopsStr});`;
        }
        return '';
    }
    hexToRgbaForGradient(hex, alpha = 1) {
        hex = hex.replace('#', '');
        const r = parseInt(hex.substring(0, 2), 16);
        const g = parseInt(hex.substring(2, 4), 16);
        const b = parseInt(hex.substring(4, 6), 16);
        return `rgba(${r}, ${g}, ${b}, ${alpha})`;
    }
    buildImageStyle(img) {
        let style = '';
        if (img.x !== undefined && img.y !== undefined) style += `position: absolute; left: ${img.x}px; top: ${img.y}px;`;
        if (img.width) style += `width: ${img.width}px;`;
        if (img.height) style += `height: ${img.height}px;`;
        return style;
    }
}

suite('StyleBuilder', () => {
    const sb = new StyleBuilder();

    test('createBackgroundStyle returns empty for null', () => {
        assert.strictEqual(sb.createBackgroundStyle(null), '');
    });

    test('createBackgroundStyle solid', () => {
        const style = sb.createBackgroundStyle({ type: 'solid', color: '#FF0000' });
        assert.strictEqual(style, 'background-color: #FF0000;');
    });

    test('createBackgroundStyle solid with no color', () => {
        assert.strictEqual(sb.createBackgroundStyle({ type: 'solid', color: null }), '');
    });

    test('createBackgroundStyle image', () => {
        const style = sb.createBackgroundStyle({ type: 'image', image: 'test.png' });
        assert.ok(style.includes("url('test.png')"));
        assert.ok(style.includes('background-size: cover'));
    });

    test('createBackgroundStyle image with no src', () => {
        assert.strictEqual(sb.createBackgroundStyle({ type: 'image', image: null }), '');
    });

    test('createBackgroundStyle pattern', () => {
        const style = sb.createBackgroundStyle({ type: 'pattern', color: '#AABBCC' });
        assert.strictEqual(style, 'background-color: #AABBCC;');
    });

    test('createBackgroundStyle unknown type', () => {
        assert.strictEqual(sb.createBackgroundStyle({ type: 'unknownType' }), '');
    });

    test('createGradientStyle linear', () => {
        const g = { type: 'linear', angle: 0, stops: [
            { color: '#FF0000', position: 0, opacity: 1 },
            { color: '#0000FF', position: 100, opacity: 1 }
        ]};
        const style = sb.createGradientStyle(g);
        assert.ok(style.includes('linear-gradient'));
        assert.ok(style.includes('90deg'));
        assert.ok(style.includes('#FF0000 0%'));
        assert.ok(style.includes('#0000FF 100%'));
    });

    test('createGradientStyle radial (circle)', () => {
        const g = { type: 'circle', angle: 0, stops: [
            { color: '#FFFFFF', position: 0, opacity: 1 }
        ]};
        const style = sb.createGradientStyle(g);
        assert.ok(style.includes('radial-gradient'));
    });

    test('createGradientStyle with opacity', () => {
        const g = { type: 'linear', angle: 90, stops: [
            { color: '#FF0000', position: 0, opacity: 0.5 }
        ]};
        const style = sb.createGradientStyle(g);
        assert.ok(style.includes('rgba(255, 0, 0, 0.5)'));
    });

    test('createGradientStyle returns empty for no stops', () => {
        assert.strictEqual(sb.createGradientStyle(null), '');
        assert.strictEqual(sb.createGradientStyle({ stops: [] }), '');
    });

    test('hexToRgbaForGradient converts correctly', () => {
        assert.strictEqual(sb.hexToRgbaForGradient('#FF0000', 1), 'rgba(255, 0, 0, 1)');
        assert.strictEqual(sb.hexToRgbaForGradient('#00FF00', 0.5), 'rgba(0, 255, 0, 0.5)');
        assert.strictEqual(sb.hexToRgbaForGradient('0000FF', 0), 'rgba(0, 0, 255, 0)');
    });

    test('buildImageStyle with full attributes', () => {
        const style = sb.buildImageStyle({ x: 10, y: 20, width: 100, height: 50 });
        assert.ok(style.includes('left: 10px'));
        assert.ok(style.includes('top: 20px'));
        assert.ok(style.includes('width: 100px'));
        assert.ok(style.includes('height: 50px'));
    });

    test('buildImageStyle with minimal attributes', () => {
        const style = sb.buildImageStyle({});
        assert.strictEqual(style, '');
    });

    test('buildImageStyle with only position', () => {
        const style = sb.buildImageStyle({ x: 5, y: 10 });
        assert.ok(style.includes('position: absolute'));
        assert.ok(!style.includes('width'));
    });
});
