/**
 * Shape Renderer Module
 * Handles rendering of PowerPoint shapes to HTML/CSS
 */

class ShapeRenderer {
    constructor(styleBuilder, textFormatter) {
        this.styleBuilder = styleBuilder;
        this.textFormatter = textFormatter;
        this.chartRenderer = new ChartRenderer();
    }

    /**
     * Render multiple shapes to HTML
     * Shapes are sorted by z-index to ensure proper layering in HTML
     * @param {Array} shapes - Array of shape objects
     * @returns {string} - HTML string
     */
    renderShapes(shapes = []) {
        // Prefer PowerPoint spTree order (DOM order) unless zIndex is explicitly provided.
        // Sorting by a default (e.g. 0) can reshuffle elements and break stacking.
        const hasAnyZIndex = shapes.some(s => typeof s?.zIndex === 'number');
        const ordered = hasAnyZIndex
            ? [...shapes]
                .map((shape, originalIndex) => ({ shape, originalIndex }))
                .sort((a, b) => {
                    const aIndex = typeof a.shape.zIndex === 'number' ? a.shape.zIndex : Number.POSITIVE_INFINITY;
                    const bIndex = typeof b.shape.zIndex === 'number' ? b.shape.zIndex : Number.POSITIVE_INFINITY;
                    if (aIndex !== bIndex) return aIndex - bIndex;
                    return a.originalIndex - b.originalIndex; // stable
                })
                .map(x => x.shape)
            : shapes;

        return ordered.map(shape => this.renderShape(shape)).join('');
    }

    /**
     * Render a single shape to HTML
     * @param {Object} shape - Shape object
     * @returns {string} - HTML string
     */
    renderShape(shape) {
        if (!shape) return '';

        // Handle group shapes (render children)
        if (shape.type === 'group' && Array.isArray(shape.shapes)) {
            return this.renderShapes(shape.shapes);
        }

        const style = this.buildShapeStyle(shape);
        const clipPath = this.getShapeClipPath(shape.type);
        let transform = shape.rotation ? `transform: rotate(${shape.rotation}deg);` : '';
        
        // Handle flip transforms
        if (shape.flipH || shape.flipV) {
            const scaleX = shape.flipH ? -1 : 1;
            const scaleY = shape.flipV ? -1 : 1;
            if (transform) {
                transform = transform.replace('transform:', `transform: scale(${scaleX}, ${scaleY})`);
            } else {
                transform = `transform: scale(${scaleX}, ${scaleY});`;
            }
        }

        // Render pictures separately to ensure images show up
        if (shape.type === 'picture' && shape.src) {
            const fullStyle = `${style}${transform}`;
            return `<div class="slide-shape picture" style="${fullStyle}"><img src="${shape.src}" alt="" /></div>`;
        }
        
        // Render custom geometry shapes as SVG
        if (shape.type === 'custom' && shape.customGeometry) {
            return this.renderCustomGeometry(shape);
        }
        
        // Render line/connector shapes
        if (this.isLineShape(shape.type)) {
            return this.renderLineShape(shape);
        }

        // Render tables
        if (shape.type === 'table') {
            return this.renderTableShape(shape);
        }

        // Render charts (placeholder)
        if (shape.type === 'chart') {
            return this.chartRenderer.render(shape);
        }

        let textContent = '';
        let hasText = false;
        if (shape.text) {
            const boxStyle = this.buildTextBoxStyle(shape);
            textContent = `<div class="shape-text-box" style="${boxStyle}">${this.formatShapeText(shape.text)}</div>`;
            hasText = true;
        }
        
        const fullStyle = `${style}${clipPath}${transform}`;
        
        // If shape has text, add a class to help with stacking context
        const shapeClass = hasText ? 'slide-shape with-text' : 'slide-shape';

        return `<div class="${shapeClass}" style="${fullStyle}">${textContent}</div>`;
    }

    /**
     * Check if shape type is a line/connector
     * @param {string} type - Shape type
     * @returns {boolean}
     */
    isLineShape(type) {
        const lineTypes = ['line', 'straightConnector1', 'bentConnector2', 'bentConnector3',
            'bentConnector4', 'bentConnector5', 'curvedConnector2', 'curvedConnector3',
            'curvedConnector4', 'curvedConnector5'];
        return lineTypes.includes(type);
    }

    /**
     * Build CSS for the text box inside a shape.
     * Uses EMU insets relative to the shape's EMU extents for PowerPoint-faithful padding.
     */
    buildTextBoxStyle(shape) {
        const cxEMU = typeof shape.cxEMU === 'number' && shape.cxEMU > 0 ? shape.cxEMU : null;
        const cyEMU = typeof shape.cyEMU === 'number' && shape.cyEMU > 0 ? shape.cyEMU : null;

        let left = 0, right = 0, top = 0, bottom = 0;
        if (shape.textInsetsEMU && cxEMU && cyEMU) {
            left = (shape.textInsetsEMU.left / cxEMU) * 100;
            right = (shape.textInsetsEMU.right / cxEMU) * 100;
            top = (shape.textInsetsEMU.top / cyEMU) * 100;
            bottom = (shape.textInsetsEMU.bottom / cyEMU) * 100;
        }

        const autoFit = shape.textAutoFit || null;
        const overflowMode = autoFit === 'norm' ? 'visible' : 'hidden';
        let style = `position: absolute; left: ${left}%; top: ${top}%; right: ${right}%; bottom: ${bottom}%; box-sizing: border-box; overflow: ${overflowMode}; display: flex; flex-direction: column; align-items: stretch;`;

        // Lightly shrink text when norm autofit is requested to reduce clipping without measuring
        if (autoFit === 'norm') {
            style += 'font-size: 0.9em; line-height: 1.12; height: auto; min-height: 100%; bottom: auto;';
        }

        if (shape.textVAlign === 'bottom') {
            style += 'justify-content: flex-end;';
        } else if (shape.textVAlign === 'middle') {
            style += 'justify-content: center;';
        } else {
            style += 'justify-content: flex-start;';
        }

        if (shape.textWrap === false) {
            style += 'white-space: nowrap;';
        } else {
            style += 'white-space: normal;';
        }

        return style;
    }

