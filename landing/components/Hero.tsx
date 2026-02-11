"use client";

import Link from "next/link";
import { useLang } from "@/lib/LangContext";
import { useAuth } from "@/lib/AuthContext";
import { getCopy } from "@/lib/i18n";

const docsButtonClass =
  "inline-flex items-center justify-center rounded-xl bg-blue-600 px-6 py-3.5 text-base font-semibold text-white no-underline shadow-lg shadow-blue-600/25 transition hover:bg-blue-700 hover:shadow-blue-600/30 dark:bg-blue-500 dark:hover:bg-blue-600";

export function Hero() {
  const { lang } = useLang();
  const { user, openSignIn } = useAuth();
  const t = getCopy(lang).hero;
  return (
    <section className="relative w-full min-w-0 border-b border-slate-200 bg-white px-4 py-16 sm:py-24 sm:px-6 lg:px-8 dark:border-slate-800 dark:bg-slate-900/50">
      <div className="mx-auto w-full max-w-4xl min-w-0 text-center">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl lg:text-5xl lg:leading-tight">
          {t.headline}
        </h1>
        <p className="mt-5 text-lg leading-relaxed text-slate-600 dark:text-slate-300 sm:text-xl max-w-2xl mx-auto">
          {t.subhead}
        </p>
        <div className="mt-10">
          {user ? (
            <Link href="/docs-api" className={docsButtonClass}>
              {t.cta}
            </Link>
          ) : (
            <button type="button" onClick={openSignIn} className={docsButtonClass}>
              {t.cta}
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
