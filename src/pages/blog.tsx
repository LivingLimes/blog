import React from 'react'
import { getSortedPageData } from '@/utils/page'
import Layout from '@/components/Layout'
import { postsDirectory } from '@/utils/constants'
import BlogPosts from '@/components/BlogPosts'

const BlogPostPage = ({ postData }) => {
  return (
    <>
      <Layout>
        <h1>Blog</h1>
        <section>
          <BlogPosts posts={postData} />
        </section>
      </Layout>
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

export default BlogPostPage
