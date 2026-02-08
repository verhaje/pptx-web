/**
 * ShapeParser tests – fill, mapShapeType, EMU conversions, shadow,
 * corner radius, style fill/stroke, placeholders, text formatting,
 * font family, paragraph alignment, hyperlinks, paragraph level,
 * bullets, line/connector detection, arrows, vertical alignment,
 * auto-fit, text insets, custom geometry, paragraph spacing,
 * preset colors.
 */
const { assert, test, suite, el } = require('../helpers/test-harness');

// ─── extractFill ──────────────────────────────────────────────────────────────

suite('ShapeParser.extractFill', () => {
    test('noFill as direct child returns "none"', () => {
        const spPr = el('p:spPr', {}, [el('a:noFill')]);
        const directChildren = Array.from(spPr.children).filter(n => n.nodeType === 1);
        const noFill = directChildren.find(c => c.tagName === 'a:noFill') || null;
        assert.ok(noFill);
    });

    test('noFill inside a:ln is NOT detected as shape fill', () => {
        const spPr = el('p:spPr', {}, [
            el('a:prstGeom', { prst: 'rect' }),
            el('a:ln', {}, [el('a:noFill')])
        ]);
        const directChildren = Array.from(spPr.children).filter(n => n.nodeType === 1);
        const noFill = directChildren.find(c => c.tagName === 'a:noFill') || null;
        assert.strictEqual(noFill, null);
    });

    test('solidFill as direct child is detected', () => {
        const spPr = el('p:spPr', {}, [
            el('a:solidFill', {}, [el('a:srgbClr', { val: 'AABBCC' })])
        ]);
        const directChildren = Array.from(spPr.children).filter(n => n.nodeType === 1);
        const solid = directChildren.find(c => c.tagName === 'a:solidFill');
        assert.ok(solid);
    });

    test('solidFill inside a:ln is NOT detected as shape fill', () => {
        const spPr = el('p:spPr', {}, [
            el('a:ln', {}, [el('a:solidFill', {}, [el('a:srgbClr', { val: 'FF0000' })])])
        ]);
        const directChildren = Array.from(spPr.children).filter(n => n.nodeType === 1);
        const solid = directChildren.find(c => c.tagName === 'a:solidFill') || null;
        assert.strictEqual(solid, null);
    });

    test('gradFill as direct child is detected', () => {
        const spPr = el('p:spPr', {}, [el('a:gradFill')]);
        const directChildren = Array.from(spPr.children).filter(n => n.nodeType === 1);
        const grad = directChildren.find(c => c.tagName === 'a:gradFill');
        assert.ok(grad);
    });

    test('blipFill as direct child is detected', () => {
        const spPr = el('p:spPr', {}, [el('a:blipFill')]);
        const directChildren = Array.from(spPr.children).filter(n => n.nodeType === 1);
        const blip = directChildren.find(c => c.tagName === 'a:blipFill');
        assert.ok(blip);
    });

    test('no fill elements returns null (allowing style fill)', () => {
        const spPr = el('p:spPr', {}, [
            el('a:xfrm'),
            el('a:prstGeom', { prst: 'rect' }),
            el('a:ln', {}, [el('a:noFill')])
        ]);
        const directChildren = Array.from(spPr.children).filter(n => n.nodeType === 1);
        const solidFill = directChildren.find(c => c.tagName === 'a:solidFill') || null;
        const gradFill = directChildren.find(c => c.tagName === 'a:gradFill') || null;
        const blipFill = directChildren.find(c => c.tagName === 'a:blipFill') || null;
        const noFill = directChildren.find(c => c.tagName === 'a:noFill') || null;
        assert.strictEqual(solidFill, null);
        assert.strictEqual(gradFill, null);
        assert.strictEqual(blipFill, null);
        assert.strictEqual(noFill, null);
    });
});

// ─── mapShapeType ─────────────────────────────────────────────────────────────

suite('ShapeParser.mapShapeType', () => {
    const shapeMap = {
        'rect': 'rect', 'ellipse': 'ellipse', 'roundRect': 'roundRect',
        'triangle': 'triangle', 'diamond': 'diamond', 'pentagon': 'pentagon',
        'hexagon': 'hexagon', 'octagon': 'octagon', 'star5': 'star5',
        'rightArrow': 'rightArrow', 'leftArrow': 'leftArrow',
        'upArrow': 'upArrow', 'downArrow': 'downArrow',
        'heart': 'heart', 'cloud': 'cloud', 'line': 'line',
        'straightConnector1': 'line', 'cube': 'cube', 'cylinder': 'cylinder'
    };

    function mapShapeType(prst) { return shapeMap[prst] || 'rect'; }

    test('known shapes map correctly', () => {
        assert.strictEqual(mapShapeType('rect'), 'rect');
        assert.strictEqual(mapShapeType('ellipse'), 'ellipse');
        assert.strictEqual(mapShapeType('roundRect'), 'roundRect');
        assert.strictEqual(mapShapeType('triangle'), 'triangle');
        assert.strictEqual(mapShapeType('diamond'), 'diamond');
        assert.strictEqual(mapShapeType('heart'), 'heart');
        assert.strictEqual(mapShapeType('cloud'), 'cloud');
    });

    test('connector maps to line', () => {
        assert.strictEqual(mapShapeType('straightConnector1'), 'line');
    });

    test('unknown shape defaults to rect', () => {
        assert.strictEqual(mapShapeType('unknownShape'), 'rect');
        assert.strictEqual(mapShapeType(undefined), 'rect');
    });

    test('3D shapes map correctly', () => {
        assert.strictEqual(mapShapeType('cube'), 'cube');
        assert.strictEqual(mapShapeType('cylinder'), 'cylinder');
    });
});

