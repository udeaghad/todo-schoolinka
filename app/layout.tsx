import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Todo App',
  description: 'Created for Schoolinka',
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
