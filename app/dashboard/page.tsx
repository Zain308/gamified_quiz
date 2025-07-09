"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Trophy,
  Target,
  Zap,
  Star,
  Crown,
  Flame,
  Play,
  CheckCircle,
  TrendingUp,
  Award,
  Brain,
  Code,
  Database,
  Shield,
  Cloud,
  Smartphone,
  Globe,
  Cpu,
  Network,
  BarChart3,
  Blocks,
  GitBranch,
  BookOpen,
} from "lucide-react"

interface TopicProgress {
  topic: string
  level: number
  score: number
  completed: boolean
  lastAttempt?: string
}

interface UserStats {
  totalXP: number
  streak: number
  rank: string
  completedTopics: number
  totalQuizzes: number
}

export default function Dashboard() {
  const router = useRouter()
  const [customTopic, setCustomTopic] = useState("")
  const [progress, setProgress] = useState<TopicProgress[]>([])
  const [userStats, setUserStats] = useState<UserStats>({
    totalXP: 0,
    streak: 0,
    rank: "Beginner",
    completedTopics: 0,
    totalQuizzes: 0,
  })
  const [loading, setLoading] = useState(true)

  // Comprehensive topics for computer science students
  const popularTopics = [
    // Programming Languages
    {
      name: "Python",
      icon: Code,
      emoji: "🐍",
      category: "Programming",
      difficulty: "Beginner",
      color: "bg-green-100 text-green-800",
    },
    {
      name: "JavaScript",
      icon: Code,
      emoji: "⚡",
      category: "Programming",
      difficulty: "Beginner",
      color: "bg-yellow-100 text-yellow-800",
    },
    {
      name: "Java",
      icon: Code,
      emoji: "☕",
      category: "Programming",
      difficulty: "Intermediate",
      color: "bg-orange-100 text-orange-800",
    },
    {
      name: "React",
      icon: Code,
      emoji: "⚛️",
      category: "Frontend",
      difficulty: "Intermediate",
      color: "bg-blue-100 text-blue-800",
    },

    // Core Computer Science
    {
      name: "Data Structures",
      icon: Database,
      emoji: "🏗️",
      category: "CS Fundamentals",
      difficulty: "Intermediate",
      color: "bg-purple-100 text-purple-800",
    },
    {
      name: "Algorithms",
      icon: Cpu,
      emoji: "⚙️",
      category: "CS Fundamentals",
      difficulty: "Advanced",
      color: "bg-red-100 text-red-800",
    },
    {
      name: "Operating Systems",
      icon: Cpu,
      emoji: "💻",
      category: "Systems",
      difficulty: "Intermediate",
      color: "bg-gray-100 text-gray-800",
    },
    {
      name: "Computer Networks",
      icon: Network,
      emoji: "🌐",
      category: "Systems",
      difficulty: "Intermediate",
      color: "bg-indigo-100 text-indigo-800",
    },

    // Database & Backend
    {
      name: "Database Management",
      icon: Database,
      emoji: "🗄️",
      category: "Backend",
      difficulty: "Intermediate",
      color: "bg-green-100 text-green-800",
    },
    {
      name: "Software Engineering",
      icon: GitBranch,
      emoji: "🛠️",
      category: "Engineering",
      difficulty: "Intermediate",
      color: "bg-blue-100 text-blue-800",
    },

    // Modern Technologies
    {
      name: "Machine Learning",
      icon: Brain,
      emoji: "🤖",
      category: "AI/ML",
      difficulty: "Advanced",
      color: "bg-pink-100 text-pink-800",
    },
    {
      name: "Artificial Intelligence",
      icon: Brain,
      emoji: "🧠",
      category: "AI/ML",
      difficulty: "Advanced",
      color: "bg-purple-100 text-purple-800",
    },
    {
      name: "Web Development",
      icon: Globe,
      emoji: "🌍",
      category: "Development",
      difficulty: "Beginner",
      color: "bg-green-100 text-green-800",
    },
    {
      name: "Mobile Development",
      icon: Smartphone,
      emoji: "📱",
      category: "Development",
      difficulty: "Intermediate",
      color: "bg-blue-100 text-blue-800",
    },

    // Security & Cloud
    {
      name: "Cybersecurity",
      icon: Shield,
      emoji: "🔒",
      category: "Security",
      difficulty: "Advanced",
      color: "bg-red-100 text-red-800",
    },
    {
      name: "Cloud Computing",
      icon: Cloud,
      emoji: "☁️",
      category: "Infrastructure",
      difficulty: "Intermediate",
      color: "bg-sky-100 text-sky-800",
    },
    {
      name: "DevOps",
      icon: GitBranch,
      emoji: "🔄",
      category: "Operations",
      difficulty: "Advanced",
      color: "bg-orange-100 text-orange-800",
    },

    // Data & Analytics
    {
      name: "Data Science",
      icon: BarChart3,
      emoji: "📊",
      category: "Data",
      difficulty: "Intermediate",
      color: "bg-teal-100 text-teal-800",
    },
    {
      name: "Blockchain",
      icon: Blocks,
      emoji: "⛓️",
      category: "Emerging Tech",
      difficulty: "Advanced",
      color: "bg-yellow-100 text-yellow-800",
    },
  ]

  useEffect(() => {
    loadUserProgress()
  }, [])

  const loadUserProgress = async () => {
    try {
      setLoading(true)
      // Simulate loading user progress - replace with actual API call
      const mockProgress: TopicProgress[] = [
        { topic: "JavaScript", level: 3, score: 85, completed: true },
        { topic: "Python", level: 2, score: 75, completed: true },
        { topic: "Data Structures", level: 1, score: 45, completed: false },
        { topic: "React", level: 2, score: 90, completed: true },
        { topic: "Machine Learning", level: 1, score: 60, completed: false },
      ]

      setProgress(mockProgress)

      // Calculate user stats
      const totalXP = mockProgress.reduce((sum, p) => sum + p.score * p.level * 10, 0)
      const completedTopics = mockProgress.filter((p) => p.completed).length
      const totalQuizzes = mockProgress.length

      setUserStats({
        totalXP,
        streak: 7, // Mock streak
        rank: getRank(totalXP),
        completedTopics,
        totalQuizzes,
      })
    } catch (error) {
      console.error("Error loading progress:", error)
    } finally {
      setLoading(false)
    }
  }

  const getRank = (xp: number): string => {
    if (xp >= 10000) return "Master"
    if (xp >= 5000) return "Expert"
    if (xp >= 2500) return "Advanced"
    if (xp >= 1000) return "Intermediate"
    return "Beginner"
  }

  const getRankIcon = (rank: string) => {
    switch (rank) {
      case "Master":
        return <Crown className="w-5 h-5 text-yellow-500" />
      case "Expert":
        return <Trophy className="w-5 h-5 text-purple-500" />
      case "Advanced":
        return <Award className="w-5 h-5 text-blue-500" />
      case "Intermediate":
        return <Star className="w-5 h-5 text-green-500" />
      default:
        return <Target className="w-5 h-5 text-gray-500" />
    }
  }

  const getTopicProgress = (topicName: string) => {
    return progress.find((p) => p.topic.toLowerCase() === topicName.toLowerCase())
  }

  const startQuiz = (topic: string, level = 1) => {
    const topicProgress = getTopicProgress(topic)
    const startLevel = topicProgress ? Math.min(topicProgress.level + (topicProgress.completed ? 0 : 1), 5) : level
    router.push(`/quiz?topic=${encodeURIComponent(topic)}&level=${startLevel}`)
  }

  const handleCustomTopicSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (customTopic.trim()) {
      startQuiz(customTopic.trim())
      setCustomTopic("")
    }
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

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Programming":
        return "bg-blue-100 text-blue-800"
      case "Frontend":
        return "bg-purple-100 text-purple-800"
      case "Backend":
        return "bg-green-100 text-green-800"
      case "CS Fundamentals":
        return "bg-indigo-100 text-indigo-800"
      case "Systems":
        return "bg-gray-100 text-gray-800"
      case "AI/ML":
        return "bg-pink-100 text-pink-800"
      case "Security":
        return "bg-red-100 text-red-800"
      case "Data":
        return "bg-teal-100 text-teal-800"
      case "Infrastructure":
        return "bg-sky-100 text-sky-800"
      case "Operations":
        return "bg-orange-100 text-orange-800"
      case "Development":
        return "bg-green-100 text-green-800"
      case "Engineering":
        return "bg-blue-100 text-blue-800"
      case "Emerging Tech":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-lg text-gray-600">Loading your dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Welcome to QuizMaster 🎯</h1>
          <p className="text-lg text-gray-600">Master Computer Science with AI-powered quizzes</p>
        </motion.div>

        {/* User Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8"
        >
          <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100 text-sm">Total XP</p>
                  <p className="text-2xl font-bold">{userStats.totalXP.toLocaleString()}</p>
                </div>
                <Zap className="w-8 h-8 text-blue-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-orange-500 to-orange-600 text-white">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-orange-100 text-sm">Current Streak</p>
                  <p className="text-2xl font-bold">{userStats.streak}</p>
                </div>
                <Flame className="w-8 h-8 text-orange-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-100 text-green-800">Completed Topics</p>
                  <p className="text-2xl font-bold">{userStats.completedTopics}</p>
                </div>
                <CheckCircle className="w-8 h-8 text-green-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-100 text-sm">Current Rank</p>
                  <div className="flex items-center gap-2">
                    <p className="text-xl font-bold">{userStats.rank}</p>
                    {getRankIcon(userStats.rank)}
                  </div>
                </div>
                <TrendingUp className="w-8 h-8 text-purple-200" />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Custom Topic Input */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <Card className="bg-white shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="w-5 h-5 text-blue-500" />
                Start Learning Any Topic
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleCustomTopicSubmit} className="flex gap-4">
                <Input
                  type="text"
                  placeholder="Enter any topic (e.g., Python, Machine Learning, Blockchain...)"
                  value={customTopic}
                  onChange={(e) => setCustomTopic(e.target.value)}
                  className="flex-1 text-lg py-6"
                />
                <Button
                  type="submit"
                  className="px-8 py-6 text-lg bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700"
                  disabled={!customTopic.trim()}
                >
                  <Play className="w-5 h-5 mr-2" />
                  Start Quiz
                </Button>
              </form>
              <p className="text-sm text-gray-500 mt-2">
                Our AI will generate personalized questions for any topic you choose!
              </p>
            </CardContent>
          </Card>
        </motion.div>

        {/* Popular Topics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-8"
        >
          <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
            <BookOpen className="w-6 h-6 text-blue-500" />
            Computer Science Topics
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {popularTopics.map((topic, index) => {
              const topicProgress = getTopicProgress(topic.name)
              const isCompleted = topicProgress?.completed || false
              const currentLevel = topicProgress?.level || 1
              const progressPercentage = topicProgress ? (topicProgress.level / 5) * 100 : 0
              const IconComponent = topic.icon

              return (
                <motion.div
                  key={topic.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index }}
                >
                  <Card className="hover:shadow-lg transition-all duration-300 cursor-pointer group h-full">
                    <CardContent className="p-6 flex flex-col h-full">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div className="text-2xl">{topic.emoji}</div>
                          <IconComponent className="w-5 h-5 text-gray-600" />
                        </div>
                        {isCompleted && (
                          <div className="flex items-center gap-1 text-green-600 font-medium text-sm">
                            <CheckCircle className="w-4 h-4" />
                            <span>Mastered</span>
                          </div>
                        )}
                        {!isCompleted && (
                          <div className="flex items-center gap-1 text-gray-500 text-sm">
                            <span>Level {currentLevel}/5</span>
                          </div>
                        )}
                      </div>

                      <h3 className="font-semibold text-lg text-gray-800 mb-3">{topic.name}</h3>

                      {/* Category & difficulty badges */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        <span
                          className={`text-xs font-semibold px-2 py-1 rounded-full ${getCategoryColor(topic.category)}`}
                        >
                          {topic.category}
                        </span>
                        <span
                          className={`text-xs font-semibold px-2 py-1 rounded-full ${getDifficultyColor(
                            topic.difficulty,
                          )}`}
                        >
                          {topic.difficulty}
                        </span>
                      </div>

                      {/* Progress bar */}
                      <div className="w-full bg-gray-200 h-2 rounded-full mb-4 overflow-hidden">
                        <div
                          className="bg-gradient-to-r from-blue-500 to-blue-600 h-full rounded-full transition-all duration-300"
                          style={{ width: `${progressPercentage}%` }}
                        />
                      </div>

                      {/* Score display */}
                      {topicProgress && (
                        <div className="text-sm text-gray-600 mb-4">
                          Best Score: <span className="font-semibold text-blue-600">{topicProgress.score}%</span>
                        </div>
                      )}

                      {/* Button */}
                      <div className="mt-auto">
                        <Button
                          onClick={() => startQuiz(topic.name)}
                          className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 transition-all duration-300"
                        >
                          <Play className="w-4 h-4 mr-2" />
                          {isCompleted ? "Practice Again" : "Start Learning"}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )
            })}
          </div>
        </motion.div>

        {/* Recommendations Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-8"
        >
          <Card className="bg-gradient-to-r from-indigo-50 to-purple-50 border-indigo-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-indigo-800">
                <Star className="w-5 h-5 text-indigo-600" />
                Recommended for You
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Based on current progress */}
                <div className="bg-white rounded-lg p-4 border border-indigo-100">
                  <h4 className="font-semibold text-gray-800 mb-2">Continue Your Journey</h4>
                  <p className="text-sm text-gray-600 mb-3">Complete your Data Structures fundamentals</p>
                  <Button
                    onClick={() => startQuiz("Data Structures")}
                    variant="outline"
                    size="sm"
                    className="w-full border-indigo-200 text-indigo-700 hover:bg-indigo-50"
                  >
                    Continue Learning
                  </Button>
                </div>

                {/* Skill building recommendation */}
                <div className="bg-white rounded-lg p-4 border border-indigo-100">
                  <h4 className="font-semibold text-gray-800 mb-2">Build Core Skills</h4>
                  <p className="text-sm text-gray-600 mb-3">Master Algorithms to complement your programming skills</p>
                  <Button
                    onClick={() => startQuiz("Algorithms")}
                    variant="outline"
                    size="sm"
                    className="w-full border-indigo-200 text-indigo-700 hover:bg-indigo-50"
                  >
                    Start Algorithms
                  </Button>
                </div>

                {/* Trending topic */}
                <div className="bg-white rounded-lg p-4 border border-indigo-100">
                  <h4 className="font-semibold text-gray-800 mb-2">Trending Now</h4>
                  <p className="text-sm text-gray-600 mb-3">Explore Machine Learning - the future of technology</p>
                  <Button
                    onClick={() => startQuiz("Machine Learning")}
                    variant="outline"
                    size="sm"
                    className="w-full border-indigo-200 text-indigo-700 hover:bg-indigo-50"
                  >
                    Explore ML
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Learning Path Suggestions */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
          <Card className="bg-white shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="w-5 h-5 text-green-500" />
                Suggested Learning Paths
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Frontend Path */}
                <div className="border rounded-lg p-4 border-gray-200">
                  <h4 className="font-semibold text-lg mb-3 text-gray-800">Frontend Developer Path</h4>
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-sm">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span>JavaScript (Completed)</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span>React (Completed)</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
                      <span>Web Development (Next)</span>
                    </div>
                  </div>
                  <Button
                    onClick={() => startQuiz("Web Development")}
                    className="w-full bg-gradient-to-r from-green-500 to-green-600"
                  >
                    Continue Path
                  </Button>
                </div>

                {/* Backend Path */}
                <div className="border rounded-lg p-4 border-gray-200">
                  <h4 className="font-semibold text-lg mb-3 text-gray-800">Backend Developer Path</h4>
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-sm">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span>Python (Completed)</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
                      <span>Database Management (Recommended)</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
                      <span>Cloud Computing (Advanced)</span>
                    </div>
                  </div>
                  <Button
                    onClick={() => startQuiz("Database Management")}
                    className="w-full bg-gradient-to-r from-blue-500 to-blue-600"
                  >
                    Start Path
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
