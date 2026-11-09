import type { ReactNode } from "react";

export default function PageHeader({ title, subtitle, action }: { title: string; subtitle?: string; action?: ReactNode }) {
  return (
    <div className="border-b border-base-300 bg-base-200">
      <div className="container-page flex flex-col gap-4 py-10 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="section-title">{title}</h1>
          {subtitle && <p className="section-sub">{subtitle}</p>}
        </div>
        {action}
      </div>
    </div>
  );
}
