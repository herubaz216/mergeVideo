"use client";

import { useState } from "react";
import { useAuth } from "@/lib/AuthContext";

type Tab = "profile" | "security";

export function AccountModal() {
  const { user, closeAccountModal, accountModalOpen } = useAuth();
  const [tab, setTab] = useState<Tab>("profile");

  if (!accountModalOpen) return null;

  const initial = user?.name.charAt(0).toUpperCase() ?? "U";
  const username = user?.email.split("@")[0] ?? "user";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={closeAccountModal} aria-hidden />
      <div className="relative flex w-full max-w-2xl overflow-hidden rounded-2xl bg-white shadow-xl dark:bg-slate-900">
        <button
          type="button"
          onClick={closeAccountModal}
          className="absolute right-4 top-4 z-10 rounded-full p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-600 dark:hover:bg-slate-800 dark:hover:text-slate-300"
          aria-label="Close"
        >
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Left sidebar */}
        <div className="w-56 shrink-0 border-r border-slate-200 bg-slate-50/80 p-6 dark:border-slate-700 dark:bg-slate-800/50">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">Account</h2>
          <p className="mt-0.5 text-sm text-slate-500 dark:text-slate-400">Manage your account info.</p>
          <nav className="mt-6 space-y-0.5">
            <button
              type="button"
              onClick={() => setTab("profile")}
              className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm font-medium transition-colors ${
                tab === "profile"
                  ? "bg-white text-slate-900 shadow-sm dark:bg-slate-700 dark:text-white"
                  : "text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-700/50"
              }`}
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              Profile
            </button>
            <button
              type="button"
              onClick={() => setTab("security")}
              className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm font-medium transition-colors ${
                tab === "security"
                  ? "bg-white text-slate-900 shadow-sm dark:bg-slate-700 dark:text-white"
                  : "text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-700/50"
              }`}
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              Security
            </button>
          </nav>
        </div>

        {/* Right content */}
        <div className="min-w-0 flex-1 overflow-y-auto p-8">
          {tab === "profile" && (
            <>
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Profile details</h3>
              <div className="mt-6 space-y-6">
                <div className="flex items-center gap-4">
                  <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-teal-500 text-2xl font-bold text-white">
                    {initial}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-900 dark:text-white">Profile</p>
                    <button type="button" className="text-sm text-blue-600 hover:underline dark:text-blue-400">
                      Update profile
                    </button>
                  </div>
                </div>
                <div className="flex items-center justify-between border-t border-slate-200 pt-6 dark:border-slate-700">
                  <div>
                    <p className="text-sm font-medium text-slate-900 dark:text-white">Username</p>
                    <p className="text-sm text-slate-600 dark:text-slate-400">{username}</p>
                  </div>
                  <button type="button" className="text-sm text-blue-600 hover:underline dark:text-blue-400">
                    Update username
                  </button>
                </div>
                <div className="border-t border-slate-200 pt-6 dark:border-slate-700">
                  <p className="text-sm font-medium text-slate-900 dark:text-white">Email addresses</p>
                  <div className="mt-2 flex items-center justify-between rounded-lg border border-slate-200 bg-slate-50/50 px-4 py-3 dark:border-slate-700 dark:bg-slate-800/50">
                    <span className="text-sm text-slate-700 dark:text-slate-300">{user?.email}</span>
                    <span className="rounded bg-slate-200 px-2 py-0.5 text-xs font-medium text-slate-600 dark:bg-slate-600 dark:text-slate-300">
                      Primary
                    </span>
                  </div>
                  <button type="button" className="mt-2 text-sm text-blue-600 hover:underline dark:text-blue-400">
                    + Add email address
                  </button>
                </div>
                <div className="border-t border-slate-200 pt-6 dark:border-slate-700">
                  <p className="text-sm font-medium text-slate-900 dark:text-white">Connected accounts</p>
                  <div className="mt-2 flex items-center justify-between rounded-lg border border-slate-200 bg-slate-50/50 px-4 py-3 dark:border-slate-700 dark:bg-slate-800/50">
                    <div className="flex items-center gap-3">
                      <svg className="h-5 w-5" viewBox="0 0 24 24">
                        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                      </svg>
                      <span className="text-sm text-slate-700 dark:text-slate-300">Google</span>
                    </div>
                    <span className="text-sm text-slate-500 dark:text-slate-400">{user?.email}</span>
                  </div>
                </div>
              </div>
            </>
          )}

          {tab === "security" && (
            <>
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Security</h3>
              <div className="mt-6 space-y-6">
                <div>
                  <p className="text-sm font-medium text-slate-900 dark:text-white">Password</p>
                  <button type="button" className="mt-1 text-sm text-blue-600 hover:underline dark:text-blue-400">
                    Set password
                  </button>
                </div>
                <div className="border-t border-slate-200 pt-6 dark:border-slate-700">
                  <p className="text-sm font-medium text-slate-900 dark:text-white">Active devices</p>
                  <div className="mt-2 flex items-center gap-4 rounded-lg border border-slate-200 bg-slate-50/50 px-4 py-3 dark:border-slate-700 dark:bg-slate-800/50">
                    <svg className="h-8 w-8 text-slate-400" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M3 5v14h18V5H3zm16 12H5V7h14v10z" />
                    </svg>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium text-slate-900 dark:text-white">Windows — This device</p>
                      <p className="text-xs text-slate-500 dark:text-slate-400">Chrome · 103.224.100.154 (Jakarta, ID)</p>
                      <p className="text-xs text-slate-400 dark:text-slate-500">Today at 4:07 PM</p>
                    </div>
                  </div>
                </div>
                <div className="border-t border-slate-200 pt-6 dark:border-slate-700">
                  <p className="text-sm font-medium text-slate-900 dark:text-white">Delete account</p>
                  <button type="button" className="mt-1 text-sm font-medium text-red-600 hover:underline dark:text-red-400">
                    Delete account
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
