/**
 * Text Formatter Module
 * Handles text formatting, font stacks, and text utilities
 */

class TextFormatter {
    /**
     * Font mapping for common PowerPoint fonts to web-safe fallbacks
     */
    static FONT_MAP = {
        // Sans-serif fonts
        'Calibri': '"Calibri", "Segoe UI", Arial, sans-serif',
        'Calibri Light': '"Calibri Light", "Calibri", "Segoe UI Light", Arial, sans-serif',
        'Arial': 'Arial, Helvetica, sans-serif',
        'Arial Black': '"Arial Black", Arial, sans-serif',
        'Helvetica': 'Helvetica, Arial, sans-serif',
        'Tahoma': 'Tahoma, Geneva, sans-serif',
        'Verdana': 'Verdana, Geneva, sans-serif',
        'Trebuchet MS': '"Trebuchet MS", Helvetica, sans-serif',
        'Segoe UI': '"Segoe UI", Tahoma, Geneva, sans-serif',
        'Century Gothic': '"Century Gothic", Arial, sans-serif',
        'Gill Sans MT': '"Gill Sans MT", "Gill Sans", Arial, sans-serif',
        'Franklin Gothic Medium': '"Franklin Gothic Medium", "Franklin Gothic", Arial, sans-serif',
        
        // Serif fonts
        'Times New Roman': '"Times New Roman", Times, serif',
        'Georgia': 'Georgia, "Times New Roman", serif',
        'Palatino Linotype': '"Palatino Linotype", Palatino, Georgia, serif',
        'Book Antiqua': '"Book Antiqua", Palatino, Georgia, serif',
        'Garamond': 'Garamond, "Times New Roman", serif',
        'Cambria': 'Cambria, Georgia, serif',
        
        // Monospace fonts
        'Courier New': '"Courier New", Courier, monospace',
        'Consolas': 'Consolas, Monaco, "Courier New", monospace',
        'Lucida Console': '"Lucida Console", Monaco, monospace',
        
        // Display/decorative fonts
        'Impact': 'Impact, "Arial Black", sans-serif',
        'Comic Sans MS': '"Comic Sans MS", cursive, sans-serif',
        'Brush Script MT': '"Brush Script MT", cursive',
        
        // Common presentation fonts
        'Aptos': 'Aptos, Calibri, Arial, sans-serif',
        'Aptos Display': '"Aptos Display", Aptos, Calibri, Arial, sans-serif'
    };

    /**
     * Format a text element with styling
     * @param {Object|string} textElement - Text element object or string
     * @param {boolean} isTitle - Whether this is a title element
     * @returns {string} - HTML string
     */
    formatTextElement(textElement, isTitle = false) {
        if (!textElement) return '';
        
        // Handle legacy string format
        if (typeof textElement === 'string') {
            return this.escapeHtml(textElement);
        }
        
        // Handle structured text with formatting
        if (textElement.paragraphs) {
            return textElement.paragraphs.map(paragraph => {
                return paragraph.map(run => {
                    let html = this.escapeHtml(run.text);
                    
                    // Apply formatting tags
                    if (run.bold) html = `<strong>${html}</strong>`;
                    if (run.italic) html = `<em>${html}</em>`;
                    if (run.underline) html = `<u>${html}</u>`;
                    if (run.strikethrough) html = `<s>${html}</s>`;
                    if (run.superscript) html = `<sup>${html}</sup>`;
                    if (run.subscript) html = `<sub>${html}</sub>`;
                    
                    // Build inline styles
                    let style = '';
                    if (run.color) style += `color: ${run.color};`;
                    if (run.fontSize) style += `font-size: ${run.fontSize}pt;`;
                    if (run.fontFamily) {
                        // Build font-family with fallbacks
                        const fontStack = this.buildFontStack(run.fontFamily);
                        style += `font-family: ${fontStack};`;
                    }
                    if (run.highlight) style += `background-color: ${run.highlight};`;
                    if (run.textTransform && run.textTransform !== 'none') {
                        if (run.textTransform === 'small-caps') {
                            style += 'font-variant: small-caps;';
                        } else if (run.textTransform === 'uppercase') {
                            style += 'text-transform: uppercase;';
                        }
                    }
                    if (run.shadow) {
                        const s = run.shadow;
                        const opacity = s.opacity !== undefined ? Math.min(1, Math.max(0, s.opacity)) : 1;
                        style += `text-shadow: ${s.offsetX || 0}px ${s.offsetY || 0}px ${s.blur || 0}px ${s.color || '#000'}${opacity < 1 ? `${Math.round(opacity * 100) / 100}` : ''};`;
                    }
                    
                    if (style) {
                        html = `<span style="${style}">${html}</span>`;
                    }
                    
                    return html;
                }).join('');
            }).join('<br>');
        }
        
        return '';
    }

    /**
     * Build a CSS font-family stack with appropriate fallbacks
     * @param {string} fontFamily - The primary font family
     * @returns {string} - CSS font-family value with fallbacks
     */
    buildFontStack(fontFamily) {
        if (!fontFamily) return 'inherit';
        
        // Check if we have a predefined mapping
        if (TextFormatter.FONT_MAP[fontFamily]) {
            return TextFormatter.FONT_MAP[fontFamily];
        }
        
        // For unknown fonts, create a reasonable fallback stack
        const lowerFont = fontFamily.toLowerCase();
        if (lowerFont.includes('sans') || lowerFont.includes('gothic') || lowerFont.includes('arial')) {
            return `"${fontFamily}", Arial, sans-serif`;
        } else if (lowerFont.includes('serif') || lowerFont.includes('roman') || lowerFont.includes('times')) {
            return `"${fontFamily}", "Times New Roman", serif`;
        } else if (lowerFont.includes('mono') || lowerFont.includes('courier') || lowerFont.includes('console')) {
            return `"${fontFamily}", "Courier New", monospace`;
        }
        
        // Default fallback
        return `"${fontFamily}", Arial, sans-serif`;
    }

    /**
     * Get plain text from a text element
     * @param {Object|string} textElement - Text element
     * @returns {string} - Plain text
     */
    getPlainText(textElement) {
        if (!textElement) return '';
        if (typeof textElement === 'string') return textElement;
        if (textElement.paragraphs) {
            return textElement.paragraphs
                .map(p => p.map(r => r.text).join(''))
                .join(' ');
        }
        return '';
    }

    /**
     * Get the color of the first text run
     * @param {Object|string} textElement - Text element
     * @returns {string|null} - Color value or null
     */
    getTextColor(textElement) {
        if (!textElement || typeof textElement === 'string') return null;
        if (textElement.paragraphs && textElement.paragraphs[0] && textElement.paragraphs[0][0]) {
            return textElement.paragraphs[0][0].color;
        }
        return null;
    }

    /**
     * Truncate text with ellipsis
     * @param {string} text - Text to truncate
     * @param {number} maxLength - Maximum length
     * @returns {string} - Truncated text
     */
    truncateText(text, maxLength) {
        if (text.length <= maxLength) return text;
        return text.substring(0, maxLength) + '...';
    }

    /**
     * Escape HTML special characters
     * @param {string} text - Text to escape
     * @returns {string} - Escaped text
     */
    escapeHtml(text) {
        if (!text) return '';
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
}

// Export for use in other modules
window.TextFormatter = TextFormatter;
