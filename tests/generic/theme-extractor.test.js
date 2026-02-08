/**
 * ThemeExtractor tests
 */
const { assert, test, suite, el } = require('../helpers/test-harness');

// Inline a minimal ThemeExtractor for unit testing (no window dependency)
class ThemeExtractor {
    constructor() {
        this.themeColors = {};
        this.themeFonts = { majorFont: 'Calibri Light', minorFont: 'Calibri' };
        this.defaultThemeColors = {
            dk1: '#000000', lt1: '#FFFFFF', dk2: '#1F497D', lt2: '#EEECE1',
            accent1: '#5B9BD5', accent2: '#ED7D31', accent3: '#A5A5A5',
            accent4: '#FFC000', accent5: '#4472C4', accent6: '#70AD47',
            hlink: '#0563C1', folHlink: '#954F72'
        };
        this.fillStyleNodes = [];
        this.bgFillStyleNodes = [];
        this.themeRelationships = [];
    }
    setThemeRelationships(rels) { this.themeRelationships = Array.isArray(rels) ? rels : []; }
    getThemeRelationshipTarget(relId) {
        if (!relId) return null;
        const rel = this.themeRelationships.find(r => r && r.id === relId);
        return rel && typeof rel.target === 'string' ? rel.target : null;
    }
    resolveThemeImageUrl(relId, images) {
        const target = this.getThemeRelationshipTarget(relId);
        if (!target || !images) return null;
        const imageName = target.split('/').pop();
        return imageName ? (images[imageName] || null) : null;
    }
    extractColorScheme(doc) {
        const colorScheme = doc.getElementsByTagName('a:clrScheme')[0];
        if (!colorScheme) return;
        for (const name of ['dk1','lt1','dk2','lt2','accent1','accent2','accent3','accent4','accent5','accent6','hlink','folHlink']) {
            const colorEl = colorScheme.getElementsByTagName('a:' + name)[0];
            if (colorEl) {
                const srgb = colorEl.getElementsByTagName('a:srgbClr')[0];
                const sys = colorEl.getElementsByTagName('a:sysClr')[0];
                if (srgb) this.themeColors[name] = '#' + srgb.getAttribute('val');
                else if (sys) { const lc = sys.getAttribute('lastClr'); if (lc) this.themeColors[name] = '#' + lc; }
            }
        }
    }
    extractFontScheme(doc) {
        const fontScheme = doc.getElementsByTagName('a:fontScheme')[0];
        if (!fontScheme) return;
        const major = fontScheme.getElementsByTagName('a:majorFont')[0];
        if (major) { const l = major.getElementsByTagName('a:latin')[0]; if (l) this.themeFonts.majorFont = l.getAttribute('typeface') || 'Calibri Light'; }
        const minor = fontScheme.getElementsByTagName('a:minorFont')[0];
        if (minor) { const l = minor.getElementsByTagName('a:latin')[0]; if (l) this.themeFonts.minorFont = l.getAttribute('typeface') || 'Calibri'; }
    }
    getSchemeColor(colorRef) {
        const map = { tx1:'dk1',tx2:'dk2',bg1:'lt1',bg2:'lt2',accent1:'accent1',accent2:'accent2',accent3:'accent3',accent4:'accent4',accent5:'accent5',accent6:'accent6',hlink:'hlink',folHlink:'folHlink',dk1:'dk1',dk2:'dk2',lt1:'lt1',lt2:'lt2' };
        const key = map[colorRef] || colorRef;
        return this.themeColors[key] || this.defaultThemeColors[key] || null;
    }
    getColors() { return this.themeColors; }
    getFonts() { return this.themeFonts; }
    getDefaultTextColor() { return this.themeColors['dk1'] || '#000000'; }
    getTitleFont() { return this.themeFonts.majorFont || 'Calibri Light'; }
    getBodyFont() { return this.themeFonts.minorFont || 'Calibri'; }
    getAccentColor(i) { const k = `accent${i}`; return this.themeColors[k] || this.defaultThemeColors[k] || null; }
    getBackgroundColor() { return this.themeColors['lt1'] || '#FFFFFF'; }
    getSecondaryTextColor() { return this.themeColors['dk2'] || '#444444'; }
    getHyperlinkColor() { return this.themeColors['hlink'] || '#0563C1'; }
    getFillStyleNode(idx, opts = {}) {
        const list = opts.background ? this.bgFillStyleNodes : this.fillStyleNodes;
        if (!Array.isArray(list) || !list.length) return null;
        if (idx >= 0 && idx < list.length) return list[idx];
        const oneBased = idx - 1;
        if (oneBased >= 0 && oneBased < list.length) return list[oneBased];
        return null;
    }
    reset() {
        this.themeColors = {};
        this.themeFonts = { majorFont: 'Calibri Light', minorFont: 'Calibri' };
        this.fillStyleNodes = [];
        this.bgFillStyleNodes = [];
    }
}

