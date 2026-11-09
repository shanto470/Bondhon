import type { ReactNode } from "react";

export default function Field({ label, error, hint, children }: { label: string; error?: string; hint?: string; children: ReactNode }) {
  return (
    <label className="block w-full">
      <span className="mb-1.5 block text-sm font-semibold">{label}</span>
      {children}
      {error ? (
        <span role="alert" className="mt-1.5 block text-sm text-error">{error}</span>
      ) : hint ? (
        <span className="mt-1.5 block text-xs text-base-content/60">{hint}</span>
      ) : null}
    </label>
  );
}
