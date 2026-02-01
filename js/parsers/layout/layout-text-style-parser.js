/**
 * Layout Text Style Parser Module
 * Handles parsing of text styles from master slides and text extraction
 * Implements font inheritance: Theme -> Master -> Layout -> Slide -> Run
 */

class LayoutTextStyleParser {
    static EMU_PER_POINT = 12700;
    static BASE_FONT_SIZE_PT = 18;
    static PERCENT_DENOM = 100000;
    /**
     * Create a LayoutTextStyleParser
     * @param {BackgroundExtractor} backgroundExtractor - For color extraction
     * @param {ThemeExtractor} themeExtractor - For theme defaults
     */
    constructor(backgroundExtractor, themeExtractor) {
        this.backgroundExtractor = backgroundExtractor;
        this.themeExtractor = themeExtractor;
        
        // Cache for text styles from masters (titleStyle, bodyStyle, otherStyle)
        this.textStylesCache = new Map();
    }

    /**
     * Parse text styles from a master slide (p:txStyles)
     * These define default formatting for title, body, and other text
     * @param {Document} doc - Parsed master document
     * @returns {Object|null} - Text styles object
     */
    parseTextStyles(doc) {
        const txStyles = doc.getElementsByTagName('p:txStyles')[0];
        if (!txStyles) return null;

        const styles = {
            titleStyle: null,
            bodyStyle: null,
            otherStyle: null
        };

        // Parse title style (for title placeholders)
        const titleStyle = txStyles.getElementsByTagName('p:titleStyle')[0];
        if (titleStyle) {
            styles.titleStyle = this.parseLevelStyles(titleStyle);
        }

        // Parse body style (for body/content placeholders)
        const bodyStyle = txStyles.getElementsByTagName('p:bodyStyle')[0];
        if (bodyStyle) {
            styles.bodyStyle = this.parseLevelStyles(bodyStyle);
        }

        // Parse other style (for shapes without placeholders)
        const otherStyle = txStyles.getElementsByTagName('p:otherStyle')[0];
        if (otherStyle) {
            styles.otherStyle = this.parseLevelStyles(otherStyle);
        }

        return styles;
    }

    /**
     * Parse level-based paragraph styles (a:lvl1pPr through a:lvl9pPr)
     * @param {Element} styleEl - Style element containing level definitions
     * @returns {Object} - Object with level 1-9 formatting
     */
    parseLevelStyles(styleEl) {
        const levels = {};

        for (let i = 1; i <= 9; i++) {
            const lvlPPr = styleEl.getElementsByTagName(`a:lvl${i}pPr`)[0];
            if (lvlPPr) {
                levels[i] = this.parseLevelFormatting(lvlPPr);
            }
        }

        // Also check for defPPr (default paragraph properties)
        const defPPr = styleEl.getElementsByTagName('a:defPPr')[0];
        if (defPPr) {
            levels.default = this.parseLevelFormatting(defPPr);
        }

        return levels;
    }

