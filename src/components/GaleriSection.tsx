import React, { useState } from 'react';
import { Image, Calendar, MapPin, Tag, ZoomIn } from 'lucide-react';
import { GALLERY_ITEMS } from '../data/mockData';
import { GalleryItem } from '../types';

interface GaleriSectionProps {
  onSelectItem: (item: GalleryItem) => void;
  items?: GalleryItem[];
}

export const GaleriSection: React.FC<GaleriSectionProps> = ({
  onSelectItem,
  items = GALLERY_ITEMS,
}) => {
  const [filter, setFilter] = useState<string>('all');

  const categories = [
    { id: 'all', label: 'Semua Dokumentasi' },
    { id: 'pembelajaran', label: 'Pembelajaran & PID' },
    { id: 'kegiatan', label: 'Raker & Organisasi' },
    { id: 'dwp', label: 'Dharma Wanita (DWP)' },
    { id: 'upacara', label: 'Hari Guru & Upacara' },
    { id: 'workshop', label: 'Pameran & Inklusi' },
  ];

  const filteredItems = filter === 'all'
    ? items
    : items.filter((item) => item.category === filter);

  return (
    <section id="galeri" className="py-16 sm:py-20 bg-neutral-50/60 border-b border-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-neutral-200 pb-8">
          <div className="space-y-3 max-w-3xl">
            <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-red-700">
              <Image className="w-4 h-4" />
              <span>Dokumentasi Visual Autentik</span>
              <span aria-hidden="true">·</span>
              <span>Galeri Aksi Guru Ciamis</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-neutral-900 tracking-tight text-balance">
              Galeri Kegiatan & Dinamika Pendidikan Ciamis
            </h2>
            <p className="text-sm sm:text-base text-neutral-600 leading-relaxed">
              Kompilasi momen bersejarah, aksi nyata di ruang kelas masa depan, rapat koordinasi cabang, peringatan Hari Guru Nasional, serta kegiatan sosial kemasyarakatan.
            </p>
          </div>

          <div className="text-xs text-neutral-500 bg-white px-3.5 py-2 rounded-lg border border-neutral-200 shrink-0">
            Total {items.length} Dokumentasi Terverifikasi
          </div>
        </div>

        {/* Filter Buttons */}
        <div className="flex items-center overflow-x-auto pb-2 scrollbar-none gap-2">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setFilter(cat.id)}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
                filter === cat.id
                  ? 'bg-neutral-900 text-white shadow-xs'
                  : 'bg-white text-neutral-600 hover:text-neutral-900 border border-neutral-200'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              onClick={() => onSelectItem(item)}
              className="bg-white rounded-xl border border-neutral-200 overflow-hidden shadow-xs hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between"
            >
              <div>
                <div className="relative aspect-4/3 bg-neutral-900 overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

                  {/* Zoom indicator on hover */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/30">
                    <div className="w-10 h-10 rounded-full bg-white/90 text-neutral-900 flex items-center justify-center shadow-lg">
                      <ZoomIn className="w-5 h-5" />
                    </div>
                  </div>

                  <div className="absolute top-3 left-3 bg-red-700 text-white text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded">
                    {item.category}
                  </div>
                </div>

                <div className="p-4 space-y-2">
                  <h3 className="font-bold text-sm text-neutral-900 group-hover:text-red-700 transition-colors line-clamp-2">
                    {item.title}
                  </h3>
                  <p className="text-xs text-neutral-600 line-clamp-2 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>

              <div className="p-4 pt-2 border-t border-neutral-100 flex items-center justify-between text-xs text-neutral-500">
                <span className="flex items-center">
                  <Calendar className="w-3.5 h-3.5 mr-1 text-neutral-400" />
                  {item.date}
                </span>
                <span className="flex items-center truncate max-w-[130px]">
                  <MapPin className="w-3.5 h-3.5 mr-1 text-neutral-400" />
                  {item.location}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
