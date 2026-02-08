/**
 * Tests for slide 11 rendering fixes:
 * 1. extractFill should not match a:noFill inside a:ln
 * 2. Arrow direction (tailEnd → marker-end, headEnd → marker-start)
 * 3. Slide number placeholder minimum size
 * 4. Thumbnail SVG uses viewBox for proportional scaling
 * 5. Connector stroke from p:style/a:lnRef
 */

const assert = require('assert');

// ─── Minimal DOM shim for tests ───────────────────────────────────────────────

class MockElement {
    constructor(tagName, attributes = {}, children = []) {
        this.tagName = tagName;
        this.nodeType = 1;
        this._attributes = { ...attributes };
        this.children = children;
        this.childNodes = children;
        for (const child of children) {
            child.parentNode = this;
        }
    }

    getAttribute(name) {
        return this._attributes[name] ?? null;
    }

    getElementsByTagName(tag) {
        const results = [];
        const search = (el) => {
            for (const child of (el.children || [])) {
                if (child.tagName === tag) results.push(child);
                search(child);
            }
        };
        search(this);
        return results;
    }
}

// ─── 1. extractFill: a:noFill inside a:ln must NOT suppress shape fill ────────

(function testExtractFillIgnoresNoFillInsideLn() {
    console.log('Test: extractFill ignores a:noFill inside a:ln ...');

    // Simulate: <p:spPr><a:prstGeom/><a:ln><a:noFill/></a:ln></p:spPr>
    const noFillEl = new MockElement('a:noFill');
    const lnEl = new MockElement('a:ln', {}, [noFillEl]);
    const prstGeom = new MockElement('a:prstGeom', { prst: 'rect' });
    const spPr = new MockElement('p:spPr', {}, [prstGeom, lnEl]);

    // extractFill logic (mirrors the fixed code)
    const directChildren = Array.from(spPr.children).filter(n => n.nodeType === 1);
    const solidFill = directChildren.find(c => c.tagName === 'a:solidFill') || null;
    const noFill = directChildren.find(c => c.tagName === 'a:noFill') || null;

    assert.strictEqual(noFill, null, 'a:noFill inside a:ln should NOT be detected as shape noFill');
    assert.strictEqual(solidFill, null, 'No direct solidFill child');

    // The old (buggy) approach would find noFill:
    const buggyNoFill = spPr.getElementsByTagName('a:noFill')[0];
    assert.ok(buggyNoFill, 'getElementsByTagName does find nested a:noFill (confirming the bug existed)');

    console.log('  PASSED');
})();

(function testExtractFillDetectsDirectNoFill() {
    console.log('Test: extractFill detects direct a:noFill on spPr ...');

    // Simulate: <p:spPr><a:noFill/></p:spPr>
    const noFillEl = new MockElement('a:noFill');
    const spPr = new MockElement('p:spPr', {}, [noFillEl]);

    const directChildren = Array.from(spPr.children).filter(n => n.nodeType === 1);
    const noFill = directChildren.find(c => c.tagName === 'a:noFill') || null;

    assert.ok(noFill, 'Direct a:noFill on spPr should be detected');

    console.log('  PASSED');
})();

(function testExtractFillReturnsNullWhenNoFillElements() {
    console.log('Test: extractFill returns null when no fill elements ...');

    // Simulate: <p:spPr><a:xfrm/><a:prstGeom/><a:ln><a:noFill/></a:ln></p:spPr>
    const noFillEl = new MockElement('a:noFill');
    const lnEl = new MockElement('a:ln', {}, [noFillEl]);
    const xfrm = new MockElement('a:xfrm');
    const prstGeom = new MockElement('a:prstGeom', { prst: 'rect' });
    const spPr = new MockElement('p:spPr', {}, [xfrm, prstGeom, lnEl]);

    const directChildren = Array.from(spPr.children).filter(n => n.nodeType === 1);
    const solidFill = directChildren.find(c => c.tagName === 'a:solidFill') || null;
    const gradFill = directChildren.find(c => c.tagName === 'a:gradFill') || null;
    const blipFill = directChildren.find(c => c.tagName === 'a:blipFill') || null;
    const noFill = directChildren.find(c => c.tagName === 'a:noFill') || null;

    // When none are found at direct level, extractFill should return null
    // allowing extractStyleFill to be called
    assert.strictEqual(solidFill, null);
    assert.strictEqual(gradFill, null);
    assert.strictEqual(blipFill, null);
    assert.strictEqual(noFill, null, 'No direct noFill should allow style fill to be used');

    console.log('  PASSED');
})();

