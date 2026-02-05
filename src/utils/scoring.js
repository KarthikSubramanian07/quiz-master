export const calculateScore = (answers) => {
  let correct = 0
  answers.forEach(answer => {
    if (answer.isCorrect) correct++
  })
  return correct
}

export const getScorePercentage = (score, total) => {
  if (total === 0) return 0
  return Math.round((score / total) * 100)
}

export const getPerformanceMessage = (percentage) => {
  if (percentage === 100) return '🏆 Perfect Score! You\'re a Quiz Master!'
  if (percentage >= 90) return '🌟 Outstanding! Nearly perfect!'
  if (percentage >= 80) return '🎯 Excellent work! Keep it up!'
  if (percentage >= 70) return '👍 Good job! You\'re doing great!'
  if (percentage >= 60) return '📚 Not bad! Keep practicing!'
  if (percentage >= 50) return '💪 You can do better! Keep learning!'
  return '🎓 Keep studying! Practice makes perfect!'
}

export const getPerformanceColor = (percentage) => {
  if (percentage >= 90) return 'text-green-600'
  if (percentage >= 70) return 'text-blue-600'
  if (percentage >= 50) return 'text-yellow-600'
  return 'text-red-600'
}

export const checkAchievements = (history, stats) => {
  const achievements = []

  // First quiz achievement
  if (history.length === 1) {
    achievements.push({
      id: 'first_quiz',
      title: 'Getting Started',
      description: 'Completed your first quiz!',
      icon: '🎯'
    })
  }

  // 10 quizzes achievement
  if (history.length === 10) {
    achievements.push({
      id: 'ten_quizzes',
      title: 'Dedicated Learner',
      description: 'Completed 10 quizzes!',
      icon: '🔟'
    })
  }

  // Perfect score achievement
  const lastQuiz = history[0]
  if (lastQuiz && getScorePercentage(lastQuiz.score, lastQuiz.totalQuestions) === 100) {
    achievements.push({
      id: 'perfect_score',
      title: 'Perfectionist',
      description: 'Got a perfect score!',
      icon: '💯'
    })
  }

  // Category master (90%+ average in any category)
  Object.entries(stats).forEach(([category, stat]) => {
    if (stat.averageScore >= 90 && stat.totalQuizzes >= 5) {
      achievements.push({
        id: `master_${category}`,
        title: `${category.charAt(0).toUpperCase() + category.slice(1)} Master`,
        description: `Achieved 90%+ average over 5 quizzes!`,
        icon: '🏆'
      })
    }
  })

  return achievements
}
