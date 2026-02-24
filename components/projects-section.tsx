"use client"

import { useState } from "react"
import { projectsData } from "@/content/resume"
import { PacMan, Ghost, FoodDot } from "./pac-man"
import { cn } from "@/lib/utils"
import { ExternalLink } from "lucide-react"

export function ProjectsSection() {
  const [hoveredProject, setHoveredProject] = useState<string | null>(null)

  return (
    <div>
      {/* Section Header */}
      <div className="text-center mb-12">
        <div className="flex items-center justify-center gap-4 mb-4">
          <Ghost color="pink" size={32} />
          <h2 className="font-arcade text-sm sm:text-base md:text-lg text-accent neon-text-pink uppercase tracking-wider">
            ARCADE BUILDS
          </h2>
          <Ghost color="blue" size={32} />
        </div>
        <p className="font-sans text-muted-foreground">
          Personal Projects & Side Quests
        </p>
      </div>

      {/* Projects Grid - Arcade Cartridge Style */}
      <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto items-start">
        {projectsData.map((project, index) => {
          const ghostColors = ["blue", "pink", "orange", "red"] as const
          const ghostColor = ghostColors[index % ghostColors.length]

          return (
            <a
              key={project.id}
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                "group relative glass-card rounded-xl p-6",
                "transition-all duration-300 transform hover:-translate-y-1"
              )}
              style={{
                boxShadow: hoveredProject === project.id 
                  ? "0 0 40px rgba(96, 208, 232, 0.3), inset 0 0 20px rgba(96, 208, 232, 0.05)"
                  : undefined
              }}
              onMouseEnter={() => setHoveredProject(project.id)}
              onMouseLeave={() => setHoveredProject(null)}
            >
              {/* Ghost decoration */}
              <div className={cn(
                "absolute top-4 right-4 transition-all duration-300",
                hoveredProject === project.id ? "opacity-100 neon-glow-cyan" : "opacity-30"
              )}>
                <Ghost color={ghostColor} size={28} />
              </div>

              {/* Project Icon */}
              <div className="mb-4">
                {hoveredProject === project.id ? (
                  <PacMan size={40} direction="right" isEating={true} />
                ) : (
                  <FoodDot size={20} type="power" />
                )}
              </div>

              {/* Title */}
              <h3 className={cn(
                "font-arcade text-xs sm:text-sm text-foreground mb-2 transition-colors",
                hoveredProject === project.id && "text-primary neon-text-yellow"
              )}>
                {project.title}
              </h3>

              {/* Description */}
              <p className="font-sans text-sm text-muted-foreground mb-4">
                {project.description}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-4">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="font-sans px-2 py-1 bg-secondary/10 border border-secondary/20 rounded text-xs text-secondary"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Link indicator */}
              <div className={cn(
                "flex items-center gap-2 text-xs transition-colors",
                hoveredProject === project.id ? "text-primary neon-text-yellow" : "text-secondary"
              )}>
                <span>PLAY NOW</span>
                <ExternalLink className="w-3 h-3" />
              </div>

              {/* Food dot trail on hover */}
              {hoveredProject === project.id && (
                <div className="absolute bottom-4 right-4 flex gap-1">
                  <FoodDot size={4} />
                  <FoodDot size={4} />
                  <FoodDot size={4} />
                </div>
              )}
            </a>
          )
        })}
      </div>

      {/* Decorative Maze Line */}
      <div className="mt-12 flex items-center justify-center gap-2">
        <div className="h-px w-20 bg-border" />
        <FoodDot size={8} type="dot" />
        <FoodDot size={8} type="dot" />
        <FoodDot size={12} type="power" />
        <FoodDot size={8} type="dot" />
        <FoodDot size={8} type="dot" />
        <div className="h-px w-20 bg-border" />
      </div>
    </div>
  )
}
