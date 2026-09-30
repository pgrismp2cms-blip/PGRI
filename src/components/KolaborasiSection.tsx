import React, { useState } from 'react';
import {
  Users,
  Building,
  Heart,
  Calendar,
  MapPin,
  CheckCircle2,
  ExternalLink,
  BookOpen,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { KOMUNITAS_ACTIVITIES, TEACHER_CONTRIBUTORS } from '../data/mockData';
import { KomunitasActivity, ContributorTeacher } from '../types';

interface KolaborasiSectionProps {
  activities?: KomunitasActivity[];
  contributors?: ContributorTeacher[];
}

export const KolaborasiSection: React.FC<KolaborasiSectionProps> = ({
  activities = KOMUNITAS_ACTIVITIES,
  contributors = TEACHER_CONTRIBUTORS,
}) => {
  const [activeTab, setActiveTab] = useState<'kombel' | 'dwp' | 'eksternal' | 'kontributor'>('kombel');

  const filteredActivities = activities.filter((item) => {
    if (activeTab === 'kombel') return item.type === 'KOMBEL' || item.type === 'MGMP' || item.type === 'KKG';
    if (activeTab === 'dwp') return item.type === 'DWP';
    if (activeTab === 'eksternal') return item.type === 'KOLABORASI';
    return true;
  });

  return (
    <section id="kolaborasi" className="py-16 sm:py-20 bg-neutral-50/70 border-b border-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-neutral-200 pb-8">
          <div className="space-y-3 max-w-3xl">
            <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-red-700">
              <Users className="w-4 h-4" />
              <span>Kolaborasi & Komunitas Belajar</span>
              <span aria-hidden="true">·</span>
              <span>Sinergi Tatar Galuh</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-neutral-900 tracking-tight text-balance">
              Ruang Gerak Komunitas Belajar & Kemitraan Strategis
            </h2>
            <p className="text-sm sm:text-base text-neutral-600 leading-relaxed">
              Liputan agenda terpadu Komunitas Belajar (Kombel SMPN 2 Ciamis, MGMP Informatika, KKG Gugus Dewi Sartika), Dharma Wanita Persatuan (DWP), dan kemitraan Pemkab, Puskesmas, serta Perguruan Tinggi.
            </p>
          </div>

          <div className="flex items-center space-x-2 text-xs text-neutral-500 bg-white p-3 rounded-xl border border-neutral-200">
            <Sparkles className="w-4 h-4 text-amber-600" />
            <span>Terhubung dengan Platform Merdeka Mengajar (PMM)</span>
          </div>
        </div>

        {/* Tab Controls */}
        <div className="flex items-center space-x-2 overflow-x-auto pb-2 scrollbar-none border-b border-neutral-200">
          <button
            onClick={() => setActiveTab('kombel')}
            className={`px-4 py-2.5 text-xs font-semibold rounded-t-lg transition-colors border-b-2 whitespace-nowrap ${
              activeTab === 'kombel'
                ? 'border-red-700 text-red-700 bg-white shadow-xs'
                : 'border-transparent text-neutral-600 hover:text-neutral-900'
            }`}
          >
            Komunitas Belajar (MGMP / KKG / Kombel)
          </button>
          <button
            onClick={() => setActiveTab('dwp')}
            className={`px-4 py-2.5 text-xs font-semibold rounded-t-lg transition-colors border-b-2 whitespace-nowrap ${
              activeTab === 'dwp'
                ? 'border-red-700 text-red-700 bg-white shadow-xs'
                : 'border-transparent text-neutral-600 hover:text-neutral-900'
            }`}
          >
            Dharma Wanita Persatuan (DWP) Cabang
          </button>
          <button
            onClick={() => setActiveTab('eksternal')}
            className={`px-4 py-2.5 text-xs font-semibold rounded-t-lg transition-colors border-b-2 whitespace-nowrap ${
              activeTab === 'eksternal'
                ? 'border-red-700 text-red-700 bg-white shadow-xs'
                : 'border-transparent text-neutral-600 hover:text-neutral-900'
            }`}
          >
            Kolaborasi Eksternal (Pemda, Puskesmas, Unigal)
          </button>
          <button
            onClick={() => setActiveTab('kontributor')}
            className={`px-4 py-2.5 text-xs font-semibold rounded-t-lg transition-colors border-b-2 whitespace-nowrap ${
              activeTab === 'kontributor'
                ? 'border-red-700 text-red-700 bg-white shadow-xs'
                : 'border-transparent text-neutral-600 hover:text-neutral-900'
            }`}
          >
            Profil Penulis & Guru Kontributor
          </button>
        </div>

        {/* Tab Content: Activities or Teacher Contributors */}
        {activeTab !== 'kontributor' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredActivities.map((act) => (
              <div
                key={act.id}
                className="bg-white rounded-xl border border-neutral-200 overflow-hidden shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="relative aspect-16/10 bg-neutral-900 overflow-hidden">
                    <img
                      src={act.image}
                      alt={act.title}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" />
                    <div className="absolute top-3 left-3 bg-red-700 text-white text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded">
                      {act.type}
                    </div>
                    <div className="absolute bottom-2 left-3 text-white text-xs font-medium">
                      {act.attendeesCount} Pendidik Terlibat
                    </div>
                  </div>

                  <div className="p-5 pt-0 space-y-3">
                    <div className="text-xs text-neutral-500 flex items-center space-x-2">
                      <Calendar className="w-3.5 h-3.5 text-neutral-400" />
                      <span>{act.date}</span>
                      <span>·</span>
                      <MapPin className="w-3.5 h-3.5 text-neutral-400" />
                      <span className="truncate">{act.location}</span>
                    </div>

                    <h3 className="font-bold text-base text-neutral-900 leading-snug">
                      {act.title}
                    </h3>

                    <p className="text-xs text-neutral-600 leading-relaxed line-clamp-3">
                      {act.description}
                    </p>

                    <div className="pt-2 border-t border-neutral-100 space-y-1">
                      <div className="text-[11px] font-semibold text-neutral-700">Hasil & Luaran:</div>
                      {act.highlights.map((h, i) => (
                        <div key={i} className="text-xs text-neutral-600 flex items-center space-x-1.5">
                          <CheckCircle2 className="w-3 h-3 text-emerald-600 shrink-0" />
                          <span className="truncate">{h}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="p-5 pt-2 border-t border-neutral-100 text-xs text-neutral-500 flex items-center justify-between">
                  <span>Penyelenggara: {act.organizer}</span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Guru Kontributor Lintas Jenjang */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {contributors.map((teacher) => (
              <div
                key={teacher.id}
                className="bg-white rounded-xl border border-neutral-200 p-5 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3 text-center">
                  <img
                    src={teacher.avatar}
                    alt={teacher.name}
                    className="w-20 h-20 rounded-full mx-auto object-cover border-2 border-red-100 shadow-xs"
                  />
                  <div>
                    <h3 className="font-bold text-sm text-neutral-900">{teacher.name}</h3>
                    <p className="text-xs text-red-800 font-medium">{teacher.school}</p>
                    <p className="text-[11px] text-neutral-500 mt-0.5">{teacher.jenjang}</p>
                  </div>
                  <div className="bg-neutral-50 p-2.5 rounded-lg border border-neutral-100 text-[11px] text-neutral-600 italic">
                    {teacher.quote}
                  </div>
                </div>

                <div className="pt-3 border-t border-neutral-100 flex items-center justify-between text-xs text-neutral-500">
                  <span>Keahlian: {teacher.specialty.split('&')[0]}</span>
                  <span className="font-semibold text-red-700">{teacher.articlesCount} Karya</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* External Strategic Partner Logos & Collaboration Strip */}
        <div className="p-6 bg-white rounded-2xl border border-neutral-200 space-y-4">
          <div className="text-xs font-bold uppercase tracking-wider text-neutral-500 text-center">
            Mitra Kolaborasi Strategis Pendidikan di Kecamatan Ciamis:
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center text-xs text-neutral-700 font-medium">
            <div className="p-3 rounded-lg bg-neutral-50 border border-neutral-100">
              <div className="font-bold text-neutral-900">Dinas Pendidikan Ciamis</div>
              <div className="text-[10px] text-neutral-500 mt-0.5">Regulasi & Fasilitasi Guru</div>
            </div>
            <div className="p-3 rounded-lg bg-neutral-50 border border-neutral-100">
              <div className="font-bold text-neutral-900">Universitas Galuh (Unigal)</div>
              <div className="text-[10px] text-neutral-500 mt-0.5">Pendampingan Riset & PTK</div>
            </div>
            <div className="p-3 rounded-lg bg-neutral-50 border border-neutral-100">
              <div className="font-bold text-neutral-900">Puskesmas Ciamis</div>
              <div className="text-[10px] text-neutral-500 mt-0.5">UKS & Skrining Remaja</div>
            </div>
            <div className="p-3 rounded-lg bg-neutral-50 border border-neutral-100">
              <div className="font-bold text-neutral-900">Mitra DUDI & Industri Kreatif</div>
              <div className="text-[10px] text-neutral-500 mt-0.5">Vokasi & Inkubasi Siswa</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
