import React, { useState } from 'react';
import { personalInfo } from '../data/portfolioData';
import { ArrowUpRight, Copy, Check, Mail, Phone, Globe, ArrowUp, Send, Sparkles } from 'lucide-react';

export default function ContactFooter({ onOpenResume, onOpenContact }) {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(personalInfo.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="contact" className="pt-24 pb-12 bg-[#08090b] text-white relative border-t border-white/10 overflow-hidden">
      
      {/* Background glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-72 bg-gradient-to-t from-[#ff5722]/10 to-transparent blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
        
        {/* Editorial Big Sign-off */}
        <div className="mb-16 md:mb-24">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-tech text-[#ff8a65] tracking-wider uppercase mb-6">
            <Sparkles className="w-3.5 h-3.5 text-[#ff5722]" />
            <span>Open for Opportunities & Collaborations</span>
          </div>

          <h2 className="font-display font-black text-4xl sm:text-6xl md:text-7xl lg:text-8xl uppercase tracking-tighter text-white leading-[0.95] max-w-5xl">
            LET'S SHAPE<br />THE NEXT BIG<br />
            <span className="text-[#ff5722]">EXPERIENCE.</span>
          </h2>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <a
              href={`tel:${personalInfo.phone}`}
              className="px-8 py-4 rounded-full bg-[#ff5722] hover:bg-[#ff6f43] text-white text-sm font-tech font-bold tracking-wider flex items-center gap-3 shadow-xl shadow-orange-600/30 hover:scale-105 active:scale-95 transition-all cursor-pointer"
              title={`Call ${personalInfo.phone}`}
            >
              <Phone className="w-4 h-4" />
              <span>{personalInfo.phone}</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>

            <button
              onClick={handleCopyEmail}
              className="px-6 py-4 rounded-full bg-white/5 hover:bg-white/10 text-neutral-200 hover:text-white text-sm font-tech border border-white/10 flex items-center gap-2.5 transition-all cursor-pointer"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4 text-[#ff5722]" />}
              <span>{copied ? 'Email Copied!' : personalInfo.email}</span>
            </button>
          </div>
        </div>

        {/* Contact Matrix Links */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 py-12 border-y border-white/10 text-xs font-tech">
          
          <div className="space-y-1">
            <span className="text-neutral-500 uppercase tracking-wider block">Email Directly</span>
            <a 
              href={`mailto:${personalInfo.email}`} 
              className="text-white hover:text-[#ff5722] transition-colors font-medium flex items-center gap-1.5"
            >
              <Mail className="w-3.5 h-3.5 text-[#ff5722]" />
              <span>{personalInfo.email}</span>
            </a>
          </div>

          <div className="space-y-1">
            <span className="text-neutral-500 uppercase tracking-wider block">Direct Phone</span>
            <a 
              href={`tel:${personalInfo.phone}`} 
              className="text-white hover:text-[#ff5722] transition-colors font-medium flex items-center gap-1.5"
            >
              <Phone className="w-3.5 h-3.5 text-[#ff5722]" />
              <span>{personalInfo.phone}</span>
            </a>
          </div>

          <div className="space-y-1">
            <span className="text-neutral-500 uppercase tracking-wider block">LinkedIn Profile</span>
            <a 
              href={personalInfo.linkedin} 
              target="_blank" 
              rel="noreferrer"
              className="text-white hover:text-[#ff5722] transition-colors font-medium flex items-center gap-1.5"
            >
              <ArrowUpRight className="w-3.5 h-3.5 text-[#ff5722]" />
              <span>in/prerna-sablok30</span>
            </a>
          </div>

          <div className="space-y-1">
            <span className="text-neutral-500 uppercase tracking-wider block">Behance Portfolio</span>
            <a 
              href={personalInfo.behance} 
              target="_blank" 
              rel="noreferrer"
              className="text-white hover:text-[#ff5722] transition-colors font-medium flex items-center gap-1.5"
            >
              <ArrowUpRight className="w-3.5 h-3.5 text-[#ff5722]" />
              <span>behance.net/Prerna_Sablok30</span>
            </a>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-tech text-neutral-500">
          <div className="flex items-center gap-2">
            <span>© {new Date().getFullYear()} {personalInfo.name}. All Rights Reserved.</span>
            <span>•</span>
            <span>UI/UX Designer</span>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={onOpenResume}
              className="hover:text-white transition-colors cursor-pointer"
            >
              View Printable CV
            </button>
            <span>•</span>
            <button
              onClick={scrollToTop}
              className="flex items-center gap-1 text-neutral-400 hover:text-[#ff5722] transition-colors cursor-pointer"
            >
              <span>Back to top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
}
