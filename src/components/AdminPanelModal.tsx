import React, { useState } from 'react';
import {
  X,
  Shield,
  Lock,
  LogOut,
  Save,
  Plus,
  Trash2,
  Edit3,
  CheckCircle2,
  RotateCcw,
  BookOpen,
  Award,
  School,
  Image,
  Users,
  MessageSquare,
  Home,
  Compass,
  AlertCircle,
  Download,
  Eye,
  PhoneCall,
  Building,
  Upload
} from 'lucide-react';
import {
  SaktiContent,
  StarPractice,
  RantingSchool,
  PengurusItem,
  GalleryItem,
  HeroContent,
  ContactMessage,
  JenjangType,
  SchoolCategory,
  KomunitasActivity,
  ContributorTeacher,
  ContactInfo
} from '../types';
import { ImageUploadField } from './ImageUploadField';
import { uploadImageToServer } from '../utils/imageUpload';

interface AdminPanelModalProps {
  isOpen: boolean;
  onClose: () => void;
  // Data states & setters
  heroData: HeroContent;
  onUpdateHero: (data: HeroContent) => void;
  saktiArticles: SaktiContent[];
  onUpdateSakti: (articles: SaktiContent[]) => void;
  starPractices: StarPractice[];
  onUpdateStar: (practices: StarPractice[]) => void;
  rantingList: RantingSchool[];
  onUpdateRanting: (schools: RantingSchool[]) => void;
  pengurusList: PengurusItem[];
  onUpdatePengurus: (pengurus: PengurusItem[]) => void;
  komunitasActivities: KomunitasActivity[];
  onUpdateKomunitas: (activities: KomunitasActivity[]) => void;
  contributorTeachers: ContributorTeacher[];
  onUpdateContributors: (teachers: ContributorTeacher[]) => void;
  galleryItems: GalleryItem[];
  onUpdateGallery: (items: GalleryItem[]) => void;
  organizationData: { sejarah: string; visi: string; misi: string[] };
  onUpdateOrganization: (data: { sejarah: string; visi: string; misi: string[] }) => void;
  contactInfo: ContactInfo;
  onUpdateContactInfo: (info: ContactInfo) => void;
  messages: ContactMessage[];
  onUpdateMessages: (messages: ContactMessage[]) => void;
  onResetAllData: () => void;
}

