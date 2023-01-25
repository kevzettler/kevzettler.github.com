import fs from "fs";
import matter from "gray-matter";
import org from "org";
import striptags from "striptags";
import { marked } from "marked";
import htmlParse from "html-react-parser"
const orgParser = new org.Parser();


export interface Post {
  title: string;
  contentHTML: string | JSX.Element | JSX.Element[];
  slug: string;
  date: string;
  excerpt: string | JSX.Element | JSX.Element[];
}

interface PostExtensionMap {
  [fileExtension: string]: (fileName: string) => Post
}

const folder = "data/posts/";

const possibleFileExtensions: PostExtensionMap = {
  '.org': readOrgModePost,
  '.md': readMarkdownPost
};

export function getPostContent(slug: String[]) {
  const fileName = slug.join('-');
  const postExtension = Object.keys(possibleFileExtensions)
    .filter((fileExtension) => fs.existsSync(`${folder}${fileName}${fileExtension}`))

  const postFileName = fileName + postExtension[0];

  return possibleFileExtensions[postExtension[0]](postFileName);
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

function readMarkdownPost(fileName: string): Post {
  const fileContents = fs.readFileSync(`${folder}${fileName}`, "utf8");
  const matterResult = matter(fileContents);

  let excerpt: string | JSX.Element | JSX.Element[] = matterResult.excerpt;
  if (!excerpt || excerpt === "") {
    excerpt = htmlParse(striptags(marked(matterResult.content).substring(0, 400) + "..."));
  }

  let date = matterResult.data.date;
  if (!date || date === "") {
    date = getPostDate(fileName);
  }

  return {
    title: matterResult.data.title,
    date,
    contentHTML: htmlParse(marked(matterResult.content)),
    excerpt,
    slug: getPostSlug(fileName)
  };
}


function readOrgModePost(fileName: string): Post {
  const fileContents = fs.readFileSync(`${folder}${fileName}`, "utf8");
  const orgDocument = orgParser.parse(fileContents, { num: false, toc: false });
  var orgHTMLDocument = orgDocument.convert(org.ConverterHTML, {
    headerOffset: 0,
    exportFromLineNumber: false,
    suppressSubScriptHandling: false,
    suppressAutoLink: false,
  });

  return {
    title: orgHTMLDocument.title,
    date: getPostDate(fileName),
    contentHTML: htmlParse(orgHTMLDocument.contentHTML),
    excerpt: htmlParse(striptags(orgHTMLDocument.contentHTML).substring(0, 400) + "..."),
    slug: getPostSlug(fileName)
  };
}


function getPostType(fileExtension: string): Post[] {
  const files = fs.readdirSync(folder);
  const postFiles = files.filter((file) => file.endsWith(fileExtension));

  const posts = postFiles.map(possibleFileExtensions[fileExtension]);
  return posts;
}


export function getPosts(): Post[] {
  const joinedPosts = Object.keys(possibleFileExtensions).flatMap((fileExtension) => getPostType(fileExtension));

  // sort posts by date
  let sortedPosts = joinedPosts.sort(function (a: Post, b: Post) {
    let dateA = new Date(a.date);
    let dateB = new Date(b.date);
    return (dateB.getTime() - dateA.getTime())
  });

  return sortedPosts
}
