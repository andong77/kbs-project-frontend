"use client"

import { useAuth } from "@/context/AuthContext"
import { featuredMovie, recommendedMovies } from "./_data/movies"
import { MoviesPageSkeleton } from "./_components/MoviesPageSkeleton"
import { MoviesScreen } from "./_components/MoviesScreen"
import { useRequireAuth } from "./_hooks/useRequireAuth"

export default function MoviesPageClient() {
  const { status, user } = useAuth()

  useRequireAuth(status)

  if (status === "loading") {
    return <MoviesPageSkeleton />
  }

  if (status !== "authenticated") {
    return null
  }

  return (
    <MoviesScreen
      featured={featuredMovie}
      recommended={recommendedMovies}
    />
  )
}

