"use client"

import { cn } from "@/lib/utils"

interface PacManProps {
  size?: number
  direction?: "right" | "down" | "left" | "up"
  className?: string
  isEating?: boolean
}

export function PacMan({
  size = 40,
  direction = "down",
  className,
  isEating = true,
}: PacManProps) {
  const rotations = {
    right: "rotate-0",
    down: "rotate-90",
    left: "rotate-180",
    up: "-rotate-90",
  }

  return (
    <div
      className={cn("relative neon-glow-yellow", rotations[direction], className)}
      style={{ width: size, height: size }}
    >
      {/* Pac-Man SVG with neon glow */}
      <svg
        viewBox="0 0 100 100"
        className={cn("w-full h-full", isEating && "animate-chomp-svg")}
      >
        {/* Outer glow circle */}
        <circle
          cx="50"
          cy="50"
          r="48"
          fill="none"
          stroke="rgba(255, 230, 0, 0.3)"
          strokeWidth="8"
        />
        {/* Pac-Man body */}
        <circle
          cx="50"
          cy="50"
          r="44"
          fill="#FFE600"
          stroke="#FFE600"
          strokeWidth="2"
        />
        {/* Mouth wedge */}
        <path
          d="M50,50 L100,20 L100,80 Z"
          fill="hsl(var(--background))"
          className={isEating ? "origin-center animate-mouth" : ""}
        />
        {/* Eye */}
        <circle cx="52" cy="25" r="7" fill="hsl(var(--background))" />
      </svg>
    </div>
  )
}

interface FoodDotProps {
  size?: number
  eaten?: boolean
  type?: "dot" | "power" | "cherry"
  className?: string
}

export function FoodDot({
  size = 10,
  eaten = false,
  type = "dot",
  className,
}: FoodDotProps) {
  if (eaten) return null

  if (type === "cherry") {
    return (
      <div className={cn("relative", className)} style={{ width: size * 2, height: size * 2 }}>
        {/* Cherry stem */}
        <div
          className="absolute bg-green-500"
          style={{
            width: 2,
            height: size * 0.8,
            left: "50%",
            top: 0,
            transform: "translateX(-50%) rotate(15deg)",
            transformOrigin: "bottom center",
          }}
        />
        {/* Cherry body */}
        <div
          className="absolute rounded-full bg-accent"
          style={{
            width: size,
            height: size,
            bottom: 0,
            left: size * 0.1,
          }}
        />
        <div
          className="absolute rounded-full bg-accent"
          style={{
            width: size,
            height: size,
            bottom: 0,
            right: size * 0.1,
          }}
        />
      </div>
    )
  }

  if (type === "power") {
    return (
      <div
        className={cn(
          "rounded-full animate-pulse-glow",
          className
        )}
        style={{ 
          width: size * 2, 
          height: size * 2,
          backgroundColor: "#FFE600",
          boxShadow: "0 0 10px rgba(255, 230, 0, 0.8), 0 0 20px rgba(255, 230, 0, 0.5)"
        }}
      />
    )
  }

  return (
    <div
      className={cn("rounded-full", className)}
      style={{
        width: size,
        height: size,
        backgroundColor: "#EAF2FF",
        boxShadow: "0 0 4px rgba(234, 242, 255, 0.5)"
      }}
    />
  )
}

interface GhostProps {
  color?: "blue" | "pink" | "red" | "orange"
  size?: number
  className?: string
}

export function Ghost({ color = "blue", size = 40, className }: GhostProps) {
  const colors = {
    blue: "hsl(var(--ghost-blue))",
    pink: "hsl(var(--ghost-pink))",
    red: "hsl(var(--ghost-red))",
    orange: "hsl(var(--ghost-orange))",
  }

  return (
    <div
      className={cn("relative animate-float", className)}
      style={{ width: size, height: size }}
    >
      <svg viewBox="0 0 40 44" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Ghost body */}
        <path
          d="M20 0C8.954 0 0 8.954 0 20V40L5 35L10 40L15 35L20 40L25 35L30 40L35 35L40 40V20C40 8.954 31.046 0 20 0Z"
          fill={colors[color]}
        />
        {/* Eyes */}
        <ellipse cx="13" cy="18" rx="5" ry="6" fill="white" />
        <ellipse cx="27" cy="18" rx="5" ry="6" fill="white" />
        <circle cx="15" cy="19" r="3" fill="#1a1a2e" />
        <circle cx="29" cy="19" r="3" fill="#1a1a2e" />
      </svg>
    </div>
  )
}
