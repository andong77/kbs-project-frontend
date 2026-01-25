"use client"

import { useEffect, useState } from "react"

function HeaderLink({ children }: { children: string }) {
  return (
    <a
      href="#"
      className="text-sm font-medium text-white/80 transition hover:text-white"
    >
      {children}
    </a>
  )
}

export function StickyHeader() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <header
      className={[
        "fixed inset-x-0 top-0 z-50",
        "transition-colors duration-300",
        scrolled
          ? "bg-black/90 backdrop-blur supports-[backdrop-filter]:bg-black/70"
          : "bg-transparent",
      ].join(" ")}
    >
      <div className="mx-auto flex h-14 max-w-6xl items-center gap-5 px-4 sm:h-16 sm:px-6">
        <div className="flex items-center gap-3">
          <div className="text-lg font-extrabold tracking-wide text-red-500 sm:text-xl">
            KBSFLIX
          </div>
        </div>

        <nav className="hidden items-center gap-4 sm:flex">
          <HeaderLink>Home</HeaderLink>
          <HeaderLink>TV Shows</HeaderLink>
          <HeaderLink>Movies</HeaderLink>
          <HeaderLink>New & Popular</HeaderLink>
          <HeaderLink>My List</HeaderLink>
          <HeaderLink>Browse by Languages</HeaderLink>
        </nav>

        <div className="ml-auto flex items-center gap-3">
          <button
            type="button"
            className="hidden rounded-md px-2 py-1 text-sm font-medium text-white/80 transition hover:text-white sm:inline-flex"
          >
            Search
          </button>
          <div className="h-8 w-8 rounded bg-white/10 ring-1 ring-white/10" />
        </div>
      </div>
    </header>
  )
}

