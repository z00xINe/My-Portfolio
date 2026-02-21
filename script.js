/* ===========================
   TYPING EFFECT
   =========================== */
class TypeWriter {
    constructor(element, options = {}) {
        this.element = element;
        this.words = options.words || [
            "Youssef Mohamed Abdelsamea"
        ];
        this.speed = options.speed || 80;
        this.delay = options.delay || 1000;
        this.wordIndex = 0;
        this.charIndex = 0;
        this.isDeleting = false;
    }

    type() {
        const currentWord = this.words[this.wordIndex];
        
        if (this.isDeleting) {
            this.element.textContent = currentWord.substring(0, this.charIndex - 1);
            this.charIndex--;
        } else {
            this.element.textContent = currentWord.substring(0, this.charIndex + 1);
            this.charIndex++;
        }

        let typeSpeed = this.speed;

        if (this.isDeleting) {
            typeSpeed /= 2;
        }

        if (!this.isDeleting && this.charIndex === currentWord.length) {
            typeSpeed = this.delay;
            this.isDeleting = true;
        } else if (this.isDeleting && this.charIndex === 0) {
            this.isDeleting = false;
            this.wordIndex = (this.wordIndex + 1) % this.words.length;
            typeSpeed = 500;
        }

        setTimeout(() => this.type(), typeSpeed);
    }

    start() {
        this.type();
    }
}

/* ===========================
   NAVBAR FUNCTIONALITY
   =========================== */
class NavBar {
    constructor() {
        this.navbar = document.getElementById("navbar");
        this.navMenu = document.getElementById("nav-menu");
        this.hamburger = document.getElementById("hamburger");
        this.navLinks = document.querySelectorAll(".nav-link");
        
        this.init();
    }

    init() {
        // Hamburger menu toggle
        this.hamburger.addEventListener("click", () => this.toggleMenu());
        
        // Close menu when link is clicked
        this.navLinks.forEach(link => {
            link.addEventListener("click", () => this.closeMenu());
        });
        
        // Add scroll listener for navbar style
        window.addEventListener("scroll", () => this.handleScroll());
        
        // Smooth scrolling for nav links
        this.navLinks.forEach(link => {
            link.addEventListener("click", (e) => this.handleNavClick(e));
        });
    }

    toggleMenu() {
        this.navMenu.classList.toggle("active");
        this.hamburger.classList.toggle("active");
    }

    closeMenu() {
        this.navMenu.classList.remove("active");
        this.hamburger.classList.remove("active");
    }

    handleScroll() {
        if (window.scrollY > 50) {
            this.navbar.classList.add("scrolled");
        } else {
            this.navbar.classList.remove("scrolled");
        }
    }

    handleNavClick(e) {
        const href = e.target.getAttribute("href");
        if (href && href.startsWith("#")) {
            e.preventDefault();
            const section = document.querySelector(href);
            if (section) {
                section.scrollIntoView({ behavior: "smooth" });
            }
        }
    }
}

/* ===========================
   SCROLL REVEAL ANIMATIONS
   =========================== */
class ScrollReveal {
    constructor() {
        this.elements = document.querySelectorAll("[data-aos]");
        this.init();
    }

    init() {
        // Initial check
        this.checkElements();
        
        // Listen to scroll
        window.addEventListener("scroll", () => this.checkElements());
    }

    checkElements() {
        this.elements.forEach(element => {
            if (this.isInViewport(element)) {
                element.classList.add("aos-animate");
            }
        });
    }

    isInViewport(element) {
        if (element.classList.contains("aos-animate")) {
            return false;
        }

        const rect = element.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.85 &&
            rect.bottom >= 0
        );
    }
}

/* ===========================
   SMOOTH SCROLL ANCHOR
   =========================== */
function smoothScroll(target) {
    const element = document.querySelector(target);
    if (element) {
        element.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });
    }
}

/* ===========================
   PARALLEL CURSOR EFFECT (OPTIONAL)
   =========================== */
class CustomCursor {
    constructor() {
        this.mouseX = 0;
        this.mouseY = 0;
        this.init();
    }

    init() {
        document.addEventListener("mousemove", (e) => {
            this.mouseX = e.clientX;
            this.mouseY = e.clientY;
        });
    }
}

/* ===========================
   BUTTON RIPPLE EFFECT
   =========================== */
class RippleEffect {
    constructor() {
        this.buttons = document.querySelectorAll(".btn");
        this.init();
    }

    init() {
        this.buttons.forEach(button => {
            button.addEventListener("click", (e) => this.createRipple(e, button));
        });
    }

    createRipple(e, button) {
        const ripple = document.createElement("span");
        const rect = button.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;

        ripple.style.position = "absolute";
        ripple.style.width = ripple.style.height = size + "px";
        ripple.style.left = x + "px";
        ripple.style.top = y + "px";
        ripple.style.backgroundColor = "rgba(255, 255, 255, 0.5)";
        ripple.style.borderRadius = "50%";
        ripple.style.pointerEvents = "none";
        ripple.style.transform = "scale(0)";
        ripple.style.animation = "ripple-animation 0.6s ease-out";

        // Add animation keyframes if not already added
        if (!document.querySelector("#ripple-style")) {
            const style = document.createElement("style");
            style.id = "ripple-style";
            style.innerHTML = `
                @keyframes ripple-animation {
                    to {
                        transform: scale(4);
                        opacity: 0;
                    }
                }
            `;
            document.head.appendChild(style);
        }

        button.style.position = "relative";
        button.style.overflow = "hidden";
        button.appendChild(ripple);

        setTimeout(() => ripple.remove(), 600);
    }
}

