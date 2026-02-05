import React from 'react'
import { useNavigate } from 'react-router-dom'

function Results() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen flex items-center justify-center p-8">
      <div className="card max-w-2xl w-full text-center">
        <h2 className="text-3xl font-bold mb-4">Quiz Results</h2>
        <p className="text-gray-600 mb-6">Results page coming soon...</p>
        <button onClick={() => navigate('/')} className="btn-primary">
          Back to Home
        </button>
      </div>
    </div>
  )
}

export default Results
