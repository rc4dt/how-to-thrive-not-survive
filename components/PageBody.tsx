"use client";

import { TinaMarkdown } from "tinacms/dist/rich-text";
import { useTina } from "tinacms/dist/react";

import type { PageQuery, PageQueryVariables } from "@/tina/__generated__/types";

type PageBodyProps = {
  query: string;
  variables: PageQueryVariables;
  data: PageQuery;
};

export function PageBody({ query, variables, data }: PageBodyProps) {
  const { data: liveData } = useTina({ query, variables, data });

  if (!liveData.page.body) {
    return null;
  }

  return (
    <div className="y2k-prose">
      <TinaMarkdown content={liveData.page.body} />
    </div>
  );
}
