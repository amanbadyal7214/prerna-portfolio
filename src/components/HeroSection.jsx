import React, { useRef, useState, useEffect } from 'react';
import { personalInfo } from '../data/portfolioData';
import { Volume2, VolumeX, Play, Pause, FileText, ArrowUpRight, ArrowDown } from 'lucide-react';

export default function HeroSection({ onOpenResume, onOpenContact }) {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [activeSlide, setActiveSlide] = useState(1);
  const [portraitVideoEnded, setPortraitVideoEnded] = useState(false);
  const videoRef = useRef(null);
  const portraitVideoRef = useRef(null);
  const containerRef = useRef(null);

  // Speed up videos on mount
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 1.6;
    }
    if (portraitVideoRef.current) {
      portraitVideoRef.current.playbackRate = 1.8;
    }
  }, []);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  // Track active slide index on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const scrolledPast = -rect.top;

      if (scrolledPast < viewportHeight * 0.7) {
        setActiveSlide(1);
      } else if (scrolledPast < viewportHeight * 1.7) {
        setActiveSlide(2);
      } else {
        setActiveSlide(3);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSlide = (slideNum) => {
    if (!containerRef.current) return;
    const containerTop = containerRef.current.offsetTop;
    const viewportHeight = window.innerHeight;
    window.scrollTo({
      top: containerTop + (slideNum - 1) * viewportHeight,
      behavior: 'smooth'
    });
  };

  return (
    <div ref={containerRef} className="relative w-full">

      {/* =========================================================================
          STACKED SCREEN 1 / CARD 1: FULL SCREEN VIDEO HERO
          Mobile: object-contain (fits complete book & text without zoom)
          Desktop: md:object-cover (full-screen bleed)
          ========================================================================= */}
      <div className="sticky top-0 h-screen min-h-screen w-full bg-[#dfd7cc] z-10 overflow-hidden">

        {/* Video Area Container */}
        <div className="relative w-full h-full overflow-hidden flex items-center justify-center">
          <video
            ref={videoRef}
            src="/videos/book_intro.mp4"
            autoPlay
            loop
            muted
            playsInline
            onLoadedMetadata={(e) => { e.target.playbackRate = 1.6; }}
            onPlay={(e) => { e.target.playbackRate = 1.6; }}
            className="w-full h-full object-contain md:object-cover scale-[1.24] md:scale-100 select-none transition-transform duration-300"
          />

          {/* Mobile soft edge blending gradients: melts video tabletop into #dfd7cc with zero seams */}
          <div className="absolute top-0 inset-x-0 h-24 sm:h-32 bg-gradient-to-b from-[#dfd7cc] via-[#dfd7cc]/80 to-transparent pointer-events-none md:hidden z-10" />
          <div className="absolute bottom-0 inset-x-0 h-24 sm:h-32 bg-gradient-to-t from-[#dfd7cc] via-[#dfd7cc]/80 to-transparent pointer-events-none md:hidden z-10" />

          {/* Figma Rectangle 3: Gradient Blur Patch in bottom-right (Desktop only where video is full bleed) */}
          <div
            className="absolute pointer-events-none rounded-sm hidden md:block"
            style={{
              width: '46px',
              height: '62px',
              right: '8%',
              bottom: '10%',
              background: 'linear-gradient(180deg, #715E4A 0%, #6E5C47 100%)',
              filter: 'blur(4.1px)',
              opacity: 0.85
            }}
          ></div>

          {/* Floating Controls in top-right */}
          <div className="absolute top-5 right-4 sm:top-8 sm:right-8 flex items-center gap-2 z-20">
            <button
              onClick={togglePlay}
              className="p-2.5 sm:p-3 rounded-full bg-black/75 hover:bg-black text-white backdrop-blur-md border border-white/10 transition-all cursor-pointer shadow-xl active:scale-95"
              title={isPlaying ? "Pause" : "Play"}
              aria-label={isPlaying ? "Pause video" : "Play video"}
            >
              {isPlaying ? <Pause className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> : <Play className="w-3.5 h-3.5 sm:w-4 sm:h-4" />}
            </button>
            <button
              onClick={toggleMute}
              className="p-2.5 sm:p-3 rounded-full bg-black/75 hover:bg-black text-white backdrop-blur-md border border-white/10 transition-all cursor-pointer shadow-xl active:scale-95"
              title={isMuted ? "Unmute" : "Mute"}
              aria-label={isMuted ? "Unmute audio" : "Mute audio"}
            >
              {isMuted ? <VolumeX className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> : <Volume2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />}
            </button>
          </div>

          {/* Floating Brand Badge in top-left on mobile */}
          <div className="absolute top-5 left-4 sm:top-8 sm:left-8 z-20 md:hidden">
            <div className="flex items-center gap-2 text-[11px] font-tech tracking-widest uppercase text-neutral-900 bg-black/5 backdrop-blur-md border border-black/10 px-3.5 py-1.5 rounded-full shadow-xs">
              <span className="w-2 h-2 rounded-full bg-[#ff5722] animate-pulse"></span>
              <span className="font-bold">Prerna Sablok</span>
            </div>
          </div>

          {/* Bottom Overlay & Scroll Cue */}
          <div className="absolute bottom-5 left-0 right-0 px-4 sm:px-8 flex items-center justify-between z-20 md:bg-gradient-to-t md:from-black/60 md:via-black/20 md:to-transparent">
            {/* Desktop Brand Tag */}
            <div className="hidden md:flex items-center gap-2 text-xs font-tech tracking-widest uppercase text-white/90">
              <span className="w-2 h-2 rounded-full bg-[#ff5722] animate-pulse"></span>
              <span>Prerna Sablok • Portfolio Lookbook</span>
            </div>

            {/* Mobile Slide Indicator */}
            <div className="md:hidden flex items-center gap-1.5 text-[11px] font-tech text-neutral-800 tracking-wider font-semibold bg-black/5 backdrop-blur-sm px-3 py-1.5 rounded-full border border-black/5">
              <span className="text-[#ff5722]">01</span>
              <span className="text-neutral-400">/</span>
              <span className="text-neutral-600">03</span>
            </div>

            <button
              onClick={() => scrollToSlide(2)}
              className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-[#111215] md:bg-black/75 hover:bg-black text-white text-xs font-tech uppercase tracking-wider backdrop-blur-md border border-white/15 transition-all cursor-pointer shadow-xl active:scale-95"
            >
              <span>Scroll to Explore</span>
              <ArrowDown className="w-3.5 h-3.5 text-[#ff5722] animate-bounce" />
            </button>
          </div>
        </div>

      </div>

      {/* =========================================================================
          STACKED SCREEN 2 / CARD 2: STATEMENT (Sticky top-0, z-20)
          "I DESIGN WHAT PEOPLE DON'T HAVE TO THINK ABOUT."
          ========================================================================= */}
      <div className="sticky top-0 h-screen min-h-screen w-full bg-[#111215] text-white z-20 flex flex-col justify-center items-center px-4 sm:px-8 shadow-[0_-25px_60px_rgba(0,0,0,0.7)] border-t border-white/10 overflow-hidden">

        {/* Ambient glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-[#ff5722]/10 blur-[160px] rounded-full pointer-events-none"></div>

        <div className="w-full max-w-[1280px] flex flex-col items-center text-center select-none relative z-10 px-2">

          <div className="space-y-1 sm:space-y-2 md:space-y-3 font-display font-black text-3xl xs:text-4xl sm:text-6xl md:text-7xl lg:text-[88px] tracking-tight uppercase leading-[0.98] sm:leading-[0.96]">

            {/* Row 1: I DESIGN (Outline text stroke) */}
            <div className="text-stroke-outline">
              I DESIGN
            </div>

            {/* Row 2: WHAT PEOPLE (Outline text stroke with responsive dynamic offset) */}
            <div className="text-stroke-outline pl-3 xs:pl-6 sm:pl-16 md:pl-28">
              WHAT PEOPLE
            </div>

            {/* Row 3: DON'T HAVE TO (Solid muted gray) */}
            <div className="text-[#888b94] pl-1 xs:pl-3 sm:pl-8 md:pl-14">
              DON'T HAVE TO
            </div>

            {/* Row 4: THINK ABOUT. (Solid Vibrant Orange) */}
            <div className="text-[#ff5722] pl-4 xs:pl-8 sm:pl-20 md:pl-40 drop-shadow-[0_0_40px_rgba(255,87,34,0.35)]">
              THINK ABOUT.
            </div>

          </div>

          <div className="mt-8 sm:mt-12 flex items-center gap-2 text-[11px] sm:text-xs font-tech text-neutral-400 uppercase tracking-widest bg-white/5 px-4 py-1.5 rounded-full border border-white/10">
            <span className="w-1.5 h-1.5 rounded-full bg-[#ff5722]"></span>
            <span>02 • Design Philosophy</span>
          </div>

        </div>
      </div>

      {/* =========================================================================
          STACKED SCREEN 3 / CARD 3: "HI, I'M PRERNA."
          Desktop: Sticky top-0, h-screen
          Mobile: Relative, min-h-[100dvh], overflow-visible (prevents portrait card cutoff)
          ========================================================================= */}
      <div id="about" className="relative lg:sticky lg:top-0 min-h-[100dvh] w-full bg-[#f4eee6] text-[#141519] z-30 flex flex-col justify-center items-center py-12 sm:py-16 px-4 sm:px-8 lg:px-12 shadow-[0_-25px_60px_rgba(0,0,0,0.5)] border-t border-black/10 overflow-visible lg:overflow-hidden">

        {/* Subtle grid */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:20px_20px]"></div>

        <div className="w-full max-w-[1280px] flex flex-col justify-center pt-8 sm:pt-16 lg:pt-28 pb-8 sm:pb-16 relative z-10 my-auto">

          {/* Main 2-Column Body (Exact Match to Screen 3) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-14 items-center">

            {/* Left Column: Big Bold Typography */}
            <div className="lg:col-span-7 space-y-4 sm:space-y-6">

              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/5 border border-black/10 font-tech text-[10px] sm:text-xs font-bold uppercase tracking-widest text-neutral-700">
                <span className="w-1.5 h-1.5 rounded-full bg-[#ff5722]"></span>
                <span>A UI/UX DESIGNER'S PERSPECTIVE</span>
              </div>

              {/* Huge Headline: "HI, I'M PRERNA." */}
              <h1 className="font-display font-black text-5xl xs:text-6xl sm:text-7xl md:text-8xl lg:text-[92px] tracking-tighter uppercase text-[#141519] leading-[0.9]">
                HI, I'M<br />
                PRERNA.
              </h1>

              {/* Orange Subtitle */}
              <p className="font-sans font-medium text-base sm:text-xl md:text-2xl text-[#ff5722] leading-snug">
                I turn messy problems into simple, meaningful experiences.
              </p>

              {/* Bio details from resume */}
              <p className="text-xs sm:text-sm md:text-base text-neutral-700 font-sans leading-relaxed max-w-xl">
                UI/UX Designer skilled in user research, wireframing, prototyping, interaction design, and design systems. Experienced in creating intuitive, responsive, and user-centered digital experiences using Figma.
              </p>

              {/* Action Buttons with high mobile touch polish */}
              <div className="flex flex-wrap items-center gap-2.5 sm:gap-3.5 pt-2 sm:pt-4">
                <a
                  href="#work"
                  className="flex-1 sm:flex-initial text-center px-6 py-3.5 rounded-full bg-[#111215] hover:bg-[#20232a] text-white text-xs font-tech font-bold uppercase tracking-wider transition-all shadow-lg active:scale-95"
                >
                  Explore Work
                </a>

                <button
                  onClick={onOpenResume}
                  className="flex-1 sm:flex-initial text-center px-5 py-3.5 rounded-full bg-white hover:bg-neutral-50 text-neutral-900 text-xs font-tech font-bold uppercase tracking-wider border border-black/10 transition-all shadow-xs active:scale-95 cursor-pointer flex items-center justify-center gap-2"
                >
                  <FileText className="w-3.5 h-3.5 text-[#ff5722]" />
                  <span>Resume CV</span>
                </button>

                <button
                  onClick={onOpenContact}
                  className="w-full xs:w-auto px-6 py-3.5 rounded-full bg-[#ff5722] hover:bg-[#ff6f43] text-white text-xs font-tech font-bold uppercase tracking-wider transition-all shadow-lg shadow-orange-600/30 active:scale-95 cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <span>Get in Touch</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>

            {/* Right Column: Editorial Framed Card with Orange Top & Bottom Bars (Exact Match to Figma Screen 3) */}
            <div className="lg:col-span-5 flex justify-center lg:justify-end mt-4 lg:mt-0">
              <div className="w-full max-w-[320px] xs:max-w-[350px] sm:max-w-[380px]">

                {/* The Framed Card */}
                <div className="relative rounded-2xl overflow-hidden bg-[#faf7f2] shadow-2xl border-t-[5px] border-b-[5px] border-[#ff5722] border-x border-black/10">

                  {/* Portrait / Video Card Content */}
                  <div className="relative aspect-[3/4] w-full overflow-hidden bg-[#e8e2d8]">
                    
                    {/* Video that plays first with increased speed */}
                    <video
                      ref={portraitVideoRef}
                      src="/videos/portrait_video.mp4"
                      autoPlay
                      muted
                      playsInline
                      onLoadedMetadata={(e) => { e.target.playbackRate = 1.8; }}
                      onPlay={(e) => { e.target.playbackRate = 1.8; }}
                      onEnded={() => setPortraitVideoEnded(true)}
                      className={`absolute inset-0 w-full h-full object-cover select-none transition-opacity duration-700 ${
                        portraitVideoEnded ? 'opacity-0 pointer-events-none' : 'opacity-100 z-10'
                      }`}
                    />

                    {/* Static Image that displays once video finishes */}
                    <img
                      src="/images/prerna_figma_portrait.jpg"
                      alt="Prerna Sablok — UI/UX Designer"
                      className={`w-full h-full object-cover select-none transition-opacity duration-700 ${
                        portraitVideoEnded ? 'opacity-100' : 'opacity-0'
                      }`}
                    />

                    {/* Architectural Blueprint Grid overlay */}
                    <div className="absolute inset-0 pointer-events-none opacity-20 bg-[linear-gradient(to_right,#000_1px,transparent_1px),linear-gradient(to_bottom,#000_1px,transparent_1px)] bg-[size:28px_28px] z-20"></div>

                    {/* Floating pill badges */}
                    <div className="absolute top-4 left-4 z-20">
                      <span className="px-3 py-1 rounded bg-black/80 text-white font-tech text-[10px] tracking-widest uppercase backdrop-blur-md">
                        MOHALI, INDIA
                      </span>
                    </div>

                    <div className="absolute bottom-4 right-4 z-20">
                      <span className="px-3 py-1 rounded-full bg-[#00c882] text-black font-tech text-[10px] font-bold uppercase tracking-wider shadow-lg flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-black animate-pulse"></span>
                        AVAILABLE FOR WORK
                      </span>
                    </div>
                  </div>

                  {/* Card Bottom Meta Strip */}
                  <div className="p-3.5 sm:p-4 bg-white border-t border-black/5 flex items-center justify-between text-xs font-tech text-neutral-700">
                    <div>
                      <div className="font-bold text-neutral-900">Prerna Sablok</div>
                      <div className="text-[11px] text-neutral-500">Junior UI/UX Designer</div>
                    </div>
                    <span className="text-[#ff5722] font-semibold text-[11px]">Pisoft Informatics</span>
                  </div>

                </div>

              </div>
            </div>

          </div>

        </div>
      </div>

    </div>
  );
}
