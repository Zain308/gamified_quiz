"use client"

import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { CheckCircle, XCircle, Zap, Flame } from "lucide-react"

interface QuizFeedbackProps {
  isCorrect: boolean
  isVisible: boolean
  correctAnswer: string
  selectedAnswer: string
  onNext: () => void
  streak?: number
  xpEarned?: number
}

export function QuizFeedback({
  isCorrect,
  isVisible,
  correctAnswer,
  selectedAnswer,
  onNext,
  streak = 0,
  xpEarned = 0,
}: QuizFeedbackProps) {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
        >
          <motion.div
            initial={{ scale: 0.8, y: 50 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.8, y: 50 }}
            className={`bg-white rounded-2xl p-8 max-w-md w-full text-center shadow-2xl ${
              isCorrect ? "border-t-4 border-green-500" : "border-t-4 border-red-500"
            }`}
          >
            {/* Icon and Status */}
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="mb-6"
            >
              {isCorrect ? (
                <div className="relative">
                  <CheckCircle className="w-20 h-20 text-green-500 mx-auto" />
                  {streak > 0 && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.4 }}
                      className="absolute -top-2 -right-2 bg-orange-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold"
                    >
                      {streak}
                    </motion.div>
                  )}
                </div>
              ) : (
                <XCircle className="w-20 h-20 text-red-500 mx-auto" />
              )}
            </motion.div>

            {/* Feedback Message */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mb-6"
            >
              <h2 className={`text-2xl font-bold mb-2 ${isCorrect ? "text-green-700" : "text-red-700"}`}>
                {isCorrect ? "Correct! 🎉" : "Not quite right 😔"}
              </h2>

              <p className="text-gray-600 mb-4">
                {isCorrect ? "Great job! You got it right!" : "Don't worry, keep learning!"}
              </p>

              {/* Show correct answer if wrong */}
              {!isCorrect && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
                  <p className="text-sm text-green-800 font-medium mb-1">Correct Answer:</p>
                  <p className="text-green-700 font-semibold">{correctAnswer}</p>
                </div>
              )}

              {/* Show selected answer if wrong */}
              {!isCorrect && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <p className="text-sm text-red-800 font-medium mb-1">Your Answer:</p>
                  <p className="text-red-700">{selectedAnswer}</p>
                </div>
              )}
            </motion.div>

            {/* Rewards Display */}
            {isCorrect && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="flex justify-center gap-4 mb-6"
              >
                {xpEarned > 0 && (
                  <div className="flex items-center gap-1 bg-blue-100 text-blue-700 px-3 py-1 rounded-full">
                    <Zap className="w-4 h-4" />
                    <span className="font-semibold">+{xpEarned} XP</span>
                  </div>
                )}

                {streak > 0 && (
                  <div className="flex items-center gap-1 bg-orange-100 text-orange-700 px-3 py-1 rounded-full">
                    <Flame className="w-4 h-4" />
                    <span className="font-semibold">{streak} streak</span>
                  </div>
                )}
              </motion.div>
            )}

            {/* Continue Button */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
              <Button
                onClick={onNext}
                className={`w-full py-3 text-lg font-semibold shadow-lg ${
                  isCorrect ? "bg-green-500 hover:bg-green-600" : "bg-blue-500 hover:bg-blue-600"
                }`}
              >
                Continue
              </Button>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
