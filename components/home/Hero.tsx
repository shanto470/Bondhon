import Link from "next/link";

const notices = [
  { type: "Donation", title: "Winter Clothes Distribution", place: "Mirpur 10, Dhaka", note: "Bring clean warm clothes and a bag.", tilt: "-rotate-3", bar: "bg-primary", pos: "left-0 top-2 sm:left-2" },
  { type: "Food Relief", title: "Blanket Distribution for the Needy", place: "Mohammadpur, Dhaka", note: "Volunteers needed from 4 pm.", tilt: "rotate-2", bar: "bg-secondary", pos: "right-0 top-36 sm:right-2" },
  { type: "Cleanup", title: "Riverbank Cleanup", place: "Buriganga, Old Dhaka", note: "Gloves and sacks provided.", tilt: "-rotate-1", bar: "bg-accent", pos: "bottom-2 left-6 sm:left-12" },
];

export default function Hero() {
  return (
    <section className="border-b border-base-300 bg-base-200">
      <div className="container-page grid items-center gap-12 py-14 lg:grid-cols-2 lg:py-20">
        <div>
          <h1 className="text-4xl font-extrabold leading-[1.08] tracking-tight sm:text-5xl lg:text-6xl">
            Your neighbourhood has a to-do list. Pick something off it.
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-base-content/70">
            Winter clothes in Mirpur, blankets in Mohammadpur, saplings in Savar. Find a service event near you, show up,
            and meet the people who did too.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/events" className="btn btn-primary btn-lg">Browse upcoming events</Link>
            <Link href="/create-event" className="btn btn-outline btn-lg">Host an event</Link>
          </div>
        </div>

        <div className="board relative mx-auto h-[26rem] w-full max-w-xl overflow-hidden rounded-box border border-base-300 sm:h-[28rem]" aria-hidden="true">
          {notices.map((n) => (
            <div key={n.title} className={`absolute w-60 ${n.tilt} ${n.pos} rounded-md bg-base-100 p-4 shadow-lg sm:w-64`}>
              <span className="absolute -top-2 left-1/2 h-4 w-4 -translate-x-1/2 rounded-full bg-error shadow" />
              <div className={`mb-3 h-1.5 w-14 rounded-full ${n.bar}`} />
              <p className="text-xs font-semibold text-base-content/60">{n.type}</p>
              <p className="mt-1 text-base font-bold leading-snug">{n.title}</p>
              <p className="mt-2 text-sm text-base-content/70">{n.place}</p>
              <p className="mt-1 text-sm text-base-content/60">{n.note}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
