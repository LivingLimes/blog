import Layout from '../components/Layout';
import { getAllPostIds, getPostData } from '../utils/posts';
import Head from 'next/head';
import convertDateStringToDate from '../components/Date';
import { getRootPagesData, getAllRootPagesIds } from '../utils/rootPages';

export default function RootPages({ postData }) {
  console.log('z')
  return (
    <Layout>
      <Head>
        <title>{postData.title}</title>
      </Head>
      <article>
        <h1>{postData.title}</h1>
        <div>
          {/* <Date dateString={postData?.date} /> */}
        </div>
        <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
      </article>
    </Layout>
  );
}

export async function getStaticPaths() {
  console.log('zzz')
  const paths = getAllRootPagesIds();
  console.log({paths})
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  console.log({params})
  const postData = await getRootPagesData(params.id);
  console.log({postData})
  return {
    props: {
      postData,
    },
  };
}
