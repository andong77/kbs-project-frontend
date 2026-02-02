"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import { fetchNewMovies } from "@/lib/moviesApi"
import { apiMovieToMovie, type Movie } from "@/types/movie"

const PAGE_SIZE = 24

export function useInfiniteMovies() {
  const [items, setItems] = useState<Movie[]>([])
  const [loading, setLoading] = useState(true)
  const [loadingMore, setLoadingMore] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [hasMore, setHasMore] = useState(true)
  const offsetRef = useRef(0)

  const loadMore = useCallback(async () => {
    if (loadingMore || !hasMore) return
    setLoadingMore(true)
    try {
      const raw = await fetchNewMovies(PAGE_SIZE, offsetRef.current)
      if (raw.length < PAGE_SIZE) setHasMore(false)
      setItems((prev) => [...prev, ...raw.map(apiMovieToMovie)])
      offsetRef.current += raw.length
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to load")
    } finally {
      setLoadingMore(false)
    }
  }, [loadingMore, hasMore])

  useEffect(() => {
    let ok = true
    setLoading(true)
    setError(null)
    setItems([])
    offsetRef.current = 0
    setHasMore(true)
    fetchNewMovies(PAGE_SIZE, 0)
      .then((raw) => {
        if (!ok) return
        setItems(raw.map(apiMovieToMovie))
        offsetRef.current = raw.length
        if (raw.length < PAGE_SIZE) setHasMore(false)
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
  }, [])

  return { items, loading, loadingMore, error, hasMore, loadMore }
}
