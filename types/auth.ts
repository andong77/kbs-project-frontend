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
