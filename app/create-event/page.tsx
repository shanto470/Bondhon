"use client";

import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import EventForm from "@/components/EventForm";
import PageHeader from "@/components/PageHeader";
import { api } from "@/lib/api";
import type { EventInput } from "@/lib/types";
import { errMsg } from "@/lib/utils";

export default function CreateEventPage() {
  const router = useRouter();

  const create = async (values: EventInput) => {
    try {
      await api("/add-event", { method: "POST", auth: true, body: JSON.stringify(values) });
      toast.success("Event created. Thanks for organising!");
      router.push("/events");
    } catch (e) {
      toast.error(errMsg(e));
    }
  };

  return (
    <>
      <PageHeader title="Create an event" subtitle="Tell your neighbours what's happening, where, and when." />
      <div className="container-page max-w-3xl py-10">
        <div className="rounded-box border border-base-300 bg-base-100 p-6 sm:p-8">
          <EventForm submitLabel="Create event" onSubmit={create} />
        </div>
      </div>
    </>
  );
}
