"use client"

import { useRouter } from "next/navigation"
import { useAuth } from "@/context/AuthContext"
import { useRequireAuth } from "@/app/movies/_hooks/useRequireAuth"
import { PreferencesForm } from "@/app/settings/_components/PreferencesForm"
import { updatePreferences, type UserPreferences } from "@/lib/preferencesApi"
import { useCallback, useState } from "react"

function cn(...classes: (string | false | undefined | null)[]) {
  return classes.filter(Boolean).join(" ")
}

export default function OnboardingPage() {
  const { status, refreshUser } = useAuth()
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  useRequireAuth(status)

  const handleSubmit = useCallback(
    async (data: Partial<UserPreferences> & { onboardingCompleted?: boolean }) => {
      setLoading(true)
      try {
        await updatePreferences({ ...data, onboardingCompleted: true })
        await refreshUser()
        router.replace("/")
      } finally {
        setLoading(false)
      }
    },
    [refreshUser, router]
  )

  if (status === "loading") {
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
        <div className="rounded-3xl border border-zinc-800 bg-zinc-900/50 p-6 shadow-xl sm:p-10">
          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
            Set your preferences
          </h1>
          <p className="mt-2 text-sm text-zinc-400">
            Tell us what you like so we can recommend movies you’ll enjoy.
          </p>
          <div className="mt-8">
            <PreferencesForm
              onSubmit={handleSubmit}
              loading={loading}
              submitLabel="Continue to KBSFLIX"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