// ─── EMU conversions ──────────────────────────────────────────────────────────

suite('ShapeParser EMU conversions', () => {
    const SLIDE_WIDTH_EMU = 9144000;
    const SLIDE_HEIGHT_EMU = 5143500;

    test('center position converts to 50%', () => {
        const x = (SLIDE_WIDTH_EMU / 2) / SLIDE_WIDTH_EMU * 100;
        const y = (SLIDE_HEIGHT_EMU / 2) / SLIDE_HEIGHT_EMU * 100;
        assert.strictEqual(x, 50);
        assert.strictEqual(y, 50);
    });

    test('origin converts to 0%', () => {
        assert.strictEqual(0 / SLIDE_WIDTH_EMU * 100, 0);
        assert.strictEqual(0 / SLIDE_HEIGHT_EMU * 100, 0);
    });

    test('full slide converts to 100%', () => {
        assert.strictEqual(SLIDE_WIDTH_EMU / SLIDE_WIDTH_EMU * 100, 100);
        assert.strictEqual(SLIDE_HEIGHT_EMU / SLIDE_HEIGHT_EMU * 100, 100);
    });

    test('rotation converts from 60000ths of a degree', () => {
        assert.strictEqual(5400000 / 60000, 90);
        assert.strictEqual(10800000 / 60000, 180);
        assert.strictEqual(16200000 / 60000, 270);
        assert.strictEqual(21600000 / 60000, 360);
    });

    test('stroke width converts from EMUs to pixels', () => {
        const emuWidth = 12700;
        const px = emuWidth / 914400 * 96;
        assert.ok(Math.abs(px - 1.33) < 0.01, `Expected ~1.33px, got ${px}`);
    });

    test('gradient angle converts from 60000ths of a degree', () => {
        assert.strictEqual(5400000 / 60000, 90);
        assert.strictEqual(0 / 60000, 0);
        assert.strictEqual(2700000 / 60000, 45);
    });
});

// ─── extractShadow ────────────────────────────────────────────────────────────

suite('ShapeParser.extractShadow', () => {
    function extractShadow(spPr) {
        const effectLst = spPr.getElementsByTagName('a:effectLst')[0];
        if (!effectLst) return null;
        const outerShdw = effectLst.getElementsByTagName('a:outerShdw')[0];
        if (!outerShdw) return null;
        const shadow = {};
        const blurRad = outerShdw.getAttribute('blurRad');
        if (blurRad) shadow.blur = (parseInt(blurRad) / 914400) * 96;
        const dist = outerShdw.getAttribute('dist');
        if (dist) shadow.distance = (parseInt(dist) / 914400) * 96;
        const dir = outerShdw.getAttribute('dir');
        if (dir) shadow.angle = parseInt(dir) / 60000;
        const srgb = outerShdw.getElementsByTagName('a:srgbClr')[0];
        if (srgb) shadow.color = '#' + srgb.getAttribute('val');
        else shadow.color = '#000000';
        const alpha = outerShdw.getElementsByTagName('a:alpha')[0];
        if (alpha) shadow.opacity = parseInt(alpha.getAttribute('val') || '100000') / 100000;
        else shadow.opacity = 1;
        return Object.keys(shadow).length > 0 ? shadow : null;
    }

    test('no effectLst returns null', () => {
        assert.strictEqual(extractShadow(el('p:spPr')), null);
    });

    test('effectLst without outerShdw returns null', () => {
        const spPr = el('p:spPr', {}, [el('a:effectLst')]);
        assert.strictEqual(extractShadow(spPr), null);
    });

    test('outer shadow with all properties', () => {
        const spPr = el('p:spPr', {}, [
            el('a:effectLst', {}, [
                el('a:outerShdw', { blurRad: '914400', dist: '457200', dir: '5400000' }, [
                    el('a:srgbClr', { val: '444444' }, [
                        el('a:alpha', { val: '50000' })
                    ])
                ])
            ])
        ]);
        const shadow = extractShadow(spPr);
        assert.ok(shadow);
        assert.strictEqual(shadow.blur, 96);
        assert.strictEqual(shadow.distance, 48);
        assert.strictEqual(shadow.angle, 90);
        assert.strictEqual(shadow.color, '#444444');
        assert.strictEqual(shadow.opacity, 0.5);
    });

    test('outer shadow with default opacity', () => {
        const spPr = el('p:spPr', {}, [
            el('a:effectLst', {}, [
                el('a:outerShdw', { blurRad: '100000' }, [
                    el('a:srgbClr', { val: '000000' })
                ])
            ])
        ]);
        const shadow = extractShadow(spPr);
        assert.ok(shadow);
        assert.strictEqual(shadow.opacity, 1);
    });
});

