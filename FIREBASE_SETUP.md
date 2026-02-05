# Firebase Setup Guide (Optional)

Google Authentication is **optional**. The app works perfectly in Guest Mode without any Firebase configuration. Follow this guide only if you want to enable Google sign-in with cloud sync.

## Why Add Firebase?

- **Cloud Sync**: Save your quiz history across multiple devices
- **Google Login**: Sign in with your Google account
- **Persistent Data**: Your progress is stored in the cloud, not just locally

## Setup Steps

### 1. Create a Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Add project" or "Create a project"
3. Enter project name (e.g., "QuizMaster")
4. Follow the setup wizard (you can disable Google Analytics if you want)

### 2. Enable Google Authentication

1. In your Firebase project, go to **Build > Authentication**
2. Click "Get started"
3. Go to **Sign-in method** tab
4. Click on **Google** provider
5. Toggle **Enable** switch
6. Add your email as a test user if needed
7. Click **Save**

### 3. Register Your Web App

1. In Firebase Console, go to **Project Overview**
2. Click the **Web icon (</>)** to add a web app
3. Give your app a nickname (e.g., "QuizMaster Web")
4. Click **Register app**
5. Copy the `firebaseConfig` object shown

### 4. Update Configuration

1. Open `src/firebase/config.js` in your project
2. Replace the placeholder config with your actual Firebase config:

```javascript
const firebaseConfig = {
  apiKey: "YOUR_ACTUAL_API_KEY",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abc123def456"
}
```

### 5. Install Firebase (if not already installed)

```bash
npm install firebase
```

### 6. Test It Out

1. Restart your development server: `npm run dev`
2. Open the app in your browser
3. You should now see the "Continue with Google" button enabled
4. Click it and sign in with your Google account

## Firestore Database (Optional Cloud Sync)

If you want to sync quiz data to the cloud:

1. In Firebase Console, go to **Build > Firestore Database**
2. Click **Create database**
3. Choose **Start in test mode** (for development)
4. Select a location close to your users
5. Click **Enable**

The app will automatically start syncing quiz history to Firestore when users are logged in with Google.

## Security Rules (Production)

For production, update Firestore security rules:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId}/{document=**} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

## Troubleshooting

### "Continue with Google" button is disabled
- Make sure you updated the Firebase config in `src/firebase/config.js`
- Verify Firebase is installed: `npm list firebase`
- Check browser console for errors

### Sign-in popup blocked
- Allow popups in your browser for localhost
- Or use redirect mode instead of popup (see Firebase docs)

### "Firebase not configured" message
- You haven't updated the config file yet
- Guest mode will work fine without configuration

## Guest Mode vs. Google Login

| Feature | Guest Mode | Google Login |
|---------|-----------|--------------|
| Quiz taking | ✅ | ✅ |
| Local progress saving | ✅ | ✅ |
| Cross-device sync | ❌ | ✅ (with Firestore) |
| No setup required | ✅ | ❌ |
| Data persistence | Browser only | Cloud |

---

**Need Help?** Check the [Firebase Documentation](https://firebase.google.com/docs/auth/web/google-signin) for more details.
