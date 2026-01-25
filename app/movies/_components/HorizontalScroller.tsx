import type { ReactNode } from "react"

export function HorizontalScroller({ children }: { children: ReactNode }) {
  return (
    <div className="no-scrollbar mt-3 -mx-4 overflow-x-auto overscroll-x-contain px-4 pb-2 sm:-mx-6 sm:mt-4 sm:px-6">
      <div className="flex snap-x snap-mandatory gap-3 sm:gap-4">
        {children}
      </div>
    </div>
  )
}

