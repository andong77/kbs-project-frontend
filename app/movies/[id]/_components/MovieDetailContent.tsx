"use client"

import Link from "next/link"
import type { ApiMovie } from "@/types/movie"
import { formatCurrency } from "@/lib/movieUtils"

interface MovieDetailContentProps {
  movie: ApiMovie
  onBack: () => void
}

export default function MovieDetailContent({ movie, onBack }: MovieDetailContentProps) {
  const hasBudget = movie.budget != null && movie.budget !== undefined
  const hasRevenue = movie.revenue != null && movie.revenue !== undefined

  return (
    <>
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16">
        <div className="grid gap-12 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-8">
            {movie.overview && (
              <section>
                <h2 className="mb-4 text-2xl font-bold">Overview</h2>
                <p className="text-base leading-relaxed text-white/90 sm:text-lg">
                  {movie.overview}
                </p>
              </section>
            )}

            <section className="grid gap-6 sm:grid-cols-2">
              {movie.originalLanguage && (
                <div>
                  <h3 className="mb-1 text-sm font-semibold text-white/60 uppercase tracking-wide">
                    Original Language
                  </h3>
                  <p className="text-base font-medium text-white">
                    {movie.originalLanguage.toUpperCase()}
                  </p>
                </div>
              )}
              {movie.releaseDate && (
                <div>
                  <h3 className="mb-1 text-sm font-semibold text-white/60 uppercase tracking-wide">
                    Release Date
                  </h3>
                  <p className="text-base font-medium text-white">
                    {new Date(movie.releaseDate).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                </div>
              )}
              {hasBudget && (
                <div>
                  <h3 className="mb-1 text-sm font-semibold text-white/60 uppercase tracking-wide">
                    Budget
                  </h3>
                  <p className="text-base font-medium text-white">
                    {formatCurrency(movie.budget!)}
                  </p>
                </div>
              )}
              {hasRevenue && (
                <div>
                  <h3 className="mb-1 text-sm font-semibold text-white/60 uppercase tracking-wide">
                    Revenue
                  </h3>
                  <p className="text-base font-medium text-white">
                    {formatCurrency(movie.revenue!)}
                  </p>
                </div>
              )}
            </section>
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6 rounded-2xl border border-white/10 bg-neutral-900/50 p-6 backdrop-blur">
              <div>
                <h3 className="mb-3 text-sm font-semibold text-white/60 uppercase tracking-wide">
                  Quick Info
                </h3>
                <dl className="space-y-3">
                  {movie.runtimeMinutes != null && (
                    <div>
                      <dt className="text-xs text-white/50">Runtime</dt>
                      <dd className="text-sm font-medium text-white">
                        {Math.floor(movie.runtimeMinutes / 60)}h {movie.runtimeMinutes % 60}m
                      </dd>
                    </div>
                  )}
                  {movie.releaseYear != null && (
                    <div>
                      <dt className="text-xs text-white/50">Year</dt>
                      <dd className="text-sm font-medium text-white">{movie.releaseYear}</dd>
                    </div>
                  )}
                  {movie.voteAverage > 0 && (
                    <div>
                      <dt className="text-xs text-white/50">Rating</dt>
                      <dd className="text-sm font-medium text-white">
                        {movie.voteAverage.toFixed(1)} / 10
                      </dd>
                    </div>
                  )}
                  {movie.adult !== undefined && (
                    <div>
                      <dt className="text-xs text-white/50">Content Rating</dt>
                      <dd className="text-sm font-medium text-white">
                        {movie.adult ? "R" : "PG"}
                      </dd>
                    </div>
                  )}
                </dl>
              </div>

              {movie.homepage && (
                <div>
                  <Link
                    href={movie.homepage}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex w-full items-center justify-center gap-2 rounded-lg border border-white/20 bg-white/5 px-4 py-2 text-sm font-medium text-white transition hover:bg-white/10"
                  >
                    Official Website
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 pb-8 sm:px-6">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center gap-2 text-sm font-medium text-white/70 transition hover:text-white"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Back
        </button>
      </div>
    </>
  )
}
