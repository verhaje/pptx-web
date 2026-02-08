/**
 * Shape Parser Module
 * Handles parsing of shapes from PPTX slides
 */

class ShapeParser {
    // Standard PowerPoint slide dimensions in EMUs (16:9 ratio)
    static SLIDE_WIDTH_EMU = 9144000;  // 10 inches at 914400 EMU/inch
    static SLIDE_HEIGHT_EMU = 5143500; // 5.625 inches (16:9 ratio)

    /**
     * Create a ShapeParser
     * @param {BackgroundExtractor} backgroundExtractor - For color extraction
     * @param {Object} images - Map of image names to blob URLs
     * @param {ThemeExtractor} themeExtractor - For theme defaults
     */
    constructor(backgroundExtractor, images, themeExtractor = null) {
        this.backgroundExtractor = backgroundExtractor;
        this.images = images;
        this.themeExtractor = themeExtractor;
    }

    /**
     * Extract shapes from slide document
     * @param {Document} doc - Parsed slide document
     * @param {Array} imageRels - Image relationships
     * @returns {Array} - Array of shape objects
     */
    extractShapes(doc, imageRels = []) {
        const shapes = [];
        
        // Get all shape elements (sp = shape)
        const spElements = doc.getElementsByTagName('p:sp');
        
        for (const sp of spElements) {
            // Parse all shapes, including placeholders, so text inherits master/layout defaults
            const shape = this.parseShape(sp, imageRels);
            if (shape) {
                shapes.push(shape);
            }
        }
        
        return shapes;
    }

