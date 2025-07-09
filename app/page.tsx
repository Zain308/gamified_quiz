"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Brain, Trophy, Users, Zap, Star, ArrowRight, BookOpen, Target, Flame } from "lucide-react"
import { EnvCheck } from "@/components/env-check"
import { motion } from "framer-motion"

export default function Home() {
  return (
    <>
      <EnvCheck />
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        {/* Hero Section */}
        <main className="container mx-auto container-padding section-padding">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.h1
              className="text-responsive-xl font-bold text-gradient-primary mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              QuizMaster Pro
            </motion.h1>
            <motion.p
              className="text-responsive-md text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              The ultimate learning platform inspired by Duolingo! Master any topic through gamified quizzes, track your
              progress, build streaks, and become an expert in subjects you love.
            </motion.p>
            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <Link href="/login">
                <Button className="btn-gradient-primary group text-lg px-8 py-4">
                  Start Your Learning Journey
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link href="#features">
                <Button variant="outline" size="lg" className="hover-lift bg-transparent text-lg px-8 py-4">
                  Discover Features
                </Button>
              </Link>
            </motion.div>
          </motion.div>

          {/* Features Grid */}
          <div id="features" className="grid mobile-full-width tablet-grid-2 desktop-grid-4 gap-6 mb-16">
            <motion.div
              className="card-elevated hover-lift"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <CardHeader className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
                  <Brain className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-gradient-primary">AI-Powered Questions</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center">
                  Get unique, challenging questions powered by advanced AI on any topic you choose to learn.
                </CardDescription>
              </CardContent>
            </motion.div>

            <motion.div
              className="card-elevated hover-lift"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <CardHeader className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-full flex items-center justify-center">
                  <Trophy className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-gradient-warning">5 Progressive Levels</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center">
                  Master topics through 5 carefully designed difficulty levels, from beginner to expert.
                </CardDescription>
              </CardContent>
            </motion.div>

            <motion.div
              className="card-elevated hover-lift"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <CardHeader className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-green-500 to-teal-500 rounded-full flex items-center justify-center">
                  <Zap className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-gradient-success">Instant Feedback</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center">
                  Get immediate feedback with sound effects, animations, and detailed explanations.
                </CardDescription>
              </CardContent>
            </motion.div>

            <motion.div
              className="card-elevated hover-lift"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <CardHeader className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-gradient-primary">Progress Tracking</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center">
                  Track your learning journey with detailed analytics, streaks, and achievements.
                </CardDescription>
              </CardContent>
            </motion.div>
          </div>

          {/* How It Works Section */}
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <h2 className="text-responsive-lg font-bold mb-12 text-gradient-primary">How QuizMaster Works</h2>
            <div className="grid mobile-full-width desktop-grid-3 gap-8">
              <motion.div
                className="space-y-6"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto hover-glow">
                  <BookOpen className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800">Choose Your Topic</h3>
                <p className="text-gray-600 leading-relaxed">
                  Enter any subject you want to master - from programming to history, science to languages.
                </p>
              </motion.div>

              <motion.div
                className="space-y-6"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.7 }}
              >
                <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-teal-500 rounded-full flex items-center justify-center mx-auto hover-glow">
                  <Target className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800">Learn & Practice</h3>
                <p className="text-gray-600 leading-relaxed">
                  Answer 5 questions per level with beautiful animations, instant feedback, and streak tracking.
                </p>
              </motion.div>

              <motion.div
                className="space-y-6"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
              >
                <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto hover-glow">
                  <Flame className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800">Master & Advance</h3>
                <p className="text-gray-600 leading-relaxed">
                  Progress through 5 levels, earn XP, build streaks, and become an expert in your chosen topics.
                </p>
              </motion.div>
            </div>
          </motion.div>

          {/* CTA Section */}
          <motion.div
            className="text-center bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-12 text-white"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
          >
            <h2 className="text-3xl font-bold mb-4">Ready to Become a Learning Master?</h2>
            <p className="text-xl mb-8 opacity-90">
              Join thousands of learners who are already mastering new skills with our gamified learning platform.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link href="/login">
                <Button
                  size="lg"
                  className="bg-white text-blue-600 hover:bg-gray-100 font-semibold px-8 py-3 rounded-lg shadow-lg hover:shadow-xl transform transition-all duration-200 hover:scale-105"
                >
                  Start Learning Now
                </Button>
              </Link>
              <div className="flex items-center gap-2 text-sm opacity-75">
                <Star className="w-4 h-4 fill-current" />
                <span>Free to use • Unlimited topics • Track progress</span>
              </div>
            </div>
          </motion.div>
        </main>
      </div>
    </>
  )
}
