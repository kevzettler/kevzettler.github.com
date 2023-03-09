import { GetServerSideProps } from "next";
import { getPosts, getPostContent } from "../../../../../components/Post";
import Head from 'next/head'
import Script from 'next/script'
import DisqusComments from "../../../../../components/DisqusComments";

export const getStaticPaths = async () => {
  const posts = getPosts();

  const paths = posts.map((post) => {
    const urlChunks = post.slug.split('/');
    return {
      params: {
        year: urlChunks[0],
        month: urlChunks[1],
        day: urlChunks[2],
        slug: urlChunks[3],
      }
    }
  });

  return {
    paths,
    fallback: false
  }
};


export const getStaticProps: GetServerSideProps = async (context) => {
  const filePath = [
    context.params.year,
    context.params.month,
    context.params.day,
    context.params.slug
  ] as string[];

  const post = getPostContent(filePath);

  return {
    props: {
      post
    }
  }
};

export default function PostPage({ post }) {
  return (
    <>
      <Head>
        <title>{post.title} - Kev Zettler</title>
        <meta property="og:image" content={`https://kevzettler.com/${post.image}`} />
        <meta name="description" content={post.description} />
        <meta property="og:description" content={post.description} />
        <meta name="keywords" content={post.keywords} />
      </Head>
      <Script src="/js/vendor/highlight/highlight.min.js" strategy="beforeInteractive" />
      <div className="container" id="body-content">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="post cell">
            <h1>{post.title}</h1>
            <h4 className="large-bottom">
              Posted on {post.date}
            </h4>


            <div className="content" dangerouslySetInnerHTML={{ "__html": post.contentHTML }} />


            <div>
              <hr />
              <div style={{ overflow: "hidden" }}>
                <p style={{ float: "left" }}>
                  If you enjoyed this article, consider following me <a href="https://www.twitter.com/kevzettler">on Twitter</a> or <a rel="alternate" type="application/rss+xml" href="/feed.xml">RSS</a>
                </p>
              </div>

              <hr />
              <DisqusComments post={post} />
            </div>
          </div>
        </div>
      </div>
      <Script strategy="afterInteractive" dangerouslySetInnerHTML={{ "__html": `hljs.highlightAll();` }} />
    </>
  );
}
