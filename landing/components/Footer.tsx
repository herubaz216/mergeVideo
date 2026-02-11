"use client";

import Link from "next/link";
import { useLang } from "@/lib/LangContext";
import { useAuth } from "@/lib/AuthContext";
import { getCopy } from "@/lib/i18n";

const docsLinkClass =
  "text-sm font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 transition-colors";

export function Footer() {
  const { lang } = useLang();
  const { user, openSignIn } = useAuth();
  const t = getCopy(lang).footer;
  return (
    <footer className="w-full min-w-0 border-t border-slate-200 bg-slate-100 px-4 py-8 dark:border-slate-800 dark:bg-slate-900/80 sm:px-6 lg:px-8">
      <div className="mx-auto flex w-full max-w-6xl min-w-0 flex-col items-center justify-between gap-4 sm:flex-row">
        <p className="min-w-0 break-words text-sm text-slate-600 dark:text-slate-400">
          {t.copy}
        </p>
        {user ? (
          <Link href="/docs-api" className={docsLinkClass}>
            {t.docs}
          </Link>
        ) : (
          <button type="button" onClick={openSignIn} className={`${docsLinkClass} bg-transparent border-0 cursor-pointer p-0`}>
            {t.docs}
          </button>
        )}
      </div>
    </footer>
  );
}
