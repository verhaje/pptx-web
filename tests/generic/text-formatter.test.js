/**
 * TextFormatter tests
 */
const { assert, test, suite } = require('../helpers/test-harness');

const FONT_MAP = {
    'Calibri': '"Calibri", "Segoe UI", Arial, sans-serif',
    'Calibri Light': '"Calibri Light", "Calibri", "Segoe UI Light", Arial, sans-serif',
    'Arial': 'Arial, Helvetica, sans-serif',
    'Times New Roman': '"Times New Roman", Times, serif',
    'Courier New': '"Courier New", Courier, monospace',
    'Consolas': 'Consolas, Monaco, "Courier New", monospace',
    'Aptos': 'Aptos, Calibri, Arial, sans-serif'
};

function buildFontStack(fontFamily) {
    if (!fontFamily) return 'inherit';
    if (FONT_MAP[fontFamily]) return FONT_MAP[fontFamily];
    const lower = fontFamily.toLowerCase();
    if (lower.includes('sans') || lower.includes('gothic') || lower.includes('arial')) return `"${fontFamily}", Arial, sans-serif`;
    if (lower.includes('serif') || lower.includes('roman') || lower.includes('times')) return `"${fontFamily}", "Times New Roman", serif`;
    if (lower.includes('mono') || lower.includes('courier') || lower.includes('console')) return `"${fontFamily}", "Courier New", monospace`;
    return `"${fontFamily}", Arial, sans-serif`;
}

function getPlainText(textElement) {
    if (!textElement) return '';
    if (typeof textElement === 'string') return textElement;
    if (textElement.paragraphs) return textElement.paragraphs.map(p => p.map(r => r.text).join('')).join(' ');
    return '';
}

function getTextColor(textElement) {
    if (!textElement || typeof textElement === 'string') return null;
    if (textElement.paragraphs && textElement.paragraphs[0] && textElement.paragraphs[0][0]) return textElement.paragraphs[0][0].color;
    return null;
}

function truncateText(text, maxLength) {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
}

suite('TextFormatter', () => {
    test('buildFontStack maps known fonts', () => {
        assert.strictEqual(buildFontStack('Calibri'), '"Calibri", "Segoe UI", Arial, sans-serif');
        assert.strictEqual(buildFontStack('Arial'), 'Arial, Helvetica, sans-serif');
        assert.strictEqual(buildFontStack('Consolas'), 'Consolas, Monaco, "Courier New", monospace');
    });

    test('buildFontStack defaults to sans-serif for unknown', () => {
        const result = buildFontStack('MyCustomFont');
        assert.ok(result.includes('"MyCustomFont"'));
        assert.ok(result.includes('Arial, sans-serif'));
    });

    test('buildFontStack sans-serif heuristic', () => {
        const result = buildFontStack('FooSansBar');
        assert.ok(result.includes('Arial, sans-serif'));
    });

    test('buildFontStack serif heuristic', () => {
        const result = buildFontStack('MyRomanFont');
        assert.ok(result.includes('"Times New Roman", serif'));
    });

    test('buildFontStack mono heuristic', () => {
        const result = buildFontStack('MyMonoFont');
        assert.ok(result.includes('"Courier New", monospace'));
    });

    test('buildFontStack returns inherit for null/empty', () => {
        assert.strictEqual(buildFontStack(null), 'inherit');
        assert.strictEqual(buildFontStack(''), 'inherit');
    });

    test('getPlainText from structured text', () => {
        const text = {
            paragraphs: [
                [{ text: 'Hello' }, { text: ' World' }],
                [{ text: 'Second line' }]
            ]
        };
        assert.strictEqual(getPlainText(text), 'Hello World Second line');
    });

    test('getPlainText from string', () => {
        assert.strictEqual(getPlainText('simple text'), 'simple text');
    });

    test('getPlainText from null', () => {
        assert.strictEqual(getPlainText(null), '');
    });

    test('getTextColor returns first run color', () => {
        const text = { paragraphs: [[{ text: 'Hi', color: '#FF0000' }]] };
        assert.strictEqual(getTextColor(text), '#FF0000');
    });

    test('getTextColor returns null for string', () => {
        assert.strictEqual(getTextColor('plain'), null);
    });

    test('getTextColor returns null for null', () => {
        assert.strictEqual(getTextColor(null), null);
    });

    test('truncateText within limit', () => {
        assert.strictEqual(truncateText('Hello', 10), 'Hello');
    });

    test('truncateText exceeds limit', () => {
        assert.strictEqual(truncateText('Hello World', 5), 'Hello...');
    });

    test('truncateText at exact limit', () => {
        assert.strictEqual(truncateText('Hello', 5), 'Hello');
    });
});
