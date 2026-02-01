/**
 * PPTX Parser - Slide parsing
 * Extends PPTXParser with slide and background parsing logic
 */

PPTXParser.prototype.parseSlides = async function () {
    try {
        if (!this.presentation || !this.presentation.slideIds) {
            throw new Error('Presentation not initialized');
        }

        // Parse each slide
        for (let index = 0; index < this.presentation.slideIds.length; index++) {
            const slideInfo = this.presentation.slideIds[index];
            const slidePath = this.slideRelationships.get(slideInfo.rId);
            if (!slidePath) continue;

            const slide = await this.parseSlide(`ppt/${slidePath}`, index + 1);
            if (slide) {
                this.slides.push(slide);
            }
        }
    } catch (error) {
        console.error('Error parsing slides:', error);
        throw error;
    }
};

PPTXParser.prototype.parseSlide = async function (slidePath, slideNumber = null) {
    try {
        const slideFile = await this.zip.file(slidePath).async('string');
        const doc = this.xmlParser.parseFromString(slideFile, 'text/xml');

        // Get slide relationships (for images and links)
        const slideRelsPath = slidePath.replace('ppt/slides/', 'ppt/slides/_rels/').replace('.xml', '.xml.rels');
        let slideRels = [];
        let layoutPath = null;
        try {
            const slideRelsFile = await this.zip.file(slideRelsPath).async('string');
            const relsDoc = this.xmlParser.parseFromString(slideRelsFile, 'text/xml');
            slideRels = Array.from(relsDoc.getElementsByTagName('Relationship'));
            
            // Find layout relationship
            const layoutRel = slideRels.find(r => 
                (r.getAttribute('Type') || '').includes('slideLayout')
            );
            if (layoutRel) {
                layoutPath = PPTXParser.resolveTarget(slidePath, layoutRel.getAttribute('Target'));
            }
        } catch (e) {
            // No relationships file is OK
        }

        // Preload layout/master data to resolve template defaults
        let masterPath = null;
        if (this.layoutParser && layoutPath) {
            const layoutInfo = await this.layoutParser.parseLayout(layoutPath);
            masterPath = layoutInfo.masterPath || null;
            if (masterPath) {
                // Prime master cache so text styles are available for defaults
                await this.layoutParser.parseMaster(masterPath);
            }
        }

        // Parse slide background
        let background = this.backgroundExtractor.extract(doc, slideRels);

        // If no slide background, try layout background
        if (!background && layoutPath) {
            background = await this.parseLayoutBackground(layoutPath);
        }

        // If still no background, try master slide background
        if (!background) {
            background = await this.parseMasterBackground(layoutPath);
        }

        // Parse shapes from slide
        const slideShapes = [];
        const textDefaultsProvider = (placeholderType, level, placeholderIdx = null) => {
            if (!this.layoutParser) return null;
            return this.layoutParser.getTextDefaults(masterPath, placeholderType, level, layoutPath, placeholderIdx);
        };
        const spTree = doc.getElementsByTagName('p:cSld')[0]?.getElementsByTagName('p:spTree')[0];
        if (spTree) {
            const shapeElements = Array.from(spTree.children).filter(el => 
                el.tagName === 'p:sp' || el.tagName === 'p:pic' || el.tagName === 'p:grpSp' || el.tagName === 'p:cxnSp' || el.tagName === 'p:graphicFrame'
            );

            for (let i = 0; i < shapeElements.length; i++) {
                const shapeEl = shapeElements[i];
                const result = this.parseShape(shapeEl, slideRels, textDefaultsProvider, slideNumber, slidePath);
                if (result) {
                    // Group shapes return arrays, others return single objects
                    if (Array.isArray(result)) {
                        for (let k = 0; k < result.length; k++) {
                            if (result[k] && typeof result[k]._treeOrder !== 'number') {
                                result[k]._treeOrder = i + k / 1000; // keep children near parent order
                            }
                            slideShapes.push(result[k]);
                        }
                    } else {
                        if (typeof result._treeOrder !== 'number') {
                            result._treeOrder = i;
                        }
                        slideShapes.push(result);
                    }
                }
            }
        }

        // Populate chart data for any chart shapes on this slide
        if (slideShapes.length > 0) {
            await this.attachChartData(slideShapes);
        }

        // Merge layout/master shapes with slide shapes for template support
        let mergedShapes = slideShapes;
        let textStyles = null;
        // masterPath already resolved above when layout was pre-parsed
        
        if (this.layoutParser && layoutPath) {
            const mergeResult = await this.layoutParser.getMergedShapes(layoutPath, slideShapes);
            mergedShapes = mergeResult.shapes;
            textStyles = mergeResult.textStyles;
            masterPath = masterPath || mergeResult.masterPath;
        }

        // Ensure merged shapes retain parsed chart payloads
        if (mergedShapes && mergedShapes.length > 0) {
            await this.attachChartData(mergedShapes);
            this.resolveConnectorEndpoints(mergedShapes);
        }

        return {
            background: background,
            shapes: mergedShapes,
            layoutPath: layoutPath,
            textStyles: textStyles,
            masterPath: masterPath,
            slideSize: this.presentation?.slideSize || null
        };
    } catch (error) {
        console.error(`Error parsing slide ${slidePath}:`, error);
        return null;
    }
};

