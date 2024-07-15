import React, { useState, useEffect, ReactNode } from 'react'
import ThemeContext from './ThemeContext'

const storage = {
  getItem: (key) => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem(key)
    }
    return null
  },
  setItem: (key, value) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(key, value)
    }
  },
  // ... other methods
}

const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    const saved = storage.getItem('darkMode')
    return saved !== null
      ? JSON.parse(saved)
      : typeof window !== 'undefined'
        ? window.matchMedia('(prefers-color-scheme: dark)').matches
        : false
  })

  useEffect(() => {
    storage.setItem('darkMode', JSON.stringify(isDarkMode))
    document.body.classList.toggle('dark-mode', isDarkMode)
  }, [isDarkMode])

  const toggleTheme = () => setIsDarkMode((prev) => !prev)

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

interface ThemeProviderProps {
  children: ReactNode
}

export default ThemeProvider
