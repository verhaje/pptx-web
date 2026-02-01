/**
 * Text Extractor Module
 * Handles extraction of text elements with formatting from PPTX slides
 */

class TextExtractor {
    /**
     * Create a TextExtractor
     * @param {ThemeExtractor} themeExtractor - For font resolution
     * @param {BackgroundExtractor} backgroundExtractor - For color extraction
     */
    constructor(themeExtractor, backgroundExtractor) {
        this.themeExtractor = themeExtractor;
        this.backgroundExtractor = backgroundExtractor;
    }

    /**
     * Extract text elements with formatting from slide
     * @param {Document} doc - Parsed slide document
     * @returns {Array} - Array of text element objects
     */
    extractTextElements(doc) {
        const textElements = [];
        const shapes = doc.getElementsByTagName('p:sp');
        
        for (const shape of shapes) {
            // Check if this is a placeholder we should skip (slide number, date, footer)
            if (this.shouldSkipPlaceholder(shape)) {
                continue;
            }
            
            // Determine if this is a title placeholder
            const isTitle = this.isTitlePlaceholder(shape);
            
            const textBody = shape.getElementsByTagName('p:txBody')[0];
            if (textBody) {
                const shapeText = this.extractTextFromBody(textBody, isTitle);
                if (shapeText) {
                    textElements.push(shapeText);
                }
            }
        }
        
        return textElements;
    }

    /**
     * Check if a shape is a placeholder that should be skipped
     * @param {Element} shape - Shape element
     * @returns {boolean} - True if should skip
     */
    shouldSkipPlaceholder(shape) {
        // No longer skip footer, date, or slide number placeholders
        // All text placeholders are now rendered
        return false;
    }

    /**
     * Check if a shape is a title placeholder
     * @param {Element} shape - Shape element
     * @returns {boolean} - True if title placeholder
     */
    isTitlePlaceholder(shape) {
        const nvSpPr = shape.getElementsByTagName('p:nvSpPr')[0];
        if (nvSpPr) {
            const nvPr = nvSpPr.getElementsByTagName('p:nvPr')[0];
            if (nvPr) {
                const ph = nvPr.getElementsByTagName('p:ph')[0];
                if (ph) {
                    const phType = ph.getAttribute('type');
                    // Title-type placeholders use major font
                    return phType === 'title' || phType === 'ctrTitle' || phType === 'subTitle';
                }
            }
        }
        return false;
    }

    /**
     * Extract text from a text body element
     * @param {Element} textBody - Text body element
     * @param {boolean} isTitle - Whether this is title text
     * @returns {Object|null} - Text element object with paragraphs
     */
    extractTextFromBody(textBody, isTitle = false) {
        const paragraphs = textBody.getElementsByTagName('a:p');
        let shapeTextParts = [];
        
        for (const para of paragraphs) {
            const paraContent = this.extractParagraph(para, isTitle);
            if (paraContent.length > 0) {
                shapeTextParts.push(paraContent);
            }
        }
        
        if (shapeTextParts.length > 0) {
            return { paragraphs: shapeTextParts };
        }
        
        return null;
    }

