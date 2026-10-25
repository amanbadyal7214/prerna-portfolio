import React, { useState } from 'react';
import { projectsData } from '../data/portfolioData';
import { ArrowUpRight, Sparkles } from 'lucide-react';

export default function ProjectsSection({ onSelectProject }) {
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = [
    { label: 'All Projects', value: 'All', count: projectsData.length },
    { label: 'Mobile Apps', value: 'Mobile App', count: projectsData.filter(p => p.category === 'Mobile App').length },
    { label: 'Web Design', value: 'Web Design', count: projectsData.filter(p => p.category === 'Web Design').length },
    { label: 'Live Products', value: 'Live', count: projectsData.filter(p => p.isLive).length },
  ];

  const filteredProjects = projectsData.filter(project => {
    if (activeCategory === 'All') return true;
    if (activeCategory === 'Live') return project.isLive;
    return project.category === activeCategory;
  });

  return (
    <section id="work" className="py-20 md:py-28 bg-[#0c0d10] text-white relative border-t border-white/5">
      {/* Ambient background glow */}
      <div className="absolute top-20 left-10 w-96 h-96 bg-[#ff5722]/5 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-tech text-[#ff8a65] tracking-wider uppercase mb-3">
              <Sparkles className="w-3.5 h-3.5 text-[#ff5722]" />
              <span>Selected Portfolio Works</span>
            </div>
            <h2 className="font-display font-black text-3xl sm:text-5xl md:text-6xl tracking-tighter uppercase text-white leading-none">
              Featured Work.
            </h2>
            <p className="mt-2 text-sm sm:text-base text-neutral-400 font-light max-w-xl">
              From user research and Figma design systems to live mobile apps on Google Play.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat.value}
                onClick={() => setActiveCategory(cat.value)}
                className={`px-4 py-2 rounded-full text-xs font-tech transition-all cursor-pointer ${
                  activeCategory === cat.value
                    ? 'bg-[#ff5722] text-white shadow-lg shadow-orange-600/30'
                    : 'bg-white/5 hover:bg-white/10 text-neutral-400 hover:text-white border border-white/10'
                }`}
              >
                <span>{cat.label}</span>
                <span className="ml-1.5 opacity-60">({cat.count})</span>
              </button>
            ))}
          </div>
        </div>

        {/* Project Cards List */}
        <div className="space-y-12 sm:space-y-16">
          {filteredProjects.map((project, idx) => {
            const projectNumber = project.num || String(idx + 1).padStart(2, '0');

            return (
              <div
                key={project.id}
                onClick={() => onSelectProject(project)}
                className="relative rounded-[28px] sm:rounded-[36px] bg-[#111111] border border-white/10 hover:border-white/25 transition-all duration-500 overflow-hidden shadow-2xl group cursor-pointer"
              >
                {/* Subtle Figma-style corner marks from reference image */}
                <div className="absolute top-5 right-6 text-white/20 font-mono text-xs select-none pointer-events-none tracking-widest hidden sm:block">
                  ┌ ┐
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch min-h-[460px] sm:min-h-[500px]">
                  
                  {/* Left Column: Exactly matching the uploaded reference design */}
                  <div className="lg:col-span-6 p-7 sm:p-10 md:p-14 flex flex-col justify-between z-10">
                    
                    <div>
                      {/* Top Numeral & Label Header */}
                      <div className="flex items-center gap-4 mb-4 sm:mb-6">
                        <span className="font-display font-black text-6xl sm:text-7xl md:text-8xl text-[#FF5A36] leading-none tracking-tight select-none">
                          {projectNumber}
                        </span>
                        <span className="text-[11px] sm:text-xs font-tech tracking-[0.25em] text-neutral-400 font-semibold uppercase select-none">
                          SELECTED WORK / {projectNumber}
                        </span>
                      </div>

                      {/* Large Bold Project Title */}
                      <h3 className="font-display font-black text-3xl sm:text-4xl md:text-5xl lg:text-5xl text-white tracking-tight uppercase leading-none mb-8 sm:mb-12 group-hover:text-white transition-colors">
                        {project.title}
                      </h3>

                      {/* Metadata Key-Value List */}
                      <div className="space-y-4 sm:space-y-5">
                        <div className="flex items-center">
                          <span className="w-28 sm:w-36 text-xs sm:text-sm font-tech tracking-wider text-[#73706b] uppercase font-semibold">
                            ROLE
                          </span>
                          <span className="font-display font-bold text-white tracking-wider uppercase text-sm sm:text-base">
                            {project.role || 'UI/UX DESIGNER'}
                          </span>
                        </div>

                        <div className="flex items-center">
                          <span className="w-28 sm:w-36 text-xs sm:text-sm font-tech tracking-wider text-[#73706b] uppercase font-semibold">
                            PRODUCT
                          </span>
                          <span className="font-display font-bold text-white tracking-wider uppercase text-sm sm:text-base">
                            {project.product || 'MOBILE APPLICATION'}
                          </span>
                        </div>

                        <div className="flex items-center">
                          <span className="w-28 sm:w-36 text-xs sm:text-sm font-tech tracking-wider text-[#73706b] uppercase font-semibold">
                            TOOLS
                          </span>
                          <span className="font-display font-bold text-white tracking-wider uppercase text-sm sm:text-base">
                            {project.tools || 'FIGMA'}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Bottom Action: CASE STUDY + DIRECT LIVE / FIGMA LINKS */}
                    <div className="pt-8 sm:pt-14 flex items-center gap-4 flex-wrap">
                      <div className="inline-flex flex-col group/link">
                        <div className="flex items-center gap-3 text-xs sm:text-sm font-tech tracking-[0.2em] text-neutral-200 group-hover:text-white uppercase font-bold">
                          <span>CASE STUDY</span>
                          <span className="p-1 rounded bg-white/10 group-hover:bg-[#FF5A36] group-hover:text-white transition-colors">
                            <ArrowUpRight className="w-3.5 h-3.5 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                          </span>
                        </div>
                        <div className="w-full h-[1px] bg-neutral-600 group-hover:bg-[#FF5A36] mt-2.5 transition-colors"></div>
                      </div>

                      {/* Direct Live Link Button */}
                      {project.liveLink && (
                        <a
                          href={project.liveLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-tech font-bold transition-all border border-emerald-500/30 bg-emerald-500/10 hover:bg-emerald-500 hover:text-black text-emerald-400 cursor-pointer shadow-lg shadow-emerald-950/40"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 group-hover:bg-black animate-pulse"></span>
                          <span>{project.liveLinkText || 'Live Product'}</span>
                          <ArrowUpRight className="w-3 h-3" />
                        </a>
                      )}

                      {/* Direct Figma Link Button */}
                      {project.figmaLink && (
                        <a
                          href={project.figmaLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-tech font-semibold transition-all border border-white/15 bg-white/5 hover:bg-white/15 text-neutral-200 hover:text-white cursor-pointer"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-[#ff5722]"></span>
                          <span>{project.figmaLinkText || 'Figma'}</span>
                          <ArrowUpRight className="w-3 h-3 opacity-60" />
                        </a>
                      )}
                    </div>

                  </div>

                  {/* Right Column: Visual Mockup Showcase */}
                  <div className="lg:col-span-6 relative flex items-end justify-center lg:justify-end overflow-hidden pt-6 lg:pt-0 bg-[#111111]">
                    {project.mockupType === 'phone' ? (
                      <div className="relative w-full h-full min-h-[360px] sm:min-h-[460px] lg:min-h-[520px] flex items-end justify-center lg:justify-end">
                        <img 
                          src={project.mockupImage} 
                          alt={project.title}
                          className="w-full max-w-[480px] lg:max-w-none lg:w-[112%] object-contain object-bottom-right transition-transform duration-700 group-hover:scale-[1.03]"
                        />
                      </div>
                    ) : project.mockupType === 'laptop' ? (
                      <div className="relative w-full h-full min-h-[360px] sm:min-h-[460px] lg:min-h-[520px] flex items-center justify-center p-6 sm:p-10">
                        <img 
                          src={project.mockupImage} 
                          alt={project.title}
                          className="w-full max-w-lg lg:max-w-xl object-contain drop-shadow-2xl transition-transform duration-700 group-hover:scale-[1.04]"
                        />
                      </div>
                    ) : (
                      <div className="relative w-full h-full min-h-[360px] sm:min-h-[460px] lg:min-h-[520px] flex items-center justify-center p-6 sm:p-10">
                        <div className="w-full max-w-lg rounded-2xl overflow-hidden border border-white/20 shadow-2xl bg-[#1b1c24] transform -rotate-3 group-hover:rotate-0 transition-transform duration-700">
                          {/* Browser top chrome */}
                          <div className="h-7 bg-black/70 px-4 flex items-center gap-2 border-b border-white/10">
                            <span className="w-2.5 h-2.5 rounded-full bg-red-500/80"></span>
                            <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80"></span>
                            <span className="w-2.5 h-2.5 rounded-full bg-green-500/80"></span>
                            <span className="ml-2 text-[10px] font-mono text-neutral-400 truncate">
                              {project.title.toLowerCase().replace(/\s+/g, '-')}.com
                            </span>
                          </div>
                          <img 
                            src={project.mockupImage} 
                            alt={project.title}
                            className="w-full aspect-[16/10] object-cover"
                          />
                        </div>
                      </div>
                    )}

                    {/* Subtle Live Badge Overlay for Play Store / Live Products */}
                    {project.isLive && (
                      <div className="absolute top-6 right-6 lg:top-8 lg:right-8 z-20">
                        <span className="px-3 py-1 rounded-full bg-emerald-500/90 text-black font-tech font-bold text-xs shadow-lg backdrop-blur-md flex items-center gap-1.5">
                          <span className="w-2 h-2 rounded-full bg-black animate-pulse"></span>
                          {project.liveBadge}
                        </span>
                      </div>
                    )}
                  </div>

                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
