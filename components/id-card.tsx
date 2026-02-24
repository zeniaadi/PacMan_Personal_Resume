"use client"

import { PacMan, Ghost, FoodDot } from "./pac-man"
import { MapPin, Mail, Linkedin } from "lucide-react"

export function IdCard() {
  return (
    <div className="w-full max-w-xl mx-auto">
      {/* Card container */}
      <div className="relative rounded-2xl overflow-hidden border border-secondary/30 bg-[#0c1225]/95 backdrop-blur-md shadow-[0_0_40px_rgba(96,208,232,0.12)]">
        {/* Top neon accent bar */}
        <div className="h-1 w-full bg-gradient-to-r from-primary via-secondary to-accent" />

        {/* Subtle grid texture overlay */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(96, 208, 232, 1) 1px, transparent 1px), linear-gradient(90deg, rgba(96, 208, 232, 1) 1px, transparent 1px)",
            backgroundSize: "16px 16px",
          }}
        />

        {/* Content */}
        <div className="relative z-10 p-4 sm:p-5">
          {/* Header row */}
          <div className="flex items-center justify-between mb-3">
            <span className="font-arcade text-[9px] sm:text-[10px] text-secondary tracking-widest">
              IDENTIFICATION CARD
            </span>
            <div className="flex items-center gap-1.5">
              <Ghost color="blue" size={12} />
              <Ghost color="pink" size={12} />
              <Ghost color="orange" size={12} />
            </div>
          </div>

          {/* Main content: avatar + details */}
          <div className="flex gap-4 sm:gap-5">
            {/* Avatar section - real photo */}
            <div className="flex-shrink-0">
              <div className="relative w-16 h-16 sm:w-20 sm:h-20">
                {/* Outer ring - Pac-Man yellow */}
                <div className="absolute inset-0 rounded-full border-2 border-primary/60 shadow-[0_0_16px_rgba(255,230,0,0.25)]" />
                {/* Photo - zoomed in on face */}
                <div className="absolute inset-1 rounded-full overflow-hidden border border-secondary/20">
                  <img
                    src="/avatar.jpg"
                    alt="Zenia Adiwijaya"
                    className="w-full h-full object-cover scale-[1.8] object-[center_20%]"
                  />
                </div>
                {/* Small Pac-Man accent */}
                <div className="absolute -bottom-1 -right-1">
                  <PacMan size={14} direction="right" isEating={true} />
                </div>
              </div>
            </div>

            {/* Details section - table layout for exact alignment */}
            <div className="flex-1 min-w-0">
              <table className="w-full border-collapse">
                <tbody>
                  <tr>
                    <td className="font-arcade text-[7px] sm:text-[8px] text-muted-foreground tracking-wider w-14 pb-1.5 align-middle pr-3">NAME</td>
                    <td className="font-arcade text-xs sm:text-sm text-primary neon-text-yellow pb-1.5 align-middle text-left">ZENIA A.</td>
                  </tr>
                  <tr>
                    <td className="font-arcade text-[7px] sm:text-[8px] text-muted-foreground tracking-wider w-14 pb-1.5 align-middle pr-3">BASED</td>
                    <td className="pb-1.5 align-middle text-left">
                      <div className="flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-secondary flex-shrink-0" />
                        <span className="font-sans text-xs text-secondary/90">Bay Area, CA</span>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td className="font-arcade text-[7px] sm:text-[8px] text-muted-foreground tracking-wider w-14 pb-1.5 align-middle pr-3">HOBBY</td>
                    <td className="font-sans text-xs text-foreground/80 pb-1.5 align-middle text-left">Building and optimizing solutions</td>
                  </tr>
                  <tr>
                    <td className="font-arcade text-[7px] sm:text-[8px] text-muted-foreground tracking-wider w-14 pb-1.5 align-middle pr-3">EMAIL</td>
                    <td className="pb-1.5 align-middle text-left">
                      <a href="mailto:zeniaadi@alum.mit.edu" className="font-sans text-xs text-secondary hover:text-primary transition-colors">
                        zeniaadi@alum.mit.edu
                      </a>
                    </td>
                  </tr>
                  <tr>
                    <td className="font-arcade text-[7px] sm:text-[8px] text-muted-foreground tracking-wider w-14 align-middle pr-3">LINKS</td>
                    <td className="align-middle text-left">
                      <div className="flex items-center gap-2.5">
                        <a href="https://www.linkedin.com/in/zeniaadiwijaya/" target="_blank" rel="noopener noreferrer" className="text-secondary hover:text-primary transition-colors" aria-label="LinkedIn">
                          <Linkedin className="w-3.5 h-3.5" />
                        </a>
                        <a href="mailto:zeniaadi@alum.mit.edu" className="text-secondary hover:text-primary transition-colors" aria-label="Email">
                          <Mail className="w-3.5 h-3.5" />
                        </a>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Bottom neon accent bar */}
        <div className="h-0.5 w-full bg-gradient-to-r from-accent via-secondary to-primary opacity-60" />
      </div>
    </div>
  )
}
