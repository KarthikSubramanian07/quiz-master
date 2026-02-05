import React from 'react'

function DifficultySelector({ difficulty, onDifficultyChange }) {
  const difficulties = [
    { value: 'easy', label: 'Easy', icon: '🟢', color: 'from-green-400 to-green-600' },
    { value: 'medium', label: 'Medium', icon: '🟡', color: 'from-yellow-400 to-orange-500' },
    { value: 'hard', label: 'Hard', icon: '🔴', color: 'from-red-400 to-red-600' },
    { value: 'all', label: 'Mixed', icon: '🎯', color: 'from-purple-400 to-pink-600' }
  ]

  return (
    <div className="flex items-center gap-2 bg-white/80 backdrop-blur-md rounded-2xl p-2 shadow-lg border border-gray-200">
      {difficulties.map((diff) => (
        <button
          key={diff.value}
          onClick={() => onDifficultyChange(diff.value)}
          className={`
            px-4 py-2 rounded-xl font-semibold text-sm transition-all duration-300 transform
            ${
              difficulty === diff.value
                ? `bg-gradient-to-r ${diff.color} text-white shadow-lg scale-105`
                : 'text-gray-600 hover:bg-gray-100'
            }
          `}
        >
          <span className="mr-1">{diff.icon}</span>
          {diff.label}
        </button>
      ))}
    </div>
  )
}

export default DifficultySelector
