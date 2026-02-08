/**
 * Build Script - Bundle, Transpile, and Minify
 * Combines JS/CSS files, uses Babel for browser compatibility, then minifies
 */

const fs = require('fs');
const path = require('path');
const { minify } = require('terser');
const babel = require('@babel/core');

// Directories
const ROOT_DIR = path.join(__dirname, '..');
const JS_SRC_DIR = path.join(ROOT_DIR, 'js');
const CSS_SRC_DIR = path.join(ROOT_DIR, 'css');
const DIST_DIR = path.join(ROOT_DIR, 'dist');

// Bundle definitions - order matters for dependencies
const JS_BUNDLES = {
    'pptx-reader.bundle.js': [
        // Utilities first (no dependencies)
        'parsers/xml-utils.js',
        // Extractors and parsers
        'parsers/theme-extractor.js',
        'parsers/background-extractor.js',
        'parsers/text-extractor.js',
        'parsers/pptx/emf-to-svg.js',
        'parsers/shape-parser.js',
        'parsers/layout/layout-text-style-parser.js',
        'parsers/layout/layout-shape-parser.js',
        'parsers/layout/layout-parser.js',
        'parsers/pptx/chart-parser.js',
        'parsers/pptx-parser.js',
        'parsers/pptx/pptx-presentation-parser.js',
        'parsers/pptx/pptx-slide-parser.js',
        'parsers/pptx/pptx-shape-parser.js',
        // Renderers
        'renderers/chart-renderer.js',
        'renderers/style-builder.js',
        'renderers/text-formatter.js',
        'renderers/shape-renderer.js',
        'renderers/slide-renderer.js',
        // UI components
        'ui/theme-manager.js',
        'ui/keyboard-manager.js',
        'ui/screen-manager.js',
        'ui/slide-navigator.js',
        'ui/file-manager.js',
        'ui/print-manager.js',
        'ui/ui-controller.js',
        // Main app
        'app.js'
    ]
};

const CSS_BUNDLES = {
    'pptx-reader.bundle.css': [
        'base.css',
        'header.css',
        'components.css',
        'welcome.css',
        'viewer.css',
        'overlays.css',
        'utilities.css',
        'responsive.css'
    ]
};

// Babel configuration for browser compatibility
const BABEL_CONFIG = {
    presets: [
        ['@babel/preset-env', {
            targets: {
                browsers: [
                    'last 2 Chrome versions',
                    'last 2 Firefox versions',
                    'last 2 Safari versions',
                    'last 2 Edge versions',
                    'IE 11'
                ]
            },
            modules: false,
            useBuiltIns: false
        }]
    ],
    compact: false,
    comments: true
};

// Terser configuration
const TERSER_CONFIG = {
    compress: {
        passes: 2,
        drop_console: false,
        pure_funcs: null,
        toplevel: false,
        unsafe: false
    },
    mangle: {
        toplevel: false,
        reserved: [
            'XMLUtils', 'ThemeExtractor', 'BackgroundExtractor', 'ShapeParser',
            'TextExtractor', 'PPTXParser', 'StyleBuilder', 'TextFormatter',
            'ShapeRenderer', 'SlideRenderer', 'UIController', 'ThemeManager',
            'KeyboardManager', 'ScreenManager', 'SlideNavigator', 'FileManager'
        ]
    },
    format: {
        comments: false
    }
};

/**
 * Create dist directory structure
 */
function ensureDistDir() {
    if (!fs.existsSync(DIST_DIR)) {
        fs.mkdirSync(DIST_DIR, { recursive: true });
    }
}

/**
 * Copy vendor files from node_modules into dist
 */
