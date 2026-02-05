import React from 'react'
import { useNavigate } from 'react-router-dom'

function Stats() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-6xl mx-auto">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold text-primary-700 mb-3">
            Your Stats 📊
          </h1>
          <p className="text-gray-600">Track your quiz performance over time</p>
        </header>

        <div className="card text-center">
          <p className="text-gray-600 mb-6">Stats dashboard coming soon...</p>
          <button onClick={() => navigate('/')} className="btn-primary">
            Back to Home
          </button>
        </div>
      </div>
    </div>
  )
}

export default Stats
