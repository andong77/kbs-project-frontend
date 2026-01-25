import type { Movie } from "@/types/movie"
import { ArrowRightIcon } from "./icons"
import { HorizontalScroller } from "./HorizontalScroller"
import { MovieCard } from "./MovieCard"

export function MovieRow({
  title,
  subtitle,
  movies,
}: {
  title: string
  subtitle?: string
  movies: Movie[]
}) {
  return (
    <section className="mt-6 sm:mt-8">
      <div className="flex items-end justify-between gap-6 px-4 sm:px-6">
        <div>
          <h2 className="text-base font-semibold text-white sm:text-lg">{title}</h2>
          {subtitle ? (
            <p className="mt-1 text-sm text-white/60">{subtitle}</p>
          ) : null}
        </div>

        <button
          type="button"
          className="hidden items-center gap-2 rounded-full px-3 py-2 text-sm font-medium text-white/70 transition hover:text-white sm:inline-flex"
        >
          <span>See all</span>
          <ArrowRightIcon className="h-4 w-4" />
        </button>
      </div>

      <HorizontalScroller>
        {movies.map((m) => (
          <MovieCard key={m.id} movie={m} />
        ))}
      </HorizontalScroller>
    </section>
  )
}

