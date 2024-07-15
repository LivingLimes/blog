import useTheme from '../utils/hooks/useTheme'

const ThemeToggle: React.FC = () => {
  const { isDarkMode, toggleTheme } = useTheme()
  return (
    <button
      onClick={toggleTheme}
      className="theme-toggle"
      aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {isDarkMode ? '☀️' : '🌙'}
      <style jsx>{`
        .theme-toggle {
          background: none;
          border: none;
          cursor: pointer;
          margin: 0.5rem 0 0.5rem 0.5rem;
          font-size: 1.5rem;
          border-radius: var(--border-radius-round);
          transition: background-color 0.3s ease;
        }
        .theme-toggle:hover {
          background-color: var(--accent-primary);
        }

        @media (max-width: 640px) {
          .theme-toggle {
            margin: 0.25rem 0 0.25rem 0.25rem;
          }
        }
      `}</style>
    </button>
  )
}

export default ThemeToggle
