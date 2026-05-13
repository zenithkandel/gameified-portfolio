Build a complete, production-ready personal portfolio website for Zenith Kandel from scratch. This is a high-fidelity, cinematic, antique-aesthetic portfolio with heavy parallax scrolling and multilayered animations. Every detail below is intentional — follow it precisely.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
SECTION 1: TECH STACK & SETUP
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Use: Vanilla HTML5, CSS3, JavaScript (ES6+)
Animation library: GSAP 3 (GreenSock) with ScrollTrigger plugin — load from CDN
NO frameworks (no React, no Vue) — pure DOM for performance
File structure:
/index.html
/css/style.css
/css/animations.css
/js/main.js
/js/parallax.js
/js/cursor.js
/assets/fonts/
/assets/images/

Fonts (load via Google Fonts):
• Cormorant Garamond (weights: 300, 400, 600, 700, italic variants) — all headings
• Inter (weights: 300, 400, 500) — body text
• IM Fell English — accent/quote text

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
SECTION 2: DESIGN SYSTEM
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

CSS Variables (define in :root):
--bg-primary: #F5F0E8 (warm parchment)
--bg-secondary: #EDE6D6 (deeper parchment)
--accent: #C4622D (burnt orange)
--accent-light: #E8936A (light terracotta)
--ink: #2C1A0E (dark ink brown - primary text)
--ink-muted: #6B4C35 (muted ink - secondary text)
--border: #C9B99A (aged border)
--gold: #B8972E (antique gold for ornaments)

--font-display: 'Cormorant Garamond', serif
--font-body: 'Inter', sans-serif
--font-accent: 'IM Fell English', serif

--scroll-smooth: cubic-bezier(0.16, 1, 0.3, 1)
--parallax-slow: 0.15
--parallax-mid: 0.4
--parallax-fast: 0.7

Custom cursor: Replace default cursor with a small crosshair (+) in --accent color that has a trailing circular ring with slight lag. Implement in cursor.js using mousemove event with lerp smoothing.

