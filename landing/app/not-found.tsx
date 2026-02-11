import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4">
      <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
        Halaman tidak ditemukan
      </h1>
      <p className="mt-2 text-slate-600 dark:text-slate-400">
        This page could not be found.
      </p>
      <Link
        href="/"
        className="mt-6 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
      >
        Kembali ke beranda / Back to home
      </Link>
    </div>
  );
}
