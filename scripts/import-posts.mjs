import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { parse } from "csv-parse/sync";
import TurndownService from "turndown";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const csvPath =
  process.argv[2] ||
  "/Users/m3tamorphosis/Downloads/how to thrive not survive_migration(Sheet).csv";
const postsDir = path.join(root, "content/posts");
const pagesDir = path.join(root, "content/pages");

const turndown = new TurndownService({
  headingStyle: "atx",
  bulletListMarker: "-",
  codeBlockStyle: "fenced",
});

turndown.addRule("images", {
  filter: "img",
  replacement: (_content, node) => {
    const el = node;
    const src = el.getAttribute("src");
    const alt = el.getAttribute("alt") || "";
    if (!src) return "";
    return `\n\n![${alt}](${src})\n\n`;
  },
});

turndown.addRule("youtubeLinks", {
  filter: (node) => {
    if (node.nodeName !== "A") return false;
    const href = node.getAttribute("href") || "";
    return href.includes("youtu.be") || href.includes("youtube.com");
  },
  replacement: (_content, node) => {
    const href = node.getAttribute("href") || "";
    return `\n\n[Watch on YouTube](${href})\n\n`;
  },
});

turndown.addRule("embeddedVideo", {
  filter: (node) =>
    node.nodeName === "OBJECT" &&
    (node.getAttribute("class") || "").includes("BLOG_video"),
  replacement: () =>
    "\n\n*Video embed from the original blog — open the archived post if playback is unavailable.*\n\n",
});

function slugify(input) {
  return input
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[^\w\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

function stripHtml(html) {
  return html
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function fixEncoding(text) {
  return text
    .replace(/\uFFFD/g, "'")
    .replace(/\?\?/g, "✨");
}

function htmlToMarkdown(html) {
  if (!html?.trim()) return "";

  let cleaned = fixEncoding(html)
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'");

  const markdown = turndown.turndown(cleaned);
  return markdown.replace(/\n{3,}/g, "\n\n").trim();
}

function yamlEscape(value) {
  if (/[:#{}[\],&*?]|^\s|\s$|^'|^"/.test(value)) {
    return `"${value.replace(/\\/g, "\\\\").replace(/"/g, '\\"')}"`;
  }
  return value;
}

function parseTags(labels) {
  if (!labels?.trim()) return [];
  return labels
    .split(",")
    .map((tag) => tag.trim())
    .filter(Boolean);
}

function makeExcerpt(markdown, title) {
  const text = markdown
    .replace(/!\[[^\]]*\]\([^)]+\)/g, "")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/[#>*_`~-]/g, "")
    .replace(/\s+/g, " ")
    .trim();

  if (!text) return `Read ${title}.`;
  return text.length > 220 ? `${text.slice(0, 217).trim()}...` : text;
}

function ensureUniqueSlug(baseSlug, usedSlugs, published) {
  let slug = baseSlug || `post-${published.slice(0, 10)}`;
  if (!usedSlugs.has(slug)) {
    usedSlugs.add(slug);
    return slug;
  }

  let counter = 2;
  while (usedSlugs.has(`${slug}-${counter}`)) {
    counter += 1;
  }

  const unique = `${slug}-${counter}`;
  usedSlugs.add(unique);
  return unique;
}

function writePostMdx(filePath, frontmatter, body) {
  const tagsBlock =
    frontmatter.tags.length > 0
      ? `tags:\n${frontmatter.tags.map((tag) => `  - ${yamlEscape(tag)}`).join("\n")}\n`
      : "";

  const content = `---
title: ${yamlEscape(frontmatter.title)}
date: ${frontmatter.date}
excerpt: ${yamlEscape(frontmatter.excerpt)}
${tagsBlock}draft: ${frontmatter.draft}
---

${body}
`;

  fs.writeFileSync(filePath, content, "utf8");
}

function main() {
  const csv = fs.readFileSync(csvPath, "utf8");
  const records = parse(csv, {
    columns: true,
    skip_empty_lines: true,
    relax_quotes: true,
    relax_column_count: true,
  });

  fs.rmSync(postsDir, { recursive: true, force: true });
  fs.mkdirSync(postsDir, { recursive: true });
  fs.mkdirSync(pagesDir, { recursive: true });

  const usedSlugs = new Set();
  let introPost = null;

  for (const row of records) {
    const title = row.Title?.trim();
    const published = row.Published?.trim();
    const labels = row.Labels?.trim() || "";
    const status = row.Status?.trim()?.toUpperCase() || "LIVE";
    const html = row.Content || "";

    if (!published) {
      console.warn("Skipping row without publish date:", title || "(untitled)");
      continue;
    }

    const resolvedTitle =
      title ||
      `Update ${new Date(published).toISOString().slice(0, 10)}`;

    if (resolvedTitle.toLowerCase() === "intro :)") {
      introPost = { title: resolvedTitle, published, html };
      continue;
    }

    const slug = ensureUniqueSlug(slugify(resolvedTitle), usedSlugs, published);
    const markdown = htmlToMarkdown(html);
    const tags = parseTags(labels);
    const draft = status === "DRAFT";
    const excerpt = makeExcerpt(markdown, resolvedTitle);

    writePostMdx(path.join(postsDir, `${slug}.mdx`), {
      title: resolvedTitle,
      date: published,
      excerpt,
      tags,
      draft,
    }, markdown || "_No content imported._");
  }

  const aboutBody = introPost
    ? htmlToMarkdown(introPost.html)
    : "Welcome to How to thrive not survive.";

  fs.writeFileSync(
    path.join(pagesDir, "about.mdx"),
    `---
title: About
---

${aboutBody}
`,
    "utf8",
  );

  console.log(`Imported ${usedSlugs.size} posts and updated about page.`);
}

main();
