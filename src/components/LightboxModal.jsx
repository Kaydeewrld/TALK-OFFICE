import React, { useEffect } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

export default function LightboxModal({ isOpen, photos, currentIndex, onClose, onPrev, onNext }) {
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') onPrev();
      if (e.key === 'ArrowRight') onNext();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose, onPrev, onNext]);

  if (!isOpen || !photos || !photos.length) return null;

  const currentPhoto = photos[currentIndex];

  return (
    <div className="modal-overlay z-[120]" onClick={onClose}>
      <div
        className="relative max-w-5xl w-full max-h-[95vh] flex flex-col items-center justify-center p-4"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute -top-12 right-4 text-white/80 hover:text-white p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
          aria-label="Close image viewer"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Main Image Container */}
        <div className="relative rounded-2xl overflow-hidden bg-black/60 shadow-2xl border border-white/10 max-h-[80vh] flex items-center justify-center">
          <img
            src={currentPhoto.src}
            alt={currentPhoto.caption}
            className="max-h-[80vh] w-auto max-w-full object-contain"
          />

          {/* Navigation Arrows */}
          <button
            onClick={onPrev}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-black/50 hover:bg-black/80 text-white flex items-center justify-center transition-all border border-white/15 backdrop-blur-sm"
            aria-label="Previous image"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={onNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-black/50 hover:bg-black/80 text-white flex items-center justify-center transition-all border border-white/15 backdrop-blur-sm"
            aria-label="Next image"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>

        {/* Caption & Metadata Bar */}
        <div className="mt-4 flex flex-col sm:flex-row items-center justify-between w-full max-w-4xl text-white/90 text-xs px-2 gap-2">
          <div className="flex items-center gap-3">
            <span className="px-2.5 py-0.5 rounded-full bg-[#0C7C7B] text-white font-mono font-semibold">
              {currentPhoto.edition}
            </span>
            <span className="text-sm font-medium text-white">{currentPhoto.caption}</span>
          </div>

          <div className="text-white/60 font-mono">
            {currentIndex + 1} of {photos.length}
          </div>
        </div>
      </div>
    </div>
  );
}
