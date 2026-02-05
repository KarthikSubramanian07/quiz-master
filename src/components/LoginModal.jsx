import React, { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { isFirebaseEnabled } from '../firebase/config'

function LoginModal({ isOpen, onClose }) {
  const { signInWithGoogle, signInAsGuest } = useAuth()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  if (!isOpen) return null

  const handleGoogleSignIn = async () => {
    setLoading(true)
    setError(null)

    const result = await signInWithGoogle()

    if (result.success) {
      onClose()
    } else {
      setError(result.error || 'Failed to sign in with Google')
    }

    setLoading(false)
  }

  const handleGuestSignIn = () => {
    signInAsGuest()
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 backdrop-blur-md flex items-center justify-center z-50 p-4 animate-fade-in">
      <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl p-8 max-w-md w-full shadow-2xl animate-slide-up border border-purple-500/30">
        <div className="text-center mb-8">
          <img
            src="/logo2.png"
            alt="QuizMaster Logo"
            className="h-20 w-auto mx-auto mb-4 drop-shadow-2xl"
          />
          <h2 className="text-3xl font-bold text-white mb-2">Welcome to QuizMaster</h2>
          <p className="text-gray-300">Sign in to save your progress across devices</p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
            {error}
          </div>
        )}

        <div className="space-y-3">
          {isFirebaseEnabled && (
            <button
              onClick={handleGoogleSignIn}
              disabled={loading}
              className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-white border-2 border-gray-300 hover:border-blue-500 hover:bg-blue-50 rounded-xl font-semibold text-gray-700 transition-all duration-200 shadow-sm hover:shadow-md disabled:opacity-50"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              {loading ? 'Signing in...' : 'Continue with Google'}
            </button>
          )}

          {!isFirebaseEnabled && (
            <div className="p-4 bg-blue-50 border border-blue-200 rounded-xl text-sm text-blue-700">
              <p className="font-semibold mb-1">⚠️ Firebase not configured</p>
              <p>Google sign-in requires Firebase setup. Continue as guest to use the app.</p>
            </div>
          )}

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-600"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-slate-800 text-gray-400">or</span>
            </div>
          </div>

          <button
            onClick={handleGuestSignIn}
            className="w-full px-6 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold rounded-xl transition-all duration-200 shadow-xl hover:shadow-2xl hover:shadow-purple-500/50 transform hover:scale-105"
          >
            Continue as Guest
          </button>
        </div>

        <p className="text-center text-sm text-gray-400 mt-6">
          Guest mode uses local storage. Your progress won't sync across devices.
        </p>

        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  )
}

export default LoginModal
