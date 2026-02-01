/**
 * EMF Converter orchestrator
 * Tries lightweight converter first (EMFLiteConverter), then optional full converter
 * (EMFPlusConverter or dynamically loaded external library), and finally
 * returns a placeholder when nothing works.
 */
(function (global) {
    'use strict';

    class EMFConverter {
        constructor(options = {}) {
            this.externalUrl = options.externalUrl;
            this._fullConverterPromise = null;
        }

        async convertToObjectUrl(input, label = null) {
            const result = await this.convertToSvg(input, label);
            if (!result || !result.svgText) return null;
            const blob = new Blob([result.svgText], { type: 'image/svg+xml' });
            return URL.createObjectURL(blob);
        }

        async convertToSvg(input, label = null) {
            // 1) Try the built-in lite converter
            const lite = global.EMFLiteConverter;
            if (lite && typeof lite.emfToSvg === 'function') {
                try {
                    const res = await lite.emfToSvg(input, label || null);
                    if (res && res.svgText) return res;
                } catch (e) {
                    console.warn('Lite EMF converter failed, trying full converter', e);
                }
            }

            // 2) Try an external/full converter if available
            const full = await this.getFullConverter();
            if (full && typeof full.emfToSvg === 'function') {
                try {
                    const res = await full.emfToSvg(input, label || null);
                    if (res && res.svgText) return res;
                } catch (e) {
                    console.warn('Full EMF converter failed, will fall back to placeholder', e);
                }
            }

            // 3) Placeholder
            return this.placeholderSvg(label);
        }

        async getFullConverter() {
            // Explicitly provided global converter wins
            if (global.EMFPlusConverter && typeof global.EMFPlusConverter.emfToSvg === 'function') {
                return global.EMFPlusConverter;
            }

            // Already loading/loaded
            if (this._fullConverterPromise) return this._fullConverterPromise;

            if (!this.externalUrl) return null;

            this._fullConverterPromise = new Promise((resolve) => {
                const script = document.createElement('script');
                script.src = this.externalUrl;
                script.async = true;
                script.onload = () => {
                    // Try common globals exposed by popular EMF->SVG libraries
                    if (global.EMFPlusConverter && typeof global.EMFPlusConverter.emfToSvg === 'function') {
                        resolve(global.EMFPlusConverter);
                        return;
                    }
                    if (global.emf2svg && typeof global.emf2svg.emfToSvg === 'function') {
                        resolve(global.emf2svg);
                        return;
                    }
                    if (typeof global.emf2svg === 'function') {
                        resolve({ emfToSvg: global.emf2svg });
                        return;
                    }
                    resolve(null);
                };
                script.onerror = () => resolve(null);
                document.head.appendChild(script);
            });

            return this._fullConverterPromise;
        }

        placeholderSvg(label) {
            const safe = (label || 'EMF image').replace(/</g, '&lt;').replace(/>/g, '&gt;');
            return {
                width: 400,
                height: 200,
                svgText:
                    '<svg xmlns="http://www.w3.org/2000/svg" width="400" height="200" viewBox="0 0 400 200" role="img" aria-label="' +
                    safe +
                    ' unsupported"><rect width="400" height="200" fill="#f3f4f6" stroke="#d1d5db"/><text x="200" y="80" text-anchor="middle" font-family="Arial, sans-serif" font-size="18" fill="#4b5563">EMF not rendered</text><text x="200" y="120" text-anchor="middle" font-family="Arial, sans-serif" font-size="14" fill="#6b7280">Unsupported content</text></svg>'
            };
        }
    }

    // Expose
    global.EMFConverter = EMFConverter;
})(typeof globalThis !== 'undefined' ? globalThis : window);
