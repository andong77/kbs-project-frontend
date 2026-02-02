"use client"

import { useState } from "react"
import { GENRES, LANGUAGES } from "@/lib/constants"
import type { UserPreferences } from "@/lib/preferencesApi"

type PreferencesFormProps = {
  initial?: UserPreferences | null
  onSubmit: (data: Partial<UserPreferences> & { onboardingCompleted?: boolean }) => Promise<void>
  loading?: boolean
  submitLabel?: string
}

function cn(...classes: (string | false | undefined | null)[]) {
  return classes.filter(Boolean).join(" ")
}

export function PreferencesForm({
  initial,
  onSubmit,
  loading = false,
  submitLabel = "Save preferences",
}: PreferencesFormProps) {
  const [preferredGenres, setPreferredGenres] = useState<string[]>(
    initial?.preferredGenres ?? []
  )
  const [excludedGenres, setExcludedGenres] = useState<string[]>(
    initial?.excludedGenres ?? []
  )
  const [preferredLanguages, setPreferredLanguages] = useState<string[]>(
    initial?.preferredLanguages ?? []
  )
  const [minReleaseYear, setMinReleaseYear] = useState<string>(
    initial?.minReleaseYear != null ? String(initial.minReleaseYear) : ""
  )
  const [maxReleaseYear, setMaxReleaseYear] = useState<string>(
    initial?.maxReleaseYear != null ? String(initial.maxReleaseYear) : ""
  )
  const [minRuntime, setMinRuntime] = useState<string>(
    initial?.minRuntimeMinutes != null ? String(initial.minRuntimeMinutes) : ""
  )
  const [maxRuntime, setMaxRuntime] = useState<string>(
    initial?.maxRuntimeMinutes != null ? String(initial.maxRuntimeMinutes) : ""
  )
  const [minVote, setMinVote] = useState<string>(
    initial?.minVoteAverage != null ? String(initial.minVoteAverage) : ""
  )
  const [excludeAdult, setExcludeAdult] = useState(
    initial?.excludeAdult ?? true
  )
  const [error, setError] = useState<string | null>(null)

  const toggle = (arr: string[], val: string, set: (a: string[]) => void) => {
    if (arr.includes(val)) set(arr.filter((x) => x !== val))
    else set([...arr, val])
  }

  const num = (s: string): number | null => {
    const n = parseInt(s, 10)
    return Number.isFinite(n) ? n : null
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    try {
      await onSubmit({
        preferredGenres,
        excludedGenres,
        preferredLanguages,
        minReleaseYear: num(minReleaseYear),
        maxReleaseYear: num(maxReleaseYear),
        minRuntimeMinutes: num(minRuntime),
        maxRuntimeMinutes: num(maxRuntime),
        minVoteAverage: num(minVote),
        excludeAdult,
      })
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save")
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div
          className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800 dark:border-red-900/50 dark:bg-red-950/40 dark:text-red-200"
          role="alert"
        >
          {error}
        </div>
      )}

      <div>
        <label className="mb-2 block text-sm font-medium text-zinc-800 dark:text-zinc-200">
          Preferred genres
        </label>
        <div className="flex flex-wrap gap-2">
          {GENRES.map((g) => (
            <button
              key={g}
              type="button"
              onClick={() => toggle(preferredGenres, g, setPreferredGenres)}
              className={cn(
                "rounded-full px-3 py-1.5 text-sm font-medium transition",
                preferredGenres.includes(g)
                  ? "bg-zinc-900 text-white dark:bg-white dark:text-zinc-900"
                  : "bg-zinc-100 text-zinc-700 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-200 dark:hover:bg-zinc-700"
              )}
            >
              {g}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-zinc-800 dark:text-zinc-200">
          Excluded genres
        </label>
        <div className="flex flex-wrap gap-2">
          {GENRES.map((g) => (
            <button
              key={g}
              type="button"
              onClick={() => toggle(excludedGenres, g, setExcludedGenres)}
              className={cn(
                "rounded-full px-3 py-1.5 text-sm font-medium transition",
                excludedGenres.includes(g)
                  ? "bg-red-600 text-white hover:bg-red-700"
                  : "bg-zinc-100 text-zinc-700 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-200 dark:hover:bg-zinc-700"
              )}
            >
              {g}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-zinc-800 dark:text-zinc-200">
          Preferred languages
        </label>
        <div className="flex flex-wrap gap-2">
          {LANGUAGES.map(({ code, label }) => (
            <button
              key={code}
              type="button"
              onClick={() => toggle(preferredLanguages, code, setPreferredLanguages)}
              className={cn(
                "rounded-full px-3 py-1.5 text-sm font-medium transition",
                preferredLanguages.includes(code)
                  ? "bg-zinc-900 text-white dark:bg-white dark:text-zinc-900"
                  : "bg-zinc-100 text-zinc-700 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-200 dark:hover:bg-zinc-700"
              )}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1 block text-sm font-medium text-zinc-800 dark:text-zinc-200">
            Min release year
          </label>
          <input
            type="number"
            min={1900}
            max={2030}
            placeholder="e.g. 2010"
            value={minReleaseYear}
            onChange={(e) => setMinReleaseYear(e.target.value)}
            className="w-full rounded-2xl border border-zinc-200 bg-white px-4 py-3 text-sm text-zinc-900 outline-none placeholder:text-zinc-400 focus:border-zinc-300 focus:ring-4 focus:ring-zinc-100 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-50 dark:placeholder:text-zinc-500 dark:focus:border-zinc-700 dark:focus:ring-zinc-900"
          />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-zinc-800 dark:text-zinc-200">
            Max release year
          </label>
          <input
            type="number"
            min={1900}
            max={2030}
            placeholder="e.g. 2024"
            value={maxReleaseYear}
            onChange={(e) => setMaxReleaseYear(e.target.value)}
            className="w-full rounded-2xl border border-zinc-200 bg-white px-4 py-3 text-sm text-zinc-900 outline-none placeholder:text-zinc-400 focus:border-zinc-300 focus:ring-4 focus:ring-zinc-100 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-50 dark:placeholder:text-zinc-500 dark:focus:border-zinc-700 dark:focus:ring-zinc-900"
          />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1 block text-sm font-medium text-zinc-800 dark:text-zinc-200">
            Min runtime (minutes)
          </label>
          <input
            type="number"
            min={0}
            max={300}
            placeholder="e.g. 90"
            value={minRuntime}
            onChange={(e) => setMinRuntime(e.target.value)}
            className="w-full rounded-2xl border border-zinc-200 bg-white px-4 py-3 text-sm text-zinc-900 outline-none placeholder:text-zinc-400 focus:border-zinc-300 focus:ring-4 focus:ring-zinc-100 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-50 dark:placeholder:text-zinc-500 dark:focus:border-zinc-700 dark:focus:ring-zinc-900"
          />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-zinc-800 dark:text-zinc-200">
            Max runtime (minutes)
          </label>
          <input
            type="number"
            min={0}
            max={300}
            placeholder="e.g. 180"
            value={maxRuntime}
            onChange={(e) => setMaxRuntime(e.target.value)}
            className="w-full rounded-2xl border border-zinc-200 bg-white px-4 py-3 text-sm text-zinc-900 outline-none placeholder:text-zinc-400 focus:border-zinc-300 focus:ring-4 focus:ring-zinc-100 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-50 dark:placeholder:text-zinc-500 dark:focus:border-zinc-700 dark:focus:ring-zinc-900"
          />
        </div>
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium text-zinc-800 dark:text-zinc-200">
          Min vote average (0–10)
        </label>
        <input
          type="number"
          min={0}
          max={10}
          step={0.1}
          placeholder="e.g. 6.5"
          value={minVote}
          onChange={(e) => setMinVote(e.target.value)}
          className="w-full max-w-xs rounded-2xl border border-zinc-200 bg-white px-4 py-3 text-sm text-zinc-900 outline-none placeholder:text-zinc-400 focus:border-zinc-300 focus:ring-4 focus:ring-zinc-100 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-50 dark:placeholder:text-zinc-500 dark:focus:border-zinc-700 dark:focus:ring-zinc-900"
        />
      </div>

      <div className="flex items-center gap-3">
        <input
          type="checkbox"
          id="excludeAdult"
          checked={excludeAdult}
          onChange={(e) => setExcludeAdult(e.target.checked)}
          className="h-4 w-4 rounded border-zinc-300 text-zinc-900 focus:ring-zinc-500 dark:border-zinc-600 dark:bg-zinc-950"
        />
        <label
          htmlFor="excludeAdult"
          className="text-sm font-medium text-zinc-800 dark:text-zinc-200"
        >
          Exclude adult content
        </label>
      </div>

      <button
        type="submit"
        disabled={loading}
        className={cn(
          "inline-flex w-full items-center justify-center rounded-2xl px-4 py-3 text-sm font-semibold transition sm:w-auto",
          loading
            ? "cursor-not-allowed bg-zinc-200 text-zinc-500 dark:bg-zinc-900 dark:text-zinc-500"
            : "bg-zinc-900 text-white hover:bg-zinc-800 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-200"
        )}
      >
        {loading ? (
          <span className="inline-flex items-center gap-2">
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
            Saving…
          </span>
        ) : (
          submitLabel
        )}
      </button>
    </form>
  )
}
