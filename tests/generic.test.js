/**
 * Generic tests for PPTX Reader modules.
 *
 * This file loads all split test modules from tests/generic/ and
 * prints a combined summary. Individual suites live in:
 *
 *   tests/generic/theme-extractor.test.js
 *   tests/generic/background-extractor.test.js
 *   tests/generic/style-builder.test.js
 *   tests/generic/text-formatter.test.js
 *   tests/generic/shape-parser.test.js
 *   tests/generic/table-parser.test.js
 *   tests/generic/renderers.test.js
 *   tests/generic/source-and-edge-cases.test.js
 *
 * Shared helpers (test harness + DOM shim) are in:
 *   tests/helpers/test-harness.js
 */

const harness = require('./helpers/test-harness');

// Run every suite (order mirrors the original file)
require('./generic/theme-extractor.test');
require('./generic/background-extractor.test');
require('./generic/style-builder.test');
require('./generic/text-formatter.test');
require('./generic/shape-parser.test');
require('./generic/table-parser.test');
require('./generic/renderers.test');
require('./generic/source-and-edge-cases.test');
require('./generic/layout-text-style-parser.test');

// Print combined summary
harness.printSummary();
const { failed } = harness.getResults();
if (failed > 0) {
    process.exit(1);
}
