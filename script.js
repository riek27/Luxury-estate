// script.js - Consolidated and Improved Version

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeAllFunctions();
});

function initializeAllFunctions() {
    // Initialize all main functionalities
    initMobileNavigation();
    initHeaderScrollEffect();
    initPortfolioFiltering();
    initTestimonialAnimations();
    initContactAnimations();
    initThemeToggle();
    initCounters();
    initSectionAnimations();
    initFormValidation();
}

// 1. Mobile Navigation Toggle
function initMobileNavigation() {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            hamburger.innerHTML = navLinks.classList.contains('active') ? 
                '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
        });

        // Close mobile menu when clicking on a link
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                if (window.innerWidth <= 768) {
                    navLinks.classList.remove('active');
                    hamburger.innerHTML = '<i class="fas fa-bars"></i>';
                }
            });
        });
    }
}

// 2. Header Scroll Effect
function initHeaderScrollEffect() {
    const header = document.querySelector('header');
    if (header) {
        window.addEventListener('scroll', () => {
            header.classList.toggle('scrolled', window.scrollY > 100);
        });
    }
}

// 3. Portfolio Filtering
function initPortfolioFiltering() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item, .gallery-item');

    if (filterButtons.length > 0 && portfolioItems.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Remove active class from all buttons
                filterButtons.forEach(btn => btn.classList.remove('active'));
                
                // Add active class to clicked button
                this.classList.add('active');
                
                const filterValue = this.getAttribute('data-filter');
                
                portfolioItems.forEach(item => {
                    if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                        item.style.display = 'block';
                        // Re-trigger animation for newly shown items
                        setTimeout(() => {
                            if (isElementInViewport(item)) {
                                item.classList.add('animate');
                            }
                        }, 100);
                    } else {
                        item.style.display = 'none';
                    }
                });
            });
        });
    }
}

// 4. Testimonials Animation
function initTestimonialAnimations() {
    function checkTestimonialItems() {
        const testimonialCards = document.querySelectorAll('.testimonial-card, .stat-item, .testimonial');
        
        testimonialCards.forEach(item => {
            if (isElementInViewport(item)) {
                item.classList.add('animate');
            }
        });
    }

    // Initial check and scroll listener
    checkTestimonialItems();
    window.addEventListener('scroll', checkTestimonialItems);
    window.addEventListener('resize', checkTestimonialItems);
}

// 5. Contact Page Animations
function initContactAnimations() {
    function checkContactItems() {
        const contactItems = document.querySelectorAll('.contact-item, .contact-form, .area-item, .faq-item');
        
        contactItems.forEach(item => {
            if (isElementInViewport(item)) {
                item.classList.add('animate');
            }
        });
    }

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Initial check and scroll listener
    checkContactItems();
    window.addEventListener('scroll', checkContactItems);
    window.addEventListener('resize', checkContactItems);
}

// 6. Theme Toggle
function initThemeToggle() {
    const themeToggle = document.querySelector('.theme-toggle');
    const themeIcon = themeToggle ? themeToggle.querySelector('i') : null;

    if (themeToggle && themeIcon) {
        themeToggle.addEventListener('click', () => {
            document.body.classList.toggle('dark-mode');
            if (document.body.classList.contains('dark-mode')) {
                themeIcon.classList.remove('fa-moon');
                themeIcon.classList.add('fa-sun');
                localStorage.setItem('theme', 'dark');
            } else {
                themeIcon.classList.remove('fa-sun');
                themeIcon.classList.add('fa-moon');
                localStorage.setItem('theme', 'light');
            }
        });

        // Load saved theme
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'dark') {
            document.body.classList.add('dark-mode');
            if (themeIcon) {
                themeIcon.classList.remove('fa-moon');
                themeIcon.classList.add('fa-sun');
            }
        }
    }
}

// 7. Counter Animation
function initCounters() {
    const aboutSection = document.querySelector('.about, .stats');
    const counters = document.querySelectorAll('.stat-number');

    if (aboutSection && counters.length > 0) {
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.3
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounters();
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        observer.observe(aboutSection);
    }
}

function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    const speed = 200;

    counters.forEach(counter => {
        if (!counter.classList.contains('animated')) {
            counter.classList.add('animated');
            const target = +counter.getAttribute('data-count');
            const count = +counter.innerText;
            const increment = target / speed;

            const updateCounter = () => {
                const current = +counter.innerText;
                if (current < target) {
                    counter.innerText = Math.ceil(current + increment);
                    setTimeout(updateCounter, 1);
                } else {
                    counter.innerText = target;
                }
            };
            updateCounter();
        }
    });
}

