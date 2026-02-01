/**
 * File Manager Module
 * Handles file selection, loading, and parsing
 */

class FileManager {
    constructor(onFileLoaded) {
        this.fileInput = document.getElementById('pptx-input');
        this.fileName = document.getElementById('file-name');
        this.viewerFileName = document.getElementById('viewer-file-name');
        this.loadingOverlay = document.getElementById('loading-overlay');
        this.onFileLoaded = onFileLoaded;
        
        this.parser = new PPTXParser();
        
        this.bindEvents();
    }

    /**
     * Bind file input events
     */
    bindEvents() {
        this.fileInput.addEventListener('change', (e) => this.handleFileSelect(e));
        
        // Drag and drop
        document.body.addEventListener('dragover', (e) => {
            e.preventDefault();
            e.stopPropagation();
        });
        
        document.body.addEventListener('drop', (e) => {
            e.preventDefault();
            e.stopPropagation();
            const files = e.dataTransfer.files;
            if (files.length > 0 && files[0].name.endsWith('.pptx')) {
                this.loadFile(files[0]);
            }
        });
    }

    /**
     * Handle file input selection
     */
    async handleFileSelect(e) {
        const file = e.target.files[0];
        if (file) {
            await this.loadFile(file);
        }
    }

    /**
     * Load and parse a PPTX file
     * @param {File} file - The file to load
     */
    async loadFile(file) {
        if (!file.name.endsWith('.pptx')) {
            alert('Please select a valid .pptx file');
            return;
        }

        this.showLoading(true);
        this.fileName.textContent = file.name;
        this.fileName.classList.add('active');
        if (this.viewerFileName) {
            this.viewerFileName.textContent = file.name;
        }

        try {
            const arrayBuffer = await file.arrayBuffer();
            const slides = await this.parser.parse(arrayBuffer);
            this.onFileLoaded(slides);
        } catch (error) {
            console.error('Error loading PPTX:', error);
            alert('Error loading the presentation. Please make sure it\'s a valid PPTX file.');
        } finally {
            this.showLoading(false);
        }
    }

    /**
     * Show or hide loading overlay
     * @param {boolean} show - Whether to show the loading overlay
     */
    showLoading(show) {
        if (show) {
            this.loadingOverlay.classList.remove('hidden');
        } else {
            this.loadingOverlay.classList.add('hidden');
        }
    }
}

// Export for use in other modules
window.FileManager = FileManager;
