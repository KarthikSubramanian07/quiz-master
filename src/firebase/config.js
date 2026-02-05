// Firebase configuration (OPTIONAL)
// To enable Firebase:
// 1. Run: npm install firebase
// 2. Create a Firebase project at https://console.firebase.google.com/
// 3. Enable Google Authentication in Firebase Console
// 4. Uncomment and update the config below with your project's config

// const firebaseConfig = {
//   apiKey: "YOUR_API_KEY",
//   authDomain: "YOUR_AUTH_DOMAIN",
//   projectId: "YOUR_PROJECT_ID",
//   storageBucket: "YOUR_STORAGE_BUCKET",
//   messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
//   appId: "YOUR_APP_ID"
// }

// Initialize as null by default (guest mode)
let auth = null
let db = null
let googleProvider = null

// Firebase is optional - app works without it
export { auth, db, googleProvider }
export const isFirebaseEnabled = false

// Note: To enable Firebase, install the package and update the config above
// The app will work perfectly in guest mode without Firebase!
