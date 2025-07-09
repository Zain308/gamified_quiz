import { type NextRequest, NextResponse } from "next/server"
import { getServerClient } from "@/lib/server"

export async function POST(request: NextRequest) {
  try {
    const { topic, level, score, totalQuestions } = await request.json()

    console.log("📊 Progress update request:", { topic, level, score, totalQuestions })

    // Validate input
    if (!topic || !level || score === undefined || !totalQuestions) {
      return NextResponse.json(
        { error: "Missing required fields: topic, level, score, totalQuestions" },
        { status: 400 },
      )
    }

    // Get Supabase client
    const supabase = getServerClient()

    // For demo purposes, we'll simulate saving progress
    // In a real app, you'd save to the database here
    console.log("✅ Progress saved successfully (demo mode)")

    // Simulate a successful database response
    const progressData = {
      id: `progress_${Date.now()}`,
      topic,
      level,
      score,
      totalQuestions,
      percentage: Math.round((score / totalQuestions) * 100),
      completedAt: new Date().toISOString(),
      xpGained: score * 10, // 10 XP per correct answer
    }

    return NextResponse.json({
      success: true,
      message: "Progress saved successfully",
      data: progressData,
    })
  } catch (error) {
    console.error("❌ Error saving progress:", error)
    return NextResponse.json({ error: "Failed to save progress" }, { status: 500 })
  }
}

export async function GET() {
  return NextResponse.json({ message: "Progress API is working. Use POST to save progress." })
}
