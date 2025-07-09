"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { HeaderWithSignout } from "@/components/header-with-signout"
import { QuizCompletion } from "@/components/quiz-completion"
import { QuizFeedback } from "@/components/quiz-feedback"
import { ProgressHeader } from "@/components/progress-header"
import { Clock, Brain, Home, AlertTriangle } from "lucide-react"

interface Question {
  question: string
  options: string[]
  correct: number
  explanation: string
}

interface Quiz {
  id: string
  topic: string
  level: string
  questions: Question[]
  createdAt: string
  attemptNumber?: number
}

interface Answer {
  questionIndex: number
  selectedOption: number
  isCorrect: boolean
  timeSpent: number
}

export default function QuizPage() {
  const [quiz, setQuiz] = useState<Quiz | null>(null)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [answers, setAnswers] = useState<Answer[]>([])
  const [selectedOption, setSelectedOption] = useState<number | null>(null)
  const [showFeedback, setShowFeedback] = useState(false)
  const [quizCompleted, setQuizCompleted] = useState(false)
  const [timeLeft, setTimeLeft] = useState(30)
  const [questionStartTime, setQuestionStartTime] = useState(Date.now())
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  // Load quiz data
  useEffect(() => {
    const savedQuiz = localStorage.getItem("currentQuiz")
    if (savedQuiz) {
      try {
        const parsedQuiz = JSON.parse(savedQuiz)
        setQuiz(parsedQuiz)
        setLoading(false)
      } catch (error) {
        console.error("Error parsing quiz data:", error)
        setError("Failed to load quiz data")
        setLoading(false)
      }
    } else {
      setError("No quiz data found")
      setLoading(false)
    }
  }, [])

  // Timer effect
  useEffect(() => {
    if (!quiz || quizCompleted || showFeedback) return

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          handleTimeUp()
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [currentQuestionIndex, quiz, quizCompleted, showFeedback])

  // Reset timer when moving to next question
  useEffect(() => {
    setTimeLeft(30)
    setQuestionStartTime(Date.now())
  }, [currentQuestionIndex])

  const handleTimeUp = () => {
    if (selectedOption === null) {
      // Auto-submit with no answer
      handleAnswerSubmit(-1)
    }
  }

  const handleAnswerSubmit = (optionIndex: number) => {
    if (!quiz) return

    const currentQuestion = quiz.questions[currentQuestionIndex]
    const isCorrect = optionIndex === currentQuestion.correct
    const timeSpent = Math.round((Date.now() - questionStartTime) / 1000)

    const newAnswer: Answer = {
      questionIndex: currentQuestionIndex,
      selectedOption: optionIndex,
      isCorrect,
      timeSpent,
    }

    setAnswers((prev) => [...prev, newAnswer])
    setSelectedOption(optionIndex)
    setShowFeedback(true)

    // Auto-advance after showing feedback
    setTimeout(() => {
      if (currentQuestionIndex < quiz.questions.length - 1) {
        setCurrentQuestionIndex((prev) => prev + 1)
        setSelectedOption(null)
        setShowFeedback(false)
      } else {
        completeQuiz([...answers, newAnswer])
      }
    }, 3000)
  }

  const completeQuiz = async (finalAnswers: Answer[]) => {
    if (!quiz) return

    const score = Math.round((finalAnswers.filter((a) => a.isCorrect).length / quiz.questions.length) * 100)
    const totalTime = finalAnswers.reduce((sum, answer) => sum + answer.timeSpent, 0)

    // Update user stats
    const currentStats = JSON.parse(
      localStorage.getItem("quizStats") ||
        '{"totalQuizzes":0,"averageScore":0,"streak":0,"totalXP":0,"rank":"Novice","completedTopics":[]}',
    )

    const newTotalQuizzes = currentStats.totalQuizzes + 1
    const newAverageScore = Math.round(
      (currentStats.averageScore * currentStats.totalQuizzes + score) / newTotalQuizzes,
    )
    const xpGained = Math.max(10, Math.round(score / 2)) // Minimum 10 XP, up to 50 XP for perfect score
    const newTotalXP = currentStats.totalXP + xpGained

    // Update streak
    const lastQuizDate = localStorage.getItem("lastQuizDate")
    const today = new Date().toDateString()
    const yesterday = new Date(Date.now() - 86400000).toDateString()

    let newStreak = currentStats.streak
    if (lastQuizDate === yesterday || !lastQuizDate) {
      newStreak = currentStats.streak + 1
    } else if (lastQuizDate !== today) {
      newStreak = 1
    }

    // Update completed topics
    const completedTopics = [...currentStats.completedTopics]
    if (!completedTopics.includes(quiz.topic) && score >= 70) {
      completedTopics.push(quiz.topic)
    }

    const updatedStats = {
      totalQuizzes: newTotalQuizzes,
      averageScore: newAverageScore,
      streak: newStreak,
      totalXP: newTotalXP,
      rank: getRank(newTotalXP),
      completedTopics,
    }

    localStorage.setItem("quizStats", JSON.stringify(updatedStats))
    localStorage.setItem("lastQuizDate", today)

    // Save quiz result
    const quizResult = {
      quizId: quiz.id,
      topic: quiz.topic,
      level: quiz.level,
      score,
      totalQuestions: quiz.questions.length,
      correctAnswers: finalAnswers.filter((a) => a.isCorrect).length,
      totalTime,
      answers: finalAnswers,
      completedAt: new Date().toISOString(),
      xpGained,
    }

    // Save to quiz history
    const quizHistory = JSON.parse(localStorage.getItem("quizHistory") || "[]")
    quizHistory.unshift(quizResult)
    localStorage.setItem("quizHistory", JSON.stringify(quizHistory.slice(0, 50))) // Keep last 50 results

    // Save progress to API
    try {
      await fetch("/api/progress", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(quizResult),
      })
    } catch (error) {
      console.error("Error saving progress:", error)
    }

    setQuizCompleted(true)
  }

  const getRank = (xp: number) => {
    if (xp >= 1000) return "Expert"
    if (xp >= 500) return "Advanced"
    if (xp >= 200) return "Intermediate"
    if (xp >= 50) return "Beginner"
    return "Novice"
  }

  const handleRetakeQuiz = () => {
    setCurrentQuestionIndex(0)
    setAnswers([])
    setSelectedOption(null)
    setShowFeedback(false)
    setQuizCompleted(false)
    setTimeLeft(30)
    setQuestionStartTime(Date.now())
  }

  const handleBackToDashboard = () => {
    router.push("/dashboard")
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        <HeaderWithSignout />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center space-y-4">
            <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto" />
            <p className="text-lg text-gray-600">Loading your quiz...</p>
          </div>
        </div>
      </div>
    )
  }

  if (error || !quiz) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        <HeaderWithSignout />
        <div className="container mx-auto px-4 py-8">
          <Alert className="max-w-md mx-auto border-red-500 bg-red-50 text-red-800">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription className="font-medium">
              {error || "Quiz data not found. Please return to dashboard and try again."}
            </AlertDescription>
          </Alert>
          <div className="text-center mt-6">
            <Button onClick={handleBackToDashboard} className="bg-blue-600 hover:bg-blue-700">
              <Home className="h-4 w-4 mr-2" />
              Back to Dashboard
            </Button>
          </div>
        </div>
      </div>
    )
  }

  if (quizCompleted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        <HeaderWithSignout />
        <QuizCompletion
          quiz={quiz}
          answers={answers}
          onRetake={handleRetakeQuiz}
          onBackToDashboard={handleBackToDashboard}
        />
      </div>
    )
  }

  const currentQuestion = quiz.questions[currentQuestionIndex]
  const progress = ((currentQuestionIndex + 1) / quiz.questions.length) * 100

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <HeaderWithSignout />

      <div className="container mx-auto px-4 py-8">
        <ProgressHeader
          topic={quiz.topic}
          level={quiz.level}
          currentQuestion={currentQuestionIndex + 1}
          totalQuestions={quiz.questions.length}
          progress={progress}
        />

        <div className="max-w-4xl mx-auto">
          <Card className="shadow-xl border-0 bg-white/90 backdrop-blur-sm">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <Brain className="h-5 w-5 text-blue-600" />
                    <span className="font-medium text-gray-700">
                      Question {currentQuestionIndex + 1} of {quiz.questions.length}
                    </span>
                  </div>
                  <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                    {quiz.level}
                  </Badge>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className={`h-5 w-5 ${timeLeft <= 10 ? "text-red-500" : "text-gray-500"}`} />
                  <span className={`font-mono text-lg ${timeLeft <= 10 ? "text-red-500 font-bold" : "text-gray-700"}`}>
                    {timeLeft}s
                  </span>
                </div>
              </div>
              <Progress value={progress} className="h-2 mt-4" />
            </CardHeader>

            <CardContent className="space-y-6">
              <CardTitle className="text-xl leading-relaxed text-gray-800">{currentQuestion.question}</CardTitle>

              {!showFeedback ? (
                <div className="space-y-3">
                  {currentQuestion.options.map((option, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      className={`w-full p-4 h-auto text-left justify-start hover:bg-blue-50 hover:border-blue-300 transition-all duration-200 ${
                        selectedOption === index ? "bg-blue-100 border-blue-400" : ""
                      }`}
                      onClick={() => handleAnswerSubmit(index)}
                      disabled={showFeedback}
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-6 h-6 rounded-full border-2 border-gray-300 flex items-center justify-center text-sm font-medium">
                          {String.fromCharCode(65 + index)}
                        </div>
                        <span className="text-gray-700">{option}</span>
                      </div>
                    </Button>
                  ))}
                </div>
              ) : (
                <QuizFeedback
                  question={currentQuestion}
                  selectedOption={selectedOption}
                  isLastQuestion={currentQuestionIndex === quiz.questions.length - 1}
                />
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
