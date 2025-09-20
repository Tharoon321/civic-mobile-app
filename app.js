// CivicReport PWA JavaScript
class CivicReportApp {
    constructor() {
        this.currentScreen = 'homeScreen';
        this.currentStep = 1;
        this.reportData = {
            photo: null,
            category: null,
            location: '',
            description: '',
            priority: 'Medium'
        };
        
        this.userReports = [
            {
                id: "CIV001",
                title: "Broken streetlight on Main Street",
                category: "Street Lighting",
                status: "In Progress",
                dateReported: "2025-09-18",
                location: "Main Street & 5th Avenue",
                photo: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=300&h=200&fit=crop",
                description: "The streetlight has been broken for 3 days",
                priority: "High"
            },
            {
                id: "CIV007", 
                title: "Graffiti on park bench",
                category: "Parks & Recreation",
                status: "Resolved",
                dateReported: "2025-09-10",
                location: "Central Park - Bench #23",
                photo: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=300&h=200&fit=crop",
                description: "Vandalism on wooden bench needs cleaning",
                priority: "Low"
            },
            {
                id: "CIV012",
                title: "Blocked storm drain",
                category: "Water & Sanitation", 
                status: "Pending",
                dateReported: "2025-09-19",
                location: "Oak Street corner",
                photo: "https://images.unsplash.com/photo-1583947215259-38e31be8751f?w=300&h=200&fit=crop",
                description: "Storm drain clogged with leaves and debris",
                priority: "Medium"
            }
        ];

        this.nearbyIssues = [
            {
                id: "CIV002",
                title: "Pothole on Oak Road", 
                category: "Roads & Transport",
                status: "In Progress",
                location: "Oak Road near Park Avenue",
                priority: "Medium",
                reportedBy: "Sarah Johnson"
            },
            {
                id: "CIV004",
                title: "Overflowing garbage bins",
                category: "Waste Management",
                status: "Pending", 
                location: "Central Park Entrance",
                priority: "Medium",
                reportedBy: "Lisa Chen"
            },
            {
                id: "CIV005",
                title: "Damaged playground equipment",
                category: "Parks & Recreation",
                status: "In Progress",
                location: "Riverside Park", 
                priority: "High",
                reportedBy: "David Wilson"
            }
        ];
        
        console.log('CivicReport App constructor completed');
    }

    init() {
        console.log('Initializing CivicReport App...');
        this.setup();
        console.log('App initialization complete');
    }

    setup() {
        console.log('Setting up app...');
        this.populateReports();
        this.populateNearbyIssues();
        this.setupPhotoUpload();
        
        // Make sure home screen is visible initially
        this.switchScreen('homeScreen');
        console.log('App setup complete');
    }

    setupPhotoUpload() {
        const photoInput = document.getElementById('photoInput');
        if (photoInput) {
            photoInput.addEventListener('change', (e) => {
                const file = e.target.files[0];
                if (file) {
                    const reader = new FileReader();
                    reader.onload = (e) => {
                        const previewImage = document.getElementById('previewImage');
                        const photoPreview = document.getElementById('photoPreview');
                        const photoPlaceholder = document.getElementById('photoPlaceholder');
                        
                        if (previewImage && photoPreview && photoPlaceholder) {
                            previewImage.src = e.target.result;
                            photoPlaceholder.style.display = 'none';
                            photoPreview.style.display = 'block';
                            this.reportData.photo = e.target.result;
                        }
                    };
                    reader.readAsDataURL(file);
                }
            });
        }
    }

