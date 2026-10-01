import express from 'express';
import { createServer as createViteServer } from 'vite';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const isProd = process.env.NODE_ENV === 'production';
const PORT = process.env.PORT || 3000;

// Setup directories for uploads and shared content data
const UPLOADS_DIR = path.join(__dirname, 'public', 'uploads');
if (!fs.existsSync(UPLOADS_DIR)) {
  fs.mkdirSync(UPLOADS_DIR, { recursive: true });
}

const DATA_DIR = path.join(__dirname, 'data');
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}
const CONTENT_FILE = path.join(DATA_DIR, 'content.json');

async function startServer() {
  const app = express();

  // Allow high-res image base64 payloads
  app.use(express.json({ limit: '50mb' }));
  app.use(express.urlencoded({ limit: '50mb', extended: true }));

  // Serve static uploaded images with caching for all devices
  app.use(
    '/uploads',
    express.static(UPLOADS_DIR, {
      maxAge: '7d',
      setHeaders: (res) => {
        res.setHeader('Access-Control-Allow-Origin', '*');
      },
    })
  );

  // Endpoint: Upload image statically so all devices get the real updated image
  app.post('/api/upload', (req, res) => {
    try {
      const { image, filename: originalName } = req.body;
      if (!image) {
        return res.status(400).json({ error: 'Data gambar wajib diisi' });
      }

      // Parse Data URL format
      const matches = image.match(/^data:image\/([a-zA-Z0-9+]+);base64,(.+)$/);
      let buffer: Buffer;
      let extension = 'jpg';

      if (matches) {
        const mimeType = matches[1].toLowerCase();
        extension =
          mimeType === 'png'
            ? 'png'
            : mimeType === 'svg+xml'
            ? 'svg'
            : mimeType === 'webp'
            ? 'webp'
            : mimeType === 'gif'
            ? 'gif'
            : 'jpg';
        buffer = Buffer.from(matches[2], 'base64');
      } else {
        buffer = Buffer.from(image, 'base64');
      }

      const timestamp = Date.now();
      const safePrefix = originalName
        ? path.basename(originalName, path.extname(originalName)).replace(/[^a-zA-Z0-9_-]/g, '_').slice(0, 30)
        : 'pgri_asset';
      const safeFilename = `${safePrefix}_${timestamp}.${extension}`;
      const filePath = path.join(UPLOADS_DIR, safeFilename);

      fs.writeFileSync(filePath, buffer);

      const staticUrl = `/uploads/${safeFilename}`;
      console.log(`[Upload] Berkas gambar disimpan di: ${staticUrl} (${(buffer.length / 1024).toFixed(1)} KB)`);

      return res.json({ success: true, url: staticUrl });
    } catch (err: any) {
      console.error('[Upload error]', err);
      return res.status(500).json({ error: err.message || 'Gagal menyimpan gambar di server' });
    }
  });

  // Endpoint: Get shared content for all devices
  app.get('/api/content', (_req, res) => {
    try {
      if (fs.existsSync(CONTENT_FILE)) {
        const raw = fs.readFileSync(CONTENT_FILE, 'utf-8');
        return res.json(JSON.parse(raw));
      }
      return res.json(null);
    } catch (err: any) {
      console.error('[Content Read Error]', err);
      return res.status(500).json({ error: 'Gagal membaca konten bersama' });
    }
  });

  // Endpoint: Update shared content (persisted to server disk for all devices)
  app.post('/api/content', (req, res) => {
    try {
      let existing: any = {};
      if (fs.existsSync(CONTENT_FILE)) {
        try {
          existing = JSON.parse(fs.readFileSync(CONTENT_FILE, 'utf-8'));
        } catch {}
      }
      const updated = { ...existing, ...req.body };
      fs.writeFileSync(CONTENT_FILE, JSON.stringify(updated, null, 2), 'utf-8');
      console.log('[Content] Data konten bersama diperbarui untuk semua perangkat');
      return res.json({ success: true, timestamp: new Date().toISOString() });
    } catch (err: any) {
      console.error('[Content Save Error]', err);
      return res.status(500).json({ error: 'Gagal memperbarui konten di server' });
    }
  });

  // Endpoint: Reset shared content to initial defaults
  app.post('/api/content/reset', (_req, res) => {
    try {
      if (fs.existsSync(CONTENT_FILE)) {
        fs.unlinkSync(CONTENT_FILE);
      }
      return res.json({ success: true, message: 'Konten dikembalikan ke standar awal' });
    } catch (err: any) {
      return res.status(500).json({ error: err.message });
    }
  });

  // Vite middleware in dev, Static files in production
  if (!isProd) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(Number(PORT), '0.0.0.0', () => {
    console.log(`Server PGRI berjalan pada port ${PORT} (http://0.0.0.0:${PORT})`);
  });
}

startServer().catch((err) => {
  console.error('Server gagal dijalankan:', err);
  process.exit(1);
});
