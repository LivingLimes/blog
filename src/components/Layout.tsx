import React from 'react'
import useTheme from '../utils/hooks/useTheme'
import Navigation from './Navigation'

const Layout = ({ children }) => {
  const { isDarkMode } = useTheme()

  return (
    <>
      <div className={`layout ${isDarkMode ? 'dark-mode' : ''}`}>
        <Navigation />

        <main className="page">{children}</main>
      </div>
      <style jsx>{`
        .layout {
          min-height: 100vh;
        }
      `}</style>
    </>
  )
}

export default Layout
