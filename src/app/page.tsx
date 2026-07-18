import Link from "next/link";

export default function Home() {
  return (
    <>
      <section className="hero">
        <div className="shell hero-grid">
          <div>
            <p className="eyebrow">Preserve our past · Connect generations</p>
            <h1>Our stories can keep building futures.</h1>
            <p className="lede">
              StoryBridge Legacy is a living digital time capsule and alumni-engagement
              platform for Caribbean schools and their global communities.
            </p>
            <div className="actions" aria-label="StoryBridge actions">
              <Link className="button primary" href="/legacy">Explore the Legacy</Link>
              <Link className="button secondary" href="/contribute">Share a Story</Link>
            </div>
          </div>
          <aside className="archive-card" aria-label="Project vision">
            <p className="card-kicker">The bridge</p>
            <h2>From brain drain to brain circulation</h2>
            <p>
              Migration does not have to mean permanent disconnection. Alumni can
              share knowledge, relationships and opportunity across generations.
            </p>
          </aside>
        </div>
      </section>
      <section className="section shell" aria-labelledby="next-heading">
        <p className="eyebrow">Initial scaffold</p>
        <h2 id="next-heading">A foundation for stories, people and opportunity</h2>
        <div className="card-grid">
          <article className="info-card"><h3>Preserve</h3><p>Build a trusted record of school life and institutional memory.</p></article>
          <article className="info-card"><h3>Reconnect</h3><p>Help alumni across the diaspora remain part of the community.</p></article>
          <article className="info-card"><h3>Open pathways</h3><p>Turn restored relationships into mentorship and future support.</p></article>
        </div>
      </section>
    </>
  );
}
