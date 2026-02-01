/**
 * Table Parser Module
 * Extracts table data from graphic frames into renderable structures
 */
class TableParser {
    constructor(backgroundExtractor, themeExtractor, shapeParser) {
        this.backgroundExtractor = backgroundExtractor;
        this.themeExtractor = themeExtractor;
        this.shapeParser = shapeParser;
        this.tableStyles = new Map();
        this.defaultTableStyleId = null;
    }

    /**
     * Load and cache table styles from ppt/tableStyles.xml
     * @param {string} xml - tableStyles.xml content
     * @param {DOMParser} xmlParser - parser instance
     */
    setTableStyles(xml, xmlParser = new DOMParser()) {
        try {
            if (!xml) return;
            const doc = xmlParser.parseFromString(xml, 'text/xml');
            const styles = doc.getElementsByTagName('a:tblStyle');
            this.tableStyles.clear();
            const defId = doc.documentElement?.getAttribute('def');
            this.defaultTableStyleId = defId || null;

            const getFillFromTcStyle = (node) => {
                if (!node) return null;
                const fill = node.getElementsByTagName('a:fill')[0];
                if (!fill) return null;
                const solid = fill.getElementsByTagName('a:solidFill')[0];
                if (solid) return this.backgroundExtractor.extractColor(solid);
                const grad = fill.getElementsByTagName('a:gradFill')[0];
                if (grad) return { type: 'gradient', gradient: this.backgroundExtractor.extractGradient(grad) };
                return null;
            };

            for (const style of styles) {
                const id = style.getAttribute('styleId');
                if (!id) continue;

                const section = (name) => style.getElementsByTagName(`a:${name}`)[0]?.getElementsByTagName('a:tcStyle')[0];
                const entry = {
                    whole: getFillFromTcStyle(section('wholeTbl')),
                    band1H: getFillFromTcStyle(section('band1H')),
                    band2H: getFillFromTcStyle(section('band2H')),
                    band1V: getFillFromTcStyle(section('band1V')),
                    band2V: getFillFromTcStyle(section('band2V')),
                    firstRow: getFillFromTcStyle(section('firstRow')),
                    lastRow: getFillFromTcStyle(section('lastRow')),
                    firstCol: getFillFromTcStyle(section('firstCol')),
                    lastCol: getFillFromTcStyle(section('lastCol'))
                };
                this.tableStyles.set(id.toLowerCase(), entry);
            }
        } catch (e) {
            console.warn('Failed to parse tableStyles.xml', e);
        }
    }

    /**
     * Parse a graphicFrame containing a table
     * @param {Element} graphicFrame - PPTX graphicFrame element
     * @param {Array} slideRels - Slide relationships (unused for tables currently)
     * @param {Function} textDefaultsProvider - Function for master/layout text defaults
     * @returns {Object|null} - Parsed table shape or null
     */
    parseTable(graphicFrame, slideRels = [], textDefaultsProvider = null) {
        const tbl = graphicFrame.getElementsByTagName('a:tbl')[0];
        if (!tbl) return null;

        // Keep a reference to rels for hyperlink resolution in cells
        this._slideRels = slideRels;

        const shape = {
            type: 'table',
            x: 0,
            y: 0,
            width: 100,
            height: 100,
            rotation: 0,
            columnWidths: [],
            rowHeights: [],
            rows: [],
            borderColor: '#444',
            borderWidth: 1
        };

        this.applyTransform(graphicFrame, shape);
        this.extractGrid(tbl, shape);
        this.extractRows(tbl, shape, textDefaultsProvider);

        this._slideRels = null;

        return shape;
    }

