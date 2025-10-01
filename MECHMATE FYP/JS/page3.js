        // Current customization state
        let currentDesign = {
            carModel: 'civic',
            color: '#ef4444',
            parts: {
                rims: 'stock',
                spoiler: 'none',
                bumper: 'stock',
                lights: 'stock'
            },
            options: {
                tintedWindows: false,
                racingStripes: false,
                underglow: false,
                brightness: 1,
                zoom: 1
            }
        };

        let totalCost = 15000; // Base paint cost
        let modificationCount = 1; // Base color counts as 1

        // Part Categories Management
        function toggleCategory(header) {
            const options = header.nextElementSibling;
            const arrow = header.querySelector('.category-arrow');
            
            // Close all other categories
            document.querySelectorAll('.category-header').forEach(h => {
                if (h !== header) {
                    h.classList.remove('active');
                    h.nextElementSibling.classList.remove('show');
                    h.querySelector('.category-arrow').textContent = '▼';
                }
            });
            
            // Toggle current category
            header.classList.toggle('active');
            options.classList.toggle('show');
            arrow.textContent = header.classList.contains('active') ? '▲' : '▼';
        }

        // Part Selection
        function selectPart(element, partType, partValue) {
            // Update UI selection
            const category = element.closest('.part-category');
            category.querySelectorAll('.part-option').forEach(option => {
                option.classList.remove('selected');
            });
            element.classList.add('selected');

            // Update design state
            currentDesign.parts[partType] = partValue;
            
            // Update visual display
            updateCarDisplay();
            
            // Update cost calculation
            updateCostAndCount();
            
            // Update right sidebar info
            updateCurrentSelection(partType, element.querySelector('.part-name').textContent);
        }

  function getParameter(name) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(name);
}

