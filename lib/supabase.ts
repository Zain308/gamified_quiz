import { createClient } from "@supabase/supabase-js"
import { cookies } from "next/headers"

// Use environment variables with fallbacks to your actual credentials
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://wzstatxvpedrymfjkuof.supabase.co"
const supabaseKey =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind6c3RhdHh2cGVkcnltZmprdW9mIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE5Njc1MTgsImV4cCI6MjA2NzU0MzUxOH0.oyYv-QGrL73vRmXRafRUrKv-U4Uloe06KGreiIkndWw"

// Client-side Supabase client (for use in Client Components only)
export const supabaseClient = createClient(supabaseUrl, supabaseKey)

// Server-side Supabase client for Server Components and API routes
export async function createServerClient() {
  const cookieStore = await cookies()

  return createClient(supabaseUrl, supabaseKey, {
    cookies: {
      get(name: string) {
        return cookieStore.get(name)?.value
      },
      set(name: string, value: string, options: any) {
        try {
          cookieStore.set({ name, value, ...options })
        } catch (error) {
          // The `set` method was called from a Server Component.
          // This can be ignored if you have middleware refreshing
          // user sessions.
        }
      },
      remove(name: string, options: any) {
        try {
          cookieStore.set({ name, value: "", ...options })
        } catch (error) {
          // The `remove` method was called from a Server Component.
          // This can be ignored if you have middleware refreshing
          // user sessions.
        }
      },
    },
  })
}
