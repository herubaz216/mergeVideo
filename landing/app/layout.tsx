import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { LangProvider } from "@/lib/LangContext";
import { LayoutClient } from "@/components/LayoutClient";
import "./globals.css";

const geist = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Merge Video API — Layanan gabung video via API",
  description:
    "Gabungkan 3 video dalam satu panggilan API. Terintegrasi dengan n8n dan workflow Anda.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className="scroll-smooth">
      <body className={`${geist.variable} min-h-screen font-sans antialiased bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100`}>
        <LangProvider>
          <LayoutClient>{children}</LayoutClient>
        </LangProvider>
      </body>
    </html>
  );
}
