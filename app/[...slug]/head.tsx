import { getPostContent } from "../../components/Post";

export default function Head(props: any) {
  const slug = props.params.slug;
  const post = getPostContent(slug);

  return (
    <>
      <title>{post.title} - Kev Zettler</title>
      <meta content="width=device-width, initial-scale=1" name="viewport" />
      <link rel="icon" href="/favicon.ico" />
      <script async src="/js/vendor/modernizr-2.5.3.min.js" />
      <script async src="/js/vendor/highlight/highlight.min.js" />
    </>
  )
}