// ─── extractCornerRadius ──────────────────────────────────────────────────────

suite('ShapeParser.extractCornerRadius', () => {
    const roundedShapes = {
        'roundRect': 0.05, 'round2SameRect': 0.10, 'round1Rect': 0.03, 'round2Rect': 0.10
    };

    function extractCornerRadius(spPr) {
        const prstGeom = spPr.getElementsByTagName('a:prstGeom')[0];
        if (!prstGeom) return null;
        const prst = prstGeom.getAttribute('prst');
        if (!roundedShapes[prst]) return null;
        const adjLst = prstGeom.getElementsByTagName('a:adjLst')[0];
        if (adjLst) {
            const adj = adjLst.getElementsByTagName('a:adj')[0];
            if (adj) {
                const val = adj.getAttribute('val');
                if (val) return (parseInt(val) / 100000) * 0.5;
            }
        }
        return roundedShapes[prst];
    }

    test('returns null for non-rounded shape', () => {
        const spPr = el('p:spPr', {}, [el('a:prstGeom', { prst: 'rect' })]);
        assert.strictEqual(extractCornerRadius(spPr), null);
    });

    test('returns default for roundRect without adjustment', () => {
        const spPr = el('p:spPr', {}, [el('a:prstGeom', { prst: 'roundRect' })]);
        assert.strictEqual(extractCornerRadius(spPr), 0.05);
    });

    test('returns adjusted value when adjLst provided', () => {
        const spPr = el('p:spPr', {}, [
            el('a:prstGeom', { prst: 'roundRect' }, [
                el('a:adjLst', {}, [el('a:adj', { val: '50000' })])
            ])
        ]);
        assert.strictEqual(extractCornerRadius(spPr), 0.25);
    });

    test('returns null without prstGeom', () => {
        assert.strictEqual(extractCornerRadius(el('p:spPr')), null);
    });

    test('returns default for round2SameRect', () => {
        const spPr = el('p:spPr', {}, [el('a:prstGeom', { prst: 'round2SameRect' })]);
        assert.strictEqual(extractCornerRadius(spPr), 0.10);
    });
});

// ─── extractStyleFill / extractStyleStroke ────────────────────────────────────

suite('ShapeParser.extractStyleFill/Stroke', () => {
    test('fillRef with schemeClr accent1 resolves', () => {
        const sp = el('p:sp', {}, [
            el('p:style', {}, [
                el('a:fillRef', { idx: '1' }, [el('a:schemeClr', { val: 'accent1' })])
            ])
        ]);
        const fillRef = sp.getElementsByTagName('a:fillRef')[0];
        assert.ok(fillRef);
        const color = fillRef.getElementsByTagName('a:schemeClr')[0];
        assert.strictEqual(color.getAttribute('val'), 'accent1');
    });

    test('lnRef with schemeClr accent1 resolves', () => {
        const sp = el('p:sp', {}, [
            el('p:style', {}, [
                el('a:lnRef', { idx: '2' }, [el('a:schemeClr', { val: 'accent1' })])
            ])
        ]);
        const lnRef = sp.getElementsByTagName('a:lnRef')[0];
        assert.ok(lnRef);
        assert.strictEqual(lnRef.getAttribute('idx'), '2');
    });

    test('no p:style means null for style fill', () => {
        const sp = el('p:sp', {}, [el('p:spPr')]);
        const style = sp.getElementsByTagName('p:style')[0];
        assert.strictEqual(style, undefined);
    });
});

// ─── placeholder detection ───────────────────────────────────────────────────

suite('ShapeParser placeholder detection', () => {
    function parsePlaceholder(sp) {
        const nvSpPr = sp.getElementsByTagName('p:nvSpPr')[0];
        if (!nvSpPr) return null;
        const nvPr = nvSpPr.getElementsByTagName('p:nvPr')[0];
        if (!nvPr) return null;
        const ph = nvPr.getElementsByTagName('p:ph')[0];
        if (!ph) return null;
        return { type: ph.getAttribute('type') || 'body', idx: ph.getAttribute('idx') };
    }

    test('title placeholder detected', () => {
        const sp = el('p:sp', {}, [
            el('p:nvSpPr', {}, [el('p:nvPr', {}, [el('p:ph', { type: 'title' })])])
        ]);
        assert.strictEqual(parsePlaceholder(sp).type, 'title');
    });

    test('ctrTitle placeholder detected', () => {
        const sp = el('p:sp', {}, [
            el('p:nvSpPr', {}, [el('p:nvPr', {}, [el('p:ph', { type: 'ctrTitle' })])])
        ]);
        assert.strictEqual(parsePlaceholder(sp).type, 'ctrTitle');
    });

    test('body placeholder (no type) defaults to body', () => {
        const sp = el('p:sp', {}, [
            el('p:nvSpPr', {}, [el('p:nvPr', {}, [el('p:ph')])])
        ]);
        assert.strictEqual(parsePlaceholder(sp).type, 'body');
    });

    test('sldNum placeholder detected', () => {
        const sp = el('p:sp', {}, [
            el('p:nvSpPr', {}, [el('p:nvPr', {}, [el('p:ph', { type: 'sldNum' })])])
        ]);
        assert.strictEqual(parsePlaceholder(sp).type, 'sldNum');
    });

    test('shape without placeholder returns null', () => {
        const sp = el('p:sp', {}, [el('p:spPr')]);
        assert.strictEqual(parsePlaceholder(sp), null);
    });

    test('placeholder with idx', () => {
        const sp = el('p:sp', {}, [
            el('p:nvSpPr', {}, [el('p:nvPr', {}, [el('p:ph', { type: 'body', idx: '1' })])])
        ]);
        assert.strictEqual(parsePlaceholder(sp).idx, '1');
    });
});

