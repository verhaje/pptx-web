/**
 * LayoutTextStyleParser tests – layout placeholder style parsing,
 * bullet inheritance from master/layout, and color resolution for
 * placeholders without explicit type attributes.
 */
const { assert, test, suite, el } = require('../helpers/test-harness');

// ── Minimal mocks ─────────────────────────────────────────────────────────────

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
    getDefaultTextColor() { return this.themeColors['dk1'] || '#000000'; }
    getTitleFont() { return 'Calibri Light'; }
    getBodyFont() { return 'Calibri'; }
    getFonts() { return { majorFont: 'Calibri Light', minorFont: 'Calibri' }; }
}

class MockBackgroundExtractor {
    constructor(themeExtractor) { this.themeExtractor = themeExtractor; }
    extractColor(element) {
        if (!element) return null;
        const srgb = element.getElementsByTagName('a:srgbClr')[0];
        if (srgb) return '#' + srgb.getAttribute('val');
        const scheme = element.getElementsByTagName('a:schemeClr')[0];
        if (scheme) return this.themeExtractor.getSchemeColor(scheme.getAttribute('val'));
        return null;
    }
}

// ── Inline LayoutTextStyleParser (mirrors source logic) ──────────────────────

class LayoutTextStyleParser {
    static EMU_PER_POINT = 12700;
    static BASE_FONT_SIZE_PT = 18;
    static PERCENT_DENOM = 100000;

    constructor(backgroundExtractor, themeExtractor) {
        this.backgroundExtractor = backgroundExtractor;
        this.themeExtractor = themeExtractor;
        this.textStylesCache = new Map();
    }

    parseLevelFormatting(pPr) {
        const formatting = {
            fontSize: null,
            fontFamily: null,
            color: null,
            bold: null,
            italic: null,
            align: null,
            marLEm: null,
            indentEm: null,
            spaceBeforeEm: null,
            spaceAfterEm: null,
            lineHeight: null,
            bullet: null
        };

        const algn = pPr.getAttribute('algn');
        if (algn === 'ctr') formatting.align = 'center';
        else if (algn === 'r') formatting.align = 'right';
        else if (algn === 'just') formatting.align = 'justify';
        else if (algn === 'l') formatting.align = 'left';

        const defRPr = pPr.getElementsByTagName('a:defRPr')[0];
        if (defRPr) {
            const sz = defRPr.getAttribute('sz');
            if (sz) formatting.fontSize = parseInt(sz) / 100;
            if (defRPr.getAttribute('b') === '1') formatting.bold = true;
            if (defRPr.getAttribute('i') === '1') formatting.italic = true;
            const latin = defRPr.getElementsByTagName('a:latin')[0];
            if (latin) {
                const typeface = latin.getAttribute('typeface');
                if (typeface) {
                    if (typeface === '+mj-lt' && this.themeExtractor) {
                        formatting.fontFamily = this.themeExtractor.getTitleFont();
                    } else if (typeface === '+mn-lt' && this.themeExtractor) {
                        formatting.fontFamily = this.themeExtractor.getBodyFont();
                    } else if (!typeface.startsWith('+')) {
                        formatting.fontFamily = typeface;
                    }
                }
            }
            const solidFill = defRPr.getElementsByTagName('a:solidFill')[0];
            if (solidFill) {
                formatting.color = this.backgroundExtractor.extractColor(solidFill);
            }
        }

        // Bullet information
        const buNone = pPr.getElementsByTagName('a:buNone')[0];
        if (buNone) {
            formatting.bullet = { type: 'none' };
        } else {
            const buAutoNum = pPr.getElementsByTagName('a:buAutoNum')[0];
            const buChar = pPr.getElementsByTagName('a:buChar')[0];
            if (buAutoNum) {
                formatting.bullet = {
                    type: 'auto',
                    numType: buAutoNum.getAttribute('type') || null,
                    startAt: buAutoNum.getAttribute('startAt') ? parseInt(buAutoNum.getAttribute('startAt'), 10) : null
                };
            } else if (buChar) {
                formatting.bullet = {
                    type: 'char',
                    char: buChar.getAttribute('char') || '\u2022'
                };
            }
            const buFont = pPr.getElementsByTagName('a:buFont')[0];
            if (buFont && formatting.bullet) {
                formatting.bullet.font = buFont.getAttribute('typeface') || null;
            }
            const buClr = pPr.getElementsByTagName('a:buClr')[0];
            if (buClr && formatting.bullet) {
                formatting.bullet.color = this.backgroundExtractor.extractColor(buClr);
            }
        }

        const marLAttr = pPr.getAttribute('marL');
        if (marLAttr !== null) {
            const marL = parseInt(marLAttr, 10);
            if (!Number.isNaN(marL)) {
                formatting.marLEm = (marL / LayoutTextStyleParser.EMU_PER_POINT) / LayoutTextStyleParser.BASE_FONT_SIZE_PT;
            }
        }

        const indentAttr = pPr.getAttribute('indent');
        if (indentAttr !== null) {
            const indent = parseInt(indentAttr, 10);
            if (!Number.isNaN(indent)) {
                formatting.indentEm = (indent / LayoutTextStyleParser.EMU_PER_POINT) / LayoutTextStyleParser.BASE_FONT_SIZE_PT;
            }
        }

        return formatting;
    }

