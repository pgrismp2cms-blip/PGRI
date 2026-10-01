/**
 * Utility to optimize, compress, and upload images to the server's static /uploads directory.
 * When uploaded, the image becomes a real static asset accessible by all devices.
 */

export async function compressImageToDataUrl(file: File, maxWidth = 1600, quality = 0.85): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(new Error('Gagal membaca berkas gambar.'));
    reader.onload = () => {
      const img = new Image();
      img.onerror = () => reject(new Error('Format gambar tidak didukung.'));
      img.onload = () => {
        let width = img.width;
        let height = img.height;

        if (width > maxWidth) {
          height = Math.round((height * maxWidth) / width);
          width = maxWidth;
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          resolve(reader.result as string);
          return;
        }

        ctx.drawImage(img, 0, 0, width, height);

        // Keep PNG transparency if file is PNG, otherwise compress to JPEG/WebP
        const isPng = file.type === 'image/png';
        const isSvg = file.type === 'image/svg+xml';
        if (isSvg) {
          resolve(reader.result as string);
          return;
        }

        const format = isPng ? 'image/png' : 'image/jpeg';
        const dataUrl = canvas.toDataURL(format, quality);
        resolve(dataUrl);
      };
      img.src = reader.result as string;
    };
    reader.readAsDataURL(file);
  });
}

export async function uploadImageToServer(file: File): Promise<string> {
  // Compress first for fast network transit
  const compressedDataUrl = await compressImageToDataUrl(file, 1600, 0.88);

  try {
    const response = await fetch('/api/upload', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        image: compressedDataUrl,
        filename: file.name,
      }),
    });

    if (response.ok) {
      const data = await response.json();
      if (data.url) {
        return data.url; // e.g. /uploads/pgri_asset_123456789.jpg
      }
    }
  } catch (err) {
    console.warn('[Upload fallback to local DataURL]', err);
  }

  // Graceful fallback to compressed Data URL if offline or direct
  return compressedDataUrl;
}
