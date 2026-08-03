'use client';

import * as React from 'react';
import { usePathname } from 'next/navigation';
import { Navbar } from '@/components/navbar';
import { FooterWrapper } from '@/components/footer-wrapper';

export function PublicChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith('/admin');

  if (isAdmin) {
    return <>{children}</>;
  }

  return (
    <>
      <Navbar />
      <main id="main-content" className="min-h-screen page-fade">
        {children}
      </main>
      <FooterWrapper />
    </>
  );
}
