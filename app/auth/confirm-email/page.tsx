import { Suspense } from "react"
import ConfirmEmailClient from "./ConfirmEmailClient"

export default function ConfirmEmailPage() {
  return (
    <Suspense fallback={<ConfirmEmailSkeleton />}>
      <ConfirmEmailClient />
    </Suspense>
  )
}

function ConfirmEmailSkeleton() {
  return (
    <div className="min-h-[100dvh] grid place-items-center bg-gradient-to-b from-zinc-50 to-white dark:from-zinc-950 dark:to-zinc-950 px-4">
      <div className="w-full max-w-md rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
        <div className="h-5 w-40 rounded bg-zinc-200 dark:bg-zinc-800" />
        <div className="mt-4 h-4 w-full rounded bg-zinc-200 dark:bg-zinc-800" />
        <div className="mt-2 h-4 w-3/4 rounded bg-zinc-200 dark:bg-zinc-800" />
        <div className="mt-6 h-10 w-full rounded-2xl bg-zinc-200 dark:bg-zinc-800" />
      </div>
    </div>
  )
}
