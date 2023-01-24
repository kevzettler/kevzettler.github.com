import PostPreview from "../components/PostPreview";
import { getPosts } from "../components/Post";

const HomePage = () => {
  const posts = getPosts();
  console.log("******index posts**********", posts)

  const postPreviews = posts.map((post) => (
    <PostPreview key={post.slug} {...post} />
  ));

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">{postPreviews}</div>
  );
};

export default HomePage;
