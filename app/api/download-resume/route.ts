import { readFile } from "fs/promises"
import { join } from "path"

export async function GET() {
  const filePath = join(process.cwd(), "public", "2026_ZeniaAdi_Resume.pdf")
  const fileBuffer = await readFile(filePath)

  return new Response(fileBuffer, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": 'attachment; filename="2026_ZeniaAdi_Resume.pdf"',
    },
  })
}