    /**
     * Render a line/connector shape using SVG
     * @param {Object} shape - Line shape object
     * @returns {string} - HTML string with SVG
     */
    renderLineShape(shape) {
        const strokeColor = shape.stroke || '#000000';
        const strokeWidth = Math.max(1, shape.strokeWidth || 1);
        const x = shape.x;
        const y = shape.y;
        const width = Math.max(0.1, shape.width);
        const height = Math.max(0.1, shape.height);
        
        // Use explicit line points when provided (from connector resolution), otherwise infer orientation
        let x1 = 0, y1 = 0, x2 = '100%', y2 = '100%';
        if (shape.linePoints) {
            x1 = `${shape.linePoints.x1}%`;
            y1 = `${shape.linePoints.y1}%`;
            x2 = `${shape.linePoints.x2}%`;
            y2 = `${shape.linePoints.y2}%`;
        } else {
            const isHorizontal = height <= width * 0.2;
            const isVertical = width <= height * 0.2;
            if (isHorizontal) {
                y1 = '50%';
                y2 = '50%';
                x1 = 0; x2 = '100%';
            } else if (isVertical) {
                x1 = '50%';
                x2 = '50%';
                y1 = 0; y2 = '100%';
            }

            // Apply flips to swap endpoints (preserves arrow end meaning)
            if (shape.flipH) { const tmp = x1; x1 = x2; x2 = tmp; }
            if (shape.flipV) { const tmp = y1; y1 = y2; y2 = tmp; }
        }
        
        // Include z-index for proper layer ordering
        const zIndexStyle = typeof shape.zIndex === 'number' ? `z-index: ${shape.zIndex};` : '';
        const style = `position: absolute; left: ${x}%; top: ${y}%; width: ${width}%; height: ${height}%; overflow: visible; ${zIndexStyle}`;

        // Arrowheads: prefer mapping to connector start/end when available
        const uid = Math.random().toString(36).slice(2, 9);
        // If connector metadata present, attach tail to startCxn and head to endCxn
        const markerStartId = (shape.startCxn && shape.arrowTail) ? `arrow-start-${uid}` : (shape.arrowTail && !shape.startCxn ? `arrow-start-${uid}` : null);
        const markerEndId = (shape.endCxn && shape.arrowHead) ? `arrow-end-${uid}` : (shape.arrowHead && !shape.endCxn ? `arrow-end-${uid}` : null);

        const markerStart = markerStartId ? `
            <marker id="${markerStartId}" viewBox="0 0 10 10" refX="2" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                <path d="M0 0 L10 5 L0 10 Z" fill="${strokeColor}" />
            </marker>` : '';

        const markerEnd = markerEndId ? `
            <marker id="${markerEndId}" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                <path d="M0 0 L10 5 L0 10 Z" fill="${strokeColor}" />
            </marker>` : '';

        const markerStartAttr = markerStartId ? `marker-start="url(#${markerStartId})"` : '';
        const markerEndAttr = markerEndId ? `marker-end="url(#${markerEndId})"` : '';
        
        return `<div class="slide-shape line-shape" style="${style}">
            <svg width="100%" height="100%" preserveAspectRatio="none" style="overflow: visible;">
                <defs>${markerStart}${markerEnd}</defs>
                <line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" 
                      stroke="${strokeColor}" stroke-width="${strokeWidth}" stroke-linecap="round" ${markerStartAttr} ${markerEndAttr}/>
            </svg>
        </div>`;
    }

    /**
     * Render a custom geometry shape using SVG paths
     * @param {Object} shape - Shape with custom geometry
     * @returns {string} - HTML string with SVG
     */
    renderCustomGeometry(shape) {
        if (!shape.customGeometry || !shape.customGeometry.paths || shape.customGeometry.paths.length === 0) {
            // Fallback to bounding box rectangle
            return this.renderShape({ ...shape, type: 'rect' });
        }

        const x = shape.x;
        const y = shape.y;
        const width = Math.max(0.1, shape.width);
        const height = Math.max(0.1, shape.height);
        
        // Build SVG paths from custom geometry
        let pathsHTML = '';
        for (const path of shape.customGeometry.paths) {
            const fillColor = shape.fill === 'none' ? 'none' : (typeof shape.fill === 'string' ? shape.fill : '#ffffff');
            const strokeColor = (shape.stroke && shape.stroke !== 'none') ? shape.stroke : 'none';
            const strokeWidth = shape.strokeWidth || 1;
            
            pathsHTML += `<path d="${path.data}" 
                            fill="${fillColor}" 
                            stroke="${strokeColor}" 
                            stroke-width="${strokeWidth}"
                            vector-effect="non-scaling-stroke"/>`;
        }

        const zIndexStyle = typeof shape.zIndex === 'number' ? `z-index: ${shape.zIndex};` : '';
        const transformStyle = shape.rotation ? `transform: rotate(${shape.rotation}deg);` : '';
        const style = `position: absolute; left: ${x}%; top: ${y}%; width: ${width}%; height: ${height}%; overflow: visible; ${transformStyle}${zIndexStyle}`;
        
        // If shape has text, add text box on top
        let textContent = '';
        if (shape.text) {
            const boxStyle = this.buildTextBoxStyle(shape);
            textContent = `<div class="shape-text-box" style="${boxStyle}">${this.formatShapeText(shape.text)}</div>`;
        }
        
        return `<div class="slide-shape custom-geometry" style="${style}">
            <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet" style="overflow: visible;">
                ${pathsHTML}
            </svg>
            ${textContent}
        </div>`;
    }

