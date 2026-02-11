"use client";

import Link from "next/link";
import { useAuth } from "@/lib/AuthContext";
import { LanguageSwitch } from "@/components/LanguageSwitch";
import { UserDropdown } from "@/components/UserDropdown";
import { AccountModal } from "@/components/AccountModal";
import { SignInModal } from "@/components/SignInModal";
import { SignUpModal } from "@/components/SignUpModal";

export function Header() {
  const { user, signInOpen, signUpOpen, openSignIn, openSignUp, closeAuth } = useAuth();

  return (
    <>
      <header className="sticky top-0 z-20 border-b border-slate-200/80 bg-white/95 shadow-sm backdrop-blur-md dark:border-slate-800 dark:bg-slate-900/95">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
          <Link href="/" className="text-lg font-bold tracking-tight text-slate-900 dark:text-white hover:opacity-90 transition-opacity">
            Merge Video API
          </Link>
          <div className="flex items-center gap-3 sm:gap-4">
            <LanguageSwitch />
            {user && (
              <Link
                href="/docs-api"
                className="rounded-lg px-3 py-1.5 text-sm font-medium text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
              >
                Docs
              </Link>
            )}
            {user ? (
              <UserDropdown />
            ) : (
              <>
                <button
                  type="button"
                  onClick={openSignIn}
                  className="rounded-lg border border-slate-200 px-3 py-1.5 text-sm font-medium text-slate-700 hover:bg-slate-50 dark:border-slate-600 dark:text-slate-300 dark:hover:bg-slate-800"
                >
                  Sign In
                </button>
                <button
                  type="button"
                  onClick={openSignUp}
                  className="rounded-lg bg-slate-900 px-3 py-1.5 text-sm font-medium text-white hover:bg-slate-800 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-slate-200"
                >
                  Sign Up
                </button>
              </>
            )}
          </div>
        </div>
      </header>

      <AccountModal />
      <SignInModal
        isOpen={signInOpen}
        onClose={closeAuth}
        onSwitchToSignUp={openSignUp}
      />
      <SignUpModal
        isOpen={signUpOpen}
        onClose={closeAuth}
        onSwitchToSignIn={openSignIn}
      />
    </>
  );
}
