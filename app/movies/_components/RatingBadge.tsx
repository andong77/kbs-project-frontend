import { StarIcon } from "./icons"

export function RatingBadge({ rating }: { rating: number }) {
  return (
    <div className="inline-flex items-center gap-1 rounded-full bg-black/55 px-2 py-1 text-xs font-semibold text-white ring-1 ring-white/10 backdrop-blur">
      <StarIcon className="h-3.5 w-3.5 text-yellow-400" />
      <span>{rating.toFixed(1)}</span>
    </div>
  )
}

