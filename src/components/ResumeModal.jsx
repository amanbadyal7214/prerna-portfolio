import React, { useState } from 'react';
import { personalInfo, timelineData, projectsData, skillsData, educationData, certificationsData } from '../data/portfolioData';
import { X, Printer, Download, Copy, Check, Mail, Phone, Globe, ExternalLink } from 'lucide-react';

export default function ResumeModal({ isOpen, onClose }) {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(personalInfo.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-6 bg-black/85 backdrop-blur-xl animate-in fade-in duration-200">
      
      {/* Backdrop click */}
      <div className="absolute inset-0" onClick={onClose}></div>

      <div className="relative w-full max-w-4xl max-h-[92dvh] sm:max-h-[92vh] bg-[#fbfaf7] text-neutral-900 rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden flex flex-col z-10 border border-black/10">
        
        {/* Actions Bar */}
        <div className="p-3 sm:p-5 bg-[#ede8df] border-b border-black/10 flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 min-w-0">
            <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#ff5722] shrink-0"></span>
            <span className="font-tech text-xs uppercase tracking-wider text-neutral-800 font-bold truncate">
              <span className="hidden sm:inline">Official Resume — </span>Prerna Sablok
            </span>
          </div>

          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            <button
              onClick={handleCopyEmail}
              className="flex items-center gap-1 px-2.5 sm:px-3 py-1.5 rounded-lg bg-white/80 hover:bg-white text-xs font-tech border border-black/10 transition-colors cursor-pointer active:scale-95"
              title="Copy email address"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              <span className="hidden sm:inline">{copied ? 'Copied Email!' : 'Copy Email'}</span>
            </button>

            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-2.5 sm:px-3.5 py-1.5 rounded-lg bg-[#111215] hover:bg-[#20232a] text-white text-xs font-tech transition-colors cursor-pointer shadow-sm active:scale-95"
              title="Print or Save PDF"
            >
              <Printer className="w-3.5 h-3.5 text-[#ff5722]" />
              <span className="hidden sm:inline">Print / PDF</span>
            </button>

            <button
              onClick={onClose}
              className="p-1.5 rounded-full hover:bg-black/10 text-neutral-600 hover:text-black transition-colors cursor-pointer ml-1"
              aria-label="Close resume"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Printable Resume Sheet */}
        <div id="printable-resume" className="flex-1 overflow-y-auto p-4 sm:p-10 md:p-12 space-y-5 sm:space-y-6 font-sans text-neutral-900 bg-[#fbfaf7]">
          
          {/* Header */}
          <div className="text-center space-y-2 border-b border-neutral-300 pb-5">
            <h1 className="font-display font-black text-3xl sm:text-4xl uppercase tracking-tight text-black">
              {personalInfo.name}
            </h1>
            
            <div className="flex flex-wrap justify-center items-center gap-x-4 gap-y-1 text-xs font-tech text-neutral-700">
              <span className="flex items-center gap-1"><Phone className="w-3 h-3 text-[#ff5722]" /> {personalInfo.phone}</span>
              <span>•</span>
              <span className="flex items-center gap-1"><Mail className="w-3 h-3 text-[#ff5722]" /> {personalInfo.email}</span>
              <span>•</span>
              <a href={personalInfo.linkedin} target="_blank" rel="noreferrer" className="text-neutral-900 hover:text-[#ff5722] underline">
                linkedin.com/in/prerna-sablok30
              </a>
              <span>•</span>
              <a href={personalInfo.behance} target="_blank" rel="noreferrer" className="text-neutral-900 hover:text-[#ff5722] underline">
                behance.net/Prerna_Sablok30
              </a>
            </div>
          </div>

          {/* Professional Summary */}
          <div className="space-y-1.5">
            <h2 className="font-tech text-xs uppercase tracking-widest font-black text-black border-b border-neutral-300 pb-1">
              Professional Summary
            </h2>
            <p className="text-xs sm:text-sm text-neutral-800 leading-relaxed">
              {personalInfo.summary}
            </p>
          </div>

          {/* Education */}
          <div className="space-y-2.5">
            <h2 className="font-tech text-xs uppercase tracking-widest font-black text-black border-b border-neutral-300 pb-1">
              Education
            </h2>
            <div className="space-y-2 text-xs sm:text-sm">
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between">
                <div>
                  <strong className="text-black">PCTE Institute of Engineering and Technology</strong> — Ludhiana, Punjab
                  <div className="text-neutral-700">B.Tech – Computer Science Engineering (CGPA: 8.40)</div>
                </div>
                <span className="font-tech text-xs text-neutral-600">2022 – 2026</span>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between">
                <div>
                  <strong className="text-black">Shri Harkrishan Sahib Senior Secondary School</strong> — Ludhiana, Punjab
                  <div className="text-neutral-700">12th Grade (Non-Medical) – 93.2%</div>
                </div>
                <span className="font-tech text-xs text-neutral-600">2020 – 2022</span>
              </div>
            </div>
          </div>

          {/* Experience */}
          <div className="space-y-3">
            <h2 className="font-tech text-xs uppercase tracking-widest font-black text-black border-b border-neutral-300 pb-1">
              Experience
            </h2>
            
            <div className="space-y-3 text-xs sm:text-sm">
              <div>
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between">
                  <div className="font-bold text-black">Junior UI/UX Designer <span className="font-normal text-neutral-600">| Pisoft Informatics Pvt. Ltd. (Mohali, India)</span></div>
                  <span className="font-tech text-xs text-neutral-600">Jun 2026 – Present</span>
                </div>
                <p className="text-xs text-neutral-700 mt-1">Driving end-to-end product design across mobile and web platforms. Architecting design systems and developer handoff.</p>
              </div>

              <div>
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between">
                  <div className="font-bold text-black">UI/UX Designer Intern <span className="font-normal text-neutral-600">| Pisoft Informatics Pvt. Ltd. (Mohali, India)</span></div>
                  <span className="font-tech text-xs text-neutral-600">Jan 2026 – Jun 2026</span>
                </div>
                <p className="text-xs text-neutral-700 mt-1">Designed high-fidelity mobile and web application interfaces, built interactive prototypes in Figma.</p>
              </div>

              <div>
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between">
                  <div className="font-bold text-black">UI/UX Designer Intern <span className="font-normal text-neutral-600">| Infyntrek Systemes (Remote)</span></div>
                  <span className="font-tech text-xs text-neutral-600">Sep 2025 – Dec 2025</span>
                </div>
                <p className="text-xs text-neutral-700 mt-1">Spearheaded user research sprints, designed SaaS layouts, structured UI component libraries.</p>
              </div>
            </div>
          </div>

          {/* Projects */}
          <div className="space-y-3">
            <h2 className="font-tech text-xs uppercase tracking-widest font-black text-black border-b border-neutral-300 pb-1">
              Projects
            </h2>

            <div className="space-y-2.5 text-xs">
              {projectsData.map((proj) => (
                <div key={proj.id} className="space-y-0.5">
                  <div className="flex items-baseline justify-between">
                    <strong className="text-black text-sm">{proj.title}</strong>
                    <span className="font-tech text-[11px] text-[#ff5722] font-semibold">{proj.liveBadge}</span>
                  </div>
                  <div className="text-neutral-600 italic font-tech text-[11px]">{proj.tags.join(' • ')}</div>
                  <p className="text-neutral-800 leading-relaxed">{proj.shortDesc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Skills */}
          <div className="space-y-2">
            <h2 className="font-tech text-xs uppercase tracking-widest font-black text-black border-b border-neutral-300 pb-1">
              Skills
            </h2>
            <div className="text-xs space-y-1 text-neutral-800">
              <div>
                <strong className="text-black">Design:</strong> User Research, Information Architecture, User Flows, Wireframing, Prototyping, Interaction Design, UI Design, Usability Testing, Responsive Design, Design Systems, Visual Hierarchy, Auto Layout, Components & Variants
              </div>
              <div>
                <strong className="text-black">Tools:</strong> Figma, FigJam, Miro, Figma Make, Google Flow, Figma Weave, Jitter, Stitch, ChatGPT, Gemini, Canva
              </div>
              <div>
                <strong className="text-black">Tech:</strong> HTML, CSS
              </div>
            </div>
          </div>

          {/* Certifications */}
          <div className="space-y-2">
            <h2 className="font-tech text-xs uppercase tracking-widest font-black text-black border-b border-neutral-300 pb-1">
              Certifications
            </h2>
            <div className="text-xs space-y-1 text-neutral-800">
              <div>• Canva Design School – Essentials of Graphic Design (2026)</div>
              <div>• Be10x – AI Tool Works (2025)</div>
              <div>• TCS iON Career Edge – Young Professionals (2025)</div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
