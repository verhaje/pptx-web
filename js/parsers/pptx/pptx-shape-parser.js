/**
 * PPTX Parser - Shape parsing
 * Extends PPTXParser with shape-level parsing helpers
 */

PPTXParser.prototype.parseShape = function (shapeEl, slideRels, textDefaultsProvider = null, slideNumber = null, basePath = null) {
    const tagName = shapeEl.tagName;

    if (tagName === 'p:sp') {
        // Regular shape
        return this.shapeParser.parseShape(shapeEl, slideRels, textDefaultsProvider, slideNumber);
    } else if (tagName === 'p:pic') {
        // Picture/Image shape - handle as image shape
        const picture = this.parsePicture(shapeEl, slideRels);
        return picture;
    } else if (tagName === 'p:cxnSp') {
        // Connection shape (lines, connectors, arrows)
        return this.parseConnectionShape(shapeEl, slideRels);
    } else if (tagName === 'p:grpSp') {
        // Group shape - parse and flatten children
        return this.parseGroupShape(shapeEl, slideRels, textDefaultsProvider, slideNumber, basePath);
    } else if (tagName === 'p:graphicFrame') {
        return this.parseGraphicFrame(shapeEl, slideRels, textDefaultsProvider, basePath);
    }

    return null;
};

PPTXParser.prototype.parseGraphicFrame = function (graphicFrame, slideRels, textDefaultsProvider = null, basePath = null) {
    // Handle tables
    const hasTable = graphicFrame.getElementsByTagName('a:tbl')[0];
    if (hasTable && this.tableParser) {
        return this.tableParser.parseTable(graphicFrame, slideRels, textDefaultsProvider);
    }

    // Handle charts (rendered as placeholders for now)
    const graphicData = graphicFrame.getElementsByTagName('a:graphicData')[0];
    const chartEl = graphicData ? graphicData.getElementsByTagName('c:chart')[0] : null;
    if (chartEl) {
        const relId = chartEl.getAttribute('r:id');
        // Resolve chart target from slide relationships
        let chartTarget = null;
        if (relId && Array.isArray(slideRels)) {
            const rel = slideRels.find(r => r.getAttribute('Id') === relId);
            if (rel) {
                const base = basePath || 'ppt/slides/slide1.xml';
                chartTarget = PPTXParser.resolveTarget(base, rel.getAttribute('Target')) || rel.getAttribute('Target');
            }
        }

        // Extract transform - graphicFrame uses p:xfrm, not a:xfrm
        let x = 0, y = 0, width = 50, height = 30;
        const xfrm = graphicFrame.getElementsByTagName('p:xfrm')[0] || graphicFrame.getElementsByTagName('a:xfrm')[0];
        if (xfrm) {
            const off = xfrm.getElementsByTagName('a:off')[0];
            const ext = xfrm.getElementsByTagName('a:ext')[0];
            if (off) {
                x = (parseInt(off.getAttribute('x') || '0', 10) / PPTXParser.SLIDE_WIDTH_EMU) * 100;
                y = (parseInt(off.getAttribute('y') || '0', 10) / PPTXParser.SLIDE_HEIGHT_EMU) * 100;
            }
            if (ext) {
                width = (parseInt(ext.getAttribute('cx') || '0', 10) / PPTXParser.SLIDE_WIDTH_EMU) * 100;
                height = (parseInt(ext.getAttribute('cy') || '0', 10) / PPTXParser.SLIDE_HEIGHT_EMU) * 100;
            }
        }

        const name = graphicFrame.getElementsByTagName('p:cNvPr')[0]?.getAttribute('name') || 'Chart';

        return {
            type: 'chart',
            x,
            y,
            width,
            height,
            chartRelId: relId || null,
            chartTarget: chartTarget,
            name,
            layer: 'slide'
        };
    }

    return null;
};

