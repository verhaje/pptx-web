/**
 * Watch Script - Monitor files and rebuild bundles on changes
 * Uses Babel for transpilation and creates combined bundles
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

let buildTimeout = null;

// Bundle definitions - order matters for dependencies
const JS_BUNDLES = {
    'pptx-reader.bundle.js': [
        'parsers/xml-utils.js',
        'parsers/theme-extractor.js',
        'parsers/background-extractor.js',
        'parsers/text-extractor.js',
        'parsers/shape-parser.js',
        'parsers/layout/layout-text-style-parser.js',
        'parsers/layout/layout-shape-parser.js',
        'parsers/layout/layout-parser.js',
        'parsers/pptx-parser.js',
        'renderers/style-builder.js',
        'renderers/text-formatter.js',
        'renderers/shape-renderer.js',
        'renderers/slide-renderer.js',
        'ui/theme-manager.js',
        'ui/keyboard-manager.js',
        'ui/screen-manager.js',
        'ui/slide-navigator.js',
        'ui/file-manager.js',
        'ui/print-manager.js',
        'ui/ui-controller.js',
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

// Babel configuration
const BABEL_CONFIG = {
    presets: [
        ['@babel/preset-env', {
            targets: {
                browsers: ['last 2 versions', 'IE 11']
            },
            modules: false
        }]
    ],
    compact: false
};

// Terser configuration (lighter for dev mode)
const TERSER_CONFIG = {
    compress: {
        passes: 1,
        drop_console: false
    },
    mangle: false,
    format: {
        comments: false,
        beautify: false
    }
};

/**
 * Ensure dist directory exists
 */
function ensureDistDir() {
    if (!fs.existsSync(DIST_DIR)) {
        fs.mkdirSync(DIST_DIR, { recursive: true });
    }
}

/**
 * Concatenate files
 */
function concatenateFiles(basePath, files) {
    const contents = [];
    
    for (const file of files) {
        const filePath = path.join(basePath, file);
        if (fs.existsSync(filePath)) {
            contents.push(fs.readFileSync(filePath, 'utf8'));
        } else {
            console.warn(`  ⚠ File not found: ${file}`);
        }
    }
    
    return contents.join('\n\n');
}

/**
 * Transpile with Babel
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
        return code;
    }
}

/**
 * Minify JS (light minification for dev)
 */
async function minifyJs(code) {
    try {
        const result = await minify(code, TERSER_CONFIG);
        return result.code || code;
    } catch (error) {
        console.error(`  ✗ Terser error:`, error.message);
        return code;
    }
}

/**
 * Minify CSS
 */
function minifyCss(css) {
    return css
        .replace(/\/\*[\s\S]*?\*\//g, '')
        .replace(/\s+/g, ' ')
        .replace(/\s*([{};:,>+~])\s*/g, '$1')
        .replace(/;}/g, '}')
        .trim();
}

/**
 * Build JS bundles
 */
async function buildJsBundles() {
    for (const [bundleName, files] of Object.entries(JS_BUNDLES)) {
        const combined = concatenateFiles(JS_SRC_DIR, files);
        const transpiled = await transpileJs(combined, bundleName);
        const minified = await minifyJs(transpiled);
        
        const outputPath = path.join(DIST_DIR, bundleName);
        fs.writeFileSync(outputPath, minified, 'utf8');
        
        const size = (Buffer.byteLength(minified, 'utf8') / 1024).toFixed(1);
        console.log(`  ✓ ${bundleName} (${size} KB)`);
    }
}

/**
 * Build CSS bundles
 */
function buildCssBundles() {
    for (const [bundleName, files] of Object.entries(CSS_BUNDLES)) {
        const combined = concatenateFiles(CSS_SRC_DIR, files);
        const minified = minifyCss(combined);
        
        const outputPath = path.join(DIST_DIR, bundleName);
        fs.writeFileSync(outputPath, minified, 'utf8');
        
        const size = (Buffer.byteLength(minified, 'utf8') / 1024).toFixed(1);
        console.log(`  ✓ ${bundleName} (${size} KB)`);
    }
}

/**
 * Build all bundles
 */
async function buildAll() {
    const startTime = Date.now();
    console.log('\n🔨 Rebuilding bundles...');
    
    ensureDistDir();
    
    await buildJsBundles();
    buildCssBundles();
    
    const elapsed = Date.now() - startTime;
    console.log(`✨ Build complete in ${elapsed}ms\n`);
}

/**
 * Watch for file changes
 */
function watchFiles() {
    console.log('👀 Watching for changes... (Press Ctrl+C to stop)\n');

    // Watch JS directory
    fs.watch(JS_SRC_DIR, { recursive: true }, (eventType, filename) => {
        if (filename && filename.endsWith('.js')) {
            console.log(`📝 Changed: js/${filename}`);
            clearTimeout(buildTimeout);
            buildTimeout = setTimeout(buildAll, 300);
        }
    });

    // Watch CSS directory
    fs.watch(CSS_SRC_DIR, { recursive: true }, (eventType, filename) => {
        if (filename && filename.endsWith('.css')) {
            console.log(`📝 Changed: css/${filename}`);
            clearTimeout(buildTimeout);
            buildTimeout = setTimeout(buildAll, 300);
        }
    });
}

// Run initial build and watch
console.log('🚀 Starting watch mode with bundling...\n');
buildAll().then(() => {
    watchFiles();
});
