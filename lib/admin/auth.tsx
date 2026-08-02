'use client';

import * as React from 'react';
import type { Session, User } from '@supabase/supabase-js';
import { supabase } from '@/lib/supabase-client';

export type AdminSession = {
  email: string;
  loginAt: string;
  remember: boolean;
};

type AuthContextValue = {
  session: AdminSession | null;
  isLoading: boolean;
  login: (email: string, password: string, remember: boolean) => Promise<{ ok: boolean; error?: string }>;
  logout: () => Promise<void>;
};

const AuthContext = React.createContext<AuthContextValue | null>(null);

export function AdminAuthProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = React.useState<AdminSession | null>(null);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    let mounted = true;

    supabase.auth.getSession().then(({ data }: { data: { session: Session | null } }) => {
      if (!mounted) return;
      if (data.session) {
        const user = data.session.user as User;
        setSession({
          email: user.email ?? '',
          loginAt: new Date().toISOString(),
          remember: true,
        });
      }
      setIsLoading(false);
    });

    const { data: authListener } = supabase.auth.onAuthStateChange((event: string, newSession: Session | null) => {
      (async () => {
        if (!mounted) return;
        if (event === 'SIGNED_OUT' || !newSession) {
          setSession(null);
        } else if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') {
          const user = newSession.user as User;
          setSession({
            email: user.email ?? '',
            loginAt: new Date().toISOString(),
            remember: true,
          });
        }
      })();
    });

    return () => {
      mounted = false;
      authListener.subscription.unsubscribe();
    };
  }, []);

  const login = React.useCallback(
    async (email: string, password: string, _remember: boolean): Promise<{ ok: boolean; error?: string }> => {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) {
        const msg = error.message;
        if (msg.includes('Invalid login')) return { ok: false, error: 'Invalid email or password.' };
        if (msg.includes('Email not confirmed')) return { ok: false, error: 'Please confirm your email first.' };
        if (msg.includes('rate limit')) return { ok: false, error: 'Too many attempts. Please wait a moment.' };
        return { ok: false, error: msg };
      }
      return { ok: true };
    },
    []
  );

  const logout = React.useCallback(async () => {
    await supabase.auth.signOut();
    setSession(null);
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
