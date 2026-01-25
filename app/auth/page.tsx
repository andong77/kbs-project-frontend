"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

type Mode = "login" | "register"

export default function AuthPage() {
  const [mode, setMode] = useState<Mode>("login")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [error, setError] = useState<string | null>(null)

  const router = useRouter()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)

    const url =
      mode === "login"
        ? `${process.env.NEXT_PUBLIC_API_URL}/api/auth/login`
        : `${process.env.NEXT_PUBLIC_API_URL}/api/auth/register`

    const body =
      mode === "login"
        ? { email, password }
        : { email, password, confirmPassword }

    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    })

    const data = await res.json()

    if (!res.ok) {
      setError(data.message)
      return
    }

    // login → имаме token
    if (mode === "login") {
      localStorage.setItem("token", data.token)
      router.push("/movies")
    } else {
      // register → чекаме email confirm
      setError("✅ Check your email to confirm your account")
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded-xl w-80 shadow">
        <h1 className="text-xl font-bold mb-4 text-center">
          {mode === "login" ? "Login" : "Register"}
        </h1>

        {error && (
          <p className="text-sm text-red-500 mb-3 text-center">{error}</p>
        )}

        <form onSubmit={handleSubmit}>
          <input
            className="border w-full mb-2 p-2 rounded"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            className="border w-full mb-2 p-2 rounded"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {mode === "register" && (
            <input
              className="border w-full mb-2 p-2 rounded"
              type="password"
              placeholder="Confirm password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          )}

          <button className="bg-blue-600 text-white w-full py-2 rounded mt-2">
            {mode === "login" ? "Login" : "Register"}
          </button>
        </form>

        <div className="my-4 text-center text-sm text-gray-500">or</div>

        <a
          href={`${process.env.NEXT_PUBLIC_API_URL}/api/auth/google`}
          className="block text-center border py-2 rounded hover:bg-gray-50"
        >
          Continue with Google
        </a>

        <button
          onClick={() =>
            setMode(mode === "login" ? "register" : "login")
          }
          className="text-sm text-blue-600 mt-4 block mx-auto"
        >
          {mode === "login"
            ? "No account? Register"
            : "Already have an account? Login"}
        </button>
      </div>
    </div>
  )
}
