"use client"

import { useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"

export default function ConfirmEmailClient() {
  const params = useSearchParams()
  const token = params.get("token")
  const [message, setMessage] = useState("Confirming email...")

  useEffect(() => {
    if (!token) {
      setMessage("❌ Invalid confirmation link")
      return
    }

    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/confirm-email`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token }),
    })
      .then(async (res) => {
        const data = await res.json()
        if (!res.ok) throw new Error(data.message || "Confirmation failed")
        setMessage("✅ Email confirmed. You can login now.")
      })
      .catch((err) => setMessage("❌ " + err.message))
  }, [token])

  return (
    <div className="min-h-screen flex items-center justify-center">
      <p>{message}</p>
    </div>
  )
}
