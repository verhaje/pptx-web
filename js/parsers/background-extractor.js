/**
 * Background Extractor Module
 * Handles extraction of background styles from PPTX slides, layouts, and masters
 */

class BackgroundExtractor {
    /**
     * Create a BackgroundExtractor
     * @param {ThemeExtractor} themeExtractor - Reference to theme extractor for color resolution
     * @param {Object} images - Map of image names to blob URLs
     */
    constructor(themeExtractor, images) {
        this.themeExtractor = themeExtractor;
        this.images = images;
    }

    /**
     * Extract comprehensive background from a document
     * @param {Document} doc - Parsed XML document (slide, layout, or master)
     * @param {Array} imageRels - Image relationships
     * @returns {Object|null} - Background object or null
     */
    extract(doc, imageRels = []) {
        const background = {
            type: null,
            color: null,
            gradient: null,
            image: null
        };

        // Check for background properties
        const bgPr = doc.getElementsByTagName('p:bgPr')[0];
        const bg = doc.getElementsByTagName('p:bg')[0];
        
        if (bgPr) {
            // Solid fill background
            const solidFill = bgPr.getElementsByTagName('a:solidFill')[0];
            if (solidFill) {
                background.type = 'solid';
                background.color = this.extractColor(solidFill);
                return background;
            }
            
            // Gradient fill background
            const gradFill = bgPr.getElementsByTagName('a:gradFill')[0];
            if (gradFill) {
                background.type = 'gradient';
                background.gradient = this.extractGradient(gradFill);
                return background;
            }
            
            // Background image (blipFill)
            const blipFill = bgPr.getElementsByTagName('a:blipFill')[0];
            if (blipFill) {
                const blip = blipFill.getElementsByTagName('a:blip')[0];
                if (blip) {
                    const svgBlip = blip.getElementsByTagName('asvg:svgBlip')[0];
                    const svgId = svgBlip ? svgBlip.getAttribute('r:embed') : null;
                    const pngId = blip.getAttribute('r:embed');

                    const resolveRel = (embedId) => {
                        if (!embedId) return null;
                        const rel = imageRels.find(r => {
                            const id = r.getAttribute ? r.getAttribute('Id') : r.id;
                            return id === embedId;
                        });
                        if (!rel) return null;
                        const target = rel.getAttribute ? rel.getAttribute('Target') : rel.target;
                        const imageName = target.split('/').pop();
                        return this.images[imageName] || null;
                    };

                    const svgUrl = resolveRel(svgId);
                    const pngUrl = resolveRel(pngId);
                    const chosen = svgUrl || pngUrl;
                    if (chosen) {
                        background.type = 'image';
                        background.image = chosen;
                        return background;
                    }
                }
            }
            
            // Pattern fill
            const pattFill = bgPr.getElementsByTagName('a:pattFill')[0];
            if (pattFill) {
                background.type = 'pattern';
                const fgClr = pattFill.getElementsByTagName('a:fgClr')[0];
                const bgClr = pattFill.getElementsByTagName('a:bgClr')[0];
                background.color = this.extractColor(fgClr) || this.extractColor(bgClr);
                return background;
            }
        }
        
        // Check for background reference (bgRef) - references theme background
        const bgRef = bg ? bg.getElementsByTagName('p:bgRef')[0] : null;
        if (bgRef) {
            const schemeClr = bgRef.getElementsByTagName('a:schemeClr')[0];
            if (schemeClr) {
                background.type = 'solid';
                background.color = this.extractColor(bgRef);
                return background;
            }
        }
        
        return background.type ? background : null;
    }

