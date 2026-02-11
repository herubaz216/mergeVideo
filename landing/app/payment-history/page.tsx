import Link from "next/link";

export const metadata = {
  title: "Payment History — Merge Video API",
  description: "Riwayat pembayaran.",
};

export default function PaymentHistoryPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-16 text-center">
      <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Payment History</h1>
      <p className="mt-4 text-slate-600 dark:text-slate-400">
        Riwayat pembayaran Anda akan tampil di sini. (Dummy — belum terhubung backend.)
      </p>
      <Link
        href="/"
        className="mt-8 inline-block rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 no-underline hover:bg-slate-50 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
      >
        ← Kembali ke beranda
      </Link>
    </div>
  );
}