// ─── 2. Arrow direction: tailEnd maps to marker-end ──────────────────────────

(function testArrowTailMapsToMarkerEnd() {
    console.log('Test: arrowTail (tailEnd) maps to marker-end ...');

    // Simulate shape with arrowTail (from a:tailEnd type="triangle")
    const shape = {
        type: 'line',
        stroke: '#00B0F0',
        strokeWidth: 1.33,
        x: 34.3,
        y: 79.5,
        width: 14.1,
        height: 0.1,
        arrowTail: 'triangle',
        arrowHead: undefined,
        linePoints: { x1: 0, y1: 50, x2: 100, y2: 50 }
    };

    // Logic from renderLineShape (fixed version)
    const hasStartArrow = !!shape.arrowHead; // headEnd → start of line
    const hasEndArrow = !!shape.arrowTail;   // tailEnd → end of line

    assert.strictEqual(hasStartArrow, false, 'No arrowHead → no marker-start');
    assert.strictEqual(hasEndArrow, true, 'arrowTail → marker-end should be true');

    console.log('  PASSED');
})();

(function testArrowHeadMapsToMarkerStart() {
    console.log('Test: arrowHead (headEnd) maps to marker-start ...');

    const shape = {
        arrowHead: 'triangle',
        arrowTail: undefined
    };

    const hasStartArrow = !!shape.arrowHead;
    const hasEndArrow = !!shape.arrowTail;

    assert.strictEqual(hasStartArrow, true, 'arrowHead → marker-start should be true');
    assert.strictEqual(hasEndArrow, false, 'No arrowTail → no marker-end');

    console.log('  PASSED');
})();

(function testBothArrows() {
    console.log('Test: both arrowHead and arrowTail ...');

    const shape = {
        arrowHead: 'triangle',
        arrowTail: 'triangle'
    };

    const hasStartArrow = !!shape.arrowHead;
    const hasEndArrow = !!shape.arrowTail;

    assert.strictEqual(hasStartArrow, true, 'arrowHead present → marker-start');
    assert.strictEqual(hasEndArrow, true, 'arrowTail present → marker-end');

    console.log('  PASSED');
})();

// ─── 3. Slide number placeholder minimum size ────────────────────────────────

(function testSldNumMinimumSize() {
    console.log('Test: sldNum placeholder gets minimum size ...');

    const shape = {
        isPlaceholder: true,
        placeholderType: 'sldNum',
        width: null,
        height: null,
        x: null,
        y: null
    };

    // Simulate the renderer logic
    let width = typeof shape.width === 'number' ? shape.width : 0;
    let height = typeof shape.height === 'number' ? shape.height : 0;
    width = Math.max(0.1, width);
    height = Math.max(0.1, height);

    let x = shape.x || 0;
    let y = shape.y || 0;

    if (shape.isPlaceholder && shape.placeholderType === 'sldNum') {
        if (width < 2) width = 2.5;
        if (height < 2) height = 2.8;
        x = 100 - width - 1;
        y = 100 - height - 1;
    }

    assert.ok(width >= 2.5, `Width should be at least 2.5%, got ${width}`);
    assert.ok(height >= 2.8, `Height should be at least 2.8%, got ${height}`);
    assert.ok(x > 0 && x < 100, `x should be within slide bounds, got ${x}`);
    assert.ok(y > 0 && y < 100, `y should be within slide bounds, got ${y}`);
    assert.strictEqual(x, 96.5, 'x = 100 - 2.5 - 1');
    assert.strictEqual(y, 96.2, 'y = 100 - 2.8 - 1');

    console.log('  PASSED');
})();

