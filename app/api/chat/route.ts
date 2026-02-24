import { streamText, convertToModelMessages } from "ai"
import type { UIMessage } from "ai"
import { resumeData, projectsData, skillsData, leadershipData } from "@/content/resume"

// Build the context from static content
const buildResumeContext = () => {
  const experienceSection = resumeData.experience
    .map(
      (exp) =>
        `${exp.company} - ${exp.role} (${exp.period}):\n${exp.bullets.join("\n")}`
    )
    .join("\n\n")

  const fellowshipsSection = resumeData.fellowships
    .map(
      (f) =>
        `${f.company} - ${f.role} (${f.period}):\n${f.bullets.join("\n")}`
    )
    .join("\n\n")

  const educationSection = resumeData.education
    .map((edu) => `${edu.school} - ${edu.degree} (${edu.period}) GPA: ${edu.gpa}`)
    .join("\n")

  const projectsSection = projectsData
    .map((p) => `${p.title}: ${p.description} - ${p.url}`)
    .join("\n")

  const skillsSection = `
AI/ML Skills: ${skillsData.aiMl.join(", ")}
Tools: ${skillsData.tools.join(", ")}
Product Skills: ${skillsData.product.join(", ")}
  `.trim()

  const leadershipSection = leadershipData
    .map((l) => `${l.title} at ${l.organization} (${l.period}): ${l.description}`)
    .join("\n")

  return `
# Zenia Adiwijaya Resume Data

## Name
${resumeData.name}

## Headline
${resumeData.subtitle}

## Summary
${resumeData.headline}

## Professional Experience (THE MAZE: PROFESSIONAL QUEST)
${experienceSection}

## Fellowships & Internships
${fellowshipsSection}

## Education
${educationSection}

## Personal Projects (ARCADE BUILDS)
${projectsSection}

## Skills (POWER-UPS)
${skillsSection}

## Leadership & Activities (BONUS LEVELS)
${leadershipSection}
  `.trim()
}

const systemPrompt = `You are Pac-Bot, Zenia Adiwijaya's friendly AI assistant on her interactive Pac-Man themed resume website. 

Your personality:
- Friendly, concise, and slightly playful
- Highly factual - you ONLY answer based on the resume data provided
- You use occasional Pac-Man references but stay professional
- You speak in first person when discussing Zenia's achievements ("Zenia has..." or "She has...")

IMPORTANT RULES:
1. You can ONLY answer questions using the resume data provided below
2. If asked about something not in the data, respond: "I don't see that in Zenia's resume data yet - you can add it by updating the content file."
3. Keep responses concise (2-4 sentences max unless asked for details)
4. When citing metrics, always be accurate to the data
5. Reference section names when relevant (THE MAZE for experience, ARCADE BUILDS for projects, POWER-UPS for skills)

Resume Data:
${buildResumeContext()}`

export async function POST(req: Request) {
  const body = await req.json()
  const messages: UIMessage[] = body.messages || []

  const result = streamText({
    model: "openai/gpt-4o-mini",
    system: systemPrompt,
    messages: await convertToModelMessages(messages),
    maxOutputTokens: 500,
  })

  return result.toUIMessageStreamResponse()
}
