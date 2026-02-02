import "./globals.css"
import { AuthProvider } from "@/context/AuthContext"
import { AppShell } from "@/components/AppShell"

export const metadata = {
  title: "KBS Movie Recommender",
  description: "Personalized movie recommendations",
  icons: {
    icon: "/favicon.ico",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html>
      <body>
        <AuthProvider>
          <AppShell>{children}</AppShell>
        </AuthProvider>
      </body>
    </html>
  )
}
