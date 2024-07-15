import React from 'react'
import ThemeProvider from '@/utils/contexts/ThemeProvider'

export default function App({ Component, pageProps }) {
  return (
    <>
      <ThemeProvider>
        <Component {...pageProps} />
      </ThemeProvider>
      <GlobalStyles />
    </>
  )
}

const GlobalStyles = () => (
  <style jsx global>{`
    :root {
      --light-mauve: #7025bb;
      --white: #f6f7f8;
      --black: #000;
      --light-black: #333;
      --light-grey: #4f4f4f;
      --page-width: 800px;

      --font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      --box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1),
        0 4px 8px 0 rgba(0, 0, 0, 0.1), 0 8px 16px 0 rgba(0, 0, 0, 0.1);

      --border-radius-4: 4px;
      --border-radius-8: 8px;
      --border-radius-round: 50%;

      --bg-primary: var(--white);
      --bg-secondary: #f0f0f0;
      --text-primary: var(--light-black);
      --text-secondary: var(--light-grey);
      --accent-primary: var(--light-mauve);
      --accent-secondary: var(--accent-primary);
      --nav-text: var(--white);
      --transition-speed: 0.3s;
    }

    body {
      margin: 0;
      padding: 0;
      font-family: var(--font-family);
      background-color: var(--bg-primary);
      color: var(--text-secondary);
      transition:
        background-color var(--transition-speed) ease,
        color var(--transition-speed) ease;
    }

    body.dark-mode {
      --bg-primary: #121212;
      --bg-secondary: #1e1e1e;
      --text-primary: #fffafa;
      --text-secondary: #e0e0e0;
      --accent-primary: #d4b5ff;
      --accent-secondary: #b388ff;
      --nav-text: #ffffff;

      --box-shadow: 0 2px 4px 0 rgba(255, 255, 255, 0.05),
        0 4px 8px 0 rgba(255, 255, 255, 0.05),
        0 8px 16px 0 rgba(255, 255, 255, 0.05);
    }

    main {
      margin: 0 auto;
      color: var(--text-secondary);
      max-width: var(--page-width);
      padding: 0 2rem 2rem 2rem;
    }

    h1 {
      font-size: 2rem;
      margin-bottom: 1rem;
      padding-bottom: 0.5rem;
      color: var(--text-primary);
      border-bottom: 3px solid var(--accent-primary);
    }

    h2,
    h3,
    h4,
    h5,
    h6 {
      color: var(--text-secondary);
    }

    h2 {
      font-size: 1.5em;
      margin: 1.5rem 0 0.5rem 0;
    }

    h3 {
      font-size: 1.25em;
      margin: 1rem 0 0.25rem 0;
    }

    p,
    li {
      margin-bottom: 0.25rem;
      line-height: 1.6;
    }

    ul {
      list-style-type: disc;
      padding-left: 1.25rem;
      margin-bottom: 1rem;
    }

    a {
      color: var(--accent-secondary);
      text-decoration: none;
      font-size: 1rem;
      border-bottom: 1px solid var(--accent-primary);
    }

    a:hover {
      border-bottom-color: var(--accent-secondary);
    }

    textarea {
      flex-grow: 1;
      min-height: 44px;
      padding: 10px 12px;
      font-size: 16px;
      line-height: 1.5;
      border: 1px solid var(--text-secondary);
      font-family: var(--font-family);
      border-radius: var(--border-radius-4);
      resize: none;
      overflow: hidden;
      transition:
        border-color 0.2s,
        box-shadow 0.2s;
      background-color: var(--bg-secondary);
      color: var(--text-secondary);
    }
    textarea:focus {
      outline: none;
      border-color: var(--accent-secondary);
      box-shadow: 0 0 0 2px rgba(138, 75, 175, 0.2);
    }
    textarea:disabled {
      background-color: var(--bg-primary);
      color: var(--text-secondary);
    }
  `}</style>
)
