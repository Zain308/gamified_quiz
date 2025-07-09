import { NextResponse } from "next/server"

export async function GET() {
  try {
    console.log("🧪 Quiz test endpoint called")

    const testQuestions = [
      {
        id: "test-1",
        question: "What is 2 + 2?",
        options: ["3", "4", "5", "6"],
        correctAnswer: "4",
      },
      {
        id: "test-2",
        question: "What color is the sky?",
        options: ["Red", "Blue", "Green", "Yellow"],
        correctAnswer: "Blue",
      },
      {
        id: "test-3",
        question: "How many days in a week?",
        options: ["5", "6", "7", "8"],
        correctAnswer: "7",
      },
      {
        id: "test-4",
        question: "What is the capital of France?",
        options: ["London", "Berlin", "Paris", "Madrid"],
        correctAnswer: "Paris",
      },
      {
        id: "test-5",
        question: "Which planet is closest to the sun?",
        options: ["Venus", "Mercury", "Earth", "Mars"],
        correctAnswer: "Mercury",
      },
    ]

    const response = {
      level: 1,
      topic: "Test",
      source: "test",
      questions: testQuestions,
    }

    console.log("✅ Test response generated successfully")
    return NextResponse.json(response)
  } catch (error) {
    console.error("❌ Test endpoint error:", error)
    return NextResponse.json({ error: "Test endpoint failed" }, { status: 500 })
  }
}
