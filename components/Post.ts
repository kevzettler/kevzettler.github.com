import fs from "fs";
import matter from "gray-matter";
import org from "org";
import striptags from "striptags";
const orgParser = new org.Parser();
const folder = "data/posts/";

export interface Post {
  title: string;
  contentHTML: string;
  slug: string;
  date: string;
  excerpt: string;
}


export function getPostContent(slug: string) {
  return {
    title: "",
    contentHTML: "",
    slug: "",
    date: "",
    excerpt: ""
  };
}

export function getPostDate(fileName: string) {
  return fileName.substring(0, 10);
}

export function getPostSlug(fileName: string) {
  const postDate = getPostDate(fileName);
  const postTitle = fileName
    .replace(".md", "")
    .replace(".org", "")
    .substring(11);
  const dateInts = postDate.split('-');
  const slug = dateInts.join("/") + "/" + postTitle;
  return slug;
}

export function getMarkdownPosts(): Post[] {
  const files = fs.readdirSync(folder);
  const markdownPosts = files.filter((file) => file.endsWith(".md"));

  // Get gray-matter data from each file.
  const posts = markdownPosts.map((fileName) => {
    const fileContents = fs.readFileSync(`${folder}${fileName}`, "utf8");
    const matterResult = matter(fileContents);

    let excerpt = matterResult.excerpt;
    if (!excerpt || excerpt === "") {
      excerpt = striptags(matterResult.content).substring(0, 300) + "...";
    }

    return {
      title: matterResult.data.title,
      date: matterResult.data.date,
      contentHTML: matterResult.content,
      excerpt,
      slug: getPostSlug(fileName)
    };
  });

  return posts;
};

export function getOrgModePosts(): Post[] {
  const files = fs.readdirSync(folder);
  const markdownPosts = files.filter((file) => file.endsWith(".org"));

  // Get gray-matter data from each file.
  const posts = markdownPosts.map((fileName) => {
    const fileContents = fs.readFileSync(`${folder}${fileName}`, "utf8");
    const orgDocument = orgParser.parse(fileContents);
    var orgHTMLDocument = orgDocument.convert(org.ConverterHTML, {
      headerOffset: 1,
      exportFromLineNumber: false,
      suppressSubScriptHandling: false,
      suppressAutoLink: false
    });

    return {
      title: orgHTMLDocument.title,
      date: getPostDate(fileName),
      contentHTML: orgHTMLDocument.contentHTML,
      excerpt: striptags(orgHTMLDocument.contentHTML).substring(0, 300) + "...",
      slug: getPostSlug(fileName)
    };
  });

  return posts;
};


export function getPosts(): Post[] {
  return [...getOrgModePosts(), ...getMarkdownPosts()];
}
