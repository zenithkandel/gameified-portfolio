(function() {
    const cursor = document.getElementById('cursor');
    const cursorDot = cursor.querySelector('.cursor-dot');
    const cursorRing = cursor.querySelector('.cursor-ring');

    if (!cursor) return;

    let mouseX = 0;
    let mouseY = 0;
    let ringX = 0;
    let ringY = 0;

    const lerp = (start, end, factor) => start + (end - start) * factor;
    const ringLerpFactor = 0.15;

    const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isMobile = window.innerWidth < 768;

    if (isReducedMotion || isMobile) {
        cursor.style.display = 'none';
        document.body.style.cursor = 'auto';
        return;
    }

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    document.addEventListener('mouseleave', () => {
        cursor.style.opacity = '0';
    });

    document.addEventListener('mouseenter', () => {
        cursor.style.opacity = '1';
    });

    const interactiveElements = document.querySelectorAll(
        'a, button, input, textarea, select, [role="button"], .specimen-box, .project-card'
    );

    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursorRing.style.transform = 'translate(-50%, -50%) scale(1.5)';
            cursorRing.style.borderColor = 'var(--accent-light)';
        });

        el.addEventListener('mouseleave', () => {
            cursorRing.style.transform = 'translate(-50%, -50%) scale(1)';
            cursorRing.style.borderColor = 'var(--accent)';
        });
    });

    function animate() {
        ringX = lerp(ringX, mouseX, ringLerpFactor);
        ringY = lerp(ringY, mouseY, ringLerpFactor);

        cursorDot.style.transform = `translate(-50%, -50%) translate(${mouseX}px, ${mouseY}px)`;
        cursorRing.style.transform = `translate(-50%, -50%) translate(${ringX}px, ${ringY}px)`;

        requestAnimationFrame(animate);
    }

    animate();

    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.addedNodes.length > 0) {
                mutation.addedNodes.forEach((node) => {
                    if (node.nodeType === 1) {
                        const newElements = node.querySelectorAll
                            ? [node, ...node.querySelectorAll('a, button, .specimen-box, .project-card')]
                            : [];

                        newElements.forEach(el => {
                            if (el.matches && (
                                el.matches('a') ||
                                el.matches('button') ||
                                el.matches('.specimen-box') ||
                                el.matches('.project-card') ||
                                el.getAttribute('role') === 'button'
                            )) {
                                el.addEventListener('mouseenter', () => {
                                    cursorRing.style.transform = 'translate(-50%, -50%) scale(1.5)';
                                    cursorRing.style.borderColor = 'var(--accent-light)';
                                });

                                el.addEventListener('mouseleave', () => {
                                    cursorRing.style.transform = 'translate(-50%, -50%) scale(1)';
                                    cursorRing.style.borderColor = 'var(--accent)';
                                });
                            }
                        });
                    }
                });
            }
        });
    });

    observer.observe(document.body, {
        childList: true,
        subtree: true
    });

    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            cursor.style.opacity = '0';
        } else {
            cursor.style.opacity = '1';
        }
    });
})();