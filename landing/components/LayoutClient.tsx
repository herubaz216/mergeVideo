"use client";

import { AuthProvider } from "@/lib/AuthContext";
import { Header } from "@/components/Header";

export function LayoutClient({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <Header />
      {children}
    </AuthProvider>
  );
}
