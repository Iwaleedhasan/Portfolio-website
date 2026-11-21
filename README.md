# Waleed Hassan — Portfolio Website

> **Computer Scientist, Web Developer & AI Application Builder**  
> BSc Computer Science @ University of Engineering and Technology (UET), Lahore  
> Gujranwala, Pakistan  
> Email: [grw2206420@outlook.com](mailto:grw2206420@outlook.com)  
> GitHub: [github.com/Waleedhasn](https://github.com/Waleedhasn) • LinkedIn: [linkedin.com/in/waleed-hassan-98768b330](https://www.linkedin.com/in/waleed-hassan-98768b330)

---

## 🌟 Overview

An interactive, responsive, high-performance portfolio website built with:
- **Light & Dark Mode Switcher:** Instant, persistent theme switching with smooth Sun/Moon icon toggle.
- **3D Scroll-Morphing Profile Card:** Seamlessly rotates 180° on scroll and docks into the 3-column biography section.
- **Categorized Tech Stack Bento:** 3 columns showcasing Languages & Frameworks, AI & Retrieval Engineering, and Databases & Tools.
- **3D Skeuomorphic Project Folders:** Interactive file folders with mouse-tracking tilt physics, inner preview document lift, and detailed case study drawer modals.
- **Sinusoidal SVG Experience Roadmap:** Dynamically drawn Bézier curves connecting verified career milestones and academic highlights.
- **Dual-Layer Canvas Crowd Footer:** 105 pedestrians continuously walking behind and in front of Waleed's standing avatar.
- **Ask AI Drawer:** Instant on-site interactive assistant answering questions about projects, technical skills, and background.

---

## 🚀 Quick Start / Deployment

### Option 1: Static Hosting (GitHub Pages / Netlify / Vercel)
This folder is 100% self-contained! You can double-click `index.html` or deploy directly to **GitHub Pages**:
1. Push this folder to a GitHub repository:
   ```bash
   git init
   git add .
   git commit -m "Initial commit of Waleed Hassan Portfolio Website"
   git branch -M main
   git remote add origin https://github.com/Waleedhasn/<repo-name>.git
   git push -u origin main
   ```
2. Enable **GitHub Pages** under **Settings > Pages > Deploy from branch (main / root)**.

### Option 2: Run with Next.js App Router
```bash
npm install
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to view the Next.js version.

---

## 📁 Repository Structure

```
Portfolio website/
├── index.html                   # Master self-contained portfolio webpage
├── bg.jpg                       # Black & white portrait photograph
├── favicon.ico / icon.svg       # Favicons
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
├── src/                         # Next.js App Router source files
├── public/                      # Static assets for Next.js
└── README.md                    # Project documentation
```

---
© 2026 Waleed Hassan. All rights reserved.
