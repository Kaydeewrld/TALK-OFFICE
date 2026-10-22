import React, { useState } from 'react';
import { Mail, CheckCircle2 } from 'lucide-react';
import BrandLogo from './BrandLogo';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);

    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setSubscribed(true);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <footer className="bg-[#101716] text-[#DCE6E5] pt-20 pb-12 border-t border-white/5">
      <div className="container-custom">
        {/* Top Newsletter & Manifesto Banner */}
        <div className="pb-16 border-b border-white/10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7">
            <span className="text-[10px] font-mono uppercase tracking-widest text-[#2DD4BF] block mb-2">
              The Talk Office Executive Briefing
            </span>
            <h3 className="font-display text-2xl sm:text-3xl font-bold text-white mb-2">
              Stay Informed on the Future of Work & Leadership
            </h3>
            <p className="text-sm text-[#94A5A3] max-w-xl">
              Curated essays, flagship event announcements, and diagnostic leadership tools delivered straight to your inbox monthly.
            </p>
          </div>

          <div className="lg:col-span-5">
            {subscribed ? (
              <div className="flex items-center gap-2 p-4 rounded-xl bg-white/10 text-emerald-400 text-sm">
                <CheckCircle2 className="w-5 h-5 shrink-0" />
                <span>You have been subscribed to The Talk Office Briefing.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your corporate email..."
                  className="px-4 py-3 rounded-full bg-white/10 border border-white/15 text-white placeholder-white/40 focus:outline-none focus:border-[#0C7C7B] text-sm flex-1"
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="btn-accent !py-3 !px-6 text-xs uppercase tracking-wider font-semibold whitespace-nowrap"
                >
                  {loading ? 'Subscribing...' : 'Subscribe'}
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Links Grid */}
        <div className="py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand Info with Authentic BrandLogo */}
          <div className="lg:col-span-2">
            <div className="mb-4">
              <BrandLogo variant="light" size="md" />
            </div>
            <p className="text-xs text-[#94A5A3] leading-relaxed max-w-sm mb-6">
              A workforce transformation, leadership development, and organizational effectiveness firm helping professionals, institutions, businesses, and governments unlock human potential and build high-performing systems.
            </p>
            <div className="text-xs text-[#94A5A3] space-y-1">
              <p>No 15 Aba Close, Area 8, Garki, Abuja</p>
              <p>Phone: 08166399901</p>
              <p>Email: hello@thetalkoffice.com / njuara@thetalkoffice.com</p>
            </div>
          </div>

          {/* Programmes */}
          <div>
            <h4 className="text-xs uppercase font-mono tracking-widest text-white font-bold mb-4">
              Flagships
            </h4>
            <ul className="space-y-2.5 text-xs text-[#94A5A3]">
              <li>
                <a href="#programmes" className="hover:text-white transition-colors">
                  HIPS Seminar (8 Editions)
                </a>
              </li>
              <li>
                <a href="#programmes" className="hover:text-white transition-colors">
                  The Talk Table (Curated Salons)
                </a>
              </li>
              <li>
                <a href="#programmes" className="hover:text-white transition-colors">
                  Career Dinner (Annual Gala)
                </a>
              </li>
              <li>
                <a href="#programmes" className="hover:text-white transition-colors">
                  AJSAF (Employability Fair)
                </a>
              </li>
              <li>
                <a href="#programmes" className="hover:text-white transition-colors">
                  The Talk Office Global (2027)
                </a>
              </li>
            </ul>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-xs uppercase font-mono tracking-widest text-white font-bold mb-4">
              Explore
            </h4>
            <ul className="space-y-2.5 text-xs text-[#94A5A3]">
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="#founder" className="hover:text-white transition-colors">
                  Founder's Conviction
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-white transition-colors">
                  Executive Advisory & Services
                </a>
              </li>
              <li>
                <a href="#resources" className="hover:text-white transition-colors">
                  Resources & Diagnostic Cards
                </a>
              </li>
              <li>
                <a href="#gallery" className="hover:text-white transition-colors">
                  Photographic Gallery
                </a>
              </li>
              <li>
                <a href="#events" className="hover:text-white transition-colors">
                  Upcoming Events Calendar
                </a>
              </li>
            </ul>
          </div>

          {/* Social & Connect */}
          <div>
            <h4 className="text-xs uppercase font-mono tracking-widest text-white font-bold mb-4">
              Connect With Us
            </h4>
            <p className="text-xs text-[#94A5A3] mb-4">
              Follow our ongoing conversations, podcasts, and video masterclasses.
            </p>
            <div className="flex items-center gap-3">
              <a
                href="https://www.instagram.com/thetalkoffice"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-[#0C7C7B] text-white flex items-center justify-center transition-all"
                aria-label="Instagram"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a
                href="https://www.youtube.com/@thetalkoffice"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-[#0C7C7B] text-white flex items-center justify-center transition-all"
                aria-label="YouTube"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>
              <a
                href="https://x.com/thetalkoffice"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-[#0C7C7B] text-white flex items-center justify-center transition-all"
                aria-label="X Twitter"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Hairline & Legal */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-xs text-[#7A8E8B] gap-4">
          <div>
            © {new Date().getFullYear()} The Talk Office. All rights reserved. Registered under Nigerian Law.
          </div>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-white transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Terms of Service
            </a>
            <a href="#contact" className="hover:text-white transition-colors">
              Contact Us
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
