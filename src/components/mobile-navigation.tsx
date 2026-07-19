"use client";

import Link from "next/link";
import { useRef } from "react";

type NavigationItem = { href: string; label: string };

export function MobileNavigation({ items }: { items: NavigationItem[] }) {
  const menuRef = useRef<HTMLDetailsElement>(null);

  return (
    <details className="mobile-nav" ref={menuRef}>
      <summary>Menu</summary>
      <nav aria-label="Mobile navigation">
        {items.map((item) => (
          <Link key={item.href} href={item.href} onClick={() => menuRef.current?.removeAttribute("open")}>
            {item.label}
          </Link>
        ))}
      </nav>
    </details>
  );
}
