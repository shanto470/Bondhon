import Link from "next/link";

export default function NotFound() {
  return (
    <div className="container-page flex flex-col items-center py-28 text-center">
      <h1 className="section-title">We couldn't find that page</h1>
      <p className="section-sub">The event may have been deleted, or the link is mistyped.</p>
      <Link href="/events" className="btn btn-primary mt-8">See upcoming events</Link>
    </div>
  );
}
