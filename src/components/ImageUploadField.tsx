import React, { useState } from 'react';
import { Upload, Image as ImageIcon, X, Loader2, Check } from 'lucide-react';
import { uploadImageToServer } from '../utils/imageUpload';

interface ImageUploadFieldProps {
  label: string;
  value: string;
  onChange: (url: string) => void;
  description?: string;
  aspectRatio?: 'square' | 'video' | 'any';
  placeholder?: string;
}

export const ImageUploadField: React.FC<ImageUploadFieldProps> = ({
  label,
  value,
  onChange,
  description,
  aspectRatio = 'video',
  placeholder = 'https://... atau pilih upload file',
}) => {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [imageError, setImageError] = useState(false);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 15 * 1024 * 1024) {
      alert('Ukuran berkas gambar maksimal 15 MB.');
      return;
    }

    try {
      setIsUploading(true);
      setUploadSuccess(false);
      setImageError(false);

      const staticUrl = await uploadImageToServer(file);
      onChange(staticUrl);
      setUploadSuccess(true);
      setTimeout(() => setUploadSuccess(false), 2500);
    } catch (err: any) {
      alert('Gagal mengunggah gambar: ' + (err.message || 'Kesalahan jaringan'));
    } finally {
      setIsUploading(false);
    }
  };

  const previewClasses =
    aspectRatio === 'square'
      ? 'w-20 h-20 shrink-0'
      : aspectRatio === 'video'
      ? 'w-32 h-20 shrink-0'
      : 'w-24 h-20 shrink-0';

  return (
    <div className="space-y-2 p-3 bg-neutral-100/70 rounded-xl border border-neutral-200">
      <div className="flex items-center justify-between">
        <label className="font-semibold text-neutral-800 text-xs flex items-center space-x-1.5">
          <ImageIcon className="w-3.5 h-3.5 text-neutral-500" />
          <span>{label}</span>
        </label>
        {description && (
          <span className="text-[10px] text-neutral-500">{description}</span>
        )}
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center gap-3">
        {/* Preview Thumbnail Box */}
        <div
          className={`${previewClasses} rounded-lg bg-neutral-200 border border-neutral-300 overflow-hidden relative flex items-center justify-center shadow-2xs group`}
        >
          {value && !imageError ? (
            <>
              <img
                src={value}
                alt="Preview"
                className="w-full h-full object-cover"
                onError={() => setImageError(true)}
              />
              <button
                type="button"
                onClick={() => {
                  onChange('');
                  setImageError(false);
                }}
                className="absolute top-1 right-1 p-1 bg-red-600/90 hover:bg-red-700 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-xs"
                title="Hapus gambar"
              >
                <X className="w-3 h-3" />
              </button>
            </>
          ) : (
            <div className="text-center p-2 text-neutral-400">
              <ImageIcon className="w-5 h-5 mx-auto mb-0.5 opacity-60" />
              <span className="text-[9px] block leading-tight">Belum ada gambar</span>
            </div>
          )}

          {isUploading && (
            <div className="absolute inset-0 bg-neutral-900/60 flex flex-col items-center justify-center text-white text-[10px] space-y-1">
              <Loader2 className="w-4 h-4 animate-spin text-white" />
              <span>Menyimpan...</span>
            </div>
          )}
        </div>

        {/* Inputs (File Upload & URL) */}
        <div className="flex-1 space-y-2">
          {/* File Upload Button */}
          <div className="flex items-center space-x-2">
            <label className="cursor-pointer inline-flex items-center space-x-1.5 px-3 py-1.5 bg-white hover:bg-neutral-50 border border-neutral-300 hover:border-red-500 text-neutral-700 hover:text-red-700 rounded-lg text-xs font-semibold shadow-2xs transition-colors">
              {isUploading ? (
                <Loader2 className="w-3.5 h-3.5 animate-spin text-red-600" />
              ) : uploadSuccess ? (
                <Check className="w-3.5 h-3.5 text-emerald-600" />
              ) : (
                <Upload className="w-3.5 h-3.5 text-red-600" />
              )}
              <span>{isUploading ? 'Mengunggah...' : uploadSuccess ? 'Berhasil Diunggah!' : 'Upload dari Komputer / HP'}</span>
              <input
                type="file"
                accept="image/*"
                className="hidden"
                disabled={isUploading}
                onChange={handleFileChange}
              />
            </label>

            {value && (
              <button
                type="button"
                onClick={() => {
                  onChange('');
                  setImageError(false);
                }}
                className="text-xs text-red-600 hover:text-red-800 font-medium px-2 py-1 rounded hover:bg-red-50 transition-colors"
              >
                Hapus
              </button>
            )}

            {value && value.startsWith('/uploads/') && (
              <span className="inline-flex items-center space-x-1 text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                <Check className="w-3 h-3" />
                <span>Tersimpan di Server</span>
              </span>
            )}
          </div>

          {/* URL text input */}
          <div className="relative">
            <input
              type="text"
              value={value || ''}
              onChange={(e) => {
                onChange(e.target.value);
                setImageError(false);
              }}
              placeholder={placeholder}
              className="w-full p-2 text-xs bg-white border border-neutral-300 rounded-lg focus:outline-none focus:border-red-600 text-neutral-800 placeholder:text-neutral-400"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
