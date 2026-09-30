import React, { useState } from 'react';
import {
  Sparkles,
  Cpu,
  Home,
  BookOpen,
  Download,
  Play,
  CheckCircle2,
  FileText,
  Calendar,
  Clock,
  ArrowRight,
  Layers,
  GraduationCap
} from 'lucide-react';
import { SAKTI_ARTICLES } from '../data/mockData';
import { SaktiContent } from '../types';

interface SaktiSectionProps {
  onOpenModule: (content: SaktiContent) => void;
  onOpenVideo: (content: SaktiContent) => void;
  activeSubcategory?: string;
  onSelectPractice?: (jenjang: string) => void;
  articles?: SaktiContent[];
}

export const SaktiSection: React.FC<SaktiSectionProps> = ({
  onOpenModule,
  onOpenVideo,
  activeSubcategory,
  onSelectPractice,
  articles = SAKTI_ARTICLES,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>(
    activeSubcategory || 'all'
  );

  const categories = [
    { id: 'all', label: 'Semua Pilar SAKTI' },
    { id: 'pembelajaran_mendalam', label: 'Pembelajaran Mendalam' },
    { id: 'pid', label: 'PID Smart Board & Koding' },
    { id: 'rumah_pendidikan', label: 'Rumah Pendidikan' },
    { id: 'unggulan_jenjang', label: 'Inovasi Unggulan Jenjang' },
  ];

  const filteredArticles = selectedCategory === 'all'
    ? articles
    : articles.filter((a) => a.category === selectedCategory || selectedCategory === 'unggulan_jenjang');

  return (
    <section id="sakti" className="py-16 sm:py-20 bg-neutral-50/60 border-b border-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-neutral-200 pb-8">
          <div className="space-y-3 max-w-3xl">
            <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-red-700">
              <Sparkles className="w-4 h-4" />
              <span>Program Transformasi Akademik</span>
              <span aria-hidden="true">·</span>
              <span>SAKTI PGRI CIAMIS</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-neutral-900 tracking-tight text-balance">
              Inovasi Pembelajaran Digital & Pembelajaran Mendalam
            </h2>
            <p className="text-sm sm:text-base text-neutral-600 leading-relaxed">
              Dokumentasi orisinal penerapan Papan Interaktif Digital (PID), logika koding berpikir komputasional, serta penyelarasan Rumah Pendidikan berbasis nilai keluhuran Tatar Galuh.
            </p>
          </div>

          {/* SAKTI Acronym Legend Banner */}
          <div className="bg-white p-3.5 rounded-xl border border-neutral-200 shadow-xs shrink-0 text-xs">
            <span className="font-bold text-red-700 block mb-1">Filosofi SAKTI Ciamis:</span>
            <div className="text-neutral-600 space-y-0.5">
              <div><strong className="text-neutral-900 font-semibold">S</strong>inergis & Santun</div>
              <div><strong className="text-neutral-900 font-semibold">A</strong>daptif Teknologi (PID & Koding)</div>
              <div><strong className="text-neutral-900 font-semibold">K</strong>arakter Berkelanjutan (Galuh)</div>
              <div><strong className="text-neutral-900 font-semibold">T</strong>erampil Inkuiri Abad 21</div>
              <div><strong className="text-neutral-900 font-semibold">I</strong>nklusif Lintas Jenjang</div>
            </div>
          </div>
        </div>

        {/* Interactive Segmented Filter Controls */}
        <div className="flex items-center overflow-x-auto pb-2 scrollbar-none gap-2">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
                selectedCategory === cat.id
                  ? 'bg-red-700 text-white shadow-xs'
                  : 'bg-white text-neutral-600 hover:text-neutral-900 border border-neutral-200 hover:bg-neutral-100'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* SAKTI Core Articles Showcase */}
        {selectedCategory !== 'unggulan_jenjang' && (
          <div className="space-y-12">
            {filteredArticles.map((article, idx) => (
              <div
                key={article.id}
                className="bg-white rounded-2xl border border-neutral-200 overflow-hidden shadow-xs hover:shadow-md transition-shadow grid grid-cols-1 lg:grid-cols-12 gap-0"
              >
                {/* Visual Media Column (Left) */}
                <div className="lg:col-span-5 relative bg-neutral-950 aspect-4/3 lg:aspect-auto min-h-[300px] overflow-hidden group">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  {/* Subtle Contrast Scrim */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

                  {/* Top Metadata */}
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-xs text-neutral-900 text-xs font-semibold px-2.5 py-1 rounded shadow-xs">
                    {article.category === 'pembelajaran_mendalam' && 'Pembelajaran Mendalam'}
                    {article.category === 'pid' && 'PID Smart Board & Koding'}
                    {article.category === 'rumah_pendidikan' && 'Rumah Pendidikan'}
                  </div>

                  {/* Play Video Trigger Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <button
                      onClick={() => onOpenVideo(article)}
                      className="w-14 h-14 rounded-full bg-red-700/90 text-white flex items-center justify-center shadow-lg hover:bg-red-600 hover:scale-110 transition-all focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-red-400"
                      title="Putar Video Pembelajaran Interaktif"
                    >
                      <Play className="w-6 h-6 ml-0.5 fill-current" />
                    </button>
                  </div>

                  {/* Bottom Caption inside media */}
                  <div className="absolute bottom-3 inset-x-3 text-white text-xs flex items-center justify-between">
                    <span className="truncate">Dokumentasi Aksi Guru SMPN 2 Ciamis</span>
                    <span className="font-mono text-neutral-300">{article.videoDuration}</span>
                  </div>
                </div>

                {/* Content Details Column (Right) */}
                <div className="lg:col-span-7 p-6 sm:p-8 flex flex-col justify-between space-y-6">
                  <div className="space-y-4">
                    {/* Metadata line (Anti-slop zero pill discipline) */}
                    <div className="flex flex-wrap items-center gap-2 text-xs text-neutral-500">
                      <span className="font-semibold text-neutral-900">{article.author.name}</span>
                      <span aria-hidden="true">·</span>
                      <span>{article.author.school}</span>
                      <span aria-hidden="true">·</span>
                      <span className="flex items-center">
                        <Calendar className="w-3.5 h-3.5 mr-1" />
                        {article.publishedDate}
                      </span>
                      <span aria-hidden="true">·</span>
                      <span className="flex items-center">
                        <Clock className="w-3.5 h-3.5 mr-1" />
                        {article.readTime}
                      </span>
                    </div>

                    {/* Headline */}
                    <h3 className="text-xl sm:text-2xl font-bold text-neutral-900 tracking-tight leading-snug">
                      {article.title}
                    </h3>

                    {/* Subtitle & Deck */}
                    <p className="text-xs sm:text-sm font-medium text-red-800">
                      {article.subtitle}
                    </p>
                    <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
                      {article.description}
                    </p>

                    {/* Key Strategic Implementation Points */}
                    <div className="bg-neutral-50 border border-neutral-200 rounded-lg p-4 space-y-2 text-xs">
                      <div className="font-bold text-neutral-800 uppercase tracking-wide text-[11px]">
                        Poin Kunci Kurikulum & Asesmen:
                      </div>
                      <div className="space-y-1.5">
                        {article.keyPoints.map((point, kIdx) => (
                          <div key={kIdx} className="flex items-start space-x-2 text-neutral-700">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                            <span>{point}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Dual Action Toolbar (Modul Download & Interactive Video) */}
                  <div className="pt-4 border-t border-neutral-100 flex flex-wrap items-center justify-between gap-3">
                    <div className="flex items-center space-x-2 text-xs text-neutral-500">
                      <FileText className="w-4 h-4 text-neutral-400" />
                      <span className="truncate max-w-[200px] sm:max-w-xs">{article.modulName}</span>
                    </div>

                    <div className="flex items-center space-x-2.5 w-full sm:w-auto">
                      <button
                        onClick={() => onOpenVideo(article)}
                        className="flex-1 sm:flex-none px-3.5 py-2 text-xs font-medium text-neutral-700 bg-neutral-100 hover:bg-neutral-200 rounded-lg transition-colors flex items-center justify-center space-x-1.5"
                      >
                        <Play className="w-3.5 h-3.5 text-red-700" />
                        <span>Tonton Video</span>
                      </button>

                      <button
                        onClick={() => onOpenModule(article)}
                        className="flex-1 sm:flex-none px-4 py-2 text-xs font-semibold text-white bg-red-700 hover:bg-red-800 rounded-lg shadow-xs transition-colors flex items-center justify-center space-x-1.5"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span>Unduh Modul / RPP (PDF)</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Program Unggulan Jenjang (Special Section) */}
        {(selectedCategory === 'all' || selectedCategory === 'unggulan_jenjang') && (
          <div className="mt-12 bg-white rounded-2xl border border-neutral-200 p-6 sm:p-10 shadow-xs space-y-8">
            <div className="max-w-3xl space-y-2">
              <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-emerald-800">
                <GraduationCap className="w-4 h-4" />
                <span>Program Unggulan Jenjang Terintegrasi</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-neutral-900 tracking-tight">
                Penyelarasan Inovasi Berkesinambungan: PAUD, SD, SMP, hingga SMA/SMK/SLB
              </h3>
              <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
                Memastikan transisi pembelajaran anak di Kecamatan Ciamis berjalan mulus dari usia dini hingga siap kerja/kuliah melalui kurikulum yang saling terhubung.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* PAUD/TK */}
              <div className="p-5 rounded-xl bg-amber-50/50 border border-amber-200 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <div className="text-xs font-bold text-amber-900 uppercase tracking-wider">
                    01. PAUD & TK
                  </div>
                  <h4 className="font-bold text-neutral-900 text-sm">
                    Inovasi Bermain & Logika Kognitif
                  </h4>
                  <p className="text-xs text-neutral-600 leading-relaxed">
                    Pengenalan pola (patterning) dan nalar komputasional awal dengan loose parts alami Tatar Galuh tanpa ketergantungan gawai.
                  </p>
                </div>
                <div className="pt-2 border-t border-amber-200/60 text-xs text-amber-900 font-medium">
                  Basis: TK Kartini & Gugus PAUD Ciamis
                </div>
              </div>

              {/* SD */}
              <div className="p-5 rounded-xl bg-blue-50/50 border border-blue-200 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <div className="text-xs font-bold text-blue-900 uppercase tracking-wider">
                    02. Sekolah Dasar (SD)
                  </div>
                  <h4 className="font-bold text-neutral-900 text-sm">
                    Inovasi Literasi & Numerasi Kontekstual
                  </h4>
                  <p className="text-xs text-neutral-600 leading-relaxed">
                    Gerakan Nyukcruk Galuh: memproduksi buku cerita digital sejarah lokal, pojok numerasi digital berhitung cepat.
                  </p>
                </div>
                <div className="pt-2 border-t border-blue-200/60 text-xs text-blue-900 font-medium">
                  Basis: SDN 1 Ciamis & KKG Dewi Sartika
                </div>
              </div>

              {/* SMP */}
              <div className="p-5 rounded-xl bg-red-50/50 border border-red-200 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <div className="text-xs font-bold text-red-900 uppercase tracking-wider">
                    03. SMP (Unggulan Ranting)
                  </div>
                  <h4 className="font-bold text-neutral-900 text-sm">
                    Karakter & Teknologi PID/KKA
                  </h4>
                  <p className="text-xs text-neutral-600 leading-relaxed">
                    Laboratorium Smart PID, koding blok berpikir komputasional, serta integrasi nilai kearifan lokal Sunda dalam sains.
                  </p>
                </div>
                <div className="pt-2 border-t border-red-200/60 text-xs text-red-900 font-medium">
                  Basis: SMPN 2 Ciamis & MGMP Informatika
                </div>
              </div>

              {/* SMA/SMK/SLB */}
              <div className="p-5 rounded-xl bg-emerald-50/50 border border-emerald-200 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <div className="text-xs font-bold text-emerald-900 uppercase tracking-wider">
                    04. SMA, SMK & SLB
                  </div>
                  <h4 className="font-bold text-neutral-900 text-sm">
                    Vokasi, Riset & Inklusivitas Khusus
                  </h4>
                  <p className="text-xs text-neutral-600 leading-relaxed">
                    Smart greenhouse IoT untuk pertanian Ciamis dan kelas multisensori layar sentuh bagi siswa autistik/disabilitas.
                  </p>
                </div>
                <div className="pt-2 border-t border-emerald-200/60 text-xs text-emerald-900 font-medium">
                  Basis: SMAN 1, SMKN 1 & SLBN Ciamis
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
