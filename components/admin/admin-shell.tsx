'use client';

import { AdminAuthProvider } from '@/lib/admin/auth';
import { AdminLayout } from '@/components/admin/admin-layout';

export function AdminShell({ children }: { children: React.ReactNode }) {
  return (
    <AdminAuthProvider>
      <AdminLayout>{children}</AdminLayout>
    </AdminAuthProvider>
  );
}
