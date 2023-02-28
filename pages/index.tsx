import Head from 'next/head'
import Script from 'next/script';
import PostPreview from "../components/PostPreview";
import { getPosts } from "../components/Post";
import type { GetServerSideProps } from "next";

export const getServerSideProps: GetServerSideProps = async () => {
  const posts = getPosts();
  return {
    props: {
      posts
    },
  };
};

const HomePage = ({ posts }) => {
  return (
    <>
      <Head>
        <title>Kev Zettler</title>
        <meta content="width=device-width, initial-scale=1" name="viewport" />
        <link rel="icon" href="/favicon.ico" />
        <Script src="/js/vendor/modernizr-2.5.3.min.js" />
      </Head>
      <div className="container" id="body-content">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {posts.map((post) => (
            <PostPreview key={post.slug} {...post} />
          ))}
        </div>
      </div>
    </>
  );
};

export default HomePage;
