"use client"

/**
 * Error state for the movie details page when the movie is unavailable or fetch fails.
 */

interface MovieDetailErrorProps {
  message: string
  onBack: () => void
}

export default function MovieDetailError({ message, onBack }: MovieDetailErrorProps) {
  return (
    <div className="min-h-screen bg-neutral-950 text-white flex items-center justify-center px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold mb-3">Movie not available</h1>
        <p className="text-sm text-white/70 mb-6">{message}</p>
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center justify-center rounded-full bg-white px-5 py-2 text-sm font-semibold text-black hover:bg-white/90"
        >
          Back to Home
        </button>
      </div>
    </div>
  )
}
