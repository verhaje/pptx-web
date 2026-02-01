/**
 * Layout Parser Module
 * Orchestrates parsing of slide layouts and masters for template support
 * Delegates to LayoutShapeParser and LayoutTextStyleParser for specific parsing tasks
 */

class LayoutParser {
    // Standard PowerPoint slide dimensions in EMUs (16:9 ratio)
    static SLIDE_WIDTH_EMU = 9144000;
    static SLIDE_HEIGHT_EMU = 5143500;

    /**
     * Create a LayoutParser
     * @param {Object} zip - JSZip instance
     * @param {DOMParser} xmlParser - XML parser
     * @param {BackgroundExtractor} backgroundExtractor - For color extraction
     * @param {ThemeExtractor} themeExtractor - For theme defaults
     * @param {Object} images - Map of image names to blob URLs
     */
    constructor(zip, xmlParser, backgroundExtractor, themeExtractor, images) {
        this.zip = zip;
        this.xmlParser = xmlParser;
        this.backgroundExtractor = backgroundExtractor;
        this.themeExtractor = themeExtractor;
        this.images = images;
        
        // Initialize sub-parsers
        this.textStyleParser = new LayoutTextStyleParser(backgroundExtractor, themeExtractor);
        this.shapeParser = new LayoutShapeParser(backgroundExtractor, themeExtractor, images);
        
        // Cache for parsed layouts and masters
        this.layoutCache = new Map();
        this.masterCache = new Map();
    }

    /**
     * Resolve a relationship target against a base path (handles ../ segments)
     * @param {string} basePath - The referencing file path
     * @param {string} target - The relationship target
     * @returns {string|null} - Normalized path or null
     */
    static resolveTarget(basePath, target) {
        if (!basePath || !target) return null;

        // Absolute target within the package (e.g. "/ppt/slideLayouts/slideLayout1.xml")
        if (target.startsWith('/')) {
            return target.replace(/^\/+/, '');
        }

        // If target is already absolute within ppt/, just prefix if missing
        if (!target.startsWith('..') && !target.startsWith('/')) {
            const baseDir = basePath.substring(0, basePath.lastIndexOf('/') + 1);
            return (baseDir + target).replace(/\/+/g, '/');
        }

        const baseParts = basePath.split('/');
        baseParts.pop(); // remove file name
        const targetParts = target.split('/');

        for (const part of targetParts) {
            if (part === '..') {
                baseParts.pop();
            } else if (part === '.' || part === '') {
                continue;
            } else {
                baseParts.push(part);
            }
        }

        return baseParts.join('/');
    }

    /**
     * Parse a slide layout and return its shapes and placeholder definitions
     * @param {string} layoutPath - Path to layout XML file
     * @returns {Promise<Object>} - Layout data with shapes and placeholders
     */
    async parseLayout(layoutPath) {
        // Check cache first
        if (this.layoutCache.has(layoutPath)) {
            return this.layoutCache.get(layoutPath);
        }

        const layoutData = {
            shapes: [],
            // Allow multiple placeholders of the same type (e.g., multiple body boxes)
            placeholders: new Map(),
            textStyles: new Map(),
            masterPath: null,
            _placeholderMaxOrder: -1
        };

        try {
            const layoutFileEntry = this.zip.file(layoutPath);
            if (!layoutFileEntry) return layoutData;

            const layoutFile = await layoutFileEntry.async('string');
            const doc = this.xmlParser.parseFromString(layoutFile, 'text/xml');

            // Get layout relationships
            const layoutRelsPath = layoutPath.replace('ppt/slideLayouts/', 'ppt/slideLayouts/_rels/').replace('.xml', '.xml.rels');
            let layoutRels = [];
            
            try {
                const relsFileEntry = this.zip.file(layoutRelsPath);
                if (relsFileEntry) {
                    const relsFile = await relsFileEntry.async('string');
                    const relsDoc = this.xmlParser.parseFromString(relsFile, 'text/xml');
                    layoutRels = Array.from(relsDoc.getElementsByTagName('Relationship'));
                    
                    // Find master relationship
                    const masterRel = layoutRels.find(r => 
                        (r.getAttribute('Type') || '').includes('slideMaster')
                    );
                    if (masterRel) {
                        layoutData.masterPath = LayoutParser.resolveTarget(layoutPath, masterRel.getAttribute('Target'));
                    }
                }
            } catch (e) {}

            // Parse shapes from layout
            const spTree = doc.getElementsByTagName('p:cSld')[0]?.getElementsByTagName('p:spTree')[0];
            if (spTree) {
                this.parseShapeTree(spTree, layoutRels, layoutData);
            }

            // Parse placeholder-level text styles defined directly on the layout
            const layoutTextStyles = this.textStyleParser.parseLayoutPlaceholderStyles(doc);
            if (layoutTextStyles) {
                layoutData.textStyles = layoutTextStyles;
            }

            // Cache the result
            this.layoutCache.set(layoutPath, layoutData);
            return layoutData;
        } catch (error) {
            console.warn('Error parsing layout:', error);
            return layoutData;
        }
    }