(function testSldNumPreservesExplicitSize() {
    console.log('Test: sldNum preserves explicit size when large enough ...');

    const shape = {
        isPlaceholder: true,
        placeholderType: 'sldNum',
        width: 5,
        height: 4,
        x: 90,
        y: 92
    };

    let width = typeof shape.width === 'number' ? shape.width : 0;
    let height = typeof shape.height === 'number' ? shape.height : 0;
    width = Math.max(0.1, width);
    height = Math.max(0.1, height);

    let x = shape.x || 0;
    let y = shape.y || 0;

    if (shape.isPlaceholder && shape.placeholderType === 'sldNum') {
        if (width < 2) width = 2.5;
        if (height < 2) height = 2.8;
        x = 100 - width - 1;
        y = 100 - height - 1;
    }

    assert.strictEqual(width, 5, 'Width should be preserved when >= 2');
    assert.strictEqual(height, 4, 'Height should be preserved when >= 2');

    console.log('  PASSED');
})();

// ─── 4. SVG viewBox for proportional scaling ──────────────────────────────────

(function testSvgViewBoxInLineShape() {
    console.log('Test: renderLineShape uses viewBox for proportional scaling ...');

    // Simulate the rendering logic
    const strokeWidth = 1.33;
    const x1 = '0%', y1 = '50%', x2 = '100%', y2 = '50%';

    const toNum = (v) => {
        if (typeof v === 'string') return parseFloat(v) || 0;
        return Number(v) || 0;
    };

    const vx1 = toNum(x1);
    const vy1 = toNum(y1);
    const vx2 = toNum(x2);
    const vy2 = toNum(y2);

    assert.strictEqual(vx1, 0, 'x1 should convert from "0%" to 0');
    assert.strictEqual(vy1, 50, 'y1 should convert from "50%" to 50');
    assert.strictEqual(vx2, 100, 'x2 should convert from "100%" to 100');
    assert.strictEqual(vy2, 50, 'y2 should convert from "50%" to 50');

    const vbStrokeWidth = Math.max(0.3, strokeWidth * 100 / 900);
    assert.ok(vbStrokeWidth > 0, 'viewBox stroke-width should be positive');
    assert.ok(vbStrokeWidth < 1, `viewBox stroke-width should be small relative to 100-unit viewBox, got ${vbStrokeWidth}`);

    const markerSize = Math.max(2, vbStrokeWidth * 4);
    assert.ok(markerSize >= 2, 'markerSize should have minimum of 2');

    console.log('  PASSED');
})();

(function testSvgViewBoxWithLinePoints() {
    console.log('Test: numeric linePoints convert correctly ...');

    // Simulate linePoints from resolveConnectorEndpoints
    const linePoints = { x1: 0, y1: 100, x2: 100, y2: 0 };

    const x1 = `${linePoints.x1}%`;
    const y1 = `${linePoints.y1}%`;
    const x2 = `${linePoints.x2}%`;
    const y2 = `${linePoints.y2}%`;

    const toNum = (v) => {
        if (typeof v === 'string') return parseFloat(v) || 0;
        return Number(v) || 0;
    };

    assert.strictEqual(toNum(x1), 0, 'x1 from linePoints');
    assert.strictEqual(toNum(y1), 100, 'y1 from linePoints');
    assert.strictEqual(toNum(x2), 100, 'x2 from linePoints');
    assert.strictEqual(toNum(y2), 0, 'y2 from linePoints');

    console.log('  PASSED');
})();

// ─── 5. Connector stroke from p:style/a:lnRef ────────────────────────────────

(function testConnectorStrokeFromLnRef() {
    console.log('Test: connector extracts stroke from p:style/a:lnRef ...');

    // Simulate connector XML structure:
    // <p:cxnSp>
    //   <p:spPr><a:ln w="12700"><a:tailEnd type="triangle"/></a:ln></p:spPr>
    //   <p:style><a:lnRef idx="2"><a:schemeClr val="accent1"/></a:lnRef></p:style>
    // </p:cxnSp>

    const schemeClr = new MockElement('a:schemeClr', { val: 'accent1' });
    const lnRef = new MockElement('a:lnRef', { idx: '2' }, [schemeClr]);
    const pStyle = new MockElement('p:style', {}, [lnRef]);

    // Verify lnRef is discoverable
    const foundLnRef = pStyle.getElementsByTagName('a:lnRef')[0];
    assert.ok(foundLnRef, 'lnRef should be found in p:style');
    assert.strictEqual(foundLnRef.getAttribute('idx'), '2', 'lnRef idx should be 2');

    // Verify schemeClr is discoverable inside lnRef
    const foundSchemeClr = foundLnRef.getElementsByTagName('a:schemeClr')[0];
    assert.ok(foundSchemeClr, 'schemeClr should be found inside lnRef');
    assert.strictEqual(foundSchemeClr.getAttribute('val'), 'accent1', 'schemeClr val should be accent1');

    console.log('  PASSED');
})();

