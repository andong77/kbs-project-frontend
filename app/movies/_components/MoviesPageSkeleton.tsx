export function MoviesPageSkeleton() {
  return (
    <div className="min-h-screen bg-neutral-950 text-white">
      <div className="fixed inset-x-0 top-0 z-50 h-14 bg-transparent sm:h-16" />

      <div className="h-[72vh] w-full animate-pulse bg-white/5" />

      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
        <div className="h-5 w-56 animate-pulse rounded bg-white/10" />
        <div className="mt-4 flex gap-3 overflow-hidden">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="h-24 w-40 shrink-0 animate-pulse rounded bg-white/10 ring-1 ring-white/10 sm:h-28 sm:w-56"
            />
          ))}
        </div>
      </div>
    </div>
  )
}