Global styles:
html { scroll-behavior: smooth; overflow-x: hidden; }
body { background: var(--bg-primary); color: var(--ink); cursor: none; }
::selection { background: var(--accent); color: #fff; }
Add a very subtle grain/noise texture overlay using an SVG filter on the body (feTurbulence + feDisplacementMap at very low opacity ~0.03) to give aged paper feel.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
SECTION 3: NAVIGATION
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Fixed top navbar, starts transparent, gets a frosted parchment background (rgba(245, 240, 232, 0.92) + backdrop-filter: blur(12px)) on scroll past 80px.
Left: "ZK" monogram in Cormorant Garamond 600 with a thin ornamental border around it.
Right: Nav links in small-caps Inter 300 with an animated underline that draws from left on hover.
Mobile: hamburger menu that opens a full-screen overlay nav with large Cormorant Garamond link items.
GSAP animation on load: navbar items fade+slide down with 0.1s stagger after curtain reveal completes.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
SECTION 4: HERO SECTION — CURTAIN REVEAL + PARALLAX
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

HTML structure:

    ← left curtain panel

← right curtain panel

← slowest parallax, decorative BG

← medium parallax, ornaments

    ← main text content

← fastest parallax, floating elements

CURTAIN REVEAL ANIMATION (runs on DOMContentLoaded, before scroll):
• Both curtain panels are absolutely positioned, full-height, width: 50%
• Left panel: left: 0; Right panel: right: 0
• They have an aged parchment texture with ornamental border-right / border-left
• GSAP timeline:
tl.to('.curtain-left', { x: '-100%', duration: 2, ease: 'power3.inOut' }, 0)
tl.to('.curtain-right', { x: '100%', duration: 2, ease: 'power3.inOut' }, 0)
tl.from('.hero-content', { opacity: 0, y: 30, duration: 1, ease: 'power2.out' }, 1.5)
• After curtains exit, hide them with display:none

HERO CONTENT:
• Eyebrow text: "Est. 2021 • Kathmandu, Nepal" in small-caps, letter-spacing 0.2em, --ink-muted color
• Main heading: "ZENITH" on line 1 (massive, ~12vw, Cormorant 300), "KANDEL" on line 2 (same size, 600 weight, with a thin ruled line through it or accent color)
• Subtitle: "Self-Taught Developer & Creative Builder" in Inter 300, 1.2rem
• A decorative ornamental divider (SVG line with diamond center) below heading
• Small paragraph: location, grade, years of experience
• CTA button: "Explore Work →" styled as an antique press button with --accent border and hover fill

PARALLAX LAYERS (implemented via GSAP ScrollTrigger scrub):
Layer 1 — .hero-bg-layer (scrub speed 0.15):
Large faded world map outline (SVG, opacity 0.06) centered behind everything
Two diagonal coordinate lines crossing the viewport

Layer 2 — .hero-mid-layer (scrub speed 0.35):
Small compass rose SVG top-right (opacity 0.15)
Thin rectangular ornamental frame around the content area (drifts subtly)
Roman numeral "I" watermark far left in Cormorant, huge, opacity 0.04

Layer 3 — .hero-fg-layer (scrub speed 0.6):
Small floating text elements: "[ developer ]", "[ builder ]", "[ designer ]" at corners
Tiny ornamental asterisks/fleurons that drift

ScrollTrigger setup for hero parallax:
gsap.to('.hero-bg-layer', {
yPercent: -30,
ease: 'none',
scrollTrigger: { trigger: '#hero', start: 'top top', end: 'bottom top', scrub: true }
})
// Repeat for mid and fg layers with different yPercent values

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
SECTION 5: ABOUT SECTION
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Layout: Two columns — left has large decorative "About" heading rotated 90deg as a sidebar label, right has content.

Content:
• Section eyebrow: "— Chapter I"
• Heading: "The Maker Behind The Machine" in Cormorant 600, 3.5rem
• Body text (Inter 300, 1rem, line-height 1.9): Zenith's bio — self-taught developer, Grade 11, Kathmandu. Started coding early, building real-world web projects. Focuses on modern, visually immersive, scalable web experiences combining engineering with UI/UX design.
• A pull quote in IM Fell English italic: "I prefer learning by building, experimenting, and refining ideas into polished products."
• Stats row: "4+ Years Coding", "10+ Projects Built", "Grade 11 Student" — displayed as antique data labels

PARALLAX in About:
BG layer: Large faded "ZK" monogram (Cormorant, opacity 0.04) scrolls at 0.2x speed
Floating thin horizontal rules appear from left as you scroll in
A faded Nepal outline map SVG at 0.08 opacity drifts upward at 0.15x speed
Section entrance: content columns slide in from opposite sides using ScrollTrigger + GSAP

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
SECTION 6: THE ARSENAL | MODERN ENGINEERING (Skills)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Section heading: "The Arsenal" in Cormorant 600, 4rem. Subtitle: "Modern Engineering" in small-caps Inter.

Skills displayed as APOTHECARY SPECIMEN BOXES:
Each skill is a card styled as an antique specimen/apothecary label:
• Rectangular, portrait orientation (~160px × 200px)
• Thick ornamental double-border (CSS border with inner box-shadow border trick)
• Skill name in Cormorant 600 uppercase, centered
• A small SVG icon or symbolic glyph below the name
• A thin horizontal rule
• A "classification" label below (e.g. "Frontend Layer", "Backend Engine", "Infrastructure")
• Background: --bg-secondary with very subtle vignette
• Corner ornaments (CSS ::before and ::after with content: '✦' or similar at corners)

Layout: CSS Grid, auto-fill, minmax(150px, 1fr), gap 1.5rem
Skills list: HTML, CSS, JavaScript, PHP, Tailwind CSS, React, Node.js, MongoDB, MySQL, Cloud Systems, DevOps, AI Workflows

HOVER effect on each specimen box:
transform: translateY(-8px) rotate(0.5deg);
box-shadow: 8px 12px 24px rgba(44, 26, 14, 0.15);
The inner ornamental border subtly glows in --accent color
Transition: 0.4s ease

PARALLAX in Arsenal:
Section BG: large faded gear/cog SVG (opacity 0.04) scrolls at 0.2x
Cards stagger-enter with ScrollTrigger: each card translates from y:60 to y:0 with 0.08s stagger
Section title drifts at 0.5x speed relative to cards

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
SECTION 7: PROJECTS SECTION
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Section heading: "The Works" | "Selected Projects" as subtitle

Projects:

1. CineStream — Movie Streaming Platform (React, Node.js, MongoDB)
2. FocusBoard — Productivity Dashboard (React, Tailwind, MySQL)
3. AttendAI — Smart Attendance System (Python, OpenCV, Node.js)
4. VentureKit — Startup Concept & Landing Sites (HTML, CSS, JS)
5. Portfolio OS — Cinematic Portfolio Experience (GSAP, HTML, CSS)

Each project as a large editorial FEATURE CARD:
• Full-width on mobile, alternating left-right layout on desktop (odd cards: image left, text right; even: reversed)
• Project number in huge Cormorant 300 (e.g. "01") as BG watermark, opacity 0.06
• Project title in Cormorant 600, 2.5rem
• One-line description in Inter 300
• Tech stack as small pill tags (--border color background, --ink text)
• "View Project →" antique-styled link
• Decorative aged-photo placeholder with sepia filter and vignette

3D HOVER on cards:
Use CSS perspective: 1000px on parent
On mousemove: calculate mouse position relative to card center, apply rotateX and rotateY (max ±8deg) via JS
Add a subtle highlight shine that follows mouse position (radial gradient overlay)

PARALLAX in Projects:
Each card's BG number watermark scrolls at 0.2x (slower than card)
Cards themselves enter from y:80 with ScrollTrigger, staggered
Section BG has a large faded architectural blueprint grid (CSS, opacity 0.03) scrolling at 0.15x

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
SECTION 8: PARALLAX ENGINE — IMPLEMENTATION DETAILS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

In parallax.js, implement a global parallax system:

1. GSAP ScrollTrigger-based (for elements pinned to sections):
   Every section has data-parallax-bg, data-parallax-mid, data-parallax-fg attributes
   On init, query all these, register ScrollTrigger for each with scrub: 1

2. RequestAnimationFrame-based (for cursor-reactive floating elements):
   Track scrollY with a lerped value (lerpedScroll += (scrollY - lerpedScroll) _ 0.08)
   Apply transforms to floating elements based on lerpedScroll _ speedMultiplier

3. Scroll smoothing:
   Use Lenis smooth scroll library (CDN) for buttery smooth scroll momentum
   Init: const lenis = new Lenis({ duration: 1.8, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 _ t)) })
   Connect Lenis to GSAP ticker: gsap.ticker.add((time) => lenis.raf(time _ 1000))