    /**
     * Parse a slide master and return its shapes
     * @param {string} masterPath - Path to master XML file
     * @returns {Promise<Object>} - Master data with shapes
     */
    async parseMaster(masterPath) {
        // Check cache first
        if (this.masterCache.has(masterPath)) {
            return this.masterCache.get(masterPath);
        }

        const masterData = {
            shapes: [],
            placeholders: new Map(),
            _placeholderMaxOrder: -1
        };

        try {
            const masterFileEntry = this.zip.file(masterPath);
            if (!masterFileEntry) return masterData;

            const masterFile = await masterFileEntry.async('string');
            const doc = this.xmlParser.parseFromString(masterFile, 'text/xml');

            // Get master relationships
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

            // Parse shapes from master
            const spTree = doc.getElementsByTagName('p:cSld')[0]?.getElementsByTagName('p:spTree')[0];
            if (spTree) {
                this.parseShapeTree(spTree, masterRels, masterData);
            }

            // Parse text styles from master (p:txStyles)
            const textStyles = this.textStyleParser.parseTextStyles(doc);
            if (textStyles) {
                masterData.textStyles = textStyles;
                this.textStyleParser.cacheTextStyles(masterPath, textStyles);
            }

            // Cache the result
            this.masterCache.set(masterPath, masterData);
            return masterData;
        } catch (error) {
            console.warn('Error parsing master:', error);
            return masterData;
        }
    }

