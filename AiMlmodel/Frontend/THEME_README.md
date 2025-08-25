# 🌙 Dark Mode Theme System

This project now includes a comprehensive, modular dark mode theme system with separate components and hooks.

## 📁 File Structure

```
src/
├── components/
│   ├── ThemeToggle.jsx          # Main theme toggle component
│   ├── ThemeProvider.jsx        # Context provider for theme management
│   └── Header.jsx               # Updated to use ThemeToggle
├── hooks/
│   └── useTheme.js              # Custom hook for theme logic
└── App.jsx                      # Updated to use useTheme hook
```

## 🚀 Quick Start

### Basic Usage (Current Implementation)

```jsx
import useTheme from './hooks/useTheme'

function App() {
  const { isDarkMode, toggleTheme } = useTheme()
  
  return (
    <div className="bg-white dark:bg-gray-900">
      <Header isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
      {/* Your app content */}
    </div>
  )
}
```

### Advanced Usage with Context

```jsx
import { ThemeProvider, ThemeToggleWithContext } from './components/ThemeProvider'

function App() {
  return (
    <ThemeProvider>
      <div className="bg-white dark:bg-gray-900">
        <Header>
          <ThemeToggleWithContext />
        </Header>
        {/* Your app content */}
      </div>
    </ThemeProvider>
  )
}
```

## 🧩 Components

### 1. ThemeToggle Component

**Props:**
- `isDarkMode` (boolean): Current theme state
- `toggleTheme` (function): Function to toggle theme

**Features:**
- Animated sun/moon icons
- Theme state indicator
- Debug button (development only)
- Hover effects and focus states
- Accessibility features

```jsx
import ThemeToggle from './components/ThemeToggle'

<ThemeToggle isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
```

### 2. ThemeProvider Component

**Context-based theme management:**
- Provides theme state to child components
- Automatic theme initialization
- Persistent theme storage

```jsx
import { ThemeProvider, useThemeContext } from './components/ThemeProvider'

function MyComponent() {
  const { isDarkMode, toggleTheme } = useThemeContext()
  // Use theme state and functions
}
```

## 🪝 Custom Hooks

### useTheme Hook

**Returns:**
- `isDarkMode` (boolean): Current theme state
- `isInitialized` (boolean): Whether theme has been initialized
- `toggleTheme` (function): Toggle between light/dark
- `setTheme` (function): Set specific theme ('light' or 'dark')
- `getThemeInfo` (function): Get detailed theme information

**Example:**
```jsx
import useTheme from './hooks/useTheme'

function MyComponent() {
  const { isDarkMode, toggleTheme, setTheme, getThemeInfo } = useTheme()
  
  const handleLightMode = () => setTheme('light')
  const handleDarkMode = () => setTheme('dark')
  
  console.log(getThemeInfo()) // Debug information
}
```

## 🎨 Styling

### Tailwind CSS Classes

The theme system uses Tailwind's `dark:` prefix for dark mode styles:

```jsx
<div className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white">
  Content with theme-aware styling
</div>
```

### CSS Variables (Optional)

You can also use CSS custom properties for more complex theming:

```css
:root {
  --bg-primary: #ffffff;
  --text-primary: #1f2937;
}

.dark {
  --bg-primary: #1f2937;
  --text-primary: #f9fafb;
}
```

## 🔧 Configuration

### Tailwind Config

Ensure your `tailwind.config.js` has dark mode enabled:

```js
module.exports = {
  darkMode: 'class', // Enable class-based dark mode
  // ... other config
}
```

### Environment Variables

Debug features are automatically enabled in development:

```js
// Debug button only shows in development
{process.env.NODE_ENV === 'development' && <DebugButton />}
```

## 📱 Features

### Automatic Detection
- **System Preference**: Detects OS theme preference
- **Local Storage**: Remembers user's choice
- **Fallback**: Graceful fallback to light theme

### Smooth Transitions
- **Duration**: 300ms smooth color transitions
- **All Elements**: Consistent animation timing
- **Performance**: Optimized for smooth UX

### Accessibility
- **ARIA Labels**: Proper screen reader support
- **Focus States**: Clear focus indicators
- **Keyboard Navigation**: Full keyboard support

## 🐛 Debugging

### Console Logs

The theme system provides detailed console logging:

```
🔄 Toggling theme from Light to Dark
✅ Theme toggle successful
🎯 Theme set to: dark
```

### Debug Button

In development mode, a debug button shows:
- Current React state
- DOM class status
- Local storage value
- System preference

### Theme Info

Use `getThemeInfo()` for detailed debugging:

```jsx
const themeInfo = getThemeInfo()
console.log(themeInfo)
// {
//   isDarkMode: true,
//   isInitialized: true,
//   savedTheme: 'dark',
//   systemPrefersDark: false,
//   domHasDarkClass: true
// }
```

## 🔄 Migration Guide

### From Old Implementation

1. **Replace theme state:**
   ```jsx
   // Old
   const [isDarkMode, setIsDarkMode] = useState(false)
   
   // New
   const { isDarkMode, toggleTheme } = useTheme()
   ```

2. **Update imports:**
   ```jsx
   import useTheme from './hooks/useTheme'
   ```

3. **Remove old useEffect hooks:**
   - Remove theme initialization useEffect
   - Remove theme monitoring useEffect
   - Remove manual toggle function

### Benefits of New System

- **Modular**: Separate concerns into components
- **Reusable**: Use theme toggle anywhere in the app
- **Maintainable**: Centralized theme logic
- **Testable**: Easy to unit test individual components
- **Scalable**: Easy to add new theme features

## 🚀 Future Enhancements

### Planned Features
- **Theme Presets**: Multiple color schemes
- **Auto-switch**: Time-based theme switching
- **Animation Options**: Customizable transition effects
- **Theme Export/Import**: Share theme preferences

### Customization
- **Color Schemes**: Easy to add new themes
- **Component Variants**: Different toggle button styles
- **Animation Timing**: Adjustable transition durations

## 📝 Best Practices

1. **Always use the hook**: Don't manage theme state manually
2. **Consistent naming**: Use `isDarkMode` and `toggleTheme` consistently
3. **Accessibility first**: Include proper ARIA labels and focus states
4. **Performance**: Use CSS transitions instead of JavaScript animations
5. **Testing**: Test both light and dark themes in your components

## 🤝 Contributing

When adding new theme-related features:

1. **Update this README** with new information
2. **Add TypeScript types** if applicable
3. **Include examples** in the documentation
4. **Test both themes** thoroughly
5. **Follow existing patterns** for consistency