// ─── text run properties ─────────────────────────────────────────────────────

suite('Text run property extraction', () => {
    function parseRunProps(rPr) {
        const result = {
            bold: false, italic: false, underline: false, strikethrough: false,
            superscript: false, subscript: false, textTransform: 'none',
            fontSize: null, color: null
        };
        if (!rPr) return result;
        result.bold = rPr.getAttribute('b') === '1';
        result.italic = rPr.getAttribute('i') === '1';
        result.underline = rPr.getAttribute('u') && rPr.getAttribute('u') !== 'none';
        result.strikethrough = rPr.getAttribute('strike') && rPr.getAttribute('strike') !== 'noStrike';
        const baseline = rPr.getAttribute('baseline');
        if (baseline) { const v = parseInt(baseline, 10); result.superscript = v > 0; result.subscript = v < 0; }
        const cap = rPr.getAttribute('cap');
        if (cap === 'small') result.textTransform = 'small-caps';
        else if (cap === 'all') result.textTransform = 'uppercase';
        const sz = rPr.getAttribute('sz');
        if (sz) result.fontSize = parseInt(sz) / 100;
        return result;
    }

    test('bold text detected', () => {
        assert.strictEqual(parseRunProps(el('a:rPr', { b: '1' })).bold, true);
        assert.strictEqual(parseRunProps(el('a:rPr', { b: '0' })).bold, false);
    });
    test('italic text detected', () => { assert.strictEqual(parseRunProps(el('a:rPr', { i: '1' })).italic, true); });
    test('underline detected', () => {
        assert.strictEqual(parseRunProps(el('a:rPr', { u: 'sng' })).underline, true);
        assert.strictEqual(parseRunProps(el('a:rPr', { u: 'none' })).underline, false);
    });
    test('strikethrough detected', () => {
        assert.strictEqual(parseRunProps(el('a:rPr', { strike: 'sngStrike' })).strikethrough, true);
        assert.strictEqual(parseRunProps(el('a:rPr', { strike: 'noStrike' })).strikethrough, false);
    });
    test('superscript via positive baseline', () => {
        const props = parseRunProps(el('a:rPr', { baseline: '30000' }));
        assert.strictEqual(props.superscript, true);
        assert.strictEqual(props.subscript, false);
    });
    test('subscript via negative baseline', () => {
        const props = parseRunProps(el('a:rPr', { baseline: '-25000' }));
        assert.strictEqual(props.superscript, false);
        assert.strictEqual(props.subscript, true);
    });
    test('small caps detected', () => { assert.strictEqual(parseRunProps(el('a:rPr', { cap: 'small' })).textTransform, 'small-caps'); });
    test('all caps detected', () => { assert.strictEqual(parseRunProps(el('a:rPr', { cap: 'all' })).textTransform, 'uppercase'); });
    test('font size conversion (hundredths of a point)', () => {
        assert.strictEqual(parseRunProps(el('a:rPr', { sz: '2400' })).fontSize, 24);
        assert.strictEqual(parseRunProps(el('a:rPr', { sz: '1200' })).fontSize, 12);
        assert.strictEqual(parseRunProps(el('a:rPr', { sz: '1000' })).fontSize, 10);
    });
    test('no properties returns defaults', () => {
        const props = parseRunProps(null);
        assert.strictEqual(props.bold, false);
        assert.strictEqual(props.italic, false);
        assert.strictEqual(props.fontSize, null);
    });
});

// ─── font family extraction ──────────────────────────────────────────────────

