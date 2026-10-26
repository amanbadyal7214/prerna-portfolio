import React, { useState, useRef, useEffect } from 'react';
import curveTop from '../assets/curve-top.svg';
import curveBottom from '../assets/curve-bottom.svg';

export default function ProcessSection() {
  const [activeStep, setActiveStep] = useState(1);
  const scrollRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  // Synchronize active step indicator based on horizontal scroll
  const handleScroll = () => {
    if (!scrollRef.current) return;
    const scrollPos = scrollRef.current.scrollLeft;
    const firstCard = scrollRef.current.children[0];
    const cardWidth = firstCard ? firstCard.getBoundingClientRect().width + 20 : 315;
    const newStep = Math.min(8, Math.max(1, Math.round(scrollPos / cardWidth) + 1));
    setActiveStep(newStep);
  };

  const scrollToStep = (stepNum) => {
    setActiveStep(stepNum);
    if (scrollRef.current) {
      const firstCard = scrollRef.current.children[0];
      const cardWidth = firstCard ? firstCard.getBoundingClientRect().width + 20 : 315;
      scrollRef.current.scrollTo({
        left: (stepNum - 1) * cardWidth,
        behavior: 'smooth',
      });
    }
  };

  // Mouse Drag to Scroll handlers
  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setScrollLeft(scrollRef.current.scrollLeft);
  };

  const handleMouseLeaveOrUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 1.4;
    scrollRef.current.scrollLeft = scrollLeft - walk;
  };

  return (
    <section id="process" className="pt-12 sm:pt-20 md:pt-24 pb-8 sm:pb-10 md:pb-12 bg-[#111111] text-[#F4F1EA] relative overflow-hidden select-none scroll-mt-20">
      
      {/* Background Subtle Accent Gradients */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[400px] bg-[#FF5A36]/5 blur-[160px] rounded-full pointer-events-none"></div>

      <div className="max-w-[1360px] mx-auto px-4 sm:px-10 lg:px-16 mb-2 sm:mb-3 md:mb-4 relative z-10">
        
        {/* =========================================================================
            SECTION HEADER (Exact Figma Specs: Space Grotesk, JetBrains Mono, #FF5A36)
            ========================================================================= */}
        <div className="flex items-end justify-between px-2 sm:px-4">
          <div>
            <h2 
              className="font-space font-bold text-3xl sm:text-6xl md:text-[62px] text-[#F4F1EA] tracking-[-1.5px] sm:tracking-[-1.8px] leading-[0.92] sm:leading-[0.88] uppercase"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              HOW<br />I WORK.
            </h2>
          </div>

          <div className="flex flex-col items-end">
            <div className="flex items-center gap-1.5 mb-1 sm:mb-1.5">
              <span 
                className="font-mono-jb text-[9px] sm:text-[10px] uppercase tracking-[1.2px] sm:tracking-[1.4px] text-[#FF5A36] font-semibold"
                style={{ fontFamily: "'JetBrains Mono', monospace" }}
              >
                <span className="hidden sm:inline">DRAG TO EXPLORE</span>
                <span className="sm:hidden">SWIPE CARDS</span>
              </span>
              <span className="text-[#FF5A36] text-[11px] font-bold">→</span>
            </div>
            
            <div 
              className="font-space font-bold text-3xl sm:text-5xl md:text-[46px] tracking-[-1px] sm:tracking-[-1.4px] leading-none"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              <span className="text-[#FF5A36]">{String(activeStep).padStart(2, '0')}</span>
              <span className="text-[#77736C]/60 font-light text-2xl sm:text-4xl md:text-[40px]"> / 08</span>
            </div>
          </div>
        </div>
      </div>

      {/* =========================================================================
          THE SIGNATURE HORIZON CURVED CANVAS (Exact Image 2 Specs with Vector Curve)
          Full-width curved horizon lens spanning across the viewport
          ========================================================================= */}
      <div className="relative w-full z-10">
        
        {/* Top Vector Curve: arches up into the dark header */}
        <div className="w-full bg-[#F4F1EA] leading-none overflow-hidden select-none -mb-[1px] relative z-20">
          <img 
            src={curveTop} 
            alt="" 
            aria-hidden="true" 
            className="w-full block h-[38px] sm:h-[70px] md:h-[88px] object-fill pointer-events-none select-none" 
          />
        </div>

        {/* Main Cream Cards Track Container */}
        <div className="w-full bg-[#F4F1EA] text-[#111111] py-2 sm:py-3 md:py-4 relative z-10 shadow-[0_15px_50px_rgba(0,0,0,0.35)]">
          
          {/* Subtle Grid dots */}
          <div className="absolute inset-0 opacity-[0.035] pointer-events-none bg-[radial-gradient(#111111_1px,transparent_1px)] [background-size:20px_20px]"></div>

          {/* Horizontal Scrollable / Draggable Cards Track */}
          <div className="w-full relative z-10">
            <div
              ref={scrollRef}
              onScroll={handleScroll}
              onMouseDown={handleMouseDown}
              onMouseLeave={handleMouseLeaveOrUp}
              onMouseUp={handleMouseLeaveOrUp}
              onMouseMove={handleMouseMove}
              className={`flex items-center gap-4 sm:gap-6 overflow-x-auto py-3 px-4 sm:px-12 md:px-20 snap-x snap-mandatory touch-scroll no-scrollbar scroll-smooth relative z-10 ${
                isDragging ? 'cursor-grabbing' : 'cursor-grab'
              }`}
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
            
            {/* =========================================================================
                CARD 01: UX RESEARCH — START WITH PEOPLE.
                ========================================================================= */}
            <div 
              onClick={() => scrollToStep(1)}
              className={`w-[295px] sm:w-[308px] shrink-0 rounded-[20.6px] bg-[#FDFCF9] flex flex-col justify-between snap-start transition-all duration-300 ${
                activeStep === 1 
                  ? 'border-[0.7px] border-[#FF5A36]/40 shadow-[0_12px_49px_rgba(17,17,17,0.15),0_2px_8px_rgba(17,17,17,0.06)] scale-[1.01]' 
                  : 'border-[0.64px] border-[#111111]/10 opacity-80 hover:opacity-100 shadow-[0_2px_12px_rgba(17,17,17,0.06)]'
              }`}
              style={{ minHeight: '445px' }}
            >
              {/* Card Header Top */}
              <div className="p-5 pb-3.5 border-b border-[#111111]/[0.06] relative">
                <div className="flex items-center gap-2 mb-2" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                  <span className="text-[10.3px] font-medium text-[#FF5A36] tracking-[1.2px]">01</span>
                  <span className="text-[8.2px] text-[#77736C] tracking-[0.82px] uppercase">UX RESEARCH</span>
                </div>

                <div>
                  <h3 
                    className="font-space font-semibold text-[18.3px] text-[#111111] leading-[20px] tracking-[-0.46px] uppercase"
                    style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                  >
                    START WITH<br />PEOPLE.
                  </h3>
                  <p 
                    className="text-[10.3px] text-[#77736C] leading-[16px] mt-2"
                    style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                  >
                    Before designing anything, I try to understand the people, context and problem.
                  </p>
                </div>

                {/* Subtle Figma cursor arrow matching reference */}
                <div className="absolute -bottom-2.5 right-4 pointer-events-none z-20">
                  <svg className="w-4 h-4 text-[#FDFCF9] drop-shadow-[0_1px_3px_rgba(0,0,0,0.35)]" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M4 2l16 11.5-6.5 1.5 4.5 7.5-3 1.5-4.5-7.5L6 20z" stroke="#555" strokeWidth="1" />
                  </svg>
                </div>
              </div>

              {/* Research Artifact Body */}
              <div className="p-5 py-3 space-y-2.5 flex-1 flex flex-col justify-center">
                
                {/* Persona Header */}
                <div className="flex items-center gap-2">
                  <div className="w-[28.8px] h-[28.8px] rounded-full bg-[#111111] flex items-center justify-center shrink-0">
                    <svg className="w-3.5 h-3.5 text-[#F4F1EA]" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                    </svg>
                  </div>
                  <div>
                    <span className="text-[7.2px] text-[#77736C] uppercase tracking-[1px] block" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                      PERSONA
                    </span>
                    <span className="text-[10.3px] font-medium text-[#111111]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                      Priya, 28 — First-time buyer
                    </span>
                  </div>
                </div>

                {/* User Quote Box */}
                <div className="p-2.5 rounded-[10.3px] bg-[#111111]/[0.04] border border-[#111111]/[0.06]">
                  <span className="text-[7.2px] text-[#77736C] uppercase tracking-[1px] block mb-0.5" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                    USER
                  </span>
                  <p className="text-[10.3px] text-[#111111] leading-[15px] font-normal" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                    "I want something simpler — too many steps before I even see a listing."
                  </p>
                </div>

                {/* Tags */}
                <div className="grid grid-cols-3 gap-1.5 text-left">
                  <div className="p-1.5 rounded-[6.2px] bg-[#FFF0EC] border border-[#FF5A36]/20">
                    <span className="text-[6.2px] text-[#FF5A36] uppercase tracking-[0.74px] block font-medium" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                      INSIGHT
                    </span>
                    <span className="text-[9.27px] font-medium text-[#111111] leading-tight block" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                      Too many steps
                    </span>
                  </div>

                  <div className="p-1.5 rounded-[6.2px] bg-[#111111]/[0.04] border border-[#77736C]/20">
                    <span className="text-[6.2px] text-[#77736C] uppercase tracking-[0.74px] block" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                      PAIN
                    </span>
                    <span className="text-[9.27px] font-medium text-[#111111] leading-tight block" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                      Filter confusion
                    </span>
                  </div>

                  <div className="p-1.5 rounded-[6.2px] bg-[#111111]/[0.04] border border-[#77736C]/20">
                    <span className="text-[6.2px] text-[#77736C] uppercase tracking-[0.74px] block" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                      GOAL
                    </span>
                    <span className="text-[9.27px] font-medium text-[#111111] leading-tight block" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                      Quick search
                    </span>
                  </div>
                </div>

                {/* Interview Notes */}
                <div className="space-y-0.5 pt-0.5">
                  <span className="text-[7.2px] text-[#77736C] uppercase tracking-[0.86px] block mb-1" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                    INTERVIEW · 3 NOTES
                  </span>
                  <p className="text-[9.27px] text-[#111111] leading-[13px] flex items-center gap-1" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                    <span className="text-[#FF5A36]">—</span> "Neighbourhood photos matter most"
                  </p>
                  <p className="text-[9.27px] text-[#111111] leading-[13px] flex items-center gap-1" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                    <span className="text-[#FF5A36]">—</span> "I get lost in the filter drawer"
                  </p>
                </div>

              </div>

              {/* Card Footer */}
              <div className="p-5 py-3 border-t border-[#111111]/[0.06] flex items-center justify-between" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                <div>
                  <span className="text-[7.2px] text-[#77736C] uppercase tracking-[1px] block">OUTPUT</span>
                  <span className="text-[8.75px] font-medium text-[#111111] tracking-[0.52px]">USER INSIGHTS</span>
                </div>
                <div className="flex items-center gap-1 text-[8.24px] text-[#FF5A36] font-medium">
                  <span>01</span>
                  <span>→</span>
                  <span>02</span>
                </div>
              </div>
            </div>

            {/* =========================================================================
                CARD 02: WIREFRAMING — STRUCTURE BEFORE STYLE.
                ========================================================================= */}
            <div 
              onClick={() => scrollToStep(2)}
              className={`w-[295px] sm:w-[308px] shrink-0 rounded-[20.6px] bg-[#FDFCF9] flex flex-col justify-between snap-start transition-all duration-300 ${
                activeStep === 2 
                  ? 'border-[0.7px] border-[#FF5A36]/40 shadow-[0_12px_49px_rgba(17,17,17,0.15),0_2px_8px_rgba(17,17,17,0.06)] scale-[1.01]' 
                  : 'border-[0.64px] border-[#111111]/10 opacity-80 hover:opacity-100 shadow-[0_2px_12px_rgba(17,17,17,0.06)]'
              }`}
              style={{ minHeight: '445px' }}
            >
              {/* Card Header Top */}
              <div className="p-5 pb-3.5 border-b border-[#111111]/[0.06]">
                <div className="flex items-center gap-2 mb-2" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                  <span className="text-[10.3px] font-medium text-[#77736C] tracking-[1.2px]">02</span>
                  <span className="text-[8.2px] text-[#77736C] tracking-[0.82px] uppercase">WIREFRAMING</span>
                </div>

                <div>
                  <h3 
                    className="font-space font-semibold text-[18.3px] text-[#111111] leading-[20px] tracking-[-0.46px] uppercase"
                    style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                  >
                    STRUCTURE<br />BEFORE STYLE.
                  </h3>
                  <div className="w-[28.8px] h-[2.06px] bg-[#FF5A36] rounded-full mt-2 mb-2"></div>
                  <p 
                    className="text-[10.3px] text-[#77736C] leading-[16px]"
                    style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                  >
                    I translate ideas into simple structures before worrying about visual polish.
                  </p>
                </div>
              </div>

              {/* Wireframe Artifact Body */}
              <div className="p-5 py-3 space-y-3 flex-1 flex flex-col justify-center">
                <div className="flex items-center justify-between gap-1.5">
                  
                  {/* Wireframe 1: HOME */}
                  <div className="flex-1 rounded-[7.68px] bg-white border border-[#111111]/15 overflow-hidden p-1 shadow-xs">
                    <div className="flex justify-between items-center px-1 py-0.5 bg-[#111111]/[0.07] rounded-t-[4px] mb-1">
                      <div className="w-2.5 h-[2px] bg-[#111111]/25 rounded"></div>
                      <div className="w-3.5 h-[2px] bg-[#111111]/25 rounded"></div>
                    </div>
                    <div className="space-y-1 p-0.5">
                      <div className="w-full h-[2px] bg-[#111111]/15 rounded"></div>
                      <div className="w-3/4 h-[2px] bg-[#111111]/10 rounded"></div>
                      <div className="w-full h-5 rounded-[4px] bg-[#111111]/[0.07] border border-dashed border-[#111111]/20"></div>
                      <div className="w-full h-[2px] bg-[#111111]/[0.08] rounded"></div>
                      <div className="w-full h-2 rounded-[3px] bg-[#111111]/15"></div>
                    </div>
                    <div className="text-center py-0.5 bg-[#111111]/[0.03] text-[6px] text-[#77736C] font-mono-jb uppercase font-bold mt-1">
                      HOME
                    </div>
                  </div>

                  <span className="text-[#FF5A36] text-[10px] font-bold">→</span>

                  {/* Wireframe 2: LIST */}
                  <div className="flex-1 rounded-[7.68px] bg-white border border-[#111111]/15 overflow-hidden p-1 shadow-xs">
                    <div className="flex justify-between items-center px-1 py-0.5 bg-[#111111]/[0.07] rounded-t-[4px] mb-1">
                      <div className="w-2.5 h-[2px] bg-[#111111]/25 rounded"></div>
                      <div className="w-3.5 h-[2px] bg-[#111111]/25 rounded"></div>
                    </div>
                    <div className="space-y-1 p-0.5">
                      <div className="w-full h-[2px] bg-[#111111]/15 rounded"></div>
                      <div className="w-full h-5 rounded-[4px] bg-[#111111]/[0.07] border border-dashed border-[#111111]/20"></div>
                      <div className="w-full h-[2px] bg-[#111111]/[0.08] rounded"></div>
                      <div className="w-full h-2 rounded-[3px] bg-[#111111]/15"></div>
                    </div>
                    <div className="text-center py-0.5 bg-[#111111]/[0.03] text-[6px] text-[#77736C] font-mono-jb uppercase font-bold mt-1">
                      LIST
                    </div>
                  </div>

                  <span className="text-[#FF5A36] text-[10px] font-bold">→</span>

                  {/* Wireframe 3: DETAIL */}
                  <div className="flex-1 rounded-[7.68px] bg-white border border-[#111111]/15 overflow-hidden p-1 shadow-xs">
                    <div className="flex justify-between items-center px-1 py-0.5 bg-[#111111]/[0.07] rounded-t-[4px] mb-1">
                      <div className="w-2.5 h-[2px] bg-[#111111]/25 rounded"></div>
                      <div className="w-3.5 h-[2px] bg-[#111111]/25 rounded"></div>
                    </div>
                    <div className="space-y-1 p-0.5">
                      <div className="w-full h-6 rounded-[4px] bg-[#FF5A36]/15 border border-[#FF5A36]/30"></div>
                      <div className="w-full h-[2px] bg-[#111111]/[0.08] rounded"></div>
                      <div className="w-full h-2 rounded-[3px] bg-[#111111]/15"></div>
                    </div>
                    <div className="text-center py-0.5 bg-[#111111]/[0.03] text-[6px] text-[#77736C] font-mono-jb uppercase font-bold mt-1">
                      DETAIL
                    </div>
                  </div>

                </div>

                <div className="flex items-center justify-center gap-1.5 text-[6.7px] text-[#77736C] tracking-[0.67px] uppercase" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                  <span>LOW-FI</span>
                  <span className="text-[#FF5A36]">→</span>
                  <span>FLOW</span>
                  <span className="text-[#FF5A36]">→</span>
                  <span>STRUCTURE</span>
                </div>
              </div>

              {/* Card Footer */}
              <div className="p-5 py-3 border-t border-[#111111]/[0.06] flex items-center justify-between" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                <div>
                  <span className="text-[7.2px] text-[#77736C] uppercase tracking-[1px] block">OUTPUT</span>
                  <span className="text-[8.75px] font-medium text-[#111111] tracking-[0.52px]">PAGE STRUCTURE</span>
                </div>
                <div className="flex items-center gap-1 text-[8.24px] text-[#FF5A36] font-medium">
                  <span>02</span>
                  <span>→</span>
                  <span>03</span>
                </div>
              </div>
            </div>

            {/* =========================================================================
                CARD 03: INFORMATION ARCHITECTURE — MAKE COMPLEXITY FEEL SIMPLE.
                ========================================================================= */}
            <div 
              onClick={() => scrollToStep(3)}
              className={`w-[295px] sm:w-[308px] shrink-0 rounded-[20.6px] bg-[#FDFCF9] flex flex-col justify-between snap-start transition-all duration-300 ${
                activeStep === 3 
                  ? 'border-[0.7px] border-[#FF5A36]/40 shadow-[0_12px_49px_rgba(17,17,17,0.15),0_2px_8px_rgba(17,17,17,0.06)] scale-[1.01]' 
                  : 'border-[0.64px] border-[#111111]/10 opacity-80 hover:opacity-100 shadow-[0_2px_12px_rgba(17,17,17,0.06)]'
              }`}
              style={{ minHeight: '445px' }}
            >
              {/* Card Header Top */}
              <div className="p-5 pb-3.5 border-b border-[#111111]/[0.06]">
                <div className="flex items-center gap-2 mb-2" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                  <span className="text-[10.3px] font-medium text-[#77736C] tracking-[1.2px]">03</span>
                  <span className="text-[8.2px] text-[#77736C] tracking-[0.82px] uppercase">INFORMATION ARCHITECTURE</span>
                </div>

                <div>
                  <h3 
                    className="font-space font-semibold text-[18.3px] text-[#111111] leading-[20px] tracking-[-0.46px] uppercase"
                    style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                  >
                    MAKE COMPLEXITY<br />FEEL SIMPLE.
                  </h3>
                  <div className="w-[28.8px] h-[2.06px] bg-[#FF5A36] rounded-full mt-2 mb-2"></div>
                  <p 
                    className="text-[10.3px] text-[#77736C] leading-[16px]"
                    style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                  >
                    I organize content and navigation so users find what they need without friction.
                  </p>
                </div>
              </div>

              {/* IA Tree Diagram Artifact */}
              <div className="p-5 py-3 space-y-2 flex-1 flex flex-col justify-center">
                <div className="flex items-center gap-1.5 px-2.5 py-1 bg-[#111111] rounded-[5.76px] text-white">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FF5A36]"></span>
                  <span className="text-[8.64px] font-mono-jb text-[#F4F1EA] tracking-[0.86px]">HOME</span>
                </div>

                <div className="pl-3 border-l-[0.64px] border-[#111111]/15 space-y-1">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-[1px] bg-[#111111]/20"></span>
                    <div className="px-2 py-0.5 rounded-[4.8px] bg-[#FFF0EC] border border-[#FF5A36]/30 flex items-center gap-1 text-[7.68px] font-mono-jb text-[#111111]">
                      <span className="w-1 h-1 rounded-full bg-[#FF5A36]"></span>
                      <span>EXPLORE</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-[1px] bg-[#111111]/20"></span>
                    <div className="px-2 py-0.5 rounded-[4.8px] border border-[#111111]/12 flex items-center gap-1 text-[7.68px] font-mono-jb text-[#111111]">
                      <span className="w-1 h-1 rounded-full bg-[#111111]/20"></span>
                      <span>SEARCH</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-[1px] bg-[#111111]/20"></span>
                    <div className="px-2 py-0.5 rounded-[4.8px] border border-[#111111]/12 flex items-center gap-1 text-[7.68px] font-mono-jb text-[#111111]">
                      <span className="w-1 h-1 rounded-full bg-[#111111]/20"></span>
                      <span>DETAILS</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-[1px] bg-[#111111]/20"></span>
                    <div className="px-2 py-0.5 rounded-[4.8px] border border-[#111111]/12 flex items-center gap-1 text-[7.68px] font-mono-jb text-[#111111]">
                      <span className="w-1 h-1 rounded-full bg-[#111111]/20"></span>
                      <span>PROFILE</span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-1 pt-1 text-[6.7px] text-[#77736C]" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                  <span className="px-1.5 py-0.5 rounded-full border border-[#111111]/10">CONTENT</span>
                  <span className="px-1.5 py-0.5 rounded-full border border-[#111111]/10">HIERARCHY</span>
                  <span className="px-1.5 py-0.5 rounded-full border border-[#111111]/10">NAVIGATION</span>
                  <span className="px-1.5 py-0.5 rounded-full border border-[#111111]/10">FLOW</span>
                </div>
              </div>

              {/* Card Footer */}
              <div className="p-5 py-3 border-t border-[#111111]/[0.06] flex items-center justify-between" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                <div>
                  <span className="text-[7.2px] text-[#77736C] uppercase tracking-[1px] block">OUTPUT</span>
                  <span className="text-[8.75px] font-medium text-[#111111] tracking-[0.52px]">CLEAR STRUCTURE</span>
                </div>
                <div className="flex items-center gap-1 text-[8.24px] text-[#FF5A36] font-medium">
                  <span>03</span>
                  <span>→</span>
                  <span>04</span>
                </div>
              </div>
            </div>

            {/* =========================================================================
                CARD 04: DESIGN SYSTEM — DESIGN WITH SYSTEMS.
                ========================================================================= */}
            <div 
              onClick={() => scrollToStep(4)}
              className={`w-[295px] sm:w-[308px] shrink-0 rounded-[20.6px] bg-[#FDFCF9] flex flex-col justify-between snap-start transition-all duration-300 ${
                activeStep === 4 
                  ? 'border-[0.7px] border-[#FF5A36]/40 shadow-[0_12px_49px_rgba(17,17,17,0.15),0_2px_8px_rgba(17,17,17,0.06)] scale-[1.01]' 
                  : 'border-[0.64px] border-[#111111]/10 opacity-80 hover:opacity-100 shadow-[0_2px_12px_rgba(17,17,17,0.06)]'
              }`}
              style={{ minHeight: '445px' }}
            >
              {/* Card Header Top */}
              <div className="p-5 pb-3.5 border-b border-[#111111]/[0.06]">
                <div className="flex items-center gap-2 mb-2" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                  <span className="text-[10.3px] font-medium text-[#77736C] tracking-[1.2px]">04</span>
                  <span className="text-[8.2px] text-[#77736C] tracking-[0.82px] uppercase">DESIGN SYSTEM</span>
                </div>

                <div>
                  <h3 
                    className="font-space font-semibold text-[18.3px] text-[#111111] leading-[20px] tracking-[-0.46px] uppercase"
                    style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                  >
                    DESIGN WITH<br />SYSTEMS.
                  </h3>
                  <div className="w-[28.8px] h-[2.06px] bg-[#FF5A36] rounded-full mt-2 mb-2"></div>
                  <p 
                    className="text-[10.3px] text-[#77736C] leading-[16px]"
                    style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                  >
                    I create reusable visual rules and components that keep experience consistent.
                  </p>
                </div>
              </div>

              {/* Design System Tokens Body */}
              <div className="p-5 py-3 space-y-2.5 flex-1 flex flex-col justify-center">
                
                {/* Color Tokens */}
                <div>
                  <span className="text-[6.72px] text-[#77736C] uppercase tracking-[0.8px] block mb-1" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                    COLOR TOKENS
                  </span>
                  <div className="grid grid-cols-4 gap-1.5 text-center">
                    <div>
                      <div className="h-[19.2px] rounded-[4.8px] bg-[#111111]"></div>
                      <span className="text-[5.76px] text-[#77736C] font-mono-jb block mt-0.5">Primary</span>
                    </div>
                    <div>
                      <div className="h-[19.2px] rounded-[4.8px] bg-[#FF5A36]"></div>
                      <span className="text-[5.76px] text-[#77736C] font-mono-jb block mt-0.5">Accent</span>
                    </div>
                    <div>
                      <div className="h-[19.2px] rounded-[4.8px] bg-[#77736C]"></div>
                      <span className="text-[5.76px] text-[#77736C] font-mono-jb block mt-0.5">Muted</span>
                    </div>
                    <div>
                      <div className="h-[19.2px] rounded-[4.8px] bg-[#F4F1EA] border border-[#111111]/20"></div>
                      <span className="text-[5.76px] text-[#77736C] font-mono-jb block mt-0.5">BG</span>
                    </div>
                  </div>
                </div>

                {/* UI Buttons & Switch Component Tokens */}
                <div className="flex items-center justify-between gap-1.5 text-[7.68px] font-mono-jb">
                  <span className="px-2.5 py-1 rounded-[5.76px] bg-[#111111] text-[#F4F1EA]">BUTTON</span>
                  <span className="px-2.5 py-1 rounded-[5.76px] border border-[#111111]/25 text-[#111111]">SECONDARY</span>
                  <span className="w-7 h-4 rounded-full bg-[#FF5A36] flex items-center justify-end px-0.5">
                    <span className="w-3 h-3 rounded-full bg-white shadow-xs"></span>
                  </span>
                </div>

                {/* Input Field with Cursor */}
                <div className="h-6 rounded-[5.76px] bg-white border border-[#111111]/18 px-2 flex items-center justify-between text-[7.68px] font-mono-jb text-[#111111]/40">
                  <span>Input...</span>
                  <span className="w-[1px] h-3 bg-[#FF5A36]"></span>
                </div>

                {/* Typography Scale */}
                <div className="flex items-center justify-between pt-0.5">
                  <div className="flex items-baseline gap-1.5">
                    <span className="font-space font-bold text-[20px] text-[#111111] leading-none">Aa</span>
                    <span className="font-space font-normal text-[13px] text-[#111111]/45">Aa</span>
                    <span className="font-mono-jb text-[8.6px] text-[#77736C]">Aa</span>
                  </div>
                  <div className="flex gap-1 text-[5.76px] text-[#FF5A36] font-mono-jb">
                    <span className="px-1.5 py-0.5 rounded-full bg-[#FFF0EC]">8PX GRID</span>
                    <span className="px-1.5 py-0.5 rounded-full bg-[#FFF0EC]">AUTO LAYOUT</span>
                  </div>
                </div>
              </div>

              {/* Card Footer */}
              <div className="p-5 py-3 border-t border-[#111111]/[0.06] flex items-center justify-between" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                <div>
                  <span className="text-[7.2px] text-[#77736C] uppercase tracking-[1px] block">OUTPUT</span>
                  <span className="text-[8.75px] font-medium text-[#111111] tracking-[0.52px]">SCALABLE UI</span>
                </div>
                <div className="flex items-center gap-1 text-[8.24px] text-[#FF5A36] font-medium">
                  <span>04</span>
                  <span>→</span>
                  <span>05</span>
                </div>
              </div>
            </div>

            {/* =========================================================================
                CARD 05: UI DESIGN — MAKE IT VISIBLE.
                ========================================================================= */}
            <div 
              onClick={() => scrollToStep(5)}
              className={`w-[295px] sm:w-[308px] shrink-0 rounded-[20.6px] bg-[#FDFCF9] flex flex-col justify-between snap-start transition-all duration-300 ${
                activeStep === 5 
                  ? 'border-[0.7px] border-[#FF5A36]/40 shadow-[0_12px_49px_rgba(17,17,17,0.15),0_2px_8px_rgba(17,17,17,0.06)] scale-[1.01]' 
                  : 'border-[0.64px] border-[#111111]/10 opacity-80 hover:opacity-100 shadow-[0_2px_12px_rgba(17,17,17,0.06)]'
              }`}
              style={{ minHeight: '445px' }}
            >
              {/* Card Header Top */}
              <div className="p-5 pb-3.5 border-b border-[#111111]/[0.06]">
                <div className="flex items-center gap-2 mb-2" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                  <span className="text-[10.3px] font-medium text-[#77736C] tracking-[1.2px]">05</span>
                  <span className="text-[8.2px] text-[#77736C] tracking-[0.82px] uppercase">UI DESIGN</span>
                </div>

                <div>
                  <h3 
                    className="font-space font-semibold text-[18.3px] text-[#111111] leading-[20px] tracking-[-0.46px] uppercase"
                    style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                  >
                    MAKE IT<br />VISIBLE.
                  </h3>
                  <div className="w-[28.8px] h-[2.06px] bg-[#FF5A36] rounded-full mt-2 mb-2"></div>
                  <p 
                    className="text-[10.3px] text-[#77736C] leading-[16px]"
                    style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                  >
                    Once experience is structured, I translate it into high-fidelity polished screens.
                  </p>
                </div>
              </div>

              {/* UI Screens High-Fi Mockup Artifact */}
              <div className="p-5 py-3 space-y-2 flex-1 flex flex-col justify-center">
                <div className="flex items-center justify-center gap-2 relative">
                  
                  {/* Floating inspect pill tags */}
                  <div className="flex flex-col gap-1 text-[5.76px] font-mono-jb text-[#77736C]">
                    <div className="flex items-center gap-1">
                      <span className="w-1 h-1 rounded-full bg-[#FF5A36]"></span>
                      <span>TYPE</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="w-1 h-1 rounded-full bg-[#FF5A36]"></span>
                      <span>COLOR</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="w-1 h-1 rounded-full bg-[#FF5A36]"></span>
                      <span>GRID</span>
                    </div>
                  </div>

                  {/* Dark Mode Phone Screen */}
                  <div className="w-[74px] h-[95px] rounded-[9.6px] bg-[#111111] border border-[#FF5A36]/30 shadow-lg p-1 text-white flex flex-col justify-between">
                    <div className="flex justify-between items-center px-1 text-[4.8px] font-mono-jb text-[#F4F1EA]/40">
                      <span>9:41</span>
                      <div className="w-2.5 h-[2px] bg-[#F4F1EA]/20 rounded"></div>
                    </div>
                    <div className="w-full h-7 rounded-[5px] bg-[#FF5A36]/25 flex items-center justify-center">
                      <svg className="w-3 h-3 text-[#F4F1EA]/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                      </svg>
                    </div>
                    <div className="space-y-0.5">
                      <div className="w-full h-[2px] bg-[#F4F1EA]/20 rounded"></div>
                      <div className="w-3/4 h-[2px] bg-[#F4F1EA]/10 rounded"></div>
                    </div>
                    <div className="w-full h-2 rounded-[3px] bg-[#FF5A36]"></div>
                  </div>

                  {/* Light Mode Phone Screen */}
                  <div className="w-[74px] h-[95px] rounded-[9.6px] bg-white border border-[#111111]/15 shadow-md p-1 flex flex-col justify-between">
                    <div className="flex justify-between items-center px-1 text-[4.8px] font-mono-jb text-[#111111]/30">
                      <span>9:41</span>
                      <div className="w-2.5 h-[2px] bg-[#111111]/15 rounded"></div>
                    </div>
                    <div className="w-full h-7 rounded-[5px] bg-[#111111]/[0.07] flex items-center justify-center">
                      <svg className="w-3 h-3 text-[#111111]/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                      </svg>
                    </div>
                    <div className="space-y-0.5">
                      <div className="w-full h-[2px] bg-[#111111]/15 rounded"></div>
                      <div className="w-3/4 h-[2px] bg-[#111111]/10 rounded"></div>
                    </div>
                    <div className="w-full h-2 rounded-[3px] bg-[#111111]"></div>
                  </div>

                  {/* Hover Tag */}
                  <div className="absolute right-0 bottom-2 px-1.5 py-0.5 rounded-[3px] bg-[#FF5A36] text-white text-[4.8px] font-mono-jb shadow-xs">
                    hover
                  </div>
                </div>
              </div>

              {/* Card Footer */}
              <div className="p-5 py-3 border-t border-[#111111]/[0.06] flex items-center justify-between" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                <div>
                  <span className="text-[7.2px] text-[#77736C] uppercase tracking-[1px] block">OUTPUT</span>
                  <span className="text-[8.75px] font-medium text-[#111111] tracking-[0.52px]">HIGH-FIDELITY UI</span>
                </div>
                <div className="flex items-center gap-1 text-[8.24px] text-[#FF5A36] font-medium">
                  <span>05</span>
                  <span>→</span>
                  <span>06</span>
                </div>
              </div>
            </div>

            {/* =========================================================================
                CARD 06: PROTOTYPING — MAKE IT MOVE.
                ========================================================================= */}
            <div 
              onClick={() => scrollToStep(6)}
              className={`w-[295px] sm:w-[308px] shrink-0 rounded-[20.6px] bg-[#FDFCF9] flex flex-col justify-between snap-start transition-all duration-300 ${
                activeStep === 6 
                  ? 'border-[0.7px] border-[#FF5A36]/40 shadow-[0_12px_49px_rgba(17,17,17,0.15),0_2px_8px_rgba(17,17,17,0.06)] scale-[1.01]' 
                  : 'border-[0.64px] border-[#111111]/10 opacity-80 hover:opacity-100 shadow-[0_2px_12px_rgba(17,17,17,0.06)]'
              }`}
              style={{ minHeight: '445px' }}
            >
              {/* Card Header Top */}
              <div className="p-5 pb-3.5 border-b border-[#111111]/[0.06]">
                <div className="flex items-center gap-2 mb-2" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                  <span className="text-[10.3px] font-medium text-[#77736C] tracking-[1.2px]">06</span>
                  <span className="text-[8.2px] text-[#77736C] tracking-[0.82px] uppercase">PROTOTYPING</span>
                </div>

                <div>
                  <h3 
                    className="font-space font-semibold text-[18.3px] text-[#111111] leading-[20px] tracking-[-0.46px] uppercase"
                    style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                  >
                    MAKE IT<br />MOVE.
                  </h3>
                  <div className="w-[28.8px] h-[2.06px] bg-[#FF5A36] rounded-full mt-2 mb-2"></div>
                  <p 
                    className="text-[10.3px] text-[#77736C] leading-[16px]"
                    style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                  >
                    I connect screens and interactions so the product feels tangible and testable.
                  </p>
                </div>
              </div>

              {/* Prototyping Flow Artifact */}
              <div className="p-5 py-3 space-y-1.5 flex-1 flex flex-col justify-center">
                
                {/* Step 1 */}
                <div className="flex items-center gap-2">
                  <div className="px-3 py-1 rounded-[5.76px] border border-[#111111]/20 flex items-center gap-1.5 text-[8.64px] font-mono-jb text-[#111111]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#111111]/25"></span>
                    <span>SCREEN 01</span>
                  </div>
                </div>

                {/* Connector 1 */}
                <div className="pl-6 flex items-center gap-1.5 text-[6.72px] font-mono-jb text-[#77736C]">
                  <span className="w-[1px] h-3 bg-[#111111]/15"></span>
                  <span className="text-[#FF5A36] font-bold">●</span>
                  <span>TAP</span>
                </div>

                {/* Step 2 (Active highlighted) */}
                <div className="flex items-center gap-2">
                  <div className="px-3 py-1 rounded-[5.76px] bg-[#FF5A36] border border-[#FF5A36] flex items-center gap-1.5 text-[8.64px] font-mono-jb text-white shadow-sm">
                    <span className="w-1.5 h-1.5 rounded-full bg-white"></span>
                    <span>SCREEN 02</span>
                  </div>
                </div>

                {/* Connector 2 */}
                <div className="pl-6 flex items-center gap-1.5 text-[6.72px] font-mono-jb text-[#77736C]">
                  <span className="w-[1px] h-3 bg-[#111111]/15"></span>
                  <span className="text-[#FF5A36] font-bold">●</span>
                  <span>SWIPE</span>
                </div>

                {/* Step 3 */}
                <div className="flex items-center gap-2">
                  <div className="px-3 py-1 rounded-[5.76px] border border-[#111111]/20 flex items-center gap-1.5 text-[8.64px] font-mono-jb text-[#111111]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#111111]/25"></span>
                    <span>SCREEN 03</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-1 pt-2 text-[5.76px] text-[#FF5A36] font-mono-jb">
                  <span className="px-2 py-0.5 rounded-full bg-[#FFF0EC]">SMART ANIMATE</span>
                  <span className="px-2 py-0.5 rounded-full bg-[#FFF0EC]">INTERACTION</span>
                  <span className="px-2 py-0.5 rounded-full bg-[#FFF0EC]">TRANSITION</span>
                </div>
              </div>

              {/* Card Footer */}
              <div className="p-5 py-3 border-t border-[#111111]/[0.06] flex items-center justify-between" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                <div>
                  <span className="text-[7.2px] text-[#77736C] uppercase tracking-[1px] block">OUTPUT</span>
                  <span className="text-[8.75px] font-medium text-[#111111] tracking-[0.52px]">INTERACTIVE PROTOTYPE</span>
                </div>
                <div className="flex items-center gap-1 text-[8.24px] text-[#FF5A36] font-medium">
                  <span>06</span>
                  <span>→</span>
                  <span>07</span>
                </div>
              </div>
            </div>

            {/* =========================================================================
                CARD 07: USABILITY TESTING — WATCH. LEARN. REFINE.
                ========================================================================= */}
            <div 
              onClick={() => scrollToStep(7)}
              className={`w-[295px] sm:w-[308px] shrink-0 rounded-[20.6px] bg-[#FDFCF9] flex flex-col justify-between snap-start transition-all duration-300 ${
                activeStep === 7 
                  ? 'border-[0.7px] border-[#FF5A36]/40 shadow-[0_12px_49px_rgba(17,17,17,0.15),0_2px_8px_rgba(17,17,17,0.06)] scale-[1.01]' 
                  : 'border-[0.64px] border-[#111111]/10 opacity-80 hover:opacity-100 shadow-[0_2px_12px_rgba(17,17,17,0.06)]'
              }`}
              style={{ minHeight: '445px' }}
            >
              {/* Card Header Top */}
              <div className="p-5 pb-3.5 border-b border-[#111111]/[0.06]">
                <div className="flex items-center gap-2 mb-2" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                  <span className="text-[10.3px] font-medium text-[#77736C] tracking-[1.2px]">07</span>
                  <span className="text-[8.2px] text-[#77736C] tracking-[0.82px] uppercase">USABILITY TESTING</span>
                </div>

                <div>
                  <h3 
                    className="font-space font-semibold text-[18.3px] text-[#111111] leading-[20px] tracking-[-0.46px] uppercase"
                    style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                  >
                    WATCH.<br />LEARN. REFINE.
                  </h3>
                  <div className="w-[28.8px] h-[2.06px] bg-[#FF5A36] rounded-full mt-2 mb-2"></div>
                  <p 
                    className="text-[10.3px] text-[#77736C] leading-[16px]"
                    style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                  >
                    I test with real users and identify exactly where friction or confusion occurs.
                  </p>
                </div>
              </div>

              {/* Testing Artifact Body */}
              <div className="p-5 py-3 space-y-2 flex-1 flex flex-col justify-center">
                
                {/* Task Box */}
                <div className="p-2 rounded-[7.68px] bg-[#111111]/[0.04] border border-[#111111]/[0.07]">
                  <span className="text-[6.72px] text-[#77736C] uppercase tracking-[0.8px] block mb-0.5" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                    TASK
                  </span>
                  <span className="text-[9.6px] font-medium text-[#111111]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                    Find a property under ₹50L
                  </span>
                </div>

                {/* User Status */}
                <div className="flex items-center justify-between px-1">
                  <div className="flex items-center gap-1.5">
                    <div className="w-5 h-5 rounded-full bg-[#111111] flex items-center justify-center">
                      <svg className="w-2.5 h-2.5 text-[#F4F1EA]" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                      </svg>
                    </div>
                    <span className="text-[6.72px] text-[#77736C] uppercase font-mono-jb">USER</span>
                  </div>
                  <div className="flex items-center gap-1 text-[9.6px] font-medium text-[#111111]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                    <span className="w-1.5 h-1.5 rounded-full bg-[#34C759]"></span>
                    <span>Completed</span>
                  </div>
                </div>

                {/* Observation Box */}
                <div className="p-2 rounded-[7.68px] bg-[#FF5A36]/[0.04] border border-[#FF5A36]/20">
                  <span className="text-[6.72px] text-[#FF5A36] uppercase tracking-[0.8px] block font-medium" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                    OBSERVATION
                  </span>
                  <span className="text-[8.64px] text-[#111111] leading-tight block" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                    Filter was difficult to notice below the fold
                  </span>
                </div>

                {/* Insight Box */}
                <div className="p-2 rounded-[7.68px] bg-[#111111]/[0.04]">
                  <span className="text-[6.72px] text-[#77736C] uppercase tracking-[0.8px] block" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                    INSIGHT
                  </span>
                  <span className="text-[8.64px] text-[#111111] leading-tight block" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                    Improve filter discoverability
                  </span>
                </div>
              </div>

              {/* Card Footer */}
              <div className="p-5 py-3 border-t border-[#111111]/[0.06] flex items-center justify-between" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                <div>
                  <span className="text-[7.2px] text-[#77736C] uppercase tracking-[1px] block">OUTPUT</span>
                  <span className="text-[8.75px] font-medium text-[#111111] tracking-[0.52px]">USABILITY INSIGHTS</span>
                </div>
                <div className="flex items-center gap-1 text-[8.24px] text-[#FF5A36] font-medium">
                  <span>07</span>
                  <span>→</span>
                  <span>08</span>
                </div>
              </div>
            </div>

            {/* =========================================================================
                CARD 08: ITERATION — BETTER EVERY ROUND.
                ========================================================================= */}
            <div 
              onClick={() => scrollToStep(8)}
              className={`w-[295px] sm:w-[308px] shrink-0 rounded-[20.6px] bg-[#FDFCF9] flex flex-col justify-between snap-start transition-all duration-300 ${
                activeStep === 8 
                  ? 'border-[0.7px] border-[#FF5A36]/40 shadow-[0_12px_49px_rgba(17,17,17,0.15),0_2px_8px_rgba(17,17,17,0.06)] scale-[1.01]' 
                  : 'border-[0.64px] border-[#111111]/10 opacity-80 hover:opacity-100 shadow-[0_2px_12px_rgba(17,17,17,0.06)]'
              }`}
              style={{ minHeight: '445px' }}
            >
              {/* Card Header Top */}
              <div className="p-5 pb-3.5 border-b border-[#111111]/[0.06]">
                <div className="flex items-center gap-2 mb-2" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                  <span className="text-[10.3px] font-medium text-[#77736C] tracking-[1.2px]">08</span>
                  <span className="text-[8.2px] text-[#77736C] tracking-[0.82px] uppercase">ITERATION</span>
                </div>

                <div>
                  <h3 
                    className="font-space font-semibold text-[18.3px] text-[#111111] leading-[20px] tracking-[-0.46px] uppercase"
                    style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                  >
                    BETTER<br />EVERY ROUND.
                  </h3>
                  <div className="w-[28.8px] h-[2.06px] bg-[#FF5A36] rounded-full mt-2 mb-2"></div>
                  <p 
                    className="text-[10.3px] text-[#77736C] leading-[16px]"
                    style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                  >
                    The first version is rarely the final version. Feedback shapes the product.
                  </p>
                </div>
              </div>

              {/* Iteration Artifact Body */}
              <div className="p-5 py-3 space-y-2 flex-1 flex flex-col justify-center">
                
                {/* Version flow */}
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-[7.68px] font-mono-jb">
                    <span className="px-2 py-0.5 rounded-[3.84px] border border-[#111111]/20">VERSION 01</span>
                    <span className="text-[#FF5A36] font-medium">↓ FEEDBACK</span>
                    <span className="px-2 py-0.5 rounded-[3.84px] border border-[#111111]/20">VERSION 02</span>
                    <span className="text-[#FF5A36] font-medium">↓ FINAL</span>
                  </div>
                </div>

                {/* Before vs After Side-by-Side */}
                <div className="flex items-end justify-between gap-2 pt-1">
                  
                  {/* Before screen */}
                  <div className="flex-1 text-center space-y-1">
                    <span className="text-[6.72px] text-[#77736C] font-mono-jb block">BEFORE</span>
                    <div className="w-full h-12 rounded-[7.68px] bg-white border border-[#111111]/15 p-1 space-y-1">
                      <div className="w-full h-[2px] bg-[#111111]/15 rounded"></div>
                      <div className="w-full h-4 bg-[#111111]/[0.06] rounded-[3px]"></div>
                      <div className="w-full h-1.5 bg-[#111111]/15 rounded-[2px]"></div>
                    </div>
                  </div>

                  <span className="text-[#FF5A36] text-[12px] font-bold pb-4">→</span>

                  {/* After screen */}
                  <div className="flex-1 text-center space-y-1">
                    <span className="text-[6.72px] text-[#FF5A36] font-mono-jb block font-medium">AFTER</span>
                    <div className="w-full h-12 rounded-[7.68px] bg-[#111111] border border-[#FF5A36]/30 p-1 space-y-1 text-white shadow-sm">
                      <div className="w-full h-[2px] bg-[#F4F1EA]/20 rounded"></div>
                      <div className="w-full h-4 bg-[#FF5A36]/25 rounded-[3px]"></div>
                      <div className="w-full h-1.5 bg-[#FF5A36] rounded-[2px]"></div>
                    </div>
                  </div>

                </div>
              </div>

              {/* Card Footer */}
              <div className="p-5 py-3 border-t border-[#111111]/[0.06] flex items-center justify-between" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                <div>
                  <span className="text-[7.2px] text-[#77736C] uppercase tracking-[1px] block">OUTPUT</span>
                  <span className="text-[8.75px] font-medium text-[#111111] tracking-[0.52px]">BETTER EXPERIENCE</span>
                </div>
                <div className="text-[7.68px] text-[#77736C] font-mono-jb">
                  <span>↩ LOOP</span>
                </div>
              </div>
            </div>

            {/* =========================================================================
                CARD 09 (LOOP CARD): THE PROCESS ISN'T LINEAR.
                ========================================================================= */}
            <div 
              className="w-[230px] shrink-0 rounded-[20.6px] bg-[#111111] text-[#F4F1EA] p-6 border border-white/10 shadow-lg flex flex-col justify-between snap-start"
              style={{ minHeight: '445px' }}
            >
              <div className="space-y-4">
                <div>
                  <h3 
                    className="font-space font-semibold text-[18px] text-[#F4F1EA] leading-[22px] tracking-[-0.45px] uppercase"
                    style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                  >
                    THE PROCESS<br />ISN'T LINEAR.
                  </h3>
                  <p className="text-[11.5px] text-[#F4F1EA]/40 mt-1" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                    It's a loop.
                  </p>
                </div>

                <div className="w-full h-[1px] bg-[#F4F1EA]/10"></div>

                {/* Step Chain */}
                <div className="space-y-1 text-[8px] font-mono-jb">
                  <div className="text-[#FF5A36] font-semibold tracking-wider">RESEARCH</div>
                  <div className="w-[1px] h-2 bg-[#F4F1EA]/15 ml-2"></div>
                  <div className="text-[#F4F1EA]/40">DESIGN</div>
                  <div className="w-[1px] h-2 bg-[#F4F1EA]/15 ml-2"></div>
                  <div className="text-[#F4F1EA]/40">TEST</div>
                  <div className="w-[1px] h-2 bg-[#F4F1EA]/15 ml-2"></div>
                  <div className="text-[#F4F1EA]/40">LEARN</div>
                  <div className="w-[1px] h-2 bg-[#F4F1EA]/15 ml-2"></div>
                  <div className="text-[#FF5A36] font-semibold tracking-wider">REPEAT</div>
                </div>
              </div>

              {/* Loop Action */}
              <div className="pt-4">
                <button
                  onClick={() => scrollToStep(1)}
                  className="w-full py-2 px-3 rounded-[6px] border border-[#FF5A36]/40 text-[#FF5A36] text-[8px] font-mono-jb uppercase tracking-wider hover:bg-[#FF5A36]/10 transition-colors cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <span>↩</span>
                  <span>BACK TO 01</span>
                </button>
              </div>
            </div>

          </div>
        </div>
        </div>

        {/* Bottom Vector Curve Separator: arches down into the dark timeline */}
        <div className="w-full bg-[#F4F1EA] leading-none overflow-hidden select-none -mt-[1px] relative z-20">
          <img 
            src={curveBottom} 
            alt="" 
            aria-hidden="true" 
            className="w-full block h-[38px] sm:h-[70px] md:h-[88px] object-fill pointer-events-none select-none" 
          />
        </div>
      </div>

      {/* =========================================================================
          BOTTOM TIMELINE TRACK (Exact Figma: Line, glowing nodes, 01 - 08 numbers)
          ========================================================================= */}
      <div className="max-w-[1360px] mx-auto px-3 sm:px-10 lg:px-16 relative z-10 pt-3 sm:pt-6 md:pt-8 pb-3">
        <div className="relative py-2 sm:py-4 max-w-[1200px] mx-auto">
          
          {/* Horizontal Track Line */}
          <div className="absolute top-[14px] sm:top-[18px] left-[3%] right-[3%] h-[1.5px] bg-[#F4F1EA]/15 z-0"></div>

          {/* 8 Clickable Node Markers & Numbers */}
          <div className="relative z-10 grid grid-cols-8 gap-1 sm:gap-2">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => {
              const isActive = num === activeStep;
              const stepNumStr = String(num).padStart(2, '0');

              return (
                <button
                  key={num}
                  onClick={() => scrollToStep(num)}
                  className="flex flex-col items-center group cursor-pointer focus:outline-none py-1 active:scale-95 transition-transform"
                  aria-label={`Jump to step ${num}`}
                >
                  {/* Node Dot */}
                  <div className="h-5 sm:h-6 flex items-center justify-center mb-0.5 sm:mb-1">
                    {isActive ? (
                      <div className="w-3 h-3 sm:w-3.5 sm:h-3.5 rounded-full bg-[#FF5A36] border-2 border-[#FF5A36] shadow-[0_0_14px_#FF5A36] flex items-center justify-center transition-all duration-300 scale-110">
                        <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-[#F4F1EA]"></div>
                      </div>
                    ) : (
                      <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-[#F4F1EA]/25 border border-[#F4F1EA]/15 group-hover:bg-[#F4F1EA]/50 transition-all duration-200"></div>
                    )}
                  </div>

                  {/* Step Number */}
                  <span 
                    className={`text-[10px] xs:text-xs sm:text-base font-mono-jb transition-all duration-200 ${
                      isActive 
                        ? 'text-[#FF5A36] font-semibold scale-110' 
                        : 'text-[#77736C]/70 font-normal group-hover:text-[#F4F1EA]'
                    }`}
                    style={{ fontFamily: "'JetBrains Mono', monospace" }}
                  >
                    {stepNumStr}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
