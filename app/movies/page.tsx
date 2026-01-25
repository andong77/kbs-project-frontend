"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function MoviesPage() {
  const router = useRouter()

  useEffect(() => {
    const token = localStorage.getItem("token")
    if (!token) router.push("/auth/login")
  }, [router])

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">🎬 Movies</h1>
      <p>Here will be your recommendations.</p>
    </div>
  )
}