    switchScreen(screenId) {
        console.log('Switching to screen:', screenId);

        // Hide all screens first
        const allScreens = ['homeScreen', 'reportScreen', 'reportsScreen', 'mapScreen', 'profileScreen'];
        allScreens.forEach(screen => {
            const element = document.getElementById(screen);
            if (element) {
                element.classList.remove('active');
                element.style.display = 'none';
            }
        });

        // Show target screen
        const targetScreen = document.getElementById(screenId);
        if (targetScreen) {
            targetScreen.classList.add('active');
            targetScreen.style.display = 'block';
            console.log('Successfully switched to screen:', screenId);
        } else {
            console.error('Target screen not found:', screenId);
            return false;
        }

        // Update navigation active state
        const navItems = document.querySelectorAll('.nav-item');
        navItems.forEach(item => {
            item.classList.remove('active');
            const onclickAttr = item.getAttribute('onclick');
            if (onclickAttr && onclickAttr.includes(`'${screenId}'`)) {
                item.classList.add('active');
            }
        });

        this.currentScreen = screenId;

        // Reset report form when switching away from it
        if (screenId !== 'reportScreen') {
            this.resetReportForm();
        }

        return true;
    }

    nextStep() {
        console.log('Next step called, current step:', this.currentStep);
        
        if (this.currentStep >= 3) {
            console.log('Already at final step');
            return;
        }

        // Hide current step
        const currentStepElement = document.getElementById(`step${this.currentStep}`);
        if (currentStepElement) {
            currentStepElement.classList.remove('active');
            currentStepElement.style.display = 'none';
        }
        
        // Move to next step
        this.currentStep++;
        console.log('Moving to step:', this.currentStep);
        
        // Show next step
        const nextStepElement = document.getElementById(`step${this.currentStep}`);
        if (nextStepElement) {
            nextStepElement.classList.add('active');
            nextStepElement.style.display = 'block';
            console.log('Step', this.currentStep, 'is now visible and active');
        } else {
            console.error('Next step element not found:', `step${this.currentStep}`);
        }
    }

    prevStep() {
        console.log('Previous step called, current step:', this.currentStep);
        
        if (this.currentStep <= 1) {
            console.log('Already at first step');
            return;
        }

        // Hide current step
        const currentStepElement = document.getElementById(`step${this.currentStep}`);
        if (currentStepElement) {
            currentStepElement.classList.remove('active');
            currentStepElement.style.display = 'none';
        }
        
        // Move to previous step
        this.currentStep--;
        console.log('Moving to step:', this.currentStep);
        
        // Show previous step
        const prevStepElement = document.getElementById(`step${this.currentStep}`);
        if (prevStepElement) {
            prevStepElement.classList.add('active');
            prevStepElement.style.display = 'block';
            console.log('Step', this.currentStep, 'is now visible and active');
        }
    }

    selectCategory(category, element) {
        console.log('Category selected:', category);
        
        // Remove selection from all categories
        document.querySelectorAll('.category-item').forEach(item => {
            item.classList.remove('selected');
        });
        
        // Add selection to clicked category
        if (element) {
            element.classList.add('selected');
        }
        
        this.reportData.category = category;
        
        // Enable next button
        const nextBtn = document.getElementById('nextStep2');
        if (nextBtn) {
            nextBtn.disabled = false;
            console.log('Next button enabled');
        }
    }

    removePhoto() {
        const photoInput = document.getElementById('photoInput');
        const photoPlaceholder = document.getElementById('photoPlaceholder');
        const photoPreview = document.getElementById('photoPreview');
        
        if (photoInput) photoInput.value = '';
        if (photoPlaceholder) photoPlaceholder.style.display = 'block';
        if (photoPreview) photoPreview.style.display = 'none';
        
        this.reportData.photo = null;
    }

