"use client";

import { ChangeEvent, FormEvent, useState } from "react";
import toast from "react-hot-toast";
import Field from "./Field";
import type { EventInput } from "@/lib/types";
import { EVENT_TYPES, isUrl, tomorrowStr, validateEvent } from "@/lib/utils";

const empty: EventInput = { title: "", description: "", eventType: "", thumbnail: "", location: "", eventDate: "" };

export default function EventForm({
  initial,
  submitLabel,
  onSubmit,
}: {
  initial?: EventInput;
  submitLabel: string;
  onSubmit: (values: EventInput) => Promise<void>;
}) {
  const [values, setValues] = useState<EventInput>(initial ?? empty);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [busy, setBusy] = useState(false);

  const minDate = initial && initial.eventDate < tomorrowStr() ? initial.eventDate : tomorrowStr();

  const set =
    (key: keyof EventInput) =>
    (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      setValues((v) => ({ ...v, [key]: e.target.value }));
      setErrors((er) => ({ ...er, [key]: "" }));
    };

  const cls = (key: string, base: string) => `${base} w-full ${errors[key] ? `${base}-error` : ""}`;

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    const errs = validateEvent(values, initial?.eventDate);
    setErrors(errs);
    if (Object.keys(errs).length) {
      toast.error("Please fix the highlighted fields.");
      return;
    }
    setBusy(true);
    try {
      await onSubmit({ ...values, title: values.title.trim(), description: values.description.trim(), location: values.location.trim(), thumbnail: values.thumbnail.trim() });
    } finally {
      setBusy(false);
    }
  };

  return (
    <form onSubmit={submit} noValidate className="grid gap-5 sm:grid-cols-2">
      <div className="sm:col-span-2">
        <Field label="Event title" error={errors.title}>
          <input className={cls("title", "input")} value={values.title} onChange={set("title")} placeholder="Winter Clothes Distribution" />
        </Field>
      </div>

      <Field label="Event type" error={errors.eventType}>
        <select className={cls("eventType", "select")} value={values.eventType} onChange={set("eventType")}>
          <option value="" disabled>Choose a type</option>
          {EVENT_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
        </select>
      </Field>

      <Field label="Event date" error={errors.eventDate} hint="Pick a day after today.">
        <input type="date" min={minDate} suppressHydrationWarning className={cls("eventDate", "input")} value={values.eventDate} onChange={set("eventDate")} />
      </Field>

      <div className="sm:col-span-2">
        <Field label="Location" error={errors.location}>
          <input className={cls("location", "input")} value={values.location} onChange={set("location")} placeholder="Mirpur 10, Dhaka" />
        </Field>
      </div>

      <div className="sm:col-span-2">
        <Field label="Thumbnail image URL" error={errors.thumbnail} hint="Paste a direct link to a photo for the event card.">
          <input className={cls("thumbnail", "input")} value={values.thumbnail} onChange={set("thumbnail")} placeholder="https://..." inputMode="url" />
        </Field>
        {isUrl(values.thumbnail) && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={values.thumbnail} alt="Thumbnail preview" className="mt-3 h-40 w-full max-w-xs rounded-box border border-base-300 object-cover" />
        )}
      </div>

      <div className="sm:col-span-2">
        <Field label="Description" error={errors.description} hint="What will volunteers do, and what should they bring?">
          <textarea rows={5} className={cls("description", "textarea")} value={values.description} onChange={set("description")} placeholder="We're collecting and handing out warm clothes to families near the Mirpur 10 circle..." />
        </Field>
      </div>

      <div className="sm:col-span-2">
        <button type="submit" disabled={busy} className="btn btn-primary w-full sm:w-auto sm:min-w-48">
          {busy ? <span className="loading loading-spinner loading-sm" /> : submitLabel}
        </button>
      </div>
    </form>
  );
}
