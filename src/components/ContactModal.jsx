import React, { useState } from 'react';
import { personalInfo } from '../data/portfolioData';
import { X, Send, Mail, Phone, Check, Copy, Sparkles } from 'lucide-react';

export default function ContactModal({ isOpen, onClose }) {
  const [formData, setFormData] = useState({ name: '', email: '', message: '', projectType: 'Product Design' });
  const [submitted, setSubmitted] = useState(false);
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 2500);
  };

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-xl animate-in fade-in duration-200">
      <div className="absolute inset-0" onClick={onClose}></div>

      <div className="relative w-full max-w-lg bg-[#12141a] border border-white/15 rounded-3xl shadow-2xl p-6 sm:p-8 z-10 animate-in zoom-in-95 duration-200 text-white">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-[#ff5722]"></span>
            <h3 className="font-display font-black text-xl text-white">Get in Touch</h3>
          </div>
          <button onClick={onClose} className="p-1 rounded-full text-neutral-400 hover:text-white cursor-pointer">
            <X className="w-5 h-5" />
          </button>
        </div>

        {submitted ? (
          <div className="py-12 text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
              <Check className="w-6 h-6" />
            </div>
            <h4 className="font-display font-bold text-xl text-white">Message Sent Successfully!</h4>
            <p className="text-xs text-neutral-400">Thanks for reaching out. Prerna will get back to you shortly.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* Quick Contact Links */}
            <div className="p-3.5 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-between text-xs font-tech">
              <div className="flex items-center gap-2 text-neutral-300">
                <Mail className="w-4 h-4 text-[#ff5722]" />
                <span>{personalInfo.email}</span>
              </div>
              <button
                type="button"
                onClick={() => handleCopy(personalInfo.email)}
                className="px-2.5 py-1 rounded-md bg-white/10 hover:bg-white/20 text-[11px] text-white flex items-center gap-1 cursor-pointer"
              >
                {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                <span>{copied ? 'Copied' : 'Copy'}</span>
              </button>
            </div>

            <div>
              <label className="block text-xs font-tech text-neutral-400 mb-1">Your Name</label>
              <input
                required
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g. Sarah Connor"
                className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-neutral-500 text-sm focus:outline-none focus:border-[#ff5722]"
              />
            </div>

            <div>
              <label className="block text-xs font-tech text-neutral-400 mb-1">Your Email</label>
              <input
                required
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="sarah@company.com"
                className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-neutral-500 text-sm focus:outline-none focus:border-[#ff5722]"
              />
            </div>

            <div>
              <label className="block text-xs font-tech text-neutral-400 mb-1">Inquiry Type</label>
              <select
                value={formData.projectType}
                onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-[#161820] border border-white/10 text-white text-sm focus:outline-none focus:border-[#ff5722]"
              >
                <option value="Full-Time Role">Full-Time UI/UX Designer Role</option>
                <option value="Product Design Project">Mobile / Web App Design Project</option>
                <option value="Design System Consultancy">Design System Architecture</option>
                <option value="General Conversation">Casual Design Chat / Mentorship</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-tech text-neutral-400 mb-1">Your Message</label>
              <textarea
                required
                rows={3}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="Tell me about your product vision or role..."
                className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-neutral-500 text-sm focus:outline-none focus:border-[#ff5722] resize-none"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-[#ff5722] hover:bg-[#ff6f43] text-white font-tech font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-orange-600/30 transition-all cursor-pointer"
            >
              <Send className="w-4 h-4" />
              <span>Send Message</span>
            </button>
          </form>
        )}

      </div>
    </div>
  );
}
