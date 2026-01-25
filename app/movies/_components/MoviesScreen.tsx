import type { Movie } from "@/types/movie"
import { FeaturedHero } from "./FeaturedHero"
import { MovieRow } from "./MovieRow"
import { StickyHeader } from "./StickyHeader"

export function MoviesScreen({
  featured,
  recommended,
}: {
  featured: Movie
  recommended: Movie[]
}) {
  return (
    <main className="min-h-screen bg-neutral-950 text-white">
      <StickyHeader />

      <FeaturedHero movie={featured} />

      <div className="mx-auto max-w-6xl pb-16">
        <MovieRow title="Popular on KBSFLIX" movies={recommended} />
        <MovieRow title="Recommended for You" movies={recommended} />
        <MovieRow title="New Releases" movies={recommended} />
      </div>
    </main>
  )
}

