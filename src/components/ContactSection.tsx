"use client";

import { useState } from "react";
import { portfolioData } from "@/data/portfolio";
import { Mail, Copy, Check, Github, Linkedin, MapPin, GraduationCap, Send } from "lucide-react";

export default function ContactSection() {
  const [copied, setCopied] = useState(false);
  const [formState, setFormState] = useState({ name: "", email: "", message: "" });
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(portfolioData.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.name.trim() || !formState.email.trim() || !formState.message.trim()) {
      setToastMessage("Please fill in all fields.");
      setTimeout(() => setToastMessage(null), 3000);
      return;
    }

    setIsSubmitting(true);
    // Build mailto link
    const subject = encodeURIComponent(`Portfolio Inquiry from ${formState.name}`);
    const body = encodeURIComponent(
      `Name: ${formState.name}\nEmail: ${formState.email}\n\nMessage:\n${formState.message}`
    );

    setTimeout(() => {
      window.location.href = `mailto:${portfolioData.email}?subject=${subject}&body=${body}`;
      setIsSubmitting(false);
      setToastMessage("Opening your email client...");
      setFormState({ name: "", email: "", message: "" });
      setTimeout(() => setToastMessage(null), 4000);
    }, 400);
  };

  return (
    <section className="py-24 px-4 sm:px-8 max-w-6xl mx-auto w-full relative" id="contact">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
        
        {/* Left Column: Heading, Badges, Copyable Email */}
        <div className="space-y-8">
          <div>
            <span className="text-xs uppercase tracking-widest text-neutral-500 font-mono">
              Get in Touch
            </span>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-white mt-1">
              Let&apos;s talk.
            </h2>
            <p className="text-sm sm:text-base text-neutral-400 mt-4 leading-relaxed max-w-md">
              Whether you are discussing a software engineering role, an algorithmic project, or a web platform collaboration—my inbox is open.
            </p>
          </div>

          {/* Copyable Email Pill */}
          <div className="flex items-center space-x-3">
            <button
              type="button"
              onClick={handleCopy}
              className="inline-flex items-center space-x-2.5 px-4 py-2.5 rounded-full bg-[#141414] border border-[#262626] hover:border-neutral-500 transition-colors text-xs sm:text-sm font-mono text-neutral-200 group"
            >
              <Mail size={15} className="text-neutral-400 group-hover:text-white" />
              <span>{portfolioData.email}</span>
              {copied ? (
                <span className="inline-flex items-center space-x-1 text-emerald-400 text-xs">
                  <Check size={14} />
                  <span>Copied!</span>
                </span>
              ) : (
                <Copy size={13} className="text-neutral-500 group-hover:text-neutral-300" />
              )}
            </button>
          </div>

          {/* Academic & Location Badges */}
          <div className="space-y-2.5 text-xs sm:text-sm text-neutral-400">
            <div className="flex items-center space-x-2.5">
              <GraduationCap size={16} className="text-neutral-300 shrink-0" />
              <span>{portfolioData.currentlyAt}</span>
            </div>
            <div className="flex items-center space-x-2.5">
              <MapPin size={16} className="text-neutral-300 shrink-0" />
              <span>{portfolioData.location}</span>
            </div>
          </div>

          {/* Monochrome Social Links */}
          <div className="flex items-center space-x-4 pt-2">
            <a
              href={portfolioData.socials.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-full bg-[#141414] border border-[#262626] text-neutral-300 hover:text-white hover:border-neutral-500 transition shadow-md"
              aria-label="GitHub Profile"
            >
              <Github size={18} />
            </a>
            <a
              href={portfolioData.socials.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-full bg-[#141414] border border-[#262626] text-neutral-300 hover:text-white hover:border-neutral-500 transition shadow-md"
              aria-label="LinkedIn Profile"
            >
              <Linkedin size={18} />
            </a>
          </div>
        </div>

        {/* Right Column: Minimalist Bottom-Bordered Form */}
        <div className="bg-[#141414] border border-[#262626] rounded-2xl p-7 sm:p-8 shadow-2xl relative">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-xs font-mono uppercase tracking-wider text-neutral-400 mb-2">
                Your name
              </label>
              <input
                type="text"
                id="name"
                value={formState.name}
                onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                placeholder="What should I call you?"
                required
                className="w-full bg-transparent border-b border-[#262626] focus:border-white text-sm text-neutral-100 pb-2.5 outline-none transition-colors placeholder:text-neutral-600"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-xs font-mono uppercase tracking-wider text-neutral-400 mb-2">
                Email address
              </label>
              <input
                type="email"
                id="email"
                value={formState.email}
                onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                placeholder="you@company.com"
                required
                className="w-full bg-transparent border-b border-[#262626] focus:border-white text-sm text-neutral-100 pb-2.5 outline-none transition-colors placeholder:text-neutral-600"
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-xs font-mono uppercase tracking-wider text-neutral-400 mb-2">
                What do you have in mind?
              </label>
              <textarea
                id="message"
                rows={4}
                value={formState.message}
                onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                placeholder="A little about your opportunity, project, or inquiry..."
                required
                className="w-full bg-transparent border-b border-[#262626] focus:border-white text-sm text-neutral-100 pb-2.5 outline-none transition-colors resize-none placeholder:text-neutral-600"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full inline-flex items-center justify-center space-x-2 bg-white text-neutral-950 font-semibold text-sm py-3.5 rounded-xl hover:bg-neutral-200 transition shadow-lg group"
            >
              <span>{isSubmitting ? "Preparing..." : "Send email ->"}</span>
              <Send size={15} className="transform group-hover:translate-x-1 transition-transform" />
            </button>
          </form>

          {/* Interactive Submission Toast */}
          {toastMessage && (
            <div className="absolute -bottom-14 inset-x-4 bg-neutral-900 border border-neutral-700 text-white text-xs font-mono py-2.5 px-4 rounded-xl shadow-2xl text-center animate-in fade-in slide-in-from-bottom-2 duration-200">
              {toastMessage}
            </div>
          )}
        </div>

      </div>
    </section>
  );
}
