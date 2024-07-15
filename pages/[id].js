import Layout from "../components/Layout"
import { getAllPostIds, getPostData } from "../utils/posts"
import Head from "next/head"
import convertDateStringToDate from "../components/Date"
import { getRootPagesData, getAllRootPagesIds } from "../utils/rootPages"

export default function RootPages({ postData }) {
  return (
    <Layout>
      <h1>{postData.title}</h1>
      <article>
        <div>{/* <Date dateString={postData?.date} /> */}</div>
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