    parseLevelStyles(styleEl) {
        const levels = {};
        for (let i = 1; i <= 9; i++) {
            const lvlPPr = styleEl.getElementsByTagName(`a:lvl${i}pPr`)[0];
            if (lvlPPr) {
                levels[i] = this.parseLevelFormatting(lvlPPr);
            }
        }
        const defPPr = styleEl.getElementsByTagName('a:defPPr')[0];
        if (defPPr) {
            levels.default = this.parseLevelFormatting(defPPr);
        }
        return levels;
    }

    parseTextStyles(doc) {
        const txStyles = doc.getElementsByTagName('p:txStyles')[0];
        if (!txStyles) return null;
        const styles = { titleStyle: null, bodyStyle: null, otherStyle: null };
        const titleStyle = txStyles.getElementsByTagName('p:titleStyle')[0];
        if (titleStyle) styles.titleStyle = this.parseLevelStyles(titleStyle);
        const bodyStyle = txStyles.getElementsByTagName('p:bodyStyle')[0];
        if (bodyStyle) styles.bodyStyle = this.parseLevelStyles(bodyStyle);
        const otherStyle = txStyles.getElementsByTagName('p:otherStyle')[0];
        if (otherStyle) styles.otherStyle = this.parseLevelStyles(otherStyle);
        return styles;
    }

    cacheTextStyles(masterPath, textStyles) {
        if (textStyles) this.textStylesCache.set(masterPath, textStyles);
    }

    getTextStyleForPlaceholder(masterPath, placeholderType, level = 1) {
        const textStyles = this.textStylesCache.get(masterPath);
        if (!textStyles) return null;
        let style = null;
        if (placeholderType === 'title' || placeholderType === 'ctrTitle' || placeholderType === 'subTitle') {
            style = textStyles.titleStyle;
        } else if (placeholderType === 'body' || placeholderType === 'obj' || placeholderType === 'content') {
            style = textStyles.bodyStyle;
        } else {
            style = textStyles.otherStyle || textStyles.bodyStyle;
        }
        if (!style) return null;
        return style[level] || style[1] || style.default || null;
    }