    /**
     * Render a table shape using CSS grid
     * @param {Object} shape - Table shape object
     * @returns {string} - HTML string for the table
     */
    renderTableShape(shape) {
        const columns = shape.columnWidths || [];
        const rows = shape.rows || [];
        const rowHeights = shape.rowHeights || [];
        
        // Ensure minimum dimensions
        const width = Math.max(1, shape.width || 10);
        const height = Math.max(1, shape.height || 10);
        const x = shape.x || 0;
        const y = shape.y || 0;
        
        const colTemplate = columns.length > 0 
            ? columns.map(w => `${w.toFixed(2)}%`).join(' ') 
            : `repeat(${rows[0]?.cells?.length || 1}, 1fr)`;
        const rowTemplate = rowHeights.length > 0 
            ? rowHeights.map(h => `${h.toFixed(2)}%`).join(' ') 
            : `repeat(${rows.length || 1}, 1fr)`;
        const zIndexStyle = typeof shape.zIndex === 'number' ? `z-index: ${shape.zIndex};` : '';
        const transform = shape.rotation ? `transform: rotate(${shape.rotation}deg);` : '';

        const tableStyle = `position: absolute; left: ${x}%; top: ${y}%; width: ${width}%; height: ${height}%; display: grid; grid-template-columns: ${colTemplate}; grid-template-rows: ${rowTemplate}; ${zIndexStyle}${transform}box-sizing: border-box;`;

        let cellsHtml = '';
        for (const row of rows) {
            for (const cell of (row.cells || [])) {
                const colSpan = Math.max(1, cell.colSpan || 1);
                const rowSpan = Math.max(1, cell.rowSpan || 1);
                
                // Apply cell fill
                let cellFill = '';
                if (cell.fill && cell.fill !== 'none') {
                    if (typeof cell.fill === 'string') {
                        cellFill = `background-color: ${cell.fill};`;
                    } else if (cell.fill.type === 'gradient' && cell.fill.gradient && Array.isArray(cell.fill.gradient.stops)) {
                        const firstStop = cell.fill.gradient.stops[0];
                        const color = firstStop?.color || '#ffffff';
                        cellFill = `background-color: ${color};`;
                    }
                }
                
                // Apply cell margins/padding
                const margins = cell.margins || { l: 8, r: 8, t: 4, b: 4 };
                const padding = `padding: ${margins.t / 4}px ${margins.r / 4}px ${margins.b / 4}px ${margins.l / 4}px;`;
                
                // Apply borders
                let borderStyle = 'border: 1px solid #ddd;';
                if (cell.borders) {
                    const borders = [];
                    if (cell.borders.top) {
                        borders.push(`border-top: ${cell.borders.top.width}px solid ${cell.borders.top.color};`);
                    }
                    if (cell.borders.bottom) {
                        borders.push(`border-bottom: ${cell.borders.bottom.width}px solid ${cell.borders.bottom.color};`);
                    }
                    if (cell.borders.left) {
                        borders.push(`border-left: ${cell.borders.left.width}px solid ${cell.borders.left.color};`);
                    }
                    if (cell.borders.right) {
                        borders.push(`border-right: ${cell.borders.right.width}px solid ${cell.borders.right.color};`);
                    }
                    if (borders.length > 0) {
                        borderStyle = borders.join('');
                    } else if (cell.stroke) {
                        borderStyle = `border: ${cell.strokeWidth || 1}px solid ${cell.stroke};`;
                    }
                }
                
                // Header styling
                let headerStyle = '';
                if (cell.isHeader || row.isHeader) {
                    headerStyle = 'font-weight: 700; text-align: center; vertical-align: middle;';
                }
                
                const colSpanStyle = colSpan > 1 ? `grid-column: span ${colSpan};` : '';
                const rowSpanStyle = rowSpan > 1 ? `grid-row: span ${rowSpan};` : '';
                const textContent = cell.text ? `<div class="table-text-box">${this.formatShapeText(cell.text)}</div>` : '';
                
                cellsHtml += `<div class="table-cell" style="box-sizing: border-box; overflow: hidden; ${borderStyle}${cellFill}${padding}${headerStyle}${colSpanStyle}${rowSpanStyle}">${textContent}</div>`;
            }
        }

        return `<div class="slide-shape table-shape" style="${tableStyle}">${cellsHtml}</div>`;
    }

