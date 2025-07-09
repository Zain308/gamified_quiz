"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { HeaderWithSignout } from "@/components/header-with-signout"
import {
  Trophy,
  Target,
  Zap,
  Star,
  BookOpen,
  Code,
  Globe,
  Database,
  Play,
  Clock,
  Users,
  TrendingUp,
} from "lucide-react"
import { useRouter } from "next/navigation"

interface QuizStats {
  totalQuizzes: number
  averageScore: number
  currentStreak: number
  rank: number
  totalXP: number
  level: number
}

interface TopicData {
  id: string
  name: string
  description: string
  icon: any
  difficulty: "Beginner" | "Intermediate" | "Advanced"
  questionsCount: number
  estimatedTime: string
  category: string
  color: string
  progress: number
  lastScore?: number
}

const topics: TopicData[] = [
  {
    id: "javascript",
    name: "JavaScript",
    description: "Modern JavaScript concepts, ES6+, async programming",
    icon: Code,
    difficulty: "Intermediate",
    questionsCount: 25,
    estimatedTime: "15 min",
    category: "Programming Languages",
    color: "from-yellow-500 to-orange-500",
    progress: 75,
    lastScore: 85,
  },
  {
    id: "python",
    name: "Python",
    description: "Python fundamentals, data structures, OOP concepts",
    icon: Code,
    difficulty: "Beginner",
    questionsCount: 30,
    estimatedTime: "20 min",
    category: "Programming Languages",
    color: "from-blue-500 to-green-500",
    progress: 60,
    lastScore: 78,
  },
  {
    id: "react",
    name: "React",
    description: "React hooks, components, state management, JSX",
    icon: Globe,
    difficulty: "Intermediate",
    questionsCount: 20,
    estimatedTime: "12 min",
    category: "Web Development",
    color: "from-cyan-500 to-blue-500",
    progress: 40,
    lastScore: 92,
  },
  {
    id: "html",
    name: "HTML",
    description: "Semantic HTML, accessibility, modern HTML5 features",
    icon: Globe,
    difficulty: "Beginner",
    questionsCount: 15,
    estimatedTime: "10 min",
    category: "Web Development",
    color: "from-orange-500 to-red-500",
    progress: 90,
    lastScore: 88,
  },
  {
    id: "css",
    name: "CSS",
    description: "Flexbox, Grid, animations, responsive design",
    icon: Globe,
    difficulty: "Intermediate",
    questionsCount: 22,
    estimatedTime: "14 min",
    category: "Web Development",
    color: "from-pink-500 to-purple-500",
    progress: 55,
    lastScore: 76,
  },
  {
    id: "data-structures",
    name: "Data Structures",
    description: "Arrays, linked lists, trees, graphs, hash tables",
    icon: Database,
    difficulty: "Advanced",
    questionsCount: 35,
    estimatedTime: "25 min",
    category: "Computer Science",
    color: "from-purple-500 to-indigo-500",
    progress: 30,
    lastScore: 82,
  },
  {
    id: "algorithms",
    name: "Algorithms",
    description: "Sorting, searching, dynamic programming, complexity",
    icon: Target,
    difficulty: "Advanced",
    questionsCount: 40,
    estimatedTime: "30 min",
    category: "Computer Science",
    color: "from-indigo-500 to-purple-500",
    progress: 25,
    lastScore: 79,
  },
]

const categories = [
  { name: "Programming Languages", icon: Code, count: 2 },
  { name: "Web Development", icon: Globe, count: 3 },
  { name: "Computer Science", icon: Database, count: 2 },
]

