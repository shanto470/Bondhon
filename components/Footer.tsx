import Link from "next/link";
import { FaFacebookF, FaGithub, FaInstagram, FaXTwitter } from "react-icons/fa6";
import { LuMail, LuMapPin, LuPhone } from "react-icons/lu";
import Logo from "./Logo";

const socials = [
  { icon: FaXTwitter, label: "X", href: "https://x.com" },
  { icon: FaFacebookF, label: "Facebook", href: "https://facebook.com" },
  { icon: FaInstagram, label: "Instagram", href: "https://instagram.com" },
  { icon: FaGithub, label: "GitHub", href: "https://github.com" },
];

export default function Footer() {
  return (
    <footer className="mt-24 bg-neutral text-neutral-content">
      <div className="h-1.5 bg-gradient-to-r from-primary via-secondary to-accent" />
      <div className="container-page grid gap-10 py-14 md:grid-cols-2 lg:grid-cols-4">
        <div className="lg:col-span-2">
          <Logo light />
          <p className="mt-4 max-w-md leading-relaxed text-neutral-content/70">
            Bondhon connects neighbours who want to help with the people organising the drives,
            cleanups and camps that make a street, a market or a riverbank better.
          </p>
          <div className="mt-6 flex gap-3">
            {socials.map(({ icon: Icon, label, href }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                aria-label={label}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-neutral-content/20 transition-colors hover:border-secondary hover:bg-secondary hover:text-secondary-content"
              >
                <Icon size={16} />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h3 className="mb-4 font-bold text-neutral-content">Explore</h3>
          <ul className="space-y-2.5 text-neutral-content/70">
            <li><Link className="hover:text-secondary" href="/events">Upcoming events</Link></li>
            <li><Link className="hover:text-secondary" href="/create-event">Host an event</Link></li>
            <li><Link className="hover:text-secondary" href="/joined-events">Events you joined</Link></li>
            <li><Link className="hover:text-secondary" href="/register">Create an account</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="mb-4 font-bold text-neutral-content">Get in touch</h3>
          <ul className="space-y-3 text-neutral-content/70">
            <li className="flex gap-3"><LuMapPin className="mt-1 shrink-0" /> House 12, Road 5, Mirpur 10, Dhaka</li>
            <li className="flex gap-3"><LuMail className="mt-1 shrink-0" /> hello@bondhon.org</li>
            <li className="flex gap-3"><LuPhone className="mt-1 shrink-0" /> +880 1700-000000</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-neutral-content/10 py-5 text-center text-sm text-neutral-content/60">
        © {new Date().getFullYear()} Bondhon. Built by neighbours, for neighbours.
      </div>
    </footer>
  );
}
