// Skills Bubbles Interactive System
class SkillsBubbles {
    constructor() {
        this.skills = [
            { name: 'Python', icon: 'fab fa-python', level: 'expert', description: 'Advanced Python development with ML/AI frameworks' },
            { name: 'JavaScript', icon: 'fab fa-js-square', level: 'advanced', description: 'Full-stack JavaScript development' },
            { name: 'Machine Learning', icon: 'fas fa-brain', level: 'expert', description: 'Deep Learning, NLP, Computer Vision' },
            { name: 'Docker', icon: 'fab fa-docker', level: 'advanced', description: 'Containerization and orchestration' },
            { name: 'Apache Kafka', icon: 'fas fa-stream', level: 'advanced', description: 'Real-time data streaming' },
            { name: 'Spark', icon: 'fas fa-fire', level: 'intermediate', description: 'Big data processing' },
            { name: 'TensorFlow', icon: 'fas fa-network-wired', level: 'expert', description: 'Deep learning framework' },
            { name: 'PyTorch', icon: 'fas fa-torch', level: 'advanced', description: 'Neural networks and research' },
            { name: 'React', icon: 'fab fa-react', level: 'intermediate', description: 'Frontend development' },
            { name: 'Node.js', icon: 'fab fa-node-js', level: 'intermediate', description: 'Backend JavaScript runtime' },
            { name: 'PostgreSQL', icon: 'fas fa-database', level: 'advanced', description: 'Relational database management' },
            { name: 'MongoDB', icon: 'fas fa-leaf', level: 'intermediate', description: 'NoSQL database' },
            { name: 'AWS', icon: 'fab fa-aws', level: 'intermediate', description: 'Cloud computing services' },
            { name: 'Git', icon: 'fab fa-git-alt', level: 'expert', description: 'Version control system' },
            { name: 'Linux', icon: 'fab fa-linux', level: 'advanced', description: 'Unix/Linux system administration' },
            { name: 'Kubernetes', icon: 'fas fa-dharmachakra', level: 'beginner', description: 'Container orchestration' }
        ];
        
        this.init();
    }

    init() {
        this.createSkillsSection();
        this.createParticleBackground();
        this.addEventListeners();
        this.startFloatingAnimation();
    }

    createSkillsSection() {
        // Find where to insert skills (after about section)
        const aboutSection = document.querySelector('#about');
        
        if (!aboutSection) {
            console.warn('About section not found, skills will be added to body');
            document.body.appendChild(this.createSkillsHTML());
            return;
        }

        const skillsSection = this.createSkillsHTML();
        aboutSection.insertAdjacentElement('afterend', skillsSection);
    }

    createSkillsHTML() {
        const section = document.createElement('section');
        section.className = 'skills-section';
        section.id = 'skills';

        section.innerHTML = `
            <div class="skills-background"></div>
            <div class="skills-container">
                <h2 class="skills-heading">
                    <i class="fas fa-code"></i> Skills & <span>Technologies</span>
                </h2>
                <div class="skills-grid">
                    ${this.skills.map(skill => this.createSkillBubble(skill)).join('')}
                </div>
            </div>
        `;

        return section;
    }

    createSkillBubble(skill) {
        return `
            <div class="skill-bubble floating" data-level="${skill.level}" data-skill="${skill.name}">
                <i class="skill-icon ${skill.icon}"></i>
                <span class="skill-name">${skill.name}</span>
                <div class="skill-level"></div>
                <div class="skill-tooltip">${skill.description}</div>
            </div>
        `;
    }

    createParticleBackground() {
        const background = document.querySelector('.skills-background');
        if (!background) return;

        // Create floating particles
        for (let i = 0; i < 20; i++) {
            const particle = document.createElement('div');
            particle.className = 'floating-particle';
            
            // Random position and animation delay
            particle.style.left = Math.random() * 100 + '%';
            particle.style.animationDelay = Math.random() * 20 + 's';
            particle.style.animationDuration = (15 + Math.random() * 10) + 's';
            
            background.appendChild(particle);
        }
    }

    addEventListeners() {
        const skillBubbles = document.querySelectorAll('.skill-bubble');
        
        skillBubbles.forEach(bubble => {
            // Click effect
            bubble.addEventListener('click', (e) => {
                e.preventDefault();
                bubble.classList.add('clicked');
                
                setTimeout(() => {
                    bubble.classList.remove('clicked');
                }, 600);
                
                // Optional: Show skill details
                this.showSkillDetails(bubble.dataset.skill);
            });

            // Enhanced hover effects
            bubble.addEventListener('mouseenter', () => {
                this.pauseFloating(bubble);
            });

            bubble.addEventListener('mouseleave', () => {
                this.resumeFloating(bubble);
            });
        });

        // Intersection Observer for entrance animation
        this.observeSkillsEntrance();
    }

