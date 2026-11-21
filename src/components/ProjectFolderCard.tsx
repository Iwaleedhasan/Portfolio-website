"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { portfolioData, Project } from "@/data/portfolio";
import { Folder, ExternalLink, X, ArrowUpRight, Github } from "lucide-react";

export default function ProjectFolderCard() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [activeFolderId, setActiveFolderId] = useState<string | null>(null);

  const toggleFolder = (project: Project) => {
    if (activeFolderId === project.id) {
      setSelectedProject(project);
    } else {
      setActiveFolderId(project.id);
    }
  };

  return (
    <section className="py-24 px-4 sm:px-8 max-w-6xl mx-auto w-full" id="projects">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-14 gap-4">
        <div>
          <span className="text-xs uppercase tracking-widest text-neutral-500 font-mono">
            Featured Systems
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mt-1">
            Featured Projects
          </h2>
          <p className="text-sm text-neutral-400 mt-2 max-w-xl">
            Interactive skeuomorphic file folders. Hover or tap to peek into the architecture, or click to inspect the case study.
          </p>
        </div>

        <a
          href={portfolioData.socials.github}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center space-x-2 text-xs font-mono uppercase tracking-wider text-neutral-400 hover:text-white transition"
        >
          <Github size={15} />
          <span>GitHub Archive</span>
          <ArrowUpRight size={14} />
        </a>
      </div>

      {/* 4-Column Responsive Grid with 3D Perspective */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-7">
        {portfolioData.projects.map((project) => {
          const isOpen = activeFolderId === project.id;

          return (
            <div
              key={project.id}
              className="relative w-full h-80 select-none cursor-pointer group"
              style={{ perspective: 1000 }}
              onClick={() => toggleFolder(project)}
            >
              {/* Layer 1: Back Sleeve (z-0) with raised top tab */}
              <div className="absolute inset-0 z-0 bg-[#161616] border border-[#262626] rounded-2xl overflow-hidden shadow-xl">
                {/* Top-left folder tab */}
                <div className="absolute top-0 left-0 w-32 h-6 bg-[#222222] border-r border-b border-[#303030] rounded-br-xl flex items-center px-3 space-x-1.5 text-[10px] font-mono text-neutral-400">
                  <Folder size={11} />
                  <span className="truncate">{project.tags[0]}</span>
                </div>
              </div>

              {/* Layer 2: Inner White Document (z-10) */}
              <motion.div
                initial={false}
                animate={{
                  y: isOpen ? -48 : -4,
                  rotate: isOpen ? 2 : 0,
                }}
                whileHover={{
                  y: -36,
                  rotate: 2,
                }}
                transition={{ type: "spring", stiffness: 280, damping: 22 }}
                className="absolute inset-x-3.5 top-6 bottom-4 z-10 bg-[#F5F5F5] text-neutral-950 rounded-xl p-4 shadow-xl flex flex-col justify-between"
              >
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-[10px] font-mono uppercase font-bold tracking-wider text-neutral-500">
                      {project.category}
                    </span>
                    <span className="w-1.5 h-1.5 rounded-full bg-neutral-900" />
                  </div>

                  <h4 className="text-sm font-bold leading-snug line-clamp-2 text-neutral-900">
                    {project.title}
                  </h4>

                  <p className="text-[11px] text-neutral-600 mt-2 line-clamp-3 leading-relaxed">
                    {project.description}
                  </p>
                </div>

                <div className="pt-2 border-t border-neutral-200 flex items-center justify-between">
                  <div className="flex flex-wrap gap-1">
                    {project.tags.slice(0, 2).map((tag) => (
                      <span
                        key={tag}
                        className="text-[9px] font-mono px-1.5 py-0.5 bg-neutral-200 rounded text-neutral-700"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <span className="text-[10px] font-bold text-neutral-900 inline-flex items-center space-x-0.5">
                    <span>Inspect</span>
                    <ArrowUpRight size={12} />
                  </span>
                </div>
              </motion.div>

              {/* Layer 3: Front Flap (z-20) */}
              <motion.div
                initial={false}
                animate={{
                  rotateX: isOpen ? -28 : 0,
                }}
                whileHover={{
                  rotateX: -24,
                }}
                transition={{ type: "spring", stiffness: 280, damping: 22 }}
                style={{ transformOrigin: "bottom" }}
                className="absolute inset-x-0 bottom-0 top-12 z-20 bg-[#1C1C1C] border border-[#2b2b2b] rounded-b-2xl p-4 flex flex-col justify-between shadow-2xl"
              >
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-500">
                    {project.category}
                  </span>
                  <h3 className="text-base font-bold text-white mt-1 leading-tight">
                    {project.title}
                  </h3>
                  <p className="text-xs text-neutral-400 mt-1">
                    {project.subtitle}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-neutral-800/80">
                  <span className="text-[10px] font-mono text-neutral-500">
                    Click to open modal
                  </span>
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="p-1.5 text-neutral-400 hover:text-white rounded-lg hover:bg-neutral-800 transition"
                    title="View GitHub"
                  >
                    <ExternalLink size={14} />
                  </a>
                </div>
              </motion.div>
            </div>
          );
        })}
      </div>

      {/* Case Study Modal */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-[#141414] border border-[#262626] rounded-2xl max-w-2xl w-full max-h-[85vh] overflow-y-auto p-6 sm:p-8 text-neutral-100 shadow-2xl relative"
            >
              <button
                type="button"
                onClick={() => setSelectedProject(null)}
                className="absolute top-5 right-5 p-2 text-neutral-400 hover:text-white rounded-full hover:bg-neutral-800 transition"
                aria-label="Close Case Study"
              >
                <X size={20} />
              </button>

              <div className="space-y-6">
                <div>
                  <span className="text-xs font-mono uppercase tracking-widest text-neutral-500">
                    {selectedProject.category}
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-bold text-white mt-1">
                    {selectedProject.title}
                  </h3>
                  <p className="text-sm text-neutral-400 mt-1">
                    {selectedProject.subtitle}
                  </p>
                </div>

                <div className="flex flex-wrap gap-2">
                  {selectedProject.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs font-mono px-2.5 py-1 rounded bg-neutral-900 border border-neutral-800 text-neutral-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <p className="text-sm text-neutral-300 leading-relaxed">
                  {selectedProject.description}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-neutral-800 text-xs">
                  <div className="p-3 bg-neutral-900/50 rounded-xl border border-neutral-800/60">
                    <strong className="block text-neutral-400 mb-1 uppercase font-mono">
                      Problem
                    </strong>
                    <p className="text-neutral-300 leading-normal">
                      {selectedProject.details.problem}
                    </p>
                  </div>
                  <div className="p-3 bg-neutral-900/50 rounded-xl border border-neutral-800/60">
                    <strong className="block text-neutral-400 mb-1 uppercase font-mono">
                      Architecture
                    </strong>
                    <p className="text-neutral-300 leading-normal">
                      {selectedProject.details.architecture}
                    </p>
                  </div>
                  <div className="p-3 bg-neutral-900/50 rounded-xl border border-neutral-800/60">
                    <strong className="block text-neutral-400 mb-1 uppercase font-mono">
                      Impact
                    </strong>
                    <p className="text-neutral-300 leading-normal">
                      {selectedProject.details.impact}
                    </p>
                  </div>
                </div>

                <div className="flex justify-end pt-4">
                  <a
                    href={selectedProject.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-2 bg-white text-neutral-950 font-semibold text-xs px-5 py-2.5 rounded-full hover:bg-neutral-200 transition"
                  >
                    <span>View Repository on GitHub</span>
                    <ExternalLink size={14} />
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
