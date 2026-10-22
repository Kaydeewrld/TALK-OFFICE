import React, { useState } from 'react';
import { programsData } from '../data/programsData';
import {
  Calendar,
  CheckCircle2,
  Sparkles,
  Layers,
  ArrowRight,
  Eye,
  Globe
} from 'lucide-react';

export default function ProgrammesOverview({ onOpenRegister, onSelectGalleryFolder }) {
  const [selectedId, setSelectedId] = useState('hips');

  const selectedProgram = programsData.find((p) => p.id === selectedId) || programsData[0];

  return (
    <section id="programmes" className="py-28 relative bg-gradient-to-b from-transparent via-[#DCF2F1]/80 to-transparent">
      {/* Ambient Teal Gradient Orbs */}
      <div className="absolute top-1/4 left-5 w-[600px] h-[500px] bg-gradient-to-tr from-[#0C7C7B]/22 via-[#2DD4BF]/16 to-transparent blur-[140px] pointer-events-none -z-10" />
      <div className="absolute bottom-10 right-5 w-[650px] h-[500px] bg-gradient-to-bl from-[#0C7C7B]/25 via-[#14B8A6]/16 to-transparent blur-[140px] pointer-events-none -z-10" />

      <div className="container-custom">
        {/* Section Header */}
        <div className="max-w-3xl mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/90 backdrop-blur-md border border-[#0C7C7B]/25 text-[#0C7C7B] text-xs font-semibold uppercase tracking-[0.14em] mb-4 shadow-xs">
            <Layers className="w-3.5 h-3.5" />
            <span>Flagship Programme Portfolio</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-semibold text-[#141A19] mb-4 tracking-tight">
            Four Flagship Programmes.{' '}
            <span className="italic font-serif text-[#0C7C7B] font-normal block sm:inline">
              One Unwavering Commitment
            </span>{' '}
            to Human Growth.
          </h2>
          <p className="text-base sm:text-lg text-[#52605E] leading-relaxed">
            Since our inception in 2023, The Talk Office has engineered tailored learning environments, executive salons, and annual galas to equip African professionals and institutions with strategic agility.
          </p>
        </div>

        {/* Tactile Programme Switcher Pills */}
        <div className="flex flex-wrap items-center gap-3 mb-10">
          {programsData.map((prog) => {
            const active = prog.id === selectedId;
            return (
              <button
                key={prog.id}
                onClick={() => setSelectedId(prog.id)}
                className={`px-5 py-3 rounded-full text-xs sm:text-sm font-semibold transition-all cursor-pointer flex items-center gap-2 ${
                  active
                    ? 'bg-gradient-to-r from-[#0C7C7B] to-[#085E5D] text-white shadow-lg shadow-[#0C7C7B]/25 scale-102'
                    : 'bg-white/90 hover:bg-white text-[#384846] hover:text-[#0C7C7B] border border-[#0C7C7B]/25 backdrop-blur-md'
                }`}
              >
                <span>{prog.name}</span>
                <span
                  className={`text-[10px] px-2 py-0.5 rounded-full font-mono uppercase tracking-wider ${
                    active ? 'bg-white/20 text-white' : 'bg-[#EAF6F6] text-[#0C7C7B]'
                  }`}
                >
                  {prog.acronym}
                </span>
              </button>
            );
          })}
        </div>

        {/* Editorial Showcase Card */}
        <div className="soft-card relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left: Soulful Narrative & Key Highlights */}
            <div className="lg:col-span-7 flex flex-col items-start">
              <div className="flex flex-wrap items-center gap-2.5 mb-4">
                <span className="badge-pill !bg-[#EAF6F6] !text-[#0C7C7B] !border-[#0C7C7B]/20">
                  {selectedProgram.badge}
                </span>
                <span className="text-xs px-3 py-1 rounded-full bg-white border border-[#0C7C7B]/15 text-[#52605E] font-medium font-mono">
                  Inception: {selectedProgram.inception}
                </span>
                <span className="text-xs px-3 py-1 rounded-full bg-white border border-[#0C7C7B]/15 text-[#52605E] font-medium font-mono">
                  {selectedProgram.editionsCount}
                </span>
              </div>

              <h3 className="font-display text-3xl sm:text-4xl font-semibold text-[#141A19] mb-3 leading-snug">
                {selectedProgram.name}
              </h3>

              <p className="text-sm sm:text-base font-serif italic text-[#0C7C7B] mb-5">
                "{selectedProgram.tagline}"
              </p>

              <p className="text-sm sm:text-base text-[#4E5C5A] leading-relaxed mb-6 font-sans">
                {selectedProgram.description}
              </p>

              {/* Highlights Pill Box */}
              <div className="w-full bg-white/70 rounded-2xl p-6 border border-[#0C7C7B]/10 mb-8 backdrop-blur-sm">
                <h4 className="font-display text-sm font-semibold text-[#141A19] mb-4 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#D99B26]" />
                  What Makes the Experience Transformative
                </h4>
                <ul className="space-y-2.5">
                  {selectedProgram.highlights.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#4E5C5A]">
                      <CheckCircle2 className="w-4 h-4 text-[#0C7C7B] shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-4">
                <button
                  onClick={() => onOpenRegister(selectedProgram.id)}
                  className="btn-accent !py-3.5 !px-7 text-xs uppercase tracking-wider font-semibold shadow-sm"
                >
                  <Calendar className="w-4 h-4 text-[#D99B26]" />
                  Register / Inquire for {selectedProgram.acronym}
                </button>
                <a
                  href="#gallery"
                  onClick={() => onSelectGalleryFolder(selectedProgram.galleryFolder)}
                  className="btn-secondary !py-3.5 !px-6 text-xs uppercase tracking-wider font-semibold flex items-center gap-2 bg-white/80 hover:bg-white"
                >
                  <Eye className="w-4 h-4 text-[#0C7C7B]" />
                  View Archival Photos
                </a>
              </div>
            </div>

            {/* Right: Live Archival Photo & Tactile Fact Grid */}
            <div className="lg:col-span-5 flex flex-col gap-6">
              {/* Photo Showcase Container */}
              <div className="rounded-3xl overflow-hidden border border-white/80 shadow-lg aspect-[4/3] relative group bg-[#E5EEEC]">
                <img
                  src={selectedProgram.coverImage}
                  alt={selectedProgram.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>

              {/* Fact Cards */}
              <div className="grid grid-cols-2 gap-3.5">
                {selectedProgram.keyFacts.map((fact, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-2xl bg-white/80 border border-[#0C7C7B]/10 shadow-xs flex flex-col"
                  >
                    <span className="text-[10px] uppercase tracking-wider font-semibold text-[#7E8D8A] mb-1">
                      {fact.label}
                    </span>
                    <span className="font-display text-sm sm:text-base font-semibold text-[#141A19]">
                      {fact.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Global Expansion Callout Banner (Warm Forest Card) */}
        <div className="mt-14 rounded-3xl bg-gradient-to-br from-[#102220] via-[#142A27] to-[#0A1816] text-[#FAF8F5] p-8 sm:p-12 relative overflow-hidden border border-white/10 shadow-xl">
          <div className="absolute -right-10 -bottom-10 w-96 h-96 bg-[#0C7C7B]/20 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15 text-[#2DD4BF] text-xs font-semibold uppercase tracking-[0.14em] mb-4">
              <Globe className="w-3.5 h-3.5" />
              <span>Pan-African Expansion · March 2027</span>
            </div>
            <h3 className="font-display text-3xl sm:text-4xl font-semibold text-white mb-4">
              The Talk Office Global: Kigali & Kenya
            </h3>
            <p className="text-base text-[#C7D4D2] leading-relaxed mb-6 font-sans">
              The next phase of our mission extends beyond Nigeria. International engagements initially planned for late 2026 have been strategically calibrated for <strong className="text-white">March 2027</strong> in Kigali, Rwanda, and Kenya. HIPS Kigali will combine our signature leadership development with immersive innovation study tours.
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <button
                onClick={() => onOpenRegister('hips-kigali-2027')}
                className="btn-accent !py-3.5 !px-7 text-xs uppercase tracking-wider font-semibold shadow-md"
              >
                Pre-Register for Kigali 2027
              </button>
              <a
                href="#contact"
                className="text-xs uppercase tracking-wider font-semibold text-[#2DD4BF] hover:text-white transition-colors underline underline-offset-4 flex items-center gap-1.5"
              >
                Inquire on Corporate Delegations & Sponsorship →
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
