import { PostCard } from "@/components/PostCard";
import type { PostSummary } from "@/lib/posts";

type PostListProps = {
  posts: PostSummary[];
};

export function PostList({ posts }: PostListProps) {
  if (posts.length === 0) {
    return (
      <div className="y2k-empty">
        <p>No posts yet. Check back soon!</p>
      </div>
    );
  }

  return (
    <div className="y2k-post-list">
      {posts.map((post) => (
        <PostCard key={post.slug} post={post} />
      ))}
    </div>
  );
}
