"use client";

import { useState, useEffect } from "react";
import { portfolioData } from "@/data/portfolio";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "About", href: "#about" },
    { label: "Stack", href: "#stack" },
    { label: "Projects", href: "#projects" },
    { label: "Experience", href: "#experience" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <header className="fixed top-4 inset-x-0 z-50 flex justify-center px-4">
      <nav
        className={`w-full max-w-4xl transition-all duration-300 rounded-full border border-neutral-800 backdrop-blur-md ${
          scrolled ? "bg-neutral-950/85 shadow-2xl shadow-black/80" : "bg-neutral-900/70"
        } px-4 py-2.5 flex items-center justify-between`}
        aria-label="Main Navigation"
      >
        {/* Left: Brand Name */}
        <a
          href="#"
          className="font-medium tracking-tight text-sm sm:text-base text-[#F5F5F5] hover:text-white transition-colors pl-2"
        >
          {portfolioData.fullName}
        </a>

        {/* Center: Desktop Nav Links */}
        <div className="hidden md:flex items-center space-x-1 lg:space-x-2">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-xs uppercase tracking-wider text-neutral-400 hover:text-white hover:bg-neutral-800/60 px-3 py-1.5 rounded-full transition-all"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Right: CTA & Mobile Hamburger */}
        <div className="flex items-center space-x-2">
          <a
            href="#contact"
            className="hidden sm:inline-flex items-center justify-center bg-white text-neutral-950 font-semibold text-xs px-4 py-2 rounded-full hover:bg-neutral-200 transition-colors shadow-sm"
          >
            Let&apos;s talk
          </a>

          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-1.5 text-neutral-300 hover:text-white focus:outline-none rounded-full hover:bg-neutral-800 transition"
            aria-label="Toggle Navigation Menu"
            aria-expanded={isOpen}
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer Menu */}
      {isOpen && (
        <div className="md:hidden fixed top-20 inset-x-4 bg-neutral-950/95 border border-neutral-800 rounded-2xl p-6 shadow-2xl backdrop-blur-xl flex flex-col space-y-4 animate-in fade-in slide-in-from-top-4 duration-200 z-50">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="text-sm font-medium uppercase tracking-wider text-neutral-300 hover:text-white py-2 border-b border-neutral-800/60 transition"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={() => setIsOpen(false)}
            className="w-full text-center bg-white text-neutral-950 font-semibold text-sm py-2.5 rounded-full hover:bg-neutral-200 transition"
          >
            Let&apos;s talk
          </a>
        </div>
      )}
    </header>
  );
}
