"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import EmptyState from "@/components/EmptyState";
import EventCard from "@/components/EventCard";
import { EventGridSkeleton } from "@/components/EventSkeleton";
import PageHeader from "@/components/PageHeader";
import { api } from "@/lib/api";
import { useSession } from "@/lib/auth-client";
import { confirmDialog } from "@/lib/dialog";
import type { EventItem } from "@/lib/types";
import { errMsg, todayStr } from "@/lib/utils";

export default function JoinedEventsPage() {
  const { data: session } = useSession();
  const email = session?.user.email;
  const [events, setEvents] = useState<EventItem[] | null>(null);

  useEffect(() => {
    if (!email) return;
    api<EventItem[]>(`/joined-events/${encodeURIComponent(email)}`, { auth: true })
      .then(setEvents)
      .catch((e) => { toast.error(errMsg(e)); setEvents([]); });
  }, [email]);

  const leave = async (ev: EventItem) => {
    const { isConfirmed } = await confirmDialog("Leave this event?", `You'll no longer be signed up for "${ev.title}".`, "Leave event");
    if (!isConfirmed) return;
    try {
      await api(`/join-event/${ev._id}`, { method: "DELETE", auth: true });
      setEvents((list) => list?.filter((x) => x._id !== ev._id) ?? null);
      toast.success("You've left the event.");
    } catch (e) {
      toast.error(errMsg(e));
    }
  };

  return (
    <>
      <PageHeader title="Events you joined" subtitle="Sorted by date, so the next one you're showing up for comes first." />
      <div className="container-page py-10">
        {events === null ? (
          <EventGridSkeleton count={3} />
        ) : events.length === 0 ? (
          <EmptyState title="You haven't joined any events yet" text="Find something happening near you and click Join Event." href="/events" cta="Browse events" />
        ) : (
          <div className="event-grid">
            {events.map((ev) => (
              <EventCard key={ev._id} event={ev}>
                {ev.eventDate >= todayStr() ? (
                  <button onClick={() => leave(ev)} className="btn btn-ghost btn-block btn-sm">Leave event</button>
                ) : (
                  <p className="text-center text-sm text-base-content/60">This event has ended</p>
                )}
              </EventCard>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