    /**
     * Parse a single shape element
     * @param {Element} sp - Shape element
     * @param {Array} imageRels - Image relationships
     * @returns {Object|null} - Shape object or null
     */
    parseShape(sp, imageRels = [], textDefaultsProvider = null, slideNumber = null) {
        const shape = {
            type: 'rect',
            x: null,
            y: null,
            width: null,
            height: null,
            fill: null,
            stroke: null,
            strokeWidth: 1,
            rotation: 0,
            text: null,
            shadow: null,
            cornerRadius: null
        };

        const cNvPr = sp.getElementsByTagName('p:cNvPr')[0];
        const shapeIdAttr = cNvPr ? cNvPr.getAttribute('id') : null;

        // Capture placeholder metadata to resolve template defaults
        const nvSpPr = sp.getElementsByTagName('p:nvSpPr')[0];
        if (nvSpPr) {
            const nvPr = nvSpPr.getElementsByTagName('p:nvPr')[0];
            if (nvPr) {
                const ph = nvPr.getElementsByTagName('p:ph')[0];
                if (ph) {
                    shape.isPlaceholder = true;
                    shape.placeholderType = ph.getAttribute('type') || 'body';
                    shape.placeholderIdx = ph.getAttribute('idx');
                }
            }
        }
        
        // Get shape properties
        const spPr = sp.getElementsByTagName('p:spPr')[0];
        if (!spPr) return null;
        
        // Get transform (position and size)
        const xfrm = spPr.getElementsByTagName('a:xfrm')[0];
        if (xfrm) {
            const off = xfrm.getElementsByTagName('a:off')[0];
            const ext = xfrm.getElementsByTagName('a:ext')[0];
            
            if (off) {
                // Convert EMUs to percentage of slide dimensions
                const xEMU = parseInt(off.getAttribute('x') || '0');
                const yEMU = parseInt(off.getAttribute('y') || '0');
                shape.xEMU = xEMU;
                shape.yEMU = yEMU;
                shape.x = (xEMU / ShapeParser.SLIDE_WIDTH_EMU) * 100;
                shape.y = (yEMU / ShapeParser.SLIDE_HEIGHT_EMU) * 100;
            }
            if (ext) {
                const cxEMU = parseInt(ext.getAttribute('cx') || '0');
                const cyEMU = parseInt(ext.getAttribute('cy') || '0');
                shape.cxEMU = cxEMU;
                shape.cyEMU = cyEMU;
                shape.width = (cxEMU / ShapeParser.SLIDE_WIDTH_EMU) * 100;
                shape.height = (cyEMU / ShapeParser.SLIDE_HEIGHT_EMU) * 100;
            }
            
            // Rotation (in 60,000ths of a degree)
            const rot = xfrm.getAttribute('rot');
            if (rot) {
                shape.rotation = parseInt(rot) / 60000;
            }
        }
        
        // Get shape geometry (preset or custom)
        const prstGeom = spPr.getElementsByTagName('a:prstGeom')[0];
        if (prstGeom) {
            const prst = prstGeom.getAttribute('prst');
            shape.type = this.mapShapeType(prst);
        }
        
        // Get custom geometry if present
        const custGeom = spPr.getElementsByTagName('a:custGeom')[0];
        if (custGeom) {
            shape.customGeometry = this.extractCustomGeometry(custGeom);
            if (shape.customGeometry) {
                shape.type = 'custom';
            }
        }
        
        // Get fill
        shape.fill = this.extractFill(spPr, imageRels);
        
        // If no fill, check for style reference from theme
        if (shape.fill === null) {
            shape.fill = this.extractStyleFill(sp);
        }
        
        // Get stroke/outline
        const ln = spPr.getElementsByTagName('a:ln')[0];
        if (ln) {
            const w = ln.getAttribute('w');
            if (w) {
                shape.strokeWidth = parseInt(w) / 914400 * 96; // EMUs to pixels
            }
            
            const lnSolidFill = ln.getElementsByTagName('a:solidFill')[0];
            const lnNoFill = ln.getElementsByTagName('a:noFill')[0];
            
            if (lnNoFill) {
                shape.stroke = 'none';
            } else if (lnSolidFill) {
                shape.stroke = this.backgroundExtractor.extractColor(lnSolidFill);
            }
        }
        
        // If no stroke defined, check for style reference from theme
        if (shape.stroke === null) {
            shape.stroke = this.extractStyleStroke(sp);
        }
        
        // Get shadow effects
        shape.shadow = this.extractShadow(spPr);
        
        // Get shape geometry (corner radius for rounded shapes)
        shape.cornerRadius = this.extractCornerRadius(spPr);
        
        // Persist shape id for connector resolution
        if (shapeIdAttr) {
            const parsedId = parseInt(shapeIdAttr, 10);
            if (!Number.isNaN(parsedId)) {
                shape.shapeId = parsedId;
            }
        }

        // Get text inside shape
        const txBody = sp.getElementsByTagName('p:txBody')[0];
        if (txBody) {
            const level = this.getParagraphLevel(txBody);
            const placeholderType = shape.placeholderType || 'body';
            const textDefaults = textDefaultsProvider 
                ? textDefaultsProvider(placeholderType, level, shape.placeholderIdx) 
                : null;

            const textContent = this.extractShapeText(txBody, textDefaults, imageRels, slideNumber);
            if (textContent) {
                shape.text = textContent;
            }
            
            // Extract text body properties (vertical anchor, word wrap, etc.)
            const bodyPr = txBody.getElementsByTagName('a:bodyPr')[0];
            if (bodyPr) {
                const anchor = bodyPr.getAttribute('anchor');
                // Only set when present; otherwise allow layout/master inheritance
                if (anchor === 'b') {
                    shape.textVAlign = 'bottom';
                } else if (anchor === 'ctr') {
                    shape.textVAlign = 'middle';
                } else if (anchor === 't') {
                    shape.textVAlign = 'top';
                }
                
                // Check for word wrap (only set when explicitly defined)
                if (bodyPr.hasAttribute('wrap')) {
                    const wrap = bodyPr.getAttribute('wrap');
                    shape.textWrap = wrap !== 'none';
                }

                // Auto-fit: a:normAutofit shrinks text to fit box in PPT; we mark it for renderer handling
                if (bodyPr.getElementsByTagName('a:normAutofit')[0]) {
                    shape.textAutoFit = 'norm';
                } else if (bodyPr.getElementsByTagName('a:noAutofit')[0]) {
                    shape.textAutoFit = 'none';
                }
                
                // Extract text insets (padding from shape edges)
                // PowerPoint default insets: 0.1" (~91440 EMU) on all sides
                // Store as percentages relative to the shape's own dimensions
                const lIns = bodyPr.getAttribute('lIns');
                const rIns = bodyPr.getAttribute('rIns');
                const tIns = bodyPr.getAttribute('tIns');
                const bIns = bodyPr.getAttribute('bIns');
                
                // Default PowerPoint insets are 0.1 inches = 91440 EMU
                const defaultInsetEMU = 91440;
                const lInsEMU = lIns ? parseInt(lIns, 10) : defaultInsetEMU;
                const rInsEMU = rIns ? parseInt(rIns, 10) : defaultInsetEMU;
                const tInsEMU = tIns ? parseInt(tIns, 10) : defaultInsetEMU;
                const bInsEMU = bIns ? parseInt(bIns, 10) : defaultInsetEMU;
                
                // Store insets as percentage of slide dimensions for scaling
                // These will be converted to shape-relative percentages in the renderer
                shape.textInsetsEMU = {
                    left: lInsEMU,
                    right: rInsEMU,
                    top: tInsEMU,
                    bottom: bInsEMU
                };
            }
        }
        
        return shape;
    }

    /**
     * Extract fill from shape properties
     * @param {Element} spPr - Shape properties element
     * @param {Array} imageRels - Image relationships
     * @returns {string|Object|null} - Fill value
     */
    extractFill(spPr, imageRels) {
        // Only check DIRECT children of spPr for fill elements.
        // Using getElementsByTagName would incorrectly match elements nested
        // inside a:ln (e.g., <a:ln><a:noFill/></a:ln> is line-no-fill, not shape-no-fill).
        const directChildren = Array.from(spPr.children || spPr.childNodes).filter(n => n.nodeType === 1);
        const solidFill = directChildren.find(c => c.tagName === 'a:solidFill') || null;
        const gradFill = directChildren.find(c => c.tagName === 'a:gradFill') || null;
        const blipFill = directChildren.find(c => c.tagName === 'a:blipFill') || null;
        const noFill = directChildren.find(c => c.tagName === 'a:noFill') || null;
        
        if (noFill) {
            return 'none';
        } else if (solidFill) {
            // Extract color with opacity
            const colorWithOpacity = this.backgroundExtractor.extractColorWithOpacity(solidFill);
            if (colorWithOpacity) {
                // If opacity is less than 1, return object with color and opacity
                if (colorWithOpacity.opacity < 1) {
                    return { type: 'solid', color: colorWithOpacity.color, opacity: colorWithOpacity.opacity };
                }
                // Otherwise just return the color string for backward compatibility
                return colorWithOpacity.color;
            }
            return null;
        } else if (gradFill) {
            return { type: 'gradient', gradient: this.backgroundExtractor.extractGradient(gradFill) };
        } else if (blipFill) {
            const blip = blipFill.getElementsByTagName('a:blip')[0];
            if (blip) {
                const svgBlip = blip.getElementsByTagName('asvg:svgBlip')[0];
                const svgId = svgBlip ? svgBlip.getAttribute('r:embed') : null;
                const pngId = blip.getAttribute('r:embed');

                const resolveEmbed = (embedId) => {
                    if (!embedId) return null;
                    const rel = imageRels.find(r => r.id === embedId);
                    if (rel) {
                        const imageName = rel.target.split('/').pop();
                        if (this.images[imageName]) return this.images[imageName];
                    }
                    return null;
                };

                // Prefer SVG when present, else fallback to bitmap
                const svgUrl = resolveEmbed(svgId);
                const pngUrl = resolveEmbed(pngId);
                const chosen = svgUrl || pngUrl;
                if (chosen) {
                    return { type: 'image', src: chosen };
                }
            }
        }
        
        return null;
    }

