import { SiteLayout } from "@/components/SiteLayout";
import { PostList } from "@/components/PostList";
import { getAllPosts, getAllTags } from "@/lib/posts";

export default async function HomePage() {
  const [posts, tags] = await Promise.all([getAllPosts(), getAllTags()]);

  return (
    <SiteLayout tags={tags}>
      <section>
        <header className="mb-4">
          <h1 className="font-display text-xl text-pink-dark">Latest posts</h1>
          <p className="text-sm text-[#7a3558]">
            Women's health, cycle tracking, and honest stories from R.
          </p>
        </header>
        <PostList posts={posts} />
      </section>
    </SiteLayout>
  );
}
