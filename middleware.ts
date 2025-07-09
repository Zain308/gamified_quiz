import { createServerClient } from "@supabase/ssr"
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export async function middleware(request: NextRequest) {
  // Skip middleware for API routes and static files
  if (
    request.nextUrl.pathname.startsWith("/api/") ||
    request.nextUrl.pathname.startsWith("/_next/") ||
    request.nextUrl.pathname.includes(".")
  ) {
    return NextResponse.next()
  }

  // Skip middleware if environment variables are missing or are placeholders
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  const placeholderValues = [
    "your_supabase_project_url_here",
    "your_supabase_anon_key_here",
    "your-project-id.supabase.co",
    "https://your-project-id.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.your-anon-key-here",
  ]

  const isPlaceholder = (value: string) =>
    placeholderValues.some((placeholder) => value?.includes(placeholder) || placeholder.includes(value || ""))

  if (!supabaseUrl || !supabaseKey || isPlaceholder(supabaseUrl) || isPlaceholder(supabaseKey)) {
    console.log("Middleware: Demo mode detected, skipping auth checks")
    return NextResponse.next()
  }

  try {
    const response = NextResponse.next()

    const supabase = createServerClient(supabaseUrl, supabaseKey, {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value
        },
        set(name: string, value: string, options: any) {
          response.cookies.set({
            name,
            value,
            ...options,
          })
        },
        remove(name: string, options: any) {
          response.cookies.set({
            name,
            value: "",
            ...options,
          })
        },
      },
    })

    // Refresh the session
    const {
      data: { session },
      error,
    } = await supabase.auth.getSession()

    if (error) {
      console.warn("Middleware auth error:", error.message)
    }

    return response
  } catch (error) {
    // If anything fails, just continue without middleware
    console.warn("Middleware skipped due to error:", error)
    return NextResponse.next()
  }
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - api routes
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico
     * - public files (*.png, *.jpg, etc.)
     */
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)",
  ],
}