    /**
     * Extract fill color from style reference (p:style/a:fillRef)
     * @param {Element} sp - Shape element
     * @returns {string|null} - Fill color or null
     */
    extractStyleFill(sp) {
        const style = sp.getElementsByTagName('p:style')[0];
        if (!style) return null;

        const fillRef = style.getElementsByTagName('a:fillRef')[0];
        if (!fillRef) return null;

        // fillRef can have idx attribute that points to theme fill matrix
        // and can contain a color element that modifies the theme color
        const idx = parseInt(fillRef.getAttribute('idx') || '0', 10);
        
        // First check for embedded color
        const color = this.backgroundExtractor.extractColor(fillRef);
        if (color) return color;

        // Try to get accent color from theme (idx 1-6 typically map to accent colors)
        if (idx > 0 && idx <= 6 && this.themeExtractor) {
            const accentColor = this.themeExtractor.getAccentColor(idx);
            if (accentColor) {
                return accentColor;
            }
        }

        // Fall back to theme format scheme fill style list (a:fmtScheme/a:fillStyleLst)
        // This is common for placeholders and theme-defined shapes.
        // idx can be 0 (first fill in list) or higher indices
        if (this.themeExtractor && typeof this.themeExtractor.getFillStyleNode === 'function') {
            const fillNode = this.themeExtractor.getFillStyleNode(idx);
            if (fillNode) {
                const tag = fillNode.tagName;
                if (tag === 'a:solidFill') {
                    return this.backgroundExtractor.extractColor(fillNode);
                }
                if (tag === 'a:gradFill') {
                    return { type: 'gradient', gradient: this.backgroundExtractor.extractGradient(fillNode) };
                }
                if (tag === 'a:pattFill') {
                    // Prefer fgClr, fall back to bgClr
                    const fg = fillNode.getElementsByTagName('a:fgClr')[0];
                    const bg = fillNode.getElementsByTagName('a:bgClr')[0];
                    return this.backgroundExtractor.extractColor(fg) || this.backgroundExtractor.extractColor(bg);
                }
                if (tag === 'a:blipFill') {
                    const blip = fillNode.getElementsByTagName('a:blip')[0];
                    const embedId = blip ? blip.getAttribute('r:embed') : null;
                    if (embedId && this.themeExtractor && typeof this.themeExtractor.resolveThemeImageUrl === 'function') {
                        const src = this.themeExtractor.resolveThemeImageUrl(embedId, this.images);
                        if (src) {
                            return { type: 'image', src };
                        }
                    }
                }
            }
        }

        return null;
    }

    /**
     * Extract stroke color from style reference (p:style/a:lnRef)
     * @param {Element} sp - Shape element
     * @returns {string|null} - Stroke color or null
     */
    extractStyleStroke(sp) {
        const style = sp.getElementsByTagName('p:style')[0];
        if (!style) return null;

        const lnRef = style.getElementsByTagName('a:lnRef')[0];
        if (!lnRef) return null;

        // Check for embedded color
        const color = this.backgroundExtractor.extractColor(lnRef);
        if (color) return color;

        // If idx > 0, try to get accent color from theme
        const idx = parseInt(lnRef.getAttribute('idx') || '0', 10);
        if (idx > 0 && idx <= 6 && this.themeExtractor) {
            return this.themeExtractor.getAccentColor(idx);
        }

        return null;
    }

