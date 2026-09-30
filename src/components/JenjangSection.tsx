import React, { useState } from 'react';
import {
  Award,
  Filter,
  School,
  Calendar,
  Clock,
  ArrowRight,
  CheckCircle2,
  FileText,
  MapPin
} from 'lucide-react';
import { STAR_PRACTICES } from '../data/mockData';
import { JenjangType, SchoolCategory, StarPractice } from '../types';

interface JenjangSectionProps {
  onSelectPractice: (practice: StarPractice) => void;
  practices?: StarPractice[];
}

export const JenjangSection: React.FC<JenjangSectionProps> = ({
  onSelectPractice,
  practices = STAR_PRACTICES,
}) => {
  const [activeJenjang, setActiveJenjang] = useState<string>('all');
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const jenjangTabs = [
    { id: 'all', label: 'Semua Jenjang' },
    { id: 'paud', label: '1. PAUD/TK (Bermain & Kognitif)' },
    { id: 'sd', label: '2. SD (Literasi & Numerasi)' },
    { id: 'smp', label: '3. SMP (Karakter & Teknologi PID)' },
    { id: 'sma_smk_slb', label: '4. SMA/SMK/SLB (Vokasi & Inklusi)' },
  ];

  const categoryFilters = [
    { id: 'all', label: 'Semua Status' },
    { id: 'negeri', label: 'Sekolah Negeri' },
    { id: 'swasta', label: 'Sekolah Swasta' },
    { id: 'slb', label: 'SLB / Pendidikan Khusus' },
    { id: 'terpencil', label: 'Daerah Pinggiran / Bantaran' },
  ];

  const filteredPractices = practices.filter((item) => {
    const matchesJenjang = activeJenjang === 'all' || item.jenjang === activeJenjang;
    const matchesCategory = activeCategory === 'all' || item.schoolCategory === activeCategory;
    return matchesJenjang && matchesCategory;
  });

  return (
    <section id="jenjang" className="py-16 sm:py-20 bg-white border-b border-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-neutral-200 pb-8">
          <div className="space-y-3 max-w-3xl">
            <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-emerald-800">
              <Award className="w-4 h-4" />
              <span>Keterwakilan & Kanal Jenjang</span>
              <span aria-hidden="true">·</span>
              <span>Metode STAR Autentik</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-neutral-900 tracking-tight text-balance">
              Kanal Praktik Baik Guru se-Kecamatan Ciamis
            </h2>
            <p className="text-sm sm:text-base text-neutral-600 leading-relaxed">
              Pemerataan publikasi karya guru dari jenjang PAUD, SD, SMP, SMA/SMK, hingga SLB, merangkul sekolah negeri, swasta, dan daerah pinggiran di Kabupaten Ciamis.
            </p>
          </div>

          <div className="bg-emerald-50 border border-emerald-200 p-3.5 rounded-xl text-xs text-emerald-900 shrink-0">
            <span className="font-bold block mb-1">Struktur Penulisan STAR:</span>
            <div className="text-emerald-800 space-y-0.5">
              <span><strong>S</strong>ituasi · <strong>T</strong>antangan · <strong>A</strong>ksi · <strong>R</strong>efleksi</span>
            </div>
          </div>
        </div>

        {/* Tab 1: Jenjang Navigation */}
        <div className="flex items-center overflow-x-auto pb-2 scrollbar-none gap-2">
          {jenjangTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveJenjang(tab.id)}
              className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
                activeJenjang === tab.id
                  ? 'bg-neutral-900 text-white shadow-xs'
                  : 'bg-neutral-100 text-neutral-600 hover:text-neutral-900 hover:bg-neutral-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab 2: School Category / Inclusivity Filter */}
        <div className="flex flex-wrap items-center gap-2 pt-1 pb-2 text-xs border-y border-neutral-100 py-3">
          <span className="text-neutral-400 font-medium flex items-center mr-2">
            <Filter className="w-3.5 h-3.5 mr-1" /> Filter Keterwakilan:
          </span>
          {categoryFilters.map((filter) => (
            <button
              key={filter.id}
              onClick={() => setActiveCategory(filter.id)}
              className={`px-3 py-1 rounded text-xs transition-colors ${
                activeCategory === filter.id
                  ? 'bg-red-50 text-red-800 font-semibold border border-red-200'
                  : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100'
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>

        {/* STAR Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPractices.map((practice) => (
            <div
              key={practice.id}
              onClick={() => onSelectPractice(practice)}
              className="bg-white rounded-xl border border-neutral-200 hover:border-neutral-300 shadow-xs hover:shadow-md transition-all flex flex-col justify-between overflow-hidden cursor-pointer group"
            >
              <div className="space-y-4">
                {/* Visual Media with Scrim */}
                <div className="relative aspect-16/10 bg-neutral-100 overflow-hidden">
                  <img
                    src={practice.image}
                    alt={practice.title}
                    className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-300"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                  {/* School Name & Category Tag */}
                  <div className="absolute top-3 left-3 flex items-center space-x-1.5 bg-black/60 backdrop-blur-xs text-white text-[11px] px-2.5 py-0.5 rounded font-medium">
                    <School className="w-3 h-3 text-red-300 mr-1" />
                    <span>{practice.schoolName}</span>
                  </div>

                  <div className="absolute bottom-2 left-3 right-3 text-white text-xs">
                    <span className="text-[11px] text-neutral-300 uppercase tracking-wider font-semibold">
                      {practice.schoolCategory === 'negeri' && 'Sekolah Negeri'}
                      {practice.schoolCategory === 'swasta' && 'Sekolah Swasta'}
                      {practice.schoolCategory === 'slb' && 'Pendidikan Khusus (SLB)'}
                      {practice.schoolCategory === 'terpencil' && 'Daerah Pinggiran'}
                    </span>
                  </div>
                </div>

                {/* Card Content Details */}
                <div className="p-5 pt-0 space-y-3">
                  {/* Clean unboxed metadata (Anti-slop zero pill rule) */}
                  <div className="flex items-center space-x-2 text-xs text-neutral-500">
                    <span>{practice.authorName}</span>
                    <span aria-hidden="true">·</span>
                    <span>{practice.readTime}</span>
                  </div>

                  <h3 className="font-bold text-base text-neutral-900 group-hover:text-red-700 transition-colors line-clamp-2 leading-snug">
                    {practice.title}
                  </h3>

                  <p className="text-xs text-neutral-600 line-clamp-3 leading-relaxed">
                    {practice.summary}
                  </p>

                  {/* Mini STAR Preview Pill Grid */}
                  <div className="bg-neutral-50 p-2.5 rounded-lg border border-neutral-100 text-[11px] space-y-1">
                    <div className="flex items-center justify-between text-neutral-500">
                      <span className="font-semibold text-neutral-800">Fokus Dampak Nyata:</span>
                      <span className="text-emerald-700 font-bold font-mono">
                        {practice.impactStats[0]?.metric}
                      </span>
                    </div>
                    <div className="text-neutral-600 truncate">
                      {practice.impactStats[0]?.label}
                    </div>
                  </div>
                </div>
              </div>

              {/* Card Footer Action */}
              <div className="p-5 pt-3 border-t border-neutral-100 flex items-center justify-between text-xs font-semibold text-red-700 group-hover:text-red-800">
                <span>Baca Telaah STAR Lengkap</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>

        {filteredPractices.length === 0 && (
          <div className="text-center py-12 bg-neutral-50 rounded-xl border border-neutral-200 text-neutral-500 text-sm">
            <p>Tidak ada artikel yang cocok dengan kombinasi filter yang dipilih.</p>
            <button
              onClick={() => {
                setActiveJenjang('all');
                setActiveCategory('all');
              }}
              className="mt-2 text-xs font-semibold text-red-700 underline"
            >
              Reset Semua Filter
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
