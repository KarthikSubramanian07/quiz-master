# QuizMaster - Setup Guide for Judges

This guide will help you get QuizMaster running on your local machine in less than 5 minutes.

## Quick Start (3 Steps)

### Step 1: Prerequisites
Make sure you have Node.js installed:
```bash
node --version
```
If you see a version number (v16 or higher), you're good to go!
If not, download Node.js from: https://nodejs.org/

### Step 2: Install Dependencies
Navigate to the project directory and install dependencies:
```bash
cd C:\Karthik\Code\quiz-master
npm install
```
This will take 1-2 minutes.

### Step 3: Run the App
Start the development server:
```bash
npm run dev
```

The app will open at `http://localhost:5173` (or the next available port).

**That's it!** 🎉 You should now see the QuizMaster home page.

## What to Test

### 1. Take a Quiz
- Click on any category (e.g., "Science & Nature")
- Answer 10 questions
- See immediate feedback with explanations
- View your results

### 2. Review Mode
- After completing a quiz, click "Review Incorrect Answers"
- See detailed explanations for questions you got wrong

### 3. Check Your Stats
- Click "View My Stats" from the home page
- See overall performance metrics
- View category-specific statistics
- Browse quiz history

### 4. Achievements
- Complete your first quiz to unlock "Getting Started"
- Try to get a perfect score for the "Perfectionist" badge
- Take multiple quizzes to track progress

## Expected Behavior

✅ **Quiz Session**:
- Questions display one at a time
- Progress bar shows completion percentage
- Selected answers are color-coded (green = correct, red = incorrect)
- Explanations appear after answering
- Can't change answer once selected

✅ **Results Page**:
- Shows score percentage with animated circle
- Displays performance message
- Achievement popup (if any unlocked)
- Review mode for incorrect answers

✅ **Stats Dashboard**:
- Overall statistics (total quizzes, questions, average)
- Category performance bars
- Recent quiz history with timestamps

✅ **Data Persistence**:
- Your progress saves automatically in browser LocalStorage
- Close and reopen the browser—stats remain
- Clear browser data to reset (if needed)

## Troubleshooting

### Issue: "npm: command not found"
**Solution**: Install Node.js from https://nodejs.org/

### Issue: "Port 5173 already in use"
**Solution**: Vite will automatically use the next available port. Check the terminal output for the actual URL.

### Issue: No quiz data showing
**Solution**: Make sure all dependencies installed correctly. Try:
```bash
rm -rf node_modules package-lock.json
npm install
npm run dev
```

### Issue: Stats not persisting
**Solution**: Make sure you're using the same browser and haven't cleared LocalStorage. Check browser console (F12) for any errors.

## Project Highlights for Judges

### 🎯 Technical Features
- **React 18** with modern hooks and Context API
- **Vite** for blazing-fast development
- **Tailwind CSS** for responsive, utility-first styling
- **React Router** for seamless page navigation
- **LocalStorage** for client-side data persistence

### 📝 Code Quality
- Component-based architecture
- Clear separation of concerns (pages, components, utils, context)
- Self-documenting code with meaningful names
- Consistent code style throughout

### 🎨 UX/UI Design
- Clean, modern interface
- Smooth animations and transitions
- Responsive design (works on mobile, tablet, desktop)
- Intuitive navigation
- Visual feedback for all actions

### 📊 Features
- 60+ original quiz questions across 6 categories
- Real-time score tracking
- Achievement system
- Detailed explanations for learning
- Progress analytics
- Review mode for mistakes

## Git Commit History

To view the development progression:
```bash
git log --oneline
```

You'll see 9+ commits showing incremental feature development:
1. Initial setup
2. Routing configuration
3. Quiz data creation
4. State management
5. Quiz session implementation
6. Results page
7. Stats dashboard
8. UI polish
9. Documentation

## Questions?

If you have any questions or encounter issues, please feel free to reach out!

**Built with ❤️ by Karthik Subramanian for Cal Hacks SP26**
