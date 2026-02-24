"use client"

import { skillsData, leadershipData } from "@/content/resume"
import { PacMan, Ghost, FoodDot } from "./pac-man"
import { cn } from "@/lib/utils"

export function StatsSection() {
  return (
    <div>
      {/* Section Header */}
      <div className="text-center mb-12">
        <div className="flex items-center justify-center gap-4 mb-4">
          <PacMan size={32} direction="right" isEating={true} />
          <h2 className="font-arcade text-sm sm:text-base md:text-lg text-accent neon-text-pink uppercase tracking-wider">
            POWER-UPS & PLAYER STATS
          </h2>
          <PacMan size={32} direction="left" isEating={true} />
        </div>
        <p className="font-sans text-muted-foreground">
          Skills, Leadership & Activities
        </p>
      </div>

      {/* Skills Section */}
      <div className="mb-16">
        <h3 className="font-arcade text-xs text-secondary neon-text-cyan mb-8 text-center">
          SKILL POWER-UPS
        </h3>

        <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {/* AI/ML Skills */}
          <SkillCategory
            title="AI / ML"
            skills={skillsData.aiMl}
            ghostColor="blue"
            dotType="power"
          />

          {/* Tools */}
          <SkillCategory
            title="TOOLS"
            skills={skillsData.tools}
            ghostColor="pink"
            dotType="dot"
          />

          {/* Product */}
          <SkillCategory
            title="PRODUCT"
            skills={skillsData.product}
            ghostColor="orange"
            dotType="cherry"
          />
        </div>
      </div>

      {/* Leadership Section */}
      <div>
        <h3 className="font-arcade text-xs text-accent neon-text-pink mb-8 text-center">
          BONUS LEVELS
        </h3>

        <div className="grid md:grid-cols-3 gap-4 max-w-4xl mx-auto">
          {leadershipData.map((item) => (
            <div
              key={item.id}
              className={cn(
                "glass-card rounded-xl p-5",
                "hover:border-accent/40 transition-all duration-300",
                "relative overflow-hidden group"
              )}
            >
              {/* Cherry indicator for achievements */}
              <div className="absolute top-3 right-3 opacity-50 group-hover:opacity-100 transition-opacity">
                <FoodDot size={10} type="cherry" />
              </div>

              {/* Title */}
              <h4 className="font-arcade text-xs text-primary neon-text-yellow mb-2">
                {item.title}
              </h4>

              {/* Organization */}
              <p className="font-sans text-sm font-medium text-secondary mb-1">
                {item.organization}
              </p>

              {/* Period */}
              <p className="font-sans text-xs text-muted-foreground mb-2">
                {item.period}
              </p>

              {/* Description */}
              <p className="font-sans text-xs text-muted-foreground">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Final Score Display */}
      <div className="mt-16 text-center">
        <div className="inline-block glass-card rounded-xl p-8" style={{
          boxShadow: "0 0 40px rgba(255, 230, 0, 0.2), inset 0 0 20px rgba(255, 230, 0, 0.05)"
        }}>
          <p className="font-arcade text-xs text-muted-foreground mb-2">
            TOTAL SCORE
          </p>
          <p className="font-arcade text-3xl sm:text-4xl text-primary neon-text-yellow animate-pulse-glow">
            999,999
          </p>
          <div className="mt-4 flex items-center justify-center gap-3">
            <div className="neon-glow-cyan"><Ghost color="blue" size={20} /></div>
            <div className="neon-glow-pink"><Ghost color="pink" size={20} /></div>
            <Ghost color="orange" size={20} />
            <Ghost color="red" size={20} />
          </div>
          <p className="font-sans text-xs text-muted-foreground mt-4">
            All ghosts captured. Ready for next level.
          </p>
        </div>
      </div>
    </div>
  )
}

interface SkillCategoryProps {
  title: string
  skills: string[]
  ghostColor: "blue" | "pink" | "orange" | "red"
  dotType: "dot" | "power" | "cherry"
}

function SkillCategory({ title, skills, ghostColor, dotType }: SkillCategoryProps) {
  return (
    <div className="glass-card rounded-xl p-5 relative group hover:border-secondary/40 transition-all duration-300">
      {/* Ghost decoration */}
      <div className="absolute top-3 right-3 opacity-30 group-hover:opacity-60 transition-opacity">
        <Ghost color={ghostColor} size={24} />
      </div>

      {/* Title */}
      <h4 className="font-arcade text-xs text-secondary neon-text-cyan mb-4">{title}</h4>

      {/* Skills list */}
      <div className="space-y-2">
        {skills.map((skill) => (
          <div key={skill} className="flex items-center gap-2">
            <FoodDot size={6} type={dotType} />
            <span className="font-sans text-sm text-muted-foreground">{skill}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
