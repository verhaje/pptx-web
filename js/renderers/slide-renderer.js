/**
 * Slide Renderer Module
 * Orchestrates rendering of slides to HTML with proper layout and styling
 */

class SlideRenderer {
    /**
     * Create a Slide Renderer
     */
    constructor() {
        this.styleBuilder = new StyleBuilder();
        this.textFormatter = new TextFormatter();
        this.shapeRenderer = new ShapeRenderer(this.styleBuilder, this.textFormatter);
    }

    /**
     * Create HTML for a single slide
     * @param {Object} slide - Parsed slide data
     * @returns {string} - HTML string for the slide
     */
    createSlideHTML(slide) {
        if (!slide || !slide.shapes) {
            return '<div class="slide" style="background: white;"></div>';
        }

        // Build background style
        const bgStyle = this.buildBackgroundStyle(slide.background);

        // Slide size/aspect ratio (from presentation.xml p:sldSz)
        const ratio = slide.slideSize?.ratio || (16 / 9);
        const invRatio = slide.slideSize?.invRatio || (9 / 16);
        const aspectRatio = slide.slideSize?.cx && slide.slideSize?.cy
            ? `${slide.slideSize.cx} / ${slide.slideSize.cy}`
            : '16 / 9';
        
        // Render all shapes
        const shapesHTML = slide.shapes.length > 0 
            ? this.shapeRenderer.renderShapes(slide.shapes)
            : '';

        return `
            <div class="slide-wrapper">
                <div class="slide" style="${bgStyle} --slide-ratio: ${ratio}; --slide-inv-ratio: ${invRatio}; aspect-ratio: ${aspectRatio};">
                    <div class="slide-shapes-container">
                        ${shapesHTML}
                    </div>
                </div>
            </div>
        `;
    }

    /**
     * Create a thumbnail element for a slide
     * @param {Object} slide - Parsed slide data
     * @param {number} index - Slide index
     * @param {Function} onThumbnailClick - Callback when thumbnail is clicked
     * @returns {HTMLElement} - Thumbnail element
     */
    createThumbnail(slide, index, onThumbnailClick) {
        // Create container
        const thumbnail = document.createElement('div');
        thumbnail.className = 'thumbnail';
        thumbnail.dataset.slide = index;
        
        // Build background style with thumbnail sizing
        const bgStyle = this.buildBackgroundStyle(slide.background);

        const ratio = slide.slideSize?.ratio || (16 / 9);
        const invRatio = slide.slideSize?.invRatio || (9 / 16);
        const aspectRatio = slide.slideSize?.cx && slide.slideSize?.cy
            ? `${slide.slideSize.cx} / ${slide.slideSize.cy}`
            : '16 / 9';

        thumbnail.style.setProperty('--slide-ratio', ratio);
        thumbnail.style.setProperty('--slide-inv-ratio', invRatio);
        thumbnail.style.aspectRatio = aspectRatio;
        
        // Render shapes with thumbnail scaling
        const shapesHTML = slide.shapes && slide.shapes.length > 0
            ? this.shapeRenderer.renderShapes(slide.shapes)
            : '';

        // Create slide preview (16:9 aspect ratio)
        const slidePreview = document.createElement('div');
        slidePreview.className = 'thumbnail-slide';
        slidePreview.style.cssText = `${bgStyle} --slide-ratio: ${ratio}; --slide-inv-ratio: ${invRatio}; aspect-ratio: ${aspectRatio};`;
        slidePreview.innerHTML = `
            <div class="slide-shapes-container">
                ${shapesHTML}
            </div>
        `;

        thumbnail.appendChild(slidePreview);

        // Add slide number
        const slideNumber = document.createElement('div');
        slideNumber.className = 'thumbnail-number';
        slideNumber.textContent = (index + 1).toString();
        thumbnail.appendChild(slideNumber);

        // Add click handler
        thumbnail.addEventListener('click', () => onThumbnailClick(index));

        return thumbnail;
    }

    /**
     * Build background CSS style
     * @param {Object} background - Background object from parser
     * @returns {string} - CSS style string
     */
    buildBackgroundStyle(background) {
        if (!background) {
            return 'background: white;';
        }

        let style = '';

        switch (background.type) {
            case 'solid':
                if (background.color) {
                    style = `background: ${background.color};`;
                } else {
                    style = 'background: white;';
                }
                break;

            case 'gradient':
                if (background.gradient) {
                    style = this.buildGradientStyle(background.gradient);
                } else {
                    style = 'background: white;';
                }
                break;

            case 'image':
                if (background.image) {
                    style = `background-image: url(${background.image}); background-size: cover; background-position: center;`;
                } else {
                    style = 'background: white;';
                }
                break;

            case 'pattern':
                if (background.color) {
                    style = `background: ${background.color};`;
                } else {
                    style = 'background: white;';
                }
                break;

            default:
                style = 'background: white;';
        }

        return style;
    }

    /**
     * Build CSS gradient style
     * @param {Object} gradient - Gradient object
     * @returns {string} - CSS gradient string
     */
    buildGradientStyle(gradient) {
        if (!gradient || !gradient.stops || gradient.stops.length === 0) {
            return 'background: white;';
        }

        try {
            const angle = gradient.angle || 90;
            const colorStops = gradient.stops
                .map(stop => `${stop.color} ${stop.position * 100}%`)
                .join(', ');
            
            return `background: linear-gradient(${angle}deg, ${colorStops});`;
        } catch (error) {
            console.warn('Error building gradient style:', error);
            return 'background: white;';
        }
    }

    /**
     * Scale slide coordinates for thumbnail display
     * @param {number} value - Original coordinate value
     * @param {number} scale - Scale factor (typically 0.2 for thumbnails)
     * @returns {number} - Scaled value
     */
    scaleValue(value, scale = 0.2) {
        return value * scale;
    }
}
