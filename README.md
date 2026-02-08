# Merge Video Service

Layanan Python untuk **menggabungkan 3 video** dari URL (dari n8n cloud), lalu **menyimpan hasil ke folder video** dengan nama sesuai parameter.

## Fitur

- **POST /merge**: Terima 3 URL video + nama animasi → download → merge (ffmpeg) → **hapus dulu isi folder video** → simpan hasil ke folder **video** (supaya tidak menumpuk).
- Nama file hasil = parameter `nama_animasi` + `.mp4`.
- Siap di-host di **Render** (Docker).

## Persyaratan

- **ffmpeg** (sudah ada di Docker image untuk production).

## Deploy di Render

1. Push repo ke GitHub/GitLab.
2. Di Render: **New** → **Web Service**, connect repo.
3. Pilih **Docker** sebagai environment; Dockerfile path: `./Dockerfile`.
4. Opsional: env **VIDEO_OUTPUT_DIR** (default: `video`) — path folder hasil merge. Di Render bisa pakai path absolut yang persist jika perlu.
5. Deploy.

## Menjalankan Lokal (Windows)

1. **Pasang ffmpeg** (jika belum):
   ```powershell
   choco install ffmpeg
   ```
   Atau download dari https://ffmpeg.org/download.html dan tambahkan ke PATH.

2. **Buat venv dan install dependency:**
   ```powershell
   cd D:\BODO\KANTOR\PROJECT\MERGE_VIDEO
   python -m venv venv
   .\venv\Scripts\Activate.ps1
   pip install -r requirements.txt
   ```

3. **Opsional — .env:** copy `.env.example` jadi `.env` jika ingin ubah **VIDEO_OUTPUT_DIR** (default: folder `video` di dalam project).

4. **Jalankan server:**
   ```powershell
   python run.py
   ```

   API: **http://localhost:8000** — Docs: **http://localhost:8000/docs**

   Hasil merge tersimpan di folder **video** (nama file = `nama_animasi.mp4`).

## Pemanggilan dari n8n

**HTTP Request** node:

- Method: **POST**
- URL: `https://<your-render-url>/merge` (atau `http://localhost:8000/merge` untuk lokal)
- Body (JSON):

```json
{
  "video_url_1": "https://...",
  "video_url_2": "https://...",
  "video_url_3": "https://...",
  "nama_animasi": "NamaAnimasiSaya"
}
```

**Catatan**: Proses merge bisa memakan waktu. Di n8n, set **Timeout** HTTP Request node cukup besar (mis. 300–600 detik).

Response sukses:

```json
{
  "success": true,
  "message": "Video berhasil di-merge dan disimpan ke folder video.",
  "file_name": "NamaAnimasiSaya.mp4",
  "file_url": "https://your-server.com/video/NamaAnimasiSaya.mp4"
}
```

**file_url** bisa dipakai untuk download atau stream video hasil merge.

## Endpoints

| Method | Path           | Deskripsi                                                       |
|--------|----------------|------------------------------------------------------------------|
| GET    | /              | Info service                                                    |
| GET    | /health        | Health check                                                    |
| POST   | /merge         | Merge 3 video, bersihkan folder video, lalu simpan hasil ke sana |
| GET    | /video/{filename} | Download file hasil merge (nama file dari response merge)   |