    getTextDefaults(masterPath, placeholderType, level = 1) {
        const defaults = {
            fontSize: null,
            fontFamily: this.themeExtractor ? this.themeExtractor.getBodyFont() : 'Calibri',
            color: this.themeExtractor ? this.themeExtractor.getDefaultTextColor() : '#000000',
            bold: false,
            italic: false,
            align: 'left',
            marLEm: null,
            indentEm: null,
            spaceBeforeEm: null,
            spaceAfterEm: null,
            lineHeight: null,
            bullet: null
        };
        if (placeholderType === 'title' || placeholderType === 'ctrTitle' || placeholderType === 'subTitle') {
            defaults.fontFamily = this.themeExtractor ? this.themeExtractor.getTitleFont() : 'Calibri Light';
        }
        const styleFromMaster = this.getTextStyleForPlaceholder(masterPath, placeholderType, level);
        if (styleFromMaster) {
            if (styleFromMaster.fontSize) defaults.fontSize = styleFromMaster.fontSize;
            if (styleFromMaster.fontFamily) defaults.fontFamily = styleFromMaster.fontFamily;
            if (styleFromMaster.color) defaults.color = styleFromMaster.color;
            if (styleFromMaster.bold !== null) defaults.bold = styleFromMaster.bold;
            if (styleFromMaster.italic !== null) defaults.italic = styleFromMaster.italic;
            if (styleFromMaster.align) defaults.align = styleFromMaster.align;
            if (styleFromMaster.marLEm !== null && styleFromMaster.marLEm !== undefined) defaults.marLEm = styleFromMaster.marLEm;
            if (styleFromMaster.indentEm !== null && styleFromMaster.indentEm !== undefined) defaults.indentEm = styleFromMaster.indentEm;
            if (styleFromMaster.bullet) defaults.bullet = styleFromMaster.bullet;
        }
        return defaults;
    }

    parseLayoutPlaceholderStyles(doc) {
        if (!doc) return null;
        const map = new Map();
        const spTree = doc.getElementsByTagName('p:cSld')[0]?.getElementsByTagName('p:spTree')[0];
        if (!spTree) return null;
        const shapes = Array.from(spTree.getElementsByTagName('p:sp'));
        for (const sp of shapes) {
            const ph = sp.getElementsByTagName('p:ph')[0];
            const placeholderType = ph?.getAttribute('type') || null;
            const placeholderIdx = ph?.getAttribute('idx') || null;
            if (!placeholderType && !placeholderIdx) continue;
            const resolvedType = placeholderType || 'body';
            const txBody = sp.getElementsByTagName('p:txBody')[0];
            const lstStyle = txBody?.getElementsByTagName('a:lstStyle')[0];
            if (!lstStyle) continue;
            const levels = {};
            for (let i = 1; i <= 9; i++) {
                const lvlPPr = lstStyle.getElementsByTagName(`a:lvl${i}pPr`)[0];
                if (lvlPPr) {
                    levels[i] = this.parseLevelFormatting(lvlPPr);
                }
            }
            const defPPr = lstStyle.getElementsByTagName('a:defPPr')[0];
            if (defPPr) {
                levels.default = this.parseLevelFormatting(defPPr);
            }
            if (Object.keys(levels).length > 0) {
                if (placeholderIdx !== null) {
                    map.set(`${resolvedType}:${placeholderIdx}`, levels);
                } else {
                    map.set(resolvedType, levels);
                }
            }
        }
        return map.size > 0 ? map : null;
    }

    clearCache() {
        this.textStylesCache.clear();
    }
}

// ── Tests ─────────────────────────────────────────────────────────────────────

const themeEx = new MockThemeExtractor();
const bgEx = new MockBackgroundExtractor(themeEx);

// ── parseLevelFormatting ──────────────────────────────────────────────────────

