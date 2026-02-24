import React from "react"
import type { Metadata, Viewport } from "next"
import { Press_Start_2P, Inter } from "next/font/google"

import "./globals.css"

const pressStart2P = Press_Start_2P({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-arcade",
})

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
})

export const metadata: Metadata = {
  title: "Zenia Adiwijaya",
  description:
    "Building Scalable Products at the Intersection of Data, Systems, and AI. Interactive Pac-Man themed resume.",
  generator: "v0.app",
  icons: {
    icon: "/favicon.svg",
  },
}

export const viewport: Viewport = {
  themeColor: "#0a0a0f",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${pressStart2P.variable} ${inter.variable}`}>
      <body className="font-sans antialiased" suppressHydrationWarning>{children}</body>
    </html>
  )
}
