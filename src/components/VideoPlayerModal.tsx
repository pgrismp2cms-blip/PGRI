import React, { useState } from 'react';
import { X, Play, Pause, Volume2, VolumeX, Maximize2, RotateCcw, Clock, BookOpen, Check } from 'lucide-react';
import { SaktiContent } from '../types';

interface VideoPlayerModalProps {
  content: SaktiContent | null;
  isOpen: boolean;
  onClose: () => void;
}

export const VideoPlayerModal: React.FC<VideoPlayerModalProps> = ({
  content,
  isOpen,
  onClose,
}) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [activeChapter, setActiveChapter] = useState(0);

  if (!isOpen || !content) return null;

  const chapters = [
    { title: '01:00 - Pengantar Konteks Ekosistem Ciamis', timestamp: '01:00' },
    { title: '04:15 - Praktik Interaksi PID & Computational Thinking', timestamp: '04:15' },
    { title: '08:30 - Skenario Kolaborasi Siswa Berpasangan', timestamp: '08:30' },
    { title: '12:00 - Refleksi Asesmen Formatif & Rumah Pendidikan', timestamp: '12:00' },
  ];

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 overflow-y-auto bg-neutral-900/80 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6"
      onClick={onClose}
    >
      <div
        className="bg-neutral-950 w-full max-w-4xl rounded-xl shadow-2xl border border-neutral-800 overflow-hidden flex flex-col text-white"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="flex items-center justify-between px-5 py-3 border-b border-neutral-800 bg-neutral-900/60">
          <div className="flex items-center space-x-2">
            <span className="w-2.5 h-2.5 rounded-full bg-red-600 animate-pulse" />
            <span className="text-xs uppercase tracking-wider font-semibold text-neutral-300">
              Video Pembelajaran Interaktif SAKTI
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors"
            title="Tutup pemutar video"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Video Stage Simulation */}
        <div className="relative aspect-video bg-neutral-900 flex items-center justify-center overflow-hidden group">
          <img
            src={content.image}
            alt={content.title}
            className="w-full h-full object-cover opacity-85 filter contrast-105"
          />

          {/* Overlay Grid */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/20" />

          {/* Playing Simulation Animation */}
          {isPlaying ? (
            <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-xs px-3 py-1 rounded text-xs text-red-400 border border-neutral-700 flex items-center space-x-1.5">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
              <span>Memutar Sesi Praktik: {chapters[activeChapter].title}</span>
            </div>
          ) : (
            <div className="absolute inset-0 flex items-center justify-center bg-black/40">
              <button
                onClick={() => setIsPlaying(true)}
                className="w-16 h-16 rounded-full bg-red-600/90 text-white flex items-center justify-center hover:scale-105 transition-transform shadow-lg"
              >
                <Play className="w-8 h-8 ml-1" />
              </button>
            </div>
          )}

          {/* Watermark Branding */}
          <div className="absolute top-4 right-4 text-right">
            <div className="text-xs font-bold tracking-tight text-white/90 drop-shadow">
              PGRI SMPN 2 CIAMIS
            </div>
            <div className="text-[10px] text-neutral-300">Dokumentasi Aksi SAKTI</div>
          </div>

          {/* Bottom Player Controls */}
          <div className="absolute bottom-0 inset-x-0 p-4 bg-gradient-to-t from-black via-black/70 to-transparent">
            {/* Timeline Bar */}
            <div className="w-full bg-neutral-700 h-1.5 rounded-full overflow-hidden mb-3 cursor-pointer">
              <div
                className="bg-red-600 h-full rounded-full transition-all duration-300"
                style={{ width: `${(activeChapter + 1) * 25}%` }}
              />
            </div>

            <div className="flex items-center justify-between text-xs text-neutral-300">
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="hover:text-white transition-colors"
                  title={isPlaying ? 'Jeda' : 'Putar'}
                >
                  {isPlaying ? <Pause className="w-5 h-5 text-white" /> : <Play className="w-5 h-5 text-white" />}
                </button>
                <button
                  onClick={() => setIsMuted(!isMuted)}
                  className="hover:text-white transition-colors"
                  title={isMuted ? 'Nyalakan Suara' : 'Bisukan Suara'}
                >
                  {isMuted ? <VolumeX className="w-4 h-4 text-neutral-400" /> : <Volume2 className="w-4 h-4 text-white" />}
                </button>
                <span className="font-mono text-[11px] text-neutral-400">
                  {chapters[activeChapter].timestamp} / {content.videoDuration}
                </span>
              </div>

              <div className="flex items-center space-x-3">
                <span className="hidden sm:inline-block text-[11px] bg-neutral-800 px-2 py-0.5 rounded text-neutral-300">
                  HD 1080p
                </span>
                <button
                  onClick={() => setActiveChapter((c) => (c + 1) % chapters.length)}
                  className="text-neutral-400 hover:text-white flex items-center space-x-1"
                  title="Pindah bab berikutnya"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline text-[11px]">Bab Berikutnya</span>
                </button>
                <Maximize2 className="w-4 h-4 text-neutral-400 hover:text-white cursor-pointer" />
              </div>
            </div>
          </div>
        </div>

        {/* Video Metadata & Chapter Navigation */}
        <div className="p-5 grid grid-cols-1 md:grid-cols-3 gap-6 bg-neutral-900 text-neutral-300 text-xs">
          <div className="md:col-span-2 space-y-2">
            <h4 className="text-base font-bold text-white">{content.title}</h4>
            <p className="text-neutral-400 leading-relaxed">{content.description}</p>
            <div className="pt-2 flex items-center space-x-3 text-neutral-400">
              <span className="font-medium text-white">{content.author.name}</span>
              <span>·</span>
              <span>{content.author.school}</span>
              <span>·</span>
              <span>Durasi: {content.videoDuration}</span>
            </div>
          </div>

          <div className="bg-neutral-950 p-3.5 rounded-lg border border-neutral-800 space-y-2">
            <div className="font-semibold text-white flex items-center justify-between pb-1 border-b border-neutral-800">
              <span className="flex items-center">
                <BookOpen className="w-3.5 h-3.5 mr-1 text-red-500" /> Daftar Segmen Video:
              </span>
              <span className="text-[10px] text-neutral-500 font-mono">4 BAB</span>
            </div>
            <div className="space-y-1.5">
              {chapters.map((ch, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setActiveChapter(idx);
                    setIsPlaying(true);
                  }}
                  className={`w-full text-left p-2 rounded transition-colors text-[11px] flex items-center justify-between ${
                    activeChapter === idx
                      ? 'bg-red-950/80 text-red-300 border border-red-800'
                      : 'hover:bg-neutral-900 text-neutral-400 hover:text-neutral-200'
                  }`}
                >
                  <span className="truncate mr-2">{ch.title}</span>
                  {activeChapter === idx && <Check className="w-3.5 h-3.5 text-red-400 shrink-0" />}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
