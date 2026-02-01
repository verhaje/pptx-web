/**
 * Keyboard Manager Module
 * Handles keyboard input and shortcuts
 */

class KeyboardManager {
    constructor(navigator) {
        this.navigator = navigator;
        this.bindKeyboardEvents();
    }

    /**
     * Bind keyboard event listeners
     */
    bindKeyboardEvents() {
        document.addEventListener('keydown', (e) => this.handleKeyDown(e));
    }

    /**
     * Handle keyboard input
     * @param {KeyboardEvent} e - The keyboard event
     */
    handleKeyDown(e) {
        if (this.navigator.getSlideCount() === 0) return;
        
        // Prevent default for arrow keys to avoid page scrolling
        if (['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', ' '].includes(e.key)) {
            e.preventDefault();
        }
        
        switch (e.key) {
            case 'ArrowLeft':
            case 'ArrowUp':
                this.navigator.navigate(-1);
                break;
            case 'ArrowRight':
            case 'ArrowDown':
            case ' ':
                this.navigator.navigate(1);
                break;
            case 'Home':
                this.navigator.displaySlide(0);
                break;
            case 'End':
                this.navigator.displaySlide(this.navigator.getSlideCount() - 1);
                break;
        }
    }
}

// Export for use in other modules
window.KeyboardManager = KeyboardManager;
