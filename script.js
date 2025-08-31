// Navigation functionality
document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.nav-link, .drawer-link');
    const sections = document.querySelectorAll('.section');
    const drawer = document.getElementById('drawer');
    const drawerOverlay = document.getElementById('drawer-overlay');

    
    // Handle navigation clicks
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all nav links and sections
            navLinks.forEach(nav => nav.classList.remove('active'));
            document.querySelectorAll('.bottom-nav-link').forEach(nav => nav.classList.remove('active'));
            sections.forEach(section => section.classList.remove('active'));
            
            // Add active class to clicked nav link
            this.classList.add('active');
            
            // Update bottom nav if it exists
            const targetId = this.getAttribute('href').substring(1);
            const bottomNavLink = document.querySelector(`.bottom-nav-link[data-section="${targetId}"]`);
            if (bottomNavLink) {
                bottomNavLink.classList.add('active');
            }
            
            // Show corresponding section
            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                targetSection.classList.add('active');
            }
            
            // Close drawer if open
            closeDrawer();
        });
    });
    
    // Handle bottom navigation clicks
    const bottomNavLinks = document.querySelectorAll('.bottom-nav-link');
    bottomNavLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all nav links and sections
            navLinks.forEach(nav => nav.classList.remove('active'));
            bottomNavLinks.forEach(nav => nav.classList.remove('active'));
            sections.forEach(section => section.classList.remove('active'));
            
            // Add active class to clicked nav link
            this.classList.add('active');
            
            // Update top nav if it exists
            const targetId = this.getAttribute('href').substring(1);
            const topNavLink = document.querySelector(`.nav-link[href="#${targetId}"]`);
            if (topNavLink) {
                topNavLink.classList.add('active');
            }
            
            // Show corresponding section
            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                targetSection.classList.add('active');
            }
        });
    });
    
    // Drawer functionality
    function openDrawer() {
        drawer.classList.add('open');
        drawerOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
    
    function closeDrawer() {
        drawer.classList.remove('open');
        drawerOverlay.classList.remove('active');
        document.body.style.overflow = '';
    }
    

    
    // Close drawer when clicking overlay
    if (drawerOverlay) {
        drawerOverlay.addEventListener('click', closeDrawer);
    }
    
    // Close drawer on escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && drawer.classList.contains('open')) {
            closeDrawer();
        }
    });
    
    // Read more functionality removed - showing full text without truncation
    
    // Avatar fallback functionality
    function initAvatarFallback() {
        const avatars = document.querySelectorAll('.lottie-avatar');
        
        avatars.forEach(avatar => {
            // Add a fallback image option
            const fallbackImg = document.createElement('img');
            fallbackImg.src = 'assets/profile.jpeg';
            fallbackImg.alt = 'Razan M. Ikhsan';
            fallbackImg.style.cssText = `
                width: 100%;
                height: 100%;
                object-fit: cover;
                border-radius: 50%;
                display: none;
            `;
            
            avatar.appendChild(fallbackImg);
            
            // Show fallback on error or if user prefers reduced motion
            if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
                avatar.querySelector('.avatar-circle').style.display = 'none';
                fallbackImg.style.display = 'block';
            }
        });
    }
    
    // Initialize avatar fallback
    initAvatarFallback();
    
    // Handle profile image placeholder
    const profileImg = document.getElementById('profile-img');
    if (profileImg) {
        profileImg.addEventListener('error', function() {
            // Create a placeholder if image fails to load
            const placeholder = document.createElement('div');
            placeholder.className = 'profile-placeholder';
            placeholder.innerHTML = '<i class="fas fa-user"></i>';
            placeholder.style.cssText = `
                width: 100%;
                height: 100%;
                background: linear-gradient(135deg, #1e293b, #334155);
                display: flex;
                align-items: center;
                justify-content: center;
                color: #64748b;
                font-size: 2rem;
            `;
            
            this.parentNode.replaceChild(placeholder, this);
        });
        
        // Set a default placeholder initially
        profileImg.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIwIiBoZWlnaHQ9IjEyMCIgdmlld0JveD0iMCAwIDEyMCAxMjAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxMjAiIGhlaWdodD0iMTIwIiBmaWxsPSIjMzM0MTU1Ii8+CjxjaXJjbGUgY3g9IjYwIiBjeT0iNDUiIHI9IjE4IiBmaWxsPSIjNjQ3NDhiIi8+CjxwYXRoIGQ9Ik0zMCA5MEMzMCA3OCA0MiA3MCA2MCA3MEM3OCA3MCA5MCA3OCA5MCA5MEg5MEg5MEgzMFoiIGZpbGw9IiM2NDc0OGIiLz4KPC9zdmc+';
    }
    
    // Smooth scrolling for anchor links
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
    
    // Add hover effects to experience and project items
    const hoverItems = document.querySelectorAll('.experience-item, .project-item, .education-item');
    
    hoverItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    // Add typing effect to the tagline (optional enhancement)
    const tagline = document.querySelector('.tagline');
    if (tagline) {
        const originalText = tagline.textContent;
        tagline.textContent = '';
        
        let i = 0;
        const typeWriter = () => {
            if (i < originalText.length) {
                tagline.textContent += originalText.charAt(i);
                i++;
                setTimeout(typeWriter, 30);
            }
        };
        
        // Start typing effect after a short delay
        setTimeout(typeWriter, 1000);
    }
    
    // Add intersection observer for scroll-based animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe all animated elements
    const animatedElements = document.querySelectorAll('.experience-item, .project-item, .education-item');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
    
    // Handle external links
    const externalLinks = document.querySelectorAll('a[href^="http"], a[href^="mailto:"]');
    externalLinks.forEach(link => {
        if (link.getAttribute('href').startsWith('http')) {
            link.setAttribute('target', '_blank');
            link.setAttribute('rel', 'noopener noreferrer');
        }
    });
    
    // Add keyboard navigation support
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Tab') {
            document.body.classList.add('keyboard-navigation');
        }
    });
    
    document.addEventListener('mousedown', function() {
        document.body.classList.remove('keyboard-navigation');
    });
    
    // Performance optimization: Debounce scroll events
    let scrollTimeout;
    window.addEventListener('scroll', function() {
        if (scrollTimeout) {
            clearTimeout(scrollTimeout);
        }
        
        scrollTimeout = setTimeout(function() {
            // Add any scroll-based functionality here
            const scrolled = window.pageYOffset;
            const parallax = document.querySelector('.sidebar');
            if (parallax && window.innerWidth > 1024) {
                const speed = scrolled * 0.1;
                parallax.style.transform = `translateY(${speed}px)`;
            }
        }, 10);
    });
    
    // Add loading animation
    window.addEventListener('load', function() {
        document.body.classList.add('loaded');
        
        // Animate elements in sequence
        const elementsToAnimate = [
            '.profile-section',
            '.navigation',
            '.social-links',
            '.section.active'
        ];
        
        elementsToAnimate.forEach((selector, index) => {
            const element = document.querySelector(selector);
            if (element) {
                setTimeout(() => {
                    element.style.opacity = '1';
                    element.style.transform = 'translateY(0)';
                }, index * 200);
            }
        });
    });
    
    // Add theme toggle functionality (future enhancement)
    const addThemeToggle = () => {
        const themeToggle = document.createElement('button');
        themeToggle.className = 'theme-toggle';
        themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
        themeToggle.setAttribute('aria-label', 'Toggle theme');
        
        themeToggle.addEventListener('click', function() {
            document.body.classList.toggle('light-theme');
            const icon = this.querySelector('i');
            icon.className = document.body.classList.contains('light-theme') 
                ? 'fas fa-sun' 
                : 'fas fa-moon';
        });
        
        // Add to sidebar (commented out for now)
        // document.querySelector('.social-links').appendChild(themeToggle);
    };
    
    // Initialize theme toggle (uncomment to enable)
    // addThemeToggle();
});

// Utility functions
const utils = {
    // Debounce function for performance optimization
    debounce: function(func, wait, immediate) {
        let timeout;
        return function executedFunction() {
            const context = this;
            const args = arguments;
            const later = function() {
                timeout = null;
                if (!immediate) func.apply(context, args);
            };
            const callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) func.apply(context, args);
        };
    },
    
    // Throttle function for scroll events
    throttle: function(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    },
    
    // Check if element is in viewport
    isInViewport: function(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }
};

// Export utils for potential use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = utils;
}
