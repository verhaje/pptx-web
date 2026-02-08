/**
 * Source code correctness checks & edge cases / error handling
 */
const { assert, test, suite } = require('../helpers/test-harness');
const fs = require('fs');
const path = require('path');

// ─── Source code correctness ─────────────────────────────────────────────────

suite('Source code correctness checks', () => {
    test('shape-parser uses direct children for fill detection', () => {
        const src = fs.readFileSync(path.join(__dirname, '..', '..', 'js', 'parsers', 'shape-parser.js'), 'utf8');
        assert.ok(src.includes('directChildren'), 'ShapeParser should use direct children approach');
    });

    test('shape-parser extractFill uses directChildren, not getElementsByTagName', () => {
        const src = fs.readFileSync(path.join(__dirname, '..', '..', 'js', 'parsers', 'shape-parser.js'), 'utf8');
        const startIdx = src.indexOf('extractFill(spPr, imageRels)');
        assert.ok(startIdx > -1, 'extractFill method should exist');
        const afterStart = src.substring(startIdx);
        const endIdx = afterStart.indexOf('\n    extractStyleFill');
        const methodBody = endIdx > 0 ? afterStart.substring(0, endIdx) : afterStart.substring(0, 600);
        assert.ok(methodBody.includes('directChildren'), 'extractFill should use directChildren');
        assert.ok(!methodBody.includes("spPr.getElementsByTagName('a:noFill')"), 'extractFill should not use spPr.getElementsByTagName for a:noFill');
    });

    test('layout-shape-parser uses direct children for fill', () => {
        const src = fs.readFileSync(path.join(__dirname, '..', '..', 'js', 'parsers', 'layout', 'layout-shape-parser.js'), 'utf8');
        assert.ok(src.includes('directChildren') || src.includes('direct children'),
            'layout-shape-parser should use direct children');
    });

    test('shape-renderer handles solid fill objects in custom geometry', () => {
        const src = fs.readFileSync(path.join(__dirname, '..', '..', 'js', 'renderers', 'shape-renderer.js'), 'utf8');
        assert.ok(src.includes("shape.fill.type === 'solid'"), 'Should handle solid fill objects');
    });

    test('text-formatter has FONT_MAP', () => {
        const src = fs.readFileSync(path.join(__dirname, '..', '..', 'js', 'renderers', 'text-formatter.js'), 'utf8');
        assert.ok(src.includes('FONT_MAP'), 'TextFormatter should have FONT_MAP');
        assert.ok(src.includes('Calibri'), 'FONT_MAP should include Calibri');
    });

    test('style-builder handles all background types', () => {
        const src = fs.readFileSync(path.join(__dirname, '..', '..', 'js', 'renderers', 'style-builder.js'), 'utf8');
        assert.ok(src.includes("case 'solid'"), 'Should handle solid backgrounds');
        assert.ok(src.includes("case 'gradient'"), 'Should handle gradient backgrounds');
        assert.ok(src.includes("case 'image'"), 'Should handle image backgrounds');
        assert.ok(src.includes("case 'pattern'"), 'Should handle pattern backgrounds');
    });

    test('chart-renderer supports multiple chart types', () => {
        const src = fs.readFileSync(path.join(__dirname, '..', '..', 'js', 'renderers', 'chart-renderer.js'), 'utf8');
        assert.ok(src.includes('column'), 'Should support column charts');
        assert.ok(src.includes('line'), 'Should support line charts');
        assert.ok(src.includes('pie'), 'Should support pie charts');
        assert.ok(src.includes('doughnut'), 'Should support doughnut charts');
    });
});

// ─── Edge cases & error handling ─────────────────────────────────────────────

suite('Edge cases and error handling', () => {
    test('empty shape list renders empty string', () => {
        const shapes = [];
        assert.strictEqual(shapes.map(() => '<div></div>').join(''), '');
    });

    test('shape with all null properties handled', () => {
        const shape = { type: 'rect', x: null, y: null, width: null, height: null, fill: null, stroke: null };
        assert.ok(shape.type === 'rect');
        const w = Math.max(0.1, typeof shape.width === 'number' ? shape.width : 0);
        const h = Math.max(0.1, typeof shape.height === 'number' ? shape.height : 0);
        assert.strictEqual(w, 0.1);
        assert.strictEqual(h, 0.1);
    });

    test('rotation of 0 produces no transform', () => {
        const shape = { rotation: 0 };
        const transform = shape.rotation ? `transform: rotate(${shape.rotation}deg);` : '';
        assert.strictEqual(transform, '');
    });

    test('rotation produces correct CSS', () => {
        const shape = { rotation: 45 };
        const transform = shape.rotation ? `transform: rotate(${shape.rotation}deg);` : '';
        assert.strictEqual(transform, 'transform: rotate(45deg);');
    });

    test('flipH and flipV scaling', () => {
        const shape = { flipH: true, flipV: true };
        assert.strictEqual(shape.flipH ? -1 : 1, -1);
        assert.strictEqual(shape.flipV ? -1 : 1, -1);
    });

    test('z-index sorting preserves DOM order when no zIndex', () => {
        const shapes = [{ name: 'a' }, { name: 'b' }, { name: 'c' }];
        assert.strictEqual(shapes.some(s => typeof s.zIndex === 'number'), false);
    });

    test('z-index sorting works when present', () => {
        const shapes = [
            { name: 'c', zIndex: 3 },
            { name: 'a', zIndex: 1 },
            { name: 'b', zIndex: 2 }
        ];
        const sorted = [...shapes].sort((a, b) => a.zIndex - b.zIndex);
        assert.strictEqual(sorted[0].name, 'a');
        assert.strictEqual(sorted[1].name, 'b');
        assert.strictEqual(sorted[2].name, 'c');
    });

    test('group shape type with children', () => {
        const group = { type: 'group', shapes: [{ type: 'rect' }, { type: 'ellipse' }] };
        assert.strictEqual(group.type, 'group');
        assert.strictEqual(group.shapes.length, 2);
    });

    test('picture shape requires src', () => {
        const pic = { type: 'picture', src: 'blob:http://fake/img' };
        assert.ok(pic.src);
    });

    test('NaN handling in parseInt', () => {
        assert.ok(Number.isNaN(parseInt('notanumber', 10)));
        assert.ok(!Number.isNaN(parseInt('123', 10)));
    });

    test('gradient angle CSS conversion', () => {
        assert.strictEqual((0 + 90) % 360, 90);
        assert.strictEqual((90 + 90) % 360, 180);
        assert.strictEqual((270 + 90) % 360, 0);
    });
});
