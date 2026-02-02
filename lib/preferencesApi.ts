import { apiFetch } from "@/utils/apiFetch"

export type UserPreferences = {
  preferredGenres: string[]
  excludedGenres: string[]
  preferredLanguages: string[]
  minReleaseYear: number | null
  maxReleaseYear: number | null
  minRuntimeMinutes: number | null
  maxRuntimeMinutes: number | null
  minVoteAverage: number | null
  excludeAdult: boolean
  onboardingCompleted?: boolean
}

export async function fetchPreferences(): Promise<UserPreferences> {
  return apiFetch<UserPreferences>("/users/me/preferences")
}

export async function updatePreferences(
  data: Partial<UserPreferences>
): Promise<UserPreferences> {
  return apiFetch<UserPreferences>("/users/me/preferences", "PUT", data)
}
