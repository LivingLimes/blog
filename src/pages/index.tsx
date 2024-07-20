import Link from 'next/link'
import { yearsSinceDate } from '@/utils/maths'
import Layout from '@/components/Layout'
import React from 'react'
import Projects from '@/components/Projects'
import { projects } from '@/data/projects'
import BlogPosts from '@/components/BlogPosts'
import { getSortedPageData } from '@/utils/page'
import { postsDirectory } from '@/utils/constants'

const HomePage: React.FC = ({ postData }) => {
  return (
    <>
      <Layout>
        <h1>Hello! I&#39;m Michael</h1>

        <section aria-label="About Me">
          <p>
            I&#39;ve been writing code for{' '}
            {yearsSinceDate(new Date(2020, 0, 1))} years. This is my area in the
            internet where I share my work on anything I&#39;m interested in.
          </p>
          <p>
            These days, most of my time is spent slinging code for{' '}
            <a
              href="https://github.com/surrealdb/surrealdb"
              target="_blank"
              rel="noopener noreferrer"
            >
              SurrealDB
            </a>
            , training my dog and dabbling in the creative arts. In particular,
            I&#39;ve been enjoying building stuff with lego and improvising cool
            stories. I&#39;ve also been thinking about how to make the world a
            kinder place and a place where more people are comfortable to take
            calculated risks.
          </p>
        </section>

        <section aria-labelledby="projects">
          <header className="home-header home-header-extended">
            <h2 id="projects" className="home-heading">
              Projects
            </h2>
            <Link href="/projects" legacyBehavior>
              <a className="view-all">View Projects</a>
            </Link>
          </header>
          <Projects projects={projects} />
        </section>

        <section aria-labelledby="blog">
          <header className="home-header home-header-extended">
            <h2 id="blog" className="home-heading">
              Blog
            </h2>
            <Link href="/blog" legacyBehavior>
              <a className="view-all">View Blog</a>
            </Link>
          </header>
          <BlogPosts posts={postData} />
        </section>

        <section aria-labelledby="links">
          <header className="home-header">
            <h2 id="links" className="home-heading">
              My Links
            </h2>
          </header>
          <ul>
            <li>
              <a
                href="https://github.com/livinglimes"
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub
              </a>
            </li>
            <li>
              <a
                href="https://linkedin.com/in/tran-michael"
                target="_blank"
                rel="noopener noreferrer"
              >
                LinkedIn
              </a>
            </li>
          </ul>
        </section>
      </Layout>
      <style jsx>{`
        .home-header {
          margin-top: 2rem;
          margin-bottom: 2rem;
        }

        .home-header-extended {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .home-heading {
          margin: 0;
        }
        .view-all {
          padding: 0.5rem 1rem;
          background-color: var(--btn-grey);
          color: var(--text-primary);
          border: 1px solid var(--bg-secondary);
          border-radius: var(--border-radius-8);
          font-weight: bold;
          font-size: 0.875rem;
        }
        .view-all:hover {
          border-color: var(--text-primary);
          opacity: 0.85;
        }
      `}</style>
    </>
  )
}

export async function getStaticProps() {
  const postData = await getSortedPageData({ directory: postsDirectory })
  return {
    props: {
      postData,
    },
  }
}

export default HomePage
