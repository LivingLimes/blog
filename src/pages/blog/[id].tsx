import Layout from '@/components/Layout'
import { getAllPostIds, getPostData } from '@/utils/posts'

export default function Post({ postData }) {
  return (
    <Layout>
      <h1>{postData.title}</h1>
      <article>
        <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
      </article>
    </Layout>
  )
}

export async function getStaticPaths() {
  const paths = getAllPostIds()
  return {
    paths,
    fallback: false,
  }
}

export async function getStaticProps({ params }) {
  const postData = await getPostData(params.id)
  return {
    props: {
      postData,
    },
  }
}