export const AdminPanelModal: React.FC<AdminPanelModalProps> = ({
  isOpen,
  onClose,
  heroData,
  onUpdateHero,
  saktiArticles,
  onUpdateSakti,
  starPractices,
  onUpdateStar,
  rantingList,
  onUpdateRanting,
  pengurusList,
  onUpdatePengurus,
  komunitasActivities,
  onUpdateKomunitas,
  contributorTeachers,
  onUpdateContributors,
  galleryItems,
  onUpdateGallery,
  organizationData,
  onUpdateOrganization,
  contactInfo,
  onUpdateContactInfo,
  messages,
  onUpdateMessages,
  onResetAllData,
}) => {
  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return localStorage.getItem('pgri_admin_logged') === 'true';
  });
  const [adminUsername, setAdminUsername] = useState('admin2cms');
  const [adminPass, setAdminPass] = useState('');
  const [authError, setAuthError] = useState('');

  // Active Admin Menu Tab
  const [activeTab, setActiveTab] = useState<
    'hero' | 'sakti' | 'star' | 'kolaborasi' | 'profil' | 'ranting' | 'galeri' | 'kontak' | 'pesan'
  >('hero');

  // Notification feedback
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Editing state for SAKTI
  const [editingSakti, setEditingSakti] = useState<SaktiContent | null>(null);
  const [isCreatingSakti, setIsCreatingSakti] = useState(false);

  // Editing state for STAR
  const [editingStar, setEditingStar] = useState<StarPractice | null>(null);
  const [isCreatingStar, setIsCreatingStar] = useState(false);

  // Editing state for Komunitas & Kolaborasi
  const [editingKomunitas, setEditingKomunitas] = useState<KomunitasActivity | null>(null);
  const [isCreatingKomunitas, setIsCreatingKomunitas] = useState(false);
  const [kolaborasiSubTab, setKolaborasiSubTab] = useState<'kegiatan' | 'penulis'>('kegiatan');

  // Editing state for Contributor Teacher
  const [editingContributor, setEditingContributor] = useState<ContributorTeacher | null>(null);
  const [isCreatingContributor, setIsCreatingContributor] = useState(false);

  // Editing state for Ranting
  const [editingSchool, setEditingSchool] = useState<RantingSchool | null>(null);
  const [isCreatingSchool, setIsCreatingSchool] = useState(false);

  // Editing state for Pengurus
  const [editingPengurus, setEditingPengurus] = useState<PengurusItem | null>(null);
  const [isCreatingPengurus, setIsCreatingPengurus] = useState(false);

  // Editing state for Galeri
  const [editingGallery, setEditingGallery] = useState<GalleryItem | null>(null);
  const [isCreatingGallery, setIsCreatingGallery] = useState(false);

  // Organization temp state
  const [orgSejarah, setOrgSejarah] = useState(organizationData.sejarah);
  const [orgVisi, setOrgVisi] = useState(organizationData.visi);
  const [orgMisiText, setOrgMisiText] = useState(organizationData.misi.join('\n'));

  // Hero temp state
  const [tempHero, setTempHero] = useState<HeroContent>({ ...heroData });

  // Contact temp state
  const [tempContact, setTempContact] = useState<ContactInfo>({ ...contactInfo });

  if (!isOpen) return null;

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const user = adminUsername.trim().toLowerCase();
    const pass = adminPass.trim();

    const isValidUser =
      user === 'admin2cms' ||
      user === 'pgri.smp2cms@gmail.com' ||
      user === 'admin' ||
      user === 'adminpgri';

    const isValidPass =
      pass === '123456789' ||
      pass === 'pgri2026' ||
      pass === 'adminpgri' ||
      pass === 'admin';

    if (isValidUser && isValidPass) {
      setIsAuthenticated(true);
      localStorage.setItem('pgri_admin_logged', 'true');
      setAuthError('');
      showToast('Berhasil masuk ke Panel Admin PGRI Ciamis!');
    } else {
      setAuthError('Username atau kata sandi tidak cocok. Gunakan username "admin2cms" dan kata sandi "123456789".');
    }
  };

  const handleQuickFillCredentials = () => {
    setAdminUsername('admin2cms');
    setAdminPass('123456789');
    setAuthError('');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('pgri_admin_logged');
    showToast('Telah keluar dari sesi admin.');
  };

  // Logo Header Upload handler
  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>, isSecondary = false) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2.5 * 1024 * 1024) {
        showToast('Ukuran berkas logo maksimal 2.5 MB.');
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        if (isSecondary) {
          setTempHero((prev) => ({ ...prev, headerLogoSecondary: result }));
        } else {
          setTempHero((prev) => ({ ...prev, headerLogo: result }));
        }
        showToast('Logo berhasil diunggah! Klik Simpan untuk menerapkan ke header.');
      };
      reader.readAsDataURL(file);
    }
  };

  // Save Hero
  const handleSaveHero = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateHero(tempHero);
    showToast('Konten Beranda & Hero berhasil diperbarui!');
  };

  // SAKTI Handlers
  const handleSaveSaktiItem = (item: SaktiContent) => {
    if (isCreatingSakti) {
      onUpdateSakti([item, ...saktiArticles]);
      showToast('Inovasi SAKTI baru berhasil ditambahkan!');
    } else {
      onUpdateSakti(saktiArticles.map((a) => (a.id === item.id ? item : a)));
      showToast('Konten SAKTI berhasil diperbarui!');
    }
    setEditingSakti(null);
    setIsCreatingSakti(false);
  };

  const handleDeleteSaktiItem = (id: string) => {
    if (window.confirm('Yakin ingin menghapus artikel SAKTI ini?')) {
      onUpdateSakti(saktiArticles.filter((a) => a.id !== id));
      showToast('Artikel SAKTI telah dihapus.');
    }
  };

  // STAR Handlers
  const handleSaveStarItem = (item: StarPractice) => {
    if (isCreatingStar) {
      onUpdateStar([item, ...starPractices]);
      showToast('Praktik Baik STAR baru berhasil ditambahkan!');
    } else {
      onUpdateStar(starPractices.map((p) => (p.id === item.id ? item : p)));
      showToast('Praktik Baik STAR berhasil diperbarui!');
    }
    setEditingStar(null);
    setIsCreatingStar(false);
  };

  const handleDeleteStarItem = (id: string) => {
    if (window.confirm('Yakin ingin menghapus praktik baik STAR ini?')) {
      onUpdateStar(starPractices.filter((p) => p.id !== id));
      showToast('Praktik Baik STAR telah dihapus.');
    }
  };

  // Ranting School Handlers
  const handleSaveSchoolItem = (item: RantingSchool) => {
    if (isCreatingSchool) {
      onUpdateRanting([...rantingList, item]);
      showToast('Basis Ranting Sekolah baru berhasil ditambahkan ke Peta!');
    } else {
      onUpdateRanting(rantingList.map((s) => (s.id === item.id ? item : s)));
      showToast('Data Ranting Sekolah & Marker Peta berhasil diperbarui!');
    }
    setEditingSchool(null);
    setIsCreatingSchool(false);
  };

  const handleDeleteSchoolItem = (id: string) => {
    if (window.confirm('Yakin ingin menghapus sekolah basis ranting ini dari peta?')) {
      onUpdateRanting(rantingList.filter((s) => s.id !== id));
      showToast('Sekolah basis telah dihapus dari sistem & peta.');
    }
  };

  // Pengurus Handlers
  const handleSavePengurusItem = (item: PengurusItem) => {
    if (isCreatingPengurus) {
      onUpdatePengurus([...pengurusList, item]);
      showToast('Data Pengurus baru berhasil ditambahkan!');
    } else {
      onUpdatePengurus(pengurusList.map((p) => (p.id === item.id ? item : p)));
      showToast('Data Pengurus berhasil diperbarui!');
    }
    setEditingPengurus(null);
    setIsCreatingPengurus(false);
  };

  const handleDeletePengurusItem = (id: string) => {
    if (window.confirm('Yakin ingin menghapus pengurus ini?')) {
      onUpdatePengurus(pengurusList.filter((p) => p.id !== id));
      showToast('Pengurus telah dihapus.');
    }
  };

  // Komunitas Handlers
  const handleSaveKomunitasItem = (item: KomunitasActivity) => {
    if (isCreatingKomunitas) {
      onUpdateKomunitas([item, ...komunitasActivities]);
      showToast('Agenda Komunitas Belajar baru berhasil ditambahkan!');
    } else {
      onUpdateKomunitas(komunitasActivities.map((k) => (k.id === item.id ? item : k)));
      showToast('Agenda kegiatan komunitas berhasil diperbarui!');
    }
    setEditingKomunitas(null);
    setIsCreatingKomunitas(false);
  };

  const handleDeleteKomunitasItem = (id: string) => {
    if (window.confirm('Yakin ingin menghapus agenda kegiatan ini?')) {
      onUpdateKomunitas(komunitasActivities.filter((k) => k.id !== id));
      showToast('Agenda kegiatan telah dihapus.');
    }
  };

  // Contributor Teachers Handlers
  const handleSaveContributorItem = (item: ContributorTeacher) => {
    if (isCreatingContributor) {
      onUpdateContributors([...contributorTeachers, item]);
      showToast('Profil Penulis Guru baru berhasil ditambahkan!');
    } else {
      onUpdateContributors(contributorTeachers.map((c) => (c.id === item.id ? item : c)));
      showToast('Profil Penulis Guru berhasil diperbarui!');
    }
    setEditingContributor(null);
    setIsCreatingContributor(false);
  };

  const handleDeleteContributorItem = (id: string) => {
    if (window.confirm('Yakin ingin menghapus profil penulis guru ini?')) {
      onUpdateContributors(contributorTeachers.filter((c) => c.id !== id));
      showToast('Profil penulis guru telah dihapus.');
    }
  };

  // Contact Info Save
  const handleSaveContactInfo = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateContactInfo(tempContact);
    showToast('Informasi Kontak & Sekretariat resmi berhasil diperbarui!');
  };

  // Gallery Handlers
  const handleSaveGalleryItem = (item: GalleryItem) => {
    if (isCreatingGallery) {
      onUpdateGallery([item, ...galleryItems]);
      showToast('Dokumentasi Galeri baru berhasil ditambahkan!');
    } else {
      onUpdateGallery(galleryItems.map((g) => (g.id === item.id ? item : g)));
      showToast('Foto dokumentasi berhasil diperbarui!');
    }
    setEditingGallery(null);
    setIsCreatingGallery(false);
  };

  const handleDeleteGalleryItem = (id: string) => {
    if (window.confirm('Yakin ingin menghapus foto dokumentasi ini?')) {
      onUpdateGallery(galleryItems.filter((g) => g.id !== id));
      showToast('Foto dokumentasi telah dihapus.');
    }
  };

  // Organization Save
  const handleSaveOrganization = (e: React.FormEvent) => {
    e.preventDefault();
    const misiArray = orgMisiText
      .split('\n')
      .map((m) => m.trim())
      .filter((m) => m.length > 0);
    onUpdateOrganization({
      sejarah: orgSejarah,
      visi: orgVisi,
      misi: misiArray,
    });
    showToast('Profil, Visi, Misi & Sejarah berhasil diperbarui!');
  };

  // Message Status update
  const handleUpdateMessageStatus = (id: string, status: 'baru' | 'diproses' | 'selesai') => {
    onUpdateMessages(messages.map((m) => (m.id === id ? { ...m, status } : m)));
    showToast('Status aspirasi berhasil diperbarui.');
  };

  const handleDeleteMessage = (id: string) => {
    if (window.confirm('Hapus aspirasi ini dari kotak masuk?')) {
      onUpdateMessages(messages.filter((m) => m.id !== id));
      showToast('Aspirasi telah dihapus.');
    }
  };

  // Export JSON backup
  const handleExportBackup = () => {
    const backup = {
      heroData,
      saktiArticles,
      starPractices,
      komunitasActivities,
      contributorTeachers,
      rantingList,
      pengurusList,
      galleryItems,
      organizationData,
      contactInfo,
      messages,
      exportedAt: new Date().toISOString(),
    };
    const blob = new Blob([JSON.stringify(backup, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `backup_pgri_ciamis_${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    showToast('Cadangan data berhasil diunduh (JSON)!');
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 overflow-y-auto bg-neutral-950/80 backdrop-blur-xs flex items-center justify-center p-2 sm:p-4"
    >
      <div
        className="bg-white w-full max-w-5xl rounded-2xl shadow-2xl border border-neutral-300 overflow-hidden flex flex-col max-h-[94vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="bg-batik-pgri-red text-white px-5 py-3.5 flex items-center justify-between border-b border-red-900">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-lg bg-white/20 backdrop-blur-xs flex items-center justify-center font-bold">
              <Shield className="w-4 h-4 text-white" />
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-bold leading-tight">
                Panel Administrator & Pengelola Konten (CMS)
              </h3>
              <p className="text-[11px] text-red-200">
                PGRI Cabang Kec. Ciamis · Ranting SMPN 2 Ciamis
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            {isAuthenticated && (
              <button
                onClick={handleLogout}
                className="hidden sm:flex items-center space-x-1 px-2.5 py-1 text-xs bg-red-950/60 hover:bg-red-950 rounded text-red-200 transition-colors"
                title="Keluar dari Panel Admin"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Keluar</span>
              </button>
            )}
            <button
              onClick={onClose}
              className="p-1 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition-colors"
              title="Tutup Panel"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Toast Feedback Ribbon */}
        {toastMessage && (
          <div className="bg-emerald-600 text-white text-xs px-4 py-2 flex items-center justify-between shadow-xs animate-in fade-in">
            <span className="flex items-center">
              <CheckCircle2 className="w-4 h-4 mr-2 shrink-0" />
              {toastMessage}
            </span>
            <button onClick={() => setToastMessage(null)} className="text-white/80 hover:text-white">
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {/* Content Area: Authentication View OR Dashboard CMS View */}
        {!isAuthenticated ? (
          /* Login Screen */
          <div className="p-6 sm:p-12 max-w-md mx-auto w-full space-y-6">
            <div className="text-center space-y-2">
              <div className="w-12 h-12 rounded-full bg-red-100 text-red-700 flex items-center justify-center mx-auto mb-2">
                <Lock className="w-6 h-6" />
              </div>
              <h4 className="text-lg font-bold text-neutral-900">
                Autentikasi Pengurus PGRI
              </h4>
              <p className="text-xs text-neutral-500">
                Masuk untuk mengedit teks beranda, pilar SAKTI, praktik baik STAR, titik peta ranting, pengurus, dan galeri.
              </p>
            </div>

            {authError && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-xs text-red-700 flex items-start space-x-2">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                <span>{authError}</span>
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-4 text-xs">
              <div className="space-y-1">
                <label className="font-semibold text-neutral-700">Username Admin</label>
                <input
                  type="text"
                  required
                  value={adminUsername}
                  onChange={(e) => setAdminUsername(e.target.value)}
                  className="w-full p-2.5 bg-neutral-50 border border-neutral-300 rounded-lg focus:outline-none focus:border-red-600 font-medium"
                  placeholder="admin2cms"
                />
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-neutral-700">Kata Sandi (Password)</label>
                <input
                  type="password"
                  required
                  value={adminPass}
                  onChange={(e) => setAdminPass(e.target.value)}
                  className="w-full p-2.5 bg-neutral-50 border border-neutral-300 rounded-lg focus:outline-none focus:border-red-600"
                  placeholder="123456789"
                />
              </div>

              <div className="p-2.5 bg-neutral-100 rounded-lg border border-neutral-200 text-[11px] text-neutral-600 flex flex-col space-y-0.5">
                <span className="font-semibold text-neutral-800">Kredensial Login Resmi:</span>
                <div>Username: <strong className="text-red-700 font-mono">admin2cms</strong></div>
                <div>Password: <strong className="text-red-700 font-mono">123456789</strong></div>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 bg-red-700 hover:bg-red-800 text-white font-semibold rounded-lg transition-colors shadow-xs"
              >
                Masuk ke Panel Pengelola
              </button>

              <button
                type="button"
                onClick={handleQuickFillCredentials}
                className="w-full py-2 bg-neutral-100 hover:bg-neutral-200 text-neutral-700 font-medium rounded-lg text-[11px] transition-colors"
              >
                1-Klik Isi Kredensial (admin2cms / 123456789)
              </button>
            </form>
          </div>
        ) : (
          /* CMS Dashboard View */
          <div className="flex-1 flex flex-col md:flex-row overflow-hidden text-xs">
            {/* Sidebar Tabs */}
            <aside className="w-full md:w-60 bg-neutral-100 border-r border-neutral-200 p-3 space-y-1 shrink-0 overflow-x-auto md:overflow-y-auto flex md:flex-col gap-1 md:gap-0">
              <div className="hidden md:block px-3 py-2 text-[10px] font-bold uppercase tracking-wider text-neutral-400">
                Menu Pengelolaan
              </div>

              {[
                { id: 'hero', label: '1. Header & Beranda', icon: Home },
                { id: 'sakti', label: `2. Pilar SAKTI (${saktiArticles.length})`, icon: BookOpen },
                { id: 'star', label: `3. Praktik STAR (${starPractices.length})`, icon: Award },
                { id: 'kolaborasi', label: `4. Kolaborasi (${komunitasActivities.length})`, icon: Users },
                { id: 'profil', label: '5. Visi, Misi & Pengurus', icon: Compass },
                { id: 'ranting', label: `6. Peta & Ranting (${rantingList.length})`, icon: School },
                { id: 'galeri', label: `7. Galeri Foto (${galleryItems.length})`, icon: Image },
                { id: 'kontak', label: '8. Kontak Sekretariat', icon: PhoneCall },
                { id: 'pesan', label: `9. Aspirasi Masuk (${messages.length})`, icon: MessageSquare },
              ].map((menu) => {
                const Icon = menu.icon;
                const isActive = activeTab === menu.id;
                return (
                  <button
                    key={menu.id}
                    onClick={() => {
                      setActiveTab(menu.id as any);
                      setEditingSakti(null);
                      setEditingStar(null);
                      setEditingSchool(null);
                      setEditingPengurus(null);
                      setEditingGallery(null);
                      setEditingKomunitas(null);
                      setEditingContributor(null);
                    }}
                    className={`w-full text-left px-3 py-2.5 rounded-lg font-medium transition-colors flex items-center space-x-2 whitespace-nowrap ${
                      isActive
                        ? 'bg-red-700 text-white shadow-xs font-semibold'
                        : 'text-neutral-700 hover:bg-neutral-200'
                    }`}
                  >
                    <Icon className="w-4 h-4 shrink-0" />
                    <span>{menu.label}</span>
                  </button>
                );
              })}

              <div className="pt-3 border-t border-neutral-200 mt-auto hidden md:block space-y-1.5">
                <button
                  onClick={handleExportBackup}
                  className="w-full text-left px-3 py-2 text-[11px] text-neutral-600 hover:bg-neutral-200 rounded flex items-center space-x-1.5"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Ekspor Cadangan (JSON)</span>
                </button>
                <button
                  onClick={() => {
                    if (window.confirm('Kembalikan seluruh data konten ke standar awal PGRI Ciamis?')) {
                      onResetAllData();
                      showToast('Seluruh data berhasil dikembalikan ke standar awal.');
                    }
                  }}
                  className="w-full text-left px-3 py-2 text-[11px] text-red-700 hover:bg-red-50 rounded flex items-center space-x-1.5"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reset ke Data Awal</span>
                </button>
              </div>
            </aside>

            {/* Main Content Workspace */}
            <main className="flex-1 p-4 sm:p-6 overflow-y-auto bg-white space-y-6">
              {/* TAB 1: BERANDA & HERO */}
              {activeTab === 'hero' && (
                <form onSubmit={handleSaveHero} className="space-y-6 max-w-2xl">
                  <div className="flex items-center justify-between pb-3 border-b border-neutral-200">
                    <div>
                      <h4 className="font-bold text-base text-neutral-900">
                        Pengaturan Header, Logo & Beranda
                      </h4>
                      <p className="text-neutral-500">
                        Upload logo header, sesuaikan judul besar, tema, dan metrik pencapaian yang tampil di halaman depan.
                      </p>
                    </div>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-red-700 hover:bg-red-800 text-white rounded-lg font-semibold flex items-center space-x-1.5 shadow-xs"
                    >
                      <Save className="w-3.5 h-3.5" />
                      <span>Simpan Header & Beranda</span>
                    </button>
                  </div>

                  {/* PENGATURAN UPLOAD LOGO HEADER */}
                  <div className="bg-red-50/50 p-4 sm:p-5 rounded-2xl border border-red-200 space-y-4">
                    <div className="flex items-center justify-between border-b border-red-200/80 pb-3">
                      <div className="flex items-center space-x-2">
                        <Upload className="w-4 h-4 text-red-700" />
                        <h5 className="font-bold text-sm text-neutral-900">Pengaturan Upload Logo Header Website</h5>
                      </div>
                      <span className="text-[10px] bg-red-100 text-red-800 font-bold px-2 py-0.5 rounded">
                        Tampil Statis di Semua Perangkat
                      </span>
                    </div>

                    <div className="space-y-4">
                      {/* Logo Utama Header */}
                      <ImageUploadField
                        label="Logo Utama Header (Logo PGRI / Instansi)"
                        value={tempHero.headerLogo || ''}
                        onChange={(url) => setTempHero({ ...tempHero, headerLogo: url })}
                        aspectRatio="square"
                        description="Format PNG transparan / SVG disarankan"
                        placeholder="https://... atau klik upload berkas"
                      />

                      {/* Logo Sekunder Sekolah */}
                      <ImageUploadField
                        label="Logo Sekunder (Logo SMPN 2 Ciamis / Satuan Pendidikan)"
                        value={tempHero.headerLogoSecondary || ''}
                        onChange={(url) => setTempHero({ ...tempHero, headerLogoSecondary: url })}
                        aspectRatio="square"
                        description="Opsional: Tampil berdampingan dengan logo utama"
                        placeholder="https://... atau klik upload berkas"
                      />

                      {/* Banner Utama Beranda */}
                      <ImageUploadField
                        label="Gambar Banner Utama Hero Beranda"
                        value={tempHero.heroBanner || ''}
                        onChange={(url) => setTempHero({ ...tempHero, heroBanner: url })}
                        aspectRatio="video"
                        description="Banner resolusi tinggi di halaman depan (rasio 16:9 disarankan)"
                        placeholder="https://... atau klik upload berkas"
                      />
                    </div>

                    {/* Preset 1-Klik */}
                    <div className="space-y-1.5 pt-1">
                      <span className="text-[11px] font-bold text-neutral-600">Pilihan Cepat Logo Standar (1-Klik):</span>
                      <div className="flex flex-wrap gap-1.5">
                        <button
                          type="button"
                          onClick={() => {
                            setTempHero((prev) => ({
                              ...prev,
                              headerLogo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cd/Logo_PGRI.png/480px-Logo_PGRI.png',
                            }));
                            showToast('Logo Resmi PGRI dipilih.');
                          }}
                          className="px-2.5 py-1 text-[11px] bg-white hover:bg-neutral-100 border border-neutral-300 rounded-lg text-neutral-700 font-medium transition-colors"
                        >
                          Logo Resmi PGRI
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setTempHero((prev) => ({
                              ...prev,
                              headerLogo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9c/Logo_of_Ministry_of_Education_and_Culture_of_Republic_of_Indonesia.svg/500px-Logo_of_Ministry_of_Education_and_Culture_of_Republic_of_Indonesia.svg.png',
                            }));
                            showToast('Logo Tut Wuri Handayani dipilih.');
                          }}
                          className="px-2.5 py-1 text-[11px] bg-white hover:bg-neutral-100 border border-neutral-300 rounded-lg text-neutral-700 font-medium transition-colors"
                        >
                          Tut Wuri Handayani
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setTempHero((prev) => ({
                              ...prev,
                              headerLogo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Lambang_Kabupaten_Ciamis.png/400px-Lambang_Kabupaten_Ciamis.png',
                            }));
                            showToast('Lambang Kabupaten Ciamis dipilih.');
                          }}
                          className="px-2.5 py-1 text-[11px] bg-white hover:bg-neutral-100 border border-neutral-300 rounded-lg text-neutral-700 font-medium transition-colors"
                        >
                          Lambang Kab. Ciamis
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setTempHero((prev) => ({ ...prev, headerLogo: '', headerLogoSecondary: '' }));
                            showToast('Logo direset ke inisial standar.');
                          }}
                          className="px-2.5 py-1 text-[11px] bg-neutral-100 hover:bg-neutral-200 border border-neutral-300 rounded-lg text-neutral-600 font-medium transition-colors"
                        >
                          Reset (Inisial P)
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="space-y-1">
                      <label className="font-bold text-neutral-800">Judul Utama Hero (Headline)</label>
                      <input
                        type="text"
                        required
                        value={tempHero.headline}
                        onChange={(e) => setTempHero({ ...tempHero, headline: e.target.value })}
                        className="w-full p-2.5 bg-neutral-50 border border-neutral-300 rounded-lg text-neutral-900"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="font-bold text-neutral-800">Tagline Sorotan (Merah Garis Bawah)</label>
                      <input
                        type="text"
                        required
                        value={tempHero.tagline}
                        onChange={(e) => setTempHero({ ...tempHero, tagline: e.target.value })}
                        className="w-full p-2.5 bg-neutral-50 border border-neutral-300 rounded-lg text-neutral-900"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="font-bold text-neutral-800">Deskripsi Ringkas Beranda</label>
                      <textarea
                        rows={3}
                        required
                        value={tempHero.description}
                        onChange={(e) => setTempHero({ ...tempHero, description: e.target.value })}
                        className="w-full p-2.5 bg-neutral-50 border border-neutral-300 rounded-lg text-neutral-900"
                      />
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                      <div className="space-y-1">
                        <label className="font-semibold text-neutral-700">Stat Guru Aktif</label>
                        <input
                          type="text"
                          value={tempHero.statsGuru}
                          onChange={(e) => setTempHero({ ...tempHero, statsGuru: e.target.value })}
                          className="w-full p-2 bg-neutral-50 border border-neutral-300 rounded-lg font-mono font-bold"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="font-semibold text-neutral-700">Stat Basis Sekolah</label>
                        <input
                          type="text"
                          value={tempHero.statsSekolah}
                          onChange={(e) => setTempHero({ ...tempHero, statsSekolah: e.target.value })}
                          className="w-full p-2 bg-neutral-50 border border-neutral-300 rounded-lg font-mono font-bold"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="font-semibold text-neutral-700">Stat Inklusif</label>
                        <input
                          type="text"
                          value={tempHero.statsInklusif}
                          onChange={(e) => setTempHero({ ...tempHero, statsInklusif: e.target.value })}
                          className="w-full p-2 bg-neutral-50 border border-neutral-300 rounded-lg font-mono font-bold text-emerald-700"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="font-semibold text-neutral-700">Stat Pilar SAKTI</label>
                        <input
                          type="text"
                          value={tempHero.statsPilar}
                          onChange={(e) => setTempHero({ ...tempHero, statsPilar: e.target.value })}
                          className="w-full p-2 bg-neutral-50 border border-neutral-300 rounded-lg font-mono font-bold text-red-700"
                        />
                      </div>
                    </div>
                  </div>
                </form>
              )}

              {/* TAB 2: INOVASI SAKTI */}
              {activeTab === 'sakti' && (
                <div className="space-y-5">
                  <div className="flex items-center justify-between pb-3 border-b border-neutral-200">
                    <div>
                      <h4 className="font-bold text-base text-neutral-900">
                        Manajemen Pilar SAKTI, Modul RPP & Video
                      </h4>
                      <p className="text-neutral-500">
                        Kelola artikel kurikulum mendalam, panduan PID, koding, dan berkas perangkat ajar.
                      </p>
                    </div>

                    {!editingSakti && (
                      <button
                        onClick={() => {
                          setEditingSakti({
                            id: `sakti-${Date.now()}`,
                            category: 'pid',
                            title: '',
                            subtitle: '',
                            description: '',
                            author: {
                              name: 'Guru Pembina SAKTI',
                              role: 'Pengurus Ranting SMPN 2 Ciamis',
                              school: 'SMPN 2 Ciamis',
                              avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80',
                            },
                            publishedDate: '29 September 2026',
                            readTime: '6 menit baca',
                            image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=600&q=80',
                            modulUrl: '#modul-baru',
                            modulName: 'Modul Ajar Kurikulum Merdeka Fase D.pdf',
                            modulPages: 24,
                            videoUrl: 'https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ',
                            videoDuration: '12:00 Menit',
                            keyPoints: [
                              'Penerapan eksplorasi materi kontekstual di kelas',
                              'Kolaborasi aktif siswa dengan perangkat digital',
                            ],
                            fullContent: '',
                          });
                          setIsCreatingSakti(true);
                        }}
                        className="px-3 py-1.5 bg-red-700 hover:bg-red-800 text-white rounded-lg font-semibold flex items-center space-x-1"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>Tambah Inovasi SAKTI</span>
                      </button>
                    )}
                  </div>

                  {editingSakti ? (
                    /* Edit / Create Form SAKTI */
                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                        handleSaveSaktiItem(editingSakti);
                      }}
                      className="p-4 bg-neutral-50 rounded-xl border border-neutral-200 space-y-4"
                    >
                      <div className="flex items-center justify-between pb-2 border-b border-neutral-200">
                        <span className="font-bold text-red-700 uppercase tracking-wider text-[11px]">
                          {isCreatingSakti ? 'Form Tambah Inovasi SAKTI Baru' : 'Edit Konten Inovasi SAKTI'}
                        </span>
                        <button
                          type="button"
                          onClick={() => {
                            setEditingSakti(null);
                            setIsCreatingSakti(false);
                          }}
                          className="text-neutral-500 hover:text-neutral-800"
                        >
                          Batal
                        </button>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div className="space-y-1">
                          <label className="font-semibold text-neutral-700">Kategori SAKTI</label>
                          <select
                            value={editingSakti.category}
                            onChange={(e) =>
                              setEditingSakti({ ...editingSakti, category: e.target.value as any })
                            }
                            className="w-full p-2 bg-white border border-neutral-300 rounded-lg"
                          >
                            <option value="pembelajaran_mendalam">Pembelajaran Mendalam (Deep Learning)</option>
                            <option value="pid">Papan Interaktif Digital (PID)</option>
                            <option value="koding_kka">Koding & Logika KKA</option>
                            <option value="rumah_pendidikan">Rumah Pendidikan</option>
                          </select>
                        </div>

                        <div className="space-y-1">
                          <label className="font-semibold text-neutral-700">Nama Penulis / Pendidik</label>
                          <input
                            type="text"
                            required
                            value={editingSakti.author.name}
                            onChange={(e) =>
                              setEditingSakti({
                                ...editingSakti,
                                author: { ...editingSakti.author, name: e.target.value },
                              })
                            }
                            className="w-full p-2 bg-white border border-neutral-300 rounded-lg"
                          />
                        </div>
                      </div>

                      <div className="space-y-1">
                        <label className="font-semibold text-neutral-700">Judul Artikel Inovasi SAKTI</label>
                        <input
                          type="text"
                          required
                          value={editingSakti.title}
                          onChange={(e) => setEditingSakti({ ...editingSakti, title: e.target.value })}
                          className="w-full p-2 bg-white border border-neutral-300 rounded-lg font-bold"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="font-semibold text-neutral-700">Sub-judul / Deck Kalimat Penjelas</label>
                        <input
                          type="text"
                          value={editingSakti.subtitle}
                          onChange={(e) => setEditingSakti({ ...editingSakti, subtitle: e.target.value })}
                          className="w-full p-2 bg-white border border-neutral-300 rounded-lg"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="font-semibold text-neutral-700">Ringkasan Narasi Pembelajaran</label>
                        <textarea
                          rows={3}
                          required
                          value={editingSakti.description}
                          onChange={(e) => setEditingSakti({ ...editingSakti, description: e.target.value })}
                          className="w-full p-2 bg-white border border-neutral-300 rounded-lg"
                        />
                      </div>

                      {/* Image Upload: Visual Utama & Avatar Penulis */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <ImageUploadField
                          label="Gambar Visual Sampul Inovasi SAKTI"
                          value={editingSakti.image}
                          onChange={(url) => setEditingSakti({ ...editingSakti, image: url })}
                          aspectRatio="video"
                          description="Rasio 16:9 disarankan"
                          placeholder="https://... atau klik upload gambar"
                        />

                        <ImageUploadField
                          label="Foto Profil Penulis / Guru Pengampu"
                          value={editingSakti.author.avatar}
                          onChange={(url) =>
                            setEditingSakti({
                              ...editingSakti,
                              author: { ...editingSakti.author, avatar: url },
                            })
                          }
                          aspectRatio="square"
                          description="Pasfoto atau profil persegi"
                          placeholder="https://... atau klik upload gambar"
                        />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <div className="space-y-1">
                          <label className="font-semibold text-neutral-700">Nama File Modul/RPP</label>
                          <input
                            type="text"
                            value={editingSakti.modulName}
                            onChange={(e) => setEditingSakti({ ...editingSakti, modulName: e.target.value })}
                            className="w-full p-2 bg-white border border-neutral-300 rounded-lg"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="font-semibold text-neutral-700">Jumlah Halaman PDF</label>
                          <input
                            type="number"
                            value={editingSakti.modulPages}
                            onChange={(e) =>
                              setEditingSakti({ ...editingSakti, modulPages: parseInt(e.target.value) || 10 })
                            }
                            className="w-full p-2 bg-white border border-neutral-300 rounded-lg"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="font-semibold text-neutral-700">Durasi Video Interaktif</label>
                          <input
                            type="text"
                            value={editingSakti.videoDuration}
                            onChange={(e) => setEditingSakti({ ...editingSakti, videoDuration: e.target.value })}
                            className="w-full p-2 bg-white border border-neutral-300 rounded-lg"
                          />
                        </div>
                      </div>

                      <div className="flex justify-end space-x-2 pt-2">
                        <button
                          type="button"
                          onClick={() => {
                            setEditingSakti(null);
                            setIsCreatingSakti(false);
                          }}
                          className="px-3 py-1.5 border border-neutral-300 rounded-lg text-neutral-700 hover:bg-neutral-100"
                        >
                          Batal
                        </button>
                        <button
                          type="submit"
                          className="px-4 py-1.5 bg-red-700 hover:bg-red-800 text-white rounded-lg font-semibold flex items-center space-x-1"
                        >
                          <Save className="w-3.5 h-3.5" />
                          <span>Simpan Inovasi SAKTI</span>
                        </button>
                      </div>
                    </form>
                  ) : (
                    /* SAKTI List */
                    <div className="space-y-3">
                      {saktiArticles.map((article) => (
                        <div
                          key={article.id}
                          className="p-4 rounded-xl border border-neutral-200 bg-neutral-50/50 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 hover:bg-white transition-colors"
                        >
                          <div className="space-y-1 max-w-xl">
                            <span className="text-[10px] font-bold uppercase text-red-700">
                              {article.category.replace('_', ' ')}
                            </span>
                            <h5 className="font-bold text-neutral-900 text-sm">{article.title}</h5>
                            <p className="text-xs text-neutral-500 line-clamp-1">{article.description}</p>
                            <div className="text-[11px] text-neutral-400">
                              Penyusun: {article.author.name} · {article.modulName} ({article.modulPages} Hal)
                            </div>
                          </div>

                          <div className="flex items-center space-x-2 shrink-0">
                            <button
                              onClick={() => {
                                setEditingSakti(article);
                                setIsCreatingSakti(false);
                              }}
                              className="px-3 py-1 bg-white border border-neutral-300 hover:bg-neutral-100 rounded text-neutral-700 font-medium flex items-center space-x-1"
                            >
                              <Edit3 className="w-3 h-3 text-neutral-500" />
                              <span>Edit</span>
                            </button>
                            <button
                              onClick={() => handleDeleteSaktiItem(article.id)}
                              className="p-1.5 hover:bg-red-50 text-neutral-400 hover:text-red-700 rounded transition-colors"
                              title="Hapus"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* TAB 3: PRAKTIK BAIK STAR */}
              {activeTab === 'star' && (
                <div className="space-y-5">
                  <div className="flex items-center justify-between pb-3 border-b border-neutral-200">
                    <div>
                      <h4 className="font-bold text-base text-neutral-900">
                        Manajemen Praktik Baik STAR (Situasi, Tantangan, Aksi, Refleksi)
                      </h4>
                      <p className="text-neutral-500">
                        Kelola publikasi karya guru se-Kecamatan Ciamis lintas jenjang PAUD, SD, SMP, SMA, dan SLB.
                      </p>
                    </div>

                    {!editingStar && (
                      <button
                        onClick={() => {
                          setEditingStar({
                            id: `star-${Date.now()}`,
                            title: '',
                            jenjang: 'smp',
                            schoolName: 'SMP Negeri 2 Ciamis',
                            schoolCategory: 'negeri',
                            authorName: 'Nama Guru Penulis, S.Pd.',
                            authorNip: '19850101 201001 1 001',
                            publishedDate: '29 September 2026',
                            readTime: '6 menit',
                            summary: '',
                            image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=600&q=80',
                            starDetails: {
                              situasi: '',
                              tantangan: '',
                              aksi: '',
                              refleksi: '',
                            },
                            impactStats: [
                              { metric: '90%', label: 'Ketuntasan Pembelajaran' },
                              { metric: '100%', label: 'Kolaborasi Aktif' },
                            ],
                          });
                          setIsCreatingStar(true);
                        }}
                        className="px-3 py-1.5 bg-red-700 hover:bg-red-800 text-white rounded-lg font-semibold flex items-center space-x-1"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>Tambah Naskah STAR</span>
                      </button>
                    )}
                  </div>

                  {editingStar ? (
                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                        handleSaveStarItem(editingStar);
                      }}
                      className="p-4 bg-neutral-50 rounded-xl border border-neutral-200 space-y-4"
                    >
                      <div className="flex items-center justify-between pb-2 border-b border-neutral-200">
                        <span className="font-bold text-emerald-800 uppercase tracking-wider text-[11px]">
                          {isCreatingStar ? 'Form Tambah Praktik Baik STAR Baru' : 'Edit Naskah STAR'}
                        </span>
                        <button
                          type="button"
                          onClick={() => {
                            setEditingStar(null);
                            setIsCreatingStar(false);
                          }}
                          className="text-neutral-500 hover:text-neutral-800"
                        >
                          Batal
                        </button>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <div className="space-y-1">
                          <label className="font-semibold text-neutral-700">Jenjang</label>
                          <select
                            value={editingStar.jenjang}
                            onChange={(e) =>
                              setEditingStar({ ...editingStar, jenjang: e.target.value as JenjangType })
                            }
                            className="w-full p-2 bg-white border border-neutral-300 rounded-lg"
                          >
                            <option value="paud">PAUD / TK</option>
                            <option value="sd">Sekolah Dasar (SD)</option>
                            <option value="smp">SMP</option>
                            <option value="sma_smk_slb">SMA / SMK / SLB</option>
                          </select>
                        </div>

                        <div className="space-y-1">
                          <label className="font-semibold text-neutral-700">Kategori Sekolah</label>
                          <select
                            value={editingStar.schoolCategory}
                            onChange={(e) =>
                              setEditingStar({
                                ...editingStar,
                                schoolCategory: e.target.value as SchoolCategory,
                              })
                            }
                            className="w-full p-2 bg-white border border-neutral-300 rounded-lg"
                          >
                            <option value="negeri">Negeri</option>
                            <option value="swasta">Swasta</option>
                            <option value="slb">SLB (Inklusi)</option>
                            <option value="terpencil">Pinggiran / Bantaran Citanduy</option>
                          </select>
                        </div>

                        <div className="space-y-1">
                          <label className="font-semibold text-neutral-700">Asal Satuan Pendidikan</label>
                          <input
                            type="text"
                            required
                            value={editingStar.schoolName}
                            onChange={(e) => setEditingStar({ ...editingStar, schoolName: e.target.value })}
                            className="w-full p-2 bg-white border border-neutral-300 rounded-lg"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div className="space-y-1">
                          <label className="font-semibold text-neutral-700">Nama Guru Penulis</label>
                          <input
                            type="text"
                            required
                            value={editingStar.authorName}
                            onChange={(e) => setEditingStar({ ...editingStar, authorName: e.target.value })}
                            className="w-full p-2 bg-white border border-neutral-300 rounded-lg"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="font-semibold text-neutral-700">NIP Guru (Opsional)</label>
                          <input
                            type="text"
                            value={editingStar.authorNip || ''}
                            onChange={(e) => setEditingStar({ ...editingStar, authorNip: e.target.value })}
                            className="w-full p-2 bg-white border border-neutral-300 rounded-lg font-mono"
                          />
                        </div>
                      </div>

                      <div className="space-y-1">
                        <label className="font-semibold text-neutral-700">Judul Praktik Baik</label>
                        <input
                          type="text"
                          required
                          value={editingStar.title}
                          onChange={(e) => setEditingStar({ ...editingStar, title: e.target.value })}
                          className="w-full p-2 bg-white border border-neutral-300 rounded-lg font-bold"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="font-semibold text-neutral-700">Ringkasan Singkat</label>
                        <textarea
                          rows={2}
                          required
                          value={editingStar.summary}
                          onChange={(e) => setEditingStar({ ...editingStar, summary: e.target.value })}
                          className="w-full p-2 bg-white border border-neutral-300 rounded-lg"
                        />
                      </div>

                      {/* Image Upload: Foto / Dokumentasi Praktik Baik STAR */}
                      <ImageUploadField
                        label="Foto / Visual Utama Praktik Baik STAR"
                        value={editingStar.image}
                        onChange={(url) => setEditingStar({ ...editingStar, image: url })}
                        aspectRatio="video"
                        description="Foto aksi nyata di kelas atau sekolah"
                        placeholder="https://... atau klik upload gambar"
                      />

                      {/* STAR 4 Pillars Fields */}
                      <div className="space-y-3 pt-2 border-t border-neutral-200">
                        <div className="space-y-1">
                          <label className="font-bold text-amber-900">S - Situasi (Latar Belakang & Masalah)</label>
                          <textarea
                            rows={2}
                            required
                            value={editingStar.starDetails.situasi}
                            onChange={(e) =>
                              setEditingStar({
                                ...editingStar,
                                starDetails: { ...editingStar.starDetails, situasi: e.target.value },
                              })
                            }
                            className="w-full p-2 bg-white border border-neutral-300 rounded-lg"
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="font-bold text-red-900">T - Tantangan</label>
                          <textarea
                            rows={2}
                            required
                            value={editingStar.starDetails.tantangan}
                            onChange={(e) =>
                              setEditingStar({
                                ...editingStar,
                                starDetails: { ...editingStar.starDetails, tantangan: e.target.value },
                              })
                            }
                            className="w-full p-2 bg-white border border-neutral-300 rounded-lg"
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="font-bold text-blue-900">A - Aksi (Langkah Strategi SAKTI/Media)</label>
                          <textarea
                            rows={2}
                            required
                            value={editingStar.starDetails.aksi}
                            onChange={(e) =>
                              setEditingStar({
                                ...editingStar,
                                starDetails: { ...editingStar.starDetails, aksi: e.target.value },
                              })
                            }
                            className="w-full p-2 bg-white border border-neutral-300 rounded-lg"
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="font-bold text-emerald-900">R - Refleksi (Dampak & Hasil Nyata)</label>
                          <textarea
                            rows={2}
                            required
                            value={editingStar.starDetails.refleksi}
                            onChange={(e) =>
                              setEditingStar({
                                ...editingStar,
                                starDetails: { ...editingStar.starDetails, refleksi: e.target.value },
                              })
                            }
                            className="w-full p-2 bg-white border border-neutral-300 rounded-lg"
                          />
                        </div>
                      </div>

                      <div className="flex justify-end space-x-2 pt-2">
                        <button
                          type="button"
                          onClick={() => {
                            setEditingStar(null);
                            setIsCreatingStar(false);
                          }}
                          className="px-3 py-1.5 border border-neutral-300 rounded-lg text-neutral-700 hover:bg-neutral-100"
                        >
                          Batal
                        </button>
                        <button
                          type="submit"
                          className="px-4 py-1.5 bg-red-700 hover:bg-red-800 text-white rounded-lg font-semibold flex items-center space-x-1"
                        >
                          <Save className="w-3.5 h-3.5" />
                          <span>Simpan Naskah STAR</span>
                        </button>
                      </div>
                    </form>
                  ) : (
                    <div className="space-y-3">
                      {starPractices.map((practice) => (
                        <div
                          key={practice.id}
                          className="p-4 rounded-xl border border-neutral-200 bg-neutral-50/50 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 hover:bg-white transition-colors"
                        >
                          <div className="space-y-1 max-w-xl">
                            <span className="text-[10px] font-bold uppercase text-emerald-800">
                              JENJANG {practice.jenjang.toUpperCase()} · {practice.schoolName}
                            </span>
                            <h5 className="font-bold text-neutral-900 text-sm">{practice.title}</h5>
                            <p className="text-xs text-neutral-500 line-clamp-1">{practice.summary}</p>
                            <div className="text-[11px] text-neutral-400">
                              Penulis: {practice.authorName} · Dampak: {practice.impactStats[0]?.metric}{' '}
                              {practice.impactStats[0]?.label}
                            </div>
                          </div>

                          <div className="flex items-center space-x-2 shrink-0">
                            <button
                              onClick={() => {
                                setEditingStar(practice);
                                setIsCreatingStar(false);
                              }}
                              className="px-3 py-1 bg-white border border-neutral-300 hover:bg-neutral-100 rounded text-neutral-700 font-medium flex items-center space-x-1"
                            >
                              <Edit3 className="w-3 h-3 text-neutral-500" />
                              <span>Edit</span>
                            </button>
                            <button
                              onClick={() => handleDeleteStarItem(practice.id)}
                              className="p-1.5 hover:bg-red-50 text-neutral-400 hover:text-red-700 rounded transition-colors"
                              title="Hapus"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* TAB 4: KOLABORASI & KOMUNITAS BELAJAR */}
              {activeTab === 'kolaborasi' && (
                <div className="space-y-5">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-neutral-200 gap-2">
                    <div>
                      <h4 className="font-bold text-base text-neutral-900">
                        Manajemen Kolaborasi, Komunitas Belajar & Penulis Guru
                      </h4>
                      <p className="text-neutral-500">
                        Kelola agenda Kombel, MGMP, KKG, Dharma Wanita (DWP), mitra eksternal, dan profil kontributor guru.
                      </p>
                    </div>

                    <div className="flex items-center space-x-2">
                      <div className="flex p-0.5 bg-neutral-100 rounded-lg border border-neutral-200 text-xs">
                        <button
                          type="button"
                          onClick={() => {
                            setKolaborasiSubTab('kegiatan');
                            setEditingKomunitas(null);
                            setEditingContributor(null);
                          }}
                          className={`px-3 py-1 rounded-md font-semibold transition-colors ${
                            kolaborasiSubTab === 'kegiatan'
                              ? 'bg-white text-neutral-900 shadow-xs'
                              : 'text-neutral-600 hover:text-neutral-900'
                          }`}
                        >
                          Agenda Kegiatan ({komunitasActivities.length})
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setKolaborasiSubTab('penulis');
                            setEditingKomunitas(null);
                            setEditingContributor(null);
                          }}
                          className={`px-3 py-1 rounded-md font-semibold transition-colors ${
                            kolaborasiSubTab === 'penulis'
                              ? 'bg-white text-neutral-900 shadow-xs'
                              : 'text-neutral-600 hover:text-neutral-900'
                          }`}
                        >
                          Penulis Guru ({contributorTeachers.length})
                        </button>
                      </div>

                      {kolaborasiSubTab === 'kegiatan' && !editingKomunitas && (
                        <button
                          onClick={() => {
                            setEditingKomunitas({
                              id: `kombel-${Date.now()}`,
                              type: 'KOMBEL',
                              title: '',
                              organizer: 'Kombel SMPN 2 Ciamis',
                              partner: 'Disdik Ciamis',
                              date: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }),
                              location: 'SMPN 2 Ciamis',
                              description: '',
                              attendeesCount: 30,
                              image: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=600&q=80',
                              highlights: ['Refleksi praktik baik pembelajaran', 'Penyusunan RPP digital bersama'],
                            });
                            setIsCreatingKomunitas(true);
                          }}
                          className="px-3 py-1.5 bg-red-700 hover:bg-red-800 text-white rounded-lg font-semibold flex items-center space-x-1"
                        >
                          <Plus className="w-3.5 h-3.5" />
                          <span>Tambah Kegiatan</span>
                        </button>
                      )}

                      {kolaborasiSubTab === 'penulis' && !editingContributor && (
                        <button
                          onClick={() => {
                            setEditingContributor({
                              id: `teacher-${Date.now()}`,
                              name: '',
                              school: 'SMPN 2 Ciamis',
                              jenjang: 'Jenjang SMP',
                              specialty: 'Informatika & PID',
                              articlesCount: 1,
                              avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
                              quote: 'Mengabdi dengan hati, berinovasi tiada henti.',
                            });
                            setIsCreatingContributor(true);
                          }}
                          className="px-3 py-1.5 bg-red-700 hover:bg-red-800 text-white rounded-lg font-semibold flex items-center space-x-1"
                        >
                          <Plus className="w-3.5 h-3.5" />
                          <span>Tambah Penulis</span>
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Subtab 1: Agenda Kegiatan Komunitas */}
                  {kolaborasiSubTab === 'kegiatan' && (
                    <>
                      {editingKomunitas ? (
                        <form
                          onSubmit={(e) => {
                            e.preventDefault();
                            handleSaveKomunitasItem(editingKomunitas);
                          }}
                          className="p-5 border border-neutral-300 rounded-xl bg-neutral-50/70 space-y-4"
                        >
                          <div className="font-bold text-sm text-neutral-800 border-b pb-2">
                            {isCreatingKomunitas ? 'Tambah Kegiatan Komunitas Baru' : 'Edit Agenda Kegiatan Komunitas'}
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-1 md:col-span-2">
                              <label className="font-semibold text-neutral-700">Nama / Judul Kegiatan</label>
                              <input
                                type="text"
                                required
                                value={editingKomunitas.title}
                                onChange={(e) => setEditingKomunitas({ ...editingKomunitas, title: e.target.value })}
                                className="w-full p-2 bg-white border border-neutral-300 rounded-lg"
                                placeholder="Contoh: Diskusi Bedah Modul Ajar PID & Koding MGMP"
                              />
                            </div>

                            <div className="space-y-1">
                              <label className="font-semibold text-neutral-700">Jenis / Komunitas Penyelenggara</label>
                              <select
                                value={editingKomunitas.type}
                                onChange={(e) => setEditingKomunitas({ ...editingKomunitas, type: e.target.value as any })}
                                className="w-full p-2 bg-white border border-neutral-300 rounded-lg"
                              >
                                <option value="KOMBEL">KOMBEL (Komunitas Belajar Sekolah)</option>
                                <option value="MGMP">MGMP (Musyawarah Guru Mata Pelajaran)</option>
                                <option value="KKG">KKG (Kelompok Kerja Guru SD/PAUD)</option>
                                <option value="DWP">DWP (Dharma Wanita Persatuan)</option>
                                <option value="KOLABORASI">KOLABORASI (Mitra Eksternal / Pemkab / DUDI)</option>
                              </select>
                            </div>

                            <div className="space-y-1">
                              <label className="font-semibold text-neutral-700">Nama Penyelenggara</label>
                              <input
                                type="text"
                                required
                                value={editingKomunitas.organizer}
                                onChange={(e) => setEditingKomunitas({ ...editingKomunitas, organizer: e.target.value })}
                                className="w-full p-2 bg-white border border-neutral-300 rounded-lg"
                                placeholder="Misal: Kombel SMPN 2 Ciamis"
                              />
                            </div>

                            <div className="space-y-1">
                              <label className="font-semibold text-neutral-700">Mitra / Kolaborator (Opsional)</label>
                              <input
                                type="text"
                                value={editingKomunitas.partner || ''}
                                onChange={(e) => setEditingKomunitas({ ...editingKomunitas, partner: e.target.value })}
                                className="w-full p-2 bg-white border border-neutral-300 rounded-lg"
                                placeholder="Misal: Puskesmas Ciamis / Universitas Galuh"
                              />
                            </div>

                            <div className="space-y-1">
                              <label className="font-semibold text-neutral-700">Tanggal Pelaksanaan</label>
                              <input
                                type="text"
                                required
                                value={editingKomunitas.date}
                                onChange={(e) => setEditingKomunitas({ ...editingKomunitas, date: e.target.value })}
                                className="w-full p-2 bg-white border border-neutral-300 rounded-lg"
                                placeholder="Misal: 25 Oktober 2026"
                              />
                            </div>

                            <div className="space-y-1">
                              <label className="font-semibold text-neutral-700">Lokasi Kegiatan</label>
                              <input
                                type="text"
                                required
                                value={editingKomunitas.location}
                                onChange={(e) => setEditingKomunitas({ ...editingKomunitas, location: e.target.value })}
                                className="w-full p-2 bg-white border border-neutral-300 rounded-lg"
                                placeholder="Misal: Lab Komputer SMPN 2 Ciamis"
                              />
                            </div>

                            <div className="space-y-1">
                              <label className="font-semibold text-neutral-700">Estimasi Jumlah Peserta (Guru)</label>
                              <input
                                type="number"
                                required
                                value={editingKomunitas.attendeesCount}
                                onChange={(e) => setEditingKomunitas({ ...editingKomunitas, attendeesCount: parseInt(e.target.value) || 0 })}
                                className="w-full p-2 bg-white border border-neutral-300 rounded-lg"
                              />
                            </div>

                            <div className="md:col-span-2">
                              <ImageUploadField
                                label="Foto Dokumentasi Kegiatan Komunitas / Kombel"
                                value={editingKomunitas.image}
                                onChange={(url) => setEditingKomunitas({ ...editingKomunitas, image: url })}
                                aspectRatio="video"
                                description="Foto dokumentasi kegiatan atau workshop"
                                placeholder="https://... atau klik upload gambar"
                              />
                            </div>

                            <div className="space-y-1 md:col-span-2">
                              <label className="font-semibold text-neutral-700">Deskripsi Ringkas Kegiatan</label>
                              <textarea
                                rows={3}
                                required
                                value={editingKomunitas.description}
                                onChange={(e) => setEditingKomunitas({ ...editingKomunitas, description: e.target.value })}
                                className="w-full p-2 bg-white border border-neutral-300 rounded-lg"
                                placeholder="Jelaskan tujuan dan output kegiatan..."
                              />
                            </div>

                            <div className="space-y-1 md:col-span-2">
                              <label className="font-semibold text-neutral-700">Poin Utama / Hasil Kegiatan (1 Baris per Poin)</label>
                              <textarea
                                rows={2}
                                value={editingKomunitas.highlights.join('\n')}
                                onChange={(e) =>
                                  setEditingKomunitas({
                                    ...editingKomunitas,
                                    highlights: e.target.value.split('\n').filter((h) => h.trim().length > 0),
                                  })
                                }
                                className="w-full p-2 bg-white border border-neutral-300 rounded-lg"
                                placeholder="Poin 1&#10;Poin 2"
                              />
                            </div>
                          </div>

                          <div className="flex justify-end space-x-2 pt-2 border-t">
                            <button
                              type="button"
                              onClick={() => {
                                setEditingKomunitas(null);
                                setIsCreatingKomunitas(false);
                              }}
                              className="px-3 py-1.5 border border-neutral-300 rounded-lg text-neutral-700 hover:bg-neutral-100"
                            >
                              Batal
                            </button>
                            <button
                              type="submit"
                              className="px-4 py-1.5 bg-red-700 hover:bg-red-800 text-white rounded-lg font-semibold flex items-center space-x-1"
                            >
                              <Save className="w-3.5 h-3.5" />
                              <span>Simpan Agenda Komunitas</span>
                            </button>
                          </div>
                        </form>
                      ) : (
                        <div className="space-y-3">
                          {komunitasActivities.map((act) => (
                            <div
                              key={act.id}
                              className="p-4 rounded-xl border border-neutral-200 bg-neutral-50/50 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 hover:bg-white transition-colors"
                            >
                              <div className="flex items-start space-x-3">
                                <img
                                  src={act.image}
                                  alt={act.title}
                                  className="w-16 h-16 rounded-lg object-cover border border-neutral-200 shrink-0"
                                />
                                <div className="space-y-0.5">
                                  <div className="flex items-center space-x-2">
                                    <span className="text-[10px] font-bold uppercase bg-red-100 text-red-800 px-2 py-0.5 rounded">
                                      {act.type}
                                    </span>
                                    <span className="text-[11px] text-neutral-400">
                                      {act.date} · {act.location}
                                    </span>
                                  </div>
                                  <h5 className="font-bold text-neutral-900 text-sm">{act.title}</h5>
                                  <p className="text-xs text-neutral-500 line-clamp-1">{act.description}</p>
                                  <div className="text-[11px] text-neutral-400">
                                    Oleh: {act.organizer} {act.partner ? `· Mitra: ${act.partner}` : ''} ({act.attendeesCount} Peserta)
                                  </div>
                                </div>
                              </div>

                              <div className="flex items-center space-x-2 shrink-0 self-end sm:self-center">
                                <button
                                  onClick={() => {
                                    setEditingKomunitas(act);
                                    setIsCreatingKomunitas(false);
                                  }}
                                  className="px-3 py-1 bg-white border border-neutral-300 hover:bg-neutral-100 rounded text-neutral-700 font-medium flex items-center space-x-1"
                                >
                                  <Edit3 className="w-3 h-3 text-neutral-500" />
                                  <span>Edit</span>
                                </button>
                                <button
                                  onClick={() => handleDeleteKomunitasItem(act.id)}
                                  className="p-1.5 hover:bg-red-50 text-neutral-400 hover:text-red-700 rounded transition-colors"
                                  title="Hapus"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </>
                  )}

                  {/* Subtab 2: Penulis / Kontributor Guru */}
                  {kolaborasiSubTab === 'penulis' && (
                    <>
                      {editingContributor ? (
                        <form
                          onSubmit={(e) => {
                            e.preventDefault();
                            handleSaveContributorItem(editingContributor);
                          }}
                          className="p-5 border border-neutral-300 rounded-xl bg-neutral-50/70 space-y-4"
                        >
                          <div className="font-bold text-sm text-neutral-800 border-b pb-2">
                            {isCreatingContributor ? 'Tambah Profil Penulis Guru Baru' : 'Edit Profil Penulis Guru'}
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-1">
                              <label className="font-semibold text-neutral-700">Nama Lengkap & Gelar</label>
                              <input
                                type="text"
                                required
                                value={editingContributor.name}
                                onChange={(e) => setEditingContributor({ ...editingContributor, name: e.target.value })}
                                className="w-full p-2 bg-white border border-neutral-300 rounded-lg"
                                placeholder="Dra. Siti Aminah, M.Pd."
                              />
                            </div>

                            <div className="space-y-1">
                              <label className="font-semibold text-neutral-700">Asal Sekolah</label>
                              <input
                                type="text"
                                required
                                value={editingContributor.school}
                                onChange={(e) => setEditingContributor({ ...editingContributor, school: e.target.value })}
                                className="w-full p-2 bg-white border border-neutral-300 rounded-lg"
                                placeholder="SMPN 2 Ciamis"
                              />
                            </div>

                            <div className="space-y-1">
                              <label className="font-semibold text-neutral-700">Jenjang Pengajaran</label>
                              <select
                                value={editingContributor.jenjang}
                                onChange={(e) => setEditingContributor({ ...editingContributor, jenjang: e.target.value })}
                                className="w-full p-2 bg-white border border-neutral-300 rounded-lg"
                              >
                                <option value="Jenjang PAUD/TK">Jenjang PAUD/TK</option>
                                <option value="Jenjang SD">Jenjang SD</option>
                                <option value="Jenjang SMP">Jenjang SMP</option>
                                <option value="Jenjang SMA/SMK">Jenjang SMA/SMK</option>
                                <option value="Pendidikan Khusus (SLB)">Pendidikan Khusus (SLB)</option>
                              </select>
                            </div>

                            <div className="space-y-1">
                              <label className="font-semibold text-neutral-700">Bidang Keahlian / Spesialisasi</label>
                              <input
                                type="text"
                                required
                                value={editingContributor.specialty}
                                onChange={(e) => setEditingContributor({ ...editingContributor, specialty: e.target.value })}
                                className="w-full p-2 bg-white border border-neutral-300 rounded-lg"
                                placeholder="Sains Terapan & HOTS"
                              />
                            </div>

                            <div className="space-y-1">
                              <label className="font-semibold text-neutral-700">Jumlah Artikel / Karya</label>
                              <input
                                type="number"
                                required
                                value={editingContributor.articlesCount}
                                onChange={(e) => setEditingContributor({ ...editingContributor, articlesCount: parseInt(e.target.value) || 0 })}
                                className="w-full p-2 bg-white border border-neutral-300 rounded-lg"
                              />
                            </div>

                            <div className="md:col-span-2">
                              <ImageUploadField
                                label="Foto Profil / Pasfoto Guru Penulis Kontributor"
                                value={editingContributor.avatar}
                                onChange={(url) => setEditingContributor({ ...editingContributor, avatar: url })}
                                aspectRatio="square"
                                description="Pasfoto atau foto profil persegi"
                                placeholder="https://... atau klik upload gambar"
                              />
                            </div>

                            <div className="space-y-1 md:col-span-2">
                              <label className="font-semibold text-neutral-700">Kutipan Inspiratif Guru</label>
                              <textarea
                                rows={2}
                                required
                                value={editingContributor.quote}
                                onChange={(e) => setEditingContributor({ ...editingContributor, quote: e.target.value })}
                                className="w-full p-2 bg-white border border-neutral-300 rounded-lg"
                                placeholder="Kutipan semangat mendidik..."
                              />
                            </div>
                          </div>

                          <div className="flex justify-end space-x-2 pt-2 border-t">
                            <button
                              type="button"
                              onClick={() => {
                                setEditingContributor(null);
                                setIsCreatingContributor(false);
                              }}
                              className="px-3 py-1.5 border border-neutral-300 rounded-lg text-neutral-700 hover:bg-neutral-100"
                            >
                              Batal
                            </button>
                            <button
                              type="submit"
                              className="px-4 py-1.5 bg-red-700 hover:bg-red-800 text-white rounded-lg font-semibold flex items-center space-x-1"
                            >
                              <Save className="w-3.5 h-3.5" />
                              <span>Simpan Profil Penulis</span>
                            </button>
                          </div>
                        </form>
                      ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                          {contributorTeachers.map((tc) => (
                            <div
                              key={tc.id}
                              className="p-3 bg-neutral-50 rounded-xl border border-neutral-200 flex items-start justify-between gap-3 hover:bg-white transition-colors"
                            >
                              <div className="flex items-start space-x-3 overflow-hidden">
                                <img
                                  src={tc.avatar}
                                  alt={tc.name}
                                  className="w-12 h-12 rounded-xl object-cover border border-neutral-200 shrink-0"
                                />
                                <div className="space-y-0.5 overflow-hidden">
                                  <h5 className="font-bold text-neutral-900 text-xs truncate">{tc.name}</h5>
                                  <p className="text-[11px] text-red-700 font-medium truncate">{tc.school}</p>
                                  <p className="text-[10px] text-neutral-500 truncate">{tc.specialty}</p>
                                  <p className="text-[10px] text-neutral-400 italic line-clamp-1">"{tc.quote}"</p>
                                </div>
                              </div>

                              <div className="flex flex-col space-y-1 shrink-0">
                                <button
                                  onClick={() => {
                                    setEditingContributor(tc);
                                    setIsCreatingContributor(false);
                                  }}
                                  className="p-1 hover:bg-neutral-200 rounded text-neutral-600"
                                  title="Edit Penulis"
                                >
                                  <Edit3 className="w-3.5 h-3.5" />
                                </button>
                                <button
                                  onClick={() => handleDeleteContributorItem(tc.id)}
                                  className="p-1 hover:bg-red-100 rounded text-red-600"
                                  title="Hapus Penulis"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </>
                  )}
                </div>
              )}

              {/* TAB 5: PETA & RANTING SEKOLAH */}
              {activeTab === 'ranting' && (
                <div className="space-y-5">
                  <div className="flex items-center justify-between pb-3 border-b border-neutral-200">
                    <div>
                      <h4 className="font-bold text-base text-neutral-900">
                        Manajemen Basis Ranting Sekolah & Marker Leaflet.js
                      </h4>
                      <p className="text-neutral-500">
                        Perubahan pada daftar sekolah ini otomatis memperbarui penanda marker pada peta interaktif.
                      </p>
                    </div>

                    {!editingSchool && (
                      <button
                        onClick={() => {
                          setEditingSchool({
                            id: `ranting-${Date.now()}`,
                            name: '',
                            jenjang: 'SMP',
                            address: '',
                            npsn: '',
                            kepalaSekolah: '',
                            jumlahGuru: 20,
                            rantingCluster: 'Pusat Kota',
                            latitude: -7.3278,
                            longitude: 108.3541,
                            phone: '',
                            email: '',
                            innovations: ['Program Digital Sekolah'],
                          });
                          setIsCreatingSchool(true);
                        }}
                        className="px-3 py-1.5 bg-red-700 hover:bg-red-800 text-white rounded-lg font-semibold flex items-center space-x-1"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>Tambah Sekolah di Peta</span>
                      </button>
                    )}
                  </div>

                  {editingSchool ? (
                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                        handleSaveSchoolItem(editingSchool);
                      }}
                      className="p-4 bg-neutral-50 rounded-xl border border-neutral-200 space-y-4"
                    >
                      <div className="flex items-center justify-between pb-2 border-b border-neutral-200">
                        <span className="font-bold text-neutral-900 uppercase tracking-wider text-[11px]">
                          {isCreatingSchool ? 'Tambah Sekolah Ranting Baru' : 'Edit Sekolah Basis Ranting'}
                        </span>
                        <button
                          type="button"
                          onClick={() => {
                            setEditingSchool(null);
                            setIsCreatingSchool(false);
                          }}
                          className="text-neutral-500 hover:text-neutral-800"
                        >
                          Batal
                        </button>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <div className="space-y-1 sm:col-span-2">
                          <label className="font-semibold text-neutral-700">Nama Sekolah</label>
                          <input
                            type="text"
                            required
                            value={editingSchool.name}
                            onChange={(e) => setEditingSchool({ ...editingSchool, name: e.target.value })}
                            className="w-full p-2 bg-white border border-neutral-300 rounded-lg font-bold"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="font-semibold text-neutral-700">Jenjang</label>
                          <select
                            value={editingSchool.jenjang}
                            onChange={(e) =>
                              setEditingSchool({ ...editingSchool, jenjang: e.target.value as any })
                            }
                            className="w-full p-2 bg-white border border-neutral-300 rounded-lg"
                          >
                            <option value="PAUD">PAUD</option>
                            <option value="SD">SD</option>
                            <option value="SMP">SMP</option>
                            <option value="SMA/SMK">SMA/SMK</option>
                            <option value="SLB">SLB</option>
                          </select>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <div className="space-y-1">
                          <label className="font-semibold text-neutral-700">NPSN</label>
                          <input
                            type="text"
                            required
                            value={editingSchool.npsn}
                            onChange={(e) => setEditingSchool({ ...editingSchool, npsn: e.target.value })}
                            className="w-full p-2 bg-white border border-neutral-300 rounded-lg font-mono"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="font-semibold text-neutral-700">Nama Kepala Sekolah</label>
                          <input
                            type="text"
                            required
                            value={editingSchool.kepalaSekolah}
                            onChange={(e) =>
                              setEditingSchool({ ...editingSchool, kepalaSekolah: e.target.value })
                            }
                            className="w-full p-2 bg-white border border-neutral-300 rounded-lg"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="font-semibold text-neutral-700">Jumlah Guru Anggota</label>
                          <input
                            type="number"
                            value={editingSchool.jumlahGuru}
                            onChange={(e) =>
                              setEditingSchool({
                                ...editingSchool,
                                jumlahGuru: parseInt(e.target.value) || 10,
                              })
                            }
                            className="w-full p-2 bg-white border border-neutral-300 rounded-lg font-mono"
                          />
                        </div>
                      </div>

                      <div className="space-y-1">
                        <label className="font-semibold text-neutral-700">Alamat Lengkap</label>
                        <input
                          type="text"
                          required
                          value={editingSchool.address}
                          onChange={(e) => setEditingSchool({ ...editingSchool, address: e.target.value })}
                          className="w-full p-2 bg-white border border-neutral-300 rounded-lg"
                        />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div className="space-y-1">
                          <label className="font-semibold text-neutral-700">No. Telepon Sekolah</label>
                          <input
                            type="text"
                            value={editingSchool.phone || ''}
                            onChange={(e) => setEditingSchool({ ...editingSchool, phone: e.target.value })}
                            className="w-full p-2 bg-white border border-neutral-300 rounded-lg"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="font-semibold text-neutral-700">Email Sekolah</label>
                          <input
                            type="email"
                            value={editingSchool.email || ''}
                            onChange={(e) => setEditingSchool({ ...editingSchool, email: e.target.value })}
                            className="w-full p-2 bg-white border border-neutral-300 rounded-lg"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 bg-neutral-100 p-3 rounded-lg border border-neutral-200">
                        <div className="space-y-1">
                          <label className="font-semibold text-neutral-800">Koordinat Latitude (Peta)</label>
                          <input
                            type="number"
                            step="any"
                            required
                            value={editingSchool.latitude}
                            onChange={(e) =>
                              setEditingSchool({ ...editingSchool, latitude: parseFloat(e.target.value) || 0 })
                            }
                            className="w-full p-2 bg-white border border-neutral-300 rounded-lg font-mono"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="font-semibold text-neutral-800">Koordinat Longitude (Peta)</label>
                          <input
                            type="number"
                            step="any"
                            required
                            value={editingSchool.longitude}
                            onChange={(e) =>
                              setEditingSchool({
                                ...editingSchool,
                                longitude: parseFloat(e.target.value) || 0,
                              })
                            }
                            className="w-full p-2 bg-white border border-neutral-300 rounded-lg font-mono"
                          />
                        </div>
                      </div>

                      {/* Foto Gedung / Lingkungan Sekolah */}
                      <ImageUploadField
                        label="Foto Gedung / Gerbang Sekolah Basis Ranting"
                        value={editingSchool.image || ''}
                        onChange={(url) => setEditingSchool({ ...editingSchool, image: url })}
                        aspectRatio="video"
                        description="Foto tampak depan sekolah untuk peta interaktif"
                        placeholder="https://... atau klik upload gambar"
                      />

                      <div className="flex justify-end space-x-2 pt-2">
                        <button
                          type="button"
                          onClick={() => {
                            setEditingSchool(null);
                            setIsCreatingSchool(false);
                          }}
                          className="px-3 py-1.5 border border-neutral-300 rounded-lg text-neutral-700 hover:bg-neutral-100"
                        >
                          Batal
                        </button>
                        <button
                          type="submit"
                          className="px-4 py-1.5 bg-red-700 hover:bg-red-800 text-white rounded-lg font-semibold flex items-center space-x-1"
                        >
                          <Save className="w-3.5 h-3.5" />
                          <span>Simpan Sekolah di Peta</span>
                        </button>
                      </div>
                    </form>
                  ) : (
                    <div className="space-y-2">
                      {rantingList.map((school) => (
                        <div
                          key={school.id}
                          className="p-3.5 rounded-xl border border-neutral-200 bg-neutral-50/50 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 hover:bg-white transition-colors"
                        >
                          <div className="space-y-0.5">
                            <div className="flex items-center space-x-2 text-[11px] text-neutral-500">
                              <span className="font-bold text-red-700">JENJANG {school.jenjang}</span>
                              <span>·</span>
                              <span>NPSN: {school.npsn}</span>
                              <span>·</span>
                              <span>Lat: {school.latitude}, Long: {school.longitude}</span>
                            </div>
                            <h5 className="font-bold text-neutral-900 text-sm">{school.name}</h5>
                            <p className="text-xs text-neutral-500 line-clamp-1">{school.address}</p>
                            <p className="text-[11px] text-neutral-600">
                              Kepsek: {school.kepalaSekolah} · Telp: {school.phone || '-'}
                            </p>
                          </div>

                          <div className="flex items-center space-x-2 shrink-0">
                            <button
                              onClick={() => {
                                setEditingSchool(school);
                                setIsCreatingSchool(false);
                              }}
                              className="px-3 py-1 bg-white border border-neutral-300 hover:bg-neutral-100 rounded text-neutral-700 font-medium flex items-center space-x-1"
                            >
                              <Edit3 className="w-3 h-3 text-neutral-500" />
                              <span>Edit</span>
                            </button>
                            <button
                              onClick={() => handleDeleteSchoolItem(school.id)}
                              className="p-1.5 hover:bg-red-50 text-neutral-400 hover:text-red-700 rounded transition-colors"
                              title="Hapus"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* TAB 5: PROFIL, VISI, MISI & PENGURUS */}
              {activeTab === 'profil' && (
                <div className="space-y-8">
                  {/* Visi Misi Form */}
                  <form onSubmit={handleSaveOrganization} className="space-y-4 pb-6 border-b border-neutral-200">
                    <div className="flex items-center justify-between">
                      <h4 className="font-bold text-base text-neutral-900">
                        Visi, Misi & Sejarah Perjuangan Guru Galuh
                      </h4>
                      <button
                        type="submit"
                        className="px-3.5 py-1.5 bg-red-700 hover:bg-red-800 text-white rounded-lg font-semibold flex items-center space-x-1 shadow-xs"
                      >
                        <Save className="w-3.5 h-3.5" />
                        <span>Simpan Visi Misi</span>
                      </button>
                    </div>

                    <div className="space-y-1">
                      <label className="font-bold text-neutral-800">Visi Organisasi</label>
                      <input
                        type="text"
                        required
                        value={orgVisi}
                        onChange={(e) => setOrgVisi(e.target.value)}
                        className="w-full p-2.5 bg-neutral-50 border border-neutral-300 rounded-lg text-neutral-900 font-bold"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="font-bold text-neutral-800">
                        Misi Organisasi (Tulis 1 baris per misi)
                      </label>
                      <textarea
                        rows={4}
                        required
                        value={orgMisiText}
                        onChange={(e) => setOrgMisiText(e.target.value)}
                        className="w-full p-2.5 bg-neutral-50 border border-neutral-300 rounded-lg text-neutral-900 font-mono text-[11px]"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="font-bold text-neutral-800">Naskah Sejarah PGRI Ciamis</label>
                      <textarea
                        rows={5}
                        required
                        value={orgSejarah}
                        onChange={(e) => setOrgSejarah(e.target.value)}
                        className="w-full p-2.5 bg-neutral-50 border border-neutral-300 rounded-lg text-neutral-900 leading-relaxed"
                      />
                    </div>
                  </form>

                  {/* Pengurus List & Management */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h4 className="font-bold text-base text-neutral-900">
                        Susunan Pengurus Cabang & Ranting ({pengurusList.length} Orang)
                      </h4>
                      {!editingPengurus && (
                        <button
                          onClick={() => {
                            setEditingPengurus({
                              id: `pengurus-${Date.now()}`,
                              name: '',
                              role: 'Pengurus Harian',
                              division: 'Bidang Pembinaan',
                              school: 'SMPN 2 Ciamis',
                              image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=240&q=80',
                            });
                            setIsCreatingPengurus(true);
                          }}
                          className="px-3 py-1.5 bg-red-700 hover:bg-red-800 text-white rounded-lg font-semibold flex items-center space-x-1"
                        >
                          <Plus className="w-3.5 h-3.5" />
                          <span>Tambah Pengurus</span>
                        </button>
                      )}
                    </div>

                    {editingPengurus ? (
                      <form
                        onSubmit={(e) => {
                          e.preventDefault();
                          handleSavePengurusItem(editingPengurus);
                        }}
                        className="p-4 bg-neutral-50 rounded-xl border border-neutral-200 space-y-3"
                      >
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div className="space-y-1">
                            <label className="font-semibold text-neutral-700">Nama Lengkap & Gelar</label>
                            <input
                              type="text"
                              required
                              value={editingPengurus.name}
                              onChange={(e) =>
                                setEditingPengurus({ ...editingPengurus, name: e.target.value })
                              }
                              className="w-full p-2 bg-white border border-neutral-300 rounded-lg font-bold"
                            />
                          </div>
                          <div className="space-y-1">
                            <label className="font-semibold text-neutral-700">Jabatan di PGRI</label>
                            <input
                              type="text"
                              required
                              value={editingPengurus.role}
                              onChange={(e) =>
                                setEditingPengurus({ ...editingPengurus, role: e.target.value })
                              }
                              className="w-full p-2 bg-white border border-neutral-300 rounded-lg"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div className="space-y-1">
                            <label className="font-semibold text-neutral-700">Bidang / Divisi</label>
                            <input
                              type="text"
                              required
                              value={editingPengurus.division}
                              onChange={(e) =>
                                setEditingPengurus({ ...editingPengurus, division: e.target.value })
                              }
                              className="w-full p-2 bg-white border border-neutral-300 rounded-lg"
                            />
                          </div>
                          <div className="space-y-1">
                            <label className="font-semibold text-neutral-700">Unit Kerja / Sekolah Asal</label>
                            <input
                              type="text"
                              required
                              value={editingPengurus.school}
                              onChange={(e) =>
                                setEditingPengurus({ ...editingPengurus, school: e.target.value })
                              }
                              className="w-full p-2 bg-white border border-neutral-300 rounded-lg"
                            />
                          </div>
                        </div>

                        {/* Foto Profil / Pasfoto Pengurus */}
                        <ImageUploadField
                          label="Foto Profil / Pasfoto Resmi Pengurus"
                          value={editingPengurus.image}
                          onChange={(url) => setEditingPengurus({ ...editingPengurus, image: url })}
                          aspectRatio="square"
                          description="Pasfoto resmi atau foto profil pengurus"
                          placeholder="https://... atau klik upload gambar"
                        />

                        <div className="flex justify-end space-x-2 pt-2">
                          <button
                            type="button"
                            onClick={() => {
                              setEditingPengurus(null);
                              setIsCreatingPengurus(false);
                            }}
                            className="px-3 py-1.5 border border-neutral-300 rounded-lg text-neutral-700"
                          >
                            Batal
                          </button>
                          <button
                            type="submit"
                            className="px-4 py-1.5 bg-red-700 hover:bg-red-800 text-white rounded-lg font-semibold flex items-center space-x-1"
                          >
                            <Save className="w-3.5 h-3.5" />
                            <span>Simpan Pengurus</span>
                          </button>
                        </div>
                      </form>
                    ) : (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {pengurusList.map((p) => (
                          <div
                            key={p.id}
                            className="p-3 bg-neutral-50 rounded-xl border border-neutral-200 flex items-center justify-between"
                          >
                            <div className="flex items-center space-x-3 overflow-hidden">
                              <img
                                src={p.image}
                                alt={p.name}
                                className="w-10 h-10 rounded-lg object-cover border shrink-0"
                              />
                              <div className="overflow-hidden">
                                <h5 className="font-bold text-neutral-900 truncate">{p.name}</h5>
                                <p className="text-[11px] text-neutral-600 truncate">{p.role}</p>
                                <p className="text-[10px] text-neutral-400 truncate">{p.school}</p>
                              </div>
                            </div>
                            <div className="flex items-center space-x-1 shrink-0 ml-2">
                              <button
                                onClick={() => {
                                  setEditingPengurus(p);
                                  setIsCreatingPengurus(false);
                                }}
                                className="p-1 hover:bg-neutral-200 rounded text-neutral-600"
                              >
                                <Edit3 className="w-3.5 h-3.5" />
                              </button>
                              <button
                                onClick={() => handleDeletePengurusItem(p.id)}
                                className="p-1 hover:bg-red-100 rounded text-red-600"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* TAB 6: GALERI FOTO DOKUMENTASI */}
              {activeTab === 'galeri' && (
                <div className="space-y-5">
                  <div className="flex items-center justify-between pb-3 border-b border-neutral-200">
                    <div>
                      <h4 className="font-bold text-base text-neutral-900">
                        Manajemen Galeri Dokumentasi Aksi Guru
                      </h4>
                      <p className="text-neutral-500">
                        Tambah, ganti judul, tanggal, lokasi, atau hapus foto album kegiatan PGRI.
                      </p>
                    </div>

                    {!editingGallery && (
                      <button
                        onClick={() => {
                          setEditingGallery({
                            id: `gal-${Date.now()}`,
                            title: '',
                            category: 'pembelajaran',
                            date: '29 September 2026',
                            location: 'SMPN 2 Ciamis',
                            image: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=600&q=80',
                            description: '',
                          });
                          setIsCreatingGallery(true);
                        }}
                        className="px-3 py-1.5 bg-red-700 hover:bg-red-800 text-white rounded-lg font-semibold flex items-center space-x-1"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>Tambah Foto Galeri</span>
                      </button>
                    )}
                  </div>

                  {editingGallery ? (
                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                        handleSaveGalleryItem(editingGallery);
                      }}
                      className="p-4 bg-neutral-50 rounded-xl border border-neutral-200 space-y-3"
                    >
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div className="space-y-1">
                          <label className="font-semibold text-neutral-700">Judul Kegiatan Foto</label>
                          <input
                            type="text"
                            required
                            value={editingGallery.title}
                            onChange={(e) => setEditingGallery({ ...editingGallery, title: e.target.value })}
                            className="w-full p-2 bg-white border border-neutral-300 rounded-lg font-bold"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="font-semibold text-neutral-700">Kategori</label>
                          <select
                            value={editingGallery.category}
                            onChange={(e) =>
                              setEditingGallery({ ...editingGallery, category: e.target.value as any })
                            }
                            className="w-full p-2 bg-white border border-neutral-300 rounded-lg"
                          >
                            <option value="pembelajaran">Pembelajaran & PID</option>
                            <option value="kegiatan">Raker & Organisasi</option>
                            <option value="dwp">Dharma Wanita (DWP)</option>
                            <option value="upacara">Hari Guru & Upacara</option>
                            <option value="workshop">Pameran & Inklusi</option>
                          </select>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div className="space-y-1">
                          <label className="font-semibold text-neutral-700">Tanggal Kegiatan</label>
                          <input
                            type="text"
                            value={editingGallery.date}
                            onChange={(e) => setEditingGallery({ ...editingGallery, date: e.target.value })}
                            className="w-full p-2 bg-white border border-neutral-300 rounded-lg"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="font-semibold text-neutral-700">Lokasi Kegiatan</label>
                          <input
                            type="text"
                            value={editingGallery.location}
                            onChange={(e) =>
                              setEditingGallery({ ...editingGallery, location: e.target.value })
                            }
                            className="w-full p-2 bg-white border border-neutral-300 rounded-lg"
                          />
                        </div>
                      </div>

                      {/* Image Upload: Foto HD Dokumentasi Galeri */}
                      <ImageUploadField
                        label="Foto HD Dokumentasi Galeri Kegiatan PGRI"
                        value={editingGallery.image}
                        onChange={(url) => setEditingGallery({ ...editingGallery, image: url })}
                        aspectRatio="video"
                        description="Foto kegiatan format JPG, PNG, atau WebP"
                        placeholder="https://... atau klik upload gambar"
                      />

                      <div className="space-y-1">
                        <label className="font-semibold text-neutral-700">Deskripsi / Keterangan Foto</label>
                        <textarea
                          rows={2}
                          value={editingGallery.description}
                          onChange={(e) =>
                            setEditingGallery({ ...editingGallery, description: e.target.value })
                          }
                          className="w-full p-2 bg-white border border-neutral-300 rounded-lg"
                        />
                      </div>

                      <div className="flex justify-end space-x-2 pt-2">
                        <button
                          type="button"
                          onClick={() => {
                            setEditingGallery(null);
                            setIsCreatingGallery(false);
                          }}
                          className="px-3 py-1.5 border border-neutral-300 rounded-lg text-neutral-700"
                        >
                          Batal
                        </button>
                        <button
                          type="submit"
                          className="px-4 py-1.5 bg-red-700 hover:bg-red-800 text-white rounded-lg font-semibold flex items-center space-x-1"
                        >
                          <Save className="w-3.5 h-3.5" />
                          <span>Simpan Foto</span>
                        </button>
                      </div>
                    </form>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                      {galleryItems.map((item) => (
                        <div
                          key={item.id}
                          className="p-3 bg-neutral-50 rounded-xl border border-neutral-200 space-y-2"
                        >
                          <img
                            src={item.image}
                            alt={item.title}
                            className="w-full h-28 object-cover rounded-lg border"
                          />
                          <div>
                            <span className="text-[10px] uppercase font-bold text-red-700">
                              {item.category}
                            </span>
                            <h5 className="font-bold text-neutral-900 line-clamp-1">{item.title}</h5>
                            <p className="text-[11px] text-neutral-500 line-clamp-2">{item.description}</p>
                          </div>
                          <div className="flex items-center justify-between pt-1 border-t border-neutral-200">
                            <span className="text-[10px] text-neutral-400">{item.date}</span>
                            <div className="flex space-x-1">
                              <button
                                onClick={() => {
                                  setEditingGallery(item);
                                  setIsCreatingGallery(false);
                                }}
                                className="p-1 hover:bg-neutral-200 rounded text-neutral-600"
                              >
                                <Edit3 className="w-3 h-3" />
                              </button>
                              <button
                                onClick={() => handleDeleteGalleryItem(item.id)}
                                className="p-1 hover:bg-red-100 rounded text-red-600"
                              >
                                <Trash2 className="w-3 h-3" />
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* TAB 8: KONTAK & SEKRETARIAT RESMI */}
              {activeTab === 'kontak' && (
                <form onSubmit={handleSaveContactInfo} className="space-y-5 max-w-3xl">
                  <div className="flex items-center justify-between pb-3 border-b border-neutral-200">
                    <div>
                      <h4 className="font-bold text-base text-neutral-900">
                        Pengaturan Informasi Kontak & Sekretariat PGRI
                      </h4>
                      <p className="text-neutral-500">
                        Sesuaikan alamat kantor, jam layanan, nomor telepon, WhatsApp bantuan, dan info pimpinan sekretariat.
                      </p>
                    </div>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-red-700 hover:bg-red-800 text-white rounded-lg font-semibold flex items-center space-x-1.5 shadow-xs"
                    >
                      <Save className="w-3.5 h-3.5" />
                      <span>Simpan Perubahan Kontak</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1 sm:col-span-2">
                      <label className="font-semibold text-neutral-700">Nama Kantor / Satuan Kerja</label>
                      <input
                        type="text"
                        required
                        value={tempContact.officeName}
                        onChange={(e) => setTempContact({ ...tempContact, officeName: e.target.value })}
                        className="w-full p-2.5 bg-neutral-50 border border-neutral-300 rounded-lg focus:outline-none focus:border-red-600"
                      />
                    </div>

                    <div className="space-y-1 sm:col-span-2">
                      <label className="font-semibold text-neutral-700">Alamat Lengkap Gedung / Kampus</label>
                      <input
                        type="text"
                        required
                        value={tempContact.address}
                        onChange={(e) => setTempContact({ ...tempContact, address: e.target.value })}
                        className="w-full p-2.5 bg-neutral-50 border border-neutral-300 rounded-lg focus:outline-none focus:border-red-600"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="font-semibold text-neutral-700">Kecamatan / Kabupaten / Provinsi</label>
                      <input
                        type="text"
                        required
                        value={tempContact.city}
                        onChange={(e) => setTempContact({ ...tempContact, city: e.target.value })}
                        className="w-full p-2.5 bg-neutral-50 border border-neutral-300 rounded-lg focus:outline-none focus:border-red-600"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="font-semibold text-neutral-700">Kode Pos</label>
                      <input
                        type="text"
                        required
                        value={tempContact.postalCode}
                        onChange={(e) => setTempContact({ ...tempContact, postalCode: e.target.value })}
                        className="w-full p-2.5 bg-neutral-50 border border-neutral-300 rounded-lg focus:outline-none focus:border-red-600"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="font-semibold text-neutral-700">Nomor Telepon Kantor</label>
                      <input
                        type="text"
                        required
                        value={tempContact.phone}
                        onChange={(e) => setTempContact({ ...tempContact, phone: e.target.value })}
                        className="w-full p-2.5 bg-neutral-50 border border-neutral-300 rounded-lg focus:outline-none focus:border-red-600"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="font-semibold text-neutral-700">Nomor WhatsApp Bantuan (Format: 628...)</label>
                      <input
                        type="text"
                        required
                        value={tempContact.whatsapp}
                        onChange={(e) => setTempContact({ ...tempContact, whatsapp: e.target.value })}
                        className="w-full p-2.5 bg-neutral-50 border border-neutral-300 rounded-lg focus:outline-none focus:border-red-600"
                      />
                    </div>

                    <div className="space-y-1 sm:col-span-2">
                      <label className="font-semibold text-neutral-700">Surat Elektronik (Email) Resmi</label>
                      <input
                        type="email"
                        required
                        value={tempContact.email}
                        onChange={(e) => setTempContact({ ...tempContact, email: e.target.value })}
                        className="w-full p-2.5 bg-neutral-50 border border-neutral-300 rounded-lg focus:outline-none focus:border-red-600"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="font-semibold text-neutral-700">Jam Operasional (Hari Kerja)</label>
                      <input
                        type="text"
                        required
                        value={tempContact.operatingHours}
                        onChange={(e) => setTempContact({ ...tempContact, operatingHours: e.target.value })}
                        className="w-full p-2.5 bg-neutral-50 border border-neutral-300 rounded-lg focus:outline-none focus:border-red-600"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="font-semibold text-neutral-700">Jam Operasional (Akhir Pekan/Piket)</label>
                      <input
                        type="text"
                        required
                        value={tempContact.operatingHoursWeekend}
                        onChange={(e) => setTempContact({ ...tempContact, operatingHoursWeekend: e.target.value })}
                        className="w-full p-2.5 bg-neutral-50 border border-neutral-300 rounded-lg focus:outline-none focus:border-red-600"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="font-semibold text-neutral-700">Nama Pimpinan / Ketua Ranting</label>
                      <input
                        type="text"
                        required
                        value={tempContact.secretaryHead}
                        onChange={(e) => setTempContact({ ...tempContact, secretaryHead: e.target.value })}
                        className="w-full p-2.5 bg-neutral-50 border border-neutral-300 rounded-lg focus:outline-none focus:border-red-600"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="font-semibold text-neutral-700">Jabatan Pimpinan</label>
                      <input
                        type="text"
                        required
                        value={tempContact.secretaryHeadTitle}
                        onChange={(e) => setTempContact({ ...tempContact, secretaryHeadTitle: e.target.value })}
                        className="w-full p-2.5 bg-neutral-50 border border-neutral-300 rounded-lg focus:outline-none focus:border-red-600"
                      />
                    </div>

                    <div className="space-y-1 sm:col-span-2">
                      <label className="font-semibold text-neutral-700">Tautan Peta Google Maps</label>
                      <input
                        type="url"
                        value={tempContact.mapEmbedUrl || ''}
                        onChange={(e) => setTempContact({ ...tempContact, mapEmbedUrl: e.target.value })}
                        className="w-full p-2.5 bg-neutral-50 border border-neutral-300 rounded-lg focus:outline-none focus:border-red-600"
                        placeholder="https://maps.google.com/..."
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <ImageUploadField
                        label="Foto Gedung / Kantor Sekretariat PGRI"
                        value={tempContact.officePhoto || ''}
                        onChange={(url) => setTempContact({ ...tempContact, officePhoto: url })}
                        aspectRatio="video"
                        description="Foto kantor sekretariat yang tampil di halaman kontak dan kartu informasi"
                        placeholder="https://... atau klik upload berkas"
                      />
                    </div>
                  </div>

                  <div className="pt-3 border-t flex justify-end">
                    <button
                      type="submit"
                      className="px-5 py-2.5 bg-red-700 hover:bg-red-800 text-white rounded-lg font-semibold flex items-center space-x-1.5 shadow-xs"
                    >
                      <Save className="w-4 h-4" />
                      <span>Simpan Perubahan Kontak</span>
                    </button>
                  </div>
                </form>
              )}

              {/* TAB 9: ASPIRASI & PESAN MASUK */}
              {activeTab === 'pesan' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-neutral-200">
                    <div>
                      <h4 className="font-bold text-base text-neutral-900">
                        Kotak Masuk Aspirasi & Pesan Pendidik ({messages.length})
                      </h4>
                      <p className="text-neutral-500">
                        Daftar pesan dan usulan inovasi yang dikirimkan oleh guru melalui form kontak/profil.
                      </p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    {messages.length === 0 ? (
                      <div className="text-center py-10 text-neutral-400">
                        Belum ada pesan baru di kotak masuk.
                      </div>
                    ) : (
                      messages.map((msg) => (
                        <div
                          key={msg.id}
                          className="p-4 rounded-xl border border-neutral-200 bg-neutral-50 space-y-2"
                        >
                          <div className="flex items-start justify-between">
                            <div>
                              <div className="flex items-center space-x-2">
                                <h5 className="font-bold text-neutral-900 text-sm">{msg.name}</h5>
                                <span
                                  className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                                    msg.status === 'baru'
                                      ? 'bg-amber-100 text-amber-800'
                                      : msg.status === 'diproses'
                                      ? 'bg-blue-100 text-blue-800'
                                      : 'bg-emerald-100 text-emerald-800'
                                  }`}
                                >
                                  {msg.status}
                                </span>
                              </div>
                              <div className="text-[11px] text-neutral-500 mt-0.5">
                                {msg.email} {msg.phone ? `· ${msg.phone}` : ''} {msg.school ? `· ${msg.school}` : ''}
                              </div>
                            </div>
                            <span className="text-[10px] text-neutral-400">{msg.timestamp}</span>
                          </div>

                          <div className="bg-white p-3 rounded-lg border border-neutral-200 text-xs text-neutral-700">
                            {msg.topic && (
                              <div className="font-semibold text-red-800 mb-1">
                                Topik: {msg.topic}
                              </div>
                            )}
                            <p className="leading-relaxed">{msg.message}</p>
                          </div>

                          <div className="flex items-center justify-between pt-1 text-[11px]">
                            <div className="flex items-center space-x-2">
                              <span className="text-neutral-500">Ubah Status:</span>
                              <button
                                onClick={() => handleUpdateMessageStatus(msg.id, 'baru')}
                                className={`px-2 py-0.5 rounded ${
                                  msg.status === 'baru'
                                    ? 'bg-amber-700 text-white font-bold'
                                    : 'bg-neutral-200 text-neutral-700'
                                }`}
                              >
                                Baru
                              </button>
                              <button
                                onClick={() => handleUpdateMessageStatus(msg.id, 'diproses')}
                                className={`px-2 py-0.5 rounded ${
                                  msg.status === 'diproses'
                                    ? 'bg-blue-700 text-white font-bold'
                                    : 'bg-neutral-200 text-neutral-700'
                                }`}
                              >
                                Diproses
                              </button>
                              <button
                                onClick={() => handleUpdateMessageStatus(msg.id, 'selesai')}
                                className={`px-2 py-0.5 rounded ${
                                  msg.status === 'selesai'
                                    ? 'bg-emerald-700 text-white font-bold'
                                    : 'bg-neutral-200 text-neutral-700'
                                }`}
                              >
                                Selesai
                              </button>
                            </div>

                            <button
                              onClick={() => handleDeleteMessage(msg.id)}
                              className="text-red-600 hover:text-red-800 flex items-center space-x-1"
                            >
                              <Trash2 className="w-3 h-3" />
                              <span>Hapus Pesan</span>
                            </button>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}
            </main>
          </div>
        )}
      </div>
    </div>
  );
};
