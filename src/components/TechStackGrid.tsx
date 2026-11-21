"use client";

import { motion } from "framer-motion";
import { portfolioData } from "@/data/portfolio";
import { Cpu, Code2, Database } from "lucide-react";

export default function TechStackGrid() {
  const icons = [Code2, Cpu, Database];

  return (
    <section className="py-24 px-4 sm:px-8 max-w-6xl mx-auto w-full" id="stack">
      <div className="flex flex-col space-y-2 mb-12 text-center sm:text-left">
        <span className="text-xs uppercase tracking-widest text-neutral-500 font-mono">
          Technical Capabilities
        </span>
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
          Categorized Tech Stack
        </h2>
        <p className="text-sm text-neutral-400 max-w-xl">
          Core toolsets, frameworks, and engineering practices utilized across systems and application architectures.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
        {portfolioData.techStack.map((category, index) => {
          const Icon = icons[index % icons.length];
          return (
            <div
              key={category.title}
              className="bg-[#141414] border border-[#262626] rounded-2xl p-6 sm:p-7 flex flex-col justify-between hover:border-neutral-700 transition-colors shadow-lg"
            >
              <div>
                <div className="flex items-center space-x-3 mb-3">
                  <div className="p-2 rounded-lg bg-neutral-900 border border-neutral-800 text-neutral-200">
                    <Icon size={18} />
                  </div>
                  <h3 className="text-lg font-bold text-neutral-100 tracking-tight">
                    {category.title}
                  </h3>
                </div>
                <p className="text-xs text-[#8A8A8A] leading-relaxed mb-6">
                  {category.description}
                </p>
              </div>

              <div className="flex flex-wrap gap-2 pt-2">
                {category.skills.map((skill) => (
                  <motion.span
                    key={skill}
                    whileHover={{ y: -2 }}
                    className="inline-flex items-center px-3 py-1.5 rounded-lg text-xs font-mono bg-[#141414] border border-[#262626] text-neutral-300 hover:text-white hover:border-neutral-400 hover:shadow-[0_0_12px_rgba(255,255,255,0.15)] transition-all cursor-default"
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
