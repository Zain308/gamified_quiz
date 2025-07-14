import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  try {
    console.log("🧪 Testing Gemini API configuration...")

    // Get API key
    const geminiApiKey = process.env.GEMINI_API_KEY

    if (!geminiApiKey) {
      return NextResponse.json(
        {
          status: "error",
          message: "GEMINI_API_KEY environment variable is not set",
          suggestions: [
            "Add GEMINI_API_KEY to your .env.local file",
            "Get your API key from https://makersuite.google.com/app/apikey",
            "Restart your development server after adding the key",
          ],
        },
        { status: 400 },
      )
    }

    if (geminiApiKey.length < 30) {
      return NextResponse.json(
        {
          status: "error",
          message: "GEMINI_API_KEY appears to be too short",
          keyLength: geminiApiKey.length,
          suggestions: [
            "Verify your API key is complete",
            "API keys should be around 39 characters long",
            "Check for any truncation in your .env.local file",
          ],
        },
        { status: 400 },
      )
    }

    if (!geminiApiKey.startsWith("AIzaSy")) {
      return NextResponse.json(
        {
          status: "error",
          message: "GEMINI_API_KEY doesn't appear to be a valid Gemini API key",
          keyPrefix: geminiApiKey.substring(0, 6),
          suggestions: [
            "Gemini API keys should start with 'AIzaSy'",
            "Make sure you're using a Gemini API key, not another Google service key",
            "Get a new key from https://makersuite.google.com/app/apikey",
          ],
        },
        { status: 400 },
      )
    }

    // Test API call
    console.log("🔑 API key format looks valid, testing connection...")

    const testResponse = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${geminiApiKey}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: "Generate a simple test response: What is 2+2? Respond with just the number.",
                },
              ],
            },
          ],
          generationConfig: {
            temperature: 0.1,
            maxOutputTokens: 10,
          },
        }),
      },
    )

    if (!testResponse.ok) {
      const errorText = await testResponse.text()
      return NextResponse.json(
        {
          status: "error",
          message: "Gemini API call failed",
          httpStatus: testResponse.status,
          errorDetails: errorText,
          suggestions: [
            "Check if your API key is valid and active",
            "Verify your API key has the necessary permissions",
            "Try generating a new API key",
            "Check if you have exceeded your API quota",
          ],
        },
        { status: 400 },
      )
    }

    const testData = await testResponse.json()

    if (testData.candidates && testData.candidates[0] && testData.candidates[0].content) {
      const response = testData.candidates[0].content.parts[0].text

      return NextResponse.json({
        status: "success",
        message: "Gemini API is working correctly!",
        testResponse: response.trim(),
        apiKeyStatus: "valid",
        keyLength: geminiApiKey.length,
        timestamp: new Date().toISOString(),
        nextSteps: [
          "Your API is ready to generate quiz questions",
          "Try creating a quiz to test the full functionality",
          "The system will now use AI to generate all questions dynamically",
        ],
      })
    } else {
      return NextResponse.json({
        status: "warning",
        message: "API responded but with unexpected format",
        response: testData,
        suggestions: [
          "The API key works but response format is unexpected",
          "This might still work for quiz generation",
          "Monitor the logs for any issues",
        ],
      })
    }
  } catch (error) {
    console.error("❌ API test error:", error)
    return NextResponse.json(
      {
        status: "error",
        message: "Failed to test Gemini API",
        error: error instanceof Error ? error.message : "Unknown error",
        suggestions: [
          "Check your internet connection",
          "Verify the API endpoint is accessible",
          "Try again in a few moments",
        ],
      },
      { status: 500 },
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const { topic, level } = await request.json()

    if (!topic || !level) {
      return NextResponse.json(
        {
          error: "Please provide both topic and level for testing",
        },
        { status: 400 },
      )
    }

    console.log(`🧪 Testing quiz generation for: ${topic} (Level ${level})`)

    // Test the actual quiz generation
    const quizResponse = await fetch(`${request.nextUrl.origin}/api/quiz`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ topic, level }),
    })

    const quizData = await quizResponse.json()

    return NextResponse.json({
      status: quizResponse.ok ? "success" : "error",
      message: quizResponse.ok ? `Successfully generated quiz for ${topic}` : "Quiz generation failed",
      quizData,
      httpStatus: quizResponse.status,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    return NextResponse.json(
      {
        status: "error",
        message: "Test failed",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}
