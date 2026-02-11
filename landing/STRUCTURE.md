# Struktur folder (yang benar)

Next.js App Router pakai **satu** folder `app` di **root** project. Tidak ada `src/app`.

```
landing/
├── app/                    ← Satu-satunya folder App Router
│   ├── layout.tsx          ← Layout utama
│   ├── page.tsx            ← Halaman beranda (/)
│   ├── globals.css
│   ├── not-found.tsx
│   ├── favicon.ico
│   └── docs/
│       └── page.tsx        ← /docs → redirect ke API docs
├── components/             ← Komponen React (bukan di src/)
├── lib/                    ← i18n, context (bukan di src/)
├── public/
├── .env                    ← NEXT_PUBLIC_API_URL = URL backend (bukan localhost:3000)
├── next.config.mjs
├── tailwind.config.ts
└── tsconfig.json           ← "paths": { "@/*": ["./*"] }
```

- **Jangan** buat folder `src/app` — itu sisa konfigurasi lama dan sudah dihapus.
- Route: `app/page.tsx` = `/`, `app/docs/page.tsx` = `/docs`.
- Link "Docs" di header mengarah ke `NEXT_PUBLIC_API_URL/docs` (Swagger backend). Jika user buka `http://localhost:3000/docs`, Next.js redirect ke URL itu.

## .env

- `NEXT_PUBLIC_API_URL` = URL **backend Merge Video API** (FastAPI), misalnya:
  - Lokal: `http://localhost:8000`
  - Production: `https://merge-video-xxxx.onrender.com`
- **Jangan** set ke `http://localhost:3000` — itu URL landing ini, bukan API.
