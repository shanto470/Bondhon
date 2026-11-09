"use client";

import { useEffect, useState } from "react";
import { LuMoon, LuSun } from "react-icons/lu";

export default function ThemeToggle() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    setDark(document.documentElement.dataset.theme === "bondhon-dark");
  }, []);

  const toggle = () => {
    const next = dark ? "bondhon" : "bondhon-dark";
    document.documentElement.dataset.theme = next;
    localStorage.setItem("theme", next);
    setDark(!dark);
  };

  return (
    <button
      onClick={toggle}
      className="btn btn-ghost btn-circle btn-sm"
      aria-label={dark ? "Switch to light theme" : "Switch to dark theme"}
    >
      {dark ? <LuSun size={18} /> : <LuMoon size={18} />}
    </button>
  );
}
