/**
 * Style Builder Module
 * Handles CSS style generation for backgrounds and gradients
 */

class StyleBuilder {
    /**
     * Create CSS background style from background object
     * @param {Object} background - Background configuration
     * @returns {string} - CSS style string
     */
    createBackgroundStyle(background) {
        if (!background) return '';
        
        switch (background.type) {
            case 'solid':
                return background.color ? `background-color: ${background.color};` : '';
                
            case 'gradient':
                return this.createGradientStyle(background.gradient);
                
            case 'image':
                return background.image ? 
                    `background-image: url('${background.image}'); background-size: cover; background-position: center;` : '';
                
            case 'pattern':
                return background.color ? `background-color: ${background.color};` : '';
                
            default:
                return '';
        }
    }

    /**
     * Create CSS gradient style
     * @param {Object} gradient - Gradient configuration
     * @returns {string} - CSS gradient style string
     */
    createGradientStyle(gradient) {
        if (!gradient || !gradient.stops || gradient.stops.length === 0) return '';
        
        // Build gradient stops string with opacity support
        const stopsStr = gradient.stops
            .map(stop => {
                let colorStr = stop.color;
                // Apply opacity to the color using rgba if opacity < 1
                if (stop.opacity !== undefined && stop.opacity < 1) {
                    // Convert hex to rgba with opacity
                    const rgba = this.hexToRgbaForGradient(stop.color, stop.opacity);
                    colorStr = rgba;
                }
                return `${colorStr} ${stop.position}%`;
            })
            .join(', ');
        
        if (gradient.type === 'linear' || !gradient.type) {
            // Convert PowerPoint angle to CSS angle
            // PowerPoint: 0 = left to right, 90 = top to bottom
            // CSS: 0 = bottom to top, 90 = left to right
            const cssAngle = (gradient.angle + 90) % 360;
            return `background: linear-gradient(${cssAngle}deg, ${stopsStr});`;
        } else if (gradient.type === 'circle' || gradient.type === 'rect') {
            return `background: radial-gradient(circle, ${stopsStr});`;
        }
        
        return '';
    }

    /**
     * Convert hex color to rgba string for use in gradients
     * @param {string} hex - Hex color (#RRGGBB)
     * @param {number} alpha - Alpha value (0-1)
     * @returns {string} - rgba() color string
     */
    hexToRgbaForGradient(hex, alpha = 1) {
        // Remove '#' if present
        hex = hex.replace('#', '');
        
        // Parse hex to RGB
        const r = parseInt(hex.substring(0, 2), 16);
        const g = parseInt(hex.substring(2, 4), 16);
        const b = parseInt(hex.substring(4, 6), 16);
        
        return `rgba(${r}, ${g}, ${b}, ${alpha})`;
    }

    /**
     * Apply background styling to a DOM element
     * @param {HTMLElement} element - Target element
     * @param {Object} background - Background configuration
     */
    applyBackgroundToElement(element, background) {
        if (!background) return;
        
        switch (background.type) {
            case 'solid':
                if (background.color) {
                    element.style.backgroundColor = background.color;
                }
                break;
                
            case 'gradient':
                if (background.gradient) {
                    element.style.background = this.createGradientStyle(background.gradient).replace('background: ', '').replace(';', '');
                }
                break;
                
            case 'image':
                if (background.image) {
                    element.style.backgroundImage = `url('${background.image}')`;
                    element.style.backgroundSize = 'cover';
                    element.style.backgroundPosition = 'center';
                }
                break;
                
            case 'pattern':
                if (background.color) {
                    element.style.backgroundColor = background.color;
                }
                break;
        }
    }

    /**
     * Build inline style for an image with position and size
     * @param {Object} img - Image object with position and size
     * @returns {string} - CSS style string
     */
    buildImageStyle(img) {
        let style = '';
        if (img.x !== undefined && img.y !== undefined) {
            style += `position: absolute; left: ${img.x}px; top: ${img.y}px;`;
        }
        if (img.width) {
            style += `width: ${img.width}px;`;
        }
        if (img.height) {
            style += `height: ${img.height}px;`;
        }
        return style;
    }
}

// Export for use in other modules
window.StyleBuilder = StyleBuilder;