    /**
     * Build CSS style for a shape
     * @param {Object} shape - Shape object
     * @returns {string} - CSS style string (uses percentages for scaling)
     */
    buildShapeStyle(shape) {
        // Ensure minimum dimensions for visibility. If percent dimensions are missing/zero but EMU extents exist,
        // recompute from the slide EMU size to avoid 0% sizing on text shapes.
        const slideWidthEMU = (typeof ShapeParser !== 'undefined' && ShapeParser.SLIDE_WIDTH_EMU) ? ShapeParser.SLIDE_WIDTH_EMU : 9144000;
        const slideHeightEMU = (typeof ShapeParser !== 'undefined' && ShapeParser.SLIDE_HEIGHT_EMU) ? ShapeParser.SLIDE_HEIGHT_EMU : 5143500;

        let width = typeof shape.width === 'number' ? shape.width : 0;
        let height = typeof shape.height === 'number' ? shape.height : 0;

        if ((width === 0 || !Number.isFinite(width)) && typeof shape.cxEMU === 'number' && shape.cxEMU > 0) {
            width = (shape.cxEMU / slideWidthEMU) * 100;
        }
        if ((height === 0 || !Number.isFinite(height)) && typeof shape.cyEMU === 'number' && shape.cyEMU > 0) {
            height = (shape.cyEMU / slideHeightEMU) * 100;
        }

        width = Math.max(0.1, width);
        height = Math.max(0.1, height);
        
        // Determine positioning based on placeholder type
        let x = shape.x || 0;
        let y = shape.y || 0;
        
        // Reposition footer and slide number placeholders to bottom-right
        if (shape.isPlaceholder && (shape.placeholderType === 'sldNum' || shape.placeholderType === 'ftr' || shape.placeholderType === 'dt')) {
            // Bottom-right corner (accounting for element dimensions)
            x = 100 - width - 1;  // 1% margin from right edge
            y = 100 - height - 1; // 1% margin from bottom edge
        }
        
        // Use percentage-based positioning and sizing for proper scaling
        // box-sizing: border-box ensures padding/border don't expand the element
        let style = `position: absolute; left: ${x}%; top: ${y}%; width: ${width}%; height: ${height}%; box-sizing: border-box;`;
        
        // Only apply z-index when explicitly provided.
        // Otherwise let DOM order determine stacking (matches spTree order).
        if (typeof shape.zIndex === 'number') {
            style += `z-index: ${shape.zIndex};`;
        }
        
        // Note: text alignment/insets are handled by inner .shape-text-box
        
        // Fill
        if (shape.fill) {
            if (shape.fill === 'none') {
                style += 'background: transparent;';
            } else if (typeof shape.fill === 'string') {
                style += `background-color: ${shape.fill};`;
            } else if (shape.fill.type === 'solid' && shape.fill.color) {
                // Solid fill with potential opacity
                const color = shape.fill.color;
                const opacity = shape.fill.opacity !== undefined ? shape.fill.opacity : 1;
                if (opacity < 1) {
                    const rgba = this.hexToRgba(color, opacity);
                    style += `background-color: ${rgba};`;
                } else {
                    style += `background-color: ${color};`;
                }
            } else if (shape.fill.type === 'gradient') {
                style += this.styleBuilder.createGradientStyle(shape.fill.gradient);
            } else if (shape.fill.type === 'image' && shape.fill.src) {
                style += `background-image: url('${shape.fill.src}'); background-size: cover; background-position: center;`;
            }
        } 

        // Explicit picture support (fallback if fill isn't set)
        if (shape.type === 'picture' && shape.src) {
            style += `background-image: url('${shape.src}'); background-size: contain; background-repeat: no-repeat; background-position: center;`;
        }
        
        // Stroke
        if (shape.stroke && shape.stroke !== 'none') {
            style += `border: ${Math.max(1, shape.strokeWidth)}px solid ${shape.stroke};`;
        } else if (shape.stroke === 'none') {
            style += 'border: none;';
        }
        
        // Shadow effects
        if (shape.shadow) {
            const shadow = shape.shadow;
            const offsetX = (shadow.distance || 0) * Math.cos((shadow.angle || 0) * Math.PI / 180);
            const offsetY = (shadow.distance || 0) * Math.sin((shadow.angle || 0) * Math.PI / 180);
            const blur = shadow.blur || 0;
            const color = shadow.color || '#000000';
            const opacity = shadow.opacity !== undefined ? shadow.opacity : 1;
            const rgba = this.hexToRgba(color, opacity);
            style += `box-shadow: ${offsetX}px ${offsetY}px ${blur}px ${rgba};`;
        }
        
        // Corner radius from parsed geometry
        if (shape.cornerRadius !== null && shape.cornerRadius !== undefined) {
            const radiusPercent = (shape.cornerRadius * 100);
            style += `border-radius: ${radiusPercent}%;`;
        }
        
        // 3D effects and filters
        style = this.apply3DEffects(shape, style);
        
        return style;
    }

