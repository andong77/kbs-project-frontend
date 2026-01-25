"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

type AuthStatus = "loading" | "authenticated" | "guest"

export function useRequireAuth(status: AuthStatus, redirectTo = "/auth") {
  const router = useRouter()

  useEffect(() => {
    if (status === "guest") {
      router.replace(redirectTo)
    }
  }, [status, router, redirectTo])
}

