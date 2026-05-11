# Cinematic Road Trip Portfolio - Specification Document

## 1. Project Overview

**Project Name:** Dev Journey - Cinematic Portfolio Experience
**Project Type:** Single-page scroll-driven interactive website
**Core Functionality:** A vertical scroll-controlled 3D car journey through a stylized environment, with checkpoint-based portfolio sections that trigger cinematic transitions
**Target Users:** Recruiters, potential clients, and anyone viewing the developer's portfolio

---

## 2. UI/UX Specification

### Visual Theme: "Twilight Highway"

A cinematic sunset/early-evening highway with neon accents. The sky transitions from warm orange/pink at the horizon to deep purple/navy overhead. The road stretches into infinity with strong perspective. Neon signs and futuristic elements appear as we progress.

### Color Palette

| Role | Color | Hex |
|------|-------|-----|
| Sky Gradient Top | Deep Indigo | `#0f0c29` |
| Sky Gradient Mid | Twilight Purple | `#302b63` |
| Sky Horizon | Sunset Orange | `#ff6b35` |
| Road Surface | Dark Asphalt | `#1a1a2e` |
| Road Lines | Hot Pink Neon | `#ff2e63` |
| Road Edge Glow | Cyan | `#08f7fe` |
| Accent Primary | Electric Magenta | `#e91e8c` |
| Accent Secondary | Neon Cyan | `#00fff5` |
| Text Primary | Pure White | `#ffffff` |
| Text Secondary | Soft Lavender | `#b8b5d6` |
| UI Panels | Semi-transparent Black | `rgba(10, 10, 30, 0.85)` |

### Typography

| Element | Font | Weight | Size |
|---------|------|--------|------|
| Main Headings | "Orbitron" (Google Fonts) | 700 | 48px-72px |
| Subheadings | "Orbitron" | 500 | 24px-36px |
| Body Text | "Rajdhani" (Google Fonts) | 400 | 16px-20px |
| UI Elements | "Rajdhani" | 600 | 14px-18px |
| Decorative/Counters | "Orbitron" | 900 | 120px+ |

### Layout Structure

**No traditional navigation bar or fixed UI elements**
- The entire experience is immersive and scroll-driven
- Minimal HUD elements that fade in/out contextually
- Progress indicator showing journey position (subtle, bottom-right)

### Parallax Depth Layers (from back to front)

1. **Sky Layer** (0.1x scroll speed) - Gradient sky with subtle cloud wisps
2. **Distant Mountains** (0.2x) - Silhouetted mountain range
3. **Far City Skyline** (0.3x) - Distant futuristic city silhouette
4. **Mid-ground Buildings** (0.5x) - Closer structures with neon windows
5. **Road & Environment** (1x) - The road surface, lane markings
6. **Car Layer** (fixed center) - The 3D car model
7. **Foreground Elements** (1.5x) - Road signs, barriers, particles

### Responsive Behavior

- Desktop (1200px+): Full 3D WebGL scene with all effects
- Tablet (768px-1199px): Simplified 3D, reduced particle effects
- Mobile (320px-767px): 2D parallax fallback with CSS transforms

---

## 3. Functionality Specification

### Core Mechanics

#### Scroll-to-Motion System
- Vertical scroll position maps to car position on road
- Scroll velocity determines car speed (inertia-based smoothing)
- Maximum scroll distance: 50,000px (defines journey length)
- Physics: `velocity = scrollDelta * 0.8` with `damping = 0.92`
- Easing: Smooth interpolation with `lerp(factor=0.08)`

#### Checkpoint System

| Checkpoint | Position (scroll px) | Section | Trigger Distance |
|------------|---------------------|---------|-------------------|
| Start | 0 | Intro/Hero | - |
| CP1 | 8,000 | About | 500px before |
| CP2 | 18,000 | Skills | 500px before |
| CP3 | 28,000 | Projects | 500px before |
| CP4 | 38,000 | Experience | 500px before |
| CP5 | 45,000 | Contact | 500px before |

#### Environment Transitions

When approaching a checkpoint (±500px):
1. Road speed gradually decreases
2. Environment elements shift to form "stage" layout
3. Car animation transitions to "arriving" state
4. Overlay UI fades in with staggered elements
5. Scrolling becomes disabled or heavily dampened within checkpoint

### Checkpoint Details

#### Checkpoint 1: About (Identity)
- **Trigger:** Approaching shows a large holographic billboard by the roadside
- **Transition:** Billboard expands to fill screen, car slows to stop beside it
- **Content:** Developer name, title, brief bio, profile image (stylized)
- **Animation:** Particles coalesce to form text, gradient background pulse
- **Interaction:** Scroll to dismiss, car resumes journey

#### Checkpoint 2: Skills (Garage Workshop)
- **Trigger:** Roadside transforms into futuristic garage/workshop
- **Transition:** Car enters garage, tools/panels animate onto screen
- **Content:** Skills displayed as glowing holographic tools, each with proficiency meter
- **Visuals:** 
  - Skills as 3D floating icons (hover: spin + glow)
  - Proficiency bars animate on scroll
  - Particle trails between related skills
- **Categories:** Frontend, Backend, Tools, Soft Skills (hover reveals)

#### Checkpoint 3: Projects (Hologram Display)
- **Transition:** Car passes floating project "holograms" along the road
- **Content:** 4-6 projects as interactive holographic panels
- **Interaction:**
  - Click/hover expands project into modal view
  - Navigation via horizontal scroll within checkpoint
  - Each project: title, thumbnail, tech stack, brief, link
