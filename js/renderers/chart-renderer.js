/**
 * Chart Renderer
 * Renders column, line, area, pie, and doughnut charts using SVG.
 */
class ChartRenderer {
    constructor() {
        this.viewBoxWidth = 1000;
        this.viewBoxHeight = 620;
        this.margins = { top: 40, right: 24, bottom: 96, left: 96 };
    }

    render(chart) {
        if (!chart) return '';

        const x = chart.x || 0;
        const y = chart.y || 0;
        const width = Math.max(1, chart.width || 10);
        const height = Math.max(1, chart.height || 10);
        const zIndexStyle = typeof chart.zIndex === 'number' ? `z-index: ${chart.zIndex};` : '';

        const style = `position: absolute; left: ${x}%; top: ${y}%; width: ${width}%; height: ${height}%; box-sizing: border-box; background: #ffffff; border: 1px solid #dcdcdc; border-radius: 6px; overflow: hidden; ${zIndexStyle}`;

        // If chart data is missing, show a lightweight placeholder
        if (!chart.chartData || !chart.chartData.series || chart.chartData.series.length === 0) {
            return this.renderPlaceholder(style, chart.name || 'Chart', 'No chart data found');
        }

        const svg = this.renderChart(chart.chartData);
        return `<div class="slide-shape chart" style="${style}">${svg}</div>`;
    }

    renderChart(data) {
        const kind = (data.chartType || 'column').toLowerCase();
        if (['column', 'line', 'area'].includes(kind)) {
            return this.renderCartesian(kind, data);
        }
        if (kind === 'pie' || kind === 'doughnut') {
            const hole = kind === 'doughnut' ? data.holeSize || 50 : 0;
            return this.renderPie(data, hole);
        }
        return this.renderPlaceholder('width: 100%; height: calc(100% - 32px);', 'Chart', `Unsupported chart type: ${kind}`);
    }

