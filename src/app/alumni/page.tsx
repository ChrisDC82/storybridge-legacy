import type { Metadata } from "next";
import Link from "next/link";
import { AlumniDirectory } from "@/components/alumni-directory";
import { alumniProfiles } from "@/data/alumni-profiles";

export const metadata: Metadata = {
  title: "Alumni directory",
  description: "Explore fictional alumni profiles demonstrating Caribbean and diaspora connections across professions, generations and geography.",
};

export default function AlumniPage() {
  return (
    <>
      <header className="page-hero alumni-hero"><div className="shell narrow-shell"><p className="eyebrow">Connect generations</p><h1>Knowledge can circulate across borders.</h1><p className="lede">Skilled migration can weaken direct institutional connections, but it does not have to end them. StoryBridge Legacy demonstrates how local and diaspora alumni can exchange knowledge, relationships and opportunity without treating either group as more valuable.</p><div className="demo-notice" role="note"><strong>Build Week demonstration:</strong> Every profile is fictional. None describes a real alumnus, employer, award or confirmed offer.</div><div className="actions"><Link className="button light-button" href="/engage">Offer support</Link></div></div></header>
      <section className="section circulation-section"><div className="shell split-section"><div><p className="eyebrow">From brain drain to brain circulation</p><h2>Connection, not judgement.</h2></div><div className="prose-stack"><p>Migration is not betrayal, and overseas experience is not inherently more important than local knowledge. The opportunity is to keep relationships active so mentoring, partnerships, fundraising readiness, scholarships, programme support and responsible enterprise conversations can move in more than one direction.</p><p>This directory demonstrates possibilities only. It does not guarantee mentorship, placements, funding, investment, introductions or institutional participation.</p></div></div></section>
      <div className="shell directory-shell"><AlumniDirectory profiles={alumniProfiles} /></div>
    </>
  );
}
