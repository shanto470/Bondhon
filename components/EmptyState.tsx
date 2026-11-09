import Link from "next/link";

export default function EmptyState({ title, text, href, cta }: { title: string; text: string; href?: string; cta?: string }) {
  return (
    <div className="mx-auto flex max-w-md flex-col items-center rounded-box border border-dashed border-base-300 px-6 py-14 text-center">
      <h3 className="text-xl font-bold">{title}</h3>
      <p className="mt-2 text-base-content/70">{text}</p>
      {href && cta && <Link href={href} className="btn btn-primary mt-6">{cta}</Link>}
    </div>
  );
}