    renderCartesian(kind, data) {
        const categories = data.categories && data.categories.length > 0
            ? data.categories
            : data.series[0]?.values.map((_, idx) => `Category ${idx + 1}`) || [];
        const series = data.series || [];
        const stacking = data.stacking || 'none';
        const barDir = data.barDir || (kind === 'column' ? 'column' : 'column');
        const legendCfg = data.legend || { position: 'r', overlay: false };
        const axes = data.axes || {};

        const baseMargins = { top: 32, right: 32, bottom: 96, left: 96 };
        const legendLayout = this.layoutLegend(series, legendCfg);
        const margins = this.applyLegendToMargins({ ...baseMargins }, legendLayout, legendCfg.overlay);

        const innerWidth = this.viewBoxWidth - margins.left - margins.right;
        const innerHeight = this.viewBoxHeight - margins.top - margins.bottom;

        const domain = this.computeDomain(series, stacking, categories.length, axes.value || {});
        const tickInfo = this.buildTicks(domain.min, domain.max, stacking === 'percent' ? 100 : null);
        const scaleY = (val) => {
            const span = tickInfo.max - tickInfo.min || 1;
            return margins.top + innerHeight - ((val - tickInfo.min) / span) * innerHeight;
        };
        const scaleX = (val) => {
            const span = tickInfo.max - tickInfo.min || 1;
            return margins.left + ((val - tickInfo.min) / span) * innerWidth;
        };

        const xBand = categories.length > 0 ? innerWidth / categories.length : innerWidth;
        const yBand = categories.length > 0 ? innerHeight / categories.length : innerHeight;
        const barGroupPaddingX = xBand * 0.18;
        const barGroupPaddingY = yBand * 0.18;
        const barWidth = series.length > 0 ? (xBand - 2 * barGroupPaddingX) / series.length : xBand;
        const barHeight = series.length > 0 ? (yBand - 2 * barGroupPaddingY) / series.length : yBand;

        const bars = [];
        if (kind === 'column') {
            if (barDir === 'column') {
                if (stacking === 'none') {
                    categories.forEach((_, catIndex) => {
                        series.forEach((ser, sIdx) => {
                            const v = ser.values?.[catIndex] || 0;
                            const x = margins.left + catIndex * xBand + barGroupPaddingX + sIdx * barWidth;
                            const y0 = scaleY(0);
                            const y1 = scaleY(v);
                            const y = Math.min(y0, y1);
                            const height = Math.abs(y1 - y0);
                            bars.push(`<rect x="${x.toFixed(2)}" y="${y.toFixed(2)}" width="${Math.max(4, barWidth - 4).toFixed(2)}" height="${Math.max(0, height).toFixed(2)}" rx="3" fill="${ser.color || '#4e79a7'}" />`);
                        });
                    });
                } else {
                    categories.forEach((_, catIndex) => {
                        const total = stacking === 'percent' ? series.reduce((sum, ser) => sum + (ser.values?.[catIndex] || 0), 0) : null;
                        let posBase = 0;
                        let negBase = 0;
                        const stackWidth = xBand * 0.55;
                        const x = margins.left + catIndex * xBand + (xBand - stackWidth) / 2;
                        series.forEach((ser) => {
                            const raw = ser.values?.[catIndex] || 0;
                            const v = stacking === 'percent' ? (total > 0 ? (raw / total) * 100 : 0) : raw;
                            if (v >= 0) {
                                const yTop = scaleY(posBase + v);
                                const yBase = scaleY(posBase);
                                bars.push(`<rect x="${x.toFixed(2)}" y="${Math.min(yTop, yBase).toFixed(2)}" width="${Math.max(6, stackWidth - 4).toFixed(2)}" height="${Math.abs(yBase - yTop).toFixed(2)}" rx="3" fill="${ser.color || '#4e79a7'}" />`);
                                posBase += v;
                            } else {
                                const yTop = scaleY(negBase);
                                const yBase = scaleY(negBase + v);
                                bars.push(`<rect x="${x.toFixed(2)}" y="${Math.min(yTop, yBase).toFixed(2)}" width="${Math.max(6, stackWidth - 4).toFixed(2)}" height="${Math.abs(yBase - yTop).toFixed(2)}" rx="3" fill="${ser.color || '#4e79a7'}" />`);
                                negBase += v;
                            }
                        });
                    });
                }
            } else {
                // Horizontal bars
                if (stacking === 'none') {
                    categories.forEach((_, catIndex) => {
                        series.forEach((ser, sIdx) => {
                            const v = ser.values?.[catIndex] || 0;
                            const y = margins.top + catIndex * yBand + barGroupPaddingY + sIdx * barHeight;
                            const x0 = scaleX(0);
                            const x1 = scaleX(v);
                            const x = Math.min(x0, x1);
                            const width = Math.abs(x1 - x0);
                            bars.push(`<rect x="${x.toFixed(2)}" y="${y.toFixed(2)}" width="${Math.max(4, width).toFixed(2)}" height="${Math.max(4, barHeight - 4).toFixed(2)}" rx="3" fill="${ser.color || '#4e79a7'}" />`);
                        });
                    });
                } else {
                    categories.forEach((_, catIndex) => {
                        const total = stacking === 'percent' ? series.reduce((sum, ser) => sum + (ser.values?.[catIndex] || 0), 0) : null;
                        let posBase = 0;
                        let negBase = 0;
                        const stackHeight = yBand * 0.55;
                        const y = margins.top + catIndex * yBand + (yBand - stackHeight) / 2;
                        series.forEach((ser) => {
                            const raw = ser.values?.[catIndex] || 0;
                            const v = stacking === 'percent' ? (total > 0 ? (raw / total) * 100 : 0) : raw;
                            if (v >= 0) {
                                const xStart = scaleX(posBase);
                                const xEnd = scaleX(posBase + v);
                                bars.push(`<rect x="${Math.min(xStart, xEnd).toFixed(2)}" y="${y.toFixed(2)}" width="${Math.abs(xEnd - xStart).toFixed(2)}" height="${Math.max(6, stackHeight - 4).toFixed(2)}" rx="3" fill="${ser.color || '#4e79a7'}" />`);
                                posBase += v;
                            } else {
                                const xStart = scaleX(negBase);
                                const xEnd = scaleX(negBase + v);
                                bars.push(`<rect x="${Math.min(xStart, xEnd).toFixed(2)}" y="${y.toFixed(2)}" width="${Math.abs(xEnd - xStart).toFixed(2)}" height="${Math.max(6, stackHeight - 4).toFixed(2)}" rx="3" fill="${ser.color || '#4e79a7'}" />`);
                                negBase += v;
                            }
                        });
                    });
                }
            }
        }

        const lines = [];
        const areas = [];
        if (kind === 'line' || kind === 'area') {
            series.forEach((ser) => {
                const points = [];
                categories.forEach((_, idx) => {
                    const cx = margins.left + idx * xBand + xBand / 2;
                    const cy = scaleY(ser.values?.[idx] || 0);
                    points.push({ x: cx, y: cy });
                });

                if (points.length === 0) return;

                const path = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x.toFixed(2)} ${p.y.toFixed(2)}`).join(' ');
                lines.push(`<path d="${path}" fill="none" stroke="${ser.color || '#4e79a7'}" stroke-width="3" stroke-linejoin="round" stroke-linecap="round" />`);

                if (kind === 'area') {
                    const areaPath = `${path} L ${(points[points.length - 1].x).toFixed(2)} ${(margins.top + innerHeight).toFixed(2)} L ${(points[0].x).toFixed(2)} ${(margins.top + innerHeight).toFixed(2)} Z`;
                    areas.push(`<path d="${areaPath}" fill="${this.addAlpha(ser.color || '#4e79a7', 0.2)}" stroke="none" />`);
                }

                points.forEach(pt => {
                    lines.push(`<circle cx="${pt.x.toFixed(2)}" cy="${pt.y.toFixed(2)}" r="5" fill="#ffffff" stroke="${ser.color || '#4e79a7'}" stroke-width="3" />`);
                });
            });
        }

        const xAxisLine = barDir === 'bar'
            ? `<line x1="${margins.left}" y1="${margins.top + innerHeight}" x2="${margins.left}" y2="${margins.top}" stroke="#555" stroke-width="2" />`
            : `<line x1="${margins.left}" y1="${margins.top + innerHeight}" x2="${margins.left + innerWidth}" y2="${margins.top + innerHeight}" stroke="#555" stroke-width="2" />`;

        const yAxisLine = barDir === 'bar'
            ? `<line x1="${margins.left}" y1="${margins.top + innerHeight}" x2="${margins.left + innerWidth}" y2="${margins.top + innerHeight}" stroke="#555" stroke-width="2" />`
            : `<line x1="${margins.left}" y1="${margins.top}" x2="${margins.left}" y2="${margins.top + innerHeight}" stroke="#555" stroke-width="2" />`;

        const valueFormat = axes?.value?.formatCode || null;

        const tickLabels = tickInfo.ticks.map(tickVal => {
            if (barDir === 'bar') {
                const x = scaleX(tickVal);
                return `<g>
                    <line x1="${x.toFixed(2)}" y1="${(margins.top + innerHeight).toFixed(2)}" x2="${x.toFixed(2)}" y2="${(margins.top + innerHeight + 6).toFixed(2)}" stroke="#777" stroke-width="1" />
                    <text x="${x.toFixed(2)}" y="${(margins.top + innerHeight + 28).toFixed(2)}" text-anchor="middle" font-size="28" fill="#555">${this.formatNumber(tickVal, valueFormat)}</text>
                </g>`;
            }
            const y = scaleY(tickVal);
            return `<g>
                <line x1="${(margins.left - 6).toFixed(2)}" y1="${y.toFixed(2)}" x2="${margins.left.toFixed(2)}" y2="${y.toFixed(2)}" stroke="#777" stroke-width="1" />
                <text x="${(margins.left - 10).toFixed(2)}" y="${(y + 4).toFixed(2)}" text-anchor="end" font-size="28" fill="#555">${this.formatNumber(tickVal, valueFormat)}</text>
            </g>`;
        }).join('');

        const categoriesLabels = categories.map((cat, idx) => {
            if (barDir === 'bar') {
                const y = margins.top + idx * yBand + yBand / 2;
                const x = margins.left - 12;
                return `<text x="${x.toFixed(2)}" y="${y.toFixed(2)}" text-anchor="end" dominant-baseline="middle" font-size="28" fill="#555">${this.escapeHtml(cat)}</text>`;
            }
            const x = margins.left + idx * xBand + xBand / 2;
            const y = margins.top + innerHeight + 42;
            return `<text x="${x.toFixed(2)}" y="${y.toFixed(2)}" text-anchor="middle" font-size="28" fill="#555">${this.escapeHtml(cat)}</text>`;
        }).join('');

        const legendSvg = legendLayout.svg || '';

        return `<svg viewBox="0 0 ${this.viewBoxWidth} ${this.viewBoxHeight}" preserveAspectRatio="none" style="width: 100%; height: 100%;">
            <rect x="0" y="0" width="${this.viewBoxWidth}" height="${this.viewBoxHeight}" fill="#ffffff" />
            ${legendSvg}
            ${areas.join('')}
            ${xAxisLine}${yAxisLine}
            ${tickLabels}
            ${categoriesLabels}
            ${bars.join('')}
            ${lines.join('')}
        </svg>`;
    }

    renderPie(data, holeSizePercent = 0) {
        const series = data.series && data.series.length > 0 ? data.series[0] : null;
        if (!series || !series.values || series.values.length === 0) {
            return this.renderPlaceholder('width: 100%; height: calc(100% - 32px);', 'Chart', 'No chart data found');
        }

        const values = series.values.map(v => Math.max(0, v));
        const total = values.reduce((sum, v) => sum + v, 0);
        if (total === 0) {
            return this.renderPlaceholder('width: 100%; height: calc(100% - 32px);', 'Chart', 'No chart values to display');
        }

        const categories = data.categories && data.categories.length > 0
            ? data.categories
            : values.map((_, idx) => `Slice ${idx + 1}`);

        const cx = this.viewBoxWidth / 2;
        const cy = this.viewBoxHeight / 2 + 10;
        const radius = Math.min(this.viewBoxWidth, this.viewBoxHeight) * 0.32;
        const innerRadius = holeSizePercent > 0 ? radius * (holeSizePercent / 100) : 0;

        let currentAngle = -Math.PI / 2;
        const slices = values.map((v, idx) => {
            const angle = (v / total) * Math.PI * 2;
            const start = currentAngle;
            const end = currentAngle + angle;
            currentAngle = end;
            const path = this.describeArc(cx, cy, radius, start, end, innerRadius);
            const color = this.defaultColor(idx);
            return `<path d="${path}" fill="${color}" stroke="#ffffff" stroke-width="2" />`;
        }).join('');

        const legendItems = categories.map((cat, idx) => {
            const color = this.defaultColor(idx);
            const value = values[idx];
            return `<g transform="translate(${this.margins.left}, ${(this.margins.top + idx * 34).toFixed(2)})">
                <rect x="0" y="0" width="24" height="24" rx="4" fill="${color}" />
                <text x="34" y="18" font-size="26" fill="#444">${this.escapeHtml(cat)} (${this.formatNumber(value)})</text>
            </g>`;
        }).join('');

        return `<svg viewBox="0 0 ${this.viewBoxWidth} ${this.viewBoxHeight}" preserveAspectRatio="none" style="width: 100%; height: 100%;">
            <rect x="0" y="0" width="${this.viewBoxWidth}" height="${this.viewBoxHeight}" fill="#ffffff" />
            ${slices}
            ${innerRadius > 0 ? `<circle cx="${cx}" cy="${cy}" r="${innerRadius}" fill="#ffffff" />` : ''}
            ${legendItems}
        </svg>`;
    }

    renderPlaceholder(style, title, message) {
        const safeStyle = style.includes('position') ? style : `position: absolute; left: 0; top: 0; ${style}`;
        return `<div class="slide-shape chart-placeholder" style="${safeStyle}; display: flex; align-items: center; justify-content: center; color: #555; font-size: 12px; text-align: center; padding: 12px; height: 100%;">
            <div>${this.escapeHtml(title)}<br><small>${this.escapeHtml(message)}</small></div>
        </div>`;
    }

    layoutLegend(series = [], legendCfg = { position: 'r', overlay: false }) {
        if (!series || series.length === 0) return { svg: '', width: 0, height: 0, position: legendCfg.position || 'r' };

        const pos = legendCfg.position || 'r';
        const horizontal = pos === 't' || pos === 'b' || pos === 'tr';
        const itemHeight = 32;
        const itemGap = 10;
        const itemWidth = 180;
        const totalWidth = series.length * itemWidth;
        const maxWidth = this.viewBoxWidth - 48;
        const legendWidth = Math.min(totalWidth, maxWidth);
        const legendHeight = horizontal ? itemHeight + itemGap * 2 : series.length * (itemHeight + itemGap) - itemGap;

        let startX = 24;
        let startY = 16;
        if (pos === 't') {
            startX = (this.viewBoxWidth - legendWidth) / 2;
            startY = 16;
        } else if (pos === 'b') {
            startX = (this.viewBoxWidth - legendWidth) / 2;
            startY = this.viewBoxHeight - legendHeight - 16;
        } else if (pos === 'l') {
            startX = 24;
            startY = (this.viewBoxHeight - legendHeight) / 2;
        } else if (pos === 'r') {
            startX = this.viewBoxWidth - legendWidth - 24;
            startY = (this.viewBoxHeight - legendHeight) / 2;
        } else if (pos === 'tr') {
            startX = this.viewBoxWidth - legendWidth - 24;
            startY = 16;
        }

        let items = '';
        if (horizontal) {
            series.forEach((ser, idx) => {
                const x = startX + idx * itemWidth;
                const color = ser.color || this.defaultColor(idx);
                items += `<g transform="translate(${x}, ${startY})">
                    <rect x="0" y="0" width="26" height="26" rx="5" fill="${color}" />
                    <text x="34" y="20" font-size="26" fill="#444">${this.escapeHtml(ser.name || `Series ${idx + 1}`)}</text>
                </g>`;
            });
        } else {
            series.forEach((ser, idx) => {
                const y = startY + idx * (itemHeight + itemGap);
                const color = ser.color || this.defaultColor(idx);
                items += `<g transform="translate(${startX}, ${y})">
                    <rect x="0" y="0" width="26" height="26" rx="5" fill="${color}" />
                    <text x="34" y="20" font-size="26" fill="#444">${this.escapeHtml(ser.name || `Series ${idx + 1}`)}</text>
                </g>`;
            });
        }

        return {
            svg: `<g>${items}</g>`,
            width: legendWidth,
            height: legendHeight,
            position: pos
        };
    }

    applyLegendToMargins(margins, legendLayout, overlay = false) {
        if (!legendLayout || overlay || !legendLayout.width || !legendLayout.height) return margins;
        const pad = 12;
        switch (legendLayout.position) {
            case 't':
            case 'tr':
                margins.top += legendLayout.height + pad;
                break;
            case 'b':
                margins.bottom += legendLayout.height + pad;
                break;
            case 'l':
                margins.left += legendLayout.width + pad;
                break;
            case 'r':
            default:
                margins.right += legendLayout.width + pad;
                break;
        }
        return margins;
    }

    buildTicks(minVal, maxVal, forceMax = null) {
        if (forceMax !== null) {
            return { ticks: [0, 25, 50, 75, 100], min: 0, max: forceMax };
        }

        let min = typeof minVal === 'number' ? minVal : 0;
        let max = typeof maxVal === 'number' ? maxVal : 1;
        if (min === max) {
            min -= 1;
            max += 1;
        }

        const range = max - min;
        const niceRange = this.niceNumber(range, false);
        const niceStep = this.niceNumber(niceRange / 4, true);
        const niceMin = Math.floor(min / niceStep) * niceStep;
        const niceMax = Math.ceil(max / niceStep) * niceStep;

        const ticks = [];
        for (let v = niceMin; v <= niceMax + 1e-6; v += niceStep) {
            ticks.push(parseFloat(v.toFixed(6)));
        }

        return { ticks, min: niceMin, max: niceMax };
    }

    niceNumber(range, round) {
        const exponent = Math.floor(Math.log10(range));
        const fraction = range / Math.pow(10, exponent);
        let niceFraction;

        if (round) {
            if (fraction < 1.5) niceFraction = 1;
            else if (fraction < 3) niceFraction = 2;
            else if (fraction < 7) niceFraction = 5;
            else niceFraction = 10;
        } else {
            if (fraction <= 1) niceFraction = 1;
            else if (fraction <= 2) niceFraction = 2;
            else if (fraction <= 5) niceFraction = 5;
            else niceFraction = 10;
        }

        return niceFraction * Math.pow(10, exponent);
    }

    computeDomain(series, stacking, catCount, axisSettings = {}) {
        let min = 0;
        let max = 0;

        if (stacking === 'percent') {
            min = 0;
            max = 100;
        } else if (stacking === 'stacked') {
            for (let idx = 0; idx < catCount; idx++) {
                let pos = 0;
                let neg = 0;
                series.forEach(ser => {
                    const v = ser.values?.[idx] || 0;
                    if (v >= 0) pos += v; else neg += v;
                });
                max = Math.max(max, pos);
                min = Math.min(min, neg);
            }
        } else {
            series.forEach(ser => {
                (ser.values || []).forEach(v => {
                    if (typeof v === 'number') {
                        if (v > max) max = v;
                        if (v < min) min = v;
                    }
                });
            });
        }

        if (typeof axisSettings.min === 'number') min = axisSettings.min;
        if (typeof axisSettings.max === 'number') max = axisSettings.max;
        if (min === max) {
            min -= 1;
            max += 1;
        }
        return { min, max };
    }

    describeArc(cx, cy, outerR, startAngle, endAngle, innerR = 0) {
        const largeArcFlag = endAngle - startAngle > Math.PI ? 1 : 0;

        const startOuter = {
            x: cx + outerR * Math.cos(startAngle),
            y: cy + outerR * Math.sin(startAngle)
        };
        const endOuter = {
            x: cx + outerR * Math.cos(endAngle),
            y: cy + outerR * Math.sin(endAngle)
        };

        if (innerR > 0) {
            const startInner = {
                x: cx + innerR * Math.cos(endAngle),
                y: cy + innerR * Math.sin(endAngle)
            };
            const endInner = {
                x: cx + innerR * Math.cos(startAngle),
                y: cy + innerR * Math.sin(startAngle)
            };
            return `M ${startOuter.x} ${startOuter.y} A ${outerR} ${outerR} 0 ${largeArcFlag} 1 ${endOuter.x} ${endOuter.y} L ${startInner.x} ${startInner.y} A ${innerR} ${innerR} 0 ${largeArcFlag} 0 ${endInner.x} ${endInner.y} Z`;
        }

        return `M ${cx} ${cy} L ${startOuter.x} ${startOuter.y} A ${outerR} ${outerR} 0 ${largeArcFlag} 1 ${endOuter.x} ${endOuter.y} Z`;
    }

    addAlpha(color, alpha) {
        const ctx = document.createElement('canvas').getContext('2d');
        ctx.fillStyle = color || '#4e79a7';
        const computed = ctx.fillStyle;
        if (computed.startsWith('#')) {
            const hex = computed.replace('#', '');
            const bigint = parseInt(hex.length === 3 ? hex.split('').map(c => c + c).join('') : hex, 16);
            const r = (bigint >> 16) & 255;
            const g = (bigint >> 8) & 255;
            const b = bigint & 255;
            return `rgba(${r}, ${g}, ${b}, ${alpha})`;
        }
        return computed;
    }

    formatNumber(val, formatCode = null) {
        const isCurrency = typeof formatCode === 'string' && formatCode.includes('$');
        const hasOneDecimal = typeof formatCode === 'string' && /0\.0/.test(formatCode);

        if (isCurrency) {
            const abs = Math.abs(val);
            const digits = hasOneDecimal ? 1 : 0;
            const formatted = abs >= 1 ? val.toFixed(digits) : val.toFixed(Math.max(2, digits + 1));
            return `$${formatted}`;
        }

        if (Math.abs(val) >= 1000) {
            return `${(val / 1000).toFixed(1)}k`;
        }
        if (Math.abs(val) >= 1) {
            return `${val.toFixed(0)}`;
        }
        return val.toFixed(2);
    }

    defaultColor(idx) {
        const palette = ['#4e79a7', '#f28e2b', '#e15759', '#76b7b2', '#59a14f', '#edc949', '#af7aa1', '#ff9da7', '#9c755f', '#bab0ab'];
        return palette[idx % palette.length];
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text || '';
        return div.innerHTML;
    }
}

// Export
window.ChartRenderer = ChartRenderer;