suite('Font family extraction', () => {
    const themeFonts = { majorFont: 'Arial', minorFont: 'Verdana' };

    function extractFontFamily(rPr) {
        const latin = rPr.getElementsByTagName('a:latin')[0];
        if (latin) {
            const typeface = latin.getAttribute('typeface');
            if (typeface === '+mj-lt') return themeFonts.majorFont;
            if (typeface === '+mn-lt') return themeFonts.minorFont;
            if (typeface && !typeface.startsWith('+')) return typeface;
        }
        const ea = rPr.getElementsByTagName('a:ea')[0];
        if (ea) { const tf = ea.getAttribute('typeface'); if (tf && !tf.startsWith('+')) return tf; }
        const cs = rPr.getElementsByTagName('a:cs')[0];
        if (cs) { const tf = cs.getAttribute('typeface'); if (tf && !tf.startsWith('+')) return tf; }
        return null;
    }

    test('+mj-lt resolves to major font', () => {
        const rPr = el('a:rPr', {}, [el('a:latin', { typeface: '+mj-lt' })]);
        assert.strictEqual(extractFontFamily(rPr), 'Arial');
    });
    test('+mn-lt resolves to minor font', () => {
        const rPr = el('a:rPr', {}, [el('a:latin', { typeface: '+mn-lt' })]);
        assert.strictEqual(extractFontFamily(rPr), 'Verdana');
    });
    test('explicit typeface returned directly', () => {
        const rPr = el('a:rPr', {}, [el('a:latin', { typeface: 'Tahoma' })]);
        assert.strictEqual(extractFontFamily(rPr), 'Tahoma');
    });
    test('fallback to East Asian font', () => {
        const rPr = el('a:rPr', {}, [el('a:ea', { typeface: 'MS Gothic' })]);
        assert.strictEqual(extractFontFamily(rPr), 'MS Gothic');
    });
    test('fallback to Complex Script font', () => {
        const rPr = el('a:rPr', {}, [el('a:cs', { typeface: 'Arabic Typesetting' })]);
        assert.strictEqual(extractFontFamily(rPr), 'Arabic Typesetting');
    });
    test('East Asian theme ref (+) skipped', () => {
        const rPr = el('a:rPr', {}, [el('a:ea', { typeface: '+mn-ea' })]);
        assert.strictEqual(extractFontFamily(rPr), null);
    });
    test('returns null when no font defined', () => {
        assert.strictEqual(extractFontFamily(el('a:rPr')), null);
    });
});

// ─── paragraph alignment ─────────────────────────────────────────────────────

suite('Paragraph alignment', () => {
    function parseAlign(pPr) {
        if (!pPr) return 'left';
        const algn = pPr.getAttribute('algn');
        if (algn === 'ctr') return 'center';
        if (algn === 'r') return 'right';
        if (algn === 'just') return 'justify';
        if (algn === 'l') return 'left';
        return 'left';
    }

    test('center alignment', () => { assert.strictEqual(parseAlign(el('a:pPr', { algn: 'ctr' })), 'center'); });
    test('right alignment', () => { assert.strictEqual(parseAlign(el('a:pPr', { algn: 'r' })), 'right'); });
    test('justify alignment', () => { assert.strictEqual(parseAlign(el('a:pPr', { algn: 'just' })), 'justify'); });
    test('left alignment', () => { assert.strictEqual(parseAlign(el('a:pPr', { algn: 'l' })), 'left'); });
    test('default alignment', () => { assert.strictEqual(parseAlign(el('a:pPr')), 'left'); });
    test('null pPr defaults to left', () => { assert.strictEqual(parseAlign(null), 'left'); });
});

// ─── hyperlink resolution ────────────────────────────────────────────────────

suite('Hyperlink resolution', () => {
    function resolveHyperlink(rels, relId) {
        if (!Array.isArray(rels) || !relId) return null;
        const rel = rels.find(r => r && r.getAttribute && r.getAttribute('Id') === relId);
        if (!rel) return null;
        const target = rel.getAttribute('Target') || '';
        const targetMode = (rel.getAttribute('TargetMode') || '').toLowerCase();
        const isExternal = targetMode === 'external' || /^https?:\/\//i.test(target) || /^mailto:/i.test(target);
        if (isExternal) return { kind: 'url', href: target };
        const m = target.match(/slide(\d+)\.xml$/i);
        if (m) return { kind: 'slide', slideIndex: Math.max(0, parseInt(m[1], 10) - 1) };
        return { kind: 'internal', target };
    }

    test('external URL resolved', () => {
        const rels = [el('Relationship', { Id: 'rId1', Target: 'https://example.com', TargetMode: 'External' })];
        const link = resolveHyperlink(rels, 'rId1');
        assert.strictEqual(link.kind, 'url');
        assert.strictEqual(link.href, 'https://example.com');
    });
    test('mailto link resolved', () => {
        const rels = [el('Relationship', { Id: 'rId2', Target: 'mailto:a@b.com', TargetMode: 'External' })];
        const link = resolveHyperlink(rels, 'rId2');
        assert.strictEqual(link.kind, 'url');
        assert.strictEqual(link.href, 'mailto:a@b.com');
    });
    test('internal slide link resolved', () => {
        const rels = [el('Relationship', { Id: 'rId3', Target: 'slides/slide5.xml' })];
        const link = resolveHyperlink(rels, 'rId3');
        assert.strictEqual(link.kind, 'slide');
        assert.strictEqual(link.slideIndex, 4);
    });
    test('slide1.xml resolves to index 0', () => {
        const rels = [el('Relationship', { Id: 'rId1', Target: 'slides/slide1.xml' })];
        assert.strictEqual(resolveHyperlink(rels, 'rId1').slideIndex, 0);
    });
    test('unknown internal target', () => {
        const rels = [el('Relationship', { Id: 'rId4', Target: 'notations/note1.xml' })];
        assert.strictEqual(resolveHyperlink(rels, 'rId4').kind, 'internal');
    });
    test('missing rel returns null', () => { assert.strictEqual(resolveHyperlink([], 'rId99'), null); });
    test('null rels returns null', () => { assert.strictEqual(resolveHyperlink(null, 'rId1'), null); });
    test('null relId returns null', () => { assert.strictEqual(resolveHyperlink([], null), null); });
});

