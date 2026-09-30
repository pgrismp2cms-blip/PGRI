import React from 'react';
import { X, Calendar, MapPin, Tag } from 'lucide-react';
import { GalleryItem } from '../types';

interface GalleryLightboxModalProps {
  item: GalleryItem | null;
  isOpen: boolean;
  onClose: () => void;
}

export const GalleryLightboxModal: React.FC<GalleryLightboxModalProps> = ({
  item,
  isOpen,
  onClose,
}) => {
  if (!isOpen || !item) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 overflow-y-auto bg-neutral-950/90 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6"
      onClick={onClose}
    >
      <div
        className="bg-neutral-900 text-white w-full max-w-4xl rounded-xl shadow-2xl border border-neutral-800 overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-5 py-3 border-b border-neutral-800 bg-neutral-900">
          <div className="text-xs uppercase tracking-wider text-neutral-400 font-semibold flex items-center">
            <Tag className="w-3.5 h-3.5 mr-1 text-red-500" />
            Galeri Dokumentasi · {item.category.toUpperCase()}
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="relative bg-black flex items-center justify-center max-h-[70vh]">
          <img
            src={item.image}
            alt={item.title}
            className="w-full h-auto max-h-[68vh] object-contain"
            referrerPolicy="no-referrer"
          />
        </div>

        <div className="p-5 space-y-2 bg-neutral-900 border-t border-neutral-800">
          <h3 className="text-base sm:text-lg font-bold text-white">{item.title}</h3>
          <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">{item.description}</p>
          <div className="flex flex-wrap items-center gap-4 text-xs text-neutral-400 pt-2 border-t border-neutral-800/80">
            <span className="flex items-center">
              <Calendar className="w-3.5 h-3.5 mr-1 text-neutral-500" />
              {item.date}
            </span>
            <span>·</span>
            <span className="flex items-center">
              <MapPin className="w-3.5 h-3.5 mr-1 text-neutral-500" />
              {item.location}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
