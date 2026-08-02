'use client';

import * as React from 'react';

const STORAGE_KEY = 'toolnest_admin_session';
const ADMIN_EMAIL = 'admin@toolnest.com';
const ADMIN_PASSWORD = 'admin123';

export type AdminSession = {
  email: string;
  loginAt: string;
  remember: boolean;
};

type AuthContextValue = {
  session: AdminSession | null;
  isLoading: boolean;
  login: (email: string, password: string, remember: boolean) => Promise<{ ok: boolean; error?: string }>;
  logout: () => void;
};

const AuthContext = React.createContext<AuthContextValue | null>(null);

export function AdminAuthProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = React.useState<AdminSession | null>(null);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    try {
      const raw = sessionStorage.getItem(STORAGE_KEY) ?? localStorage.getItem(STORAGE_KEY);
      if (raw) {
        setSession(JSON.parse(raw));
      }
    } catch {
      // ignore parse errors
    }
    setIsLoading(false);
  }, []);

  const login = React.useCallback(
    async (email: string, password: string, remember: boolean): Promise<{ ok: boolean; error?: string }> => {
      await new Promise((r) => setTimeout(r, 400));
      if (email.trim().toLowerCase() !== ADMIN_EMAIL || password !== ADMIN_PASSWORD) {
        return { ok: false, error: 'Invalid email or password.' };
      }
      const newSession: AdminSession = {
        email: ADMIN_EMAIL,
        loginAt: new Date().toISOString(),
        remember,
      };
      setSession(newSession);
      try {
        const storage = remember ? localStorage : sessionStorage;
        storage.setItem(STORAGE_KEY, JSON.stringify(newSession));
      } catch {
        // ignore storage errors
      }
      return { ok: true };
    },
    []
  );

  const logout = React.useCallback(() => {
    setSession(null);
    try {
      sessionStorage.removeItem(STORAGE_KEY);
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // ignore
    }
  }, []);

  const value = React.useMemo(
    () => ({ session, isLoading, login, logout }),
    [session, isLoading, login, logout]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAdminAuth() {
  const ctx = React.useContext(AuthContext);
  if (!ctx) throw new Error('useAdminAuth must be used within AdminAuthProvider');
  return ctx;
}
