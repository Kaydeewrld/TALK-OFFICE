import React from 'react';
import { upcomingEventsData } from '../data/programsData';
import { Calendar, Clock, MapPin, CheckCircle2, ExternalLink, Ticket, Phone, Mail, Sparkles } from 'lucide-react';

export default function UpcomingEvents({ onOpenRegister, onNavigate }) {
  return (
    <section id="events" className="py-28 relative bg-gradient-to-b from-transparent via-[#DDF1F0]/75 to-transparent">
      {/* Ambient Teal Gradient Orbs */}
      <div className="absolute top-1/4 left-5 w-[600px] h-[500px] bg-gradient-to-tr from-[#0C7C7B]/20 via-[#2DD4BF]/15 to-transparent blur-[140px] pointer-events-none -z-10" />
      <div className="absolute bottom-10 right-5 w-[650px] h-[450px] bg-gradient-to-bl from-[#0C7C7B]/22 via-[#D99B26]/12 to-transparent blur-[140px] pointer-events-none -z-10" />

      <div className="container-custom">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/90 backdrop-blur-md border border-[#0C7C7B]/25 text-[#0C7C7B] text-xs font-semibold uppercase tracking-[0.14em] mb-4 shadow-xs">
            <Calendar className="w-3.5 h-3.5" />
            <span>Executive Calendar & Gatherings</span>
          </div>
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-semibold text-[#141A19] mb-3">
            Upcoming Events You Should Not Miss
          </h2>
          <p className="text-sm sm:text-base text-[#52605E] leading-relaxed">
            Convene with forward-thinking leaders, expand your strategic horizon, and reflect intentionally on your career trajectory at our upcoming flagship sessions.
          </p>
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {upcomingEventsData.slice(0, 2).map((event) => (
            <div
              key={event.id}
              className="soft-card flex flex-col justify-between group cursor-pointer"
            >
              <div>
                {/* Event Badge & Status */}
                <div className="flex items-center justify-between mb-6">
                  <span className="badge-pill !bg-[#EAF6F6] !text-[#0C7C7B] !border-[#0C7C7B]/25">{event.badge}</span>
                  <span className="text-xs font-semibold px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
                    {event.status}
                  </span>
                </div>

                {/* Event Title & Theme */}
                <h3 className="font-display text-2xl sm:text-3xl font-bold text-[#141A19] mb-1.5 group-hover:text-[#0C7C7B] transition-colors">
                  {event.title}
                </h3>
                {event.theme ? (
                  <div className="inline-block px-3 py-1 rounded-lg bg-[#FAF3E0] border border-[#D99B26]/30 text-[#9C6D13] font-medium text-xs mb-4">
                    <span className="font-semibold uppercase tracking-wider text-[10px] text-[#B47B16] block sm:inline sm:mr-1">
                      Theme:
                    </span>
                    {event.theme}
                  </div>
                ) : (
                  <p className="text-xs font-semibold text-[#6A7875] uppercase tracking-wider mb-5">
                    {event.edition}
                  </p>
                )}

                {/* Date & Location Pill Strip */}
                <div className="flex flex-wrap gap-2.5 sm:gap-3 mb-6 pb-6 border-b border-[#0C7C7B]/10 text-xs text-[#445250]">
                  <div className="flex items-center gap-2 bg-[#FAF8F5] px-3.5 py-2 rounded-xl border border-[#0C7C7B]/10">
                    <Calendar className="w-4 h-4 text-[#0C7C7B] shrink-0" />
                    <span className="font-semibold">{event.date}</span>
                  </div>
                  <div className="flex items-center gap-2 bg-[#FAF8F5] px-3.5 py-2 rounded-xl border border-[#0C7C7B]/10">
                    <Clock className="w-4 h-4 text-[#0C7C7B] shrink-0" />
                    <span>{event.time}</span>
                  </div>
                  <div className="flex items-center gap-2 bg-[#FAF8F5] px-3.5 py-2 rounded-xl border border-[#0C7C7B]/10">
                    <MapPin className="w-4 h-4 text-[#0C7C7B] shrink-0" />
                    <span>{event.location}</span>
                  </div>
                  {event.price && (
                    <div className="flex items-center gap-2 bg-[#EAF6F6] text-[#0C7C7B] px-3.5 py-2 rounded-xl border border-[#0C7C7B]/25 font-semibold">
                      <Ticket className="w-4 h-4 text-[#0C7C7B] shrink-0" />
                      <span>{event.price} / ticket</span>
                    </div>
                  )}
                </div>

                {/* Description */}
                <p className="text-sm text-[#445250] leading-relaxed mb-6 font-sans">
                  {event.description}
                </p>

                {/* Features */}
                <ul className="space-y-2.5 mb-6 text-xs text-[#445250]">
                  {event.features.map((feat, idx) => (
                    <li key={idx} className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-[#0C7C7B] shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>

                {/* Corporate & Sponsorship Callout */}
                {event.corporateInfo && (
                  <div className="mb-6 p-4 rounded-2xl bg-[#FAF8F5] border border-[#0C7C7B]/15 text-xs text-[#52605E]">
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <div className="font-semibold text-[#141A19] flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5 text-[#D99B26]" />
                        <span>Corporate Hospitality Tables (₦1M, ₦3M, ₦5M)</span>
                      </div>
                      <a
                        href="/career-dinner"
                        onClick={(e) => {
                          e.preventDefault();
                          if (onNavigate) onNavigate('career-dinner');
                        }}
                        className="text-[11px] font-semibold text-[#0C7C7B] hover:underline"
                      >
                        View Event Page & Tables &rarr;
                      </a>
                    </div>
                    <p className="text-[11px] text-[#6A7875] mb-2 leading-relaxed">
                      Celebration Table (₦1M), Signature Table (₦3M), Executive Table (₦5M) with dedicated branding and VIP access.
                    </p>
                    <div className="flex flex-wrap items-center gap-3 text-[11px] font-medium text-[#0C7C7B]">
                      <a href="tel:07033774156" className="hover:underline flex items-center gap-1">
                        <Phone className="w-3 h-3" /> 07033774156
                      </a>
                      <span>•</span>
                      <a href="tel:08166399901" className="hover:underline flex items-center gap-1">
                        <Phone className="w-3 h-3" /> 08166399901
                      </a>
                      <span>•</span>
                      <a href="mailto:hello@thetalkoffice.com" className="hover:underline flex items-center gap-1">
                        <Mail className="w-3 h-3" /> hello@thetalkoffice.com
                      </a>
                    </div>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-[#0C7C7B]/10 flex flex-wrap items-center justify-between gap-3">
                {event.paystackUrl ? (
                  <div className="flex flex-wrap items-center gap-2.5 w-full sm:w-auto">
                    <a
                      href="/career-dinner"
                      onClick={(e) => {
                        e.preventDefault();
                        if (onNavigate) onNavigate('career-dinner');
                      }}
                      className="btn-accent !py-2.5 !px-4 text-xs uppercase tracking-wider font-semibold flex items-center gap-1.5 shadow-md cursor-pointer"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-[#D99B26]" />
                      Event Page & Tables
                    </a>
                    <a
                      href={event.paystackUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-secondary !py-2.5 !px-4 text-xs uppercase tracking-wider font-semibold flex items-center gap-1.5 bg-white/90 hover:bg-white"
                    >
                      <Ticket className="w-3.5 h-3.5 text-[#0C7C7B]" />
                      100k Seat
                      <ExternalLink className="w-3 h-3 opacity-70" />
                    </a>
                    <button
                      onClick={() => onOpenRegister(event.id)}
                      className="px-3.5 py-2.5 rounded-full border border-[#0C7C7B]/20 text-[#52605E] hover:text-[#0C7C7B] text-xs font-semibold hover:bg-[#EAF6F6] transition-colors cursor-pointer"
                    >
                      Invoice / Inquiry
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => onOpenRegister(event.id)}
                    className="btn-primary !py-3 !px-5 text-xs uppercase tracking-wider font-semibold flex items-center gap-2"
                  >
                    <Calendar className="w-4 h-4 text-[#D99B26]" />
                    Register For Event
                  </button>
                )}
                <span className="text-xs font-mono text-[#6A7875]">Limited Capacity</span>
              </div>
            </div>
          ))}
        </div>

        {/* Curated Roundtables Callout */}
        <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-br from-[#082220] via-[#0D322E] to-[#061817] text-[#FAF8F5] border border-[#0C7C7B]/35 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl relative overflow-hidden">
          <div className="absolute right-0 top-0 w-80 h-80 bg-[#0C7C7B]/30 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 max-w-xl">
            <span className="text-[10px] font-mono uppercase tracking-widest text-[#2DD4BF] block mb-2 font-semibold">
              Next Cohort · The Talk Table
            </span>
            <h4 className="font-display text-2xl font-bold text-white mb-2">
              Winter Executive Salon (Abuja)
            </h4>
            <p className="text-xs text-[#C7D4D2] leading-relaxed">
              15 vetted leaders in confidential Chatham House dialogue. Candidate nominations and direct inquiries are currently being reviewed by our selection committee.
            </p>
          </div>
          <button
            onClick={() => onOpenRegister('the-talk-table')}
            className="btn-accent !py-3 !px-6 text-xs uppercase tracking-wider shrink-0 relative z-10 shadow-md"
          >
            Request Salon Invitation
          </button>
        </div>
      </div>
    </section>
  );
}
