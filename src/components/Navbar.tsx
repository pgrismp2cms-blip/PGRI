import React, { useState, useRef, useEffect } from 'react';
import {
  Search,
  Menu,
  X,
  ChevronDown,
  BookOpen,
  MapPin,
  Users,
  Award,
  Compass,
  Cpu,
  Home,
  MessageSquare,
  Sparkles,
  PhoneCall,
  GraduationCap,
  Shield,
  Image as ImageIcon
} from 'lucide-react';

interface NavbarProps {
  onOpenSearch: () => void;
  activeSection: string;
  onNavigate: (sectionId: string, subId?: string) => void;
  onOpenAdmin?: () => void;
  headerLogo?: string;
  headerLogoSecondary?: string;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenSearch,
  activeSection,
  onNavigate,
  onOpenAdmin,
  headerLogo,
  headerLogoSecondary,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profilDropdownOpen, setProfilDropdownOpen] = useState(false);
  const [saktiDropdownOpen, setSaktiDropdownOpen] = useState(false);

  const profilRef = useRef<HTMLDivElement>(null);
  const saktiRef = useRef<HTMLDivElement>(null);

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (profilRef.current && !profilRef.current.contains(e.target as Node)) {
        setProfilDropdownOpen(false);
      }
      if (saktiRef.current && !saktiRef.current.contains(e.target as Node)) {
        setSaktiDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLinkClick = (sectionId: string, subId?: string) => {
    onNavigate(sectionId, subId);
    setMobileMenuOpen(false);
    setProfilDropdownOpen(false);
    setSaktiDropdownOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-white shadow-xs border-b border-neutral-200 transition-all">
      {/* Top Announcement Strip */}
      <div className="bg-batik-pgri-red text-white text-[11px] font-medium py-1 px-4 sm:px-6 shadow-xs">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-2 truncate">
            <span className="bg-red-950/60 text-red-200 px-1.5 py-0.2 rounded text-[10px] uppercase font-bold tracking-wider">
              PGRI CIAMIS
            </span>
            <span className="truncate">
              Persatuan Guru Republik Indonesia Cabang Kec. Ciamis · Ranting SMPN 2 Ciamis
            </span>
          </div>
          <div className="flex items-center space-x-3 text-red-100 text-[11px] shrink-0">
            <span className="hidden lg:inline">Membangun Ekosistem Digital Ciamis Tangguh</span>
            <span className="hidden lg:inline">·</span>
            {onOpenAdmin && (
              <button
                onClick={onOpenAdmin}
                className="hidden lg:flex bg-white/20 hover:bg-white/30 text-white px-2 py-0.5 rounded text-[10px] uppercase font-bold tracking-wider items-center space-x-1 transition-colors"
                title="Panel Pengelola Konten (CMS)"
              >
                <Shield className="w-3 h-3" />
                <span>Menu Admin</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Main Header Branding Bar (Baris Atas: Logo, Judul & Tombol Aksi) */}
      <div className="bg-white border-b border-neutral-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-18">
            {/* Logo & Brand Wordmark */}
            <button
              onClick={() => handleLinkClick('beranda')}
              className="flex items-center space-x-2.5 sm:space-x-3 text-left group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-600 rounded p-1 transition-transform"
            >
              {/* Dynamic / Custom Uploaded Header Logo */}
              <div className="flex items-center space-x-2 shrink-0">
                {headerLogo ? (
                  <img
                    src={headerLogo}
                    alt="Logo PGRI"
                    className="h-10 sm:h-12 w-auto max-w-[48px] sm:max-w-[54px] object-contain drop-shadow-xs group-hover:scale-105 transition-transform"
                    onError={(e) => {
                      (e.target as HTMLElement).style.display = 'none';
                    }}
                  />
                ) : (
                  <div className="w-10 h-10 rounded-xl bg-red-700 text-white flex items-center justify-center font-bold text-lg shadow-xs group-hover:bg-red-800 transition-colors">
                    <span className="font-display font-extrabold tracking-tighter">P</span>
                  </div>
                )}

                {headerLogoSecondary && (
                  <img
                    src={headerLogoSecondary}
                    alt="Logo Sekolah"
                    className="h-10 sm:h-12 w-auto max-w-[48px] sm:max-w-[54px] object-contain drop-shadow-xs"
                    onError={(e) => {
                      (e.target as HTMLElement).style.display = 'none';
                    }}
                  />
                )}
              </div>

              {/* Text Identity */}
              <div className="leading-tight">
                <span className="block font-extrabold text-base sm:text-lg lg:text-xl text-neutral-900 tracking-tight group-hover:text-red-700 transition-colors">
                  PGRI Ranting SMPN 2 Ciamis
                </span>
                <span className="block text-[11px] sm:text-xs text-neutral-500 font-medium">
                  Cabang Kecamatan Ciamis · Tatar Galuh
                </span>
              </div>
            </button>

            {/* Quick Actions */}
            <div className="flex items-center space-x-2 sm:space-x-3">
              {/* Quick Search Trigger */}
              <button
                onClick={onOpenSearch}
                className="flex items-center space-x-2 px-2.5 sm:px-3 py-1.5 text-xs text-neutral-600 bg-neutral-100 hover:bg-neutral-200 rounded-lg transition-colors border border-neutral-200"
                title="Cari konten SAKTI, RPP, STAR..."
              >
                <Search className="w-3.5 h-3.5 text-neutral-600" />
                <span className="hidden sm:inline">Cari konten...</span>
                <kbd className="hidden sm:inline-block font-mono text-[10px] bg-white border border-neutral-300 px-1 rounded text-neutral-400">
                  /
                </kbd>
              </button>

              {/* Primary Action Button (Desktop Only: lg:flex) */}
              <button
                onClick={() => handleLinkClick('sakti')}
                className="hidden lg:flex items-center space-x-1.5 px-3.5 py-1.5 text-xs font-semibold text-white bg-red-700 hover:bg-red-800 rounded-lg shadow-xs transition-colors whitespace-nowrap"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Eksplor SAKTI</span>
              </button>

              {/* Hamburger Toggle (TAMPIL DI TAMPILAN HP & TABLET: lg:hidden) */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 text-neutral-700 hover:text-neutral-900 hover:bg-neutral-100 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-red-600"
                aria-label="Buka menu navigasi"
                title={mobileMenuOpen ? 'Tutup menu' : 'Buka menu'}
              >
                {mobileMenuOpen ? <X className="w-6 h-6 text-red-700" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* DEDICATED NAVIGATION BAR: HANYA TAMPIL DI DESKTOP (lg:block), PADA HP & TABLET MENGGUNAKAN HAMBURGER MENU */}
      <div className="hidden lg:block bg-neutral-50/95 border-b border-neutral-200 relative z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center justify-center min-w-max mx-auto space-x-2 xl:space-x-3 py-2 text-xs sm:text-sm font-medium text-neutral-700">
            {/* 1. Beranda */}
            <button
              onClick={() => handleLinkClick('beranda')}
              className={`flex items-center space-x-2 px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap shrink-0 ${
                activeSection === 'beranda'
                  ? 'bg-red-700 text-white font-semibold shadow-xs'
                  : 'text-neutral-700 hover:text-red-700 hover:bg-neutral-200/70'
              }`}
            >
              <Home className={`w-4 h-4 shrink-0 ${activeSection === 'beranda' ? 'text-white' : 'text-neutral-500'}`} />
              <span>Beranda</span>
            </button>

            {/* 2. Profil Dropdown */}
            <div
              className="relative shrink-0"
              ref={profilRef}
              onMouseEnter={() => setProfilDropdownOpen(true)}
              onMouseLeave={() => setProfilDropdownOpen(false)}
            >
              <button
                onClick={() => {
                  setProfilDropdownOpen(!profilDropdownOpen);
                  setSaktiDropdownOpen(false);
                }}
                className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap ${
                  activeSection === 'profil'
                    ? 'bg-red-700 text-white font-semibold shadow-xs'
                    : 'text-neutral-700 hover:text-red-700 hover:bg-neutral-200/70'
                }`}
                aria-expanded={profilDropdownOpen}
              >
                <Compass className={`w-4 h-4 shrink-0 ${activeSection === 'profil' ? 'text-white' : 'text-red-600'}`} />
                <span>Profil</span>
                <ChevronDown className={`w-3.5 h-3.5 shrink-0 transition-transform ${profilDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {profilDropdownOpen && (
                <div className="absolute top-full left-0 lg:left-1/2 lg:-translate-x-1/2 mt-1 w-64 bg-white rounded-xl shadow-2xl border border-neutral-200 py-2 z-50 animate-in fade-in slide-in-from-top-1 duration-150">
                  <div className="px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-neutral-400">
                    Menu & Informasi Profil
                  </div>
                  {/* Pilihan Semua Profil */}
                  <button
                    onClick={() => handleLinkClick('profil')}
                    className="w-full text-left px-3 py-2 text-xs text-red-700 font-bold hover:bg-red-50 flex items-center space-x-2 border-b border-neutral-100"
                  >
                    <Compass className="w-4 h-4 text-red-600 shrink-0" />
                    <div>
                      <div>Semua Profil Organisasi</div>
                      <div className="text-[10px] text-neutral-500 font-normal">Tampilkan seluruh ikhtisar profil</div>
                    </div>
                  </button>
                  <button
                    onClick={() => handleLinkClick('profil', 'sejarah')}
                    className="w-full text-left px-3 py-2 text-xs text-neutral-700 hover:bg-neutral-100 flex items-center space-x-2"
                  >
                    <BookOpen className="w-4 h-4 text-red-600 shrink-0" />
                    <div>
                      <div className="font-semibold text-neutral-900">Sejarah PGRI Ciamis</div>
                      <div className="text-[10px] text-neutral-500">Kilas jejak guru Tatar Galuh</div>
                    </div>
                  </button>
                  <button
                    onClick={() => handleLinkClick('profil', 'visi-misi')}
                    className="w-full text-left px-3 py-2 text-xs text-neutral-700 hover:bg-neutral-100 flex items-center space-x-2"
                  >
                    <Compass className="w-4 h-4 text-red-600 shrink-0" />
                    <div>
                      <div className="font-semibold text-neutral-900">Visi & Misi</div>
                      <div className="text-[10px] text-neutral-500">Ciamis Maju & Bermartabat</div>
                    </div>
                  </button>
                  <button
                    onClick={() => handleLinkClick('profil', 'pengurus')}
                    className="w-full text-left px-3 py-2 text-xs text-neutral-700 hover:bg-neutral-100 flex items-center space-x-2"
                  >
                    <Users className="w-4 h-4 text-red-600 shrink-0" />
                    <div>
                      <div className="font-semibold text-neutral-900">Struktur Pengurus</div>
                      <div className="text-[10px] text-neutral-500">Pimpinan Cabang & Ranting</div>
                    </div>
                  </button>
                  <button
                    onClick={() => handleLinkClick('profil', 'ranting')}
                    className="w-full text-left px-3 py-2 text-xs text-neutral-700 hover:bg-neutral-100 flex items-center space-x-2"
                  >
                    <GraduationCap className="w-4 h-4 text-red-600 shrink-0" />
                    <div>
                      <div className="font-semibold text-neutral-900">Daftar Ranting Sekolah</div>
                      <div className="text-[10px] text-neutral-500">Basis sekolah se-Kecamatan</div>
                    </div>
                  </button>
                  <div className="border-t border-neutral-100 my-1" />
                  <button
                    onClick={() => handleLinkClick('profil', 'peta')}
                    className="w-full text-left px-3 py-2 text-xs text-neutral-700 hover:bg-neutral-100 flex items-center space-x-2"
                  >
                    <MapPin className="w-4 h-4 text-emerald-600 shrink-0" />
                    <div>
                      <div className="font-semibold text-neutral-900">Peta Interaktif / Map</div>
                      <div className="text-[10px] text-neutral-500">Sebaran koordinat sekolah Ciamis</div>
                    </div>
                  </button>
                  <button
                    onClick={() => handleLinkClick('profil', 'pesan')}
                    className="w-full text-left px-3 py-2 text-xs text-neutral-700 hover:bg-neutral-100 flex items-center space-x-2"
                  >
                    <MessageSquare className="w-4 h-4 text-blue-600 shrink-0" />
                    <div>
                      <div className="font-semibold text-neutral-900">Form Pesan & Aspirasi</div>
                      <div className="text-[10px] text-neutral-500">Layanan komunikasi guru</div>
                    </div>
                  </button>
                </div>
              )}
            </div>

            {/* 3. SAKTI Dropdown */}
            <div
              className="relative shrink-0"
              ref={saktiRef}
              onMouseEnter={() => setSaktiDropdownOpen(true)}
              onMouseLeave={() => setSaktiDropdownOpen(false)}
            >
              <button
                onClick={() => {
                  setSaktiDropdownOpen(!saktiDropdownOpen);
                  setProfilDropdownOpen(false);
                }}
                className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap ${
                  activeSection === 'sakti'
                    ? 'bg-red-700 text-white font-semibold shadow-xs'
                    : 'text-neutral-700 hover:text-red-700 hover:bg-neutral-200/70'
                }`}
                aria-expanded={saktiDropdownOpen}
              >
                <Sparkles className={`w-4 h-4 shrink-0 ${activeSection === 'sakti' ? 'text-amber-200' : 'text-amber-600'}`} />
                <span>SAKTI</span>
                <span className={`text-[9px] font-bold px-1.5 py-0.2 rounded ml-0.5 ${
                  activeSection === 'sakti' ? 'bg-red-800 text-white' : 'bg-red-100 text-red-800'
                }`}>
                  UNGGULAN
                </span>
                <ChevronDown className={`w-3.5 h-3.5 shrink-0 transition-transform ${saktiDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {saktiDropdownOpen && (
                <div className="absolute top-full left-0 lg:left-1/2 lg:-translate-x-1/2 mt-1 w-72 bg-white rounded-xl shadow-2xl border border-neutral-200 py-2 z-50 animate-in fade-in slide-in-from-top-1 duration-150">
                  <div className="px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-neutral-400">
                    Pilar Transformasi SAKTI
                  </div>
                  {/* Pilihan Semua SAKTI */}
                  <button
                    onClick={() => handleLinkClick('sakti')}
                    className="w-full text-left px-3 py-2 text-xs text-red-700 font-bold hover:bg-red-50 flex items-center space-x-2.5 border-b border-neutral-100"
                  >
                    <Sparkles className="w-4 h-4 text-red-600 shrink-0" />
                    <div>
                      <div>Semua Pilar Inovasi SAKTI</div>
                      <div className="text-[10px] text-neutral-500 font-normal">Eksplorasi lengkap 4 pilar pendidikan</div>
                    </div>
                  </button>
                  <button
                    onClick={() => handleLinkClick('sakti', 'pembelajaran_mendalam')}
                    className="w-full text-left px-3 py-2 text-xs text-neutral-700 hover:bg-red-50 flex items-center space-x-2.5"
                  >
                    <Sparkles className="w-4 h-4 text-amber-600 shrink-0" />
                    <div>
                      <div className="font-semibold text-neutral-900">Pembelajaran Mendalam</div>
                      <div className="text-[10px] text-neutral-500">Deep Learning bernilai kontekstual Galuh</div>
                    </div>
                  </button>
                  <button
                    onClick={() => handleLinkClick('sakti', 'rumah_pendidikan')}
                    className="w-full text-left px-3 py-2 text-xs text-neutral-700 hover:bg-red-50 flex items-center space-x-2.5"
                  >
                    <Home className="w-4 h-4 text-blue-600 shrink-0" />
                    <div>
                      <div className="font-semibold text-neutral-900">Rumah Pendidikan</div>
                      <div className="text-[10px] text-neutral-500">Sinergi tri-pusat pendidikan Ciamis</div>
                    </div>
                  </button>
                  <button
                    onClick={() => handleLinkClick('sakti', 'pid')}
                    className="w-full text-left px-3 py-2 text-xs text-neutral-700 hover:bg-red-50 flex items-center space-x-2.5"
                  >
                    <Cpu className="w-4 h-4 text-red-600 shrink-0" />
                    <div>
                      <div className="font-semibold text-neutral-900">Papan Interaktif Digital (PID)</div>
                      <div className="text-[10px] text-neutral-500">Smart board layar sentuh di kelas</div>
                    </div>
                  </button>
                  <button
                    onClick={() => handleLinkClick('sakti', 'koding_kka')}
                    className="w-full text-left px-3 py-2 text-xs text-neutral-700 hover:bg-red-50 flex items-center space-x-2.5"
                  >
                    <BookOpen className="w-4 h-4 text-purple-600 shrink-0" />
                    <div>
                      <div className="font-semibold text-neutral-900">Koding & Logika KKA</div>
                      <div className="text-[10px] text-neutral-500">Kemampuan koding dan kecerdasan artifisial</div>
                    </div>
                  </button>
                  <div className="border-t border-neutral-100 my-1" />
                  <button
                    onClick={() => handleLinkClick('sakti', 'unggulan_jenjang')}
                    className="w-full text-left px-3 py-2 text-xs text-neutral-700 hover:bg-red-50 flex items-center space-x-2.5"
                  >
                    <Award className="w-4 h-4 text-emerald-600 shrink-0" />
                    <div>
                      <div className="font-semibold text-neutral-900">Program Unggulan Jenjang</div>
                      <div className="text-[10px] text-neutral-500">Inovasi terpadu PAUD, SD, SMP, SMA/SLB</div>
                    </div>
                  </button>
                </div>
              )}
            </div>

            {/* 4. Praktik Baik STAR */}
            <button
              onClick={() => handleLinkClick('jenjang')}
              className={`flex items-center space-x-2 px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap shrink-0 ${
                activeSection === 'jenjang'
                  ? 'bg-red-700 text-white font-semibold shadow-xs'
                  : 'text-neutral-700 hover:text-red-700 hover:bg-neutral-200/70'
              }`}
            >
              <Award className={`w-4 h-4 shrink-0 ${activeSection === 'jenjang' ? 'text-white' : 'text-emerald-600'}`} />
              <span>Praktik Baik STAR</span>
            </button>

            {/* 5. Kolaborasi & Komunitas */}
            <button
              onClick={() => handleLinkClick('kolaborasi')}
              className={`flex items-center space-x-2 px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap shrink-0 ${
                activeSection === 'kolaborasi'
                  ? 'bg-red-700 text-white font-semibold shadow-xs'
                  : 'text-neutral-700 hover:text-red-700 hover:bg-neutral-200/70'
              }`}
            >
              <Users className={`w-4 h-4 shrink-0 ${activeSection === 'kolaborasi' ? 'text-white' : 'text-blue-600'}`} />
              <span>Kolaborasi & Komunitas</span>
            </button>

            {/* 6. Galeri */}
            <button
              onClick={() => handleLinkClick('galeri')}
              className={`flex items-center space-x-2 px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap shrink-0 ${
                activeSection === 'galeri'
                  ? 'bg-red-700 text-white font-semibold shadow-xs'
                  : 'text-neutral-700 hover:text-red-700 hover:bg-neutral-200/70'
              }`}
            >
              <ImageIcon className={`w-4 h-4 shrink-0 ${activeSection === 'galeri' ? 'text-white' : 'text-purple-600'}`} />
              <span>Galeri</span>
            </button>

            {/* 7. Kontak */}
            <button
              onClick={() => handleLinkClick('kontak')}
              className={`flex items-center space-x-2 px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap shrink-0 ${
                activeSection === 'kontak'
                  ? 'bg-red-700 text-white font-semibold shadow-xs'
                  : 'text-neutral-700 hover:text-red-700 hover:bg-neutral-200/70'
              }`}
            >
              <PhoneCall className={`w-4 h-4 shrink-0 ${activeSection === 'kontak' ? 'text-white' : 'text-red-600'}`} />
              <span>Kontak</span>
            </button>
          </nav>
        </div>
      </div>

      {/* Brand Accent Line: Merah Putih Hitam - Freeze bersama Header (Tampil di Semua Layar: Desktop, Tablet, & HP) */}
      <div className="h-1 bg-gradient-to-r from-red-700 via-neutral-900 to-red-800 shadow-xs" />

      {/* Mobile & Tablet Drawer Navigation (TAMPIL KETIKA HAMBURGER DIBUKA DI HP & TABLET: lg:hidden) */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-neutral-200 bg-white px-4 sm:px-6 pt-3 pb-6 space-y-3 max-h-[85vh] overflow-y-auto animate-in fade-in">
          <div className="flex items-center justify-between pb-2 border-b border-neutral-100">
            <span className="text-xs font-bold uppercase tracking-wider text-red-700">
              Navigasi Utama PGRI Ciamis
            </span>
            <span className="text-[11px] text-neutral-400">Aturan 3-Klik</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs font-medium">
            <button
              onClick={() => handleLinkClick('beranda')}
              className="p-2.5 text-left bg-neutral-50 hover:bg-red-50 hover:text-red-700 rounded-lg border border-neutral-200 transition-colors flex items-center space-x-2"
            >
              <Home className="w-4 h-4 text-neutral-600 shrink-0" />
              <span>Beranda</span>
            </button>
            <button
              onClick={() => handleLinkClick('profil', 'sejarah')}
              className="p-2.5 text-left bg-neutral-50 hover:bg-red-50 hover:text-red-700 rounded-lg border border-neutral-200 transition-colors flex items-center space-x-2"
            >
              <Compass className="w-4 h-4 text-red-600 shrink-0" />
              <span>Profil PGRI</span>
            </button>
            <button
              onClick={() => handleLinkClick('sakti')}
              className="p-2.5 text-left bg-red-50 text-red-800 font-semibold rounded-lg border border-red-200 transition-colors flex items-center space-x-2"
            >
              <Sparkles className="w-4 h-4 text-amber-600 shrink-0" />
              <span>Pilar SAKTI</span>
            </button>
            <button
              onClick={() => handleLinkClick('jenjang')}
              className="p-2.5 text-left bg-neutral-50 hover:bg-red-50 hover:text-red-700 rounded-lg border border-neutral-200 transition-colors flex items-center space-x-2"
            >
              <Award className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Praktik STAR</span>
            </button>
            <button
              onClick={() => handleLinkClick('kolaborasi')}
              className="p-2.5 text-left bg-neutral-50 hover:bg-red-50 hover:text-red-700 rounded-lg border border-neutral-200 transition-colors flex items-center space-x-2"
            >
              <Users className="w-4 h-4 text-blue-600 shrink-0" />
              <span>Kombel & DWP</span>
            </button>
            <button
              onClick={() => handleLinkClick('profil', 'peta')}
              className="p-2.5 text-left bg-neutral-50 hover:bg-red-50 hover:text-red-700 rounded-lg border border-neutral-200 transition-colors flex items-center space-x-2"
            >
              <MapPin className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Peta Ranting</span>
            </button>
            <button
              onClick={() => handleLinkClick('galeri')}
              className="p-2.5 text-left bg-neutral-50 hover:bg-red-50 hover:text-red-700 rounded-lg border border-neutral-200 transition-colors flex items-center space-x-2"
            >
              <ImageIcon className="w-4 h-4 text-purple-600 shrink-0" />
              <span>Galeri Foto</span>
            </button>
            <button
              onClick={() => handleLinkClick('kontak')}
              className="p-2.5 text-left bg-neutral-50 hover:bg-red-50 hover:text-red-700 rounded-lg border border-neutral-200 transition-colors flex items-center space-x-2"
            >
              <PhoneCall className="w-4 h-4 text-red-600 shrink-0" />
              <span>Kontak Kami</span>
            </button>
          </div>

          <div className="pt-2 border-t border-neutral-100 grid grid-cols-1 sm:grid-cols-2 gap-3">
            {/* Sub-menu Profil */}
            <div>
              <div className="text-[11px] font-semibold text-neutral-500 uppercase tracking-wider mb-2 flex items-center justify-between">
                <span>Sub-Menu Profil:</span>
                <button
                  onClick={() => handleLinkClick('profil')}
                  className="text-red-700 font-bold hover:underline"
                >
                  Semua Profil →
                </button>
              </div>
              <div className="space-y-1 text-xs">
                <button
                  onClick={() => handleLinkClick('profil', 'sejarah')}
                  className="w-full text-left py-1.5 px-2 hover:bg-neutral-100 rounded text-neutral-700 flex items-center space-x-2"
                >
                  <BookOpen className="w-3.5 h-3.5 text-red-600" />
                  <span>Sejarah PGRI Ciamis</span>
                </button>
                <button
                  onClick={() => handleLinkClick('profil', 'visi-misi')}
                  className="w-full text-left py-1.5 px-2 hover:bg-neutral-100 rounded text-neutral-700 flex items-center space-x-2"
                >
                  <Compass className="w-3.5 h-3.5 text-red-600" />
                  <span>Visi & Misi Organisasi</span>
                </button>
                <button
                  onClick={() => handleLinkClick('profil', 'pengurus')}
                  className="w-full text-left py-1.5 px-2 hover:bg-neutral-100 rounded text-neutral-700 flex items-center space-x-2"
                >
                  <Users className="w-3.5 h-3.5 text-red-600" />
                  <span>Struktur Pengurus</span>
                </button>
                <button
                  onClick={() => handleLinkClick('profil', 'ranting')}
                  className="w-full text-left py-1.5 px-2 hover:bg-neutral-100 rounded text-neutral-700 flex items-center space-x-2"
                >
                  <GraduationCap className="w-3.5 h-3.5 text-red-600" />
                  <span>Daftar Ranting Sekolah</span>
                </button>
                <button
                  onClick={() => handleLinkClick('profil', 'peta')}
                  className="w-full text-left py-1.5 px-2 hover:bg-neutral-100 rounded text-neutral-700 flex items-center space-x-2"
                >
                  <MapPin className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Peta Interaktif Sekolah</span>
                </button>
                <button
                  onClick={() => handleLinkClick('profil', 'pesan')}
                  className="w-full text-left py-1.5 px-2 hover:bg-neutral-100 rounded text-neutral-700 flex items-center space-x-2"
                >
                  <MessageSquare className="w-3.5 h-3.5 text-blue-600" />
                  <span>Form Aspirasi Guru</span>
                </button>
              </div>
            </div>

            {/* Sub-menu SAKTI */}
            <div>
              <div className="text-[11px] font-semibold text-neutral-500 uppercase tracking-wider mb-2 flex items-center justify-between">
                <span>Sub-Menu SAKTI:</span>
                <button
                  onClick={() => handleLinkClick('sakti')}
                  className="text-red-700 font-bold hover:underline"
                >
                  Semua SAKTI →
                </button>
              </div>
              <div className="space-y-1 text-xs">
                <button
                  onClick={() => handleLinkClick('sakti', 'pembelajaran_mendalam')}
                  className="w-full text-left py-1.5 px-2 hover:bg-neutral-100 rounded text-neutral-700 flex items-center space-x-2"
                >
                  <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                  <span>Pembelajaran Mendalam (Deep Learning)</span>
                </button>
                <button
                  onClick={() => handleLinkClick('sakti', 'rumah_pendidikan')}
                  className="w-full text-left py-1.5 px-2 hover:bg-neutral-100 rounded text-neutral-700 flex items-center space-x-2"
                >
                  <Home className="w-3.5 h-3.5 text-blue-600" />
                  <span>Rumah Pendidikan (Tri Pusat Belajar)</span>
                </button>
                <button
                  onClick={() => handleLinkClick('sakti', 'pid')}
                  className="w-full text-left py-1.5 px-2 hover:bg-neutral-100 rounded text-neutral-700 flex items-center space-x-2"
                >
                  <Cpu className="w-3.5 h-3.5 text-red-600" />
                  <span>Papan Interaktif Digital (PID)</span>
                </button>
                <button
                  onClick={() => handleLinkClick('sakti', 'koding_kka')}
                  className="w-full text-left py-1.5 px-2 hover:bg-neutral-100 rounded text-neutral-700 flex items-center space-x-2"
                >
                  <BookOpen className="w-3.5 h-3.5 text-purple-600" />
                  <span>Koding & Kemampuan Artifisial (KKA)</span>
                </button>
                <button
                  onClick={() => handleLinkClick('sakti', 'unggulan_jenjang')}
                  className="w-full text-left py-1.5 px-2 hover:bg-neutral-100 rounded text-neutral-700 font-semibold text-red-700 flex items-center space-x-2"
                >
                  <Award className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Inovasi Unggulan PAUD, SD, SMP, SMA/SLB</span>
                </button>
              </div>
            </div>
          </div>

          {/* Mobile Admin Panel Button */}
          {onOpenAdmin && (
            <div className="pt-3 border-t border-neutral-200">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAdmin();
                }}
                className="w-full py-2.5 px-3 bg-red-700 hover:bg-red-800 text-white rounded-xl font-bold flex items-center justify-center space-x-2 text-xs shadow-xs transition-colors"
              >
                <Shield className="w-4 h-4 text-white" />
                <span>Buka Menu Admin (Kelola Semua Konten)</span>
              </button>
            </div>
          )}
        </div>
      )}
    </header>
  );
};
