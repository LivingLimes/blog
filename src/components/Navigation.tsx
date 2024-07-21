import Link from 'next/link'
import { useRouter } from 'next/router'
import ThemeToggle from './ThemeToggle'
import React from 'react'

const links = [
  {
    to: '/blog',
    name: 'Blog',
  },
  {
    to: '/projects',
    name: 'Projects',
  },
  {
    to: '/connect',
    name: 'Connect',
  },
]

const Navigation = () => {
  const router = useRouter()

  return (
    <>
      <header className="nav-header">
        <div className="nav-container">
          <Link href="/" legacyBehavior>
            <a className={`nav-link logo`}>MT</a>
          </Link>
          <nav aria-label="main navigation">
            <ul className="nav-links">
              {links.map(({ to, name }, index) => (
                <li key={index}>
                  <Link href={to} legacyBehavior>
                    <a
                      className={`nav-link ${router.asPath === to ? 'active' : ''}`}
                    >
                      {name}
                    </a>
                  </Link>
                </li>
              ))}
              <li>
                <ThemeToggle />
              </li>
            </ul>
          </nav>
        </div>
      </header>
      <style jsx>{`
        .nav-header {
          border-bottom: 1px solid var(--bg-secondary);
        }

        .nav-container {
          display: flex;
          justify-content: space-between;
          align-items: center;
          max-width: var(--max-page-width);
          margin: 0 auto;
          padding: 1rem 2rem;
        }

        .nav-links {
          display: flex;
          gap: 1rem;
          align-items: center;
          list-style: none;
          margin: 0;
        }

        .nav-link {
          border-bottom: none;
          color: var(--text-primary);
          padding: 0.5rem;
        }

        .nav-link:hover,
        .nav-link.active {
          border-bottom: 2px solid var(--accent-primary);
        }

        .nav-link.logo {
          font-size: 1.5rem;
          font-weight: bold;
        }

        @media (max-width: var(--media-query)) {
          .nav-container {
            padding: 0.5rem 2rem;
          }
          .nav-links {
            gap: 0.25rem;
          }
          .nav-link {
            padding: 0.25rem;
          }
        }
      `}</style>
    </>
  )
}

export default Navigation
