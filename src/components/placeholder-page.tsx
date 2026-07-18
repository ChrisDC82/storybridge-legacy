import type { ReactNode } from "react";

type PlaceholderPageProps = {
  eyebrow: string;
  title: string;
  description: string;
  children: ReactNode;
};

export function PlaceholderPage({ eyebrow, title, description, children }: PlaceholderPageProps) {
  return (
    <div className="shell page-shell">
      <p className="eyebrow">{eyebrow}</p>
      <h1>{title}</h1>
      <p className="lede">{description}</p>
      <section className="placeholder-panel" aria-label={`${title} scaffold status`}>
        <h2>Scaffold ready</h2>
        {children}
      </section>
    </div>
  );
}
