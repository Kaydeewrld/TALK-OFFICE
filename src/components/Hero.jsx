import React, { useState, useRef } from 'react';
import { ArrowRight, Calendar, BookOpen, Play, Pause, Volume2, VolumeX, Sparkles, Ticket, ExternalLink } from 'lucide-react';

export default function Hero({ onOpenRegister, onOpenOrder }) {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef(null);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  return (
    <section className="relative pt-36 pb-24 md:pt-44 md:pb-32 overflow-hidden bg-gradient-to-b from-[#D4ECEB] via-[#E8F5F4]/80 to-transparent">
      {/* Luminous teal & gold ambient gradient plumes */}
      <div className="absolute -top-10 left-1/4 w-[750px] h-[550px] bg-gradient-to-br from-[#0C7C7B]/35 via-[#2DD4BF]/25 to-transparent blur-[140px] pointer-events-none -z-10" />
      <div className="absolute top-24 right-0 w-[680px] h-[550px] bg-gradient-to-bl from-[#0C7C7B]/30 via-[#D99B26]/20 to-transparent blur-[140px] pointer-events-none -z-10" />
      <div className="absolute bottom-0 left-10 w-[500px] h-[400px] bg-gradient-to-tr from-[#14B8A6]/20 to-transparent blur-[120px] pointer-events-none -z-10" />

      <div className="container-custom">
        {/* Spacious, Soulful Split Hero */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 xl:gap-16 items-center">
          {/* Left Column: Human Conviction, Grand Acorn Headline & Actions */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            {/* Soft Editorial Pill Badge */}
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/90 backdrop-blur-md border border-[#0C7C7B]/30 text-[#0C7C7B] text-xs font-semibold uppercase tracking-[0.14em] mb-7 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-[#0C7C7B] animate-pulse" />
              <span>Workforce Transformation · Leadership Development</span>
            </div>

            {/* Refined Headline with Editorial Rhythm */}
            <h1 className="font-display font-medium text-3xl sm:text-4xl md:text-[2.6rem] lg:text-[3.1rem] text-[#141A19] leading-[1.12] tracking-tight mb-5">
              The world of work is changing.{' '}
              <span className="italic font-serif text-[#0C7C7B] font-normal block sm:inline">
                We help you lead
              </span>{' '}
              that reality.
            </h1>

            {/* Soulful Conviction Copy */}
            <p className="text-sm sm:text-base text-[#52605E] leading-relaxed font-sans mb-7 max-w-2xl">
              At The Talk Office, our conviction is simple:{' '}
              <strong className="text-[#141A19] font-medium">
                when people grow, organizations grow; when organizations grow, societies prosper.
              </strong>{' '}
              We create intentional learning environments and executive advisory where leaders step back, gain perspective, and unlock high-performing systems.
            </p>

            {/* Tactile Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 mb-7 w-full sm:w-auto">
              <a
                href="#tables"
                className="btn-accent !px-5 !py-3 text-xs sm:text-[13px] font-semibold tracking-wide flex items-center gap-2 shadow-md whitespace-nowrap"
              >
                <Sparkles className="w-4 h-4 text-[#D99B26]" />
                Host a Table (₦1M – ₦5M)
              </a>

              <a
                href="https://paystack.shop/pay/careerdinner26"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary !px-4 !py-3 text-xs sm:text-[13px] font-semibold tracking-wide flex items-center gap-2 whitespace-nowrap bg-white/90 hover:bg-white"
              >
                <Ticket className="w-4 h-4 text-[#0C7C7B]" />
                Individual Seat (₦100k)
                <ExternalLink className="w-3.5 h-3.5 opacity-75" />
              </a>

              <a
                href="#programmes"
                className="px-4 py-2.5 text-xs sm:text-[13px] font-medium tracking-wide text-[#52605E] hover:text-[#0C7C7B] flex items-center gap-1.5 hover:bg-[#0C7C7B]/8 rounded-full transition-all whitespace-nowrap"
              >
                Explore Programmes
                <ArrowRight className="w-3.5 h-3.5 text-[#0C7C7B]" />
              </a>
            </div>

            {/* Event Announcement Micro-Strip */}
            <div className="flex flex-wrap items-center gap-2.5 sm:gap-3 text-xs text-[#52605E] font-sans bg-white/70 backdrop-blur-md px-4 py-2.5 rounded-2xl border border-[#0C7C7B]/15 shadow-xs mb-3">
              <span className="w-2 h-2 rounded-full bg-[#D99B26] animate-ping" />
              <strong className="text-[#141A19] font-semibold">Career Dinner 2026:</strong>
              <span>Wed, 16 Dec</span>
              <span>•</span>
              <span>Red Carpet 4 p.m. · Event 5:30</span>
              <span>•</span>
              <span className="text-[#0C7C7B] font-medium">The Signature by Wells Carlton, Asokoro, Abuja</span>
            </div>
          </div>

          {/* Right Column: High-End Cinematic Centerpiece */}
          <div className="lg:col-span-5 flex flex-col items-center">
            <div className="relative w-full max-w-lg lg:max-w-none">
              {/* Soft ambient back-glow behind the video */}
              <div className="absolute -inset-2 bg-gradient-to-tr from-[#0C7C7B]/25 via-[#D99B26]/20 to-[#0C7C7B]/20 rounded-[2.5rem] blur-2xl opacity-70 pointer-events-none -z-10" />

              {/* Video Card with Soft Rounded Frame — Pure & Clean without AI Descriptions */}
              <div className="relative rounded-[2.2rem] overflow-hidden shadow-2xl border border-white/60 bg-[#121817] group">
                <div className="relative aspect-[4/3] sm:aspect-[16/11] lg:aspect-[4/4.4] w-full bg-black overflow-hidden flex items-center justify-center">
                  <video
                    ref={videoRef}
                    src="/hero-video.mp4"
                    autoPlay
                    loop
                    muted={isMuted}
                    playsInline
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-102"
                  />

                  {/* Center Resume Button (only when paused) */}
                  {!isPlaying && (
                    <button
                      onClick={togglePlay}
                      className="absolute inset-0 m-auto w-16 h-16 rounded-full bg-[#0C7C7B]/90 text-white flex items-center justify-center backdrop-blur-md hover:scale-110 transition-transform shadow-xl z-20 cursor-pointer"
                      aria-label="Resume Video"
                    >
                      <Play className="w-7 h-7 ml-1 fill-current" />
                    </button>
                  )}

                  {/* Minimal Floating Controls (Bottom-Right, no text or descriptions) */}
                  <div className="absolute bottom-4 right-4 z-10 flex items-center gap-2 opacity-80 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={togglePlay}
                      className="w-8 h-8 rounded-full bg-black/50 hover:bg-[#0C7C7B] text-white flex items-center justify-center backdrop-blur-md border border-white/20 transition-colors cursor-pointer shadow-sm"
                      title={isPlaying ? 'Pause' : 'Play'}
                      aria-label={isPlaying ? 'Pause video' : 'Play video'}
                    >
                      {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 ml-0.5" />}
                    </button>

                    <button
                      onClick={toggleMute}
                      className="w-8 h-8 rounded-full bg-black/50 hover:bg-[#0C7C7B] text-white flex items-center justify-center backdrop-blur-md border border-white/20 transition-colors cursor-pointer shadow-sm"
                      title={isMuted ? 'Unmute Audio' : 'Mute Audio'}
                      aria-label={isMuted ? 'Unmute audio' : 'Mute audio'}
                    >
                      {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
