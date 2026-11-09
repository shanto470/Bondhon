import Link from "next/link";
import EmptyState from "../EmptyState";
import EventCard from "../EventCard";
import { api } from "@/lib/api";
import type { EventItem } from "@/lib/types";

export default async function UpcomingEvents() {
  let events: EventItem[] = [];
  let failed = false;
  try {
    events = await api<EventItem[]>("/featured-events");
  } catch {
    failed = true;
  }

  if (failed)
    return <EmptyState title="Events can't load right now" text="We couldn't reach the server. Check your connection and refresh the page." />;
  if (!events.length)
    return <EmptyState title="No upcoming events yet" text="Be the first to pin one up for your neighbourhood." href="/create-event" cta="Create an event" />;

  return (
    <>
      <div className="event-grid">
        {events.map((e) => <EventCard key={e._id} event={e} />)}
      </div>
      <div className="mt-10 text-center">
        <Link href="/events" className="btn btn-outline">See all upcoming events</Link>
      </div>
    </>
  );
}
