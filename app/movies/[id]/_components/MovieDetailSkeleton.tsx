"use client"

export default function MovieDetailSkeleton() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-950 text-white">
      <span className="h-8 w-8 animate-spin rounded-full border-2 border-current border-t-transparent" />
    </div>
  )
}
