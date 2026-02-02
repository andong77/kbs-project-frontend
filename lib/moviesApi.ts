import { apiFetch } from "@/utils/apiFetch"
import type { ApiMovie, ApiMovieWithRecommendation } from "@/types/movie"

type ItemsResponse<T> = { items: T[] }

export async function fetchNewMovies(limit = 20, offset = 0) {
  const res = await apiFetch<ItemsResponse<ApiMovie>>(
    `/movies/new?limit=${limit}&offset=${offset}`
  )
  return res.items
}

export async function fetchPopularMovies(limit = 20) {
  const res = await apiFetch<ItemsResponse<ApiMovie>>(
    `/movies/popular?limit=${limit}`
  )
  return res.items
}

export type MyEvents = { like: boolean; dislike: boolean }

export type ApiMovieWithRecommendationAndEvents = ApiMovieWithRecommendation & {
  myEvents?: MyEvents
}

export async function fetchRecommendedMovies(limit = 20) {
  const res = await apiFetch<ItemsResponse<ApiMovieWithRecommendationAndEvents>>(
    `/movies/recommended?limit=${limit}`
  )
  return res.items
}

export async function fetchMovieEvents(movieId: string): Promise<MyEvents> {
  return apiFetch(`/movies/${movieId}/events`)
}

export async function searchMovies(q: string, limit = 15): Promise<ApiMovie[]> {
  if (!q?.trim()) return []
  const res = await apiFetch<ItemsResponse<ApiMovie>>(
    `/movies/search?q=${encodeURIComponent(q.trim())}&limit=${limit}`
  )
  return res.items
}

export type EventType = "VIEW" | "LIKE" | "DISLIKE" | "WATCHLIST"

export async function toggleMovieEvent(
  movieId: string,
  type: EventType
): Promise<{ active: boolean }> {
  return apiFetch(`/movies/${movieId}/events`, "POST", { type })
}
