"use client";

import { useEffect, useState } from "react";
import { LuSearch } from "react-icons/lu";
import EmptyState from "@/components/EmptyState";
import EventCard from "@/components/EventCard";
import { EventGridSkeleton } from "@/components/EventSkeleton";
import PageHeader from "@/components/PageHeader";
import { api } from "@/lib/api";
import type { EventItem } from "@/lib/types";
import { EVENT_TYPES, errMsg } from "@/lib/utils";

export default function UpcomingEventsPage() {
  const [events, setEvents] = useState<EventItem[] | null>(null);
  const [q, setQ] = useState("");
  const [type, setType] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;
    setLoading(true);
    const timer = setTimeout(() => {
      const params = new URLSearchParams();
      if (q.trim()) params.set("q", q.trim());
      if (type !== "All") params.set("type", type);
      api<EventItem[]>(`/events?${params}`)
        .then((d) => { if (active) { setEvents(d); setError(""); } })
        .catch((e) => { if (active) { setEvents([]); setError(errMsg(e)); } })
        .finally(() => active && setLoading(false));
    }, 300);
    return () => { active = false; clearTimeout(timer); };
  }, [q, type]);

  return (
    <>
      <PageHeader title="Upcoming events" subtitle="Every event that hasn't happened yet, soonest first. Past events are removed automatically." />
      <div className="container-page py-10">
        <div className="mb-8 flex flex-col gap-3 sm:flex-row">
          <label className="input w-full sm:max-w-md">
            <LuSearch className="text-base-content/50" />
            <input type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search by title or place" aria-label="Search events" />
          </label>
          <select value={type} onChange={(e) => setType(e.target.value)} className="select w-full sm:w-52" aria-label="Filter by event type">
            <option value="All">All types</option>
            {EVENT_TYPES.map((t) => <option key={t}>{t}</option>)}
          </select>
        </div>

        {events === null ? (
          <EventGridSkeleton />
        ) : error ? (
          <EmptyState title="Events can't load right now" text={error} />
        ) : events.length === 0 ? (
          <EmptyState
            title={q || type !== "All" ? "No events match your search" : "No upcoming events yet"}
            text={q || type !== "All" ? "Try a different word or clear the type filter." : "Be the first to organise something in your area."}
            href="/create-event"
            cta="Create an event"
          />
        ) : (
          <div className={`event-grid transition-opacity ${loading ? "opacity-60" : ""}`}>
            {events.map((e) => <EventCard key={e._id} event={e} />)}
          </div>
        )}
      </div>
    </>
  );
}
