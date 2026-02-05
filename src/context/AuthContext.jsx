import React, { createContext, useContext, useState, useEffect } from 'react'
import { isFirebaseEnabled } from '../firebase/config'

const AuthContext = createContext()

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [isGuest, setIsGuest] = useState(true)

  useEffect(() => {
    // Check if user was previously logged in
    const savedUser = localStorage.getItem('quizmaster_user')
    if (savedUser) {
      try {
        const userData = JSON.parse(savedUser)
        setUser(userData)
        setIsGuest(userData.isGuest || false)
      } catch (error) {
        console.error('Error loading user data:', error)
      }
    }
    setLoading(false)
  }, [])

  const signInWithGoogle = async () => {
    try {
      // Check if Firebase is available
      if (!isFirebaseEnabled) {
        throw new Error('Firebase not configured. Please set up Firebase or use Guest mode.')
      }

      // Firebase is not installed - show friendly error
      return {
        success: false,
        error: 'Google sign-in requires Firebase setup. Please use Guest mode or follow FIREBASE_SETUP.md'
      }
    } catch (error) {
      console.error('Error signing in with Google:', error)
      return { success: false, error: error.message }
    }
  }

  const signInAsGuest = () => {
    const guestUser = {
      uid: 'guest_' + Date.now(),
      displayName: 'Guest User',
      email: null,
      photoURL: null,
      isGuest: true
    }

    setUser(guestUser)
    setIsGuest(true)
    localStorage.setItem('quizmaster_user', JSON.stringify(guestUser))

    return { success: true, user: guestUser }
  }

  const signOut = () => {
    setUser(null)
    setIsGuest(true)
    localStorage.removeItem('quizmaster_user')

    // Also clear quiz data for guest users
    if (isGuest) {
      localStorage.removeItem('quizmaster_data')
    }
  }

  const value = {
    user,
    loading,
    isGuest,
    signInWithGoogle,
    signInAsGuest,
    signOut,
    isAuthenticated: !!user
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
