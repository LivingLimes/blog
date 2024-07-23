import { Analytics } from '@vercel/analytics/react'
import React from 'react'
import ThemeProvider from '@/utils/contexts/ThemeProvider'

export default function App({ Component, pageProps }) {
  return (
    <>
      <ThemeProvider>
        <Component {...pageProps} />
        <Analytics />
      </ThemeProvider>
      <GlobalStyles />
    </>
  )
}

const GlobalStyles = () => (
  <style jsx global>{`
    :root {
      --media-query: 640px;
      --max-page-width: 800px;
      --font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;

      --border-radius-4: 4px;
      --border-radius-8: 8px;
      --border-radius-round: 50%;

      --white: #f3f3f3;
      --white-2: #e2e2e2;
      --light-grey: #4f4f4f;
      --light-black: #333;
      --black: #000;
      --light-mauve: #7025bb;

      --project-link: var(--white);

      --btn-grey: #e0e0e0;

      --border-grey: #d4d4d4;

      --bg-primary: var(--white);
      --bg-secondary: var(--white-2);
      --text-primary: var(--light-black);
      --text-secondary: var(--light-grey);
      --accent-primary: var(--light-mauve);

      --btn-text-regular: var(--text-primary);
      --btn-text-inverted: var(--white-2);
    }

    body {
      margin: 0;
      padding: 0;
      font-family: var(--font-family);
      background-color: var(--bg-primary);
      color: var(--text-secondary);
    }

    body.dark-mode {
      --bg-primary: #121212;
      --bg-secondary: #1e1e1e;
      --text-primary: #fffafa;
      --text-secondary: #e0e0e0;
      --accent-primary: #b388ff;

      --btn-grey: #323232;
      --project-link: var(--bg-primary);

      --btn-text-regular: var(--text-primary);
      --btn-text-inverted: var(--bg-secondary);
    }

    main {
      margin: 0 auto;
      color: var(--text-secondary);
      max-width: var(--max-page-width);
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
      margin: 1.5rem 0 1rem 0;
    }

    h3 {
      font-size: 1.25em;
      margin: 1rem 0 0.25rem 0;
    }

    p,
    li {
      margin-bottom: 0.25rem;
      line-height: 1.6;
      color: var(--text-secondary);
    }

    ul {
      list-style-type: disc;
      padding-left: 1.25rem;
      margin-bottom: 1rem;
    }

    a {
      color: var(--accent-primary);
      text-decoration: none;
      font-size: 1rem;
      border-bottom: 1px solid var(--accent-primary);
    }

    a:hover {
      border-bottom-color: var(--accent-primary);
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
      color: var(--text-secondary);
      background: var(--bg-primary);
    }
    textarea:disabled {
      color: var(--text-secondary);
    }
  `}</style>
)
