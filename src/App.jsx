import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ProgrammesOverview from './components/ProgrammesOverview';
import FoundersMessage from './components/FoundersMessage';
import ServicesSection from './components/ServicesSection';
import GalleryArchive from './components/GalleryArchive';
import ExecutiveResources from './components/ExecutiveResources';
import UpcomingEvents from './components/UpcomingEvents';
import InsightsPodcast from './components/InsightsPodcast';
import ClientTestimonials from './components/ClientTestimonials';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';

import RegisterModal from './components/RegisterModal';
import OrderModal from './components/OrderModal';
import LightboxModal from './components/LightboxModal';

export default function App() {
  // Modal states
  const [registerModalOpen, setRegisterModalOpen] = useState(false);
  const [selectedEventSlug, setSelectedEventSlug] = useState('career-dinner-2026');

  const [orderModalOpen, setOrderModalOpen] = useState(false);
  const [selectedOrderProduct, setSelectedOrderProduct] = useState(null);

  const [activeProgramFilter, setActiveProgramFilter] = useState('all');

  const [lightbox, setLightbox] = useState({
    isOpen: false,
    photos: [],
    currentIndex: 0
  });

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
    setActiveProgramFilter(folder);
  };

  return (
    <div className="min-h-screen bg-transparent text-[#1C1917] flex flex-col selection:bg-[#0C7C7B] selection:text-white">
      {/* Navigation */}
      <Navbar
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

        {/* Curated Photographic Archive */}
        <GalleryArchive
          onOpenLightbox={handleOpenLightbox}
          activeProgramFilter={activeProgramFilter}
          setActiveProgramFilter={setActiveProgramFilter}
        />

        {/* Executive Resources & Diagnostic Decks */}
        <ExecutiveResources onOpenOrder={handleOpenOrder} />

        {/* Upcoming Flagship Events Calendar */}
        <UpcomingEvents onOpenRegister={handleOpenRegister} />

        {/* Essays, Articles & The Talk Office Podcast */}
        <InsightsPodcast />

        {/* Real Client & Leader Endorsements */}
        <ClientTestimonials />

        {/* Contact & Consultation Booking */}
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer />

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
