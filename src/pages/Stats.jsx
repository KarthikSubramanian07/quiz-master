import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useQuiz } from '../context/QuizContext'
import { getScorePercentage } from '../utils/scoring'

function Stats() {
  const navigate = useNavigate()
  const { quizHistory, stats } = useQuiz()

  const categoryInfo = {
    science: { name: 'Science & Nature', icon: '🔬', color: 'from-green-400 to-emerald-600' },
    history: { name: 'World History', icon: '🏛️', color: 'from-amber-400 to-orange-600' },
    technology: { name: 'Technology', icon: '💻', color: 'from-blue-400 to-indigo-600' },
    literature: { name: 'Literature & Arts', icon: '📚', color: 'from-purple-400 to-pink-600' },
    geography: { name: 'Geography', icon: '🌍', color: 'from-cyan-400 to-teal-600' },
    general: { name: 'General Knowledge', icon: '🎯', color: 'from-red-400 to-rose-600' }
  }

  const getTotalStats = () => {
    const total = {
      quizzes: quizHistory.length,
      questions: 0,
      correct: 0,
      average: 0
    }

    quizHistory.forEach(quiz => {
      total.questions += quiz.totalQuestions
      total.correct += quiz.score
    })

    if (total.questions > 0) {
      total.average = Math.round((total.correct / total.questions) * 100)
    }

    return total
  }

  const totalStats = getTotalStats()

  const formatDate = (timestamp) => {
    const date = new Date(timestamp)
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
  }

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}m ${secs}s`
  }

  if (quizHistory.length === 0) {
    return (
      <div className="min-h-screen p-8">
        <div className="max-w-6xl mx-auto">
          <header className="text-center mb-12">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-3">
              Your Stats 📊
            </h1>
            <p className="text-gray-300">Track your quiz performance over time</p>
          </header>

          <div className="card text-center max-w-2xl mx-auto">
            <div className="text-6xl mb-4">📈</div>
            <h2 className="text-2xl font-bold text-white mb-4">No Stats Yet</h2>
            <p className="text-gray-300 mb-6">
              Take some quizzes to see your performance statistics!
            </p>
            <button onClick={() => navigate('/')} className="btn-primary">
              Start a Quiz
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <header className="text-center mb-12 animate-fade-in">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-3">
            Your Stats 📊
          </h1>
          <p className="text-gray-300">Track your quiz performance over time</p>
        </header>

        {/* Overall Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="card text-center border-blue-500/30">
            <div className="text-4xl font-bold text-blue-400 mb-2">{totalStats.quizzes}</div>
            <div className="text-gray-300 font-medium">Total Quizzes</div>
          </div>
          <div className="card text-center border-purple-500/30">
            <div className="text-4xl font-bold text-purple-400 mb-2">{totalStats.questions}</div>
            <div className="text-gray-300 font-medium">Questions Answered</div>
          </div>
          <div className="card text-center border-green-500/30">
            <div className="text-4xl font-bold text-green-400 mb-2">{totalStats.correct}</div>
            <div className="text-gray-300 font-medium">Correct Answers</div>
          </div>
          <div className="card text-center border-amber-500/30">
            <div className="text-4xl font-bold text-amber-400 mb-2">{totalStats.average}%</div>
            <div className="text-gray-300 font-medium">Average Score</div>
          </div>
        </div>

        {/* Category Performance */}
        <div className="card mb-8">
          <h2 className="text-2xl font-bold text-white mb-6">Performance by Category</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {Object.entries(stats).map(([category, stat]) => {
              const info = categoryInfo[category] || { name: category, icon: '❓', color: 'from-gray-400 to-gray-600' }
              return (
                <div key={category} className="p-4 border-2 border-slate-700 rounded-lg hover:border-purple-500 transition-colors">
                  <div className="flex items-center gap-3 mb-3">
                    <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${info.color} flex items-center justify-center text-xl`}>
                      {info.icon}
                    </div>
                    <div>
                      <h3 className="font-bold text-white">{info.name}</h3>
                      <p className="text-sm text-gray-300">{stat.totalQuizzes} quizzes</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-300">Average:</span>
                      <span className="font-bold text-purple-400">{stat.averageScore}%</span>
                    </div>
                    <div className="w-full bg-slate-700 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-indigo-500 to-purple-600 h-2 rounded-full transition-all"
                        style={{ width: `${stat.averageScore}%` }}
                      />
                    </div>
                    <div className="flex justify-between text-sm text-gray-300">
                      <span>{stat.correctAnswers} correct</span>
                      <span>{stat.totalQuestions} total</span>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Recent History */}
        <div className="card">
          <h2 className="text-2xl font-bold text-white mb-6">Recent Quiz History</h2>
          <div className="space-y-3">
            {quizHistory.slice(0, 10).map((quiz, index) => {
              const info = categoryInfo[quiz.category] || { name: quiz.category, icon: '❓', color: 'from-gray-400 to-gray-600' }
              const percentage = getScorePercentage(quiz.score, quiz.totalQuestions)
              return (
                <div
                  key={quiz.id || index}
                  className="flex items-center justify-between p-4 border-2 border-slate-700 rounded-lg hover:border-purple-500 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${info.color} flex items-center justify-center text-xl flex-shrink-0`}>
                      {info.icon}
                    </div>
                    <div>
                      <h3 className="font-bold text-white">{info.name}</h3>
                      <p className="text-sm text-gray-300">{formatDate(quiz.timestamp)}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-6">
                    <div className="text-right">
                      <div className="text-2xl font-bold" style={{
                        color: percentage >= 80 ? '#4ade80' : percentage >= 60 ? '#60a5fa' : '#f87171'
                      }}>
                        {percentage}%
                      </div>
                      <div className="text-sm text-gray-300">
                        {quiz.score}/{quiz.totalQuestions}
                      </div>
                    </div>
                    <div className="text-sm text-gray-400 hidden md:block">
                      {formatTime(quiz.timeSpent)}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Back Button */}
        <div className="text-center mt-8">
          <button onClick={() => navigate('/')} className="btn-primary">
            ← Back to Home
          </button>
        </div>
      </div>
    </div>
  )
}

export default Stats
