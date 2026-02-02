"use client"

import { usePathname } from "next/navigation"
import { StickyHeader } from "@/components/StickyHeader"

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isAuth = pathname?.startsWith("/auth")

  return (
    <>
      {!isAuth && <StickyHeader />}
      {children}
    </>
  )
}
