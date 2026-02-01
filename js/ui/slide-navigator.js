/**
 * Slide Navigator Module
 * Handles slide display and navigation
 */

class SlideNavigator {
    constructor(renderer) {
        this.slides = [];
        this.currentSlideIndex = 0;
        this.renderer = renderer;
        
        // DOM elements
        this.thumbnailList = document.getElementById('thumbnail-list');
        this.slideContent = document.getElementById('slide-content');
        this.slideCounter = document.getElementById('slide-counter');
        this.slideNumberInput = document.getElementById('slide-number-input');
        
        // Navigation buttons
        this.prevBtn = document.getElementById('prev-btn');
        this.nextBtn = document.getElementById('next-btn');
        this.firstBtn = document.getElementById('first-btn');
        this.lastBtn = document.getElementById('last-btn');
        
        this.bindEvents();
    }

    /**
     * Bind navigation events
     */
    bindEvents() {
        this.prevBtn.addEventListener('click', () => this.navigate(-1));
        this.nextBtn.addEventListener('click', () => this.navigate(1));
        this.firstBtn.addEventListener('click', () => this.displaySlide(0));
        this.lastBtn.addEventListener('click', () => this.displaySlide(this.slides.length - 1));
        
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
    }

    /**
     * Set slides data
     * @param {Array} slides - Array of slide objects
     */
    setSlides(slides) {
        this.slides = slides;
        this.currentSlideIndex = 0;
    }

    /**
     * Display a specific slide
     * @param {number} index - Slide index
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
        
        // Update navigation UI
        this.updateNavigation();
    }

    /**
     * Navigate to previous or next slide
     * @param {number} direction - -1 for previous, 1 for next
     */
    navigate(direction) {
        const newIndex = this.currentSlideIndex + direction;
        if (newIndex >= 0 && newIndex < this.slides.length) {
            this.displaySlide(newIndex);
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
     * Update navigation button states and counter
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
     * Get current slide index
     * @returns {number} - Current slide index
     */
    getCurrentSlideIndex() {
        return this.currentSlideIndex;
    }

    /**
     * Get total number of slides
     * @returns {number} - Total number of slides
     */
    getSlideCount() {
        return this.slides.length;
    }
}

// Export for use in other modules
window.SlideNavigator = SlideNavigator;
