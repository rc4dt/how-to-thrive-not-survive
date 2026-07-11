import Link from "next/link";

import { BoxPanel } from "@/components/y2k/BoxPanel";
import { HitCounter } from "@/components/y2k/HitCounter";
import { navLinks, siteConfig } from "@/lib/site";

type SidebarProps = {
  tags: string[];
};

export function Sidebar({ tags }: SidebarProps) {
  return (
    <aside className="y2k-sidebar space-y-4">
      <BoxPanel title="Navigate">
        <nav aria-label="Primary">
          <ul className="y2k-link-list">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href}>{link.label}</Link>
              </li>
            ))}
          </ul>
        </nav>
      </BoxPanel>

      <BoxPanel title="About">
        <p className="text-sm leading-relaxed">{siteConfig.about}</p>
        <p className="mt-3">
          <Link href="/about" className="y2k-inline-link">
            Read more →
          </Link>
        </p>
      </BoxPanel>

      <BoxPanel title="Currently">
        <dl className="y2k-currently">
          <div>
            <dt>Listening</dt>
            <dd>{siteConfig.currently.listening}</dd>
          </div>
          <div>
            <dt>Reading</dt>
            <dd>{siteConfig.currently.reading}</dd>
          </div>
          <div>
            <dt>Feeling</dt>
            <dd>{siteConfig.currently.feeling}</dd>
          </div>
        </dl>
      </BoxPanel>

      {tags.length > 0 && (
        <BoxPanel title="Tags">
          <ul className="y2k-tag-cloud">
            {tags.map((tag) => (
              <li key={tag}>
                <span className="y2k-tag">#{tag}</span>
              </li>
            ))}
          </ul>
        </BoxPanel>
      )}

      <BoxPanel title="Blogroll">
        <ul className="y2k-link-list">
          {siteConfig.blogroll.map((link) => (
            <li key={link.href}>
              <a href={link.href} target="_blank" rel="noreferrer">
                {link.name}
              </a>
            </li>
          ))}
        </ul>
      </BoxPanel>

      <BoxPanel title="Stats">
        <HitCounter />
      </BoxPanel>
    </aside>
  );
}

export function LeftNav() {
  return (
    <nav className="y2k-left-nav" aria-label="Section navigation">
      <BoxPanel title="Menu">
        <ul className="y2k-link-list">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link href={link.href}>{link.label}</Link>
            </li>
          ))}
        </ul>
      </BoxPanel>
    </nav>
  );
}
