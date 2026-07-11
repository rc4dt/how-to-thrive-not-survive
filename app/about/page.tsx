import { notFound } from "next/navigation";

import { MarkdownContent } from "@/components/MarkdownContent";
import { SiteLayout } from "@/components/SiteLayout";
import { getPageFile } from "@/lib/content";
import { getAllTags } from "@/lib/posts";

export async function generateMetadata() {
  const page = getPageFile("about");

  return {
    title: page?.title ?? "About",
    description: "About How to thrive not survive.",
  };
}

export default async function AboutPage() {
  const page = getPageFile("about");
  if (!page) {
    notFound();
  }

  const tags = await getAllTags();

  return (
    <SiteLayout tags={tags}>
      <article>
        <header className="y2k-post-header">
          <h1>{page.title}</h1>
        </header>
        <MarkdownContent content={page.content} />
      </article>
    </SiteLayout>
  );
}
