import Link from "next/link";
import { notFound } from "next/navigation";

import { MarkdownContent } from "@/components/MarkdownContent";
import { PostBody } from "@/components/PostBody";
import { SiteLayout } from "@/components/SiteLayout";
import { formatPostDateLong } from "@/lib/dates";
import {
  getAdjacentPosts,
  getAllPosts,
  getAllTags,
  getPostBySlug,
} from "@/lib/posts";

type PostPageProps = {
  params: Promise<{ slug: string }>;
};

async function tryGetTinaPost(relativePath: string) {
  if (!process.env.NEXT_PUBLIC_TINA_CLIENT_ID || !process.env.TINA_TOKEN) {
    return null;
  }

  try {
    const { default: client } = await import("@/tina/__generated__/client");
    return client.queries.post({ relativePath });
  } catch {
    return null;
  }
}

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: PostPageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    return { title: "Post not found" };
  }

  return {
    title: post.title,
    description: post.excerpt ?? undefined,
  };
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const [tags, adjacent, tinaData] = await Promise.all([
    getAllTags(),
    getAdjacentPosts(slug),
    tryGetTinaPost(`${slug}.mdx`),
  ]);

  return (
    <SiteLayout tags={tags}>
      <article>
        <header className="y2k-post-header">
          <p className="y2k-post-date">{formatPostDateLong(post.date)}</p>
          <h1>{post.title}</h1>
          {post.tags && post.tags.length > 0 && (
            <ul className="y2k-post-tags">
              {post.tags.filter(Boolean).map((tag) => (
                <li key={tag}>
                  <span className="y2k-tag">#{tag}</span>
                </li>
              ))}
            </ul>
          )}
        </header>

        {tinaData ? (
          <PostBody
            query={tinaData.query}
            variables={tinaData.variables}
            data={tinaData.data}
          />
        ) : (
          <MarkdownContent content={post.content} />
        )}

        <nav className="y2k-post-nav" aria-label="Post navigation">
          <div>
            {adjacent.previous ? (
              <Link href={`/blog/${adjacent.previous.slug}`}>
                ← {adjacent.previous.title}
              </Link>
            ) : (
              <span />
            )}
          </div>
          <div className="text-right">
            {adjacent.next ? (
              <Link href={`/blog/${adjacent.next.slug}`}>
                {adjacent.next.title} →
              </Link>
            ) : (
              <span />
            )}
          </div>
        </nav>
      </article>
    </SiteLayout>
  );
}
