import React from 'react'
import { useParams } from 'react-router-dom'

function QuizSession() {
  const { categoryId } = useParams()

  return (
    <div className="min-h-screen flex items-center justify-center p-8">
      <div className="card max-w-3xl w-full">
        <h2 className="text-3xl font-bold text-center mb-4">
          Quiz Session: {categoryId}
        </h2>
        <p className="text-center text-gray-600">
          Quiz implementation coming soon...
        </p>
      </div>
    </div>
  )
}

export default QuizSession