export default function Dashboard() {
  const router = useRouter()
  const [stats, setStats] = useState<QuizStats>({
    totalQuizzes: 0,
    averageScore: 0,
    currentStreak: 0,
    rank: 0,
    totalXP: 0,
    level: 1,
  })
  const [selectedCategory, setSelectedCategory] = useState<string>("All")

  useEffect(() => {
    // Load user stats from localStorage or API
    const savedStats = localStorage.getItem("quizStats")
    if (savedStats) {
      setStats(JSON.parse(savedStats))
    } else {
      // Initialize with demo data
      const demoStats = {
        totalQuizzes: 12,
        averageScore: 82,
        currentStreak: 5,
        rank: 156,
        totalXP: 2450,
        level: 3,
      }
      setStats(demoStats)
      localStorage.setItem("quizStats", JSON.stringify(demoStats))
    }
  }, [])

  const startQuiz = (topicId: string) => {
    router.push(`/quiz?topic=${topicId}`)
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Beginner":
        return "bg-green-100 text-green-800"
      case "Intermediate":
        return "bg-yellow-100 text-yellow-800"
      case "Advanced":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const filteredTopics =
    selectedCategory === "All" ? topics : topics.filter((topic) => topic.category === selectedCategory)

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <HeaderWithSignout />

      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Welcome back! 👋</h1>
          <p className="text-lg text-gray-600">Ready to challenge yourself with some quizzes?</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-to-r from-green-500 to-emerald-500 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-100 text-sm font-medium">Total Quizzes</p>
                  <p className="text-3xl font-bold">{stats.totalQuizzes}</p>
                </div>
                <Target className="h-8 w-8 text-green-100" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-orange-500 to-red-500 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-orange-100 text-sm font-medium">Current Streak</p>
                  <p className="text-3xl font-bold">{stats.currentStreak}</p>
                </div>
                <Zap className="h-8 w-8 text-orange-100" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100 text-sm font-medium">Average Score</p>
                  <p className="text-3xl font-bold">{stats.averageScore}%</p>
                </div>
                <TrendingUp className="h-8 w-8 text-blue-100" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-purple-500 to-pink-500 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-100 text-sm font-medium">Global Rank</p>
                  <p className="text-3xl font-bold">#{stats.rank}</p>
                </div>
                <Trophy className="h-8 w-8 text-purple-100" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Level Progress */}
        <Card className="mb-8 border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Star className="h-5 w-5 text-yellow-500" />
              Level {stats.level} Progress
            </CardTitle>
            <CardDescription>
              {stats.totalXP} XP earned • {Math.max(0, stats.level * 1000 - stats.totalXP)} XP to next level
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Progress value={(stats.totalXP % 1000) / 10} className="h-3" />
          </CardContent>
        </Card>

        {/* Category Filter */}
        <div className="mb-6">
          <div className="flex flex-wrap gap-2">
            <Button
              variant={selectedCategory === "All" ? "default" : "outline"}
              onClick={() => setSelectedCategory("All")}
              className="mb-2"
            >
              All Topics
            </Button>
            {categories.map((category) => (
              <Button
                key={category.name}
                variant={selectedCategory === category.name ? "default" : "outline"}
                onClick={() => setSelectedCategory(category.name)}
                className="mb-2"
              >
                <category.icon className="h-4 w-4 mr-2" />
                {category.name} ({category.count})
              </Button>
            ))}
          </div>
        </div>

        {/* Quiz Topics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTopics.map((topic) => {
            const IconComponent = topic.icon
            return (
              <Card
                key={topic.id}
                className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className={`p-3 rounded-lg bg-gradient-to-r ${topic.color} shadow-lg`}>
                      <IconComponent className="h-6 w-6 text-white" />
                    </div>
                    <Badge className={getDifficultyColor(topic.difficulty)}>{topic.difficulty}</Badge>
                  </div>
                  <CardTitle className="text-xl font-bold">{topic.name}</CardTitle>
                  <CardDescription className="text-sm text-gray-600">{topic.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                      <BookOpen className="h-4 w-4" />
                      {topic.questionsCount} questions
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      {topic.estimatedTime}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Progress</span>
                      <span>{topic.progress}%</span>
                    </div>
                    <Progress value={topic.progress} className="h-2" />
                  </div>

                  {topic.lastScore && (
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-500">Last Score:</span>
                      <span className="font-semibold text-green-600">{topic.lastScore}%</span>
                    </div>
                  )}

                  <Button
                    onClick={() => startQuiz(topic.id)}
                    className={`w-full bg-gradient-to-r ${topic.color} hover:opacity-90 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300`}
                  >
                    <Play className="h-4 w-4 mr-2" />
                    Start Quiz
                  </Button>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Quick Actions */}
        <Card className="mt-8 border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="h-5 w-5 text-yellow-500" />
              Quick Actions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button variant="outline" className="h-16 flex-col gap-2 bg-transparent">
                <Users className="h-5 w-5" />
                <span>Challenge Friends</span>
              </Button>
              <Button variant="outline" className="h-16 flex-col gap-2 bg-transparent">
                <Target className="h-5 w-5" />
                <span>Random Quiz</span>
              </Button>
              <Button variant="outline" className="h-16 flex-col gap-2 bg-transparent">
                <Trophy className="h-5 w-5" />
                <span>View Leaderboard</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
