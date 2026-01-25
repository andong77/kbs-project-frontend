import { Suspense } from "react"
import ConfirmEmailClient from "./ConfirmEmailClient"

export default function ConfirmEmailPage() {
  return (
    <Suspense fallback={<p>Confirming email...</p>}>
      <ConfirmEmailClient />
    </Suspense>
  )
}
