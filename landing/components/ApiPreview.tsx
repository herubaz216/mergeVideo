"use client";

import { useLang } from "@/lib/LangContext";
import { getCopy } from "@/lib/i18n";

const DOCS_URL = "/docs-api";

const exampleRequest = `POST /merge
Content-Type: application/json

{
  "video_url_1": "https://example.com/part1.mp4",
  "video_url_2": "https://example.com/part2.mp4",
  "video_url_3": "https://example.com/part3.mp4",
  "nama_animasi": "MyMergedVideo"
}`;

const exampleResponse = `{
  "success": true,
  "message": "Video berhasil di-merge dan disimpan ke folder video.",
  "file_name": "MyMergedVideo.mp4",
  "file_url": "https://your-api.onrender.com/video/MyMergedVideo.mp4"
}`;

export function ApiPreview() {
  const { lang } = useLang();
  const t = getCopy(lang).apiPreview;
  return (
    <section className="w-full min-w-0 px-4 py-16 sm:px-6 lg:px-8 bg-slate-50/80 dark:bg-slate-900/30">
      <div className="mx-auto w-full max-w-4xl min-w-0">
        <h2 className="text-center text-2xl font-bold text-slate-900 dark:text-white sm:text-3xl">
          {t.title}
        </h2>
        <p className="mt-2 text-center text-sm text-slate-600 dark:text-slate-400">
          {t.subtitle}
        </p>
        <div className="mt-10 grid w-full min-w-0 grid-cols-1 gap-6 lg:grid-cols-2">
          <div className="min-w-0 rounded-2xl border border-slate-200 bg-slate-900 p-5 dark:border-slate-700">
            <div className="pre-wrap max-w-full">
              <pre className="whitespace-pre-wrap break-words font-mono text-xs leading-relaxed text-slate-100">
                {exampleRequest}
              </pre>
            </div>
          </div>
          <div className="min-w-0 rounded-2xl border border-slate-200 bg-slate-900 p-5 dark:border-slate-700">
            <p className="mb-2 text-xs font-medium text-slate-400">{t.responseTitle}</p>
            <div className="pre-wrap max-w-full">
              <pre className="whitespace-pre-wrap break-words font-mono text-xs leading-relaxed text-slate-100">
                {exampleResponse}
              </pre>
            </div>
          </div>
        </div>
        <div className="mt-8 text-center">
          <a
            href={DOCS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex rounded-xl bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 transition-colors dark:bg-blue-500 dark:hover:bg-blue-600"
          >
            {t.linkDocs}
          </a>
        </div>
      </div>
    </section>
  );
}
