import React from 'react';
import { Mail, MapPin, Phone, ShieldCheck, Heart, ArrowUp, ExternalLink, Shield } from 'lucide-react';
import { ContactInfo } from '../types';
import { DEFAULT_CONTACT_INFO } from '../data/mockData';

interface FooterProps {
  onNavigate: (sectionId: string, subId?: string) => void;
  contactInfo?: ContactInfo;
  onOpenAdmin?: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onNavigate,
  contactInfo = DEFAULT_CONTACT_INFO,
  onOpenAdmin,
}) => {
  return (
    <footer className="bg-batik-pgri-dark text-neutral-300 border-t border-neutral-800 text-xs">
      {/* Top Banner Ribbon with Red PGRI Batik Motif */}
      <div className="bg-batik-pgri-red text-white py-3.5 px-4 sm:px-6 border-b border-red-800">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
          <div className="flex items-center space-x-2">
            <span className="font-bold text-xs uppercase tracking-wider text-red-200">
              Motto Perjuangan Guru Galuh:
            </span>
            <span className="italic text-xs font-serif">
              "Ing Ngarso Sung Tulodo, Ing Madyo Mangun Karso, Tut Wuri Handayani"
            </span>
          </div>
          <button
            onClick={() => onNavigate('sakti')}
            className="text-xs bg-white text-red-900 font-bold px-3 py-1 rounded hover:bg-neutral-100 transition-colors shadow-xs"
          >
            Akses Modul SAKTI &rarr;
          </button>
        </div>
      </div>

      {/* Main Footer Columns */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Col 1 & 2: Brand & Identity */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-lg bg-red-700 text-white flex items-center justify-center font-bold text-xl shadow-xs">
                P
              </div>
              <div>
                <span className="font-bold text-base text-white block">
                  PGRI Cabang Kec. Ciamis
                </span>
                <span className="text-neutral-400 text-xs block">
                  Ranting Basis SMP Negeri 2 Ciamis
                </span>
              </div>
            </div>

            <p className="text-neutral-400 leading-relaxed max-w-sm">
              Membangun Ekosistem Digital Ciamis Tangguh melalui integrasi Pembelajaran Mendalam (Deep Learning), Papan Interaktif Digital (PID), logika koding berpikir komputasional, dan sinergi Rumah Pendidikan.
            </p>

            <div className="pt-2 text-neutral-400 space-y-2">
              <div className="flex items-start space-x-2">
                <MapPin className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                <span>{contactInfo.address}, {contactInfo.city} {contactInfo.postalCode}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-red-500 shrink-0" />
                <a href={`mailto:${contactInfo.email}`} className="hover:text-white underline">
                  {contactInfo.email}
                </a>
              </div>
              {contactInfo.phone && (
                <div className="flex items-center space-x-2">
                  <Phone className="w-4 h-4 text-red-500 shrink-0" />
                  <span>{contactInfo.phone} · WA: +{contactInfo.whatsapp}</span>
                </div>
              )}
            </div>
          </div>

          {/* Col 3: Navigasi Cepat (3-Click Rule) */}
          <div className="space-y-3">
            <h4 className="font-bold text-white text-xs uppercase tracking-wider text-red-400">
              Navigasi Utama
            </h4>
            <ul className="space-y-2 text-neutral-400">
              <li>
                <button onClick={() => onNavigate('beranda')} className="hover:text-white transition-colors">
                  Beranda Portal
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('profil', 'sejarah')} className="hover:text-white transition-colors">
                  Sejarah Guru Ciamis
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('profil', 'visi-misi')} className="hover:text-white transition-colors">
                  Visi & Misi PGRI
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('profil', 'pengurus')} className="hover:text-white transition-colors">
                  Struktur Pengurus
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('profil', 'ranting')} className="hover:text-white transition-colors">
                  Daftar Ranting Sekolah
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('profil', 'peta')} className="hover:text-white transition-colors">
                  Peta Interaktif Koordinat
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Kanal SAKTI & Modul */}
          <div className="space-y-3">
            <h4 className="font-bold text-white text-xs uppercase tracking-wider text-red-400">
              Pilar SAKTI
            </h4>
            <ul className="space-y-2 text-neutral-400">
              <li>
                <button onClick={() => onNavigate('sakti', 'pembelajaran_mendalam')} className="hover:text-white transition-colors">
                  Pembelajaran Mendalam
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('sakti', 'pid')} className="hover:text-white transition-colors">
                  Papan Interaktif Digital (PID)
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('sakti', 'koding_kka')} className="hover:text-white transition-colors">
                  Koding & Logika KKA
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('sakti', 'rumah_pendidikan')} className="hover:text-white transition-colors">
                  Rumah Pendidikan
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('sakti', 'unggulan_jenjang')} className="hover:text-white transition-colors">
                  Inovasi PAUD-SLB
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('jenjang')} className="hover:text-white transition-colors">
                  Telaah Praktik STAR
                </button>
              </li>
            </ul>
          </div>

          {/* Col 5: Kolaborasi & Layanan */}
          <div className="space-y-3">
            <h4 className="font-bold text-white text-xs uppercase tracking-wider text-red-400">
              Komunitas & Bantuan
            </h4>
            <ul className="space-y-2 text-neutral-400">
              <li>
                <button onClick={() => onNavigate('kolaborasi')} className="hover:text-white transition-colors">
                  MGMP & KKG Ciamis
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('kolaborasi')} className="hover:text-white transition-colors">
                  DWP PGRI Cabang
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('galeri')} className="hover:text-white transition-colors">
                  Galeri Dokumentasi
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('profil', 'pesan')} className="hover:text-white transition-colors">
                  Form Aspirasi Guru
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('kontak')} className="hover:text-white transition-colors">
                  Sekretariat & Helpdesk
                </button>
              </li>
              {onOpenAdmin && (
                <li>
                  <button
                    onClick={onOpenAdmin}
                    className="text-red-400 hover:text-red-300 font-semibold transition-colors flex items-center space-x-1"
                  >
                    <Shield className="w-3 h-3" />
                    <span>Panel Pengelola Konten (Admin)</span>
                  </button>
                </li>
              )}
              <li>
                <a
                  href="https://pgri.or.id"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-white transition-colors inline-flex items-center space-x-1"
                >
                  <span>Portal PB PGRI Pusat</span>
                  <ExternalLink className="w-3 h-3 text-neutral-500" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Attribution */}
        <div className="mt-12 pt-6 border-t border-neutral-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-neutral-500 text-[11px]">
          <div>
            © {new Date().getFullYear()} PGRI Cabang Kecamatan Ciamis · Ranting SMPN 2 Ciamis. Hak Cipta Dilindungi Undang-Undang.
          </div>
          <div className="flex items-center space-x-3 text-neutral-400">
            <span>Standar Aksesibilitas WCAG AA</span>
            <span>·</span>
            <span>Tatar Galuh Digital</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