    /**
     * Extract shadow effects from shape properties
     * Supports outerShdw (outer shadow) effects
     * @param {Element} spPr - Shape properties element
     * @returns {Object|null} - Shadow object with blur, distance, direction, color, opacity
     */
    extractShadow(spPr) {
        // Check for effect list in shape properties
        const effectLst = spPr.getElementsByTagName('a:effectLst')[0];
        if (!effectLst) return null;

        // Look for outer shadow
        const outerShdw = effectLst.getElementsByTagName('a:outerShdw')[0];
        if (!outerShdw) return null;

        const shadow = {};

        // Blur radius in EMUs (1 EMU = 1/914400 inch)
        const blurRad = outerShdw.getAttribute('blurRad');
        if (blurRad) {
            // Convert EMU to pixels (assuming 96 DPI)
            const blurRadEMU = parseInt(blurRad);
            shadow.blur = (blurRadEMU / 914400) * 96;
        }

        // Distance (offset) in EMUs
        const dist = outerShdw.getAttribute('dist');
        if (dist) {
            const distEMU = parseInt(dist);
            shadow.distance = (distEMU / 914400) * 96;
        }

        // Direction in 60000ths of a degree
        const dir = outerShdw.getAttribute('dir');
        if (dir) {
            shadow.angle = parseInt(dir) / 60000;
        }

        // Extract shadow color
        const srgbClr = outerShdw.getElementsByTagName('a:srgbClr')[0];
        const schemeClr = outerShdw.getElementsByTagName('a:schemeClr')[0];
        
        if (srgbClr) {
            shadow.color = '#' + srgbClr.getAttribute('val');
        } else if (schemeClr) {
            const schemeColorName = schemeClr.getAttribute('val');
            if (this.themeExtractor) {
                shadow.color = this.themeExtractor.getSchemeColor(schemeColorName) || '#000000';
            } else {
                shadow.color = '#000000';
            }
        } else {
            shadow.color = '#000000';
        }

        // Extract opacity (alpha)
        const alpha = outerShdw.getElementsByTagName('a:alpha')[0];
        if (alpha) {
            const alphaVal = parseInt(alpha.getAttribute('val') || '100000');
            shadow.opacity = alphaVal / 100000;
        } else {
            shadow.opacity = 1;
        }

        return Object.keys(shadow).length > 0 ? shadow : null;
    }

    /**
     * Extract corner radius from shape geometry
     * Handles preset rounded rectangles with adjustments
     * @param {Element} spPr - Shape properties element
     * @returns {number|null} - Corner radius as percentage (0-50), or null
     */
    extractCornerRadius(spPr) {
        const prstGeom = spPr.getElementsByTagName('a:prstGeom')[0];
        if (!prstGeom) return null;

        const prst = prstGeom.getAttribute('prst');
        if (!prst) return null;

        // Presets that have rounded corners
        const roundedShapes = {
            'roundRect': 0.05,      // Standard rounded rectangle - 5%
            'roundSquare': 0.05,    // Standard rounded square - 5%
            'round2SameRect': 0.10, // round2SameRect (used in slideLayout3) - 10%
            'round1Rect': 0.03,     // Slightly rounded - 3%
            'round2Rect': 0.10      // More rounded - 10%
        };

        if (!roundedShapes[prst]) return null;

        // Check for adjustment list (adjLst) to override default
        const adjLst = prstGeom.getElementsByTagName('a:adjLst')[0];
        if (adjLst) {
            const adj = adjLst.getElementsByTagName('a:adj')[0];
            if (adj) {
                const val = adj.getAttribute('val');
                if (val) {
                    // Adjustment is typically 0-100000 (percentage * 1000)
                    const adjVal = parseInt(val);
                    // Convert to percentage (0-1 range)
                    return (adjVal / 100000) * 0.5; // Cap at 50%
                }
            }
        }

        // Return default for the shape type
        return roundedShapes[prst];
    }


