"use client"

import { useCallback, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useAuth } from "@/context/AuthContext"
import { useRequireAuth } from "@/app/movies/_hooks/useRequireAuth"
import { usePreferences } from "@/hooks/usePreferences"
import type { UserPreferences } from "@/lib/preferencesApi"
import { PreferencesForm } from "./_components/PreferencesForm"

export default function SettingsPage() {
  const router = useRouter()
  const { status } = useAuth()
  const { prefs, loading: prefsLoading, update } = usePreferences()
  const [saving, setSaving] = useState(false)

  useRequireAuth(status)

  const handleSubmit = useCallback(
    async (data: Partial<UserPreferences> & { onboardingCompleted?: boolean }) => {
      setSaving(true)
      try {
        await update(data)
        router.push("/")
      } finally {
        setSaving(false)
      }
    },
    [update, router]
  )

  if (status === "loading" || (status === "authenticated" && prefsLoading && !prefs)) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-zinc-950 text-white">
        <span className="h-8 w-8 animate-spin rounded-full border-2 border-current border-t-transparent" />
      </div>
    )
  }

  if (status !== "authenticated") return null

  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-950 to-zinc-900 text-white">
      <div className="mx-auto max-w-2xl px-4 py-12 sm:px-6 sm:py-16">
        <div className="mb-8 flex items-center gap-4">
          <Link
            href="/"
            className="text-sm font-medium text-zinc-400 transition hover:text-white"
          >
            ← Back to Home
          </Link>
        </div>
        <div className="rounded-3xl border border-zinc-800 bg-zinc-900/50 p-6 shadow-xl sm:p-10">
          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
            Preferences
          </h1>
          <p className="mt-2 text-sm text-zinc-400">
            Update your movie preferences. These feed the rule-based recommendations.
          </p>
          <div className="mt-8">
            <PreferencesForm
              initial={prefs}
              onSubmit={handleSubmit}
              loading={saving}
              submitLabel="Save preferences"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
