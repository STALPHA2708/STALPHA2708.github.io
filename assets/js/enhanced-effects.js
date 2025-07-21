// Enhanced Parallax and 3D Effects
class EnhancedEffects {
    constructor() {
        this.scrollPosition = 0;
        this.ticking = false;
        this.init();
    }

    init() {
        this.setupParallaxElements();
        this.setup3DCards();
        this.setupScrollEffects();
        this.setupTypewriterEffect();
        this.setupCounterAnimations();
        this.addEventListeners();
    }

    setupParallaxElements() {
        // Add parallax classes to various elements
        const parallaxElements = [
            { selector: '#particles-js', speed: 0.2 },
            { selector: '.home .image', speed: 0.1 },
            { selector: '.home .content', speed: 0.05 },
            { selector: '.skills-background', speed: 0.3 },
            { selector: '.about .image img', speed: 0.15 }
        ];

        parallaxElements.forEach(({ selector, speed }) => {
            const element = document.querySelector(selector);
            if (element) {
                element.setAttribute('data-speed', speed);
                element.classList.add('parallax-element');
            }
        });
    }

    setup3DCards() {
        const cards = document.querySelectorAll('.card, .project-box, .skill-bubble');
        
        cards.forEach(card => {
            card.addEventListener('mousemove', (e) => {
                this.handle3DMouseMove(e, card);
            });

            card.addEventListener('mouseleave', () => {
                this.reset3DTransform(card);
            });

            card.addEventListener('mouseenter', () => {
                card.style.willChange = 'transform';
            });
        });
    }

    handle3DMouseMove(e, element) {
        const rect = element.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / centerY * -15;
        const rotateY = (x - centerX) / centerX * 15;
        
        element.style.transform = `
            perspective(1000px) 
            rotateX(${rotateX}deg) 
            rotateY(${rotateY}deg) 
            translateZ(20px)
            scale3d(1.02, 1.02, 1.02)
        `;

        // Add glow effect based on mouse position
        const glowX = (x / rect.width) * 100;
        const glowY = (y / rect.height) * 100;
        element.style.background = `
            radial-gradient(circle at ${glowX}% ${glowY}%, 
            rgba(102, 126, 234, 0.1) 0%, 
            transparent 50%), 
            ${getComputedStyle(element).background}
        `;
    }

    reset3DTransform(element) {
        element.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px) scale3d(1, 1, 1)';
        element.style.willChange = 'auto';
        
