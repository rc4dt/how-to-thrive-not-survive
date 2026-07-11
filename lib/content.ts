import fs from "node:fs";
import path from "node:path";

import matter from "gray-matter";

const postsDirectory = path.join(process.cwd(), "content/posts");
const pagesDirectory = path.join(process.cwd(), "content/pages");

export type PostFrontmatter = {
  title: string;
  date: string;
  excerpt?: string;
  tags?: string[];
  draft?: boolean;
};

export type PageFrontmatter = {
  title: string;
};

export type PostFile = PostFrontmatter & {
  slug: string;
  content: string;
};

export type PageFile = PageFrontmatter & {
  slug: string;
  content: string;
};

function readMdxFiles<T extends Record<string, unknown>>(
  directory: string,
): Array<T & { slug: string; content: string }> {
  if (!fs.existsSync(directory)) {
    return [];
  }

  return fs
    .readdirSync(directory)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => {
      const slug = file.replace(/\.mdx$/, "");
      const raw = fs.readFileSync(path.join(directory, file), "utf8");
      const { data, content } = matter(raw);

      return {
        slug,
        content,
        ...(data as T),
      };
    });
}

export function getAllPostFiles(): PostFile[] {
  return readMdxFiles<PostFrontmatter>(postsDirectory).filter(
    (post) => post.title && post.date,
  );
}

export function getPostFile(slug: string): PostFile | null {
  const filePath = path.join(postsDirectory, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) {
    return null;
  }

  const raw = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(raw);

  if (!data.title || !data.date) {
    return null;
  }

  return {
    slug,
    content,
    ...(data as PostFrontmatter),
  };
}

export function getPageFile(slug: string): PageFile | null {
  const filePath = path.join(pagesDirectory, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) {
    return null;
  }

  const raw = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(raw);

  if (!data.title) {
    return null;
  }

  return {
    slug,
    content,
    ...(data as PageFrontmatter),
  };
}
