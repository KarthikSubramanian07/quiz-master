import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import QuizSession from './pages/QuizSession'
import Results from './pages/Results'
import Stats from './pages/Stats'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/quiz/:categoryId" element={<QuizSession />} />
        <Route path="/results" element={<Results />} />
        <Route path="/stats" element={<Stats />} />
      </Routes>
    </Router>
  )
}

export default App
