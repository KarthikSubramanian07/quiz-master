import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useQuiz } from '../context/QuizContext'
import { useAuth } from '../context/AuthContext'
import ConfirmModal from '../components/ConfirmModal'
import { setActiveQuiz, removeActiveQuiz } from '../hooks/useActiveQuizUsers'

function QuizSession() {
  const { categoryId } = useParams()
  const navigate = useNavigate()
  const { user } = useAuth()
  const {
    currentQuiz,
    currentQuestionIndex,
    startQuiz,
    answerQuestion,
    nextQuestion,
    finishQuiz,
    getCurrentQuestion,
    showExplanation,
    selectedAnswer,
    resetQuiz
  } = useQuiz()

  const [showQuitModal, setShowQuitModal] = useState(false)

  useEffect(() => {
    if (!currentQuiz) {
      startQuiz(categoryId, 10)
    }
  }, [])

  // Track active quiz session
  useEffect(() => {
    if (!currentQuiz || !user) return

    // Set user as active in this category
    setActiveQuiz(user.uid, categoryId)

    // Clean up when component unmounts or quiz ends
    return () => {
      removeActiveQuiz(user.uid, categoryId)
    }
  }, [currentQuiz, user, categoryId])

  const handleAnswer = (answerIndex) => {
    answerQuestion(answerIndex)
  }

  const handleNext = () => {
    if (currentQuestionIndex === currentQuiz.questions.length - 1) {
      // Remove from active users before finishing
      removeActiveQuiz(user.uid, categoryId)
      finishQuiz()
      navigate('/results')
    } else {
      nextQuestion()
    }
  }

  const handleQuitClick = () => {
    setShowQuitModal(true)
  }

  const handleConfirmQuit = () => {
    // Remove from active users when quitting
    removeActiveQuiz(user.uid, categoryId)
    resetQuiz()
    navigate('/')
  }

  if (!currentQuiz) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-2xl text-white">Loading quiz...</div>
      </div>
    )
  }

  const currentQuestion = getCurrentQuestion()
  const progress = ((currentQuestionIndex + 1) / currentQuiz.questions.length) * 100

  const getCategoryInfo = () => {
    const categories = {
      science: { name: 'Science & Nature', icon: '🔬', color: 'from-green-400 to-emerald-600' },
      history: { name: 'World History', icon: '🏛️', color: 'from-amber-400 to-orange-600' },
      technology: { name: 'Technology', icon: '💻', color: 'from-blue-400 to-indigo-600' },
      literature: { name: 'Literature & Arts', icon: '📚', color: 'from-purple-400 to-pink-600' },
      geography: { name: 'Geography', icon: '🌍', color: 'from-cyan-400 to-teal-600' },
      general: { name: 'General Knowledge', icon: '🎯', color: 'from-red-400 to-rose-600' }
    }
    return categories[categoryId] || { name: categoryId, icon: '❓', color: 'from-gray-400 to-gray-600' }
  }

  const categoryInfo = getCategoryInfo()

  const getOptionClass = (index) => {
    if (selectedAnswer === null) {
      return 'quiz-option quiz-option-default'
    }
    if (index === currentQuestion.correctAnswer) {
      return 'quiz-option quiz-option-correct'
    }
    if (index === selectedAnswer && selectedAnswer !== currentQuestion.correctAnswer) {
      return 'quiz-option quiz-option-incorrect'
    }
    return 'quiz-option border-slate-600 bg-slate-700/30'
  }

  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-6 text-center">
          <div className={`inline-flex items-center gap-3 bg-gradient-to-r ${categoryInfo.color} text-white px-6 py-3 rounded-full shadow-lg mb-4`}>
            <span className="text-2xl">{categoryInfo.icon}</span>
            <span className="font-bold text-lg">{categoryInfo.name}</span>
          </div>
          <div className="flex justify-between items-center text-sm text-gray-300 max-w-2xl mx-auto">
            <span>Question {currentQuestionIndex + 1} of {currentQuiz.questions.length}</span>
            <span>{Math.round(progress)}% Complete</span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-slate-700 rounded-full h-3 mb-8 overflow-hidden shadow-inner">
          <div
            className="bg-gradient-to-r from-indigo-500 to-purple-600 h-3 rounded-full transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Question Card */}
        <div className="card max-w-3xl mx-auto mb-6 animate-fade-in">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-6 leading-relaxed">
            {currentQuestion.question}
          </h2>

          {/* Options */}
          <div className="space-y-3 mb-6">
            {currentQuestion.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswer(index)}
                disabled={selectedAnswer !== null}
                className={getOptionClass(index)}
              >
                <div className="flex items-center gap-3">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center font-bold text-white">
                    {String.fromCharCode(65 + index)}
                  </span>
                  <span className="text-left font-medium text-white">{option}</span>
                  {selectedAnswer !== null && index === currentQuestion.correctAnswer && (
                    <span className="ml-auto text-2xl">✓</span>
                  )}
                  {selectedAnswer === index && index !== currentQuestion.correctAnswer && (
                    <span className="ml-auto text-2xl">✗</span>
                  )}
                </div>
              </button>
            ))}
          </div>

          {/* Explanation */}
          {showExplanation && (
            <div className="mt-6 p-4 bg-blue-900/30 border-l-4 border-blue-400 rounded animate-slide-up">
              <p className="text-sm font-semibold text-blue-300 mb-1">Explanation:</p>
              <p className="text-gray-200">{currentQuestion.explanation}</p>
            </div>
          )}
        </div>

        {/* Navigation */}
        {showExplanation && (
          <div className="text-center animate-fade-in">
            <button onClick={handleNext} className="btn-primary text-lg px-8">
              {currentQuestionIndex === currentQuiz.questions.length - 1 ? 'See Results' : 'Next Question'} →
            </button>
          </div>
        )}

        {/* Quit Button */}
        <div className="text-center mt-6">
          <button
            onClick={handleQuitClick}
            className="text-gray-400 hover:text-white text-sm transition-colors"
          >
            ← Quit Quiz
          </button>
        </div>
      </div>

      {/* Quit Confirmation Modal */}
      <ConfirmModal
        isOpen={showQuitModal}
        onClose={() => setShowQuitModal(false)}
        onConfirm={handleConfirmQuit}
        title="Quit Quiz?"
        message="Your progress will be lost if you quit now. Are you sure you want to leave?"
      />
    </div>
  )
}

export default QuizSession
