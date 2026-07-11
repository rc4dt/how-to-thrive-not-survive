import {
  getAllPostFiles,
  getPostFile,
  type PostFile,
} from "@/lib/content";

export type PostSummary = {
  slug: string;
  title: string;
  date: string;
  excerpt?: string | null;
  tags?: (string | null)[] | null;
  draft?: boolean | null;
};

export type PostDocument = PostSummary & {
  content: string;
};

const isProduction = process.env.NODE_ENV === "production";

function toSummary(post: PostFile): PostSummary | null {
  if (isProduction && post.draft) {
    return null;
  }

  return {
    slug: post.slug,
    title: post.title,
    date: post.date,
    excerpt: post.excerpt ?? null,
    tags: post.tags ?? null,
    draft: post.draft ?? null,
  };
}

export async function getAllPosts(): Promise<PostSummary[]> {
  const posts = getAllPostFiles()
    .map(toSummary)
    .filter((post): post is PostSummary => post !== null);

  return posts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );
}

export async function getPostBySlug(slug: string): Promise<PostDocument | null> {
  const post = getPostFile(slug);
  if (!post) return null;
  if (isProduction && post.draft) return null;

  return {
    slug: post.slug,
    title: post.title,
    date: post.date,
    excerpt: post.excerpt ?? null,
    tags: post.tags ?? null,
    draft: post.draft ?? null,
    content: post.content,
  };
}

export async function getAllTags(): Promise<string[]> {
  const posts = await getAllPosts();
  const tags = new Set<string>();

  for (const post of posts) {
    post.tags?.forEach((tag) => {
      if (tag) tags.add(tag);
    });
  }

  return [...tags].sort();
}

export async function getAdjacentPosts(slug: string) {
  const posts = await getAllPosts();
  const index = posts.findIndex((post) => post.slug === slug);

  if (index === -1) {
    return { previous: null, next: null };
  }

  return {
    previous: index > 0 ? posts[index - 1] : null,
    next: index < posts.length - 1 ? posts[index + 1] : null,
  };
}
