import React, { useState, useEffect, useMemo } from 'react';
import {
  Search,
  X,
  BookOpen,
  School,
  Award,
  FileText,
  ArrowRight,
  Filter,
  User,
  GraduationCap,
  Sparkles,
  RotateCcw,
  Check
} from 'lucide-react';
import { SAKTI_ARTICLES, STAR_PRACTICES, RANTING_LIST, TEACHER_CONTRIBUTORS } from '../data/mockData';
import { SaktiContent, StarPractice, RantingSchool, ContributorTeacher } from '../types';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectSakti: (id: string) => void;
  onSelectStar: (id: string) => void;
  onSelectRanting: (id: string) => void;
  saktiArticles?: SaktiContent[];
  starPractices?: StarPractice[];
  rantingList?: RantingSchool[];
  contributorTeachers?: ContributorTeacher[];
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  onSelectSakti,
  onSelectStar,
  onSelectRanting,
  saktiArticles = SAKTI_ARTICLES,
  starPractices = STAR_PRACTICES,
  rantingList = RANTING_LIST,
  contributorTeachers = TEACHER_CONTRIBUTORS,
}) => {
  const [query, setQuery] = useState('');

  // Advanced Search Facets
  const [selectedJenjang, setSelectedJenjang] = useState<string>('all');
  const [selectedSaktiCategory, setSelectedSaktiCategory] = useState<string>('all');
  const [selectedAuthor, setSelectedAuthor] = useState<string>('all');
  const [showAdvancedFilters, setShowAdvancedFilters] = useState<boolean>(true);

  // Keyboard shortcut listener: ESC to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Extract distinct author/contributor list
  const allAuthors = useMemo(() => {
    const set = new Set<string>();
    saktiArticles.forEach((a) => set.add(a.author.name));
    starPractices.forEach((s) => set.add(s.authorName));
    contributorTeachers.forEach((t) => set.add(t.name));
    return Array.from(set).sort();
  }, [saktiArticles, starPractices, contributorTeachers]);

  // Reset all filters
  const handleResetFilters = () => {
    setQuery('');
    setSelectedJenjang('all');
    setSelectedSaktiCategory('all');
    setSelectedAuthor('all');
  };

  // Filter items based on query + facets
  const results = useMemo(() => {
    const q = query.trim().toLowerCase();

    // SAKTI filtering
    const sakti = saktiArticles.filter((article) => {
      // Keyword match
      const matchesQuery =
        !q ||
        article.title.toLowerCase().includes(q) ||
        article.subtitle.toLowerCase().includes(q) ||
        article.description.toLowerCase().includes(q) ||
        article.author.name.toLowerCase().includes(q) ||
        article.keyPoints.some((p) => p.toLowerCase().includes(q));

      // Sakti category match
      const matchesSaktiCategory =
        selectedSaktiCategory === 'all' ||
        article.category === selectedSaktiCategory ||
        (selectedSaktiCategory === 'unggulan_jenjang');

      // Jenjang match: SAKTI articles are primarily SMP/Fase D or Umum
      let matchesJenjang = true;
      if (selectedJenjang !== 'all') {
        if (selectedJenjang === 'smp') {
          matchesJenjang = article.modulName.includes('Fase D') || article.category === 'pid' || article.category === 'pembelajaran_mendalam';
        } else {
          matchesJenjang = article.category === 'rumah_pendidikan' || selectedSaktiCategory === 'unggulan_jenjang';
        }
      }

      // Author match
      const matchesAuthor =
        selectedAuthor === 'all' || article.author.name === selectedAuthor;

      return matchesQuery && matchesSaktiCategory && matchesJenjang && matchesAuthor;
    });

    // STAR Practices filtering
    const star = starPractices.filter((practice) => {
      // Keyword match
      const matchesQuery =
        !q ||
        practice.title.toLowerCase().includes(q) ||
        practice.summary.toLowerCase().includes(q) ||
        practice.schoolName.toLowerCase().includes(q) ||
        practice.authorName.toLowerCase().includes(q) ||
        practice.starDetails.aksi.toLowerCase().includes(q);

      // Jenjang match
      const matchesJenjang =
        selectedJenjang === 'all' || practice.jenjang === selectedJenjang;

      // Sakti category match
      let matchesSaktiCategory = true;
      if (selectedSaktiCategory !== 'all') {
        if (selectedSaktiCategory === 'pid') {
          matchesSaktiCategory = practice.title.includes('PID') || practice.id === 'star-smpn2-koding' || practice.id === 'star-slb-multisensori';
        } else if (selectedSaktiCategory === 'koding_kka') {
          matchesSaktiCategory = practice.id === 'star-smpn2-koding' || practice.id === 'star-paud-kartini';
        } else if (selectedSaktiCategory === 'pembelajaran_mendalam') {
          matchesSaktiCategory = practice.id === 'star-sd-literasi' || practice.id === 'star-smk-vokasi';
        } else if (selectedSaktiCategory === 'rumah_pendidikan') {
          matchesSaktiCategory = practice.id === 'star-sd-pinggiran' || practice.id === 'star-paud-kartini';
        }
      }

      // Author match
      const matchesAuthor =
        selectedAuthor === 'all' || practice.authorName === selectedAuthor;

      return matchesQuery && matchesJenjang && matchesSaktiCategory && matchesAuthor;
    });

    // Schools / Ranting filtering
    const ranting = rantingList.filter((school) => {
      // If author filter is active, schools don't directly match author unless query is active
      if (selectedAuthor !== 'all') return false;

      const matchesQuery =
        !q ||
        school.name.toLowerCase().includes(q) ||
        school.address.toLowerCase().includes(q) ||
        school.kepalaSekolah.toLowerCase().includes(q) ||
        school.innovations.some((i) => i.toLowerCase().includes(q));

      let matchesJenjang = true;
      if (selectedJenjang !== 'all') {
        if (selectedJenjang === 'paud') matchesJenjang = school.jenjang === 'PAUD';
        else if (selectedJenjang === 'sd') matchesJenjang = school.jenjang === 'SD';
        else if (selectedJenjang === 'smp') matchesJenjang = school.jenjang === 'SMP';
        else if (selectedJenjang === 'sma_smk_slb') matchesJenjang = school.jenjang === 'SMA/SMK' || school.jenjang === 'SLB';
      }

      return matchesQuery && matchesJenjang;
    });

    // Teachers filtering
    const teachers = TEACHER_CONTRIBUTORS.filter((t) => {
      const matchesQuery =
        !q ||
        t.name.toLowerCase().includes(q) ||
        t.school.toLowerCase().includes(q) ||
        t.specialty.toLowerCase().includes(q);

      const matchesAuthor =
        selectedAuthor === 'all' || t.name === selectedAuthor;

      let matchesJenjang = true;
      if (selectedJenjang !== 'all') {
        if (selectedJenjang === 'smp') matchesJenjang = t.jenjang.includes('SMP');
        else if (selectedJenjang === 'sd') matchesJenjang = t.jenjang.includes('SD');
        else if (selectedJenjang === 'sma_smk_slb') matchesJenjang = t.jenjang.includes('SLB') || t.jenjang.includes('SMA');
      }

      return matchesQuery && matchesAuthor && matchesJenjang;
    });

    return { sakti, star, ranting, teachers };
  }, [query, selectedJenjang, selectedSaktiCategory, selectedAuthor]);

  const totalResults =
    results.sakti.length + results.star.length + results.ranting.length + results.teachers.length;

  const hasActiveFilters =
    query.trim() !== '' ||
    selectedJenjang !== 'all' ||
    selectedSaktiCategory !== 'all' ||
    selectedAuthor !== 'all';

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 overflow-y-auto bg-neutral-950/75 backdrop-blur-xs flex items-start justify-center pt-3 sm:pt-12 px-2 sm:px-4 pb-8"
      onClick={onClose}
    >
      <div
        className="bg-white w-full max-w-3xl rounded-2xl shadow-2xl border border-neutral-200 overflow-hidden flex flex-col max-h-[94vh] sm:max-h-[88vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header & Search Input */}
        <div className="p-4 sm:p-5 border-b border-neutral-200 bg-neutral-50/70 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="w-2.5 h-2.5 rounded-full bg-red-700" />
              <span className="text-xs uppercase font-bold tracking-wider text-neutral-800">
                Pencarian Terpadu & Lanjutan · PGRI Ciamis
              </span>
            </div>
            <button
              onClick={onClose}
              className="p-1 rounded-lg text-neutral-400 hover:text-neutral-700 hover:bg-neutral-200 transition-colors"
              title="Tutup dialog"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Search Box Input */}
          <div className="relative flex items-center bg-white border border-neutral-300 rounded-xl px-3.5 py-2.5 shadow-xs focus-within:ring-2 focus-within:ring-red-600 focus-within:border-red-600">
            <Search className="w-4 h-4 text-neutral-400 mr-2.5 shrink-0" />
            <input
              type="text"
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Cari inovasi PID, koding KKA, RPP modul, sekolah, atau nama guru..."
              className="w-full bg-transparent text-xs sm:text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none"
            />
            {query && (
              <button
                onClick={() => setQuery('')}
                className="p-1 hover:bg-neutral-100 rounded text-neutral-400 hover:text-neutral-700 text-xs"
                title="Hapus kata kunci"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Advanced Filter Bar (Jenjang, SAKTI, Penulis) */}
          <div className="bg-white p-3.5 rounded-xl border border-neutral-200 space-y-2.5 text-xs">
            <div className="flex items-center justify-between">
              <span className="font-bold text-neutral-800 flex items-center text-[11px] uppercase tracking-wider">
                <Filter className="w-3.5 h-3.5 text-red-700 mr-1.5" />
                Filter Kategori Lanjutan:
              </span>
              {hasActiveFilters && (
                <button
                  onClick={handleResetFilters}
                  className="text-red-700 hover:text-red-800 font-semibold flex items-center space-x-1"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Reset Filter</span>
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              {/* 1. Filter Jenjang */}
              <div className="space-y-1">
                <label className="text-[11px] font-medium text-neutral-600 block flex items-center">
                  <GraduationCap className="w-3 h-3 mr-1 text-neutral-400" /> Jenjang Pendidikan:
                </label>
                <select
                  value={selectedJenjang}
                  onChange={(e) => setSelectedJenjang(e.target.value)}
                  className="w-full bg-neutral-50 border border-neutral-200 rounded-lg p-1.5 text-xs text-neutral-800 focus:outline-none focus:border-red-600 font-medium"
                >
                  <option value="all">Semua Jenjang</option>
                  <option value="paud">PAUD / TK</option>
                  <option value="sd">SD (Sekolah Dasar)</option>
                  <option value="smp">SMP (Fase D - Ranting Pusat)</option>
                  <option value="sma_smk_slb">SMA / SMK / SLB</option>
                </select>
              </div>

              {/* 2. Filter Kategori SAKTI */}
              <div className="space-y-1">
                <label className="text-[11px] font-medium text-neutral-600 block flex items-center">
                  <Sparkles className="w-3 h-3 mr-1 text-red-600" /> Kategori SAKTI:
                </label>
                <select
                  value={selectedSaktiCategory}
                  onChange={(e) => setSelectedSaktiCategory(e.target.value)}
                  className="w-full bg-neutral-50 border border-neutral-200 rounded-lg p-1.5 text-xs text-neutral-800 focus:outline-none focus:border-red-600 font-medium"
                >
                  <option value="all">Semua Pilar SAKTI</option>
                  <option value="pembelajaran_mendalam">Pembelajaran Mendalam (Deep Learning)</option>
                  <option value="rumah_pendidikan">Rumah Pendidikan</option>
                  <option value="pid">Papan Interaktif Digital (PID)</option>
                  <option value="koding_kka">Koding & Logika KKA</option>
                  <option value="unggulan_jenjang">Inovasi Unggulan Jenjang</option>
                </select>
              </div>

              {/* 3. Filter Penulis / Kontributor */}
              <div className="space-y-1">
                <label className="text-[11px] font-medium text-neutral-600 block flex items-center">
                  <User className="w-3 h-3 mr-1 text-neutral-400" /> Penulis / Kontributor:
                </label>
                <select
                  value={selectedAuthor}
                  onChange={(e) => setSelectedAuthor(e.target.value)}
                  className="w-full bg-neutral-50 border border-neutral-200 rounded-lg p-1.5 text-xs text-neutral-800 focus:outline-none focus:border-red-600 font-medium"
                >
                  <option value="all">Semua Penulis</option>
                  {allAuthors.map((author) => (
                    <option key={author} value={author}>
                      {author}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Results Container */}
        <div className="overflow-y-auto p-4 sm:p-6 space-y-6 flex-1">
          {totalResults === 0 && (
            <div className="text-center py-12 text-neutral-500 text-xs sm:text-sm space-y-2">
              <p className="font-semibold text-neutral-700">Tidak ada data yang cocok dengan kriteria pencarian.</p>
              <p className="text-neutral-400 max-w-sm mx-auto">
                Coba sesuaikan kata kunci atau ubah filter jenjang, kategori SAKTI, atau nama penulis di atas.
              </p>
              <button
                onClick={handleResetFilters}
                className="mt-2 px-3 py-1.5 bg-red-700 text-white rounded-lg text-xs font-semibold hover:bg-red-800 transition-colors"
              >
                Reset Semua Filter
              </button>
            </div>
          )}

          {/* 1. SAKTI Articles Match */}
          {results.sakti.length > 0 && (
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-red-800 pb-1 border-b border-red-100">
                <span className="flex items-center">
                  <BookOpen className="w-3.5 h-3.5 mr-1" />
                  Inovasi SAKTI ({results.sakti.length})
                </span>
                <span className="text-[10px] text-neutral-400 lowercase font-normal">klik untuk buka modul & video</span>
              </div>
              <div className="space-y-2">
                {results.sakti.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      onSelectSakti(item.id);
                      onClose();
                    }}
                    className="w-full text-left p-3.5 hover:bg-red-50/60 rounded-xl border border-neutral-200 transition-all flex items-start justify-between group hover:border-red-300"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2 text-[11px] text-neutral-500">
                        <span className="font-semibold text-red-700 uppercase">
                          {item.category.replace('_', ' ')}
                        </span>
                        <span>·</span>
                        <span>{item.author.name}</span>
                        <span>·</span>
                        <span>{item.author.school}</span>
                      </div>
                      <h4 className="text-sm font-bold text-neutral-900 group-hover:text-red-700 transition-colors">
                        {item.title}
                      </h4>
                      <p className="text-xs text-neutral-600 line-clamp-1">{item.subtitle}</p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-neutral-300 group-hover:text-red-700 shrink-0 ml-3 mt-1.5 transition-transform group-hover:translate-x-1" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* 2. STAR Practices Match */}
          {results.star.length > 0 && (
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-emerald-800 pb-1 border-b border-emerald-100">
                <span className="flex items-center">
                  <Award className="w-3.5 h-3.5 mr-1" />
                  Praktik Baik STAR ({results.star.length})
                </span>
                <span className="text-[10px] text-neutral-400 lowercase font-normal">klik untuk baca telaah STAR</span>
              </div>
              <div className="space-y-2">
                {results.star.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      onSelectStar(item.id);
                      onClose();
                    }}
                    className="w-full text-left p-3.5 hover:bg-emerald-50/60 rounded-xl border border-neutral-200 transition-all flex items-start justify-between group hover:border-emerald-300"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2 text-[11px] text-neutral-500">
                        <span className="font-semibold text-emerald-800 uppercase">
                          JENJANG {item.jenjang.toUpperCase()}
                        </span>
                        <span>·</span>
                        <span>{item.authorName}</span>
                        <span>·</span>
                        <span>{item.schoolName}</span>
                      </div>
                      <h4 className="text-sm font-bold text-neutral-900 group-hover:text-emerald-700 transition-colors">
                        {item.title}
                      </h4>
                      <p className="text-xs text-neutral-600 line-clamp-1">{item.summary}</p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-neutral-300 group-hover:text-emerald-700 shrink-0 ml-3 mt-1.5 transition-transform group-hover:translate-x-1" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* 3. Ranting & School Locations */}
          {results.ranting.length > 0 && (
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-neutral-800 pb-1 border-b border-neutral-200">
                <span className="flex items-center">
                  <School className="w-3.5 h-3.5 mr-1 text-red-700" />
                  Sekolah & Ranting Ciamis ({results.ranting.length})
                </span>
                <span className="text-[10px] text-neutral-400 lowercase font-normal">klik untuk lihat di peta</span>
              </div>
              <div className="space-y-2">
                {results.ranting.map((school) => (
                  <button
                    key={school.id}
                    onClick={() => {
                      onSelectRanting(school.id);
                      onClose();
                    }}
                    className="w-full text-left p-3 hover:bg-neutral-50 rounded-xl border border-neutral-200 transition-all flex items-start justify-between group"
                  >
                    <div className="space-y-0.5">
                      <div className="flex items-center space-x-2 text-[11px] text-neutral-500">
                        <span className="font-bold text-red-700">JENJANG {school.jenjang}</span>
                        <span>·</span>
                        <span>NPSN: {school.npsn}</span>
                        <span>·</span>
                        <span>{school.jumlahGuru} Guru</span>
                      </div>
                      <h4 className="text-sm font-bold text-neutral-900 group-hover:text-red-700">
                        {school.name}
                      </h4>
                      <p className="text-xs text-neutral-500 line-clamp-1">{school.address}</p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-neutral-300 group-hover:text-red-700 shrink-0 ml-2 mt-1" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* 4. Teacher Contributors */}
          {results.teachers.length > 0 && (
            <div className="space-y-2">
              <div className="text-xs font-bold uppercase tracking-wider text-purple-800 pb-1 border-b border-purple-100 flex items-center">
                <FileText className="w-3.5 h-3.5 mr-1" />
                Penulis & Kontributor Guru ({results.teachers.length})
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {results.teachers.map((teacher) => (
                  <div
                    key={teacher.id}
                    className="p-3 bg-neutral-50 rounded-xl border border-neutral-200 flex items-center space-x-3"
                  >
                    <img
                      src={teacher.avatar}
                      alt={teacher.name}
                      className="w-10 h-10 rounded-full object-cover border border-neutral-200 shrink-0"
                    />
                    <div className="overflow-hidden">
                      <h4 className="text-xs font-bold text-neutral-900 truncate">{teacher.name}</h4>
                      <p className="text-[11px] text-neutral-500 truncate">{teacher.school}</p>
                      <p className="text-[10px] text-red-700 font-medium truncate">{teacher.specialty}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer info bar */}
        <div className="px-5 py-3 bg-neutral-50 border-t border-neutral-200 text-xs text-neutral-500 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span>Ditemukan <strong>{totalResults}</strong> entri</span>
            <span>·</span>
            <span className="hidden sm:inline">Pencarian cerdas berindeks PGRI Cabang Ciamis</span>
          </div>
          <button
            onClick={onClose}
            className="px-3 py-1 bg-neutral-200 hover:bg-neutral-300 text-neutral-800 rounded font-semibold transition-colors"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
};
