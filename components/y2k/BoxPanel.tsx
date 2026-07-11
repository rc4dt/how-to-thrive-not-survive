import type { ReactNode } from "react";

type BoxPanelProps = {
  title: string;
  children: ReactNode;
  className?: string;
};

export function BoxPanel({ title, children, className = "" }: BoxPanelProps) {
  return (
    <section className={`y2k-panel ${className}`}>
      <h2 className="y2k-panel-title">{title}</h2>
      <div className="y2k-panel-body">{children}</div>
    </section>
  );
}
