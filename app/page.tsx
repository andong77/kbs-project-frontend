"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/context/AuthContext"

export default function HomePage() {
  const { status } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (status === "authenticated") router.replace("/movies")
    if (status === "guest") router.replace("/auth")
  }, [status, router])

  return null
}