// Get car and model from URL
const car = getParameter("car");
const model = getParameter("model");




        // Update car visual display
        function updateCarDisplay() {
            const carBase = document.getElementById('carBase');
            const spoilerLayer = document.getElementById('spoilerLayer');
            const rimsLayer = document.getElementById('rimsLayer');

            if (car) {
  document.getElementById("carTitle").innerText = `Customize your ${car} (${model})`;

  carBase.innerHTML =
    `<img src="../CAR IMAGES/SelectionPage/${car}_${model}.jpg" width="500" style="margin-top: 60px;">`;
}
            
            // Update car color
            // carBase.style.color = currentDesign.color;
            
            // // Show/hide spoiler
            // if (currentDesign.parts.spoiler === 'none') {
            //     spoilerLayer.style.display = 'none';
            // } else {
            //     spoilerLayer.style.display = 'block';
            //     spoilerLayer.textContent = currentDesign.parts.spoiler === 'racing' ? '🛩️' : '✈️';
            //     spoilerLayer.style.color = currentDesign.color;
            // }
            
            // Update rims display
            /*if (currentDesign.parts.rims !== 'stock') {
                rimsLayer.style.display = 'block';
                 rimsLayer.textContent = currentDesign.parts.rims === 'chrome' ? '✨' : '🔘';
                rimsLayer.style.color = '#silver';
                rimsLayer.style.fontSize = '4rem';
                rimsLayer.style.bottom = '20px';
                rimsLayer.style.left = '50%';
                rimsLayer.style.transform = 'translateX(-50%)';
                rimsLayer.style.top = '190px';
            } else {
                rimsLayer.style.display = 'none';
            }*/
            
            // Apply options
            applyCarOptions();
        }

        // Apply visual options
        function applyCarOptions() {
            const carCanvas = document.getElementById('carCanvas');
            const previewContainer = document.getElementById('previewContainer');
            
            // Apply brightness
            carCanvas.style.filter = `brightness(${currentDesign.options.brightness})`;
            
            // Apply zoom
            previewContainer.style.transform = `translate(-50%, -50%) scale(${currentDesign.options.zoom})`;
            
            // Apply underglow effect
            if (currentDesign.options.underglow) {
                carCanvas.style.boxShadow = `0 20px 40px rgba(0, 255, 255, 0.5), 0 0 60px rgba(0, 255, 255, 0.3)`;
            } else {
                carCanvas.style.boxShadow = 'none';
            }
        }

        // Color Management
        function applyColor(color) {
            currentDesign.color = color;
            
            // Update color picker UI
            document.querySelectorAll('.color-option').forEach(option => {
                option.classList.remove('selected');
            });
            
            // Find and select the matching color option
            const colorOptions = document.querySelectorAll('.color-option');
            colorOptions.forEach(option => {
                if (option.style.backgroundColor === color || rgbToHex(option.style.backgroundColor) === color) {
                    option.classList.add('selected');
                }
            });
            
            // Update custom color input
            document.getElementById('customColor').value = color;
            
            // Update car display
            updateCarDisplay();
        }

        function applyCustomColor() {
            const color = document.getElementById('customColor').value;
            applyColor(color);
        }

        // Helper function to convert RGB to HEX
        function rgbToHex(rgb) {
            if (rgb.startsWith('#')) return rgb;
            const values = rgb.match(/\d+/g);
            if (!values) return rgb;
            return "#" + values.map(x => parseInt(x).toString(16).padStart(2, '0')).join('');
        }

        // Preview Controls
        function zoomIn() {
            currentDesign.options.zoom = Math.min(currentDesign.options.zoom + 0.1, 2);
            updateCarDisplay();
            document.querySelector('input[onchange="adjustZoom(this.value)"]').value = currentDesign.options.zoom;
        }

        function zoomOut() {
            currentDesign.options.zoom = Math.max(currentDesign.options.zoom - 0.1, 0.5);
            updateCarDisplay();
            document.querySelector('input[onchange="adjustZoom(this.value)"]').value = currentDesign.options.zoom;
        }

        function resetView() {
            currentDesign.options.zoom = 1;
            currentDesign.options.brightness = 1;
            updateCarDisplay();
            document.querySelector('input[onchange="adjustZoom(this.value)"]').value = 1;
            document.querySelector('input[onchange="adjustBrightness(this.value)"]').value = 1;
        }

        function adjustBrightness(value) {
            currentDesign.options.brightness = parseFloat(value);
            updateCarDisplay();
        }

        function adjustZoom(value) {
            currentDesign.options.zoom = parseFloat(value);
            updateCarDisplay();
        }

        // Toggle Options
        function toggleWindows(toggle) {
            toggle.classList.toggle('active');
            currentDesign.options.tintedWindows = toggle.classList.contains('active');
            
            // Visual feedback (you can enhance this)
            if (currentDesign.options.tintedWindows) {
                showToast('Tinted windows applied!');
            }
        }

        function toggleStripes(toggle) {
            toggle.classList.toggle('active');
            currentDesign.options.racingStripes = toggle.classList.contains('active');
            
            if (currentDesign.options.racingStripes) {
                showToast('Racing stripes added!');
            }
        }

        function toggleUnderglow(toggle) {
            toggle.classList.toggle('active');
            currentDesign.options.underglow = toggle.classList.contains('active');
            updateCarDisplay();
            
            if (currentDesign.options.underglow) {
                showToast('Neon underglow activated!');
            }
        }

        // Cost and Count Management
        function updateCostAndCount() {
            const partPrices = {
                // Colors
                'red': 15000, 'blue': 15000, 'black': 18000,
                // Rims
                'stock': 0, 'sport': 45000, 'chrome': 65000,
                // Spoilers
                'none': 0, 'subtle': 12000, 'racing': 25000,
                // Bumpers
                'stock': 0, 'sport': 35000,
                // Lights
                'stock': 0, 'led': 28000
            };

            // Calculate total cost
            let cost = 15000; // Base paint cost
            let count = 1; // Base modification

            // Add part costs
            Object.values(currentDesign.parts).forEach(partValue => {
                if (partPrices[partValue]) {
                    cost += partPrices[partValue];
                    if (partValue !== 'stock' && partValue !== 'none') {
                        count++;
                    }
                }
            });

            // Add option costs
            if (currentDesign.options.tintedWindows) {
                cost += 8000;
                count++;
            }
            if (currentDesign.options.racingStripes) {
                cost += 5000;
                count++;
            }
            if (currentDesign.options.underglow) {
                cost += 15000;
                count++;
            }

            totalCost = cost;
            modificationCount = count;

            // Update UI
            document.getElementById('totalCost').textContent = `Rs. ${cost.toLocaleString()}`;
            document.getElementById('modCount').textContent = count;
        }

        // Update right sidebar current selection
        function updateCurrentSelection(partType, partName) {
            const selectionText = document.getElementById('currentSelection');
            selectionText.textContent = `${partName} Selected`;
        }

        // Action Functions
        function captureImage() {
            showToast('📸 Design captured! Preparing download...');
            
            // In a real app, you'd use html2canvas or similar
            setTimeout(() => {
                showToast('✅ Image saved to downloads!');
            }, 1500);
        }

        function previewFullscreen() {
            const carCanvas = document.getElementById('carCanvas');
            
            // Create fullscreen preview
            const overlay = document.createElement('div');
            overlay.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 100vw;
                height: 100vh;
                background: rgba(0,0,0,0.9);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 9999;
                cursor: pointer;
            `;
            
            const clonedCanvas = carCanvas.cloneNode(true);
            clonedCanvas.style.transform = 'scale(1.5)';
            overlay.appendChild(clonedCanvas);
            
            overlay.onclick = () => overlay.remove();
            document.body.appendChild(overlay);
            
            showToast('👁️ Click anywhere to close preview');
        }

        function saveDesign() {
  const target = document.getElementById("previewContainer") || document.getElementById("carCanvas");
  if (!target) { showToast('Nothing to capture'); return; }

  // html2canvas must be loaded via CDN in page3.html
  if (typeof html2canvas === 'undefined') {
    showToast('html2canvas not loaded. Add its CDN before page3.js');
    return;
  }

  showToast('📸 Capturing image...');

  html2canvas(target, { useCORS: true, allowTaint: false }).then(canvas => {
    canvas.toBlob(function(blob) {
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = `${car || 'car'}_${model || 'design'}.png`;
      document.body.appendChild(link);
      link.click();
      link.remove();
      showToast('✅ Image downloaded (check Downloads folder)');
    }, 'image/png');
  }).catch(err => {
    console.error(err);
    showToast('Error capturing design. See console.');
  });
}

        function shareDesign() {
            const shareUrl = `https://mechmate.com/design/${generateShareId()}`;
            
            if (navigator.share) {
                navigator.share({
                    title: 'Check out my Honda Civic design!',
                    text: `I customized this Honda Civic on MechMate - Total cost: Rs. ${totalCost.toLocaleString()}`,
                    url: shareUrl
                });
            } else {
                // Fallback - copy to clipboard
                navigator.clipboard.writeText(shareUrl).then(() => {
                    showToast('🔗 Share link copied to clipboard!');
                });
            }
        }

        // Header Controls
        function undoChange() {
            showToast('↶ Undo - Feature coming soon!');
        }

        function redoChange() {
            showToast('↷ Redo - Feature coming soon!');
        }

        function resetToDefault() {
            if (confirm('Reset all modifications to default? This cannot be undone.')) {
                // Reset to default state
                currentDesign = {
                    carModel: 'civic',
                    color: '#3b82f6',
                    parts: {
                        rims: 'stock',
                        spoiler: 'none',
                        bumper: 'stock',
                        lights: 'stock'
                    },
                    options: {
                        tintedWindows: false,
                        racingStripes: false,
                        underglow: false,
                        brightness: 1,
                        zoom: 1
                    }
                };
                
                // Reset UI
                resetUIToDefault();
                updateCarDisplay();
                updateCostAndCount();
                showToast('🔄 Design reset to default');
            }
        }

        function resetUIToDefault() {
            // Reset all part selections to default
            document.querySelectorAll('.part-option').forEach(option => {
                option.classList.remove('selected');
            });
            
            // Select default options
            document.querySelectorAll('.part-option').forEach(option => {
                const partName = option.querySelector('.part-name').textContent;
                if (partName.includes('Stock') || partName.includes('No ') || partName.includes('Ocean Blue')) {
                    option.classList.add('selected');
                }
            });
            
            // Reset toggles
            document.querySelectorAll('.toggle-switch.active').forEach(toggle => {
                toggle.classList.remove('active');
            });
            
            // Reset sliders
            document.querySelectorAll('.option-slider').forEach(slider => {
                slider.value = slider.defaultValue || 1;
            });
            
            // Reset color selection
            applyColor('#3b82f6');
        }

        function goBack() {
            if (confirm('Are you sure you want to go back? Unsaved changes will be lost.')) {
                showToast('← Going back to car selection...');
                window.location.href = '../HTML/page2.html';
                // In real app: navigate back
            }
        }

        // Utility Functions
        function generateShareId() {
            return Math.random().toString(36).substr(2, 9);
        }

        function showToast(message) {
            // Create toast notification
            const toast = document.createElement('div');
            toast.style.cssText = `
                position: fixed;
                top: 100px;
                right: 20px;
                background: #1f2937;
                color: white;
                padding: 1rem 1.5rem;
                border-radius: 8px;
                box-shadow: 0 10px 25px rgba(0,0,0,0.2);
                z-index: 10000;
                animation: slideInRight 0.3s ease;
            `;
            toast.textContent = message;
            
            // Add animation keyframes if not already added
            if (!document.querySelector('#toast-styles')) {
                const style = document.createElement('style');
                style.id = 'toast-styles';
                style.textContent = `
                    @keyframes slideInRight {
                        from { transform: translateX(100%); opacity: 0; }
                        to { transform: translateX(0); opacity: 1; }
                    }
                    @keyframes slideOutRight {
                        from { transform: translateX(0); opacity: 1; }
                        to { transform: translateX(100%); opacity: 0; }
                    }
                `;
                document.head.appendChild(style);
            }
            
            document.body.appendChild(toast);
            
            // Auto remove after 3 seconds
            setTimeout(() => {
                toast.style.animation = 'slideOutRight 0.3s ease';
                setTimeout(() => toast.remove(), 300);
            }, 3000);
        }

        // Initialize the app
        document.addEventListener('DOMContentLoaded', () => {
            // Initialize with default design
            updateCarDisplay();
            updateCostAndCount();
            
            // Set initial color selection
            applyColor(currentDesign.color);
            
            showToast('🚗 Welcome to MechMate Studio!');
        });

        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            if (e.ctrlKey || e.metaKey) {
                switch(e.key) {
                    case 's':
                        e.preventDefault();
                        saveDesign();
                        break;
                    case 'z':
                        e.preventDefault();
                        undoChange();
                        break;
                    case 'y':
                        e.preventDefault();
                        redoChange();
                        break;
                }
            }
            
            // Other shortcuts
            switch(e.key) {
                case 'Escape':
                    goBack();
                    break;
                case ' ':
                    e.preventDefault();
                    previewFullscreen();
                    break;
            }
        });