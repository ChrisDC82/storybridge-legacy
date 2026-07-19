import Image from "next/image";
import Link from "next/link";

const impactPathways = [
  ["Mentorship", "Alumni can help students navigate education and early career choices."],
  ["Career talks", "Professionals can bring practical context into classrooms from near or far."],
  ["Internships", "Partners can express interest in future work-based learning opportunities."],
  ["Scholarships", "Alumni groups can explore transparent support for student access and participation."],
  ["Programmes and equipment", "Support can strengthen clubs, learning spaces and priority school programmes."],
  ["International introductions", "Diaspora relationships can open conversations with institutions and professional networks."],
  ["Youth-enterprise advice", "Experienced alumni can challenge ideas, review plans and share hard-won lessons."],
  ["Responsible investment pathways", "Future connections may introduce promising initiatives to suitable advisers or investors—without guarantees."],
];

const steps = [
  ["01", "Preserve stories", "Gather memories, photographs and context before they disappear into scattered personal archives."],
  ["02", "Review and verify", "Moderators protect privacy, label uncertainty and distinguish remembered experience from verified fact."],
  ["03", "Reconnect alumni", "Help local and diaspora alumni rediscover a shared story and signal how they may wish to contribute."],
  ["04", "Link legacy to opportunity", "Turn restored relationships into realistic mentorship, support and partnership pathways."],
];

export default function Home() {
  return (
    <>
      <section className="hero home-hero">
        <div className="shell hero-grid">
          <div className="hero-copy">
            <p className="eyebrow">A living digital time capsule</p>
            <h1>Preserve the stories that shaped us. Reconnect the people who can shape what comes next.</h1>
            <p className="lede">
              StoryBridge Legacy connects institutional memory with alumni mentorship,
              programme support and opportunity—across Trinidad and Tobago, the Caribbean and the global diaspora.
            </p>
            <div className="actions" aria-label="Primary StoryBridge actions">
              <Link className="button primary" href="/legacy">Explore the Legacy</Link>
              <Link className="button secondary" href="/contribute">Share a Story</Link>
            </div>
            <div className="text-actions" aria-label="More ways to participate">
              <Link href="/alumni">Join the Alumni Network <span aria-hidden="true">→</span></Link>
              <Link href="/engage">Offer Support <span aria-hidden="true">→</span></Link>
            </div>
          </div>
          <div className="brand-logo-frame">
            <Image
              className="brand-logo-image"
              src="/branding/storybridge-legacy-logo.png"
              alt="StoryBridge Legacy. Our Stories. Our Heritage. Our Future. Preserve Our Past. Connect Generations. Link Legacy to Opportunity."
              width={1536}
              height={1024}
              priority
              sizes="(max-width: 780px) 140vw, (max-width: 1200px) 48vw, 560px"
            />
          </div>
        </div>
      </section>

      <section className="section section-light" aria-labelledby="challenge-heading">
        <div className="shell split-section">
          <div>
            <p className="eyebrow">The challenge and the opportunity</p>
            <h2 id="challenge-heading">History is often present—but scattered.</h2>
          </div>
          <div className="prose-stack">
            <p>
              School history can live across yearbooks, boxes, photographs, social platforms and private memories.
              At the same time, alumni networks may become fragmented across countries and generations.
            </p>
            <p>
              Migration of skilled professionals can distance expertise from present students, while limited educational
              resources and unequal access to global professional networks constrain opportunity. These are structural
              realities, not a lack of talent or ambition.
            </p>
            <p>
              StoryBridge Legacy helps communities move from <strong>brain drain to brain circulation</strong> by restoring
              relationships through which knowledge, introductions and resources can travel in both directions.
              Technology can support that work; people, trust and long-term institutional commitment make it meaningful.
            </p>
          </div>
        </div>
      </section>

      <section className="section navy-section" aria-labelledby="works-heading">
        <div className="shell">
          <p className="eyebrow">How it works</p>
          <h2 id="works-heading">From memory to meaningful connection</h2>
          <ol className="steps-grid">
            {steps.map(([number, title, description]) => (
              <li key={number}>
                <span className="step-number">{number}</span>
                <h3>{title}</h3>
                <p>{description}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section" aria-labelledby="pathways-heading">
        <div className="shell">
          <div className="section-heading-row">
            <div>
              <p className="eyebrow">Impact pathways</p>
              <h2 id="pathways-heading">Legacy can become a bridge to opportunity.</h2>
            </div>
            <p>
              These are expressions of interest and future pathways—not promises of funding,
              placements or investment outcomes.
            </p>
          </div>
          <div className="pathway-grid">
            {impactPathways.map(([title, description], index) => (
              <article className="pathway-card" key={title}>
                <span aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
                <h3>{title}</h3>
                <p>{description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section scale-section" aria-labelledby="scale-heading">
        <div className="shell scale-grid">
          <div>
            <p className="eyebrow">Proposed scale</p>
            <h2 id="scale-heading">Rooted locally. Designed to connect widely.</h2>
            <p className="lede">
              The MVP begins with a proposed institutional pilot and a model that could later serve
              schools across Trinidad and Tobago, the Caribbean and the global diaspora.
            </p>
            <div className="demo-notice" role="note">
              <strong>Pilot status:</strong>{" "}CIC/St. Mary&apos;s College is a proposed pilot institution.
              It has not formally approved, adopted or endorsed StoryBridge Legacy.
            </div>
          </div>
          <ol className="scale-list">
            <li><span>01</span><div><h3>Proposed CIC pilot</h3><p>Test the approach with authorised content and real community feedback.</p></div></li>
            <li><span>02</span><div><h3>Trinidad and Tobago rollout</h3><p>Adapt the model for varied school histories, communities and governance needs.</p></div></li>
            <li><span>03</span><div><h3>Caribbean institutional network</h3><p>Share responsible practices for archives, mentorship and alumni engagement.</p></div></li>
            <li><span>04</span><div><h3>Global diaspora connection</h3><p>Make participation possible across distance without treating migration as permanent disconnection.</p></div></li>
          </ol>
        </div>
      </section>

      <section className="section trust-section" aria-labelledby="trust-heading">
        <div className="shell split-section">
          <div>
            <p className="eyebrow">Trust and accuracy</p>
            <h2 id="trust-heading">A living archive must still be a careful archive.</h2>
          </div>
          <ul className="trust-list">
            <li><strong>Fictional demonstration data:</strong>{" "}Build Week records are visibly labelled and do not claim real CIC history.</li>
            <li><strong>Moderation first:</strong>{" "}Contributions require review before they can become public.</li>
            <li><strong>Human review of AI:</strong>{" "}AI-assisted wording must be checked by the contributor and must never invent facts.</li>
            <li><strong>Privacy by design:</strong>{" "}Contributor email addresses and other private details are not displayed publicly.</li>
          </ul>
        </div>
      </section>

      <section className="closing-cta" aria-labelledby="closing-heading">
        <div className="shell closing-grid">
          <div>
            <p className="eyebrow">Our Stories. Our Heritage. Our Future.</p>
            <h2 id="closing-heading">Start with a story. Rebuild a connection.</h2>
          </div>
          <div>
            <p>See how a carefully moderated legacy timeline can make memory useful to the next generation.</p>
            <div className="actions">
              <Link className="button light-button" href="/legacy">Explore the Legacy</Link>
              <Link className="button outline-light" href="/contribute">Share a Story</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
