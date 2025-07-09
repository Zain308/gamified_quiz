"use client"

import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Heart, Flame, Zap, Crown } from "lucide-react"
import { motion } from "framer-motion"

interface ProgressHeaderProps {
  currentQuestion: number
  totalQuestions: number
  score: number
  topic: string
  level: number
  streak: number
  lives: number
  onBack: () => void
}

export function ProgressHeader({
  currentQuestion,
  totalQuestions,
  score,
  topic,
  level,
  streak,
  lives,
  onBack,
}: ProgressHeaderProps) {
  const progress = ((currentQuestion + 1) / totalQuestions) * 100

  const getLevelColor = (level: number) => {
    switch (level) {
      case 1:
        return "bg-green-100 text-green-800 border-green-200"
      case 2:
        return "bg-blue-100 text-blue-800 border-blue-200"
      case 3:
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case 4:
        return "bg-orange-100 text-orange-800 border-orange-200"
      case 5:
        return "bg-purple-100 text-purple-800 border-purple-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getLevelIcon = (level: number) => {
    if (level === 5) return <Crown className="w-3 h-3" />
    return null
  }

  return (
    <div className="bg-white shadow-sm border-b sticky top-0 z-40">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between mb-4">
          <Button variant="ghost" onClick={onBack} size="sm" className="flex items-center gap-2 hover:bg-gray-100">
            <ArrowLeft className="w-4 h-4" />
            Exit Quiz
          </Button>

          <div className="flex items-center gap-4">
            {/* Lives Display */}
            <motion.div
              className="flex items-center gap-1"
              initial={{ scale: 1 }}
              animate={{ scale: lives <= 1 ? [1, 1.1, 1] : 1 }}
              transition={{ duration: 0.3, repeat: lives <= 1 ? Number.POSITIVE_INFINITY : 0, repeatDelay: 1 }}
            >
              {Array.from({ length: 3 }).map((_, i) => (
                <Heart
                  key={i}
                  className={`w-5 h-5 transition-all duration-200 ${
                    i < lives ? "text-red-500 fill-current drop-shadow-sm" : "text-gray-300"
                  }`}
                />
              ))}
            </motion.div>

            {/* Streak Display */}
            <motion.div
              className="flex items-center gap-1 bg-gradient-to-r from-orange-100 to-red-100 px-3 py-1 rounded-full border border-orange-200"
              whileHover={{ scale: 1.05 }}
            >
              <Flame className="w-4 h-4 text-orange-500" />
              <span className="text-sm font-semibold text-orange-700">{streak}</span>
            </motion.div>

            {/* XP Score */}
            <motion.div
              className="flex items-center gap-1 bg-gradient-to-r from-blue-100 to-cyan-100 px-3 py-1 rounded-full border border-blue-200"
              whileHover={{ scale: 1.05 }}
            >
              <Zap className="w-4 h-4 text-blue-500" />
              <span className="text-sm font-semibold text-blue-700">{score} XP</span>
            </motion.div>
          </div>
        </div>

        <div className="space-y-3">
          {/* Topic and Level Info */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Badge variant="outline" className={`text-xs font-medium border ${getLevelColor(level)}`}>
                {getLevelIcon(level)}
                <span className={getLevelIcon(level) ? "ml-1" : ""}>Level {level}</span>
              </Badge>
              <h2 className="font-bold text-lg capitalize text-gray-800">{topic}</h2>
            </div>
            <div className="text-sm text-gray-500 font-medium">
              Question {currentQuestion + 1} of {totalQuestions}
            </div>
          </div>

          {/* Progress Bar */}
          <div className="relative">
            <Progress value={progress} className="h-4 bg-gray-100" />
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: progress > 0 ? 1 : 0 }}
              className="absolute right-0 top-0 transform translate-x-2 -translate-y-1"
            >
              <div className="w-5 h-5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full border-2 border-white shadow-lg flex items-center justify-center">
                <div className="w-2 h-2 bg-white rounded-full"></div>
              </div>
            </motion.div>
          </div>

          {/* Progress Text */}
          <div className="flex justify-between text-xs text-gray-600">
            <span>Progress: {Math.round(progress)}%</span>
            <span>{totalQuestions - currentQuestion - 1} questions remaining</span>
          </div>
        </div>
      </div>
    </div>
  )
}
