import Image from "next/image"
import type { Movie } from "@/types/movie"
import { RatingBadge } from "./RatingBadge"

export function MovieCard({ movie }: { movie: Movie }) {
  const poster = movie.posterUrl

  return (
    <article className="group snap-start w-40 shrink-0 sm:w-56">
      <div className="relative aspect-video overflow-hidden rounded-md bg-neutral-900 ring-1 ring-white/10 transition duration-200 sm:rounded">
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

        <div className="pointer-events-none absolute bottom-0 left-0 right-0 p-2 opacity-0 transition duration-200 group-hover:opacity-100">
          <div className="line-clamp-1 text-xs font-semibold text-white">
            {movie.title}
          </div>
        </div>
      </div>
    </article>
  )
}

