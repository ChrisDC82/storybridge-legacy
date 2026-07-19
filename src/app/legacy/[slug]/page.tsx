import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { legacyEntries } from "@/data/legacy-entries";

export const dynamicParams = false;

type LegacyDetailPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return legacyEntries.map((entry) => ({ slug: entry.slug }));
}

export async function generateMetadata({ params }: LegacyDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const entry = legacyEntries.find((item) => item.slug === slug);
  return entry
    ? { title: entry.title, description: entry.summary }
    : { title: "Legacy record not found" };
}

export default async function LegacyDetailPage({ params }: LegacyDetailPageProps) {
  const { slug } = await params;
  const entry = legacyEntries.find((item) => item.slug === slug);

  if (!entry) notFound();

  return (
    <article className="shell detail-shell">
      <nav className="breadcrumb" aria-label="Breadcrumb">
        <Link href="/legacy">Legacy timeline</Link>
        <span aria-hidden="true">/</span>
        <span aria-current="page">{entry.title}</span>
      </nav>
      <div className="detail-heading">
        <p className="eyebrow">{entry.category} · {entry.year}</p>
        <h1>{entry.title}</h1>
        <p className="lede">{entry.summary}</p>
      </div>
      <div className="demo-notice" role="note">
        <strong>Fictional demonstration record.</strong>{" "}This illustrative story is not a claim about a real
        institution, alumnus, student or historical achievement.
      </div>
      <div className="detail-grid">
        <div className="story-body">
          <h2>The demonstration story</h2>
          <p>{entry.fullStory}</p>
          <h2>Accuracy note</h2>
          <p>
            A future real contribution would retain the contributor&apos;s voice, label uncertainty,
            protect private details and require moderation before publication.
          </p>
        </div>
        <aside className="record-panel" aria-labelledby="record-details-heading">
          <h2 id="record-details-heading">Archive presentation</h2>
          <dl>
            <div><dt>Year</dt><dd>{entry.year}</dd></div>
            <div><dt>Category</dt><dd>{entry.category}</dd></div>
            <div><dt>Status</dt><dd>{entry.verificationStatus}</dd></div>
            <div><dt>Contributor</dt><dd>{entry.contributorDisplayName}</dd></div>
            <div><dt>Relationship</dt><dd>{entry.contributorRelationship}</dd></div>
            {entry.location ? <div><dt>Location</dt><dd>{entry.location}</dd></div> : null}
          </dl>
        </aside>
      </div>
      <Link className="button secondary" href="/legacy">← Back to the timeline</Link>
    </article>
  );
}
