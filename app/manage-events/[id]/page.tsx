"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import EventForm from "@/components/EventForm";
import PageHeader from "@/components/PageHeader";
import { api } from "@/lib/api";
import { useSession } from "@/lib/auth-client";
import type { EventInput, EventItem } from "@/lib/types";
import { errMsg } from "@/lib/utils";

export default function EditEventPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const { data: session, isPending } = useSession();
  const [event, setEvent] = useState<EventItem | null>(null);

  useEffect(() => {
    if (isPending) return;
    api<EventItem>(`/event/${id}`)
      .then((ev) => {
        if (ev.email !== session?.user.email) {
          toast.error("You can only edit events you created.");
          router.replace("/manage-events");
          return;
        }
        setEvent(ev);
      })
      .catch((e) => { toast.error(errMsg(e)); router.replace("/manage-events"); });
  }, [id, isPending, session?.user.email, router]);

  const update = async (values: EventInput) => {
    try {
      await api(`/event/${id}`, { method: "PATCH", auth: true, body: JSON.stringify(values) });
      toast.success("Event updated.");
      router.push("/manage-events");
    } catch (e) {
      toast.error(errMsg(e));
    }
  };

  return (
    <>
      <PageHeader title="Edit event" subtitle="Changes show up for everyone as soon as you save." />
      <div className="container-page max-w-3xl py-10">
        <div className="rounded-box border border-base-300 bg-base-100 p-6 sm:p-8">
          {event ? (
            <EventForm
              initial={{ title: event.title, description: event.description, eventType: event.eventType, thumbnail: event.thumbnail, location: event.location, eventDate: event.eventDate }}
              submitLabel="Save changes"
              onSubmit={update}
            />
          ) : (
            <div className="space-y-4">
              {Array.from({ length: 5 }).map((_, i) => <div key={i} className="skeleton h-12 w-full" />)}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
