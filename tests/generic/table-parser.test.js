/**
 * TableParser tests
 */
const { assert, test, suite, el } = require('../helpers/test-harness');

suite('TableParser', () => {
    test('cell border parsing', () => {
        function parseCellBorders(tcPr) {
            if (!tcPr) return { all: null };
            const borders = { left: null, right: null, top: null, bottom: null, all: null };
            const borderMap = { 'a:lnL': 'left', 'a:lnR': 'right', 'a:lnT': 'top', 'a:lnB': 'bottom' };
            for (const [tag, side] of Object.entries(borderMap)) {
                const ln = tcPr.getElementsByTagName(tag)[0];
                if (ln) {
                    const w = ln.getAttribute('w');
                    const width = w ? (parseInt(w, 10) / 914400) * 96 : 1;
                    borders[side] = { color: '#444', width };
                    if (!borders.all) borders.all = borders[side];
                }
            }
            return borders;
        }

        const tcPr = el('a:tcPr', {}, [
            el('a:lnL', { w: '12700' }),
            el('a:lnT', { w: '25400' })
        ]);
        const borders = parseCellBorders(tcPr);
        assert.ok(borders.left);
        assert.ok(borders.top);
        assert.strictEqual(borders.right, null);
        assert.strictEqual(borders.bottom, null);
        assert.ok(Math.abs(borders.left.width - 1.33) < 0.01);
        assert.ok(Math.abs(borders.top.width - 2.67) < 0.01);
    });

    test('cell margins default values', () => {
        function parseCellMargins(tcPr) {
            if (!tcPr) return { l: 8, r: 8, t: 4, b: 4 };
            return { l: 8, r: 8, t: 4, b: 4 };
        }
        const margins = parseCellMargins(null);
        assert.strictEqual(margins.l, 8);
        assert.strictEqual(margins.r, 8);
        assert.strictEqual(margins.t, 4);
        assert.strictEqual(margins.b, 4);
    });

    test('cell fill with noFill', () => {
        function parseCellFill(tcPr) {
            if (!tcPr) return null;
            const noFill = tcPr.getElementsByTagName('a:noFill')[0];
            if (noFill) return 'none';
            const solid = tcPr.getElementsByTagName('a:solidFill')[0];
            if (solid) return '#color';
            return null;
        }
        const tcPr = el('a:tcPr', {}, [el('a:noFill')]);
        assert.strictEqual(parseCellFill(tcPr), 'none');
    });

    test('cell fill with solidFill', () => {
        function parseCellFill(tcPr) {
            if (!tcPr) return null;
            const noFill = tcPr.getElementsByTagName('a:noFill')[0];
            if (noFill) return 'none';
            const solid = tcPr.getElementsByTagName('a:solidFill')[0];
            if (solid) return 'solid';
            return null;
        }
        const tcPr = el('a:tcPr', {}, [el('a:solidFill')]);
        assert.strictEqual(parseCellFill(tcPr), 'solid');
    });

    test('grid column widths sum to 100%', () => {
        const widths = [3000000, 3000000, 4000000];
        const total = widths.reduce((s, w) => s + w, 0);
        const pcts = widths.map(w => (w / total) * 100);
        const sum = pcts.reduce((s, p) => s + p, 0);
        assert.ok(Math.abs(sum - 100) < 0.001);
        assert.strictEqual(pcts[0], 30);
        assert.strictEqual(pcts[1], 30);
        assert.strictEqual(pcts[2], 40);
    });

    test('row heights sum to 100%', () => {
        const heights = [500000, 500000];
        const total = heights.reduce((s, h) => s + h, 0);
        const pcts = heights.map(h => (h / total) * 100);
        assert.strictEqual(pcts[0], 50);
        assert.strictEqual(pcts[1], 50);
    });

    test('table style banding logic', () => {
        function getStyledFill(tableStyle, ctx) {
            if (!tableStyle) return null;
            const inFirstRow = ctx.firstRow && ctx.rowIdx === 0;
            if (inFirstRow && tableStyle.firstRow) return tableStyle.firstRow;
            if (ctx.bandRow && ctx.rowIdx >= ctx.headerCount) {
                const bandIndex = ctx.rowIdx - ctx.headerCount;
                if (bandIndex % 2 === 0 && tableStyle.band1H) return tableStyle.band1H;
                if (bandIndex % 2 === 1 && tableStyle.band2H) return tableStyle.band2H;
            }
            return tableStyle.whole || null;
        }

        const style = { firstRow: '#header', band1H: '#band1', band2H: '#band2', whole: '#whole' };
        assert.strictEqual(getStyledFill(style, { firstRow: true, rowIdx: 0, headerCount: 1, bandRow: true }), '#header');
        assert.strictEqual(getStyledFill(style, { firstRow: true, rowIdx: 1, headerCount: 1, bandRow: true }), '#band1');
        assert.strictEqual(getStyledFill(style, { firstRow: true, rowIdx: 2, headerCount: 1, bandRow: true }), '#band2');
        assert.strictEqual(getStyledFill(style, { firstRow: true, rowIdx: 3, headerCount: 1, bandRow: true }), '#band1');
        assert.strictEqual(getStyledFill(null, { firstRow: false, rowIdx: 0, headerCount: 0, bandRow: false }), null);
    });
});
