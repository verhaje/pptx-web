/**
 * UI Controller Module
 * Handles user interface interactions and navigation
 */

class UIController {
    constructor() {
        this.slides = [];
        this.currentSlideIndex = 0;
        this.parser = new PPTXParser();
        this.renderer = new SlideRenderer();
        this.zoomScale = 1;
        this.zoomStep = 0.15;
        this.minZoom = 0.5;
        this.maxZoom = 3;
        
        this.initializeElements();
        this.bindEvents();
        this.initializeTheme();
        this.updateZoomUI();
    }

    /**
     * Initialize DOM element references
     */
    initializeElements() {
        // Input and file elements
        this.fileInput = document.getElementById('pptx-input');
        this.fileName = document.getElementById('file-name');
        this.viewerFileName = document.getElementById('viewer-file-name');
        this.headerOpenBtn = document.getElementById('header-open-btn');
        
        // Screens
        this.welcomeScreen = document.getElementById('welcome-screen');
        this.viewerContainer = document.getElementById('viewer-container');
        this.loadingOverlay = document.getElementById('loading-overlay');
        
        // Slide elements
        this.thumbnailList = document.getElementById('thumbnail-list');
        this.slideContent = document.getElementById('slide-content');
        this.slideCounter = document.getElementById('slide-counter');
        this.slideNumberInput = document.getElementById('slide-number-input');
        this.zoomOutBtn = document.getElementById('zoom-out-btn');
        this.zoomInBtn = document.getElementById('zoom-in-btn');
        this.zoomLevelLabel = document.getElementById('zoom-level');
        
        // Navigation
        this.prevBtn = document.getElementById('prev-btn');
        this.nextBtn = document.getElementById('next-btn');
        this.firstBtn = document.getElementById('first-btn');
        this.lastBtn = document.getElementById('last-btn');
        
        // Theme toggle
        this.themeToggle = document.getElementById('theme-toggle');
    }

