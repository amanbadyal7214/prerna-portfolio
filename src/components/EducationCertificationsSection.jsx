import React from 'react';
import { educationData, certificationsData } from '../data/portfolioData';
import { GraduationCap, Award, CheckCircle2, MapPin, Calendar, Sparkles } from 'lucide-react';

export default function EducationCertificationsSection() {
  return (
    <section id="education" className="py-16 sm:py-24 md:py-32 bg-[#0b0c0e] text-white relative border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12">
          
          {/* Left Column: Education */}
          <div className="lg:col-span-6 space-y-6 sm:space-y-8">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-tech text-[#ff8a65] tracking-wider uppercase mb-3">
                <GraduationCap className="w-3.5 h-3.5 text-[#ff5722]" />
                <span>Academic Foundations</span>
              </div>
              <h2 className="font-display font-black text-2xl xs:text-3xl sm:text-4xl uppercase text-white tracking-tight">
                Education.
              </h2>
            </div>

            <div className="space-y-4 sm:space-y-6">
              {educationData.map((edu, idx) => (
                <div 
                  key={idx}
                  className="p-4 xs:p-5 sm:p-7 rounded-2xl bg-[#12141a] border border-white/10 hover:border-white/20 transition-all space-y-3"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="font-tech text-xs text-[#ff8a65] font-semibold">
                      {edu.period}
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-tech text-xs font-bold">
                      {edu.score}
                    </span>
                  </div>

                  <h3 className="font-display font-bold text-xl text-white">
                    {edu.degree}
                  </h3>

                  <div className="font-sans text-sm font-medium text-neutral-300">
                    {edu.institution}
                  </div>

                  <div className="flex items-center gap-1.5 text-xs font-tech text-neutral-400">
                    <MapPin className="w-3.5 h-3.5 text-neutral-500" />
                    <span>{edu.location}</span>
                  </div>

                  <p className="text-xs text-neutral-400 pt-2 border-t border-white/5 font-sans leading-relaxed">
                    {edu.details}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Certifications */}
          <div className="lg:col-span-6 space-y-6 sm:space-y-8">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-tech text-[#ff8a65] tracking-wider uppercase mb-3">
                <Award className="w-3.5 h-3.5 text-[#ff5722]" />
                <span>Verified Credentials</span>
              </div>
              <h2 className="font-display font-black text-2xl xs:text-3xl sm:text-4xl uppercase text-white tracking-tight">
                Certifications.
              </h2>
            </div>

            <div className="space-y-3.5 sm:space-y-4">
              {certificationsData.map((cert, idx) => (
                <div 
                  key={idx}
                  className="p-4 xs:p-5 rounded-2xl bg-[#12141a] border border-white/10 hover:border-[#ff5722]/40 transition-all flex items-start justify-between gap-3.5 sm:gap-4 group"
                >
                  <div className="space-y-1.5 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded bg-white/5 text-[10px] font-tech text-[#ff8a65] uppercase font-bold border border-white/5">
                        {cert.badge}
                      </span>
                      <span className="font-tech text-xs text-neutral-400">{cert.year}</span>
                    </div>

                    <h3 className="font-display font-bold text-base text-white group-hover:text-[#ff8a65] transition-colors">
                      {cert.title}
                    </h3>

                    <div className="text-xs font-tech text-neutral-400">
                      Issued by {cert.issuer}
                    </div>

                    <p className="text-xs text-neutral-400 font-sans leading-relaxed pt-1">
                      {cert.desc}
                    </p>
                  </div>

                  <div className="p-2 rounded-xl bg-white/5 text-neutral-400 group-hover:text-emerald-400 group-hover:bg-emerald-500/10 transition-colors shrink-0">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
