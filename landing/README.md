# Merge Video API — Landing Page

Landing page SaaS untuk layanan Merge Video API. Next.js (React), bilingual ID/EN.

## Menjalankan lokal

```bash
cd landing
npm install
cp .env.example .env
# Edit .env: set NEXT_PUBLIC_API_URL ke URL API Anda (mis. http://localhost:8000)
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000).

### Jika design tidak muncul atau semua halaman 404

1. **Jalankan dari folder `landing`**  
   Pastikan Anda di `.../MERGE_VIDEO/landing` saat menjalankan `npm run dev` (bukan dari `MERGE_VIDEO` atau root repo).

2. **Hapus cache lalu jalankan lagi**  
   ```bash
   cd landing
   rm -rf .next
   npm run dev
   ```
   (Windows PowerShell: `Remove-Item -Recurse -Force .next`)

3. **Route yang ada**  
   - `/` → beranda  
   - `/docs` → redirect ke dokumentasi API (atau pesan jika `NEXT_PUBLIC_API_URL` belum di-set)

## Build

```bash
npm run build
npm run start
```

## Deploy

### Render (dua service: API + Landing)

Repo ini punya **dua service** di Render:

1. **merge-video** — API (FastAPI, Docker). Sudah deploy? Cukup commit + push lalu redeploy; yang jalan tetap API.
2. **merge-video-landing** — Landing (Next.js). Perlu **satu service tambahan** agar landing jalan di production.

**Langkah:**

1. **Commit + push** (termasuk folder `landing/`). Redeploy service **merge-video** seperti biasa agar API up-to-date.

2. **Tambah service landing** (salah satu):
   - **Pakai Blueprint:** Di Render, connect repo; file `render.yaml` di root sudah mendefinisikan dua service. Pastikan env **NEXT_PUBLIC_API_URL** untuk service `merge-video-landing` di-set ke URL API (mis. `https://merge-video-xxxx.onrender.com`, tanpa trailing slash).
   - **Manual:** New → **Web Service** → connect repo yang sama → **Root Directory:** `landing` → **Build Command:** `npm install && npm run build` → **Start Command:** `npm start` → tambah env **NEXT_PUBLIC_API_URL** = URL API Anda → Deploy.

3. **Set NEXT_PUBLIC_API_URL** (wajib untuk landing):
   - Nilai = URL service API Merge Video, mis. `https://merge-video-xxxx.onrender.com`.
   - Tanpa slash di akhir. Dipakai untuk link dokumentasi dan base URL di halaman docs-api.

4. Hasil:
   - **API:** `https://merge-video-xxxx.onrender.com`
   - **Landing:** `https://merge-video-landing-xxxx.onrender.com` (atau nama yang Anda pilih)

### Vercel

1. Connect repo ke Vercel.
2. Set **Root Directory** ke `landing`.
3. Tambah env **NEXT_PUBLIC_API_URL** = URL API (mis. `https://merge-video-xxxx.onrender.com`).
4. Deploy.

### Render Static Site (opsional)

Jika ingin landing sebagai Static Site (bukan Web Service): di `next.config.mjs` aktifkan `output: 'export'`, lalu di Render pilih **Static Site**, **Root Directory:** `landing`, **Build Command:** `npm install && npm run build`, **Publish Directory:** `out`. Set **NEXT_PUBLIC_API_URL**.
