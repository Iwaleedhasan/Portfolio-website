"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { portfolioData } from "@/data/portfolio";
import { ArrowUp, Github, Linkedin } from "lucide-react";

export default function CrowdFooter() {
  const footerRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: footerRef,
    offset: ["start end", "end end"],
  });

  // Subtle parallax shift for background crowd
  const crowdParallaxX = useTransform(scrollYProgress, [0, 1], [-40, 40]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer ref={footerRef} className="w-full bg-[#0B0B0B] text-neutral-100 flex flex-col justify-between">
      
      {/* Top Dark Section */}
      <div className="max-w-6xl mx-auto w-full px-4 sm:px-8 pt-20 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 pb-16 border-b border-neutral-800/80">
          
          {/* Col 1: Identity */}
          <div className="space-y-3">
            <h3 className="text-2xl font-black tracking-tight text-white">
              {portfolioData.fullName}.
            </h3>
            <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
              Computer Scientist &amp; Web Developer
              <br />
              University of Engineering and Technology, Lahore
            </p>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="space-y-3">
            <span className="text-xs uppercase font-mono tracking-widest text-neutral-500">
              Explore
            </span>
            <div className="flex flex-col space-y-2 text-sm text-neutral-300">
              <a href="#about" className="hover:text-white transition w-fit">About</a>
              <a href="#stack" className="hover:text-white transition w-fit">Tech Stack</a>
              <a href="#projects" className="hover:text-white transition w-fit">Featured Projects</a>
              <a href="#experience" className="hover:text-white transition w-fit">Experience &amp; Practice</a>
              <a href="#contact" className="hover:text-white transition w-fit">Contact</a>
            </div>
          </div>

          {/* Col 3: Get in touch & Socials */}
          <div className="space-y-3">
            <span className="text-xs uppercase font-mono tracking-widest text-neutral-500">
              Get in Touch
            </span>
            <p className="text-sm">
              <a
                href={`mailto:${portfolioData.email}`}
                className="text-neutral-200 hover:text-white underline underline-offset-4 font-mono text-xs sm:text-sm"
              >
                {portfolioData.email}
              </a>
            </p>
            <div className="flex items-center space-x-3 pt-2">
              <a
                href={portfolioData.socials.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-white hover:border-neutral-600 transition"
                aria-label="GitHub"
              >
                <Github size={16} />
              </a>
              <a
                href={portfolioData.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-white hover:border-neutral-600 transition"
                aria-label="LinkedIn"
              >
                <Linkedin size={16} />
              </a>
            </div>
            <p className="text-xs text-neutral-500 font-mono pt-3">
              {portfolioData.heroTagLeft} {portfolioData.fullName}. All rights reserved.
            </p>
          </div>

        </div>

        {/* Section divider with See you around and Back to top */}
        <div className="flex items-center justify-between pt-8 text-sm">
          <p className="text-base sm:text-lg font-bold text-neutral-200">
            See you around.
          </p>
          <button
            type="button"
            onClick={scrollToTop}
            className="inline-flex items-center space-x-1.5 text-xs font-mono uppercase tracking-wider text-neutral-400 hover:text-white transition"
          >
            <span>Back to top</span>
            <ArrowUp size={14} />
          </button>
        </div>
      </div>

      {/* Bottom White Illustrated Canvas ("The footer is the main character now") */}
      <div className="relative w-full bg-white text-neutral-950 overflow-hidden h-80 sm:h-96 md:h-[440px] flex flex-col justify-end select-none">
        
        {/* Layer 1 (z-0): Giant 'WALEED' Watermark */}
        <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none">
          <span className="font-black text-[clamp(4.5rem,18vw,16rem)] text-[#E8E8E8] tracking-tighter uppercase select-none leading-none">
            {portfolioData.firstName}
          </span>
        </div>

        {/* Layer 2 (z-10): Hand-drawn SVG Crowd Background */}
        <motion.div
          style={{ x: crowdParallaxX }}
          className="absolute inset-0 z-10 w-[120%] -left-[10%] bottom-0 flex items-end pointer-events-none opacity-85"
        >
          <div className="relative w-full h-44 sm:h-64">
            <Image
              src="/crowd-bg.svg"
              alt="Illustrated crowd"
              fill
              className="object-contain object-bottom"
            />
          </div>
        </motion.div>

        {/* Layer 3 (z-20): Centered Foreground Developer Character */}
        <div className="relative z-20 flex justify-center items-end w-full pb-0 group cursor-pointer">
          <motion.div
            whileHover={{ scale: 1.05, y: -6 }}
            transition={{ type: "spring", stiffness: 350, damping: 25 }}
            className="relative w-28 sm:w-36 md:w-48 h-64 sm:h-84 md:h-[400px] filter drop-shadow-xl"
          >
            <Image
              src="/character-hero.png"
              alt={`${portfolioData.fullName} illustrated avatar`}
              fill
              className="object-contain object-bottom mix-blend-multiply"
              priority
            />
          </motion.div>
        </div>

        {/* Bottom subtle traffic note */}
        <div className="relative z-30 w-full text-center py-2 bg-neutral-100/90 border-t border-neutral-200 text-[11px] font-mono text-neutral-600">
          Finally, some traffic on my website.
        </div>

      </div>

    </footer>
  );
}
