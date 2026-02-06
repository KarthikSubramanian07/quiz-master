import React, { createContext, useContext, useState, useEffect } from 'react'
import { auth, googleProvider, isFirebaseEnabled } from '../firebase/config'

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
    // Listen to Firebase auth state changes
    if (isFirebaseEnabled && auth) {
      const unsubscribe = auth.onAuthStateChanged(async (firebaseUser) => {
        if (firebaseUser) {
          // User is signed in with Google
          const userData = {
            uid: firebaseUser.uid,
            email: firebaseUser.email,
            displayName: firebaseUser.displayName,
            photoURL: firebaseUser.photoURL,
            isGuest: false
          }
          setUser(userData)
          setIsGuest(false)
          localStorage.setItem('quizmaster_user', JSON.stringify(userData))
        } else {
          // User is signed out - check for guest mode or create guest
          const savedUser = localStorage.getItem('quizmaster_user')
          if (savedUser) {
            try {
              const userData = JSON.parse(savedUser)
              if (userData.isGuest) {
                setUser(userData)
                setIsGuest(true)
              } else {
                // Previous user was Google user, create new guest
                createDefaultGuest()
              }
            } catch (error) {
              console.error('Error loading user data:', error)
              createDefaultGuest()
            }
          } else {
            // No saved user, create guest by default
            createDefaultGuest()
          }
        }
        setLoading(false)
      })

      return () => unsubscribe()
    } else {
      // Firebase not enabled - check localStorage or create guest
      const savedUser = localStorage.getItem('quizmaster_user')
      if (savedUser) {
        try {
          const userData = JSON.parse(savedUser)
          setUser(userData)
          setIsGuest(userData.isGuest !== false)
        } catch (error) {
          console.error('Error loading user data:', error)
          createDefaultGuest()
        }
      } else {
        // No saved user, create guest by default
        createDefaultGuest()
      }
      setLoading(false)
    }
  }, [])

  const createDefaultGuest = () => {
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
  }

  const signInWithGoogle = async () => {
    try {
      // Check if Firebase is configured
      if (!isFirebaseEnabled) {
        throw new Error('Firebase not configured. Please set up Firebase or use Guest mode.')
      }

      // Import signInWithPopup dynamically to avoid errors if Firebase not configured
      const { signInWithPopup } = await import('firebase/auth')

      // Sign in with Google popup
      const result = await signInWithPopup(auth, googleProvider)

      const userData = {
        uid: result.user.uid,
        email: result.user.email,
        displayName: result.user.displayName,
        photoURL: result.user.photoURL,
        isGuest: false
      }

      setUser(userData)
      setIsGuest(false)
      localStorage.setItem('quizmaster_user', JSON.stringify(userData))

      return { success: true, user: userData }
    } catch (error) {
      console.error('Error signing in with Google:', error)
      return {
        success: false,
        error: error.message || 'Google sign-in requires Firebase setup. Please use Guest mode or follow FIREBASE_SETUP.md'
      }
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

  const signOut = async () => {
    try {
      // Sign out from Firebase if user is logged in with Google
      if (isFirebaseEnabled && auth && !isGuest) {
        const { signOut: firebaseSignOut } = await import('firebase/auth')
        await firebaseSignOut(auth)
      }
    } catch (error) {
      console.error('Error signing out:', error)
    }

    // After signing out, create a new guest user
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
