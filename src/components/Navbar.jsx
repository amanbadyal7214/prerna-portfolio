import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight, Sparkles } from 'lucide-react';
import { personalInfo } from '../data/portfolioData';

export default function Navbar() {
  const [activeSection, setActiveSection] = useState('about');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const viewportHeight = window.innerHeight;
      const isMobile = window.innerWidth < 640;

      // On mobile show earlier (as soon as user scrolls past first hero screen)
      // On desktop show at Slide 3 (approx 1.8x viewport height)
      const threshold = isMobile ? viewportHeight * 0.75 : viewportHeight * 1.8;

      if (scrollY >= threshold) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
        setMobileMenuOpen(false);
      }

      // Track active section for link color highlight
      const scrollPos = scrollY + 250;
      const sections = [
        { id: 'work', name: 'work' },
        { id: 'about', name: 'about' },
        { id: 'timeline', name: 'experience' },
        { id: 'contact', name: 'contact' },
      ];

      for (const section of sections) {
        const el = document.getElementById(section.id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(section.name);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);
    handleScroll();
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  // Prevent background scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const navItems = [
    { name: 'WORK', href: '#work', key: 'work' },
    { name: 'ABOUT', href: '#about', key: 'about' },
    { name: 'EXPERIENCE', href: '#timeline', key: 'experience' },
    { name: 'CONTACT', href: '#contact', key: 'contact' },
  ];

  // Hidden on Slide 1 & Slide 2; smoothly activates from Slide 3 onwards and stays fixed
  if (!isVisible) return null;

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-10 lg:px-16 py-3.5 sm:py-5 bg-[#f4eee6]/95 backdrop-blur-md border-b border-black/[0.08] shadow-xs transition-all duration-300">
        <div className="max-w-[1280px] mx-auto flex items-center justify-between">
          
          {/* Brand: PRERNA */}
          <a 
            href="#" 
            onClick={() => setMobileMenuOpen(false)}
            className="font-display font-black text-xl sm:text-2xl uppercase tracking-tighter text-black hover:opacity-80 transition-opacity flex items-center gap-2"
          >
            <span>PRERNA</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#ff5722]"></span>
          </a>

          {/* Desktop Links: WORK   ABOUT   EXPERIENCE   CONTACT */}
          <nav className="hidden sm:flex items-center gap-8 md:gap-12 text-xs sm:text-sm font-tech uppercase tracking-widest font-semibold">
            {navItems.map((item) => (
              <a
                key={item.key}
                href={item.href}
                className={`transition-colors py-1 relative ${
                  activeSection === item.key
                    ? 'text-[#ff5722]'
                    : 'text-neutral-700 hover:text-black'
                }`}
              >
                {item.name}
                {activeSection === item.key && (
                  <span className="absolute -bottom-1 left-0 right-0 h-[2px] bg-[#ff5722] rounded-full"></span>
                )}
              </a>
            ))}
          </nav>

          {/* Mobile Hamburger Toggle with touch-friendly 44px hitbox */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="sm:hidden w-10 h-10 flex items-center justify-center rounded-full bg-black/5 hover:bg-black/10 active:scale-95 text-black transition-all cursor-pointer"
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </header>

      {/* Premium Full-Screen Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-[#0c0d10]/95 backdrop-blur-xl sm:hidden flex flex-col justify-between pt-24 pb-8 px-6 animate-in fade-in zoom-in-95 duration-200">
          
          {/* Main Navigation Links */}
          <nav className="flex flex-col space-y-4">
            <span className="text-[11px] font-tech text-neutral-400 uppercase tracking-widest block mb-2">
              Navigation
            </span>
            {navItems.map((item, idx) => {
              const isActive = activeSection === item.key;
              return (
                <a
                  key={item.key}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center justify-between py-3 border-b border-white/10 text-2xl font-display font-black uppercase tracking-tight transition-all ${
                    isActive ? 'text-[#ff5722] pl-2' : 'text-white hover:text-[#ff5722]'
                  }`}
                >
                  <span>{item.name}</span>
                  <span className="text-xs font-tech font-normal text-neutral-400">
                    0{idx + 1}
                  </span>
                </a>
              );
            })}
          </nav>

          {/* Mobile Footer CTAs & Socials */}
          <div className="space-y-4 pt-6">
            <div className="flex items-center gap-3">
              <a
                href="#contact"
                onClick={() => setMobileMenuOpen(false)}
                className="flex-1 py-3.5 rounded-full bg-[#ff5722] text-white text-center font-tech text-xs uppercase font-bold tracking-wider shadow-lg shadow-orange-600/30"
              >
                Get in Touch
              </a>
              <a
                href={personalInfo.linkedin}
                target="_blank"
                rel="noreferrer"
                className="p-3.5 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
                title="LinkedIn"
              >
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>

            <div className="flex items-center justify-between text-xs font-tech text-neutral-400 pt-2 border-t border-white/5">
              <span>{personalInfo.location}</span>
              <span className="text-emerald-400 font-semibold flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                Available
              </span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
