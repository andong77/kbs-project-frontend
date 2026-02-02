"use client"

import { useEffect, useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { useAuth } from "@/context/AuthContext"
import { useRequireAuth } from "./_hooks/useRequireAuth"
import { useInfiniteMovies } from "@/hooks/useInfiniteMovies"
import { RatingBadge } from "./_components/RatingBadge"
import type { Movie } from "@/types/movie"

function MovieGridCard({ movie }: { movie: Movie }) {
  return (
    <Link
      href={`/movies/${movie.id}`}
      className="group relative block aspect-[2/3] overflow-hidden rounded-lg bg-neutral-900 ring-1 ring-white/10 transition duration-200 hover:ring-white/30"
    >
      {movie.posterUrl ? (
        <Image
          src={movie.posterUrl}
          alt={`${movie.title} poster`}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          className="object-cover transition duration-200 group-hover:scale-[1.03]"
        />
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-neutral-700 via-neutral-900 to-black">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.14),transparent_55%)]" />
        </div>
      )}
      <div className="absolute left-2 top-2">
        <RatingBadge rating={movie.rating} />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 transition duration-200 group-hover:opacity-100" />
      <div className="absolute bottom-0 left-0 right-0 p-3">
        <h3 className="line-clamp-2 text-sm font-semibold text-white">
          {movie.title}
        </h3>
        {movie.year && (
          <p className="mt-1 text-xs text-white/70">{movie.year}</p>
        )}
      </div>
    </Link>
  )
}

export default function MoviesGridPageClient() {
  const { status } = useAuth()
  const { items, loading, loadingMore, error, hasMore, loadMore } =
    useInfiniteMovies()
  const sentinelRef = useRef<HTMLDivElement>(null)

  useRequireAuth(status)

  useEffect(() => {
    if (!hasMore || loading || loadingMore) return
    const el = sentinelRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) loadMore()
      },
      { rootMargin: "200px" }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [hasMore, loading, loadingMore, loadMore])

  if (status === "loading") {
    return (
      <div className="flex min-h-screen items-center justify-center bg-neutral-950">
        <span className="h-8 w-8 animate-spin rounded-full border-2 border-current border-t-transparent text-white" />
      </div>
    )
  }

  if (status !== "authenticated") return null

  return (
    <main className="min-h-screen bg-neutral-950 text-white">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16">
        <h1 className="mb-8 text-2xl font-bold sm:text-3xl">
          Latest Movies
        </h1>

        {loading ? (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
            {Array.from({ length: 12 }).map((_, i) => (
              <div
                key={i}
                className="aspect-[2/3] animate-pulse rounded-lg bg-neutral-800"
              />
            ))}
          </div>
        ) : error ? (
          <div className="rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-6 text-center text-red-400">
            {error}
          </div>
        ) : (
          <>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
              {items.map((movie) => (
                <MovieGridCard key={movie.id} movie={movie} />
              ))}
            </div>

            <div ref={sentinelRef} className="h-16" />

            {loadingMore && (
              <div className="flex justify-center py-8">
                <span className="h-6 w-6 animate-spin rounded-full border-2 border-current border-t-transparent" />
              </div>
            )}
          </>
        )}
      </div>
    </main>
  )
}
