"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/context/AuthContext"

export default function MoviesPage() {
  const { status, user } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (status === "guest") {
      router.replace("/auth")
    }
  }, [status, router])

  if (status === "loading") {
    return <p className="p-6">Loading…</p>
  }

  if (status !== "authenticated") {
    return null
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">🎬 Movies</h1>
      <p>Welcome {user?.email}</p>
    </div>
  )
}