    /**
     * Map PowerPoint shape preset to shape types
     * @param {string} prst - Preset shape name
     * @returns {string} - Mapped shape type
     */
    mapShapeType(prst) {
        const shapeMap = {
            'rect': 'rect',
            'square': 'square',
            'roundRect': 'roundRect',
            'roundSquare': 'roundSquare',
            'ellipse': 'ellipse',
            'circle': 'circle',
            'triangle': 'triangle',
            'isoscelesTriangle': 'triangle',
            'rtTriangle': 'rightTriangle',
            'parallelogram': 'parallelogram',
            'trapezoid': 'trapezoid',
            'diamond': 'diamond',
            'pentagon': 'pentagon',
            'hexagon': 'hexagon',
            'heptagon': 'heptagon',
            'octagon': 'octagon',
            'star4': 'star4',
            'star5': 'star5',
            'star6': 'star6',
            'arrow': 'arrow',
            'rightArrow': 'rightArrow',
            'leftArrow': 'leftArrow',
            'upArrow': 'upArrow',
            'downArrow': 'downArrow',
            'heart': 'heart',
            'lightningBolt': 'lightning',
            'sun': 'sun',
            'moon': 'moon',
            'cloud': 'cloud',
            'line': 'line',
            'straightConnector1': 'line',
            // Callout/Speech bubble shapes
            'speechBubble': 'speechBubble',
            'speechBubbleOval': 'speechBubbleOval',
            'calloutRectangle': 'calloutRect',
            'calloutRoundRect': 'calloutRoundRect',
            'calloutOval': 'calloutOval',
            // Flowchart shapes (basic)
            'flowChartProcess': 'flowChartProcess',
            'flowChartDecision': 'flowChartDecision',
            'flowChartInputOutput': 'flowChartInputOutput',
            'flowChartTerminator': 'flowChartTerminator',
            'flowChartData': 'flowChartData',
            'flowChartDocument': 'flowChartDocument',
            'flowChartMultidocument': 'flowChartMultidocument',
            'flowChartPredefinedProcess': 'flowChartPredefinedProcess',
            'flowChartOffPageConnector': 'flowChartOffPage',
            'flowChartMerge': 'flowChartMerge',
            'flowChartExtract': 'flowChartExtract',
            'flowChartOr': 'flowChartOr',
            'flowChartSum': 'flowChartSum',
            'flowChartSort': 'flowChartSort',
            'flowChartManualInput': 'flowChartManualInput',
            'flowChartDelay': 'flowChartDelay',
            // 3D shapes
            'cube': 'cube',
            'cylinder': 'cylinder',
            'sphere': 'sphere',
            'cone': 'cone',
            'pyramid': 'pyramid',
            'tetrahedron': 'tetrahedron',
            'octahedron': 'octahedron',
            // Block arrows
            'blockArcRight': 'blockArcRight',
            'blockArcLeft': 'blockArcLeft',
            'blockArcUp': 'blockArcUp',
            'blockArcDown': 'blockArcDown',
            // Additional arrows
            'quadArrow': 'quadArrow',
            'leftRightArrow': 'leftRightArrow',
            'upDownArrow': 'upDownArrow',
            'ribbon': 'ribbon',
            'ribbon2': 'ribbon2',
            'doubleWave': 'doubleWave',
            'chevron': 'chevron',
            'chevronRight': 'chevronRight',
            'curvedUpArrow': 'curvedUpArrow',
            'curvedDownArrow': 'curvedDownArrow',
            'curvedLeftArrow': 'curvedLeftArrow',
            'curvedRightArrow': 'curvedRightArrow',
            'actionButtonHome': 'actionHome',
            'actionButtonHelp': 'actionHelp',
            'actionButtonInformation': 'actionInfo',
            'actionButtonSound': 'actionSound',
            'actionButtonMovie': 'actionMovie',
            'actionButtonDocument': 'actionDocument',
            'actionButtonReturn': 'actionReturn',
            'actionButtonForward': 'actionForward',
            'explosion1': 'explosion16',
            'explosion2': 'explosion32',
            'star7': 'star7',
            'star8': 'star8',
            'star10': 'star10',
            'star12': 'star12',
            'star16': 'star16',
            'star24': 'star24',
            'star32': 'star32'
        };
        const mapped = shapeMap[prst];
        if (!mapped) {
            console.warn(`[PPTX] Unmapped preset shape '${prst}', defaulting to rect`);
        }
        return mapped || 'rect';
    }

