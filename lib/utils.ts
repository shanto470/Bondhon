import type { EventInput } from "./types";

export const EVENT_TYPES = [
  "Cleanup",
  "Plantation",
  "Donation",
  "Food Relief",
  "Blood Drive",
  "Health Camp",
  "Education",
  "Other",
];

const pad = (n: number) => String(n).padStart(2, "0");
const fmt = (d: Date) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;

export const todayStr = () => fmt(new Date());
export const tomorrowStr = () => {
  const d = new Date();
  d.setDate(d.getDate() + 1);
  return fmt(d);
};

export const formatDate = (s: string) =>
  new Date(`${s}T00:00:00`).toLocaleDateString("en-GB", {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
  });

export function daysUntil(s: string) {
  const a = new Date(`${s}T00:00:00`).getTime();
  const b = new Date(`${todayStr()}T00:00:00`).getTime();
  return Math.round((a - b) / 86400000);
}

export function whenLabel(s: string) {
  const d = daysUntil(s);
  if (d < 0) return "Ended";
  if (d === 0) return "Happening today";
  if (d === 1) return "Tomorrow";
  return `In ${d} days`;
}

export const isUrl = (v: string) => {
  try {
    const u = new URL(v);
    return u.protocol === "http:" || u.protocol === "https:";
  } catch {
    return false;
  }
};

export const isEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());

export function validatePassword(pw: string) {
  if (pw.length < 6) return "Password must be at least 6 characters long.";
  if (!/[A-Z]/.test(pw)) return "Password needs at least one uppercase letter.";
  if (!/[a-z]/.test(pw)) return "Password needs at least one lowercase letter.";
  return null;
}

export function validateEvent(v: EventInput, originalDate?: string) {
  const e: Record<string, string> = {};
  if (v.title.trim().length < 3) e.title = "Give the event a title of at least 3 characters.";
  if (v.description.trim().length < 20)
    e.description = "Describe the event in at least 20 characters so people know what to expect.";
  if (!EVENT_TYPES.includes(v.eventType)) e.eventType = "Choose an event type.";
  if (!isUrl(v.thumbnail)) e.thumbnail = "Enter an image link that starts with http:// or https://.";
  if (v.location.trim().length < 3) e.location = "Add where it happens, for example Mirpur 10, Dhaka.";
  if (!v.eventDate) e.eventDate = "Choose the event date.";
  else if (v.eventDate !== originalDate && v.eventDate <= todayStr())
    e.eventDate = "The event date must be in the future.";
  return e;
}

export const errMsg = (e: unknown) =>
  e instanceof Error ? e.message : "Something went wrong. Please try again.";

// Only allow same-site redirects after login
export function redirectTarget() {
  if (typeof window === "undefined") return "/";
  const r = new URLSearchParams(window.location.search).get("redirect");
  return r && r.startsWith("/") && !r.startsWith("//") ? r : "/";
}
