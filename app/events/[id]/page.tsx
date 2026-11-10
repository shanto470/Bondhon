import Link from "next/link";
import { notFound } from "next/navigation";
import { LuArrowLeft, LuCalendarDays, LuMapPin, LuUser, LuUsers } from "react-icons/lu";
import JoinButton from "@/components/JoinButton";
import { api } from "@/lib/api";
import type { EventItem } from "@/lib/types";
import { daysUntil, formatDate, whenLabel } from "@/lib/utils";

export default async function EventDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  let event: EventItem;
  try {
    event = await api<EventItem>(`/event/${id}`);
  } catch {
    notFound();
  }

  const ended = daysUntil(event.eventDate) < 0;
  const rows = [
    { icon: LuCalendarDays, label: "Date", value: formatDate(event.eventDate) },
    { icon: LuMapPin, label: "Location", value: event.location },
    { icon: LuUsers, label: "Volunteers", value: `${event.participants ?? 0} joined` },
    { icon: LuUser, label: "Organised by", value: event.organizer || "A Bondhon member" },
  ];

  return (
    <div className="container-page py-8 sm:py-12">
      <Link href="/events" className="btn btn-ghost btn-sm mb-6 -ml-3"><LuArrowLeft /> All events</Link>
      <div className="grid gap-10 lg:grid-cols-3">
        <article className="lg:col-span-2">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={event.thumbnail} alt={event.title} className="aspect-video w-full rounded-box border border-base-300 bg-base-300 object-cover" />
          <div className="mt-6 flex flex-wrap items-center gap-2">
            <span className="badge badge-secondary border-0 font-semibold">{event.eventType}</span>
            <span className={`badge ${ended ? "badge-ghost" : "badge-primary badge-outline"}`}>{whenLabel(event.eventDate)}</span>
          </div>
          <h1 className="section-title mt-4">{event.title}</h1>
          <p className="mt-6 max-w-prose whitespace-pre-line text-lg leading-relaxed text-base-content/80">{event.description}</p>
        </article>

        <aside className="lg:sticky lg:top-24 lg:self-start">
          <div className="rounded-box border border-base-300 bg-base-100 p-6">
            <ul className="space-y-4">
              {rows.map(({ icon: Icon, label, value }) => (
                <li key={label} className="flex gap-3">
                  <Icon className="mt-1 shrink-0 text-primary" />
                  <div>
                    <p className="text-sm text-base-content/60">{label}</p>
                    <p className="font-semibold">{value}</p>
                  </div>
                </li>
              ))}
            </ul>
            <div className="mt-6"><JoinButton eventId={event._id} ended={ended} /></div>
          </div>
        </aside>
      </div>
    </div>
  );
}