    /**
     * Extract text from shape body
     * @param {Element} txBody - Text body element
     * @param {Object} textDefaults - Optional default formatting from master text styles
     * @returns {Array|null} - Array of text parts or null
     */
    extractShapeText(txBody, textDefaults = null, rels = null, slideNumber = null) {
        const paragraphs = txBody.getElementsByTagName('a:p');
        let textParts = [];

        const BASE_FONT_SIZE_PT = 18;
        const EMU_PER_POINT = 12700;
        const PERCENT_DENOM = 100000;
        
        // Get default text color and font from theme (base level)
        const themeColor = this.themeExtractor ? this.themeExtractor.getDefaultTextColor() : '#000000';
        const themeFont = this.themeExtractor ? this.themeExtractor.getBodyFont() : 'Calibri';
        
        // Use text defaults from master if provided (override theme defaults)
        const defaultColor = textDefaults?.color || themeColor;
        const defaultFont = textDefaults?.fontFamily || themeFont;
        const defaultFontSize = textDefaults?.fontSize || null;
        const defaultBold = textDefaults?.bold || false;
        const defaultItalic = textDefaults?.italic || false;
        const defaultAlign = textDefaults?.align || 'left';
        
        for (const para of paragraphs) {
            // Get paragraph alignment
            const pPr = para.getElementsByTagName('a:pPr')[0];
            let align = defaultAlign;
            let paraFontSize = defaultFontSize;
            let paraColor = null;
            let paraFontFamily = null;
            let spaceBeforeEm = null;
            let spaceAfterEm = null;
            let lineHeight = null;

            // Bullet / list metadata
            let lvl = 0; // 0-based
            let bullet = null; // { type: 'none' | 'char' | 'auto', ... }
            let marLEm = null;
            let indentEm = null;
            
            if (pPr) {
                const algn = pPr.getAttribute('algn');
                if (algn === 'ctr') align = 'center';
                else if (algn === 'r') align = 'right';
                else if (algn === 'just') align = 'justify';
                else if (algn === 'l') align = 'left';

                const lvlAttr = pPr.getAttribute('lvl');
                if (lvlAttr !== null) {
                    const parsed = parseInt(lvlAttr, 10);
                    if (!Number.isNaN(parsed)) lvl = Math.max(0, parsed);
                }

                const marLAttr = pPr.getAttribute('marL');
                if (marLAttr !== null) {
                    const marL = parseInt(marLAttr, 10);
                    if (!Number.isNaN(marL)) {
                        marLEm = (marL / EMU_PER_POINT) / BASE_FONT_SIZE_PT;
                    }
                }

                const indentAttr = pPr.getAttribute('indent');
                if (indentAttr !== null) {
                    const indent = parseInt(indentAttr, 10);
                    if (!Number.isNaN(indent)) {
                        indentEm = (indent / EMU_PER_POINT) / BASE_FONT_SIZE_PT;
                    }
                }

                const buNone = pPr.getElementsByTagName('a:buNone')[0];
                if (buNone) {
                    bullet = { type: 'none' };
                } else {
                    const buAutoNum = pPr.getElementsByTagName('a:buAutoNum')[0];
                    const buChar = pPr.getElementsByTagName('a:buChar')[0];
                    if (buAutoNum) {
                        bullet = {
                            type: 'auto',
                            numType: buAutoNum.getAttribute('type') || null,
                            startAt: buAutoNum.getAttribute('startAt') ? parseInt(buAutoNum.getAttribute('startAt'), 10) : null
                        };
                    } else if (buChar) {
                        bullet = {
                            type: 'char',
                            char: buChar.getAttribute('char') || '•'
                        };
                    } else if (lvlAttr !== null) {
                        // Common case: bullets defined by master style; lvl is still present.
                        bullet = { type: 'char', char: '•', inferred: true };
                    }
                }
                
                // Check for paragraph-level default run properties
                const defRPr = pPr.getElementsByTagName('a:defRPr')[0];
                if (defRPr) {
                    const sz = defRPr.getAttribute('sz');
                    if (sz) paraFontSize = parseInt(sz) / 100;
                    
                    const solidFill = defRPr.getElementsByTagName('a:solidFill')[0];
                    paraColor = this.backgroundExtractor.extractColor(solidFill);
                    
                    const latin = defRPr.getElementsByTagName('a:latin')[0];
                    if (latin) {
                        const typeface = latin.getAttribute('typeface');
                        if (typeface) {
                            if (typeface === '+mj-lt' && this.themeExtractor) {
                                paraFontFamily = this.themeExtractor.getTitleFont();
                            } else if (typeface === '+mn-lt' && this.themeExtractor) {
                                paraFontFamily = this.themeExtractor.getBodyFont();
                            } else if (!typeface.startsWith('+')) {
                                paraFontFamily = typeface;
                            }
                        }
                    }
                }

                // Spacing (before/after/line)
                const parseSpacing = (node) => {
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
                };

                spaceBeforeEm = parseSpacing(pPr.getElementsByTagName('a:spcBef')[0]);
                spaceAfterEm = parseSpacing(pPr.getElementsByTagName('a:spcAft')[0]);

                const lnSpc = pPr.getElementsByTagName('a:lnSpc')[0];
                if (lnSpc) {
                    const spcPts = lnSpc.getElementsByTagName('a:spcPts')[0];
                    if (spcPts) {
                        const val = parseInt(spcPts.getAttribute('val') || '0', 10);
                        if (!Number.isNaN(val)) lineHeight = (val / 1000) / BASE_FONT_SIZE_PT;
                    }
                    const spcPct = lnSpc.getElementsByTagName('a:spcPct')[0];
                    if (spcPct) {
                        const val = parseInt(spcPct.getAttribute('val') || '0', 10);
                        if (!Number.isNaN(val)) lineHeight = val / PERCENT_DENOM;
                    }
                }
            }
            
            const paraText = [];

            const runNodes = Array.from(para.childNodes)
                .filter(n => n && n.nodeType === 1 && (n.tagName === 'a:r' || n.tagName === 'a:fld'));
            
            for (const run of runNodes) {
                const isField = run.tagName === 'a:fld';
                const textEl = run.getElementsByTagName('a:t')[0];
                let runText = textEl ? textEl.textContent : '';

                if (isField) {
                    const fieldType = (run.getAttribute('type') || '').toLowerCase();
                    if (fieldType.includes('slidenum') && slideNumber !== null && slideNumber !== undefined) {
                        runText = String(slideNumber);
                    }
                }

                if (runText) {
                    const rPr = run.getElementsByTagName('a:rPr')[0];
                    let color = null;
                    let hasExplicitColor = false;
                    let fontSize = null;
                    let fontFamily = null;
                    let bold = defaultBold;
                    let italic = defaultItalic;
                    let underline = false;
                    let strikethrough = false;
                    let superscript = false;
                    let subscript = false;
                    let textTransform = 'none';
                    let highlight = null;
                    let shadow = null;
                    let link = null;
                    
                    if (rPr) {
                        const solidFill = rPr.getElementsByTagName('a:solidFill')[0];
                        color = this.backgroundExtractor.extractColor(solidFill);
                        hasExplicitColor = !!color;
                        
                        const sz = rPr.getAttribute('sz');
                        if (sz) {
                            fontSize = parseInt(sz) / 100;
                        }
                        
                        // Get font family
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
                        underline = rPr.getAttribute('u') && rPr.getAttribute('u') !== 'none';
                        strikethrough = rPr.getAttribute('strike') && rPr.getAttribute('strike') !== 'noStrike';

                        // Superscript/subscript based on baseline offset
                        const baseline = rPr.getAttribute('baseline');
                        if (baseline) {
                            const val = parseInt(baseline, 10);
                            if (!Number.isNaN(val)) {
                                superscript = val > 0;
                                subscript = val < 0;
                            }
                        }

                        const cap = rPr.getAttribute('cap');
                        if (cap === 'small') textTransform = 'small-caps';
                        else if (cap === 'all') textTransform = 'uppercase';

                        const highlightFill = rPr.getElementsByTagName('a:highlight')[0];
                        if (highlightFill) {
                            highlight = this.backgroundExtractor.extractColor(highlightFill) || '#ffff00';
                        }

                        const outerShdw = rPr.getElementsByTagName('a:outerShdw')[0];
                        if (outerShdw) {
                            const dist = parseInt(outerShdw.getAttribute('dist') || '0', 10);
                            const dir = parseInt(outerShdw.getAttribute('dir') || '2700000', 10);
                            const blur = parseInt(outerShdw.getAttribute('blur') || '0', 10);
                            const rad = (dir * Math.PI) / 10800000;
                            const offsetX = (dist / EMU_PER_POINT) * Math.cos(rad);
                            const offsetY = (dist / EMU_PER_POINT) * Math.sin(rad);
                            const colorEl = outerShdw.getElementsByTagName('a:srgbClr')[0];
                            const colorVal = colorEl ? colorEl.getAttribute('val') : '000000';
                            const alphaEl = outerShdw.getElementsByTagName('a:alpha')[0];
                            const alpha = alphaEl ? parseInt(alphaEl.getAttribute('val') || '100000', 10) / 100000 : 1;
                            shadow = {
                                offsetX,
                                offsetY,
                                blur: blur / EMU_PER_POINT,
                                color: `#${colorVal}`,
                                opacity: alpha
                            };
                        }

                        // Hyperlink (run-level)
                        const hlinkClick = rPr.getElementsByTagName('a:hlinkClick')[0];
                        if (hlinkClick) {
                            const relId = hlinkClick.getAttribute('r:id') || hlinkClick.getAttribute('id');
                            if (relId && Array.isArray(rels)) {
                                link = this.resolveHyperlink(rels, relId);
                            }
                        }
                    }
                    
                    // Apply inheritance: run -> paragraph -> master -> theme
                    // Font size: run > paragraph > master default
                    if (!fontSize) {
                        fontSize = paraFontSize || defaultFontSize;
                    }
                    
                    // Color: run > paragraph > master default > theme
                    if (!color) {
                        color = paraColor || defaultColor;
                    }

                    // Hyperlink default color (only when no explicit run color)
                    if (link && !hasExplicitColor && !paraColor && this.themeExtractor) {
                        color = this.themeExtractor.getHyperlinkColor();
                    }
                    
                    // Font family: run > paragraph > master default > theme
                    if (!fontFamily) {
                        fontFamily = paraFontFamily || defaultFont;
                    }
                    
                    paraText.push({
                        text: runText,
                        color: color,
                        fontSize: fontSize,
                        fontFamily: fontFamily,
                        bold: bold,
                        italic: italic,
                        underline: underline,
                        strikethrough: strikethrough,
                        superscript: superscript,
                        subscript: subscript,
                        textTransform: textTransform,
                        highlight: highlight,
                        shadow: shadow,
                        link: link,
                        align: align
                    });
                }
            }

            // Direct text without runs
            if (paraText.length === 0) {
                const directTexts = para.getElementsByTagName('a:t');
                for (const t of directTexts) {
                    const txt = t?.textContent;
                    if (txt && txt.trim()) {
                        paraText.push({
                            text: txt,
                            color: paraColor || defaultColor,
                            fontSize: paraFontSize || defaultFontSize,
                            fontFamily: paraFontFamily || defaultFont,
                            bold: defaultBold,
                            italic: defaultItalic,
                            underline: false,
                            strikethrough: false,
                            superscript: false,
                            subscript: false,
                            textTransform: 'none',
                            highlight: null,
                            shadow: null,
                            link: null,
                            align: align
                        });
                    }
                }
            }
            
            if (paraText.length > 0) {
                // If paragraph lacked explicit marL/indent, fall back to master/layout defaults
                if (marLEm === null && textDefaults && typeof textDefaults.marLEm === 'number') {
                    marLEm = textDefaults.marLEm;
                }
                if (indentEm === null && textDefaults && typeof textDefaults.indentEm === 'number') {
                    indentEm = textDefaults.indentEm;
                }
                if (spaceBeforeEm === null && textDefaults && typeof textDefaults.spaceBeforeEm === 'number') {
                    spaceBeforeEm = textDefaults.spaceBeforeEm;
                }
                if (spaceAfterEm === null && textDefaults && typeof textDefaults.spaceAfterEm === 'number') {
                    spaceAfterEm = textDefaults.spaceAfterEm;
                }
                if (lineHeight === null && textDefaults && typeof textDefaults.lineHeight === 'number') {
                    lineHeight = textDefaults.lineHeight;
                }
                // Attach paragraph metadata to the first run for renderer consumption
                paraText[0].lvl = lvl;
                // Inherit bullet from master/layout defaults when not explicitly set
                if (!bullet && textDefaults && textDefaults.bullet) {
                    bullet = textDefaults.bullet;
                }
                if (bullet) paraText[0].bullet = bullet;
                if (typeof marLEm === 'number') paraText[0].marLEm = marLEm;
                if (typeof indentEm === 'number') paraText[0].indentEm = indentEm;
                if (typeof spaceBeforeEm === 'number') paraText[0].spaceBeforeEm = spaceBeforeEm;
                if (typeof spaceAfterEm === 'number') paraText[0].spaceAfterEm = spaceAfterEm;
                if (typeof lineHeight === 'number') paraText[0].lineHeight = lineHeight;
                textParts.push(paraText);
            }
        }
        
        return textParts.length > 0 ? textParts : null;
    }

