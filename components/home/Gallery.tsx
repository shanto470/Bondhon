// Static gallery. Swap the src values for your own photos (e.g. files in /public/gallery/).
const photos = [
  { src: "https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&w=800&q=70", caption: "Donation drives" },
  { src: "https://images.unsplash.com/photo-1559027615-cd4628902d4a?auto=format&fit=crop&w=800&q=70", caption: "Food relief" },
  { src: "https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?auto=format&fit=crop&w=800&q=70", caption: "Community cleanups" },
  { src: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=800&q=70", caption: "Learning circles" },
  { src: "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?auto=format&fit=crop&w=800&q=70", caption: "Tree plantation" },
  { src: "https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?auto=format&fit=crop&w=800&q=70", caption: "Health camps" },
];

export default function Gallery() {
  return (
    <section className="container-page py-20">
      <h2 className="section-title">Moments from the field</h2>
      <p className="section-sub">What a Saturday of showing up looks like.</p>
      <div className="mt-10 grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-5">
        {photos.map((p) => (
          <figure key={p.caption} className="group relative aspect-[4/3] overflow-hidden rounded-box bg-base-300">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={p.src} alt={p.caption} loading="lazy" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
            <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-4 font-semibold text-white">
              {p.caption}
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
