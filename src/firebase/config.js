// Firebase configuration
// To enable Firebase:
// 1. Create a Firebase project at https://console.firebase.google.com/
// 2. Enable Google Authentication in Firebase Console
// 3. Replace the config below with your project's config
// 4. Run: npm install firebase

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
}

// Only initialize if Firebase is configured
let app = null
let auth = null
let db = null
let googleProvider = null

try {
  // Check if firebase is installed
  const { initializeApp } = require('firebase/app')
  const { getAuth, GoogleAuthProvider } = require('firebase/auth')
  const { getFirestore } = require('firebase/firestore')

  // Only initialize if not using default config
  if (firebaseConfig.apiKey !== "YOUR_API_KEY") {
    app = initializeApp(firebaseConfig)
    auth = getAuth(app)
    db = getFirestore(app)
    googleProvider = new GoogleAuthProvider()
  }
} catch (error) {
  console.log('Firebase not configured. Running in guest-only mode.')
}

export { auth, db, googleProvider }
export const isFirebaseEnabled = !!auth
