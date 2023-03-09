import Link from "next/link";
import { Post } from "./Post";

const PostPreview = (props: Post) => {
  return (
    <div className="post cell">
      <h2><a href={`/${props.slug}`} className="dark-link">{props.title}</a></h2>
      <h4 className="low-top">
        Posted on {props.date}
      </h4>
      <p>{props.excerpt}</p>
      <p><a href={`/${props.slug}`}>Read more...</a></p>
    </div>
  );
};

export default PostPreview;
