import React, { createContext, useContext, useState, useEffect } from 'react'
import { getRandomQuestions } from '../data/quizData'
import { saveQuizResult, getQuizHistory, getAllStats } from '../utils/storage'
import { calculateScore, checkAchievements } from '../utils/scoring'

const QuizContext = createContext()

export const useQuiz = () => {
  const context = useContext(QuizContext)
  if (!context) {
    throw new Error('useQuiz must be used within a QuizProvider')
  }
  return context
}

export const QuizProvider = ({ children }) => {
  const [currentQuiz, setCurrentQuiz] = useState(null)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [userAnswers, setUserAnswers] = useState([])
  const [quizHistory, setQuizHistory] = useState([])
  const [stats, setStats] = useState({})
  const [showExplanation, setShowExplanation] = useState(false)
  const [selectedAnswer, setSelectedAnswer] = useState(null)
  const [newAchievements, setNewAchievements] = useState([])
  const [difficulty, setDifficulty] = useState('all')

  useEffect(() => {
    loadData()
  }, [])

  const loadData = () => {
    const history = getQuizHistory()
    const allStats = getAllStats()
    setQuizHistory(history)
    setStats(allStats)
  }

  const startQuiz = (category, questionCount = 10, quizDifficulty = null) => {
    const selectedDifficulty = quizDifficulty || difficulty
    const questions = getRandomQuestions(category, questionCount, selectedDifficulty)
    setCurrentQuiz({
      category,
      questions,
      difficulty: selectedDifficulty,
      startTime: Date.now()
    })
    setCurrentQuestionIndex(0)
    setUserAnswers([])
    setSelectedAnswer(null)
    setShowExplanation(false)
  }

  const answerQuestion = (answerIndex) => {
    if (selectedAnswer !== null) return // Already answered

    const currentQuestion = currentQuiz.questions[currentQuestionIndex]
    const isCorrect = answerIndex === currentQuestion.correctAnswer

    const answer = {
      questionId: currentQuestion.id,
      question: currentQuestion.question,
      selectedAnswer: answerIndex,
      correctAnswer: currentQuestion.correctAnswer,
      isCorrect,
      explanation: currentQuestion.explanation,
      options: currentQuestion.options
    }

    setSelectedAnswer(answerIndex)
    setUserAnswers([...userAnswers, answer])
    setShowExplanation(true)
  }

  const nextQuestion = () => {
    if (currentQuestionIndex < currentQuiz.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
      setSelectedAnswer(null)
      setShowExplanation(false)
    } else {
      finishQuiz()
    }
  }

  const finishQuiz = () => {
    const score = calculateScore(userAnswers)
    const result = {
      category: currentQuiz.category,
      score,
      totalQuestions: currentQuiz.questions.length,
      answers: userAnswers,
      timeSpent: Math.round((Date.now() - currentQuiz.startTime) / 1000)
    }

    const savedResult = saveQuizResult(result)
    loadData()

    // Check for new achievements
    const achievements = checkAchievements(
      [savedResult, ...quizHistory],
      getAllStats()
    )
    setNewAchievements(achievements)

    return savedResult
  }

  const resetQuiz = () => {
    setCurrentQuiz(null)
    setCurrentQuestionIndex(0)
    setUserAnswers([])
    setSelectedAnswer(null)
    setShowExplanation(false)
  }

  const getCurrentQuestion = () => {
    if (!currentQuiz) return null
    return currentQuiz.questions[currentQuestionIndex]
  }

  const value = {
    currentQuiz,
    currentQuestionIndex,
    userAnswers,
    quizHistory,
    stats,
    showExplanation,
    selectedAnswer,
    newAchievements,
    difficulty,
    startQuiz,
    answerQuestion,
    nextQuestion,
    finishQuiz,
    resetQuiz,
    getCurrentQuestion,
    loadData,
    setNewAchievements,
    setDifficulty
  }

  return <QuizContext.Provider value={value}>{children}</QuizContext.Provider>
}
