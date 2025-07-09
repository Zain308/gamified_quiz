"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { CheckCircle, XCircle } from "lucide-react"

interface QuestionCardProps {
  question: string
  options: string[]
  selectedAnswer: string | null
  correctAnswer: string
  showResult: boolean
  onAnswerSelect: (answer: string) => void
  onNext: () => void
  isLastQuestion: boolean
}

export function QuestionCard({
  question,
  options,
  selectedAnswer,
  correctAnswer,
  showResult,
  onAnswerSelect,
  onNext,
  isLastQuestion,
}: QuestionCardProps) {
  return (
    <motion.div
      initial={{ x: 300, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: -300, opacity: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="w-full max-w-2xl mx-auto"
    >
      <Card className="border-0 shadow-lg">
        <CardHeader className="pb-4">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl font-semibold leading-relaxed text-gray-800"
          >
            {question}
          </motion.h2>
        </CardHeader>

        <CardContent className="space-y-3">
          {options.map((option, index) => {
            const isSelected = selectedAnswer === option
            const isCorrect = option === correctAnswer
            const showCorrect = showResult && isCorrect
            const showIncorrect = showResult && isSelected && !isCorrect

            return (
              <motion.button
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                onClick={() => !showResult && onAnswerSelect(option)}
                disabled={showResult}
                className={`w-full p-4 text-left rounded-xl border-2 transition-all duration-300 relative overflow-hidden ${
                  showCorrect
                    ? "border-green-500 bg-green-50 text-green-800 shadow-lg"
                    : showIncorrect
                      ? "border-red-500 bg-red-50 text-red-800 shadow-lg"
                      : isSelected
                        ? "border-blue-500 bg-blue-50 text-blue-800 shadow-md transform scale-[1.02]"
                        : "border-gray-200 hover:border-gray-300 hover:bg-gray-50 hover:shadow-md hover:transform hover:scale-[1.01]"
                } ${showResult ? "cursor-default" : "cursor-pointer"}`}
                whileHover={!showResult ? { scale: 1.02 } : {}}
                whileTap={!showResult ? { scale: 0.98 } : {}}
              >
                <div className="flex items-center justify-between">
                  <span className="font-medium">{option}</span>
                  {showResult && (
                    <motion.div
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ delay: 0.1, type: "spring", stiffness: 200 }}
                    >
                      {isCorrect ? (
                        <CheckCircle className="w-6 h-6 text-green-600" />
                      ) : isSelected ? (
                        <XCircle className="w-6 h-6 text-red-600" />
                      ) : null}
                    </motion.div>
                  )}
                </div>

                {/* Animated background for correct answer */}
                {showCorrect && (
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className="absolute inset-0 bg-gradient-to-r from-green-100 to-green-200 opacity-50"
                  />
                )}

                {/* Animated background for incorrect answer */}
                {showIncorrect && (
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className="absolute inset-0 bg-gradient-to-r from-red-100 to-red-200 opacity-50"
                  />
                )}
              </motion.button>
            )
          })}

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: selectedAnswer ? 1 : 0.5, y: 0 }}
            transition={{ delay: 0.6 }}
            className="pt-6"
          >
            <Button
              onClick={onNext}
              disabled={!selectedAnswer}
              className="w-full py-6 text-lg font-semibold bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 disabled:from-gray-300 disabled:to-gray-400 shadow-lg hover:shadow-xl transform transition-all duration-200 hover:scale-[1.02] disabled:hover:scale-100"
            >
              {isLastQuestion ? "Finish Quiz 🎉" : "Continue →"}
            </Button>
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
