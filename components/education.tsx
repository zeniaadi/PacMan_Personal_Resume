"use client"

import { FoodDot } from "./pac-man"
import { resumeData } from "@/content/resume"
import { cn } from "@/lib/utils"

export function Education() {
  return (
    <div className="mt-20">
      <h3 className="font-arcade text-xs text-secondary neon-text-cyan mb-8 text-center">
        EDUCATION POWER-UPS
      </h3>

      <div className="grid md:grid-cols-3 gap-4">
        {resumeData.education.map((edu) => (
          <div
            key={edu.id}
            className={cn(
              "glass-card rounded-xl p-5 relative overflow-hidden",
              "hover:border-secondary/40 transition-all duration-300",
              "group"
            )}
          >
            {/* Power pellet indicator for MIT */}
            {edu.gpa === "5.00 / 5.00" && (
              <div className="absolute top-3 right-3">
                <FoodDot size={12} type="power" />
              </div>
            )}

            {/* School */}
            <h4 className="font-arcade text-xs text-primary neon-text-yellow mb-2 group-hover:text-secondary transition-colors">
              {edu.school}
            </h4>

            {/* Degree */}
            <p className="font-sans text-sm font-medium text-foreground mb-2">
              {edu.degree}
            </p>

            {/* Period & GPA */}
            <div className="flex items-center justify-between text-xs text-muted-foreground font-sans">
              <span>{edu.period}</span>
              <span className="text-primary neon-text-yellow">GPA: {edu.gpa}</span>
            </div>

            {/* Highlights with cherry badges */}
            {edu.highlights && edu.highlights.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-2">
                {edu.highlights.map((highlight) => (
                  <div key={highlight} className="inline-flex items-center gap-1 px-2 py-1 bg-accent/20 border border-accent/30 rounded text-xs text-accent font-sans">
                    <FoodDot size={6} type="cherry" />
                    <span>{highlight}</span>
                  </div>
                ))}
              </div>
            )}

            {/* Honors badge */}
            {edu.honors && (
              <div className="mt-3 inline-flex items-center gap-1 px-2 py-1 bg-accent/20 border border-accent/30 rounded text-xs text-accent font-sans">
                <FoodDot size={6} type="cherry" />
                <span>Honors</span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
