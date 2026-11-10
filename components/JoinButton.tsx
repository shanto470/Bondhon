"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { LuCheck } from "react-icons/lu";
import { api } from "@/lib/api";
import { useSession } from "@/lib/auth-client";
import { errMsg } from "@/lib/utils";

export default function JoinButton({ eventId, ended }: { eventId: string; ended: boolean }) {
  const router = useRouter();
  const { data: session, isPending } = useSession();
  const [joined, setJoined] = useState(false);
  const [checking, setChecking] = useState(true);
  const [busy, setBusy] = useState(false);
  const email = session?.user.email;

  useEffect(() => {
    if (isPending) return;
    if (!email) {
      setChecking(false);
      return;
    }
    api<{ joined: boolean }>(`/is-joined/${eventId}`, { auth: true })
      .then((r) => setJoined(r.joined))
      .catch(() => {})
      .finally(() => setChecking(false));
  }, [email, isPending, eventId]);

  const join = async () => {
    if (!email) {
      toast("Log in to join this event.", { icon: "🔑" });
      router.push(`/login?redirect=/events/${eventId}`);
      return;
    }
    setBusy(true);
    try {
      await api("/join-event", { method: "POST", auth: true, body: JSON.stringify({ eventId }) });
      setJoined(true);
      toast.success("You're in! See you there.");
      router.refresh();
    } catch (e) {
      toast.error(errMsg(e));
    } finally {
      setBusy(false);
    }
  };

  const leave = async () => {
    setBusy(true);
    try {
      await api(`/join-event/${eventId}`, { method: "DELETE", auth: true });
      setJoined(false);
      toast.success("You've left this event.");
      router.refresh();
    } catch (e) {
      toast.error(errMsg(e));
    } finally {
      setBusy(false);
    }
  };

  if (ended) return <button className="btn btn-block" disabled>This event has ended</button>;
  if (isPending || checking) return <div className="skeleton h-12 w-full" />;

  if (joined) {
    return (
      <div className="space-y-2">
        <div className="flex h-12 items-center justify-center gap-2 rounded-field bg-success/15 font-semibold text-success">
          <LuCheck /> You've joined this event
        </div>
        <button onClick={leave} disabled={busy} className="btn btn-ghost btn-block btn-sm">
          {busy ? <span className="loading loading-spinner loading-xs" /> : "Leave event"}
        </button>
      </div>
    );
  }

  return (
    <button onClick={join} disabled={busy} className="btn btn-primary btn-block btn-lg">
      {busy ? <span className="loading loading-spinner" /> : "Join Event"}
    </button>
  );
}
