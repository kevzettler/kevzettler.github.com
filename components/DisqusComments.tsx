import { DiscussionEmbed } from "disqus-react"
const DisqusComments = ({ post }) => {
  const disqusShortname = "radcade-com";
  const disqusConfig = {
    url: `https://www.kevzettler.com/${post.slug}`,
    identifier: post.slug, // Single post id
    title: post.title // Single post title
  }
  return (
    <div>
      <h2>Comments:</h2>
      <DiscussionEmbed
        shortname={disqusShortname}
        config={disqusConfig}
      />
    </div>
  )
}
export default DisqusComments;