4. IntersectionObserver for section entrance animations (fallback + performance):
   Elements with class .reveal start at opacity:0, y:40
   When they enter viewport, GSAP animates them to opacity:1, y:0

5. Mobile handling:
   If window.innerWidth < 768 OR prefers-reduced-motion is set:
   Disable Lenis, set scroll-behavior: smooth on html
   Reduce parallax yPercent values by 60%
   Disable 3D card tilt

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
SECTION 9: CONTACT SECTION & FOOTER
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Contact section:
Large centered heading: "Let's Build Something" in Cormorant 600, 5rem
Subheading: "Real. Ambitious. Extraordinary." in small-caps
Email displayed as large antique-press styled text link
Social links: GitHub, LinkedIn — as icon+text antique labels
Decorative ornamental border frames the whole section

PARALLAX in Contact:
Heading text splits into words, each word has slight different parallax rate
Background: large faded compass rose (SVG, opacity 0.05) slowly rotates AND scrolls at 0.1x

Footer:
Styled as antique newspaper footer
Top: thin double ornamental border
Left: "© MMXXV Zenith Kandel" in Cormorant small-caps
Center: ornamental logo mark
Right: "Kathmandu, Nepal" with small compass mark
Very bottom: "Handcrafted with obsessive attention to detail."

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
SECTION 10: PERFORMANCE & POLISH
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

• All images: loading="lazy", proper width/height attributes
• SVG decorative elements: aria-hidden="true", role="presentation"
• GSAP: use will-change: transform on parallax elements, remove after animation completes
• No layout shifts: reserve space for all animated elements
• Page load order: CSS first → HTML → GSAP CDN → main.js (defer)
• Preload Cormorant Garamond font with
• All scroll animations use transform (not top/left) for GPU acceleration
• requestAnimationFrame loop must check document visibility (pause when tab is hidden)

Breakpoints:
Mobile: 320px–767px (single column, reduced parallax, stacked nav)
Tablet: 768px–1199px (2-col grids, moderate parallax)
Desktop: 1200px–1599px (full experience)
Ultrawide: 1600px+ (max-width: 1400px container centered, enhanced parallax depth)

Accessibility:
prefers-reduced-motion media query must disable ALL animations and parallax
Focus styles on all interactive elements
ARIA labels on icon-only buttons
Color contrast ratios must pass WCAG AA
