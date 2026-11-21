# Waleed Hassan — Portfolio Website

> **Computer Scientist, Web Developer & AI Application Builder**  
> BSc Computer Science @ University of Engineering and Technology (UET), Lahore  
> Gujranwala, Pakistan  
> Email: [grw2206420@outlook.com](mailto:grw2206420@outlook.com)  
> GitHub: [github.com/Waleedhasn](https://github.com/Waleedhasn) • LinkedIn: [linkedin.com/in/waleed-hassan-98768b330](https://www.linkedin.com/in/waleed-hassan-98768b330)

---

## 🌟 Overview

An interactive, responsive, high-performance static portfolio website built with pure HTML, CSS, and modern JavaScript:
- **Light & Dark Mode Switcher:** Instant, persistent theme switching with smooth Sun/Moon icon toggle.
- **3D Scroll-Morphing Profile Card:** Seamlessly rotates 180° on scroll and docks into the 3-column biography section.
- **Categorized Tech Stack Bento:** 3 columns showcasing Languages & Frameworks, AI & Retrieval Engineering, and Databases & Tools.
- **3D Skeuomorphic Project Folders:** Interactive file folders with mouse-tracking tilt physics, inner preview document lift, and detailed case study drawer modals.
- **Sinusoidal SVG Experience Roadmap:** Dynamically drawn Bézier curves connecting verified career milestones and academic highlights.
- **Dual-Layer Canvas Crowd Footer:** 105 pedestrians continuously walking behind and in front of Waleed's standing avatar.
- **Ask AI Drawer:** Instant on-site interactive assistant answering questions about projects, technical skills, and background.

---

## 🚀 Quick Start / Deployment

### 1. Run Locally
- Double-click `start.bat` (or open `index.html` in any browser, or run `python server.py`).
- View at: [http://localhost:3000](http://localhost:3000)

### 2. Static Hosting (GitHub Pages / Netlify / Vercel)
This folder is 100% self-contained and pure static.
- **GitHub Pages:**
  1. Push changes to GitHub (or run `deploy_to_github.bat`).
  2. In your repo: **Settings > Pages > Deploy from a branch (`main` / `root`)**.
  3. Live URL: **https://waleedhasn.github.io/Portfolio-Website/**
- **Vercel / Netlify:** Import the repository and deploy with zero build configuration!

---

## 📁 Repository Structure

```
Portfolio website/
├── index.html                   # Master static portfolio webpage
├── bg.jpg                       # Black & white portrait photograph
├── favicon.ico / icon.svg       # Favicons
├── server.py                    # Lightweight local development server
├── start.bat                    # 1-click local launch script
├── deploy_to_github.bat         # 1-click push script to GitHub
├── css/
│   └── style.css                # Base stylesheet and theme tokens
├── js/
│   ├── theme.js                 # Theme engine (Light/Dark mode)
│   ├── folders.js               # 3D folder interactions & modal case studies
│   ├── hero.js                  # Hero interactions & navigation drawer
│   ├── portrait-motion.js       # 3D scroll-driven morphing card
│   ├── timeline.js              # Sinusoidal Bézier curve calculator
│   ├── crowd.js                 # Dual-canvas pedestrian simulation
│   └── chat.js                  # Ask AI assistant drawer
├── footer/
│   └── bengaluru/
│       ├── waleed-standing.png  # Transparent standing avatar (Yellow sneakers)
│       └── crowd-01..07.webp    # Pedestrian crowd sprite sheets
└── README.md                    # Project documentation
```

---
© 2026 Waleed Hassan. All rights reserved.
