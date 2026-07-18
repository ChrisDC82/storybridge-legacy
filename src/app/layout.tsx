import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

const navigation = [
  { href: "/legacy", label: "Legacy" },
  { href: "/contribute", label: "Share a story" },
  { href: "/alumni", label: "Alumni" },
  { href: "/engage", label: "Engage" },
  { href: "/impact", label: "Impact" },
  { href: "/admin", label: "Demo admin" },
];

export const metadata: Metadata = {
  title: {
    default: "StoryBridge Legacy",
    template: "%s | StoryBridge Legacy",
  },
  description:
    "A living digital time capsule connecting Caribbean schools, alumni and future generations.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <a className="skip-link" href="#main-content">Skip to main content</a>
        <header className="site-header">
          <div className="shell header-inner">
            <Link className="wordmark" href="/" aria-label="StoryBridge Legacy home">
              <span>StoryBridge</span><strong>Legacy</strong>
            </Link>
            <nav className="desktop-nav" aria-label="Primary navigation">
              {navigation.map((item) => <Link key={item.href} href={item.href}>{item.label}</Link>)}
            </nav>
            <details className="mobile-nav">
              <summary>Menu</summary>
              <nav aria-label="Mobile navigation">
                {navigation.map((item) => <Link key={item.href} href={item.href}>{item.label}</Link>)}
              </nav>
            </details>
          </div>
        </header>
        <div className="pilot-notice" role="note">
          <div className="shell">
            CIC/St. Mary&apos;s College is a proposed pilot only. This competition
            version uses fictional demonstration data and claims no institutional endorsement.
          </div>
        </div>
        <main id="main-content">{children}</main>
        <footer className="site-footer">
          <div className="shell footer-grid">
            <div>
              <p className="footer-brand">StoryBridge Legacy</p>
              <p>Our Stories. Our Heritage. Our Future.</p>
            </div>
            <p>A Forward Ever Foundation Build Week project designed for future Caribbean and diaspora participation.</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
