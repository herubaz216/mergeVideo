"use client";

import { useLang } from "@/lib/LangContext";
import { getCopy } from "@/lib/i18n";

export function HowItWorks() {
  const { lang } = useLang();
  const t = getCopy(lang).howItWorks;
  return (
    <section className="w-full min-w-0 border-t border-slate-200 bg-white px-4 py-16 dark:border-slate-800 dark:bg-slate-900/50 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-3xl min-w-0">
        <h2 className="text-center text-2xl font-bold text-slate-900 dark:text-white sm:text-3xl">
          {t.title}
        </h2>
        <div className="mt-12 space-y-4">
          {t.steps.map((step, i) => (
            <div
              key={i}
              className="flex min-w-0 gap-5 rounded-2xl border border-slate-200 bg-slate-50/80 p-6 dark:border-slate-700 dark:bg-slate-800/60"
            >
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-600 text-lg font-bold text-white dark:bg-blue-500">
                {i + 1}
              </span>
              <div className="min-w-0 flex-1 overflow-hidden">
                <h3 className="font-semibold text-slate-900 dark:text-white break-words">
                  {step.title}
                </h3>
                <p className="mt-1 break-words text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                  {step.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
