"use client"

import { useEffect, useState } from "react"
import {
  fetchNewMovies,
  fetchPopularMovies,
  fetchRecommendedMovies,
} from "@/lib/moviesApi"
import { apiMovieToMovie, type Movie } from "@/types/movie"

export function useMoviesNew(limit = 20) {
  const [items, setItems] = useState<Movie[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let ok = true
    setLoading(true)
    setError(null)
    fetchNewMovies(limit)
      .then((raw) => {
        if (!ok) return
        setItems(raw.map(apiMovieToMovie))
      })
      .catch((e) => {
        if (!ok) return
        setError(e instanceof Error ? e.message : "Failed to load")
      })
      .finally(() => {
        if (ok) setLoading(false)
      })
    return () => {
      ok = false
    }
  }, [limit])

  return { items, loading, error }
}

export function useMoviesPopular(limit = 20) {
  const [items, setItems] = useState<Movie[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let ok = true
    setLoading(true)
    setError(null)
    fetchPopularMovies(limit)
      .then((raw) => {
        if (!ok) return
        setItems(raw.map(apiMovieToMovie))
      })
      .catch((e) => {
        if (!ok) return
        setError(e instanceof Error ? e.message : "Failed to load")
      })
      .finally(() => {
        if (ok) setLoading(false)
      })
    return () => {
      ok = false
    }
  }, [limit])

  return { items, loading, error }
}

export function useMoviesRecommended(limit = 20) {
  const [items, setItems] = useState<Movie[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [refresh, setRefresh] = useState(0)
  const refetch = () => setRefresh((r) => r + 1)

  useEffect(() => {
    let ok = true
    setLoading(true)
    setError(null)
    fetchRecommendedMovies(limit)
      .then((raw) => {
        if (!ok) return
        setItems(raw.map(apiMovieToMovie))
      })
      .catch((e) => {
        if (!ok) return
        setError(e instanceof Error ? e.message : "Failed to load")
      })
      .finally(() => {
        if (ok) setLoading(false)
      })
    return () => {
      ok = false
    }
  }, [limit, refresh])

  return { items, loading, error, refetch }
}
