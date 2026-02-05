import React from 'react'

function DifficultySelector({ difficulty, onDifficultyChange }) {
  const difficulties = [
    { value: 'easy', label: 'Easy', icon: '🟢', color: 'from-green-500 to-emerald-600', hoverColor: 'hover:border-green-500' },
    { value: 'medium', label: 'Medium', icon: '🟡', color: 'from-yellow-500 to-orange-500', hoverColor: 'hover:border-yellow-500' },
    { value: 'hard', label: 'Hard', icon: '🔴', color: 'from-red-500 to-rose-600', hoverColor: 'hover:border-red-500' },
    { value: 'all', label: 'Mixed', icon: '🎯', color: 'from-purple-500 to-pink-600', hoverColor: 'hover:border-purple-500' }
  ]

  return (
    <div className="flex items-center gap-3 bg-slate-800/50 backdrop-blur-xl rounded-2xl p-2 shadow-2xl border border-white/10">
      {difficulties.map((diff) => (
        <button
          key={diff.value}
          onClick={() => onDifficultyChange(diff.value)}
          className={`
            px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-300 transform border-2
            ${
              difficulty === diff.value
                ? `bg-gradient-to-r ${diff.color} text-white shadow-xl scale-110 border-transparent`
                : `text-gray-300 hover:text-white border-transparent ${diff.hoverColor} hover:bg-white/5`
            }
          `}
        >
          <span className="mr-2">{diff.icon}</span>
          {diff.label}
        </button>
      ))}
    </div>
  )
}

export default DifficultySelector
