export default function Loading() {
  return (
    <div className="mx-auto max-w-7xl px-4 pt-32 pb-24 sm:px-6 lg:px-8">
      <div className="animate-pulse">
        <div className="mx-auto h-8 w-64 rounded-lg bg-muted/50" />
        <div className="mx-auto mt-4 h-4 w-96 max-w-full rounded bg-muted/30" />
      </div>
      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="h-48 animate-pulse rounded-2xl glass-card shimmer"
          />
        ))}
      </div>
    </div>
  );
}
