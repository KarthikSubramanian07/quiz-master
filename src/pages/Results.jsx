import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useQuiz } from '../context/QuizContext'
import { getScorePercentage, getPerformanceMessage, getPerformanceColor } from '../utils/scoring'

function Results() {
  const navigate = useNavigate()
  const { userAnswers, currentQuiz, resetQuiz, newAchievements, setNewAchievements } = useQuiz()
  const [showReview, setShowReview] = useState(false)

  if (!userAnswers || userAnswers.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center p-8">
        <div className="card max-w-2xl w-full text-center">
          <h2 className="text-3xl font-bold text-white mb-4">No Quiz Results</h2>
          <p className="text-gray-300 mb-6">Take a quiz to see your results!</p>
          <button onClick={() => navigate('/')} className="btn-primary">
            Go to Home
          </button>
        </div>
      </div>
    )
  }

  const score = userAnswers.filter(a => a.isCorrect).length
  const total = userAnswers.length
  const percentage = getScorePercentage(score, total)
  const message = getPerformanceMessage(percentage)
  const colorClass = getPerformanceColor(percentage)

  const incorrectAnswers = userAnswers.filter(a => !a.isCorrect)

  const handleTryAgain = () => {
    resetQuiz()
    navigate(`/quiz/${currentQuiz.category}`)
  }

  const handleGoHome = () => {
    resetQuiz()
    navigate('/')
  }

  const dismissAchievements = () => {
    setNewAchievements([])
  }

  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Achievements Popup */}
        {newAchievements.length > 0 && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 animate-fade-in">
            <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-8 max-w-md w-full animate-bounce-subtle border border-purple-500/30">
              <h3 className="text-2xl font-bold text-center text-white mb-6">🎉 New Achievements!</h3>
              <div className="space-y-4">
                {newAchievements.map((achievement, index) => (
                  <div key={index} className="flex items-center gap-4 p-4 bg-yellow-900/30 rounded-lg border-2 border-yellow-500/50">
                    <span className="text-4xl">{achievement.icon}</span>
                    <div>
                      <h4 className="font-bold text-lg text-white">{achievement.title}</h4>
                      <p className="text-sm text-gray-300">{achievement.description}</p>
                    </div>
                  </div>
                ))}
              </div>
              <button onClick={dismissAchievements} className="btn-primary w-full mt-6">
                Awesome!
              </button>
            </div>
          </div>
        )}

        {/* Results Card */}
        <div className="card max-w-2xl mx-auto mb-6 text-center animate-fade-in">
          <div className="mb-6">
            <div className="text-6xl mb-4">
              {percentage === 100 ? '🏆' : percentage >= 80 ? '🌟' : percentage >= 60 ? '👍' : '📚'}
            </div>
            <h1 className="text-4xl font-bold text-white mb-2">Quiz Complete!</h1>
            <p className={`text-2xl font-semibold ${colorClass}`}>{message}</p>
          </div>

          {/* Score Circle */}
          <div className="relative w-48 h-48 mx-auto mb-8">
            <svg className="transform -rotate-90 w-48 h-48">
              <circle
                cx="96"
                cy="96"
                r="88"
                stroke="#e5e7eb"
                strokeWidth="12"
                fill="none"
              />
              <circle
                cx="96"
                cy="96"
                r="88"
                stroke={percentage >= 80 ? '#10b981' : percentage >= 60 ? '#3b82f6' : '#ef4444'}
                strokeWidth="12"
                fill="none"
                strokeDasharray={`${2 * Math.PI * 88}`}
                strokeDashoffset={`${2 * Math.PI * 88 * (1 - percentage / 100)}`}
                className="transition-all duration-1000"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-5xl font-bold text-white">{percentage}%</span>
              <span className="text-gray-300">{score}/{total}</span>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="p-4 bg-green-900/30 rounded-lg border border-green-500/30">
              <div className="text-2xl font-bold text-green-400">{score}</div>
              <div className="text-sm text-gray-300">Correct</div>
            </div>
            <div className="p-4 bg-red-900/30 rounded-lg border border-red-500/30">
              <div className="text-2xl font-bold text-red-400">{total - score}</div>
              <div className="text-sm text-gray-300">Incorrect</div>
            </div>
            <div className="p-4 bg-blue-900/30 rounded-lg border border-blue-500/30">
              <div className="text-2xl font-bold text-blue-400">{total}</div>
              <div className="text-sm text-gray-300">Total</div>
            </div>
          </div>

          {/* Review Button */}
          {incorrectAnswers.length > 0 && !showReview && (
            <button
              onClick={() => setShowReview(true)}
              className="btn-secondary w-full mb-4"
            >
              📝 Review Incorrect Answers ({incorrectAnswers.length})
            </button>
          )}

          {/* Action Buttons */}
          <div className="flex gap-4">
            <button onClick={handleTryAgain} className="btn-primary flex-1">
              Try Again
            </button>
            <button onClick={handleGoHome} className="btn-secondary flex-1">
              Home
            </button>
          </div>
        </div>

        {/* Review Section */}
        {showReview && incorrectAnswers.length > 0 && (
          <div className="max-w-3xl mx-auto animate-slide-up">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-white">Review Your Mistakes</h2>
              <button
                onClick={() => setShowReview(false)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                ✕ Close
              </button>
            </div>
            <div className="space-y-4">
              {incorrectAnswers.map((answer, index) => (
                <div key={index} className="card">
                  <h3 className="font-bold text-lg text-white mb-3">{answer.question}</h3>
                  <div className="space-y-2 mb-4">
                    <div className="p-3 bg-red-900/30 border-2 border-red-500/50 rounded-lg">
                      <span className="text-sm font-semibold text-red-300">Your Answer:</span>
                      <p className="text-white">{answer.options[answer.selectedAnswer]}</p>
                    </div>
                    <div className="p-3 bg-green-900/30 border-2 border-green-500/50 rounded-lg">
                      <span className="text-sm font-semibold text-green-300">Correct Answer:</span>
                      <p className="text-white">{answer.options[answer.correctAnswer]}</p>
                    </div>
                  </div>
                  <div className="p-3 bg-blue-900/30 border-l-4 border-blue-400 rounded">
                    <p className="text-sm font-semibold text-blue-300 mb-1">Explanation:</p>
                    <p className="text-gray-200">{answer.explanation}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Results
