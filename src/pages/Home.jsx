import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useQuiz } from '../context/QuizContext'
import { useAuth } from '../context/AuthContext'
import DifficultySelector from '../components/DifficultySelector'
import LoginModal from '../components/LoginModal'
import { useActiveQuizUsers } from '../hooks/useActiveQuizUsers'

function Home() {
  const navigate = useNavigate()
  const { difficulty, setDifficulty } = useQuiz()
  const { user, signOut, isGuest } = useAuth()
  const [showLoginModal, setShowLoginModal] = useState(false)
  const activeCounts = useActiveQuizUsers()

  // No automatic login modal - users start as guest by default

  const categories = [
    {
      id: 'science',
      name: 'Science & Nature',
      icon: '🔬',
      description: 'Biology, Chemistry, Physics, and the Natural World',
      color: 'from-green-400 to-emerald-600'
    },
    {
      id: 'history',
      name: 'World History',
      icon: '🏛️',
      description: 'Ancient civilizations to modern times',
      color: 'from-amber-400 to-orange-600'
    },
    {
      id: 'technology',
      name: 'Technology',
      icon: '💻',
      description: 'Computers, Programming, and Innovation',
      color: 'from-blue-400 to-indigo-600'
    },
    {
      id: 'literature',
      name: 'Literature & Arts',
      icon: '📚',
      description: 'Books, Authors, Art, and Culture',
      color: 'from-purple-400 to-pink-600'
    },
    {
      id: 'geography',
      name: 'Geography',
      icon: '🌍',
      description: 'Countries, Capitals, and Landmarks',
      color: 'from-cyan-400 to-teal-600'
    },
    {
      id: 'general',
      name: 'General Knowledge',
      icon: '🎯',
      description: 'A mix of everything!',
      color: 'from-red-400 to-rose-600'
    }
  ]

  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Logo */}
        <div className="mb-6">
          <img
            src="/logo3.png"
            alt="QuizMaster Logo"
            className="h-12 md:h-14 w-auto object-contain drop-shadow-lg"
          />
        </div>

        {/* User Info */}
        {user && (
          <div className="flex justify-end items-center mb-8 animate-fade-in">
            <div className="flex items-center gap-4">
              {!isGuest && (
                <div className="glass-card px-6 py-3 flex items-center gap-3">
                  {user.photoURL ? (
                    <img src={user.photoURL} alt="Profile" className="w-10 h-10 rounded-full ring-2 ring-purple-500" />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-lg ring-2 ring-purple-500">
                      {user.displayName ? user.displayName[0].toUpperCase() : '?'}
                    </div>
                  )}
                  <span className="font-semibold text-white">{user.displayName}</span>
                </div>
              )}
              {isGuest ? (
                <button
                  onClick={() => setShowLoginModal(true)}
                  className="px-5 py-3 text-sm bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white rounded-xl transition-all font-semibold shadow-lg"
                >
                  Sign In with Google
                </button>
              ) : (
                <button
                  onClick={signOut}
                  className="px-5 py-3 text-sm text-gray-300 hover:text-white hover:bg-white/10 rounded-xl transition-all border border-white/10"
                >
                  Sign Out
                </button>
              )}
            </div>
          </div>
        )}

        {/* Header */}
        <header className="text-center mb-12 animate-fade-in">
          <h1 className="text-5xl md:text-7xl font-black bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent drop-shadow-2xl mb-4">
            QuizMaster
          </h1>
          <p className="text-2xl text-gray-300 mb-10 font-medium">
            Choose your challenge and test your knowledge!
          </p>

          {/* Difficulty Selector */}
          <div className="flex justify-center mb-8">
            <DifficultySelector difficulty={difficulty} onDifficultyChange={setDifficulty} />
          </div>
        </header>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {categories.map((category, index) => {
            const activeCount = activeCounts[category.id] || 0
            return (
              <div
                key={category.id}
                className="group cursor-pointer transform transition-all duration-300 hover:-translate-y-3 animate-slide-up"
                style={{ animationDelay: `${index * 0.1}s` }}
                onClick={() => navigate(`/quiz/${category.id}`)}
              >
                <div className="card hover:border-purple-500/50 relative overflow-hidden">
                  {/* Active Users Badge */}
                  {activeCount > 0 && (
                    <div
                      className="absolute top-4 right-4 z-20 flex items-center gap-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white px-3 py-1.5 rounded-full shadow-lg animate-pulse"
                      title={`${activeCount} ${activeCount === 1 ? 'user is' : 'users are'} quizzing now`}
                    >
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" />
                      </svg>
                      <span className="text-sm font-bold">{activeCount}</span>
                    </div>
                  )}

                  {/* Gradient overlay on hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-600/0 to-indigo-600/0 group-hover:from-purple-600/10 group-hover:to-indigo-600/10 transition-all duration-500"></div>

                  <div className="relative z-10">
                  <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${category.color} flex items-center justify-center text-4xl mb-4 transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-2xl`}>
                    {category.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-purple-300 transition-colors">
                    {category.name}
                  </h3>
                  <p className="text-gray-400 text-sm mb-4 leading-relaxed">
                    {category.description}
                  </p>
                  <button className="w-full py-3 px-6 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold rounded-xl transition-all duration-200 shadow-xl hover:shadow-2xl hover:shadow-purple-500/50 transform group-hover:scale-105">
                    Start Quiz →
                  </button>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Stats Button */}
        <div className="text-center">
          <button
            onClick={() => navigate('/stats')}
            className="px-10 py-5 glass-card hover:bg-white/15 text-white font-semibold rounded-2xl shadow-2xl hover:shadow-purple-500/30 transition-all duration-300 transform hover:scale-105 text-lg"
          >
            📊 View My Stats & Progress
          </button>
        </div>
      </div>

      {/* Login Modal */}
      <LoginModal isOpen={showLoginModal} onClose={() => setShowLoginModal(false)} />
    </div>
  )
}

export default Home
