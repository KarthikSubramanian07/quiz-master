const STORAGE_KEY = 'quizmaster_data'

export const getStorageData = () => {
  try {
    const data = localStorage.getItem(STORAGE_KEY)
    return data ? JSON.parse(data) : { history: [], stats: {} }
  } catch (error) {
    console.error('Error reading from localStorage:', error)
    return { history: [], stats: {} }
  }
}

export const saveQuizResult = (result) => {
  try {
    const data = getStorageData()
    const quizResult = {
      ...result,
      timestamp: new Date().toISOString(),
      id: Date.now()
    }

    data.history = [quizResult, ...data.history].slice(0, 50) // Keep last 50 results

    // Update stats
    const category = result.category
    if (!data.stats[category]) {
      data.stats[category] = {
        totalQuizzes: 0,
        totalQuestions: 0,
        correctAnswers: 0,
        averageScore: 0
      }
    }

    const categoryStats = data.stats[category]
    categoryStats.totalQuizzes += 1
    categoryStats.totalQuestions += result.totalQuestions
    categoryStats.correctAnswers += result.score
    categoryStats.averageScore = Math.round(
      (categoryStats.correctAnswers / categoryStats.totalQuestions) * 100
    )

    localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
    return quizResult
  } catch (error) {
    console.error('Error saving to localStorage:', error)
    return null
  }
}

export const getQuizHistory = () => {
  const data = getStorageData()
  return data.history || []
}

export const getCategoryStats = (category) => {
  const data = getStorageData()
  return data.stats[category] || {
    totalQuizzes: 0,
    totalQuestions: 0,
    correctAnswers: 0,
    averageScore: 0
  }
}

export const getAllStats = () => {
  const data = getStorageData()
  return data.stats || {}
}

export const clearAllData = () => {
  try {
    localStorage.removeItem(STORAGE_KEY)
    return true
  } catch (error) {
    console.error('Error clearing localStorage:', error)
    return false
  }
}
