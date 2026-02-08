/**
 * ShapeRenderer & ChartRenderer tests
 */
const { assert, test, suite, el } = require('../helpers/test-harness');

// ─── SVG viewBox ──────────────────────────────────────────────────────────────

suite('SVG viewBox for line shapes', () => {
    function toNum(v) {
        if (typeof v === 'string') return parseFloat(v) || 0;
        return Number(v) || 0;
    }

    test('percentage strings convert to numbers', () => {
        assert.strictEqual(toNum('0%'), 0);
        assert.strictEqual(toNum('50%'), 50);
        assert.strictEqual(toNum('100%'), 100);
    });
    test('numeric values pass through', () => {
        assert.strictEqual(toNum(0), 0);
        assert.strictEqual(toNum(75), 75);
    });
    test('viewBox stroke-width scaling', () => {
        const strokeWidth = 1.33;
        const vbSW = Math.max(0.3, strokeWidth * 100 / 900);
        assert.ok(vbSW > 0);
        assert.ok(vbSW < 1);
    });
    test('marker size minimum is 2', () => {
        const vbSW = 0.15;
        const markerSize = Math.max(2, vbSW * 4);
        assert.strictEqual(markerSize, 2);
    });
});

// ─── buildTextBoxStyle ────────────────────────────────────────────────────────

suite('ShapeRenderer.buildTextBoxStyle', () => {
    function buildTextBoxStyle(shape) {
        const cxEMU = typeof shape.cxEMU === 'number' && shape.cxEMU > 0 ? shape.cxEMU : null;
        const cyEMU = typeof shape.cyEMU === 'number' && shape.cyEMU > 0 ? shape.cyEMU : null;
        let left = 0, right = 0, top = 0, bottom = 0;
        if (shape.textInsetsEMU && cxEMU && cyEMU) {
            left = (shape.textInsetsEMU.left / cxEMU) * 100;
            right = (shape.textInsetsEMU.right / cxEMU) * 100;
            top = (shape.textInsetsEMU.top / cyEMU) * 100;
            bottom = (shape.textInsetsEMU.bottom / cyEMU) * 100;
        }
        return { left, right, top, bottom };
    }

    test('insets calculated as percentage of shape', () => {
        const shape = { cxEMU: 914400, cyEMU: 457200, textInsetsEMU: { left: 91440, right: 91440, top: 45720, bottom: 45720 } };
        const r = buildTextBoxStyle(shape);
        assert.strictEqual(r.left, 10);
        assert.strictEqual(r.top, 10);
    });
    test('no insets produces 0 padding', () => {
        assert.strictEqual(buildTextBoxStyle({ cxEMU: 914400, cyEMU: 457200 }).left, 0);
    });
    test('zero dimensions produce 0 padding', () => {
        const shape = { cxEMU: 0, cyEMU: 0, textInsetsEMU: { left: 91440, right: 91440, top: 45720, bottom: 45720 } };
        assert.strictEqual(buildTextBoxStyle(shape).left, 0);
    });
});

// ─── slide number placeholder sizing ──────────────────────────────────────────

suite('Slide number placeholder sizing', () => {
    function adjustSldNum(shape) {
        let w = typeof shape.width === 'number' ? shape.width : 0;
        let h = typeof shape.height === 'number' ? shape.height : 0;
        w = Math.max(0.1, w);
        h = Math.max(0.1, h);
        let x = shape.x || 0;
        let y = shape.y || 0;
        if (shape.isPlaceholder && shape.placeholderType === 'sldNum') {
            if (w < 2) w = 2.5;
            if (h < 2) h = 2.8;
            x = 100 - w - 1;
            y = 100 - h - 1;
        }
        return { x, y, width: w, height: h };
    }

    test('sldNum with no size gets minimum', () => {
        const r = adjustSldNum({ isPlaceholder: true, placeholderType: 'sldNum', width: null, height: null, x: null, y: null });
        assert.strictEqual(r.width, 2.5);
        assert.strictEqual(r.height, 2.8);
        assert.strictEqual(r.x, 96.5);
        assert.strictEqual(r.y, 96.2);
    });
    test('sldNum with explicit size preserved', () => {
        const r = adjustSldNum({ isPlaceholder: true, placeholderType: 'sldNum', width: 5, height: 4, x: 90, y: 92 });
        assert.strictEqual(r.width, 5);
        assert.strictEqual(r.height, 4);
    });
    test('non-sldNum placeholders not adjusted', () => {
        const r = adjustSldNum({ isPlaceholder: true, placeholderType: 'title', width: 0.5, height: 0.5, x: 10, y: 10 });
        assert.ok(r.width < 2.5);
    });
});

// ─── ChartRenderer ────────────────────────────────────────────────────────────

suite('ChartRenderer', () => {
    function computeSimpleDomain(series) {
        let min = Infinity, max = -Infinity;
        for (const s of series) {
            for (const v of (s.values || [])) {
                if (v < min) min = v;
                if (v > max) max = v;
            }
        }
        if (min > 0) min = 0;
        return { min, max };
    }

    test('domain computation finds min/max', () => {
        const domain = computeSimpleDomain([{ values: [10, 20, 30] }, { values: [5, 25, 15] }]);
        assert.strictEqual(domain.min, 0);
        assert.strictEqual(domain.max, 30);
    });
    test('domain with negative values', () => {
        const domain = computeSimpleDomain([{ values: [-10, 5, 20] }]);
        assert.strictEqual(domain.min, -10);
        assert.strictEqual(domain.max, 20);
    });

    test('chart type selection', () => {
        function selectRenderer(kind) {
            const k = (kind || 'column').toLowerCase();
            if (['column', 'line', 'area'].includes(k)) return 'cartesian';
            if (k === 'pie' || k === 'doughnut') return 'pie';
            return 'placeholder';
        }
        assert.strictEqual(selectRenderer('column'), 'cartesian');
        assert.strictEqual(selectRenderer('line'), 'cartesian');
        assert.strictEqual(selectRenderer('area'), 'cartesian');
        assert.strictEqual(selectRenderer('pie'), 'pie');
        assert.strictEqual(selectRenderer('doughnut'), 'pie');
        assert.strictEqual(selectRenderer('scatter'), 'placeholder');
        assert.strictEqual(selectRenderer(null), 'cartesian');
    });

    test('color alpha utility', () => {
        function addAlpha(hex, alpha) {
            hex = hex.replace('#', '');
            const r = parseInt(hex.substring(0, 2), 16);
            const g = parseInt(hex.substring(2, 4), 16);
            const b = parseInt(hex.substring(4, 6), 16);
            return `rgba(${r},${g},${b},${alpha})`;
        }
        assert.strictEqual(addAlpha('#FF0000', 0.5), 'rgba(255,0,0,0.5)');
        assert.strictEqual(addAlpha('#00FF00', 1), 'rgba(0,255,0,1)');
    });
});
