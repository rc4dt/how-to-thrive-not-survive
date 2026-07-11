"use client";

import type { ReactNode } from "react";

type MarqueeTextProps = {
  children: ReactNode;
};

export function MarqueeText({ children }: MarqueeTextProps) {
  const content = (
    <>
      {children}
      <span aria-hidden="true"> ★ </span>
      {children}
    </>
  );

  return (
    <div className="y2k-marquee" aria-hidden="true">
      <div className="y2k-marquee-track">{content}</div>
    </div>
  );
}
