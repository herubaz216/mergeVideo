"use client";

import Link from "next/link";
import { useLang } from "@/lib/LangContext";
import { useAuth } from "@/lib/AuthContext";
import { getCopy } from "@/lib/i18n";

const docsButtonClass =
  "inline-flex no-underline rounded-xl bg-blue-600 px-6 py-3.5 text-base font-semibold text-white shadow-lg shadow-blue-600/25 transition hover:bg-blue-700 hover:shadow-blue-600/30 dark:bg-blue-500 dark:hover:bg-blue-600";

export function CTA() {
  const { lang } = useLang();
  const { user, openSignIn } = useAuth();
  const t = getCopy(lang).cta;
  return (
    <section className="w-full min-w-0 border-t border-slate-200 bg-white px-4 py-20 dark:border-slate-800 dark:bg-slate-900/50 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-2xl min-w-0 text-center">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white sm:text-3xl break-words">
          {t.title}
        </h2>
        <p className="mt-4 break-words text-slate-600 dark:text-slate-300 leading-relaxed">
          {t.subtitle}
        </p>
        <div className="mt-10">
          {user ? (
            <Link href="/docs-api" className={docsButtonClass}>
              {t.button}
            </Link>
          ) : (
            <button type="button" onClick={openSignIn} className={docsButtonClass}>
              {t.button}
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
