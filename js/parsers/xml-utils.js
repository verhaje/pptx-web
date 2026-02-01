/**
 * XML Utilities Module
 * Handles XML parsing and file content extraction from PPTX archives
 */

class XMLUtils {
    /**
     * Get file content from the ZIP archive
     * @param {JSZip} zip - The ZIP archive
     * @param {string} path - Path to the file within the archive
     * @returns {Promise<string|null>} - File content as string
     */
    static async getFileContent(zip, path) {
        const file = zip.files[path];
        if (file) {
            return await file.async('string');
        }
        return null;
    }

    /**
     * Parse relationships XML
     * @param {string} xmlContent - The relationships XML content
     * @returns {Array} - Array of relationship objects
     */
    static parseRelationships(xmlContent) {
        if (!xmlContent) return [];
        
        const relationships = [];
        const parser = new DOMParser();
        const doc = parser.parseFromString(xmlContent, 'text/xml');
        const rels = doc.getElementsByTagName('Relationship');
        
        for (const rel of rels) {
            relationships.push({
                id: rel.getAttribute('Id'),
                type: rel.getAttribute('Type'),
                target: rel.getAttribute('Target')
            });
        }
        
        return relationships;
    }

    /**
     * Get slide order from presentation.xml
     * @param {string} presentationXml - The presentation XML content
     * @returns {Array} - Array of slide relationship IDs in order
     */
    static getSlideOrder(presentationXml) {
        if (!presentationXml) return [];
        
        const slideIds = [];
        const parser = new DOMParser();
        const doc = parser.parseFromString(presentationXml, 'text/xml');
        
        const slideList = doc.getElementsByTagName('p:sldIdLst')[0];
        if (slideList) {
            const slides = slideList.getElementsByTagName('p:sldId');
            for (const slide of slides) {
                const rId = slide.getAttribute('r:id');
                if (rId) {
                    slideIds.push(rId);
                }
            }
        }
        
        return slideIds;
    }

    /**
     * Parse an XML string into a DOM document
     * @param {string} xmlContent - The XML content
     * @returns {Document} - Parsed DOM document
     */
    static parseXML(xmlContent) {
        const parser = new DOMParser();
        return parser.parseFromString(xmlContent, 'text/xml');
    }
}

// Export for use in other modules
window.XMLUtils = XMLUtils;
