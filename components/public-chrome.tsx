'use client';

import * as React from 'react';
import { usePathname } from 'next/navigation';
import { Navbar } from '@/components/navbar';
import { FooterWrapper } from '@/components/footer-wrapper';
import type { SearchIndex } from '@/lib/public-data';

export function PublicChrome({
  children,
  searchIndex,
}: {
  children: React.ReactNode;
  searchIndex: SearchIndex;
}) {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith('/admin');

  if (isAdmin) {
    return <>{children}</>;
  }

  return (
    <>
      <Navbar searchIndex={searchIndex} />
      <main id="main-content" className="min-h-screen page-fade">
        {children}
      </main>
      <FooterWrapper />
    </>
  );
}
