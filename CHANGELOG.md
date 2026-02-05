# Changelog

All notable changes to QuizMaster will be documented in this file.

## [2.0.0] - 2026-02-05

### 🎉 Major Enhancements

#### Authentication System
- **Google OAuth Integration** (Optional)
  - Sign in with Google for cloud-synced progress
  - Requires Firebase setup (see FIREBASE_SETUP.md)
  - Full guest mode support without any configuration
- **Guest Mode**
  - Continue without sign-in using local storage
  - All features work in guest mode
  - User profile display with avatar/initial
  - Sign out functionality

#### Difficulty Levels
- **Three Difficulty Modes + Mixed**
  - 🟢 Easy: Beginner-friendly questions
  - 🟡 Medium: Moderate challenge
  - 🔴 Hard: Expert-level questions
  - 🎯 Mixed: Random difficulty for variety
- **Smart Filtering**
  - Questions filtered by selected difficulty
  - Fallback to mixed mode if insufficient questions
  - Difficulty selector on home page with modern toggle UI

#### Quit Confirmation
- **Prevent Accidental Exits**
  - Warning modal when quitting mid-quiz
  - "Your progress will be lost" message
  - Cancel or confirm options
  - Smooth animations

#### Modern UI Overhaul
- **Glassmorphism Design**
  - Frosted glass effect on cards and modals
  - Backdrop blur for depth
  - Semi-transparent backgrounds
- **Enhanced Visuals**
  - Vibrant gradient backgrounds (blue → purple → pink)
  - Smooth hover animations
  - Card lift effects on hover
  - Icon rotation and scale transforms
  - Shadow depth variations
- **Better Typography**
  - Larger, bolder headings
  - Gradient text effects
  - Improved readability
- **Color Scheme Updates**
  - More vibrant primary colors
  - Softer backgrounds
  - Better contrast ratios
  - Consistent spacing

#### Component Architecture
- **New Components**
  - `ConfirmModal`: Reusable confirmation dialog
  - `DifficultySelector`: Difficulty toggle with icons
  - `LoginModal`: Authentication options modal
- **New Contexts**
  - `AuthContext`: User authentication state
  - Enhanced `QuizContext` with difficulty support
- **Firebase Integration**
  - Optional Firebase configuration
  - Graceful fallback without Firebase

### 🔧 Technical Improvements
- Better state management with React Context
- Improved animations and transitions (300ms duration)
- Enhanced responsiveness for all screen sizes
- Cleaner component structure
- More reusable UI components

### 📝 Documentation
- Added FIREBASE_SETUP.md for Google Auth setup
- Updated README with new features
- Added this CHANGELOG

---

## [1.0.0] - 2026-02-05

### Initial Release

#### Core Features
- **6 Quiz Categories**
  - Science & Nature
  - World History
  - Technology
  - Literature & Arts
  - Geography
  - General Knowledge

- **60+ Curated Questions**
  - Detailed explanations for each answer
  - Multiple choice format
  - Educational content

- **Interactive Quiz Session**
  - 10 questions per quiz
  - Progress bar
  - Immediate feedback
  - Visual answer indicators (✓ / ✗)
  - Explanation display

- **Results & Review**
  - Score percentage with animated circle
  - Performance messages
  - Review incorrect answers mode
  - Detailed answer breakdowns

- **Stats Dashboard**
  - Total quizzes taken
  - Questions answered
  - Correct answers count
  - Average score percentage
  - Category-wise performance
  - Recent quiz history
  - Time tracking

- **Achievement System**
  - First quiz badge
  - 10 quizzes milestone
  - Perfect score achievement
  - Category master badges (90%+ average)

- **Data Persistence**
  - LocalStorage integration
  - Automatic history tracking
  - Last 50 quizzes saved
  - Category statistics

#### Technical Stack
- React 18 with hooks
- Vite build tool
- Tailwind CSS for styling
- React Router for navigation
- LocalStorage for persistence

---

## Future Enhancements

### Planned Features
- [ ] Timed quiz mode with countdown
- [ ] More quiz categories (Music, Sports, Movies, etc.)
- [ ] Custom quiz creation
- [ ] Social sharing of scores
- [ ] Dark mode toggle
- [ ] Sound effects with toggle
- [ ] Leaderboards (requires backend)
- [ ] Quiz streaks tracking
- [ ] Export quiz history as PDF
- [ ] More difficulty levels
- [ ] Question bookmarking
- [ ] Study mode with flashcards

### In Consideration
- Mobile app versions
- Multiplayer quiz battles
- Community-contributed questions
- Quiz challenges system
- Progress charts and graphs

---

**Note**: Version numbers follow [Semantic Versioning](https://semver.org/)
