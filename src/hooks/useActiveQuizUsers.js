import { useEffect, useState } from 'react'
import { realtimeDb, isFirebaseEnabled } from '../firebase/config'

/**
 * Hook to track active users currently taking quizzes in each category
 * Returns an object with category IDs as keys and user counts as values
 */
export function useActiveQuizUsers() {
  const [activeCounts, setActiveCounts] = useState({})

  useEffect(() => {
    if (!isFirebaseEnabled || !realtimeDb) {
      return
    }

    // Dynamic import to avoid errors when Firebase is not configured
    const setupListeners = async () => {
      try {
        const { ref, onValue } = await import('firebase/database')

        const activeQuizzesRef = ref(realtimeDb, 'activeQuizzes')

        const unsubscribe = onValue(activeQuizzesRef, (snapshot) => {
          const data = snapshot.val()
          const counts = {}

          if (data) {
            // Count active users in each category
            Object.keys(data).forEach(category => {
              const users = data[category]
              if (users && typeof users === 'object') {
                counts[category] = Object.keys(users).length
              }
            })
          }

          setActiveCounts(counts)
        })

        return unsubscribe
      } catch (error) {
        console.error('Error setting up active users listener:', error)
      }
    }

    const unsubscribePromise = setupListeners()

    return () => {
      unsubscribePromise.then(unsubscribe => {
        if (unsubscribe) unsubscribe()
      })
    }
  }, [])

  return activeCounts
}

/**
 * Function to set user as active in a category quiz
 */
export async function setActiveQuiz(userId, category) {
  if (!isFirebaseEnabled || !realtimeDb) {
    return null
  }

  try {
    const { ref, set, onDisconnect } = await import('firebase/database')

    const userQuizRef = ref(realtimeDb, `activeQuizzes/${category}/${userId}`)

    // Set user as active
    await set(userQuizRef, true)

    // Automatically remove when user disconnects
    await onDisconnect(userQuizRef).remove()

    return userQuizRef
  } catch (error) {
    console.error('Error setting active quiz:', error)
    return null
  }
}

/**
 * Function to remove user from active quiz
 */
export async function removeActiveQuiz(userId, category) {
  if (!isFirebaseEnabled || !realtimeDb) {
    return
  }

  try {
    const { ref, remove } = await import('firebase/database')

    const userQuizRef = ref(realtimeDb, `activeQuizzes/${category}/${userId}`)
    await remove(userQuizRef)
  } catch (error) {
    console.error('Error removing active quiz:', error)
  }
}
