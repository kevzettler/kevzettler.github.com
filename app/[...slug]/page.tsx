import { getPosts, getPostContent } from "../../components/Post";
import "../../public/js/vendor/highlight/styles/stackoverflow-light.min.css";

export const generateStaticParams = async () => {
  const posts = getPosts();

  return posts.map((post) => ({
    slug: post.slug.split('/'),
  }));
};


export default function PostPage(props: any) {
  const slug = props.params.slug;
  const post = getPostContent(slug);

  return (
    <div className="post cell">
      <h1>{post.title}</h1>
      <h4 className="large-bottom">
        Posted on {post.date}
      </h4>


      <div className="content">
        {post.contentHTML}
      </div>


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
