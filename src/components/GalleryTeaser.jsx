import React from 'react';
import { Camera, ArrowRight, Sparkles, Images, Eye } from 'lucide-react';
import mediaManifest from '../data/mediaManifest.json';

export default function GalleryTeaser({ onOpenGallery }) {
  // Curated 4 preview images representing each program
  const previews = [
    {
      title: 'HIPS Abuja Masterclass',
      edition: 'HIPS 2026',
      src: mediaManifest.hips?.['2026']?.[0] || '/images/programs/hips/2026/photo-1.jpg'
    },
    {
      title: 'Career Dinner Annual Gala',
      edition: 'Career Dinner 2025',
      src: mediaManifest.careerDinner?.['2025']?.[0] || '/images/programs/career-dinner/2025/photo-1.jpg'
    },
    {
      title: 'The Talk Table Executive Salon',
      edition: 'Cohort 4 (ABJ)',
      src: mediaManifest.talkTable?.['abj-4']?.[0] || '/images/programs/talk-table/abj-4/photo-1.jpg'
    },
    {
      title: 'HIPS Executive Strategy',
      edition: 'HIPS 2024',
      src: mediaManifest.hips?.['2024']?.[0] || '/images/programs/hips/2024/photo-1.jpg'
    }
  ];

  return (
    <section id="gallery-preview" className="py-20 sm:py-24 relative overflow-hidden bg-gradient-to-b from-transparent via-[#DCF1F0]/70 to-transparent">
      <div className="container-custom">
        <div className="soft-card p-7 sm:p-10 lg:p-12 border border-[#0C7C7B]/20 bg-white/90 backdrop-blur-md relative overflow-hidden">
          {/* Subtle background ambient glow */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-bl from-[#0C7C7B]/15 via-[#2DD4BF]/10 to-transparent rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            {/* Left Content */}
            <div className="lg:col-span-5 text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EAF6F6] text-[#0C7C7B] text-[11px] font-semibold uppercase tracking-[0.14em] mb-4 border border-[#0C7C7B]/20">
                <Images className="w-3.5 h-3.5" />
                <span>Photographic Archive</span>
              </div>

              <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-semibold text-[#141A19] mb-3 tracking-tight">
                Moments of Impact & Fellowship
              </h2>

              <p className="text-sm text-[#52605E] leading-relaxed mb-6">
                Across eight HIPS seminars, four executive roundtables, and three annual galas, we have documented the candid moments, strategic breakthroughs, and lasting connections that define The Talk Office community.
              </p>

              <div className="flex flex-wrap items-center gap-3">
                <button
                  onClick={() => onOpenGallery('all')}
                  className="btn-accent !py-3 !px-6 text-xs uppercase tracking-wider font-semibold flex items-center gap-2 shadow-md cursor-pointer"
                >
                  <Eye className="w-4 h-4 text-[#D99B26]" />
                  <span>Explore Dedicated Photo Gallery</span>
                  <ArrowRight className="w-4 h-4 text-white" />
                </button>

                <span className="text-[11px] text-[#6A7875] font-mono">
                  8 HIPS · 3 Galas · 4 Cohorts
                </span>
              </div>
            </div>

            {/* Right Preview Quad */}
            <div className="lg:col-span-7">
              <div className="grid grid-cols-2 gap-3 sm:gap-4">
                {previews.map((item, idx) => (
                  <div
                    key={idx}
                    onClick={() => onOpenGallery(idx === 1 ? 'career-dinner' : idx === 2 ? 'talk-table' : 'hips')}
                    className="group relative rounded-2xl overflow-hidden aspect-[4/3] bg-[#E2ECE9] border border-[#0C7C7B]/20 cursor-pointer shadow-xs hover:shadow-md transition-all duration-300"
                  >
                    <img
                      src={item.src}
                      alt={item.title}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent p-3 flex flex-col justify-end text-white">
                      <span className="text-[9px] font-mono uppercase tracking-widest text-[#2DD4BF] font-semibold">
                        {item.edition}
                      </span>
                      <p className="text-[11px] font-medium text-white/95 line-clamp-1">
                        {item.title}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
