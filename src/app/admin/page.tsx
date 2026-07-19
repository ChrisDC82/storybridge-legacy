import type { Metadata } from "next";
import { AdminDashboard } from "@/components/admin-dashboard";

export const metadata: Metadata = { title: "Demonstration Admin Dashboard", description: "Review browser-local fictional story submissions through a bounded human-moderation demonstration." };

export default function AdminPage() {
  return (
    <>
      <header className="page-hero admin-hero"><div className="shell narrow-shell"><p className="eyebrow">Demonstration area</p><h1>Demonstration Admin Dashboard</h1><p className="lede">Review locally stored story contributions, compare original and final drafts, and demonstrate reversible human moderation before any possible archive publication.</p><div className="demo-notice" role="note"><strong>Build Week demonstration only.</strong> There is no production authentication. Records exist only in this browser. CIC/St. Mary’s College is a proposed pilot and has not formally endorsed this MVP. Do not enter real institutional, student or sensitive data.</div></div></header>
      <div className="shell admin-shell"><AdminDashboard /></div>
    </>
  );
}
