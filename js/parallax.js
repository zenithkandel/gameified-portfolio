(function() {
    const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isMobile = window.innerWidth < 768;

    let lenis;

    function initLenis() {
        if (isReducedMotion || isMobile) {
            document.documentElement.style.scrollBehavior = 'smooth';
            return;
        }

        lenis = new Lenis({
            duration: 1.8,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            smooth: true,
            smoothTouch: false,
            touchMultiplier: 2,
        });

        gsap.ticker.add((time) => {
            lenis.raf(time * 1000);
        });

        gsap.ticker.lagSmoothing(0);
    }

    function initParallax() {
        if (isReducedMotion || isMobile) {
            const parallaxElements = document.querySelectorAll('[data-parallax]');
            parallaxElements.forEach(el => {
                el.style.transform = 'none';
            });
            return;
        }

        const parallaxElements = document.querySelectorAll('[data-parallax]');

        parallaxElements.forEach(el => {
            const speed = parseFloat(el.dataset.parallax) || 0.1;
            const yPercent = speed * 100;

            gsap.to(el, {
                y: yPercent,
                ease: 'none',
                scrollTrigger: {
                    trigger: el.closest('section') || el,
                    start: 'top bottom',
                    end: 'bottom top',
                    scrub: true,
                }
            });
        });
    }

    function initSectionParallax() {
        if (isReducedMotion || isMobile) return;

        const sections = document.querySelectorAll('section');

        sections.forEach(section => {
            const bgLayer = section.querySelector('[data-parallax]');

            if (bgLayer) {
                const speed = parseFloat(bgLayer.dataset.parallax) || 0.2;

                gsap.to(bgLayer, {
                    y: speed * 100,
                    ease: 'none',
                    scrollTrigger: {
                        trigger: section,
                        start: 'top bottom',
                        end: 'bottom top',
                        scrub: true,
                    }
                });
            }
        });
    }

    function initHeroParallax() {
        if (isReducedMotion || isMobile) return;

        const hero = document.getElementById('hero');
        if (!hero) return;

        const bgLayer = hero.querySelector('.hero-bg-layer');
        const midLayer = hero.querySelector('.hero-mid-layer');
        const fgLayer = hero.querySelector('.hero-fg-layer');

        if (bgLayer) {
            gsap.to(bgLayer, {
                yPercent: -30,
                ease: 'none',
                scrollTrigger: {
                    trigger: hero,
                    start: 'top top',
                    end: 'bottom top',
                    scrub: true,
                }
            });
        }

        if (midLayer) {
            gsap.to(midLayer, {
                yPercent: -50,
                ease: 'none',
                scrollTrigger: {
                    trigger: hero,
                    start: 'top top',
                    end: 'bottom top',
                    scrub: true,
                }
            });
        }

        if (fgLayer) {
            gsap.to(fgLayer, {
                yPercent: -70,
                ease: 'none',
                scrollTrigger: {
                    trigger: hero,
                    start: 'top top',
                    end: 'bottom top',
                    scrub: true,
                }
            });
        }
    }

    function initFloatingElements() {
        if (isReducedMotion || isMobile) return;

        const floatingElements = document.querySelectorAll('.floating-tag, .fleuron');

        if (floatingElements.length === 0) return;

        let scrollY = 0;
        let lerpedScroll = 0;
        const lerpFactor = 0.08;

        window.addEventListener('scroll', () => {
            scrollY = window.scrollY;
        });

        function animateFloating() {
            lerpedScroll += (scrollY - lerpedScroll) * lerpFactor;

            floatingElements.forEach((el, index) => {
                const speedMultiplier = 0.1 + (index * 0.02);
                const baseY = parseFloat(el.dataset.baseY) || 0;
                const y = baseY - lerpedScroll * speedMultiplier;

                gsap.set(el, {
                    y: y,
                });
            });

            if (!document.hidden) {
                requestAnimationFrame(animateFloating);
            }
        }

        floatingElements.forEach((el, index) => {
            el.dataset.baseY = 0;
        });

        animateFloating();
    }

    function initScrollSmoothing() {
        if (isReducedMotion || isMobile) return;

        const scrollElements = document.querySelectorAll('.scroll-smooth');

        scrollElements.forEach(el => {
            gsap.to(el, {
                y: -50,
                ease: 'none',
                scrollTrigger: {
                    trigger: el.closest('section'),
                    start: 'top bottom',
                    end: 'bottom top',
                    scrub: true,
                }
            });
        });
    }

    function handleResize() {
        if (window.innerWidth < 768 || isReducedMotion) {
            if (lenis) {
                lenis.destroy();
                lenis = null;
            }
            document.documentElement.style.scrollBehavior = 'smooth';
        } else {
            if (!lenis) {
                initLenis();
            }
            ScrollTrigger.refresh();
        }
    }

    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);

        initLenis();
        initParallax();
        initSectionParallax();
        initHeroParallax();
        initFloatingElements();
        initScrollSmoothing();

        window.addEventListener('resize', handleResize);

        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                if (lenis) lenis.stop();
            } else {
                if (lenis) lenis.start();
            }
        });
    } else {
        console.warn('GSAP or ScrollTrigger not loaded');
    }
})();