import React, { useState } from 'react';
import { X, ExternalLink, Sparkles, CheckCircle2, Layers, Smartphone } from 'lucide-react';

export default function ProjectModal({ project, onClose }) {
  const [activeModalTab, setActiveModalTab] = useState('overview');

  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-xl animate-in fade-in duration-200">
      
      {/* Click outside to close */}
      <div className="absolute inset-0" onClick={onClose}></div>

      <div className="relative w-full max-w-5xl max-h-[90vh] bg-[#111319] border border-white/15 rounded-3xl shadow-2xl overflow-hidden flex flex-col z-10 animate-in zoom-in-95 duration-200">
        
        {/* Modal Header */}
        <div className="p-5 sm:p-7 border-b border-white/10 flex items-center justify-between bg-[#14161f]/80 backdrop-blur-md">
          <div className="flex items-center gap-3">
            <span className="w-3 h-3 rounded-full bg-[#ff5722]"></span>
            <div>
              <h3 className="font-display font-black text-xl sm:text-2xl text-white tracking-tight">
                {project.title}
              </h3>
              <p className="text-xs font-tech text-[#ff8a65]">
                {project.subtitle}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {project.liveLink && (
              <a
                href={project.liveLink}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-emerald-500 hover:bg-emerald-400 text-black font-tech font-bold text-xs shadow-lg shadow-emerald-500/20 transition-all cursor-pointer"
              >
                <span>{project.liveLinkText || 'Live Product'}</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
            {project.figmaLink && (
              <a
                href={project.figmaLink}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#ff5722]/15 hover:bg-[#ff5722]/25 text-[#ff8a65] border border-[#ff5722]/30 font-tech font-bold text-xs transition-all cursor-pointer"
              >
                <span>{project.figmaLinkText || 'Figma'}</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
            <button
              onClick={onClose}
              className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-neutral-400 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-8">
          
          {/* Main Hero Preview */}
          <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-black aspect-[16/9]">
            <img 
              src={project.image} 
              alt={project.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-4 left-4">
              <span className="px-3 py-1.5 rounded-full bg-black/80 backdrop-blur-md text-white font-tech text-xs border border-white/10 shadow-lg">
                Figma Artboard Preview
              </span>
            </div>
          </div>

          {/* Quick Stats Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3.5 rounded-xl bg-white/5 border border-white/5">
              <div className="text-[10px] font-tech text-neutral-400 uppercase">Category</div>
              <div className="font-display font-bold text-sm text-white mt-0.5">{project.category}</div>
            </div>
            <div className="p-3.5 rounded-xl bg-white/5 border border-white/5">
              <div className="text-[10px] font-tech text-neutral-400 uppercase">Status</div>
              <div className="font-display font-bold text-sm text-emerald-400 mt-0.5">{project.liveBadge}</div>
            </div>
            <div className="p-3.5 rounded-xl bg-white/5 border border-white/5">
              <div className="text-[10px] font-tech text-neutral-400 uppercase">Designer</div>
              <div className="font-display font-bold text-sm text-white mt-0.5">Prerna Sablok</div>
            </div>
            <div className="p-3.5 rounded-xl bg-white/5 border border-white/5">
              <div className="text-[10px] font-tech text-neutral-400 uppercase">Tools</div>
              <div className="font-display font-bold text-sm text-[#ff8a65] mt-0.5">Figma 5.0</div>
            </div>
          </div>

          {/* Problem & Solution Breakdown */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-5 sm:p-6 rounded-2xl bg-black/40 border border-white/10 space-y-2">
              <div className="flex items-center gap-2 text-xs font-tech uppercase text-red-400 font-semibold">
                <span className="w-2 h-2 rounded-full bg-red-400"></span>
                <span>The UX Challenge & Problem</span>
              </div>
              <p className="text-sm text-neutral-300 leading-relaxed">
                {project.problem}
              </p>
            </div>

            <div className="p-5 sm:p-6 rounded-2xl bg-[#ff5722]/5 border border-[#ff5722]/20 space-y-2">
              <div className="flex items-center gap-2 text-xs font-tech uppercase text-[#ff8a65] font-semibold">
                <span className="w-2 h-2 rounded-full bg-[#ff5722]"></span>
                <span>The Design Solution</span>
              </div>
              <p className="text-sm text-neutral-200 leading-relaxed">
                {project.solution}
              </p>
            </div>
          </div>

          {/* Key Design Deliverables & Architecture */}
          <div className="space-y-3">
            <h4 className="font-tech text-xs uppercase tracking-widest text-neutral-400 font-semibold">
              Key Features & UX Architecture:
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {project.keyFeatures.map((feat, i) => (
                <div key={i} className="p-3 rounded-xl bg-white/5 border border-white/5 flex items-start gap-2.5 text-xs text-neutral-300">
                  <CheckCircle2 className="w-4 h-4 text-[#ff5722] shrink-0 mt-0.5" />
                  <span>{feat}</span>
                </div>
              ))}
            </div>
          </div>

          {/* High-Resolution Screens Showcase (if provided) */}
          {project.screens && project.screens.length > 0 && (
            <div className="space-y-4 pt-2">
              <div className="flex items-center justify-between">
                <h4 className="font-tech text-xs uppercase tracking-widest text-neutral-400 font-semibold">
                  UI Artboards & Screen Flows ({project.screens.length})
                </h4>
                <span className="text-[11px] font-tech text-neutral-500">
                  Figma High-Fidelity Specs
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {project.screens.map((screen, sIdx) => (
                  <div 
                    key={sIdx}
                    className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-white/20 transition-all flex flex-col group"
                  >
                    <div className="mb-3">
                      <div className="text-xs font-display font-bold text-white group-hover:text-[#ff8a65] transition-colors">
                        {screen.title}
                      </div>
                      <div className="text-[11px] font-tech text-neutral-400 mt-0.5">
                        {screen.subtitle}
                      </div>
                    </div>
                    <div className="relative rounded-xl overflow-hidden bg-[#0c0d10] border border-white/10 flex items-center justify-center p-3 shadow-inner">
                      <img 
                        src={screen.image} 
                        alt={screen.title}
                        className="w-full max-w-[280px] h-auto object-contain rounded-lg shadow-xl"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tags */}
          <div>
            <span className="text-xs font-tech text-neutral-500 uppercase tracking-wider block mb-2">
              Technologies & Methodologies
            </span>
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span key={tag} className="px-3 py-1 rounded-lg bg-white/5 border border-white/10 text-xs font-tech text-neutral-300">
                  {tag}
                </span>
              ))}
            </div>
          </div>

        </div>

        {/* Modal Footer */}
        <div className="p-4 sm:p-6 border-t border-white/10 bg-[#14161f]/90 flex items-center justify-between gap-4 flex-wrap">
          <span className="text-xs font-tech text-neutral-400 hidden sm:inline">
            Designed by Prerna Sablok
          </span>
          <div className="flex items-center gap-3 ml-auto">
            {project.liveLink && (
              <a
                href={project.liveLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-emerald-500 hover:bg-emerald-400 text-black font-tech font-bold text-xs shadow-lg shadow-emerald-500/20 transition-all cursor-pointer"
              >
                <span>{project.liveLinkText || 'Live Product'}</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
            {project.figmaLink && (
              <a
                href={project.figmaLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 text-white border border-white/20 font-tech font-bold text-xs transition-all cursor-pointer"
              >
                <span>{project.figmaLinkText || 'Open in Figma'}</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
            <button
              onClick={onClose}
              className="px-6 py-2 rounded-full bg-[#ff5722] hover:bg-[#ff6f43] text-white text-xs font-tech font-bold transition-all shadow-lg shadow-orange-600/30 cursor-pointer"
            >
              Close Case Study
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
