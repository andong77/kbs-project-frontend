import Image from "next/image"
import Link from "next/link"
import type { Movie } from "@/types/movie"
import { StarIcon } from "./icons"

export function FeaturedHero({ movie }: { movie: Movie }) {
  return (
    <section className="relative isolate min-h-[85vh] overflow-hidden bg-neutral-950 sm:min-h-[90vh]">
      {/* Backdrop */}
      {movie.backdropUrl ? (
        <Image
          src={movie.backdropUrl}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-neutral-800 via-neutral-950 to-black">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_0%,rgba(255,255,255,0.12),transparent_50%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_80%_50%,rgba(239,68,68,0.15),transparent_50%)]" />
        </div>
      )}

      {/* Overlays for readability */}
      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

      {/* Content */}
      <div className="relative mx-auto flex min-h-[85vh] max-w-7xl flex-col justify-end px-4 pb-16 pt-24 sm:min-h-[90vh] sm:px-6 sm:pb-20 sm:pt-28">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:gap-10">
          {/* Poster on larger screens */}
          {movie.posterUrl && (
            <div className="hidden w-44 shrink-0 overflow-hidden rounded-xl border-2 border-white/10 shadow-2xl sm:block sm:w-52 lg:w-60">
              <Image
                src={movie.posterUrl}
                alt={`${movie.title} poster`}
                width={240}
                height={360}
                className="h-full w-full object-cover"
              />
            </div>
          )}

          <div className="flex-1 space-y-4 sm:space-y-5">
            {/* Badge + rating */}
            <div className="flex flex-wrap items-center gap-3">
              <span className="rounded-full bg-red-600/90 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-white">
                Featured
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1.5 text-sm font-medium text-white backdrop-blur-sm">
                <StarIcon className="h-4 w-4 text-yellow-400" />
                <span>{movie.rating.toFixed(1)}</span>
              </span>
              {movie.year && (
                <span className="text-sm text-white/70">{movie.year}</span>
              )}
              {movie.genres?.length > 0 && (
                <span className="text-sm text-white/60">
                  {movie.genres.slice(0, 3).join(" · ")}
                </span>
              )}
            </div>

            {/* Title */}
            <h1 className="text-4xl font-extrabold leading-[1.1] tracking-tight text-white drop-shadow-lg sm:text-5xl md:text-6xl lg:text-7xl">
              {movie.title}
            </h1>

            {/* Overview */}
            {movie.overview && (
              <p className="max-w-2xl text-base leading-relaxed text-white/90 sm:text-lg line-clamp-4">
                {movie.overview}
              </p>
            )}

            {/* CTA */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <Link
                href={`/movies/${movie.id}`}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-black shadow-lg transition hover:bg-white/95 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-neutral-950"
              >
                View details
              </Link>
              <span className="text-sm text-white/50">
                Full info, cast & where to watch
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