    /**
     * Apply 3D effects and CSS filters to shapes
     * @param {Object} shape - Shape object
     * @param {string} style - Existing style string
     * @returns {string} - Modified style string with 3D effects
     */
    apply3DEffects(shape, style) {
        const type = shape.type;
        
        // Apply CSS filters and 3D transforms based on shape type
        if (type === 'cube') {
            // Add perspective and subtle 3D transform for cube effect
            style += 'filter: drop-shadow(-2px 2px 3px rgba(0,0,0,0.3)); transform: perspective(1000px) rotateX(5deg) rotateY(-5deg);';
            // Add inset shadow for depth
            style += 'box-shadow: inset -2px -2px 5px rgba(0,0,0,0.2), inset 2px 2px 5px rgba(255,255,255,0.3);';
        } else if (type === 'cylinder') {
            // Cylindrical shading with gradient
            style += 'filter: drop-shadow(-2px 2px 3px rgba(0,0,0,0.3)); box-shadow: inset -3px 0 5px rgba(0,0,0,0.2);';
        } else if (type === 'sphere') {
            // Spherical shading effect
            style += 'filter: drop-shadow(-3px 3px 5px rgba(0,0,0,0.3)); box-shadow: radial-gradient(circle at 30% 30%, rgba(255,255,255,0.4), transparent), inset -2px -2px 5px rgba(0,0,0,0.2);';
        } else if (type === 'cone') {
            // Conical depth effect
            style += 'filter: drop-shadow(-2px 2px 3px rgba(0,0,0,0.3)); box-shadow: inset 2px 2px 5px rgba(0,0,0,0.15);';
        } else if (type === 'pyramid') {
            // Pyramidal depth with perspective
            style += 'filter: drop-shadow(-2px 3px 4px rgba(0,0,0,0.3)); transform: perspective(1000px) rotateX(3deg);';
        } else if (type === 'tetrahedron') {
            // Tetrahedral effect
            style += 'filter: drop-shadow(-2px 2px 3px rgba(0,0,0,0.25)); box-shadow: inset 1px 1px 3px rgba(0,0,0,0.1);';
        } else if (type === 'octahedron') {
            // Octahedral faceted effect
            style += 'filter: drop-shadow(-2px 2px 3px rgba(0,0,0,0.3)); box-shadow: inset -1px -1px 3px rgba(0,0,0,0.15);';
        } else if (type === 'ribbon' || type === 'ribbon2') {
            // Ribbon fold effect with skew
            style += 'filter: drop-shadow(2px 2px 3px rgba(0,0,0,0.2));';
            if (shape.fill && typeof shape.fill === 'string') {
                // Add subtle gradient to simulate ribbon fold
                const fill = shape.fill;
                style = style.replace(`background-color: ${fill}`, `background: linear-gradient(135deg, ${fill} 0%, ${this.adjustBrightness(fill, -20)} 100%)`);
            }
        } else if (type.includes('curved') || type === 'doubleWave') {
            // Curved shapes get subtle shadow
            style += 'filter: drop-shadow(1px 2px 2px rgba(0,0,0,0.15));';
        } else if (type.includes('action') || type.includes('explosion') || type.includes('star')) {
            // Action buttons, explosions, and stars get subtle shadow
            style += 'filter: drop-shadow(1px 1px 2px rgba(0,0,0,0.15));';
        }
        
        return style;
    }

    /**
     * Adjust brightness of a hex color
     * @param {string} hex - Hex color code
     * @param {number} amount - Amount to adjust (-100 to 100)
     * @returns {string} - Adjusted hex color
     */
    adjustBrightness(hex, amount) {
        let color = hex.replace('#', '');
        const num = parseInt(color, 16);
        const r = Math.min(255, Math.max(0, (num >> 16) + amount));
        const g = Math.min(255, Math.max(0, ((num >> 8) & 0x00FF) + amount));
        const b = Math.min(255, Math.max(0, (num & 0x0000FF) + amount));
        return '#' + (0x1000000 + r * 0x10000 + g * 0x100 + b).toString(16).slice(1);
    }

    /**
     * Convert hex color to rgba
     * @param {string} hex - Hex color code
     * @param {number} alpha - Alpha value (0-1)
     * @returns {string} - rgba() color string
     */
    hexToRgba(hex, alpha = 1) {
        // Remove # if present
        hex = hex.replace('#', '');
        
        // Parse hex to RGB
        const r = parseInt(hex.substring(0, 2), 16);
        const g = parseInt(hex.substring(2, 4), 16);
        const b = parseInt(hex.substring(4, 6), 16);
        
        return `rgba(${r}, ${g}, ${b}, ${alpha})`;
    }

