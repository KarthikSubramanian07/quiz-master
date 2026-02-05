# QuizMaster 🎓

> A passion project celebrating the joy of learning through interactive quizzes

## The Passion Behind This Project

QuizMaster was born from a deep love for **quizzing, knowledge testing, and continuous learning**. Growing up, I've always been fascinated by the challenge of testing knowledge—whether it's trivia nights with friends, educational quiz apps, or competitive quiz competitions. There's something incredibly satisfying about that moment when you recall a fact you learned months ago, or when you finally understand a concept after reviewing it.

This project represents my belief that **learning should be engaging, motivating, and fun**. QuizMaster isn't just about getting the right answers—it's about the journey of discovery, tracking your progress, and celebrating every milestone. It's designed for anyone who shares this passion for knowledge and self-improvement.

## Features ✨

### 🎯 Core Quiz Experience
- **6 Diverse Categories**: Science & Nature, World History, Technology, Literature & Arts, Geography, and General Knowledge
- **60+ Curated Questions**: Each question comes with detailed explanations to enhance learning
- **Interactive Sessions**: Clean, distraction-free quiz interface with immediate feedback
- **Progress Tracking**: Visual progress bar showing your advancement through each quiz

### 📊 Performance Analytics
- **Comprehensive Stats Dashboard**: Track your overall performance and category-specific statistics
- **Historical Data**: View your recent quiz history with scores and timestamps
- **Category Mastery**: See which subjects you excel at and which need more practice
- **Average Score Tracking**: Monitor your improvement over time

### 🏆 Motivation & Achievements
- **Achievement System**: Unlock badges for milestones like first quiz, perfect scores, and category mastery
- **Performance Messages**: Encouraging feedback based on your quiz results
- **Review Mode**: Learn from mistakes by reviewing incorrect answers with explanations
- **Visual Feedback**: Color-coded results and animated score displays

### 💾 Data Persistence
- **LocalStorage Integration**: All your progress is saved locally—no server required
- **Quiz History**: Automatically tracks your last 50 quiz attempts
- **Category Statistics**: Maintains detailed stats for each quiz category

## Tech Stack 🛠️

- **Frontend Framework**: React 18 with modern hooks
- **Build Tool**: Vite (lightning-fast HMR and optimized builds)
- **Styling**: Tailwind CSS with custom animations
- **Routing**: React Router v6
- **State Management**: React Context API
- **Data Storage**: Browser LocalStorage
- **Languages**: JavaScript (JSX), CSS

## Project Structure 📁

```
quiz-master/
├── public/
│   └── quiz-icon.svg          # App favicon
├── src/
│   ├── components/
│   │   └── Loading.jsx        # Loading spinner component
│   ├── pages/
│   │   ├── Home.jsx           # Category selection page
│   │   ├── QuizSession.jsx    # Quiz taking interface
│   │   ├── Results.jsx        # Results and review page
│   │   └── Stats.jsx          # Performance dashboard
│   ├── data/
│   │   └── quizData.js        # Quiz questions database
│   ├── context/
│   │   └── QuizContext.jsx    # Global state management
│   ├── utils/
│   │   ├── storage.js         # LocalStorage utilities
│   │   └── scoring.js         # Scoring and achievements
│   ├── App.jsx                # Main app component
│   ├── main.jsx               # App entry point
│   └── index.css              # Global styles
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
└── README.md
```

## Getting Started 🚀

### Prerequisites

- **Node.js** (v16 or higher) - [Download here](https://nodejs.org/)
- **npm** (comes with Node.js) or **yarn**
- **Git** (for cloning the repository)

### Installation

1. **Clone or navigate to the project directory**:
   ```bash
   cd C:\Karthik\Code\quiz-master
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm run dev
   ```

4. **Open your browser**:
   - The app will open at `http://localhost:5173`
   - You should see the QuizMaster home page with category selection

### Building for Production

To create an optimized production build:

```bash
npm run build
```

The built files will be in the `dist/` directory. You can preview the production build with:

```bash
npm run preview
```

## How to Use 📖

### Taking a Quiz

1. **Select a Category**: On the home page, click on any category card to start a quiz
2. **Answer Questions**: Click on your chosen answer for each question
3. **Learn from Feedback**: After selecting an answer, you'll see if it's correct along with an explanation
4. **Navigate Through**: Click "Next Question" to proceed, or "See Results" on the last question
5. **Review Performance**: View your score, percentage, and performance rating

### Reviewing Mistakes

1. After completing a quiz, click "Review Incorrect Answers" on the results page
2. See each question you got wrong with:
   - Your selected answer
   - The correct answer
   - A detailed explanation

### Tracking Progress

1. Click "View My Stats" from the home page or "Stats" from any page
2. View your:
   - Total quizzes taken
   - Total questions answered
   - Overall accuracy
   - Performance by category
   - Recent quiz history

### Earning Achievements

Achievements are automatically unlocked when you:
- Complete your first quiz
- Take 10 quizzes
- Score 100% on any quiz
- Achieve 90%+ average in a category (over 5 quizzes)

## Key Features Explained 🔍

### Smart Question Selection
Each quiz randomly selects 10 questions from the chosen category, ensuring variety every time you play.

### Persistent Progress
Your quiz history and statistics are stored in your browser's LocalStorage, so your progress persists across sessions (on the same device and browser).

### Responsive Design
The app works beautifully on desktop, tablet, and mobile devices with a mobile-first design approach.

### Accessibility
- Clean, readable fonts
- High contrast colors
- Clear visual feedback
- Keyboard navigation support

## Development Highlights 💻

### Code Quality
- **Component-Based Architecture**: Reusable React components with clear separation of concerns
- **Context API**: Efficient global state management without prop drilling
- **Custom Hooks**: useQuiz hook for easy access to quiz functionality
- **Utility Functions**: Modular helper functions for scoring, storage, and data manipulation

### Performance
- **Lazy Loading**: React.lazy for code splitting (can be added)
- **Optimized Builds**: Vite's optimized production builds
- **Efficient Re-renders**: React.memo and careful state management
- **Fast Development**: Vite's HMR for instant feedback during development

### Best Practices
- Clear file structure and naming conventions
- Self-documenting code with meaningful variable names
- Consistent code style
- Git commits showing incremental development

## Future Enhancements 🚀

Potential features for future iterations:
- Timed quiz mode with countdown
- Difficulty levels (Easy, Medium, Hard)
- Custom quiz creation
- Social sharing of scores
- Dark mode toggle
- Sound effects toggle
- More quiz categories
- Leaderboard (with backend)
- Quiz streak tracking
- Export quiz history

## Troubleshooting 🔧

### Port Already in Use
If port 5173 is already in use, Vite will automatically try the next available port. Check the terminal output for the actual URL.

### Dependencies Not Installing
Try deleting `node_modules` and `package-lock.json`, then run `npm install` again.

### LocalStorage Data Clearing
Quiz history is stored in your browser. Clearing browser data will reset your progress. To manually clear:
- Open browser dev tools (F12)
- Go to Application > Local Storage
- Delete the `quizmaster_data` key

## Credits 👨‍💻

**Built by**: Karthik Subramanian
**For**: Cal Hacks SP26
**Date**: February 2026

## License 📄

This project is created for educational purposes as part of a hackathon submission.

---

**Made with ❤️ and a passion for learning**

*"The beautiful thing about learning is that no one can take it away from you."*
