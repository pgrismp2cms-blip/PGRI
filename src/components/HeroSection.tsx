import React from 'react';
import { ArrowRight, BookOpen, Award, MapPin, Sparkles, ShieldCheck, Download, Users } from 'lucide-react';
import { ASSETS, DEFAULT_HERO_DATA } from '../data/mockData';
import { HeroContent } from '../types';

interface HeroSectionProps {
  onNavigate: (sectionId: string, subId?: string) => void;
  onOpenQuickSakti: () => void;
  heroData?: HeroContent;
  onOpenAdmin?: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onNavigate,
  onOpenQuickSakti,
  heroData = DEFAULT_HERO_DATA,
  onOpenAdmin,
}) => {
  return (
    <section id="beranda" className="relative bg-batik-pgri-pattern overflow-hidden border-b border-neutral-200">
      {/* Decorative Brand Accent Lines: Merah Putih Hitam (Freeze sama dengan header) */}
      <div className="sticky top-0 inset-x-0 h-1.5 bg-gradient-to-r from-red-700 via-neutral-900 to-red-800 z-30 shadow-xs" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Column: Editorial & Value Proposition */}
          <div className="lg:col-span-7 space-y-6">
            {/* Contextual Tag */}
            <div className="flex items-center space-x-2 text-xs font-semibold uppercase tracking-wider text-red-800">
              <span>PGRI Cabang Kec. Ciamis</span>
              <span aria-hidden="true">·</span>
              <span>Ranting SMPN 2 Ciamis</span>
              <span aria-hidden="true">·</span>
              <span className="text-emerald-700 font-medium">Tatar Galuh</span>
            </div>

            {/* Main Headline (Theme: Membangun Ekosistem Digital Ciamis Tangguh) */}
            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-neutral-900 tracking-tight leading-[1.2] text-balance">
              {heroData.headline}{' '}
              <span className="text-red-700 underline decoration-red-200 decoration-4 underline-offset-4">
                {heroData.tagline}
              </span>
            </h1>

            {/* Paragraph / Body Prose */}
            <p className="text-sm sm:text-base lg:text-lg text-neutral-600 leading-relaxed max-w-2xl">
              {heroData.description}
            </p>

            {/* CTA Buttons Group (Full-width on mobile, auto on desktop) */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-3">
              <button
                onClick={() => onNavigate('sakti')}
                className="w-full sm:w-auto px-5 py-3 text-xs sm:text-sm font-semibold text-white bg-red-700 hover:bg-red-800 rounded-lg shadow-sm hover:shadow transition-all flex items-center justify-center space-x-2 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-600"
              >
                <span>Jelajahi Inovasi SAKTI</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </button>

              <button
                onClick={() => onNavigate('jenjang')}
                className="w-full sm:w-auto px-4 py-3 text-xs sm:text-sm font-semibold text-neutral-700 bg-neutral-100 hover:bg-neutral-200 rounded-lg transition-colors flex items-center justify-center space-x-2 border border-neutral-300"
              >
                <Award className="w-4 h-4 text-emerald-700" />
                <span>Praktik Baik STAR</span>
              </button>

              <button
                onClick={() => onNavigate('profil', 'peta')}
                className="w-full sm:w-auto px-4 py-3 text-xs sm:text-sm font-semibold text-neutral-700 bg-white hover:bg-neutral-50 rounded-lg transition-colors flex items-center justify-center space-x-1.5 border border-neutral-300"
              >
                <MapPin className="w-4 h-4 text-neutral-600" />
                <span>Peta Ranting</span>
              </button>
            </div>

            {/* Claim-to-Proof Quantitative Adjacency Grid */}
            <div className="pt-6 border-t border-neutral-200 grid grid-cols-2 sm:grid-cols-4 gap-4 text-neutral-800">
              <div>
                <div className="text-xl sm:text-2xl font-bold text-neutral-900 font-mono tabular-nums">
                  {heroData.statsGuru}
                </div>
                <div className="text-xs text-neutral-500 mt-0.5">Guru SMPN 2 Aktif</div>
              </div>
              <div>
                <div className="text-xl sm:text-2xl font-bold text-neutral-900 font-mono tabular-nums">
                  {heroData.statsSekolah}
                </div>
                <div className="text-xs text-neutral-500 mt-0.5">Sekolah Basis Ranting</div>
              </div>
              <div>
                <div className="text-xl sm:text-2xl font-bold text-emerald-700 font-mono tabular-nums">
                  {heroData.statsInklusif}
                </div>
                <div className="text-xs text-neutral-500 mt-0.5">Inklusif PAUD-SLB</div>
              </div>
              <div>
                <div className="text-xl sm:text-2xl font-bold text-red-700 font-mono tabular-nums">
                  {heroData.statsPilar}
                </div>
                <div className="text-xs text-neutral-500 mt-0.5">SAKTI Teruji Kelas</div>
              </div>
            </div>
          </div>

          {/* Right Column: Hero High-Res Imagery Frame & Quick Action Overlay */}
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl overflow-hidden shadow-xl border border-neutral-200 bg-neutral-100 group">
              <img
                src={ASSETS.heroBanner}
                alt="Pembelajaran Digital Interaktif PID di SMPN 2 Ciamis"
                className="w-full aspect-4/3 sm:aspect-16/10 lg:aspect-4/3 object-cover group-hover:scale-102 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />

              {/* Scrim Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/85 via-neutral-900/30 to-transparent" />

              {/* Top Status Tag */}
              <div className="absolute top-4 left-4 flex items-center space-x-2 bg-white/95 backdrop-blur-xs px-3 py-1.5 rounded-lg border border-neutral-200 shadow-xs">
                <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
                <span className="text-xs font-semibold text-neutral-800">
                  Laboratorium Smart PID Aktif
                </span>
              </div>

              {/* Bottom Card Annotation */}
              <div className="absolute bottom-4 inset-x-4 text-white space-y-2">
                <div className="text-xs font-mono text-red-300">
                  LOKASI: SMP NEGERI 2 CIAMIS · JL. SUDIRMAN 192
                </div>
                <h3 className="text-sm sm:text-base font-bold text-white leading-snug">
                  Implementasi Papan Interaktif Digital & Logika Koding Terpadu
                </h3>
                <div className="flex items-center justify-between pt-1 text-xs text-neutral-300">
                  <span>Dokumentasi Pembelajaran Berpikir Komputasional</span>
                  <button
                    onClick={() => onNavigate('sakti', 'pid')}
                    className="text-white hover:text-red-300 font-semibold underline underline-offset-2 flex items-center"
                  >
                    Pelajari PID
                  </button>
                </div>
              </div>
            </div>

            {/* Quick Helper Ribbon beneath image */}
            <div className="mt-3 p-3 bg-neutral-100/90 rounded-lg border border-neutral-200 flex items-center justify-between text-xs text-neutral-600">
              <span className="flex items-center">
                <ShieldCheck className="w-4 h-4 text-emerald-600 mr-1.5" />
                Terhubung dengan Rapor Pendidikan Ciamis
              </span>
              <button
                onClick={() => onNavigate('profil', 'pesan')}
                className="font-semibold text-red-700 hover:text-red-900"
              >
                Kirim Aspirasi &rarr;
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
