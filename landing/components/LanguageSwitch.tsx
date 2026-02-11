"use client";

import { useLang } from "@/lib/LangContext";
import type { Lang } from "@/lib/i18n";

export function LanguageSwitch() {
  const { lang, setLang } = useLang();
  return (
    <div className="flex gap-0.5 rounded-xl border border-slate-200 bg-slate-100 p-1 dark:border-slate-700 dark:bg-slate-800">
      <button
        type="button"
        onClick={() => setLang("id")}
        className={`rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${
          lang === "id"
            ? "bg-white text-slate-900 shadow-sm dark:bg-slate-700 dark:text-white"
            : "text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
        }`}
      >
        ID
      </button>
      <button
        type="button"
        onClick={() => setLang("en")}
        className={`rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${
          lang === "en"
            ? "bg-white text-slate-900 shadow-sm dark:bg-slate-700 dark:text-white"
            : "text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
        }`}
      >
        EN
      </button>
    </div>
  );
}
