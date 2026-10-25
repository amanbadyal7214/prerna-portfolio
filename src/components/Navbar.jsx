import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
  const [activeSection, setActiveSection] = useState('about');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const viewportHeight = window.innerHeight;

      // Show navbar as soon as Slide 3 is reached (approx 1.9x viewport height) and for all sections below
      if (scrollY >= viewportHeight * 1.9) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
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
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'WORK', href: '#work', key: 'work' },
    { name: 'ABOUT', href: '#about', key: 'about' },
    { name: 'EXPERIENCE', href: '#timeline', key: 'experience' },
    { name: 'CONTACT', href: '#contact', key: 'contact' },
  ];

  // Hidden on Slide 1 & Slide 2; smoothly activates from Slide 3 onwards and stays fixed
  if (!isVisible) return null;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-6 sm:px-10 lg:px-16 py-4 sm:py-5 bg-[#f4eee6]/95 backdrop-blur-md border-b border-black/[0.08] shadow-xs transition-all duration-300">
      <div className="max-w-[1280px] mx-auto flex items-center justify-between">
        
        {/* Brand: PRERNA */}
        <a 
          href="#" 
          className="font-display font-black text-xl sm:text-2xl uppercase tracking-tighter text-black hover:opacity-80 transition-opacity"
        >
          PRERNA
        </a>

        {/* Desktop Links: WORK   ABOUT   EXPERIENCE   CONTACT */}
        <nav className="hidden sm:flex items-center gap-8 md:gap-12 text-xs sm:text-sm font-tech uppercase tracking-widest font-semibold">
          {navItems.map((item) => (
            <a
              key={item.key}
              href={item.href}
              className={`transition-colors ${
                activeSection === item.key
                  ? 'text-[#ff5722]'
                  : 'text-neutral-700 hover:text-black'
              }`}
            >
              {item.name}
            </a>
          ))}
        </nav>

        {/* Mobile Hamburger Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="sm:hidden p-1.5 text-black hover:opacity-70 cursor-pointer"
          aria-label="Toggle navigation menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="sm:hidden mt-4 pt-4 border-t border-black/10 flex flex-col gap-3 font-tech text-xs uppercase tracking-widest font-semibold animate-in fade-in slide-in-from-top-2 duration-200">
          {navItems.map((item) => (
            <a
              key={item.key}
              href={item.href}
              onClick={() => setMobileMenuOpen(false)}
              className={`py-2 transition-colors ${
                activeSection === item.key ? 'text-[#ff5722]' : 'text-neutral-800'
              }`}
            >
              {item.name}
            </a>
          ))}
        </div>
      )}
    </header>
  );
}
