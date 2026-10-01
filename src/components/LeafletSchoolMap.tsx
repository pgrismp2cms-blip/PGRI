import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import { RantingSchool } from '../types';
import { RANTING_LIST } from '../data/mockData';
import {
  MapPin,
  Phone,
  Mail,
  ExternalLink,
  Navigation,
  School,
  CheckCircle2,
  Filter,
  Maximize2
} from 'lucide-react';

interface LeafletSchoolMapProps {
  schools?: RantingSchool[];
  onSelectSchool?: (school: RantingSchool) => void;
}

export const LeafletSchoolMap: React.FC<LeafletSchoolMapProps> = ({
  schools = RANTING_LIST,
  onSelectSchool,
}) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markersRef = useRef<{ [key: string]: L.Marker }>({});

  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [selectedSchool, setSelectedSchool] = useState<RantingSchool>(schools[0] || RANTING_LIST[0]);

  useEffect(() => {
    if (schools.length > 0) {
      setSelectedSchool((prev) => schools.find((s) => s.id === prev.id) || schools[0]);
    }
  }, [schools]);

  // Color mapping based on jenjang with PGRI colors
  const getJenjangColor = (jenjang: string, isPusat: boolean) => {
    if (isPusat) return '#b91c1c'; // Red PGRI
    switch (jenjang) {
      case 'PAUD': return '#d97706'; // Amber
      case 'SD': return '#2563eb'; // Blue
      case 'SMP': return '#dc2626'; // Red
      case 'SMA/SMK': return '#059669'; // Emerald
      case 'SLB': return '#7c3aed'; // Purple
      default: return '#111827';
    }
  };

  const createCustomIcon = (school: RantingSchool) => {
    const isPusat = school.id === 'ranting-smpn2';
    const color = getJenjangColor(school.jenjang, isPusat);

    const html = `
      <div style="position: relative; width: 36px; height: 36px; display: flex; align-items: center; justify-content: center;">
        ${isPusat ? `<div style="position: absolute; width: 44px; height: 44px; border-radius: 50%; background-color: rgba(185, 28, 28, 0.25); animation: ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite;"></div>` : ''}
        <div style="background-color: ${color}; color: white; width: ${isPusat ? '36px' : '30px'}; height: ${isPusat ? '36px' : '30px'}; border-radius: 50%; display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.3); border: 2.5px solid white; font-weight: bold; font-size: ${isPusat ? '13px' : '11px'};">
          ${isPusat ? '★' : school.jenjang.substring(0, 2)}
        </div>
        <div style="position: absolute; bottom: -5px; left: 50%; transform: translateX(-50%); width: 0; height: 0; border-left: 5px solid transparent; border-right: 5px solid transparent; border-top: 6px solid ${color};"></div>
      </div>
    `;

    return L.divIcon({
      html,
      className: 'custom-leaflet-marker',
      iconSize: [36, 42],
      iconAnchor: [18, 40],
      popupAnchor: [0, -36],
    });
  };

  // Initialize Map
  useEffect(() => {
    if (!mapContainerRef.current) return;

    // Check if map already initialized
    if (!mapInstanceRef.current) {
      const map = L.map(mapContainerRef.current, {
        center: [-7.3278, 108.3541],
        zoom: 14,
        scrollWheelZoom: false,
      });

      // Standard OSM tiles
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 19,
      }).addTo(map);

      mapInstanceRef.current = map;
    }

    const map = mapInstanceRef.current;

    // Clear existing markers
    Object.values(markersRef.current).forEach((marker) => marker.remove());
    markersRef.current = {};

    // Filter schools
    const schoolsToRender = activeFilter === 'all'
      ? schools
      : schools.filter((s) => s.jenjang === activeFilter);

    // Add Markers
    schoolsToRender.forEach((school) => {
      const isPusat = school.id === 'ranting-smpn2';
      const marker = L.marker([school.latitude, school.longitude], {
        icon: createCustomIcon(school),
      }).addTo(map);

      // Popup content
      const popupHtml = `
        <div style="width: 250px; max-width: calc(100vw - 64px); font-family: 'Plus Jakarta Sans', sans-serif; padding: 10px 12px; color: #1e293b; box-sizing: border-box;">
          ${school.image ? `<img src="${school.image}" alt="${school.name}" style="width: 100%; height: 95px; object-fit: cover; border-radius: 6px; margin-bottom: 6px;" />` : ''}
          <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 6px;">
            <span style="font-size: 10px; font-weight: bold; text-transform: uppercase; color: ${isPusat ? '#b91c1c' : '#475569'};">
              ${isPusat ? '★ Ranting Pusat PGRI' : `Jenjang ${school.jenjang}`}
            </span>
            <span style="font-size: 10px; background-color: #f1f5f9; padding: 2px 6px; border-radius: 4px; font-weight: 600;">
              NPSN ${school.npsn}
            </span>
          </div>
          <h4 style="font-size: 13px; font-weight: bold; margin: 0 0 4px 0; color: #0f172a; line-height: 1.3;">
            ${school.name}
          </h4>
          <p style="font-size: 11px; color: #64748b; margin: 0 0 8px 0; line-height: 1.4;">
            ${school.address}
          </p>
          <div style="border-top: 1px solid #e2e8f0; padding-top: 6px; margin-bottom: 8px; font-size: 11px;">
            <div style="color: #334155;"><strong>Kepsek:</strong> ${school.kepalaSekolah}</div>
            ${school.phone ? `<div style="color: #334155; margin-top: 2px;"><strong>Telp:</strong> ${school.phone}</div>` : ''}
            ${school.email ? `<div style="color: #334155; margin-top: 2px;"><strong>Email:</strong> ${school.email}</div>` : ''}
          </div>
          <div style="display: flex; gap: 6px;">
            <a href="https://maps.google.com/?q=${school.latitude},${school.longitude}" target="_blank" rel="noreferrer" 
               style="flex: 1; text-align: center; background-color: #1e293b; color: white; font-size: 11px; padding: 7px 8px; border-radius: 6px; text-decoration: none; font-weight: 600;">
              Petunjuk Arah Google Maps
            </a>
          </div>
        </div>
      `;

      marker.bindPopup(popupHtml);

      marker.on('click', () => {
        setSelectedSchool(school);
        if (onSelectSchool) onSelectSchool(school);
      });

      markersRef.current[school.id] = marker;
    });

    // Cleanup on unmount
    return () => {
      // Keep map instance alive across rerenders, only clean markers
    };
  }, [schools, activeFilter]);

  // Focus school handler
  const handleFocusSchool = (school: RantingSchool) => {
    setSelectedSchool(school);
    if (onSelectSchool) onSelectSchool(school);

    if (mapInstanceRef.current) {
      mapInstanceRef.current.flyTo([school.latitude, school.longitude], 16, {
        duration: 1.2,
      });

      const marker = markersRef.current[school.id];
      if (marker) {
        setTimeout(() => marker.openPopup(), 1200);
      }
    }
  };

  const handleResetView = () => {
    if (mapInstanceRef.current) {
      mapInstanceRef.current.flyTo([-7.3278, 108.3541], 14, { duration: 1 });
    }
  };

  return (
    <div className="space-y-4">
      {/* Top Filter and Actions Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-3.5 rounded-xl border border-neutral-200 shadow-xs text-xs">
        <div className="flex items-center space-x-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
          <span className="text-neutral-500 font-semibold flex items-center mr-1">
            <Filter className="w-3.5 h-3.5 mr-1 text-neutral-400" /> Jenjang:
          </span>
          {[
            { id: 'all', label: 'Semua (8 Basis)' },
            { id: 'SMP', label: 'SMP' },
            { id: 'SD', label: 'SD' },
            { id: 'PAUD', label: 'PAUD' },
            { id: 'SMA/SMK', label: 'SMA/SMK' },
            { id: 'SLB', label: 'SLB' },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveFilter(cat.id)}
              className={`px-3 py-1 rounded-md transition-colors whitespace-nowrap font-medium ${
                activeFilter === cat.id
                  ? 'bg-neutral-900 text-white font-semibold shadow-xs'
                  : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <button
          onClick={handleResetView}
          className="px-3 py-1 text-xs font-semibold text-neutral-700 bg-neutral-100 hover:bg-neutral-200 rounded-md transition-colors flex items-center space-x-1"
          title="Reset ke Pusat Ciamis"
        >
          <Navigation className="w-3.5 h-3.5 text-red-700" />
          <span>Reset Tampilan Pusat</span>
        </button>
      </div>

      {/* Main Map + School Detail Sidebar Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Leaflet Canvas Container (8 cols) */}
        <div className="lg:col-span-8 bg-white rounded-2xl border border-neutral-200 overflow-hidden shadow-xs relative">
          <div
            ref={mapContainerRef}
            className="w-full h-[320px] sm:h-[460px] z-10"
            style={{ minHeight: '300px' }}
          />

          {/* Quick Legend Overlay on bottom-left */}
          <div className="absolute bottom-2.5 left-2.5 sm:bottom-3 sm:left-3 z-20 bg-white/95 backdrop-blur-xs p-2 sm:p-2.5 rounded-lg border border-neutral-200 shadow-md text-[9px] sm:text-[10px] text-neutral-700 space-y-1">
            <div className="font-bold text-neutral-900 flex items-center">
              <span className="w-2.5 h-2.5 rounded-full bg-red-700 mr-1.5" />
              Legenda Marker Peta:
            </div>
            <div className="grid grid-cols-2 gap-x-3 gap-y-0.5">
              <div className="flex items-center space-x-1">
                <span className="w-2 h-2 rounded-full bg-red-700" />
                <span>SMPN 2 (Pusat ★)</span>
              </div>
              <div className="flex items-center space-x-1">
                <span className="w-2 h-2 rounded-full bg-blue-600" />
                <span>SD Negeri</span>
              </div>
              <div className="flex items-center space-x-1">
                <span className="w-2 h-2 rounded-full bg-amber-600" />
                <span>PAUD / TK</span>
              </div>
              <div className="flex items-center space-x-1">
                <span className="w-2 h-2 rounded-full bg-emerald-600" />
                <span>SMA / SMK</span>
              </div>
              <div className="flex items-center space-x-1">
                <span className="w-2 h-2 rounded-full bg-purple-600" />
                <span>SLB Inklusif</span>
              </div>
            </div>
          </div>
        </div>

        {/* Selected School Detail Inspector & Quick List (4 cols) */}
        <div className="lg:col-span-4 space-y-4">
          {/* Active School Profile Card */}
          <div className="bg-white rounded-2xl p-5 border border-neutral-200 shadow-xs space-y-4">
            {selectedSchool.image && (
              <div className="rounded-xl overflow-hidden border border-neutral-200 -mt-1 -mx-1 mb-2">
                <img
                  src={selectedSchool.image}
                  alt={selectedSchool.name}
                  className="w-full h-36 object-cover hover:scale-102 transition-transform duration-300"
                />
              </div>
            )}
            <div className="pb-3 border-b border-neutral-200">
              <div className="flex items-center justify-between">
                <span className="text-[10px] uppercase font-bold text-red-700 tracking-wider">
                  {selectedSchool.id === 'ranting-smpn2' ? '★ Ranting Pusat PGRI' : `Jenjang ${selectedSchool.jenjang}`}
                </span>
                <span className="text-xs font-mono font-semibold bg-neutral-100 px-2 py-0.5 rounded text-neutral-700">
                  NPSN {selectedSchool.npsn}
                </span>
              </div>
              <h4 className="text-base font-bold text-neutral-900 mt-1">{selectedSchool.name}</h4>
              <p className="text-xs text-neutral-500 mt-0.5">{selectedSchool.address}</p>
            </div>

            <div className="space-y-2 text-xs text-neutral-700">
              {selectedSchool.description && (
                <p className="text-neutral-600 leading-relaxed bg-neutral-50 p-2.5 rounded-lg border border-neutral-100">
                  {selectedSchool.description}
                </p>
              )}

              <div className="pt-1 space-y-1.5">
                <div>
                  <span className="text-neutral-400">Kepala Sekolah:</span>
                  <div className="font-semibold text-neutral-900">{selectedSchool.kepalaSekolah}</div>
                </div>
                <div>
                  <span className="text-neutral-400">Jumlah Tenaga Pendidik:</span>
                  <div className="font-semibold text-neutral-900">{selectedSchool.jumlahGuru} Guru Anggota KTA</div>
                </div>
                {selectedSchool.phone && (
                  <div className="flex items-center space-x-1.5 text-neutral-800">
                    <Phone className="w-3.5 h-3.5 text-red-600 shrink-0" />
                    <span>{selectedSchool.phone}</span>
                  </div>
                )}
                {selectedSchool.email && (
                  <div className="flex items-center space-x-1.5 text-neutral-800">
                    <Mail className="w-3.5 h-3.5 text-red-600 shrink-0" />
                    <a href={`mailto:${selectedSchool.email}`} className="text-red-700 hover:underline truncate">
                      {selectedSchool.email}
                    </a>
                  </div>
                )}
              </div>

              {/* Innovations */}
              <div className="pt-2 border-t border-neutral-100 space-y-1.5">
                <span className="font-bold text-neutral-800">Program & Inovasi:</span>
                <div className="space-y-1">
                  {selectedSchool.innovations.map((inv, idx) => (
                    <div key={idx} className="flex items-center space-x-1.5 text-neutral-600">
                      <CheckCircle2 className="w-3 h-3 text-emerald-600 shrink-0" />
                      <span>{inv}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* External Google Maps Button */}
            <div className="pt-2 flex gap-2">
              <a
                href={`https://maps.google.com/?q=${selectedSchool.latitude},${selectedSchool.longitude}`}
                target="_blank"
                rel="noreferrer"
                className="w-full py-2 px-3 text-xs font-semibold text-white bg-neutral-900 hover:bg-neutral-800 rounded-lg transition-colors flex items-center justify-center space-x-1.5 shadow-xs"
              >
                <span>Buka di Google Maps</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Quick Click-to-Zoom School List */}
          <div className="bg-neutral-50 rounded-2xl p-4 border border-neutral-200 space-y-2">
            <div className="text-[11px] font-bold uppercase tracking-wider text-neutral-500">
              Daftar Cepat Lokasi Sekolah:
            </div>
            <div className="space-y-1 max-h-56 overflow-y-auto pr-1">
              {schools.map((sch) => {
                const isSelected = selectedSchool.id === sch.id;
                return (
                  <button
                    key={sch.id}
                    onClick={() => handleFocusSchool(sch)}
                    className={`w-full text-left p-2 rounded-lg text-xs transition-colors flex items-center justify-between ${
                      isSelected
                        ? 'bg-red-700 text-white font-semibold'
                        : 'bg-white hover:bg-neutral-100 text-neutral-800 border border-neutral-200'
                    }`}
                  >
                    <span className="truncate mr-2">{sch.name}</span>
                    <span className={`text-[10px] uppercase shrink-0 ${isSelected ? 'text-red-100' : 'text-neutral-400'}`}>
                      {sch.jenjang}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
