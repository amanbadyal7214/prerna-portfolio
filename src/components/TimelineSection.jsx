import React, { useState } from 'react';
import timelineHeading from '../assets/timeline_heading.png';

export default function TimelineSection() {
  const [activeExpanded, setActiveExpanded] = useState(null);

  const toggleExpand = (idx) => {
    setActiveExpanded(activeExpanded === idx ? null : idx);
  };

  return (
    <section id="timeline" className="relative scroll-mt-16">
      
      {/* =========================================================================
          TOP HEADER: Dark (#111111) with Ornate Terracotta Serif Title
          Exact match to Reference Image: "The Design Timeline: Where I've Left My Mark"
          ========================================================================= */}
      <div className="bg-[#111111] py-10 sm:py-14 md:py-16 border-b border-black">
        <div className="max-w-[1360px] mx-auto px-6 sm:px-10 lg:px-16 flex justify-center items-center text-center">
          <h2 className="sr-only">The Design Timeline: Where I've Left My Mark</h2>
          <img 
            src={timelineHeading} 
            alt="The Design Timeline: Where I've Left My Mark" 
            className="h-10 sm:h-14 md:h-16 lg:h-20 w-auto max-w-full object-contain pointer-events-none select-none mx-auto"
          />
        </div>
      </div>

      {/* =========================================================================
          MAIN BODY: Crisp White Background with Giant Bold Typography
          Row 1: 2025 | INFYNTREK SYSTEMES | UI/UX DESIGN INTERN | oct-dec
          Row 2: 2026 | PISOFT INFORMATICS | UI/UX DESIGN INTERN | Jan-jun
          Row 3: NOW  | PISOFT INFORMATICS | JUNIOR UI/UX DESIGNER | jun-now
          ========================================================================= */}
      <div className="bg-white text-black py-12 sm:py-20 md:py-24">
        <div className="max-w-[1360px] mx-auto px-5 sm:px-10 lg:px-16">
          
          <div className="space-y-10 sm:space-y-18 md:space-y-24">
            
            {/* ROW 1: 2025 */}
            <div 
              onClick={() => toggleExpand(0)}
              className="cursor-pointer group transition-all pb-8 border-b border-neutral-100 last:border-b-0"
            >
              <div className="grid grid-cols-1 md:grid-cols-12 gap-3 sm:gap-6 md:gap-8 items-start md:items-center">
                
                {/* Left: Giant 2025 + Mobile Date Pill */}
                <div className="md:col-span-4 flex items-center justify-between md:block">
                  <span 
                    className="font-space font-bold text-5xl xs:text-6xl sm:text-7xl md:text-[96px] text-black leading-none tracking-[-2px] block group-hover:text-[#FF5A36] transition-colors"
                    style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                  >
                    2025
                  </span>
                  <span className="md:hidden px-3 py-1 rounded-full bg-neutral-100 font-tech text-xs text-neutral-700 font-semibold border border-neutral-200">
                    oct-dec
                  </span>
                </div>

                {/* Middle: Company & Role */}
                <div className="md:col-span-6 space-y-1 pt-1 md:pt-0">
                  <div 
                    className="text-[11px] sm:text-[12px] font-semibold tracking-[0.16em] text-[#666666] uppercase"
                    style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                  >
                    INFYNTREK SYSTEMES
                  </div>
                  
                  <h3 
                    className="font-space font-bold text-2xl sm:text-3xl md:text-[32px] text-black leading-[1.1] tracking-[-0.5px] uppercase"
                    style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                  >
                    UI/UX DESIGN<br />INTERN
                  </h3>
                </div>

                {/* Right: Desktop Date */}
                <div className="hidden md:flex md:col-span-2 items-center md:justify-end">
                  <span 
                    className="text-sm sm:text-base text-[#444444] font-normal"
                    style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                  >
                    oct-dec
                  </span>
                </div>

              </div>

              {/* Optional interactive details drawer */}
              {activeExpanded === 0 && (
                <div className="mt-5 pt-5 border-t border-neutral-200 grid grid-cols-1 md:grid-cols-12 gap-4 sm:gap-6 animate-in fade-in duration-200">
                  <div className="md:col-start-5 md:col-span-7 space-y-3">
                    <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed font-sans">
                      Spearheaded user research sprints and designed responsive SaaS workflows. Structured modular UI component libraries and conducted cross-device usability audits for remote client accounts.
                    </p>
                    <div className="flex flex-wrap gap-1.5 sm:gap-2 pt-1">
                      {['Figma', 'FigJam', 'Miro', 'User Research', 'Wireflows'].map((tool) => (
                        <span key={tool} className="px-2.5 py-1 rounded-lg bg-neutral-100 border border-neutral-200 text-xs font-tech text-neutral-700">
                          {tool}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* ROW 2: 2026 */}
            <div 
              onClick={() => toggleExpand(1)}
              className="cursor-pointer group transition-all pb-8 border-b border-neutral-100 last:border-b-0"
            >
              <div className="grid grid-cols-1 md:grid-cols-12 gap-3 sm:gap-6 md:gap-8 items-start md:items-center">
                
                {/* Left: Giant 2026 + Mobile Date Pill */}
                <div className="md:col-span-4 flex items-center justify-between md:block">
                  <span 
                    className="font-space font-bold text-5xl xs:text-6xl sm:text-7xl md:text-[96px] text-black leading-none tracking-[-2px] block group-hover:text-[#FF5A36] transition-colors"
                    style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                  >
                    2026
                  </span>
                  <span className="md:hidden px-3 py-1 rounded-full bg-neutral-100 font-tech text-xs text-neutral-700 font-semibold border border-neutral-200">
                    Jan-jun
                  </span>
                </div>

                {/* Middle: Company & Role */}
                <div className="md:col-span-6 space-y-1 pt-1 md:pt-0">
                  <div 
                    className="text-[11px] sm:text-[12px] font-semibold tracking-[0.16em] text-[#666666] uppercase"
                    style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                  >
                    PISOFT INFORMATICS
                  </div>
                  
                  <h3 
                    className="font-space font-bold text-2xl sm:text-3xl md:text-[32px] text-black leading-[1.1] tracking-[-0.5px] uppercase"
                    style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                  >
                    UI/UX DESIGN<br />INTERN
                  </h3>
                </div>

                {/* Right: Desktop Date */}
                <div className="hidden md:flex md:col-span-2 items-center md:justify-end">
                  <span 
                    className="text-sm sm:text-base text-[#444444] font-normal"
                    style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                  >
                    Jan-jun
                  </span>
                </div>

              </div>

              {/* Optional interactive details drawer */}
              {activeExpanded === 1 && (
                <div className="mt-5 pt-5 border-t border-neutral-200 grid grid-cols-1 md:grid-cols-12 gap-4 sm:gap-6 animate-in fade-in duration-200">
                  <div className="md:col-start-5 md:col-span-7 space-y-3">
                    <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed font-sans">
                      Engineered high-fidelity mobile and web application interfaces. Built interactive prototypes with Figma smart animate and established unified design system foundations for enterprise and consumer apps.
                    </p>
                    <div className="flex flex-wrap gap-1.5 sm:gap-2 pt-1">
                      {['Figma', 'Auto-Layout 5.0', 'Interactive Prototypes', 'Design Systems', 'HTML/CSS'].map((tool) => (
                        <span key={tool} className="px-2.5 py-1 rounded-lg bg-neutral-100 border border-neutral-200 text-xs font-tech text-neutral-700">
                          {tool}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* ROW 3: NOW */}
            <div 
              onClick={() => toggleExpand(2)}
              className="cursor-pointer group transition-all pb-4"
            >
              <div className="grid grid-cols-1 md:grid-cols-12 gap-3 sm:gap-6 md:gap-8 items-start md:items-center">
                
                {/* Left: Giant NOW + Mobile Date Pill */}
                <div className="md:col-span-4 flex items-center justify-between md:block">
                  <span 
                    className="font-space font-bold text-5xl xs:text-6xl sm:text-7xl md:text-[96px] text-black leading-none tracking-[-2px] block group-hover:text-[#FF5A36] transition-colors"
                    style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                  >
                    NOW
                  </span>
                  <span className="md:hidden px-3 py-1 rounded-full bg-[#ff5722]/10 font-tech text-xs text-[#ff5722] font-bold border border-[#ff5722]/20">
                    jun-now
                  </span>
                </div>

                {/* Middle: Company & Role */}
                <div className="md:col-span-6 space-y-1 pt-1 md:pt-0">
                  <div 
                    className="text-[11px] sm:text-[12px] font-semibold tracking-[0.16em] text-[#666666] uppercase"
                    style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                  >
                    PISOFT INFORMATICS
                  </div>
                  
                  <h3 
                    className="font-space font-bold text-2xl sm:text-3xl md:text-[32px] text-black leading-[1.1] tracking-[-0.5px] uppercase"
                    style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                  >
                    JUNIOR UI/UX<br />DESIGNER
                  </h3>
                </div>

                {/* Right: Desktop Date */}
                <div className="hidden md:flex md:col-span-2 items-center md:justify-end">
                  <span 
                    className="text-sm sm:text-base text-[#444444] font-normal"
                    style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                  >
                    jun-now
                  </span>
                </div>

              </div>

              {/* Optional interactive details drawer */}
              {activeExpanded === 2 && (
                <div className="mt-5 pt-5 border-t border-neutral-200 grid grid-cols-1 md:grid-cols-12 gap-4 sm:gap-6 animate-in fade-in duration-200">
                  <div className="md:col-start-5 md:col-span-7 space-y-3">
                    <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed font-sans">
                      Leading end-to-end product design across mobile and web platforms. Architecting design systems, auto-layout components, user testing cycles, and developer handoff workflows. Designed HousingMania (Live on Google Play Store).
                    </p>
                    <div className="flex flex-wrap gap-1.5 sm:gap-2 pt-1">
                      {['Figma', 'Google Play Live', 'Design System Governance', 'Dev Mode Specs', 'Jitter'].map((tool) => (
                        <span key={tool} className="px-2.5 py-1 rounded-lg bg-neutral-100 border border-neutral-200 text-xs font-tech text-neutral-700">
                          {tool}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