    /**
     * Parse shape tree and populate data object with shapes and placeholders
     * @param {Element} spTree - Shape tree element
     * @param {Array} rels - Relationships array
     * @param {Object} data - Object to populate with shapes/placeholders
     */
    parseShapeTree(spTree, rels, data) {
        const children = Array.from(spTree.children);

        const addPlaceholder = (shapeData) => {
            const key = shapeData.placeholderType || 'body';
            const existing = data.placeholders.get(key);
            if (Array.isArray(existing)) {
                existing.push(shapeData);
                data.placeholders.set(key, existing);
            } else if (existing) {
                data.placeholders.set(key, [existing, shapeData]);
            } else {
                data.placeholders.set(key, [shapeData]);
            }
        };

        const isFullSlideGroup = (grpSp) => {
            const grpSpPr = grpSp?.getElementsByTagName('p:grpSpPr')[0];
            const xfrm = grpSpPr?.getElementsByTagName('a:xfrm')[0];
            if (!xfrm) return false;

            const off = xfrm.getElementsByTagName('a:off')[0];
            const ext = xfrm.getElementsByTagName('a:ext')[0];
            if (!off || !ext) return false;

            const x = (parseInt(off.getAttribute('x') || '0', 10) / LayoutParser.SLIDE_WIDTH_EMU) * 100;
            const y = (parseInt(off.getAttribute('y') || '0', 10) / LayoutParser.SLIDE_HEIGHT_EMU) * 100;
            const width = (parseInt(ext.getAttribute('cx') || '0', 10) / LayoutParser.SLIDE_WIDTH_EMU) * 100;
            const height = (parseInt(ext.getAttribute('cy') || '0', 10) / LayoutParser.SLIDE_HEIGHT_EMU) * 100;

            const tolPos = 1; // percent
            const tolSize = 98; // percent
            const nearZero = (v) => Math.abs(v) <= tolPos;
            return nearZero(x) && nearZero(y) && width >= tolSize && height >= tolSize;
        };

        for (let childIndex = 0; childIndex < children.length; childIndex++) {
            const child = children[childIndex];
            const tagName = child.tagName;
            
            if (tagName === 'p:sp') {
                const shapeData = this.shapeParser.parseLayoutShape(child, rels, this.textStyleParser);
                if (shapeData) {
                    if (shapeData.isPlaceholder) {
                        addPlaceholder(shapeData);
                        data._placeholderMaxOrder = Math.max(data._placeholderMaxOrder ?? -1, childIndex);
                    } else {
                        shapeData._treeOrder = childIndex;
                        data.shapes.push(shapeData);
                    }
                }
            } else if (tagName === 'p:pic') {
                const picData = this.shapeParser.parseLayoutPicture(child, rels);
                if (picData) {
                    picData._treeOrder = childIndex;
                    data.shapes.push(picData);
                }
            } else if (tagName === 'p:grpSp') {
                const groupIsBackground = isFullSlideGroup(child);
                const groupShapes = this.shapeParser.parseGroupShape(child, rels, this.textStyleParser);
                for (let i = 0; i < groupShapes.length; i++) {
                    // Keep group children near the group's stacking position while
                    // preserving their internal order.
                    groupShapes[i]._treeOrder = childIndex + (i / 1000);
                    if (groupIsBackground) {
                        groupShapes[i]._groupIsBackground = true;
                    }
                }
                data.shapes.push(...groupShapes);
            } else if (tagName === 'p:cxnSp') {
                const cxnData = this.shapeParser.parseConnectionShape(child, rels);
                if (cxnData) {
                    cxnData._treeOrder = childIndex;
                    data.shapes.push(cxnData);
                }
            }
        }
    }

