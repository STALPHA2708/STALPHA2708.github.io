// Custom Cursor Effects
class CustomCursor {
    constructor() {
        this.cursor = null;
        this.follower = null;
        this.init();
    }

    init() {
        // Create cursor elements
        this.cursor = document.createElement('div');
        this.cursor.className = 'cursor';
        document.body.appendChild(this.cursor);

        this.follower = document.createElement('div');
        this.follower.className = 'cursor-follower';
        document.body.appendChild(this.follower);

        // Mouse move handler
        document.addEventListener('mousemove', this.onMouseMove.bind(this));
        
        // Add hover effects for interactive elements
        this.addHoverEffects();
        
        // Add magnetic effects
        this.addMagneticEffects();
    }

    onMouseMove(e) {
        const x = e.clientX;
        const y = e.clientY;

        // Update cursor position immediately
        this.cursor.style.left = x + 'px';
        this.cursor.style.top = y + 'px';

        // Update follower position with delay
        setTimeout(() => {
            this.follower.style.left = x + 'px';
            this.follower.style.top = y + 'px';
        }, 100);
    }

    addHoverEffects() {
        const hoverElements = document.querySelectorAll('a, button, .btn, .card, .project-box');
        
        hoverElements.forEach(element => {
            element.addEventListener('mouseenter', () => {
                this.cursor.classList.add('hover');
                this.follower.classList.add('hover');
            });

            element.addEventListener('mouseleave', () => {
                this.cursor.classList.remove('hover');
                this.follower.classList.remove('hover');
            });
        });
    }

    addMagneticEffects() {
        const magneticElements = document.querySelectorAll('.btn, .magnetic');
        
        magneticElements.forEach(element => {
            element.addEventListener('mousemove', (e) => {
                const rect = element.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;

                element.style.transform = `translate(${x * 0.1}px, ${y * 0.1}px)`;
            });

            element.addEventListener('mouseleave', () => {
                element.style.transform = 'translate(0px, 0px)';
            });
        });
    }
}

// Parallax Effects
class ParallaxEffects {
    constructor() {
        this.elements = [];
        this.init();
    }

    init() {
        this.elements = document.querySelectorAll('.parallax-element');
        window.addEventListener('scroll', this.onScroll.bind(this));
        window.addEventListener('mousemove', this.onMouseMove.bind(this));
    }

    onScroll() {
        const scrolled = window.pageYOffset;
        
        this.elements.forEach((element, index) => {
            const speed = (index + 1) * 0.5;
            const yPos = -(scrolled * speed);
            element.style.transform = `translateY(${yPos}px)`;
        });
    }

    onMouseMove(e) {
        const x = (e.clientX - window.innerWidth / 2) / window.innerWidth;
        const y = (e.clientY - window.innerHeight / 2) / window.innerHeight;

        this.elements.forEach((element, index) => {
            const speed = (index + 1) * 10;
            element.style.transform += ` translateX(${x * speed}px) translateY(${y * speed}px)`;
        });
    }
}

// 3D Tilt Effects
class TiltEffects {
    constructor() {
        this.init();
    }

    init() {
        const tiltElements = document.querySelectorAll('.tilt-effect, .card, .project-box');
        
        tiltElements.forEach(element => {
            element.addEventListener('mousemove', this.handleTilt.bind(this));
            element.addEventListener('mouseleave', this.resetTilt.bind(this));
        });
    }

    handleTilt(e) {
        const element = e.currentTarget;
        const rect = element.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / centerY * -10;
        const rotateY = (x - centerX) / centerX * 10;
        
        element.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(20px)`;
    }

    resetTilt(e) {
        const element = e.currentTarget;
        element.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)';
    }
}

// Text Reveal Animation
class TextReveal {
    constructor() {
        this.init();
    }

    init() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                }
            });
        }, { threshold: 0.5 });

        document.querySelectorAll('.text-reveal').forEach(element => {
            observer.observe(element);
        });
    }
}

// Floating Animation Controller
class FloatingElements {
    constructor() {
        this.init();
    }

    init() {
        const floatingElements = document.querySelectorAll('.floating');
        
        floatingElements.forEach((element, index) => {
            element.style.animationDelay = `${index * 0.5}s`;
        });
    }
}

// Smooth Scroll with Enhanced Easing
class SmoothScroll {
    constructor() {
        this.init();
    }

    init() {
        // Enhanced smooth scrolling for navigation links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(anchor.getAttribute('href'));
                
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }
}

// Spotlight Effect
class SpotlightEffect {
    constructor() {
        this.init();
    }

    init() {
        const spotlightElements = document.querySelectorAll('.spotlight');
        
        spotlightElements.forEach(element => {
            element.addEventListener('mousemove', (e) => {
                const rect = element.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                element.style.setProperty('--x', x + 'px');
                element.style.setProperty('--y', y + 'px');
            });
        });
    }
}

// Enhanced Scroll Effects
class ScrollEffects {
    constructor() {
        this.init();
    }

    init() {
        // Header background change on scroll
        window.addEventListener('scroll', () => {
            const header = document.querySelector('header');
            if (window.scrollY > 100) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });

        // Parallax sections
        const parallaxSections = document.querySelectorAll('section');
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            
            parallaxSections.forEach((section, index) => {
                const rate = scrolled * -0.5;
                section.style.transform = `translateY(${rate}px)`;
            });
        });
    }
}

// Initialize all effects when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    // Only initialize on non-mobile devices
    if (window.innerWidth > 768) {
        new CustomCursor();
        new TiltEffects();
        new ParallaxEffects();
    }
    
    new TextReveal();
    new FloatingElements();
    new SmoothScroll();
    new SpotlightEffect();
    new ScrollEffects();
});

// Add CSS classes to existing elements
document.addEventListener('DOMContentLoaded', () => {
    // Add interactive classes
    document.querySelectorAll('.btn').forEach(btn => {
        btn.classList.add('liquid-btn', 'ripple', 'magnetic');
    });
    
    document.querySelectorAll('.card, .project-box').forEach(card => {
        card.classList.add('tilt-effect', 'spotlight', 'interactive-hover');
    });
    
    document.querySelectorAll('.home .image img').forEach(img => {
        img.classList.add('floating', 'glow');
    });
    
    document.querySelectorAll('h1, h2, h3').forEach(heading => {
        heading.classList.add('text-reveal');
    });
    
    // Add parallax to background elements
    document.querySelectorAll('#particles-js').forEach(element => {
        element.classList.add('parallax-element');
    });
});