function copyVendorFiles() {
    const jszipSrc = path.join(ROOT_DIR, 'node_modules', 'jszip', 'dist', 'jszip.min.js');
    const jszipDest = path.join(DIST_DIR, 'jszip.min.js');

    if (fs.existsSync(jszipSrc)) {
        fs.copyFileSync(jszipSrc, jszipDest);
        console.log('  ✓ Copied jszip to dist/jszip.min.js');
    } else {
        console.warn('  ⚠ jszip not found in node_modules; skipping vendor copy');
    }
}

/**
 * Read and concatenate files
 */
function concatenateFiles(basePath, files) {
    const contents = [];
    
    for (const file of files) {
        const filePath = path.join(basePath, file);
        if (fs.existsSync(filePath)) {
            const content = fs.readFileSync(filePath, 'utf8');
            contents.push(`/* === ${file} === */\n${content}`);
        } else {
            console.warn(`  ⚠ File not found: ${file}`);
        }
    }
    
    return contents.join('\n\n');
}

/**
 * Transpile JavaScript using Babel
 */
async function transpileJs(code, filename) {
    try {
        const result = await babel.transformAsync(code, {
            ...BABEL_CONFIG,
            filename
        });
        return result.code;
    } catch (error) {
        console.error(`  ✗ Babel error:`, error.message);
        return code; // Return original on error
    }
}

/**
 * Minify JavaScript using Terser
 */
async function minifyJs(code) {
    try {
        const result = await minify(code, TERSER_CONFIG);
        if (result.error) {
            throw result.error;
        }
        return result.code;
    } catch (error) {
        console.error(`  ✗ Terser error:`, error.message);
        return code; // Return original on error
    }
}

/**
 * Minify CSS
 */
function minifyCss(css) {
    return css
        .replace(/\/\*[\s\S]*?\*\//g, '')  // Remove comments
        .replace(/\s+/g, ' ')              // Collapse whitespace
        .replace(/\s*([{};:,>+~])\s*/g, '$1')  // Remove spaces around symbols
        .replace(/;}/g, '}')               // Remove last semicolon
        .trim();
}

/**
 * Format file size
 */
