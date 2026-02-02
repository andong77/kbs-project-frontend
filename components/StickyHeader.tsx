"use client"

import { useEffect, useRef, useState, useCallback } from "react"
import Link from "next/link"
import { useAuth } from "@/context/AuthContext"
import { ChevronDownIcon, CogIcon, ArrowRightOnSquareIcon } from "@/app/movies/_components/icons"
import { searchMovies } from "@/lib/moviesApi"
import type { ApiMovie } from "@/types/movie"
import { posterUrl } from "@/lib/movieUtils"
import Image from "next/image"

const SEARCH_DEBOUNCE_MS = 500

function getFirstNameFromEmail(email: string | null | undefined): string {
  if (!email?.trim()) return "?"
  const local = email.split("@")[0]?.trim()
  if (!local) return "?"
  const first = local.split(/[-._0-9]+/)[0]?.trim()
  if (!first) return local.slice(0, 1).toUpperCase()
  return first.charAt(0).toUpperCase() + first.slice(1).toLowerCase()
}

function HeaderLink({
  href,
  children,
  onClick,
  className = "",
}: {
  href: string
  children: string
  onClick?: () => void
  className?: string
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={`text-sm font-medium text-white/80 transition hover:text-white ${className}`}
    >
      {children}
    </Link>
  )
}

function Bars3Icon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
    </svg>
  )
}