    /**
     * Get merged shapes for a slide (master + layout + slide shapes)
     * Shapes are ordered back-to-front: master shapes, layout shapes, then slide shapes
     * Each shape gets a zIndex for proper CSS stacking
     * @param {string} layoutPath - Path to the slide's layout
     * @param {Array} slideShapes - Shapes from the slide itself
     * @returns {Promise<Object>} - Object with merged shapes array and textStyles
     */
    async getMergedShapes(layoutPath, slideShapes = []) {
        const mergedShapes = [];
        let zIndex = 0;
        let textStyles = null;
        let masterPath = null;

        let layoutData = null;
        let masterData = null;

        const isFullSlideBackgroundShape = (shape) => {
            // Only honor explicit background intent; avoid size heuristics that can misclassify foreground art.
            if (!shape || shape.isPlaceholder) return false;
            return shape._groupIsBackground === true || shape.type === 'background';
        };

        const sortByTreeOrder = (arr = []) => arr.slice().sort((a, b) => {
            const aOrder = typeof a?._treeOrder === 'number' ? a._treeOrder : Number.POSITIVE_INFINITY;
            const bOrder = typeof b?._treeOrder === 'number' ? b._treeOrder : Number.POSITIVE_INFINITY;
            if (aOrder !== bOrder) return aOrder - bOrder;
            return 0;
        });

        const splitSlideBackgrounds = (shapes) => {
            const bg = [];
            const fg = [];
            for (const shape of shapes || []) {
                if (isFullSlideBackgroundShape(shape)) bg.push(shape);
                else fg.push(shape);
            }
            return { bg: sortByTreeOrder(bg), fg: sortByTreeOrder(fg) };
        };

        const splitByPlaceholderOrder = (data) => {
            const shapes = data?.shapes || [];
            const maxPh = typeof data?._placeholderMaxOrder === 'number' ? data._placeholderMaxOrder : -1;
            if (maxPh < 0) {
                return { bg: shapes.slice(), fg: [] };
            }

            const bg = [];
            const fg = [];
            for (const shape of shapes) {
                if (isFullSlideBackgroundShape(shape)) {
                    bg.push(shape);
                    continue;
                }

                const order = typeof shape._treeOrder === 'number' ? shape._treeOrder : -1;
                if (order > maxPh) fg.push(shape);
                else bg.push(shape);
            }

            return { bg: sortByTreeOrder(bg), fg: sortByTreeOrder(fg) };
        };

        let masterBg = [];
        let masterFg = [];
        let layoutBg = [];
        let layoutFg = [];

        if (layoutPath) {
            layoutData = await this.parseLayout(layoutPath);

            if (layoutData.masterPath) {
                masterPath = layoutData.masterPath;
                masterData = await this.parseMaster(layoutData.masterPath);

                // Get text styles from master
                textStyles = masterData.textStyles || null;

                const split = splitByPlaceholderOrder(masterData);
                masterBg = split.bg;
                masterFg = split.fg;
            }

            const split = splitByPlaceholderOrder(layoutData);
            layoutBg = split.bg;
            layoutFg = split.fg;
        }

        // Merge order: background graphics -> slide content -> foreground graphics
        const masterBgSorted = sortByTreeOrder(masterBg);
        const masterFgSorted = sortByTreeOrder(masterFg);
        const layoutBgSorted = sortByTreeOrder(layoutBg);
        const layoutFgSorted = sortByTreeOrder(layoutFg);

        for (const shape of masterBgSorted) {
            shape.zIndex = zIndex++;
            shape.layer = 'master-bg';
            mergedShapes.push(shape);
        }
        for (const shape of layoutBgSorted) {
            shape.zIndex = zIndex++;
            shape.layer = 'layout-bg';
            mergedShapes.push(shape);
        }

        const slideSplit = splitSlideBackgrounds(slideShapes);

        for (const shape of slideSplit.bg) {
            this.applyPlaceholderDefaults(shape, layoutData, masterData);
            shape.zIndex = zIndex++;
            shape.layer = 'slide-bg';
            mergedShapes.push(shape);
        }

        for (const shape of slideSplit.fg) {
            this.applyPlaceholderDefaults(shape, layoutData, masterData);
            shape.zIndex = zIndex++;
            shape.layer = 'slide';
            mergedShapes.push(shape);
        }

        for (const shape of layoutFgSorted) {
            shape.zIndex = zIndex++;
            shape.layer = 'layout-fg';
            mergedShapes.push(shape);
        }
        for (const shape of masterFgSorted) {
            shape.zIndex = zIndex++;
            shape.layer = 'master-fg';
            mergedShapes.push(shape);
        }

        return {
            shapes: mergedShapes,
            textStyles: textStyles,
            masterPath: masterPath
        };
    }

    /**
     * Get text style for a placeholder type and level
     * @param {string} masterPath - Path to master
     * @param {string} placeholderType - Type of placeholder (title, body, etc.)
     * @param {number} level - Text level (1-9, default 1)
     * @returns {Object|null} - Formatting object or null
     */
    getTextStyleForPlaceholder(masterPath, placeholderType, level = 1) {
        return this.textStyleParser.getTextStyleForPlaceholder(masterPath, placeholderType, level);
    }