/* ===========================
   PERFORMANCE OPTIMIZATION
   =========================== */
let scrollTimeout;
let isScrolling = false;

window.addEventListener("scroll", () => {
    if (!isScrolling) {
        isScrolling = true;
    }

    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
        isScrolling = false;
    }, 150);
});

/* ===========================
   INTERSECTION OBSERVER FOR PERFORMANCE
   =========================== */
class LazyReveal {
    constructor() {
        this.observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting && !entry.target.classList.contains("aos-animate")) {
                        entry.target.classList.add("aos-animate");
                    }
                });
            },
            {
                threshold: 0.1,
                rootMargin: "0px 0px -100px 0px"
            }
        );

        this.init();
    }

    init() {
        document.querySelectorAll("[data-aos]").forEach(element => {
            this.observer.observe(element);
        });
    }
}

/* ===========================
   ACCESSIBILITY - FOCUS MANAGEMENT
   =========================== */
class AccessibilityManager {
    constructor() {
        this.init();
    }

    init() {
        // Keyboard navigation
        document.addEventListener("keydown", (e) => {
            if (e.key === "Escape") {
                // Close mobile menu on Escape
                const navMenu = document.getElementById("nav-menu");
                const hamburger = document.getElementById("hamburger");
                if (navMenu.classList.contains("active")) {
                    navMenu.classList.remove("active");
                    hamburger.classList.remove("active");
                }
            }

            // Skip to main content on Alt+M
            if (e.altKey && e.key === "m") {
                document.getElementById("home")?.focus();
            }
        });

        // Manage focus for interactive elements
        document.addEventListener("focusin", (e) => {
            if (e.target.classList.contains("btn") || e.target.classList.contains("nav-link")) {
                e.target.style.outline = "2px solid var(--primary-color)";
                e.target.style.outlineOffset = "2px";
            }
        });

        document.addEventListener("focusout", (e) => {
            if (e.target.classList.contains("btn") || e.target.classList.contains("nav-link")) {
                e.target.style.outline = "none";
            }
        });
    }
}

/* ===========================
   ACTIVE SECTION INDICATOR
   =========================== */
class ActiveSectionManager {
    constructor() {
        this.sections = document.querySelectorAll("section[id]");
        this.navLinks = document.querySelectorAll(".nav-link");
        this.init();
    }

    init() {
        window.addEventListener("scroll", () => this.updateActiveSection());
    }

    updateActiveSection() {
        let current = "";

        this.sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;

            if (pageYOffset >= sectionTop - 200) {
                current = section.getAttribute("id");
            }
        });

        this.navLinks.forEach(link => {
            link.classList.remove("active");
            if (link.getAttribute("href") === `#${current}`) {
                link.classList.add("active");
            }
        });
    }
}

/* ===========================
   INITIALIZATION
   =========================== */
document.addEventListener("DOMContentLoaded", () => {
    // Initialize typing effect
    const typedElement = document.getElementById("typed-text");
    if (typedElement) {
        const typewriter = new TypeWriter(typedElement, {
            words: ["Youssef Mohamed Abdelsamea"],
            speed: 50,
            delay: 2000
        });
        typewriter.start();
    }

    // Initialize navbar
    new NavBar();

    // Initialize scroll reveal with Intersection Observer
    new LazyReveal();

    // Initialize ripple effect
    new RippleEffect();

    // Initialize accessibility features
    new AccessibilityManager();

    // Initialize active section indicator
    new ActiveSectionManager();

    // Optional: Custom cursor
    new CustomCursor();

    // Log for debugging (remove in production)
    console.log("Portfolio loaded successfully!");
});

/* ===========================
   PRELOAD ANIMATIONS
   =========================== */
window.addEventListener("load", () => {
    document.body.style.opacity = "1";
});

/* ===========================
   PERFORMANCE MONITORING
   =========================== */
if (window.performance && window.performance.timing) {
    window.addEventListener("load", () => {
        const perfData = window.performance.timing;
        const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
        console.log("Page load time: " + pageLoadTime + "ms");
    });
}

/* ===========================
   SMOOTH TRANSITIONS ON PAGE LOAD
   =========================== */
window.addEventListener("beforeunload", () => {
    document.body.style.opacity = "0.5";
});

/* ===========================
   PREVENT LAYOUT SHIFT (OPTIONAL)
   =========================== */
function preventLayoutShift() {
    const scrollbarWidth = window.innerWidth - document.body.offsetWidth;
    if (scrollbarWidth > 0) {
        document.body.style.scrollbarGutter = "stable";
    }
}

preventLayoutShift();
