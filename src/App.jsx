import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ProgrammesOverview from './components/ProgrammesOverview';
import FoundersMessage from './components/FoundersMessage';
import ServicesSection from './components/ServicesSection';
import GalleryTeaser from './components/GalleryTeaser';
import ExecutiveResources from './components/ExecutiveResources';
import UpcomingEvents from './components/UpcomingEvents';
import CareerDinnerTables from './components/CareerDinnerTables';
import InsightsPodcast from './components/InsightsPodcast';
import ClientTestimonials from './components/ClientTestimonials';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';

import GalleryPage from './pages/GalleryPage';
import RegisterModal from './components/RegisterModal';
import OrderModal from './components/OrderModal';
import LightboxModal from './components/LightboxModal';

export default function App() {
  // Page Routing state: 'home' | 'gallery'
  const [currentPage, setCurrentPage] = useState(() => {
    if (typeof window !== 'undefined') {
      const path = window.location.pathname;
      const hash = window.location.hash;
      if (path === '/gallery' || path === '/gallery/' || hash === '#/gallery' || hash === '#gallery') {
        return 'gallery';
      }
    }
    return 'home';
  });

  const [activeProgramFilter, setActiveProgramFilter] = useState('all');

  // Modal states
  const [registerModalOpen, setRegisterModalOpen] = useState(false);
  const [selectedEventSlug, setSelectedEventSlug] = useState('career-dinner-2026');

  const [orderModalOpen, setOrderModalOpen] = useState(false);
  const [selectedOrderProduct, setSelectedOrderProduct] = useState(null);

  const [lightbox, setLightbox] = useState({
    isOpen: false,
    photos: [],
    currentIndex: 0
  });

  // Browser navigation sync (Popstate / Back / Forward)
  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname;
      const hash = window.location.hash;
      if (path === '/gallery' || path === '/gallery/' || hash === '#/gallery' || hash === '#gallery') {
        setCurrentPage('gallery');
      } else {
        setCurrentPage('home');
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Navigation handler
  const navigateTo = (page, filter = 'all') => {
    setCurrentPage(page);
    setActiveProgramFilter(filter);

    const targetUrl = page === 'gallery' ? '/gallery' : '/';
    if (window.location.pathname !== targetUrl) {
      window.history.pushState({}, '', targetUrl);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenRegister = (eventSlug = 'career-dinner-2026') => {
    setSelectedEventSlug(eventSlug);
    setRegisterModalOpen(true);
  };

  const handleOpenOrder = (product = null) => {
    setSelectedOrderProduct(product);
    setOrderModalOpen(true);
  };

  const handleOpenLightbox = (photos, index) => {
    setLightbox({
      isOpen: true,
      photos,
      currentIndex: index
    });
  };

  const handleCloseLightbox = () => {
    setLightbox((prev) => ({ ...prev, isOpen: false }));
  };

  const handleLightboxPrev = () => {
    setLightbox((prev) => ({
      ...prev,
      currentIndex: prev.currentIndex === 0 ? prev.photos.length - 1 : prev.currentIndex - 1
    }));
  };

  const handleLightboxNext = () => {
    setLightbox((prev) => ({
      ...prev,
      currentIndex: prev.currentIndex === prev.photos.length - 1 ? 0 : prev.currentIndex + 1
    }));
  };

  const handleSelectGalleryFolder = (folder) => {
    navigateTo('gallery', folder);
  };

  // If user is on the dedicated Gallery Page
  if (currentPage === 'gallery') {
    return (
      <div className="min-h-screen bg-transparent text-[#1C1917] flex flex-col selection:bg-[#0C7C7B] selection:text-white">
        <GalleryPage
          initialFilter={activeProgramFilter}
          onNavigateHome={() => navigateTo('home')}
          onOpenRegister={handleOpenRegister}
        />

        {/* Modals available globally */}
        <RegisterModal
          isOpen={registerModalOpen}
          onClose={() => setRegisterModalOpen(false)}
          initialEventSlug={selectedEventSlug}
        />

        <OrderModal
          isOpen={orderModalOpen}
          onClose={() => setOrderModalOpen(false)}
          selectedProduct={selectedOrderProduct}
        />
      </div>
    );
  }

  // Otherwise render the Homepage
  return (
    <div className="min-h-screen bg-transparent text-[#1C1917] flex flex-col selection:bg-[#0C7C7B] selection:text-white">
      {/* Navigation */}
      <Navbar
        currentPage="home"
        onNavigate={navigateTo}
        onOpenRegister={() => handleOpenRegister('career-dinner-2026')}
        onOpenOrder={() => handleOpenOrder(null)}
      />

      {/* Main Content */}
      <main className="flex-grow">
        {/* Hero */}
        <Hero
          onOpenRegister={() => handleOpenRegister('career-dinner-2026')}
          onOpenOrder={() => handleOpenOrder(null)}
        />

        {/* Flagship Programmes Showcase */}
        <ProgrammesOverview
          onOpenRegister={handleOpenRegister}
          onSelectGalleryFolder={handleSelectGalleryFolder}
        />

        {/* Founder's Address & Conviction */}
        <FoundersMessage />

        {/* Executive Advisory & Bespoke Client Services */}
        <ServicesSection />

        {/* Curated Archival Teaser linking to dedicated Gallery Page (Separated from Homepage) */}
        <GalleryTeaser onOpenGallery={(filter) => navigateTo('gallery', filter)} />

        {/* Executive Resources & Diagnostic Decks */}
        <ExecutiveResources onOpenOrder={handleOpenOrder} />

        {/* Upcoming Flagship Events Calendar */}
        <UpcomingEvents onOpenRegister={handleOpenRegister} />

        {/* Corporate Hospitality Options & Table Hosting (Career Dinner 2026) */}
        <CareerDinnerTables onOpenRegister={handleOpenRegister} />

        {/* Essays, Articles & The Talk Office Podcast */}
        <InsightsPodcast />

        {/* Real Client & Leader Endorsements */}
        <ClientTestimonials />

        {/* Contact & Consultation Booking */}
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer onNavigate={navigateTo} />

      {/* Interactive Modals */}
      <RegisterModal
        isOpen={registerModalOpen}
        onClose={() => setRegisterModalOpen(false)}
        initialEventSlug={selectedEventSlug}
      />

      <OrderModal
        isOpen={orderModalOpen}
        onClose={() => setOrderModalOpen(false)}
        selectedProduct={selectedOrderProduct}
      />

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