    /**
     * Get default text formatting for a placeholder type
     * @param {string} masterPath - Path to master slide
     * @param {string} placeholderType - Placeholder type (title, body, etc.)
     * @param {number} level - Text level (1-9)
     * @returns {Object} - Formatting defaults
     */
    getTextDefaults(masterPath, placeholderType, level = 1, layoutPath = null, placeholderIdx = null) {
        // Start with theme + master defaults
        const defaults = this.textStyleParser.getTextDefaults(masterPath, placeholderType, level) || {};

        // Apply layout-level overrides (placeholder lstStyle/defRPr)
        if (layoutPath) {
            const layoutInfo = this.layoutCache.get(layoutPath);
            const layoutStyles = layoutInfo?.textStyles;
            const placeholderKey = placeholderIdx !== null && placeholderIdx !== undefined
                ? `${placeholderType}:${placeholderIdx}`
                : placeholderType;
            const placeholderStyles = layoutStyles?.get(placeholderKey)
                || layoutStyles?.get(placeholderType)
                || null;
            const levelStyle = placeholderStyles
                ? (placeholderStyles[level] || placeholderStyles[1] || placeholderStyles.default || null)
                : null;

            if (levelStyle) {
                if (levelStyle.fontSize) defaults.fontSize = levelStyle.fontSize;
                if (levelStyle.fontFamily) defaults.fontFamily = levelStyle.fontFamily;
                if (levelStyle.color) defaults.color = levelStyle.color;
                if (levelStyle.bold !== null && levelStyle.bold !== undefined) defaults.bold = levelStyle.bold;
                if (levelStyle.italic !== null && levelStyle.italic !== undefined) defaults.italic = levelStyle.italic;
                if (levelStyle.align) defaults.align = levelStyle.align;
                if (levelStyle.marLEm !== null && levelStyle.marLEm !== undefined) defaults.marLEm = levelStyle.marLEm;
                if (levelStyle.indentEm !== null && levelStyle.indentEm !== undefined) defaults.indentEm = levelStyle.indentEm;
                if (levelStyle.spaceBeforeEm !== null && levelStyle.spaceBeforeEm !== undefined) defaults.spaceBeforeEm = levelStyle.spaceBeforeEm;
                if (levelStyle.spaceAfterEm !== null && levelStyle.spaceAfterEm !== undefined) defaults.spaceAfterEm = levelStyle.spaceAfterEm;
                if (levelStyle.lineHeight !== null && levelStyle.lineHeight !== undefined) defaults.lineHeight = levelStyle.lineHeight;
            }
        }

        return defaults;
    }

