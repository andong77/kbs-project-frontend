import { API_BASE } from "@/lib/constants"

export class UnauthorizedError extends Error {
  constructor() {
    super("UNAUTHORIZED")
  }
}

/**
 * JSON API request with optional auth. Use for all backend API calls.
 * @param endpoint - Path after /api (e.g. "/auth/me", "/movies/new")
 * @param method - HTTP method
 * @param body - Optional JSON-serializable body (ignored for GET)
 * @returns Parsed response body, or null for 204
 */
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

  const res = await fetch(`${API_BASE || ""}/api${endpoint}`, {
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

/**
 * FormData API request with optional auth (e.g. file upload). No Content-Type header.
 * @param endpoint - Path after /api
 * @param method - POST, PUT, or PATCH
 * @param formData - FormData to send as body
 * @returns Parsed response body
 */
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

  const res = await fetch(`${API_BASE || ""}/api${endpoint}`, {
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
