import React, { useState } from 'react';
import { X, Award, CheckCircle2, Share2, BookOpen, School, Calendar, Clock, Copy, Check } from 'lucide-react';
import { StarPractice } from '../types';

interface StarArticleModalProps {
  practice: StarPractice | null;
  isOpen: boolean;
  onClose: () => void;
}

export const StarArticleModal: React.FC<StarArticleModalProps> = ({
  practice,
  isOpen,
  onClose,
}) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen || !practice) return null;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  const getJenjangLabel = (jenjang: string) => {
    switch (jenjang) {
      case 'paud': return 'Jenjang PAUD / TK';
      case 'sd': return 'Jenjang Sekolah Dasar (SD)';
      case 'smp': return 'Jenjang SMP (Fase D)';
      case 'sma_smk_slb': return 'Jenjang SMA / SMK / SLB';
      default: return jenjang;
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 overflow-y-auto bg-neutral-900/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6"
      onClick={onClose}
    >
      <div
        className="bg-white w-full max-w-3xl rounded-xl shadow-2xl border border-neutral-200 overflow-hidden flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-200 bg-neutral-50/80">
          <div className="flex items-center space-x-2">
            <span className="text-xs uppercase tracking-wider font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
              Praktik Baik STAR Terverifikasi
            </span>
            <span className="text-xs text-neutral-400">·</span>
            <span className="text-xs text-neutral-600 font-medium">
              {getJenjangLabel(practice.jenjang)}
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-neutral-400 hover:text-neutral-700 hover:bg-neutral-200 transition-colors"
            title="Tutup artikel STAR"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="overflow-y-auto p-6 sm:p-8 space-y-6 flex-1 text-sm text-neutral-800">
          {/* Title & Metadata */}
          <div className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-bold text-neutral-900 tracking-tight leading-snug">
              {practice.title}
            </h2>

            <div className="flex flex-wrap items-center gap-3 text-xs text-neutral-500 border-b border-neutral-200 pb-4">
              <span className="font-semibold text-neutral-800">{practice.authorName}</span>
              {practice.authorNip && <span>(NIP. {practice.authorNip})</span>}
              <span>·</span>
              <span className="flex items-center">
                <School className="w-3.5 h-3.5 mr-1" />
                {practice.schoolName}
              </span>
              <span>·</span>
              <span className="flex items-center">
                <Calendar className="w-3.5 h-3.5 mr-1" />
                {practice.publishedDate}
              </span>
              <span>·</span>
              <span className="flex items-center">
                <Clock className="w-3.5 h-3.5 mr-1" />
                {practice.readTime}
              </span>
            </div>
          </div>

          {/* Featured Image with Scrim & Caption */}
          <div className="rounded-lg overflow-hidden border border-neutral-200 relative aspect-16/9 bg-neutral-100">
            <img
              src={practice.image}
              alt={practice.title}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-3 text-white text-xs">
              <span>Dokumentasi Implementasi Lapangan di {practice.schoolName}</span>
            </div>
          </div>

          {/* Impact Stats Card Grid */}
          <div className="grid grid-cols-3 gap-3 p-4 bg-emerald-50/70 border border-emerald-200 rounded-lg">
            {practice.impactStats.map((stat, idx) => (
              <div key={idx} className="text-center">
                <div className="text-lg sm:text-2xl font-bold text-emerald-900 font-mono">
                  {stat.metric}
                </div>
                <div className="text-[11px] sm:text-xs text-emerald-800 mt-0.5">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* STAR Sections Breakdown */}
          <div className="space-y-6 pt-2">
            {/* Situasi */}
            <div className="border-l-4 border-amber-500 pl-4 py-1">
              <h4 className="font-bold text-base text-neutral-900 flex items-center mb-1">
                <span className="w-6 h-6 rounded-full bg-amber-100 text-amber-900 text-xs font-bold inline-flex items-center justify-center mr-2">
                  S
                </span>
                Situasi (Latar Belakang & Kondisi Awal)
              </h4>
              <p className="text-neutral-700 leading-relaxed text-xs sm:text-sm">
                {practice.starDetails.situasi}
              </p>
            </div>

            {/* Tantangan */}
            <div className="border-l-4 border-red-500 pl-4 py-1">
              <h4 className="font-bold text-base text-neutral-900 flex items-center mb-1">
                <span className="w-6 h-6 rounded-full bg-red-100 text-red-900 text-xs font-bold inline-flex items-center justify-center mr-2">
                  T
                </span>
                Tantangan (Hambatan & Target Sasaran)
              </h4>
              <p className="text-neutral-700 leading-relaxed text-xs sm:text-sm">
                {practice.starDetails.tantangan}
              </p>
            </div>

            {/* Aksi */}
            <div className="border-l-4 border-blue-500 pl-4 py-1">
              <h4 className="font-bold text-base text-neutral-900 flex items-center mb-1">
                <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-900 text-xs font-bold inline-flex items-center justify-center mr-2">
                  A
                </span>
                Aksi (Langkah Strategis & Media SAKTI)
              </h4>
              <p className="text-neutral-700 leading-relaxed text-xs sm:text-sm">
                {practice.starDetails.aksi}
              </p>
            </div>

            {/* Refleksi */}
            <div className="border-l-4 border-emerald-500 pl-4 py-1">
              <h4 className="font-bold text-base text-neutral-900 flex items-center mb-1">
                <span className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-900 text-xs font-bold inline-flex items-center justify-center mr-2">
                  R
                </span>
                Refleksi Hasil & Dampak Berkelanjutan
              </h4>
              <p className="text-neutral-700 leading-relaxed text-xs sm:text-sm">
                {practice.starDetails.refleksi}
              </p>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="px-6 py-4 bg-neutral-50 border-t border-neutral-200 flex items-center justify-between">
          <div className="text-xs text-neutral-500">
            Terdaftar di Repositori Praktik Baik PGRI Cabang Ciamis
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={handleCopyLink}
              className="px-3 py-1.5 text-xs font-medium text-neutral-700 bg-white border border-neutral-300 rounded-lg hover:bg-neutral-100 transition-colors flex items-center"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600 mr-1" />
                  <span>Tautan Disalin!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 mr-1" />
                  <span>Salin Tautan</span>
                </>
              )}
            </button>
            <button
              onClick={onClose}
              className="px-4 py-1.5 text-xs font-semibold text-white bg-neutral-900 hover:bg-neutral-800 rounded-lg transition-colors"
            >
              Tutup
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