    /**
     * Extract content from a paragraph
     * @param {Element} para - Paragraph element
     * @param {boolean} isTitle - Whether this is title text
     * @returns {Array} - Array of text run objects
     */
    extractParagraph(para, isTitle = false) {
        // Get paragraph-level properties
        const pPr = para.getElementsByTagName('a:pPr')[0];
        let paragraphAlign = 'left';
        let defaultFontSize = null;
        let defaultColor = null;
        let defaultFontFamily = null;
        
        if (pPr) {
            const algn = pPr.getAttribute('algn');
            if (algn === 'ctr') paragraphAlign = 'center';
            else if (algn === 'r') paragraphAlign = 'right';
            else if (algn === 'just') paragraphAlign = 'justify';
            
            // Get default run properties at paragraph level
            const defRPr = pPr.getElementsByTagName('a:defRPr')[0];
            if (defRPr) {
                const sz = defRPr.getAttribute('sz');
                if (sz) defaultFontSize = parseInt(sz) / 100;
                
                // Default color
                const solidFill = defRPr.getElementsByTagName('a:solidFill')[0];
                defaultColor = this.backgroundExtractor.extractColor(solidFill);
                
                // Default font family
                const latin = defRPr.getElementsByTagName('a:latin')[0];
                if (latin) {
                    const typeface = latin.getAttribute('typeface');
                    if (typeface) {
                        const themeFonts = this.themeExtractor.getFonts();
                        if (typeface === '+mj-lt') {
                            defaultFontFamily = themeFonts.majorFont;
                        } else if (typeface === '+mn-lt') {
                            defaultFontFamily = themeFonts.minorFont;
                        } else if (!typeface.startsWith('+')) {
                            defaultFontFamily = typeface;
                        }
                    }
                }
            }
        }
        
        const runs = para.getElementsByTagName('a:r');
        let paraContent = [];
        
        for (const run of runs) {
            const textRun = this.extractTextRun(run, paragraphAlign, isTitle, defaultFontSize, defaultColor, defaultFontFamily);
            if (textRun) {
                paraContent.push(textRun);
            }
        }
        
        // Check for direct text without runs
        if (paraContent.length === 0) {
            const directTexts = para.getElementsByTagName('a:t');
            for (const t of directTexts) {
                if (t.textContent && t.textContent.trim()) {
                    paraContent.push({ 
                        text: t.textContent, 
                        color: defaultColor || this.themeExtractor.getDefaultTextColor(), 
                        bold: false, 
                        italic: false,
                        underline: false,
                        strikethrough: false,
                        superscript: false,
                        subscript: false,
                        textTransform: 'none',
                        fontSize: defaultFontSize,
                        fontFamily: defaultFontFamily || (isTitle ? this.themeExtractor.getTitleFont() : this.themeExtractor.getBodyFont()),
                        align: paragraphAlign,
                        highlight: null,
                        shadow: null
                    });
                }
            }
        }
        
        return paraContent;
    }

