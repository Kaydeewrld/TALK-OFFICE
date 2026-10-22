import React, { useState } from 'react';
import { insightsData } from '../data/programsData';
import {
  Headphones,
  Play,
  Pause,
  ArrowRight
} from 'lucide-react';

export default function InsightsPodcast() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeArticle, setActiveArticle] = useState(null);

  const podcast = insightsData.find((i) => i.type === 'Podcast Episode');
  const articles = insightsData.filter((i) => i.type !== 'Podcast Episode');

  return (
    <section id="insights" className="py-28 relative bg-gradient-to-b from-transparent via-[#DCF2F1]/80 to-transparent">
      {/* Ambient Teal Gradient Orbs */}
      <div className="absolute top-1/4 left-5 w-[600px] h-[500px] bg-gradient-to-tr from-[#0C7C7B]/20 via-[#2DD4BF]/15 to-transparent blur-[140px] pointer-events-none -z-10" />
      <div className="absolute bottom-10 right-5 w-[650px] h-[450px] bg-gradient-to-bl from-[#0C7C7B]/22 via-[#D99B26]/12 to-transparent blur-[140px] pointer-events-none -z-10" />

      <div className="container-custom">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/90 backdrop-blur-md border border-[#0C7C7B]/25 text-[#0C7C7B] text-xs font-semibold uppercase tracking-[0.14em] mb-4 shadow-xs">
            <Headphones className="w-3.5 h-3.5" />
            <span>Executive Essays & The Talk Office Podcast</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-semibold text-[#141A19] mb-3">
            Our Latest News, Perspectives & Podcast
          </h2>
          <p className="text-base text-[#52605E]">
            Intellectual rigor applied to the realities of leadership. Explore our signature podcast and essays examining human capital, institutional adaptability, and career longevity.
          </p>
        </div>

        {/* Featured Podcast Episode Banner with Rich Teal Gradient */}
        {podcast && (
          <div className="bg-gradient-to-br from-[#082220] via-[#0E3531] to-[#061816] rounded-3xl p-8 sm:p-12 border border-[#0C7C7B]/35 text-white mb-14 shadow-2xl relative overflow-hidden">
            <div className="absolute right-0 top-0 w-96 h-96 bg-[#0C7C7B]/30 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute left-0 bottom-0 w-80 h-80 bg-[#D99B26]/12 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-8">
                <div className="flex flex-wrap items-center gap-3 mb-4">
                  <span className="px-3 py-1 rounded-full text-[10px] font-mono uppercase tracking-widest bg-[#0C7C7B] text-white">
                    {podcast.season}
                  </span>
                  <span className="text-xs uppercase font-medium text-[#C7D4D2] tracking-wider">
                    {podcast.series}
                  </span>
                </div>

                <h3 className="font-display text-3xl sm:text-4xl font-bold text-white mb-3">
                  "{podcast.title}"
                </h3>

                <p className="text-sm sm:text-base text-[#C7D4D2] leading-relaxed mb-6 font-sans">
                  {podcast.summary}
                </p>

                {/* Host tag & Duration */}
                <div className="flex items-center gap-4 text-xs text-[#8E9B99]">
                  <span>Host: <strong className="text-white">{podcast.author}</strong></span>
                  <span>•</span>
                  <span>Duration: <strong className="text-white">{podcast.duration}</strong></span>
                  <span>•</span>
                  <span>Available on Spotify, Apple Podcasts, YouTube</span>
                </div>
              </div>

              {/* Interactive Player Controls */}
              <div className="lg:col-span-4 flex flex-col items-center justify-center p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="w-20 h-20 rounded-full bg-[#0C7C7B] hover:bg-[#08605F] text-white flex items-center justify-center shadow-lg transition-transform hover:scale-105 mb-4"
                  aria-label={isPlaying ? 'Pause Podcast' : 'Play Podcast'}
                >
                  {isPlaying ? <Pause className="w-8 h-8" /> : <Play className="w-8 h-8 ml-1" />}
                </button>

                <span className="text-xs font-semibold text-white uppercase tracking-wider mb-2">
                  {isPlaying ? 'Playing Audio Excerpt' : 'Listen to Audio Excerpt'}
                </span>

                {/* Simulated Audio Waveform */}
                <div className="flex items-center gap-1 h-6 w-full max-w-[200px] justify-center">
                  {[40, 70, 30, 90, 60, 100, 45, 80, 55, 95, 35, 65, 85].map((h, i) => (
                    <div
                      key={i}
                      className={`w-1 rounded-full transition-all duration-300 ${
                        isPlaying ? 'bg-[#2DD4BF] animate-pulse' : 'bg-white/30'
                      }`}
                      style={{ height: isPlaying ? `${h}%` : '20%' }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Editorial Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {articles.map((article) => (
            <div
              key={article.id}
              className="soft-card flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between text-xs text-[#6A7875] mb-4">
                  <span className="font-mono uppercase tracking-wider text-[#0C7C7B] font-semibold">
                    {article.category}
                  </span>
                  <span>{article.readTime}</span>
                </div>

                <h3 className="font-display text-xl font-bold text-[#141A19] mb-3 group-hover:text-[#0C7C7B] transition-colors leading-snug">
                  {article.title}
                </h3>

                <p className="text-xs sm:text-sm text-[#445250] leading-relaxed mb-6 font-sans">
                  {article.summary}
                </p>
              </div>

              <div className="pt-4 border-t border-[#0C7C7B]/10 flex items-center justify-between">
                <span className="text-xs text-[#6A7875]">{article.date}</span>
                <button
                  onClick={() => setActiveArticle(article)}
                  className="text-xs font-semibold uppercase tracking-wider text-[#141A19] group-hover:text-[#0C7C7B] flex items-center gap-1 transition-colors"
                >
                  Read Essay <ArrowRight className="w-3.5 h-3.5 text-[#0C7C7B]" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Article Reader Modal */}
      {activeArticle && (
        <div className="modal-overlay" onClick={() => setActiveArticle(null)}>
          <div
            className="modal-content bg-white max-w-2xl w-full rounded-3xl p-8 sm:p-10 border border-[#0C7C7B]/20 shadow-2xl relative max-h-[85vh] overflow-y-auto no-scrollbar"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between mb-6 pb-4 border-b border-[#0C7C7B]/10">
              <div>
                <span className="badge-pill mb-2 !bg-[#EAF6F6] !text-[#0C7C7B] !border-[#0C7C7B]/25">{activeArticle.category}</span>
                <h3 className="font-display text-2xl font-bold text-[#141A19] leading-snug">
                  {activeArticle.title}
                </h3>
                <p className="text-xs text-[#6A7875] mt-1">
                  By {activeArticle.author} · {activeArticle.date} · {activeArticle.readTime}
                </p>
              </div>
              <button
                onClick={() => setActiveArticle(null)}
                className="w-8 h-8 rounded-full bg-[#FAF8F5] text-[#141A19] hover:bg-[#0C7C7B] hover:text-white flex items-center justify-center transition-colors"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4 text-sm sm:text-base text-[#445250] leading-relaxed font-sans">
              <p className="font-serif italic text-lg text-[#141A19] border-l-2 border-[#0C7C7B] pl-4 py-1">
                "{activeArticle.summary}"
              </p>
              <p>
                In today's volatile economic climate, the architecture of workforce resilience determines whether an enterprise scales or stagnates. Modern organizations must transcend cosmetic perks and instead construct deep cognitive, structural, and cultural agility.
              </p>
              <p>
                When leaders invest deliberately in the inner clarity and strategic competence of their people, the dividend is compounded across every quarterly metric: retention of top-tier talent, speed of execution, and collective psychological safety.
              </p>
              <p>
                At The Talk Office, our ongoing research into emerging African markets highlights that the defining differentiator of resilient institutions is not capital availability, but the quality of human leadership deployed at pivotal inflection points.
              </p>
            </div>

            <div className="mt-8 pt-6 border-t border-[#0C7C7B]/10 flex items-center justify-between">
              <span className="text-xs text-[#6A7875]">The Talk Office Perspectives</span>
              <button
                onClick={() => setActiveArticle(null)}
                className="btn-primary !py-2.5 !px-5 text-xs uppercase tracking-wider"
              >
                Close Essay
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