    applyTransform(graphicFrame, shape) {
        // Transform can be in p:xfrm (direct child) or under graphic frame properties
        let xfrm = graphicFrame.getElementsByTagName('p:xfrm')[0];
        if (!xfrm) {
            xfrm = graphicFrame.getElementsByTagName('a:xfrm')[0];
        }
        if (!xfrm) return;

        const off = xfrm.getElementsByTagName('a:off')[0];
        const ext = xfrm.getElementsByTagName('a:ext')[0];

        const slideWidthEmu = (window.ShapeParser && ShapeParser.SLIDE_WIDTH_EMU) ? ShapeParser.SLIDE_WIDTH_EMU : 9144000;
        const slideHeightEmu = (window.ShapeParser && ShapeParser.SLIDE_HEIGHT_EMU) ? ShapeParser.SLIDE_HEIGHT_EMU : 5143500;

        if (off) {
            const x = parseInt(off.getAttribute('x') || '0', 10);
            const y = parseInt(off.getAttribute('y') || '0', 10);
            shape.xEMU = x;
            shape.yEMU = y;
            shape.x = (x / slideWidthEmu) * 100;
            shape.y = (y / slideHeightEmu) * 100;
        }

        if (ext) {
            const cx = parseInt(ext.getAttribute('cx') || '0', 10);
            const cy = parseInt(ext.getAttribute('cy') || '0', 10);
            shape.cxEMU = cx;
            shape.cyEMU = cy;
            shape.width = (cx / slideWidthEmu) * 100;
            shape.height = (cy / slideHeightEmu) * 100;
        }

        const rot = xfrm.getAttribute('rot');
        if (rot) {
            shape.rotation = parseInt(rot, 10) / 60000;
        }
    }

    extractGrid(tbl, shape) {
        const grid = tbl.getElementsByTagName('a:tblGrid')[0];
        const gridCols = grid ? Array.from(grid.getElementsByTagName('a:gridCol')) : [];
        const colWidthsEmu = gridCols.map(col => parseInt(col.getAttribute('w') || '0', 10));
        const totalWidth = colWidthsEmu.reduce((sum, w) => sum + w, 0);

        if (colWidthsEmu.length > 0) {
            shape.columnWidths = colWidthsEmu.map(w => totalWidth > 0 ? (w / totalWidth) * 100 : 100 / colWidthsEmu.length);
        }
    }

    extractRows(tbl, shape, textDefaultsProvider) {
        const rows = Array.from(tbl.getElementsByTagName('a:tr'));
        if (rows.length === 0) return;

        const rowHeightsEmu = rows.map(r => parseInt(r.getAttribute('h') || '0', 10));
        const totalHeight = rowHeightsEmu.reduce((sum, h) => sum + h, 0);
        shape.rowHeights = rowHeightsEmu.map(h => totalHeight > 0 ? (h / totalHeight) * 100 : (100 / rows.length));

        // Extract table styling (header, banded rows, etc.)
        const tblPr = tbl.getElementsByTagName('a:tblPr')[0];
        let headerCount = 1; // Default: first row is header
        let tableStyleId = tblPr ? tblPr.getAttribute('tableStyleId') : null;
        if (!tableStyleId && this.defaultTableStyleId) {
            tableStyleId = this.defaultTableStyleId;
        }
        const tableStyle = tableStyleId ? this.tableStyles.get(tableStyleId.toLowerCase()) : null;

        // Table banding flags
        const getBool = (val, defaultVal = false) => {
            if (val === null || val === undefined) return defaultVal;
            const s = String(val).toLowerCase();
            return s === '1' || s === 'true' || s === 'on';
        };

        const firstRow = tblPr ? getBool(tblPr.getAttribute('firstRow'), true) : true;
        const lastRow = tblPr ? getBool(tblPr.getAttribute('lastRow'), false) : false;
        const firstCol = tblPr ? getBool(tblPr.getAttribute('firstCol'), false) : false;
        const lastCol = tblPr ? getBool(tblPr.getAttribute('lastCol'), false) : false;
        const bandRow = tblPr ? getBool(tblPr.getAttribute('bandRow'), false) : false;
        const bandCol = tblPr ? getBool(tblPr.getAttribute('bandCol'), false) : false;

        headerCount = firstRow ? 1 : 0;
        const totalCols = rows[0]?.getElementsByTagName('a:tc')?.length || 0;

        for (let rowIdx = 0; rowIdx < rows.length; rowIdx++) {
            const row = rows[rowIdx];
            const cells = Array.from(row.children).filter(el => el.tagName === 'a:tc');
            const parsedCells = cells.map((cell, colIdx) =>
                this.parseCell(cell, textDefaultsProvider, rowIdx, colIdx, headerCount, this._slideRels, {
                    tableStyle,
                    rowCount: rows.length,
                    colCount: totalCols,
                    firstRow,
                    lastRow,
                    firstCol,
                    lastCol,
                    bandRow,
                    bandCol
                })
            );
            shape.rows.push({ 
                cells: parsedCells,
                isHeader: rowIdx < headerCount,
                rowIndex: rowIdx
            });
        }
    }