    /**
     * Get CSS clip-path for shape type
     * @param {string} type - Shape type
     * @returns {string} - CSS clip-path or border-radius
     */
    getShapeClipPath(type) {
        const clipPaths = {
            'square': '',
            'ellipse': 'border-radius: 50%;',
            'circle': 'border-radius: 50%;',
            // PowerPoint's default rounded corners are typically subtler than 12%.
            // Use a smaller radius for a sharper look.
            // Cap in px so large shapes don't get overly round.
            'roundSquare': 'border-radius: min(10px, 3%);',
            'roundRect': 'border-radius: min(10px, 3%);',
            'triangle': 'clip-path: polygon(50% 0%, 0% 100%, 100% 100%);',
            'rightTriangle': 'clip-path: polygon(0% 0%, 0% 100%, 100% 100%);',
            'diamond': 'clip-path: polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%);',
            'pentagon': 'clip-path: polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%);',
            'hexagon': 'clip-path: polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%);',
            'heptagon': 'clip-path: polygon(50% 0%, 90% 20%, 100% 60%, 75% 100%, 25% 100%, 0% 60%, 10% 20%);',
            'octagon': 'clip-path: polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%);',
            'star5': 'clip-path: polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%);',
            'star4': 'clip-path: polygon(50% 0%, 61% 39%, 100% 50%, 61% 61%, 50% 100%, 39% 61%, 0% 50%, 39% 39%);',
            'star6': 'clip-path: polygon(50% 0%, 61% 25%, 90% 10%, 75% 40%, 95% 60%, 60% 50%, 75% 90%, 50% 65%, 25% 90%, 40% 50%, 5% 60%, 25% 40%, 10% 10%);',
            'parallelogram': 'clip-path: polygon(20% 0%, 100% 0%, 80% 100%, 0% 100%);',
            'trapezoid': 'clip-path: polygon(20% 0%, 80% 0%, 100% 100%, 0% 100%);',
            'arrow': 'clip-path: polygon(0% 20%, 65% 20%, 65% 0%, 100% 50%, 65% 100%, 65% 80%, 0% 80%);',
            'rightArrow': 'clip-path: polygon(0% 20%, 60% 20%, 60% 0%, 100% 50%, 60% 100%, 60% 80%, 0% 80%);',
            'leftArrow': 'clip-path: polygon(40% 0%, 40% 20%, 100% 20%, 100% 80%, 40% 80%, 40% 100%, 0% 50%);',
            'upArrow': 'clip-path: polygon(50% 0%, 100% 40%, 80% 40%, 80% 100%, 20% 100%, 20% 40%, 0% 40%);',
            'downArrow': 'clip-path: polygon(20% 0%, 80% 0%, 80% 60%, 100% 60%, 50% 100%, 0% 60%, 20% 60%);',
            'heart': 'clip-path: polygon(50% 100%, 0% 30%, 25% 0%, 50% 15%, 75% 0%, 100% 30%);',
            // Callout shapes
            'speechBubble': 'clip-path: polygon(0% 0%, 100% 0%, 100% 85%, 20% 85%, 10% 100%, 15% 85%, 0% 85%);',
            'speechBubbleOval': 'clip-path: ellipse(50% 45% at 50% 45%); position: relative;',
            'calloutRect': 'clip-path: polygon(0% 0%, 85% 0%, 100% 50%, 85% 100%, 0% 100%);',
            'calloutRoundRect': 'clip-path: polygon(5% 0%, 85% 0%, 100% 5%, 100% 50%, 100% 95%, 85% 100%, 5% 100%, 0% 95%, 0% 5%);',
            'calloutOval': 'border-radius: 50%;',
            // Flowchart shapes
            'flowChartProcess': '',
            'flowChartDecision': 'clip-path: polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%);',
            'flowChartInputOutput': 'clip-path: polygon(20% 0%, 100% 0%, 80% 100%, 0% 100%);',
            'flowChartTerminator': 'clip-path: polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%);',
            'flowChartData': 'clip-path: polygon(0% 25%, 100% 0%, 100% 75%, 0% 100%);',
            'flowChartDocument': 'clip-path: polygon(0% 0%, 100% 0%, 100% 85%, 50% 100%, 0% 85%);',
            'flowChartMultidocument': 'clip-path: polygon(0% 10%, 100% 0%, 100% 90%, 10% 100%, 0% 85%);',
            'flowChartPredefinedProcess': 'clip-path: polygon(10% 0%, 90% 0%, 100% 50%, 90% 100%, 10% 100%, 0% 50%);',
            // 3D shapes (using CSS transforms)
            'cube': 'perspective(600px);',
            'cylinder': 'clip-path: ellipse(50% 30% at 50% 30%);',
            'sphere': 'border-radius: 50%;',
            'cone': 'clip-path: polygon(50% 0%, 100% 100%, 0% 100%);',
            'pyramid': 'clip-path: polygon(50% 0%, 100% 100%, 0% 100%);',
            // Block arrows
            'blockArcRight': 'clip-path: polygon(0% 25%, 75% 25%, 75% 0%, 100% 50%, 75% 100%, 75% 75%, 0% 75%);',
            'blockArcLeft': 'clip-path: polygon(25% 25%, 100% 25%, 100% 75%, 25% 75%, 25% 100%, 0% 50%, 25% 0%);',
            'blockArcUp': 'clip-path: polygon(25% 25%, 75% 25%, 100% 0%, 50% 25%, 0% 0%, 25% 25%, 25% 100%, 75% 100%, 75% 75%, 25% 75%);',
            'blockArcDown': 'clip-path: polygon(25% 0%, 75% 0%, 75% 25%, 100% 100%, 50% 75%, 0% 100%, 25% 25%, 25% 100%, 75% 100%, 75% 75%);',
            // Additional flowchart shapes
            'flowChartOffPage': 'clip-path: polygon(0% 0%, 100% 0%, 100% 70%, 85% 85%, 85% 100%, 0% 100%);',
            'flowChartMerge': 'clip-path: polygon(0% 0%, 100% 0%, 50% 50%, 100% 100%, 0% 100%);',
            'flowChartExtract': 'clip-path: polygon(0% 50%, 50% 0%, 100% 50%, 50% 100%);',
            'flowChartOr': 'border-radius: 50%;',
            'flowChartSum': 'clip-path: polygon(50% 0%, 100% 30%, 75% 50%, 100% 70%, 50% 100%, 0% 70%, 25% 50%, 0% 30%);',
            'flowChartSort': 'clip-path: polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%);',
            'flowChartManualInput': 'clip-path: polygon(0% 20%, 100% 0%, 100% 100%, 0% 80%);',
            'flowChartDelay': 'clip-path: path(\"M 0,0 L 70,0 Q 100,0 100,30 Q 100,100 100,100 L 0,100 Q 0,50 0,0\");',
            // Additional 3D shapes with gradient support
            'tetrahedron': 'clip-path: polygon(50% 0%, 100% 85%, 0% 85%);',
            'octahedron': 'clip-path: polygon(50% 0%, 100% 37%, 75% 62%, 100% 100%, 50% 75%, 0% 100%, 25% 62%, 0% 37%);',
            // Additional arrow shapes
            'quadArrow': 'clip-path: polygon(35% 0%, 65% 0%, 65% 35%, 100% 35%, 100% 65%, 65% 65%, 65% 100%, 35% 100%, 35% 65%, 0% 65%, 0% 35%, 35% 35%);',
            'leftRightArrow': 'clip-path: polygon(0% 40%, 40% 40%, 40% 0%, 60% 0%, 60% 40%, 100% 40%, 100% 60%, 60% 60%, 60% 100%, 40% 100%, 40% 60%, 0% 60%);',
            'upDownArrow': 'clip-path: polygon(40% 0%, 60% 0%, 60% 40%, 100% 40%, 50% 60%, 0% 40%, 40% 40%, 40% 100%, 60% 100%, 60% 60%, 50% 40%);',
            // Ribbon shapes
            'ribbon': 'clip-path: polygon(0% 0%, 100% 10%, 90% 50%, 100% 90%, 0% 100%, 10% 50%);',
            'ribbon2': 'clip-path: polygon(10% 0%, 100% 0%, 90% 50%, 100% 100%, 10% 100%, 0% 50%);',
            // Wavy shapes
            'doubleWave': 'clip-path: path(\"M 0,50 Q 25,20 50,50 T 100,50 L 100,100 Q 75,70 50,100 T 0,100\");',
            // Chevron shapes
            'chevron': 'clip-path: polygon(0% 0%, 75% 0%, 100% 50%, 75% 100%, 0% 100%, 25% 50%);',
            'chevronRight': 'clip-path: polygon(0% 0%, 75% 0%, 100% 50%, 75% 100%, 0% 100%, 25% 50%);',
            // Curved arrow shapes
            'curvedUpArrow': 'clip-path: path(\"M 0,100 Q 50,0 100,100 L 85,80 Q 50,40 15,80\");',
            'curvedDownArrow': 'clip-path: path(\"M 0,0 Q 50,100 100,0 L 85,20 Q 50,60 15,20\");',
            'curvedLeftArrow': 'clip-path: path(\"M 100,0 Q 0,50 100,100 L 80,85 Q 40,50 80,15\");',
            'curvedRightArrow': 'clip-path: path(\"M 0,0 Q 100,50 0,100 L 20,85 Q 60,50 20,15\");'
        };
        // Note: cornerRadius is now applied directly in buildShapeStyle, so clipPaths
        // is mainly used for non-rounded preset shapes
        return clipPaths[type] || '';
    }

