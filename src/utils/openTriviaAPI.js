// Open Trivia Database API Integration
// API Documentation: https://opentdb.com/api_config.php

export const OPEN_TRIVIA_CATEGORIES = [
  { id: '', name: 'Any Category' },
  { id: '9', name: 'General Knowledge' },
  { id: '10', name: 'Books' },
  { id: '11', name: 'Film' },
  { id: '12', name: 'Music' },
  { id: '13', name: 'Musicals & Theatres' },
  { id: '14', name: 'Television' },
  { id: '15', name: 'Video Games' },
  { id: '16', name: 'Board Games' },
  { id: '17', name: 'Science & Nature' },
  { id: '18', name: 'Computers' },
  { id: '19', name: 'Mathematics' },
  { id: '20', name: 'Mythology' },
  { id: '21', name: 'Sports' },
  { id: '22', name: 'Geography' },
  { id: '23', name: 'History' },
  { id: '24', name: 'Politics' },
  { id: '25', name: 'Art' },
  { id: '26', name: 'Celebrities' },
  { id: '27', name: 'Animals' },
  { id: '28', name: 'Vehicles' }
]

// Decode HTML entities
const decodeHTML = (html) => {
  const txt = document.createElement('textarea')
  txt.innerHTML = html
  return txt.value
}

// Fetch questions from Open Trivia DB
export const fetchOpenTriviaQuestions = async (amount = 10, category = '', difficulty = 'all') => {
  try {
    // Build API URL
    let url = `https://opentdb.com/api.php?amount=${amount}&type=multiple`

    if (category) {
      url += `&category=${category}`
    }

    if (difficulty !== 'all') {
      url += `&difficulty=${difficulty}`
    }

    const response = await fetch(url)
    const data = await response.json()

    if (data.response_code !== 0) {
      throw new Error('Failed to fetch questions from Open Trivia DB')
    }

    // Transform Open Trivia format to our quiz format
    const transformedQuestions = data.results.map((q, index) => {
      // Decode HTML entities
      const question = decodeHTML(q.question)
      const correctAnswerText = decodeHTML(q.correct_answer)
      const incorrectAnswers = q.incorrect_answers.map(a => decodeHTML(a))

      // Shuffle options
      const options = [...incorrectAnswers]
      const correctIndex = Math.floor(Math.random() * 4)
      options.splice(correctIndex, 0, correctAnswerText)

      return {
        id: `trivia_${Date.now()}_${index}`,
        question: question,
        options: options,
        correctAnswer: correctIndex,
        difficulty: q.difficulty,
        category: decodeHTML(q.category),
        explanation: `The correct answer is: ${correctAnswerText}`
      }
    })

    return {
      success: true,
      questions: transformedQuestions,
      source: 'Open Trivia Database'
    }
  } catch (error) {
    console.error('Error fetching from Open Trivia DB:', error)
    return {
      success: false,
      error: error.message || 'Failed to fetch questions',
      questions: []
    }
  }
}
