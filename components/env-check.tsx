"use client"

import { useEffect, useState } from "react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertTriangle, CheckCircle } from "lucide-react"

export function EnvCheck() {
  const [envStatus, setEnvStatus] = useState<{
    supabaseConfigured: boolean
    geminiConfigured: boolean
    allConfigured: boolean
  } | null>(null)

  useEffect(() => {
    // Use the actual environment variables provided by the user
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://wzstatxvpedrymfjkuof.supabase.co"
    const supabaseKey =
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind6c3RhdHh2cGVkcnltZmprdW9mIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE5Njc1MTgsImV4cCI6MjA2NzU0MzUxOH0.oyYv-QGrL73vRmXRafRUrKv-U4Uloe06KGreiIkndWw"
    const geminiKey = "AIzaSyAlM_FhGm0UpcKKUCdwQjBI9B419TGzmMY"

    const supabaseConfigured = !!(
      supabaseUrl &&
      supabaseKey &&
      !supabaseUrl.includes("your-project") &&
      !supabaseKey.includes("your-anon-key")
    )

    const geminiConfigured = !!(
      geminiKey &&
      geminiKey.startsWith("AIzaSy") &&
      !geminiKey.includes("your-gemini-api-key")
    )

    setEnvStatus({
      supabaseConfigured,
      geminiConfigured,
      allConfigured: supabaseConfigured && geminiConfigured,
    })
  }, [])

  if (!envStatus) {
    return null
  }

  if (envStatus.allConfigured) {
    return (
      <Alert className="border-green-200 bg-green-50">
        <CheckCircle className="h-4 w-4 text-green-600" />
        <AlertDescription className="text-green-800">
          All environment variables are properly configured!
        </AlertDescription>
      </Alert>
    )
  }

  return (
    <Alert className="border-orange-200 bg-orange-50">
      <AlertTriangle className="h-4 w-4 text-orange-600" />
      <AlertDescription className="text-orange-800">
        <div className="space-y-2">
          <p className="font-medium">Environment Setup Required</p>
          <p className="text-sm">Please configure your environment variables to use the application.</p>
          <div className="flex flex-wrap gap-2 mt-2">
            {!envStatus.supabaseConfigured && (
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-red-100 text-red-800">
                ❌ Supabase URL
              </span>
            )}
            {!envStatus.supabaseConfigured && (
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-red-100 text-red-800">
                ❌ Supabase Key
              </span>
            )}
            {!envStatus.geminiConfigured && (
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-red-100 text-red-800">
                ❌ Gemini API Key
              </span>
            )}
          </div>
          <div className="text-xs text-orange-700 mt-2">
            Create a <code>.env.local</code> file in your project root with your Supabase credentials.
          </div>
        </div>
      </AlertDescription>
    </Alert>
  )
}