    /**
     * Clear caches (call when loading new file)
     */
    clearCache() {
        this.layoutCache.clear();
        this.masterCache.clear();
        this.textStyleParser.clearCache();
    }
    /**
     * Apply placeholder defaults (fill/stroke) from layout/master placeholders to slide shapes
     * @param {Object} shape - Slide shape
     * @param {Object} layoutData - Parsed layout data
     * @param {Object} masterData - Parsed master data
     */
    applyPlaceholderDefaults(shape, layoutData, masterData) {
        if (!shape || !shape.isPlaceholder) return;

        const placeholder = this.findPlaceholderDefinition(shape, layoutData, masterData);
        if (!placeholder) return;

        // Many slides omit full transform info for placeholder shapes.
        // In PowerPoint, the layout/master placeholder defines the actual box position/size.
        // If the slide shape doesn't have explicit EMU transform values, inherit them.
        // Treat zero/invalid sizes as missing so we can inherit real geometry from the layout/master placeholder
        const hasX = Number.isFinite(shape.xEMU) || Number.isFinite(shape.x);
        const hasY = Number.isFinite(shape.yEMU) || Number.isFinite(shape.y);
        const hasW = (typeof shape.cxEMU === 'number' && shape.cxEMU > 0) || (typeof shape.width === 'number' && shape.width > 0);
        const hasH = (typeof shape.cyEMU === 'number' && shape.cyEMU > 0) || (typeof shape.height === 'number' && shape.height > 0);

        if ((!hasX || !hasY || !hasW || !hasH) && placeholder) {
            if (typeof shape.xEMU !== 'number' && typeof placeholder.x === 'number') {
                shape.x = placeholder.x;
                if (typeof ShapeParser !== 'undefined' && ShapeParser.SLIDE_WIDTH_EMU) {
                    shape.xEMU = Math.round((placeholder.x / 100) * ShapeParser.SLIDE_WIDTH_EMU);
                }
            }
            if (typeof shape.yEMU !== 'number' && typeof placeholder.y === 'number') {
                shape.y = placeholder.y;
                if (typeof ShapeParser !== 'undefined' && ShapeParser.SLIDE_HEIGHT_EMU) {
                    shape.yEMU = Math.round((placeholder.y / 100) * ShapeParser.SLIDE_HEIGHT_EMU);
                }
            }
            if (typeof shape.cxEMU !== 'number' && typeof placeholder.width === 'number') {
                shape.width = placeholder.width;
                if (typeof ShapeParser !== 'undefined' && ShapeParser.SLIDE_WIDTH_EMU) {
                    shape.cxEMU = Math.round((placeholder.width / 100) * ShapeParser.SLIDE_WIDTH_EMU);
                }
            }
            if (typeof shape.cyEMU !== 'number' && typeof placeholder.height === 'number') {
                shape.height = placeholder.height;
                if (typeof ShapeParser !== 'undefined' && ShapeParser.SLIDE_HEIGHT_EMU) {
                    shape.cyEMU = Math.round((placeholder.height / 100) * ShapeParser.SLIDE_HEIGHT_EMU);
                }
            }
        }

        if (!shape.fill && placeholder.fill) {
            shape.fill = placeholder.fill;
        }
        if ((shape.stroke === null || shape.stroke === undefined) && placeholder.stroke) {
            shape.stroke = placeholder.stroke;
        }
        if ((!shape.strokeWidth || shape.strokeWidth === 1) && placeholder.strokeWidth) {
            shape.strokeWidth = placeholder.strokeWidth;
        }

        // Inherit text box properties (anchor, wrap, insets) when slide shape omits them
        if (!shape.textVAlign && placeholder.textVAlign) {
            shape.textVAlign = placeholder.textVAlign;
        }
        if (shape.textWrap === undefined && placeholder.textWrap !== undefined) {
            shape.textWrap = placeholder.textWrap;
        }
        if (!shape.textInsetsEMU && placeholder.textInsetsEMU) {
            shape.textInsetsEMU = {
                left: placeholder.textInsetsEMU.left,
                right: placeholder.textInsetsEMU.right,
                top: placeholder.textInsetsEMU.top,
                bottom: placeholder.textInsetsEMU.bottom
            };
        }
    }

    /**
     * Locate placeholder definition from layout/master
     * @param {Object} shape - Slide shape
     * @param {Object} layoutData - Parsed layout data
     * @param {Object} masterData - Parsed master data
     * @returns {Object|null} - Matching placeholder definition
     */
    findPlaceholderDefinition(shape, layoutData, masterData) {
        const normalize = (value) => {
            if (!value) return [];
            return Array.isArray(value) ? value : [value];
        };

        const matchFromMap = (map) => {
            if (!map) return null;

            const candidates = normalize(map.get(shape.placeholderType));
            // Prefer exact idx match when present
            if (shape.placeholderIdx) {
                const byIdx = candidates.find(p => p && p.placeholderIdx && p.placeholderIdx === shape.placeholderIdx);
                if (byIdx) return byIdx;
            }
            if (candidates.length > 0) return candidates[0];

            // Fallback: search all placeholders for matching idx
            if (shape.placeholderIdx) {
                for (const value of map.values()) {
                    const arr = normalize(value);
                    const hit = arr.find(p => p && p.placeholderIdx && p.placeholderIdx === shape.placeholderIdx);
                    if (hit) return hit;
                }
            }
            return null;
        };

        return matchFromMap(layoutData?.placeholders) || matchFromMap(masterData?.placeholders) || null;
    }
}

// Export for use in other modules
window.LayoutParser = LayoutParser;
