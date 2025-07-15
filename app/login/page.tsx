"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Loader2, Mail, AlertCircle, CheckCircle, Chrome, Eye, EyeOff, User } from "lucide-react"
import { createClient, isDemoMode as defaultDemoMode } from "@/lib/client"

export default function LoginPage() {
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<{ type: "success" | "error" | "info"; text: string } | null>(null)
  // Initialise demo mode based on the shared flag from lib/client
  const [isDemo, setIsDemo] = useState(defaultDemoMode)
  const [showPassword, setShowPassword] = useState(false)
  const [activeTab, setActiveTab] = useState("signin")
  const router = useRouter()
  const [supabase, setSupabase] = useState<any>(null)

  // Form states
  const [signInForm, setSignInForm] = useState({ email: "", password: "" })
  const [signUpForm, setSignUpForm] = useState({ email: "", password: "", confirmPassword: "" })

  // Initialize Supabase safely
  useEffect(() => {
    const client = createClient()
    setSupabase(client)
  }, [])

  useEffect(() => {
    // If we were auto-switched to Demo Mode (e.g. v0 preview), show a banner
    if (defaultDemoMode) {
      setMessage({
        type: "info",
        text: "Running in Demo Mode – external Supabase calls are disabled in the preview sandbox.",
      })
    } else {
      // Fallback check in case env vars are missing in non-preview environments
      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
      const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
      if (!supabaseUrl || !supabaseKey) {
        setIsDemo(true)
        setMessage({
          type: "info",
          text: "Demo mode: Environment variables not configured. You can still test the app!",
        })
      }
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
        if (supabase) {
          const {
            data: { user },
          } = await supabase.auth.getUser()
          if (user) {
            router.push("/dashboard")
          }
        }
      } catch (error) {
        console.log("Auth check error:", error)
      }
    }

    if (!isDemo && supabase) {
      checkUser()
    }
  }, [router, supabase, isDemo])

  // Wait for Supabase client
  if (!supabase) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        <div className="flex items-center space-x-2">
          <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
          <span className="text-gray-600">Loading...</span>
        </div>
      </div>
    )
  }

  const handleGoogleLogin = async () => {
    if (isDemo) {
      // Demo mode - simulate Google OAuth flow
      setLoading(true)
      setMessage({ type: "info", text: "Connecting to Google..." })

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

      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${window.location.origin}/api/auth/callback`,
          queryParams: {
            access_type: "offline",
            prompt: "consent",
          },
        },
      })

      if (error) {
        throw error
      }

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

  const handleEmailSignIn = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!signInForm.email || !signInForm.password) {
      setMessage({ type: "error", text: "Please fill in all fields" })
      return
    }

    if (isDemo) {
      setLoading(true)
      setMessage({ type: "info", text: "Signing in..." })

      setTimeout(() => {
        if (signInForm.email === "demo@example.com" && signInForm.password === "demo123") {
          setMessage({ type: "success", text: "Demo login successful! Redirecting..." })
          setTimeout(() => router.push("/dashboard"), 1000)
        } else {
          setMessage({ type: "error", text: "Demo credentials: demo@example.com / demo123" })
          setLoading(false)
        }
      }, 1500)
      return
    }

    try {
      setLoading(true)
      setMessage({ type: "info", text: "Signing in..." })

      const { data, error } = await supabase.auth.signInWithPassword({
        email: signInForm.email,
        password: signInForm.password,
      })

      if (error) {
        throw error
      }

      setMessage({ type: "success", text: "Successfully signed in! Redirecting..." })
      setTimeout(() => router.push("/dashboard"), 1000)
    } catch (error: any) {
      console.error("Sign in error:", error)
      setMessage({
        type: "error",
        text: error.message || "Failed to sign in. Please check your credentials.",
      })
      setLoading(false)
    }
  }

  const handleEmailSignUp = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!signUpForm.email || !signUpForm.password || !signUpForm.confirmPassword) {
      setMessage({ type: "error", text: "Please fill in all fields" })
      return
    }

    if (signUpForm.password !== signUpForm.confirmPassword) {
      setMessage({ type: "error", text: "Passwords do not match" })
      return
    }

    if (signUpForm.password.length < 6) {
      setMessage({ type: "error", text: "Password must be at least 6 characters long" })
      return
    }

    if (isDemo) {
      setLoading(true)
      setMessage({ type: "info", text: "Creating demo account..." })

      setTimeout(() => {
        setMessage({ type: "success", text: "Demo account created! Redirecting..." })
        setTimeout(() => router.push("/dashboard"), 1000)
      }, 1500)
      return
    }

    try {
      setLoading(true)
      setMessage({ type: "info", text: "Creating your account..." })

      const { data, error } = await supabase.auth.signUp({
        email: signUpForm.email,
        password: signUpForm.password,
        options: {
          emailRedirectTo: `${window.location.origin}/api/auth/callback`,
        },
      })

      if (error) {
        throw error
      }

      if (data.user && !data.user.email_confirmed_at) {
        setMessage({
          type: "success",
          text: "Account created! Please check your email to verify your account before signing in.",
        })
        setActiveTab("signin")
      } else {
        setMessage({ type: "success", text: "Account created successfully! Redirecting..." })
        setTimeout(() => router.push("/dashboard"), 1000)
      }
    } catch (error: any) {
      console.error("Sign up error:", error)
      setMessage({
        type: "error",
        text: error.message || "Failed to create account. Please try again.",
      })
    } finally {
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
          <p className="text-gray-600">Welcome to your learning journey</p>
        </div>

        {/* Auth Card */}
        <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader className="space-y-1 pb-4">
            <CardTitle className="text-xl text-center">Get Started</CardTitle>
            <CardDescription className="text-center">Sign in to your account or create a new one</CardDescription>
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

            {/* Divider */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white px-2 text-gray-500">Or continue with email</span>
              </div>
            </div>

            {/* Email Auth Tabs */}
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="signin">Sign In</TabsTrigger>
                <TabsTrigger value="signup">Sign Up</TabsTrigger>
              </TabsList>

              <TabsContent value="signin" className="space-y-4 mt-4">
                <form onSubmit={handleEmailSignIn} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="signin-email">Email</Label>
                    <Input
                      id="signin-email"
                      type="email"
                      placeholder="Enter your email"
                      value={signInForm.email}
                      onChange={(e) => setSignInForm({ ...signInForm, email: e.target.value })}
                      disabled={loading}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signin-password">Password</Label>
                    <div className="relative">
                      <Input
                        id="signin-password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your password"
                        value={signInForm.password}
                        onChange={(e) => setSignInForm({ ...signInForm, password: e.target.value })}
                        disabled={loading}
                        required
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                        onClick={() => setShowPassword(!showPassword)}
                        disabled={loading}
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </Button>
                    </div>
                  </div>
                  <Button
                    type="submit"
                    className="w-full h-11 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg transition-all duration-200 hover:shadow-xl"
                    disabled={loading}
                  >
                    {loading ? (
                      <div className="flex items-center space-x-2">
                        <Loader2 className="h-4 w-4 animate-spin" />
                        <span>Signing in...</span>
                      </div>
                    ) : (
                      <div className="flex items-center space-x-2">
                        <Mail className="h-4 w-4" />
                        <span>Sign In</span>
                      </div>
                    )}
                  </Button>
                </form>
              </TabsContent>

              <TabsContent value="signup" className="space-y-4 mt-4">
                <form onSubmit={handleEmailSignUp} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="signup-email">Email</Label>
                    <Input
                      id="signup-email"
                      type="email"
                      placeholder="Enter your email"
                      value={signUpForm.email}
                      onChange={(e) => setSignUpForm({ ...signUpForm, email: e.target.value })}
                      disabled={loading}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signup-password">Password</Label>
                    <div className="relative">
                      <Input
                        id="signup-password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Create a password (min. 6 characters)"
                        value={signUpForm.password}
                        onChange={(e) => setSignUpForm({ ...signUpForm, password: e.target.value })}
                        disabled={loading}
                        required
                        minLength={6}
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                        onClick={() => setShowPassword(!showPassword)}
                        disabled={loading}
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </Button>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signup-confirm-password">Confirm Password</Label>
                    <Input
                      id="signup-confirm-password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Confirm your password"
                      value={signUpForm.confirmPassword}
                      onChange={(e) => setSignUpForm({ ...signUpForm, confirmPassword: e.target.value })}
                      disabled={loading}
                      required
                    />
                  </div>
                  <Button
                    type="submit"
                    className="w-full h-11 bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white shadow-lg transition-all duration-200 hover:shadow-xl"
                    disabled={loading}
                  >
                    {loading ? (
                      <div className="flex items-center space-x-2">
                        <Loader2 className="h-4 w-4 animate-spin" />
                        <span>Creating account...</span>
                      </div>
                    ) : (
                      <div className="flex items-center space-x-2">
                        <User className="h-4 w-4" />
                        <span>Create Account</span>
                      </div>
                    )}
                  </Button>
                </form>
              </TabsContent>
            </Tabs>

            {/* Demo Mode */}
            {isDemo && (
              <>
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t border-gray-300" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-white px-2 text-gray-500">Demo Mode</span>
                  </div>
                </div>

                <Button
                  onClick={handleDemoLogin}
                  disabled={loading}
                  className="w-full h-11 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white shadow-lg transition-all duration-200 hover:shadow-xl"
                >
                  {loading ? (
                    <div className="flex items-center space-x-2">
                      <Loader2 className="h-4 w-4 animate-spin" />
                      <span>Signing in...</span>
                    </div>
                  ) : (
                    <div className="flex items-center space-x-2">
                      <User className="h-4 w-4" />
                      <span>Try Demo (No Signup Required)</span>
                    </div>
                  )}
                </Button>

                <div className="text-xs text-center text-gray-500 space-y-1">
                  <p>Demo credentials for email login:</p>
                  <p className="font-mono bg-gray-100 px-2 py-1 rounded">demo@example.com / demo123</p>
                </div>
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
                  <p className="text-xs mt-1">
                    Configure your Supabase environment variables to enable full authentication.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
