# Waleed Hassan — Portfolio Website

> **Software Engineer, Web Developer & AI Application Builder**  
> BSc Computer Science @ University of Engineering and Technology (UET), Lahore  
> Gujranwala, Pakistan  
> 🌐 **Live Website:** [waleedhassan.vercel.app](https://waleedhassan.vercel.app)  
> Email: [waleed2206420@gmail.com](mailto:waleed2206420@gmail.com)  
> GitHub: [github.com/Iwaleedhasan](https://github.com/Iwaleedhasan) • LinkedIn: [linkedin.com/in/waleed-hassan-98768b330](https://www.linkedin.com/in/waleed-hassan-98768b330)

---

## 🌟 Overview

An interactive, responsive portfolio website built with semantic HTML, CSS, vanilla JavaScript, and a Vercel Serverless contact handler:
- **Light & Dark Mode Switcher:** Instant, persistent theme switching with smooth Sun/Moon icon toggle.
- **3D Scroll-Morphing Profile Card:** Seamlessly rotates 180° on scroll and docks into the 3-column biography section.
- **Categorized Tech Stack Bento:** 3 columns showcasing Languages & Frameworks, AI Tooling, and Databases & Tools.
- **3D Skeuomorphic Project Folders:** Interactive file folders with mouse-tracking tilt physics, inner preview document lift, and detailed case study panels.
- **Sinusoidal SVG Experience Roadmap:** Dynamically drawn Bézier curves connecting verified academic and career milestones.
- **Dual-Layer Canvas Crowd Footer:** 105 animated pedestrians walking behind and in front of Waleed's standing avatar.
- **Interactive Portfolio Assistant:** Floating theme-adaptive assistant drawer answering questions about projects, skills, education, and contact info.
- **Protected Serverless Contact API:** Forms submit via `/api/contact` on Vercel with honeypot spam filtering, strict input validation, and per-IP rate limiting.

---

## 🚀 Quick Start / Deployment

### 1. Run Locally
- Run `python server.py`.
- View at: [http://127.0.0.1:3000](http://127.0.0.1:3000)

### 2. Hosting on Vercel
- Connect the repository on Vercel and deploy with zero build step. Static assets are served from root and `/api/contact.js` runs automatically as a Node.js Serverless Function.

---

## 📁 Repository Structure

```
Portfolio website/
├── index.html                        # Master portfolio webpage
├── api/
│   └── contact.js                    # Vercel Serverless contact endpoint (validated & rate-limited)
├── bg.jpg / profile.jpg              # Portrait & square search-thumbnail photographs
├── favicon.ico / icon.svg / *.png    # Multi-resolution favicons & pure-vector monogram icon
├── 8a9e4d5f2b1c6789e02f6270waleed.txt# Bing IndexNow domain verification key
├── robots.txt / sitemap.xml          # Search engine crawl directives & sitemap
├── vercel.json                       # Clean URLs & HTTP security headers (CSP, X-Frame-Options)
├── server.py                         # Localhost-only development server (127.0.0.1:3000)
├── css/
│   └── style.css                     # Base stylesheet and theme tokens
├── js/
│   ├── theme.js                      # Theme engine (Light/Dark mode)
│   ├── folders.js                    # 3D folder interactions & case study panels
│   ├── hero.js                       # Hero interactions & navigation drawer
│   ├── portrait-motion.js            # 3D scroll-driven morphing card
│   ├── timeline.js                   # Sinusoidal Bézier curve calculator
│   ├── crowd.js                      # Dual-canvas pedestrian simulation
│   └── chat.js                       # Interactive portfolio assistant drawer
├── footer/
│   └── crowd/
│       ├── waleed-standing.png       # Transparent standing avatar (Kurta Shalwar & Peshawari Chappal)
│       └── crowd-01..07.webp         # Pedestrian crowd sprite sheets
└── README.md                         # Project documentation
```

---
© 2026 Waleed Hassan. All rights reserved.
