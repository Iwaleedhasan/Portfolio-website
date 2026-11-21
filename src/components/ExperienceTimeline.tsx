"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { portfolioData } from "@/data/portfolio";
import { Sparkles, Calendar, Briefcase } from "lucide-react";

export default function ExperienceTimeline() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "center center"],
  });

  const pathLength = useTransform(scrollYProgress, [0.1, 0.85], [0, 1]);

  return (
    <section ref={containerRef} className="py-24 px-4 sm:px-8 max-w-6xl mx-auto w-full" id="experience">
      <div className="mb-14 text-center sm:text-left">
        <span className="text-xs uppercase tracking-widest text-neutral-500 font-mono">
          Career & Practice Journey
        </span>
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mt-1">
          Experience & Practice Timeline
        </h2>
        <p className="text-sm text-neutral-400 mt-2 max-w-xl">
          Academic foundation at UET Lahore, operational retail data systems, and verified software practice areas.
        </p>
      </div>

      {/* Desktop Horizontal Sinusoidal Wave (lg: 1024px+) */}
      <div className="hidden lg:block relative py-12">
        <svg
          viewBox="0 0 1000 240"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-44 overflow-visible"
        >
          {/* Base dimmed path */}
          <path
            d="M 50 120 C 150 40, 250 200, 350 120 C 450 40, 550 200, 650 120 C 750 40, 850 200, 950 120"
            stroke="#262626"
            strokeWidth="3"
            strokeLinecap="round"
          />
          {/* Animated glowing path */}
          <motion.path
            d="M 50 120 C 150 40, 250 200, 350 120 C 450 40, 550 200, 650 120 C 750 40, 850 200, 950 120"
            stroke="#F5F5F5"
            strokeWidth="3.5"
            strokeLinecap="round"
            style={{ pathLength }}
          />

          {/* 5 Milestone Markers along the Wave */}
          {[
            { cx: 50, cy: 120 },
            { cx: 275, cy: 160 },
            { cx: 500, cy: 120 },
            { cx: 725, cy: 80 },
            { cx: 950, cy: 120 },
          ].map((point, idx) => (
            <g key={idx}>
              <circle
                cx={point.cx}
                cy={point.cy}
                r="7"
                fill="#F5F5F5"
                className="drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]"
              />
              <circle
                cx={point.cx}
                cy={point.cy}
                r="14"
                stroke="#F5F5F5"
                strokeWidth="1.5"
                strokeOpacity="0.4"
                className="animate-pulse"
              />
            </g>
          ))}
        </svg>

        {/* 5 Node Cards positioned along the 5 columns */}
        <div className="grid grid-cols-5 gap-4 pt-6">
          {portfolioData.timeline.map((node, i) => (
            <motion.div
              key={node.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12, duration: 0.4 }}
              className="bg-[#141414] border border-[#262626] rounded-xl p-4 flex flex-col justify-between hover:border-neutral-500 transition-colors shadow-lg"
            >
              <div>
                <span className="inline-block text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-neutral-900 border border-neutral-800 text-neutral-300 mb-2">
                  {node.period}
                </span>
                <h4 className="text-sm font-bold text-white leading-tight">
                  {node.title}
                </h4>
                <p className="text-xs text-neutral-400 font-medium mt-1">
                  {node.organization}
                </p>
              </div>
              <p className="text-[11px] text-[#8A8A8A] leading-relaxed mt-3 pt-2 border-t border-neutral-800/80">
                {node.summary}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Mobile & Tablet Vertical Timeline (< 1024px) */}
      <div className="lg:hidden relative border-l-2 border-neutral-800 ml-4 pl-6 sm:pl-8 space-y-8 py-2">
        {portfolioData.timeline.map((node, i) => (
          <motion.div
            key={node.title}
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.35 }}
            className="relative bg-[#141414] border border-[#262626] rounded-xl p-5 shadow-lg"
          >
            {/* Left node dot */}
            <div className="absolute -left-[31px] sm:-left-[39px] top-6 w-3.5 h-3.5 rounded-full bg-white ring-4 ring-neutral-950 shadow-[0_0_10px_rgba(255,255,255,0.7)]" />

            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-neutral-900 border border-neutral-800 text-neutral-300">
                {node.period}
              </span>
              <span className="text-[10px] font-mono text-neutral-500">
                {node.tag}
              </span>
            </div>

            <h3 className="text-base font-bold text-white">
              {node.title}
            </h3>
            <p className="text-xs text-neutral-400 font-medium mt-0.5">
              {node.organization}
            </p>
            <p className="text-xs text-[#8A8A8A] leading-relaxed mt-3 pt-2 border-t border-neutral-800/60">
              {node.summary}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
