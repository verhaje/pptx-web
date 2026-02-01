/**
 * Screen Manager Module
 * Handles switching between screens (welcome, viewer)
 */

class ScreenManager {
    constructor() {
        this.welcomeScreen = document.getElementById('welcome-screen');
        this.viewerContainer = document.getElementById('viewer-container');
    }

    /**
     * Show the viewer and hide welcome screen
     */
    showViewer() {
        this.welcomeScreen.classList.add('hidden');
        this.viewerContainer.classList.remove('hidden');
        
        // Add viewer-active class to header to show file info
        const header = document.querySelector('.header');
        if (header) {
            header.classList.add('viewer-active');
        }
    }

    /**
     * Show the welcome screen and hide viewer
     */
    showWelcome() {
        this.welcomeScreen.classList.remove('hidden');
        this.viewerContainer.classList.add('hidden');
        
        // Remove viewer-active class from header
        const header = document.querySelector('.header');
        if (header) {
            header.classList.remove('viewer-active');
        }
    }

    /**
     * Check if viewer is currently visible
     * @returns {boolean} - True if viewer is visible
     */
    isViewerVisible() {
        return !this.viewerContainer.classList.contains('hidden');
    }
}

// Export for use in other modules
window.ScreenManager = ScreenManager;
