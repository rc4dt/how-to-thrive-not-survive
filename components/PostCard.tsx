import Link from "next/link";

import { formatPostDate } from "@/lib/dates";
import type { PostSummary } from "@/lib/posts";

type PostCardProps = {
  post: PostSummary;
};

export function PostCard({ post }: PostCardProps) {
  return (
    <article className="y2k-post-card">
      <header>
        <p className="y2k-post-date">{formatPostDate(post.date)}</p>
        <h2 className="y2k-post-title">
          <Link href={`/blog/${post.slug}`}>{post.title}</Link>
        </h2>
      </header>

      {post.excerpt && <p className="y2k-post-excerpt">{post.excerpt}</p>}

      {post.tags && post.tags.length > 0 && (
        <ul className="y2k-post-tags">
          {post.tags.filter(Boolean).map((tag) => (
            <li key={tag}>
              <span className="y2k-tag">#{tag}</span>
            </li>
          ))}
        </ul>
      )}

      <p className="y2k-continue">
        <Link href={`/blog/${post.slug}`}>Continue reading →</Link>
      </p>

      <hr className="y2k-divider" />
    </article>
  );
}