    /**
     * Format text inside a shape
     * @param {Array} textParts - Array of paragraphs with runs
     * @returns {string} - HTML string
     */
    formatShapeText(textParts) {
        if (!textParts || !Array.isArray(textParts)) return '';
        
        // Base font size is 18pt (1em), so convert pt to em for proper scaling
        const BASE_FONT_SIZE = 18;

        // Numbering counters per level (0-based)
        const counters = new Array(10).fill(null);
        
        const escapeAttr = (value) => {
            const s = String(value ?? '');
            return s
                .replace(/&/g, '&amp;')
                .replace(/"/g, '&quot;')
                .replace(/</g, '&lt;')
                .replace(/>/g, '&gt;');
        };

        return textParts.map(paragraph => {
            const meta = paragraph?.[0] || {};
            const paragraphAlign = meta.align || 'left';
            const lvl = typeof meta.lvl === 'number' ? meta.lvl : 0;
            const bullet = meta.bullet || null;
            const spaceBeforeEm = typeof meta.spaceBeforeEm === 'number' ? meta.spaceBeforeEm : null;
            const spaceAfterEm = typeof meta.spaceAfterEm === 'number' ? meta.spaceAfterEm : null;
            const lineHeight = typeof meta.lineHeight === 'number' ? meta.lineHeight : null;

            const runsHtml = paragraph.map(run => {
                let html = this.textFormatter.escapeHtml(run.text);
                let style = '';
                if (run.color) style += `color: ${run.color};`;
                if (run.highlight) style += `background-color: ${run.highlight};`;
                if (run.fontSize) {
                    const emSize = run.fontSize / BASE_FONT_SIZE;
                    style += `font-size: ${emSize.toFixed(3)}em;`;
                }
                if (run.fontFamily) {
                    style += `font-family: ${run.fontFamily};`;
                }
                if (run.bold) style += 'font-weight: 700;';
                if (run.italic) style += 'font-style: italic;';
                const decorations = [];
                if (run.underline) decorations.push('underline');
                if (run.strikethrough) decorations.push('line-through');
                if (decorations.length) style += `text-decoration: ${decorations.join(' ')};`;
                if (run.textTransform && run.textTransform !== 'none') {
                    if (run.textTransform === 'small-caps') style += 'font-variant: small-caps;';
                    else if (run.textTransform === 'uppercase') style += 'text-transform: uppercase;';
                }
                if (run.shadow) {
                    const s = run.shadow;
                    const opacity = s.opacity !== undefined ? Math.min(1, Math.max(0, s.opacity)) : 1;
                    style += `text-shadow: ${s.offsetX || 0}px ${s.offsetY || 0}px ${s.blur || 0}px ${s.color || '#000'}${opacity < 1 ? '' : ''};`;
                }
                if (style) {
                    html = `<span style="${style}">${html}</span>`;
                }

                if (run.superscript) html = `<sup>${html}</sup>`;
                if (run.subscript) html = `<sub>${html}</sub>`;

                if (run.link && run.link.kind === 'url' && run.link.href) {
                    const href = escapeAttr(run.link.href);
                    html = `<a class="pptx-link" href="${href}" target="_blank" rel="noopener noreferrer">${html}</a>`;
                } else if (run.link && run.link.kind === 'slide' && Number.isFinite(run.link.slideIndex)) {
                    html = `<a class="pptx-link" href="#" data-pptx-slide="${run.link.slideIndex}">${html}</a>`;
                }
                return html;
            }).join('');

            const bulletEnabled = bullet && bullet.type !== 'none' && (bullet.type === 'char' || bullet.type === 'auto');
            const marLEm = typeof meta.marLEm === 'number' ? meta.marLEm : null;
            const indentEm = typeof meta.indentEm === 'number' ? meta.indentEm : null;
            const marginTop = spaceBeforeEm !== null ? `margin-top: ${spaceBeforeEm.toFixed(3)}em;` : '';
            const marginBottom = spaceAfterEm !== null ? `margin-bottom: ${spaceAfterEm.toFixed(3)}em;` : '';
            const lineHt = lineHeight !== null ? `line-height: ${lineHeight.toFixed(3)};` : '';
            const paragraphStyle = `${marginTop}${marginBottom}${lineHt}`;

            if (!bulletEnabled) {
                // Reset deeper counters when leaving an auto-numbered list
                for (let i = lvl; i < counters.length; i++) counters[i] = null;
                const padLeft = marLEm !== null ? `padding-left: ${marLEm.toFixed(3)}em;` : '';
                const textIndent = indentEm !== null ? `text-indent: ${indentEm.toFixed(3)}em;` : '';
                return `<div class="pptx-paragraph" style="text-align: ${paragraphAlign}; white-space: inherit; ${padLeft}${textIndent}${paragraphStyle}">${runsHtml}</div>`;
            }

            // Reset deeper levels when current level changes
            for (let i = lvl + 1; i < counters.length; i++) counters[i] = null;

            let marker = '•';
            if (bullet.type === 'auto') {
                const startAt = Number.isFinite(bullet.startAt) ? bullet.startAt : 1;
                if (counters[lvl] === null) counters[lvl] = startAt;
                const numType = (bullet.numType || '').toLowerCase();
                const formatAutoNumber = (value) => {
                    const n = Math.max(1, value);
                    const toRoman = (val) => {
                        const romans = [
                            { v: 1000, s: 'M' }, { v: 900, s: 'CM' }, { v: 500, s: 'D' }, { v: 400, s: 'CD' },
                            { v: 100, s: 'C' }, { v: 90, s: 'XC' }, { v: 50, s: 'L' }, { v: 40, s: 'XL' },
                            { v: 10, s: 'X' }, { v: 9, s: 'IX' }, { v: 5, s: 'V' }, { v: 4, s: 'IV' }, { v: 1, s: 'I' }
                        ];
                        let num = val;
                        let res = '';
                        for (const r of romans) {
                            while (num >= r.v) {
                                res += r.s;
                                num -= r.v;
                            }
                        }
                        return res;
                    };
                    const toAlpha = (val, upper) => {
                        let num = val;
                        let res = '';
                        while (num > 0) {
                            num--; // 1 -> A
                            res = String.fromCharCode(97 + (num % 26)) + res;
                            num = Math.floor(num / 26);
                        }
                        return upper ? res.toUpperCase() : res;
                    };

                    if (numType.includes('roman')) {
                        const roman = toRoman(n);
                        return numType.includes('lc') ? roman.toLowerCase() : roman;
                    }
                    if (numType.includes('alpha') || numType.includes('alph')) {
                        const upper = numType.includes('uc');
                        return toAlpha(n, upper);
                    }
                    return String(n);
                };

                const rawMarker = formatAutoNumber(counters[lvl]);
                let prefix = '';
                let suffix = '.';
                if (numType.includes('parenboth')) {
                    prefix = '(';
                    suffix = ')';
                } else if (numType.includes('parenr')) {
                    suffix = ')';
                } else if (numType.includes('paren')) {
                    suffix = ')';
                } else if (numType.includes('period')) {
                    suffix = '.';
                } else {
                    suffix = '.';
                }

                marker = `${prefix}${rawMarker}${suffix}`;
                counters[lvl] += 1;
            } else {
                marker = bullet.char || '•';
            }

            // PowerPoint uses paragraph properties for indentation:
            // - marL: left margin (where the text body starts)
            // - indent: first-line indent (often negative for hanging bullets)
            // When these are present, they should define the paragraph position.
            // Fall back to a reasonable per-level indent only when marL is missing.
            const paddingLeftEm = marLEm !== null ? marLEm : (lvl * 1.25);

            // For hanging bullets (indent < 0), shift the marker left by indent,
            // and reserve space equal to -indent so text aligns at marL.
            const markerOffsetEm = (indentEm !== null && indentEm < 0) ? indentEm : 0;
            const markerWidthEm = (indentEm !== null && indentEm < 0) ? Math.max(0.5, -indentEm) : 1.2;
            const safeLvl = Math.max(0, Math.min(9, lvl));

            return `
                <div class="pptx-paragraph pptx-bullet pptx-lvl-${safeLvl}" style="padding-left: ${paddingLeftEm.toFixed(3)}em; ${paragraphStyle}">
                    <span class="pptx-bullet-marker" style="margin-left: ${markerOffsetEm.toFixed(3)}em; width: ${markerWidthEm.toFixed(3)}em;">${this.textFormatter.escapeHtml(marker)}</span>
                    <span class="pptx-bullet-content" style="text-align: ${paragraphAlign};">${runsHtml}</span>
                </div>
            `;
        }).join('');
    }
}

// Export for use in other modules
window.ShapeRenderer = ShapeRenderer;
