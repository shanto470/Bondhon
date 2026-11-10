"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import toast from "react-hot-toast";
import AuthShell from "@/components/AuthShell";
import Field from "@/components/Field";
import PasswordInput from "@/components/PasswordInput";
import SocialLogin from "@/components/SocialLogin";
import { signUp } from "@/lib/auth-client";
import { isEmail, isUrl, redirectTarget, validatePassword } from "@/lib/utils";

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState({ name: "", email: "", photoURL: "", password: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [busy, setBusy] = useState(false);

  const set = (k: keyof typeof form, v: string) => {
    setForm((f) => ({ ...f, [k]: v }));
    setErrors((e) => ({ ...e, [k]: "" }));
  };

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    const errs: Record<string, string> = {};
    if (form.name.trim().length < 2) errs.name = "Enter your name.";
    if (!isEmail(form.email)) errs.email = "Enter a valid email address.";
    if (!isUrl(form.photoURL.trim())) errs.photoURL = "Enter a photo link that starts with http:// or https://.";
    const pw = validatePassword(form.password);
    if (pw) errs.password = pw;
    setErrors(errs);
    if (Object.keys(errs).length) {
      toast.error(errs.password || "Please fix the highlighted fields.");
      return;
    }

    setBusy(true);
    const { error } = await signUp.email({
      name: form.name.trim(),
      email: form.email.trim(),
      password: form.password,
      image: form.photoURL.trim(),
    });
    setBusy(false);
    if (error) {
      toast.error(error.message || "We couldn't create your account.");
      return;
    }
    toast.success("Account created. Welcome to Bondhon!");
    router.push(redirectTarget());
    router.refresh();
  };

  return (
    <AuthShell
      title="Create your account"
      subtitle="It takes a minute. Then you can join or host events."
      footer={<>Already have an account? <Link href="/login" className="font-semibold text-primary hover:underline">Log in</Link></>}
    >
      <form onSubmit={submit} noValidate className="space-y-5">
        <Field label="Name" error={errors.name}>
          <input value={form.name} onChange={(e) => set("name", e.target.value)} autoComplete="name" placeholder="Your full name" className={`input w-full ${errors.name ? "input-error" : ""}`} />
        </Field>
        <Field label="Email" error={errors.email}>
          <input type="email" value={form.email} onChange={(e) => set("email", e.target.value)} autoComplete="email" placeholder="you@example.com" className={`input w-full ${errors.email ? "input-error" : ""}`} />
        </Field>
        <Field label="Photo URL" error={errors.photoURL} hint="A link to your profile picture.">
          <input value={form.photoURL} onChange={(e) => set("photoURL", e.target.value)} inputMode="url" placeholder="https://..." className={`input w-full ${errors.photoURL ? "input-error" : ""}`} />
        </Field>
        <Field label="Password" error={errors.password} hint="At least 8 characters with an uppercase and a lowercase letter.">
          <PasswordInput value={form.password} onChange={(v) => set("password", v)} invalid={!!errors.password} placeholder="Create a password" autoComplete="new-password" />
        </Field>
        <button disabled={busy} className="btn btn-primary btn-block">
          {busy ? <span className="loading loading-spinner loading-sm" /> : "Create account"}
        </button>
      </form>
      <SocialLogin />
    </AuthShell>
  );
}
