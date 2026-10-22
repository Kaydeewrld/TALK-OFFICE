import React, { useState, useMemo } from 'react';
import mediaManifest from '../data/mediaManifest.json';
import { Camera, Maximize2 } from 'lucide-react';

export default function GalleryArchive({ onOpenLightbox, activeProgramFilter, setActiveProgramFilter }) {
  const [selectedSubcategory, setSelectedSubcategory] = useState('all');

  // Flatten media items into structured photo objects
  const allPhotos = useMemo(() => {
    const list = [];

    // HIPS
    if (mediaManifest.hips) {
      Object.entries(mediaManifest.hips).forEach(([year, images]) => {
        images.forEach((img, idx) => {
          list.push({
            id: `hips-${year}-${idx}`,
            programId: 'hips',
            programName: 'HIPS',
            edition: `HIPS ${year}`,
            year,
            src: img,
            caption: `High Impact Professionals Seminar — ${year} Cohort Session`
          });
        });
      });
    }

    // Career Dinner
    if (mediaManifest.careerDinner) {
      Object.entries(mediaManifest.careerDinner).forEach(([year, images]) => {
        images.forEach((img, idx) => {
          list.push({
            id: `dinner-${year}-${idx}`,
            programId: 'career-dinner',
            programName: 'Career Dinner',
            edition: `Career Dinner ${year}`,
            year,
            src: img,
            caption: `The Talk Office Career Dinner Gala — ${year} Annual Edition`
          });
        });
      });
    }

    // Talk Table
    if (mediaManifest.talkTable) {
      Object.entries(mediaManifest.talkTable).forEach(([cohort, images]) => {
        const cohortLabel = cohort.toUpperCase().replace('-', ' ');
        images.forEach((img, idx) => {
          list.push({
            id: `talktable-${cohort}-${idx}`,
            programId: 'talk-table',
            programName: 'The Talk Table',
            edition: cohortLabel,
            year: '2026',
            src: img,
            caption: `The Talk Table Executive Salon — ${cohortLabel} Dialogue`
          });
        });
      });
    }

    return list;
  }, []);

  // Filtered photos based on active category and subcategory
  const filteredPhotos = useMemo(() => {
    return allPhotos.filter((item) => {
      const matchProgram =
        activeProgramFilter === 'all' || item.programId === activeProgramFilter;
      const matchSub =
        selectedSubcategory === 'all' ||
        item.year === selectedSubcategory ||
        item.edition.toLowerCase().includes(selectedSubcategory.toLowerCase());
      return matchProgram && matchSub;
    });
  }, [allPhotos, activeProgramFilter, selectedSubcategory]);

  const categories = [
    { id: 'all', name: 'All Archival Moments' },
    { id: 'hips', name: 'HIPS (2023–2026)' },
    { id: 'career-dinner', name: 'Career Dinner (2023–2025)' },
    { id: 'talk-table', name: 'The Talk Table (ABJ 1–4)' }
  ];

  return (
    <section id="gallery" className="py-28 relative bg-gradient-to-b from-transparent via-[#D6EEED]/75 to-transparent">
      {/* Ambient Teal Gradient Orbs */}
      <div className="absolute top-1/4 left-5 w-[700px] h-[550px] bg-gradient-to-tr from-[#0C7C7B]/20 via-[#2DD4BF]/15 to-transparent blur-[140px] pointer-events-none -z-10" />
      <div className="absolute bottom-10 right-5 w-[650px] h-[500px] bg-gradient-to-bl from-[#0C7C7B]/22 via-[#D99B26]/12 to-transparent blur-[140px] pointer-events-none -z-10" />

      <div className="container-custom">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/90 backdrop-blur-md border border-[#0C7C7B]/25 text-[#0C7C7B] text-xs font-semibold uppercase tracking-[0.14em] mb-4 shadow-xs">
              <Camera className="w-3.5 h-3.5" />
              <span>Official Photographic Archive</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-semibold text-[#141A19] mb-3">
              Moments of Impact & Fellowship
            </h2>
            <p className="text-base text-[#52605E]">
              Explore authentic archival captures from our eight HIPS editions, three Career Dinners, and intimate Talk Table roundtables across Abuja and Lagos.
            </p>
          </div>

          <div className="text-right hidden md:block">
            <span className="font-display text-4xl font-bold text-[#0C7C7B] block">
              {filteredPhotos.length}
            </span>
            <span className="text-xs uppercase tracking-wider text-[#6A7875]">
              Curated Archival Captures
            </span>
          </div>
        </div>

        {/* Filter Bar */}
        <div className="flex flex-wrap items-center gap-3 mb-10 pb-2">
          {categories.map((cat) => {
            const active = activeProgramFilter === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => {
                  setActiveProgramFilter(cat.id);
                  setSelectedSubcategory('all');
                }}
                className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                  active
                    ? 'bg-gradient-to-r from-[#0C7C7B] to-[#085E5D] text-white shadow-md'
                    : 'bg-white/90 text-[#3C4A48] hover:bg-white hover:text-[#0C7C7B] border border-[#0C7C7B]/25 backdrop-blur-md'
                }`}
              >
                {cat.name}
              </button>
            );
          })}
        </div>

        {/* Photographic Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredPhotos.map((photo, index) => (
            <div
              key={photo.id}
              onClick={() => onOpenLightbox(filteredPhotos, index)}
              className="group relative rounded-2xl overflow-hidden bg-[#E2ECE9] border border-[#0C7C7B]/15 cursor-pointer aspect-[4/3] shadow-sm hover:shadow-md transition-all duration-300"
            >
              <img
                src={photo.src}
                alt={photo.caption}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-108"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#121817]/90 via-[#121817]/25 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-4" />

              {/* Hover Overlay Details */}
              <div className="absolute inset-0 p-4 flex flex-col justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                <div className="flex justify-end">
                  <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md text-white flex items-center justify-center">
                    <Maximize2 className="w-4 h-4" />
                  </div>
                </div>

                <div className="text-white">
                  <span className="inline-block px-2.5 py-1 rounded-md text-[10px] font-semibold uppercase tracking-wider bg-[#0C7C7B] text-white">
                    {photo.edition}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredPhotos.length === 0 && (
          <div className="text-center py-16 bg-white rounded-2xl border border-[#0C7C7B]/10">
            <p className="text-[#52605E] text-sm">No photos match the selected criteria.</p>
          </div>
        )}
      </div>
    </section>
  );
}
