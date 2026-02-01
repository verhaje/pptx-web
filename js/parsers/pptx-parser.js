/**
 * PPTX Parser Module
 * Main orchestrator for parsing PowerPoint files
 * Coordinates all parsing modules (XML, Theme, Background, Shape, Text extraction)
 */

/**
 * PPTX Parser Module (Core)
 * Main orchestrator for parsing PowerPoint files
 * Coordinates all parsing modules (XML, Theme, Background, Shape, Text extraction)
 */

class PPTXParser {
    /**
     * Create a PPTX Parser
     */
    constructor() {
        this.zip = null;
        this.xmlParser = new DOMParser();
        this.themeExtractor = null;
        this.backgroundExtractor = null;
        this.shapeParser = null;
        this.textExtractor = null;
        this.layoutParser = null;
        this.tableParser = null;
        this.chartParser = null;
        this._chartDataCache = new Map();
        this.slides = [];
        this.slideLayouts = [];
        this.slideMasters = [];
        this.theme = null;
        this.images = {};
        this.presentation = null;
    }

    /**
     * Parse a PPTX file
     * @param {File|Blob} file - The PPTX file to parse
     * @returns {Promise<Object>} - Parsed presentation data
     */
    async parse(file) {
        try {
            // Reset state for new file
            this.reset();
            
            // Load the ZIP file
            this.zip = await JSZip.loadAsync(file);

            // Initialize image map
            await this.loadImages();

            // Parse presentation structure
            await this.parsePresentation();

            // Parse theme (needed for color resolution)
            await this.parseTheme();

            // Parse slide masters and layouts
            await this.parseSlides();

            return {
                slides: this.slides,
                theme: this.theme,
                images: this.images,
                presentation: this.presentation
            };
        } catch (error) {
            console.error('Error parsing PPTX:', error);
            throw error;
        }
    }

    /**
     * Reset parser state for loading a new file
     * @private
     */
    reset() {
        // Revoke old image blob URLs to prevent memory leaks
        Object.values(this.images).forEach(url => {
            try {
                URL.revokeObjectURL(url);
            } catch (e) {}
        });
        
        // Clear layout parser cache if exists
        if (this.layoutParser) {
            this.layoutParser.clearCache();
        }
        
        this.zip = null;
        this.themeExtractor = null;
        this.backgroundExtractor = null;
        this.shapeParser = null;
        this.textExtractor = null;
        this.layoutParser = null;
        this.tableParser = null;
        this.chartParser = null;
        this._chartDataCache = new Map();
        this.slides = [];
        this.slideLayouts = [];
        this.slideMasters = [];
        this.theme = null;
        this.images = {};
        this.presentation = null;
    }

    /**
     * Get parsed slides
     * @returns {Array<Object>} - Array of parsed slides
     */
    getSlides() {
        return this.slides;
    }

    /**
     * Get theme data
     * @returns {Object} - Theme object
     */
    getTheme() {
        return this.theme;
    }

    /**
     * Get images
     * @returns {Object} - Map of image names to blob URLs
     */
    getImages() {
        return this.images;
    }
}

// Standard PowerPoint slide dimensions in EMUs (16:9 ratio)
PPTXParser.SLIDE_WIDTH_EMU = 9144000;
PPTXParser.SLIDE_HEIGHT_EMU = 5143500;

/**
 * Resolve a relationship target against a base path (handles ../ segments)
 * @param {string} basePath - The referencing file path
 * @param {string} target - The relationship target
 * @returns {string|null} - Normalized path or null
 */
PPTXParser.resolveTarget = function (basePath, target) {
    if (!basePath || !target) return null;

    // Absolute target within the package (e.g. "/ppt/slideLayouts/slideLayout1.xml")
    if (target.startsWith('/')) {
        return target.replace(/^\/+/, '');
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
};

// Export for use in other modules
window.PPTXParser = PPTXParser;