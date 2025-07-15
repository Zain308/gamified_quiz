/* ----------------------------------------------------------------------
   POST /api/quiz
   Body:  { topic: string; level: number (1-5) }
   Reply: { source: "gemini-1.0-pro" | "fallback",
            topic, level, attempt, questions: MCQ[] }
---------------------------------------------------------------------- */
import { NextResponse, type NextRequest } from "next/server"

/* ---------- types --------------------------------------------------- */
interface MCQ {
  id: string
  question: string
  options: string[]
  correctAnswer: string
  explanation: string
}

/* ---------- env / constants ---------------------------------------- */
const GEMINI_KEY =
  process.env.GEMINI_API_KEY || process.env.NEXT_PUBLIC_GEMINI_API_KEY || process.env.GOOGLE_GEMINI_API_KEY

const GEMINI_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.0-pro:generateContent"

/* ---------- utilities ---------------------------------------------- */
function hashAttempt(topic: string, level: number) {
  const seed = `${topic}-${level}-${Math.floor(Date.now() / 3_600_000)}` // - per-hour bucket
  let h = 0
  for (let i = 0; i < seed.length; i++) h = (h << 5) - h + seed.charCodeAt(i)
  return (Math.abs(h) % 10) + 1
}

function buildPrompt(topic: string, level: number, attempt: number) {
  const levels = {
    1: ["Beginner", "basic definitions and examples"],
    2: ["Intermediate", "practical usage and problem-solving"],
    3: ["Advanced", "optimisation and edge cases"],
    4: ["Expert", "architectural considerations"],
    5: ["Master", "cutting-edge concepts"],
  } as const
  const [label, focus] = levels[level as keyof typeof levels] ?? levels[2]

  return `You are an assessment specialist.
Create EXACTLY five multiple-choice questions about "${topic}" for ${label} learners.

Guidelines:
• Focus on ${focus}.
• Each question has 4 options, ONE is correct.
• Provide a brief explanation.
• This is attempt #${attempt} so do NOT repeat previous content.

Return ONLY valid JSON (no markdown) in this form:
[
  {
    "id": "string",
    "question": "string",
    "options": ["A", "B", "C", "D"],
    "correctAnswer": "exact option string",
    "explanation": "string"
  },
  ...4 more objects
]`
}

function stripFences(jsonLike: string) {
  return jsonLike.replace(/```json|```/gi, "").trim()
}

/* ---------- fallback generator ------------------------------------- */
function fallbackQuestions(topic: string, level: number, attempt: number): MCQ[] {
  const lvl = ["Beginner", "Intermediate", "Advanced", "Expert", "Master"][level - 1] || "Intermediate"
  return Array.from({ length: 5 }, (_, i) => {
    const idx = i + 1
    return {
      id: `fb_${topic.replace(/\W+/g, "_")}_${level}_${attempt}_${idx}`,
      question: `Sample ${lvl.toLowerCase()} question ${idx} about ${topic}?`,
      options: ["Option A", "Option B", "Option C", "Option D"],
      correctAnswer: "Option A",
      explanation: `Because Option A is the correct choice for question ${idx}.`,
    }
  })
}

/* ---------- Gemini call -------------------------------------------- */
async function askGemini(topic: string, level: number, attempt: number): Promise<MCQ[]> {
  // This check is now redundant if the top-level POST handles missing key,
  // but kept for clarity if this function were called directly.
  if (!GEMINI_KEY) throw new Error("Missing Gemini API key")

  const res = await fetch(`${GEMINI_URL}?key=${GEMINI_KEY}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      contents: [{ parts: [{ text: buildPrompt(topic, level, attempt) }] }],
      generationConfig: {
        response_mime_type: "application/json",
        maxOutputTokens: 1024,
        temperature: 0.8,
        topK: 40,
        topP: 0.9,
      },
    }),
  })

  if (!res.ok) throw new Error(`Gemini ${res.status}: ${await res.text()}`)

  const data: any = await res.json()
  const raw = data?.candidates?.[0]?.content?.parts?.[0]?.text
  if (!raw) throw new Error("Empty content from Gemini")

  const parsed = JSON.parse(stripFences(raw)) as MCQ[]
  if (!Array.isArray(parsed) || parsed.length !== 5) throw new Error("Gemini JSON shape invalid")
  return parsed
}

/* ---------- route handler ------------------------------------------ */
export async function POST(req: NextRequest) {
  try {
    const { topic, level } = await req.json()

    if (!topic || typeof topic !== "string") return NextResponse.json({ error: "Topic is required" }, { status: 400 })

    if (typeof level !== "number" || level < 1 || level > 5)
      return NextResponse.json({ error: "Level must be 1-5" }, { status: 400 })

    const attempt = hashAttempt(topic.trim(), level)

    // Check for API key here and use fallback if missing
    if (!GEMINI_KEY) {
      console.warn("Gemini API key not configured, using fallback questions.")
      const questions = fallbackQuestions(topic.trim(), level, attempt)
      return NextResponse.json(
        {
          source: "fallback",
          topic,
          level,
          attempt,
          warning: "Gemini API key not configured. Using fallback questions.",
          questions,
        },
        { status: 200 },
      )
    }

    try {
      const questions = await askGemini(topic.trim(), level, attempt)
      return NextResponse.json({ source: "gemini-1.0-pro", topic, level, attempt, questions }, { status: 200 })
    } catch (aiErr) {
      console.warn("Gemini failed, using fallback:", aiErr)
      const questions = fallbackQuestions(topic.trim(), level, attempt)
      return NextResponse.json(
        {
          source: "fallback",
          topic,
          level,
          attempt,
          warning: "AI generation unavailable, using fallback questions.",
          questions,
        },
        { status: 200 },
      )
    }
  } catch (err) {
    console.error("🚨 /api/quiz unexpected error:", err)
    return NextResponse.json({ error: "Invalid request" }, { status: 400 })
  }
}
