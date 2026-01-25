"use client"

import {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useState,
} from "react"
import { useRouter } from "next/navigation"
import { apiFetch, UnauthorizedError } from "@/utils/apiFetch"


export type User = {
    id: string
    email: string
    role?: string
}

type AuthStatus = "loading" | "authenticated" | "guest"

type AuthContextType = {
    user: User | null
    status: AuthStatus
    login: (token: string) => Promise<User>
    logout: () => void
    refreshUser: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const router = useRouter()
    const [user, setUser] = useState<User | null>(null)
    const [status, setStatus] = useState<AuthStatus>("loading")

    // Bootstrap auth ONCE
    useEffect(() => {
        const token = localStorage.getItem("authToken")

        if (!token) {
            setStatus("guest")
            return
        }

        apiFetch<User>("/auth/me")
            .then((userData) => {
                setUser(userData)
                setStatus("authenticated")
            })
            .catch(() => {
                clearAuth()
                setStatus("guest")
            })
    }, [])

    const clearAuth = useCallback(() => {
        localStorage.removeItem("authToken")
        setUser(null)
    }, [])

    const login = async (token: string) => {
        localStorage.setItem("authToken", token)

        const userData = await apiFetch<User>("/auth/me")

        setUser(userData)
        setStatus("authenticated")

        return userData
    }

    const logout = useCallback(() => {
        clearAuth()
        setStatus("guest")
        router.replace("/auth")
    }, [router, clearAuth])

    const refreshUser = useCallback(async () => {
        try {
            const userData = await apiFetch<User>("/auth/me")
            setUser(userData)
            setStatus("authenticated")
        } catch (err) {
            if (err instanceof UnauthorizedError) {
                logout()
            }
        }
    }, [logout])


    return (
        <AuthContext.Provider
            value={{
                user,
                status,
                login,
                logout,
                refreshUser,
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    const ctx = useContext(AuthContext)
    if (!ctx) throw new Error("useAuth must be used inside <AuthProvider>")
    return ctx
}