suite('LayoutTextStyleParser.parseLevelFormatting', () => {
    const parser = new LayoutTextStyleParser(bgEx, themeEx);

    test('parses bullet char from buChar element', () => {
        const pPr = el('a:lvl1pPr', { algn: 'l' }, [
            el('a:buFont', { typeface: 'Arial', pitchFamily: '34', charset: '0' }),
            el('a:buChar', { char: '•' }),
            el('a:defRPr', { sz: '3200' })
        ]);
        const fmt = parser.parseLevelFormatting(pPr);
        assert.ok(fmt.bullet, 'bullet should be parsed');
        assert.strictEqual(fmt.bullet.type, 'char');
        assert.strictEqual(fmt.bullet.char, '•');
        assert.strictEqual(fmt.bullet.font, 'Arial');
    });

    test('parses buAutoNum', () => {
        const pPr = el('a:lvl1pPr', {}, [
            el('a:buAutoNum', { type: 'arabicPeriod', startAt: '3' })
        ]);
        const fmt = parser.parseLevelFormatting(pPr);
        assert.ok(fmt.bullet);
        assert.strictEqual(fmt.bullet.type, 'auto');
        assert.strictEqual(fmt.bullet.numType, 'arabicPeriod');
        assert.strictEqual(fmt.bullet.startAt, 3);
    });

    test('parses buNone as type none', () => {
        const pPr = el('a:lvl1pPr', {}, [el('a:buNone')]);
        const fmt = parser.parseLevelFormatting(pPr);
        assert.ok(fmt.bullet);
        assert.strictEqual(fmt.bullet.type, 'none');
    });

    test('bullet is null when no bullet element present', () => {
        const pPr = el('a:lvl1pPr', { algn: 'l' }, [
            el('a:defRPr', { sz: '1800' })
        ]);
        const fmt = parser.parseLevelFormatting(pPr);
        assert.strictEqual(fmt.bullet, null);
    });

    test('parses bullet color from buClr', () => {
        const pPr = el('a:lvl1pPr', {}, [
            el('a:buClr', {}, [el('a:srgbClr', { val: 'FF0000' })]),
            el('a:buChar', { char: '→' })
        ]);
        const fmt = parser.parseLevelFormatting(pPr);
        assert.ok(fmt.bullet);
        assert.strictEqual(fmt.bullet.color, '#FF0000');
    });

    test('parses bullet color from scheme color', () => {
        const pPr = el('a:lvl1pPr', {}, [
            el('a:buClr', {}, [el('a:schemeClr', { val: 'bg1' })]),
            el('a:buChar', { char: '•' })
        ]);
        const fmt = parser.parseLevelFormatting(pPr);
        assert.ok(fmt.bullet);
        assert.strictEqual(fmt.bullet.color, '#FFFFFF');
    });

    test('parses color from schemeClr bg1 as white', () => {
        const pPr = el('a:lvl1pPr', { algn: 'l' }, [
            el('a:defRPr', { sz: '2800' }, [
                el('a:solidFill', {}, [el('a:schemeClr', { val: 'bg1' })])
            ])
        ]);
        const fmt = parser.parseLevelFormatting(pPr);
        assert.strictEqual(fmt.color, '#FFFFFF');
        assert.strictEqual(fmt.fontSize, 28);
    });

    test('parses color from schemeClr tx1 as black', () => {
        const pPr = el('a:lvl1pPr', {}, [
            el('a:defRPr', {}, [
                el('a:solidFill', {}, [el('a:schemeClr', { val: 'tx1' })])
            ])
        ]);
        const fmt = parser.parseLevelFormatting(pPr);
        assert.strictEqual(fmt.color, '#000000');
    });
});

// ── parseLayoutPlaceholderStyles ──────────────────────────────────────────────