    getCurrentLocation() {
        if (navigator.geolocation) {
            this.showToast('Getting your location...');
            
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const locationInput = document.getElementById('locationInput');
                    if (locationInput) {
                        locationInput.value = `Current Location (${position.coords.latitude.toFixed(4)}, ${position.coords.longitude.toFixed(4)})`;
                        this.reportData.location = locationInput.value;
                    }
                    this.showToast('Location detected successfully!');
                },
                (error) => {
                    this.showToast('Unable to get your location. Please enter manually.');
                }
            );
        } else {
            this.showToast('Geolocation is not supported by this browser.');
        }
    }

    submitReport(event) {
        if (event) {
            event.preventDefault();
        }
        
        console.log('Submit report called');
        
        // Collect form data
        const locationInput = document.getElementById('locationInput');
        const descriptionInput = document.getElementById('descriptionInput');
        const prioritySelect = document.getElementById('prioritySelect');

        if (locationInput) this.reportData.location = locationInput.value;
        if (descriptionInput) this.reportData.description = descriptionInput.value;
        if (prioritySelect) this.reportData.priority = prioritySelect.value;

        // Validate required fields
        if (!this.reportData.category) {
            this.showToast('Please select a category');
            return;
        }

        if (!this.reportData.location) {
            this.showToast('Please provide a location');
            return;
        }

        if (!this.reportData.description) {
            this.showToast('Please provide a description');
            return;
        }

        // Show loading
        this.showLoading();

        // Simulate API call
        setTimeout(() => {
            this.hideLoading();
            
            // Create new report
            const newReport = {
                id: `CIV${String(Math.floor(Math.random() * 1000)).padStart(3, '0')}`,
                title: this.generateReportTitle(),
                category: this.reportData.category,
                status: 'Pending',
                dateReported: new Date().toISOString().split('T')[0],
                location: this.reportData.location,
                photo: this.reportData.photo,
                description: this.reportData.description,
                priority: this.reportData.priority
            };

            // Add to reports list
            this.userReports.unshift(newReport);
            this.populateReports();

            // Show success
            this.showModal('successModal');
        }, 2000);
    }

    generateReportTitle() {
        const categoryTitles = {
            'Roads & Transport': 'Road issue reported',
            'Water & Sanitation': 'Water/sanitation issue reported',
            'Street Lighting': 'Street lighting issue reported',
            'Waste Management': 'Waste management issue reported',
            'Parks & Recreation': 'Parks issue reported',
            'Public Safety': 'Public safety issue reported',
            'Electricity': 'Electrical issue reported',
            'Building & Construction': 'Building issue reported'
        };
        
        return categoryTitles[this.reportData.category] || 'Issue reported';
    }

    resetReportForm() {
        console.log('Resetting report form');
        this.currentStep = 1;
        
        // Reset all form steps
        for (let i = 1; i <= 3; i++) {
            const step = document.getElementById(`step${i}`);
            if (step) {
                step.classList.remove('active');
                step.style.display = i === 1 ? 'block' : 'none';
            }
        }
        
        // Make step 1 active
        const step1 = document.getElementById('step1');
        if (step1) {
            step1.classList.add('active');
            step1.style.display = 'block';
        }
        
        // Reset form data
        this.reportData = {
            photo: null,
            category: null,
            location: '',
            description: '',
            priority: 'Medium'
        };

        // Reset UI elements
        this.removePhoto();
        document.querySelectorAll('.category-item').forEach(item => item.classList.remove('selected'));
        
        const nextStep2 = document.getElementById('nextStep2');
        const locationInput = document.getElementById('locationInput');
        const descriptionInput = document.getElementById('descriptionInput');
        const prioritySelect = document.getElementById('prioritySelect');

        if (nextStep2) nextStep2.disabled = true;
        if (locationInput) locationInput.value = '';
        if (descriptionInput) descriptionInput.value = '';
        if (prioritySelect) prioritySelect.value = 'Medium';
        
        console.log('Form reset complete');
    }

    populateReports() {
        const reportsList = document.getElementById('reportsList');
        if (!reportsList) return;

        reportsList.innerHTML = this.userReports.map(report => `
            <div class="report-card" data-status="${report.status.toLowerCase().replace(' ', '-')}">
                <div class="report-status status-${report.status.toLowerCase().replace(' ', '-')}">${report.status}</div>
                <h4>${report.title}</h4>
                <p class="report-location">📍 ${report.location}</p>
                ${report.photo ? `<img src="${report.photo}" alt="Report photo" style="width: 100%; height: 120px; object-fit: cover; border-radius: 8px; margin: 8px 0;">` : ''}
                <p style="color: var(--color-text-secondary); margin: 8px 0;">${report.description}</p>
                <div class="report-meta">
                    <span class="report-category">${this.getCategoryIcon(report.category)} ${report.category}</span>
                    <span class="report-date">${this.formatDate(report.dateReported)}</span>
                </div>
                <div style="margin-top: 12px;">
                    <span class="status priority-${report.priority.toLowerCase()}" style="background: var(--color-bg-${report.priority === 'High' ? '4' : report.priority === 'Medium' ? '2' : '3'}); padding: 4px 8px; border-radius: 12px; font-size: 12px;">${report.priority} Priority</span>
                </div>
            </div>
        `).join('');
    }

    populateNearbyIssues() {
        const nearbyList = document.getElementById('nearbyIssuesList');
        if (!nearbyList) return;

        nearbyList.innerHTML = this.nearbyIssues.map(issue => `
            <div class="report-card">
                <div class="report-status status-${issue.status.toLowerCase().replace(' ', '-')}">${issue.status}</div>
                <h4>${issue.title}</h4>
                <p class="report-location">📍 ${issue.location}</p>
                <div class="report-meta">
                    <span class="report-category">${this.getCategoryIcon(issue.category)} ${issue.category}</span>
                    <span class="report-date">by ${issue.reportedBy}</span>
                </div>
                <div style="margin-top: 12px;">
                    <span class="status priority-${issue.priority.toLowerCase()}" style="background: var(--color-bg-${issue.priority === 'High' ? '4' : issue.priority === 'Medium' ? '2' : '3'}); padding: 4px 8px; border-radius: 12px; font-size: 12px;">${issue.priority} Priority</span>
                </div>
            </div>
        `).join('');
    }

    filterReports(filter, element) {
        // Update active tab
        document.querySelectorAll('.filter-tab').forEach(tab => tab.classList.remove('active'));
        if (element) {
            element.classList.add('active');
        }

        // Filter reports
        const reports = document.querySelectorAll('#reportsList .report-card');
        reports.forEach(report => {
            const status = report.dataset.status;
            if (filter === 'all' || 
                (filter === 'pending' && status === 'pending') ||
                (filter === 'progress' && status === 'in-progress') ||
                (filter === 'resolved' && status === 'resolved')) {
                report.style.display = 'block';
            } else {
                report.style.display = 'none';
            }
        });
    }

    getCategoryIcon(category) {
        const icons = {
            'Roads & Transport': '🚗',
            'Water & Sanitation': '💧',
            'Street Lighting': '💡',
            'Waste Management': '🗑️',
            'Parks & Recreation': '🌳',
            'Public Safety': '🚨',
            'Electricity': '⚡',
            'Building & Construction': '🏗️'
        };
        return icons[category] || '📋';
    }

    formatDate(dateString) {
        const date = new Date(dateString);
        const options = { month: 'short', day: 'numeric' };
        return date.toLocaleDateString('en-US', options);
    }

    showEmergencyContacts() {
        // Switch to home and scroll to emergency contacts
        this.switchScreen('homeScreen');
        setTimeout(() => {
            const emergencySection = document.querySelector('.emergency-contacts');
            if (emergencySection) {
                emergencySection.scrollIntoView({ behavior: 'smooth' });
            }
        }, 100);
    }

    showModal(modalId) {
        console.log('Showing modal:', modalId);
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.style.display = 'flex';
            document.body.style.overflow = 'hidden';
            console.log('Modal shown successfully');
        } else {
            console.error('Modal not found:', modalId);
        }
    }

    hideModal(modalId) {
        console.log('Hiding modal:', modalId);
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.style.display = 'none';
            document.body.style.overflow = '';
            console.log('Modal hidden successfully');
        }
    }

    showLoading() {
        const loadingOverlay = document.getElementById('loadingOverlay');
        if (loadingOverlay) {
            loadingOverlay.style.display = 'flex';
        }
    }

    hideLoading() {
        const loadingOverlay = document.getElementById('loadingOverlay');
        if (loadingOverlay) {
            loadingOverlay.style.display = 'none';
        }
    }

    showToast(message) {
        console.log('Showing toast:', message);
        
        // Remove existing toasts
        const existingToasts = document.querySelectorAll('.toast');
        existingToasts.forEach(toast => toast.remove());

        // Create toast element
        const toast = document.createElement('div');
        toast.className = 'toast';
        toast.style.cssText = `
            position: fixed;
            top: 80px;
            left: 50%;
            transform: translateX(-50%);
            background: var(--color-surface);
            color: var(--color-text);
            padding: 12px 20px;
            border-radius: 8px;
            box-shadow: var(--shadow-lg);
            z-index: 3000;
            opacity: 0;
            transition: opacity 0.3s ease;
            border: 1px solid var(--color-border);
            max-width: 90%;
            text-align: center;
        `;
        toast.textContent = message;
        
        document.body.appendChild(toast);
        
        // Show toast
        requestAnimationFrame(() => {
            toast.style.opacity = '1';
        });
        
        // Hide and remove toast
        setTimeout(() => {
            toast.style.opacity = '0';
            setTimeout(() => {
                if (document.body.contains(toast)) {
                    document.body.removeChild(toast);
                }
            }, 300);
        }, 3000);
    }

    handleLogout() {
        if (confirm('Are you sure you want to sign out?')) {
            this.showToast('Signed out successfully');
            // In a real app, you would handle authentication here
        }
    }
}

