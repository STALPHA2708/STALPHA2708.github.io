// Enhanced Project Navigation
class ProjectNavigation {
    constructor() {
        this.currentIndex = 0;
        this.totalProjects = 0;
        this.init();
    }

    init() {
        this.addNavigationDots();
        this.addKeyboardNavigation();
        this.addTouchNavigation();
        this.addProjectCounter();
    }

    addNavigationDots() {
        // Wait for projects to be loaded
        setTimeout(() => {
            const cardStack = document.querySelector('.card-stack');
            const cards = document.querySelectorAll('.card-stack .card');
            this.totalProjects = cards.length;

            if (this.totalProjects > 1) {
                // Create navigation container
                const navContainer = document.createElement('div');
                navContainer.className = 'project-navigation';
                navContainer.innerHTML = `
                    <div class="project-dots">
                        ${Array.from({ length: this.totalProjects }, (_, i) => 
                            `<button class="nav-dot ${i === 0 ? 'active' : ''}" data-index="${i}" aria-label="Go to project ${i + 1}"></button>`
                        ).join('')}
                    </div>
                    <div class="project-counter">
                        <span class="current">1</span> / <span class="total">${this.totalProjects}</span>
                    </div>
                `;

                // Add styles
                this.addNavigationStyles();

                // Insert after card stack
                cardStack.parentNode.insertBefore(navContainer, cardStack.nextSibling);

                // Add click handlers
                this.addDotClickHandlers();
            }
        }, 500);
    }

    addNavigationStyles() {
        if (!document.querySelector('#project-navigation-styles')) {
            const style = document.createElement('style');
            style.id = 'project-navigation-styles';
            style.textContent = `
                .project-navigation {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    margin-top: 3rem;
                    gap: 1rem;
                }

                .project-dots {
                    display: flex;
                    gap: 1rem;
                    justify-content: center;
                }

                .nav-dot {
                    width: 12px;
                    height: 12px;
                    border-radius: 50%;
                    border: 2px solid #3498db;
                    background: transparent;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    position: relative;
                }

                .nav-dot:hover {
                    transform: scale(1.2);
                    box-shadow: 0 0 0 4px rgba(52, 152, 219, 0.2);
                }

                .nav-dot.active {
                    background: #3498db;
                    transform: scale(1.3);
                    box-shadow: 0 0 0 4px rgba(52, 152, 219, 0.3);
                }

                .project-counter {
                    font-size: 1.1rem;
                    color: #666;
                    font-weight: 500;
                    font-family: 'Space Grotesk', sans-serif;
                }

                .project-counter .current {
                    color: #3498db;
                    font-weight: 700;
                    font-size: 1.3rem;
                }

                /* Dark mode styles */
                .dark-mode .nav-dot {
                    border-color: #3498db;
                }

                .dark-mode .nav-dot.active {
                    background: #3498db;
                }

                .dark-mode .project-counter {
                    color: #ccc;
                }

                .dark-mode .project-counter .current {
                    color: #3498db;
                }

                /* Add instruction text */
                .project-navigation::after {
                    content: 'Click cards or use arrow keys to navigate';
                    font-size: 0.9rem;
                    color: #999;
                    margin-top: 0.5rem;
                    font-style: italic;
                }

                .dark-mode .project-navigation::after {
                    color: #777;
                }

                @media (max-width: 768px) {
                    .project-navigation::after {
                        content: 'Tap cards to navigate';
                    }
                }
            `;
            document.head.appendChild(style);
        }
    }

    addDotClickHandlers() {
        const dots = document.querySelectorAll('.nav-dot');
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                this.navigateToProject(index);
            });
        });
    }

    addKeyboardNavigation() {
        document.addEventListener('keydown', (e) => {
            const projectsSection = document.querySelector('#projects');
            const rect = projectsSection.getBoundingClientRect();
            
            // Only handle keyboard navigation when projects section is visible
            if (rect.top < window.innerHeight && rect.bottom > 0) {
                if (e.key === 'ArrowLeft') {
                    e.preventDefault();
                    this.navigateToPrevious();
                } else if (e.key === 'ArrowRight') {
                    e.preventDefault();
                    this.navigateToNext();
                }
            }
        });
    }

    addTouchNavigation() {
        const cardStack = document.querySelector('.card-stack');
        let startX = 0;
        let startY = 0;

        cardStack.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
            startY = e.touches[0].clientY;
        });

        cardStack.addEventListener('touchend', (e) => {
            const endX = e.changedTouches[0].clientX;
            const endY = e.changedTouches[0].clientY;
            const diffX = startX - endX;
            const diffY = startY - endY;

            // Only handle horizontal swipes
            if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 50) {
                if (diffX > 0) {
                    this.navigateToNext(); // Swipe left = next
                } else {
                    this.navigateToPrevious(); // Swipe right = previous
                }
            }
        });
    }

    addProjectCounter() {
        // Add click instruction
        setTimeout(() => {
            const cardStack = document.querySelector('.card-stack');
            if (cardStack && this.totalProjects > 1) {
                cardStack.style.cursor = 'pointer';
                cardStack.title = 'Click to view next project';
            }
        }, 500);
    }

    navigateToProject(index) {
        if (index < 0 || index >= this.totalProjects) return;

        const cards = document.querySelectorAll('.card-stack .card');
        const dots = document.querySelectorAll('.nav-dot');
        const counter = document.querySelector('.project-counter .current');

        // Remove active class from all cards and dots
        cards.forEach(card => card.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));

        // Add active class to current card and dot
        cards[index].classList.add('active');
        if (dots[index]) dots[index].classList.add('active');

        // Update counter
        if (counter) counter.textContent = index + 1;

        this.currentIndex = index;

        // Add a subtle animation
        cards[index].style.transform = 'translateY(0) scale(1.02)';
        setTimeout(() => {
            cards[index].style.transform = 'translateY(0) scale(1)';
        }, 200);
    }

    navigateToNext() {
        const nextIndex = (this.currentIndex + 1) % this.totalProjects;
        this.navigateToProject(nextIndex);
    }

    navigateToPrevious() {
        const prevIndex = (this.currentIndex - 1 + this.totalProjects) % this.totalProjects;
        this.navigateToProject(prevIndex);
    }
}

// Initialize project navigation when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new ProjectNavigation();
});

// Auto-advance projects every 10 seconds (optional)
document.addEventListener('DOMContentLoaded', () => {
    let autoAdvance = null;
    const cardStack = document.querySelector('.card-stack');
    
    const startAutoAdvance = () => {
        autoAdvance = setInterval(() => {
            const navigation = window.projectNavigation || new ProjectNavigation();
            navigation.navigateToNext();
        }, 10000);
    };

    const stopAutoAdvance = () => {
        if (autoAdvance) {
            clearInterval(autoAdvance);
            autoAdvance = null;
        }
    };

    // Pause auto-advance on hover
    if (cardStack) {
        cardStack.addEventListener('mouseenter', stopAutoAdvance);
        cardStack.addEventListener('mouseleave', startAutoAdvance);
        
        // Start auto-advance initially
        setTimeout(startAutoAdvance, 3000);
    }

    // Store reference globally
    window.projectNavigation = new ProjectNavigation();
});
