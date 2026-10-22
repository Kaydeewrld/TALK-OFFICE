import React, { useState, useEffect } from 'react';
import { clientTestimonialsData } from '../data/programsData';
import { Quote, ChevronLeft, ChevronRight } from 'lucide-react';

export default function ClientTestimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? clientTestimonialsData.length - 1 : prev - 1
    );
  };

  const nextSlide = () => {
    setCurrentIndex((prev) =>
      prev === clientTestimonialsData.length - 1 ? 0 : prev + 1
    );
  };

  // Auto-advance carousel every 7 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 7000);
    return () => clearInterval(timer);
  }, [currentIndex]);

  const activeTestimonial = clientTestimonialsData[currentIndex];

  return (
    <section className="py-28 relative bg-gradient-to-b from-transparent via-[#DCF2F1]/80 to-transparent">
      {/* Ambient Teal Gradient Orbs */}
      <div className="absolute top-1/3 left-1/4 w-[650px] h-[500px] bg-gradient-to-tr from-[#0C7C7B]/25 via-[#2DD4BF]/16 to-transparent blur-[140px] pointer-events-none -z-10" />

      <div className="container-custom">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/90 backdrop-blur-md border border-[#0C7C7B]/25 text-[#0C7C7B] text-xs font-semibold uppercase tracking-[0.14em] mb-4 shadow-xs">
            <Quote className="w-3.5 h-3.5 text-[#0C7C7B]" />
            <span>Executive Endorsements</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-semibold text-[#141A19] mb-12">
            Real Feedback From Leaders & Clients
          </h2>

          {/* Testimonial Card with Prestigious Dark Teal Gradient */}
          <div className="relative rounded-[2.5rem] bg-gradient-to-br from-[#082220] via-[#0E3531] to-[#061816] text-[#FAF8F5] p-8 sm:p-14 lg:p-16 shadow-2xl border border-[#0C7C7B]/35 min-h-[340px] flex flex-col justify-between overflow-hidden">
            {/* Ambient glowing radial orbs inside the card */}
            <div className="absolute right-0 top-0 w-80 h-80 bg-[#0C7C7B]/30 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute left-0 bottom-0 w-80 h-80 bg-[#D99B26]/12 rounded-full blur-3xl pointer-events-none" />

            {/* Quote Mark */}
            <Quote className="w-12 h-12 text-[#2DD4BF]/25 mx-auto mb-6 relative z-10" />

            <div className="mb-8 relative z-10">
              <p className="font-serif italic text-lg sm:text-2xl text-white leading-relaxed max-w-3xl mx-auto">
                "{activeTestimonial.quote}"
              </p>
            </div>

            {/* Author Attribution */}
            <div className="relative z-10">
              <h4 className="font-display text-xl font-bold text-white">
                {activeTestimonial.author}
              </h4>
              <p className="text-xs uppercase font-medium tracking-wider text-[#2DD4BF] mt-0.5">
                {activeTestimonial.role}
              </p>
              <p className="text-xs text-[#95AEA9] mt-0.5">
                {activeTestimonial.organization} · Attended {activeTestimonial.programAttended}
              </p>
            </div>

            {/* Carousel Navigation Controls */}
            <div className="flex items-center justify-between pt-8 mt-8 border-t border-white/10 relative z-10">
              <button
                onClick={prevSlide}
                className="w-10 h-10 rounded-full border border-white/20 hover:border-transparent hover:bg-[#0C7C7B] flex items-center justify-center text-white transition-all cursor-pointer"
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="w-5 h-5 text-white" />
              </button>

              {/* Dots */}
              <div className="flex items-center gap-2">
                {clientTestimonialsData.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentIndex(idx)}
                    className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                      idx === currentIndex
                        ? 'w-8 bg-[#2DD4BF]'
                        : 'w-2 bg-white/20 hover:bg-white/40'
                    }`}
                    aria-label={`Go to slide ${idx + 1}`}
                  />
                ))}
              </div>

              <button
                onClick={nextSlide}
                className="w-10 h-10 rounded-full border border-white/20 hover:border-transparent hover:bg-[#0C7C7B] flex items-center justify-center text-white transition-all cursor-pointer"
                aria-label="Next testimonial"
              >
                <ChevronRight className="w-5 h-5 text-white" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
