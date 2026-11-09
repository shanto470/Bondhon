"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { LuCalendarCheck, LuLayoutDashboard, LuLogOut, LuMenu, LuPlus, LuUser } from "react-icons/lu";
import { signOut, useSession } from "@/lib/auth-client";
import Avatar from "./Avatar";
import Logo from "./Logo";
import ThemeToggle from "./ThemeToggle";

const links = [
  { href: "/", label: "Home" },
  { href: "/events", label: "Upcoming Events" },
];

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { data: session, isPending } = useSession();
  const user = session?.user;

  const closeMenus = () => (document.activeElement as HTMLElement | null)?.blur();

  const handleLogout = async () => {
    closeMenus();
    await signOut({
      fetchOptions: {
        onSuccess: () => {
          toast.success("You're logged out. See you at the next event!");
          router.push("/");
          router.refresh();
        },
      },
    });
  };

  const linkClass = (href: string) =>
    `rounded-full px-4 py-2 text-sm font-semibold transition-colors ${pathname === href ? "bg-primary/10 text-primary" : "hover:bg-base-200"
    }`;

  return (
    <header className="sticky top-0 z-40 border-b border-base-300 bg-base-100/85 backdrop-blur">
      <div className="container-page flex h-16 items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <div className="dropdown md:hidden">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle btn-sm" aria-label="Open menu">
              <LuMenu size={20} />
            </div>
            <ul tabIndex={0} className="menu dropdown-content z-50 mt-3 w-56 rounded-box border border-base-300 bg-base-100 p-2 shadow-lg">
              {links.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} onClick={closeMenus}>{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>
          <Logo />
        </div>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Main">
          {links.map((l) => (
            <Link key={l.href} href={l.href} className={linkClass(l.href)}>
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          {isPending ? (
            <div className="skeleton h-9 w-9 rounded-full" />
          ) : user ? (
            <>
              <div className="dropdown dropdown-end">
                <div className="tooltip tooltip-bottom" data-tip={user.name}>
                  <div tabIndex={0} role="button" className="btn btn-ghost btn-circle btn-sm h-10 w-10" aria-label="Account menu">
                    <Avatar src={user.image} name={user.name} className="h-9 w-9" />
                  </div>
                </div>
                <ul tabIndex={0} className="menu dropdown-content z-50 mt-3 w-64 rounded-box border border-base-300 bg-base-100 p-2 shadow-lg">
                  <li className="px-3 py-2">
                    <div className="pointer-events-none flex-col items-start gap-0 p-0">
                      <span className="font-bold">{user.name}</span>

                    </div>
                    <div className="pointer-events-none flex-col items-start gap-0 p-0"><span className="text-xs text-base-content/60">{user.email}</span></div>

                  </li>
                  <li><Link href="/create-event" onClick={closeMenus}><LuPlus /> Create Event</Link></li>
                  <li><Link href="/manage-events" onClick={closeMenus}><LuLayoutDashboard /> Manage Events</Link></li>
                  <li><Link href="/joined-events" onClick={closeMenus}><LuCalendarCheck /> Joined Events</Link></li>
                  <li><Link href="/profile" onClick={closeMenus}><LuUser /> My Profile</Link></li>
                  <li className="sm:hidden">
                    <button onClick={handleLogout}><LuLogOut /> Logout</button>
                  </li>
                </ul>
              </div>
              <button onClick={handleLogout} className="btn btn-outline btn-sm hidden sm:inline-flex">
                <LuLogOut /> Logout
              </button>
            </>
          ) : (
            <>
              <Link href="/register" className="btn btn-ghost btn-sm hidden sm:inline-flex">Register</Link>
              <Link href="/login" className="btn btn-primary btn-sm">Login</Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
