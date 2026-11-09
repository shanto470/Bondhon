import Link from "next/link";

export default function Logo({ light = false }: { light?: boolean }) {
  return (
    <Link href="/" className="flex items-center gap-2.5" aria-label="Bondhon home">
      <svg width="34" height="24" viewBox="0 0 34 24" aria-hidden="true">
        <circle cx="12" cy="12" r="11" fill="var(--color-primary)" />
        <circle cx="22" cy="12" r="11" fill="var(--color-secondary)" fillOpacity="0.9" />
      </svg>
      <span className={`text-2xl font-extrabold tracking-tight ${light ? "text-neutral-content" : ""}`}>
        Bondhon
      </span>
    </Link>
  );
}
