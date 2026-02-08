/**
 * Shared test harness – tiny test/suite runner and DOM shim for Node.js.
 * Every split test file imports this instead of duplicating it.
 */

const assert = require('assert');

// ── Counters ──────────────────────────────────────────────────────────────────

let passed = 0;
let failed = 0;

function test(name, fn) {
    try {
        fn();
        passed++;
        console.log(`  PASSED: ${name}`);
    } catch (e) {
        failed++;
        console.error(`  FAILED: ${name}`);
        console.error(`    ${e.message}`);
    }
}

function suite(name, fn) {
    console.log(`\n── ${name} ${'─'.repeat(Math.max(0, 60 - name.length))}`);
    fn();
}

function resetCounters() {
    passed = 0;
    failed = 0;
}

function getResults() {
    return { passed, failed, total: passed + failed };
}

function printSummary() {
    console.log(`\n${'═'.repeat(64)}`);
    console.log(`  Results: ${passed} passed, ${failed} failed, ${passed + failed} total`);
    console.log(`${'═'.repeat(64)}`);
}

// ── Minimal DOM shim ──────────────────────────────────────────────────────────

class MockElement {
    constructor(tagName, attributes = {}, children = []) {
        this.tagName = tagName;
        this.nodeType = 1;
        this._attributes = { ...attributes };
        this.children = children;
        this.childNodes = children;
        this.parentNode = null;
        this.textContent = attributes._text || '';
        for (const child of children) {
            child.parentNode = this;
        }
    }

    getAttribute(name) {
        return this._attributes[name] ?? null;
    }

    hasAttribute(name) {
        return name in this._attributes;
    }

    getElementsByTagName(tag) {
        const results = [];
        const search = (el) => {
            for (const child of (el.children || [])) {
                if (child.tagName === tag) results.push(child);
                search(child);
            }
        };
        search(this);
        return results;
    }
}

/** Shorthand element constructor */
function el(tag, attrs = {}, children = []) {
    return new MockElement(tag, attrs, children);
}

// ── Exports ───────────────────────────────────────────────────────────────────

module.exports = {
    assert,
    test,
    suite,
    resetCounters,
    getResults,
    printSummary,
    MockElement,
    el,
};
