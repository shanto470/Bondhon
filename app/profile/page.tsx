"use client";

import { FormEvent, useEffect, useState } from "react";
import toast from "react-hot-toast";
import Avatar from "@/components/Avatar";
import Field from "@/components/Field";
import PageHeader from "@/components/PageHeader";
import { authClient, useSession } from "@/lib/auth-client";
import { isUrl } from "@/lib/utils";

export default function ProfilePage() {
  const { data: session, isPending } = useSession();
  const user = session?.user;
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (user) { setName(user.name); setImage(user.image ?? ""); }
  }, [user]);

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    const errs: Record<string, string> = {};
    if (name.trim().length < 2) errs.name = "Enter your name.";
    if (image.trim() && !isUrl(image.trim())) errs.image = "Enter a link that starts with http:// or https://.";
    setErrors(errs);
    if (Object.keys(errs).length) return;

    setBusy(true);
    const { error } = await authClient.updateUser({ name: name.trim(), image: image.trim() || undefined });
    setBusy(false);
    if (error) toast.error(error.message || "We couldn't save your profile.");
    else toast.success("Profile updated.");
  };

  return (
    <>
      <PageHeader title="My profile" subtitle="Your name and photo appear on the events you host and in the navbar." />
      <div className="container-page max-w-2xl py-10">
        {isPending || !user ? (
          <div className="skeleton h-80 w-full" />
        ) : (
          <div className="rounded-box border border-base-300 bg-base-100 p-6 sm:p-8">
            <div className="mb-8 flex items-center gap-4">
              <Avatar src={image || user.image} name={name || user.name} className="h-20 w-20 text-2xl" />
              <div>
                <p className="text-xl font-bold">{user.name}</p>
                <p className="text-base-content/60">{user.email}</p>
              </div>
            </div>
            <form onSubmit={submit} noValidate className="space-y-5">
              <Field label="Display name" error={errors.name}>
                <input value={name} onChange={(e) => setName(e.target.value)} className={`input w-full ${errors.name ? "input-error" : ""}`} />
              </Field>
              <Field label="Photo URL" error={errors.image} hint="A direct link to your profile picture.">
                <input value={image} onChange={(e) => setImage(e.target.value)} inputMode="url" placeholder="https://..." className={`input w-full ${errors.image ? "input-error" : ""}`} />
              </Field>
              <button disabled={busy} className="btn btn-primary">
                {busy ? <span className="loading loading-spinner loading-sm" /> : "Save profile"}
              </button>
            </form>
          </div>
        )}
      </div>
    </>
  );
}