export function StickyHeader() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [mobileNavOpen, setMobileNavOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [searchResults, setSearchResults] = useState<ApiMovie[]>([])
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchLoading, setSearchLoading] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)
  const mobileNavRef = useRef<HTMLDivElement>(null)
  const searchRef = useRef<HTMLDivElement>(null)
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const { user, logout } = useAuth()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useEffect(() => {
    if (!menuOpen) return
    const onOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node))
        setMenuOpen(false)
    }
    document.addEventListener("click", onOutside)
    return () => document.removeEventListener("click", onOutside)
  }, [menuOpen])

  useEffect(() => {
    if (!mobileNavOpen) return
    const onOutside = (e: MouseEvent) => {
      if (mobileNavRef.current && !mobileNavRef.current.contains(e.target as Node))
        setMobileNavOpen(false)
    }
    document.addEventListener("click", onOutside)
    return () => document.removeEventListener("click", onOutside)
  }, [mobileNavOpen])

  useEffect(() => {
    if (!searchOpen) return
    const onOutside = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node))
        setSearchOpen(false)
    }
    document.addEventListener("click", onOutside)
    return () => document.removeEventListener("click", onOutside)
  }, [searchOpen])

  const runSearch = useCallback((q: string) => {
    if (!q.trim()) {
      setSearchResults([])
      return
    }
    setSearchLoading(true)
    searchMovies(q.trim(), 12)
      .then(setSearchResults)
      .catch(() => setSearchResults([]))
      .finally(() => setSearchLoading(false))
  }, [])

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current)
    if (!searchQuery.trim()) {
      setSearchResults([])
      setSearchLoading(false)
      return
    }
    debounceRef.current = setTimeout(() => {
      runSearch(searchQuery)
      debounceRef.current = null
    }, SEARCH_DEBOUNCE_MS)
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current)
    }
  }, [searchQuery, runSearch])

  return (
    <header
      className={[
        "fixed inset-x-0 top-0 z-50",
        "transition-colors duration-300",
        scrolled
          ? "bg-black/90 backdrop-blur supports-backdrop-filter:bg-black/70"
          : "bg-transparent",
      ].join(" ")}
    >
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between gap-2 px-3 sm:h-16 sm:gap-6 sm:px-6">
        {/* Left: logo  + desktop nav */}
        <div className="flex shrink-0 items-center gap-3 sm:gap-8">
          <Link href="/" className="shrink-0 min-w-0">
            <span className="truncate text-base font-extrabold tracking-wide text-red-500 sm:text-lg md:text-xl">
              KBSFLIX
            </span>
          </Link>
          <nav className="hidden items-center gap-6 sm:flex">
            <HeaderLink href="/">Home</HeaderLink>
            <HeaderLink href="/movies">Movies</HeaderLink>
          </nav>
        </div>

        {/* Center: search */}
        <div className="relative min-w-0 flex-1 max-w-xl px-2 sm:px-4" ref={searchRef}>
          <input
            type="search"
            placeholder="Search…"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => setSearchOpen(true)}
            className="w-full rounded-full border border-white/20 bg-white/10 px-3 py-2 text-sm text-white placeholder:text-white/50 outline-none transition focus:border-white/40 focus:bg-white/15 focus:ring-2 focus:ring-white/20 sm:px-4 sm:py-2.5"
            aria-label="Search movies"
            aria-expanded={searchOpen}
            aria-autocomplete="list"
          />
          {(searchOpen && (searchQuery.trim() || searchResults.length > 0 || searchLoading)) && (
            <div
              className="absolute left-0 right-0 top-full mt-2 max-h-[70vh] overflow-auto rounded-xl border border-white/10 bg-black/95 py-2 shadow-xl backdrop-blur sm:max-h-96"
              role="listbox"
            >
              {searchLoading ? (
                <div className="flex items-center justify-center gap-2 px-4 py-6 text-sm text-white/70">
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                  Searching…
                </div>
              ) : searchResults.length === 0 && searchQuery.trim() ? (
                <p className="px-4 py-3 text-sm text-white/60">No movies found.</p>
              ) : (
                <ul className="py-1">
                  {searchResults.map((m) => {
                    const poster = posterUrl(m.posterPath ?? null)
                    return (
                      <li key={m.id}>
                        <Link
                          href={`/movies/${m.id}`}
                          onClick={() => {
                            setSearchOpen(false)
                            setSearchQuery("")
                          }}
                          className="flex items-center gap-3 px-4 py-2.5 text-left text-sm text-white/90 transition hover:bg-white/10 hover:text-white"
                          role="option"
                        >
                          {poster ? (
                            <div className="relative h-10 w-7 shrink-0 overflow-hidden rounded bg-neutral-800">
                              <Image
                                src={poster}
                                alt=""
                                fill
                                sizes="28px"
                                className="object-cover"
                              />
                            </div>
                          ) : (
                            <div className="h-10 w-7 shrink-0 rounded bg-neutral-800" />
                          )}
                          <span className="min-w-0 truncate">
                            {m.title}
                            {m.releaseYear != null && (
                              <span className="ml-1 text-white/50">({m.releaseYear})</span>
                            )}
                          </span>
                        </Link>
                      </li>
                    )
                  })}
                </ul>
              )}
            </div>
          )}
        </div>

        {/* Mobile: hamburger nav */}
        <div className="relative sm:hidden" ref={mobileNavRef}>
          <button
            type="button"
            onClick={() => setMobileNavOpen((o) => !o)}
            className="flex h-10 w-10 items-center justify-center rounded-lg text-white/90 transition hover:bg-white/10 hover:text-white focus:outline-none focus:ring-2 focus:ring-white/30"
            aria-expanded={mobileNavOpen}
            aria-label="Open menu"
          >
            <Bars3Icon className="h-6 w-6" />
          </button>
          {mobileNavOpen && (
            <div
              className="absolute right-0 top-full z-50 mt-1 w-44 rounded-xl border border-white/10 bg-black/95 py-1.5 shadow-xl backdrop-blur"
              role="menu"
            >
              <HeaderLink
                href="/"
                onClick={() => setMobileNavOpen(false)}
                className="block px-4 py-2.5"
              >
                Home
              </HeaderLink>
              <HeaderLink
                href="/movies"
                onClick={() => setMobileNavOpen(false)}
                className="block px-4 py-2.5"
              >
                Movies
              </HeaderLink>
              <div className="my-1 border-t border-white/10" />
              <Link
                href="/settings"
                onClick={() => setMobileNavOpen(false)}
                className="block px-4 py-2.5 text-sm font-medium text-white/90 transition hover:bg-white/10 hover:text-white"
              >
                Settings
              </Link>
              <button
                type="button"
                onClick={() => {
                  setMobileNavOpen(false)
                  logout()
                }}
                className="block w-full px-4 py-2.5 text-left text-sm font-medium text-white/90 transition hover:bg-white/10 hover:text-white"
              >
                Log out
              </button>
            </div>
          )}
        </div>

        {/* Right: account (desktop only on mobile use hamburger menu) */}
        <div className="relative hidden shrink-0 sm:block" ref={menuRef}>
          <button
            type="button"
            onClick={() => setMenuOpen((o) => !o)}
            className="flex min-h-[44px] min-w-[44px] items-center gap-2.5 rounded-full border border-white/10 bg-white/5 py-2 pl-2 pr-3 text-sm font-medium text-white/90 transition hover:bg-white/10 hover:text-white focus:outline-none focus:ring-2 focus:ring-white/30"
            aria-expanded={menuOpen}
            aria-haspopup="true"
          >
            <span
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-red-600 text-sm font-semibold text-white"
              aria-hidden
            >
              {getFirstNameFromEmail(user?.email ?? null).slice(0, 1)}
            </span>
            <span className="hidden max-w-[6rem] truncate sm:inline sm:max-w-[8rem]">
              {getFirstNameFromEmail(user?.email ?? null)}
            </span>
            <ChevronDownIcon
              className={`h-4 w-4 shrink-0 text-white/60 transition ${menuOpen ? "rotate-180" : ""}`}
            />
          </button>

          {menuOpen && (
            <div
              className="absolute right-0 top-full z-50 mt-2 w-52 rounded-xl border border-white/10 bg-black/95 py-1.5 shadow-xl backdrop-blur"
              role="menu"
            >
              <Link
                href="/settings"
                role="menuitem"
                onClick={() => setMenuOpen(false)}
                className="flex items-center gap-3 px-4 py-2.5 text-sm text-white/90 transition hover:bg-white/10 hover:text-white"
              >
                <CogIcon className="h-4 w-4 shrink-0 text-white/70" />
                Settings
              </Link>
              <button
                type="button"
                role="menuitem"
                onClick={() => {
                  setMenuOpen(false)
                  logout()
                }}
                className="flex w-full items-center gap-3 px-4 py-2.5 text-left text-sm text-white/90 transition hover:bg-white/10 hover:text-white"
              >
                <ArrowRightOnSquareIcon className="h-4 w-4 shrink-0 text-white/70" />
                Log out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
