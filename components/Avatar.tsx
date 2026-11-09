"use client";

import { useState } from "react";

export default function Avatar({
  src,
  name,
  className = "h-9 w-9",
}: {
  src?: string | null;
  name?: string | null;
  className?: string;
}) {
  const [broken, setBroken] = useState(false);
  const initial = (name || "?").trim().charAt(0).toUpperCase();

  if (!src || broken) {
    return (
      <div className={`flex items-center justify-center rounded-full bg-primary font-bold text-primary-content ${className}`}>
        {initial}
      </div>
    );
  }
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={name || "Profile picture"}
      referrerPolicy="no-referrer"
      onError={() => setBroken(true)}
      className={`rounded-full object-cover ${className}`}
    />
  );
}
