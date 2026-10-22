import React, { useState } from 'react';
import { MapPin, Phone, Mail, Send, CheckCircle2, Building } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function ContactSection() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    organization: '',
    serviceType: 'General Advisory Inquiry',
    message: ''
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setSubmitted(true);
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.8 },
          colors: ['#0C7C7B', '#D99B26', '#141A19']
        });
      } else {
        setErrorMsg(data.error || 'Failed to submit inquiry. Please try again.');
      }
    } catch (err) {
      setErrorMsg('Network error. Please check your connection.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-28 relative bg-gradient-to-b from-transparent via-[#E1F2F1]/80 to-[#101716]">
      {/* Ambient Teal Gradient Orbs */}
      <div className="absolute top-1/4 left-5 w-[600px] h-[500px] bg-gradient-to-tr from-[#0C7C7B]/22 via-[#2DD4BF]/16 to-transparent blur-[140px] pointer-events-none -z-10" />
      <div className="absolute bottom-20 right-5 w-[650px] h-[500px] bg-gradient-to-bl from-[#0C7C7B]/25 via-[#D99B26]/12 to-transparent blur-[140px] pointer-events-none -z-10" />

      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left: Contact Info & Address */}
          <div className="lg:col-span-5">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/90 backdrop-blur-md border border-[#0C7C7B]/25 text-[#0C7C7B] text-xs font-semibold uppercase tracking-[0.14em] mb-4 shadow-xs">
              <Building className="w-3.5 h-3.5" />
              <span>Office & Consulting Practice</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-semibold text-[#141A19] mb-4">
              Partner With Us
            </h2>
            <p className="text-base text-[#52605E] leading-relaxed mb-10">
              Whether you are looking to accelerate your personal career trajectory, train your enterprise team, or explore corporate sponsorship for our flagship events, our consulting practice is here to partner with you.
            </p>

            {/* Contact Details List */}
            <div className="space-y-6">
              <div className="flex items-start gap-4 p-5 rounded-2xl bg-white/80 backdrop-blur-md border border-[#0C7C7B]/15 shadow-xs">
                <div className="w-10 h-10 rounded-xl bg-[#EAF6F6] text-[#0C7C7B] flex items-center justify-center shrink-0 mt-0.5">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[11px] uppercase tracking-wider font-semibold text-[#6A7875] block mb-0.5">
                    Our Location
                  </span>
                  <p className="font-medium text-sm text-[#141A19]">
                    No 15 Aba Close, Area 8, Garki, Abuja, Nigeria
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-5 rounded-2xl bg-white/80 backdrop-blur-md border border-[#0C7C7B]/15 shadow-xs">
                <div className="w-10 h-10 rounded-xl bg-[#EAF6F6] text-[#0C7C7B] flex items-center justify-center shrink-0 mt-0.5">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[11px] uppercase tracking-wider font-semibold text-[#6A7875] block mb-0.5">
                    Telephone
                  </span>
                  <p className="font-medium text-sm text-[#141A19]">
                    <a href="tel:08166399901" className="hover:text-[#0C7C7B] transition-colors">
                      08166399901
                    </a>
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-5 rounded-2xl bg-white/80 backdrop-blur-md border border-[#0C7C7B]/15 shadow-xs">
                <div className="w-10 h-10 rounded-xl bg-[#EAF6F6] text-[#0C7C7B] flex items-center justify-center shrink-0 mt-0.5">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[11px] uppercase tracking-wider font-semibold text-[#6A7875] block mb-0.5">
                    Partnership & General Inquiries
                  </span>
                  <p className="font-medium text-sm text-[#141A19] space-y-0.5">
                    <a href="mailto:hello@thetalkoffice.com" className="block hover:text-[#0C7C7B] transition-colors">
                      hello@thetalkoffice.com
                    </a>
                    <a href="mailto:njuara@thetalkoffice.com" className="block hover:text-[#0C7C7B] transition-colors text-xs text-[#6A7875]">
                      njuara@thetalkoffice.com
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Contact / Consultation Form */}
          <div className="lg:col-span-7 soft-card !p-8 sm:!p-12 shadow-xl">
            {submitted ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto mb-4 border border-emerald-200">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="font-display text-2xl font-bold text-[#141A19] mb-2">
                  Inquiry Received
                </h3>
                <p className="text-sm text-[#52605E] max-w-md mx-auto mb-6">
                  Thank you for reaching out to The Talk Office. Our consulting practice will review your message and respond within 24 business hours.
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({
                      fullName: '',
                      email: '',
                      phone: '',
                      organization: '',
                      serviceType: 'General Advisory Inquiry',
                      message: ''
                    });
                  }}
                  className="btn-secondary !py-2.5 !px-6 text-xs uppercase tracking-wider"
                >
                  Send Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="mb-2">
                  <h3 className="font-display text-2xl font-bold text-[#141A19]">
                    Send a Direct Message
                  </h3>
                  <p className="text-xs text-[#6A7875]">
                    Connect with our advisory consultants or request corporate training packages.
                  </p>
                </div>

                {errorMsg && (
                  <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs">
                    {errorMsg}
                  </div>
                )}

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
                      placeholder="e.g. Adeola Balogun"
                      className="w-full px-4 py-3 rounded-xl border border-[#0C7C7B]/20 bg-[#FAF8F5] focus:bg-white focus:outline-none focus:border-[#0C7C7B] text-sm text-[#141A19] transition-colors"
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
                      placeholder="adeola@company.com"
                      className="w-full px-4 py-3 rounded-xl border border-[#0C7C7B]/20 bg-[#FAF8F5] focus:bg-white focus:outline-none focus:border-[#0C7C7B] text-sm text-[#141A19] transition-colors"
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
                      placeholder="0801 234 5678"
                      className="w-full px-4 py-3 rounded-xl border border-[#0C7C7B]/20 bg-[#FAF8F5] focus:bg-white focus:outline-none focus:border-[#0C7C7B] text-sm text-[#141A19] transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#141A19] uppercase tracking-wider mb-1.5">
                      Organization / Company
                    </label>
                    <input
                      type="text"
                      value={formData.organization}
                      onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                      placeholder="e.g. Apex Energy Ltd"
                      className="w-full px-4 py-3 rounded-xl border border-[#0C7C7B]/20 bg-[#FAF8F5] focus:bg-white focus:outline-none focus:border-[#0C7C7B] text-sm text-[#141A19] transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#141A19] uppercase tracking-wider mb-1.5">
                    Nature of Inquiry
                  </label>
                  <select
                    value={formData.serviceType}
                    onChange={(e) => setFormData({ ...formData, serviceType: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-[#0C7C7B]/20 bg-[#FAF8F5] focus:bg-white focus:outline-none focus:border-[#0C7C7B] text-sm text-[#141A19] transition-colors"
                  >
                    <option value="General Advisory Inquiry">General Advisory Inquiry</option>
                    <option value="Executive Coaching & Mentorship">Executive Coaching & Mentorship</option>
                    <option value="Workforce Transformation & Offsites">Workforce Transformation & Offsites</option>
                    <option value="Keynote Speaking & Facilitation">Keynote Speaking & Facilitation</option>
                    <option value="The Talk Table Nomination">The Talk Table Nomination</option>
                    <option value="Career Dinner Sponsorship">Career Dinner Sponsorship</option>
                    <option value="The Talk Office Global (Kigali 2027)">The Talk Office Global (Kigali 2027)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#141A19] uppercase tracking-wider mb-1.5">
                    Message / Strategic Requirements *
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell us about your team, your goals, or specific questions..."
                    className="w-full px-4 py-3 rounded-xl border border-[#0C7C7B]/20 bg-[#FAF8F5] focus:bg-white focus:outline-none focus:border-[#0C7C7B] text-sm text-[#141A19] transition-colors"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="btn-primary !w-full !py-4 text-xs uppercase tracking-wider font-semibold flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4 text-[#D99B26]" />
                  {loading ? 'Submitting to Advisory Team...' : 'Send Inquiry to The Talk Office'}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
