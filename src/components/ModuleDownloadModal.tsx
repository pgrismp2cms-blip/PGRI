import React, { useState } from 'react';
import { X, Download, FileText, CheckCircle2, Printer, Eye, Share2, ShieldCheck } from 'lucide-react';
import { SaktiContent } from '../types';

interface ModuleDownloadModalProps {
  content: SaktiContent | null;
  isOpen: boolean;
  onClose: () => void;
}

export const ModuleDownloadModal: React.FC<ModuleDownloadModalProps> = ({
  content,
  isOpen,
  onClose,
}) => {
  const [downloading, setDownloading] = useState(false);
  const [downloadComplete, setDownloadComplete] = useState(false);
  const [activeTab, setActiveTab] = useState<'preview' | 'komponen'>('preview');

  if (!isOpen || !content) return null;

  const handleDownload = () => {
    setDownloading(true);
    setTimeout(() => {
      setDownloading(false);
      setDownloadComplete(true);

      // Trigger programmatic text/pdf download simulation
      const element = document.createElement('a');
      const file = new Blob([
        `PERANGKAT AJAR KURIKULUM MERDEKA - SAKTI PGRI CIAMIS\n` +
        `Judul: ${content.title}\n` +
        `Penyusun: ${content.author.name} (${content.author.school})\n` +
        `Kategori: ${content.category}\n` +
        `Tanggal Rilis: ${content.publishedDate}\n\n` +
        `RINGKASAN PELAKSANAAN:\n${content.fullContent}\n\n` +
        `POIN KUNCI ASESMEN:\n` +
        content.keyPoints.map((p, idx) => `${idx + 1}. ${p}`).join('\n') +
        `\n\n© 2026 PGRI Cabang Kecamatan Ciamis - Ranting SMPN 2 Ciamis`
      ], { type: 'text/plain;charset=utf-8' });
      element.href = URL.createObjectURL(file);
      element.download = content.modulName.replace('.pdf', '') + '.txt';
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);

      setTimeout(() => setDownloadComplete(false), 4000);
    }, 1200);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 overflow-y-auto bg-neutral-900/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6"
      onClick={onClose}
    >
      <div
        className="bg-white w-full max-w-3xl rounded-xl shadow-2xl border border-neutral-200 overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-200 bg-neutral-50/80">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-lg bg-red-100 text-red-700 flex items-center justify-center shrink-0">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs uppercase tracking-wider font-semibold text-red-700">
                Dokumen Modul Ajar Resmi SAKTI
              </span>
              <h3 className="text-base font-bold text-neutral-900 line-clamp-1">
                {content.modulName}
              </h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-neutral-400 hover:text-neutral-700 hover:bg-neutral-200 transition-colors"
            title="Tutup dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Controls & Utility Bar */}
        <div className="px-6 py-2.5 bg-neutral-100/60 border-b border-neutral-200 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center space-x-1 bg-white p-1 rounded-md border border-neutral-200">
            <button
              onClick={() => setActiveTab('preview')}
              className={`px-3 py-1 font-medium rounded transition-colors ${
                activeTab === 'preview'
                  ? 'bg-red-700 text-white shadow-xs'
                  : 'text-neutral-600 hover:text-neutral-900'
              }`}
            >
              <Eye className="w-3.5 h-3.5 inline mr-1" />
              Preview Lembar Ajar
            </button>
            <button
              onClick={() => setActiveTab('komponen')}
              className={`px-3 py-1 font-medium rounded transition-colors ${
                activeTab === 'komponen'
                  ? 'bg-red-700 text-white shadow-xs'
                  : 'text-neutral-600 hover:text-neutral-900'
              }`}
            >
              Komponen & Asesmen
            </button>
          </div>

          <div className="flex items-center space-x-2 text-neutral-500">
            <span>Ukuran: 2.4 MB</span>
            <span>·</span>
            <span>{content.modulPages} Halaman</span>
            <span>·</span>
            <span className="text-emerald-700 font-medium flex items-center">
              <ShieldCheck className="w-3.5 h-3.5 mr-0.5 inline" /> Terverifikasi PGRI
            </span>
          </div>
        </div>

        {/* Modal Body */}
        <div className="overflow-y-auto p-6 space-y-6 flex-1 text-sm text-neutral-700">
          {activeTab === 'preview' ? (
            <div className="space-y-6">
              {/* Document Cover Card */}
              <div className="border border-neutral-200 rounded-lg p-5 bg-neutral-50/50">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-neutral-200 pb-4">
                  <div>
                    <span className="text-xs text-neutral-400 font-mono">KODE: SAKTI-CMS-2026/F-D</span>
                    <h4 className="text-base font-bold text-neutral-900 mt-1">{content.title}</h4>
                    <p className="text-xs text-neutral-600 mt-1">{content.subtitle}</p>
                  </div>
                  <div className="text-left sm:text-right shrink-0">
                    <span className="text-xs text-neutral-500">Penyusun:</span>
                    <div className="font-semibold text-neutral-900">{content.author.name}</div>
                    <div className="text-xs text-neutral-500">{content.author.school}</div>
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 text-xs">
                  <div>
                    <span className="text-neutral-400">Fase / Sasaran:</span>
                    <p className="font-semibold text-neutral-800">Fase D (SMP Kelas VII-VIII)</p>
                  </div>
                  <div>
                    <span className="text-neutral-400">Alokasi Waktu:</span>
                    <p className="font-semibold text-neutral-800">3 Pertemuan (6 x 40 Menit)</p>
                  </div>
                  <div>
                    <span className="text-neutral-400">Media Utama:</span>
                    <p className="font-semibold text-neutral-800">PID Smart Board & Chromebook</p>
                  </div>
                  <div>
                    <span className="text-neutral-400">Model Pembelajaran:</span>
                    <p className="font-semibold text-neutral-800">Inquiry & Project-Based (PjBL)</p>
                  </div>
                </div>
              </div>

              {/* Rencana Pembelajaran */}
              <div className="space-y-3">
                <h5 className="font-bold text-neutral-900 text-sm uppercase tracking-wide border-b border-neutral-200 pb-1">
                  1. Alur Tujuan Pembelajaran & Profil Pelajar Pancasila
                </h5>
                <p className="text-neutral-600 leading-relaxed text-xs sm:text-sm">
                  {content.description}
                </p>
                <div className="bg-red-50/50 border-l-4 border-red-700 p-3 rounded-r text-xs space-y-1">
                  <div className="font-semibold text-red-900">Dimensi Karakter Terintegrasi:</div>
                  <ul className="list-disc list-inside text-red-800 space-y-0.5">
                    <li>Bernalar Kritis: Menganalisis sebab-akibat data permasalahan kontekstual di Ciamis.</li>
                    <li>Gotong Royong: Menyelesaikan tantangan logika pemrograman secara berpasangan.</li>
                    <li>Mandiri: Melakukan refleksi belajar harian pada buku log portofolio digital.</li>
                  </ul>
                </div>
              </div>

              {/* Langkah Pelaksanaan */}
              <div className="space-y-3">
                <h5 className="font-bold text-neutral-900 text-sm uppercase tracking-wide border-b border-neutral-200 pb-1">
                  2. Skenario Pembelajaran Berbantuan PID & SAKTI
                </h5>
                <div className="space-y-2 text-xs sm:text-sm">
                  {content.keyPoints.map((point, index) => (
                    <div key={index} className="flex items-start space-x-2">
                      <span className="font-bold text-red-700">{index + 1}.</span>
                      <p className="text-neutral-700">{point}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-5">
              <h5 className="font-bold text-neutral-900 text-sm uppercase tracking-wide border-b border-neutral-200 pb-1">
                Instrumen Asesmen Autentik & Rubrik Evaluasi
              </h5>
              <div className="border border-neutral-200 rounded-lg overflow-x-auto text-xs">
                <table className="w-full min-w-[480px] text-left">
                  <thead className="bg-neutral-100 text-neutral-700 font-semibold border-b border-neutral-200">
                    <tr>
                      <th className="p-3">Aspek Penilaian</th>
                      <th className="p-3">Teknik Asesmen</th>
                      <th className="p-3">Instrumen</th>
                      <th className="p-3">Kriteria Keberhasilan</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-200">
                    <tr>
                      <td className="p-3 font-medium text-neutral-900">Pemahaman Konsep Logika</td>
                      <td className="p-3">Tes Formatif Adaptif</td>
                      <td className="p-3">Kuis Interaktif PID</td>
                      <td className="p-3 text-emerald-700">Skor $\ge 80$</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-medium text-neutral-900">Kolaborasi & Komunikasi</td>
                      <td className="p-3">Observasi Kinerja</td>
                      <td className="p-3">Lembar Observasi Guru</td>
                      <td className="p-3 text-emerald-700">Predikat Sangat Baik</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-medium text-neutral-900">Produk Portofolio Aksi</td>
                      <td className="p-3">Penilaian Proyek</td>
                      <td className="p-3">Rubrik Skala Likert 4</td>
                      <td className="p-3 text-emerald-700">Solutif & Kontekstual Galuh</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="p-4 bg-emerald-50 rounded-lg border border-emerald-200 text-xs text-emerald-900 space-y-1">
                <div className="font-semibold flex items-center">
                  <CheckCircle2 className="w-4 h-4 mr-1 text-emerald-700" />
                  Rekomendasi Penerapan di Ranting Lain:
                </div>
                <p>
                  Modul ini telah divalidasi oleh Tim Pengembang Kurikulum PGRI Cabang Kecamatan Ciamis dan cocok diterapkan pada sekolah dengan maupun tanpa ketersediaan koneksi internet tetap (bisa dipadukan dengan offline hotspot sekolah).
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="px-6 py-4 bg-neutral-50 border-t border-neutral-200 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-xs text-neutral-500">
            {downloadComplete ? (
              <span className="text-emerald-700 font-semibold flex items-center">
                <CheckCircle2 className="w-4 h-4 mr-1 inline" /> Berhasil diunduh! Cek folder Unduhan Anda.
              </span>
            ) : (
              <span>Format dokumen: Adobe PDF Standar Kurikulum Merdeka</span>
            )}
          </div>

          <div className="flex items-center space-x-2 w-full sm:w-auto">
            <button
              onClick={handlePrint}
              className="px-3 py-2 text-xs font-medium text-neutral-700 bg-white border border-neutral-300 rounded-lg hover:bg-neutral-100 transition-colors flex items-center justify-center"
              title="Cetak RPP / Simpan PDF"
            >
              <Printer className="w-3.5 h-3.5 mr-1" /> Cetak
            </button>

            <button
              onClick={handleDownload}
              disabled={downloading}
              className="flex-1 sm:flex-none px-4 py-2 text-xs font-semibold text-white bg-red-700 hover:bg-red-800 disabled:bg-neutral-400 rounded-lg shadow-sm transition-colors flex items-center justify-center space-x-1.5"
            >
              {downloading ? (
                <>
                  <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Menyiapkan File...</span>
                </>
              ) : (
                <>
                  <Download className="w-3.5 h-3.5" />
                  <span>Unduh Modul PDF ({content.modulPages} Hal)</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