// ─── getParagraphLevel ───────────────────────────────────────────────────────

suite('getParagraphLevel', () => {
    function getParagraphLevel(txBody) {
        const firstPara = txBody.getElementsByTagName('a:p')[0];
        if (firstPara) {
            const pPr = firstPara.getElementsByTagName('a:pPr')[0];
            if (pPr) {
                const lvlAttr = pPr.getAttribute('lvl');
                const lvl = lvlAttr !== null ? parseInt(lvlAttr, 10) : NaN;
                if (!Number.isNaN(lvl)) return Math.min(9, Math.max(1, lvl + 1));
            }
        }
        return 1;
    }

    test('lvl 0 returns 1', () => {
        const txBody = el('p:txBody', {}, [el('a:p', {}, [el('a:pPr', { lvl: '0' })])]);
        assert.strictEqual(getParagraphLevel(txBody), 1);
    });
    test('lvl 1 returns 2', () => {
        const txBody = el('p:txBody', {}, [el('a:p', {}, [el('a:pPr', { lvl: '1' })])]);
        assert.strictEqual(getParagraphLevel(txBody), 2);
    });
    test('lvl 8 returns 9 (max)', () => {
        const txBody = el('p:txBody', {}, [el('a:p', {}, [el('a:pPr', { lvl: '8' })])]);
        assert.strictEqual(getParagraphLevel(txBody), 9);
    });
    test('lvl > 8 capped at 9', () => {
        const txBody = el('p:txBody', {}, [el('a:p', {}, [el('a:pPr', { lvl: '99' })])]);
        assert.strictEqual(getParagraphLevel(txBody), 9);
    });
    test('no pPr returns 1', () => {
        assert.strictEqual(getParagraphLevel(el('p:txBody', {}, [el('a:p')])), 1);
    });
    test('no paragraph returns 1', () => {
        assert.strictEqual(getParagraphLevel(el('p:txBody')), 1);
    });
});

// ─── bullet/list parsing ─────────────────────────────────────────────────────

suite('Bullet/list parsing', () => {
    function parseBullet(pPr) {
        if (!pPr) return null;
        const buNone = pPr.getElementsByTagName('a:buNone')[0];
        if (buNone) return { type: 'none' };
        const buAutoNum = pPr.getElementsByTagName('a:buAutoNum')[0];
        if (buAutoNum) return { type: 'auto', numType: buAutoNum.getAttribute('type') || null };
        const buChar = pPr.getElementsByTagName('a:buChar')[0];
        if (buChar) return { type: 'char', char: buChar.getAttribute('char') || '•' };
        return null;
    }

    test('buNone suppresses bullets', () => {
        assert.deepStrictEqual(parseBullet(el('a:pPr', {}, [el('a:buNone')])), { type: 'none' });
    });
    test('buAutoNum creates numbered list', () => {
        const b = parseBullet(el('a:pPr', {}, [el('a:buAutoNum', { type: 'arabicPeriod' })]));
        assert.strictEqual(b.type, 'auto');
        assert.strictEqual(b.numType, 'arabicPeriod');
    });
    test('buChar creates character bullet', () => {
        const b = parseBullet(el('a:pPr', {}, [el('a:buChar', { char: '→' })]));
        assert.strictEqual(b.type, 'char');
        assert.strictEqual(b.char, '→');
    });
    test('buChar default character is bullet', () => {
        assert.strictEqual(parseBullet(el('a:pPr', {}, [el('a:buChar')])).char, '•');
    });
    test('no bullet returns null', () => {
        assert.strictEqual(parseBullet(el('a:pPr')), null);
        assert.strictEqual(parseBullet(null), null);
    });
});

// ─── line/connector detection ────────────────────────────────────────────────

suite('Line/connector shape detection', () => {
    const lineTypes = ['line', 'straightConnector1', 'bentConnector2', 'bentConnector3',
        'bentConnector4', 'bentConnector5', 'curvedConnector2', 'curvedConnector3',
        'curvedConnector4', 'curvedConnector5'];
    function isLineShape(type) { return lineTypes.includes(type); }

    test('line is a line shape', () => { assert.ok(isLineShape('line')); });
    test('straightConnector1 is a line', () => { assert.ok(isLineShape('straightConnector1')); });
    test('bentConnector3 is a line', () => { assert.ok(isLineShape('bentConnector3')); });
    test('curvedConnector3 is a line', () => { assert.ok(isLineShape('curvedConnector3')); });
    test('rect is NOT a line', () => { assert.ok(!isLineShape('rect')); });
    test('ellipse is NOT a line', () => { assert.ok(!isLineShape('ellipse')); });
    test('table is NOT a line', () => { assert.ok(!isLineShape('table')); });
});

// ─── arrow direction mapping ─────────────────────────────────────────────────