    /**
     * Extract a text run with formatting
     * @param {Element} run - Text run element
     * @param {string} paragraphAlign - Paragraph alignment
     * @param {boolean} isTitle - Whether this is title text (for font selection)
     * @param {number|null} defaultFontSize - Default font size from paragraph
     * @param {string|null} defaultColor - Default color from paragraph
     * @param {string|null} defaultFontFamily - Default font family from paragraph
     * @returns {Object|null} - Text run object with formatting
     */
    extractTextRun(run, paragraphAlign, isTitle = false, defaultFontSize = null, defaultColor = null, defaultFontFamily = null) {
        const textEl = run.getElementsByTagName('a:t')[0];
        if (!textEl || !textEl.textContent) {
            return null;
        }

        const text = textEl.textContent;
        const rPr = run.getElementsByTagName('a:rPr')[0];
        
        let color = null;
        let bold = false;
        let italic = false;
        let underline = false;
        let strikethrough = false;
        let fontSize = null;
        let fontFamily = null;
        let highlight = null;
        let superscript = false;
        let subscript = false;
        let textTransform = 'none';
        let shadow = null;
        
        if (rPr) {
            bold = rPr.getAttribute('b') === '1';
            italic = rPr.getAttribute('i') === '1';
            underline = rPr.getAttribute('u') && rPr.getAttribute('u') !== 'none';
            strikethrough = rPr.getAttribute('strike') && rPr.getAttribute('strike') !== 'noStrike';

            // Superscript/subscript via baseline offset (positive -> super, negative -> sub)
            const baseline = rPr.getAttribute('baseline');
            if (baseline) {
                const val = parseInt(baseline, 10);
                if (!Number.isNaN(val)) {
                    superscript = val > 0;
                    subscript = val < 0;
                }
            }

            // Capitalization (all caps / small caps)
            const cap = rPr.getAttribute('cap');
            if (cap === 'small') textTransform = 'small-caps';
            else if (cap === 'all') textTransform = 'uppercase';
            
            // Get font size (in hundredths of a point)
            const sz = rPr.getAttribute('sz');
            if (sz) {
                fontSize = parseInt(sz) / 100;
            }
            
            // Get font family
            fontFamily = this.extractFontFamily(rPr);
            
            // Get color
            const solidFill = rPr.getElementsByTagName('a:solidFill')[0];
            color = this.backgroundExtractor.extractColor(solidFill);

            // Text highlight (background fill behind the run)
            const highlightFill = rPr.getElementsByTagName('a:highlight')[0];
            if (highlightFill) {
                highlight = this.backgroundExtractor.extractColor(highlightFill) || '#ffff00';
            }

            // Basic shadow (outer shadow only)
            const outerShdw = rPr.getElementsByTagName('a:outerShdw')[0];
            if (outerShdw) {
                const dist = parseInt(outerShdw.getAttribute('dist') || '0', 10);
                const dir = parseInt(outerShdw.getAttribute('dir') || '2700000', 10);
                const blur = parseInt(outerShdw.getAttribute('blur') || '0', 10);
                const rad = (dir * Math.PI) / 10800000; // EMUs to radians
                const offsetX = (dist / 12700) * Math.cos(rad);
                const offsetY = (dist / 12700) * Math.sin(rad);
                const colorEl = outerShdw.getElementsByTagName('a:srgbClr')[0];
                const colorVal = colorEl ? colorEl.getAttribute('val') : '000000';
                const alphaEl = outerShdw.getElementsByTagName('a:alpha')[0];
                const alpha = alphaEl ? parseInt(alphaEl.getAttribute('val') || '100000', 10) / 100000 : 1;
                shadow = {
                    offsetX,
                    offsetY,
                    blur: blur / 12700,
                    color: `#${colorVal}`,
                    opacity: alpha
                };
            }
        }
        
        // Apply paragraph defaults when not explicitly set on run
        if (!fontSize && defaultFontSize) {
            fontSize = defaultFontSize;
        }
        if (!color && defaultColor) {
            color = defaultColor;
        }
        if (!fontFamily && defaultFontFamily) {
            fontFamily = defaultFontFamily;
        }
        
        // Apply theme defaults when not explicitly set
        if (!color) {
            // Use default text color from theme
            color = this.themeExtractor.getDefaultTextColor();
        }
        
        if (!fontFamily) {
            // Use appropriate theme font based on context
            fontFamily = isTitle ? this.themeExtractor.getTitleFont() : this.themeExtractor.getBodyFont();
        }
        
        return {
            text: text,
            color: color,
            bold: bold,
            italic: italic,
            underline: underline,
            strikethrough: strikethrough,
            superscript: superscript,
            subscript: subscript,
            textTransform: textTransform,
            fontSize: fontSize,
            fontFamily: fontFamily,
            align: paragraphAlign,
            highlight: highlight,
            shadow: shadow
        };
    }

    /**
     * Extract font family from run properties
     * @param {Element} rPr - Run properties element
     * @returns {string|null} - Font family name or null
     */
    extractFontFamily(rPr) {
        const themeFonts = this.themeExtractor.getFonts();
        
        // Get font family from latin element
        const latin = rPr.getElementsByTagName('a:latin')[0];
        if (latin) {
            const typeface = latin.getAttribute('typeface');
            if (typeface) {
                // Handle theme font references
                if (typeface === '+mj-lt') {
                    return themeFonts.majorFont;
                } else if (typeface === '+mn-lt') {
                    return themeFonts.minorFont;
                } else {
                    return typeface;
                }
            }
        }
        
        // Check for East Asian fonts as fallback
        const ea = rPr.getElementsByTagName('a:ea')[0];
        if (ea) {
            const typeface = ea.getAttribute('typeface');
            if (typeface && !typeface.startsWith('+')) {
                return typeface;
            }
        }
        
        // Check for Complex Script fonts as fallback
        const cs = rPr.getElementsByTagName('a:cs')[0];
        if (cs) {
            const typeface = cs.getAttribute('typeface');
            if (typeface && !typeface.startsWith('+')) {
                return typeface;
            }
        }
        
        return null;
    }
}

// Export for use in other modules
window.TextExtractor = TextExtractor;