    /**
     * Resolve a run hyperlink relationship id into a usable link object.
     * Supports external hyperlinks and simple internal slide targets.
     */
    resolveHyperlink(rels, relId) {
        if (!Array.isArray(rels) || !relId) return null;
        const rel = rels.find(r => r && r.getAttribute && r.getAttribute('Id') === relId);
        if (!rel) return null;

        const target = rel.getAttribute('Target') || '';
        const targetMode = (rel.getAttribute('TargetMode') || '').toLowerCase();
        const isExternal = targetMode === 'external' || /^https?:\/\//i.test(target) || /^mailto:/i.test(target);

        if (isExternal) {
            return { kind: 'url', href: target };
        }

        // Internal slide link heuristics (e.g. slides/slide2.xml)
        const m = target.match(/slide(\d+)\.xml$/i);
        if (m) {
            const slideIndex = Math.max(0, parseInt(m[1], 10) - 1);
            return { kind: 'slide', slideIndex };
        }

        return { kind: 'internal', target };
    }

    /**
     * Infer text level for placeholder defaults (PowerPoint levels are 0-based)
     * @param {Element} txBody - Text body element
     * @returns {number} - Paragraph level (1-9)
     */
    getParagraphLevel(txBody) {
        const firstPara = txBody.getElementsByTagName('a:p')[0];
        if (firstPara) {
            const pPr = firstPara.getElementsByTagName('a:pPr')[0];
            if (pPr) {
                const lvlAttr = pPr.getAttribute('lvl');
                const lvl = lvlAttr !== null ? parseInt(lvlAttr, 10) : NaN;
                if (!Number.isNaN(lvl)) {
                    return Math.min(9, Math.max(1, lvl + 1));
                }
            }
        }
        return 1;
    }

