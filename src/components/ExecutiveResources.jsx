import React from 'react';
import { resourcesData } from '../data/programsData';
import { BookOpen, Check, ShoppingBag, ShieldCheck } from 'lucide-react';

export default function ExecutiveResources({ onOpenOrder }) {
  return (
    <section id="resources" className="py-28 relative bg-gradient-to-b from-transparent via-[#DCF2F1]/80 to-transparent">
      {/* Ambient Teal Gradient Orbs */}
      <div className="absolute top-1/3 right-5 w-[600px] h-[500px] bg-gradient-to-bl from-[#0C7C7B]/22 via-[#2DD4BF]/16 to-transparent blur-[140px] pointer-events-none -z-10" />
      <div className="absolute bottom-5 left-5 w-[650px] h-[450px] bg-gradient-to-tr from-[#14B8A6]/20 to-transparent blur-[130px] pointer-events-none -z-10" />

      <div className="container-custom">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/90 backdrop-blur-md border border-[#0C7C7B]/25 text-[#0C7C7B] text-xs font-semibold uppercase tracking-[0.14em] mb-4 shadow-xs">
              <BookOpen className="w-3.5 h-3.5" />
              <span>Executive Toolkits & Diagnostic Resources</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-semibold text-[#141A19] mb-3">
              Resources for Growth & Excellence
            </h2>
            <p className="text-base text-[#52605E]">
              Proprietary inquiry decks and operational workbooks developed by The Talk Office consulting practice to diagnose organizational blindspots, elevate executive presence, and map high-impact careers.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs font-mono text-[#7E8D8A] uppercase tracking-wider bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full border border-[#0C7C7B]/15">
              National Delivery & Digital Access Available
            </span>
          </div>
        </div>

        {/* Resources Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {resourcesData.map((resource) => (
            <div
              key={resource.id}
              className="soft-card flex flex-col justify-between group"
            >
              {/* Top Accent & Badge */}
              <div>
                <div className="flex items-center justify-between mb-6">
                  <span className="text-[11px] font-mono uppercase tracking-wider text-[#0C7C7B] font-semibold bg-[#EAF6F6] px-3 py-1 rounded-full">
                    {resource.category}
                  </span>
                  <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-[#121817]/5 text-[#141A19]">
                    {resource.badge}
                  </span>
                </div>

                {/* Card Title & Subtitle */}
                <h3 className="font-display text-2xl font-bold text-[#141A19] mb-2 group-hover:text-[#0C7C7B] transition-colors">
                  {resource.title}
                </h3>
                <p className="text-xs font-medium text-[#6A7875] mb-4 uppercase tracking-wider">
                  {resource.subtitle}
                </p>

                {/* Price Display */}
                <div className="flex items-baseline gap-2 mb-6 pb-6 border-b border-[#0C7C7B]/10">
                  <span className="font-display text-3xl font-bold text-[#0C7C7B]">
                    {resource.priceFormatted}
                  </span>
                  <span className="text-xs text-[#6A7875]">/ unit (NGN)</span>
                </div>

                {/* Description */}
                <p className="text-sm text-[#445250] leading-relaxed mb-6 font-sans">
                  {resource.description}
                </p>

                {/* Features List */}
                <ul className="space-y-2.5 mb-8 text-xs text-[#445250]">
                  {resource.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2.5">
                      <Check className="w-4 h-4 text-[#0C7C7B] shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Order Action Button */}
              <div className="pt-4 border-t border-[#0C7C7B]/10">
                <button
                  onClick={() => onOpenOrder(resource)}
                  className="btn-primary !w-full !py-3.5 text-xs uppercase tracking-wider font-semibold flex items-center justify-center gap-2 group-hover:bg-[#0C7C7B] group-hover:border-[#0C7C7B]"
                >
                  <ShoppingBag className="w-4 h-4 text-[#D99B26]" />
                  Order / Inquire Now
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Corporate Bulk Orders Banner */}
        <div className="mt-12 p-6 sm:p-8 rounded-2xl bg-[#EAF6F6]/50 border border-[#0C7C7B]/20 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-[#121817] text-[#2DD4BF] flex items-center justify-center shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-display text-base font-semibold text-[#141A19]">
                Corporate & Cohort Institutional Orders
              </h4>
              <p className="text-xs text-[#52605E]">
                Custom branded probing card decks and team accelerator workbooks for executive offsites, HR talent pipelines, and board retreats.
              </p>
            </div>
          </div>
          <button
            onClick={() => onOpenOrder(resourcesData[0])}
            className="btn-secondary !py-2.5 !px-5 text-xs uppercase tracking-wider shrink-0"
          >
            Inquire for Enterprise Packs
          </button>
        </div>
      </div>
    </section>
  );
}
