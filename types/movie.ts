const TMDB_IMG_BASE = "https://image.tmdb.org/t/p"

function buildUrl(path: string | null, size: string) {
  if (!path) return null
  const p = path.startsWith("/") ? path : `/${path}`
  return `${TMDB_IMG_BASE}/${size}${p}`
}

export type ApiMovie = {
  id: string
  tmdbId?: number | null
  title: string
  overview?: string | null
  genres: string[]
  releaseDate?: string | null
  releaseYear?: number | null
  runtimeMinutes?: number | null
  popularity: number
  voteAverage: number
  voteCount: number
  adult: boolean
  posterPath?: string | null
  backdropPath?: string | null
  originalLanguage?: string | null
  createdAt?: string
  updatedAt?: string
  tagline?: string | null
  budget?: number | null
  revenue?: number | null
  homepage?: string | null
  imdbId?: string | null
}

export type RecommendationMeta = {
  score: number
  reasons: string[]
}

export type ApiMovieWithRecommendation = ApiMovie & {
  recommendation?: RecommendationMeta
}

export type Movie = {
  id: string
  title: string
  year: number
  rating: number
  genres: string[]
  runtime?: string
  overview?: string | null
  posterUrl: string | null
  backdropUrl: string | null
  recommendation?: RecommendationMeta
  liked?: boolean
  disliked?: boolean
}

type ApiMovieForConvert = ApiMovie | ApiMovieWithRecommendation | (ApiMovieWithRecommendation & { myEvents?: { like: boolean; dislike: boolean } })

export function apiMovieToMovie(m: ApiMovieForConvert): Movie {
  const rec = "recommendation" in m ? m.recommendation : undefined
  const myEvents = "myEvents" in m ? m.myEvents : undefined
  const runtime = m.runtimeMinutes
    ? `${Math.floor(m.runtimeMinutes / 60)}h ${m.runtimeMinutes % 60}min`
    : undefined
  return {
    id: m.id,
    title: m.title,
    year: m.releaseYear ?? new Date().getFullYear(),
    rating: m.voteAverage,
    genres: m.genres ?? [],
    runtime,
    overview: m.overview ?? null,
    posterUrl: buildUrl(m.posterPath ?? null, "w500"),
    backdropUrl: buildUrl(m.backdropPath ?? null, "w1280"),
    ...(rec ? { recommendation: rec } : {}),
    ...(myEvents ? { liked: myEvents.like, disliked: myEvents.dislike } : {}),
  }
}
