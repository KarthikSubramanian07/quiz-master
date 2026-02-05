import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useQuiz } from '../context/QuizContext'
import { useAuth } from '../context/AuthContext'
import DifficultySelector from '../components/DifficultySelector'
import LoginModal from '../components/LoginModal'

function Home() {
  const navigate = useNavigate()
  const { difficulty, setDifficulty } = useQuiz()
  const { user, signOut, isGuest } = useAuth()
  const [showLoginModal, setShowLoginModal] = useState(false)

  useEffect(() => {
    // Show login modal if user hasn't chosen yet
    if (!user) {
      setShowLoginModal(true)
    }
  }, [user])

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
    <div className="min-h-screen p-4 md:p-8 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <div className="max-w-7xl mx-auto">
        {/* Top Bar with User Info */}
        <div className="flex justify-between items-center mb-8 animate-fade-in">
          <div></div>
          {user && (
            <div className="flex items-center gap-4">
              <div className="bg-white/80 backdrop-blur-md rounded-2xl px-4 py-2 shadow-lg border border-gray-200 flex items-center gap-3">
                {user.photoURL ? (
                  <img src={user.photoURL} alt="Profile" className="w-8 h-8 rounded-full" />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center text-white font-bold">
                    {user.displayName ? user.displayName[0].toUpperCase() : '?'}
                  </div>
                )}
                <span className="font-semibold text-gray-700">{user.displayName}</span>
                {isGuest && <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full">Guest</span>}
              </div>
              <button
                onClick={signOut}
                className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800 hover:bg-white/80 rounded-xl transition-all"
              >
                Sign Out
              </button>
            </div>
          )}
        </div>

        {/* Header */}
        <header className="text-center mb-12 animate-fade-in">
          <h1 className="text-6xl md:text-7xl font-black mb-4 bg-gradient-to-r from-primary-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
            QuizMaster
          </h1>
          <p className="text-2xl text-gray-700 mb-8 font-medium">
            Choose your challenge and test your knowledge!
          </p>

          {/* Difficulty Selector */}
          <div className="flex justify-center mb-8">
            <DifficultySelector difficulty={difficulty} onDifficultyChange={setDifficulty} />
          </div>
        </header>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {categories.map((category, index) => (
            <div
              key={category.id}
              className="group cursor-pointer transform transition-all duration-300 hover:-translate-y-2 animate-slide-up"
              style={{ animationDelay: `${index * 0.1}s` }}
              onClick={() => navigate(`/quiz/${category.id}`)}
            >
              <div className="bg-white/80 backdrop-blur-md rounded-3xl p-6 shadow-xl hover:shadow-2xl border border-gray-200 transition-all duration-300">
                <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${category.color} flex items-center justify-center text-4xl mb-4 transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg`}>
                  {category.icon}
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2 group-hover:text-primary-600 transition-colors">
                  {category.name}
                </h3>
                <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                  {category.description}
                </p>
                <button className="w-full py-3 px-6 bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white font-semibold rounded-xl transition-all duration-200 shadow-md hover:shadow-lg transform group-hover:scale-105">
                  Start Quiz →
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Stats Button */}
        <div className="text-center">
          <button
            onClick={() => navigate('/stats')}
            className="px-8 py-4 bg-white/80 backdrop-blur-md hover:bg-white text-gray-800 font-semibold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 transform hover:scale-105"
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
