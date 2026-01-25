/* eslint-disable @typescript-eslint/no-explicit-any */

const API_BASE = process.env.NEXT_PUBLIC_API_URL

class UnauthorizedError extends Error {
  constructor() {
    super("UNAUTHORIZED")
  }
}

export async function apiFetch<T = any>(
  endpoint: string,
  method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" = "GET",
  body?: any
): Promise<T> {
  const token =
    typeof window !== "undefined"
      ? localStorage.getItem("authToken")
      : null

  const headers: HeadersInit = {
    "Content-Type": "application/json",
  }

  if (token) {
    headers.Authorization = `Bearer ${token}`
  }

  const res = await fetch(`${API_BASE}/api${endpoint}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  })

  if (res.status === 401) {
    throw new UnauthorizedError()
  }

  if (!res.ok) {
    const error = await res.json().catch(() => ({
      message: "Unknown error",
    }))
    throw new Error(error.message || `API error ${res.status}`)
  }

  if (res.status === 204) {
    return null as T
  }

  return res.json()
}

export async function apiFetchForm<T = any>(
  endpoint: string,
  method: "POST" | "PUT" | "PATCH",
  formData: FormData
): Promise<T> {
  const token =
    typeof window !== "undefined"
      ? localStorage.getItem("authToken")
      : null

  const headers: HeadersInit = {}

  if (token) {
    headers.Authorization = `Bearer ${token}`
  }

  const res = await fetch(`${API_BASE}/api${endpoint}`, {
    method,
    headers,
    body: formData,
  })

  if (res.status === 401) {
    throw new UnauthorizedError()
  }

  if (!res.ok) {
    const error = await res.json().catch(() => ({
      message: "Unknown error",
    }))
    throw new Error(error.message || `API error ${res.status}`)
  }

  return res.json()
}

export { UnauthorizedError }
