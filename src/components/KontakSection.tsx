import React, { useState } from 'react';
import {
  PhoneCall,
  Mail,
  MapPin,
  Clock,
  Send,
  CheckCircle2,
  Building,
  ExternalLink,
  ShieldCheck
} from 'lucide-react';
import { ContactInfo, ContactMessage } from '../types';
import { DEFAULT_CONTACT_INFO } from '../data/mockData';

interface KontakSectionProps {
  contactInfo?: ContactInfo;
  onNewMessage?: (msg: ContactMessage) => void;
}

export const KontakSection: React.FC<KontakSectionProps> = ({
  contactInfo = DEFAULT_CONTACT_INFO,
  onNewMessage,
}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [school, setSchool] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;

    if (onNewMessage) {
      onNewMessage({
        id: `msg-${Date.now()}`,
        name,
        email,
        phone,
        school,
        topic: 'Kontak Langsung Sekretariat',
        message,
        timestamp: `${new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}, ${new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })} WIB`,
        status: 'baru',
      });
    }

    setSubmitted(true);
    setTimeout(() => {
      setName('');
      setEmail('');
      setPhone('');
      setSchool('');
      setMessage('');
      setTimeout(() => setSubmitted(false), 5000);
    }, 800);
  };

  return (
    <section id="kontak" className="py-16 sm:py-20 bg-white border-b border-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-neutral-200 pb-8">
          <div className="space-y-3 max-w-3xl">
            <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-red-700">
              <PhoneCall className="w-4 h-4" />
              <span>Sekretariat & Komunikasi Resmi</span>
              <span aria-hidden="true">·</span>
              <span>KANTOR PGRI CIAMIS</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-neutral-900 tracking-tight text-balance">
              Hubungi Pengurus PGRI Ranting SMPN 2 Ciamis
            </h2>
            <p className="text-sm sm:text-base text-neutral-600 leading-relaxed">
              Kami siap melayani kebutuhan administrasi profesi pendidik, kemitraan satuan pendidikan, pendampingan implementasi SAKTI PID, serta layanan advokasi guru.
            </p>
          </div>

          <div className="flex items-center space-x-2 text-xs text-neutral-600 bg-neutral-50 px-4 py-2.5 rounded-xl border border-neutral-200 shrink-0">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Respon Cepat Jam Kerja Sekretariat</span>
          </div>
        </div>

        {/* Contact Grid: Details + Interactive Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Details & Location (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-neutral-50 rounded-2xl p-6 sm:p-8 border border-neutral-200 space-y-6">
              <h3 className="text-lg font-bold text-neutral-900 pb-2 border-b border-neutral-200">
                Informasi Kontak Resmi
              </h3>

              <div className="space-y-4 text-xs sm:text-sm text-neutral-700">
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 rounded-lg bg-red-100 text-red-700 flex items-center justify-center shrink-0 mt-0.5">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-bold text-neutral-900 block">{contactInfo.officeName}:</span>
                    <p className="text-neutral-600 mt-0.5">
                      {contactInfo.address}, {contactInfo.city} {contactInfo.postalCode}
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 rounded-lg bg-red-100 text-red-700 flex items-center justify-center shrink-0 mt-0.5">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-bold text-neutral-900 block">Surat Elektronik Resmi:</span>
                    <a
                      href={`mailto:${contactInfo.email}`}
                      className="text-red-700 hover:underline font-medium break-all"
                    >
                      {contactInfo.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 rounded-lg bg-red-100 text-red-700 flex items-center justify-center shrink-0 mt-0.5">
                    <PhoneCall className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-bold text-neutral-900 block">Helpdesk WhatsApp & Telepon:</span>
                    <a
                      href={`https://wa.me/${contactInfo.whatsapp.replace(/[^0-9]/g, '')}`}
                      target="_blank"
                      rel="noreferrer"
                      className="text-neutral-800 hover:text-emerald-700 font-mono block"
                    >
                      +{contactInfo.whatsapp} (WhatsApp Resmi)
                    </a>
                    {contactInfo.phone && (
                      <span className="text-neutral-500 font-mono text-xs block mt-0.5">
                        Telp Kantor: {contactInfo.phone}
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 rounded-lg bg-red-100 text-red-700 flex items-center justify-center shrink-0 mt-0.5">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-bold text-neutral-900 block">Jam Operasional Pelayanan:</span>
                    <p className="text-neutral-600 mt-0.5">
                      {contactInfo.operatingHours}<br />
                      {contactInfo.operatingHoursWeekend}
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-neutral-200">
                <a
                  href={contactInfo.mapEmbedUrl || `https://maps.google.com/?q=${encodeURIComponent(contactInfo.address)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full py-2.5 px-4 text-xs font-semibold text-neutral-800 bg-white border border-neutral-300 rounded-lg hover:bg-neutral-100 transition-colors flex items-center justify-center space-x-2"
                >
                  <Building className="w-4 h-4 text-neutral-500" />
                  <span>Petunjuk Arah Menuju SMPN 2 Ciamis</span>
                  <ExternalLink className="w-3.5 h-3.5 text-neutral-400" />
                </a>
              </div>
            </div>
          </div>

          {/* Interactive Contact Form (7 cols) */}
          <div className="lg:col-span-7 bg-neutral-50/70 rounded-2xl p-6 sm:p-8 border border-neutral-200">
            {submitted ? (
              <div className="py-12 text-center space-y-3">
                <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-emerald-900">Pesan Anda Telah Diterima!</h3>
                <p className="text-xs sm:text-sm text-emerald-800 max-w-md mx-auto">
                  Terima kasih telah menghubungi PGRI Ranting SMPN 2 Ciamis. Petugas sekretariat kami akan menindaklanjuti pesan Anda sesegera mungkin.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-1">
                  <h3 className="text-base font-bold text-neutral-900">Form Kontak & Konsultasi Langsung</h3>
                  <p className="text-xs text-neutral-500">
                    Sampaikan pertanyaan seputar program SAKTI, KTA, atau kerjasama antar ranting.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div className="space-y-1">
                    <label className="font-semibold text-neutral-700">Nama Lengkap & Gelar *</label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Contoh: Drs. H. Ahmad Fauzi, M.Pd."
                      className="w-full bg-white border border-neutral-300 rounded-lg p-2.5 text-xs text-neutral-900 focus:outline-none focus:border-red-600"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="font-semibold text-neutral-700">Alamat Email Aktif *</label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="email.aktif@gmail.com"
                      className="w-full bg-white border border-neutral-300 rounded-lg p-2.5 text-xs text-neutral-900 focus:outline-none focus:border-red-600"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div className="space-y-1">
                    <label className="font-semibold text-neutral-700">No. WhatsApp / HP</label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="08xxxxxxxxxx"
                      className="w-full bg-white border border-neutral-300 rounded-lg p-2.5 text-xs text-neutral-900 focus:outline-none focus:border-red-600"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="font-semibold text-neutral-700">Unit Kerja / Ranting Sekolah</label>
                    <input
                      type="text"
                      value={school}
                      onChange={(e) => setSchool(e.target.value)}
                      placeholder="Contoh: SMPN 2 Ciamis / Pengawas"
                      className="w-full bg-white border border-neutral-300 rounded-lg p-2.5 text-xs text-neutral-900 focus:outline-none focus:border-red-600"
                    />
                  </div>
                </div>

                <div className="space-y-1 text-xs">
                  <label className="font-semibold text-neutral-700">Pesan / Uraian Kebutuhan *</label>
                  <textarea
                    required
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Tuliskan secara jelas hal yang ingin dikonsultasikan..."
                    className="w-full bg-white border border-neutral-300 rounded-lg p-2.5 text-xs text-neutral-900 focus:outline-none focus:border-red-600"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 px-4 font-semibold text-white bg-red-700 hover:bg-red-800 rounded-lg transition-colors flex items-center justify-center space-x-2 text-xs shadow-xs"
                >
                  <Send className="w-4 h-4" />
                  <span>Kirim Pesan ke Sekretariat</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