    observeSkillsEntrance() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const skillBubbles = entry.target.querySelectorAll('.skill-bubble');
                    skillBubbles.forEach((bubble, index) => {
                        setTimeout(() => {
                            bubble.style.opacity = '1';
                            bubble.style.transform = 'translateY(0) scale(1)';
                        }, index * 100);
                    });
                }
            });
        }, { threshold: 0.3 });

        const skillsSection = document.querySelector('.skills-section');
        if (skillsSection) {
            // Initially hide bubbles
            const skillBubbles = skillsSection.querySelectorAll('.skill-bubble');
            skillBubbles.forEach(bubble => {
                bubble.style.opacity = '0';
                bubble.style.transform = 'translateY(50px) scale(0.8)';
                bubble.style.transition = 'all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
            });

            observer.observe(skillsSection);
        }
    }

    pauseFloating(bubble) {
        bubble.style.animationPlayState = 'paused';
    }

    resumeFloating(bubble) {
        bubble.style.animationPlayState = 'running';
    }

    startFloatingAnimation() {
        const skillBubbles = document.querySelectorAll('.skill-bubble');
        
        skillBubbles.forEach((bubble, index) => {
            // Add random delays to make floating more natural
            const delay = Math.random() * 3;
            bubble.style.animationDelay = `-${delay}s`;
            
            // Slightly different animation durations
            const duration = 3 + Math.random() * 2;
            bubble.style.animationDuration = `${duration}s`;
        });
    }

    showSkillDetails(skillName) {
        const skill = this.skills.find(s => s.name === skillName);
        if (!skill) return;

        // Create a temporary modal or notification
        const notification = document.createElement('div');
        notification.className = 'skill-notification';
        notification.innerHTML = `
            <div class="skill-notification-content">
                <h3>${skill.name}</h3>
                <p>${skill.description}</p>
                <span class="skill-level-text">Level: ${skill.level.charAt(0).toUpperCase() + skill.level.slice(1)}</span>
            </div>
        `;

        // Style the notification
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: rgba(0, 0, 0, 0.9);
            color: white;
            padding: 1rem;
            border-radius: 10px;
            backdrop-filter: blur(10px);
            z-index: 10000;
            opacity: 0;
            transform: translateX(100%);
            transition: all 0.3s ease;
            max-width: 300px;
        `;

        document.body.appendChild(notification);

        // Animate in
        setTimeout(() => {
            notification.style.opacity = '1';
            notification.style.transform = 'translateX(0)';
        }, 10);

        // Auto remove after 3 seconds
        setTimeout(() => {
            notification.style.opacity = '0';
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 3000);
    }

    // Method to filter skills by level
    filterSkillsByLevel(level) {
        const skillBubbles = document.querySelectorAll('.skill-bubble');
        
        skillBubbles.forEach(bubble => {
            if (level === 'all' || bubble.dataset.level === level) {
                bubble.style.display = 'flex';
                bubble.style.opacity = '1';
            } else {
                bubble.style.opacity = '0.3';
            }
        });
    }

    // Method to search skills
    searchSkills(query) {
        const skillBubbles = document.querySelectorAll('.skill-bubble');
        
        skillBubbles.forEach(bubble => {
            const skillName = bubble.dataset.skill.toLowerCase();
            if (skillName.includes(query.toLowerCase()) || query === '') {
                bubble.style.display = 'flex';
                bubble.style.opacity = '1';
            } else {
                bubble.style.opacity = '0.3';
            }
        });
    }
}

// Initialize skills bubbles when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new SkillsBubbles();
});

// Update navigation to include skills
document.addEventListener('DOMContentLoaded', () => {
    const navbar = document.querySelector('.navbar ul');
    if (navbar) {
        // Find the projects link and add skills before it
        const projectsLink = navbar.querySelector('a[href="#projects"]');
        if (projectsLink) {
            const skillsLi = document.createElement('li');
            skillsLi.innerHTML = '<a href="#skills">Skills</a>';
            projectsLink.parentElement.insertAdjacentElement('beforebegin', skillsLi);
        }
    }
});