function formatSize(bytes) {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

/**
 * Build JavaScript bundles
 */
async function buildJsBundles() {
    console.log('📦 Building JavaScript bundles...\n');
    
    for (const [bundleName, files] of Object.entries(JS_BUNDLES)) {
        console.log(`  Building ${bundleName}...`);
        console.log(`    Concatenating ${files.length} files...`);
        
        // Concatenate all files
        const combined = concatenateFiles(JS_SRC_DIR, files);

        // Prepend vendor JS (jszip) from node_modules if available so JSZip is part of the bundle
        const jszipSrc = path.join(ROOT_DIR, 'node_modules', 'jszip', 'dist', 'jszip.min.js');
        let combinedWithVendors = combined;
        if (fs.existsSync(jszipSrc)) {
            try {
                const jszipContent = fs.readFileSync(jszipSrc, 'utf8');
                combinedWithVendors = `/* === vendor: jszip.min.js === */\n${jszipContent}\n\n${combined}`;
                console.log('    ✓ Included jszip in bundle');
            } catch (err) {
                console.warn('    ⚠ Failed to read jszip from node_modules, skipping vendor prepend');
            }
        }

        const combinedSize = Buffer.byteLength(combinedWithVendors, 'utf8');
        
        // Transpile with Babel
        console.log(`    Transpiling with Babel...`);
        const transpiled = await transpileJs(combinedWithVendors, bundleName);
        const transpiledSize = Buffer.byteLength(transpiled, 'utf8');
        
        // Write non-minified bundle for debugging
        const debugPath = path.join(DIST_DIR, bundleName.replace('.js', '.debug.js'));
        fs.writeFileSync(debugPath, transpiled, 'utf8');
        
        // Minify
        console.log(`    Minifying...`);
        const minified = await minifyJs(transpiled);
        const minifiedSize = Buffer.byteLength(minified, 'utf8');
        
        // Write minified bundle
        const outputPath = path.join(DIST_DIR, bundleName);
        fs.writeFileSync(outputPath, minified, 'utf8');
        
        const reduction = Math.round((1 - minifiedSize / combinedSize) * 100);
        console.log(`    ✓ ${formatSize(combinedSize)} → ${formatSize(minifiedSize)} (${reduction}% smaller)\n`);
    }
}

/**
 * Build CSS bundles
 */
function buildCssBundles() {
    console.log('🎨 Building CSS bundles...\n');
    
    for (const [bundleName, files] of Object.entries(CSS_BUNDLES)) {
        console.log(`  Building ${bundleName}...`);
        console.log(`    Concatenating ${files.length} files...`);
        
        // Concatenate all files
        const combined = concatenateFiles(CSS_SRC_DIR, files);
        const combinedSize = Buffer.byteLength(combined, 'utf8');
        
        // Write non-minified bundle for debugging
        const debugPath = path.join(DIST_DIR, bundleName.replace('.css', '.debug.css'));
        fs.writeFileSync(debugPath, combined, 'utf8');
        
        // Minify
        console.log(`    Minifying...`);
        const minified = minifyCss(combined);
        const minifiedSize = Buffer.byteLength(minified, 'utf8');
        
        // Write minified bundle
        const outputPath = path.join(DIST_DIR, bundleName);
        fs.writeFileSync(outputPath, minified, 'utf8');
        
        const reduction = Math.round((1 - minifiedSize / combinedSize) * 100);
        console.log(`    ✓ ${formatSize(combinedSize)} → ${formatSize(minifiedSize)} (${reduction}% smaller)\n`);
    }
}

/**
 * Generate production HTML
 */
function generateProdHtml() {
    console.log('📄 Generating production HTML...\n');
    
    const indexPath = path.join(ROOT_DIR, 'index.html');
    if (!fs.existsSync(indexPath)) {
        console.log('  ⚠ No index.html found, skipping HTML generation\n');
        return;
    }
    
    let html = fs.readFileSync(indexPath, 'utf8');
    
    // Replace individual CSS imports with bundle
    html = html.replace(
        /<!-- CSS FILES START -->[\s\S]*?<!-- CSS FILES END -->/,
        `<!-- CSS Bundle -->
    <link rel="stylesheet" href="dist/pptx-reader.bundle.css">`
    );
    
    // Replace individual JS imports with bundle
    html = html.replace(
        /<!-- JS FILES START -->[\s\S]*?<!-- JS FILES END -->/,
        `<!-- JS Bundle -->
    <script src="dist/pptx-reader.bundle.js"></script>`
    );
    
    // Write production HTML
    const prodHtmlPath = path.join(ROOT_DIR, 'index.prod.html');
    fs.writeFileSync(prodHtmlPath, html, 'utf8');
    
    console.log('  ✓ Created index.prod.html with bundled assets\n');
}

/**
 * Main build function
 */
async function build() {
    console.log('🚀 PPTX Reader Production Build\n');
    console.log('='.repeat(50) + '\n');
    
    const startTime = Date.now();
    
    ensureDistDir();
    copyVendorFiles();
    
    await buildJsBundles();
    buildCssBundles();
    generateProdHtml();
    
    const elapsed = ((Date.now() - startTime) / 1000).toFixed(2);
    
    console.log('='.repeat(50));
    console.log(`\n✨ Build complete in ${elapsed}s`);
    console.log('\n📦 Output files:');
    console.log('   dist/pptx-reader.bundle.js      (minified)');
    console.log('   dist/pptx-reader.bundle.debug.js (readable)');
    console.log('   dist/pptx-reader.bundle.css     (minified)');
    console.log('   dist/pptx-reader.bundle.debug.css (readable)');
    console.log('   index.prod.html                 (production)');
    console.log('\n💡 Use index.prod.html for production deployment');
}

// Run build
build().catch(error => {
    console.error('Build failed:', error);
    process.exit(1);
});
