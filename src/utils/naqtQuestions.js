// NAQT Questions Utility
import { quizData } from '../data/naqtData'

export const getNAQTQuestions = (count = 10) => {
  const allQuestions = quizData.NAQT || []

  if (allQuestions.length === 0) {
    return []
  }

  // Shuffle and select questions
  const shuffled = [...allQuestions].sort(() => 0.5 - Math.random())
  return shuffled.slice(0, Math.min(count, shuffled.length))
}

export const getNAQTQuestionCount = () => {
  return quizData.NAQT ? quizData.NAQT.length : 0
}
