"use client"

import { useEffect, useRef, useState, useCallback } from "react"
import { PacMan, FoodDot } from "./pac-man"
import { cn } from "@/lib/utils"

interface TimelineItem {
  id: string
  company: string
  role: string
  period: string
  location: string
  bullets: string[]
  highlights: string[]
  badges?: string[]
  type: "experience" | "fellowship"
}

interface PacTimelineProps {
  items: TimelineItem[]
  sectionTitle: string
  sectionSubtitle?: string
}

export function PacTimeline({ items, sectionTitle, sectionSubtitle }: PacTimelineProps) {
  const [eatenItems, setEatenItems] = useState<Set<string>>(() => new Set())
  const [pacManPosition, setPacManPosition] = useState(0)
  const timelineRef = useRef<HTMLDivElement>(null)
  const itemRefs = useRef<Map<string, HTMLDivElement>>(new Map())
  const lastPositionRef = useRef(0)

  const handleScroll = useCallback(() => {
    if (!timelineRef.current) return

    const timelineRect = timelineRef.current.getBoundingClientRect()
    const viewportHeight = window.innerHeight
    const triggerPoint = viewportHeight * 0.4

    // Update Pac-Man position based on scroll
    const scrollProgress = Math.max(
      0,
      Math.min(1, (triggerPoint - timelineRect.top) / timelineRect.height)
    )
    const newPosition = Math.round(scrollProgress * 100)
    
    // Only update if position changed significantly
    if (Math.abs(newPosition - lastPositionRef.current) > 0.5) {
      lastPositionRef.current = newPosition
      setPacManPosition(newPosition)
    }

    // Check which items have been eaten using functional update
    setEatenItems((prevEaten) => {
      let hasChanges = false
      const newEaten = new Set(prevEaten)
      itemRefs.current.forEach((element, id) => {
        const rect = element.getBoundingClientRect()
        if (rect.top < triggerPoint && !prevEaten.has(id)) {
          newEaten.add(id)
          hasChanges = true
        }
      })
      return hasChanges ? newEaten : prevEaten
    })
  }, [])

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener("scroll", handleScroll)
  }, [handleScroll])

  return (
    <div ref={timelineRef} className="relative">
      {/* Section Header */}
      <div className="mb-12 text-center relative">
        <div className="inline-flex items-center gap-4 mb-3">
          <FoodDot size={6} type="power" />
          <h2 className="font-arcade text-sm sm:text-base md:text-lg text-accent neon-text-pink uppercase tracking-wider">
            {sectionTitle}
          </h2>
          <FoodDot size={6} type="power" />
        </div>
        {sectionSubtitle && (
          <p className="text-muted-foreground text-sm">{sectionSubtitle}</p>
        )}
      </div>

      {/* Timeline Container */}
      <div className="relative">
        {/* Vertical Line (Maze Path) - Neon Cyan Glow */}
        <div 
          className="absolute left-6 md:left-10 top-0 bottom-0 w-1 rounded-full"
          style={{
            background: "linear-gradient(to bottom, #60D0E8, #E078B0)",
            boxShadow: "0 0 10px rgba(96, 208, 232, 0.5), 0 0 20px rgba(96, 208, 232, 0.3)"
          }}
        />

        {/* Food dots along the path */}
        <div className="absolute left-6 md:left-10 top-0 bottom-0 -translate-x-1/2 flex flex-col items-center justify-around pointer-events-none z-10">
          {items.map((item, i) => (
            <FoodDot key={i} size={8} type="dot" eaten={eatenItems.has(item.id)} />
          ))}
        </div>

        {/* Pac-Man on the path - Neon Yellow with intense glow */}
        <div
          className="absolute left-6 md:left-10 -translate-x-1/2 z-20 transition-all duration-300"
          style={{ top: `${pacManPosition}%` }}
        >
          <PacMan size={44} direction="down" isEating={true} />
        </div>

        {/* Timeline Items */}
        <div className="space-y-8">
          {items.map((item) => {
            const isEaten = eatenItems.has(item.id)
            const dotType =
              item.highlights.length > 2
                ? "power"
                : item.highlights.some((h) => h.includes("$"))
                  ? "cherry"
                  : "dot"

            return (
              <div
                key={item.id}
                ref={(el) => {
                  if (el) itemRefs.current.set(item.id, el)
                }}
                className={cn(
                  "relative pl-16 md:pl-24 transition-all duration-500",
                  isEaten ? "opacity-100 translate-x-0" : "opacity-60 translate-x-4"
                )}
              >
                {/* Food Dot marker on the line */}
                <div className="absolute left-6 md:left-10 -translate-x-1/2 top-4 z-10">
                  <div className={cn(
                    "transition-all duration-300",
                    isEaten ? "scale-0 opacity-0" : "scale-100 opacity-100"
                  )}>
                    <FoodDot
                      size={dotType === "dot" ? 12 : 14}
                      type={dotType}
                      eaten={false}
                    />
                  </div>
                  {isEaten && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-4 h-4 rounded-full bg-primary/40 animate-ping" />
                    </div>
                  )}
                </div>

                {/* Content Card - Frosted Glass with Neon Border */}
                <div
                  className={cn(
                    "glass-card rounded-xl p-4 md:p-6 transition-all duration-500 relative overflow-hidden",
                    isEaten && "border-secondary/40",
                    item.type === "fellowship" && isEaten && "border-accent/40"
                  )}
                  style={{
                    boxShadow: isEaten 
                      ? item.type === "fellowship"
                        ? "0 0 30px rgba(224, 120, 176, 0.15), inset 0 0 20px rgba(224, 120, 176, 0.03)"
                        : "0 0 30px rgba(96, 208, 232, 0.15), inset 0 0 20px rgba(96, 208, 232, 0.03)"
                      : undefined
                  }}
                >
                  {/* Level Badge - Top Right - Hidden on very small screens */}
                  <div className="absolute top-2 right-2 md:top-3 md:right-3 level-badge px-1.5 py-0.5 md:px-2 md:py-1 rounded text-[8px] md:text-[10px] text-secondary z-10">
                    LV {items.indexOf(item) + 1}
                  </div>

                  {/* Header - Responsive layout */}
                  <div className="mb-4 pr-12 md:pr-16">
                    {/* Title and Company Row - Stack on mobile, inline on desktop */}
                    <div className="flex flex-col sm:flex-row sm:flex-wrap sm:items-baseline gap-y-1 gap-x-2 mb-2">
                      <h3 className="font-sans font-semibold text-foreground text-sm sm:text-base">
                        {item.role}
                      </h3>
                      <span className="hidden sm:inline text-muted-foreground">|</span>
                      <p className={cn(
                        "font-sans font-medium text-sm sm:text-base",
                        item.type === "fellowship" ? "text-accent" : "text-secondary"
                      )}>
                        {item.company}
                      </p>
                    </div>
                    {/* Date and Location Row */}
                    <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs sm:text-sm">
                      <span className="font-sans font-medium text-primary">{item.period}</span>
                      <span className="text-muted-foreground">|</span>
                      <span className="text-muted-foreground font-sans">{item.location}</span>
                    </div>
                  </div>

                  {/* Bullets */}
                  <ul className="space-y-2 mb-4">
                    {item.bullets.map((bullet, bulletIndex) => (
                      <li
                        key={bulletIndex}
                        className="flex items-start gap-2 text-sm text-muted-foreground font-sans"
                      >
                        <span className="text-primary mt-1.5">
                          <FoodDot size={6} type="dot" />
                        </span>
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Badges (Fellowship/Full Time indicators) */}
                  {item.badges && item.badges.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-3">
                      {item.badges.map((badge, badgeIndex) => (
                        <span
                          key={badgeIndex}
                          className={cn(
                            "px-2 py-1 rounded text-xs font-sans font-medium border",
                            badgeIndex === 0
                              ? "bg-accent/20 text-accent border-accent/40"
                              : "bg-primary/20 text-primary border-primary/40"
                          )}
                        >
                          {badge}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Highlights (Power-ups) */}
                  {item.highlights.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {item.highlights.map((highlight, highlightIndex) => (
                        <span
                          key={highlightIndex}
                          className={cn(
                            "px-2 py-1 rounded text-xs font-sans font-medium",
                            highlight.includes("$")
                              ? "bg-accent/20 text-accent"
                              : highlight.includes("%")
                                ? "bg-primary/20 text-primary"
                                : "bg-secondary/20 text-secondary"
                          )}
                        >
                          {highlight}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
