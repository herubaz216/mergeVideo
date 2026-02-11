"use client";

import { useLang } from "@/lib/LangContext";
import { getCopy } from "@/lib/i18n";

export function Features() {
  const { lang } = useLang();
  const t = getCopy(lang).features;
  return (
    <section className="w-full min-w-0 px-4 py-16 sm:px-6 lg:px-8 bg-slate-50/80 dark:bg-slate-900/30">
      <div className="mx-auto w-full max-w-6xl min-w-0">
        <h2 className="text-center text-2xl font-bold text-slate-900 dark:text-white sm:text-3xl">
          {t.title}
        </h2>
        <div className="mt-12 grid w-full min-w-0 grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {t.items.map((item, i) => (
            <div
              key={i}
              className="min-w-0 rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm hover:shadow-md transition-shadow dark:border-slate-700 dark:bg-slate-800/80"
            >
              <div className="mb-4 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-100 font-bold text-blue-600 text-sm dark:bg-blue-900/40 dark:text-blue-400">
                {i + 1}
              </div>
              <h3 className="font-semibold text-slate-900 dark:text-white break-words">
                {item.title}
              </h3>
              <p className="mt-2 break-words text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
