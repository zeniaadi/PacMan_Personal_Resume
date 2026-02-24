"use client"

import React from "react"

import { useState, useEffect, useRef } from "react"
import { Nav } from "@/components/nav"
import { Hero } from "@/components/hero"
import { PacTimeline } from "@/components/pac-timeline"
import { Education } from "@/components/education"
import { ProjectsSection } from "@/components/projects-section"
import { StatsSection } from "@/components/stats-section"
import { PacBot } from "@/components/pac-bot"
import { resumeData } from "@/content/resume"

export default function Home() {
  const [activeSection, setActiveSection] = useState("play")
  const playRef = useRef<HTMLElement>(null)
  const arcadeRef = useRef<HTMLElement>(null)
  const statsRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 3

      const sections = [
        { id: "play", ref: playRef },
        { id: "arcade", ref: arcadeRef },
        { id: "stats", ref: statsRef },
      ]

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i]
        if (section.ref.current) {
          const top = section.ref.current.offsetTop
          if (scrollPosition >= top) {
            setActiveSection(section.id)
            break
          }
        }
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleNavigate = (sectionId: string) => {
    const refs: Record<string, React.RefObject<HTMLElement | null>> = {
      play: playRef,
      arcade: arcadeRef,
      stats: statsRef,
    }

    const ref = refs[sectionId]
    if (ref?.current) {
      ref.current.scrollIntoView({ behavior: "smooth" })
    }
  }

  // Separate experience and fellowships
  const professionalExperience = resumeData.experience.sort((a, b) => {
    const getYear = (period: string) => {
      const match = period.match(/\d{4}/)
      return match ? parseInt(match[0]) : 0
    }
    return getYear(b.period) - getYear(a.period)
  })

  const fellowshipsAndInternships = resumeData.fellowships.sort((a, b) => {
    const getYear = (period: string) => {
      const match = period.match(/\d{4}/)
      return match ? parseInt(match[0]) : 0
    }
    return getYear(b.period) - getYear(a.period)
  })

  const allExperience = [...professionalExperience, ...fellowshipsAndInternships]

  return (
    <main className="min-h-screen bg-background arcade-grid arcade-vignette">
      <Nav activeSection={activeSection} onNavigate={handleNavigate} />

      {/* Section 1: The Maze - Professional Quest */}
      <section ref={playRef} id="play">
        <Hero />

        <div className="container mx-auto px-4 py-16">
          <PacTimeline
            items={professionalExperience}
            sectionTitle="PROFESSIONAL EXPERIENCE"
            sectionSubtitle="Full-time Roles & Career Highlights"
          />
          
          <div className="mt-20">
            <PacTimeline
              items={fellowshipsAndInternships}
              sectionTitle="FELLOWSHIPS & INTERNSHIPS"
              sectionSubtitle="Learning Experiences"
            />
          </div>
          <Education />
        </div>
      </section>

      {/* Section 2: Arcade Builds - Projects */}
      <section ref={arcadeRef} id="arcade" className="py-20 bg-card/50">
        <div className="container mx-auto px-4">
          <ProjectsSection />
        </div>
      </section>

      {/* Section 3: Power-Ups & Player Stats */}
      <section ref={statsRef} id="stats" className="py-20">
        <div className="container mx-auto px-4">
          <StatsSection />
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-border">
        <div className="container mx-auto px-4 text-center">
          <p className="font-sans text-sm text-muted-foreground">
            © 2026 Zenia Adiwijaya | GAME OVER? NEVER.
          </p>
          <p className="text-sm text-muted-foreground mt-2">
            Made with <span className="inline-block w-3 h-3 rounded-full bg-primary align-middle"></span> and <span className="inline-block w-3 h-3 rounded-full bg-secondary align-middle"></span>
          </p>
        </div>
      </footer>

      {/* Pac-Bot Chatbot */}
      <PacBot />
    </main>
  )
}
