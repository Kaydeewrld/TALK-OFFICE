import React, { useState } from 'react';
import { Quote, Award, UserCheck, Scale, CheckCircle } from 'lucide-react';

export default function FoundersMessage() {
  const [profileModalOpen, setProfileModalOpen] = useState(false);

  return (
    <section id="founder" className="py-28 relative">
      {/* Soft atmospheric background light */}
      <div className="absolute top-1/2 left-1/3 -translate-y-1/2 w-[500px] h-[350px] bg-gradient-to-tr from-[#D99B26]/10 to-[#0C7C7B]/10 blur-[130px] pointer-events-none -z-10" />

      <div className="container-custom">
        <div className="max-w-5xl mx-auto">
          {/* Section badge */}
          <div className="text-center mb-12">
            <span className="badge-pill mb-3 !bg-white/80 !text-[#0C7C7B] !border-[#0C7C7B]/20 shadow-xs">
              <Scale className="w-3.5 h-3.5 text-[#0C7C7B]" />
              Leadership & Founding Philosophy
            </span>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-semibold text-[#141A19]">
              A Conviction of Growth
            </h2>
          </div>

          {/* Letter / Editorial Card with Prestigious Dark Teal Gradient */}
          <div className="relative rounded-[2.5rem] bg-gradient-to-br from-[#082220] via-[#0E3531] to-[#061816] text-[#FAF8F5] p-8 sm:p-14 lg:p-16 shadow-2xl border border-[#0C7C7B]/35 overflow-hidden">
            {/* Ambient glowing radial orbs inside the card */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-[#0C7C7B]/30 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#D99B26]/15 rounded-full blur-3xl pointer-events-none" />

            {/* Background watermark quote */}
            <Quote className="absolute top-8 right-10 w-28 h-28 text-[#2DD4BF]/5 pointer-events-none" />

            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              {/* Founder Editorial Portrait & Bio snippet */}
              <div className="lg:col-span-5 flex flex-col items-center text-center">
                <div className="relative mb-6">
                  <div className="w-48 h-48 sm:w-56 sm:h-56 rounded-full overflow-hidden border-4 border-[#0C7C7B]/50 shadow-2xl shadow-[#0C7C7B]/25 bg-[#0C2220]">
                    <img
                      src="/images/founder/njuara-njama.jpg"
                      alt="Njuara Njama Esq. - Founder & Lead Consultant"
                      className="w-full h-full object-cover object-top"
                    />
                  </div>
                  <div className="absolute bottom-1 right-2 w-10 h-10 rounded-full bg-[#0C7C7B] text-white flex items-center justify-center shadow-lg border border-white/20">
                    <Award className="w-5 h-5 text-[#D99B26]" />
                  </div>
                </div>

                <h3 className="font-display text-2xl font-bold text-white mb-1">
                  Njuara Njama Esq.
                </h3>
                <p className="text-xs uppercase tracking-widest text-[#2DD4BF] font-semibold mb-3 font-mono">
                  Founder & Lead Consultant
                </p>
                <p className="text-xs text-[#A8C2BE] max-w-xs leading-relaxed mb-5">
                  Legal Practitioner, Executive Coach, and Workforce Transformation Strategist advising corporate and public-sector leaders across Africa.
                </p>

                <button
                  onClick={() => setProfileModalOpen(true)}
                  className="px-5 py-2.5 rounded-full bg-white/10 hover:bg-[#0C7C7B] text-white border border-white/20 hover:border-transparent transition-all flex items-center gap-2 shadow-xs cursor-pointer text-xs font-semibold backdrop-blur-md"
                >
                  <UserCheck className="w-3.5 h-3.5 text-[#2DD4BF]" />
                  View Executive Bio
                </button>
              </div>

              {/* Founder's Letter Content */}
              <div className="lg:col-span-7 flex flex-col justify-center border-t lg:border-t-0 lg:border-l border-white/10 pt-8 lg:pt-0 lg:pl-10">
                <div className="text-xs uppercase tracking-[0.2em] font-semibold text-[#2DD4BF] mb-4 font-mono">
                  Founder's Welcome Note
                </div>

                <div className="pull-quote italic text-[#F3BA4A] text-xl sm:text-2xl mb-6 font-serif leading-snug">
                  "When people grow, organizations grow; when organizations grow, societies prosper."
                </div>

                <div className="space-y-4 text-sm sm:text-base text-[#CBE0DE] leading-relaxed font-sans mb-8">
                  <p>
                    The world of work is changing faster than ever before. Organizations are evolving, leadership expectations are increasing, and individuals are required to continually adapt to remain relevant.
                  </p>
                  <p>
                    At The Talk Office, we exist to help people and organizations navigate this reality. Whether you are a rising professional seeking strategic direction, an executive leading complex institutional change, or an enterprise building high-performance culture, our commitment remains the same—to help you unlock value and achieve sustainable impact.
                  </p>
                  <p>
                    Thank you for visiting our platform. We look forward to partnering with you on your journey of growth, transformation, and excellence.
                  </p>
                </div>

                {/* Sign-off Block */}
                <div className="pt-5 border-t border-white/10 flex items-center justify-between">
                  <div>
                    <span className="text-xs text-[#8EABA6] block mb-1">Warm regards,</span>
                    <span className="font-display text-xl font-bold text-white block">
                      Njuara Njama Esq.
                    </span>
                    <span className="text-xs text-[#2DD4BF] block font-medium">Founder & Lead Consultant</span>
                  </div>

                  <div className="text-right">
                    <span className="text-[11px] font-mono text-[#8EABA6] block">Abuja, Nigeria</span>
                    <span className="text-xs font-semibold text-[#2DD4BF] uppercase tracking-wider font-display">
                      The Talk Office
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Founder Profile Modal */}
      {profileModalOpen && (
        <div className="modal-overlay" onClick={() => setProfileModalOpen(false)}>
          <div
            className="modal-content bg-white max-w-2xl w-full rounded-3xl p-8 sm:p-10 border border-[#0C7C7B]/20 shadow-2xl relative max-h-[90vh] overflow-y-auto no-scrollbar"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between mb-6 pb-4 border-b border-[#0C7C7B]/10">
              <div>
                <span className="badge-pill mb-2 !bg-[#EAF6F6] !text-[#0C7C7B]">Executive Profile</span>
                <h3 className="font-display text-2xl font-bold text-[#141A19]">
                  Njuara Njama Esq.
                </h3>
                <p className="text-xs text-[#0C7C7B] font-semibold">Founder & Lead Consultant</p>
              </div>
              <button
                onClick={() => setProfileModalOpen(false)}
                className="w-8 h-8 rounded-full bg-[#FAF8F5] text-[#141A19] hover:bg-[#0C7C7B] hover:text-white flex items-center justify-center transition-colors"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4 text-sm text-[#4E5C5A] leading-relaxed">
              <p>
                Njuara Njama Esq. is a distinguished legal practitioner, human capital strategist, and executive coach dedicated to transforming the African workplace. As Founder and Lead Consultant at The Talk Office, he advises business leaders, institutions, and professionals on systemic agility, talent acceleration, and leadership maturity.
              </p>
              <p>
                Under his leadership, The Talk Office has pioneered four landmark programmes: the High Impact Professionals Seminar (HIPS) which has trained hundreds of leaders across eight editions; The Talk Table, an intimate Chatham House executive dialogue series; and the annual Career Dinner gala.
              </p>
              <p>
                He holds a deep conviction that sustainable economic and organizational progress begins with intentional investment in the human mind, ethical governance, and strategic clarity.
              </p>

              <div className="pt-4 border-t border-[#0C7C7B]/10">
                <h4 className="font-semibold text-xs uppercase tracking-wider text-[#141A19] mb-2">
                  Areas of Advisory Practice
                </h4>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="p-2.5 rounded-lg bg-[#FAF8F5] flex items-center gap-2">
                    <CheckCircle className="w-3.5 h-3.5 text-[#0C7C7B]" />
                    <span>Executive Leadership Coaching</span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-[#FAF8F5] flex items-center gap-2">
                    <CheckCircle className="w-3.5 h-3.5 text-[#0C7C7B]" />
                    <span>Workforce Transformation</span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-[#FAF8F5] flex items-center gap-2">
                    <CheckCircle className="w-3.5 h-3.5 text-[#0C7C7B]" />
                    <span>Culture & System Architecture</span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-[#FAF8F5] flex items-center gap-2">
                    <CheckCircle className="w-3.5 h-3.5 text-[#0C7C7B]" />
                    <span>Corporate Strategy Keynotes</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
