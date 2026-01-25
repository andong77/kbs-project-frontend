"use client"

import { useMemo, useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/context/AuthContext"

type Mode = "login" | "register"

function cn(...classes: (string | false | undefined | null)[]) {
  return classes.filter(Boolean).join(" ")
}

export default function AuthPage() {
  const [mode, setMode] = useState<Mode>("login")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [showPass, setShowPass] = useState(false)
  const [showConfirmPass, setShowConfirmPass] = useState(false)
  const { login } = useAuth()

  const router = useRouter()

  const apiBase = process.env.NEXT_PUBLIC_API_URL

  const canSubmit = useMemo(() => {
    if (!email.trim() || !password.trim()) return false
    if (mode === "register" && password !== confirmPassword) return false
    return true
  }, [email, password, confirmPassword, mode])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)

    if (!apiBase) {
      setError("Missing NEXT_PUBLIC_API_URL in env.")
      return
    }

    if (mode === "register" && password !== confirmPassword) {
      setError("Passwords do not match.")
      return
    }

    const url =
      mode === "login"
        ? `${apiBase}/api/auth/login`
        : `${apiBase}/api/auth/register`

    const body =
      mode === "login"
        ? { email, password }
        : { email, password, confirmPassword }

    try {
      setLoading(true)

      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      })

      const data = await res.json().catch(() => ({}))

      if (!res.ok) {
        setError(data?.message || "Something went wrong.")
        return
      }

      if (mode === "login") {
        await login(data.token)
        router.replace("/movies")
      } else {
        setError("✅ Check your email to confirm your account.")
      }
    } catch {
      setError("Network error.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-[100dvh] bg-gradient-to-b from-zinc-50 to-white dark:from-zinc-950 dark:to-zinc-950">
      <div className="mx-auto flex min-h-[100dvh] max-w-6xl items-center justify-center px-4 py-10">
        <div className="grid w-full gap-8 lg:grid-cols-2 lg:gap-10">

          {/* Left: Brand / marketing panel */}
          <div className="hidden lg:flex">
            <div className="relative w-full overflow-hidden rounded-3xl border border-zinc-200 bg-white p-10 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
              <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-zinc-100 blur-2xl dark:bg-zinc-900" />
              <div className="absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-zinc-100 blur-2xl dark:bg-zinc-900" />

              <div className="relative">
                <div className="inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-zinc-50 px-3 py-1 text-xs font-medium text-zinc-700 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-200">
                  <span className="h-2 w-2 rounded-full bg-emerald-500" />
                  Secure authentication
                </div>

                <h1 className="mt-5 text-3xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
                  Welcome back.
                </h1>
                <p className="mt-3 max-w-md text-sm leading-6 text-zinc-600 dark:text-zinc-300">
                  Login or create an account in seconds. Mobile-friendly, fast,
                  and clean UI.
                </p>

                <div className="mt-8 grid gap-3 text-sm text-zinc-700 dark:text-zinc-200">
                  <div className="flex items-start gap-3">
                    <div className="mt-0.5 h-6 w-6 flex-none rounded-xl bg-zinc-100 ring-1 ring-zinc-200 dark:bg-zinc-900 dark:ring-zinc-800" />
                    <div>
                      <div className="font-medium">Email confirmation</div>
                      <div className="text-zinc-500 dark:text-zinc-400">
                        Prevent fake signups with token confirmation.
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="mt-0.5 h-6 w-6 flex-none rounded-xl bg-zinc-100 ring-1 ring-zinc-200 dark:bg-zinc-900 dark:ring-zinc-800" />
                    <div>
                      <div className="font-medium">Google sign-in</div>
                      <div className="text-zinc-500 dark:text-zinc-400">
                        One-click auth via your backend route.
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="mt-0.5 h-6 w-6 flex-none rounded-xl bg-zinc-100 ring-1 ring-zinc-200 dark:bg-zinc-900 dark:ring-zinc-800" />
                    <div>
                      <div className="font-medium">Great on mobile</div>
                      <div className="text-zinc-500 dark:text-zinc-400">
                        Touch targets, spacing, and safe-area padding.
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Auth card */}
          <div className="flex items-center justify-center">
            <div className="w-full max-w-md">
              <div className="overflow-hidden rounded-3xl border border-zinc-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
                {/* Header */}
                <div className="border-b border-zinc-200 px-6 py-6 dark:border-zinc-800">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50">
                        {mode === "login" ? "Sign in" : "Create account"}
                      </h2>
                      <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-300">
                        {mode === "login"
                          ? "Use your email and password to continue."
                          : "Register, then confirm your email."}
                      </p>
                    </div>

                    <div className="rounded-full bg-zinc-100 px-2 py-1 text-xs font-medium text-zinc-700 dark:bg-zinc-900 dark:text-zinc-200">
                      {mode === "login" ? "Login" : "Register"}
                    </div>
                  </div>
                </div>

                {/* Body */}
                <div className="px-6 py-6">
                  {error && (
                    <div
                      className={cn(
                        "mb-4 rounded-2xl border px-4 py-3 text-sm",
                        error.startsWith("✅")
                          ? "border-emerald-200 bg-emerald-50 text-emerald-800 dark:border-emerald-900/50 dark:bg-emerald-950/40 dark:text-emerald-200"
                          : "border-red-200 bg-red-50 text-red-800 dark:border-red-900/50 dark:bg-red-950/40 dark:text-red-200"
                      )}
                      role="alert"
                    >
                      {error}
                    </div>
                  )}

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label className="mb-1 block text-sm font-medium text-zinc-800 dark:text-zinc-200">
                        Email
                      </label>
                      <input
                        className="w-full rounded-2xl border border-zinc-200 bg-white px-4 py-3 text-sm text-zinc-900 outline-none ring-0 placeholder:text-zinc-400 focus:border-zinc-300 focus:ring-4 focus:ring-zinc-100 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-50 dark:placeholder:text-zinc-500 dark:focus:border-zinc-700 dark:focus:ring-zinc-900"
                        placeholder="you@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        autoComplete="email"
                        inputMode="email"
                        required
                      />
                    </div>

                    <div>
                      <label className="mb-1 block text-sm font-medium text-zinc-800 dark:text-zinc-200">
                        Password
                      </label>
                      <div className="relative">
                        <input
                          className="w-full rounded-2xl border border-zinc-200 bg-white px-4 py-3 pr-20 text-sm text-zinc-900 outline-none placeholder:text-zinc-400 focus:border-zinc-300 focus:ring-4 focus:ring-zinc-100 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-50 dark:placeholder:text-zinc-500 dark:focus:border-zinc-700 dark:focus:ring-zinc-900"
                          type={showPass ? "text" : "password"}
                          placeholder="••••••••"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          autoComplete={
                            mode === "login" ? "current-password" : "new-password"
                          }
                          required
                        />
                        <button
                          type="button"
                          onClick={() => setShowPass((s) => !s)}
                          className="absolute right-2 top-1/2 -translate-y-1/2 rounded-xl px-3 py-2 text-xs font-medium text-zinc-700 hover:bg-zinc-100 dark:text-zinc-200 dark:hover:bg-zinc-900"
                        >
                          {showPass ? "Hide" : "Show"}
                        </button>
                      </div>
                    </div>

                    {mode === "register" && (
                      <div>
                        <label className="mb-1 block text-sm font-medium text-zinc-800 dark:text-zinc-200">
                          Confirm password
                        </label>
                        <div className="relative">
                          <input
                            className={cn(
                              "w-full rounded-2xl border bg-white px-4 py-3 pr-20 text-sm text-zinc-900 outline-none placeholder:text-zinc-400 focus:ring-4 dark:bg-zinc-950 dark:text-zinc-50 dark:placeholder:text-zinc-500",
                              confirmPassword &&
                                password !== confirmPassword
                                ? "border-red-300 focus:border-red-400 focus:ring-red-100 dark:border-red-900/60 dark:focus:border-red-900 dark:focus:ring-red-950/40"
                                : "border-zinc-200 focus:border-zinc-300 focus:ring-zinc-100 dark:border-zinc-800 dark:focus:border-zinc-700 dark:focus:ring-zinc-900"
                            )}
                            type={showConfirmPass ? "text" : "password"}
                            placeholder="••••••••"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            autoComplete="new-password"
                            required
                          />
                          <button
                            type="button"
                            onClick={() => setShowConfirmPass((s) => !s)}
                            className="absolute right-2 top-1/2 -translate-y-1/2 rounded-xl px-3 py-2 text-xs font-medium text-zinc-700 hover:bg-zinc-100 dark:text-zinc-200 dark:hover:bg-zinc-900"
                          >
                            {showConfirmPass ? "Hide" : "Show"}
                          </button>
                        </div>

                        {confirmPassword && password !== confirmPassword && (
                          <p className="mt-2 text-xs text-red-600 dark:text-red-300">
                            Passwords must match.
                          </p>
                        )}
                      </div>
                    )}

                    <button
                      disabled={!canSubmit || loading}
                      className={cn(
                        "mt-2 inline-flex w-full items-center justify-center rounded-2xl px-4 py-3 text-sm font-semibold transition",
                        !canSubmit || loading
                          ? "cursor-not-allowed bg-zinc-200 text-zinc-500 dark:bg-zinc-900 dark:text-zinc-500"
                          : "bg-zinc-900 text-white hover:bg-zinc-800 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-200"
                      )}
                    >
                      {loading ? (
                        <span className="inline-flex items-center gap-2">
                          <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                          {mode === "login" ? "Signing in..." : "Creating..."}
                        </span>
                      ) : mode === "login" ? (
                        "Sign in"
                      ) : (
                        "Create account"
                      )}
                    </button>
                  </form>

                  {/* Divider */}
                  <div className="my-6 flex items-center gap-4">
                    <div className="h-px flex-1 bg-zinc-200 dark:bg-zinc-800" />
                    <span className="text-xs text-zinc-500">OR</span>
                    <div className="h-px flex-1 bg-zinc-200 dark:bg-zinc-800" />
                  </div>

                  {/* Google */}
                  <a
                    href={
                      apiBase ? `${apiBase}/api/auth/google` : "#"
                    }
                    className={cn(
                      "flex w-full items-center justify-center gap-2 rounded-2xl border px-4 py-3 text-sm font-semibold transition",
                      apiBase
                        ? "border-zinc-200 bg-white text-zinc-900 hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-50 dark:hover:bg-zinc-900"
                        : "cursor-not-allowed border-zinc-200 bg-zinc-100 text-zinc-400 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-500"
                    )}
                    aria-disabled={!apiBase}
                  >
                    <span className="h-5 w-5 rounded bg-zinc-200 dark:bg-zinc-800" />
                    Continue with Google
                  </a>

                  {/* Footer switch */}
                  <div className="mt-6 text-center text-sm text-zinc-600 dark:text-zinc-300">
                    {mode === "login" ? (
                      <>
                        Don’t have an account?{" "}
                        <button
                          onClick={() => {
                            setMode("register")
                            setError(null)
                          }}
                          className="font-semibold text-zinc-900 underline-offset-4 hover:underline dark:text-white"
                        >
                          Register
                        </button>
                      </>
                    ) : (
                      <>
                        Already have an account?{" "}
                        <button
                          onClick={() => {
                            setMode("login")
                            setError(null)
                          }}
                          className="font-semibold text-zinc-900 underline-offset-4 hover:underline dark:text-white"
                        >
                          Login
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>

              <p className="mt-6 px-2 text-center text-xs text-zinc-500 dark:text-zinc-400">
                By continuing, you agree to our{" "}
                <span className="underline underline-offset-4">Terms</span> and{" "}
                <span className="underline underline-offset-4">Privacy Policy</span>.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
