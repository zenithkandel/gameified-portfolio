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

    function initParallax() {
        if (isReducedMotion || isMobile) return;

        gsap.registerPlugin(ScrollTrigger);

        const hero = document.getElementById('hero');
        
        const bgLayer = hero.querySelector('.hero-bg-layer');
        const midLayer = hero.querySelector('.hero-mid-layer');
        const fgLayer = hero.querySelector('.hero-fg-layer');

        if (bgLayer) {
            gsap.to(bgLayer, {
                y: '20%',
                ease: 'none',
                scrollTrigger: {
                    trigger: hero,
                    start: 'top top',
                    end: 'bottom top',
                    scrub: 0.5
                }
            });
        }

        if (midLayer) {
            gsap.to(midLayer, {
                y: '35%',
                ease: 'none',
                scrollTrigger: {
                    trigger: hero,
                    start: 'top top',
                    end: 'bottom top',
                    scrub: 0.5
                }
            });
        }

        if (fgLayer) {
            gsap.to(fgLayer, {
                y: '50%',
                ease: 'none',
                scrollTrigger: {
                    trigger: hero,
                    start: 'top top',
                    end: 'bottom top',
                    scrub: 0.5
                }
            });
        }

        const about = document.getElementById('about');
        const aboutBg = about.querySelector('.about-bg-layer');
        if (aboutBg) {
            gsap.to(aboutBg, {
                y: '-15%',
                ease: 'none',
                scrollTrigger: {
                    trigger: about,
                    start: 'top bottom',
                    end: 'bottom top',
                    scrub: 0.5
                }
            });
        }

        const skills = document.getElementById('skills');
        const skillsBg = skills.querySelector('.skills-bg-layer');
        if (skillsBg) {
            gsap.to(skillsBg, {
                y: '-20%',
                ease: 'none',
                scrollTrigger: {
                    trigger: skills,
                    start: 'top bottom',
                    end: 'bottom top',
                    scrub: 0.5
                }
            });
        }

        const projects = document.getElementById('projects');
        const projectsBg = projects.querySelector('.projects-bg-layer');
        if (projectsBg) {
            gsap.to(projectsBg, {
                y: '-15%',
                ease: 'none',
                scrollTrigger: {
                    trigger: projects,
                    start: 'top bottom',
                    end: 'bottom top',
                    scrub: 0.5
                }
            });
        }

        const contact = document.getElementById('contact');
        const contactBg = contact.querySelector('.contact-bg-layer');
        if (contactBg) {
            gsap.to(contactBg, {
                y: '-10%',
                ease: 'none',
                scrollTrigger: {
                    trigger: contact,
                    start: 'top bottom',
                    end: 'bottom top',
                    scrub: 0.5
                }
            });
        }
    }

    function initUniqueAnimations() {
        if (isReducedMotion) return;

        gsap.registerPlugin(ScrollTrigger);

        document.querySelectorAll('.section-title, .section-subtitle, .about-body, .pull-quote, .stat-item, .skills-header, .skills-grid, .projects-header, .contact-content').forEach(el => {
            gsap.fromTo(el, 
                { 
                    opacity: 0,
                    filter: 'blur(10px)',
                    scale: 0.95
                },
                {
                    opacity: 1,
                    filter: 'blur(0px)',
                    scale: 1,
                    duration: 0.8,
                    ease: 'power2.out',
                    scrollTrigger: {
                        trigger: el,
                        start: 'top 80%',
                    }
                }
            );
        });

        document.querySelectorAll('.stat-item').forEach((el, index) => {
            gsap.fromTo(el,
                {
                    opacity: 0,
                    scale: 0.8,
                    rotate: -5
                },
                {
                    opacity: 1,
                    scale: 1,
                    rotate: 0,
                    duration: 0.6,
                    delay: index * 0.15,
                    ease: 'back.out(1.7)',
                    scrollTrigger: {
                        trigger: '.stats-row',
                        start: 'top 80%',
                    }
                }
            );
        });

        document.querySelectorAll('.specimen-box').forEach((el, index) => {
            gsap.fromTo(el,
                {
                    opacity: 0,
                    scale: 0.9,
                    y: 30
                },
                {
                    opacity: 1,
                    scale: 1,
                    y: 0,
                    duration: 0.5,
                    delay: index * 0.08,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: '.skills-grid',
                        start: 'top 75%',
                    }
                }
            );
        });

        document.querySelectorAll('.project-card').forEach((el, index) => {
            const isEven = index % 2 === 1;
            
            gsap.fromTo(el,
                {
                    opacity: 0,
                    x: isEven ? 50 : -50
                },
                {
                    opacity: 1,
                    x: 0,
                    duration: 0.8,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: el,
                        start: 'top 85%',
                    }
                }
            );
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
            initParallax();
            initUniqueAnimations();
            initSectionTracking();
            initThemeToggle();
        });
    }

    init();
})();