    /**
     * Bind event listeners
     */
    bindEvents() {
        // Zoom controls
        if (this.zoomOutBtn) {
            this.zoomOutBtn.addEventListener('click', () => this.changeZoom(-this.zoomStep));
        }
        if (this.zoomInBtn) {
            this.zoomInBtn.addEventListener('click', () => this.changeZoom(this.zoomStep));
        }

        // File input change
        this.fileInput.addEventListener('change', (e) => this.handleFileSelect(e));
        
        // Theme toggle
        if (this.themeToggle) {
            this.themeToggle.addEventListener('click', () => this.toggleTheme());
        }
        
        // Navigation buttons
        this.prevBtn.addEventListener('click', () => this.navigateSlide(-1));
        this.nextBtn.addEventListener('click', () => this.navigateSlide(1));
        this.firstBtn.addEventListener('click', () => this.displaySlide(0));
        this.lastBtn.addEventListener('click', () => this.displaySlide(this.slides.length - 1));
        
        // Slide number input
        this.slideNumberInput.addEventListener('change', (e) => {
            const num = parseInt(e.target.value);
            if (num >= 1 && num <= this.slides.length) {
                this.displaySlide(num - 1);
            } else {
                e.target.value = this.currentSlideIndex + 1;
            }
        });
        
        this.slideNumberInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                e.target.blur();
            }
        });
        
        // Keyboard navigation
        document.addEventListener('keydown', (e) => this.handleKeyboard(e));
        
        // Drag and drop
        document.body.addEventListener('dragover', (e) => {
            e.preventDefault();
            e.stopPropagation();
        });

        // Slide-internal hyperlinks (e.g., links to another slide)
        if (this.slideContent) {
            this.slideContent.addEventListener('click', (e) => {
                const link = e.target?.closest?.('a[data-pptx-slide]');
                if (!link) return;

                const idx = parseInt(link.getAttribute('data-pptx-slide'), 10);
                if (Number.isNaN(idx)) return;

                e.preventDefault();
                e.stopPropagation();
                this.displaySlide(idx);
            });
        }
        
        document.body.addEventListener('drop', (e) => {
            e.preventDefault();
            e.stopPropagation();
            const files = e.dataTransfer.files;
            if (files.length > 0 && files[0].name.endsWith('.pptx')) {
                this.loadFile(files[0]);
            }
        });
        
        // Header open button - allows opening a new file anytime
        if (this.headerOpenBtn) {
            this.headerOpenBtn.addEventListener('click', () => {
                // Reset file input so same file can be selected again
                this.fileInput.value = '';
                this.fileInput.click();
            });
        }
    }

    /**
     * Handle keyboard navigation
     */
    handleKeyboard(e) {
        if (this.slides.length === 0) return;
        
        // Prevent default for arrow keys to avoid page scrolling
        if (['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', ' '].includes(e.key)) {
            e.preventDefault();
        }
        
        switch (e.key) {
            case 'ArrowLeft':
            case 'ArrowUp':
                this.navigateSlide(-1);
                break;
            case 'ArrowRight':
            case 'ArrowDown':
            case ' ':
                this.navigateSlide(1);
                break;
            case 'Home':
                this.displaySlide(0);
                break;
            case 'End':
                this.displaySlide(this.slides.length - 1);
                break;
        }
    }

    /**
     * Handle file selection
     */
    async handleFileSelect(e) {
        const file = e.target.files[0];
        if (file) {
            await this.loadFile(file);
        }
    }

    /**
     * Load and parse a PPTX file
     */
    async loadFile(file) {
        if (!file.name.endsWith('.pptx')) {
            alert('Please select a valid .pptx file');
            return;
        }

        this.showLoading(true);
        if (this.fileName) {
            this.fileName.textContent = file.name;
            this.fileName.classList.add('active');
        }
        if (this.viewerFileName) {
            this.viewerFileName.textContent = file.name;
        }

        try {
            const arrayBuffer = await file.arrayBuffer();
            const parsedData = await this.parser.parse(arrayBuffer);
            this.slides = parsedData.slides || [];
            this.setZoom(1);
            this.showViewer();
            this.renderThumbnails();
            this.displaySlide(0);
        } catch (error) {
            console.error('Error loading PPTX:', error);
            alert('Error loading the presentation. Please make sure it\'s a valid PPTX file.');
        } finally {
            this.showLoading(false);
        }
    }

    /**
     * Show or hide loading overlay
     */
    showLoading(show) {
        if (show) {
            this.loadingOverlay.classList.remove('hidden');
        } else {
            this.loadingOverlay.classList.add('hidden');
        }
    }

    /**
     * Show the viewer and hide welcome screen
     */
    showViewer() {
        this.welcomeScreen.classList.add('hidden');
        this.viewerContainer.classList.remove('hidden');
        // Add viewer-active class to header to show file info and hide search
        const header = document.querySelector('.header');
        if (header) {
            header.classList.add('viewer-active');
        }
    }

    /**
     * Render all slide thumbnails
     */
    renderThumbnails() {
        this.thumbnailList.innerHTML = '';
        
        this.slides.forEach((slide, index) => {
            const thumbnail = this.renderer.createThumbnail(slide, index, (i) => this.displaySlide(i));
            this.thumbnailList.appendChild(thumbnail);
        });
        
        // Highlight first thumbnail
        if (this.slides.length > 0) {
            this.thumbnailList.children[0].classList.add('active');
        }
        
        // Update slide number input max
        this.slideNumberInput.max = this.slides.length;
    }

    /**
     * Display a specific slide
     */
    displaySlide(index) {
        if (index < 0 || index >= this.slides.length) return;
        
        this.currentSlideIndex = index;
        const slide = this.slides[index];
        
        // Update active thumbnail
        const thumbnails = this.thumbnailList.querySelectorAll('.thumbnail');
        thumbnails.forEach((thumb, i) => {
            thumb.classList.toggle('active', i === index);
        });
        
        // Scroll thumbnail into view
        if (thumbnails[index]) {
            thumbnails[index].scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
        
        // Render slide content
        this.slideContent.innerHTML = this.renderer.createSlideHTML(slide);
        this.applyZoomToSlide();
        this.updateZoomUI();
        
        // Update navigation
        this.updateNavigation();
    }

    /**
     * Update navigation button states
     */
    updateNavigation() {
        const total = this.slides.length;
        const current = this.currentSlideIndex + 1;
        
        this.slideCounter.textContent = `Slide ${current} of ${total}`;
        this.slideNumberInput.value = current;
        
        this.prevBtn.disabled = this.currentSlideIndex === 0;
        this.nextBtn.disabled = this.currentSlideIndex === total - 1;
        this.firstBtn.disabled = this.currentSlideIndex === 0;
        this.lastBtn.disabled = this.currentSlideIndex === total - 1;
    }

    /**
     * Navigate to previous or next slide
     */
    navigateSlide(direction) {
        const newIndex = this.currentSlideIndex + direction;
        if (newIndex >= 0 && newIndex < this.slides.length) {
            this.displaySlide(newIndex);
        }
    }

    /**
     * Adjust zoom by a delta step
     * @param {number} delta - Positive to zoom in, negative to zoom out
     */
    changeZoom(delta) {
        this.setZoom(this.zoomScale + delta);
    }

    /**
     * Set zoom scale and apply it to the current slide
     * @param {number} scale - Target zoom scale
     */
    setZoom(scale) {
        const clamped = Math.min(this.maxZoom, Math.max(this.minZoom, scale));
        this.zoomScale = clamped;
        this.updateZoomUI();
        this.applyZoomToSlide();
    }

    /**
     * Apply the current zoom to the rendered slide
     */
    applyZoomToSlide() {
        if (!this.slideContent) return;

        const isZoomed = Math.abs(this.zoomScale - 1) > 0.01;
        this.slideContent.classList.toggle('zoomed', isZoomed);

        const wrapper = this.slideContent.querySelector('.slide-wrapper');
        if (wrapper) {
            wrapper.style.transform = `scale(${this.zoomScale})`;
            wrapper.style.transformOrigin = 'top center';
        }
    }

    /**
     * Update zoom UI elements (label and button states)
     */
    updateZoomUI() {
        if (this.zoomLevelLabel) {
            const isFit = Math.abs(this.zoomScale - 1) < 0.01;
            this.zoomLevelLabel.textContent = isFit ? 'Fit' : `${Math.round(this.zoomScale * 100)}%`;
        }

        if (this.zoomOutBtn) {
            this.zoomOutBtn.disabled = this.zoomScale <= this.minZoom + 0.001;
        }
        if (this.zoomInBtn) {
            this.zoomInBtn.disabled = this.zoomScale >= this.maxZoom - 0.001;
        }
    }

    /**
     * Initialize theme based on stored preference or system preference
     */
    initializeTheme() {
        // Check for stored preference
        const storedTheme = localStorage.getItem('theme');
        
        if (storedTheme) {
            this.setTheme(storedTheme);
        } else {
            // Auto-detect based on system preference (especially useful on mobile)
            const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            this.setTheme(prefersDark ? 'dark' : 'light');
        }
        
        // Listen for system theme changes (for auto mode)
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
            // Only auto-switch if user hasn't set a preference
            if (!localStorage.getItem('theme')) {
                this.setTheme(e.matches ? 'dark' : 'light');
            }
        });
    }

    /**
     * Toggle between dark and light theme
     */
    toggleTheme() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        this.setTheme(newTheme);
        localStorage.setItem('theme', newTheme);
    }

    /**
     * Set the theme
     */
    setTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
    }
}

// Export for use in other modules
window.UIController = UIController;
