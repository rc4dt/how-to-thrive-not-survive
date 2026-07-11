import { getAllPosts } from "@/lib/posts";
import { formatRssDate } from "@/lib/dates";
import { siteConfig } from "@/lib/site";

export async function GET() {
  const posts = await getAllPosts();
  const siteUrl = siteConfig.url.replace(/\/$/, "");

  const items = posts
    .map((post) => {
      const url = `${siteUrl}/blog/${post.slug}`;
      const description = post.excerpt
        ? `<![CDATA[${post.excerpt}]]>`
        : "";

      return `
    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${url}</link>
      <guid>${url}</guid>
      <pubDate>${formatRssDate(post.date)}</pubDate>
      <description>${description}</description>
    </item>`;
    })
    .join("");

  const feed = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>${escapeXml(siteConfig.name)}</title>
    <link>${siteUrl}</link>
    <description>${escapeXml(siteConfig.tagline)}</description>
    <language>en-us</language>${items}
  </channel>
</rss>`;

  return new Response(feed, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
    },
  });
}

function escapeXml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}