    /**
     * Extract gradient information
     * @param {Element} gradFill - Gradient fill element
     * @returns {Object} - Gradient object with type, angle, and stops
     */
    extractGradient(gradFill) {
        const gradient = {
            type: 'linear',
            angle: 90,
            stops: []
        };
        
        // Get gradient type and angle
        const lin = gradFill.getElementsByTagName('a:lin')[0];
        if (lin) {
            // Angle is in 60,000ths of a degree
            const ang = lin.getAttribute('ang');
            if (ang) {
                gradient.angle = parseInt(ang) / 60000;
            }
        }
        
        const path = gradFill.getElementsByTagName('a:path')[0];
        if (path) {
            gradient.type = path.getAttribute('path') || 'circle';
        }
        
        // Get gradient stops
        const gsLst = gradFill.getElementsByTagName('a:gsLst')[0];
        if (gsLst) {
            const stops = gsLst.getElementsByTagName('a:gs');
            for (const stop of stops) {
                const pos = parseInt(stop.getAttribute('pos') || '0') / 1000; // Convert to percentage
                const color = this.extractColor(stop);
                if (color) {
                    const stopObj = { position: pos, color: color };
                    
                    // Extract opacity for this stop
                    const alphaEl = stop.getElementsByTagName('a:alpha')[0];
                    if (alphaEl) {
                        const alphaVal = parseInt(alphaEl.getAttribute('val') || '100000');
                        stopObj.opacity = alphaVal / 100000;
                    } else {
                        stopObj.opacity = 1;
                    }
                    
                    gradient.stops.push(stopObj);
                }
            }
        }
        
        // Sort stops by position
        gradient.stops.sort((a, b) => a.position - b.position);
        
        return gradient;
    }

    /**
     * Extract color from an element
     * @param {Element} element - XML element containing color information
     * @returns {string|null} - Hex color string or null
     */
    extractColor(element) {
        if (!element) return null;
        
        // Direct RGB color
        const srgbClr = element.getElementsByTagName('a:srgbClr')[0];
        if (srgbClr) {
            const baseColor = '#' + srgbClr.getAttribute('val');
            return this.applyColorTransforms(baseColor, srgbClr);
        }
        
        // Scheme color reference
        const schemeClr = element.getElementsByTagName('a:schemeClr')[0];
        if (schemeClr) {
            const colorRef = schemeClr.getAttribute('val');
            const baseColor = this.themeExtractor.getSchemeColor(colorRef);
            if (baseColor) {
                return this.applyColorTransforms(baseColor, schemeClr);
            }
            return null;
        }
        
        // System color (Windows system colors)
        const sysClr = element.getElementsByTagName('a:sysClr')[0];
        if (sysClr) {
            const lastClr = sysClr.getAttribute('lastClr');
            if (lastClr) {
                const baseColor = '#' + lastClr;
                return this.applyColorTransforms(baseColor, sysClr);
            }
        }
        
        // Preset color (named colors like 'red', 'blue', etc.)
        const prstClr = element.getElementsByTagName('a:prstClr')[0];
        if (prstClr) {
            const colorName = prstClr.getAttribute('val');
            const baseColor = this.presetColorToHex(colorName);
            if (baseColor) {
                return this.applyColorTransforms(baseColor, prstClr);
            }
        }
        
        return null;
    }

    /**
     * Extract color with opacity from an element
     * @param {Element} element - XML element containing color information
     * @returns {Object|null} - Object with color (hex string) and opacity (0-1), or null
     */
    extractColorWithOpacity(element) {
        if (!element) return null;
        
        // Get the base color
        const color = this.extractColor(element);
        if (!color) return null;
        
        // Get opacity/alpha value from a:alpha element
        let opacity = 1;
        const alphaEl = element.getElementsByTagName('a:alpha')[0];
        if (alphaEl) {
            const alphaVal = parseInt(alphaEl.getAttribute('val') || '100000');
            opacity = alphaVal / 100000;
        }
        
        return { color, opacity };
    }

    /**
     * Apply color transformations (luminance, tint, shade, etc.)
     * @param {string} hexColor - Base hex color
     * @param {Element} colorElement - Element containing transformation children
     * @returns {string} - Transformed hex color
     */
    applyColorTransforms(hexColor, colorElement) {
        if (!colorElement) return hexColor;
        
        let { r, g, b } = this.hexToRgb(hexColor);
        let { h, s, l } = this.rgbToHsl(r, g, b);
        
        // Luminance modification (percentage, e.g., 75000 = 75%)
        const lumMod = colorElement.getElementsByTagName('a:lumMod')[0];
        if (lumMod) {
            const val = parseInt(lumMod.getAttribute('val') || '100000') / 100000;
            l = l * val;
        }
        
        // Luminance offset (percentage added/subtracted)
        const lumOff = colorElement.getElementsByTagName('a:lumOff')[0];
        if (lumOff) {
            const val = parseInt(lumOff.getAttribute('val') || '0') / 100000;
            l = l + val;
        }
        
        // Tint (mix with white)
        const tint = colorElement.getElementsByTagName('a:tint')[0];
        if (tint) {
            const val = parseInt(tint.getAttribute('val') || '100000') / 100000;
            l = l + (1 - l) * (1 - val);
        }
        
        // Shade (mix with black)
        const shade = colorElement.getElementsByTagName('a:shade')[0];
        if (shade) {
            const val = parseInt(shade.getAttribute('val') || '100000') / 100000;
            l = l * val;
        }
        
        // Saturation modification
        const satMod = colorElement.getElementsByTagName('a:satMod')[0];
        if (satMod) {
            const val = parseInt(satMod.getAttribute('val') || '100000') / 100000;
            s = s * val;
        }
        
        // Clamp values
        l = Math.max(0, Math.min(1, l));
        s = Math.max(0, Math.min(1, s));
        
        const rgb = this.hslToRgb(h, s, l);
        return this.rgbToHex(rgb.r, rgb.g, rgb.b);
    }

