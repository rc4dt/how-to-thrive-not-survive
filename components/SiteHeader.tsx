import Link from "next/link";

import { siteConfig } from "@/lib/site";

export function SiteHeader() {
  return (
    <header className="y2k-header">
      <div className="y2k-header-banner">
        <div className="y2k-sparkles" aria-hidden="true" />
        <p className="y2k-header-kicker">welcome to my homepage ~*</p>
        <h1 className="y2k-site-title">
          <Link href="/">{siteConfig.name}</Link>
        </h1>
        <p className="y2k-header-tagline">{siteConfig.tagline}</p>
      </div>
    </header>
  );
}
