import React, { useState } from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import ProcessSection from './components/ProcessSection';
import TimelineSection from './components/TimelineSection';
import ProjectsSection from './components/ProjectsSection';
import SkillsSection from './components/SkillsSection';
import EducationCertificationsSection from './components/EducationCertificationsSection';
import ContactFooter from './components/ContactFooter';
import ProjectModal from './components/ProjectModal';
import ResumeModal from './components/ResumeModal';
import ContactModal from './components/ContactModal';

export default function App() {
  const [selectedProject, setSelectedProject] = useState(null);
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#0b0c0e] text-[#ecebe8] selection:bg-[#ff5722] selection:text-white">
      
      {/* Sticky Top Navbar that activates from Slide 3 onwards */}
      <Navbar />

      {/* Main Content Sections */}
      <main>
        {/* 1. Hero Section: Editorial Book Spread */}
        <HeroSection 
          onOpenResume={() => setIsResumeOpen(true)}
          onOpenContact={() => setIsContactOpen(true)}
        />

        {/* 2. Process Section: HOW I WORK (01 / 08) with Pill Window & Slider */}
        <ProcessSection />

        {/* 3. Timeline Section: The Design Timeline: Where I've Left My Mark */}
        <TimelineSection />

        {/* 4. Projects Section: Featured Case Studies */}
        <ProjectsSection 
          onSelectProject={(project) => setSelectedProject(project)}
        />

        {/* 5. Skills & Interactive Design System Playground */}
        <SkillsSection />

        {/* 6. Education & Certifications */}
        <EducationCertificationsSection />
      </main>

      {/* Footer */}
      <ContactFooter 
        onOpenResume={() => setIsResumeOpen(true)}
        onOpenContact={() => setIsContactOpen(true)}
      />

      {/* Modals */}
      <ProjectModal 
        project={selectedProject} 
        onClose={() => setSelectedProject(null)} 
      />

      <ResumeModal 
        isOpen={isResumeOpen} 
        onClose={() => setIsResumeOpen(false)} 
      />

      <ContactModal 
        isOpen={isContactOpen} 
        onClose={() => setIsContactOpen(false)} 
      />

    </div>
  );
}
