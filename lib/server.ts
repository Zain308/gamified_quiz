import { createServerClient as createSupabaseClient } from "@supabase/ssr"
import { cookies } from "next/headers"

// Prefer real env-vars, otherwise use hard-coded fallbacks so the app
// keeps working in local/preview environments ­without .env.local
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://wzstatxvpedrymfjkuof.supabase.co"

const supabaseAnonKey =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind6c3RhdHh2cGVkcnltZmprdW9mIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE5Njc1MTgsImV4cCI6MjA2NzU0MzUxOH0.oyYv-QGrL73vRmXRafRUrKv-U4Uloe06KGreiIkndWw"

// Server-side Supabase client (for use in API routes only)
export async function getServerClient() {
  const cookieStore = await cookies()

  return createSupabaseClient(supabaseUrl, supabaseAnonKey, {
    cookies: {
      get(name: string) {
        return cookieStore.get(name)?.value
      },
      set(name: string, value: string, options: any) {
        try {
          cookieStore.set({ name, value, ...options })
        } catch (error) {
          // Ignore errors in Server Components
        }
      },
      remove(name: string, options: any) {
        try {
          cookieStore.set({ name, value: "", ...options })
        } catch (error) {
          // Ignore errors in Server Components
        }
      },
    },
  })
}