    parseCell(cell, textDefaultsProvider, rowIdx = 0, colIdx = 0, headerCount = 1, slideRels = null, styleContext = null) {
        const tcPr = cell.getElementsByTagName('a:tcPr')[0];
        const txBody = cell.getElementsByTagName('a:txBody')[0];
        const level = this.shapeParser && this.shapeParser.getParagraphLevel ? this.shapeParser.getParagraphLevel(txBody) : 1;
        const textDefaults = textDefaultsProvider ? textDefaultsProvider('body', level) : null;
        const text = txBody ? this.shapeParser.extractShapeText(txBody, textDefaults, slideRels) : null;

        let fill = this.parseCellFill(tcPr);
        const borders = this.parseCellBorders(tcPr);
        const colSpan = tcPr ? parseInt(tcPr.getAttribute('gridSpan') || '1', 10) || 1 : 1;
        const rowSpan = tcPr ? parseInt(tcPr.getAttribute('rowSpan') || '1', 10) || 1 : 1;
        
        // Extract cell margins/padding
        const margins = this.parseCellMargins(tcPr);
        const isHeader = rowIdx < headerCount;

        // Apply table style fills when cell has no explicit fill
        if ((!fill || fill === 'none') && styleContext && styleContext.tableStyle) {
            fill = this.getStyledFill(styleContext.tableStyle, {
                rowIdx,
                colIdx,
                headerCount,
                rowCount: styleContext.rowCount || 0,
                colCount: styleContext.colCount || 0,
                firstRow: styleContext.firstRow,
                lastRow: styleContext.lastRow,
                firstCol: styleContext.firstCol,
                lastCol: styleContext.lastCol,
                bandRow: styleContext.bandRow,
                bandCol: styleContext.bandCol
            }) || null;
        }

        return {
            text,
            fill,
            stroke: borders?.all?.color || null,
            strokeWidth: borders?.all?.width || null,
            borders: borders,
            colSpan,
            rowSpan,
            margins,
            isHeader
        };
    }

    getStyledFill(tableStyle, ctx) {
        if (!tableStyle) return null;
        const inFirstRow = ctx.firstRow && ctx.rowIdx === 0;
        const inLastRow = ctx.lastRow && ctx.rowIdx === ctx.rowCount - 1;
        const inFirstCol = ctx.firstCol && ctx.colIdx === 0;
        const inLastCol = ctx.lastCol && ctx.colIdx === ctx.colCount - 1;

        if (inFirstRow && tableStyle.firstRow) return tableStyle.firstRow;
        if (inLastRow && tableStyle.lastRow) return tableStyle.lastRow;
        if (inFirstCol && tableStyle.firstCol) return tableStyle.firstCol;
        if (inLastCol && tableStyle.lastCol) return tableStyle.lastCol;

        // Banded rows/cols (start counting after header rows)
        if (ctx.bandRow && ctx.rowIdx >= ctx.headerCount) {
            const bandIndex = ctx.rowIdx - ctx.headerCount;
            if (bandIndex % 2 === 0 && tableStyle.band1H) return tableStyle.band1H;
            if (bandIndex % 2 === 1 && tableStyle.band2H) return tableStyle.band2H;
        }
        if (ctx.bandCol) {
            if (ctx.colIdx % 2 === 0 && tableStyle.band1V) return tableStyle.band1V;
            if (ctx.colIdx % 2 === 1 && tableStyle.band2V) return tableStyle.band2V;
        }

        return tableStyle.whole || null;
    }