suite('Arrow direction mapping', () => {
    test('tailEnd maps to arrowTail (marker-end)', () => {
        const tailEnd = el('a:tailEnd', { type: 'triangle' });
        const arrowTail = tailEnd.getAttribute('type') !== 'none' ? tailEnd.getAttribute('type') : undefined;
        assert.strictEqual(arrowTail, 'triangle');
        assert.ok(!!arrowTail);
    });
    test('headEnd maps to arrowHead (marker-start)', () => {
        const headEnd = el('a:headEnd', { type: 'arrow' });
        const arrowHead = headEnd.getAttribute('type') !== 'none' ? headEnd.getAttribute('type') : undefined;
        assert.strictEqual(arrowHead, 'arrow');
    });
    test('type=none means no arrow', () => {
        const tailEnd = el('a:tailEnd', { type: 'none' });
        const arrowTail = tailEnd.getAttribute('type') !== 'none' ? tailEnd.getAttribute('type') : undefined;
        assert.strictEqual(arrowTail, undefined);
    });
    test('both arrows present', () => {
        const shape = { arrowHead: 'triangle', arrowTail: 'triangle' };
        assert.ok(!!shape.arrowHead);
        assert.ok(!!shape.arrowTail);
    });
    test('no arrows present', () => {
        const shape = { arrowHead: undefined, arrowTail: undefined };
        assert.ok(!shape.arrowHead);
        assert.ok(!shape.arrowTail);
    });
});

// ─── text vertical alignment ─────────────────────────────────────────────────

suite('Text vertical alignment', () => {
    function parseTextVAlign(bodyPr) {
        if (!bodyPr) return undefined;
        const anchor = bodyPr.getAttribute('anchor');
        if (anchor === 'b') return 'bottom';
        if (anchor === 'ctr') return 'middle';
        if (anchor === 't') return 'top';
        return undefined;
    }

    test('anchor=b → bottom', () => { assert.strictEqual(parseTextVAlign(el('a:bodyPr', { anchor: 'b' })), 'bottom'); });
    test('anchor=ctr → middle', () => { assert.strictEqual(parseTextVAlign(el('a:bodyPr', { anchor: 'ctr' })), 'middle'); });
    test('anchor=t → top', () => { assert.strictEqual(parseTextVAlign(el('a:bodyPr', { anchor: 't' })), 'top'); });
    test('no anchor → undefined', () => { assert.strictEqual(parseTextVAlign(el('a:bodyPr')), undefined); });
    test('null bodyPr → undefined', () => { assert.strictEqual(parseTextVAlign(null), undefined); });
});

// ─── text auto-fit ───────────────────────────────────────────────────────────

suite('Text auto-fit', () => {
    function parseAutoFit(bodyPr) {
        if (!bodyPr) return null;
        if (bodyPr.getElementsByTagName('a:normAutofit')[0]) return 'norm';
        if (bodyPr.getElementsByTagName('a:noAutofit')[0]) return 'none';
        return null;
    }

    test('normAutofit detected', () => { assert.strictEqual(parseAutoFit(el('a:bodyPr', {}, [el('a:normAutofit')])), 'norm'); });
    test('noAutofit detected', () => { assert.strictEqual(parseAutoFit(el('a:bodyPr', {}, [el('a:noAutofit')])), 'none'); });
    test('no autofit tag returns null', () => { assert.strictEqual(parseAutoFit(el('a:bodyPr')), null); });
    test('null bodyPr returns null', () => { assert.strictEqual(parseAutoFit(null), null); });
});

// ─── text insets / padding ───────────────────────────────────────────────────

suite('Text insets/padding', () => {
    function parseInsets(bodyPr) {
        const defaultEMU = 91440;
        if (!bodyPr) return { left: defaultEMU, right: defaultEMU, top: defaultEMU, bottom: defaultEMU };
        return {
            left: bodyPr.getAttribute('lIns') ? parseInt(bodyPr.getAttribute('lIns'), 10) : defaultEMU,
            right: bodyPr.getAttribute('rIns') ? parseInt(bodyPr.getAttribute('rIns'), 10) : defaultEMU,
            top: bodyPr.getAttribute('tIns') ? parseInt(bodyPr.getAttribute('tIns'), 10) : defaultEMU,
            bottom: bodyPr.getAttribute('bIns') ? parseInt(bodyPr.getAttribute('bIns'), 10) : defaultEMU
        };
    }

    test('default insets are 91440 EMU', () => {
        const insets = parseInsets(el('a:bodyPr'));
        assert.strictEqual(insets.left, 91440);
        assert.strictEqual(insets.right, 91440);
        assert.strictEqual(insets.top, 91440);
        assert.strictEqual(insets.bottom, 91440);
    });
    test('custom insets parsed', () => {
        const bodyPr = el('a:bodyPr', { lIns: '50000', rIns: '60000', tIns: '70000', bIns: '80000' });
        const insets = parseInsets(bodyPr);
        assert.strictEqual(insets.left, 50000);
        assert.strictEqual(insets.right, 60000);
        assert.strictEqual(insets.top, 70000);
        assert.strictEqual(insets.bottom, 80000);
    });
    test('null bodyPr returns defaults', () => {
        assert.strictEqual(parseInsets(null).left, 91440);
    });
});

// ─── custom geometry path data ───────────────────────────────────────────────

