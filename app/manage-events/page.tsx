"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { LuPencil, LuPlus, LuTrash2 } from "react-icons/lu";
import EmptyState from "@/components/EmptyState";
import PageHeader from "@/components/PageHeader";
import { api } from "@/lib/api";
import { useSession } from "@/lib/auth-client";
import { confirmDialog } from "@/lib/dialog";
import type { EventItem } from "@/lib/types";
import { errMsg, formatDate, whenLabel } from "@/lib/utils";

export default function ManageEventsPage() {
  const { data: session } = useSession();
  const email = session?.user.email;
  const [events, setEvents] = useState<EventItem[] | null>(null);

  useEffect(() => {
    if (!email) return;
    api<EventItem[]>(`/my-events/${encodeURIComponent(email)}`, { auth: true })
      .then(setEvents)
      .catch((e) => { toast.error(errMsg(e)); setEvents([]); });
  }, [email]);

  const remove = async (ev: EventItem) => {
    const { isConfirmed } = await confirmDialog("Delete this event?", `"${ev.title}" and its sign-ups will be removed for good.`, "Delete event");
    if (!isConfirmed) return;
    try {
      await api(`/event/${ev._id}`, { method: "DELETE", auth: true });
      setEvents((list) => list?.filter((x) => x._id !== ev._id) ?? null);
      toast.success("Event deleted.");
    } catch (e) {
      toast.error(errMsg(e));
    }
  };

  return (
    <>
      <PageHeader
        title="Manage your events"
        subtitle="Edit or delete the events you've created."
        action={<Link href="/create-event" className="btn btn-primary"><LuPlus /> New event</Link>}
      />
      <div className="container-page py-10">
        {events === null ? (
          <div className="space-y-3">
            {Array.from({ length: 4 }).map((_, i) => <div key={i} className="skeleton h-20 w-full" />)}
          </div>
        ) : events.length === 0 ? (
          <EmptyState title="You haven't created any events" text="Events you create will show up here so you can edit or delete them." href="/create-event" cta="Create your first event" />
        ) : (
          <div className="overflow-x-auto rounded-box border border-base-300 bg-base-100">
            <table className="table">
              <thead>
                <tr><th>Event</th><th>Type</th><th>Date</th><th>Joined</th><th className="text-right">Actions</th></tr>
              </thead>
              <tbody>
                {events.map((ev) => (
                  <tr key={ev._id} className="hover:bg-base-200/60">
                    <td>
                      <div className="flex min-w-60 items-center gap-3">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={ev.thumbnail} alt="" className="h-12 w-16 shrink-0 rounded-lg bg-base-300 object-cover" />
                        <div>
                          <Link href={`/events/${ev._id}`} className="font-bold hover:text-primary">{ev.title}</Link>
                          <p className="text-xs text-base-content/60">{ev.location}</p>
                        </div>
                      </div>
                    </td>
                    <td><span className="badge badge-secondary border-0">{ev.eventType}</span></td>
                    <td className="whitespace-nowrap">
                      {formatDate(ev.eventDate)}
                      <p className="text-xs text-base-content/60">{whenLabel(ev.eventDate)}</p>
                    </td>
                    <td>{ev.participants ?? 0}</td>
                    <td>
                      <div className="flex justify-end gap-2">
                        <Link href={`/manage-events/${ev._id}`} className="btn btn-sm btn-outline"><LuPencil /> Edit</Link>
                        <button onClick={() => remove(ev)} className="btn btn-sm btn-outline btn-error" aria-label={`Delete ${ev.title}`}><LuTrash2 /> Delete</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
}
