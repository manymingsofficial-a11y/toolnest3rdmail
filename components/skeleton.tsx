import { cn } from '@/lib/utils';

export function ToolCardSkeleton({ className }: { className?: string }) {
  return (
    <div className={cn('rounded-2xl glass-card p-6', className)}>
      <div className="flex items-start justify-between">
        <div className="h-12 w-12 animate-pulse rounded-xl bg-muted" />
        <div className="h-8 w-8 animate-pulse rounded-lg bg-muted" />
      </div>
      <div className="mt-5 h-5 w-3/4 animate-pulse rounded bg-muted" />
      <div className="mt-3 h-4 w-full animate-pulse rounded bg-muted" />
      <div className="mt-3 h-4 w-2/3 animate-pulse rounded bg-muted" />
      <div className="mt-5 flex items-center justify-between">
        <div className="h-6 w-20 animate-pulse rounded-full bg-muted" />
        <div className="h-4 w-12 animate-pulse rounded bg-muted" />
      </div>
    </div>
  );
}

export function ToolGridSkeleton({ count = 8 }: { count?: number }) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {Array.from({ length: count }).map((_, i) => (
        <ToolCardSkeleton key={i} />
      ))}
    </div>
  );
}

export function CategoryCardSkeleton({ className }: { className?: string }) {
  return (
    <div className={cn('rounded-2xl glass-card p-5', className)}>
      <div className="h-11 w-11 animate-pulse rounded-xl bg-muted" />
      <div className="mt-4 h-4 w-3/4 animate-pulse rounded bg-muted" />
      <div className="mt-2 h-3 w-1/2 animate-pulse rounded bg-muted" />
    </div>
  );
}
