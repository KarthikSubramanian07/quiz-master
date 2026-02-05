// Firebase configuration (OPTIONAL)
// Firebase package is already installed ✅
//
// To enable Google Sign-in:
// 1. Create a Firebase project at https://console.firebase.google.com/
// 2. Enable Google Authentication in Firebase Console
// 3. Get your config from Project Settings > General > Your apps
// 4. Replace the firebaseConfig below with your actual values

import { initializeApp } from 'firebase/app'
import { getAuth, GoogleAuthProvider } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'



const firebaseConfig = {
  apiKey: "AIzaSyCLwDxlDJc494KAozBxxkKt3_50ZqgGiF0",
  authDomain: "quiz-master-6db19.firebaseapp.com",
  projectId: "quiz-master-6db19",
  storageBucket: "quiz-master-6db19.firebasestorage.app",
  messagingSenderId: "764008232044",
  appId: "1:764008232044:web:2eacb954957d251e421449",
  measurementId: "G-DP9C6BQPSY"
};

// Initialize Firebase variables
let auth = null
let db = null
let googleProvider = null
let isFirebaseEnabled = false

// Only initialize if user has set up their Firebase project
if (firebaseConfig.apiKey !== "YOUR_API_KEY") {
  try {
    const app = initializeApp(firebaseConfig)
    auth = getAuth(app)
    db = getFirestore(app)
    googleProvider = new GoogleAuthProvider()
    isFirebaseEnabled = true
    console.log('✅ Firebase initialized successfully - Google sign-in enabled')
  } catch (error) {
    console.error('⚠️ Firebase initialization failed:', error.message)
    console.log('📝 Check your Firebase configuration in src/firebase/config.js')
  }
} else {
  console.log('ℹ️ Firebase not configured - running in Guest mode only')
  console.log('📝 To enable Google sign-in, update src/firebase/config.js')
  console.log('📖 See FIREBASE_SETUP.md for instructions')
}

export { auth, db, googleProvider, isFirebaseEnabled }