suite('ThemeExtractor', () => {
    const theme = new ThemeExtractor();

    test('defaults: default text color is #000000', () => {
        assert.strictEqual(theme.getDefaultTextColor(), '#000000');
    });

    test('defaults: default title font is Calibri Light', () => {
        assert.strictEqual(theme.getTitleFont(), 'Calibri Light');
    });

    test('defaults: default body font is Calibri', () => {
        assert.strictEqual(theme.getBodyFont(), 'Calibri');
    });

    test('defaults: getBackgroundColor is #FFFFFF', () => {
        assert.strictEqual(theme.getBackgroundColor(), '#FFFFFF');
    });

    test('defaults: getHyperlinkColor is #0563C1', () => {
        assert.strictEqual(theme.getHyperlinkColor(), '#0563C1');
    });

    test('getSchemeColor resolves tx1 → dk1 default', () => {
        assert.strictEqual(theme.getSchemeColor('tx1'), '#000000');
    });

    test('getSchemeColor resolves bg1 → lt1 default', () => {
        assert.strictEqual(theme.getSchemeColor('bg1'), '#FFFFFF');
    });

    test('getSchemeColor resolves accent1 default', () => {
        assert.strictEqual(theme.getSchemeColor('accent1'), '#5B9BD5');
    });

    test('getAccentColor returns default accent colors 1-6', () => {
        assert.strictEqual(theme.getAccentColor(1), '#5B9BD5');
        assert.strictEqual(theme.getAccentColor(2), '#ED7D31');
        assert.strictEqual(theme.getAccentColor(3), '#A5A5A5');
        assert.strictEqual(theme.getAccentColor(4), '#FFC000');
        assert.strictEqual(theme.getAccentColor(5), '#4472C4');
        assert.strictEqual(theme.getAccentColor(6), '#70AD47');
    });

    test('extractColorScheme from srgbClr', () => {
        const doc = el('theme', {}, [
            el('a:clrScheme', {}, [
                el('a:dk1', {}, [el('a:srgbClr', { val: '111111' })]),
                el('a:lt1', {}, [el('a:srgbClr', { val: 'FAFAFA' })]),
                el('a:accent1', {}, [el('a:srgbClr', { val: 'AABBCC' })])
            ])
        ]);
        const t = new ThemeExtractor();
        t.extractColorScheme(doc);
        assert.strictEqual(t.getDefaultTextColor(), '#111111');
        assert.strictEqual(t.getBackgroundColor(), '#FAFAFA');
        assert.strictEqual(t.getSchemeColor('accent1'), '#AABBCC');
    });

    test('extractColorScheme from sysClr with lastClr', () => {
        const doc = el('theme', {}, [
            el('a:clrScheme', {}, [
                el('a:dk1', {}, [el('a:sysClr', { lastClr: '222222' })])
            ])
        ]);
        const t = new ThemeExtractor();
        t.extractColorScheme(doc);
        assert.strictEqual(t.getDefaultTextColor(), '#222222');
    });

    test('extractFontScheme sets major and minor fonts', () => {
        const doc = el('root', {}, [
            el('a:fontScheme', {}, [
                el('a:majorFont', {}, [el('a:latin', { typeface: 'Arial' })]),
                el('a:minorFont', {}, [el('a:latin', { typeface: 'Verdana' })])
            ])
        ]);
        const t = new ThemeExtractor();
        t.extractFontScheme(doc);
        assert.strictEqual(t.getTitleFont(), 'Arial');
        assert.strictEqual(t.getBodyFont(), 'Verdana');
    });

    test('reset clears all data', () => {
        const t = new ThemeExtractor();
        t.themeColors.dk1 = '#111111';
        t.themeFonts.majorFont = 'Times';
        t.fillStyleNodes = [1];
        t.reset();
        assert.strictEqual(t.getDefaultTextColor(), '#000000');
        assert.strictEqual(t.getTitleFont(), 'Calibri Light');
        assert.deepStrictEqual(t.fillStyleNodes, []);
    });

    test('getFillStyleNode returns correct node (0-based)', () => {
        const t = new ThemeExtractor();
        const node0 = el('a:solidFill');
        const node1 = el('a:gradFill');
        t.fillStyleNodes = [node0, node1];
        assert.strictEqual(t.getFillStyleNode(0), node0);
        assert.strictEqual(t.getFillStyleNode(1), node1);
    });

    test('getFillStyleNode tries 1-based indexing', () => {
        const t = new ThemeExtractor();
        const node0 = el('a:solidFill');
        t.fillStyleNodes = [node0];
        assert.strictEqual(t.getFillStyleNode(1), node0);
    });

    test('getFillStyleNode returns null for out-of-range', () => {
        const t = new ThemeExtractor();
        t.fillStyleNodes = [];
        assert.strictEqual(t.getFillStyleNode(0), null);
        assert.strictEqual(t.getFillStyleNode(5), null);
    });

    test('getFillStyleNode background option uses bgFillStyleNodes', () => {
        const t = new ThemeExtractor();
        const bgNode = el('a:solidFill');
        t.bgFillStyleNodes = [bgNode];
        assert.strictEqual(t.getFillStyleNode(0, { background: true }), bgNode);
        assert.strictEqual(t.getFillStyleNode(0, { background: false }), null);
    });

    test('setThemeRelationships and getThemeRelationshipTarget', () => {
        const t = new ThemeExtractor();
        t.setThemeRelationships([
            { id: 'rId1', target: '../media/image1.png' },
            { id: 'rId2', target: '../media/image2.svg' }
        ]);
        assert.strictEqual(t.getThemeRelationshipTarget('rId1'), '../media/image1.png');
        assert.strictEqual(t.getThemeRelationshipTarget('rId2'), '../media/image2.svg');
        assert.strictEqual(t.getThemeRelationshipTarget('rId99'), null);
        assert.strictEqual(t.getThemeRelationshipTarget(null), null);
    });

    test('resolveThemeImageUrl resolves matching image', () => {
        const t = new ThemeExtractor();
        t.setThemeRelationships([{ id: 'rId1', target: '../media/bg.png' }]);
        const images = { 'bg.png': 'blob:http://fake/bg' };
        assert.strictEqual(t.resolveThemeImageUrl('rId1', images), 'blob:http://fake/bg');
    });

    test('resolveThemeImageUrl returns null if not found', () => {
        const t = new ThemeExtractor();
        t.setThemeRelationships([{ id: 'rId1', target: '../media/bg.png' }]);
        assert.strictEqual(t.resolveThemeImageUrl('rId1', {}), null);
        assert.strictEqual(t.resolveThemeImageUrl('rId99', {}), null);
    });

    test('getSchemeColor returns null for unknown ref', () => {
        assert.strictEqual(theme.getSchemeColor('nonexistent'), null);
    });

    test('getSecondaryTextColor defaults to #444444', () => {
        const t = new ThemeExtractor();
        assert.strictEqual(t.getSecondaryTextColor(), '#444444');
    });
});

module.exports = { ThemeExtractor };