- **Animation:** Projects float with subtle bob, glow on hover

#### Checkpoint 4: Experience (Data Highway)
- **Transition:** Road transforms into data highway with animated graphs/stats
- **Content:** Timeline of experience, achievements as floating data blocks
- **Visuals:**
  - Animated bar charts showing years/impact
  - Floating milestone markers
  - Connected nodes showing career progression
- **Animation:** Data points animate in sequence with scroll

#### Checkpoint 5: Contact (Terminal Station)
- **Transition:** Car pulls into a futuristic terminal station
- **Interaction:** 
  - Contact form as terminal interface
  - Buttons for: Email, GitHub, LinkedIn, Twitter
  - Each button triggers animated response
- **Visuals:**
  - Terminal-style input fields with blinking cursor
  - "Transmission" animation on send
  - Success feedback with particle burst

### Ambient Effects

1. **Particle System:**
   - Dust/digital particles floating across screen
   - Speed increases with scroll velocity
   - Color shifts between sections

2. **Lighting:**
   - Dynamic sun/moon position based on scroll
   - Neon flicker effects on signs
   - Car headlights cast glow on environment

3. **Atmosphere:**
   - Subtle fog/mist layers
   - Heat shimmer effect near horizon
   - Stars fade in as journey progresses (evening to night transition)

4. **Camera Shake:**
   - Subtle shake based on speed
   - Increases when passing checkpoint markers

### User Controls

- **Primary:** Vertical scroll (mouse wheel, touch swipe, trackpad)
- **Secondary:** Arrow keys for fine control within checkpoints
- **No:** Traditional click navigation, fixed nav menu

### Edge Cases

- Touch devices: Pinch-to-zoom disabled, scroll hijacking prevented
- Very fast scroll: Velocity capped to prevent visual glitches
- Very slow scroll: Minimum progress ensured
- Resize: Canvas recalculates, maintains aspect ratio
- JS disabled: Fallback to simple vertical scroll with static sections

---

## 4. Technical Implementation

### Libraries & Tools

| Purpose | Library | Version | CDN |
|---------|---------|---------|-----|
| 3D Rendering | Three.js | r158+ | unpkg/three |
| Animation | GSAP | 3.12+ | cdnjs/gsap |
| Scroll Control | GSAP ScrollTrigger | 3.12+ | cdnjs/gsap |
| Physics | Custom (no library) | - | - |

### File Structure

```
portfolio/
├── index.html (single file with embedded CSS/JS)
├── SPEC.md
└── README.md
```

### Performance Targets

- Initial load: < 3 seconds on 4G
- Frame rate: 60fps on desktop, 30fps minimum on mobile
- Memory: < 100MB GPU allocation
- Lazy load: Non-critical assets load after initial paint

---

## 5. Acceptance Criteria

### Visual Checkpoints

- [ ] Sky gradient renders correctly with sunset colors
- [ ] Road has strong perspective convergence to horizon
- [ ] Car model visible and centered
- [ ] Parallax layers move at different speeds
- [ ] Neon elements glow with appropriate blur
- [ ] Particles flow across screen

### Functional Checkpoints

- [ ] Scroll moves car forward along road
- [ ] Car movement has inertia/easing (not instant)
- [ ] All 5 checkpoints trigger at correct scroll positions
- [ ] Each checkpoint displays correct content type
- [ ] Transitions between checkpoints are smooth
- [ ] No jarring jumps or visual glitches

### Interaction Checkpoints

- [ ] About section expands from roadside element
- [ ] Skills animate on hover/interaction
- [ ] Projects are clickable and expandable
- [ ] Experience timeline animates
- [ ] Contact form is functional (can copy email)
- [ ] Journey can be scrolled from start to finish

### Performance Checkpoints

- [ ] No console errors on load
- [ ] Smooth 60fps animation on desktop
- [ ] No memory leaks during long scroll sessions
- [ ] Assets load without blocking

---

## 6. Content Data

### Developer Profile (Checkpoint 1)
```
Name: Alex Chen
Title: Creative Developer
Tagline: "Crafting digital experiences that inspire"
Bio: Full-stack developer with 5+ years of experience building immersive web experiences. Passionate about the intersection of design and technology.
```

### Skills (Checkpoint 2)
```
Frontend: JavaScript, React, Three.js, WebGL, CSS/Animation
Backend: Node.js, Python, PostgreSQL, GraphQL
Tools: Git, Docker, Figma, Blender
Soft Skills: Team Leadership, Problem Solving, Communication
```

### Projects (Checkpoint 3)
```
1. "Neural Visualizer" - AI-powered data visualization tool
2. "Cyber Commerce" - E-commerce platform with 3D product views
3. "Synthwave Radio" - Streaming music app with reactive visuals
4. "Dev Portfolio Engine" - CMS for creative portfolios
```

### Experience (Checkpoint 4)
```
2024: Senior Developer @ TechCorp - Led team of 5
2022: Full Stack Developer @ StartupXYZ - Built MVP from scratch
2020: Junior Developer @ Agency123 - Web development projects
2019: Freelance - Self-taught journey began
```

### Contact (Checkpoint 5)
```
Email: alex@example.com
GitHub: github.com/alexchen
LinkedIn: linkedin.com/in/alexchen
Twitter: @alexchendev
```