    parseCellFill(tcPr) {
        if (!tcPr) return null;
        const noFill = tcPr.getElementsByTagName('a:noFill')[0];
        if (noFill) return 'none';

        const solidFill = tcPr.getElementsByTagName('a:solidFill')[0];
        if (solidFill) {
            return this.backgroundExtractor.extractColor(solidFill);
        }

        const gradFill = tcPr.getElementsByTagName('a:gradFill')[0];
        if (gradFill) {
            return { type: 'gradient', gradient: this.backgroundExtractor.extractGradient(gradFill) };
        }

        return null;
    }

    parseCellBorders(tcPr) {
        if (!tcPr) return { all: null };
        
        const borders = {
            left: null,
            right: null,
            top: null,
            bottom: null,
            all: null
        };
        
        const borderMap = {
            'a:lnL': 'left',
            'a:lnR': 'right',
            'a:lnT': 'top',
            'a:lnB': 'bottom'
        };
        
        for (const [tag, side] of Object.entries(borderMap)) {
            const ln = tcPr.getElementsByTagName(tag)[0];
            if (ln) {
                const solidFill = ln.getElementsByTagName('a:solidFill')[0];
                const color = this.backgroundExtractor.extractColor(solidFill);
                const w = ln.getAttribute('w');
                const width = w ? (parseInt(w, 10) / 914400) * 96 : 1;
                borders[side] = { color: color || '#444', width };
                if (!borders.all) borders.all = borders[side];
            }
        }
        
        return borders;
    }
    
    parseCellMargins(tcPr) {
        if (!tcPr) return { l: 8, r: 8, t: 4, b: 4 }; // PowerPoint defaults in points
        
        const margins = {
            l: 8,
            r: 8,
            t: 4,
            b: 4
        };
        
        const cellMar = tcPr.getElementsByTagName('a:cellMar')[0];
        if (cellMar) {
            const l = cellMar.getAttribute('l');
            const r = cellMar.getAttribute('r');
            const t = cellMar.getAttribute('t');
            const b = cellMar.getAttribute('b');
            
            if (l) margins.l = Math.round(parseInt(l, 10) / 914400 * 72 * 16 / 10); // Convert EMU to pt
            if (r) margins.r = Math.round(parseInt(r, 10) / 914400 * 72 * 16 / 10);
            if (t) margins.t = Math.round(parseInt(t, 10) / 914400 * 72 * 16 / 10);
            if (b) margins.b = Math.round(parseInt(b, 10) / 914400 * 72 * 16 / 10);
        }
        
        return margins;
    }

    parseCellBorder(tcPr) {
        if (!tcPr) return null;
        const borderTags = ['a:lnL', 'a:lnR', 'a:lnT', 'a:lnB', 'a:lnTlToBr', 'a:lnBlToTr'];
        for (const tag of borderTags) {
            const ln = tcPr.getElementsByTagName(tag)[0];
            if (ln) {
                const solidFill = ln.getElementsByTagName('a:solidFill')[0];
                const color = this.backgroundExtractor.extractColor(solidFill);
                const w = ln.getAttribute('w');
                const width = w ? (parseInt(w, 10) / 914400) * 96 : null;
                return { color, width };
            }
        }
        return null;
    }
}

// Export for use in other modules
window.TableParser = TableParser;
