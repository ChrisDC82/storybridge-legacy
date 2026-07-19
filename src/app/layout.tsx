import type { Metadata } from "next";
import Link from "next/link";
import { MobileNavigation } from "@/components/mobile-navigation";
import "./globals.css";

const navigation = [
  { href: "/legacy", label: "Legacy" },
  { href: "/contribute", label: "Share a story" },
  { href: "/alumni", label: "Alumni" },
  { href: "/engage", label: "Offer support" },
  { href: "/impact", label: "Impact" },
  { href: "/admin", label: "Demo admin" },
];

export const metadata: Metadata = {
  title: {
    default: "StoryBridge Legacy",
    template: "%s | StoryBridge Legacy",
  },
  description:
    "A living digital time capsule connecting Caribbean institutional memory with alumni mentorship, support and opportunity.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
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
            <MobileNavigation items={navigation} />
          </div>
        </header>
        <div className="pilot-notice" role="note">
          <div className="shell">
            CIC/St. Mary&apos;s College is a proposed pilot only. This competition version uses fictional
            demonstration data and claims no institutional endorsement.
          </div>
        </div>
        <main id="main-content">{children}</main>
        <footer className="site-footer">
          <div className="shell footer-grid">
            <div>
              <p className="footer-brand">StoryBridge Legacy</p>
              <p>Our Stories. Our Heritage. Our Future.</p>
              <p className="footer-small">A Forward Ever Foundation Build Week project.</p>
            </div>
            <nav className="footer-nav" aria-label="Footer navigation">
              <p className="footer-heading">Explore</p>
              <Link href="/legacy">Legacy timeline</Link>
              <Link href="/contribute">Share a story</Link>
              <Link href="/alumni">Alumni network</Link>
              <Link href="/impact">Impact and scale</Link>
            </nav>
            <div>
              <p className="footer-heading">Trust the record</p>
              <p className="footer-small">
                Demonstration stories are fictional. Real contributions will require consent,
                moderation and careful historical review.
              </p>
            </div>
          </div>
          <div className="shell footer-bottom">
            <p>Preserve Our Past · Connect Generations · Link Legacy to Opportunity</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
