import React, { useState } from 'react';
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
  ShieldCheck,
  Share2
} from 'lucide-react';
import {
  careerDinnerTablesData,
  careerDinnerBankDetails,
  careerDinnerInvitation
} from '../data/programsData';

export default function CareerDinnerTables({ onOpenRegister }) {
  const [copied, setCopied] = useState(false);
  const [selectedQrTier, setSelectedQrTier] = useState('event');
  const [qrModalOpen, setQrModalOpen] = useState(false);

  const handleCopyAccount = () => {
    navigator.clipboard.writeText(careerDinnerBankDetails.accountNumber);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const currentQr =
    selectedQrTier === 'event'
      ? {
          title: 'Career Dinner 2026 (General / Individual ₦100k)',
          url: careerDinnerInvitation.individualTicket.paystackUrl,
          png: '/images/career-dinner-qr.png',
          svg: '/images/career-dinner-qr.svg'
        }
      : selectedQrTier === 'celebration'
      ? {
          title: 'Celebration Table (₦1,000,000)',
          url: careerDinnerTablesData[0].paystackUrl,
          png: careerDinnerTablesData[0].qrCode,
          svg: careerDinnerTablesData[0].qrCodeSvg
        }
      : selectedQrTier === 'signature'
      ? {
          title: 'Signature Table (₦3,000,000)',
          url: careerDinnerTablesData[1].paystackUrl,
          png: careerDinnerTablesData[1].qrCode,
          svg: careerDinnerTablesData[1].qrCodeSvg
        }
      : {
          title: 'Executive Table (₦5,000,000)',
          url: careerDinnerTablesData[2].paystackUrl,
          png: careerDinnerTablesData[2].qrCode,
          svg: careerDinnerTablesData[2].qrCodeSvg
        };

  return (
    <section id="tables" className="py-20 sm:py-24 relative overflow-hidden bg-gradient-to-b from-[#E7F3F2]/90 via-[#F4FAF9] to-transparent">
      {/* Soft Ambient Glows */}
      <div className="absolute top-10 left-1/3 w-[550px] h-[450px] bg-gradient-to-br from-[#0C7C7B]/15 via-[#2DD4BF]/10 to-transparent blur-[140px] pointer-events-none -z-10" />
      <div className="absolute bottom-10 right-10 w-[550px] h-[450px] bg-gradient-to-tl from-[#D99B26]/15 via-[#0C7C7B]/10 to-transparent blur-[140px] pointer-events-none -z-10" />

      <div className="container-custom">
        {/* Formal Invitation Card Header */}
        <div className="max-w-4xl mx-auto text-center mb-12 sm:mb-16">
          {/* Eyebrow Invitation Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/90 backdrop-blur-md border border-[#0C7C7B]/20 text-[#0C7C7B] text-[11px] font-semibold uppercase tracking-[0.16em] mb-4 shadow-xs">
            <Crown className="w-3.5 h-3.5 text-[#D99B26]" />
            <span>Official Corporate Invitation</span>
          </div>

          <p className="font-mono text-xs uppercase tracking-[0.2em] text-[#6A7875] mb-2 font-medium">
            {careerDinnerInvitation.host}
          </p>

          <p className="text-xs sm:text-sm uppercase tracking-widest text-[#0C7C7B] font-semibold mb-3">
            {careerDinnerInvitation.taglineText}
          </p>

          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-semibold text-[#141A19] tracking-tight mb-3">
            {careerDinnerInvitation.title}
          </h2>

          <div className="inline-block px-4 py-1.5 rounded-full bg-[#FAF3E0] border border-[#D99B26]/30 text-[#8E610A] text-xs font-semibold tracking-wide mb-4 shadow-xs">
            Theme: <span className="text-[#141A19] font-bold">{careerDinnerInvitation.theme}</span>
          </div>

          <p className="text-xs sm:text-sm text-[#52605E] max-w-2xl mx-auto leading-relaxed mb-6 font-sans">
            {careerDinnerInvitation.subDescription}
          </p>

          {/* Event Metadata Strip */}
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-xs text-[#384846] font-medium max-w-3xl mx-auto">
            <div className="flex items-center gap-2 bg-white/90 backdrop-blur-md px-3.5 py-2 rounded-xl border border-[#0C7C7B]/15 shadow-xs">
              <Calendar className="w-3.5 h-3.5 text-[#0C7C7B] shrink-0" />
              <span>{careerDinnerInvitation.date}</span>
            </div>
            <div className="flex items-center gap-2 bg-white/90 backdrop-blur-md px-3.5 py-2 rounded-xl border border-[#0C7C7B]/15 shadow-xs">
              <Clock className="w-3.5 h-3.5 text-[#0C7C7B] shrink-0" />
              <span>Red Carpet: 4:00 PM · Dinner: 5:30 PM</span>
            </div>
            <div className="flex items-center gap-2 bg-white/90 backdrop-blur-md px-3.5 py-2 rounded-xl border border-[#0C7C7B]/15 shadow-xs">
              <MapPin className="w-3.5 h-3.5 text-[#0C7C7B] shrink-0" />
              <span>{careerDinnerInvitation.venue}</span>
            </div>
          </div>
        </div>

        {/* Section Lead-in */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-[10px] font-mono uppercase tracking-[0.22em] text-[#0C7C7B] font-bold block mb-1">
            {careerDinnerInvitation.sectionTitle}
          </span>
          <h3 className="font-display text-xl sm:text-2xl font-bold text-[#141A19] mb-2">
            {careerDinnerInvitation.sectionSubtitle}
          </h3>
          <p className="text-xs text-[#52605E] leading-relaxed">
            {careerDinnerInvitation.overviewIntro}
          </p>
        </div>

        {/* 3 Table Categories Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-7 mb-12 items-stretch">
          {careerDinnerTablesData.map((table, idx) => {
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
                {/* Popular / Signature Host Ribbon */}
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
                  {/* Category Code & Badge */}
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
                  <h4
                    className={`font-display text-xl sm:text-2xl font-bold mb-1 ${
                      isSignature ? 'text-white' : 'text-[#141A19]'
                    }`}
                  >
                    {table.title}
                  </h4>

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

                  {/* Package Inclusions Header */}
                  <div
                    className={`text-[11px] font-semibold uppercase tracking-wider mb-3 ${
                      isSignature ? 'text-[#2DD4BF]' : 'text-[#141A19]'
                    }`}
                  >
                    {table.includesHeader}
                  </div>

                  {/* Bullet points */}
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
                      className={`py-2 px-3 rounded-lg text-[11px] font-semibold transition-colors flex items-center justify-center gap-1 border ${
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
                        setSelectedQrTier(
                          table.id === 'celebration-table'
                            ? 'celebration'
                            : table.id === 'signature-table'
                            ? 'signature'
                            : 'executive'
                        );
                        setQrModalOpen(true);
                      }}
                      className={`py-2 px-3 rounded-lg text-[11px] font-semibold transition-colors flex items-center justify-center gap-1 border ${
                        isSignature
                          ? 'bg-white/10 hover:bg-white/15 text-white border-white/20'
                          : 'bg-[#FAF8F5] hover:bg-[#EAF6F6] text-[#0C7C7B] border-[#0C7C7B]/20'
                      }`}
                    >
                      <QrCode className="w-3 h-3" />
                      <span>Scan QR Code</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Payment & Facilitation Drawer: Bank Details & Event QR Code */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* Left: Zenith Bank Direct Transfer Card */}
          <div className="lg:col-span-7 bg-white/95 backdrop-blur-md rounded-3xl p-6 sm:p-7 border border-[#0C7C7B]/20 shadow-md flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-[#EAF6F6] text-[#0C7C7B] flex items-center justify-center">
                    <Building2 className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-[#6A7875] block">
                      Direct Corporate Settlement
                    </span>
                    <h4 className="font-display text-base font-bold text-[#141A19]">
                      Bank Transfer Option
                    </h4>
                  </div>
                </div>
                <span className="badge-pill !bg-[#FAF3E0] !text-[#8E610A] !border-[#D99B26]/30 text-[10px]">
                  Zenith Bank Plc
                </span>
              </div>

              <p className="text-xs text-[#52605E] mb-5 leading-relaxed">
                Organisations opting for corporate electronic fund transfers or treasury settlements may remit directly to our official corporate account below:
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
                      {copied ? (
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
              <span className="text-[#52605E]">Executive Desk:</span>
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

          {/* Right: Career Dinner QR Code & Quick Scan Showcase */}
          <div className="lg:col-span-5 bg-gradient-to-br from-[#0A2E2B] to-[#12423E] rounded-3xl p-6 sm:p-7 text-white border border-[#2DD4BF]/30 shadow-md flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-[#2DD4BF]/20 text-[#2DD4BF] flex items-center justify-center">
                    <QrCode className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-[#2DD4BF] block font-semibold">
                      Instant Mobile Checkout
                    </span>
                    <h4 className="font-display text-base font-bold text-white">
                      Career Dinner 2026 QR Code
                    </h4>
                  </div>
                </div>

                <a
                  href="/images/career-dinner-qr.png"
                  download="career-dinner-2026-qr.png"
                  className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-[#2DD4BF] hover:text-white transition-colors"
                  title="Download Official Event QR Code"
                >
                  <Download className="w-3.5 h-3.5" />
                </a>
              </div>

              <p className="text-xs text-[#C7E3DF] mb-4 leading-relaxed">
                Scan this high-definition QR code directly with your smartphone camera to access instant Paystack ticket checkout or corporate reservation.
              </p>

              {/* QR Code Presentation Box */}
              <div className="bg-white rounded-2xl p-4 max-w-[210px] mx-auto shadow-inner text-center border-2 border-[#2DD4BF]/40 mb-4">
                <img
                  src="/images/career-dinner-qr.png"
                  alt="Career Dinner 2026 Official QR Code"
                  className="w-full h-auto object-contain mx-auto rounded-lg"
                />
                <p className="font-mono text-[9px] uppercase tracking-wider text-[#0C7C7B] font-bold mt-2">
                  Career Dinner 2026 · Official Pass
                </p>
              </div>

              {/* Individual Ticket Quick Callout */}
              <div className="bg-white/10 rounded-xl p-3 border border-white/15 text-center">
                <span className="text-[11px] text-white/80 block mb-1">
                  Looking for individual guest tickets?
                </span>
                <a
                  href={careerDinnerInvitation.individualTicket.paystackUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[#D99B26] hover:text-[#F3BE58] underline underline-offset-2 transition-colors"
                >
                  <Ticket className="w-3 h-3" />
                  <span>Get Individual Delegate Ticket (₦100,000) &rarr;</span>
                </a>
              </div>
            </div>

            <div className="pt-3 mt-3 border-t border-white/15 text-center">
              <button
                onClick={() => {
                  setSelectedQrTier('event');
                  setQrModalOpen(true);
                }}
                className="text-[11px] text-[#2DD4BF] hover:text-white underline underline-offset-2 transition-colors inline-flex items-center gap-1"
              >
                <span>View Fullscreen QR & Download Options</span>
                <ChevronRight className="w-3 h-3" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Dedicated Interactive QR Code Modal */}
      {qrModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
          onClick={() => setQrModalOpen(false)}
        >
          <div
            className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full border border-[#0C7C7B]/20 shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="text-center mb-4">
              <span className="badge-pill !bg-[#EAF6F6] !text-[#0C7C7B] !border-[#0C7C7B]/25 text-[10px] mb-2">
                Official Event QR Scanner
              </span>
              <h3 className="font-display text-xl font-bold text-[#141A19]">
                Career Dinner 2026 QR Code
              </h3>
              <p className="text-xs text-[#52605E] mt-1">
                Scan with any smartphone camera to launch checkout
              </p>
            </div>

            {/* QR Switcher Tabs */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 p-1 bg-[#FAF8F5] rounded-xl border border-[#0C7C7B]/15 mb-4">
              {[
                { id: 'event', label: '100k Seat' },
                { id: 'celebration', label: '1M Table' },
                { id: 'signature', label: '3M Table' },
                { id: 'executive', label: '5M Table' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setSelectedQrTier(tab.id)}
                  className={`py-1.5 px-2 rounded-lg text-[10px] font-semibold transition-all ${
                    selectedQrTier === tab.id
                      ? 'bg-[#0C7C7B] text-white shadow-xs'
                      : 'text-[#52605E] hover:text-[#141A19]'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* QR Preview Box */}
            <div className="bg-[#FAF8F5] rounded-2xl p-5 border border-[#0C7C7B]/15 text-center mb-5">
              <div className="bg-white rounded-xl p-3 inline-block shadow-sm border border-[#0C7C7B]/10 max-w-[220px]">
                <img
                  src={currentQr.png}
                  alt={currentQr.title}
                  className="w-full h-auto object-contain mx-auto rounded"
                />
              </div>
              <p className="font-display font-semibold text-xs text-[#141A19] mt-2.5">
                {currentQr.title}
              </p>
              <p className="font-mono text-[10px] text-[#6A7875] truncate max-w-xs mx-auto">
                {currentQr.url}
              </p>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-2 gap-2 mb-3">
              <a
                href={currentQr.png}
                download={`${selectedQrTier}-qr-code.png`}
                className="py-2.5 px-3 rounded-xl bg-[#0C7C7B] hover:bg-[#08605F] text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download PNG</span>
              </a>

              <a
                href={currentQr.svg}
                download={`${selectedQrTier}-qr-code.svg`}
                className="py-2.5 px-3 rounded-xl bg-[#FAF8F5] hover:bg-[#EAF6F6] text-[#0C7C7B] border border-[#0C7C7B]/25 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download SVG</span>
              </a>
            </div>

            <button
              onClick={() => setQrModalOpen(false)}
              className="w-full py-2.5 text-xs font-semibold text-[#52605E] hover:text-[#141A19] transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