// 8. Section Animations
function initSectionAnimations() {
    const sections = document.querySelectorAll('section');

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Animate images in the section
                const images = entry.target.querySelectorAll('img');
                images.forEach(img => {
                    img.classList.add('animate');
                });
                
                // Animate service cards
                const serviceCards = entry.target.querySelectorAll('.service-card');
                serviceCards.forEach((card, index) => {
                    setTimeout(() => {
                        card.classList.add('animate');
                    }, index * 200);
                });
                
                // Animate portfolio items
                const portfolioItems = entry.target.querySelectorAll('.portfolio-item, .gallery-item');
                portfolioItems.forEach((item, index) => {
                    setTimeout(() => {
                        item.classList.add('animate');
                    }, index * 200);
                });
                
                // Animate testimonials
                const testimonials = entry.target.querySelectorAll('.testimonial, .testimonial-card');
                testimonials.forEach(testimonial => {
                    testimonial.classList.add('animate');
                });
                
                // Animate contact items
                const contactItems = entry.target.querySelectorAll('.contact-item');
                contactItems.forEach((item, index) => {
                    setTimeout(() => {
                        item.classList.add('animate');
                    }, index * 200);
                });
                
                // Animate contact form
                const contactForm = entry.target.querySelector('.contact-form');
                if (contactForm) {
                    contactForm.classList.add('animate');
                }
            }
        });
    }, {
        threshold: 0.2
    });

    sections.forEach(section => {
        sectionObserver.observe(section);
    });
}

// 9. Form Validation
function initFormValidation() {
    const contactForm = document.getElementById('contactForm');
    const estimateForm = document.getElementById('estimateForm');

    // Contact Form Validation
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            if (validateForm(contactForm)) {
                showFormSuccess(contactForm.querySelector('button[type="submit"]'));
                contactForm.reset();
            }
        });
    }

    // Estimate Form Validation
    if (estimateForm) {
        estimateForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            if (validateForm(estimateForm)) {
                showFormSuccess(estimateForm.querySelector('button[type="submit"]'));
                estimateForm.reset();
            }
        });
    }
}

function validateForm(form) {
    const inputs = form.querySelectorAll('input, textarea, select');
    let isValid = true;
    
    inputs.forEach(input => {
        if (input.hasAttribute('required') && !input.value.trim()) {
            isValid = false;
            input.style.borderColor = '#ff6b6b';
            // Add error message
            if (!input.nextElementSibling || !input.nextElementSibling.classList.contains('error-message')) {
                const errorMsg = document.createElement('span');
                errorMsg.className = 'error-message';
                errorMsg.textContent = 'This field is required';
                errorMsg.style.cssText = 'color: #ff6b6b; font-size: 0.8rem; display: block; margin-top: 5px;';
                input.parentNode.appendChild(errorMsg);
            }
        } else {
            input.style.borderColor = '';
            // Remove error message
            const errorMsg = input.nextElementSibling;
            if (errorMsg && errorMsg.classList.contains('error-message')) {
                errorMsg.remove();
            }
        }
    });
    
    if (!isValid) {
        alert('Please fill in all required fields.');
    }
    
    return isValid;
}

function showFormSuccess(submitBtn) {
    if (!submitBtn) return;
    
    const originalText = submitBtn.innerHTML;
    const originalBg = submitBtn.style.backgroundColor;
    
    submitBtn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
    submitBtn.style.backgroundColor = '#28a745';
    submitBtn.disabled = true;
    
    setTimeout(() => {
        submitBtn.innerHTML = originalText;
        submitBtn.style.backgroundColor = originalBg;
        submitBtn.disabled = false;
    }, 3000);
}

// 10. Utility Functions
function isElementInViewport(el) {
    if (!el) return false;
    
    const rect = el.getBoundingClientRect();
    return (
        rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.85 &&
        rect.bottom >= 0
    );
}

// 11. Floating Background Images (Optional - uncomment if needed)
/*
function createFloatingBackgrounds() {
    const bgImages = [
        'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
        'https://images.unsplash.com/photo-1504307651254-35680f356dfd?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
        'https://images.unsplash.com/photo-1581094794329-c8112a89af12?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
        'https://images.unsplash.com/photo-1581093458791-8a6b4243e0a8?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80'
    ];
    
    const bgContainer = document.createElement('div');
    bgContainer.className = 'floating-backgrounds';
    bgContainer.style.cssText = 'position: fixed; top: 0; left: 0; width: 100%; height: 100%; z-index: -1; overflow: hidden;';
    
    bgImages.forEach((src, index) => {
        const bgImg = document.createElement('img');
        bgImg.src = src;
        bgImg.alt = 'Floating background';
        bgImg.className = `floating-bg floating-bg-${index + 1}`;
        bgImg.style.cssText = `
            position: absolute;
            opacity: 0.1;
            animation: float 20s infinite linear;
            animation-delay: ${index * 5}s;
        `;
        bgContainer.appendChild(bgImg);
    });
    
    // Add floating animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes float {
            0% { transform: translateX(-100px) translateY(-100px) rotate(0deg); }
            100% { transform: translateX(100px) translateY(100px) rotate(360deg); }
        }
    `;
    document.head.appendChild(style);
    
    document.body.appendChild(bgContainer);
}

// Initialize floating backgrounds if needed
// createFloatingBackgrounds();
*/

// 12. Error Handling and Fallbacks
window.addEventListener('error', function(e) {
    console.error('JavaScript Error:', e.error);
});

// Make sure all images have lazy loading
document.querySelectorAll('img').forEach(img => {
    if (!img.hasAttribute('loading')) {
        img.setAttribute('loading', 'lazy');
    }
});

// Performance optimization: Debounce scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply debouncing to scroll-heavy functions
window.addEventListener('scroll', debounce(function() {
    // Scroll-dependent functions will be called here
}, 10));
