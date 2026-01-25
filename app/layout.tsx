import "./globals.css"

export const metadata = {
  title: "KBS",
  description: "Knowledge Based System – Movies",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
