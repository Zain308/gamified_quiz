"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2, Mail, AlertCircle, CheckCircle, Chrome } from "lucide-react"
import { createClient } from "@/lib/client"

export default function LoginPage() {
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<{ type: "success" | "error" | "info"; text: string } | null>(null)
  const [isDemo, setIsDemo] = useState(false)
  const router = useRouter()
  const [supabase, setSupabase] = useState<any>(null)

  // Initialize Supabase safely (handles demo mode & fallbacks defined in lib/client)
  useEffect(() => {
    const client = createClient()
    setSupabase(client)
  }, [])

  useEffect(() => {
    // Check if we have proper environment variables
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ""
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ""

    // Check for placeholder values that indicate demo mode
    const placeholderValues = [
      "your_supabase_project_url_here",
      "your_supabase_anon_key_here",
      "your-project-id.supabase.co",
      "https://your-project-id.supabase.co",
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.your-anon-key-here",
    ]

    const isPlaceholder = (value: string) =>
      placeholderValues.some((placeholder) => value.includes(placeholder) || placeholder.includes(value))

    if (!supabaseUrl || !supabaseKey || isPlaceholder(supabaseUrl) || isPlaceholder(supabaseKey)) {
      setIsDemo(true)
      setMessage({
        type: "info",
        text: "Demo mode: Environment variables not configured. Using demo authentication.",
      })
    }

    // Check for auth callback messages
    const urlParams = new URLSearchParams(window.location.search)
    const error = urlParams.get("error")
    const success = urlParams.get("success")

    if (error) {
      setMessage({ type: "error", text: decodeURIComponent(error) })
    } else if (success) {
      setMessage({ type: "success", text: decodeURIComponent(success) })
    }

    // Check if user is already logged in
    const checkUser = async () => {
      try {
        if (supabase && !isDemo) {
          const {
            data: { user },
          } = await supabase.auth.getUser()
          if (user) {
            console.log("User already logged in, redirecting to dashboard")
            router.push("/dashboard")
          }
        }
      } catch (error) {
        console.log("Auth check error:", error)
      }
    }

    if (supabase) {
      checkUser()
    }
  }, [router, supabase])

  // Wait for Supabase client
  if (!supabase) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    )
  }

  const handleGoogleLogin = async () => {
    if (isDemo) {
      // Demo mode - simulate Google OAuth flow
      setLoading(true)
      setMessage({ type: "info", text: "Connecting to Google..." })

      // Simulate OAuth delay
      setTimeout(() => {
        setMessage({ type: "info", text: "Please select your Gmail account to continue..." })

        setTimeout(() => {
          setMessage({ type: "success", text: "Successfully authenticated! Redirecting to dashboard..." })

          setTimeout(() => {
            router.push("/dashboard")
          }, 1500)
        }, 2000)
      }, 1000)
      return
    }

    try {
      setLoading(true)
      setMessage({ type: "info", text: "Connecting to Google..." })

      // Get the current origin for the redirect URL
      const origin = window.location.origin
      const redirectTo = `${origin}/api/auth/callback`

      console.log("Starting Google OAuth with redirect:", redirectTo)

      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo,
          queryParams: {
            access_type: "offline",
            prompt: "consent",
          },
        },
      })

      if (error) {
        throw error
      }

      // The redirect will happen automatically
      setMessage({ type: "info", text: "Redirecting to Google..." })
    } catch (error: any) {
      console.error("Google login error:", error)
      setMessage({
        type: "error",
        text: error.message || "Failed to connect with Google. Please try again.",
      })
      setLoading(false)
    }
  }

  const handleDemoLogin = () => {
    setLoading(true)
    setMessage({ type: "info", text: "Logging in as demo user..." })

    setTimeout(() => {
      setMessage({ type: "success", text: "Demo login successful! Redirecting..." })
      setTimeout(() => {
        router.push("/dashboard")
      }, 1000)
    }, 1500)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-4">
      <div className="w-full max-w-md space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="flex items-center justify-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">Q</span>
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              QuizMaster Pro
            </h1>
          </div>
          <p className="text-gray-600">Sign in to continue your learning journey</p>
        </div>

        {/* Login Card */}
        <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader className="space-y-1 pb-4">
            <CardTitle className="text-xl text-center">Welcome Back</CardTitle>
            <CardDescription className="text-center">Choose your preferred sign-in method</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Status Message */}
            {message && (
              <Alert
                className={`border-l-4 ${
                  message.type === "success"
                    ? "border-green-500 bg-green-50 text-green-800"
                    : message.type === "error"
                      ? "border-red-500 bg-red-50 text-red-800"
                      : "border-blue-500 bg-blue-50 text-blue-800"
                }`}
              >
                <div className="flex items-center space-x-2">
                  {message.type === "success" && <CheckCircle className="h-4 w-4" />}
                  {message.type === "error" && <AlertCircle className="h-4 w-4" />}
                  {message.type === "info" && <Loader2 className="h-4 w-4 animate-spin" />}
                  <AlertDescription className="font-medium">{message.text}</AlertDescription>
                </div>
              </Alert>
            )}

            {/* Google Login Button */}
            <Button
              onClick={handleGoogleLogin}
              disabled={loading}
              className="w-full h-12 bg-white hover:bg-gray-50 text-gray-700 border border-gray-300 shadow-sm transition-all duration-200 hover:shadow-md"
              variant="outline"
            >
              {loading ? (
                <div className="flex items-center space-x-2">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>Connecting...</span>
                </div>
              ) : (
                <div className="flex items-center space-x-3">
                  <Chrome className="h-5 w-5 text-blue-600" />
                  <span className="font-medium">Continue with Google</span>
                </div>
              )}
            </Button>

            {/* Demo Mode */}
            {isDemo && (
              <>
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t border-gray-300" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-white px-2 text-gray-500">Or</span>
                  </div>
                </div>

                <Button
                  onClick={handleDemoLogin}
                  disabled={loading}
                  className="w-full h-12 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg transition-all duration-200 hover:shadow-xl"
                >
                  {loading ? (
                    <div className="flex items-center space-x-2">
                      <Loader2 className="h-4 w-4 animate-spin" />
                      <span>Signing in...</span>
                    </div>
                  ) : (
                    <div className="flex items-center space-x-2">
                      <Mail className="h-4 w-4" />
                      <span className="font-medium">Continue as Demo User</span>
                    </div>
                  )}
                </Button>
              </>
            )}

            {/* Terms */}
            <p className="text-xs text-gray-500 text-center leading-relaxed">
              By continuing, you agree to our{" "}
              <a href="#" className="text-blue-600 hover:underline">
                Terms of Service
              </a>{" "}
              and{" "}
              <a href="#" className="text-blue-600 hover:underline">
                Privacy Policy
              </a>
            </p>
          </CardContent>
        </Card>

        {/* Environment Status */}
        {isDemo && (
          <Card className="bg-amber-50 border-amber-200">
            <CardContent className="pt-4">
              <div className="flex items-start space-x-2">
                <AlertCircle className="h-4 w-4 text-amber-600 mt-0.5" />
                <div className="text-sm text-amber-800">
                  <p className="font-medium">Demo Mode Active</p>
                  <p className="text-xs mt-1">Configure your environment variables to enable full authentication.</p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
