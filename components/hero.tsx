"use client"

import { PacMan, Ghost, FoodDot } from "./pac-man"
import { resumeData } from "@/content/resume"
import { IdCard } from "./id-card"

export function Hero() {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden px-4 arcade-center-glow">
      {/* Background Decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Floating ghosts with neon glow - More visible */}
        <div className="absolute top-20 left-10 opacity-70 neon-glow-cyan animate-float">
          <Ghost color="blue" size={60} />
        </div>
        <div className="absolute top-40 right-20 opacity-70 neon-glow-pink animate-float" style={{ animationDelay: "0.5s" }}>
          <Ghost color="pink" size={50} />
        </div>
        <div className="absolute bottom-40 left-1/4 opacity-60 animate-float" style={{ animationDelay: "1s" }}>
          <Ghost color="orange" size={45} />
        </div>
        <div className="absolute bottom-20 right-10 opacity-60 animate-float" style={{ animationDelay: "1.5s" }}>
          <Ghost color="red" size={55} />
        </div>

        {/* Scattered food dots */}
        <div className="absolute top-32 left-1/3">
          <FoodDot size={6} />
        </div>
        <div className="absolute top-48 right-1/4">
          <FoodDot size={6} />
        </div>
        <div className="absolute bottom-32 left-1/5">
          <FoodDot size={6} />
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 text-center max-w-4xl mx-auto">
        {/* Animated Pac-Man above name */}
        <div className="flex items-center justify-center gap-3 mb-8 drop-shadow-[0_0_20px_rgba(255,230,0,0.5)]">
          <FoodDot size={10} />
          <FoodDot size={10} />
          <FoodDot size={10} />
          <PacMan size={56} direction="right" isEating={true} />
        </div>

        {/* Name with neon glow */}
        <h1 className="font-arcade text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-primary mb-4 text-balance neon-text-yellow drop-shadow-[0_0_30px_rgba(255,230,0,0.4)]">
          {resumeData.name.toUpperCase()}
        </h1>

        {/* Subtitle - Smaller and classier */}
        <p className="font-sans text-sm sm:text-base text-muted-foreground mb-8 font-light tracking-wide italic">
          {resumeData.subtitle}
        </p>

        {/* ID Card */}
        <div className="mb-10 w-full">
          <IdCard />
        </div>

        {/* Arcade Start Prompt */}
        <div className="flex flex-col items-center gap-4">
          <span className="font-arcade text-xs text-secondary neon-text-cyan animate-pulse">
            SCROLL TO START
          </span>
          <div className="flex gap-3">
            <FoodDot size={10} type="dot" />
            <FoodDot size={10} type="dot" />
            <FoodDot size={10} type="dot" />
          </div>
        </div>
      </div>

      {/* Scroll indicator arrow */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <svg
          className="w-6 h-6 text-primary"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 14l-7 7m0 0l-7-7m7 7V3"
          />
        </svg>
      </div>
    </section>
  )
}
