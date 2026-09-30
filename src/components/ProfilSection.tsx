import React, { useState, useEffect } from 'react';
import {
  Compass,
  Users,
  BookOpen,
  MapPin,
  MessageSquare,
  School,
  CheckCircle2,
  Send,
  Navigation,
  ExternalLink,
  Search
} from 'lucide-react';
import { PENGURUS_CABANG, RANTING_LIST, DEFAULT_ORGANIZATION_DATA } from '../data/mockData';
import { RantingSchool, PengurusItem, ContactMessage } from '../types';
import { LeafletSchoolMap } from './LeafletSchoolMap';

interface ProfilSectionProps {
  activeSubcategory?: string;
  organizationData?: { sejarah: string; visi: string; misi: string[] };
  pengurusList?: PengurusItem[];
  rantingList?: RantingSchool[];
  onNewMessage?: (msg: ContactMessage) => void;
}

export const ProfilSection: React.FC<ProfilSectionProps> = ({
  activeSubcategory,
  organizationData = DEFAULT_ORGANIZATION_DATA,
  pengurusList = PENGURUS_CABANG,
  rantingList = RANTING_LIST,
  onNewMessage,
}) => {
  const [activeTab, setActiveTab] = useState<string>(activeSubcategory || 'sejarah');
  const [selectedSchool, setSelectedSchool] = useState<RantingSchool>(rantingList[0] || RANTING_LIST[0]);

  useEffect(() => {
    if (activeSubcategory) {
      setActiveTab(activeSubcategory);
    }
  }, [activeSubcategory]);

  useEffect(() => {
    if (rantingList.length > 0) {
      setSelectedSchool((prev) => rantingList.find((s) => s.id === prev.id) || rantingList[0]);
    }
  }, [rantingList]);

  // Form message state
  const [formName, setFormName] = useState('');
  const [formEmail, setFormEmail] = useState('');
  const [formSchool, setFormSchool] = useState('');
  const [formSubject, setFormSubject] = useState('');
  const [formMessage, setFormMessage] = useState('');
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleSubmitMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName || !formMessage) return;

    if (onNewMessage) {
      onNewMessage({
        id: `msg-${Date.now()}`,
        name: formName,
        email: formEmail,
        school: formSchool,
        topic: formSubject || 'Aspirasi Guru',
        message: formMessage,
        timestamp: `${new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}, ${new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })} WIB`,
        status: 'baru',
      });
    }

    setFormSubmitted(true);
    setTimeout(() => {
      setFormName('');
      setFormEmail('');
      setFormSchool('');
      setFormSubject('');
      setFormMessage('');
      setTimeout(() => setFormSubmitted(false), 4000);
    }, 800);
  };

  return (
    <section id="profil" className="py-16 sm:py-20 bg-batik-pgri-pattern border-b border-neutral-200 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-neutral-200 pb-8">
          <div className="space-y-3 max-w-3xl">
            <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-red-700">
              <Compass className="w-4 h-4" />
              <span>Profil Organisasi</span>
              <span aria-hidden="true">·</span>
              <span>PGRI RANTING SMPN 2 CIAMIS</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-neutral-900 tracking-tight text-balance">
              Profil Cabang Kecamatan Ciamis & Ranting Basis
            </h2>
            <p className="text-sm sm:text-base text-neutral-600 leading-relaxed">
              Mengenal rekam jejak perjuangan guru Tatar Galuh, visi transformasi, susunan kepengurusan, serta persebaran ranting sekolah di Kecamatan Ciamis.
            </p>
          </div>

          {/* Quick Tab Selector */}
          <div className="flex items-center space-x-1 bg-neutral-100 p-1 rounded-lg border border-neutral-200 text-xs overflow-x-auto">
            {[
              { id: 'sejarah', label: 'Sejarah' },
              { id: 'visi-misi', label: 'Visi-Misi' },
              { id: 'pengurus', label: 'Pengurus' },
              { id: 'ranting', label: 'Ranting' },
              { id: 'peta', label: 'Peta Interaktif' },
              { id: 'pesan', label: 'Form Pesan' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-3 py-1.5 font-medium rounded-md transition-colors whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'bg-white text-neutral-900 shadow-xs font-semibold'
                    : 'text-neutral-600 hover:text-neutral-900'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Tab 1: Sejarah */}
        {activeTab === 'sejarah' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-8 space-y-5 text-sm sm:text-base text-neutral-700 leading-relaxed">
              <h3 className="text-xl font-bold text-neutral-900 tracking-tight">
                Jejak Pengabdian Guru Tatar Galuh: Dari Semangat Kebangsaan Menuju Era Digital
              </h3>

              <div className="space-y-4 whitespace-pre-line text-neutral-700 leading-relaxed">
                {organizationData.sejarah}
              </div>

              <div className="p-4 bg-neutral-50 rounded-xl border border-neutral-200 text-xs space-y-1">
                <span className="font-bold text-neutral-800">Tonggak Historis:</span>
                <ul className="list-disc list-inside text-neutral-600 space-y-1">
                  <li><strong>1945:</strong> Semangat Kongres Guru Indonesia pasca Proklamasi diresapi guru-guru Ciamis.</li>
                  <li><strong>1978:</strong> Perintisan basis kelembagaan guru di SMP Negeri 2 Ciamis.</li>
                  <li><strong>2024:</strong> Pilot Project Kelas Masa Depan berbasis Papan Interaktif Digital (PID).</li>
                  <li><strong>2026:</strong> Peluncuran Portal Ekosistem Digital Ciamis Tangguh SAKTI lintas jenjang.</li>
                </ul>
              </div>
            </div>

            <div className="lg:col-span-4 bg-neutral-50 p-6 rounded-2xl border border-neutral-200 space-y-4 text-xs">
              <div className="font-bold text-sm text-neutral-900 pb-2 border-b border-neutral-200">
                Identitas Ranting Basis
              </div>
              <div>
                <span className="text-neutral-500">Nama Satuan Kerja:</span>
                <p className="font-semibold text-neutral-800">PGRI Ranting SMP Negeri 2 Ciamis</p>
              </div>
              <div>
                <span className="text-neutral-500">Induk Organisasi:</span>
                <p className="font-semibold text-neutral-800">PGRI Cabang Kecamatan Ciamis</p>
              </div>
              <div>
                <span className="text-neutral-500">Wilayah Kerja:</span>
                <p className="font-semibold text-neutral-800">Kabupaten Ciamis, Jawa Barat</p>
              </div>
              <div>
                <span className="text-neutral-500">Basis Alamat:</span>
                <p className="font-semibold text-neutral-800">Jl. Jenderal Sudirman No. 192, Ciamis</p>
              </div>
              <div>
                <span className="text-neutral-500">Fokus Program:</span>
                <p className="font-semibold text-emerald-800">Laboratorium PID & Koding KKA</p>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Visi-Misi */}
        {activeTab === 'visi-misi' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Visi */}
            <div className="p-8 rounded-2xl bg-red-50/50 border border-red-200 space-y-4">
              <div className="text-xs font-bold text-red-900 uppercase tracking-wider flex items-center">
                <Compass className="w-4 h-4 mr-1.5" /> Visi Organisasi 2026-2030
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-neutral-900 leading-snug">
                {organizationData.visi}
              </h3>
              <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
                Menjadikan PGRI sebagai rumah aman, wadah kolaborasi inovasi pedagogik, dan garda terdepan pembela hak-hak serta peningkatan kompetensi guru di era kecerdasan digital.
              </p>
            </div>

            {/* Misi */}
            <div className="p-8 rounded-2xl bg-neutral-50 border border-neutral-200 space-y-4">
              <div className="text-xs font-bold text-neutral-700 uppercase tracking-wider flex items-center">
                <CheckCircle2 className="w-4 h-4 mr-1.5 text-emerald-600" /> Misi Strategis Organisasi ({organizationData.misi.length} Misi)
              </div>
              <div className="space-y-3 text-xs sm:text-sm text-neutral-700">
                {organizationData.misi.map((item, idx) => (
                  <div key={idx} className="flex items-start space-x-2">
                    <span className="font-bold text-red-700 shrink-0">{idx + 1}.</span>
                    <p>{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Pengurus */}
        {activeTab === 'pengurus' && (
          <div className="space-y-6">
            <div className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
              Struktur Kepengurusan PGRI Cabang Kecamatan Ciamis & Ranting SMPN 2 Ciamis ({pengurusList.length} Pengurus)
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {pengurusList.map((pengurus) => (
                <div
                  key={pengurus.id}
                  className="bg-neutral-50 rounded-xl border border-neutral-200 p-5 flex items-center space-x-4 shadow-xs hover:border-neutral-300 transition-colors"
                >
                  <img
                    src={pengurus.image}
                    alt={pengurus.name}
                    className="w-16 h-16 rounded-xl object-cover border border-neutral-200 shrink-0"
                  />
                  <div className="overflow-hidden">
                    <span className="text-[10px] uppercase font-bold text-red-700 tracking-wider">
                      {pengurus.division}
                    </span>
                    <h4 className="font-bold text-sm text-neutral-900 truncate">{pengurus.name}</h4>
                    <p className="text-xs font-medium text-neutral-600 truncate">{pengurus.role}</p>
                    <p className="text-[11px] text-neutral-400 mt-0.5 truncate">{pengurus.school}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 4: Ranting Sekolah */}
        {activeTab === 'ranting' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <span className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
                Peta Basis Ranting & Satuan Pendidikan di Kecamatan Ciamis ({rantingList.length} Basis)
              </span>
              <button
                onClick={() => setActiveTab('peta')}
                className="text-xs font-semibold text-red-700 hover:text-red-800 flex items-center space-x-1"
              >
                <span>Lihat di Peta Interaktif</span>
                <Navigation className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {rantingList.map((school) => (
                <div
                  key={school.id}
                  className="p-4 rounded-xl border border-neutral-200 bg-neutral-50/50 hover:bg-white hover:shadow-xs transition-all space-y-2"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="text-[10px] font-bold text-neutral-500 uppercase tracking-wider">
                        JENJANG {school.jenjang} · NPSN: {school.npsn}
                      </span>
                      <h4 className="font-bold text-sm text-neutral-900">{school.name}</h4>
                    </div>
                    <span className="text-xs font-mono font-bold text-red-700 bg-red-50 px-2 py-0.5 rounded">
                      {school.jumlahGuru} Guru
                    </span>
                  </div>

                  <p className="text-xs text-neutral-600 line-clamp-1">{school.address}</p>

                  <div className="pt-2 border-t border-neutral-100 flex flex-wrap gap-1">
                    {school.innovations.map((inv, idx) => (
                      <span
                        key={idx}
                        className="text-[10px] bg-neutral-200/60 text-neutral-700 px-2 py-0.5 rounded"
                      >
                        {inv}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 5: Peta Interaktif Leaflet.js */}
        {activeTab === 'peta' && (
          <div className="space-y-6">
            <LeafletSchoolMap schools={rantingList} onSelectSchool={(school) => setSelectedSchool(school)} />
          </div>
        )}

        {/* Tab 6: Form Pesan / Kontak Aspirasi */}
        {activeTab === 'pesan' && (
          <div className="max-w-2xl mx-auto bg-neutral-50 p-6 sm:p-8 rounded-2xl border border-neutral-200 space-y-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-red-700">
                Layanan Komunikasi & Aspirasi Anggota
              </span>
              <h3 className="text-xl font-bold text-neutral-900 mt-1">
                Kirim Masukan, Ide Inovasi, atau Aspirasi Profesi
              </h3>
              <p className="text-xs sm:text-sm text-neutral-600 mt-1">
                Setiap pesan yang Anda sampaikan akan langsung diteruskan kepada Sekretariat PGRI Cabang Ciamis dan Pengurus Ranting SMPN 2 Ciamis.
              </p>
            </div>

            {formSubmitted ? (
              <div className="p-6 bg-emerald-50 rounded-xl border border-emerald-200 text-center space-y-2">
                <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
                <h4 className="font-bold text-emerald-900 text-base">Aspirasi Berhasil Terkirim!</h4>
                <p className="text-xs text-emerald-800">
                  Terima kasih atas kontribusi Anda dalam memajukan mutu pendidikan di Kecamatan Ciamis. Kami akan merespons melalui email/kontak Anda.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmitMessage} className="space-y-4 text-xs sm:text-sm">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="font-semibold text-neutral-700">Nama Lengkap Guru / Pendidik *</label>
                    <input
                      type="text"
                      required
                      value={formName}
                      onChange={(e) => setFormName(e.target.value)}
                      placeholder="Contoh: Dra. Eni Sumarni, M.Pd."
                      className="w-full bg-white border border-neutral-300 rounded-lg p-2.5 text-xs sm:text-sm focus:outline-none focus:border-red-600"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="font-semibold text-neutral-700">Email atau No. WhatsApp *</label>
                    <input
                      type="text"
                      required
                      value={formEmail}
                      onChange={(e) => setFormEmail(e.target.value)}
                      placeholder="pgri.guru@example.com / 0812xxxx"
                      className="w-full bg-white border border-neutral-300 rounded-lg p-2.5 text-xs sm:text-sm focus:outline-none focus:border-red-600"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="font-semibold text-neutral-700">Asal Satuan Pendidikan / Ranting</label>
                    <input
                      type="text"
                      value={formSchool}
                      onChange={(e) => setFormSchool(e.target.value)}
                      placeholder="Contoh: SMPN 2 Ciamis / SDN 1 Ciamis"
                      className="w-full bg-white border border-neutral-300 rounded-lg p-2.5 text-xs sm:text-sm focus:outline-none focus:border-red-600"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="font-semibold text-neutral-700">Kategori Topik</label>
                    <select
                      value={formSubject}
                      onChange={(e) => setFormSubject(e.target.value)}
                      className="w-full bg-white border border-neutral-300 rounded-lg p-2.5 text-xs sm:text-sm focus:outline-none focus:border-red-600"
                    >
                      <option value="Inovasi SAKTI">Usulan Inovasi Modul SAKTI</option>
                      <option value="PID & Koding">Konsultasi Smart PID / Koding</option>
                      <option value="Praktik Baik STAR">Pengajuan Naskah Praktik Baik STAR</option>
                      <option value="KTA & Keanggotaan">Administrasi KTA PGRI</option>
                      <option value="Lainnya">Pertanyaan Umum / Kemitraan</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-neutral-700">Pesan / Isi Aspirasi *</label>
                  <textarea
                    required
                    rows={4}
                    value={formMessage}
                    onChange={(e) => setFormMessage(e.target.value)}
                    placeholder="Tuliskan pengalaman, kendala di kelas, atau ide kolaborasi..."
                    className="w-full bg-white border border-neutral-300 rounded-lg p-2.5 text-xs sm:text-sm focus:outline-none focus:border-red-600"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 px-4 font-semibold text-white bg-red-700 hover:bg-red-800 rounded-lg transition-colors flex items-center justify-center space-x-2 shadow-xs"
                >
                  <Send className="w-4 h-4" />
                  <span>Kirim Pesan ke Pengurus PGRI</span>
                </button>
              </form>
            )}
          </div>
        )}
      </div>
    </section>
  );
};
