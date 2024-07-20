import React from 'react'
import useTheme from '../utils/hooks/useTheme'
import Navigation from './Navigation'

const Layout = ({ children }) => {
  const { isDarkMode } = useTheme()

  return (
    <>
      <div className={`${isDarkMode ? 'dark-mode' : ''}`}>
        <Navigation />

        <main>{children}</main>
      </div>
    </>
  )
}

export default Layout