PPTXParser.prototype.parseConnectionShape = function (cxnSp, slideRels) {
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
            shape.x = (parseInt(off.getAttribute('x') || '0') / PPTXParser.SLIDE_WIDTH_EMU) * 100;
            shape.y = (parseInt(off.getAttribute('y') || '0') / PPTXParser.SLIDE_HEIGHT_EMU) * 100;
        }
        if (ext) {
            shape.width = (parseInt(ext.getAttribute('cx') || '0') / PPTXParser.SLIDE_WIDTH_EMU) * 100;
            shape.height = (parseInt(ext.getAttribute('cy') || '0') / PPTXParser.SLIDE_HEIGHT_EMU) * 100;
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

    // Get line style and arrowheads
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

    // Default stroke if none specified - try p:style/a:lnRef first
    if (!shape.stroke) {
        const pStyle = cxnSp.getElementsByTagName('p:style')[0];
        if (pStyle) {
            const lnRef = pStyle.getElementsByTagName('a:lnRef')[0];
            if (lnRef) {
                const refColor = this.backgroundExtractor.extractColor(lnRef);
                if (refColor) {
                    shape.stroke = refColor;
                } else {
                    // Try accent color from theme based on lnRef idx
                    const lnIdx = parseInt(lnRef.getAttribute('idx') || '0', 10);
                    if (lnIdx > 0 && lnIdx <= 6 && this.themeExtractor) {
                        const accentColor = this.themeExtractor.getAccentColor(lnIdx);
                        if (accentColor) shape.stroke = accentColor;
                    }
                }
            }
        }
    }
    if (!shape.stroke) {
        shape.stroke = this.themeExtractor ? this.themeExtractor.getDefaultTextColor() : '#000000';
    }

    return shape;
};

PPTXParser.prototype.parseGroupShape = function (grpSp, slideRels, textDefaultsProvider = null, slideNumber = null, basePath = null) {
    const shapes = [];

    // Get group transform for coordinate adjustment
    const grpSpPr = grpSp.getElementsByTagName('p:grpSpPr')[0];
    let groupOffsetX = 0, groupOffsetY = 0;
    let groupOffsetXEMU = 0, groupOffsetYEMU = 0;
    let groupScaleX = 1, groupScaleY = 1;
    let groupIsBackground = false;

    if (grpSpPr) {
        const xfrm = grpSpPr.getElementsByTagName('a:xfrm')[0];
        if (xfrm) {
            const off = xfrm.getElementsByTagName('a:off')[0];
            const chOff = xfrm.getElementsByTagName('a:chOff')[0];
            const ext = xfrm.getElementsByTagName('a:ext')[0];
            const chExt = xfrm.getElementsByTagName('a:chExt')[0];

            if (off && chOff) {
                groupOffsetXEMU = (parseInt(off.getAttribute('x') || '0') - parseInt(chOff.getAttribute('x') || '0'));
                groupOffsetYEMU = (parseInt(off.getAttribute('y') || '0') - parseInt(chOff.getAttribute('y') || '0'));
                groupOffsetX = (groupOffsetXEMU / PPTXParser.SLIDE_WIDTH_EMU) * 100;
                groupOffsetY = (groupOffsetYEMU / PPTXParser.SLIDE_HEIGHT_EMU) * 100;
            }

            if (off && ext) {
                const x = (parseInt(off.getAttribute('x') || '0', 10) / PPTXParser.SLIDE_WIDTH_EMU) * 100;
                const y = (parseInt(off.getAttribute('y') || '0', 10) / PPTXParser.SLIDE_HEIGHT_EMU) * 100;
                const width = (parseInt(ext.getAttribute('cx') || '0', 10) / PPTXParser.SLIDE_WIDTH_EMU) * 100;
                const height = (parseInt(ext.getAttribute('cy') || '0', 10) / PPTXParser.SLIDE_HEIGHT_EMU) * 100;

                const tolPos = 1;
                const tolSize = 98;
                const nearZero = (v) => Math.abs(v) <= tolPos;
                groupIsBackground = nearZero(x) && nearZero(y) && width >= tolSize && height >= tolSize;
            }

            if (ext && chExt) {
                const extCx = parseInt(ext.getAttribute('cx') || '1');
                const chExtCx = parseInt(chExt.getAttribute('cx') || '1');
                const extCy = parseInt(ext.getAttribute('cy') || '1');
                const chExtCy = parseInt(chExt.getAttribute('cy') || '1');

                if (chExtCx > 0) groupScaleX = extCx / chExtCx;
                if (chExtCy > 0) groupScaleY = extCy / chExtCy;
            }
        }
    }

    // Parse direct children only (not descendants)
    for (const child of grpSp.children) {
        const tagName = child.tagName;
        let shapeData = null;

        if (tagName === 'p:sp') {
            shapeData = this.shapeParser.parseShape(child, slideRels, textDefaultsProvider, slideNumber, basePath);
        } else if (tagName === 'p:pic') {
            shapeData = this.parsePicture(child, slideRels);
        } else if (tagName === 'p:cxnSp') {
            shapeData = this.parseConnectionShape(child, slideRels);
        } else if (tagName === 'p:grpSp') {
            // Recursive nested groups
            const nestedShapes = this.parseGroupShape(child, slideRels, textDefaultsProvider, slideNumber, basePath);
            for (const nested of nestedShapes) {
                nested.x = nested.x * groupScaleX + groupOffsetX;
                nested.y = nested.y * groupScaleY + groupOffsetY;
                nested.width = nested.width * groupScaleX;
                nested.height = nested.height * groupScaleY;

                if (typeof nested.xEMU === 'number') nested.xEMU = nested.xEMU * groupScaleX + groupOffsetXEMU;
                if (typeof nested.yEMU === 'number') nested.yEMU = nested.yEMU * groupScaleY + groupOffsetYEMU;
                if (typeof nested.cxEMU === 'number') nested.cxEMU = nested.cxEMU * groupScaleX;
                if (typeof nested.cyEMU === 'number') nested.cyEMU = nested.cyEMU * groupScaleY;
                shapes.push(nested);
            }
            continue;
        }

        if (shapeData) {
            // Apply group transform to child shape
            shapeData.x = shapeData.x * groupScaleX + groupOffsetX;
            shapeData.y = shapeData.y * groupScaleY + groupOffsetY;
            shapeData.width = shapeData.width * groupScaleX;
            shapeData.height = shapeData.height * groupScaleY;

            if (typeof shapeData.xEMU === 'number') shapeData.xEMU = shapeData.xEMU * groupScaleX + groupOffsetXEMU;
            if (typeof shapeData.yEMU === 'number') shapeData.yEMU = shapeData.yEMU * groupScaleY + groupOffsetYEMU;
            if (typeof shapeData.cxEMU === 'number') shapeData.cxEMU = shapeData.cxEMU * groupScaleX;
            if (typeof shapeData.cyEMU === 'number') shapeData.cyEMU = shapeData.cyEMU * groupScaleY;
            if (groupIsBackground) shapeData._groupIsBackground = true;
            shapes.push(shapeData);
        }
    }

    return shapes;
};