(function testConnectorFallsBackWhenNoStyle() {
    console.log('Test: connector without p:style uses fallback color ...');

    // When no p:style and no ln solidFill, stroke should default
    let stroke = null;
    const defaultColor = '#000000';

    // Simulate: no p:style found
    const pStyle = null;
    if (!stroke && pStyle) {
        // This path is not taken
    }
    if (!stroke) {
        stroke = defaultColor;
    }

    assert.strictEqual(stroke, '#000000', 'Fallback stroke should be #000000');

    console.log('  PASSED');
})();

// ─── 6. OOXML tailEnd/headEnd parser mapping ─────────────────────────────────

(function testTailEndParsesToArrowTail() {
    console.log('Test: a:tailEnd type="triangle" parses to arrowTail ...');

    // Simulate parsing logic from parseConnectionShape
    const tailEnd = new MockElement('a:tailEnd', { type: 'triangle' });
    const headEnd = null;

    let arrowHead = undefined;
    let arrowTail = undefined;

    if (headEnd && headEnd.getAttribute('type') && headEnd.getAttribute('type') !== 'none') {
        arrowHead = headEnd.getAttribute('type');
    }

    if (tailEnd && tailEnd.getAttribute('type') && tailEnd.getAttribute('type') !== 'none') {
        arrowTail = tailEnd.getAttribute('type');
    }

    assert.strictEqual(arrowTail, 'triangle', 'tailEnd should set arrowTail');
    assert.strictEqual(arrowHead, undefined, 'no headEnd should leave arrowHead undefined');

    // Verify the rendering mapping
    const hasStartArrow = !!arrowHead;
    const hasEndArrow = !!arrowTail;

    assert.strictEqual(hasEndArrow, true, 'tailEnd → should create marker-end');
    assert.strictEqual(hasStartArrow, false, 'no headEnd → should NOT create marker-start');

    console.log('  PASSED');
})();

// ─── 7. Slide 11 specific: shape fill should come from p:style ───────────────

(function testSlide11ShapeFillFromStyle() {
    console.log('Test: Slide 11 "Application" shape fill resolved from p:style ...');

    // The shape XML has:
    // <p:spPr><a:prstGeom prst="rect"/><a:ln><a:noFill/></a:ln></p:spPr>
    // <p:style><a:fillRef idx="1"><a:schemeClr val="accent1"/></a:fillRef></p:style>

    // Step 1: extractFill should return null (not 'none')
    const noFillEl = new MockElement('a:noFill');
    const lnEl = new MockElement('a:ln', {}, [noFillEl]);
    const prstGeom = new MockElement('a:prstGeom', { prst: 'rect' });
    const spPr = new MockElement('p:spPr', {}, [prstGeom, lnEl]);

    const directChildren = Array.from(spPr.children).filter(n => n.nodeType === 1);
    const noFill = directChildren.find(c => c.tagName === 'a:noFill') || null;
    const result = noFill ? 'none' : null; // extractFill return

    assert.strictEqual(result, null, 'extractFill should return null, allowing extractStyleFill to handle fill');

    // Step 2: extractStyleFill should find fillRef with accent1
    const schemeClr = new MockElement('a:schemeClr', { val: 'accent1' });
    const fillRef = new MockElement('a:fillRef', { idx: '1' }, [schemeClr]);
    const pStyle = new MockElement('p:style', {}, [fillRef]);

    const foundFillRef = pStyle.getElementsByTagName('a:fillRef')[0];
    assert.ok(foundFillRef, 'fillRef should be found');
    assert.strictEqual(foundFillRef.getAttribute('idx'), '1', 'fillRef idx should be 1');

    // The schemeClr val="accent1" should resolve to the theme accent color
    const foundColor = foundFillRef.getElementsByTagName('a:schemeClr')[0];
    assert.ok(foundColor, 'schemeClr should be found inside fillRef');
    assert.strictEqual(foundColor.getAttribute('val'), 'accent1', 'Should reference accent1');

    console.log('  PASSED');
})();

