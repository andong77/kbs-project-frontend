import type { ApiMovie } from "@/types/movie"
import { TMDB_IMG_BASE } from "@/lib/constants"

export function buildWatchUrl(
  movie: ApiMovie & { imdbId?: string | null }
): string {
  if (movie.imdbId) return `https://www.imdb.com/title/${movie.imdbId}`
  if (movie.tmdbId) return `https://www.themoviedb.org/movie/${movie.tmdbId}`
  const query = encodeURIComponent(
    `${movie.title} ${movie.releaseYear ?? ""} watch online`
  )
  return `https://www.google.com/search?q=${query}`
}

export function formatCurrency(value: number | null | undefined): string {
  if (!value || value === 0) return "N/A"
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value)
}

export function posterUrl(path: string | null | undefined): string | null {
  if (!path) return null
  const p = path.startsWith("/") ? path : `/${path}`
  return `${TMDB_IMG_BASE}/w500${p}`
}

export function backdropUrl(path: string | null | undefined): string | null {
  if (!path) return null
  const p = path.startsWith("/") ? path : `/${path}`
  return `${TMDB_IMG_BASE}/w1280${p}`
}
