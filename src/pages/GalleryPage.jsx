import React, { useState, useMemo, useEffect } from 'react';
import mediaManifest from '../data/mediaManifest.json';
import {
  Camera,
  ArrowLeft,
  Maximize2,
  Calendar,
  Sparkles,
  Users,
  Layers,
  ChevronRight,
  Filter,
  CheckCircle2
} from 'lucide-react';
import BrandLogo from '../components/BrandLogo';
import LightboxModal from '../components/LightboxModal';
import Footer from '../components/Footer';

export default function GalleryPage({
  initialFilter = 'all',
  onNavigateHome,
  onOpenRegister
}) {
  const [activeCategory, setActiveCategory] = useState(initialFilter || 'all');
  const [selectedSubfilter, setSelectedSubfilter] = useState('all');
  const [lightbox, setLightbox] = useState({
    isOpen: false,
    photos: [],
    currentIndex: 0
  });

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Sync initial filter if changed
  useEffect(() => {
    if (initialFilter) {
      setActiveCategory(initialFilter);
      setSelectedSubfilter('all');
    }
  }, [initialFilter]);

  // Aggregate all photos from the media manifest
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

    // The Talk Table
    if (mediaManifest.talkTable) {
      Object.entries(mediaManifest.talkTable).forEach(([cohort, images]) => {
        const cohortLabel = cohort.toUpperCase().replace('-', ' ');
        images.forEach((img, idx) => {
          list.push({
            id: `talktable-${cohort}-${idx}`,
            programId: 'talk-table',
            programName: 'The Talk Table',
            edition: cohortLabel,
            cohort,
            year: '2026',
            src: img,
            caption: `The Talk Table Executive Salon — ${cohortLabel} Dialogue`
          });
        });
      });
    }

    return list;
  }, []);

  // Filter photos based on primary category and secondary subfilter
  const filteredPhotos = useMemo(() => {
    return allPhotos.filter((item) => {
      const matchProgram =
        activeCategory === 'all' || item.programId === activeCategory;

      if (!matchProgram) return false;

      if (selectedSubfilter === 'all') return true;

      // Subfilter checks
      return (
        item.year === selectedSubfilter ||
        item.edition.toLowerCase().includes(selectedSubfilter.toLowerCase()) ||
        (item.cohort && item.cohort.toLowerCase() === selectedSubfilter.toLowerCase())
      );
    });
  }, [allPhotos, activeCategory, selectedSubfilter]);

  // Dynamic subcategories based on active primary category
  const subfilters = useMemo(() => {
    if (activeCategory === 'hips') {
      return [
        { id: 'all', label: 'All HIPS Editions' },
        { id: '2026', label: '2026' },
        { id: '2025', label: '2025' },
        { id: '2024', label: '2024' },
        { id: '2023', label: '2023' }
      ];
    }
    if (activeCategory === 'career-dinner') {
      return [
        { id: 'all', label: 'All Dinner Editions' },
        { id: '2025', label: '2025' },
        { id: '2024', label: '2024' },
        { id: '2023', label: '2023' }
      ];
    }
    if (activeCategory === 'talk-table') {
      return [
        { id: 'all', label: 'All Executive Cohorts' },
        { id: 'abj-1', label: 'Cohort 1 (ABJ)' },
        { id: 'abj-2', label: 'Cohort 2 (ABJ)' },
        { id: 'abj-3', label: 'Cohort 3 (ABJ)' },
        { id: 'abj-4', label: 'Cohort 4 (ABJ)' }
      ];
    }
    return [];
  }, [activeCategory]);

  const categories = [
    { id: 'all', name: 'All Archival Moments', count: allPhotos.length },
    {
      id: 'hips',
      name: 'HIPS (2023–2026)',
      count: allPhotos.filter((p) => p.programId === 'hips').length
    },
    {
      id: 'career-dinner',
      name: 'Career Dinner (2023–2025)',
      count: allPhotos.filter((p) => p.programId === 'career-dinner').length
    },
    {
      id: 'talk-table',
      name: 'The Talk Table (ABJ 1–4)',
      count: allPhotos.filter((p) => p.programId === 'talk-table').length
    }
  ];

  const handleOpenLightbox = (index) => {
    setLightbox({
      isOpen: true,
      photos: filteredPhotos,
      currentIndex: index
    });
  };

  const handleCloseLightbox = () => {
    setLightbox((prev) => ({ ...prev, isOpen: false }));
  };

  const handleLightboxPrev = () => {
    setLightbox((prev) => ({
      ...prev,
      currentIndex:
        prev.currentIndex === 0 ? prev.photos.length - 1 : prev.currentIndex - 1
    }));
  };

  const handleLightboxNext = () => {
    setLightbox((prev) => ({
      ...prev,
      currentIndex:
        prev.currentIndex === prev.photos.length - 1 ? 0 : prev.currentIndex + 1
    }));
  };

  return (
    <div className="min-h-screen bg-transparent text-[#141A19] flex flex-col selection:bg-[#0C7C7B] selection:text-white">
      {/* Top Dedicated Navigation Bar */}
      <header className="sticky top-0 z-40 bg-[#EBF5F4]/94 backdrop-blur-xl border-b border-[#0C7C7B]/20 py-3.5 shadow-sm">
        <div className="container-custom flex items-center justify-between gap-4">
          {/* Logo & Back button */}
          <div className="flex items-center gap-4 sm:gap-6">
            <button
              onClick={onNavigateHome}
              className="flex items-center gap-1.5 text-xs font-semibold text-[#3C4A48] hover:text-[#0C7C7B] transition-colors px-3 py-1.5 rounded-full hover:bg-white/80 border border-transparent hover:border-[#0C7C7B]/20 cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Home</span>
            </button>

            <div className="h-4 w-px bg-[#0C7C7B]/20 hidden sm:block" />

            <button
              onClick={onNavigateHome}
              className="flex items-center text-decoration-none cursor-pointer"
            >
              <BrandLogo size="sm" />
            </button>
          </div>

          {/* Action CTAs */}
          <div className="flex items-center gap-2.5">
            <a
              href="/#tables"
              onClick={(e) => {
                e.preventDefault();
                onNavigateHome();
                setTimeout(() => {
                  const el = document.getElementById('tables');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }, 100);
              }}
              className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider text-[#0C7C7B] border border-[#0C7C7B]/25 hover:bg-[#EAF6F6] transition-all"
            >
              <Sparkles className="w-3 h-3 text-[#D99B26]" />
              <span>Host a Table</span>
            </a>

            <button
              onClick={() => onOpenRegister('career-dinner-2026')}
              className="btn-accent !py-2 !px-4 !text-xs !uppercase !tracking-wider flex items-center gap-1.5 shadow-xs cursor-pointer"
            >
              <Calendar className="w-3 h-3 text-[#D99B26]" />
              <span>Register</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Dedicated Page Content */}
      <main className="flex-grow pt-10 pb-24">
        {/* Gallery Hero Section */}
        <section className="container-custom mb-10 sm:mb-14">
          <div className="max-w-4xl">
            {/* Breadcrumb Eyebrow */}
            <div className="flex items-center gap-2 text-[11px] text-[#6A7875] font-mono uppercase tracking-widest mb-3">
              <button
                onClick={onNavigateHome}
                className="hover:text-[#0C7C7B] transition-colors cursor-pointer"
              >
                The Talk Office
              </button>
              <span>/</span>
              <span className="text-[#0C7C7B] font-semibold">Photographic Archive</span>
            </div>

            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/90 backdrop-blur-md border border-[#0C7C7B]/20 text-[#0C7C7B] text-[11px] font-semibold uppercase tracking-[0.14em] mb-3 shadow-xs">
              <Camera className="w-3.5 h-3.5" />
              <span>Curated Visual History · 2023–2026</span>
            </div>

            <h1 className="font-display text-2xl sm:text-3xl md:text-4xl font-semibold text-[#141A19] tracking-tight mb-3">
              Moments of Impact, Fellowship & Growth
            </h1>

            <p className="text-sm sm:text-base text-[#52605E] leading-relaxed max-w-3xl mb-6">
              An expansive photographic archive capturing over three years of transformative executive gatherings across Nigeria. From the intense strategy rooms of HIPS to the vulnerable roundtables of The Talk Table and the year-end celebration of Career Dinner.
            </p>

            {/* Archival Metrics Strip */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="bg-white/85 backdrop-blur-md rounded-2xl p-3.5 border border-[#0C7C7B]/15 shadow-xs">
                <span className="text-lg sm:text-xl font-display font-bold text-[#0C7C7B] block">
                  8 Editions
                </span>
                <span className="text-[11px] text-[#6A7875] uppercase tracking-wider">
                  HIPS (ABJ & LOS)
                </span>
              </div>

              <div className="bg-white/85 backdrop-blur-md rounded-2xl p-3.5 border border-[#0C7C7B]/15 shadow-xs">
                <span className="text-lg sm:text-xl font-display font-bold text-[#0C7C7B] block">
                  3 Galas
                </span>
                <span className="text-[11px] text-[#6A7875] uppercase tracking-wider">
                  Career Dinner
                </span>
              </div>

              <div className="bg-white/85 backdrop-blur-md rounded-2xl p-3.5 border border-[#0C7C7B]/15 shadow-xs">
                <span className="text-lg sm:text-xl font-display font-bold text-[#0C7C7B] block">
                  4 Cohorts
                </span>
                <span className="text-[11px] text-[#6A7875] uppercase tracking-wider">
                  The Talk Table
                </span>
              </div>

              <div className="bg-white/85 backdrop-blur-md rounded-2xl p-3.5 border border-[#0C7C7B]/15 shadow-xs">
                <span className="text-lg sm:text-xl font-display font-bold text-[#D99B26] block">
                  {allPhotos.length} Captures
                </span>
                <span className="text-[11px] text-[#6A7875] uppercase tracking-wider">
                  Documented Moments
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Filters & Grid Container */}
        <div className="container-custom">
          {/* Primary Category Switcher */}
          <div className="flex flex-wrap items-center justify-between gap-3 mb-4 pb-2 border-b border-[#0C7C7B]/15">
            <div className="flex flex-wrap items-center gap-2">
              {categories.map((cat) => {
                const active = activeCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => {
                      setActiveCategory(cat.id);
                      setSelectedSubfilter('all');
                    }}
                    className={`px-4 py-2 rounded-full text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                      active
                        ? 'bg-[#0C7C7B] text-white shadow-sm'
                        : 'bg-white/90 text-[#3C4A48] hover:bg-white hover:text-[#0C7C7B] border border-[#0C7C7B]/20'
                    }`}
                  >
                    <span>{cat.name}</span>
                    <span
                      className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                        active ? 'bg-white/20 text-white' : 'bg-[#EAF6F6] text-[#0C7C7B]'
                      }`}
                    >
                      {cat.count}
                    </span>
                  </button>
                );
              })}
            </div>

            <div className="text-xs text-[#6A7875] font-mono">
              Showing <strong>{filteredPhotos.length}</strong> photographs
            </div>
          </div>

          {/* Subfilter Pills (Years or Cohorts) */}
          {subfilters.length > 0 && (
            <div className="flex flex-wrap items-center gap-2 mb-8 bg-[#FAF8F5] p-2.5 rounded-2xl border border-[#0C7C7B]/15">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-[#6A7875] mr-1 flex items-center gap-1">
                <Filter className="w-3 h-3 text-[#0C7C7B]" />
                Filter by Edition:
              </span>
              {subfilters.map((sub) => {
                const active = selectedSubfilter === sub.id;
                return (
                  <button
                    key={sub.id}
                    onClick={() => setSelectedSubfilter(sub.id)}
                    className={`px-3 py-1 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                      active
                        ? 'bg-[#141A19] text-white shadow-xs'
                        : 'bg-white text-[#52605E] hover:text-[#0C7C7B] border border-[#0C7C7B]/15'
                    }`}
                  >
                    {sub.label}
                  </button>
                );
              })}
            </div>
          )}

          {/* Photographic Grid */}
          {filteredPhotos.length === 0 ? (
            <div className="py-20 text-center bg-white/70 backdrop-blur-md rounded-3xl border border-[#0C7C7B]/15 p-8">
              <Camera className="w-10 h-10 text-[#0C7C7B] mx-auto mb-3 opacity-60" />
              <h3 className="font-display text-lg font-bold text-[#141A19] mb-1">
                No Photographs Found
              </h3>
              <p className="text-xs text-[#52605E] mb-4">
                No captures match the selected edition filter. Try selecting 'All'.
              </p>
              <button
                onClick={() => {
                  setActiveCategory('all');
                  setSelectedSubfilter('all');
                }}
                className="px-4 py-2 rounded-full bg-[#0C7C7B] text-white text-xs font-semibold"
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
              {filteredPhotos.map((photo, index) => (
                <div
                  key={photo.id}
                  onClick={() => handleOpenLightbox(index)}
                  className="group relative rounded-2xl overflow-hidden bg-[#E2ECE9] border border-[#0C7C7B]/15 cursor-pointer aspect-[4/3] shadow-xs hover:shadow-md transition-all duration-300"
                >
                  <img
                    src={photo.src}
                    alt={photo.caption}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                    }}
                  />

                  {/* Top Edition Pill */}
                  <div className="absolute top-2.5 left-2.5 z-10">
                    <span className="px-2 py-0.5 rounded-md bg-[#141A19]/80 backdrop-blur-md text-white text-[10px] font-mono uppercase tracking-wider border border-white/10">
                      {photo.edition}
                    </span>
                  </div>

                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0C7C7B]/90 via-[#0C7C7B]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-3.5 text-white">
                    <div className="w-7 h-7 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center self-end mb-auto text-white">
                      <Maximize2 className="w-3.5 h-3.5" />
                    </div>
                    <span className="text-[10px] uppercase font-mono tracking-wider text-[#A5E3DE] block mb-0.5">
                      {photo.programName}
                    </span>
                    <p className="text-xs font-medium text-white line-clamp-2 leading-snug">
                      {photo.caption}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Bottom Callout & Return Strip */}
          <div className="mt-16 p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-[#0A2E2B] to-[#12423E] text-white border border-[#2DD4BF]/30 shadow-lg flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="text-center sm:text-left">
              <span className="text-[10px] uppercase font-mono tracking-widest text-[#2DD4BF] font-semibold block mb-1">
                Be Part of the Next Gathering
              </span>
              <h3 className="font-display text-xl sm:text-2xl font-bold text-white mb-1">
                Career Dinner 2026: Wednesday, 16 December
              </h3>
              <p className="text-xs text-[#C7E3DF] max-w-xl">
                Join forward-thinking executives, table hosts, and emerging leaders at The Signature by Wells Carlton, Asokoro, Abuja.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <a
                href="/#tables"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigateHome();
                  setTimeout(() => {
                    const el = document.getElementById('tables');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }, 100);
                }}
                className="btn-accent !py-2.5 !px-5 text-xs uppercase tracking-wider font-semibold whitespace-nowrap shadow-md"
              >
                Host a Table (₦1M–₦5M)
              </a>

              <button
                onClick={onNavigateHome}
                className="px-4 py-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-semibold uppercase tracking-wider transition-colors border border-white/20 whitespace-nowrap cursor-pointer"
              >
                Return to Homepage
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer />

      {/* Interactive Lightbox Modal */}
      <LightboxModal
        isOpen={lightbox.isOpen}
        photos={lightbox.photos}
        currentIndex={lightbox.currentIndex}
        onClose={handleCloseLightbox}
        onPrev={handleLightboxPrev}
        onNext={handleLightboxNext}
      />
    </div>
  );
}