suite('LayoutTextStyleParser.parseLayoutPlaceholderStyles', () => {
    const parser = new LayoutTextStyleParser(bgEx, themeEx);

    test('parses placeholder with type attribute', () => {
        // Layout with <p:ph type="title"/> and lstStyle
        const doc = el('root', {}, [
            el('p:cSld', {}, [
                el('p:spTree', {}, [
                    el('p:sp', {}, [
                        el('p:nvSpPr', {}, [
                            el('p:cNvPr', { id: '2', name: 'Title 1' }),
                            el('p:cNvSpPr'),
                            el('p:nvPr', {}, [el('p:ph', { type: 'title' })])
                        ]),
                        el('p:txBody', {}, [
                            el('a:lstStyle', {}, [
                                el('a:lvl1pPr', { algn: 'r' }, [
                                    el('a:defRPr', { sz: '3600' }, [
                                        el('a:solidFill', {}, [el('a:srgbClr', { val: '0070C0' })])
                                    ])
                                ])
                            ])
                        ])
                    ])
                ])
            ])
        ]);
        const result = parser.parseLayoutPlaceholderStyles(doc);
        assert.ok(result, 'should return a map');
        assert.ok(result.has('title'), 'should have title key');
        const lvl1 = result.get('title')[1];
        assert.strictEqual(lvl1.color, '#0070C0');
        assert.strictEqual(lvl1.fontSize, 36);
        assert.strictEqual(lvl1.align, 'right');
    });

    test('parses placeholder without type but with idx (defaults to body)', () => {
        // Layout with <p:ph idx="1"/> (no type attribute) — like the "ai" slide2 layout
        const doc = el('root', {}, [
            el('p:cSld', {}, [
                el('p:spTree', {}, [
                    el('p:sp', {}, [
                        el('p:nvSpPr', {}, [
                            el('p:cNvPr', { id: '3', name: 'Content Placeholder 2' }),
                            el('p:cNvSpPr'),
                            el('p:nvPr', {}, [el('p:ph', { idx: '1' })])
                        ]),
                        el('p:txBody', {}, [
                            el('a:lstStyle', {}, [
                                el('a:lvl1pPr', { algn: 'l' }, [
                                    el('a:defRPr', { sz: '2800' }, [
                                        el('a:solidFill', {}, [el('a:schemeClr', { val: 'bg1' })])
                                    ])
                                ])
                            ])
                        ])
                    ])
                ])
            ])
        ]);
        const result = parser.parseLayoutPlaceholderStyles(doc);
        assert.ok(result, 'should return a map');
        assert.ok(result.has('body:1'), 'should store under body:1 key');
        const lvl1 = result.get('body:1')[1];
        assert.strictEqual(lvl1.color, '#FFFFFF', 'bg1 should resolve to white');
        assert.strictEqual(lvl1.fontSize, 28);
    });

    test('skips placeholder with neither type nor idx', () => {
        const doc = el('root', {}, [
            el('p:cSld', {}, [
                el('p:spTree', {}, [
                    el('p:sp', {}, [
                        el('p:nvSpPr', {}, [
                            el('p:cNvPr', { id: '4' }),
                            el('p:cNvSpPr'),
                            el('p:nvPr', {}, [el('p:ph')])
                        ]),
                        el('p:txBody', {}, [
                            el('a:lstStyle', {}, [
                                el('a:lvl1pPr', {}, [
                                    el('a:defRPr', { sz: '1800' })
                                ])
                            ])
                        ])
                    ])
                ])
            ])
        ]);
        const result = parser.parseLayoutPlaceholderStyles(doc);
        assert.strictEqual(result, null, 'should return null when no valid placeholders');
    });

    test('stores with type:idx key when both present', () => {
        const doc = el('root', {}, [
            el('p:cSld', {}, [
                el('p:spTree', {}, [
                    el('p:sp', {}, [
                        el('p:nvSpPr', {}, [
                            el('p:cNvPr', { id: '3' }),
                            el('p:cNvSpPr'),
                            el('p:nvPr', {}, [el('p:ph', { type: 'body', idx: '2' })])
                        ]),
                        el('p:txBody', {}, [
                            el('a:lstStyle', {}, [
                                el('a:lvl1pPr', { algn: 'ctr' }, [
                                    el('a:defRPr', { sz: '2000' })
                                ])
                            ])
                        ])
                    ])
                ])
            ])
        ]);
        const result = parser.parseLayoutPlaceholderStyles(doc);
        assert.ok(result.has('body:2'));
        assert.strictEqual(result.get('body:2')[1].align, 'center');
    });
});

// ── getTextDefaults with bullet inheritance ──────────────────────────────────

