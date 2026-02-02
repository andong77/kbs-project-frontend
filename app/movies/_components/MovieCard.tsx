"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import type { Movie } from "@/types/movie"
import { toggleMovieEvent, type EventType } from "@/lib/moviesApi"
import { RatingBadge } from "./RatingBadge"
import { HandThumbUpIcon, HandThumbDownIcon } from "./icons"

function cn(...classes: (string | false | undefined)[]) {
  return classes.filter(Boolean).join(" ")
}

type MovieCardProps = {
  movie: Movie
  onEventToggled?: () => void
}

export function MovieCard({ movie, onEventToggled }: MovieCardProps) {
  const poster = movie.posterUrl
  const [loading, setLoading] = useState(false)
  const [liked, setLiked] = useState(movie.liked ?? false)
  const [disliked, setDisliked] = useState(movie.disliked ?? false)

  useEffect(() => {
    setLiked(movie.liked ?? false)
    setDisliked(movie.disliked ?? false)
  }, [movie.id, movie.liked, movie.disliked])

  async function handleEvent(type: EventType) {
    if (loading) return
    setLoading(true)
    try {
      const res = await toggleMovieEvent(movie.id, type)
      if (type === "LIKE") setLiked(res.active)
      if (type === "DISLIKE") setDisliked(res.active)
      onEventToggled?.()
    } finally {
      setLoading(false)
    }
  }

  return (
    <article className="group snap-start w-40 shrink-0 sm:w-56">
      <Link
        href={`/movies/${movie.id}`}
        className="relative block aspect-video overflow-hidden rounded-md bg-neutral-900 ring-1 ring-white/10 transition duration-200 sm:rounded"
      >
        {poster ? (
          <Image
            src={poster}
            alt={`${movie.title} poster`}
            fill
            sizes="(max-width: 640px) 160px, 224px"
            className="object-cover transition duration-200 group-hover:scale-[1.06]"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-neutral-700 via-neutral-900 to-black">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.14),transparent_55%)]" />
          </div>
        )}

        <div className="absolute left-2 top-2">
          <RatingBadge rating={movie.rating} />
        </div>

        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent opacity-0 transition duration-200 group-hover:opacity-100" />

        <div className="absolute bottom-0 left-0 right-0 flex items-center justify-end gap-1 p-2 opacity-0 transition duration-200 group-hover:opacity-100">
          {onEventToggled ? (
            <>
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault()
                  void handleEvent("LIKE")
                }}
                disabled={loading}
                className={cn(
                  "rounded-full p-1.5 transition disabled:opacity-50",
                  liked
                    ? "bg-green-600/90 text-white hover:bg-green-500/90"
                    : "text-white/80 hover:bg-white/20 hover:text-white"
                )}
                title="Like"
                aria-label="Like"
              >
                <HandThumbUpIcon className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault()
                  void handleEvent("DISLIKE")
                }}
                disabled={loading}
                className={cn(
                  "rounded-full p-1.5 transition disabled:opacity-50",
                  disliked
                    ? "bg-red-600/90 text-white hover:bg-red-500/90"
                    : "text-white/80 hover:bg-white/20 hover:text-white"
                )}
                title="Dislike"
                aria-label="Dislike"
              >
                <HandThumbDownIcon className="h-4 w-4" />
              </button>
            </>
          ) : null}
          <span className="line-clamp-1 flex-1 text-left text-xs font-semibold text-white">
            {movie.title}
          </span>
        </div>
      </Link>
    </article>
  )
}
