"use client"

import { useState, useEffect, useRef } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { AnimatePresence } from "framer-motion"
import { ProgressHeader } from "@/components/progress-header"
import { QuestionCard } from "@/components/question-card"
import { QuizFeedback } from "@/components/quiz-feedback"
import { QuizCompletion } from "@/components/quiz-completion"

interface Question {
  id: string
  question: string
  options: string[]
  correctAnswer: string
}

interface QuizData {
  level: number
  topic: string
  questions: Question[]
}

export default function QuizPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const topic = searchParams.get("topic")
  const level = Number.parseInt(searchParams.get("level") || "1")

  const [quizData, setQuizData] = useState<QuizData | null>(null)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)
  const [showResult, setShowResult] = useState(false)
  const [showFeedback, setShowFeedback] = useState(false)
  const [score, setScore] = useState(0)
  const [answers, setAnswers] = useState<string[]>([])
  const [loading, setLoading] = useState(true)
  const [quizCompleted, setQuizCompleted] = useState(false)
  const [streak, setStreak] = useState(0)
  const [lives, setLives] = useState(3)
  const [xp, setXp] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [correctAnswersInRow, setCorrectAnswersInRow] = useState(0)

  // Audio refs for sound effects
  const correctSoundRef = useRef<HTMLAudioElement | null>(null)
  const incorrectSoundRef = useRef<HTMLAudioElement | null>(null)
  const completeSoundRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    // Initialize audio elements with better sound data
    correctSoundRef.current = new Audio(
      "data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBSuBzvLZiTYIG2m98OScTgwOUarm7blmGgU7k9n1unEiBC13yO/eizEIHWq+8+OWT",
    )
    incorrectSoundRef.current = new Audio(
      "data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBSuBzvLZiTYIG2m98OScTgwOUarm7blmGgU7k9n1unEiBC13yO/eizEIHWq+8+OWT",
    )
    completeSoundRef.current = new Audio(
      "data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBSuBzvLZiTYIG2m98OScTgwOUarm7blmGgU7k9n1unEiBC13yO/eizEIHWq+8+OWT",
    )

    if (!topic) {
      router.push("/dashboard")
      return
    }

    // Reset all state when topic or level changes
    setCurrentQuestion(0)
    setSelectedAnswer(null)
    setShowResult(false)
    setShowFeedback(false)
    setScore(0)
    setAnswers([])
    setQuizCompleted(false)
    setStreak(0)
    setLives(3)
    setXp(0)
    setQuizData(null)
    setCorrectAnswersInRow(0)

    fetchQuiz()
  }, [topic, level, router])

  const fetchQuiz = async () => {
    try {
      setLoading(true)
      console.log(`Fetching quiz for topic: ${topic}, level: ${level}`)

      const response = await fetch("/api/quiz", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic, level }),
      })

      if (!response.ok) {
        const errorText = await response.text()
        console.error(`API Error: ${response.status} - ${errorText}`)
        throw new Error(`Server error: ${response.status}`)
      }

      const data = await response.json()
      console.log("Quiz data received:", data)

      if (!data || !data.questions || !Array.isArray(data.questions) || data.questions.length === 0) {
        throw new Error("Invalid quiz data structure received")
      }

      setQuizData(data)
    } catch (error) {
      console.error("Error fetching quiz:", error)
      const errorMessage = error instanceof Error ? error.message : "Unknown error occurred"
      alert(`Failed to load quiz: ${errorMessage}. Please try again.`)
      router.push("/dashboard")
    } finally {
      setLoading(false)
    }
  }

  const playSound = (type: "correct" | "incorrect" | "complete") => {
    try {
      const audio =
        type === "correct"
          ? correctSoundRef.current
          : type === "incorrect"
            ? incorrectSoundRef.current
            : completeSoundRef.current

      if (audio) {
        audio.currentTime = 0
        audio.play().catch((e) => console.log("Audio play failed:", e))
      }
    } catch (error) {
      console.log("Sound effect failed:", error)
    }
  }

  const handleAnswerSelect = (answer: string) => {
    if (showResult) return
    setSelectedAnswer(answer)
  }

  const handleNextQuestion = async () => {
    if (!selectedAnswer || !quizData) return

    const currentQuestionData = quizData.questions[currentQuestion]
    if (!currentQuestionData) return

    const isCorrect = selectedAnswer === currentQuestionData.correctAnswer
    const newAnswers = [...answers, selectedAnswer]

    // Update score and streak
    let newScore = score
    let newStreak = streak
    let newXp = xp
    let newLives = lives
    let newCorrectInRow = correctAnswersInRow

    if (isCorrect) {
      newScore += 1
      newCorrectInRow += 1

      // XP calculation with bonuses
      let questionXP = 20 // Base XP per correct answer
      if (newCorrectInRow >= 3) questionXP += 10 // Streak bonus
      if (newCorrectInRow >= 5) questionXP += 20 // Super streak bonus

      newXp += questionXP
      newStreak = Math.max(newStreak, newCorrectInRow)
    } else {
      newCorrectInRow = 0
      newLives = Math.max(0, newLives - 1)
    }

    setAnswers(newAnswers)
    setScore(newScore)
    setStreak(newStreak)
    setXp(newXp)
    setLives(newLives)
    setCorrectAnswersInRow(newCorrectInRow)
    setShowResult(true)

    // Play sound and show feedback
    playSound(isCorrect ? "correct" : "incorrect")
    setShowFeedback(true)
  }

  const handleFeedbackNext = () => {
    setShowFeedback(false)

    // Check if lives are depleted
    if (lives <= 0) {
      setQuizCompleted(true)
      return
    }

    if (currentQuestion < quizData!.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
      setSelectedAnswer(null)
      setShowResult(false)
    } else {
      // Quiz completed
      setQuizCompleted(true)
      playSound("complete")
      saveProgress()
    }
  }

  const saveProgress = async () => {
    try {
      const percentage = Math.round((score / quizData!.questions.length) * 100)
      await fetch("/api/progress", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          topic,
          level,
          score: percentage,
          completed: percentage >= 60,
        }),
      })
    } catch (error) {
      console.error("Error saving progress:", error)
    }
  }

  const handleRetry = () => {
    setCurrentQuestion(0)
    setSelectedAnswer(null)
    setShowResult(false)
    setShowFeedback(false)
    setScore(0)
    setAnswers([])
    setQuizCompleted(false)
    setStreak(0)
    setLives(3)
    setXp(0)
    setCorrectAnswersInRow(0)
  }

  const handleNextLevel = () => {
    if (level < 5) {
      setIsTransitioning(true)
      setTimeout(() => {
        window.location.href = `/quiz?topic=${encodeURIComponent(topic!)}&level=${level + 1}`
      }, 500)
    } else {
      router.push("/dashboard")
    }
  }

  const handleBack = () => {
    router.push("/dashboard")
  }

  if (isTransitioning) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-green-500 mx-auto mb-4"></div>
          <p className="text-lg text-gray-600">Preparing Level {level + 1}...</p>
          <p className="text-sm text-gray-500 mt-2">Get ready for more challenging questions!</p>
        </div>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-lg text-gray-600">Generating your personalized quiz...</p>
          <p className="text-sm text-gray-500 mt-2">This may take a few moments</p>
        </div>
      </div>
    )
  }

  if (!quizData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="text-center">
          <p className="text-lg mb-4">Failed to load quiz</p>
          <button onClick={() => router.push("/dashboard")} className="px-4 py-2 bg-blue-500 text-white rounded">
            Back to Dashboard
          </button>
        </div>
      </div>
    )
  }

  if (quizCompleted) {
    const percentage = Math.round((score / quizData.questions.length) * 100)
    return (
      <QuizCompletion
        score={score}
        totalQuestions={quizData.questions.length}
        topic={topic!}
        level={level}
        streak={streak}
        onRetry={handleRetry}
        onNextLevel={handleNextLevel}
        onHome={handleBack}
        canAdvance={percentage >= 60 && level < 5}
      />
    )
  }

  const currentQ = quizData.questions[currentQuestion]
  if (!currentQ) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-lg mb-4">Question not found</p>
          <button onClick={() => router.push("/dashboard")} className="px-4 py-2 bg-blue-500 text-white rounded">
            Back to Dashboard
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <ProgressHeader
        currentQuestion={currentQuestion}
        totalQuestions={quizData.questions.length}
        score={xp}
        topic={topic!}
        level={level}
        streak={correctAnswersInRow}
        lives={lives}
        onBack={handleBack}
      />

      <main className="container mx-auto px-4 py-8">
        <AnimatePresence mode="wait">
          <QuestionCard
            key={currentQuestion}
            question={currentQ.question}
            options={currentQ.options}
            selectedAnswer={selectedAnswer}
            correctAnswer={currentQ.correctAnswer}
            showResult={showResult}
            onAnswerSelect={handleAnswerSelect}
            onNext={handleNextQuestion}
            isLastQuestion={currentQuestion === quizData.questions.length - 1}
          />
        </AnimatePresence>
      </main>

      <QuizFeedback
        isCorrect={selectedAnswer === currentQ.correctAnswer}
        isVisible={showFeedback}
        correctAnswer={currentQ.correctAnswer}
        selectedAnswer={selectedAnswer || ""}
        onNext={handleFeedbackNext}
        streak={correctAnswersInRow}
        xpEarned={selectedAnswer === currentQ.correctAnswer ? (correctAnswersInRow >= 3 ? 30 : 20) : 0}
      />
    </div>
  )
}
