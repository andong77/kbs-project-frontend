"use client"

import { useCallback, useEffect, useState } from "react"
import {
  fetchPreferences,
  updatePreferences,
  type UserPreferences,
} from "@/lib/preferencesApi"

export function usePreferences() {
  const [prefs, setPrefs] = useState<UserPreferences | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const refetch = useCallback(() => {
    setLoading(true)
    setError(null)
    fetchPreferences()
      .then(setPrefs)
      .catch((e) =>
        setError(e instanceof Error ? e.message : "Failed to load")
      )
      .finally(() => setLoading(false))
  }, [])

  useEffect(() => {
    refetch()
  }, [refetch])

  const update = useCallback(
    async (data: Partial<UserPreferences>) => {
      const next = await updatePreferences(data)
      setPrefs(next)
      return next
    },
    []
  )

  return { prefs, loading, error, refetch, update }
}
