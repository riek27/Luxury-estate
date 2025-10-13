// script.js - Fixed and Improved Version

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

// 1. Mobile Navigation Toggle - FIXED
function initMobileNavigation() {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            hamburger.innerHTML = navLinks.classList.contains('active') ? 
                '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
            
            // Prevent body scroll when menu is open
            document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
        });

        // Close mobile menu when clicking on a link
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                if (window.innerWidth <= 768) {
                    navLinks.classList.remove('active');
                    hamburger.innerHTML = '<i class="fas fa-bars"></i>';
                    document.body.style.overflow = '';
                }
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (window.innerWidth <= 768 && navLinks.classList.contains('active')) {
                if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
                    navLinks.classList.remove('active');
                    hamburger.innerHTML = '<i class="fas fa-bars"></i>';
                    document.body.style.overflow = '';
                }
            }
        });
    }
}

// 2. Header Scroll Effect - FIXED
function initHeaderScrollEffect() {
    const header = document.querySelector('header');
    if (header) {
        // Initialize scroll state
        header.classList.toggle('scrolled', window.scrollY > 100);
        
        window.addEventListener('scroll', () => {
            header.classList.toggle('scrolled', window.scrollY > 100);
        });
    }
}

// 3. Portfolio Filtering - FIXED
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
                        // Add animation class with delay for staggered effect
                        setTimeout(() => {
                            item.classList.add('animate');
                        }, 100);
                    } else {
                        item.style.display = 'none';
                        item.classList.remove('animate');
                    }
                });
            });
        });

        // Initialize first button as active
        if (filterButtons.length > 0 && !document.querySelector('.filter-btn.active')) {
            filterButtons[0].classList.add('active');
        }
    }
}

// 4. Testimonials Animation - FIXED
function initTestimonialAnimations() {
    function checkTestimonialItems() {
        const testimonialCards = document.querySelectorAll('.testimonial-card, .stat-item, .testimonial');
        
        testimonialCards.forEach(item => {
            if (isElementInViewport(item)) {
                item.classList.add('animate');
            }
        });
    }

    // Use debounced version for better performance
    const debouncedCheck = debounce(checkTestimonialItems, 10);
    
    // Initial check and scroll listener
    checkTestimonialItems();
    window.addEventListener('scroll', debouncedCheck);
    window.addEventListener('resize', debouncedCheck);
}

// 5. Contact Page Animations - FIXED
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
            const href = this.getAttribute('href');
            if (href === '#') return;
            
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Use debounced version for better performance
    const debouncedCheck = debounce(checkContactItems, 10);
    
    // Initial check and scroll listener
    checkContactItems();
    window.addEventListener('scroll', debouncedCheck);
    window.addEventListener('resize', debouncedCheck);
}

// 6. Theme Toggle - FIXED
function initThemeToggle() {
    const themeToggle = document.querySelector('.theme-toggle');
    
    if (!themeToggle) return;
    
    const themeIcon = themeToggle.querySelector('i');

    if (themeIcon) {
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
            themeIcon.classList.remove('fa-moon');
            themeIcon.classList.add('fa-sun');
        } else {
            document.body.classList.remove('dark-mode');
            themeIcon.classList.remove('fa-sun');
            themeIcon.classList.add('fa-moon');
        }
    }
}

// 7. Counter Animation - FIXED
function initCounters() {
    const counterSections = document.querySelectorAll('.about, .stats, .counter-section');
    const counters = document.querySelectorAll('.stat-number, .counter');

    if (counterSections.length > 0 && counters.length > 0) {
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

        counterSections.forEach(section => {
            observer.observe(section);
        });
    }
}

function animateCounters() {
    const counters = document.querySelectorAll('.stat-number, .counter');
    
    counters.forEach(counter => {
        if (!counter.classList.contains('animated')) {
            counter.classList.add('animated');
            const target = +counter.getAttribute('data-count') || +counter.textContent;
            const count = +counter.innerText;
            const increment = target / 200; // Adjust speed as needed

            const updateCounter = () => {
                const current = +counter.innerText.replace(/,/g, '');
                if (current < target) {
                    counter.innerText = Math.ceil(current + increment).toLocaleString();
                    setTimeout(updateCounter, 1);
                } else {
                    counter.innerText = target.toLocaleString();
                }
            };
            updateCounter();
        }
    });
}

