/**
 * Theme Extractor Module
 * Handles extraction of theme colors and fonts from PPTX theme files
 */

class ThemeExtractor {
    constructor() {
        this.themeColors = {};
        this.themeFonts = {
            majorFont: 'Calibri Light',
            minorFont: 'Calibri'
        };

        // Fallback Office-like palette when theme is missing or incomplete
        this.defaultThemeColors = {
            dk1: '#000000',
            lt1: '#FFFFFF',
            dk2: '#1F497D',
            lt2: '#EEECE1',
            accent1: '#5B9BD5',
            accent2: '#ED7D31',
            accent3: '#A5A5A5',
            accent4: '#FFC000',
            accent5: '#4472C4',
            accent6: '#70AD47',
            hlink: '#0563C1',
            folHlink: '#954F72'
        };

        // Theme format scheme fill style lists (a:fmtScheme)
        // Stored as arrays of XML Elements (e.g., a:solidFill, a:gradFill, ...)
        this.fillStyleNodes = [];
        this.bgFillStyleNodes = [];

        // Relationships for the theme part (e.g. ppt/theme/_rels/theme1.xml.rels)
        // Used to resolve a:blipFill r:embed ids inside theme fill style lists.
        this.themeRelationships = [];
    }

    /**
     * Provide relationships for the theme XML part so theme blip fills can resolve.
     * @param {Array<{id:string,type?:string,target:string}>} relationships
     */
    setThemeRelationships(relationships) {
        this.themeRelationships = Array.isArray(relationships) ? relationships : [];
    }

    /**
     * Resolve a relationship id (rIdX) to a theme relationship target.
     * @param {string} relId
     * @returns {string|null}
     */
    getThemeRelationshipTarget(relId) {
        if (!relId || !Array.isArray(this.themeRelationships)) return null;
        const rel = this.themeRelationships.find(r => r && r.id === relId);
        return rel && typeof rel.target === 'string' ? rel.target : null;
    }

    /**
     * Resolve a theme relationship id to a loaded image URL.
     * @param {string} relId
     * @param {Object<string,string>} images - map from filename -> object URL
     * @returns {string|null}
     */
    resolveThemeImageUrl(relId, images) {
        const target = this.getThemeRelationshipTarget(relId);
        if (!target || !images) return null;

        const imageName = target.split('/').pop();
        if (!imageName) return null;
        return images[imageName] || null;
    }

    /**
     * Extract theme colors and fonts from a parsed theme XML document
     * @param {Document|null} doc - Parsed theme document (or null if missing)
     * @returns {Promise<void>}
     */
    async extract(doc) {
        if (!doc) return;

        this.extractColorScheme(doc);
        this.extractFontScheme(doc);
        this.extractFormatScheme(doc);
    }

    /**
     * Extract theme format scheme (fills)
     * @param {Document} doc - Parsed theme document
     */
    extractFormatScheme(doc) {
        const fmtScheme = doc.getElementsByTagName('a:fmtScheme')[0];
        if (!fmtScheme) return;

        const toElementChildren = (parent) => {
            if (!parent) return [];
            return Array.from(parent.childNodes)
                .filter(n => n && n.nodeType === 1); // ELEMENT_NODE
        };

        const fillStyleLst = fmtScheme.getElementsByTagName('a:fillStyleLst')[0];
        const bgFillStyleLst = fmtScheme.getElementsByTagName('a:bgFillStyleLst')[0];

        this.fillStyleNodes = toElementChildren(fillStyleLst);
        this.bgFillStyleNodes = toElementChildren(bgFillStyleLst);
    }

    /**
     * Get a fill style node by theme index (from a:fillRef/@idx).
     * Note: PPTX files differ on whether idx is 0-based or 1-based.
     * This method attempts both.
     * @param {number} idx - fillRef index
     * @param {Object} options
     * @param {boolean} options.background - Use bgFillStyleLst instead of fillStyleLst
     * @returns {Element|null}
     */
    getFillStyleNode(idx, { background = false } = {}) {
        const list = background ? this.bgFillStyleNodes : this.fillStyleNodes;
        if (!Array.isArray(list) || list.length === 0) return null;
        if (!Number.isFinite(idx)) return null;

        // Try 0-based
        if (idx >= 0 && idx < list.length) return list[idx];
        // Try 1-based
        const oneBased = idx - 1;
        if (oneBased >= 0 && oneBased < list.length) return list[oneBased];

        return null;
    }

