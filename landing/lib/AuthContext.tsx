"use client";

import React, { createContext, useContext, useState, useCallback } from "react";

export type User = { email: string; name: string };

type AuthContextType = {
  user: User | null;
  login: (email: string, name: string) => void;
  logout: () => void;
  signInOpen: boolean;
  signUpOpen: boolean;
  openSignIn: () => void;
  openSignUp: () => void;
  closeAuth: () => void;
  accountModalOpen: boolean;
  openAccountModal: () => void;
  closeAccountModal: () => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [signInOpen, setSignInOpen] = useState(false);
  const [signUpOpen, setSignUpOpen] = useState(false);
  const [accountModalOpen, setAccountModalOpen] = useState(false);

  const login = useCallback((email: string, name: string) => {
    setUser({ email, name });
    setSignInOpen(false);
    setSignUpOpen(false);
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    setAccountModalOpen(false);
  }, []);

  const openAccountModal = useCallback(() => setAccountModalOpen(true), []);
  const closeAccountModal = useCallback(() => setAccountModalOpen(false), []);

  const openSignIn = useCallback(() => {
    setSignUpOpen(false);
    setSignInOpen(true);
  }, []);

  const openSignUp = useCallback(() => {
    setSignInOpen(false);
    setSignUpOpen(true);
  }, []);

  const closeAuth = useCallback(() => {
    setSignInOpen(false);
    setSignUpOpen(false);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        signInOpen,
        signUpOpen,
        openSignIn,
        openSignUp,
        closeAuth,
        accountModalOpen,
        openAccountModal,
        closeAccountModal,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
