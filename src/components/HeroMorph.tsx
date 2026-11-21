"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { portfolioData } from "@/data/portfolio";
import { ArrowRight, MapPin, GraduationCap } from "lucide-react";

export default function HeroMorph() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Top banner fades out and scales down as user scrolls
  const bannerOpacity = useTransform(scrollYProgress, [0, 0.45], [1, 0]);
  const bannerScale = useTransform(scrollYProgress, [0, 0.45], [1, 0.92]);
  const bannerY = useTransform(scrollYProgress, [0, 0.45], [0, -60]);

  // Portrait 3D rotation and position
  const rotateY = useTransform(scrollYProgress, [0, 0.6], [-16, 0]);
  const rotateX = useTransform(scrollYProgress, [0, 0.6], [8, 0]);
  const cardScale = useTransform(scrollYProgress, [0, 0.6], [1.08, 1]);
  const cardY = useTransform(scrollYProgress, [0, 0.6], [20, 0]);

  // Bio content fades in and docks
  const bioOpacity = useTransform(scrollYProgress, [0.35, 0.75], [0, 1]);
  const bioY = useTransform(scrollYProgress, [0.35, 0.75], [40, 0]);

  return (
    <section ref={containerRef} className="relative h-[220vh] w-full" id="about">
      {/* Sticky viewport frame */}
      <div className="sticky top-0 h-screen w-full flex flex-col justify-between px-4 sm:px-8 py-10 pt-20 md:pt-24 overflow-hidden">
        
        {/* Layer 1: Top Hero Banner Display at Scroll 0 */}
        <motion.div
          style={{ opacity: bannerOpacity, scale: bannerScale, y: bannerY }}
          className="w-full flex flex-col items-center justify-center my-auto pointer-events-none select-none z-10"
        >
          <div className="text-center w-full max-w-6xl">
            <h1 className="font-black tracking-tighter text-[clamp(2.4rem,7.5vw,7.8rem)] leading-none text-neutral-100 font-mono uppercase drop-shadow-sm">
              {portfolioData.heroBannerTitle}
            </h1>
          </div>

          <div className="w-full max-w-5xl flex items-center justify-between mt-6 text-xs sm:text-sm font-mono text-neutral-400 px-2">
            <span className="tracking-widest">{portfolioData.heroTagLeft}</span>
            <span className="text-neutral-500 tracking-wider">
              {portfolioData.heroTagRight}
            </span>
          </div>
        </motion.div>

        {/* Layer 2: 3-Column Bio Layout Reveal (Docked on Scroll) */}
        <div className="w-full max-w-6xl mx-auto my-auto z-20">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-12 items-center">
            
            {/* Left Column: Greeting & Academic Credentials */}
            <motion.div
              style={{ opacity: bioOpacity, y: bioY }}
              className="flex flex-col space-y-4 text-center lg:text-left order-2 lg:order-1"
            >
              <span className="inline-block text-xs uppercase tracking-widest text-neutral-400 font-mono">
                Introduction
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white">
                Hi, I&apos;m {portfolioData.firstName.charAt(0) + portfolioData.firstName.slice(1).toLowerCase()}.
              </h2>
              <p className="text-base sm:text-lg text-neutral-300 font-medium leading-relaxed">
                {portfolioData.roleSubtitle}
              </p>
              
              <div className="pt-2 flex flex-col space-y-2 text-xs sm:text-sm text-neutral-400">
                <div className="flex items-center justify-center lg:justify-start space-x-2">
                  <GraduationCap size={16} className="text-neutral-300 shrink-0" />
                  <span>{portfolioData.currentlyAt}</span>
                </div>
                <div className="flex items-center justify-center lg:justify-start space-x-2">
                  <MapPin size={16} className="text-neutral-300 shrink-0" />
                  <span>{portfolioData.location}</span>
                </div>
              </div>
            </motion.div>

            {/* Center Column: 3D Settling Portrait Card */}
            <div
              className="flex justify-center items-center order-1 lg:order-2"
              style={{ perspective: 1200 }}
            >
              <motion.div
                style={{
                  rotateY,
                  rotateX,
                  scale: cardScale,
                  y: cardY,
                  transformStyle: "preserve-3d",
                }}
                className="relative w-56 sm:w-64 md:w-72 aspect-[3/4] rounded-2xl overflow-hidden border border-neutral-800 bg-neutral-900 shadow-2xl shadow-black/90 group"
              >
                <Image
                  src="/portrait-bw.png"
                  alt={portfolioData.fullName}
                  fill
                  priority
                  className="object-cover object-top filter grayscale contrast-110 group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 256px, 288px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-3 inset-x-3 flex justify-between items-end text-[10px] font-mono uppercase text-neutral-400 tracking-wider">
                  <span>{portfolioData.fullName}</span>
                  <span>{portfolioData.heroTagLeft}</span>
                </div>
              </motion.div>
            </div>

            {/* Right Column: Bio Summary & Project CTA */}
            <motion.div
              style={{ opacity: bioOpacity, y: bioY }}
              className="flex flex-col space-y-6 text-center lg:text-left order-3"
            >
              <p className="text-sm sm:text-base text-neutral-300 leading-relaxed font-normal">
                {portfolioData.bioSummary}
              </p>

              <div>
                <a
                  href="#projects"
                  className="inline-flex items-center space-x-2 text-xs sm:text-sm font-semibold uppercase tracking-wider text-neutral-950 bg-white hover:bg-neutral-200 px-6 py-3 rounded-full transition-all shadow-md group"
                >
                  <span>Explore projects</span>
                  <ArrowRight
                    size={16}
                    className="transform group-hover:translate-x-1 transition-transform"
                  />
                </a>
              </div>
            </motion.div>

          </div>
        </div>

      </div>
    </section>
  );
}