// 8. Section Animations - FIXED
function initSectionAnimations() {
    const sections = document.querySelectorAll('section');
    
    if (sections.length === 0) return;

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const section = entry.target;
                
                // Animate images in the section
                const images = section.querySelectorAll('img:not(.no-animate)');
                images.forEach(img => {
                    img.classList.add('animate');
                });
                
                // Animate service cards
                const serviceCards = section.querySelectorAll('.service-card');
                serviceCards.forEach((card, index) => {
                    setTimeout(() => {
                        card.classList.add('animate');
                    }, index * 200);
                });
                
                // Animate portfolio items
                const portfolioItems = section.querySelectorAll('.portfolio-item, .gallery-item');
                portfolioItems.forEach((item, index) => {
                    setTimeout(() => {
                        item.classList.add('animate');
                    }, index * 200);
                });
                
                // Animate testimonials
                const testimonials = section.querySelectorAll('.testimonial, .testimonial-card');
                testimonials.forEach((testimonial, index) => {
                    setTimeout(() => {
                        testimonial.classList.add('animate');
                    }, index * 150);
                });
                
                // Animate contact items
                const contactItems = section.querySelectorAll('.contact-item');
                contactItems.forEach((item, index) => {
                    setTimeout(() => {
                        item.classList.add('animate');
                    }, index * 200);
                });
                
                // Animate contact form
                const contactForm = section.querySelector('.contact-form');
                if (contactForm) {
                    setTimeout(() => {
                        contactForm.classList.add('animate');
                    }, 300);
                }
                
                // Stop observing after animation
                sectionObserver.unobserve(section);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    sections.forEach(section => {
        sectionObserver.observe(section);
    });
}

// 9. Form Validation - FIXED
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

        // Real-time validation
        contactForm.querySelectorAll('input, textarea').forEach(input => {
            input.addEventListener('blur', () => {
                validateField(input);
            });
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

        // Real-time validation
        estimateForm.querySelectorAll('input, textarea, select').forEach(input => {
            input.addEventListener('blur', () => {
                validateField(input);
            });
        });
    }
}

function validateForm(form) {
    const inputs = form.querySelectorAll('input, textarea, select');
    let isValid = true;
    
    // Clear previous errors
    form.querySelectorAll('.error-message').forEach(error => error.remove());
    inputs.forEach(input => input.classList.remove('error'));
    
    inputs.forEach(input => {
        if (!validateField(input)) {
            isValid = false;
        }
    });
    
    if (!isValid) {
        const firstError = form.querySelector('.error');
        if (firstError) {
            firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }
    
    return isValid;
}

function validateField(input) {
    // Clear previous error
    const existingError = input.nextElementSibling;
    if (existingError && existingError.classList.contains('error-message')) {
        existingError.remove();
    }
    input.classList.remove('error');

    // Skip validation if field is not required and empty
    if (!input.hasAttribute('required') && !input.value.trim()) {
        return true;
    }

    let isValid = true;
    let errorMessage = '';

    // Required field validation
    if (input.hasAttribute('required') && !input.value.trim()) {
        isValid = false;
        errorMessage = 'This field is required';
    }
    // Email validation
    else if (input.type === 'email' && input.value.trim()) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(input.value.trim())) {
            isValid = false;
            errorMessage = 'Please enter a valid email address';
        }
    }
    // Phone validation
    else if (input.type === 'tel' && input.value.trim()) {
        const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
        const cleanPhone = input.value.replace(/[^\d+]/g, '');
        if (!phoneRegex.test(cleanPhone)) {
            isValid = false;
            errorMessage = 'Please enter a valid phone number';
        }
    }

    if (!isValid) {
        input.classList.add('error');
        const errorMsg = document.createElement('span');
        errorMsg.className = 'error-message';
        errorMsg.textContent = errorMessage;
        errorMsg.style.cssText = 'color: #ff6b6b; font-size: 0.8rem; display: block; margin-top: 5px;';
        input.parentNode.appendChild(errorMsg);
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

// 10. Utility Functions - FIXED
function isElementInViewport(el) {
    if (!el) return false;
    
    const rect = el.getBoundingClientRect();
    const windowHeight = window.innerHeight || document.documentElement.clientHeight;
    
    return (
        rect.top <= windowHeight * 0.85 &&
        rect.bottom >= windowHeight * 0.15
    );
}

// 11. Debounce function for performance
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

// 12. Error Handling and Fallbacks
window.addEventListener('error', function(e) {
    console.error('JavaScript Error:', e.error);
});

// Make sure all images have lazy loading and alt attributes
document.querySelectorAll('img').forEach(img => {
    if (!img.hasAttribute('loading')) {
        img.setAttribute('loading', 'lazy');
    }
    if (!img.hasAttribute('alt')) {
        img.setAttribute('alt', 'Image');
    }
});

// Add CSS for animations if not present
function ensureAnimationStyles() {
    if (!document.getElementById('dynamic-animation-styles')) {
        const style = document.createElement('style');
        style.id = 'dynamic-animation-styles';
        style.textContent = `
            .animate {
                animation: fadeInUp 0.6s ease-out forwards;
            }
            
            @keyframes fadeInUp {
                from {
                    opacity: 0;
                    transform: translateY(30px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }
            
            .error {
                border-color: #ff6b6b !important;
            }
            
            .dark-mode {
                background: #1a1a1a;
                color: #ffffff;
            }
            
            /* Smooth transitions for theme toggle */
            body {
                transition: background-color 0.3s ease, color 0.3s ease;
            }
        `;
        document.head.appendChild(style);
    }
}

// Initialize animation styles
ensureAnimationStyles();

// Export functions for global access (if needed)
window.App = {
    init: initializeAllFunctions,
    utils: {
        debounce,
        isElementInViewport
    }
};
