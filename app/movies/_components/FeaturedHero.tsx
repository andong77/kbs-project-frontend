import Image from "next/image"
import type { Movie } from "@/types/movie"
import { BookmarkIcon, InfoIcon, PlayIcon, StarIcon } from "./icons"

export function FeaturedHero({ movie }: { movie: Movie }) {
  return (
    <section className="relative isolate min-h-[72vh] overflow-hidden bg-neutral-950 sm:min-h-[80vh]">
      {movie.backdropUrl ? (
        <Image
          src={movie.backdropUrl}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-neutral-800 via-neutral-950 to-black">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.16),transparent_55%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_right,rgba(239,68,68,0.22),transparent_55%)]" />
        </div>
      )}

      <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/35 to-black/0" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/15 to-black/0" />

      <div className="relative mx-auto flex max-w-6xl px-4 pt-28 pb-10 sm:px-6 sm:pt-36 sm:pb-14">
        <div className="max-w-xl">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-sm text-white/75">
            <span className="inline-flex items-center gap-2">
              <span className="text-red-500 font-extrabold tracking-wide">N</span>
              <span className="uppercase tracking-[0.2em] text-white/70">
                Series
              </span>
            </span>
            <span className="hidden text-white/50 sm:inline">•</span>
            <span className="inline-flex items-center gap-1.5">
              <StarIcon className="h-4 w-4 text-yellow-400" />
              <span className="font-semibold text-white">{movie.rating}</span>
              <span className="text-white/60">IMDb</span>
            </span>
          </div>

          <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-white sm:mt-6 sm:text-6xl">
            {movie.title}
          </h1>

          <div className="mt-4 flex flex-wrap items-center gap-2 text-sm text-white/70">
            <span className="font-semibold text-white">#1</span>
            <span className="text-white/70">in TV Shows Today</span>
          </div>

          {movie.overview ? (
            <p className="mt-4 max-w-xl text-sm leading-relaxed text-white/80 sm:mt-5 sm:text-base">
              {movie.overview}
            </p>
          ) : null}

          <div className="mt-6 flex flex-wrap items-center gap-3 sm:mt-8">
            <button
              type="button"
              className="inline-flex items-center gap-2 rounded bg-white px-5 py-2.5 text-sm font-semibold text-black transition hover:bg-white/90 focus:outline-none focus:ring-2 focus:ring-white/30"
            >
              <PlayIcon className="h-5 w-5" />
              Play
            </button>

            <button
              type="button"
              className="inline-flex items-center gap-2 rounded bg-white/20 px-5 py-2.5 text-sm font-semibold text-white ring-1 ring-white/10 backdrop-blur transition hover:bg-white/25 focus:outline-none focus:ring-2 focus:ring-white/30"
            >
              <InfoIcon className="h-5 w-5" />
              More Info
            </button>

            <div className="hidden sm:flex items-center gap-2 text-white/60">
              <BookmarkIcon className="h-5 w-5" />
              <span className="text-sm">Add to My List</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

