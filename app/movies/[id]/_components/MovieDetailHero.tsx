"use client"

import Image from "next/image"
import Link from "next/link"
import type { ApiMovie } from "@/types/movie"
import type { MyEvents } from "@/lib/moviesApi"
import { posterUrl, backdropUrl, buildWatchUrl } from "@/lib/movieUtils"
import { HandThumbUpIcon, HandThumbDownIcon } from "@/app/movies/_components/icons"

function cn(...classes: (string | false | undefined)[]) {
  return classes.filter(Boolean).join(" ")
}

interface MovieDetailHeroProps {
  movie: ApiMovie
  events: MyEvents
  onLikeToggle: () => void
  onDislikeToggle: () => void
  eventLoading?: boolean
}

export default function MovieDetailHero({
  movie,
  events,
  onLikeToggle,
  onDislikeToggle,
  eventLoading = false,
}: MovieDetailHeroProps) {
  const poster = posterUrl(movie.posterPath ?? null)
  const backdrop = backdropUrl(movie.backdropPath ?? null)
  const watchUrl = buildWatchUrl(movie)

  return (
    <div className="relative h-[85vh] min-h-[600px] w-full overflow-hidden">
      {backdrop ? (
        <>
          <Image
            src={backdrop}
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/20" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/50 to-transparent" />
        </>
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-neutral-800 via-neutral-950 to-black" />
      )}

      <div className="absolute inset-0 flex items-end">
        <div className="mx-auto w-full max-w-7xl px-4 pb-12 sm:px-6 sm:pb-16">
          <div className="flex flex-col gap-6 sm:flex-row sm:gap-8">
            {poster && (
              <div className="w-32 shrink-0 overflow-hidden rounded-lg border-2 border-white/20 bg-neutral-900 shadow-2xl sm:w-48 md:w-56">
                <Image
                  src={poster}
                  alt={`${movie.title} poster`}
                  width={224}
                  height={336}
                  className="h-full w-full object-cover"
                />
              </div>
            )}

            <div className="flex-1 space-y-4 pb-4">
              <div>
                <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl md:text-5xl lg:text-6xl">
                  {movie.title}
                </h1>
                {movie.tagline && (
                  <p className="mt-2 text-lg italic text-white/80 sm:text-xl">
                    &ldquo;{movie.tagline}&rdquo;
                  </p>
                )}
              </div>

              <div className="flex flex-wrap items-center gap-3 text-sm sm:text-base">
                {movie.releaseYear && (
                  <span className="font-medium text-white">{movie.releaseYear}</span>
                )}
                {movie.runtimeMinutes != null && (
                  <>
                    <span className="text-white/40">•</span>
                    <span className="text-white/80">
                      {Math.floor(movie.runtimeMinutes / 60)}h {movie.runtimeMinutes % 60}m
                    </span>
                  </>
                )}
                {movie.genres?.length > 0 && (
                  <>
                    <span className="text-white/40">•</span>
                    <div className="flex flex-wrap items-center gap-2">
                      {movie.genres.map((genre, idx) => (
                        <span
                          key={idx}
                          className="rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-white/90 backdrop-blur sm:text-sm"
                        >
                          {genre}
                        </span>
                      ))}
                    </div>
                  </>
                )}
              </div>

              <div className="flex flex-wrap items-center gap-4">
                {movie.voteAverage > 0 && (
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1 rounded-full bg-yellow-500/20 px-4 py-2 backdrop-blur">
                      <span className="text-lg font-bold text-yellow-400">★</span>
                      <span className="text-sm font-semibold text-white">
                        {movie.voteAverage.toFixed(1)}
                      </span>
                    </div>
                    {movie.voteCount > 0 && (
                      <span className="text-xs text-white/60">
                        ({movie.voteCount.toLocaleString()} votes)
                      </span>
                    )}
                  </div>
                )}
                {movie.popularity > 0 && (
                  <div className="hidden sm:flex items-center gap-2 text-xs text-white/60">
                    <span className="rounded-full bg-white/5 px-2 py-1">
                      Popularity: {movie.popularity.toFixed(1)}
                    </span>
                  </div>
                )}
              </div>

              <div className="flex flex-wrap items-center gap-3 pt-2">
                <Link
                  href={watchUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-black transition hover:bg-white/90 focus:outline-none focus:ring-2 focus:ring-white/30 sm:text-base"
                >
                  <svg
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  Watch Movie
                </Link>
                {movie.tmdbId != null && (
                  <Link
                    href={`https://www.themoviedb.org/movie/${movie.tmdbId}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 bg-white/10 px-5 py-3 text-sm font-medium text-white backdrop-blur transition hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white/30"
                  >
                    View on TMDB
                  </Link>
                )}
                {movie.imdbId && (
                  <Link
                    href={`https://www.imdb.com/title/${movie.imdbId}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 bg-white/10 px-5 py-3 text-sm font-medium text-white backdrop-blur transition hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white/30"
                  >
                    View on IMDb
                  </Link>
                )}
                <button
                  type="button"
                  onClick={onLikeToggle}
                  disabled={eventLoading}
                  className={cn(
                    "inline-flex items-center justify-center gap-2 rounded-full border px-5 py-3 text-sm font-medium backdrop-blur transition focus:outline-none focus:ring-2 focus:ring-white/30 disabled:opacity-50",
                    events.like
                      ? "border-green-500/50 bg-green-600/30 text-green-200 hover:bg-green-600/40"
                      : "border-white/20 bg-white/10 text-white hover:bg-white/20"
                  )}
                  title="Like"
                  aria-label="Like"
                >
                  <HandThumbUpIcon className="h-5 w-5" />
                  Like
                </button>
                <button
                  type="button"
                  onClick={onDislikeToggle}
                  disabled={eventLoading}
                  className={cn(
                    "inline-flex items-center justify-center gap-2 rounded-full border px-5 py-3 text-sm font-medium backdrop-blur transition focus:outline-none focus:ring-2 focus:ring-white/30 disabled:opacity-50",
                    events.dislike
                      ? "border-red-500/50 bg-red-600/30 text-red-200 hover:bg-red-600/40"
                      : "border-white/20 bg-white/10 text-white hover:bg-white/20"
                  )}
                  title="Dislike"
                  aria-label="Dislike"
                >
                  <HandThumbDownIcon className="h-5 w-5" />
                  Dislike
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