    /**
     * Convert hex color to RGB
     */
    hexToRgb(hex) {
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
        } : { r: 0, g: 0, b: 0 };
    }

    /**
     * Convert RGB to HSL
     */
    rgbToHsl(r, g, b) {
        r /= 255; g /= 255; b /= 255;
        const max = Math.max(r, g, b), min = Math.min(r, g, b);
        let h, s, l = (max + min) / 2;

        if (max === min) {
            h = s = 0;
        } else {
            const d = max - min;
            s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
            switch (max) {
                case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
                case g: h = ((b - r) / d + 2) / 6; break;
                case b: h = ((r - g) / d + 4) / 6; break;
            }
        }
        return { h, s, l };
    }

    /**
     * Convert HSL to RGB
     */
    hslToRgb(h, s, l) {
        let r, g, b;
        if (s === 0) {
            r = g = b = l;
        } else {
            const hue2rgb = (p, q, t) => {
                if (t < 0) t += 1;
                if (t > 1) t -= 1;
                if (t < 1/6) return p + (q - p) * 6 * t;
                if (t < 1/2) return q;
                if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
                return p;
            };
            const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
            const p = 2 * l - q;
            r = hue2rgb(p, q, h + 1/3);
            g = hue2rgb(p, q, h);
            b = hue2rgb(p, q, h - 1/3);
        }
        return { r: Math.round(r * 255), g: Math.round(g * 255), b: Math.round(b * 255) };
    }

    /**
     * Convert RGB to hex
     */
    rgbToHex(r, g, b) {
        return '#' + [r, g, b].map(x => {
            const hex = x.toString(16);
            return hex.length === 1 ? '0' + hex : hex;
        }).join('');
    }

    /**
     * Convert preset color name to hex
     */
    presetColorToHex(colorName) {
        if (!colorName) return null;

        const presetColors = {
            // Core colors
            'black': '#000000', 'white': '#FFFFFF', 'red': '#FF0000', 'green': '#00FF00', 'blue': '#0000FF',
            'yellow': '#FFFF00', 'cyan': '#00FFFF', 'magenta': '#FF00FF', 'orange': '#FFA500', 'brown': '#A52A2A',
            'gray': '#808080', 'silver': '#C0C0C0', 'dkGray': '#404040', 'ltGray': '#D3D3D3',

            // Dark variants
            'darkRed': '#8B0000', 'darkGreen': '#006400', 'darkBlue': '#00008B', 'darkGray': '#404040',
            'dkRed': '#8B0000', 'dkGreen': '#006400', 'dkBlue': '#00008B',

            // Light variants
            'lightRed': '#FFA07A', 'lightGreen': '#90EE90', 'lightBlue': '#ADD8E6', 'lightGray': '#D3D3D3',
            'ltRed': '#FFA07A', 'ltGreen': '#90EE90', 'ltBlue': '#ADD8E6', 'ltGray': '#D3D3D3',

            // Additional named colors commonly used by Office presets
            'maroon': '#800000', 'olive': '#808000', 'navy': '#000080', 'purple': '#800080', 'teal': '#008080',
            'aqua': '#00FFFF', 'lime': '#00FF00', 'fuchsia': '#FF00FF', 'gold': '#FFD700', 'coral': '#FF7F50',
            'crimson': '#DC143C', 'indigo': '#4B0082', 'violet': '#EE82EE', 'plum': '#DDA0DD', 'tan': '#D2B48C'
        };

        const hex = presetColors[colorName];
        if (!hex) {
            console.warn(`[PPTX] Unmapped preset color '${colorName}'`);
        }
        return hex || null;
    }
}

// Export for use in other modules
window.BackgroundExtractor = BackgroundExtractor;
