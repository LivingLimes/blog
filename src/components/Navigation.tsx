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
      <nav className="nav-container">
        <div className="nav-content">
          <Link href="/" legacyBehavior>
            <a className={`nav-link logo`}>MT</a>
          </Link>
          <div className="nav-links">
            {links.map(({ to, name }, index) => (
              <Link key={index} href={to} legacyBehavior>
                <a
                  className={`nav-link ${router.pathname === to ? 'active' : ''}`}
                >
                  {name}
                </a>
              </Link>
            ))}
            <ThemeToggle />
          </div>
        </div>
      </nav>
      <style jsx>{`
        .nav-container {
          border-bottom: 1px solid var(--bg-secondary);
          width: 100%;
        }

        .nav-content {
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          align-items: center;
          max-width: var(--page-width);
          margin: 0 auto;
          padding: 1rem 2rem;
        }

        .nav-link.logo {
          font-size: 1.5rem;
          font-weight: bold;
        }

        .nav-links {
          display: flex;
          gap: 1rem;
          align-items: center;
        }

        .nav-link {
          border-bottom: none;
          color: var(--text-primary);
          padding: 0.5rem;
          transition: border-color 0.3s ease;
        }

        .nav-link:hover,
        .nav-link.active {
          border-bottom: 2px solid var(--accent-primary);
        }

        @media (max-width: 768px) {
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
