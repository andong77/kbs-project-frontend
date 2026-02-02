"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/context/AuthContext"
import { useMoviesNew, useMoviesPopular, useMoviesRecommended } from "@/hooks/useMovies"
import { MoviesPageSkeleton } from "@/app/movies/_components/MoviesPageSkeleton"
import { MoviesScreen } from "@/app/movies/_components/MoviesScreen"
import { useRequireAuth } from "@/app/movies/_hooks/useRequireAuth"

export default function HomePage() {
  const { status, user } = useAuth()
  const router = useRouter()
  const { items: newMovies, loading: newLoading } = useMoviesNew(20)
  const { items: popularMovies, loading: popularLoading } = useMoviesPopular(20)
  const {
    items: recommendedMovies,
    loading: recLoading,
    error: recError,
    refetch: refetchRecommended,
  } = useMoviesRecommended(20)

  useEffect(() => {
    if (status === "guest") router.replace("/auth")
  }, [status, router])

  useEffect(() => {
    if (status !== "authenticated" || !user) return
    if (!user.onboardingCompleted) router.replace("/onboarding")
  }, [status, user, router])

  useRequireAuth(status)

  if (status === "loading") {
    return <MoviesPageSkeleton />
  }

  if (status !== "authenticated") {
    return null
  }

  const loading = newLoading || popularLoading || recLoading
  const featured = popularMovies[0] ?? newMovies[0] ?? null

  return (
    <MoviesScreen
      featured={featured}
      newMovies={newMovies}
      popularMovies={popularMovies}
      recommendedMovies={recommendedMovies}
      loading={loading}
      recommendedError={recError}
      onRefetchRecommended={refetchRecommended}
    />
  )
}
