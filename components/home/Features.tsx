import { LuCalendarPlus, LuHandHeart, LuMapPinned, LuShieldCheck } from "react-icons/lu";

const features = [
  { icon: LuCalendarPlus, title: "Host an event in two minutes", text: "Add a title, place, date and photo. Your event is public the moment you save it." },
  { icon: LuHandHeart, title: "Join with one click", text: "Browse the details without an account, then log in when you're ready to commit." },
  { icon: LuMapPinned, title: "Search by place and cause", text: "Filter upcoming events by type or look up your own area, from Mirpur to Mohammadpur." },
  { icon: LuShieldCheck, title: "You control your events", text: "Only you can edit or delete what you created. Everyone else can only join." },
];

export default function Features() {
  return (
    <section className="container-page grid gap-10 py-20 lg:grid-cols-5">
      <div className="lg:col-span-2">
        <h2 className="section-title">Everything a neighbourhood drive needs</h2>
        <p className="section-sub">Skip the group chats and shared spreadsheets. Bondhon keeps the date, the place and the headcount in one spot.</p>
      </div>
      <ul className="divide-y divide-base-300 lg:col-span-3">
        {features.map(({ icon: Icon, title, text }) => (
          <li key={title} className="flex gap-4 py-6 first:pt-0">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
              <Icon size={22} />
            </span>
            <div>
              <h3 className="text-lg font-bold">{title}</h3>
              <p className="mt-1 leading-relaxed text-base-content/70">{text}</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
