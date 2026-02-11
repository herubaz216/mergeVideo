"use client";

import { useAuth } from "@/lib/AuthContext";

/**
 * Pricing logic:
 * - Daily: intro/trial, single day access.
 * - Weekly/Monthly: discount vs daily rate; longer = better $/day.
 * - Original prices shown for Weekly/15 Days/Monthly to reflect promo.
 */
const PACKAGES = [
  {
    id: "daily",
    title: "Merge Video Daily",
    duration: "1 day",
    priceOriginal: null,
    price: "$1.99",
    popular: false,
    features: [
      "Usage duration: 1 day",
      "Merge up to 3 videos per request",
      "Unlimited API calls per day",
      "Download merged video via URL",
    ],
  },
  {
    id: "weekly",
    title: "Merge Video Weekly",
    duration: "7 days",
    priceOriginal: "$9.99",
    price: "$6.99",
    popular: true,
    features: [
      "Usage duration: 7 days",
      "Merge up to 3 videos per request",
      "Unlimited API calls per day",
      "Download merged video via URL",
    ],
  },
  {
    id: "15days",
    title: "Merge Video 15 Days",
    duration: "15 days",
    priceOriginal: "$14.99",
    price: "$9.99",
    popular: false,
    features: [
      "Usage duration: 15 days",
      "Merge up to 3 videos per request",
      "Unlimited API calls per day",
      "Download merged video via URL",
    ],
  },
  {
    id: "monthly",
    title: "Merge Video Monthly",
    duration: "30 days",
    priceOriginal: "$24.99",
    price: "$14.99",
    popular: false,
    features: [
      "Usage duration: 30 days",
      "Merge up to 3 videos per request",
      "Unlimited API calls per day",
      "Download merged video via URL",
    ],
  },
];

export function PricingSection() {
  const { user, openSignUp } = useAuth();

  const handleSelectPackage = () => {
    if (!user) openSignUp();
    // else: bisa nanti integrasi checkout
  };

  return (
    <section className="w-full min-w-0 border-t border-slate-200 bg-white px-4 py-16 dark:border-slate-800 dark:bg-slate-900/50 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-6xl min-w-0">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white sm:text-3xl">
          Merge Video API — Service Packages
        </h2>
        <p className="mt-2 text-slate-600 dark:text-slate-400">
          Choose a package that suits your needs.
        </p>
        <div className="mt-10 grid w-full min-w-0 grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {PACKAGES.map((pkg) => (
            <div
              key={pkg.id}
              className={`relative flex min-w-0 flex-col rounded-2xl border p-6 ${
                pkg.popular
                  ? "border-slate-900 bg-slate-900 text-white dark:border-slate-100 dark:bg-slate-100 dark:text-slate-900"
                  : "border-slate-200 bg-white text-slate-900 dark:border-slate-700 dark:bg-slate-800/80 dark:text-white"
              }`}
            >
              {pkg.popular && (
                <span
                  className={`absolute right-4 top-4 rounded-full px-2.5 py-0.5 text-xs font-medium ${
                    pkg.popular
                      ? "bg-white/20 text-white dark:bg-slate-900/20 dark:text-slate-900"
                      : "bg-slate-100 text-slate-700 dark:bg-slate-700 dark:text-slate-300"
                  }`}
                >
                  Popular
                </span>
              )}
              <h3 className="text-lg font-semibold">{pkg.title}</h3>
              <p className="mt-1 text-sm opacity-80">{pkg.duration}</p>
              <div className="mt-4 flex items-baseline gap-2">
                {pkg.priceOriginal && (
                  <span className="text-sm line-through opacity-70">{pkg.priceOriginal}</span>
                )}
                <span className="text-2xl font-bold">{pkg.price}</span>
              </div>
              <ul className="mt-6 flex-1 space-y-3 text-sm opacity-90">
                {pkg.features.map((f, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <svg
                      className="mt-0.5 h-5 w-5 shrink-0 text-green-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {f}
                  </li>
                ))}
              </ul>
              <button
                type="button"
                onClick={handleSelectPackage}
                className={`mt-6 w-full rounded-xl py-3 text-sm font-medium transition-colors ${
                  pkg.popular
                    ? "bg-white text-slate-900 hover:bg-slate-100 dark:bg-slate-900 dark:text-white dark:hover:bg-slate-800"
                    : "border-2 border-slate-900 text-slate-900 hover:bg-slate-900 hover:text-white dark:border-slate-100 dark:text-slate-100 dark:hover:bg-slate-100 dark:hover:text-slate-900"
                }`}
              >
                Select Package
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
