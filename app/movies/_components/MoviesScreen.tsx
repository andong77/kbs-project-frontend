import type { Movie } from "@/types/movie"
import { FeaturedHero } from "./FeaturedHero"
import { MovieRow } from "./MovieRow"

type MoviesScreenProps = {
  featured: Movie | null
  newMovies: Movie[]
  popularMovies: Movie[]
  recommendedMovies: Movie[]
  loading?: boolean
  recommendedError?: string | null
  onRefetchRecommended?: () => void
}

export function MoviesScreen({
  featured,
  newMovies,
  popularMovies,
  recommendedMovies,
  loading = false,
  recommendedError = null,
  onRefetchRecommended,
}: MoviesScreenProps) {
  return (
    <main className="min-h-screen bg-neutral-950 text-white">
      {featured && <FeaturedHero movie={featured} />}

      <div className="mx-auto max-w-6xl pb-16">
        {loading && !featured ? (
          <div className="flex min-h-[40vh] items-center justify-center">
            <span className="h-10 w-10 animate-spin rounded-full border-2 border-red-500 border-t-transparent" />
          </div>
        ) : (
          <>
            <MovieRow title="Popular on KBSFLIX" movies={popularMovies} />
            <MovieRow
              title="Recommended for You"
              movies={recommendedMovies}
              subtitle={
                recommendedError
                  ? "Couldn't load. Update preferences in Settings."
                  : undefined
              }
              error={recommendedError}
              onRetry={onRefetchRecommended}
              onCardEventToggled={onRefetchRecommended}
            />
            <MovieRow title="New Releases" movies={newMovies} />
          </>
        )}
      </div>
    </main>
  )
}
