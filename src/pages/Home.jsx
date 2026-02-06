import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useQuiz } from '../context/QuizContext'
import { useAuth } from '../context/AuthContext'
import DifficultySelector from '../components/DifficultySelector'
import LoginModal from '../components/LoginModal'
import { useActiveQuizUsers } from '../hooks/useActiveQuizUsers'
import { fetchOpenTriviaQuestions, OPEN_TRIVIA_CATEGORIES } from '../utils/openTriviaAPI'
import { getNAQTQuestions, getNAQTQuestionCount } from '../utils/naqtQuestions'

function Home() {
  const navigate = useNavigate()
  const { difficulty, setDifficulty, startQuizWithQuestions } = useQuiz()
  const { user, signOut, isGuest } = useAuth()
  const [showLoginModal, setShowLoginModal] = useState(false)
  const activeCounts = useActiveQuizUsers()

  // Open Trivia state
  const [selectedCategory, setSelectedCategory] = useState('')
  const [isLoadingTrivia, setIsLoadingTrivia] = useState(false)
  const [triviaError, setTriviaError] = useState(null)

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

  const handleStartOpenTrivia = async () => {
    setIsLoadingTrivia(true)
    setTriviaError(null)

    try {
      const result = await fetchOpenTriviaQuestions(10, selectedCategory, difficulty)

      if (result.success && result.questions.length > 0) {
        // Start quiz with fetched questions
        startQuizWithQuestions('Open Trivia', result.questions, difficulty)
        navigate('/quiz/open-trivia')
      } else {
        setTriviaError(result.error || 'Failed to load questions. Please try again.')
      }
    } catch (error) {
      setTriviaError('Network error. Please check your connection and try again.')
    } finally {
      setIsLoadingTrivia(false)
    }
  }

  const handleStartNAQT = () => {
    const questions = getNAQTQuestions(10)

    if (questions.length > 0) {
      // Always use 'hard' difficulty for NAQT questions
      startQuizWithQuestions('NAQT', questions, 'hard')
      navigate('/quiz/naqt')
    }
  }

  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Top Bar with Logo and User Info */}
        <div className="flex justify-between items-center mb-8 animate-fade-in">
          <img
            src="/logo3.png"
            alt="QuizMaster Logo"
            className="h-12 md:h-14 w-auto object-contain drop-shadow-lg"
          />
          {user && (
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
          )}
        </div>

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

        {/* NAQT Section */}
        <div className="max-w-3xl mx-auto mb-10 animate-fade-in">
          <div className="card border-2 border-yellow-500/30 hover:border-yellow-500/50 transition-all relative">
            {/* Active Users Badge */}
            {activeCounts['naqt'] > 0 && (
              <div
                className="absolute top-4 right-4 z-20 flex items-center gap-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white px-3 py-1.5 rounded-full shadow-lg animate-pulse"
                title={`${activeCounts['naqt']} ${activeCounts['naqt'] === 1 ? 'user is' : 'users are'} quizzing now`}
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" />
                </svg>
                <span className="text-sm font-bold">{activeCounts['naqt']}</span>
              </div>
            )}

            <div className="flex items-center gap-3 mb-4">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-yellow-400 to-orange-600 flex items-center justify-center text-3xl shadow-lg">
                🏆
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white">NAQT Academic Questions</h3>
                <p className="text-gray-400 text-sm">Challenge yourself with academic competition questions</p>
              </div>
            </div>

            {/* Info Banner */}
            <div className="mb-4 p-3 bg-yellow-900/20 border border-yellow-500/30 rounded-lg">
              <div className="flex items-center gap-2 text-yellow-300 text-sm">
                <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
                <span><strong>Note:</strong> All NAQT questions are randomly chosen from prior papers</span>
              </div>
            </div>

            {/* Start Button */}
            <button
              onClick={handleStartNAQT}
              className="w-full py-4 px-6 bg-gradient-to-r from-yellow-600 to-orange-600 hover:from-yellow-700 hover:to-orange-700 text-white font-bold rounded-xl transition-all duration-200 shadow-xl hover:shadow-2xl hover:shadow-yellow-500/50 transform hover:scale-105 flex items-center justify-center gap-2"
            >
              Start NAQT Quiz →
            </button>
          </div>
        </div>

        {/* Open Trivia Database Section */}
        <div className="max-w-3xl mx-auto mb-10 animate-fade-in">
          <div className="card border-2 border-purple-500/30 hover:border-purple-500/50 transition-all relative">
            {/* Active Users Badge */}
            {activeCounts['open-trivia'] > 0 && (
              <div
                className="absolute top-4 right-4 z-20 flex items-center gap-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white px-3 py-1.5 rounded-full shadow-lg animate-pulse"
                title={`${activeCounts['open-trivia']} ${activeCounts['open-trivia'] === 1 ? 'user is' : 'users are'} quizzing now`}
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" />
                </svg>
                <span className="text-sm font-bold">{activeCounts['open-trivia']}</span>
              </div>
            )}

            <div className="flex items-center gap-3 mb-4">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-purple-400 to-pink-600 flex items-center justify-center text-3xl shadow-lg">
                🌐
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white">Open Trivia Database</h3>
                <p className="text-gray-400 text-sm">Thousands of community questions from around the world</p>
              </div>
            </div>

            {triviaError && (
              <div className="mb-4 p-3 bg-red-900/30 border border-red-500/50 rounded-lg text-red-300 text-sm">
                {triviaError}
              </div>
            )}

            <div className="space-y-4">
              {/* Category Selector */}
              <div>
                <label className="block text-gray-300 text-sm font-semibold mb-2">
                  Category (Optional)
                </label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-xl text-white focus:outline-none focus:border-purple-500 transition-colors"
                  disabled={isLoadingTrivia}
                >
                  {OPEN_TRIVIA_CATEGORIES.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Start Button */}
              <button
                onClick={handleStartOpenTrivia}
                disabled={isLoadingTrivia}
                className="w-full py-4 px-6 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 disabled:from-gray-600 disabled:to-gray-700 text-white font-bold rounded-xl transition-all duration-200 shadow-xl hover:shadow-2xl hover:shadow-purple-500/50 transform hover:scale-105 disabled:hover:scale-100 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isLoadingTrivia ? (
                  <>
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Loading Questions...
                  </>
                ) : (
                  <>
                    Start Open Trivia Quiz →
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Stats Button */}
        <div className="text-center mt-10">
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
