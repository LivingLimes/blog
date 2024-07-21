import Link from 'next/link'

const BlogPosts = ({ posts }) => {
  return (
    <>
      <div className="posts" role="list">
        {posts.map((post) => (
          <article key={post.id} className="post" role="listitem">
            <Link href={`/posts/${post.id}`} key={post.id} legacyBehavior>
              <a className="post-link">
                <h3 className="post-title">{post.title}</h3>
                <p className="post-caption">{post.caption}</p>
                <time className="post-date" dateTime={post.date}>
                  {new Date(post.date).toLocaleDateString('en-AU', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </time>
              </a>
            </Link>
          </article>
        ))}
      </div>
      <style jsx>{`
        .posts {
          display: flex;
          flex-direction: column;
        }
        .post {
          border-bottom: 1px solid var(--border-grey);
          padding: 1rem 0;
        }
        .posts > .post:first-child {
          border-top: 1px solid var(--border-grey);
        }

        .post-link {
          display: flex;
          flex-direction: column;
          border-bottom: none;
          gap: 0.25rem;
        }
        .post-title {
          margin: 0;
        }
        .post-link:hover .post-title {
          color: var(--accent-primary);
          text-decoration-line: underline;
          text-decoration-thickness: 2px;
        }
        .post-caption {
          margin: 0;
        }
        .post-date {
          font-size: 0.9rem;
          color: var(--text-secondary);
        }
      `}</style>
    </>
  )
}

export default BlogPosts
