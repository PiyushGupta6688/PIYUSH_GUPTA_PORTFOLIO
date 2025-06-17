// Initialize particles.js with enhanced configuration
document.addEventListener('DOMContentLoaded', function() {
    particlesJS('particles-js', {
        particles: {
            number: {
                value: 50,
                density: {
                    enable: true,
                    value_area: 800
                }
            },
            color: {
                value: ['#00ff88', '#00ccff', '#ffffff']
            },
            shape: {
                type: ['circle', 'triangle'],
                stroke: {
                    width: 0,
                    color: '#000000'
                }
            },
            opacity: {
                value: 0.6,
                random: true,
                animation: {
                    enable: true,
                    speed: 1,
                    opacity_min: 0.1,
                    sync: false
                }
            },
            size: {
                value: 3,
                random: true,
                animation: {
                    enable: true,
                    speed: 2,
                    size_min: 0.1,
                    sync: false
                }
            },
            line_linked: {
                enable: true,
                distance: 150,
                color: '#00ff88',
                opacity: 0.4,
                width: 1
            },
            move: {
                enable: true,
                speed: 2,
                direction: 'none',
                random: true,
                straight: false,
                out_mode: 'out',
                bounce: false,
                attract: {
                    enable: true,
                    rotateX: 600,
                    rotateY: 1200
                }
            }
        },
        interactivity: {
            detect_on: 'canvas',
            events: {
                onhover: {
                    enable: true,
                    mode: 'grab'
                },
                onclick: {
                    enable: true,
                    mode: 'push'
                },
                resize: true
            },
            modes: {
                grab: {
                    distance: 140,
                    line_linked: {
                        opacity: 1
                    }
                },
                push: {
                    particles_nb: 4
                }
            }
        },
        retina_detect: true
    });

    // Video background controls
    const video = document.getElementById('myVideo');
    if (video) {
        // Ensure video is playing
        video.play().catch(function(error) {
            console.log("Video autoplay failed:", error);
        });

        // Pause video when not in viewport
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    video.play();
                } else {
                    video.pause();
                }
            });
        }, { threshold: 0.5 });

        observer.observe(video);
    }
});

// Enhanced mobile menu toggle with animation
const menuBtn = document.querySelector('.menu-btn');
const navLinks = document.querySelector('.nav-links');

menuBtn.addEventListener('click', () => {
    navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
    menuBtn.classList.toggle('active');
});

// Smooth scroll with enhanced behavior
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });

            // Close mobile menu if open
            if (window.innerWidth <= 768) {
                navLinks.style.display = 'none';
                menuBtn.classList.remove('active');
            }
        }
    });
});

// Enhanced scroll animations
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            // Add a slight delay between elements
            entry.target.style.transitionDelay = `${entry.target.dataset.delay || 0}s`;
        }
    });
}, observerOptions);

// Add fade-in class to elements with reduced delay for contact items
document.querySelectorAll('.about-content, .project-card, .skill-category, .contact-item').forEach((element, index) => {
    element.classList.add('fade-in');
    // Reduce delay for contact items
    if (element.classList.contains('contact-item')) {
        element.dataset.delay = `${index * 0.03}`;
    } else {
        element.dataset.delay = `${index * 0.1}`;
    }
    observer.observe(element);
});

// Enhanced navbar behavior
const navbar = document.querySelector('.navbar');
let lastScroll = 0;
let scrollTimeout;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    // Clear the timeout
    clearTimeout(scrollTimeout);
    
    // Add scroll class to navbar
    navbar.classList.add('scrolling');
    
    // Set a timeout to remove the class
    scrollTimeout = setTimeout(() => {
        navbar.classList.remove('scrolling');
    }, 150);
    
    if (currentScroll <= 0) {
        navbar.classList.remove('scroll-up');
        return;
    }
    
    if (currentScroll > lastScroll && !navbar.classList.contains('scroll-down')) {
        // Scroll Down
        navbar.classList.remove('scroll-up');
        navbar.classList.add('scroll-down');
    } else if (currentScroll < lastScroll && navbar.classList.contains('scroll-down')) {
        // Scroll Up
        navbar.classList.remove('scroll-down');
        navbar.classList.add('scroll-up');
    }
    lastScroll = currentScroll;
});

// Custom cursor for Projects section
const customCursor = document.getElementById('custom-cursor');
const projectsSection = document.querySelector('.projects');
const projectCards = document.querySelectorAll('.project-card');

function showCursor(e) {
    customCursor.style.opacity = '1';
    customCursor.style.left = e.clientX + 'px';
    customCursor.style.top = e.clientY + 'px';
}
function hideCursor() {
    customCursor.style.opacity = '0';
}
if (projectsSection && customCursor) {
    projectsSection.addEventListener('mouseenter', () => customCursor.style.opacity = '1');
    projectsSection.addEventListener('mouseleave', hideCursor);
    projectsSection.addEventListener('mousemove', showCursor);
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            customCursor.style.transform = 'translate(-50%, -50%) scale(1.2)';
            customCursor.style.borderColor = 'var(--accent-secondary)';
            customCursor.style.background = 'rgba(0,204,255,0.12)';
        });
        card.addEventListener('mouseleave', () => {
            customCursor.style.transform = 'translate(-50%, -50%) scale(0.7)';
            customCursor.style.borderColor = 'var(--accent-primary)';
            customCursor.style.background = 'rgba(0,255,136,0.08)';
        });
    });
} 