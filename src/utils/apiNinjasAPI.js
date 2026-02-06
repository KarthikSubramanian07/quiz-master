// API Ninjas Trivia API Integration
// API Documentation: https://api-ninjas.com/api/trivia

export const API_NINJAS_CATEGORIES = [
  { id: '', name: 'Any Category' },
  { id: 'artliterature', name: 'Art & Literature' },
  { id: 'language', name: 'Language' },
  { id: 'sciencenature', name: 'Science & Nature' },
  { id: 'general', name: 'General Knowledge' },
  { id: 'fooddrink', name: 'Food & Drink' },
  { id: 'peopleplaces', name: 'People & Places' },
  { id: 'geography', name: 'Geography' },
  { id: 'historyholidays', name: 'History & Holidays' },
  { id: 'entertainment', name: 'Entertainment' },
  { id: 'toysgames', name: 'Toys & Games' },
  { id: 'music', name: 'Music' },
  { id: 'mathematics', name: 'Mathematics' },
  { id: 'religionmythology', name: 'Religion & Mythology' },
  { id: 'sportsleisure', name: 'Sports & Leisure' }
]

// Generate plausible wrong answers for multiple choice
const generateDistractors = (correctAnswer, category) => {
  // Simple distractor generation - in production, this could be more sophisticated
  const distractors = []

  // Try to create variations of the correct answer
  if (typeof correctAnswer === 'string') {
    const words = correctAnswer.split(' ')

    if (words.length > 1) {
      // Swap words (create a copy first to avoid mutation)
      distractors.push([...words].reverse().join(' '))
      // Take first/last parts
      distractors.push(words.slice(0, -1).join(' '))
      distractors.push(words.slice(1).join(' '))
    }

    // Add generic distractors if we don't have enough
    const genericOptions = [
      'Unknown',
      'Not specified',
      'None of the above'
    ]

    while (distractors.length < 3) {
      distractors.push(genericOptions[distractors.length] || `Option ${distractors.length + 1}`)
    }
  }

  return distractors.slice(0, 3)
}

// Fetch questions from API Ninjas
export const fetchApiNinjasQuestions = async (limit = 10, category = '') => {
  try {
    // Get API key from environment variable
    const apiKey = import.meta.env.VITE_API_NINJAS_KEY

    if (!apiKey) {
      throw new Error('API Ninjas API key not configured. Please add VITE_API_NINJAS_KEY to your .env file.')
    }

    // Build API URL - Note: Free tier doesn't support 'limit' parameter
    // We'll make multiple requests to get the desired number of questions
    let url = `https://api.api-ninjas.com/v1/trivia`

    // Only add category if it's not empty
    if (category && category.trim() !== '') {
      url += `?category=${encodeURIComponent(category)}`
    }

    console.log('Fetching from URL:', url)
    console.log('Requesting', limit, 'questions (will make multiple API calls)')

    // Collect questions from multiple API calls
    const allQuestions = []
    const maxAttempts = limit * 2 // Safety limit to avoid infinite loops

    for (let attempt = 0; attempt < maxAttempts && allQuestions.length < limit; attempt++) {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'X-Api-Key': apiKey
        }
      })

      if (!response.ok) {
        const errorText = await response.text()
        console.error('API Error Response:', errorText)
        throw new Error(`API request failed (${response.status}): ${errorText || response.statusText}`)
      }

      const responseData = await response.json()

      if (Array.isArray(responseData) && responseData.length > 0) {
        // Add questions, avoiding duplicates
        responseData.forEach(q => {
          if (!allQuestions.some(existing => existing.question === q.question)) {
            allQuestions.push(q)
          }
        })
      }

      // Add a small delay between requests to be respectful to the API
      if (allQuestions.length < limit) {
        await new Promise(resolve => setTimeout(resolve, 100))
      }
    }

    console.log(`Received ${allQuestions.length} unique questions`)

    if (allQuestions.length === 0) {
      throw new Error('No questions returned from API')
    }

    // Use only the number of questions requested
    const data = allQuestions.slice(0, limit)

    // Transform API Ninjas format to our quiz format
    const transformedQuestions = data.map((q, index) => {
      const correctAnswer = q.answer
      const distractors = generateDistractors(correctAnswer, q.category)

      // Combine all options and shuffle
      const allOptions = [...distractors, correctAnswer]

      // Fisher-Yates shuffle
      for (let i = allOptions.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [allOptions[i], allOptions[j]] = [allOptions[j], allOptions[i]]
      }

      // Find where the correct answer ended up
      const correctIndex = allOptions.indexOf(correctAnswer)
      const options = allOptions

      return {
        id: `ninja_${Date.now()}_${index}`,
        question: q.question,
        options: options,
        correctAnswer: correctIndex,
        difficulty: 'medium',
        category: q.category,
        explanation: `The correct answer is: ${correctAnswer}`
      }
    })

    return {
      success: true,
      questions: transformedQuestions,
      source: 'API Ninjas Trivia'
    }
  } catch (error) {
    console.error('Error fetching from API Ninjas:', error)
    return {
      success: false,
      error: error.message || 'Failed to fetch questions',
      questions: []
    }
  }
}
