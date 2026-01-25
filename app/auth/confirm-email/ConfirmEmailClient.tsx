"use client"

import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"

function cn(...classes: (string | false | undefined | null)[]) {
  return classes.filter(Boolean).join(" ")
}

export default function ConfirmEmailClient() {
  const params = useSearchParams()
  const token = params.get("token")
  const router = useRouter()

  const [status, setStatus] = useState<"loading" | "success" | "error">("loading")
  const [message, setMessage] = useState("Confirming email...")

  const apiBase = process.env.NEXT_PUBLIC_API_URL

  useEffect(() => {
    if (!apiBase) {
      setStatus("error")
      setMessage("Missing NEXT_PUBLIC_API_URL in env.")
      return
    }

    if (!token) {
      setStatus("error")
      setMessage("❌ Invalid confirmation link.")
      return
    }

    fetch(`${apiBase}/api/auth/confirm-email`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token }),
    })
      .then(async (res) => {
        const data = await res.json().catch(() => ({}))
        if (!res.ok) throw new Error(data?.message || "Confirmation failed")
        setStatus("success")
        setMessage("✅ Email confirmed. You can login now.")
      })
      .catch((err) => {
        setStatus("error")
        setMessage("❌ " + (err?.message || "Confirmation failed"))
      })
  }, [token, apiBase])

  return (
    <div className="min-h-[100dvh] grid place-items-center bg-gradient-to-b from-zinc-50 to-white dark:from-zinc-950 dark:to-zinc-950 px-4">
      <div className="w-full max-w-md overflow-hidden rounded-3xl border border-zinc-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
        <div className="border-b border-zinc-200 px-6 py-6 dark:border-zinc-800">
          <h1 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50">
            Email confirmation
          </h1>
          <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-300">
            We’re verifying your account.
          </p>
        </div>

        <div className="px-6 py-6">
          <div
            className={cn(
              "rounded-2xl border px-4 py-3 text-sm",
              status === "loading" &&
                "border-zinc-200 bg-zinc-50 text-zinc-700 dark:border-zinc-800 dark:bg-zinc-900/30 dark:text-zinc-200",
              status === "success" &&
                "border-emerald-200 bg-emerald-50 text-emerald-800 dark:border-emerald-900/50 dark:bg-emerald-950/40 dark:text-emerald-200",
              status === "error" &&
                "border-red-200 bg-red-50 text-red-800 dark:border-red-900/50 dark:bg-red-950/40 dark:text-red-200"
            )}
          >
            <div className="flex items-start gap-3">
              {status === "loading" ? (
                <span className="mt-0.5 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
              ) : (
                <span className="mt-0.5 h-4 w-4 rounded bg-current/20" />
              )}
              <p>{message}</p>
            </div>
          </div>

          <div className="mt-6 flex gap-3">
            <button
              onClick={() => router.push("/auth")}
              className="flex-1 rounded-2xl bg-zinc-900 px-4 py-3 text-sm font-semibold text-white hover:bg-zinc-800 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-200"
            >
              Go to login
            </button>

            <button
              onClick={() => router.back()}
              className="rounded-2xl border border-zinc-200 px-4 py-3 text-sm font-semibold text-zinc-900 hover:bg-zinc-50 dark:border-zinc-800 dark:text-zinc-50 dark:hover:bg-zinc-900"
            >
              Back
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
