import React, { useState, useEffect } from "react";
import { GetServerSideProps } from "next";
import htmlParse, { domToReact, HTMLReactParserOptions } from 'html-react-parser';
import { TwitterTweetEmbed } from 'react-twitter-embed';
import { getPosts, getPostContent } from "../../../../../components/Post";
import Head from 'next/head'
import Script from 'next/script'
import DisqusComments from "../../../../../components/DisqusComments";
import { Element } from 'domhandler/lib/node';

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
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const options: HTMLReactParserOptions = {
    replace: (domNode: Element) => {
      if (
        domNode.type === "tag" &&
        domNode.name === "a" &&
        domNode.attribs &&
        domNode.attribs.href &&
        domNode.attribs.href.match(/https:\/\/twitter\.com\/[A-Za-z0-9_]+\/status\/\d+/)
      ) {
        const tweetId = domNode.attribs.href.match(/\d+/)[0];
        return isClient ? <TwitterTweetEmbed tweetId={tweetId} /> : null;
      }

      if (
        domNode.type === "tag" &&
        domNode.name === "a"
      ) {
        const href = domNode.attribs.href;
        if (href && !href.startsWith('/') && !href.startsWith('#') && !href.startsWith('https://kevzettler.com')) {
          const updatedAttributes = {
            ...domNode.attribs,
            target: '_blank',
            rel: 'noopener noreferrer',
          };

          const children = domToReact(domNode.children);
          return React.createElement(domNode.name, updatedAttributes, children);
        }
      }

    },
  };


  const content = htmlParse(post.contentHTML, options);
  return (
    <>
      <Head>
        <title>{post.title} - Kev Zettler</title>
        <meta property="og:title" content={post.meta.title} />
        <meta property="og:image" content={`https://kevzettler.com/${post.meta.image}`} />
        <meta name="description" content={post.meta.description} />
        <meta property="og:description" content={post.meta.description} />
        <meta name="keywords" content={post.meta.keywords} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@kevzettler" />
        <meta name="twitter:creator" content="@kevzettler" />
        <meta name="twitter:title" content={post.meta.title} />
        <meta name="twitter:description" content={post.meta.description} />
        <meta
          name="twitter:image"
          content={`https://kevzettler.com/${post.meta.image}`}
        />

        <meta name="twitter:image:width" content="4096" />
        <meta name="twitter:image:height" content="2701" />

      </Head>
      <Script src="/js/vendor/highlight/highlight.min.js" strategy="beforeInteractive" />
      <div className="container" id="body-content">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="post cell">
            <h1>{post.title}</h1>
            <h4 className="large-bottom">
              Posted on {post.date}
            </h4>


            <div className="content">{content}</div>


            <div>
              <hr />
              <div style={{ overflow: "hidden" }}>
                <p style={{ float: "left" }}>
                  If you enjoyed this article, consider following me <a href="https://www.twitter.com/kevzettler">on Twitter</a>
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
