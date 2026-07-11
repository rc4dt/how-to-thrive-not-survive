// tina/config.ts
import { defineConfig } from "tinacms";

// tina/collection/page.ts
var Page = {
  name: "page",
  label: "Pages",
  path: "content/pages",
  format: "mdx",
  ui: {
    router: ({ document }) => {
      if (document._sys.filename === "about") {
        return "/about";
      }
      return `/${document._sys.filename}`;
    }
  },
  fields: [
    {
      type: "string",
      name: "title",
      label: "Title",
      isTitle: true,
      required: true
    },
    {
      type: "rich-text",
      name: "body",
      label: "Body",
      isBody: true
    }
  ]
};
var page_default = Page;

// tina/collection/post.ts
var Post = {
  name: "post",
  label: "Posts",
  path: "content/posts",
  format: "mdx",
  ui: {
    router: ({ document }) => `/blog/${document._sys.filename}`
  },
  fields: [
    {
      type: "string",
      name: "title",
      label: "Title",
      isTitle: true,
      required: true
    },
    {
      type: "datetime",
      name: "date",
      label: "Date",
      required: true
    },
    {
      type: "string",
      name: "excerpt",
      label: "Excerpt",
      ui: { component: "textarea" }
    },
    {
      type: "string",
      name: "tags",
      label: "Tags",
      list: true
    },
    {
      type: "boolean",
      name: "draft",
      label: "Draft"
    },
    {
      type: "rich-text",
      name: "body",
      label: "Body",
      isBody: true
    }
  ]
};
var post_default = Post;

// tina/config.ts
var branch = process.env.NEXT_PUBLIC_TINA_BRANCH || process.env.VERCEL_GIT_COMMIT_REF || process.env.HEAD || "main";
var config_default = defineConfig({
  branch,
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID || "",
  token: process.env.TINA_TOKEN || "",
  build: {
    outputFolder: "admin",
    publicFolder: "public"
  },
  media: {
    tina: {
      mediaRoot: "uploads",
      publicFolder: "public"
    }
  },
  schema: {
    collections: [post_default, page_default]
  }
});
export {
  config_default as default
};
