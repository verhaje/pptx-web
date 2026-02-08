/**
 * Layout Shape Parser Module
 * Handles parsing of shapes, pictures, groups, and connectors from layouts/masters
 */

class LayoutShapeParser {
    // Standard PowerPoint slide dimensions in EMUs (16:9 ratio)
    static SLIDE_WIDTH_EMU = 9144000;
    static SLIDE_HEIGHT_EMU = 5143500;

    /**
     * Create a LayoutShapeParser
     * @param {BackgroundExtractor} backgroundExtractor - For color extraction
     * @param {ThemeExtractor} themeExtractor - For theme defaults
     * @param {Object} images - Map of image names to blob URLs
     */
    constructor(backgroundExtractor, themeExtractor, images) {
        this.backgroundExtractor = backgroundExtractor;
        this.themeExtractor = themeExtractor;
        this.images = images;
    }

    /**
     * Parse a shape from layout/master
     * @param {Element} sp - Shape element
     * @param {Array} rels - Relationships array
     * @param {LayoutTextStyleParser} textStyleParser - For text extraction
     * @returns {Object|null} - Shape data or null
     */
    parseLayoutShape(sp, rels, textStyleParser = null) {
        const cNvPr = sp.getElementsByTagName('p:cNvPr')[0];
        const shapeIdAttr = cNvPr ? cNvPr.getAttribute('id') : null;

        const shape = {
            type: 'rect',
            x: 0,
            y: 0,
            width: 100,
            height: 100,
            fill: null,
            stroke: null,
            strokeWidth: 1,
            rotation: 0,
            text: null,
            isPlaceholder: false,
            placeholderType: null,
            placeholderIdx: null,
            fromLayout: true,
            shadow: null,
            cornerRadius: null,
            customGeometry: null,
            shapeId: shapeIdAttr ? parseInt(shapeIdAttr, 10) : null
        };

        // Check if this is a placeholder
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
        if (!spPr) return shape;

        const xfrm = spPr.getElementsByTagName('a:xfrm')[0];
        if (xfrm) {
            shape._hasExplicitTransform = true;
            const off = xfrm.getElementsByTagName('a:off')[0];
            const ext = xfrm.getElementsByTagName('a:ext')[0];
            if (off) {
                shape.x = (parseInt(off.getAttribute('x') || '0') / LayoutShapeParser.SLIDE_WIDTH_EMU) * 100;
                shape.y = (parseInt(off.getAttribute('y') || '0') / LayoutShapeParser.SLIDE_HEIGHT_EMU) * 100;
            }
            if (ext) {
                shape.width = (parseInt(ext.getAttribute('cx') || '0') / LayoutShapeParser.SLIDE_WIDTH_EMU) * 100;
                shape.height = (parseInt(ext.getAttribute('cy') || '0') / LayoutShapeParser.SLIDE_HEIGHT_EMU) * 100;
            }

            const rot = xfrm.getAttribute('rot');
            if (rot) {
                shape.rotation = parseInt(rot, 10) / 60000;
            }
        } else {
            shape._hasExplicitTransform = false;
        }

        // Get shape geometry
        const prstGeom = spPr.getElementsByTagName('a:prstGeom')[0];
        if (prstGeom) {
            const prst = prstGeom.getAttribute('prst') || 'rect';
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

        // Get shadow effects
        shape.shadow = this.extractShadow(spPr);

        // Get corner radius from geometry
        shape.cornerRadius = this.extractCornerRadius(spPr);
        
        // Get fill (also for placeholders so slide shapes can inherit)
        // Only check DIRECT children of spPr for fill elements.
        // Using getElementsByTagName would incorrectly match elements nested
        // inside a:ln (e.g., <a:ln><a:noFill/></a:ln> is line-no-fill, not shape-no-fill).
        const directChildren = Array.from(spPr.children || spPr.childNodes).filter(n => n.nodeType === 1);
        const solidFill = directChildren.find(c => c.tagName === 'a:solidFill') || null;
        const gradFill = directChildren.find(c => c.tagName === 'a:gradFill') || null;
        const blipFill = directChildren.find(c => c.tagName === 'a:blipFill') || null;
        const noFill = directChildren.find(c => c.tagName === 'a:noFill') || null;
        
        if (noFill) {
            shape.fill = 'none';
        } else if (solidFill) {
            // Extract color with opacity
            const colorWithOpacity = this.backgroundExtractor.extractColorWithOpacity(solidFill);
            if (colorWithOpacity) {
                // If opacity is less than 1, return object with color and opacity
                if (colorWithOpacity.opacity < 1) {
                    shape.fill = { type: 'solid', color: colorWithOpacity.color, opacity: colorWithOpacity.opacity };
                } else {
                    // Otherwise just use the color string for backward compatibility
                    shape.fill = colorWithOpacity.color;
                }
            }
        } else if (gradFill) {
            shape.fill = {
                type: 'gradient',
                gradient: this.backgroundExtractor.extractGradient(gradFill)
            };
        } else if (blipFill) {
            const blip = blipFill.getElementsByTagName('a:blip')[0];
            if (blip) {
                const svgBlip = blip.getElementsByTagName('asvg:svgBlip')[0];
                const svgId = svgBlip ? svgBlip.getAttribute('r:embed') : null;
                const pngId = blip.getAttribute('r:embed');

                const resolveRel = (embedId) => {
                    if (!embedId) return null;
                    const rel = rels.find(r => r.getAttribute('Id') === embedId);
                    if (rel) {
                        const imageName = rel.getAttribute('Target').split('/').pop();
                        return this.images[imageName] || null;
                    }
                    return null;
                };

                const svgUrl = resolveRel(svgId);
                const pngUrl = resolveRel(pngId);
                const chosen = svgUrl || pngUrl;
                if (chosen) {
                    shape.fill = { type: 'image', src: chosen };
                }
            }
        }
    
        // If no fill, check for style reference from theme
        if (!shape.fill) {
            shape.fill = this.extractStyleFill(sp);
        }

        // Get stroke
        const ln = spPr.getElementsByTagName('a:ln')[0];
        if (ln) {
            const w = ln.getAttribute('w');
            if (w) {
                shape.strokeWidth = parseInt(w) / 914400 * 96;
            }
            
            const lnSolidFill = ln.getElementsByTagName('a:solidFill')[0];
            const lnNoFill = ln.getElementsByTagName('a:noFill')[0];
            
            if (lnNoFill) {
                shape.stroke = 'none';
            } else if (lnSolidFill) {
                shape.stroke = this.backgroundExtractor.extractColor(lnSolidFill);
            }
        }
        
        // If no stroke, check for style reference from theme
        if (shape.stroke === null) {
            shape.stroke = this.extractStyleStroke(sp);
        }

        // Get text for non-placeholder shapes
        const txBody = sp.getElementsByTagName('p:txBody')[0];
        if (!shape.isPlaceholder && txBody && textStyleParser) {
            shape.text = textStyleParser.extractShapeText(txBody);
        }

        // Capture text body properties (vertical anchor, wrapping, insets) for inheritance
        if (txBody) {
            const bodyPr = txBody.getElementsByTagName('a:bodyPr')[0];
            if (bodyPr) {
                const anchor = bodyPr.getAttribute('anchor');
                if (anchor === 'b') {
                    shape.textVAlign = 'bottom';
                } else if (anchor === 'ctr') {
                    shape.textVAlign = 'middle';
                } else if (anchor === 't') {
                    shape.textVAlign = 'top';
                }

                const wrap = bodyPr.getAttribute('wrap');
                shape.textWrap = wrap !== 'none';

                // Auto-fit markers to allow slide shapes to inherit
                if (bodyPr.getElementsByTagName('a:normAutofit')[0]) {
                    shape.textAutoFit = 'norm';
                } else if (bodyPr.getElementsByTagName('a:noAutofit')[0]) {
                    shape.textAutoFit = 'none';
                }

                // PowerPoint default text insets are 0.1" (91440 EMU) on all sides
                const defaultInsetEMU = 91440;
                const lInsEMU = bodyPr.getAttribute('lIns') ? parseInt(bodyPr.getAttribute('lIns'), 10) : defaultInsetEMU;
                const rInsEMU = bodyPr.getAttribute('rIns') ? parseInt(bodyPr.getAttribute('rIns'), 10) : defaultInsetEMU;
                const tInsEMU = bodyPr.getAttribute('tIns') ? parseInt(bodyPr.getAttribute('tIns'), 10) : defaultInsetEMU;
                const bInsEMU = bodyPr.getAttribute('bIns') ? parseInt(bodyPr.getAttribute('bIns'), 10) : defaultInsetEMU;

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
        return shapeMap[prst] || prst || 'rect';
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

        const idx = parseInt(fillRef.getAttribute('idx') || '0', 10);
        
        // First check for embedded color in fillRef
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
     * Parse a picture from layout/master
     * @param {Element} picEl - Picture element
     * @param {Array} rels - Relationships array
     * @returns {Object|null} - Picture data or null
     */
    parseLayoutPicture(picEl, rels) {
        const picture = {
            type: 'picture',
            x: 0,
            y: 0,
            width: 100,
            height: 100,
            src: null,
            fromLayout: true
        };

        try {
            const blipFill = picEl.getElementsByTagName('p:blipFill')[0];
            if (blipFill) {
                const blip = blipFill.getElementsByTagName('a:blip')[0];
                if (blip) {
                    const embedId = blip.getAttribute('r:embed');
                    if (embedId) {
                        const imageRel = rels.find(r => r.getAttribute('Id') === embedId);
                        if (imageRel) {
                            const imageName = imageRel.getAttribute('Target').split('/').pop();
                            if (this.images[imageName]) {
                                picture.src = this.images[imageName];
                            }
                        }
                    }
                }
            }

            // Get transform
            const spPr = picEl.getElementsByTagName('p:spPr')[0];
            if (spPr) {
                const xfrm = spPr.getElementsByTagName('a:xfrm')[0];
                if (xfrm) {
                    const off = xfrm.getElementsByTagName('a:off')[0];
                    const ext = xfrm.getElementsByTagName('a:ext')[0];

                    if (off) {
                        picture.x = (parseInt(off.getAttribute('x') || '0') / LayoutShapeParser.SLIDE_WIDTH_EMU) * 100;
                        picture.y = (parseInt(off.getAttribute('y') || '0') / LayoutShapeParser.SLIDE_HEIGHT_EMU) * 100;
                    }
                    if (ext) {
                        picture.width = (parseInt(ext.getAttribute('cx') || '0') / LayoutShapeParser.SLIDE_WIDTH_EMU) * 100;
                        picture.height = (parseInt(ext.getAttribute('cy') || '0') / LayoutShapeParser.SLIDE_HEIGHT_EMU) * 100;
                    }
                }
            }

            return picture.src ? picture : null;
        } catch (error) {
            return null;
        }
    }

    /**
     * Parse a group shape and return flattened array of child shapes
     * @param {Element} grpSp - Group shape element
     * @param {Array} rels - Relationships array
     * @param {LayoutTextStyleParser} textStyleParser - For text extraction
     * @returns {Array} - Array of child shapes with adjusted positions
     */
    parseGroupShape(grpSp, rels, textStyleParser = null) {
        const shapes = [];
        
        // Get group transform for coordinate adjustment
        const grpSpPr = grpSp.getElementsByTagName('p:grpSpPr')[0];
        let groupOffsetX = 0, groupOffsetY = 0;
        let groupScaleX = 1, groupScaleY = 1;
        
        if (grpSpPr) {
            const xfrm = grpSpPr.getElementsByTagName('a:xfrm')[0];
            if (xfrm) {
                const off = xfrm.getElementsByTagName('a:off')[0];
                const chOff = xfrm.getElementsByTagName('a:chOff')[0];
                const ext = xfrm.getElementsByTagName('a:ext')[0];
                const chExt = xfrm.getElementsByTagName('a:chExt')[0];
                
                if (off && chOff) {
                    // Group position offset
                    groupOffsetX = (parseInt(off.getAttribute('x') || '0') - parseInt(chOff.getAttribute('x') || '0')) / LayoutShapeParser.SLIDE_WIDTH_EMU * 100;
                    groupOffsetY = (parseInt(off.getAttribute('y') || '0') - parseInt(chOff.getAttribute('y') || '0')) / LayoutShapeParser.SLIDE_HEIGHT_EMU * 100;
                }
                
                if (ext && chExt) {
                    // Group scale factor
                    const extCx = parseInt(ext.getAttribute('cx') || '1');
                    const chExtCx = parseInt(chExt.getAttribute('cx') || '1');
                    const extCy = parseInt(ext.getAttribute('cy') || '1');
                    const chExtCy = parseInt(chExt.getAttribute('cy') || '1');
                    
                    if (chExtCx > 0) groupScaleX = extCx / chExtCx;
                    if (chExtCy > 0) groupScaleY = extCy / chExtCy;
                }
            }
        }
        
        // Parse child shapes
        for (const child of grpSp.children) {
            const tagName = child.tagName;
            let shapeData = null;
            
            if (tagName === 'p:sp') {
                shapeData = this.parseLayoutShape(child, rels, textStyleParser);
            } else if (tagName === 'p:pic') {
                shapeData = this.parseLayoutPicture(child, rels);
            } else if (tagName === 'p:cxnSp') {
                shapeData = this.parseConnectionShape(child, rels);
            } else if (tagName === 'p:grpSp') {
                // Recursive group shapes
                const nestedShapes = this.parseGroupShape(child, rels, textStyleParser);
                for (const nested of nestedShapes) {
                    // Apply parent group transform
                    nested.x = nested.x * groupScaleX + groupOffsetX;
                    nested.y = nested.y * groupScaleY + groupOffsetY;
                    nested.width = nested.width * groupScaleX;
                    nested.height = nested.height * groupScaleY;
                    shapes.push(nested);
                }
                continue;
            }
            
            if (shapeData && !shapeData.isPlaceholder) {
                // Apply group transform to child shape
                shapeData.x = shapeData.x * groupScaleX + groupOffsetX;
                shapeData.y = shapeData.y * groupScaleY + groupOffsetY;
                shapeData.width = shapeData.width * groupScaleX;
                shapeData.height = shapeData.height * groupScaleY;
                shapes.push(shapeData);
            }
        }
        
        return shapes;
    }

    /**
     * Parse a connection shape (lines/connectors)
     * @param {Element} cxnSp - Connection shape element
     * @param {Array} rels - Relationships array
     * @returns {Object|null} - Connection shape data
     */
    parseConnectionShape(cxnSp, rels) {
        const cNvPr = cxnSp.getElementsByTagName('p:cNvPr')[0];
        const shapeIdAttr = cNvPr ? cNvPr.getAttribute('id') : null;

        const cNvCxnSpPr = cxnSp.getElementsByTagName('p:cNvCxnSpPr')[0];
        const stCxn = cNvCxnSpPr?.getElementsByTagName('a:stCxn')[0];
        const endCxn = cNvCxnSpPr?.getElementsByTagName('a:endCxn')[0];

        const shape = {
            type: 'line',
            x: 0,
            y: 0,
            width: 0,
            height: 0,
            fill: 'none',
            stroke: null,
            strokeWidth: 1,
            rotation: 0,
            fromLayout: true,
            shapeId: shapeIdAttr ? parseInt(shapeIdAttr, 10) : null,
            startCxn: stCxn ? { shapeId: parseInt(stCxn.getAttribute('id') || '-1', 10), idx: parseInt(stCxn.getAttribute('idx') || '-1', 10) } : null,
            endCxn: endCxn ? { shapeId: parseInt(endCxn.getAttribute('id') || '-1', 10), idx: parseInt(endCxn.getAttribute('idx') || '-1', 10) } : null
        };
        
        const spPr = cxnSp.getElementsByTagName('p:spPr')[0];
        if (!spPr) return null;
        
        // Get transform
        const xfrm = spPr.getElementsByTagName('a:xfrm')[0];
        if (xfrm) {
            const off = xfrm.getElementsByTagName('a:off')[0];
            const ext = xfrm.getElementsByTagName('a:ext')[0];
            
            if (off) {
                shape.x = (parseInt(off.getAttribute('x') || '0') / LayoutShapeParser.SLIDE_WIDTH_EMU) * 100;
                shape.y = (parseInt(off.getAttribute('y') || '0') / LayoutShapeParser.SLIDE_HEIGHT_EMU) * 100;
            }
            if (ext) {
                shape.width = (parseInt(ext.getAttribute('cx') || '0') / LayoutShapeParser.SLIDE_WIDTH_EMU) * 100;
                shape.height = (parseInt(ext.getAttribute('cy') || '0') / LayoutShapeParser.SLIDE_HEIGHT_EMU) * 100;
            }
            
            const rot = xfrm.getAttribute('rot');
            if (rot) {
                shape.rotation = parseInt(rot) / 60000;
            }
            
            // Check for flip
            if (xfrm.getAttribute('flipH') === '1') shape.flipH = true;
            if (xfrm.getAttribute('flipV') === '1') shape.flipV = true;
        }
        
        // Get geometry type
        const prstGeom = spPr.getElementsByTagName('a:prstGeom')[0];
        if (prstGeom) {
            shape.type = prstGeom.getAttribute('prst') || 'line';
        }
        
        // Get line style
        const ln = spPr.getElementsByTagName('a:ln')[0];
        if (ln) {
            const w = ln.getAttribute('w');
            if (w) {
                shape.strokeWidth = parseInt(w) / 914400 * 96;
            }
            
            const lnSolidFill = ln.getElementsByTagName('a:solidFill')[0];
            if (lnSolidFill) {
                shape.stroke = this.backgroundExtractor.extractColor(lnSolidFill);
            }

            const headEnd = ln.getElementsByTagName('a:headEnd')[0];
            if (headEnd && headEnd.getAttribute('type') && headEnd.getAttribute('type') !== 'none') {
                shape.arrowHead = headEnd.getAttribute('type');
            }

            const tailEnd = ln.getElementsByTagName('a:tailEnd')[0];
            if (tailEnd && tailEnd.getAttribute('type') && tailEnd.getAttribute('type') !== 'none') {
                shape.arrowTail = tailEnd.getAttribute('type');
            }
        }
        
        // Default stroke if none specified
        if (!shape.stroke) {
            shape.stroke = this.themeExtractor ? this.themeExtractor.getDefaultTextColor() : '#000000';
        }
        
        return shape;
    }

    /**
     * Extract shadow effects from shape properties
     * Supports outerShdw (outer shadow) effects
     * @param {Element} spPr - Shape properties element
     * @returns {Object|null} - Shadow object
     */
    extractShadow(spPr) {
        const effectLst = spPr.getElementsByTagName('a:effectLst')[0];
        if (!effectLst) return null;

        const outerShdw = effectLst.getElementsByTagName('a:outerShdw')[0];
        if (!outerShdw) return null;

        const shadow = {};

        const blurRad = outerShdw.getAttribute('blurRad');
        if (blurRad) {
            const blurRadEMU = parseInt(blurRad);
            shadow.blur = (blurRadEMU / 914400) * 96;
        }

        const dist = outerShdw.getAttribute('dist');
        if (dist) {
            const distEMU = parseInt(dist);
            shadow.distance = (distEMU / 914400) * 96;
        }

        const dir = outerShdw.getAttribute('dir');
        if (dir) {
            shadow.angle = parseInt(dir) / 60000;
        }

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
     * @returns {number|null} - Corner radius as percentage
     */
    extractCornerRadius(spPr) {
        const prstGeom = spPr.getElementsByTagName('a:prstGeom')[0];
        if (!prstGeom) return null;

        const prst = prstGeom.getAttribute('prst');
        if (!prst) return null;

        const roundedShapes = {
            'roundRect': 0.05,
            'roundSquare': 0.05,
            'round2SameRect': 0.10,
            'round1Rect': 0.03,
            'round2Rect': 0.10
        };

        if (!roundedShapes[prst]) return null;

        const adjLst = prstGeom.getElementsByTagName('a:adjLst')[0];
        if (adjLst) {
            const adj = adjLst.getElementsByTagName('a:adj')[0];
            if (adj) {
                const val = adj.getAttribute('val');
                if (val) {
                    const adjVal = parseInt(val);
                    return (adjVal / 100000) * 0.5;
                }
            }
        }

        return roundedShapes[prst];
    }

    /**
     * Extract custom geometry from custGeom element
     * @param {Element} custGeom - Custom geometry element
     * @returns {Object|null} - Custom geometry object
     */
    extractCustomGeometry(custGeom) {
        if (!custGeom) return null;

        const geometry = {
            paths: [],
            bounds: { x: 0, y: 0, w: 21600, h: 21600 },
            guides: []
        };

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

        const gdLst = custGeom.getElementsByTagName('a:gdLst')[0];
        if (gdLst) {
            const guides = gdLst.getElementsByTagName('a:gd');
            for (const gd of guides) {
                const name = gd.getAttribute('name');
                const fmla = gd.getAttribute('fmla');
                geometry.guides.push({ name, fmla });
            }
        }

        const pathLst = custGeom.getElementsByTagName('a:pathLst')[0];
        if (pathLst) {
            const paths = pathLst.getElementsByTagName('a:path');
            for (const path of paths) {
                const w = parseInt(path.getAttribute('w') || geometry.bounds.w);
                const h = parseInt(path.getAttribute('h') || geometry.bounds.h);
                const fill = path.getAttribute('fill') || 'norm';
                const stroke = path.getAttribute('stroke') !== 'false';

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
     * @param {Element} pathElement - Path element
     * @param {number} width - Path width
     * @param {number} height - Path height
     * @returns {string} - SVG path data string
     */
    extractPathData(pathElement, width, height) {
        const commands = [];
        const childNodes = Array.from(pathElement.childNodes)
            .filter(n => n.nodeType === 1);

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
window.LayoutShapeParser = LayoutShapeParser;
