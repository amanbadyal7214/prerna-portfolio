import React, { useState } from 'react';
import { skillsData } from '../data/portfolioData';
import { 
  Sparkles, 
  Layers, 
  CheckCircle, 
  Copy, 
  Check 
} from 'lucide-react';

export default function SkillsSection() {
  const [activeTab, setActiveTab] = useState('design'); // 'design', 'tools', 'playground'
  
  // Interactive Design System Playground State
  const [buttonVariant, setButtonVariant] = useState('primary');
  const [buttonRadius, setButtonRadius] = useState('full');
  const [buttonSize, setButtonSize] = useState('md');
  const [copiedToken, setCopiedToken] = useState(null);

  const copyToClipboard = (tokenText) => {
    navigator.clipboard.writeText(tokenText);
    setCopiedToken(tokenText);
    setTimeout(() => setCopiedToken(null), 2000);
  };

  return (
    <section id="skills" className="py-16 sm:py-24 md:py-32 bg-white text-neutral-900 relative border-t border-neutral-200">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-[#ff5722]/5 blur-[140px] rounded-full pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 sm:mb-16">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-neutral-100 border border-neutral-200 text-xs font-tech text-[#ff5722] tracking-wider uppercase mb-3 font-semibold">
              <Layers className="w-3.5 h-3.5 text-[#ff5722]" />
              <span>Design Arsenal & System Tokens</span>
            </div>
            <h2 className="font-display font-black text-3xl sm:text-5xl md:text-6xl tracking-tighter uppercase text-neutral-900 leading-none">
              Skills & Systems.
            </h2>
            <p className="mt-2 text-xs sm:text-base text-neutral-600 font-normal max-w-xl">
              Equipped with deep expertise in human research, Figma component architecture, and design system governance.
            </p>
          </div>

          {/* Tab Switcher */}
          <div className="grid grid-cols-3 gap-1 bg-neutral-100 p-1.5 rounded-2xl border border-neutral-200 w-full md:w-auto">
            {[
              { id: 'design', full: 'Design Disciplines', short: 'Disciplines' },
              { id: 'tools', full: 'Tools & AI Stack', short: 'Tools' },
              { id: 'playground', full: 'Interactive UI Kit', short: 'UI Kit' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-2.5 sm:px-4 py-2 rounded-xl text-xs font-tech text-center transition-all cursor-pointer font-medium active:scale-95 ${
                  activeTab === tab.id
                    ? 'bg-[#ff5722] text-white shadow-md font-semibold'
                    : 'text-neutral-600 hover:text-black hover:bg-neutral-200/60'
                }`}
              >
                <span className="hidden sm:inline">{tab.full}</span>
                <span className="sm:hidden">{tab.short}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Tab 1: Design Disciplines Grid */}
        {activeTab === 'design' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 animate-in fade-in duration-300">
            {skillsData.design.map((skill, index) => (
              <div
                key={skill.name}
                className="p-5 sm:p-6 rounded-2xl bg-[#F9FAFB] border border-neutral-200 hover:border-[#ff5722]/50 hover:bg-white hover:shadow-xl transition-all group hover:-translate-y-1"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-tech text-[#ff5722] font-bold">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full bg-white text-[10px] font-tech text-neutral-600 border border-neutral-200 shadow-xs font-semibold">
                    {skill.level}
                  </span>
                </div>

                <h3 className="font-display font-bold text-lg text-neutral-900 group-hover:text-[#ff5722] transition-colors mb-1.5">
                  {skill.name}
                </h3>

                <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed font-sans">
                  {skill.desc}
                </p>
              </div>
            ))}
          </div>
        )}

        {/* Tab 2: Tools & AI Stack */}
        {activeTab === 'tools' && (
          <div className="space-y-8 animate-in fade-in duration-300">
            <div>
              <h3 className="font-tech text-xs uppercase tracking-widest text-neutral-500 mb-4 font-bold">
                Industry Standard Tools & Software
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
                {skillsData.tools.map((tool) => (
                  <div
                    key={tool.name}
                    className={`p-4 rounded-2xl border transition-all flex flex-col justify-between space-y-3 ${
                      tool.highlight
                        ? 'bg-orange-50/70 border-orange-200 shadow-sm hover:shadow-md hover:border-[#ff5722]/40'
                        : 'bg-[#F9FAFB] border-neutral-200 hover:border-neutral-300 hover:shadow-sm hover:bg-white'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#ff5722]"></span>
                      {tool.highlight && (
                        <span className="text-[10px] font-tech text-[#ff5722] font-bold bg-orange-100 px-2 py-0.5 rounded-full">
                          CORE
                        </span>
                      )}
                    </div>

                    <div>
                      <div className="font-display font-bold text-base text-neutral-900">{tool.name}</div>
                      <div className="text-[11px] font-tech text-neutral-500 truncate mt-0.5">{tool.category}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Tech Implementation Skills */}
            <div className="pt-6 border-t border-neutral-200">
              <h3 className="font-tech text-xs uppercase tracking-widest text-neutral-500 mb-4 font-bold">
                Frontend Engineering Fundamentals
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {skillsData.tech.map((t) => (
                  <div key={t.name} className="p-4 rounded-2xl bg-[#F9FAFB] border border-neutral-200 flex items-center justify-between hover:shadow-sm hover:bg-white transition-all">
                    <div>
                      <div className="font-display font-bold text-sm text-neutral-900">{t.name}</div>
                      <div className="text-xs text-neutral-600 mt-0.5">{t.desc}</div>
                    </div>
                    <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 ml-3" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Interactive UI Kit & Figma Playground */}
        {activeTab === 'playground' && (
          <div className="rounded-2xl sm:rounded-3xl bg-[#F9FAFB] border border-neutral-200 p-4 sm:p-10 shadow-xl animate-in fade-in duration-300">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-center">
              
              {/* Controls Column */}
              <div className="lg:col-span-5 space-y-5 sm:space-y-6">
                <div>
                  <span className="font-tech text-xs text-[#ff5722] uppercase tracking-widest block mb-1 font-bold">
                    Live Figma Component Sandbox
                  </span>
                  <h3 className="font-display font-black text-xl sm:text-2xl text-neutral-900">
                    Auto-Layout & Variants Engine
                  </h3>
                  <p className="text-xs sm:text-sm text-neutral-600 mt-1">
                    Interact with Prerna's live design system tokens and component states.
                  </p>
                </div>

                {/* Variant Switcher */}
                <div className="space-y-2">
                  <label className="text-xs font-tech text-neutral-700 block font-semibold">Variant Type:</label>
                  <div className="grid grid-cols-3 gap-2">
                    {['primary', 'secondary', 'outline'].map((v) => (
                      <button
                        key={v}
                        onClick={() => setButtonVariant(v)}
                        className={`py-2 text-xs font-tech rounded-lg capitalize border transition-all cursor-pointer font-semibold ${
                          buttonVariant === v
                            ? 'bg-[#ff5722] text-white border-transparent shadow-sm'
                            : 'bg-white border-neutral-200 text-neutral-700 hover:border-neutral-300 hover:bg-neutral-50'
                        }`}
                      >
                        {v}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Radius Token */}
                <div className="space-y-2">
                  <label className="text-xs font-tech text-neutral-700 block font-semibold">Border Radius Token:</label>
                  <div className="grid grid-cols-4 gap-2 text-xs font-tech">
                    {[
                      { label: '4px', value: 'sm' },
                      { label: '8px', value: 'md' },
                      { label: '16px', value: 'xl' },
                      { label: 'Pill', value: 'full' }
                    ].map((r) => (
                      <button
                        key={r.value}
                        onClick={() => setButtonRadius(r.value)}
                        className={`py-1.5 rounded-lg border transition-all cursor-pointer font-semibold ${
                          buttonRadius === r.value
                            ? 'bg-neutral-900 text-white border-transparent shadow-sm'
                            : 'bg-white border-neutral-200 text-neutral-700 hover:border-neutral-300 hover:bg-neutral-50'
                        }`}
                      >
                        {r.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Size Token */}
                <div className="space-y-2">
                  <label className="text-xs font-tech text-neutral-700 block font-semibold">Padding / Scale:</label>
                  <div className="grid grid-cols-3 gap-2 text-xs font-tech">
                    {['sm', 'md', 'lg'].map((s) => (
                      <button
                        key={s}
                        onClick={() => setButtonSize(s)}
                        className={`py-1.5 rounded-lg border transition-all uppercase cursor-pointer font-semibold ${
                          buttonSize === s
                            ? 'bg-[#ff5722] text-white border-transparent shadow-sm'
                            : 'bg-white border-neutral-200 text-neutral-700 hover:border-neutral-300 hover:bg-neutral-50'
                        }`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Live Preview Display */}
              <div className="lg:col-span-7 rounded-2xl bg-[#0e1015] border border-neutral-800 p-5 sm:p-8 flex flex-col items-center justify-center min-h-[220px] sm:min-h-[300px] relative overflow-hidden shadow-2xl">
                
                <div className="absolute top-4 left-4 font-tech text-[10px] text-neutral-400 uppercase tracking-wider">
                  Live Canvas Render
                </div>

                {/* Rendered Component */}
                <div className="py-12 flex flex-col items-center gap-4">
                  <button
                    className={`font-medium transition-all shadow-xl cursor-pointer flex items-center gap-2 ${
                      buttonVariant === 'primary'
                        ? 'bg-[#ff5722] hover:bg-[#ff6f43] text-white shadow-orange-600/30'
                        : buttonVariant === 'secondary'
                          ? 'bg-white text-neutral-900 hover:bg-neutral-200'
                          : 'bg-transparent border border-white/40 hover:border-white text-white'
                    } ${
                      buttonRadius === 'sm'
                        ? 'rounded-sm'
                        : buttonRadius === 'md'
                          ? 'rounded-lg'
                          : buttonRadius === 'xl'
                            ? 'rounded-2xl'
                            : 'rounded-full'
                    } ${
                      buttonSize === 'sm'
                        ? 'px-3.5 py-1.5 text-xs'
                        : buttonSize === 'md'
                          ? 'px-5 py-2.5 text-sm'
                          : 'px-7 py-3.5 text-base'
                    }`}
                  >
                    <Sparkles className="w-4 h-4" />
                    <span>Explore HousingMania</span>
                  </button>

                  <span className="font-tech text-xs text-neutral-400">
                    Hover to test kinetic micro-interaction
                  </span>
                </div>

                {/* Inspectable CSS Token Output */}
                <div className="w-full pt-4 border-t border-white/10 flex items-center justify-between text-xs font-tech text-neutral-400">
                  <span>CSS Token Output</span>
                  <button
                    onClick={() => copyToClipboard(`border-radius: ${buttonRadius === 'full' ? '9999px' : buttonRadius === 'xl' ? '16px' : buttonRadius === 'md' ? '8px' : '4px'}; background: ${buttonVariant === 'primary' ? '#FF5722' : buttonVariant === 'secondary' ? '#FFFFFF' : 'transparent'};`)}
                    className="flex items-center gap-1 text-[#ff8a65] hover:text-white cursor-pointer"
                  >
                    {copiedToken ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="text-emerald-400">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy Specs</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

            </div>
          </div>
        )}

      </div>
    </section>
  );
}
