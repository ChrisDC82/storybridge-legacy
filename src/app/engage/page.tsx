import type { Metadata } from "next";
import Link from "next/link";
import { EngagementForm } from "@/components/engagement-form";

export const metadata: Metadata = { title: "Engagement opportunities", description: "Explore ways to share knowledge, create access, strengthen institutions and support future enterprise through a local demonstration expression of interest." };

const pathways = [
  { number: "01", title: "Share knowledge", items: ["Mentor a student", "Deliver a career session", "Review a portfolio", "Support a student project"] },
  { number: "02", title: "Create access", items: ["Offer an internship", "Arrange job shadowing", "Make an international introduction", "Connect students to training or educational opportunities"] },
  { number: "03", title: "Strengthen institutions", items: ["Support a club", "Sponsor equipment", "Contribute to a scholarship", "Assist with fundraising", "Provide professional services"] },
  { number: "04", title: "Support future enterprise", items: ["Advise a youth entrepreneur", "Review a business concept", "Facilitate a responsible investment introduction", "Support innovation challenges"] },
];

export default function EngagePage() {
  return (
    <>
      <header className="page-hero engage-hero"><div className="shell narrow-shell"><p className="eyebrow">Link legacy to opportunity</p><h1>Contribute time, expertise, relationships or resources.</h1><p className="lede">Renewed alumni relationships can support mentorship, scholarships, programme sponsorship, equipment, diaspora philanthropy, international partnerships and responsible entrepreneurship conversations—without guaranteeing any outcome.</p><div className="demo-notice" role="note"><strong>Demonstration boundaries:</strong> No money is processed, no placement or funding is promised, and no investor, donor or partner is claimed.</div></div></header>
      <section className="section"><div className="shell"><div className="section-heading-row"><div><p className="eyebrow">Four pathways</p><h2>Many ways to remain connected.</h2></div><p>Local alumni, diaspora alumni, educators, families and partners can each contribute useful knowledge and relationships. Support should be safe, specific and shaped around real institutional needs.</p></div><div className="engagement-pathways">{pathways.map((pathway) => <article key={pathway.number}><span>{pathway.number}</span><h3>{pathway.title}</h3><ul>{pathway.items.map((item) => <li key={item}>{item}</li>)}</ul></article>)}</div></div></section>
      <section className="funding-boundary"><div className="shell split-section"><div><p className="eyebrow">Responsible boundaries</p><h2>Connection before transaction.</h2></div><div className="prose-stack"><p>A stronger alumni network can create foundations for fundraising campaigns, scholarships, programme and equipment support, diaspora philanthropy and international partnerships. It can also help young people receive entrepreneurship guidance or, in an appropriate future setting, responsible investment introductions.</p><p>StoryBridge Legacy does not sell investments, promise returns, collect donations, present financial products to minors or claim confirmed funding. Any future financial activity would require separate governance, safeguarding and professional review.</p><Link className="detail-link" href="/alumni">Explore the fictional alumni directory →</Link></div></div></section>
      <div className="shell engagement-form-shell"><EngagementForm /></div>
    </>
  );
}