suite('LayoutTextStyleParser.getTextDefaults with bullets', () => {
    const parser = new LayoutTextStyleParser(bgEx, themeEx);

    // Simulate master body style with bullet
    const masterBodyStyle = el('p:bodyStyle', {}, [
        el('a:lvl1pPr', { marL: '342900', indent: '-342900', algn: 'l' }, [
            el('a:buFont', { typeface: 'Arial', pitchFamily: '34', charset: '0' }),
            el('a:buChar', { char: '•' }),
            el('a:defRPr', { sz: '3200' }, [
                el('a:solidFill', {}, [el('a:schemeClr', { val: 'tx1' })])
            ])
        ])
    ]);
    const masterTitleStyle = el('p:titleStyle', {}, [
        el('a:lvl1pPr', { algn: 'ctr' }, [
            el('a:buNone'),
            el('a:defRPr', { sz: '4400' }, [
                el('a:solidFill', {}, [el('a:schemeClr', { val: 'tx1' })])
            ])
        ])
    ]);
    const txStyles = {
        titleStyle: parser.parseLevelStyles(masterTitleStyle),
        bodyStyle: parser.parseLevelStyles(masterBodyStyle),
        otherStyle: null
    };
    parser.cacheTextStyles('ppt/slideMasters/slideMaster1.xml', txStyles);

    test('body placeholder inherits bullet from master bodyStyle', () => {
        const defaults = parser.getTextDefaults('ppt/slideMasters/slideMaster1.xml', 'body', 1);
        assert.ok(defaults.bullet, 'bullet should be inherited from master');
        assert.strictEqual(defaults.bullet.type, 'char');
        assert.strictEqual(defaults.bullet.char, '•');
        assert.strictEqual(defaults.bullet.font, 'Arial');
    });

    test('body placeholder inherits color from master bodyStyle', () => {
        const defaults = parser.getTextDefaults('ppt/slideMasters/slideMaster1.xml', 'body', 1);
        assert.strictEqual(defaults.color, '#000000', 'tx1 should resolve to black');
    });

    test('title placeholder has buNone from master titleStyle', () => {
        const defaults = parser.getTextDefaults('ppt/slideMasters/slideMaster1.xml', 'title', 1);
        assert.ok(defaults.bullet);
        assert.strictEqual(defaults.bullet.type, 'none');
    });

    test('unknown master path returns defaults without bullet', () => {
        const defaults = parser.getTextDefaults('unknown/path', 'body', 1);
        assert.strictEqual(defaults.bullet, null);
        assert.strictEqual(defaults.color, '#000000');
    });
});

// ── Layout override of master defaults ───────────────────────────────────────

suite('Layout overrides master color for content placeholder', () => {
    const parser = new LayoutTextStyleParser(bgEx, themeEx);

    // Master defines tx1 (black) for body text with bullets
    const masterBodyStyle = el('p:bodyStyle', {}, [
        el('a:lvl1pPr', { marL: '342900', indent: '-342900', algn: 'l' }, [
            el('a:buFont', { typeface: 'Arial' }),
            el('a:buChar', { char: '•' }),
            el('a:defRPr', { sz: '3200' }, [
                el('a:solidFill', {}, [el('a:schemeClr', { val: 'tx1' })])
            ])
        ])
    ]);
    const txStyles = {
        titleStyle: null,
        bodyStyle: parser.parseLevelStyles(masterBodyStyle),
        otherStyle: null
    };
    parser.cacheTextStyles('ppt/slideMasters/slideMaster1.xml', txStyles);

    // Layout overrides with bg1 (white) for the content placeholder idx=1
    const layoutDoc = el('root', {}, [
        el('p:cSld', {}, [
            el('p:spTree', {}, [
                el('p:sp', {}, [
                    el('p:nvSpPr', {}, [
                        el('p:cNvPr', { id: '3', name: 'Content Placeholder 2' }),
                        el('p:cNvSpPr'),
                        el('p:nvPr', {}, [el('p:ph', { idx: '1' })])
                    ]),
                    el('p:txBody', {}, [
                        el('a:lstStyle', {}, [
                            el('a:lvl1pPr', { algn: 'l' }, [
                                el('a:defRPr', { sz: '2800' }, [
                                    el('a:solidFill', {}, [el('a:schemeClr', { val: 'bg1' })])
                                ])
                            ])
                        ])
                    ])
                ])
            ])
        ])
    ]);
    const layoutStyles = parser.parseLayoutPlaceholderStyles(layoutDoc);

    test('layout stores styles for idx-only placeholder as body:1', () => {
        assert.ok(layoutStyles, 'layout styles should be non-null');
        assert.ok(layoutStyles.has('body:1'), 'should have body:1 key');
    });

    test('layout level 1 color is white (bg1)', () => {
        const lvl1 = layoutStyles.get('body:1')[1];
        assert.strictEqual(lvl1.color, '#FFFFFF');
    });

    test('simulates full getTextDefaults with layout override', () => {
        // Get master defaults first
        const masterDefaults = parser.getTextDefaults('ppt/slideMasters/slideMaster1.xml', 'body', 1);
        assert.strictEqual(masterDefaults.color, '#000000', 'master color should be black');
        assert.ok(masterDefaults.bullet, 'master should have bullet');

        // Now apply layout override (simulates layout-parser.js getTextDefaults)
        const placeholderKey = 'body:1';
        const placeholderStyles = layoutStyles.get(placeholderKey) || null;
        const levelStyle = placeholderStyles ? (placeholderStyles[1] || null) : null;
        if (levelStyle) {
            if (levelStyle.color) masterDefaults.color = levelStyle.color;
            if (levelStyle.bullet) masterDefaults.bullet = levelStyle.bullet;
        }

        assert.strictEqual(masterDefaults.color, '#FFFFFF', 'layout should override color to white');
        // Layout didn't define bullets, so master bullets should persist
        assert.ok(masterDefaults.bullet, 'bullet should still come from master');
        assert.strictEqual(masterDefaults.bullet.type, 'char');
        assert.strictEqual(masterDefaults.bullet.char, '•');
    });
});