PPTXParser.prototype.attachChartData = async function (shapes) {
    if (!this.chartParser || !Array.isArray(shapes) || shapes.length === 0) return;

    const tasks = [];
    for (const shape of shapes) {
        if (!shape || shape.type !== 'chart' || !shape.chartTarget || shape.chartData) continue;

        const cacheKey = shape.chartTarget;
        if (!this._chartDataCache.has(cacheKey)) {
            const loader = this.chartParser.parseChart(this.zip, cacheKey).catch(err => {
                console.warn(`Failed to parse chart ${cacheKey}:`, err);
                return null;
            });
            this._chartDataCache.set(cacheKey, loader);
        }

        const promise = this._chartDataCache.get(cacheKey).then(data => {
            if (data) {
                shape.chartData = data;
            }
        });

        tasks.push(promise);
    }

    if (tasks.length > 0) {
        await Promise.all(tasks);
    }
};

// Resolve connector endpoints to target shapes so arrowheads land on the correct ends
PPTXParser.prototype.resolveConnectorEndpoints = function (shapes) {
    if (!Array.isArray(shapes) || shapes.length === 0) return;

    const byId = new Map();
    for (const s of shapes) {
        if (s && typeof s.shapeId === 'number' && s.type !== 'line') {
            byId.set(s.shapeId, s);
        }
    }

    const anchorFor = (shape, idx) => {
        if (!shape) return null;
        const x = shape.x ?? 0;
        const y = shape.y ?? 0;
        const w = shape.width ?? 0;
        const h = shape.height ?? 0;

        switch (idx) {
            case 0: return { x: x + w * 0.5, y: y }; // top center
            case 1: return { x: x + w, y: y + h * 0.5 }; // right center
            case 2: return { x: x + w * 0.5, y: y + h }; // bottom center
            case 3: return { x: x, y: y + h * 0.5 }; // left center
            default: return { x: x + w * 0.5, y: y + h * 0.5 };
        }
    };

    for (const shape of shapes) {
        if (!shape || shape.type !== 'line') continue;

        const startShape = shape.startCxn ? byId.get(shape.startCxn.shapeId) : null;
        const endShape = shape.endCxn ? byId.get(shape.endCxn.shapeId) : null;

        const start = startShape ? anchorFor(startShape, shape.startCxn.idx) : null;
        const end = endShape ? anchorFor(endShape, shape.endCxn.idx) : null;

        if (!start && !end) continue;

        const fallback = {
            x1: shape.x ?? 0,
            y1: shape.y ?? 0,
            x2: (shape.x ?? 0) + (shape.width ?? 0),
            y2: (shape.y ?? 0) + (shape.height ?? 0)
        };

        const startPt = start || { x: fallback.x1, y: fallback.y1 };
        const endPt = end || { x: fallback.x2, y: fallback.y2 };

        const minX = Math.min(startPt.x, endPt.x);
        const minY = Math.min(startPt.y, endPt.y);
        const maxX = Math.max(startPt.x, endPt.x);
        const maxY = Math.max(startPt.y, endPt.y);

        const w = Math.max(0.1, maxX - minX);
        const h = Math.max(0.1, maxY - minY);

        shape.x = minX;
        shape.y = minY;
        shape.width = w;
        shape.height = h;

        shape.linePoints = {
            x1: ((startPt.x - minX) / w) * 100,
            y1: ((startPt.y - minY) / h) * 100,
            x2: ((endPt.x - minX) / w) * 100,
            y2: ((endPt.y - minY) / h) * 100
        };

        delete shape.flipH;
        delete shape.flipV;
    }
};

