import React from 'react'
import { getAllPostData } from '@/utils/posts'
import Layout from '@/components/Layout'
import Link from 'next/link'

const BlogPostPage = ({ postData }) => {
  return (
    <>
      <Layout>
        <h1>Blog</h1>
        <section>
          <ul className="posts">
            {postData
              .sort(
                (a, b) =>
                  new Date(b.date).getTime() - new Date(a.date).getTime()
              )
              .map((post) => (
                <li key={post.id}>
                  {/* Not sure why I need to use legacy behaviour */}
                  <Link href={`/blog/${post.id}`} legacyBehavior>
                    <a className="post-link">
                      <span className="post-title">{post.title}</span>
                      <span className="post-date">
                        {new Date(post.date).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                        })}
                      </span>
                    </a>
                  </Link>
                </li>
              ))}
          </ul>
        </section>
      </Layout>

      <style jsx>{`
        .posts {
          list-style-type: none;
          padding: 0;
        }
        .post-link {
          display: flex;
          justify-content: space-between;
          align-items: baseline;
          text-decoration: none;
          color: var(--accent-primary);
          transition: all 0.3s ease;
          padding: 10px;
          border-radius: 4px;
          border: 2px solid transparent;
        }
        .post-link:hover,
        .post-link:focus {
          background-color: var(--accent-primary);
          color: #ffffff;
          outline: none;
          border-color: var(--accent-primary);
        }
        .post-date {
          font-size: 0.8rem;
          color: inherit;
          opacity: 0.9;
        }
        @media (max-width: 640px) {
          .post-link {
            flex-direction: column;
            align-items: flex-start;
          }
          .post-date {
            font-size: 0.8rem;
            margin-top: 0.2rem;
          }
        }
      `}</style>
    </>
  )
}

export async function getStaticProps() {
  const postData = await getAllPostData()
  return {
    props: {
      postData,
    },
  }
}

export default BlogPostPage
