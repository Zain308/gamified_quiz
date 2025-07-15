import { createBrowserClient } from "@supabase/ssr"

// Get environment variables with fallbacks
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ""
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ""

// List of placeholder values that indicate unconfigured environment
const PLACEHOLDER_VALUES = [
  "your_supabase_project_url_here",
  "your_supabase_anon_key_here",
  "your-project-id.supabase.co",
  "https://your-project-id.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.your-anon-key-here",
]

// v0 preview sandboxes are served from *.vusercontent.net and cannot reach
// external origins such as *.supabase.co – force Demo Mode there.
const isV0Preview = typeof window !== "undefined" && window.location.hostname.endsWith(".vusercontent.net")

// Check if we're in demo mode (no real credentials provided)
const isDemoMode =
  isV0Preview ||
  !supabaseUrl ||
  !supabaseAnonKey ||
  isPlaceholderValue(supabaseUrl) ||
  isPlaceholderValue(supabaseAnonKey)

// Validate URL format
function isValidUrl(string: string): boolean {
  try {
    const url = new URL(string)
    return url.protocol === "https:" && url.hostname.includes("supabase.co")
  } catch (_) {
    return false
  }
}

// Check if value is a placeholder
function isPlaceholderValue(value: string): boolean {
  return PLACEHOLDER_VALUES.some((placeholder) => value.includes(placeholder) || placeholder.includes(value))
}

// Mock Supabase client for demo mode
function createMockClient() {
  return {
    auth: {
      signUp: async ({ email, password }: any) => {
        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 1000))
        return {
          data: { user: { id: "demo-user", email } },
          error: null,
        }
      },
      signInWithPassword: async ({ email, password }: any) => {
        await new Promise((resolve) => setTimeout(resolve, 1000))
        if (email === "demo@example.com" && password === "demo123") {
          return {
            data: { user: { id: "demo-user", email } },
            error: null,
          }
        }
        return {
          data: { user: null },
          error: { message: "Invalid credentials. Try demo@example.com / demo123" },
        }
      },
      signInWithOAuth: async ({ provider }: any) => {
        await new Promise((resolve) => setTimeout(resolve, 1000))
        return {
          data: { user: { id: "demo-user", email: "demo@example.com" } },
          error: null,
        }
      },
      getUser: async () => {
        return {
          data: { user: { id: "demo-user", email: "demo@example.com" } },
          error: null,
        }
      },
      signOut: async () => {
        return { error: null }
      },
    },
  }
}

// Client-side Supabase client (for use in Client Components only)
export function createClient() {
  // If in demo mode, return mock client
  if (isDemoMode) {
    console.log("🎭 Running in demo mode - using mock Supabase client")
    return createMockClient()
  }

  // Validate URL format for real mode
  if (!isValidUrl(supabaseUrl)) {
    throw new Error(
      `Invalid Supabase URL format: "${supabaseUrl}"\n` + "Expected format: https://your-project-id.supabase.co",
    )
  }

  try {
    return createBrowserClient(supabaseUrl, supabaseAnonKey)
  } catch (error) {
    console.error("Failed to create Supabase client:", error)
    throw new Error("Failed to initialize Supabase client. Please check your configuration.")
  }
}

// Export demo mode status
export { isDemoMode }
