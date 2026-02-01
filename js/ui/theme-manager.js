/**
 * Theme Manager Module
 * Handles theme switching and persistence
 */

class ThemeManager {
    constructor() {
        this.themeToggle = document.getElementById('theme-toggle');
        this.initialize();
    }

    /**
     * Initialize theme based on stored preference or system preference
     */
    initialize() {
        // Check for stored preference
        const storedTheme = localStorage.getItem('theme');
        
        if (storedTheme) {
            this.setTheme(storedTheme);
        } else {
            // Auto-detect based on system preference
            const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            this.setTheme(prefersDark ? 'dark' : 'light');
        }
        
        // Listen for system theme changes
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
            if (!localStorage.getItem('theme')) {
                this.setTheme(e.matches ? 'dark' : 'light');
            }
        });
        
        // Bind toggle event
        if (this.themeToggle) {
            this.themeToggle.addEventListener('click', () => this.toggle());
        }
    }

    /**
     * Toggle between dark and light theme
     */
    toggle() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        this.setTheme(newTheme);
        localStorage.setItem('theme', newTheme);
    }

    /**
     * Set the theme
     * @param {string} theme - 'dark' or 'light'
     */
    setTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
    }

    /**
     * Get current theme
     * @returns {string} - Current theme
     */
    getTheme() {
        return document.documentElement.getAttribute('data-theme') || 'dark';
    }
}

// Export for use in other modules
window.ThemeManager = ThemeManager;
