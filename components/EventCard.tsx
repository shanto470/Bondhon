import Link from "next/link";
import type { ReactNode } from "react";
import { LuCalendarDays, LuMapPin, LuUsers } from "react-icons/lu";
import type { EventItem } from "@/lib/types";
import { formatDate } from "@/lib/utils";

export default function EventCard({ event, children }: { event: EventItem; children?: ReactNode }) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-box border border-base-300 bg-base-100 transition-shadow duration-300 hover:shadow-xl">
      <figure className="relative h-48 shrink-0 overflow-hidden bg-base-300">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={event.thumbnail}
          alt={event.title}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <span className="badge badge-secondary absolute left-3 top-3 border-0 font-semibold">{event.eventType}</span>
      </figure>
      <div className="flex flex-1 flex-col gap-3 p-5">
        <h3 className="line-clamp-1 text-xl font-bold leading-snug" title={event.title}>{event.title}</h3>
        <ul className="space-y-1.5 text-sm text-base-content/70">
          <li className="flex items-center gap-2"><LuMapPin className="shrink-0 text-primary" /><span className="line-clamp-1">{event.location}</span></li>
          <li className="flex items-center gap-2"><LuCalendarDays className="shrink-0 text-primary" />{formatDate(event.eventDate)}</li>
          <li className="flex items-center gap-2"><LuUsers className="shrink-0 text-primary" />{event.participants ?? 0} joined</li>
        </ul>
        <p className="line-clamp-2 min-h-10 text-sm leading-5 text-base-content/70">{event.description}</p>
        <div className="mt-auto space-y-2 pt-2">
          <Link href={`/events/${event._id}`} className="btn btn-primary btn-block">View Event</Link>
          {children}
        </div>
      </div>
    </article>
  );
}
