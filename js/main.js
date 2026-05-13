(function() {
    const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isMobile = window.innerWidth < 768;

    const sections = ['hero', 'about', 'skills', 'projects', 'contact'];

    // Initialize Lenis smooth scrolling
    function initSmoothScroll() {
        if (isReducedMotion || isMobile) {
            document.documentElement.style.scrollBehavior = 'smooth';
            return;
        }

        const lenis = new Lenis({
            duration: 1.4,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            smooth: true,
            smoothTouch: false,
            touchMultiplier: 2,
            wheelMultiplier: 1,
            infinite: false,
        });

        // Connect Lenis to GSAP
        lenis.on('scroll', ScrollTrigger.update);
        gsap.ticker.add((time) => {
            lenis.raf(time * 1000);
        });
        gsap.ticker.lagSmoothing(0);

        window.lenis = lenis;
    }

    // Hero reveal animation
    function initHeroReveal() {
        if (isReducedMotion) {
            showHeroContent();
            return;
        }

        const tl = gsap.timeline({
            onComplete: () => {
                document.querySelector('.curtain-left').style.display = 'none';
                document.querySelector('.curtain-right').style.display = 'none';
            }
        });

        tl.to('.curtain-left', {
            x: '-100%',
            duration: 1.2,
            ease: 'power3.inOut'
        }, 0)
        .to('.curtain-right', {
            x: '100%',
            duration: 1.2,
            ease: 'power3.inOut'
        }, 0)
        .to('.title-word', {
            y: 0,
            opacity: 1,
            duration: 1,
            stagger: 0.2,
            ease: 'power3.out'
        }, 0.8)
        .to('.title-word[data-char="K"]::after', {
            scaleX: 1,
            duration: 1,
            ease: 'power3.inOut'
        }, 1.8)
        .to('.hero-subtitle', {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power2.out'
        }, 1.5)
        .to('.ornamental-divider', {
            opacity: 1,
            duration: 0.6,
            ease: 'power2.out'
        }, 1.8)
        .to('.divider-line', {
            scaleX: 1,
            duration: 0.8,
            stagger: 0.1,
            ease: 'power3.out'
        }, 1.9)
        .to('.divider-diamond', {
            opacity: 1,
            duration: 0.4,
            ease: 'power2.out'
        }, 2.2)
        .to('.hero-details', {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power2.out'
        }, 2.3)
        .to('.cta-button', {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power2.out'
        }, 2.5);
    }

    function showHeroContent() {
        gsap.set('.title-word', { opacity: 1, y: 0 });
        gsap.set('.hero-subtitle, .hero-details, .cta-button', { opacity: 1, y: 0 });
        gsap.set('.ornamental-divider', { opacity: 1 });
        gsap.set('.divider-line', { scaleX: 1 });
        gsap.set('.divider-diamond', { opacity: 1 });
    }

    // Navbar behavior
    function initNavbar() {
        const navbar = document.getElementById('navbar');
        if (isReducedMotion) return;

        const heroHeight = document.getElementById('hero').offsetHeight;
        
        window.addEventListener('scroll', () => {
            const scrollY = window.scrollY;
            if (scrollY > heroHeight * 0.2) {
                navbar.classList.remove('hidden');
                navbar.classList.add('visible');
            } else {
                navbar.classList.add('hidden');
                navbar.classList.remove('visible');
            }
        });

        navbar.classList.add('hidden');

        gsap.from('.nav-links li', {
            opacity: 0,
            y: -20,
            duration: 0.6,
            stagger: 0.1,
            delay: 2.8,
            ease: 'power2.out'
        });
    }

    // Mobile navigation
    function initMobileNav() {
        const navToggle = document.getElementById('navToggle');
        const mobileNav = document.getElementById('mobileNav');
        const mobileLinks = mobileNav.querySelectorAll('a');

        if (!navToggle || !mobileNav) return;

        navToggle.addEventListener('click', () => {
            mobileNav.classList.toggle('active');
            navToggle.classList.toggle('active');
        });

        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileNav.classList.remove('active');
                navToggle.classList.remove('active');
            });
        });
    }

    // Cinematic parallax system
    function initParallax() {
        if (isReducedMotion || isMobile) return;

        gsap.registerPlugin(ScrollTrigger);

        // Hero section - multiple depth layers
        const hero = document.getElementById('hero');
        
        // Background - slowest
        gsap.to('.layer-bg', {
            y: '40%',
            ease: 'none',
            scrollTrigger: {
                trigger: hero,
                start: 'top top',
                end: 'bottom top',
                scrub: 0.3
            }
        });

        // Far layer
        gsap.to('.layer-far', {
            y: '30%',
            ease: 'none',
            scrollTrigger: {
                trigger: hero,
                start: 'top top',
                end: 'bottom top',
                scrub: 0.4
            }
        });

        // Mid layer - buildings
        gsap.to('.layer-mid', {
            y: '20%',
            ease: 'none',
            scrollTrigger: {
                trigger: hero,
                start: 'top top',
                end: 'bottom top',
                scrub: 0.5
            }
        });

        // Near layer - silhouettes
        gsap.to('.layer-near', {
            y: '10%',
            ease: 'none',
            scrollTrigger: {
                trigger: hero,
                start: 'top top',
                end: 'bottom top',
                scrub: 0.6
            }
        });

        // Foreground - fastest, opposite direction
        gsap.to('.layer-foreground', {
            y: '-15%',
            ease: 'none',
            scrollTrigger: {
                trigger: hero,
                start: 'top top',
                end: 'bottom top',
                scrub: 0.8
            }
        });

        // Content - subtle parallax
        gsap.to('.hero-scene-content', {
            y: '-30%',
            ease: 'none',
            scrollTrigger: {
                trigger: hero,
                start: 'top top',
                end: 'bottom top',
                scrub: 0.7
            }
        });

        // Orbs animation
        gsap.to('.orb-1', {
            y: -50,
            x: 30,
            ease: 'none',
            scrollTrigger: {
                trigger: hero,
                start: 'top top',
                end: 'bottom top',
                scrub: 1
            }
        });

        gsap.to('.orb-2', {
            y: -30,
            x: -20,
            ease: 'none',
            scrollTrigger: {
                trigger: hero,
                start: 'top top',
                end: 'bottom top',
                scrub: 1.2
            }
        });

        // About section
        const about = document.getElementById('about');
        gsap.to('.about-bg-layer', {
            y: '-20%',
            ease: 'none',
            scrollTrigger: {
                trigger: about,
                start: 'top bottom',
                end: 'bottom top',
                scrub: 0.4
            }
        });

        // Skills section
        const skills = document.getElementById('skills');
        gsap.to('.skills-bg-layer', {
            y: '-25%',
            ease: 'none',
            scrollTrigger: {
                trigger: skills,
                start: 'top bottom',
                end: 'bottom top',
                scrub: 0.4
            }
        });

        // Projects section
        const projects = document.getElementById('projects');
        gsap.to('.projects-bg-layer', {
            y: '-15%',
            ease: 'none',
            scrollTrigger: {
                trigger: projects,
                start: 'top bottom',
                end: 'bottom top',
                scrub: 0.4
            }
        });

        // Contact section
        const contact = document.getElementById('contact');
        gsap.to('.contact-bg-layer', {
            y: '-10%',
            rotation: 5,
            ease: 'none',
            scrollTrigger: {
                trigger: contact,
                start: 'top bottom',
                end: 'bottom top',
                scrub: 0.3
            }
        });
    }

    // Section entrance animations
    function initSectionAnimations() {
        if (isReducedMotion) return;

        gsap.registerPlugin(ScrollTrigger);

        // About section
        gsap.from('.about-sidebar', {
            x: -100,
            opacity: 0,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: { trigger: '.about', start: 'top 70%' }
        });

        gsap.from('.about-content > *', {
            y: 50,
            opacity: 0,
            duration: 0.8,
            stagger: 0.15,
            ease: 'power3.out',
            scrollTrigger: { trigger: '.about', start: 'top 60%' }
        });

        // Stats with bounce
        gsap.from('.stat-item', {
            scale: 0.8,
            opacity: 0,
            duration: 0.6,
            stagger: 0.15,
            ease: 'back.out(1.7)',
            scrollTrigger: { trigger: '.stats-row', start: 'top 75%' }
        });

        // Skills progress bars
        gsap.to('.skill-progress', {
            width: 'var(--progress)',
            duration: 1.2,
            stagger: 0.1,
            ease: 'power3.out',
            scrollTrigger: { trigger: '.skills-showcase', start: 'top 70%' }
        });

        // Wheel animation
        gsap.from('.wheel-item', {
            scale: 0,
            opacity: 0,
            duration: 0.6,
            stagger: 0.12,
            ease: 'back.out(1.7)',
            scrollTrigger: { trigger: '.skills-wheel', start: 'top 70%' }
        });

        // Project cards
        document.querySelectorAll('.project-card').forEach((card, index) => {
            const isEven = index % 2 === 1;
            gsap.from(card, {
                x: isEven ? 100 : -100,
                opacity: 0,
                duration: 1,
                ease: 'power3.out',
                scrollTrigger: { trigger: card, start: 'top 80%' }
            });
        });

        // Contact content
        gsap.from('.contact-content > *', {
            y: 40,
            opacity: 0,
            duration: 0.8,
            stagger: 0.15,
            ease: 'power3.out',
            scrollTrigger: { trigger: '.contact', start: 'top 60%' }
        });
    }

    // Section navigation tracking
    function initSectionTracking() {
        if (isReducedMotion) return;

        const navLinks = document.querySelectorAll('.nav-links a');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const sectionIndex = sections.indexOf(entry.target.id);
                    navLinks.forEach(link => {
                        link.classList.remove('active');
                        if (link.dataset.section == sectionIndex) {
                            link.classList.add('active');
                        }
                    });
                }
            });
        }, { threshold: 0.5 });

        sections.forEach(sectionId => {
            const section = document.getElementById(sectionId);
            if (section) observer.observe(section);
        });

        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetSection = link.dataset.section;
                const targetId = sections[targetSection];
                const targetElement = document.getElementById(targetId);
                if (targetElement && window.lenis) {
                    window.lenis.scrollTo(targetElement);
                } else if (targetElement) {
                    targetElement.scrollIntoView({ behavior: 'smooth' });
                }
            });
        });
    }

    // Theme toggle
    function initThemeToggle() {
        const themeToggle = document.getElementById('themeToggle');
        const html = document.documentElement;
        
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
            html.setAttribute('data-theme', savedTheme);
        } else {
            const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            if (prefersDark) {
                html.setAttribute('data-theme', 'dark');
            }
        }

        themeToggle.addEventListener('click', () => {
            const currentTheme = html.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            html.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
        });
    }

    // Initialize everything
    function init() {
        if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
            document.addEventListener('DOMContentLoaded', () => {
                setTimeout(init, 100);
            });
            return;
        }

        gsap.registerPlugin(ScrollTrigger);

        document.addEventListener('DOMContentLoaded', () => {
            initSmoothScroll();
            initHeroReveal();
            initNavbar();
            initMobileNav();
            initParallax();
            initSectionAnimations();
            initSectionTracking();
            initThemeToggle();
        });
    }

    init();
})();