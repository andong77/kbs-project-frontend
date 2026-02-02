import { apiFetch } from "@/utils/apiFetch"
import type { ApiMovie } from "@/types/movie"

export async function fetchMovieById(id: string): Promise<ApiMovie> {
  return apiFetch<ApiMovie>(`/movies/${id}`)
}

