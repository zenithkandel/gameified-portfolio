(function() {
    const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isMobile = window.innerWidth < 768;

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
            duration: 2,
            ease: 'power3.inOut'
        }, 0)
        .to('.curtain-right', {
            x: '100%',
            duration: 2,
            ease: 'power3.inOut'
        }, 0)
        .from('.hero-content', {
            opacity: 0,
            y: 30,
            duration: 1,
            ease: 'power2.out'
        }, 1.5);
    }

    function showHeroContent() {
        gsap.set('.hero-content', { opacity: 1, y: 0 });
    }

    function initNavbar() {
        const navbar = document.getElementById('navbar');

        if (isReducedMotion) return;

        window.addEventListener('scroll', () => {
            if (window.scrollY > 80) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });

        gsap.from('.nav-monogram', {
            opacity: 0,
            y: -20,
            duration: 0.8,
            delay: 2.5,
            ease: 'power2.out'
        });

        gsap.from('.nav-links li', {
            opacity: 0,
            y: -20,
            duration: 0.6,
            stagger: 0.1,
            delay: 2.6,
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

        const revealElements = document.querySelectorAll('.reveal');

        revealElements.forEach(el => {
            ScrollTrigger.create({
                trigger: el,
                start: 'top 85%',
                onEnter: () => {
                    gsap.to(el, {
                        opacity: 1,
                        y: 0,
                        duration: 0.8,
                        ease: 'power3.out'
                    });
                }
            });
        });
    }

    function initAboutSection() {
        if (isReducedMotion) return;

        gsap.from('.about-sidebar', {
            opacity: 0,
            x: -50,
            duration: 1,
            scrollTrigger: {
                trigger: '.about',
                start: 'top 70%',
            }
        });

        gsap.from('.about-content > *', {
            opacity: 0,
            y: 40,
            duration: 0.8,
            stagger: 0.15,
            scrollTrigger: {
                trigger: '.about',
                start: 'top 60%',
            }
        });
    }

    function initSkillsSection() {
        if (isReducedMotion) return;

        gsap.from('.specimen-box', {
            opacity: 0,
            y: 60,
            duration: 0.8,
            stagger: 0.08,
            scrollTrigger: {
                trigger: '.skills-grid',
                start: 'top 80%',
            }
        });

        gsap.to('.skills-header .section-title', {
            y: -30,
            ease: 'none',
            scrollTrigger: {
                trigger: '.skills',
                start: 'top bottom',
                end: 'bottom top',
                scrub: true,
            }
        });
    }

    function initProjectsSection() {
        if (isReducedMotion) return;

        const projectCards = document.querySelectorAll('.project-card');

        projectCards.forEach((card, index) => {
            gsap.from(card, {
                opacity: 0,
                y: 80,
                duration: 1,
                scrollTrigger: {
                    trigger: card,
                    start: 'top 85%',
                }
            });

            gsap.to(card.querySelector('.project-number'), {
                y: -30,
                ease: 'none',
                scrollTrigger: {
                    trigger: card,
                    start: 'top bottom',
                    end: 'bottom top',
                    scrub: true,
                }
            });
        });
    }

    function initContactSection() {
        if (isReducedMotion) return;

        const contactTitle = document.querySelector('.contact-title');
        const words = contactTitle.querySelectorAll('.word');

        words.forEach((word, index) => {
            gsap.to(word, {
                y: -20 * (index + 1),
                ease: 'none',
                scrollTrigger: {
                    trigger: '.contact',
                    start: 'top bottom',
                    end: 'bottom top',
                    scrub: true,
                }
            });
        });

        gsap.to('.compass-large', {
            rotation: 360,
            ease: 'none',
            scrollTrigger: {
                trigger: '.contact',
                start: 'top bottom',
                end: 'bottom top',
                scrub: true,
            }
        });
    }

    function initCardTilt() {
        if (isReducedMotion || isMobile) return;

        const tiltCards = document.querySelectorAll('[data-tilt]');

        tiltCards.forEach(card => {
            const inner = card;

            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;

                const centerX = rect.width / 2;
                const centerY = rect.height / 2;

                const rotateX = ((y - centerY) / centerY) * -8;
                const rotateY = ((x - centerX) / centerX) * 8;

                gsap.to(inner, {
                    rotationX: rotateX,
                    rotationY: rotateY,
                    duration: 0.3,
                    ease: 'power2.out'
                });
            });

            card.addEventListener('mouseleave', () => {
                gsap.to(inner, {
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

    function initSmoothScrollLinks() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    if (window.lenis) {
                        window.lenis.scrollTo(target);
                    } else {
                        target.scrollIntoView({ behavior: 'smooth' });
                    }
                }
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
            initAboutSection();
            initSkillsSection();
            initProjectsSection();
            initContactSection();
            initCardTilt();
            initSmoothScrollLinks();

            window.lenis = window.lenis || null;
        });
    }

    init();
})();