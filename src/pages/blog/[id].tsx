import Layout from '@/components/Layout'
import { postsDirectory } from '@/utils/constants'
import { getAllPagesIds, getPagesData } from '@/utils/page'

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
  const paths = getAllPagesIds({ directory: postsDirectory})
  return {
    paths,
    fallback: false,
  }
}

export async function getStaticProps({ params }) {
  const postData = await getPagesData({id: params.id, directory: postsDirectory })
  return {
    props: {
      postData,
    },
  }
}
