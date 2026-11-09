"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import toast from "react-hot-toast";
import AuthShell from "@/components/AuthShell";
import Field from "@/components/Field";
import PasswordInput from "@/components/PasswordInput";
import SocialLogin from "@/components/SocialLogin";
import { signIn } from "@/lib/auth-client";
import { isEmail, redirectTarget } from "@/lib/utils";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [busy, setBusy] = useState(false);

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    const errs: Record<string, string> = {};
    if (!isEmail(email)) errs.email = "Enter a valid email address.";
    if (!password) errs.password = "Enter your password.";
    setErrors(errs);
    if (Object.keys(errs).length) return;

    setBusy(true);
    const { error } = await signIn.email({ email: email.trim(), password });
    setBusy(false);
    if (error) {
      toast.error(error.message || "That email and password don't match.");
      return;
    }
    toast.success("Welcome back! You're logged in.");
    router.push(redirectTarget());
    router.refresh();
  };

  return (
    <AuthShell
      title="Welcome back"
      subtitle="Log in to join events and manage the ones you host."
      footer={<>New to Bondhon? <Link href="/register" className="font-semibold text-primary hover:underline">Create an account</Link></>}
    >
      <form onSubmit={submit} noValidate className="space-y-5">
        <Field label="Email" error={errors.email}>
          <input type="email" autoComplete="email" value={email} onChange={(e) => { setEmail(e.target.value); setErrors((x) => ({ ...x, email: "" })); }} placeholder="you@example.com" className={`input w-full ${errors.email ? "input-error" : ""}`} />
        </Field>
        <Field label="Password" error={errors.password}>
          <PasswordInput value={password} onChange={(v) => { setPassword(v); setErrors((x) => ({ ...x, password: "" })); }} invalid={!!errors.password} autoComplete="current-password" />
        </Field>
        <button disabled={busy} className="btn btn-primary btn-block">
          {busy ? <span className="loading loading-spinner loading-sm" /> : "Log in"}
        </button>
      </form>
      <SocialLogin />
    </AuthShell>
  );
}
