import React from 'react';
import { servicesData } from '../data/programsData';
import { Users, Target, Mic, Briefcase, ArrowUpRight } from 'lucide-react';

export default function ServicesSection() {
  const iconMap = {
    coaching: <Users className="w-6 h-6 text-[#0C7C7B]" />,
    workforce: <Target className="w-6 h-6 text-[#0C7C7B]" />,
    keynotes: <Mic className="w-6 h-6 text-[#0C7C7B]" />,
    advisory: <Briefcase className="w-6 h-6 text-[#0C7C7B]" />
  };

  return (
    <section id="services" className="py-28 relative bg-gradient-to-b from-transparent via-[#DCF2F1]/80 to-transparent">
      {/* Ambient Teal Gradient Orbs */}
      <div className="absolute top-1/2 right-5 w-[650px] h-[550px] bg-gradient-to-bl from-[#0C7C7B]/22 via-[#2DD4BF]/16 to-transparent blur-[140px] pointer-events-none -z-10" />
      <div className="absolute bottom-5 left-5 w-[600px] h-[450px] bg-gradient-to-tr from-[#14B8A6]/20 to-transparent blur-[130px] pointer-events-none -z-10" />

      <div className="container-custom">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/90 backdrop-blur-md border border-[#0C7C7B]/25 text-[#0C7C7B] text-xs font-semibold uppercase tracking-[0.14em] mb-4 shadow-xs">
            <Briefcase className="w-3.5 h-3.5" />
            <span>Bespoke Advisory & Client Services</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-semibold text-[#141A19] mb-4">
            Tailored Engagements for Leaders & Institutions
          </h2>
          <p className="text-base sm:text-lg text-[#52605E] leading-relaxed">
            Beyond our public flagship programmes, The Talk Office partners directly with corporations, burgeoning enterprises, and public-sector institutions to architect resilient systems and high-performing cultures.
          </p>
        </div>

        {/* Services Soft Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {servicesData.map((service) => (
            <div
              key={service.id}
              className="soft-card flex flex-col justify-between group cursor-pointer"
            >
              <div>
                <div className="w-14 h-14 rounded-2xl bg-[#EAF6F6] border border-[#0C7C7B]/15 flex items-center justify-center mb-6 group-hover:scale-105 transition-transform shadow-xs">
                  {iconMap[service.id]}
                </div>
                <h3 className="font-display text-2xl font-bold text-[#141A19] mb-1 group-hover:text-[#0C7C7B] transition-colors">
                  {service.title}
                </h3>
                <p className="text-xs uppercase font-medium tracking-wider text-[#7E8D8A] mb-4 font-mono">
                  {service.subtitle}
                </p>
                <p className="text-sm sm:text-base text-[#4E5C5A] leading-relaxed font-sans mb-6">
                  {service.description}
                </p>
              </div>

              <div className="pt-5 border-t border-[#0C7C7B]/10 flex items-center justify-between">
                <a
                  href="#contact"
                  className="text-xs font-semibold uppercase tracking-wider text-[#141A19] group-hover:text-[#0C7C7B] transition-colors flex items-center gap-1.5"
                >
                  Engage Practice <ArrowUpRight className="w-4 h-4 text-[#0C7C7B]" />
                </a>
                <span className="text-xs font-mono text-[#7E8D8A]">Consultation by Appointment</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
