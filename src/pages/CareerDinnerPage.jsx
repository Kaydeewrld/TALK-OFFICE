import React, { useState, useEffect } from 'react';
import {
  Calendar,
  Clock,
  MapPin,
  Sparkles,
  Ticket,
  ExternalLink,
  CheckCircle2,
  Copy,
  Check,
  QrCode,
  Download,
  Building2,
  Users,
  Award,
  Crown,
  ChevronRight,
  ArrowLeft,
  Share2,
  Camera,
  Maximize2
} from 'lucide-react';
import BrandLogo from '../components/BrandLogo';
import LightboxModal from '../components/LightboxModal';
import Footer from '../components/Footer';
import mediaManifest from '../data/mediaManifest.json';
import {
  careerDinnerTablesData,
  careerDinnerBankDetails,
  careerDinnerInvitation
} from '../data/programsData';

export default function CareerDinnerPage({
  onNavigateHome,
  onOpenRegister,
  onNavigateGallery
}) {
  const [copiedBank, setCopiedBank] = useState(false);
  const [copiedPageUrl, setCopiedPageUrl] = useState(false);
  const [selectedQrType, setSelectedQrType] = useState('page'); // 'page' | 'event' | 'celebration' | 'signature' | 'executive'
  const [lightbox, setLightbox] = useState({
    isOpen: false,
    photos: [],
    currentIndex: 0
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleCopyAccount = () => {
    navigator.clipboard.writeText(careerDinnerBankDetails.accountNumber);
    setCopiedBank(true);
    setTimeout(() => setCopiedBank(false), 2500);
  };

  const handleCopyPageUrl = () => {
    const url = typeof window !== 'undefined' ? window.location.href : careerDinnerInvitation.pageUrl;
    navigator.clipboard.writeText(url);
    setCopiedPageUrl(true);
    setTimeout(() => setCopiedPageUrl(false), 2500);
  };

  // Past Career Dinner photos for the retrospective section
  const pastDinnerPhotos = React.useMemo(() => {
    const list = [];
    if (mediaManifest.careerDinner) {
      Object.entries(mediaManifest.careerDinner).forEach(([year, images]) => {
        images.slice(0, 4).forEach((img, idx) => {
          list.push({
            id: `dinner-retro-${year}-${idx}`,
            programId: 'career-dinner',
            programName: 'Career Dinner',
            edition: `Career Dinner ${year}`,
            year,
            src: img,
            caption: `The Talk Office Career Dinner Gala — ${year} Retrospective`
          });
        });
      });
    }
    return list;
  }, []);

  const handleOpenLightbox = (index) => {
    setLightbox({
      isOpen: true,
      photos: pastDinnerPhotos,
      currentIndex: index
    });
  };

  const currentQr =
    selectedQrType === 'page'
      ? {
          title: 'Career Dinner 2026 Invitation Page',
          subtitle: 'Leads directly to this dedicated event & tables page',
          url: careerDinnerInvitation.pageUrl,
          png: '/images/career-dinner-page-qr.png',
          svg: '/images/career-dinner-page-qr.svg'
        }
      : selectedQrType === 'event'
      ? {
          title: 'Individual Delegate Seat (₦100,000)',
          subtitle: 'Instant Paystack individual checkout',
          url: careerDinnerInvitation.individualTicket.paystackUrl,
          png: '/images/career-dinner-qr.png',
          svg: '/images/career-dinner-qr.svg'
        }
      : selectedQrType === 'celebration'
      ? {
          title: 'Celebration Table (₦1,000,000)',
          subtitle: 'Paystack checkout for 10 guest seats',
          url: careerDinnerTablesData[0].paystackUrl,
          png: careerDinnerTablesData[0].qrCode,
          svg: careerDinnerTablesData[0].qrCodeSvg
        }
      : selectedQrType === 'signature'
      ? {
          title: 'Signature Table (₦3,000,000)',
          subtitle: 'Paystack checkout for elevated 10 guest seats',
          url: careerDinnerTablesData[1].paystackUrl,
          png: careerDinnerTablesData[1].qrCode,
          svg: careerDinnerTablesData[1].qrCodeSvg
        }
      : {
          title: 'Executive Table (₦5,000,000)',
          subtitle: 'Paystack checkout for VIP executive 10 guest seats',
          url: careerDinnerTablesData[2].paystackUrl,
          png: careerDinnerTablesData[2].qrCode,
          svg: careerDinnerTablesData[2].qrCodeSvg
        };

  return (
    <div className="min-h-screen bg-transparent text-[#141A19] flex flex-col selection:bg-[#0C7C7B] selection:text-white">
      {/* Sticky Dedicated Navigation Header */}
      <header className="sticky top-0 z-40 bg-[#EBF5F4]/94 backdrop-blur-xl border-b border-[#0C7C7B]/20 py-3.5 shadow-sm">
        <div className="container-custom flex items-center justify-between gap-4">
          {/* Logo & Back button */}
          <div className="flex items-center gap-3 sm:gap-6">
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

          {/* Quick Actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            <a
              href="#hospitality-tables"
              className="hidden md:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider text-[#0C7C7B] border border-[#0C7C7B]/25 hover:bg-[#EAF6F6] transition-all"
            >
              <Crown className="w-3 h-3 text-[#D99B26]" />
              <span>Host a Table (₦1M–₦5M)</span>
            </a>

            <button
              onClick={() => onOpenRegister('career-dinner-2026')}
              className="btn-accent !py-2 !px-4 !text-xs !uppercase !tracking-wider flex items-center gap-1.5 shadow-xs cursor-pointer"
            >
              <Calendar className="w-3 h-3 text-[#D99B26]" />
              <span>Reserve Seat / Table</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-grow pt-10 pb-24">
        {/* Gala Hero Invitation */}
        <section className="container-custom mb-16 sm:mb-20">
          <div className="max-w-4xl mx-auto text-center">
            {/* Breadcrumb Eyebrow */}
            <div className="flex items-center justify-center gap-2 text-[11px] text-[#6A7875] font-mono uppercase tracking-widest mb-4">
              <button
                onClick={onNavigateHome}
                className="hover:text-[#0C7C7B] transition-colors cursor-pointer"
              >
                The Talk Office
              </button>
              <span>/</span>
              <span className="text-[#0C7C7B] font-semibold">Flagship Gala 2026</span>
            </div>

            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/90 backdrop-blur-md border border-[#0C7C7B]/25 text-[#0C7C7B] text-xs font-semibold uppercase tracking-[0.16em] mb-4 shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-[#D99B26]" />
              <span>4th Annual Flagship Networking Gala</span>
            </div>

            <p className="font-mono text-xs uppercase tracking-[0.22em] text-[#6A7875] mb-2 font-medium">
              {careerDinnerInvitation.host}
            </p>

            <p className="text-xs sm:text-sm uppercase tracking-widest text-[#0C7C7B] font-semibold mb-3">
              {careerDinnerInvitation.taglineText}
            </p>

            <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-semibold text-[#141A19] tracking-tight mb-4">
              {careerDinnerInvitation.title}
            </h1>

            <div className="inline-block px-5 py-2 rounded-full bg-[#FAF3E0] border border-[#D99B26]/30 text-[#8E610A] text-xs sm:text-sm font-semibold tracking-wide mb-5 shadow-xs">
              Theme: <span className="text-[#141A19] font-bold">{careerDinnerInvitation.theme}</span>
            </div>

            <p className="text-sm sm:text-base text-[#52605E] max-w-2xl mx-auto leading-relaxed mb-7 font-sans">
              {careerDinnerInvitation.subDescription}
            </p>

            {/* Event Key Metadata Pills */}
            <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3 text-xs text-[#384846] font-medium max-w-3xl mx-auto mb-8">
              <div className="flex items-center gap-2 bg-white/90 backdrop-blur-md px-4 py-2.5 rounded-2xl border border-[#0C7C7B]/15 shadow-xs">
                <Calendar className="w-4 h-4 text-[#0C7C7B] shrink-0" />
                <span className="font-semibold">{careerDinnerInvitation.date}</span>
              </div>
              <div className="flex items-center gap-2 bg-white/90 backdrop-blur-md px-4 py-2.5 rounded-2xl border border-[#0C7C7B]/15 shadow-xs">
                <Clock className="w-4 h-4 text-[#0C7C7B] shrink-0" />
                <span>Red Carpet: 4:00 PM · Dinner: 5:30 PM</span>
              </div>
              <div className="flex items-center gap-2 bg-white/90 backdrop-blur-md px-4 py-2.5 rounded-2xl border border-[#0C7C7B]/15 shadow-xs">
                <MapPin className="w-4 h-4 text-[#0C7C7B] shrink-0" />
                <span>{careerDinnerInvitation.venue}</span>
              </div>
            </div>

            {/* Hero Quick Action Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-3.5">
              <a
                href="#hospitality-tables"
                className="btn-accent !py-3 !px-6 text-xs uppercase tracking-wider font-semibold flex items-center gap-2 shadow-md"
              >
                <Crown className="w-4 h-4 text-[#D99B26]" />
                <span>Choose Your Table (₦1M – ₦5M)</span>
              </a>

              <a
                href={careerDinnerInvitation.individualTicket.paystackUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary !py-3 !px-5 text-xs uppercase tracking-wider font-semibold flex items-center gap-2 bg-white/90 hover:bg-white"
              >
                <Ticket className="w-4 h-4 text-[#0C7C7B]" />
                <span>Individual Ticket (₦100k)</span>
                <ExternalLink className="w-3.5 h-3.5 opacity-70" />
              </a>

              <a
                href="#qr-share"
                className="px-4 py-3 rounded-full border border-[#0C7C7B]/25 text-[#0C7C7B] hover:bg-[#EAF6F6] text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5 transition-colors"
              >
                <QrCode className="w-4 h-4" />
                <span>Event QR Code</span>
              </a>
            </div>
          </div>
        </section>

        {/* Corporate Hospitality Options (Host Your Table) */}
        <section id="hospitality-tables" className="container-custom mb-16 sm:mb-20">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <span className="text-[10px] font-mono uppercase tracking-[0.22em] text-[#0C7C7B] font-bold block mb-1">
              {careerDinnerInvitation.sectionTitle}
            </span>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#141A19] mb-2.5">
              {careerDinnerInvitation.sectionSubtitle}
            </h2>
            <p className="text-xs sm:text-sm text-[#52605E] leading-relaxed max-w-2xl mx-auto">
              {careerDinnerInvitation.overviewIntro}
            </p>
          </div>

          {/* 3 Table Tiers Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-7 mb-12 items-stretch">
            {careerDinnerTablesData.map((table) => {
              const isSignature = table.highlight;
              const isExecutive = table.id === 'executive-table';

              return (
                <div
                  key={table.id}
                  className={`rounded-3xl p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 relative ${
                    isSignature
                      ? 'bg-gradient-to-b from-[#0A2E2B] to-[#113835] text-white border-2 border-[#2DD4BF]/50 shadow-xl shadow-[#0C7C7B]/20 lg:-translate-y-2'
                      : 'bg-white/95 backdrop-blur-md border border-[#0C7C7B]/20 text-[#141A19] shadow-md hover:shadow-lg hover:border-[#0C7C7B]/40'
                  }`}
                >
                  {/* Ribbons */}
                  {isSignature && (
                    <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-[#D99B26] to-[#C1871C] text-white text-[10px] font-bold uppercase tracking-widest shadow-md flex items-center gap-1.5 whitespace-nowrap">
                      <Sparkles className="w-3 h-3 text-white" />
                      <span>Most Popular Host Tier</span>
                    </div>
                  )}

                  {isExecutive && (
                    <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-[#141A19] text-[#2DD4BF] border border-[#2DD4BF]/30 text-[10px] font-bold uppercase tracking-widest shadow-md flex items-center gap-1.5 whitespace-nowrap">
                      <Crown className="w-3 h-3 text-[#D99B26]" />
                      <span>Pinnacle VIP Tier</span>
                    </div>
                  )}

                  <div>
                    {/* Header: Code & Capacity */}
                    <div className="flex items-center justify-between gap-2 mb-3 pt-1">
                      <div className="flex items-center gap-1.5">
                        <span
                          className={`w-6 h-6 rounded-lg text-xs font-bold font-mono flex items-center justify-center ${
                            isSignature
                              ? 'bg-[#2DD4BF]/20 text-[#2DD4BF]'
                              : 'bg-[#EAF6F6] text-[#0C7C7B]'
                          }`}
                        >
                          {table.code}
                        </span>
                        <span
                          className={`text-[11px] font-semibold uppercase tracking-wider ${
                            isSignature ? 'text-[#2DD4BF]' : 'text-[#0C7C7B]'
                          }`}
                        >
                          {table.badge}
                        </span>
                      </div>

                      <div
                        className={`flex items-center gap-1 text-[11px] font-medium px-2 py-0.5 rounded-full ${
                          isSignature
                            ? 'bg-white/10 text-white/90'
                            : 'bg-[#FAF8F5] text-[#52605E] border border-[#0C7C7B]/10'
                        }`}
                      >
                        <Users className="w-3 h-3 text-[#D99B26]" />
                        <span>{table.capacity}</span>
                      </div>
                    </div>

                    {/* Title & Price */}
                    <h3
                      className={`font-display text-xl sm:text-2xl font-bold mb-1 ${
                        isSignature ? 'text-white' : 'text-[#141A19]'
                      }`}
                    >
                      {table.title}
                    </h3>

                    <div className="flex items-baseline gap-1.5 mb-3">
                      <span
                        className={`text-2xl sm:text-3xl font-display font-bold tracking-tight ${
                          isSignature ? 'text-[#FAF8F5]' : 'text-[#0C7C7B]'
                        }`}
                      >
                        {table.priceFormatted}
                      </span>
                      <span
                        className={`text-xs ${
                          isSignature ? 'text-[#A5C7C3]' : 'text-[#6A7875]'
                        }`}
                      >
                        / table of 10
                      </span>
                    </div>

                    {/* Target Objective */}
                    <p
                      className={`text-xs leading-relaxed mb-5 pb-4 border-b ${
                        isSignature
                          ? 'text-[#C7E3DF] border-[#2DD4BF]/20'
                          : 'text-[#52605E] border-[#0C7C7B]/10'
                      }`}
                    >
                      {table.targetAudience}
                    </p>

                    {/* Package Includes List */}
                    <div
                      className={`text-[11px] font-semibold uppercase tracking-wider mb-3 ${
                        isSignature ? 'text-[#2DD4BF]' : 'text-[#141A19]'
                      }`}
                    >
                      {table.includesHeader}
                    </div>

                    <ul className="space-y-2 mb-6 text-xs">
                      {table.packageIncludes.map((item, pIdx) => (
                        <li key={pIdx} className="flex items-start gap-2 leading-relaxed">
                          <CheckCircle2
                            className={`w-3.5 h-3.5 shrink-0 mt-0.5 ${
                              isSignature ? 'text-[#2DD4BF]' : 'text-[#0C7C7B]'
                            }`}
                          />
                          <span
                            className={
                              isSignature ? 'text-white/90 text-[11.5px]' : 'text-[#445250] text-[11.5px]'
                            }
                          >
                            {item}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Actions */}
                  <div className="pt-4 border-t border-[#0C7C7B]/10 space-y-2.5">
                    <a
                      href={table.paystackUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`w-full py-2.5 px-4 rounded-xl font-semibold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-sm ${
                        isSignature
                          ? 'bg-gradient-to-r from-[#D99B26] to-[#C1871C] hover:from-[#E5A934] hover:to-[#D99B26] text-white shadow-md'
                          : 'bg-[#0C7C7B] hover:bg-[#08605F] text-white'
                      }`}
                    >
                      <Ticket className="w-3.5 h-3.5 text-white" />
                      <span>Host Table · Paystack ({table.priceFormatted})</span>
                      <ExternalLink className="w-3 h-3 opacity-80" />
                    </a>

                    <div className="grid grid-cols-2 gap-2">
                      <button
                        onClick={() => onOpenRegister('career-dinner-2026')}
                        className={`py-2 px-3 rounded-lg text-[11px] font-semibold transition-colors flex items-center justify-center gap-1 border cursor-pointer ${
                          isSignature
                            ? 'bg-white/10 hover:bg-white/15 text-white border-white/20'
                            : 'bg-[#FAF8F5] hover:bg-[#EAF6F6] text-[#0C7C7B] border-[#0C7C7B]/20'
                        }`}
                      >
                        <Building2 className="w-3 h-3" />
                        <span>Corporate Invoice</span>
                      </button>

                      <button
                        onClick={() => {
                          setSelectedQrType(
                            table.id === 'celebration-table'
                              ? 'celebration'
                              : table.id === 'signature-table'
                              ? 'signature'
                              : 'executive'
                          );
                          const el = document.getElementById('qr-share');
                          if (el) el.scrollIntoView({ behavior: 'smooth' });
                        }}
                        className={`py-2 px-3 rounded-lg text-[11px] font-semibold transition-colors flex items-center justify-center gap-1 border cursor-pointer ${
                          isSignature
                            ? 'bg-white/10 hover:bg-white/15 text-white border-white/20'
                            : 'bg-[#FAF8F5] hover:bg-[#EAF6F6] text-[#0C7C7B] border-[#0C7C7B]/20'
                        }`}
                      >
                        <QrCode className="w-3 h-3" />
                        <span>View QR Code</span>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Individual Seat Quick Reservation Callout */}
          <div className="bg-white/90 backdrop-blur-md rounded-3xl p-6 sm:p-7 border border-[#0C7C7B]/20 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-5 mb-12">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-[#EAF6F6] text-[#0C7C7B] flex items-center justify-center shrink-0">
                <Ticket className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#0C7C7B] font-semibold block">
                  Individual Delegate Seat
                </span>
                <h3 className="font-display text-lg sm:text-xl font-bold text-[#141A19]">
                  Single Ticket Pass · ₦100,000
                </h3>
                <p className="text-xs text-[#52605E]">
                  Full access to the Red Carpet, fine dining dinner experience, entertainment, and professional networking.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 shrink-0 w-full sm:w-auto">
              <a
                href={careerDinnerInvitation.individualTicket.paystackUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-accent !py-2.5 !px-5 text-xs uppercase tracking-wider font-semibold flex items-center justify-center gap-1.5 w-full sm:w-auto shadow-sm"
              >
                <span>Instant Paystack (₦100,000)</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>

          {/* Settlement & QR Code Dual Grid */}
          <div id="qr-share" className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            {/* Left: Zenith Bank Direct Remittance Card */}
            <div className="lg:col-span-6 bg-white/95 backdrop-blur-md rounded-3xl p-6 sm:p-7 border border-[#0C7C7B]/20 shadow-md flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-xl bg-[#EAF6F6] text-[#0C7C7B] flex items-center justify-center">
                      <Building2 className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-[10px] font-mono uppercase tracking-wider text-[#6A7875] block">
                        Direct Corporate Remittance
                      </span>
                      <h4 className="font-display text-base font-bold text-[#141A19]">
                        Zenith Bank Settlement
                      </h4>
                    </div>
                  </div>
                  <span className="badge-pill !bg-[#FAF3E0] !text-[#8E610A] !border-[#D99B26]/30 text-[10px]">
                    Zenith Bank Plc
                  </span>
                </div>

                <p className="text-xs text-[#52605E] mb-5 leading-relaxed">
                  Corporate entities wishing to process direct electronic fund transfers or treasury settlements may remit directly to our official corporate account:
                </p>

                {/* Account Details Box */}
                <div className="bg-[#FAF8F5] rounded-2xl p-4 sm:p-5 border border-[#0C7C7B]/15 space-y-3 mb-4">
                  <div className="flex items-center justify-between text-xs pb-2 border-b border-[#0C7C7B]/10">
                    <span className="text-[#6A7875]">Account Name:</span>
                    <span className="font-semibold text-[#141A19]">
                      {careerDinnerBankDetails.accountName}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-xs pb-2 border-b border-[#0C7C7B]/10">
                    <span className="text-[#6A7875]">Bank:</span>
                    <span className="font-semibold text-[#141A19]">
                      {careerDinnerBankDetails.bankName}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-xs">
                    <span className="text-[#6A7875]">Account Number:</span>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-base font-bold text-[#0C7C7B] tracking-wider">
                        {careerDinnerBankDetails.accountNumber}
                      </span>
                      <button
                        onClick={handleCopyAccount}
                        className="px-2.5 py-1 rounded-lg bg-white border border-[#0C7C7B]/25 hover:bg-[#0C7C7B] hover:text-white text-[#0C7C7B] text-[11px] font-semibold flex items-center gap-1 transition-all shadow-xs cursor-pointer"
                        title="Copy Account Number"
                      >
                        {copiedBank ? (
                          <>
                            <Check className="w-3 h-3 text-emerald-600" />
                            <span className="text-emerald-600">Copied!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3 h-3" />
                            <span>Copy</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>

                <p className="text-[11px] text-[#6A7875] leading-relaxed">
                  <strong>Narration Guide:</strong> {careerDinnerBankDetails.notes}
                </p>
              </div>

              {/* Support Helpline */}
              <div className="pt-4 mt-4 border-t border-[#0C7C7B]/10 flex flex-wrap items-center justify-between gap-3 text-xs">
                <span className="text-[#52605E]">Executive Helpdesk:</span>
                <div className="flex items-center gap-3 font-medium text-[#0C7C7B]">
                  <a href="tel:07033774156" className="hover:underline">
                    07033774156
                  </a>
                  <span>·</span>
                  <a href="tel:08166399901" className="hover:underline">
                    08166399901
                  </a>
                  <span>·</span>
                  <a href="mailto:hello@thetalkoffice.com" className="hover:underline">
                    hello@thetalkoffice.com
                  </a>
                </div>
              </div>
            </div>

            {/* Right: Dedicated Career Dinner Page QR Code Card */}
            <div className="lg:col-span-6 bg-gradient-to-br from-[#0A2E2B] to-[#12423E] rounded-3xl p-6 sm:p-7 text-white border border-[#2DD4BF]/30 shadow-md flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-xl bg-[#2DD4BF]/20 text-[#2DD4BF] flex items-center justify-center">
                      <QrCode className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-[10px] font-mono uppercase tracking-wider text-[#2DD4BF] block font-semibold">
                        Official Share & Scan Hub
                      </span>
                      <h4 className="font-display text-base font-bold text-white">
                        Career Dinner Page QR Code
                      </h4>
                    </div>
                  </div>

                  {/* Share button */}
                  <button
                    onClick={handleCopyPageUrl}
                    className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-[#2DD4BF] hover:text-white transition-colors cursor-pointer flex items-center gap-1 text-[11px]"
                    title="Copy Link to this Page"
                  >
                    {copiedPageUrl ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Share2 className="w-3.5 h-3.5" />}
                    <span>{copiedPageUrl ? 'Link Copied' : 'Share'}</span>
                  </button>
                </div>

                <p className="text-xs text-[#C7E3DF] mb-3 leading-relaxed">
                  Scan this high-definition QR code with any smartphone camera to open and share this dedicated Career Dinner invitation page directly:
                </p>

                {/* QR Selector Switcher */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5 p-1 bg-black/30 rounded-xl border border-white/10 mb-4">
                  {[
                    { id: 'page', label: 'Dinner Page (Official)' },
                    { id: 'event', label: '100k Seat Pass' },
                    { id: 'celebration', label: '1M Table' },
                    { id: 'signature', label: '3M Table' },
                    { id: 'executive', label: '5M Table' }
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setSelectedQrType(tab.id)}
                      className={`py-1.5 px-2 rounded-lg text-[10px] font-semibold transition-all cursor-pointer truncate ${
                        selectedQrType === tab.id
                          ? 'bg-[#2DD4BF] text-[#0A2E2B] shadow-xs font-bold'
                          : 'text-[#C7E3DF] hover:text-white hover:bg-white/10'
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>

                {/* QR Image Presentation */}
                <div className="bg-white rounded-2xl p-4 max-w-[210px] mx-auto shadow-inner text-center border-2 border-[#2DD4BF]/40 mb-3">
                  <img
                    src={currentQr.png}
                    alt={currentQr.title}
                    className="w-full h-auto object-contain mx-auto rounded-lg"
                  />
                  <p className="font-mono text-[9px] uppercase tracking-wider text-[#0C7C7B] font-bold mt-2">
                    {currentQr.title}
                  </p>
                </div>

                <p className="text-center font-mono text-[10px] text-[#A5C7C3] truncate max-w-xs mx-auto mb-3">
                  {currentQr.url}
                </p>
              </div>

              {/* Download Buttons for Current QR */}
              <div className="grid grid-cols-2 gap-2 pt-2 border-t border-white/15">
                <a
                  href={currentQr.png}
                  download={`${selectedQrType}-qr-code.png`}
                  className="py-2 px-3 rounded-xl bg-[#2DD4BF] hover:bg-[#14B8A6] text-[#0A2E2B] text-xs font-bold flex items-center justify-center gap-1.5 transition-colors"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download PNG</span>
                </a>

                <a
                  href={currentQr.svg}
                  download={`${selectedQrType}-qr-code.svg`}
                  className="py-2 px-3 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors border border-white/15"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download SVG</span>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Retrospective: Moments from Past Career Dinners */}
        {pastDinnerPhotos.length > 0 && (
          <section className="container-custom mb-16">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
              <div>
                <div className="inline-flex items-center gap-1.5 text-xs uppercase font-mono tracking-widest text-[#0C7C7B] font-semibold mb-2">
                  <Camera className="w-3.5 h-3.5" />
                  <span>Archival Visual Record</span>
                </div>
                <h3 className="font-display text-2xl font-bold text-[#141A19]">
                  Highlights from Past Career Dinners (2023–2025)
                </h3>
              </div>

              <button
                onClick={onNavigateGallery}
                className="text-xs font-semibold text-[#0C7C7B] hover:underline flex items-center gap-1 cursor-pointer shrink-0"
              >
                <span>View Full Photo Archive</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {pastDinnerPhotos.map((photo, idx) => (
                <div
                  key={photo.id}
                  onClick={() => handleOpenLightbox(idx)}
                  className="group relative rounded-2xl overflow-hidden aspect-[4/3] bg-[#E2ECE9] border border-[#0C7C7B]/15 cursor-pointer shadow-xs hover:shadow-md transition-all duration-300"
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
                  <div className="absolute top-2 left-2">
                    <span className="px-2 py-0.5 rounded-md bg-[#141A19]/80 backdrop-blur-md text-white text-[9px] font-mono uppercase tracking-wider">
                      {photo.edition}
                    </span>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-2.5 text-white">
                    <span className="text-[11px] font-medium truncate">{photo.caption}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Bottom Return & Contact Bar */}
        <section className="container-custom">
          <div className="p-6 sm:p-8 rounded-3xl bg-white/90 backdrop-blur-md border border-[#0C7C7B]/20 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="text-center sm:text-left">
              <h4 className="font-display text-lg font-bold text-[#141A19] mb-1">
                Have questions about corporate seating or custom sponsorship?
              </h4>
              <p className="text-xs text-[#52605E]">
                Our executive hospitality team is available to assist with table layout, brand alignment, and guest coordination.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <button
                onClick={() => onOpenRegister('career-dinner-2026')}
                className="btn-accent !py-2.5 !px-5 text-xs uppercase tracking-wider font-semibold shadow-sm cursor-pointer"
              >
                Inquire / Register
              </button>
              <button
                onClick={onNavigateHome}
                className="px-4 py-2.5 rounded-full border border-[#0C7C7B]/25 text-[#384846] hover:text-[#0C7C7B] text-xs font-semibold uppercase tracking-wider hover:bg-[#EAF6F6] transition-colors cursor-pointer"
              >
                Return to Homepage
              </button>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <Footer onNavigate={onNavigateHome} />

      {/* Interactive Lightbox Modal */}
      <LightboxModal
        isOpen={lightbox.isOpen}
        photos={lightbox.photos}
        currentIndex={lightbox.currentIndex}
        onClose={() => setLightbox((prev) => ({ ...prev, isOpen: false }))}
        onPrev={() =>
          setLightbox((prev) => ({
            ...prev,
            currentIndex:
              prev.currentIndex === 0 ? prev.photos.length - 1 : prev.currentIndex - 1
          }))
        }
        onNext={() =>
          setLightbox((prev) => ({
            ...prev,
            currentIndex:
              prev.currentIndex === prev.photos.length - 1 ? 0 : prev.currentIndex + 1
          }))
        }
      />
    </div>
  );
}
