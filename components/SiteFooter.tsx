import Link from "next/link";

import { MarqueeText } from "@/components/y2k/MarqueeText";
import { siteConfig } from "@/lib/site";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="y2k-footer">
      <MarqueeText>
        ★ best viewed in 1024x768 ★ how to thrive not survive ★ updated{" "}
        {year} ★ made with love and pink ★
      </MarqueeText>
      <div className="y2k-footer-inner">
        <p>
          © {year} {siteConfig.name}. All rights reserved.
        </p>
        <p className="y2k-blink-cursor">
          Thanks for visiting<span className="y2k-cursor">_</span>
        </p>
        <p>
          <Link href="/feed.xml">RSS feed</Link>
        </p>
      </div>
    </footer>
  );
}
