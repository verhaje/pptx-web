/**
 * ChartParser
 * Minimal PowerPoint chart XML parser for common chart types (column, line, area, pie, doughnut).
 * Extracts series, categories, values, and hole size for doughnut charts.
 */
class ChartParser {
    constructor(backgroundExtractor = null, themeExtractor = null) {
        this.COLOR_PALETTE = [
            '#4e79a7', '#f28e2b', '#e15759', '#76b7b2', '#59a14f', '#edc949',
            '#af7aa1', '#ff9da7', '#9c755f', '#bab0ab'
        ];
        this.backgroundExtractor = backgroundExtractor;
        this.themeExtractor = themeExtractor;
    }

    async parseChart(zip, chartPath) {
        if (!zip || !chartPath) return null;
        const file = zip.file(chartPath.replace(/^\//, ''));
        if (!file) return null;
        const xml = await file.async('string');
        const doc = new DOMParser().parseFromString(xml, 'text/xml');
        const chartSpace = doc.getElementsByTagName('c:chartSpace')[0];
        if (!chartSpace) return null;
        const plotArea = chartSpace.getElementsByTagName('c:plotArea')[0];
        if (!plotArea) return null;

        const typeInfo = this.detectChartType(plotArea);
        if (!typeInfo) return null;

        const categories = this.extractCategories(typeInfo.catRef, typeInfo.catLit);
        const series = this.extractSeries(typeInfo.seriesNodes, categories);
        const holeSize = this.extractHoleSize(plotArea);
        const stacking = typeInfo.stacking || 'none';
        const barDir = typeInfo.barDir || 'column';
        const gapWidth = typeInfo.gapWidth;
        const overlap = typeInfo.overlap;
        const legend = this.extractLegend(chartSpace);
        const axes = this.extractAxes(plotArea);

        return {
            chartType: typeInfo.kind,
            categories,
            series,
            holeSize,
            stacking,
            barDir,
            gapWidth,
            overlap,
            legend,
            axes
        };
    }

    detectChartType(plotArea) {
        const chartKinds = [
            { tag: 'c:barChart', kind: 'column' },
            { tag: 'c:lineChart', kind: 'line' },
            { tag: 'c:areaChart', kind: 'area' },
            { tag: 'c:pieChart', kind: 'pie' },
            { tag: 'c:doughnutChart', kind: 'doughnut' }
        ];
        for (const c of chartKinds) {
            const node = plotArea.getElementsByTagName(c.tag)[0];
            if (node) {
                const seriesNodes = Array.from(node.getElementsByTagName('c:ser'));
                const catRef = node.getElementsByTagName('c:cat')[0]?.getElementsByTagName('c:strRef')[0];
                const catLit = node.getElementsByTagName('c:cat')[0]?.getElementsByTagName('c:strLit')[0];
                const stacking = this.detectStacking(c.kind, node);
                const barDir = this.detectBarDir(c.kind, node);
                const gapWidth = this.detectGapWidth(node);
                const overlap = this.detectOverlap(node);
                return { kind: c.kind, node, seriesNodes, catRef, catLit, stacking, barDir, gapWidth, overlap };
            }
        }
        return null;
    }

    detectStacking(kind, node) {
        if (kind !== 'column') return 'none';
        const grouping = node.getElementsByTagName('c:grouping')[0]?.getAttribute('val') || 'clustered';
        if (grouping === 'stacked') return 'stacked';
        if (grouping === 'percentStacked') return 'percent';
        return 'none';
    }

    detectBarDir(kind, node) {
        if (kind !== 'column') return 'column';
        const dir = node.getElementsByTagName('c:barDir')[0]?.getAttribute('val') || 'col';
        return dir === 'bar' ? 'bar' : 'column';
    }

    detectGapWidth(node) {
        const gapWidthEl = node.getElementsByTagName('c:gapWidth')[0];
        if (!gapWidthEl) return null;
        const val = parseInt(gapWidthEl.getAttribute('val') || '0', 10);
        return Number.isNaN(val) ? null : val; // PowerPoint uses 0-500
    }

    detectOverlap(node) {
        const overlapEl = node.getElementsByTagName('c:overlap')[0];
        if (!overlapEl) return null;
        const val = parseInt(overlapEl.getAttribute('val') || '0', 10);
        return Number.isNaN(val) ? null : Math.max(-100, Math.min(100, val));
    }

    extractCategories(catRef, catLit) {
        // Prefer cached string values; fallback to literal, respecting pt idx
        const getPts = (parent) => {
            if (!parent) return [];
            const cache = parent.getElementsByTagName('c:strCache')[0];
            const pts = cache ? cache.getElementsByTagName('c:pt') : parent.getElementsByTagName('c:pt');
            if (!pts || pts.length === 0) return [];
            const ptCountAttr = parent.getElementsByTagName('c:ptCount')[0]?.getAttribute('val');
            const count = ptCountAttr ? parseInt(ptCountAttr, 10) : pts.length;
            const arr = new Array(Number.isFinite(count) ? count : pts.length).fill('');
            Array.from(pts).forEach((pt, idx) => {
                const idxAttr = pt.getAttribute('idx');
                const targetIdx = idxAttr !== null ? parseInt(idxAttr, 10) : idx;
                const val = pt.getElementsByTagName('c:v')[0]?.textContent || '';
                if (Number.isFinite(targetIdx) && targetIdx >= 0 && targetIdx < arr.length) {
                    arr[targetIdx] = val;
                }
            });
            return arr;
        };
        const vals = getPts(catRef);
        if (vals.length > 0) return vals;
        return getPts(catLit);
    }

    extractSeries(seriesNodes, categories) {
        const series = [];
        seriesNodes.forEach((serNode, idx) => {
            const name = this.extractSeriesName(serNode) || `Series ${idx + 1}`;
            const vals = this.extractSeriesValues(serNode, categories.length);
            let color = this.extractSeriesColor(serNode);
            
            // If no explicit color, try theme accent colors based on series index
            if (!color && this.themeExtractor) {
                // PowerPoint uses accent1-6 for series colors
                const accentIdx = (idx % 6) + 1;
                const themeColor = this.themeExtractor.getSchemeColor(`accent${accentIdx}`);
                if (themeColor) {
                    color = themeColor;
                }
            }
            
            // Fall back to default palette if still no color
            if (!color) {
                color = this.COLOR_PALETTE[idx % this.COLOR_PALETTE.length];
            }
            
            series.push({ name, values: vals, color });
        });
        return series;
    }

    extractSeriesName(serNode) {
        const tx = serNode.getElementsByTagName('c:tx')[0];
        if (!tx) return null;
        const strRef = tx.getElementsByTagName('c:strRef')[0];
        if (strRef) {
            const cache = strRef.getElementsByTagName('c:strCache')[0];
            const pt = cache?.getElementsByTagName('c:pt')[0];
            return pt?.getElementsByTagName('c:v')[0]?.textContent || null;
        }
        const v = tx.getElementsByTagName('c:v')[0];
        return v ? v.textContent : null;
    }

    extractSeriesValues(serNode, catCount) {
        const valNode = serNode.getElementsByTagName('c:val')[0];
        if (!valNode) return new Array(catCount).fill(0);

        const numRef = valNode.getElementsByTagName('c:numRef')[0];
        const numLit = valNode.getElementsByTagName('c:numLit')[0];

        const readPts = (parent) => {
            if (!parent) return null;
            const cache = parent.getElementsByTagName('c:numCache')[0];
            const pts = cache ? cache.getElementsByTagName('c:pt') : parent.getElementsByTagName('c:pt');
            if (!pts || pts.length === 0) return null;
            const arr = new Array(catCount).fill(0);
            Array.from(pts).forEach((pt, seqIdx) => {
                const idxAttr = pt.getAttribute('idx');
                const targetIdx = idxAttr !== null ? parseInt(idxAttr, 10) : seqIdx;
                const val = parseFloat(pt.getElementsByTagName('c:v')[0]?.textContent || '0');
                if (Number.isFinite(targetIdx) && targetIdx >= 0 && targetIdx < arr.length) {
                    arr[targetIdx] = Number.isFinite(val) ? val : 0;
                }
            });
            return arr;
        };

        const vals = readPts(numRef) || readPts(numLit);
        if (vals) return vals;
        return new Array(catCount).fill(0);
    }

    extractSeriesColor(serNode) {
        const spPr = serNode.getElementsByTagName('c:spPr')[0] || serNode.getElementsByTagName('a:spPr')[0];
        if (!spPr) return null;

        const solidFill = spPr.getElementsByTagName('a:solidFill')[0];
        if (solidFill && this.backgroundExtractor && typeof this.backgroundExtractor.extractColor === 'function') {
            const c = this.backgroundExtractor.extractColor(solidFill);
            if (c) return c;
        }

        const gradFill = spPr.getElementsByTagName('a:gradFill')[0];
        if (gradFill && this.backgroundExtractor && typeof this.backgroundExtractor.extractGradient === 'function') {
            const g = this.backgroundExtractor.extractGradient(gradFill);
            if (g && Array.isArray(g.stops) && g.stops[0]?.color) {
                return g.stops[0].color;
            }
        }

        const ln = spPr.getElementsByTagName('a:ln')[0];
        if (ln && this.backgroundExtractor && typeof this.backgroundExtractor.extractColor === 'function') {
            const c = this.backgroundExtractor.extractColor(ln);
            if (c) return c;
        }

        return null;
    }

    extractHoleSize(plotArea) {
        const doughnut = plotArea.getElementsByTagName('c:doughnutChart')[0];
        if (!doughnut) return 0;
        const hole = doughnut.getElementsByTagName('c:holeSize')[0];
        if (hole && hole.getAttribute('val')) {
            const val = parseInt(hole.getAttribute('val'), 10);
            if (!Number.isNaN(val)) return Math.min(90, Math.max(0, val));
        }
        return 50; // default 50% hole
    }

    extractLegend(chartSpace) {
        const legend = chartSpace.getElementsByTagName('c:legend')[0];
        if (!legend) return { position: 'r', overlay: false };
        const pos = legend.getElementsByTagName('c:legendPos')[0]?.getAttribute('val') || 'r';
        const overlayVal = legend.getElementsByTagName('c:overlay')[0]?.getAttribute('val');
        const overlay = overlayVal === '1' || overlayVal === 'true';
        return { position: pos, overlay };
    }

    extractAxes(plotArea) {
        const valueAxis = plotArea.getElementsByTagName('c:valAx')[0];
        const axis = { value: {} };
        if (valueAxis) {
            const scaling = valueAxis.getElementsByTagName('c:scaling')[0];
            if (scaling) {
                const minEl = scaling.getElementsByTagName('c:min')[0];
                const maxEl = scaling.getElementsByTagName('c:max')[0];
                const minVal = minEl ? parseFloat(minEl.getAttribute('val')) : null;
                const maxVal = maxEl ? parseFloat(maxEl.getAttribute('val')) : null;
                if (!Number.isNaN(minVal)) axis.value.min = minVal;
                if (!Number.isNaN(maxVal)) axis.value.max = maxVal;
            }

            const numFmt = valueAxis.getElementsByTagName('c:numFmt')[0];
            const formatCode = numFmt ? numFmt.getAttribute('formatCode') : null;
            if (formatCode) {
                axis.value.formatCode = formatCode;
            }
        }
        return axis;
    }
}

// Export
window.ChartParser = ChartParser;
