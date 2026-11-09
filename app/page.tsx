import { Suspense } from "react";
import { EventGridSkeleton } from "@/components/EventSkeleton";
import Features from "@/components/home/Features";
import Gallery from "@/components/home/Gallery";
import Hero from "@/components/home/Hero";
import Newsletter from "@/components/home/Newsletter";
import UpcomingEvents from "@/components/home/UpcomingEvents";

export default function Home() {
  return (
    <>
      <Hero />
      <Features />
      <section className="container-page pb-10">
        <h2 className="section-title">Coming up soon</h2>
        <p className="section-sub">The next six events, soonest first. Pick one and put it in your calendar.</p>
        <div className="mt-10">
          <Suspense fallback={<EventGridSkeleton />}>
            <UpcomingEvents />
          </Suspense>
        </div>
      </section>
      <Gallery />
      <Newsletter />
    </>
  );
}
