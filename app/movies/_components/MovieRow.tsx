import type { Movie } from "@/types/movie"
import { HorizontalScroller } from "./HorizontalScroller"
import { MovieCard } from "./MovieCard"

export function MovieRow({
  title,
  subtitle,
  movies,
  error,
  onRetry,
  onCardEventToggled,
}: {
  title: string
  subtitle?: string
  movies: Movie[]
  error?: string | null
  onRetry?: () => void
  onCardEventToggled?: () => void
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

        {error && onRetry ? (
          <button
            type="button"
            onClick={onRetry}
            className="inline-flex items-center gap-2 rounded-full px-3 py-2 text-sm font-medium text-red-400 transition hover:text-red-300"
          >
            Retry
          </button>
        ) : null}
      </div>

      <HorizontalScroller>
        {movies.map((m) => (
          <MovieCard
            key={m.id}
            movie={m}
            onEventToggled={onCardEventToggled}
          />
        ))}
      </HorizontalScroller>
    </section>
  )
}
