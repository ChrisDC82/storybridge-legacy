import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { alumniProfiles } from "@/data/alumni-profiles";

export const dynamicParams = false;
type AlumniDetailProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() { return alumniProfiles.map((profile) => ({ slug: profile.slug })); }

export async function generateMetadata({ params }: AlumniDetailProps): Promise<Metadata> {
  const { slug } = await params;
  const profile = alumniProfiles.find((item) => item.slug === slug);
  return profile ? { title: `${profile.displayName} — fictional profile`, description: profile.shortBiography } : { title: "Alumni profile not found" };
}

export default async function AlumniDetailPage({ params }: AlumniDetailProps) {
  const { slug } = await params;
  const profile = alumniProfiles.find((item) => item.slug === slug);
  if (!profile) notFound();
  const initials = profile.displayName.split(" ").map((part) => part[0]).join("").slice(0, 2);
  return (
    <article className="shell detail-shell alumni-detail">
      <nav className="breadcrumb" aria-label="Breadcrumb"><Link href="/alumni">Alumni directory</Link><span aria-hidden="true">/</span><span aria-current="page">{profile.displayName}</span></nav>
      <div className="profile-detail-heading"><div className="alumni-initials alumni-initials-large" aria-hidden="true">{initials}</div><div><p className="eyebrow">Fictional demonstration profile · Class of {profile.graduationYear}</p><h1>{profile.displayName}</h1><p className="lede">{profile.profession} · {profile.countryOrRegion}</p></div></div>
      <div className="demo-notice" role="note"><strong>Illustrative record only.</strong> This person, professional history and availability are fictional. The page does not provide a way to contact them.</div>
      <div className="detail-grid">
        <div className="story-body"><h2>Professional background</h2><p>{profile.shortBiography}</p><h2>Legacy statement</h2><blockquote>{profile.legacyStatement}</blockquote><h2>How this profile may help</h2><ul>{profile.supportOffered.map((item) => <li key={item}>{item}</li>)}</ul><h2>Mentorship interests</h2><ul>{profile.mentorshipInterests.map((item) => <li key={item}>{item}</li>)}</ul></div>
        <aside className="record-panel" aria-labelledby="profile-details-heading"><h2 id="profile-details-heading">Profile details</h2><dl><div><dt>Profession</dt><dd>{profile.profession}</dd></div><div><dt>Industry</dt><dd>{profile.industry}</dd></div><div><dt>Location</dt><dd>{profile.countryOrRegion}</dd></div><div><dt>Graduation year</dt><dd>{profile.graduationYear}</dd></div><div><dt>Availability</dt><dd>{profile.availability}</dd></div>{profile.languages ? <div><dt>Languages</dt><dd>{profile.languages.join(", ")}</dd></div> : null}</dl><h3>Expertise</h3><ul className="tag-list">{profile.expertiseAreas.map((item) => <li key={item}>{item}</li>)}</ul></aside>
      </div>
      <div className="profile-actions"><Link className="button primary" href="/engage">Express similar interest</Link><Link className="button secondary" href="/alumni">← Back to directory</Link></div>
    </article>
  );
}