    /**
     * Extract custom geometry from custGeom element
     * Converts PowerPoint custom geometry paths to SVG format
     * @param {Element} custGeom - Custom geometry element
     * @returns {Object|null} - Custom geometry object with SVG path data
     */
    extractCustomGeometry(custGeom) {
        if (!custGeom) return null;

        const geometry = {
            paths: [],
            bounds: { x: 0, y: 0, w: 21600, h: 21600 },
            guides: []
        };

        // Extract shape bounds (in EMU units, typically 0-21600)
        const bbox = custGeom.getAttribute('bbox');
        if (bbox) {
            const parts = bbox.split(' ');
            if (parts.length === 4) {
                geometry.bounds = {
                    x: parseInt(parts[0]),
                    y: parseInt(parts[1]),
                    w: parseInt(parts[2]),
                    h: parseInt(parts[3])
                };
            }
        }

        // Extract guide lines (for adjustments)
        const gdLst = custGeom.getElementsByTagName('a:gdLst')[0];
        if (gdLst) {
            const guides = gdLst.getElementsByTagName('a:gd');
            for (const gd of guides) {
                const name = gd.getAttribute('name');
                const fmla = gd.getAttribute('fmla');
                geometry.guides.push({ name, fmla });
            }
        }

        // Extract paths (actual shape outline)
        const pathLst = custGeom.getElementsByTagName('a:pathLst')[0];
        if (pathLst) {
            const paths = pathLst.getElementsByTagName('a:path');
            for (const path of paths) {
                const w = parseInt(path.getAttribute('w') || geometry.bounds.w);
                const h = parseInt(path.getAttribute('h') || geometry.bounds.h);
                const fill = path.getAttribute('fill') || 'norm';
                const stroke = path.getAttribute('stroke') !== 'false';

                // Extract path data from moveTo, lnTo, cubicBezTo, etc.
                const pathData = this.extractPathData(path, w, h);
                
                geometry.paths.push({
                    data: pathData,
                    w, h,
                    fill, stroke
                });
            }
        }

        return geometry.paths.length > 0 ? geometry : null;
    }

    /**
     * Extract path data from custom geometry path element
     * Converts a:moveTo, a:lnTo, a:cubicBezTo, a:arcTo to SVG path commands
     * @param {Element} pathElement - Path element
     * @param {number} width - Path width
     * @param {number} height - Path height
     * @returns {string} - SVG path data string
     */
    extractPathData(pathElement, width, height) {
        const commands = [];
        const childNodes = Array.from(pathElement.childNodes)
            .filter(n => n.nodeType === 1); // Element nodes only

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
            } else if (tag === 'a:cubicBezTo') {
                const pts = child.getElementsByTagName('a:pt');
                if (pts.length >= 3) {
                    const x1 = parseInt(pts[0].getAttribute('x') || '0') / width * 100;
                    const y1 = parseInt(pts[0].getAttribute('y') || '0') / height * 100;
                    const x2 = parseInt(pts[1].getAttribute('x') || '0') / width * 100;
                    const y2 = parseInt(pts[1].getAttribute('y') || '0') / height * 100;
                    const x = parseInt(pts[2].getAttribute('x') || '0') / width * 100;
                    const y = parseInt(pts[2].getAttribute('y') || '0') / height * 100;
                    commands.push(`C ${x1} ${y1} ${x2} ${y2} ${x} ${y}`);
                }
            } else if (tag === 'a:arcTo') {
                // Arc to - for now, approximate with line
                // Full implementation would need rx, ry, xAxisRotation, largeArc, sweep
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
}

// Export for use in other modules
window.ShapeParser = ShapeParser;
