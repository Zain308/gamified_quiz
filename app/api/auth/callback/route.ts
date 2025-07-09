import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get("code")
  const error = requestUrl.searchParams.get("error")
  const errorDescription = requestUrl.searchParams.get("error_description")

  if (error) {
    console.error("Auth callback error:", error, errorDescription)
    return NextResponse.redirect(
      `${requestUrl.origin}/login?error=${encodeURIComponent(errorDescription || "Authentication failed")}`,
    )
  }

  if (code) {
    try {
      const supabase = createRouteHandlerClient({ cookies })
      const { data, error: exchangeError } = await supabase.auth.exchangeCodeForSession(code)

      if (exchangeError) {
        console.error("Code exchange error:", exchangeError)
        return NextResponse.redirect(
          `${requestUrl.origin}/login?error=${encodeURIComponent("Failed to complete authentication")}`,
        )
      }

      if (data.user) {
        // Check if this is a new user (first time signing in)
        const isNewUser = data.user.created_at === data.user.last_sign_in_at

        if (isNewUser) {
          // New user - redirect with welcome message
          return NextResponse.redirect(
            `${requestUrl.origin}/dashboard?success=${encodeURIComponent(
              "Welcome to QuizMaster Pro! Your account has been created successfully.",
            )}`,
          )
        } else {
          // Existing user - redirect with welcome back message
          return NextResponse.redirect(
            `${requestUrl.origin}/dashboard?success=${encodeURIComponent(
              "Welcome back! You have been signed in successfully.",
            )}`,
          )
        }
      }
    } catch (error) {
      console.error("Unexpected auth error:", error)
      return NextResponse.redirect(
        `${requestUrl.origin}/login?error=${encodeURIComponent("An unexpected error occurred during authentication")}`,
      )
    }
  }

  // Fallback redirect
  return NextResponse.redirect(`${requestUrl.origin}/dashboard`)
}
