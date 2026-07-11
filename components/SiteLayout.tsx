import type { ReactNode } from "react";

import { LeftNav, Sidebar } from "@/components/Sidebar";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";

type SiteLayoutProps = {
  children: ReactNode;
  tags?: string[];
};

export function SiteLayout({ children, tags = [] }: SiteLayoutProps) {
  return (
    <div className="y2k-page">
      <SiteHeader />
      <div className="y2k-shell">
        <LeftNav />
        <main className="y2k-main">{children}</main>
        <Sidebar tags={tags} />
      </div>
      <SiteFooter />
    </div>
  );
}
