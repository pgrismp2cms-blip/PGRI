import React, { useState, useEffect } from 'react';
import { ArrowUp, MessageCircle, X, Send, Sparkles } from 'lucide-react';

export const FloatingActions: React.FC = () => {
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [waDrawerOpen, setWaDrawerOpen] = useState(false);
  const [selectedTopic, setSelectedTopic] = useState('Tanya Modul SAKTI');
  const [customMsg, setCustomMsg] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setShowBackToTop(true);
      } else {
        setShowBackToTop(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSendWA = () => {
    const text = `Halo Admin PGRI Ciamis / SMPN 2 Ciamis, perihal [${selectedTopic}]: ${customMsg || 'Saya ingin bertanya informasi lebih lanjut.'}`;
    const url = `https://wa.me/6281223456789?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
    setWaDrawerOpen(false);
  };

  const topics = [
    'Tanya Modul SAKTI & RPP',
    'Konsultasi PID & Smart Board',
    'Koding KKA di Kelas SMP',
    'Info KTA PGRI Ciamis',
    'Kolaborasi Kombel / MGMP',
  ];

  return (
    <aside aria-label="Aksi Cepat & Navigasi Pintas" className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40 flex flex-col items-end space-y-3">
      {/* WhatsApp Quick Chat Drawer */}
      {waDrawerOpen && (
        <div className="bg-white rounded-2xl shadow-2xl border border-neutral-200 w-[calc(100vw-32px)] sm:w-88 max-w-sm p-4 mb-2 animate-in fade-in slide-in-from-bottom-3 duration-200 text-xs">
          <div className="flex items-center justify-between pb-3 border-b border-neutral-100">
            <div className="flex items-center space-x-2">
              <div className="w-7 h-7 rounded-full bg-emerald-600 text-white flex items-center justify-center">
                <MessageCircle className="w-4 h-4" />
              </div>
              <div>
                <div className="font-bold text-neutral-900 leading-tight">Helpdesk PGRI Ciamis</div>
                <div className="text-[10px] text-emerald-600 flex items-center">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mr-1 animate-pulse" />
                  Online Sekretariat Ranting
                </div>
              </div>
            </div>
            <button
              onClick={() => setWaDrawerOpen(false)}
              className="p-1 hover:bg-neutral-100 rounded text-neutral-400 hover:text-neutral-700"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="py-3 space-y-2.5">
            <p className="text-neutral-600 text-[11px]">
              Silakan pilih topik atau ketik pesan untuk terhubung langsung dengan Sekretariat PGRI Ranting SMPN 2 Ciamis via WhatsApp:
            </p>

            <div className="space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">
                Pilih Topik Layanan:
              </span>
              <div className="grid grid-cols-1 gap-1">
                {topics.map((t) => (
                  <button
                    key={t}
                    onClick={() => setSelectedTopic(t)}
                    className={`text-left px-2.5 py-1.5 rounded text-[11px] transition-colors ${
                      selectedTopic === t
                        ? 'bg-emerald-50 text-emerald-800 font-semibold border border-emerald-200'
                        : 'bg-neutral-50 text-neutral-700 hover:bg-neutral-100'
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-1 pt-1">
              <textarea
                rows={2}
                value={customMsg}
                onChange={(e) => setCustomMsg(e.target.value)}
                placeholder="Tulis pesan tambahan Anda (opsional)..."
                className="w-full bg-neutral-50 border border-neutral-200 rounded p-2 text-xs focus:outline-none focus:border-emerald-600"
              />
            </div>

            <button
              onClick={handleSendWA}
              className="w-full py-2 px-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-semibold flex items-center justify-center space-x-1.5 transition-colors shadow-xs"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Buka Chat WhatsApp</span>
            </button>
          </div>
        </div>
      )}

      {/* Buttons Row */}
      <div className="flex items-center space-x-2">
        {/* WhatsApp Floating Button */}
        <button
          onClick={() => setWaDrawerOpen(!waDrawerOpen)}
          className="p-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-full shadow-lg hover:shadow-xl transition-all flex items-center justify-center group focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-emerald-300"
          title="Buka WhatsApp Quick Chat"
          aria-label="WhatsApp Quick Chat"
        >
          <MessageCircle className="w-5 h-5 fill-current" />
        </button>

        {/* Back to Top Button */}
        {showBackToTop && (
          <button
            onClick={scrollToTop}
            className="p-3 bg-neutral-900/90 hover:bg-neutral-900 text-white rounded-full shadow-lg hover:shadow-xl transition-all flex items-center justify-center focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-neutral-400"
            title="Kembali ke Bagian Atas"
            aria-label="Kembali ke atas"
          >
            <ArrowUp className="w-5 h-5" />
          </button>
        )}
      </div>
    </aside>
  );
};
