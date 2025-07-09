"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { User, BarChart3, Trophy, Settings, LogOut } from "lucide-react"
import { createClient } from "@/lib/client"

interface UserInterface {
  id: string
  email: string
  name?: string
  avatar?: string
}

export function HeaderWithSignout() {
  const [user, setUser] = useState<UserInterface | null>(null)
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const [supabase, setSupabase] = useState<any>(null)

  useEffect(() => {
    const client = createClient()
    setSupabase(client)
  }, [])

  useEffect(() => {
    if (!supabase) return

    // Get current user
    const getCurrentUser = async () => {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser()
        if (user) {
          setUser({
            id: user.id,
            email: user.email || "demo@example.com",
            name: user.user_metadata?.full_name || user.email?.split("@")[0] || "Demo User",
            avatar: user.user_metadata?.avatar_url,
          })
        } else {
          // Demo user fallback
          setUser({
            id: "demo-user",
            email: "demo@example.com",
            name: "Demo User",
          })
        }
      } catch (error) {
        console.error("Error getting user:", error)
        // Set demo user as fallback
        setUser({
          id: "demo-user",
          email: "demo@example.com",
          name: "Demo User",
        })
      }
    }

    getCurrentUser()

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event: string, session: any) => {
      if (event === "SIGNED_IN" && session?.user) {
        setUser({
          id: session.user.id,
          email: session.user.email,
          name: session.user.user_metadata?.full_name || session.user.email?.split("@")[0],
          avatar: session.user.user_metadata?.avatar_url,
        })
      } else if (event === "SIGNED_OUT") {
        setUser(null)
      }
    })

    return () => subscription.unsubscribe()
  }, [supabase])

  const handleSignOut = async () => {
    setLoading(true)
    try {
      if (supabase) {
        await supabase.auth.signOut()
      }

      // Clear any local storage
      localStorage.clear()

      // Redirect to login
      router.push("/login")
    } catch (error) {
      console.error("Error signing out:", error)
    } finally {
      setLoading(false)
    }
  }

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase()
      .slice(0, 2)
  }

  if (!user) {
    return null
  }

  return (
    <div className="flex items-center justify-between p-4 bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="flex items-center space-x-3">
        <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center shadow-lg">
          <span className="text-white font-bold text-lg">Q</span>
        </div>
        <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          QuizMaster Pro
        </h1>
      </div>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="relative h-12 w-12 rounded-full hover:ring-2 hover:ring-blue-500/20 transition-all"
          >
            <Avatar className="h-12 w-12 ring-2 ring-blue-500/20 hover:ring-blue-500/40 transition-all">
              <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
              <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold text-lg">
                {getInitials(user.name || user.email)}
              </AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-64 p-2" align="end" forceMount>
          <DropdownMenuLabel className="font-normal p-3">
            <div className="flex flex-col space-y-2">
              <div className="flex items-center space-x-3">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                  <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold">
                    {getInitials(user.name || user.email)}
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                  <p className="text-sm font-medium leading-none">{user.name}</p>
                  <p className="text-xs leading-none text-muted-foreground mt-1">{user.email}</p>
                </div>
              </div>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />

          <DropdownMenuItem className="cursor-pointer p-3 rounded-lg hover:bg-blue-50 transition-colors">
            <User className="mr-3 h-4 w-4 text-blue-600" />
            <span className="text-sm font-medium">Profile</span>
          </DropdownMenuItem>

          <DropdownMenuItem className="cursor-pointer p-3 rounded-lg hover:bg-green-50 transition-colors">
            <BarChart3 className="mr-3 h-4 w-4 text-green-600" />
            <span className="text-sm font-medium">Statistics</span>
          </DropdownMenuItem>

          <DropdownMenuItem className="cursor-pointer p-3 rounded-lg hover:bg-yellow-50 transition-colors">
            <Trophy className="mr-3 h-4 w-4 text-yellow-600" />
            <span className="text-sm font-medium">Achievements</span>
          </DropdownMenuItem>

          <DropdownMenuItem className="cursor-pointer p-3 rounded-lg hover:bg-gray-50 transition-colors">
            <Settings className="mr-3 h-4 w-4 text-gray-600" />
            <span className="text-sm font-medium">Settings</span>
          </DropdownMenuItem>

          <DropdownMenuSeparator />

          <DropdownMenuItem
            className="cursor-pointer p-3 rounded-lg hover:bg-red-50 text-red-600 hover:text-red-700 transition-colors focus:bg-red-50 focus:text-red-700"
            onClick={handleSignOut}
            disabled={loading}
          >
            <LogOut className="mr-3 h-4 w-4" />
            <span className="text-sm font-medium">{loading ? "Signing out..." : "Sign out"}</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
