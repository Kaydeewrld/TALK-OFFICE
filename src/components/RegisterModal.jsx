import React, { useState, useEffect } from 'react';
import { Calendar, X, CheckCircle2, Ticket, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function RegisterModal({ isOpen, onClose, initialEventSlug }) {
  const [eventSlug, setEventSlug] = useState(initialEventSlug || 'career-dinner-2026');
  const [ticketType, setTicketType] = useState('Standard Delegate');
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

  useEffect(() => {
    if (initialEventSlug) {
      setEventSlug(initialEventSlug);
    }
  }, [initialEventSlug]);

  if (!isOpen) return null;

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
        className="modal-content bg-white max-w-lg w-full rounded-3xl p-7 sm:p-10 border border-[#0C7C7B]/20 shadow-2xl relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 w-9 h-9 rounded-full bg-[#FAF8F5] text-[#141A19] hover:bg-[#0C7C7B] hover:text-white flex items-center justify-center transition-colors"
          aria-label="Close Modal"
        >
          <X className="w-4 h-4" />
        </button>

        {successData ? (
          <div className="text-center py-6">
            <div className="w-16 h-16 rounded-full bg-[#EAF6F6] text-[#0C7C7B] flex items-center justify-center mx-auto mb-4 border border-[#0C7C7B]/25">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <span className="badge-pill mb-2 !bg-[#EAF6F6] !text-[#0C7C7B] !border-[#0C7C7B]/25">
              Registration Confirmed
            </span>
            <h3 className="font-display text-2xl font-bold text-[#141A19] mb-1">
              Welcome, {successData.fullName}
            </h3>
            <p className="text-xs text-[#52605E] mb-6">
              Your delegate pass has been officially reserved.
            </p>

            <div className="bg-[#FAF8F5] rounded-2xl p-6 border border-[#0C7C7B]/15 text-left space-y-3 mb-8">
              <div className="flex justify-between text-xs pb-2 border-b border-[#0C7C7B]/10">
                <span className="text-[#6A7875]">Registration ID:</span>
                <span className="font-mono font-bold text-[#141A19]">{successData.registrationId}</span>
              </div>
              <div className="flex justify-between text-xs pb-2 border-b border-[#0C7C7B]/10">
                <span className="text-[#6A7875]">Event:</span>
                <span className="font-semibold text-[#141A19]">{successData.eventName}</span>
              </div>
              <div className="flex justify-between text-xs pb-2 border-b border-[#0C7C7B]/10">
                <span className="text-[#6A7875]">Delegate Tier:</span>
                <span className="font-semibold text-[#0C7C7B]">{successData.ticketType}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-[#6A7875]">Confirmation Sent To:</span>
                <span className="font-mono text-[#141A19]">{successData.email}</span>
              </div>
            </div>

            <button
              onClick={onClose}
              className="btn-accent !w-full !py-3.5 text-xs uppercase tracking-wider font-semibold"
            >
              Done & Return to Site
            </button>
          </div>
        ) : (
          <div>
            <div className="mb-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-9 h-9 rounded-xl bg-[#EAF6F6] border border-[#0C7C7B]/20 flex items-center justify-center p-1">
                  <img src="/talk-logo.png" alt="Logo" className="w-full h-full object-contain" />
                </div>
                <span className="badge-pill !bg-[#EAF6F6] !text-[#0C7C7B] !border-[#0C7C7B]/25">
                  <Calendar className="w-3.5 h-3.5" />
                  Delegate Registration
                </span>
              </div>
              <h3 className="font-display text-2xl font-bold text-[#141A19]">
                Reserve Your Seat
              </h3>
              <p className="text-xs text-[#52605E] mt-1">
                Join senior professionals, changemakers, and executives at The Talk Office sessions.
              </p>
            </div>

            {errorMsg && (
              <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs mb-4">
                {errorMsg}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[#141A19] uppercase tracking-wider mb-1.5">
                  Select Event / Gathering *
                </label>
                <select
                  value={eventSlug}
                  onChange={(e) => setEventSlug(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-[#0C7C7B]/20 bg-[#FAF8F5] focus:bg-white focus:outline-none focus:border-[#0C7C7B] focus:ring-2 focus:ring-[#0C7C7B]/15 text-sm text-[#141A19] transition-all"
                >
                  <option value="career-dinner-2026">
                    The Talk Office Career Dinner (11 Dec 2026 · Abuja)
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
                <label className="block text-xs font-semibold text-[#141A19] uppercase tracking-wider mb-1.5">
                  Delegate Category
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {['Standard Delegate', 'Executive / VIP Pass'].map((tier) => (
                    <button
                      type="button"
                      key={tier}
                      onClick={() => setTicketType(tier)}
                      className={`p-3 rounded-xl text-xs font-semibold border text-center transition-all ${
                        ticketType === tier
                          ? 'bg-[#0C7C7B] text-white border-[#0C7C7B] shadow-sm'
                          : 'bg-[#FAF8F5] text-[#52605E] border-[#0C7C7B]/15 hover:border-[#0C7C7B]/40'
                      }`}
                    >
                      {tier}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#141A19] uppercase tracking-wider mb-1.5">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    placeholder="e.g. Nkem Okafor"
                    className="w-full px-4 py-2.5 rounded-xl border border-[#0C7C7B]/20 bg-[#FAF8F5] text-sm text-[#141A19] focus:bg-white focus:outline-none focus:border-[#0C7C7B] focus:ring-2 focus:ring-[#0C7C7B]/15 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#141A19] uppercase tracking-wider mb-1.5">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="nkem@domain.com"
                    className="w-full px-4 py-2.5 rounded-xl border border-[#0C7C7B]/20 bg-[#FAF8F5] text-sm text-[#141A19] focus:bg-white focus:outline-none focus:border-[#0C7C7B] focus:ring-2 focus:ring-[#0C7C7B]/15 transition-all"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#141A19] uppercase tracking-wider mb-1.5">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="0802 345 6789"
                    className="w-full px-4 py-2.5 rounded-xl border border-[#0C7C7B]/20 bg-[#FAF8F5] text-sm text-[#141A19] focus:bg-white focus:outline-none focus:border-[#0C7C7B] focus:ring-2 focus:ring-[#0C7C7B]/15 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#141A19] uppercase tracking-wider mb-1.5">
                    Organization & Title
                  </label>
                  <input
                    type="text"
                    value={formData.organization}
                    onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                    placeholder="e.g. Head of Strategy, Zenith"
                    className="w-full px-4 py-2.5 rounded-xl border border-[#0C7C7B]/20 bg-[#FAF8F5] text-sm text-[#141A19] focus:bg-white focus:outline-none focus:border-[#0C7C7B] focus:ring-2 focus:ring-[#0C7C7B]/15 transition-all"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="btn-accent !w-full !py-3.5 text-xs uppercase tracking-wider font-semibold mt-4"
              >
                {loading ? 'Confirming Delegate Pass...' : 'Confirm Registration'}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
