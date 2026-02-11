const BASE_URL = process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "") || "https://your-api.onrender.com";

export const metadata = {
  title: "Dokumentasi API — Merge Video API",
  description: "Endpoint dan contoh request/response untuk Merge Video API.",
};

export default function DocsApiPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
        Dokumentasi API
      </h1>
      <p className="mt-2 text-slate-600 dark:text-slate-400">
        Merge Video API — gabungkan 3 video dalam satu panggilan API.
      </p>

      <section className="mt-10">
        <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
          Base URL
        </h2>
        <p className="mt-1 font-mono text-sm text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 px-3 py-2 rounded-lg">
          {BASE_URL}
        </p>
      </section>

      {/* POST /merge */}
      <section className="mt-12">
        <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
          POST /merge
        </h2>
        <p className="mt-2 text-slate-600 dark:text-slate-400">
          Mengirim 3 URL video dan nama file hasil. API akan mengunduh ketiga video, menggabungkan dengan ffmpeg, menyimpan ke folder video, lalu mengembalikan URL untuk mengunduh hasil.
        </p>

        <h3 className="mt-4 text-sm font-medium text-slate-700 dark:text-slate-300">
          Request body (JSON)
        </h3>
        <pre className="mt-2 overflow-x-auto rounded-xl border border-slate-200 bg-slate-900 p-4 text-sm text-slate-100 dark:border-slate-700">
{`{
  "video_url_1": "https://example.com/part1.mp4",
  "video_url_2": "https://example.com/part2.mp4",
  "video_url_3": "https://example.com/part3.mp4",
  "nama_animasi": "MyMergedVideo"
}`}
        </pre>

        <table className="mt-4 w-full border-collapse text-sm">
          <thead>
            <tr className="border-b border-slate-200 dark:border-slate-700">
              <th className="py-2 text-left font-medium text-slate-900 dark:text-white">Field</th>
              <th className="py-2 text-left font-medium text-slate-900 dark:text-white">Tipe</th>
              <th className="py-2 text-left font-medium text-slate-900 dark:text-white">Keterangan</th>
            </tr>
          </thead>
          <tbody className="text-slate-600 dark:text-slate-400">
            <tr className="border-b border-slate-100 dark:border-slate-800">
              <td className="py-2 font-mono">video_url_1</td>
              <td className="py-2">string (URL)</td>
              <td className="py-2">URL video pertama</td>
            </tr>
            <tr className="border-b border-slate-100 dark:border-slate-800">
              <td className="py-2 font-mono">video_url_2</td>
              <td className="py-2">string (URL)</td>
              <td className="py-2">URL video kedua</td>
            </tr>
            <tr className="border-b border-slate-100 dark:border-slate-800">
              <td className="py-2 font-mono">video_url_3</td>
              <td className="py-2">string (URL)</td>
              <td className="py-2">URL video ketiga</td>
            </tr>
            <tr className="border-b border-slate-100 dark:border-slate-800">
              <td className="py-2 font-mono">nama_animasi</td>
              <td className="py-2">string</td>
              <td className="py-2">Nama file hasil (tanpa .mp4)</td>
            </tr>
          </tbody>
        </table>

        <h3 className="mt-6 text-sm font-medium text-slate-700 dark:text-slate-300">
          Response sukses (200)
        </h3>
        <pre className="mt-2 overflow-x-auto rounded-xl border border-slate-200 bg-slate-900 p-4 text-sm text-slate-100 dark:border-slate-700">
{`{
  "success": true,
  "message": "Video berhasil di-merge dan disimpan ke folder video.",
  "file_name": "MyMergedVideo.mp4",
  "file_url": "${BASE_URL}/video/MyMergedVideo.mp4"
}`}
        </pre>
      </section>

      {/* GET /video/{filename} */}
      <section className="mt-12">
        <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
          GET /video/{"{filename}"}
        </h2>
        <p className="mt-2 text-slate-600 dark:text-slate-400">
          Mengunduh file hasil merge. <code className="rounded bg-slate-200 px-1 dark:bg-slate-700">file_url</code> dari response POST /merge mengarah ke endpoint ini.
        </p>
        <p className="mt-2 text-sm text-slate-500 dark:text-slate-500">
          Contoh: <span className="font-mono">{BASE_URL}/video/MyMergedVideo.mp4</span>
        </p>
      </section>

      {/* GET /health */}
      <section className="mt-12">
        <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
          GET /health
        </h2>
        <p className="mt-2 text-slate-600 dark:text-slate-400">
          Health check. Response: <code className="rounded bg-slate-200 px-1 dark:bg-slate-700">{"{ \"status\": \"ok\" }"}</code>
        </p>
      </section>

      {/* Integrasi n8n */}
      <section className="mt-12 rounded-2xl border border-slate-200 bg-slate-50 p-6 dark:border-slate-700 dark:bg-slate-800/50">
        <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
          Integrasi n8n
        </h2>
        <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
          Gunakan node <strong>HTTP Request</strong>: method POST, URL <code className="rounded bg-slate-200 px-1 dark:bg-slate-700">{BASE_URL}/merge</code>, body type JSON. Isi body dengan <code className="rounded bg-slate-200 px-1 dark:bg-slate-700">video_url_1</code>, <code className="rounded bg-slate-200 px-1 dark:bg-slate-700">video_url_2</code>, <code className="rounded bg-slate-200 px-1 dark:bg-slate-700">video_url_3</code>, <code className="rounded bg-slate-200 px-1 dark:bg-slate-700">nama_animasi</code>. Di langkah berikutnya gunakan <code className="rounded bg-slate-200 px-1 dark:bg-slate-700">file_url</code> dari response.
        </p>
      </section>

      <a
        href="/"
        className="mt-10 inline-block rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 no-underline hover:bg-slate-50 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
      >
        ← Kembali ke beranda
      </a>
    </div>
  );
}
