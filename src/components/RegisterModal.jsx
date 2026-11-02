import React, { useState, useEffect } from 'react';
import {
  Calendar,
  X,
  CheckCircle2,
  Ticket,
  Sparkles,
  ExternalLink,
  Phone,
  Mail,
  MapPin,
  Clock,
  Building2,
  Copy,
  Check,
  QrCode
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { careerDinnerBankDetails } from '../data/programsData';

const careerDinnerTierMap = {
  'Individual Ticket (₦100,000)': {
    name: 'Individual Delegate Seat',
    price: '₦100,000',
    paystackUrl: 'https://paystack.shop/pay/careerdinner26',
    qrCode: '/images/career-dinner-qr.png',
    desc: 'Access for 1 professional to the full Career Dinner experience.'
  },
  'Celebration Table (₦1,000,000)': {
    name: 'Celebration Table (Code M)',
    price: '₦1,000,000',
    paystackUrl: 'https://paystack.shop/pay/careerdinner26t1',
    qrCode: '/images/qr/career-dinner-1m-celebration-qr.png',
    desc: 'Table for 10 guests. Appreciate your people and celebrate the year\'s work.'
  },
  'Signature Table (₦3,000,000)': {
    name: 'Signature Table (Code N)',
    price: '₦3,000,000',
    paystackUrl: 'https://paystack.shop/pay/careerdinner26t2',
    qrCode: '/images/qr/career-dinner-3m-signature-qr.png',
    desc: 'Elevated experience for 10 guests. Premium placement, branded tags & souvenirs, backdrop logo.'
  },
  'Executive Table (₦5,000,000)': {
    name: 'Executive Table (Code O)',
    price: '₦5,000,000',
    paystackUrl: 'https://paystack.shop/pay/careerdinner26t3',
    qrCode: '/images/qr/career-dinner-5m-executive-qr.png',
    desc: 'The pinnacle table for 10. Best placement, 5-min speaking remark, 3 major media features, executive introductions.'
  }
};

export default function RegisterModal({ isOpen, onClose, initialEventSlug }) {
  const [eventSlug, setEventSlug] = useState(initialEventSlug || 'career-dinner-2026');
  const [ticketType, setTicketType] = useState('Individual Ticket (₦100,000)');
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    organization: '',
    role: '',
    notes: ''
  });
  const [loading, setLoading] = useState(false);
  const [successData, setSuccessData] = useState(null);
  const [errorMsg, setErrorMsg] = useState('');
  const [copiedBank, setCopiedBank] = useState(false);

  useEffect(() => {
    if (initialEventSlug) {
      setEventSlug(initialEventSlug);
      if (initialEventSlug === 'career-dinner-2026') {
        setTicketType('Individual Ticket (₦100,000)');
      } else {
        setTicketType('Standard Delegate');
      }
    }
  }, [initialEventSlug]);

  if (!isOpen) return null;

  const isCareerDinner = eventSlug === 'career-dinner-2026';
  const currentTierInfo = isCareerDinner ? careerDinnerTierMap[ticketType] : null;

  const handleCopyAccount = () => {
    navigator.clipboard.writeText(careerDinnerBankDetails.accountNumber);
    setCopiedBank(true);
    setTimeout(() => setCopiedBank(false), 2000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');

    try {
      const res = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          eventSlug,
          ticketType
        })
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setSuccessData(data.data);
        confetti({
          particleCount: 70,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#0C7C7B', '#2DD4BF', '#D99B26', '#141A19']
        });
      } else {
        setErrorMsg(data.error || 'Failed to submit registration. Please try again.');
      }
    } catch (err) {
      setErrorMsg('Network error. Please check your connection.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-content bg-white max-w-lg w-full rounded-3xl p-5 sm:p-7 border border-[#0C7C7B]/20 shadow-2xl relative max-h-[92vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-[#FAF8F5] text-[#141A19] hover:bg-[#0C7C7B] hover:text-white flex items-center justify-center transition-colors z-10 cursor-pointer"
          aria-label="Close Modal"
        >
          <X className="w-4 h-4" />
        </button>

        {successData ? (
          <div className="text-center py-4">
            <div className="w-14 h-14 rounded-full bg-[#EAF6F6] text-[#0C7C7B] flex items-center justify-center mx-auto mb-3 border border-[#0C7C7B]/25">
              <CheckCircle2 className="w-7 h-7" />
            </div>

            <span className="badge-pill mb-2 !bg-[#EAF6F6] !text-[#0C7C7B] !border-[#0C7C7B]/25 text-[10px]">
              Registration Confirmed
            </span>
            <h3 className="font-display text-xl sm:text-2xl font-bold text-[#141A19] mb-1">
              Welcome, {successData.fullName}
            </h3>
            <p className="text-xs text-[#52605E] mb-5">
              Your registration has been officially recorded.
            </p>

            <div className="bg-[#FAF8F5] rounded-2xl p-4 border border-[#0C7C7B]/15 text-left space-y-2 mb-5 text-xs">
              <div className="flex justify-between pb-1.5 border-b border-[#0C7C7B]/10">
                <span className="text-[#6A7875]">Registration ID:</span>
                <span className="font-mono font-bold text-[#141A19]">{successData.registrationId}</span>
              </div>
              <div className="flex justify-between pb-1.5 border-b border-[#0C7C7B]/10">
                <span className="text-[#6A7875]">Event:</span>
                <span className="font-semibold text-[#141A19]">{successData.eventName}</span>
              </div>
              <div className="flex justify-between pb-1.5 border-b border-[#0C7C7B]/10">
                <span className="text-[#6A7875]">Delegate Tier:</span>
                <span className="font-semibold text-[#0C7C7B]">{successData.ticketType}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#6A7875]">Confirmation Sent To:</span>
                <span className="font-mono text-[#141A19]">{successData.email}</span>
              </div>
            </div>

            {/* If Career Dinner, Show Chosen Payment Details */}
            {isCareerDinner && currentTierInfo && (
              <div className="mb-5 p-4 rounded-2xl bg-[#FAF3E0] border border-[#D99B26]/30 text-left">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-bold text-[#8E610A] flex items-center gap-1.5">
                    <Ticket className="w-3.5 h-3.5 text-[#B47B16]" />
                    {currentTierInfo.name} ({currentTierInfo.price})
                  </span>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-[#B47B16]">
                    Instant Paystack
                  </span>
                </div>
                <p className="text-xs text-[#634812] mb-3 leading-relaxed">
                  To finalize and guarantee your allocation immediately, complete checkout on Paystack or remit via Zenith Bank.
                </p>

                <a
                  href={currentTierInfo.paystackUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-accent !w-full !py-2.5 text-xs uppercase tracking-wider font-semibold flex items-center justify-center gap-2 shadow-sm mb-3"
                >
                  <Ticket className="w-3.5 h-3.5 text-[#D99B26]" />
                  Pay with Paystack ({currentTierInfo.price})
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>

                {/* Bank Transfer Details Box */}
                <div className="bg-white/80 rounded-xl p-3 border border-[#D99B26]/20 text-[11px] text-[#42310C]">
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-semibold">Bank: {careerDinnerBankDetails.bankName}</span>
                    <button
                      onClick={handleCopyAccount}
                      className="px-2 py-0.5 rounded bg-white border border-[#D99B26]/30 hover:bg-[#D99B26] hover:text-white text-[#8E610A] font-medium flex items-center gap-1 transition-colors"
                    >
                      {copiedBank ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                      <span>{copiedBank ? 'Copied' : 'Copy'}</span>
                    </button>
                  </div>
                  <div>Account Name: <strong className="font-medium">{careerDinnerBankDetails.accountName}</strong></div>
                  <div>Account Number: <strong className="font-mono font-bold text-[#0C7C7B]">{careerDinnerBankDetails.accountNumber}</strong></div>
                </div>
              </div>
            )}

            <button
              onClick={onClose}
              className="btn-secondary !w-full !py-2.5 text-xs uppercase tracking-wider font-semibold"
            >
              Done & Return to Site
            </button>
          </div>
        ) : (
          <div>
            <div className="mb-4">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-7 h-7 rounded-lg bg-white border border-[#0C7C7B]/20 flex items-center justify-center p-0.5 overflow-hidden shadow-xs">
                  <img
                    src="/images/logo/tto-logo-icon-1.jpeg"
                    alt="Logo"
                    className="w-full h-full object-cover rounded"
                    onError={(e) => { e.currentTarget.src = '/talk-logo.png'; }}
                  />
                </div>
                <span className="badge-pill !bg-[#EAF6F6] !text-[#0C7C7B] !border-[#0C7C7B]/25 text-[10px]">
                  <Calendar className="w-3 h-3" />
                  Delegate & Table Registration
                </span>
              </div>
              <h3 className="font-display text-xl sm:text-2xl font-bold text-[#141A19]">
                {isCareerDinner ? 'Career Dinner 2026 Reservation' : 'Reserve Your Seat'}
              </h3>
              <p className="text-xs text-[#52605E] mt-0.5">
                {isCareerDinner
                  ? 'Theme: Celebrating the Work. Honouring the Journey.'
                  : 'Join senior professionals, changemakers, and executives at The Talk Office sessions.'}
              </p>
            </div>

            {/* Career Dinner 2026 Event Banner */}
            {isCareerDinner && (
              <div className="mb-4 p-3.5 rounded-2xl bg-gradient-to-br from-[#0A2E2B] to-[#12423E] text-white border border-[#2DD4BF]/30 shadow-sm">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[9px] uppercase font-mono tracking-widest text-[#2DD4BF] font-semibold">
                    The Talk Office Flagship Gala
                  </span>
                  <span className="text-[11px] font-bold text-[#FAF8F5] bg-[#D99B26] px-2 py-0.5 rounded-full shadow-xs">
                    Wed, 16 Dec 2026
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-[11px] text-[#C7E3DF] mb-2.5">
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-3 h-3 text-[#2DD4BF] shrink-0" />
                    <span>Red Carpet: 4:00 PM · Dinner: 5:30 PM</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-3 h-3 text-[#2DD4BF] shrink-0" />
                    <span className="truncate">The Signature by Wells Carlton, Abuja</span>
                  </div>
                </div>

                {currentTierInfo && (
                  <a
                    href={currentTierInfo.paystackUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2 px-3 rounded-xl bg-gradient-to-r from-[#D99B26] to-[#C1871C] hover:from-[#E5A934] hover:to-[#D99B26] text-white font-semibold text-[11px] uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-xs transition-all"
                  >
                    <Ticket className="w-3.5 h-3.5 text-white" />
                    <span>Checkout: {currentTierInfo.name} ({currentTierInfo.price})</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                )}
              </div>
            )}

            {errorMsg && (
              <div className="p-2.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs mb-3">
                {errorMsg}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <label className="block text-[11px] font-semibold text-[#141A19] uppercase tracking-wider mb-1">
                  Select Event / Gathering *
                </label>
                <select
                  value={eventSlug}
                  onChange={(e) => {
                    const newSlug = e.target.value;
                    setEventSlug(newSlug);
                    if (newSlug === 'career-dinner-2026') {
                      setTicketType('Individual Ticket (₦100,000)');
                    } else {
                      setTicketType('Standard Delegate');
                    }
                  }}
                  className="w-full px-3 py-2 rounded-xl border border-[#0C7C7B]/20 bg-[#FAF8F5] focus:bg-white focus:outline-none focus:border-[#0C7C7B] focus:ring-1 focus:ring-[#0C7C7B]/20 text-xs text-[#141A19] transition-all"
                >
                  <option value="career-dinner-2026">
                    Career Dinner 2026 (Wed, 16 Dec · The Signature Abuja)
                  </option>
                  <option value="hips-kigali-2027">
                    HIPS Kigali — Tour & Masterclass (March 2027 · Rwanda)
                  </option>
                  <option value="the-talk-table">
                    The Talk Table — Executive Salon (Winter Cohort)
                  </option>
                  <option value="hips-nigeria-2027">
                    HIPS Annual Seminar (2027 Cohorts · Abuja / Lagos)
                  </option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-[#141A19] uppercase tracking-wider mb-1">
                  Hosting / Registration Tier *
                </label>
                <div className="grid grid-cols-2 gap-1.5">
                  {(isCareerDinner
                    ? [
                        'Individual Ticket (₦100,000)',
                        'Celebration Table (₦1,000,000)',
                        'Signature Table (₦3,000,000)',
                        'Executive Table (₦5,000,000)',
                        'Sponsorship / Partner'
                      ]
                    : ['Standard Delegate', 'Executive / VIP Pass']
                  ).map((tier) => (
                    <button
                      type="button"
                      key={tier}
                      onClick={() => setTicketType(tier)}
                      className={`p-2 rounded-xl text-[11px] font-semibold border text-center transition-all ${
                        ticketType === tier
                          ? 'bg-[#0C7C7B] text-white border-[#0C7C7B] shadow-xs'
                          : 'bg-[#FAF8F5] text-[#52605E] border-[#0C7C7B]/15 hover:border-[#0C7C7B]/40'
                      }`}
                    >
                      {tier}
                    </button>
                  ))}
                </div>
              </div>

              {/* Bank Settlement Quick Pill for Career Dinner */}
              {isCareerDinner && (
                <div className="p-2.5 rounded-xl bg-[#FAF8F5] border border-[#0C7C7B]/15 text-[11px] text-[#52605E] flex items-center justify-between gap-2">
                  <div className="flex items-center gap-1.5">
                    <Building2 className="w-3.5 h-3.5 text-[#0C7C7B] shrink-0" />
                    <span>Zenith Bank: <strong>1019925375</strong> (The Talk Office)</span>
                  </div>
                  <button
                    type="button"
                    onClick={handleCopyAccount}
                    className="px-2 py-0.5 rounded bg-white border border-[#0C7C7B]/25 text-[#0C7C7B] hover:bg-[#0C7C7B] hover:text-white transition-colors cursor-pointer shrink-0"
                  >
                    {copiedBank ? 'Copied' : 'Copy'}
                  </button>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <div>
                  <label className="block text-[11px] font-semibold text-[#141A19] uppercase tracking-wider mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    placeholder="e.g. Nkem Okafor"
                    className="w-full px-3 py-1.5 rounded-xl border border-[#0C7C7B]/20 bg-[#FAF8F5] text-xs text-[#141A19] focus:bg-white focus:outline-none focus:border-[#0C7C7B] focus:ring-1 focus:ring-[#0C7C7B]/20 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-[#141A19] uppercase tracking-wider mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="nkem@domain.com"
                    className="w-full px-3 py-1.5 rounded-xl border border-[#0C7C7B]/20 bg-[#FAF8F5] text-xs text-[#141A19] focus:bg-white focus:outline-none focus:border-[#0C7C7B] focus:ring-1 focus:ring-[#0C7C7B]/20 transition-all"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <div>
                  <label className="block text-[11px] font-semibold text-[#141A19] uppercase tracking-wider mb-1">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="0802 345 6789"
                    className="w-full px-3 py-1.5 rounded-xl border border-[#0C7C7B]/20 bg-[#FAF8F5] text-xs text-[#141A19] focus:bg-white focus:outline-none focus:border-[#0C7C7B] focus:ring-1 focus:ring-[#0C7C7B]/20 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-[#141A19] uppercase tracking-wider mb-1">
                    Organization & Title
                  </label>
                  <input
                    type="text"
                    value={formData.organization}
                    onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                    placeholder="e.g. Lead Director, Zenith"
                    className="w-full px-3 py-1.5 rounded-xl border border-[#0C7C7B]/20 bg-[#FAF8F5] text-xs text-[#141A19] focus:bg-white focus:outline-none focus:border-[#0C7C7B] focus:ring-1 focus:ring-[#0C7C7B]/20 transition-all"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="btn-accent !w-full !py-2.5 text-xs uppercase tracking-wider font-semibold mt-1 shadow-sm"
              >
                {loading ? 'Submitting Reservation...' : 'Submit Reservation'}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
