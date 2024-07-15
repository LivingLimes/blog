import Layout from '@/components/Layout'
import { getRootPagesData, getAllRootPagesIds } from '../utils/rootPages'

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
  const paths = getAllRootPagesIds()
  return {
    paths,
    fallback: false,
  }
}

export async function getStaticProps({ params }) {
  const postData = await getRootPagesData(params.id)
  return {
    props: {
      postData,
    },
  }
}