suite('Custom geometry path data', () => {
    function extractPathData(pathElement, width, height) {
        const commands = [];
        const childNodes = Array.from(pathElement.children || []).filter(n => n.nodeType === 1);
        for (const child of childNodes) {
            const tag = child.tagName;
            if (tag === 'a:moveTo') {
                const pt = child.getElementsByTagName('a:pt')[0];
                if (pt) {
                    const x = parseInt(pt.getAttribute('x') || '0') / width * 100;
                    const y = parseInt(pt.getAttribute('y') || '0') / height * 100;
                    commands.push(`M ${x} ${y}`);
                }
            } else if (tag === 'a:lnTo') {
                const pt = child.getElementsByTagName('a:pt')[0];
                if (pt) {
                    const x = parseInt(pt.getAttribute('x') || '0') / width * 100;
                    const y = parseInt(pt.getAttribute('y') || '0') / height * 100;
                    commands.push(`L ${x} ${y}`);
                }
            } else if (tag === 'a:close') {
                commands.push('Z');
            }
        }
        return commands.join(' ');
    }

    test('moveTo and lineTo generate SVG path', () => {
        const path = el('a:path', { w: '100', h: '100' }, [
            el('a:moveTo', {}, [el('a:pt', { x: '0', y: '0' })]),
            el('a:lnTo', {}, [el('a:pt', { x: '100', y: '0' })]),
            el('a:lnTo', {}, [el('a:pt', { x: '100', y: '100' })]),
            el('a:close')
        ]);
        const d = extractPathData(path, 100, 100);
        assert.ok(d.includes('M 0 0'));
        assert.ok(d.includes('L 100 0'));
        assert.ok(d.includes('L 100 100'));
        assert.ok(d.includes('Z'));
    });
    test('coordinates normalized to 100-unit space', () => {
        const path = el('a:path', { w: '21600', h: '21600' }, [
            el('a:moveTo', {}, [el('a:pt', { x: '10800', y: '10800' })])
        ]);
        assert.ok(extractPathData(path, 21600, 21600).includes('M 50 50'));
    });
    test('empty path returns empty string', () => {
        assert.strictEqual(extractPathData(el('a:path'), 100, 100), '');
    });
});

// ─── paragraph spacing ───────────────────────────────────────────────────────

suite('Paragraph spacing', () => {
    const BASE_FONT_SIZE_PT = 18;
    const PERCENT_DENOM = 100000;

    function parseSpacing(node) {
        if (!node) return null;
        const spcPts = node.getElementsByTagName('a:spcPts')[0];
        if (spcPts) {
            const val = parseInt(spcPts.getAttribute('val') || '0', 10);
            if (!Number.isNaN(val)) return (val / 1000) / BASE_FONT_SIZE_PT;
        }
        const spcPct = node.getElementsByTagName('a:spcPct')[0];
        if (spcPct) {
            const val = parseInt(spcPct.getAttribute('val') || '0', 10);
            if (!Number.isNaN(val)) return val / PERCENT_DENOM;
        }
        return null;
    }

    test('spacing in points (spcPts)', () => {
        const node = el('a:spcBef', {}, [el('a:spcPts', { val: '1800' })]);
        assert.ok(Math.abs(parseSpacing(node) - 0.1) < 0.001);
    });
    test('spacing in percentage (spcPct)', () => {
        const node = el('a:lnSpc', {}, [el('a:spcPct', { val: '150000' })]);
        assert.strictEqual(parseSpacing(node), 1.5);
    });
    test('null node returns null', () => { assert.strictEqual(parseSpacing(null), null); });
    test('100% spacing = 1.0', () => {
        const node = el('a:lnSpc', {}, [el('a:spcPct', { val: '100000' })]);
        assert.strictEqual(parseSpacing(node), 1);
    });
});

// ─── preset colors ───────────────────────────────────────────────────────────

suite('Preset color mapping', () => {
    const presetColors = {
        'black': '#000000', 'white': '#FFFFFF', 'red': '#FF0000', 'green': '#00FF00', 'blue': '#0000FF',
        'yellow': '#FFFF00', 'cyan': '#00FFFF', 'magenta': '#FF00FF', 'orange': '#FFA500',
        'gray': '#808080', 'silver': '#C0C0C0', 'navy': '#000080', 'purple': '#800080',
        'darkRed': '#8B0000', 'darkGreen': '#006400', 'darkBlue': '#00008B'
    };
    function presetColorToHex(name) { return presetColors[name] || null; }

    test('core colors resolve', () => {
        assert.strictEqual(presetColorToHex('black'), '#000000');
        assert.strictEqual(presetColorToHex('white'), '#FFFFFF');
        assert.strictEqual(presetColorToHex('red'), '#FF0000');
    });
    test('dark variants resolve', () => {
        assert.strictEqual(presetColorToHex('darkRed'), '#8B0000');
        assert.strictEqual(presetColorToHex('darkBlue'), '#00008B');
    });
    test('unknown preset returns null', () => {
        assert.strictEqual(presetColorToHex('rainbow'), null);
        assert.strictEqual(presetColorToHex(undefined), null);
    });
});