// Global initialization
console.log('Script loaded, setting up global app...');

// Initialize immediately if DOM is ready
function initializeApp() {
    console.log('Initializing app globally...');
    window.civicApp = new CivicReportApp();
    window.civicApp.init();
    console.log('Global app initialization complete');
}

// Multiple initialization strategies to ensure it works
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeApp);
} else {
    initializeApp();
}

// Backup initialization after a short delay
setTimeout(() => {
    if (!window.civicApp) {
        console.log('Backup initialization triggered');
        initializeApp();
    }
}, 100);

// Service Worker Registration for PWA
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then((registration) => {
                console.log('SW registered: ', registration);
            })
            .catch((registrationError) => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}

// Handle back button for mobile browsers
window.addEventListener('popstate', (event) => {
    if (window.civicApp && window.civicApp.currentScreen !== 'homeScreen') {
        window.civicApp.switchScreen('homeScreen');
    }
});

// Handle online/offline status
window.addEventListener('online', () => {
    if (window.civicApp) {
        window.civicApp.showToast('You are back online!');
    }
});

window.addEventListener('offline', () => {
    if (window.civicApp) {
        window.civicApp.showToast('You are now offline. Reports will be submitted when connection is restored.');
    }
});

// Touch gestures for better mobile experience
let touchStartX = 0;
let touchStartY = 0;

document.addEventListener('touchstart', (e) => {
    touchStartX = e.touches[0].clientX;
    touchStartY = e.touches[0].clientY;
}, { passive: true });

document.addEventListener('touchend', (e) => {
    if (!touchStartX || !touchStartY) return;
    
    const touchEndX = e.changedTouches[0].clientX;
    const touchEndY = e.changedTouches[0].clientY;
    
    const deltaX = touchStartX - touchEndX;
    const deltaY = touchStartY - touchEndY;
    
    // Handle horizontal swipes for navigation (optional enhancement)
    if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 50) {
        // Could implement swipe navigation here if desired
    }
    
    touchStartX = 0;
    touchStartY = 0;
});