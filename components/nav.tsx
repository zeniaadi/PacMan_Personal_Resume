"use client"

import { cn } from "@/lib/utils"
import { PacMan, Ghost } from "./pac-man"

interface NavProps {
  activeSection: string
  onNavigate: (section: string) => void
}

const navItems = [
  { id: "play", label: "PLAY", ghost: "blue" as const },
  { id: "arcade", label: "ARCADE", ghost: "pink" as const },
  { id: "stats", label: "STATS", ghost: "orange" as const },
]

export function Nav({ activeSection, onNavigate }: NavProps) {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <button
            onClick={() => onNavigate("play")}
            className="flex items-center gap-3 group"
          >
            <PacMan size={28} direction="right" isEating={true} />
            <span className="font-arcade text-xs text-primary hidden sm:block">
              ZENIA
            </span>
          </button>

          {/* Nav Items */}
          <div className="flex items-center gap-2 sm:gap-6">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={cn(
                  "flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-300",
                  activeSection === item.id
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                )}
              >
                <Ghost color={item.ghost} size={20} />
                <span className="font-arcade text-[8px] sm:text-[10px]">
                  {item.label}
                </span>
              </button>
            ))}
          </div>

          {/* High Score Display */}
          <div className="hidden md:flex items-center gap-2 text-muted-foreground">
            <span className="font-arcade text-[8px]">HIGH SCORE</span>
            <span className="font-arcade text-[10px] text-primary">99999</span>
          </div>
        </div>
      </div>
    </nav>
  )
}
