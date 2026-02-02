export type User = {
  id: string
  email: string
  role?: string
  onboardingCompleted?: boolean
}

export type AuthResponse = {
  user: {
    id: string
    email: string
  }
  token: string
}

export type ApiError = {
  message: string
}
