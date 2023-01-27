import { getPosts, getPostContent } from "../../../../../components/Post";
import "../../../../../public/js/vendor/highlight/styles/stackoverflow-light.min.css";

export const generateStaticParams = async () => {
  const posts = getPosts();

  return posts.map((post) => {
    const urlChunks = post.slug.split('/');
    return {
      year: urlChunks[0],
      month: urlChunks[1],
      day: urlChunks[2],
      slug: urlChunks[3],
    }
  });
};


export default function PostPage(props: any) {
  const filePath = [
    props.params.year,
    props.params.month,
    props.params.day,
    props.params.slug
  ];
  const post = getPostContent(filePath);

  return (
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
      </div>
    </div>
  );
}
