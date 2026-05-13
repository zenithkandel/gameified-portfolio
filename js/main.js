(function() {
    const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isMobile = window.innerWidth < 768;

    const sections = ['hero', 'about', 'skills', 'projects', 'contact'];
    let currentSection = 0;

    function initCurtainReveal() {
        if (isReducedMotion || isMobile) {
            document.querySelector('.curtain-left').style.display = 'none';
            document.querySelector('.curtain-right').style.display = 'none';
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
        .from('.hero-content', {
            opacity: 0,
            y: 30,
            duration: 0.8,
            ease: 'power2.out'
        }, 0.8);
    }

    function showHeroContent() {
        gsap.set('.hero-content', { opacity: 1, y: 0 });
    }

    function initNavbar() {
        const navbar = document.getElementById('navbar');

        if (isReducedMotion) return;

        const heroHeight = document.getElementById('hero').offsetHeight;
        
        window.addEventListener('scroll', () => {
            const scrollY = window.scrollY;
            
            if (scrollY > heroHeight * 0.3) {
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
            delay: 2,
            ease: 'power2.out'
        });

        gsap.from('.theme-toggle', {
            opacity: 0,
            y: -20,
            duration: 0.6,
            delay: 2.2,
            ease: 'power2.out'
        });
    }

    function initMobileNav() {
        const navToggle = document.getElementById('navToggle');
        const mobileNav = document.getElementById('mobileNav');
        const mobileLinks = mobileNav.querySelectorAll('a');

        if (!navToggle || !mobileNav) return;

        navToggle.addEventListener('click', () => {
            mobileNav.classList.toggle('active');
            navToggle.classList.toggle('active');

            if (mobileNav.classList.contains('active')) {
                mobileLinks.forEach((link, index) => {
                    gsap.to(link, {
                        y: 0,
                        duration: 0.5,
                        delay: index * 0.1,
                        ease: 'power3.out'
                    });
                });
            }
        });

        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileNav.classList.remove('active');
                navToggle.classList.remove('active');
            });
        });
    }

    function initRevealAnimations() {
        if (isReducedMotion) {
            gsap.set('.reveal', { opacity: 1, y: 0 });
            return;
        }

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    gsap.to(entry.target, {
                        opacity: 1,
                        y: 0,
                        duration: 0.6,
                        ease: 'power3.out'
                    });
                }
            });
        }, { threshold: 0.2 });

        document.querySelectorAll('.reveal').forEach(el => {
            observer.observe(el);
        });
    }

    function initSectionTracking() {
        if (isReducedMotion) return;

        const navLinks = document.querySelectorAll('.nav-links a');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const sectionIndex = sections.indexOf(entry.target.id);
                    currentSection = sectionIndex;
                    
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
                
                if (targetElement) {
                    targetElement.scrollIntoView({ behavior: 'smooth' });
                }
            });
        });
    }

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

    function initCardTilt() {
        if (isReducedMotion || isMobile) return;

        const tiltCards = document.querySelectorAll('[data-tilt]');

        tiltCards.forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;

                const centerX = rect.width / 2;
                const centerY = rect.height / 2;

                const rotateX = ((y - centerY) / centerY) * -8;
                const rotateY = ((x - centerX) / centerX) * 8;

                gsap.to(card, {
                    rotationX: rotateX,
                    rotationY: rotateY,
                    duration: 0.3,
                    ease: 'power2.out'
                });
            });

            card.addEventListener('mouseleave', () => {
                gsap.to(card, {
                    rotationX: 0,
                    rotationY: 0,
                    duration: 0.5,
                    ease: 'power2.out'
                });
            });

            const shine = document.createElement('div');
            shine.className = 'card-shine';
            shine.style.cssText = `
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: radial-gradient(circle at var(--shine-x, 50%) var(--shine-y, 50%), rgba(255,255,255,0.15) 0%, transparent 50%);
                pointer-events: none;
                opacity: 0;
                transition: opacity 0.3s;
            `;
            card.appendChild(shine);

            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = ((e.clientX - rect.left) / rect.width) * 100;
                const y = ((e.clientY - rect.top) / rect.height) * 100;

                shine.style.setProperty('--shine-x', x + '%');
                shine.style.setProperty('--shine-y', y + '%');
                shine.style.opacity = '1';
            });

            card.addEventListener('mouseleave', () => {
                shine.style.opacity = '0';
            });
        });
    }

    function init() {
        if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
            document.addEventListener('DOMContentLoaded', () => {
                setTimeout(init, 100);
            });
            return;
        }

        gsap.registerPlugin(ScrollTrigger);

        document.addEventListener('DOMContentLoaded', () => {
            initCurtainReveal();
            initNavbar();
            initMobileNav();
            initRevealAnimations();
            initSectionTracking();
            initThemeToggle();
            initCardTilt();
        });
    }

    init();
})();