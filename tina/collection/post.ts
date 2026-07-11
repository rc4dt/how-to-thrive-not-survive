import type { Collection } from "tinacms";

const Post: Collection = {
  name: "post",
  label: "Posts",
  path: "content/posts",
  format: "mdx",
  ui: {
    router: ({ document }) => `/blog/${document._sys.filename}`,
  },
  fields: [
    {
      type: "string",
      name: "title",
      label: "Title",
      isTitle: true,
      required: true,
    },
    {
      type: "datetime",
      name: "date",
      label: "Date",
      required: true,
    },
    {
      type: "string",
      name: "excerpt",
      label: "Excerpt",
      ui: { component: "textarea" },
    },
    {
      type: "string",
      name: "tags",
      label: "Tags",
      list: true,
    },
    {
      type: "boolean",
      name: "draft",
      label: "Draft",
    },
    {
      type: "rich-text",
      name: "body",
      label: "Body",
      isBody: true,
    },
  ],
};

export default Post;