    /**
     * Extract color scheme from theme
     * @param {Document} doc - Parsed theme document
     */
    extractColorScheme(doc) {
        const colorScheme = doc.getElementsByTagName('a:clrScheme')[0];
        if (!colorScheme) return;

        const colorElements = [
            'dk1', 'lt1', 'dk2', 'lt2', 
            'accent1', 'accent2', 'accent3', 'accent4', 'accent5', 'accent6', 
            'hlink', 'folHlink'
        ];
        
        for (const colorName of colorElements) {
            const colorEl = colorScheme.getElementsByTagName('a:' + colorName)[0];
            if (colorEl) {
                const srgbClr = colorEl.getElementsByTagName('a:srgbClr')[0];
                const sysClr = colorEl.getElementsByTagName('a:sysClr')[0];
                
                if (srgbClr) {
                    this.themeColors[colorName] = '#' + srgbClr.getAttribute('val');
                } else if (sysClr) {
                    const lastClr = sysClr.getAttribute('lastClr');
                    if (lastClr) {
                        this.themeColors[colorName] = '#' + lastClr;
                    }
                }
            }
        }
    }

    /**
     * Extract font scheme from theme
     * @param {Document} doc - Parsed theme document
     */
    extractFontScheme(doc) {
        const fontScheme = doc.getElementsByTagName('a:fontScheme')[0];
        if (!fontScheme) return;

        // Major font (typically for headings/titles)
        const majorFont = fontScheme.getElementsByTagName('a:majorFont')[0];
        if (majorFont) {
            const latin = majorFont.getElementsByTagName('a:latin')[0];
            if (latin) {
                this.themeFonts.majorFont = latin.getAttribute('typeface') || 'Calibri Light';
            }
        }
        
        // Minor font (typically for body text)
        const minorFont = fontScheme.getElementsByTagName('a:minorFont')[0];
        if (minorFont) {
            const latin = minorFont.getElementsByTagName('a:latin')[0];
            if (latin) {
                this.themeFonts.minorFont = latin.getAttribute('typeface') || 'Calibri';
            }
        }
    }

    /**
     * Get resolved color from scheme reference
     * @param {string} colorRef - The scheme color reference (e.g., 'accent1', 'tx1')
     * @returns {string|null} - The resolved hex color
     */
    getSchemeColor(colorRef) {
        const schemeMap = {
            'tx1': 'dk1', 'tx2': 'dk2',
            'bg1': 'lt1', 'bg2': 'lt2',
            'accent1': 'accent1', 'accent2': 'accent2',
            'accent3': 'accent3', 'accent4': 'accent4',
            'accent5': 'accent5', 'accent6': 'accent6',
            'hlink': 'hlink', 'folHlink': 'folHlink',
            'dk1': 'dk1', 'dk2': 'dk2',
            'lt1': 'lt1', 'lt2': 'lt2'
        };
        const themeKey = schemeMap[colorRef] || colorRef;
        return this.themeColors[themeKey] || this.defaultThemeColors[themeKey] || null;
    }

    /**
     * Get theme colors
     * @returns {Object} - Theme colors object
     */
    getColors() {
        return this.themeColors;
    }

    /**
     * Get theme fonts
     * @returns {Object} - Theme fonts object
     */
    getFonts() {
        return this.themeFonts;
    }

    /**
     * Get default text color (tx1 = dark1)
     * Used when no explicit color is specified
     * @returns {string} - Hex color string
     */
    getDefaultTextColor() {
        return this.themeColors['dk1'] || '#000000';
    }

    /**
     * Get default title font (major font)
     * @returns {string} - Font family name
     */
    getTitleFont() {
        return this.themeFonts.majorFont || 'Calibri Light';
    }

    /**
     * Get default body font (minor font)
     * @returns {string} - Font family name
     */
    getBodyFont() {
        return this.themeFonts.minorFont || 'Calibri';
    }

    /**
     * Get accent color by index (1-6)
     * @param {number} index - Accent color index (1-6)
     * @returns {string|null} - Hex color string or null
     */
    getAccentColor(index) {
        const key = `accent${index}`;
        return this.themeColors[key] || this.defaultThemeColors[key] || null;
    }

    /**
     * Get background color (lt1 = light1)
     * @returns {string} - Hex color string
     */
    getBackgroundColor() {
        return this.themeColors['lt1'] || '#FFFFFF';
    }

    /**
     * Get secondary text color (tx2 = dark2)
     * @returns {string} - Hex color string
     */
    getSecondaryTextColor() {
        return this.themeColors['dk2'] || '#444444';
    }

    /**
     * Get hyperlink color
     * @returns {string} - Hex color string
     */
    getHyperlinkColor() {
        return this.themeColors['hlink'] || '#0563C1';
    }

    /**
     * Reset theme data
     */
    reset() {
        this.themeColors = {};
        this.themeFonts = {
            majorFont: 'Calibri Light',
            minorFont: 'Calibri'
        };

        this.fillStyleNodes = [];
        this.bgFillStyleNodes = [];
    }
}

// Export for use in other modules
window.ThemeExtractor = ThemeExtractor;
