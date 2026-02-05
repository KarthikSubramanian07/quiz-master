import React from 'react'
import { useNavigate } from 'react-router-dom'

function Home() {
  const navigate = useNavigate()

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
    <div className="min-h-screen p-8">
      <div className="max-w-6xl mx-auto">
        <header className="text-center mb-12 animate-fade-in">
          <h1 className="text-5xl font-bold text-primary-700 mb-3">
            QuizMaster 🎓
          </h1>
          <p className="text-xl text-gray-600">
            Choose a category and test your knowledge!
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {categories.map((category, index) => (
            <div
              key={category.id}
              className="card cursor-pointer transform hover:-translate-y-2 animate-slide-up"
              style={{ animationDelay: `${index * 0.1}s` }}
              onClick={() => navigate(`/quiz/${category.id}`)}
            >
              <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${category.color} flex items-center justify-center text-3xl mb-4`}>
                {category.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">
                {category.name}
              </h3>
              <p className="text-gray-600 text-sm mb-4">
                {category.description}
              </p>
              <button className="btn-primary w-full">
                Start Quiz
              </button>
            </div>
          ))}
        </div>

        <div className="text-center">
          <button
            onClick={() => navigate('/stats')}
            className="btn-secondary"
          >
            📊 View My Stats
          </button>
        </div>
      </div>
    </div>
  )
}

export default Home
