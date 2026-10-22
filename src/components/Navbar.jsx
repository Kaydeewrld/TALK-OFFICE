import React, { useState, useEffect } from 'react';
import { Menu, X, Calendar, BookOpen } from 'lucide-react';
import BrandLogo from './BrandLogo';

export default function Navbar({ onOpenRegister, onOpenOrder }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Programmes', href: '#programmes' },
    { name: 'Advisory', href: '#services' },
    { name: 'Archive', href: '#gallery' },
    { name: 'Events', href: '#events' }
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#EBF5F4]/92 backdrop-blur-xl border-b border-[#0C7C7B]/20 py-3 shadow-md shadow-[#0C7C7B]/5'
          : 'bg-transparent py-4 xl:py-5'
      }`}
    >
      <div className="container-custom flex items-center justify-between flex-nowrap w-full gap-4">
        {/* Authentic Brand Logo in single straight line */}
        <a href="#" className="flex items-center text-decoration-none shrink-0 whitespace-nowrap">
          <BrandLogo size="md" />
        </a>

        {/* Desktop Nav Links - Clean, spacious & uncrowded */}
        <nav className="hidden lg:flex items-center gap-6 xl:gap-9 flex-nowrap shrink-0">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-sm font-medium text-[#2E3C3A] hover:text-[#0C7C7B] transition-colors relative py-1 whitespace-nowrap shrink-0"
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Desktop CTA actions - Single line, non-breaking */}
        <div className="hidden lg:flex items-center gap-2.5 xl:gap-3 shrink-0 flex-nowrap">
          <button
            onClick={() => onOpenOrder()}
            className="px-3.5 xl:px-4 py-2 text-xs font-semibold uppercase tracking-wider text-[#2E3C3A] hover:text-[#0C7C7B] border border-[#0C7C7B]/25 rounded-full hover:border-[#0C7C7B] hover:bg-[#EAF6F6] transition-all flex items-center gap-1.5 whitespace-nowrap shrink-0 cursor-pointer"
          >
            <BookOpen className="w-3.5 h-3.5 text-[#0C7C7B]" />
            Store
          </button>
          <button
            onClick={() => onOpenRegister()}
            className="btn-accent !py-2.5 !px-4 xl:!px-5 !text-xs !uppercase !tracking-wider flex items-center gap-2 whitespace-nowrap shrink-0 shadow-sm cursor-pointer"
          >
            <Calendar className="w-3.5 h-3.5 text-[#D99B26]" />
            Register
          </button>
        </div>

        {/* Mobile Hamburger button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 rounded-lg text-[#121817] hover:bg-[#0C7C7B]/10 transition-colors shrink-0"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#EBF5F4]/98 backdrop-blur-xl border-b border-[#0C7C7B]/20 px-6 py-6 shadow-xl transition-all">
          <div className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-base font-medium text-[#141A19] hover:text-[#0C7C7B] transition-colors py-1.5 border-b border-[#0C7C7B]/10 whitespace-nowrap"
              >
                {link.name}
              </a>
            ))}
            <div className="flex flex-col gap-3 pt-3">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenOrder();
                }}
                className="btn-secondary !w-full !py-3 !text-sm flex items-center justify-center gap-2 whitespace-nowrap"
              >
                <BookOpen className="w-4 h-4 text-[#0C7C7B]" />
                Browse Executive Resources
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenRegister();
                }}
                className="btn-accent !w-full !py-3 !text-sm flex items-center justify-center gap-2 whitespace-nowrap"
              >
                <Calendar className="w-4 h-4 text-[#D99B26]" />
                Register for Upcoming Event
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
