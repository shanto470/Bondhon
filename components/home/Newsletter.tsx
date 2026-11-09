"use client";

import { FormEvent, useState } from "react";
import toast from "react-hot-toast";
import { isEmail } from "@/lib/utils";

export default function Newsletter() {
  const [email, setEmail] = useState("");

  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (!isEmail(email)) {
      toast.error("Enter a valid email address.");
      return;
    }
    toast.success("You're on the list. We'll send new events near you.");
    setEmail("");
  };

  return (
    <section className="container-page pb-4">
      <div className="grid items-center gap-8 rounded-box bg-secondary p-8 text-secondary-content sm:p-12 lg:grid-cols-2">
        <div>
          <h2 className="section-title">Get the weekend's events in your inbox</h2>
          <p className="mt-3 max-w-md leading-relaxed opacity-80">One short email every Thursday with what's happening around Dhaka. No spam.</p>
        </div>
        <form onSubmit={submit} noValidate className="flex flex-col gap-3 sm:flex-row">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            aria-label="Email address"
            className="input input-lg w-full bg-base-100 text-base-content"
          />
          <button className="btn btn-neutral btn-lg">Subscribe</button>
        </form>
      </div>
    </section>
  );
}