    /**
     * Parse formatting from a level paragraph properties element
     * @param {Element} pPr - Paragraph properties element
     * @returns {Object} - Formatting object
     */
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
            lineHeight: null
        };

        // Get alignment
        const algn = pPr.getAttribute('algn');
        if (algn === 'ctr') formatting.align = 'center';
        else if (algn === 'r') formatting.align = 'right';
        else if (algn === 'just') formatting.align = 'justify';
        else if (algn === 'l') formatting.align = 'left';

        // Get default run properties (defRPr)
        const defRPr = pPr.getElementsByTagName('a:defRPr')[0];
        if (defRPr) {
            // Font size (in hundredths of a point)
            const sz = defRPr.getAttribute('sz');
            if (sz) formatting.fontSize = parseInt(sz) / 100;

            // Bold/Italic
            if (defRPr.getAttribute('b') === '1') formatting.bold = true;
            if (defRPr.getAttribute('i') === '1') formatting.italic = true;

            // Font family
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

            // Color
            const solidFill = defRPr.getElementsByTagName('a:solidFill')[0];
            if (solidFill) {
                formatting.color = this.backgroundExtractor.extractColor(solidFill);
            }
        }

        // Paragraph margins/indentation (EMU values in styles)
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

        // Spacing (before/after/line)
        const parseSpacing = (node) => {
            if (!node) return null;
            const spcPts = node.getElementsByTagName('a:spcPts')[0];
            if (spcPts) {
                const val = parseInt(spcPts.getAttribute('val') || '0', 10);
                if (!Number.isNaN(val)) return (val / 1000) / LayoutTextStyleParser.BASE_FONT_SIZE_PT;
            }
            const spcPct = node.getElementsByTagName('a:spcPct')[0];
            if (spcPct) {
                const val = parseInt(spcPct.getAttribute('val') || '0', 10);
                if (!Number.isNaN(val)) return val / LayoutTextStyleParser.PERCENT_DENOM;
            }
            return null;
        };

        formatting.spaceBeforeEm = parseSpacing(pPr.getElementsByTagName('a:spcBef')[0]);
        formatting.spaceAfterEm = parseSpacing(pPr.getElementsByTagName('a:spcAft')[0]);

        const lnSpc = pPr.getElementsByTagName('a:lnSpc')[0];
        if (lnSpc) {
            const spcPts = lnSpc.getElementsByTagName('a:spcPts')[0];
            if (spcPts) {
                const val = parseInt(spcPts.getAttribute('val') || '0', 10);
                if (!Number.isNaN(val)) formatting.lineHeight = (val / 1000) / LayoutTextStyleParser.BASE_FONT_SIZE_PT;
            }
            const spcPct = lnSpc.getElementsByTagName('a:spcPct')[0];
            if (spcPct) {
                const val = parseInt(spcPct.getAttribute('val') || '0', 10);
                if (!Number.isNaN(val)) formatting.lineHeight = val / LayoutTextStyleParser.PERCENT_DENOM;
            }
        }

        return formatting;
    }

    /**
     * Cache text styles for a master path
     * @param {string} masterPath - Path to master
     * @param {Object} textStyles - Parsed text styles
     */
    cacheTextStyles(masterPath, textStyles) {
        if (textStyles) {
            this.textStylesCache.set(masterPath, textStyles);
        }
    }

    /**
     * Get text style for a placeholder type and level
     * @param {string} masterPath - Path to master
     * @param {string} placeholderType - Type of placeholder (title, body, etc.)
     * @param {number} level - Text level (1-9, default 1)
     * @returns {Object|null} - Formatting object or null
     */
    getTextStyleForPlaceholder(masterPath, placeholderType, level = 1) {
        const textStyles = this.textStylesCache.get(masterPath);
        if (!textStyles) return null;

        // Map placeholder type to style
        let style = null;
        if (placeholderType === 'title' || placeholderType === 'ctrTitle' || placeholderType === 'subTitle') {
            style = textStyles.titleStyle;
        } else if (placeholderType === 'body' || placeholderType === 'obj' || placeholderType === 'content') {
            style = textStyles.bodyStyle;
        } else {
            style = textStyles.otherStyle || textStyles.bodyStyle;
        }

        if (!style) return null;

        // Get level formatting (fall back to level 1 or default)
        return style[level] || style[1] || style.default || null;
    }

    /**
     * Get default text formatting for a placeholder type
     * Merges master text styles with theme defaults
     * @param {string} masterPath - Path to master slide
     * @param {string} placeholderType - Placeholder type (title, body, etc.)
     * @param {number} level - Text level (1-9)
     * @returns {Object} - Formatting defaults
     */
    getTextDefaults(masterPath, placeholderType, level = 1) {
        // Start with theme defaults
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
            lineHeight: null
        };

        // Title placeholders use major font
        if (placeholderType === 'title' || placeholderType === 'ctrTitle' || placeholderType === 'subTitle') {
            defaults.fontFamily = this.themeExtractor ? this.themeExtractor.getTitleFont() : 'Calibri Light';
        }

        // Override with master text styles if available
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
            if (styleFromMaster.spaceBeforeEm !== null && styleFromMaster.spaceBeforeEm !== undefined) defaults.spaceBeforeEm = styleFromMaster.spaceBeforeEm;
            if (styleFromMaster.spaceAfterEm !== null && styleFromMaster.spaceAfterEm !== undefined) defaults.spaceAfterEm = styleFromMaster.spaceAfterEm;
            if (styleFromMaster.lineHeight !== null && styleFromMaster.lineHeight !== undefined) defaults.lineHeight = styleFromMaster.lineHeight;
        }

        return defaults;
    }

    /**
     * Extract text from shape body (for layout/master shapes)
     * Implements proper inheritance: run -> paragraph -> theme
     * @param {Element} txBody - Text body element
     * @returns {Array|null} - Array of text parts or null
     */
    extractShapeText(txBody) {
        const paragraphs = txBody.getElementsByTagName('a:p');
        let textParts = [];

        const themeColor = this.themeExtractor ? this.themeExtractor.getDefaultTextColor() : '#000000';
        const themeFont = this.themeExtractor ? this.themeExtractor.getBodyFont() : 'Calibri';

        for (const para of paragraphs) {
            const pPr = para.getElementsByTagName('a:pPr')[0];
            let align = 'left';
            let defFontSize = null;
            let defColor = null;
            let defFontFamily = null;
            let defBold = false;
            let defItalic = false;
            
            if (pPr) {
                const algn = pPr.getAttribute('algn');
                if (algn === 'ctr') align = 'center';
                else if (algn === 'r') align = 'right';
                else if (algn === 'just') align = 'justify';
                else if (algn === 'l') align = 'left';
                
                // Check for default run properties at paragraph level
                const defRPr = pPr.getElementsByTagName('a:defRPr')[0];
                if (defRPr) {
                    const defSz = defRPr.getAttribute('sz');
                    if (defSz) defFontSize = parseInt(defSz) / 100;
                    
                    // Default color from paragraph
                    const defSolidFill = defRPr.getElementsByTagName('a:solidFill')[0];
                    defColor = this.backgroundExtractor.extractColor(defSolidFill);
                    
                    // Default font from paragraph
                    const defLatin = defRPr.getElementsByTagName('a:latin')[0];
                    if (defLatin) {
                        const typeface = defLatin.getAttribute('typeface');
                        if (typeface) {
                            if (typeface === '+mj-lt' && this.themeExtractor) {
                                defFontFamily = this.themeExtractor.getTitleFont();
                            } else if (typeface === '+mn-lt' && this.themeExtractor) {
                                defFontFamily = this.themeExtractor.getBodyFont();
                            } else if (!typeface.startsWith('+')) {
                                defFontFamily = typeface;
                            }
                        }
                    }
                    
                    // Bold/italic defaults
                    if (defRPr.getAttribute('b') === '1') defBold = true;
                    if (defRPr.getAttribute('i') === '1') defItalic = true;
                }
            }

            const runs = para.getElementsByTagName('a:r');
            let paraText = [];

            for (const run of runs) {
                const textEl = run.getElementsByTagName('a:t')[0];
                if (textEl && textEl.textContent) {
                    const rPr = run.getElementsByTagName('a:rPr')[0];
                    let color = null;
                    let fontSize = null;
                    let fontFamily = null;
                    let bold = defBold;
                    let italic = defItalic;

                    if (rPr) {
                        // Extract color from run
                        const solidFill = rPr.getElementsByTagName('a:solidFill')[0];
                        color = this.backgroundExtractor.extractColor(solidFill);

                        // Extract font size from run
                        const sz = rPr.getAttribute('sz');
                        if (sz) fontSize = parseInt(sz) / 100;

                        // Extract font family from run
                        const latin = rPr.getElementsByTagName('a:latin')[0];
                        if (latin) {
                            const typeface = latin.getAttribute('typeface');
                            if (typeface) {
                                if (typeface === '+mj-lt' && this.themeExtractor) {
                                    fontFamily = this.themeExtractor.getTitleFont();
                                } else if (typeface === '+mn-lt' && this.themeExtractor) {
                                    fontFamily = this.themeExtractor.getBodyFont();
                                } else if (!typeface.startsWith('+')) {
                                    fontFamily = typeface;
                                }
                            }
                        }

                        // Bold/italic - only override if explicitly set
                        if (rPr.hasAttribute('b')) bold = rPr.getAttribute('b') === '1';
                        if (rPr.hasAttribute('i')) italic = rPr.getAttribute('i') === '1';
                    }
                    
                    // Apply inheritance: run -> paragraph -> theme
                    if (!fontSize) fontSize = defFontSize;
                    if (!color) color = defColor || themeColor;
                    if (!fontFamily) fontFamily = defFontFamily || themeFont;

                    paraText.push({
                        text: textEl.textContent,
                        color: color,
                        fontSize: fontSize,
                        fontFamily: fontFamily,
                        bold: bold,
                        italic: italic,
                        align: align
                    });
                }
            }

            if (paraText.length > 0) {
                textParts.push(paraText);
            }
        }

        return textParts.length > 0 ? textParts : null;
    }

    /**
     * Clear the text styles cache (call when loading new file)
     */
    clearCache() {
        this.textStylesCache.clear();
    }

    /**
     * Parse placeholder-level text styles defined directly on a slide layout
     * (a:lstStyle under a placeholder's txBody). Returns a Map keyed by
     * placeholder type with level-based formatting objects.
     * @param {Document} doc - Parsed layout document
     * @returns {Map|null}
     */
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
            if (!placeholderType) continue;

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

            if (Object.keys(levels).length > 0 && placeholderIdx !== null) {
                map.set(`${placeholderType}:${placeholderIdx}`, levels);
            }
        }

        return map.size > 0 ? map : null;
    }
}

// Export for use in other modules
window.LayoutTextStyleParser = LayoutTextStyleParser;
