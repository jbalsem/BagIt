import type React from "react"
import type { Metadata } from "next"
import { Inter, Sora } from "next/font/google"
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
})

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-display",
})

export const metadata: Metadata = {
  title: "BagIt - Secure the Snacks. Save the Stack.",
  description: "Track your grocery list, monthly budget, and home essentials — all in one vibe.",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${sora.variable} font-sans`}>{children}</body>
    </html>
  )
}
