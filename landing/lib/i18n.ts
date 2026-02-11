export type Lang = "id" | "en";

export const copy = {
  id: {
    nav: {
      docs: "Dokumentasi",
      product: "Merge Video API",
    },
    hero: {
      headline: "Gabungkan 3 Video dalam Satu Panggilan API",
      subhead:
        "Layanan merge video untuk otomatisasi Anda. Kirim 3 URL, dapatkan satu file siap unduh. Terintegrasi dengan n8n dan workflow Anda.",
      cta: "Lihat dokumentasi API",
    },
    features: {
      title: "Mengapa Merge Video API?",
      items: [
        {
          title: "Satu panggilan API",
          desc: "Kirim 3 URL video + nama file. API mengunduh, menggabungkan, dan mengembalikan link hasil.",
        },
        {
          title: "Tanpa server sendiri",
          desc: "Tidak perlu mengelola ffmpeg atau server. Host di Render, panggil dari n8n atau kode Anda.",
        },
        {
          title: "Hasil siap unduh",
          desc: "Response berisi file_url untuk mengunduh atau menyiarkan video hasil merge.",
        },
        {
          title: "Integrasi n8n & otomatisasi",
          desc: "Pasang di workflow n8n: HTTP Request node ke /merge, dapatkan file_url di langkah berikutnya.",
        },
      ],
    },
    howItWorks: {
      title: "Cara kerja",
      steps: [
        { title: "Kirim request", desc: "POST /merge dengan 3 URL video dan nama_animasi (nama file hasil)." },
        { title: "API memproses", desc: "Server mengunduh 3 video, menggabungkan dengan ffmpeg, menyimpan ke folder video." },
        { title: "Dapatkan link", desc: "Response berisi file_url untuk mengunduh video hasil merge." },
      ],
    },
    apiPreview: {
      title: "Contoh request",
      subtitle: "POST /merge",
      responseTitle: "Contoh response",
      linkDocs: "Buka dokumentasi lengkap (Swagger)",
    },
    cta: {
      title: "Siap mengotomatiskan merge video?",
      subtitle: "Lihat dokumentasi API dan endpoint /merge.",
      button: "Buka dokumentasi API",
    },
    footer: {
      copy: "Merge Video API — Layanan gabung video via API.",
      docs: "Dokumentasi",
    },
  },
  en: {
    nav: {
      docs: "Documentation",
      product: "Merge Video API",
    },
    hero: {
      headline: "Merge 3 Videos in One API Call",
      subhead:
        "Video merge service for your automation. Send 3 URLs, get one file ready to download. Integrates with n8n and your workflows.",
      cta: "View API documentation",
    },
    features: {
      title: "Why Merge Video API?",
      items: [
        {
          title: "Single API call",
          desc: "Send 3 video URLs + output filename. The API downloads, merges, and returns the result link.",
        },
        {
          title: "No server to manage",
          desc: "No need to run ffmpeg or your own server. Host on Render, call from n8n or your code.",
        },
        {
          title: "Result ready to download",
          desc: "Response includes file_url to download or stream the merged video.",
        },
        {
          title: "n8n & automation integration",
          desc: "Drop into your n8n workflow: HTTP Request node to /merge, use file_url in the next step.",
        },
      ],
    },
    howItWorks: {
      title: "How it works",
      steps: [
        { title: "Send request", desc: "POST /merge with 3 video URLs and nama_animasi (output filename)." },
        { title: "API processes", desc: "Server downloads the 3 videos, merges with ffmpeg, saves to the video folder." },
        { title: "Get the link", desc: "Response includes file_url to download the merged video." },
      ],
    },
    apiPreview: {
      title: "Example request",
      subtitle: "POST /merge",
      responseTitle: "Example response",
      linkDocs: "Open full documentation (Swagger)",
    },
    cta: {
      title: "Ready to automate video merging?",
      subtitle: "Check the API docs and the /merge endpoint.",
      button: "Open API documentation",
    },
    footer: {
      copy: "Merge Video API — Video merge service via API.",
      docs: "Documentation",
    },
  },
} as const;

export function getCopy(lang: Lang) {
  return copy[lang];
}
