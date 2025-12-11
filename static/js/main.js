/**
 * 🎂 Main JavaScript for Birthday Gift Web Application
 * For Manisha Rana (Faltu) - Happy 25th Birthday!
 * December 12, 2025
 */

// ==================== ADD GLOBAL CSS ANIMATIONS ====================
(function() {
    const globalStyles = document.createElement('style');
    globalStyles.textContent = `
        @keyframes themeRippleExpand {
            0% { transform: scale(0); opacity: 1; }
            100% { transform: scale(1.5); opacity: 0; }
        }
        @keyframes themeBounce {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.2); }
        }
        @keyframes btnRipple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
        @keyframes slideIn {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        @keyframes slideOut {
            from { transform: translateX(0); opacity: 1; }
            to { transform: translateX(100%); opacity: 0; }
        }
        @keyframes rainbow {
            0% { filter: hue-rotate(0deg); }
            100% { filter: hue-rotate(360deg); }
        }
    `;
    document.head.appendChild(globalStyles);
})();

// ==================== WAIT FOR DOM TO LOAD ====================
document.addEventListener('DOMContentLoaded', function() {
    
    // ==================== THEME MANAGEMENT ====================
    const themeToggle = document.getElementById('themeToggle');
    const html = document.documentElement;
    
    if (!themeToggle) {
        console.error('Theme toggle button not found!');
        return;
    }
    
    const themeIcon = themeToggle.querySelector('.theme-icon');
    
    // Load saved theme
    const savedTheme = localStorage.getItem('theme') || 'dark';
    html.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);
    
    // Load saved position
    try {
        const savedPosition = JSON.parse(localStorage.getItem('themeTogglePosition'));
        if (savedPosition && savedPosition.x !== null && savedPosition.y !== null) {
            themeToggle.style.left = savedPosition.x + 'px';
            themeToggle.style.top = savedPosition.y + 'px';
            themeToggle.style.right = 'auto';
        }
    } catch (e) {
        console.log('No saved position found');
    }
    
    // ==================== DRAGGABLE THEME TOGGLE ====================
    let isDragging = false;
    let wasDragged = false;
    let dragStartX, dragStartY;
    let initialX, initialY;
    
    function getPosition(e) {
        if (e.touches && e.touches.length) {
            return { x: e.touches[0].clientX, y: e.touches[0].clientY };
        }
        return { x: e.clientX, y: e.clientY };
    }
    
    function startDrag(e) {
        isDragging = true;
        wasDragged = false;
        themeToggle.classList.add('dragging');
        
        const pos = getPosition(e);
        dragStartX = pos.x;
        dragStartY = pos.y;
        
        const rect = themeToggle.getBoundingClientRect();
        initialX = rect.left;
        initialY = rect.top;
    }
    
    function drag(e) {
        if (!isDragging) return;
        
        const pos = getPosition(e);
        const deltaX = pos.x - dragStartX;
        const deltaY = pos.y - dragStartY;
        
        // Check if actually dragged (moved more than 5px)
        if (Math.abs(deltaX) > 5 || Math.abs(deltaY) > 5) {
            wasDragged = true;
        }
        
        let newX = initialX + deltaX;
        let newY = initialY + deltaY;
        
        // Boundary constraints
        const toggleWidth = themeToggle.offsetWidth;
        const toggleHeight = themeToggle.offsetHeight;
        const maxX = window.innerWidth - toggleWidth;
        const maxY = window.innerHeight - toggleHeight;
        
        newX = Math.max(0, Math.min(newX, maxX));
        newY = Math.max(0, Math.min(newY, maxY));
        
        themeToggle.style.left = newX + 'px';
        themeToggle.style.top = newY + 'px';
        themeToggle.style.right = 'auto';
        
        e.preventDefault();
    }
    
    function endDrag(e) {
        if (!isDragging) return;
        
        isDragging = false;
        themeToggle.classList.remove('dragging');
        
        // Save position
        const rect = themeToggle.getBoundingClientRect();
        localStorage.setItem('themeTogglePosition', JSON.stringify({
            x: rect.left,
            y: rect.top
        }));
    }
    
    // Mouse events
    themeToggle.addEventListener('mousedown', function(e) {
        startDrag(e);
        e.preventDefault();
    });
    document.addEventListener('mousemove', drag);
    document.addEventListener('mouseup', endDrag);
    
    // Touch events
    themeToggle.addEventListener('touchstart', function(e) {
        startDrag(e);
    }, { passive: true });
    document.addEventListener('touchmove', function(e) {
        if (isDragging) {
            drag(e);
        }
    }, { passive: false });
    document.addEventListener('touchend', endDrag);
    
    // Handle window resize to keep button in bounds
    window.addEventListener('resize', function() {
        const rect = themeToggle.getBoundingClientRect();
        const maxX = window.innerWidth - themeToggle.offsetWidth;
        const maxY = window.innerHeight - themeToggle.offsetHeight;
        
        if (rect.left > maxX) {
            themeToggle.style.left = maxX + 'px';
        }
        if (rect.top > maxY) {
            themeToggle.style.top = maxY + 'px';
        }
    });
    
    // Theme toggle click (only if not dragged)
    themeToggle.addEventListener('click', function(e) {
        if (wasDragged) {
            wasDragged = false;
            return; // Don't toggle theme if we just dragged
        }
        
        const currentTheme = html.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        html.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme);
        
        // Add a little celebration effect when switching themes
        createThemeRipple();
    });
    
    // Ripple effect on theme toggle
    function createThemeRipple() {
        const ripple = document.createElement('span');
        ripple.style.cssText = `
            position: fixed;
            border-radius: 50%;
            background: radial-gradient(circle, rgba(255,107,157,0.4) 0%, transparent 70%);
            pointer-events: none;
            animation: themeRippleExpand 0.6s ease-out forwards;
            z-index: 1000;
        `;
        
        const rect = themeToggle.getBoundingClientRect();
        const size = 200;
        ripple.style.width = size + 'px';
        ripple.style.height = size + 'px';
        ripple.style.left = (rect.left + rect.width/2 - size/2) + 'px';
        ripple.style.top = (rect.top + rect.height/2 - size/2) + 'px';
        
        document.body.appendChild(ripple);
        setTimeout(function() { ripple.remove(); }, 600);
    }
    
    function updateThemeIcon(theme) {
        if (themeIcon) {
            themeIcon.textContent = theme === 'dark' ? '🌙' : '☀️';
        }
    }
    
    // Double-click to reset position
    themeToggle.addEventListener('dblclick', function() {
        themeToggle.style.left = 'auto';
        themeToggle.style.top = '20px';
        themeToggle.style.right = '20px';
        localStorage.removeItem('themeTogglePosition');
        
        // Show feedback
        themeToggle.style.animation = 'themeBounce 0.5s ease';
        setTimeout(function() {
            themeToggle.style.animation = '';
        }, 500);
    });
    
    // ==================== MOBILE NAVIGATION ====================
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function(e) {
            e.stopPropagation();
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
            }
        });
        
        // Close menu when clicking a link
        navMenu.querySelectorAll('.nav-link').forEach(function(link) {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
            });
        });
    }
    
    // ==================== FLOATING DECORATIONS ====================
    const floatingDecorations = document.getElementById('floatingDecorations');
    const decorationEmojis = ['🎂', '🎉', '🎈', '🎁', '💖', '⭐', '✨', '🌟', '💝', '🥳', '🎊', '💕'];
    
    function createFloatingDecoration() {
        if (!floatingDecorations) return;
        
        const decoration = document.createElement('span');
        decoration.className = 'floating-item';
        decoration.textContent = decorationEmojis[Math.floor(Math.random() * decorationEmojis.length)];
        decoration.style.left = Math.random() * 100 + 'vw';
        decoration.style.animationDuration = (Math.random() * 10 + 10) + 's';
        decoration.style.animationDelay = Math.random() * 5 + 's';
        decoration.style.fontSize = (Math.random() * 1.5 + 1) + 'rem';
        
        floatingDecorations.appendChild(decoration);
        
        // Remove after animation
        setTimeout(function() {
            if (decoration.parentNode) {
                decoration.remove();
            }
        }, 20000);
    }
    
    // Create initial decorations
    for (let i = 0; i < 8; i++) {
        setTimeout(createFloatingDecoration, i * 2000);
    }
    
    // Continue creating decorations
    setInterval(createFloatingDecoration, 4000);
    
    // ==================== SMOOTH SCROLL ====================
    document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href && href !== '#') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
    
    // ==================== CARD ANIMATIONS ====================
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    document.querySelectorAll('.card').forEach(function(card) {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
    
    // ==================== NAVBAR SCROLL EFFECT ====================
    let lastScroll = 0;
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;
        
        if (navbar) {
            if (currentScroll > lastScroll && currentScroll > 100) {
                navbar.style.transform = 'translateY(-100%)';
            } else {
                navbar.style.transform = 'translateY(0)';
            }
        }
        
        lastScroll = currentScroll;
    });
    
    // ==================== BUTTON RIPPLE EFFECT ====================
    document.querySelectorAll('.btn').forEach(function(button) {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            
            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${e.clientX - rect.left - size/2}px;
                top: ${e.clientY - rect.top - size/2}px;
                background: rgba(255, 255, 255, 0.3);
                border-radius: 50%;
                transform: scale(0);
                animation: btnRipple 0.6s ease-out;
                pointer-events: none;
            `;
            
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            
            setTimeout(function() { ripple.remove(); }, 600);
        });
    });
    
    // ==================== KEYBOARD SHORTCUTS ====================
    document.addEventListener('keydown', function(e) {
        // Toggle theme with Ctrl/Cmd + D
        if ((e.ctrlKey || e.metaKey) && e.key === 'd') {
            e.preventDefault();
            if (themeToggle && !wasDragged) {
                const currentTheme = html.getAttribute('data-theme');
                const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
                html.setAttribute('data-theme', newTheme);
                localStorage.setItem('theme', newTheme);
                updateThemeIcon(newTheme);
            }
        }
        
        // Close modals with Escape
        if (e.key === 'Escape') {
            document.querySelectorAll('.modal-overlay.active').forEach(function(modal) {
                modal.classList.remove('active');
            });
        }
    });
    
    // ==================== EASTER EGGS ====================
    let konamiCode = [];
    const konamiSequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
    
    document.addEventListener('keydown', function(e) {
        konamiCode.push(e.key);
        konamiCode = konamiCode.slice(-10);
        
        if (konamiCode.join(',') === konamiSequence.join(',')) {
            // Easter egg activated!
            document.body.style.animation = 'rainbow 2s linear';
            showToast('🎮 Konami Code Activated! You found an easter egg! 🥚✨', 'success');
            
            // Create extra confetti
            const container = document.querySelector('.confetti-container') || document.body;
            createConfetti(container, 100);
            
            setTimeout(function() {
                document.body.style.animation = '';
            }, 2000);
        }
    });
    
    // Add loaded class for initial animations
    document.body.classList.add('loaded');
    
    // ==================== CONSOLE BIRTHDAY MESSAGE ====================
    console.log('%c🎂 Happy 25th Birthday, Faltu! 🎂', 'font-size: 24px; font-weight: bold; color: #ff6b9d;');
    console.log('%cMade with 💖 for Manisha Rana', 'font-size: 14px; color: #c44dff;');
    console.log('%cDecember 12, 2025', 'font-size: 12px; color: #00d4ff;');
    
}); // End DOMContentLoaded

// ==================== GLOBAL UTILITY FUNCTIONS ====================

// Typewriter Effect
function typeWriter(element, text, speed) {
    speed = speed || 50;
    let i = 0;
    element.textContent = '';
    
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Confetti Creation
function createConfetti(container, count) {
    count = count || 50;
    const colors = ['#ff6b9d', '#c44dff', '#00d4ff', '#ffd700', '#00ff88', '#ff4444'];
    const emojis = ['🎉', '🎊', '⭐', '✨', '💖', '🎁'];
    
    for (let i = 0; i < count; i++) {
        setTimeout(function() {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';
            confetti.style.left = Math.random() * 100 + 'vw';
            confetti.style.animationDuration = (Math.random() * 2 + 2) + 's';
            confetti.style.animationDelay = Math.random() * 0.5 + 's';
            
            if (Math.random() > 0.5) {
                confetti.textContent = emojis[Math.floor(Math.random() * emojis.length)];
                confetti.style.fontSize = (Math.random() * 20 + 10) + 'px';
            } else {
                confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
                confetti.style.width = (Math.random() * 10 + 5) + 'px';
                confetti.style.height = (Math.random() * 10 + 5) + 'px';
                confetti.style.borderRadius = Math.random() > 0.5 ? '50%' : '0';
            }
            
            container.appendChild(confetti);
            setTimeout(function() { confetti.remove(); }, 4000);
        }, i * 30);
    }
}

// Toast Notifications
function showToast(message, type) {
    type = type || 'success';
    const toast = document.createElement('div');
    toast.className = 'alert alert-' + type;
    toast.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        z-index: 10001;
        animation: slideIn 0.3s ease;
        max-width: 350px;
    `;
    
    const icons = {
        success: '✅',
        warning: '⚠️',
        danger: '❌',
        info: 'ℹ️'
    };
    
    toast.innerHTML = '<span>' + icons[type] + '</span><span>' + message + '</span>';
    document.body.appendChild(toast);
    
    setTimeout(function() {
        toast.style.animation = 'slideOut 0.3s ease';
        setTimeout(function() { toast.remove(); }, 300);
    }, 3000);
}

// Loading States
function showLoading(button) {
    const originalContent = button.innerHTML;
    button.innerHTML = '<span class="loading"></span> Loading...';
    button.disabled = true;
    
    return function() {
        button.innerHTML = originalContent;
        button.disabled = false;
    };
}

// Birthday Countdown
function updateBirthdayCountdown() {
    const birthday = new Date('December 12, 2025 00:00:00');
    const now = new Date();
    const diff = birthday - now;
    
    if (diff > 0) {
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);
        
        return { days: days, hours: hours, minutes: minutes, seconds: seconds, isBirthday: false };
    }
    
    return { days: 0, hours: 0, minutes: 0, seconds: 0, isBirthday: true };
}

// Debounce utility
function debounce(func, wait) {
    let timeout;
    return function() {
        const args = arguments;
        const context = this;
        clearTimeout(timeout);
        timeout = setTimeout(function() {
            func.apply(context, args);
        }, wait);
    };
}
