/**
 * PPTX Parser - Presentation + Theme
 * Extends PPTXParser with presentation and theme parsing logic
 */

PPTXParser.prototype.loadImages = async function () { 
    const mediaFolder = this.zip.folder('ppt/media');
    if (!mediaFolder) return;

    const createEmfPlaceholder = (label) => {
        const safeLabel = (label || 'EMF image').replace(/</g, '&lt;').replace(/>/g, '&gt;');
        const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="400" height="200" viewBox="0 0 400 200" role="img" aria-label="${safeLabel} unsupported"><rect width="400" height="200" fill="#f3f4f6" stroke="#d1d5db"/><text x="200" y="80" text-anchor="middle" font-family="Arial, sans-serif" font-size="18" fill="#4b5563">EMF not rendered</text><text x="200" y="120" text-anchor="middle" font-family="Arial, sans-serif" font-size="14" fill="#6b7280">Converter unavailable</text></svg>`;
        const blob = new Blob([svg], { type: 'image/svg+xml' });
        return URL.createObjectURL(blob);
    };

    const emfConverter = new (globalThis.EMFConverter || class { async convertToObjectUrl() { return createEmfPlaceholder(); } })();

    const convertEmfBlobToSvgUrl = async (blob, label = null) => {
        try {
            const url = await emfConverter.convertToObjectUrl(blob, label || null);
            return url || createEmfPlaceholder(label);
        } catch (e) {
            console.warn('EMF to SVG conversion failed, using placeholder', e);
            return createEmfPlaceholder(label);
        }
    };

    const files = Object.keys(mediaFolder.files);
    for (const filePath of files) {
        const file = mediaFolder.files[filePath];
        if (!file.dir) {
            try {
                const blob = await file.async('blob');
                const fileName = file.name.split('/').pop();
                const ext = (fileName.split('.').pop() || '').toLowerCase();

                if (ext === 'emf' || ext === 'wmf') {
                    const svgUrl = await convertEmfBlobToSvgUrl(blob, fileName);
                    this.images[fileName] = svgUrl;
                } else {
                    const url = URL.createObjectURL(blob);
                    this.images[fileName] = url;
                }
            } catch (error) {
                console.warn(`Failed to load image: ${filePath}`, error);
            }
        }
    }
};
    /**
     * Load ppt/tableStyles.xml (if present) and pass to TableParser for styling.
     */
    PPTXParser.prototype.loadTableStyles = async function () {
        if (!this.zip || !this.tableParser || typeof this.tableParser.setTableStyles !== 'function') return;
        try {
            const entry = this.zip.file('ppt/tableStyles.xml');
            if (!entry) return;
            const xml = await entry.async('string');
            this.tableParser.setTableStyles(xml, this.xmlParser);
        } catch (e) {
            console.warn('Unable to load tableStyles.xml', e);
        }
    };

PPTXParser.prototype.parsePresentation = async function () {
    try {
        const presFile = await this.zip.file('ppt/presentation.xml').async('string');
        const doc = this.xmlParser.parseFromString(presFile, 'text/xml');

        // Slide size (cx/cy in EMUs). This is the authoritative coordinate system for shapes.
        // If we assume 16:9 defaults for a 4:3 deck (or custom size), shapes will be offset/overflow.
        const sldSz = doc.getElementsByTagName('p:sldSz')[0];
        let slideSize = null;
        if (sldSz) {
            const cx = parseInt(sldSz.getAttribute('cx') || '0', 10);
            const cy = parseInt(sldSz.getAttribute('cy') || '0', 10);
            if (cx > 0 && cy > 0) {
                const ratio = cx / cy;
                slideSize = { cx, cy, ratio, invRatio: cy / cx };

                // Update shared slide dimensions used throughout parsing.
                PPTXParser.SLIDE_WIDTH_EMU = cx;
                PPTXParser.SLIDE_HEIGHT_EMU = cy;

                if (window.ShapeParser) {
                    ShapeParser.SLIDE_WIDTH_EMU = cx;
                    ShapeParser.SLIDE_HEIGHT_EMU = cy;
                }

                // Layout parsers (older + refactored) may also use static slide dimensions.
                if (window.LayoutParser) {
                    LayoutParser.SLIDE_WIDTH_EMU = cx;
                    LayoutParser.SLIDE_HEIGHT_EMU = cy;
                }
                if (window.LayoutShapeParser) {
                    LayoutShapeParser.SLIDE_WIDTH_EMU = cx;
                    LayoutShapeParser.SLIDE_HEIGHT_EMU = cy;
                }
            }
        }

        // Extract presentation properties
        const sldIdLst = doc.getElementsByTagName('p:sldIdLst')[0];
        const slideIds = Array.from(sldIdLst.getElementsByTagName('p:sldId')).map(el => ({
            id: el.getAttribute('id'),
            rId: el.getAttribute('r:id')
        }));

        // Get slide relationships
        const presRels = await this.zip.file('ppt/_rels/presentation.xml.rels').async('string');
        const relsDoc = this.xmlParser.parseFromString(presRels, 'text/xml');

        // Map relationship IDs to slide file paths
        this.slideRelationships = new Map();
        Array.from(relsDoc.getElementsByTagName('Relationship')).forEach(rel => {
            this.slideRelationships.set(rel.getAttribute('Id'), rel.getAttribute('Target'));
        });

        // Store presentation info
        this.presentation = {
            slideCount: slideIds.length,
            slideIds: slideIds,
            slideSize: slideSize
        };
    } catch (error) {
        console.error('Error parsing presentation structure:', error);
        throw error;
    }
};

PPTXParser.prototype.parseTheme = async function () {
    try {
        // Find theme file (usually theme1.xml)
        const themeFileEntry = this.zip.file('ppt/theme/theme1.xml');
        if (!themeFileEntry) {
            throw new Error('Theme file not found');
        }
        
        const themeFile = await themeFileEntry.async('string');
        const doc = this.xmlParser.parseFromString(themeFile, 'text/xml');

        this.themeExtractor = new ThemeExtractor();

        // Theme relationships (needed for theme blip fills)
        try {
            const themeRelsXml = await this.zip.file('ppt/theme/_rels/theme1.xml.rels')?.async('string');
            const themeRels = window.XMLUtils ? XMLUtils.parseRelationships(themeRelsXml) : [];
            if (typeof this.themeExtractor.setThemeRelationships === 'function') {
                this.themeExtractor.setThemeRelationships(themeRels);
            }
        } catch (e) {
            if (typeof this.themeExtractor.setThemeRelationships === 'function') {
                this.themeExtractor.setThemeRelationships([]);
            }
        }

        this.theme = await this.themeExtractor.extract(doc);

        // Initialize other extractors with theme reference
        this.backgroundExtractor = new BackgroundExtractor(this.themeExtractor, this.images);
        this.shapeParser = new ShapeParser(this.backgroundExtractor, this.images, this.themeExtractor);
        this.textExtractor = new TextExtractor(this.themeExtractor, this.backgroundExtractor);
        const TableParserCtor = (typeof globalThis !== 'undefined' && globalThis.TableParser) ? globalThis.TableParser : null;
        if (TableParserCtor) {
            this.tableParser = new TableParserCtor(this.backgroundExtractor, this.themeExtractor, this.shapeParser);
            await this.loadTableStyles();
        } else {
            console.warn('TableParser not available; tables will not be styled');
        }
        this.chartParser = new ChartParser(this.backgroundExtractor, this.themeExtractor);
        
        // Initialize layout parser for template support
        this.layoutParser = new LayoutParser(
            this.zip, 
            this.xmlParser, 
            this.backgroundExtractor, 
            this.themeExtractor, 
            this.images
        );
    } catch (error) {
        console.error('Error parsing theme:', error);
        // Continue without theme - will use defaults
        this.themeExtractor = new ThemeExtractor();

        if (typeof this.themeExtractor.setThemeRelationships === 'function') {
            this.themeExtractor.setThemeRelationships([]);
        }

        this.theme = await this.themeExtractor.extract(null);
        this.backgroundExtractor = new BackgroundExtractor(this.themeExtractor, this.images);
        this.shapeParser = new ShapeParser(this.backgroundExtractor, this.images, this.themeExtractor);
        this.textExtractor = new TextExtractor(this.themeExtractor, this.backgroundExtractor);
        const TableParserCtor = (typeof globalThis !== 'undefined' && globalThis.TableParser) ? globalThis.TableParser : null;
        if (TableParserCtor) {
            this.tableParser = new TableParserCtor(this.backgroundExtractor, this.themeExtractor, this.shapeParser);
            await this.loadTableStyles();
        } else {
            console.warn('TableParser not available; tables will not be styled');
        }
        this.chartParser = new ChartParser(this.backgroundExtractor, this.themeExtractor);
        
        // Initialize layout parser even with default theme
        this.layoutParser = new LayoutParser(
            this.zip, 
            this.xmlParser, 
            this.backgroundExtractor, 
            this.themeExtractor, 
            this.images
        );
    }
};