        // Reset background
        setTimeout(() => {
            element.style.background = '';
        }, 300);
    }

    setupScrollEffects() {
        window.addEventListener('scroll', () => {
            if (!this.ticking) {
                requestAnimationFrame(() => {
                    this.updateParallax();
                    this.updateScrollProgress();
                    this.ticking = false;
                });
                this.ticking = true;
            }
        });

        // Add scroll progress indicator
        this.createScrollProgress();
    }

    updateParallax() {
        this.scrollPosition = window.pageYOffset;
        
        const parallaxElements = document.querySelectorAll('.parallax-element');
        parallaxElements.forEach(element => {
            const speed = parseFloat(element.getAttribute('data-speed')) || 0.1;
            const yPos = -(this.scrollPosition * speed);
            element.style.transform = `translate3d(0, ${yPos}px, 0)`;
        });

        // Parallax for sections
        const sections = document.querySelectorAll('section');
        sections.forEach((section, index) => {
            const rect = section.getBoundingClientRect();
            const speed = (index + 1) * 0.02;
            
            if (rect.top < window.innerHeight && rect.bottom > 0) {
                const yPos = -(this.scrollPosition * speed);
                section.style.transform = `translate3d(0, ${yPos}px, 0)`;
            }
        });
    }

    createScrollProgress() {
        const progressBar = document.createElement('div');
        progressBar.className = 'scroll-progress';
        progressBar.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 0%;
            height: 3px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            z-index: 10000;
            transition: width 0.3s ease;
            box-shadow: 0 0 10px rgba(102, 126, 234, 0.5);
        `;
        document.body.appendChild(progressBar);
    }

    updateScrollProgress() {
        const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrolled = (this.scrollPosition / scrollHeight) * 100;
        
        const progressBar = document.querySelector('.scroll-progress');
        if (progressBar) {
            progressBar.style.width = `${Math.min(scrolled, 100)}%`;
        }
    }

    setupTypewriterEffect() {
        // Enhanced typewriter effect for headings
        const headings = document.querySelectorAll('h2.heading, h3');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !entry.target.classList.contains('typewriter-done')) {
                    this.typeWriterEffect(entry.target);
                }
            });
        }, { threshold: 0.5 });

        headings.forEach(heading => {
            observer.observe(heading);
        });
    }

    typeWriterEffect(element) {
        const text = element.textContent;
        element.textContent = '';
        element.classList.add('typewriter-done');
        
        let i = 0;
        const typeInterval = setInterval(() => {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
            } else {
                clearInterval(typeInterval);
                element.classList.add('typewriter-complete');
            }
        }, 50);
    }

    setupCounterAnimations() {
        // Animated counters for statistics
        const createCounter = (element, start, end, duration = 2000) => {
            const startTime = performance.now();
            
            const animate = (currentTime) => {
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);
                
                const current = Math.floor(start + (end - start) * this.easeOutCubic(progress));
                element.textContent = current;
                
                if (progress < 1) {
                    requestAnimationFrame(animate);
                }
            };
            
            requestAnimationFrame(animate);
        };

        // Add some stats to the about section
        this.addStatsSection();
    }

    addStatsSection() {
        const aboutSection = document.querySelector('#about .content');
        if (!aboutSection) return;

        const statsHTML = `
            <div class="stats-container" style="
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
                gap: 1rem;
                margin: 2rem 0;
                padding: 2rem;
                background: rgba(255, 255, 255, 0.1);
                backdrop-filter: blur(20px);
                border-radius: 20px;
                border: 1px solid rgba(255, 255, 255, 0.2);
            ">
                <div class="stat-item" style="text-align: center;">
                    <div class="stat-number" data-count="50" style="font-size: 2rem; font-weight: bold; color: #667eea;">0</div>
                    <div class="stat-label" style="font-size: 0.9rem; color: #666;">Projects</div>
                </div>
                <div class="stat-item" style="text-align: center;">
                    <div class="stat-number" data-count="5" style="font-size: 2rem; font-weight: bold; color: #667eea;">0</div>
                    <div class="stat-label" style="font-size: 0.9rem; color: #666;">Years Experience</div>
                </div>
                <div class="stat-item" style="text-align: center;">
                    <div class="stat-number" data-count="15" style="font-size: 2rem; font-weight: bold; color: #667eea;">0</div>
                    <div class="stat-label" style="font-size: 0.9rem; color: #666;">Technologies</div>
                </div>
                <div class="stat-item" style="text-align: center;">
                    <div class="stat-number" data-count="100" style="font-size: 2rem; font-weight: bold; color: #667eea;">0</div>
                    <div class="stat-label" style="font-size: 0.9rem; color: #666;">Success Rate %</div>
                </div>
            </div>
        `;

        aboutSection.insertAdjacentHTML('beforeend', statsHTML);

        // Animate counters when visible
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const counters = entry.target.querySelectorAll('.stat-number');
                    counters.forEach(counter => {
                        const target = parseInt(counter.getAttribute('data-count'));
                        this.animateCounter(counter, 0, target, 1500);
                    });
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        const statsContainer = document.querySelector('.stats-container');
        if (statsContainer) {
            observer.observe(statsContainer);
        }
    }

    animateCounter(element, start, end, duration) {
        const startTime = performance.now();
        
        const animate = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            const current = Math.floor(start + (end - start) * this.easeOutCubic(progress));
            element.textContent = current;
            
            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        };
        
        requestAnimationFrame(animate);
    }

    easeOutCubic(t) {
        return 1 - Math.pow(1 - t, 3);
    }

    addEventListeners() {
        // Mouse move for global parallax
        document.addEventListener('mousemove', (e) => {
            this.handleGlobalMouseMove(e);
        });

        // Add floating elements animation
        this.createFloatingElements();
    }

    handleGlobalMouseMove(e) {
        const x = (e.clientX - window.innerWidth / 2) / window.innerWidth;
        const y = (e.clientY - window.innerHeight / 2) / window.innerHeight;

        // Move background elements based on mouse position
        const backgrounds = document.querySelectorAll('.home::before, .skills-background');
        backgrounds.forEach(bg => {
            if (bg) {
                const moveX = x * 20;
                const moveY = y * 20;
                bg.style.transform = `translate(${moveX}px, ${moveY}px)`;
            }
        });
    }

    createFloatingElements() {
        // Create floating geometric shapes
        const shapes = ['circle', 'triangle', 'square'];
        const colors = ['#667eea', '#764ba2', '#ff6b6b', '#4ecdc4'];

        for (let i = 0; i < 10; i++) {
            const shape = document.createElement('div');
            const shapeType = shapes[Math.floor(Math.random() * shapes.length)];
            const color = colors[Math.floor(Math.random() * colors.length)];
            
            shape.className = `floating-shape floating-${shapeType}`;
            shape.style.cssText = `
                position: fixed;
                width: ${10 + Math.random() * 20}px;
                height: ${10 + Math.random() * 20}px;
                background: ${color};
                opacity: 0.1;
                border-radius: ${shapeType === 'circle' ? '50%' : '0'};
                top: ${Math.random() * 100}vh;
                left: ${Math.random() * 100}vw;
                animation: floatAround ${10 + Math.random() * 20}s linear infinite;
                z-index: -1;
                pointer-events: none;
            `;

            document.body.appendChild(shape);
        }

        // Add CSS for floating animation
        if (!document.querySelector('#floating-animation-styles')) {
            const style = document.createElement('style');
            style.id = 'floating-animation-styles';
            style.textContent = `
                @keyframes floatAround {
                    0% {
                        transform: translateY(0px) rotate(0deg);
                        opacity: 0;
                    }
                    10% {
                        opacity: 0.1;
                    }
                    90% {
                        opacity: 0.1;
                    }
                    100% {
                        transform: translateY(-100vh) rotate(360deg);
                        opacity: 0;
                    }
                }
            `;
            document.head.appendChild(style);
        }
    }
}

// Initialize enhanced effects
document.addEventListener('DOMContentLoaded', () => {
    new EnhancedEffects();
});

// Add CSS for scroll progress and other effects
document.addEventListener('DOMContentLoaded', () => {
    if (!document.querySelector('#enhanced-effects-styles')) {
        const style = document.createElement('style');
        style.id = 'enhanced-effects-styles';
        style.textContent = `
            .typewriter-complete {
                border-right: 2px solid #667eea;
                animation: blink 1s infinite;
            }

            @keyframes blink {
                0%, 50% { border-color: transparent; }
                51%, 100% { border-color: #667eea; }
            }

            .parallax-element {
                will-change: transform;
            }

            .card, .project-box, .skill-bubble {
                transform-style: preserve-3d;
                backface-visibility: hidden;
            }

            .scroll-progress {
                transition: width 0.1s linear !important;
            }

            /* Enhanced hover states */
            .card:hover, .project-box:hover {
                box-shadow: 0 30px 60px rgba(102, 126, 234, 0.3);
            }

            /* Smooth scrolling improvements */
            html {
                scroll-behavior: smooth;
            }

            /* Performance optimizations */
            * {
                -webkit-font-smoothing: antialiased;
                -moz-osx-font-smoothing: grayscale;
            }
        `;
        document.head.appendChild(style);
    }
});