PPTXParser.prototype.parsePicture = function (picEl, slideRels) {
    const picture = {
        type: 'picture',
        x: 0,
        y: 0,
        width: 100,
        height: 100,
        src: null
    };

    try {
        // Get transform (position and size)
        const nvPicPr = picEl.getElementsByTagName('p:nvPicPr')[0];
        if (nvPicPr) {
            const cNvPr = nvPicPr.getElementsByTagName('p:cNvPr')[0];
            // Could store name: cNvPr.getAttribute('name')
        }

        const blipFill = picEl.getElementsByTagName('p:blipFill')[0];
        if (blipFill) {
            const blip = blipFill.getElementsByTagName('a:blip')[0];
            if (blip) {
                const svgBlip = blip.getElementsByTagName('asvg:svgBlip')[0];
                const svgId = svgBlip ? svgBlip.getAttribute('r:embed') : null;
                const pngId = blip.getAttribute('r:embed');

                const resolveRel = (embedId) => {
                    if (!embedId) return null;
                    const rel = slideRels.find(r => r.getAttribute('Id') === embedId);
                    if (rel) {
                        const imageName = rel.getAttribute('Target').split('/').pop();
                        return this.images[imageName] || null;
                    }
                    return null;
                };

                const svgUrl = resolveRel(svgId);
                const pngUrl = resolveRel(pngId);
                picture.src = svgUrl || pngUrl || picture.src;
            }
        }

        // Get transform (position and size) as percentages
        const spPr = picEl.getElementsByTagName('p:spPr')[0];
        if (spPr) {
            const xfrm = spPr.getElementsByTagName('a:xfrm')[0];
            if (xfrm) {
                const off = xfrm.getElementsByTagName('a:off')[0];
                const ext = xfrm.getElementsByTagName('a:ext')[0];
                
                if (off) {
                    const xEMU = parseInt(off.getAttribute('x') || '0');
                    const yEMU = parseInt(off.getAttribute('y') || '0');
                    picture.xEMU = xEMU;
                    picture.yEMU = yEMU;
                    picture.x = (xEMU / PPTXParser.SLIDE_WIDTH_EMU) * 100;
                    picture.y = (yEMU / PPTXParser.SLIDE_HEIGHT_EMU) * 100;
                }
                if (ext) {
                    const cxEMU = parseInt(ext.getAttribute('cx') || '0');
                    const cyEMU = parseInt(ext.getAttribute('cy') || '0');
                    picture.cxEMU = cxEMU;
                    picture.cyEMU = cyEMU;
                    picture.width = (cxEMU / PPTXParser.SLIDE_WIDTH_EMU) * 100;
                    picture.height = (cyEMU / PPTXParser.SLIDE_HEIGHT_EMU) * 100;
                }
            }
        }

        return picture;
    } catch (error) {
        console.warn('Error parsing picture:', error);
        return null;
    }
};
