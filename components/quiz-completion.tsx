"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Trophy, Star, Target, TrendingUp, RotateCcw, Home, Zap, Crown, Flame } from "lucide-react"

interface QuizCompletionProps {
  score: number
  totalQuestions: number
  topic: string
  level: number
  streak: number
  onRetry: () => void
  onNextLevel: () => void
  onHome: () => void
  canAdvance: boolean
}

export function QuizCompletion({
  score,
  totalQuestions,
  topic,
  level,
  streak,
  onRetry,
  onNextLevel,
  onHome,
  canAdvance,
}: QuizCompletionProps) {
  const percentage = Math.round((score / totalQuestions) * 100)
  const passed = percentage >= 60
  const perfect = percentage === 100
  const excellent = percentage >= 90

  const getPerformanceMessage = () => {
    if (perfect) return "Perfect! You're a master! 🏆"
    if (excellent) return "Excellent work! Outstanding! 🌟"
    if (percentage >= 80) return "Great job! Well done! 👏"
    if (percentage >= 60) return "Good work! Keep it up! 👍"
    return "Keep practicing! You'll get there! 💪"
  }

  const getPerformanceColor = () => {
    if (perfect) return "from-yellow-400 to-orange-500"
    if (excellent) return "from-green-400 to-emerald-500"
    if (percentage >= 80) return "from-blue-400 to-cyan-500"
    if (percentage >= 60) return "from-purple-400 to-pink-500"
    return "from-gray-400 to-gray-600"
  }

  const getXPEarned = () => {
    let baseXP = 20 * score // 20 XP per correct answer
    if (perfect) baseXP += 100 // Perfect bonus
    if (excellent) baseXP += 50 // Excellence bonus
    if (streak > 0) baseXP += streak * 10 // Streak bonus
    return baseXP
  }

  const xpEarned = getXPEarned()

  const handleNextLevel = () => {
    if (level < 5) {
      window.location.href = `/quiz?topic=${encodeURIComponent(topic)}&level=${level + 1}`
    } else {
      onHome()
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="w-full max-w-lg"
      >
        <Card className="text-center border-0 shadow-2xl overflow-hidden">
          {/* Header with animated background */}
          <div className={`relative p-8 bg-gradient-to-r ${getPerformanceColor()} text-white`}>
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 150 }}
              className="mx-auto mb-4"
            >
              {perfect ? (
                <div className="relative">
                  <Crown className="w-20 h-20 mx-auto" />
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                    className="absolute -top-2 -right-2"
                  >
                    <Star className="w-8 h-8 text-yellow-300 fill-current" />
                  </motion.div>
                </div>
              ) : passed ? (
                <Trophy className="w-20 h-20 mx-auto" />
              ) : (
                <Target className="w-20 h-20 mx-auto" />
              )}
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
              <h1 className="text-3xl font-bold mb-2">{getPerformanceMessage()}</h1>
              <div className="flex items-center justify-center gap-2 mb-4">
                <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                  Level {level}
                </Badge>
                <Badge variant="secondary" className="bg-white/20 text-white border-white/30 capitalize">
                  {topic}
                </Badge>
              </div>
            </motion.div>

            {/* Score Circle */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.6, type: "spring", stiffness: 200 }}
              className="relative mx-auto w-32 h-32 mb-6"
            >
              <div className="w-full h-full rounded-full bg-white/20 flex items-center justify-center border-4 border-white/30">
                <div className="text-center">
                  <div className="text-4xl font-bold">{percentage}%</div>
                  <div className="text-sm opacity-90">
                    {score}/{totalQuestions}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          <CardContent className="p-8 space-y-6">
            {/* XP and Rewards */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="grid grid-cols-3 gap-4"
            >
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <Zap className="w-6 h-6 text-blue-600 mx-auto mb-2" />
                <div className="text-lg font-bold text-blue-600">+{xpEarned}</div>
                <div className="text-xs text-gray-600">XP Earned</div>
              </div>

              <div className="text-center p-4 bg-green-50 rounded-lg">
                <Star className="w-6 h-6 text-green-600 mx-auto mb-2" />
                <div className="text-lg font-bold text-green-600">{score}</div>
                <div className="text-xs text-gray-600">Correct</div>
              </div>

              <div className="text-center p-4 bg-orange-50 rounded-lg">
                <Flame className="w-6 h-6 text-orange-600 mx-auto mb-2" />
                <div className="text-lg font-bold text-orange-600">{streak}</div>
                <div className="text-xs text-gray-600">Streak</div>
              </div>
            </motion.div>

            {/* Performance Insights */}
            {passed && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 }}
                className="p-4 bg-green-50 rounded-lg border border-green-200"
              >
                <div className="flex items-center gap-2 text-green-800 mb-2">
                  <Trophy className="w-4 h-4" />
                  <span className="font-semibold">Level {level} Completed!</span>
                </div>
                <p className="text-sm text-green-700">
                  {level === 5
                    ? "Congratulations! You've mastered this topic!"
                    : "Great job! You're ready for the next level."}
                </p>
              </motion.div>
            )}

            {!passed && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 }}
                className="p-4 bg-orange-50 rounded-lg border border-orange-200"
              >
                <div className="flex items-center gap-2 text-orange-800 mb-2">
                  <Target className="w-4 h-4" />
                  <span className="font-semibold">Keep Practicing!</span>
                </div>
                <p className="text-sm text-orange-700">
                  You need 60% or higher to advance. Review the material and try again!
                </p>
              </motion.div>
            )}

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2 }}
              className="space-y-3"
            >
              {passed && canAdvance && level < 5 && (
                <Button
                  onClick={handleNextLevel}
                  className="w-full py-4 text-lg bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 shadow-lg"
                >
                  <TrendingUp className="w-5 h-5 mr-2" />
                  Continue to Level {level + 1}
                </Button>
              )}

              {level === 5 && passed && (
                <Button
                  onClick={onHome}
                  className="w-full py-4 text-lg bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 shadow-lg"
                >
                  <Crown className="w-5 h-5 mr-2" />
                  Topic Mastered! Return to Dashboard
                </Button>
              )}

              <div className="grid grid-cols-2 gap-3">
                <Button onClick={onRetry} variant="outline" className="py-3 bg-transparent">
                  <RotateCcw className="w-4 h-4 mr-2" />
                  Try Again
                </Button>
                <Button onClick={onHome} variant="outline" className="py-3 bg-transparent">
                  <Home className="w-4 h-4 mr-2" />
                  Dashboard
                </Button>
              </div>
            </motion.div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
