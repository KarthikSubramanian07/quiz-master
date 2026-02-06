# QuizMaster 🎓

> A passion project celebrating the joy of learning through interactive quizzes

## The Passion Behind This Project

QuizMaster was born from a deep love for **quizzing, knowledge testing, and continuous learning**. Growing up, I've always been fascinated by the challenge of testing knowledge—whether it's trivia nights with friends, educational quiz apps, or competitive quiz competitions. There's something incredibly satisfying about that moment when you recall a fact you learned months ago, or when you finally understand a concept after reviewing it.

This project represents my belief that **learning should be engaging, motivating, and fun**. QuizMaster isn't just about getting the right answers—it's about the journey of discovery, tracking your progress, and celebrating every milestone. It's designed for anyone who shares this passion for knowledge and self-improvement.

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
  
Note: API keys are pre-configured in the .env file for judging convenience.


```

## License 📄

This project is created for educational purposes as part of a hackathon submission.

---