PPTXParser.prototype.parseLayoutBackground = async function (layoutPath) {
    try {
        const layoutFileEntry = this.zip.file(layoutPath);
        if (!layoutFileEntry) return null;
        
        const layoutFile = await layoutFileEntry.async('string');
        const doc = this.xmlParser.parseFromString(layoutFile, 'text/xml');
        
        // Get layout relationships for images
        const layoutRelsPath = layoutPath.replace('ppt/slideLayouts/', 'ppt/slideLayouts/_rels/').replace('.xml', '.xml.rels');
        let layoutRels = [];
        try {
            const relsFileEntry = this.zip.file(layoutRelsPath);
            if (relsFileEntry) {
                const relsFile = await relsFileEntry.async('string');
                const relsDoc = this.xmlParser.parseFromString(relsFile, 'text/xml');
                layoutRels = Array.from(relsDoc.getElementsByTagName('Relationship'));
            }
        } catch (e) {}
        
        return this.backgroundExtractor.extract(doc, layoutRels);
    } catch (error) {
        return null;
    }
};

PPTXParser.prototype.parseMasterBackground = async function (layoutPath) {
    try {
        // Find master from layout relationships, or use default
        let masterPath = 'ppt/slideMasters/slideMaster1.xml';
        
        if (layoutPath) {
            const layoutRelsPath = layoutPath.replace('ppt/slideLayouts/', 'ppt/slideLayouts/_rels/').replace('.xml', '.xml.rels');
            try {
                const relsFileEntry = this.zip.file(layoutRelsPath);
                if (relsFileEntry) {
                    const relsFile = await relsFileEntry.async('string');
                    const relsDoc = this.xmlParser.parseFromString(relsFile, 'text/xml');
                    const masterRel = Array.from(relsDoc.getElementsByTagName('Relationship')).find(r =>
                        (r.getAttribute('Type') || '').includes('slideMaster')
                    );
                    if (masterRel) {
                        masterPath = 'ppt/slideLayouts/' + masterRel.getAttribute('Target');
                        masterPath = masterPath.replace(/[^/]+\/\.\.\//g, '');
                    }
                }
            } catch (e) {}
        }
        
        const masterFileEntry = this.zip.file(masterPath);
        if (!masterFileEntry) return null;
        
        const masterFile = await masterFileEntry.async('string');
        const doc = this.xmlParser.parseFromString(masterFile, 'text/xml');
        
        // Get master relationships for images
        const masterRelsPath = masterPath.replace('ppt/slideMasters/', 'ppt/slideMasters/_rels/').replace('.xml', '.xml.rels');
        let masterRels = [];
        try {
            const relsFileEntry = this.zip.file(masterRelsPath);
            if (relsFileEntry) {
                const relsFile = await relsFileEntry.async('string');
                const relsDoc = this.xmlParser.parseFromString(relsFile, 'text/xml');
                masterRels = Array.from(relsDoc.getElementsByTagName('Relationship'));
            }
        } catch (e) {}
        
        return this.backgroundExtractor.extract(doc, masterRels);
    } catch (error) {
        return null;
    }
};