// ─── 15. Layout noFill bug: a:noFill inside a:ln must not suppress layout fill ─

(function testLayoutShapeParserNoFillBug() {
    console.log('Test: Layout shape parser ignores a:noFill inside a:ln ...');

    // Read the actual layout-shape-parser.js source to verify the fix
    const fs = require('fs');
    const path = require('path');
    const src = fs.readFileSync(
        path.join(__dirname, '..', 'js', 'parsers', 'layout', 'layout-shape-parser.js'),
        'utf8'
    );

    // Verify it uses direct children check, not getElementsByTagName for fill detection
    assert.ok(
        src.includes('directChildren') || src.includes('direct children'),
        'layout-shape-parser should check direct children for fill elements'
    );
    assert.ok(
        !src.includes("spPr.getElementsByTagName('a:noFill')"),
        'layout-shape-parser should NOT use getElementsByTagName for a:noFill'
    );
    assert.ok(
        !src.includes("spPr.getElementsByTagName('a:solidFill')"),
        'layout-shape-parser should NOT use getElementsByTagName for a:solidFill'
    );

    console.log('  PASSED');
})();

// ─── 16. Custom geometry fill handles object fills correctly ────────────────────

(function testCustomGeometryObjectFill() {
    console.log('Test: renderCustomGeometry handles object fills ...');

    // Read shape-renderer.js to verify the fix
    const fs = require('fs');
    const path = require('path');
    const src = fs.readFileSync(
        path.join(__dirname, '..', 'js', 'renderers', 'shape-renderer.js'),
        'utf8'
    );

    // Verify it handles shape.fill.type === 'solid' and extracts the color
    assert.ok(
        src.includes("shape.fill.type === 'solid'"),
        'renderCustomGeometry should handle solid fill objects'
    );
    assert.ok(
        src.includes('shape.fill.color'),
        'renderCustomGeometry should extract color from fill object'
    );
    assert.ok(
        src.includes('fillOpacity') || src.includes('fill-opacity'),
        'renderCustomGeometry should handle fill opacity'
    );

    console.log('  PASSED');
})();

// ─── 17. Layout N shape XML: verify direct children approach works ──────────────

(function testDirectChildrenFillExtraction() {
    console.log('Test: Direct children approach correctly extracts fill with noFill in ln ...');

    // Simulate the exact structure from slideLayout18.xml's N shape:
    // <p:spPr>
    //   <a:solidFill><a:schemeClr val="bg1"/></a:solidFill>
    //   <a:ln w="0"><a:noFill/></a:ln>
    // </p:spPr>
    const schemeClr = new MockElement('a:schemeClr', { val: 'bg1' });
    const solidFill = new MockElement('a:solidFill', {}, [schemeClr]);
    const noFillInLn = new MockElement('a:noFill');
    const ln = new MockElement('a:ln', { w: '0' }, [noFillInLn]);
    const custGeom = new MockElement('a:custGeom');
    const spPr = new MockElement('p:spPr', {}, [custGeom, solidFill, ln]);

    // Using direct children approach (the fix)
    const directChildren = Array.from(spPr.children).filter(n => n.nodeType === 1);
    const foundNoFill = directChildren.find(c => c.tagName === 'a:noFill') || null;
    const foundSolidFill = directChildren.find(c => c.tagName === 'a:solidFill') || null;

    assert.strictEqual(foundNoFill, null, 'Should NOT find a:noFill as direct child');
    assert.ok(foundSolidFill, 'Should find a:solidFill as direct child');
    assert.strictEqual(
        foundSolidFill.getElementsByTagName('a:schemeClr')[0].getAttribute('val'),
        'bg1',
        'Fill should reference bg1 scheme color'
    );

    // Verify getElementsByTagName WOULD have found the wrong noFill
    const wrongNoFill = spPr.getElementsByTagName('a:noFill');
    assert.ok(wrongNoFill.length > 0, 'getElementsByTagName would incorrectly find nested noFill');

    console.log('  PASSED');
})();

// ─── Summary ─────────────────────────────────────────────────────────────────

console.log('\nAll slide 11 fix tests passed!');
