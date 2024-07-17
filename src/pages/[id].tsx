import Layout from '@/components/Layout'
import { getAllPagesIds, getPagesData } from '@/utils/page'
import { rootPagesDirectory } from '@/utils/constants'

export default function RootPages({ postData }) {
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
  const paths = getAllPagesIds({ directory: rootPagesDirectory })
  return {
    paths,
    fallback: false,
  }
}

export async function getStaticProps({ params }) {
  const postData = await getPagesData({
    id: params.id,
    directory: rootPagesDirectory,
  })
  return {
    props: {
      postData,
    },
  }
}
