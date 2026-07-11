"use client";

import { TinaMarkdown } from "tinacms/dist/rich-text";
import { useTina } from "tinacms/dist/react";

import type { PostQuery, PostQueryVariables } from "@/tina/__generated__/types";

type PostBodyProps = {
  query: string;
  variables: PostQueryVariables;
  data: PostQuery;
};

export function PostBody({ query, variables, data }: PostBodyProps) {
  const { data: liveData } = useTina({ query, variables, data });

  if (!liveData.post.body) {
    return null;
  }

  return (
    <div className="y2k-prose">
      <TinaMarkdown content={liveData.post.body} />
    </div>
  );
}