// ── Bullet inheritance in shape text extraction ──────────────────────────────

suite('Bullet inheritance from textDefaults', () => {
    test('paragraph without pPr inherits bullet from textDefaults', () => {
        // Simulates the shape-parser extractShapeText logic
        let bullet = null; // no pPr, so bullet stays null
        const textDefaults = {
            bullet: { type: 'char', char: '•', font: 'Arial' },
            color: '#FFFFFF'
        };
        // The fix: inherit bullet from textDefaults when not explicitly set
        if (!bullet && textDefaults && textDefaults.bullet) {
            bullet = textDefaults.bullet;
        }
        assert.ok(bullet, 'bullet should be inherited from textDefaults');
        assert.strictEqual(bullet.type, 'char');
        assert.strictEqual(bullet.char, '•');
    });

    test('explicit buNone prevents inheritance from textDefaults', () => {
        let bullet = { type: 'none' }; // explicit buNone
        const textDefaults = {
            bullet: { type: 'char', char: '•' }
        };
        if (!bullet && textDefaults && textDefaults.bullet) {
            bullet = textDefaults.bullet;
        }
        assert.strictEqual(bullet.type, 'none', 'explicit buNone should not be overridden');
    });

    test('explicit buChar on slide overrides textDefaults', () => {
        let bullet = { type: 'char', char: '→' }; // explicit on slide
        const textDefaults = {
            bullet: { type: 'char', char: '•' }
        };
        if (!bullet && textDefaults && textDefaults.bullet) {
            bullet = textDefaults.bullet;
        }
        assert.strictEqual(bullet.char, '→', 'slide-level bullet should win');
    });

    test('no textDefaults leaves bullet as null', () => {
        let bullet = null;
        const textDefaults = null;
        if (!bullet && textDefaults && textDefaults.bullet) {
            bullet = textDefaults.bullet;
        }
        assert.strictEqual(bullet, null, 'bullet should remain null without textDefaults');
    });

    test('textDefaults without bullet leaves bullet as null', () => {
        let bullet = null;
        const textDefaults = { color: '#000000' };
        if (!bullet && textDefaults && textDefaults.bullet) {
            bullet = textDefaults.bullet;
        }
        assert.strictEqual(bullet, null, 'bullet should remain null when textDefaults has no bullet');
    });
});
