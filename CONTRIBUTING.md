# Contributing to QuizMaster

Thank you for your interest in contributing to QuizMaster! This document provides guidelines for contributing to the project.

## How to Contribute

### Adding New Questions

To add questions to a category:

1. Open `src/data/quizData.js`
2. Find the category array (e.g., `science`, `history`, etc.)
3. Add your question following this format:

```javascript
{
  id: 'cat_##',  // Unique ID (cat = category abbreviation, ## = number)
  question: 'Your question here?',
  options: ['Option A', 'Option B', 'Option C', 'Option D'],
  correctAnswer: 0,  // Index of correct option (0-3)
  explanation: 'Brief explanation of the answer'
}
```

### Adding New Categories

To add a new quiz category:

1. **Add questions** in `src/data/quizData.js`:
```javascript
export const quizData = {
  // ... existing categories
  newCategory: [
    // Your questions here
  ]
}
```

2. **Update category info** in `src/pages/Home.jsx`:
```javascript
const categories = [
  // ... existing categories
  {
    id: 'newCategory',
    name: 'New Category Name',
    icon: '🎨',  // Choose an emoji
    description: 'Description of this category',
    color: 'from-color-400 to-color-600'  // Tailwind gradient
  }
]
```

3. **Update categoryInfo** in both `src/pages/QuizSession.jsx` and `src/pages/Stats.jsx`

### Modifying Achievements

Edit achievement logic in `src/utils/scoring.js` in the `checkAchievements` function:

```javascript
// Add your achievement check
if (yourCondition) {
  achievements.push({
    id: 'unique_id',
    title: 'Achievement Title',
    description: 'What the user achieved',
    icon: '🏆'
  })
}
```

### Styling Changes

This project uses Tailwind CSS. Common patterns:

- **Buttons**: Use `btn-primary` or `btn-secondary` classes
- **Cards**: Use the `card` class
- **Colors**: Primary colors use the `primary-xxx` scale
- **Animations**: Custom animations in `tailwind.config.js`

## Development Workflow

1. **Fork the repository** (if applicable)
2. **Create a feature branch**:
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. **Make your changes**
4. **Test thoroughly**:
   ```bash
   npm run dev
   ```
5. **Commit with clear messages**:
   ```bash
   git commit -m "Add: Brief description of changes"
   ```
6. **Push to your branch**:
   ```bash
   git push origin feature/your-feature-name
   ```

## Code Style Guidelines

### JavaScript/React
- Use functional components with hooks
- Use arrow functions for components
- Keep components small and focused
- Use meaningful variable and function names
- Add comments for complex logic only

### File Organization
- **Pages**: Top-level route components
- **Components**: Reusable UI components
- **Utils**: Helper functions
- **Context**: Global state management
- **Data**: Static data and configuration

### Naming Conventions
- **Files**: PascalCase for components (e.g., `QuizSession.jsx`)
- **Functions**: camelCase (e.g., `calculateScore`)
- **Constants**: UPPER_SNAKE_CASE (e.g., `STORAGE_KEY`)
- **Components**: PascalCase (e.g., `<QuizSession />`)

## Testing Your Changes

Before submitting:

1. ✅ Test all quiz categories
2. ✅ Verify stats tracking works
3. ✅ Check achievements trigger correctly
4. ✅ Test on mobile/tablet (responsive design)
5. ✅ Verify LocalStorage persistence
6. ✅ Check for console errors (F12)
7. ✅ Test navigation between pages

## Commit Message Format

Use clear, descriptive commit messages:

- `Add: New feature or file`
- `Update: Modify existing feature`
- `Fix: Bug fix`
- `Refactor: Code restructuring`
- `Style: UI/CSS changes`
- `Docs: Documentation updates`

Examples:
```
Add: Science quiz questions about astronomy
Fix: Stats page not showing correct average
Update: Improve question explanation clarity
Style: Enhance button hover animations
```

## Questions or Ideas?

Feel free to open an issue to:
- Report bugs
- Suggest features
- Ask questions
- Discuss improvements

## License

By contributing, you agree that your contributions will be licensed under the same terms as the project.

---

**Happy Contributing! 🚀**
