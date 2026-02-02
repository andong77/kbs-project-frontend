"use client"

import { useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { useAuth } from "@/context/AuthContext"

export default function AuthCallbackClient() {
  const params = useSearchParams()
  const router = useRouter()
  const { login } = useAuth()

  useEffect(() => {
    const token = params.get("token")

    if (!token) {
      router.replace("/auth")
      return
    }

    login(token)
      .then((user) =>
        router.replace(user?.onboardingCompleted ? "/" : "/onboarding")
      )
      .catch(() => router.replace("/auth"))
  }, [params, login, router])

  return (
    <div className="min-h-screen flex items-center justify-center">
      Signing you in…
    </div>
  )
}
