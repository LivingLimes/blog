import Link from 'next/link'
import { yearsSinceDate } from '@/utils/maths'
import Layout from '@/components/Layout'
import React, { useState } from 'react'
import Projects from '@/components/Projects'
import { projects } from '@/data/projects'
import BlogPosts from '@/components/BlogPosts'
import { getSortedPageData } from '@/utils/page'
import { postsDirectory } from '@/utils/constants'

const HomePage: React.FC = ({ postData }) => {
  return (
    <Layout>
      <h1>Hello! I&#39;m Michael</h1>
      <p>
        I&#39;ve been writing code for {yearsSinceDate(new Date(2020, 0, 1))}{' '}
        years. This is my area in the internet where I share my work on anything
        I&#39;m interested in.
      </p>
      <h2>What I&#39;m Doing Now</h2>
      <p>
        These days, most of my time is spent slinging code for{' '}
        <a href="github.com/surrealdb">SurrealDB</a>, training my dog and
        dabbling in the creative arts. In particular, I&#39;ve been enjoying
        building stuff with lego and improvising cool stories. I&#39;ve also
        been thinking about how to make the world a kinder place and a place
        where more people are comfortable to take calculated risks.
      </p>
      <p>Here are some of my links:</p>
      <ul>
        <li>
          <Link href="/blog">Blog</Link>
        </li>
        <li>
          <Link href="/projects">Projects</Link>
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
        <li>
          <a
            href="https://github.com/livinglimes"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
        </li>
      </ul>

      <h2>Blog</h2>
      <BlogPosts posts={postData} />

      <h2>Projects</h2>
      <section>
        <Projects projects={projects} />
      </section>
    </Layout>
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
