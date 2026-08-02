'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { useAdminAuth } from '@/lib/admin/auth';
import { LoadingSpinner } from '@/components/admin/shared';
import {
  LayoutDashboard,
  Wrench,
  FolderTree,
  FileText,
  Search,
  Home,
  Megaphone,
  Link2,
  Mail,
  Settings,
  Server,
  LogOut,
  Menu,
  X,
} from 'lucide-react';

const navItems = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/tools', label: 'Tools', icon: Wrench },
  { href: '/admin/categories', label: 'Categories', icon: FolderTree },
  { href: '/admin/blog', label: 'Blog', icon: FileText },
  { href: '/admin/seo', label: 'SEO', icon: Search },
  { href: '/admin/homepage', label: 'Homepage', icon: Home },
  { href: '/admin/ads', label: 'Advertisements', icon: Megaphone },
  { href: '/admin/affiliates', label: 'Affiliates', icon: Link2 },
  { href: '/admin/newsletter', label: 'Newsletter', icon: Mail },
  { href: '/admin/settings', label: 'Settings', icon: Settings },
  { href: '/admin/system', label: 'System', icon: Server },
];

export function AdminLayout({ children }: { children: React.ReactNode }) {
  const { session, isLoading, logout } = useAdminAuth();
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  React.useEffect(() => {
    if (!isLoading && !session && pathname !== '/admin/login') {
      router.replace('/admin/login');
    }
  }, [isLoading, session, pathname, router]);

  if (isLoading) {
    return <LoadingSpinner label="Loading admin..." />;
  }

  if (!session && pathname !== '/admin/login') {
    return <LoadingSpinner label="Redirecting to login..." />;
  }

  if (pathname === '/admin/login') {
    return <>{children}</>;
  }

  const handleLogout = () => {
    logout();
    router.replace('/admin/login');
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile header */}
      <div className="sticky top-0 z-40 flex items-center justify-between border-b border-border/60 bg-background/80 px-4 py-3 backdrop-blur-md md:hidden">
        <Link href="/admin" className="flex items-center gap-2 font-semibold">
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-gradient-brand text-white">
            <Wrench className="h-4 w-4" />
          </span>
          <span className="text-sm">ToolNest Admin</span>
        </Link>
        <Button variant="ghost" size="icon" onClick={() => setMobileOpen((v) => !v)}>
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </div>

      <div className="flex">
        {/* Sidebar */}
        <aside
          className={cn(
            'fixed inset-y-0 left-0 z-30 w-64 transform border-r border-border/60 bg-background/80 backdrop-blur-md transition-transform duration-300 md:translate-x-0',
            mobileOpen ? 'translate-x-0' : '-translate-x-full'
          )}
        >
          <div className="flex h-full flex-col">
            <div className="hidden items-center gap-2 border-b border-border/60 px-6 py-5 md:flex">
              <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-brand text-white shadow-lg shadow-brand-purple/30">
                <Wrench className="h-5 w-5" />
              </span>
              <div>
                <p className="text-sm font-bold tracking-tight">ToolNest</p>
                <p className="text-xs text-muted-foreground">Admin Dashboard</p>
              </div>
            </div>

            <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-4">
              {navItems.map((item) => {
                const active = pathname === item.href;
                const Icon = item.icon;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className={cn(
                      'flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors',
                      active
                        ? 'bg-gradient-brand text-white shadow-lg shadow-brand-purple/20'
                        : 'text-muted-foreground hover:bg-muted/50 hover:text-foreground'
                    )}
                  >
                    <Icon className="h-4 w-4 shrink-0" />
                    {item.label}
                  </Link>
                );
              })}
            </nav>

            <div className="border-t border-border/60 p-3">
              <div className="mb-2 px-3 text-xs text-muted-foreground">
                Signed in as
                <br />
                <span className="font-medium text-foreground">{session?.email}</span>
              </div>
              <Button variant="ghost" size="sm" onClick={handleLogout} className="w-full justify-start gap-2 text-muted-foreground hover:text-rose-500">
                <LogOut className="h-4 w-4" />
                Logout
              </Button>
            </div>
          </div>
        </aside>

        {/* Overlay for mobile */}
        {mobileOpen && (
          <div
            className="fixed inset-0 z-20 bg-black/40 backdrop-blur-sm md:hidden"
            onClick={() => setMobileOpen(false)}
          />
        )}

        {/* Main content */}
        <main className="min-h-screen flex-1 md:ml-64">
          <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
