import type { ReactNode } from "react";
import Logo from "./Logo";

export default function AuthShell({ title, subtitle, children, footer }: { title: string; subtitle: string; children: ReactNode; footer: ReactNode }) {
  return (
    <div className="container-page py-10 sm:py-16">
      <div className="mx-auto grid max-w-5xl overflow-hidden rounded-box border border-base-300 bg-base-100 lg:grid-cols-5">
        <aside className="board relative hidden flex-col justify-between p-8 lg:col-span-2 lg:flex">
          <Logo />
          <div className="-rotate-2 rounded-lg bg-base-100 p-5 shadow-lg">
            <div className="mb-3 h-1.5 w-12 rounded-full bg-secondary" />
            <p className="text-lg font-bold leading-snug">Blanket drive, Mohammadpur. Volunteers needed from 4 pm.</p>
            <p className="mt-2 text-sm text-base-content/60">Log in to join, or pin up your own.</p>
          </div>
        </aside>
        <section className="p-6 sm:p-10 lg:col-span-3">
          <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
          <p className="mt-2 text-base-content/70">{subtitle}</p>
          <div className="mt-8">{children}</div>
          <p className="mt-8 text-center text-sm text-base-content/70">{footer}</p>
        </section>
      </div>
    </div>
  );
}
