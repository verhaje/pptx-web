/**
 * Build Script - Minify JavaScript files
 * This script minifies all JavaScript files and outputs them to dist/
 */

const fs = require('fs');
const path = require('path');
const { minify } = require('terser');

const SRC_DIR = path.join(__dirname, '../js');
const DIST_DIR = path.join(__dirname, '../dist');
const CSS_SRC_DIR = path.join(__dirname, '../css');
const CSS_DIST_DIR = path.join(DIST_DIR, 'css');

// Create dist directory if it doesn't exist
if (!fs.existsSync(DIST_DIR)) {
    fs.mkdirSync(DIST_DIR, { recursive: true });
}

/**
 * Get all JavaScript files from src directory recursively
 */
function getJsFiles(dir) {
    const files = [];
    const items = fs.readdirSync(dir, { withFileTypes: true });
    
    for (const item of items) {
        const fullPath = path.join(dir, item.name);
        if (item.isDirectory()) {
            files.push(...getJsFiles(fullPath));
        } else if (item.isFile() && item.name.endsWith('.js')) {
            files.push(fullPath);
        }
    }
    
    return files;
}

/**
 * Get all CSS files from css directory recursively
 */
function getCssFiles(dir) {
    const files = [];
    const items = fs.readdirSync(dir, { withFileTypes: true });

    for (const item of items) {
        const fullPath = path.join(dir, item.name);
        if (item.isDirectory()) {
            files.push(...getCssFiles(fullPath));
        } else if (item.isFile() && item.name.endsWith('.css')) {
            files.push(fullPath);
        }
    }

    return files;
}

/**
 * Minify a single file
 */
async function minifyFile(inputPath, outputPath) {
    try {
        const code = fs.readFileSync(inputPath, 'utf8');
        const result = await minify(code, {
            compress: {
                passes: 2,
                pure_funcs: null,
                toplevel: true,
                unsafe: true,
                unsafe_methods: true,
                warnings: false
            },
            mangle: {
                toplevel: true,
                reserved: [
                    'XMLUtils', 'ThemeExtractor', 'BackgroundExtractor', 'ShapeParser',
                    'TextExtractor', 'PPTXParser', 'StyleBuilder', 'TextFormatter',
                    'ShapeRenderer', 'SlideRenderer', 'UIController'
                ]
            },
            format: {
                comments: false
            }
        });

        if (result.error) {
            throw result.error;
        }

        fs.writeFileSync(outputPath, result.code, 'utf8');
        const originalSize = Buffer.byteLength(code, 'utf8');
        const minifiedSize = Buffer.byteLength(result.code, 'utf8');
        const reduction = Math.round((1 - minifiedSize / originalSize) * 100);
        
        console.log(`✓ ${path.basename(inputPath)}: ${originalSize} → ${minifiedSize} bytes (${reduction}% smaller)`);
        
        return true;
    } catch (error) {
        console.error(`✗ Error minifying ${inputPath}:`, error.message);
        return false;
    }
}

/**
 * Main build function
 */
async function build() {
    console.log('🚀 Building PPTX Reader...\n');
    
    const jsFiles = getJsFiles(SRC_DIR);
    let successCount = 0;
    let failCount = 0;

    console.log(`Found ${jsFiles.length} JavaScript files to minify\n`);

    for (const file of jsFiles) {
        const filename = path.basename(file);
        const relativePath = path.relative(SRC_DIR, file);
        const outputPath = path.join(DIST_DIR, relativePath);
        
        // Create subdirectory if needed
        const outputDir = path.dirname(outputPath);
        if (!fs.existsSync(outputDir)) {
            fs.mkdirSync(outputDir, { recursive: true });
        }
        
        const success = await minifyFile(file, outputPath);
        if (success) {
            successCount++;
        } else {
            failCount++;
        }
    }

    console.log(`\n✨ Build complete: ${successCount} succeeded, ${failCount} failed`);
    
    // Minify all CSS files under css/
    try {
        if (!fs.existsSync(CSS_DIST_DIR)) {
            fs.mkdirSync(CSS_DIST_DIR, { recursive: true });
        }

        const cssFiles = getCssFiles(CSS_SRC_DIR);
        console.log(`\nFound ${cssFiles.length} CSS files to minify\n`);

        for (const cssPath of cssFiles) {
            const css = fs.readFileSync(cssPath, 'utf8');
            const minifiedCss = css
                .replace(/\/\*[\s\S]*?\*\//g, '')
                .replace(/\s+/g, ' ')
                .replace(/\s*([{};:,>+~])\s*/g, '$1')
                .trim();

            const relative = path.relative(CSS_SRC_DIR, cssPath);
            const outPath = path.join(CSS_DIST_DIR, relative);
            const outDir = path.dirname(outPath);
            if (!fs.existsSync(outDir)) {
                fs.mkdirSync(outDir, { recursive: true });
            }

            fs.writeFileSync(outPath, minifiedCss, 'utf8');

            const cssOriginal = Buffer.byteLength(css, 'utf8');
            const cssMin = Buffer.byteLength(minifiedCss, 'utf8');
            const cssReduction = Math.round((1 - cssMin / cssOriginal) * 100);
            console.log(`✓ ${relative}: ${cssOriginal} → ${cssMin} bytes (${cssReduction}% smaller)`);
        }
    } catch (error) {
        console.error('✗ Error minifying CSS:', error.message);
    }

    console.log('\n📦 Minified files are in the dist/ directory');
    console.log('💡 Update your index.html to reference the minified files in production');
}

// Run build
build().catch(error => {
    console.error('Build failed:', error);
    process.exit(1);
});
