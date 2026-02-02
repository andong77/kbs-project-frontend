"use client"

import { useEffect, useState } from "react"
import { useRouter, useParams } from "next/navigation"
import type { ApiMovie } from "@/types/movie"
import { fetchMovieById } from "@/lib/movieDetailsApi"
import { fetchMovieEvents, toggleMovieEvent, type MyEvents } from "@/lib/moviesApi"
import { useAuth } from "@/context/AuthContext"
import { useRequireAuth } from "@/app/movies/_hooks/useRequireAuth"
import MovieDetailSkeleton from "./_components/MovieDetailSkeleton"
import MovieDetailError from "./_components/MovieDetailError"
import MovieDetailHero from "./_components/MovieDetailHero"
import MovieDetailContent from "./_components/MovieDetailContent"

export default function MovieDetailsPageClient() {
  const { id } = useParams<{ id: string }>()
  const router = useRouter()
  const { status } = useAuth()
  const [movie, setMovie] = useState<ApiMovie | null>(null)
  const [events, setEvents] = useState<MyEvents | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [eventLoading, setEventLoading] = useState(false)

  useRequireAuth(status)

  useEffect(() => {
    if (!id) return
    setLoading(true)
    setError(null)
    Promise.all([
      fetchMovieById(id),
      fetchMovieEvents(id).catch(() => ({ like: false, dislike: false })),
    ])
      .then(([m, e]) => {
        setMovie(m)
        setEvents(e)
      })
      .catch((e) => {
        setError(e instanceof Error ? e.message : "Failed to load movie")
      })
      .finally(() => setLoading(false))
  }, [id])

  async function handleEventToggle(type: "LIKE" | "DISLIKE") {
    if (!id || eventLoading) return
    setEventLoading(true)
    try {
      const res = await toggleMovieEvent(id, type)
      setEvents((prev) =>
        prev
          ? {
              ...prev,
              like: type === "LIKE" ? res.active : prev.like,
              dislike: type === "DISLIKE" ? res.active : prev.dislike,
            }
          : { like: res.active && type === "LIKE", dislike: res.active && type === "DISLIKE" }
      )
    } finally {
      setEventLoading(false)
    }
  }

  if (status === "loading") return null
  if (status !== "authenticated") return null

  if (loading) return <MovieDetailSkeleton />

  if (error || !movie) {
    return (
      <MovieDetailError
        message={error ?? "We couldn't find details for this title."}
        onBack={() => router.push("/")}
      />
    )
  }

  return (
    <div className="min-h-screen bg-neutral-950 text-white">
      <MovieDetailHero
        movie={movie}
        events={events ?? { like: false, dislike: false }}
        onLikeToggle={() => handleEventToggle("LIKE")}
        onDislikeToggle={() => handleEventToggle("DISLIKE")}
        eventLoading={eventLoading}
      />
      <MovieDetailContent movie={movie} onBack={() => router.back()} />
    </div>
  )
}
