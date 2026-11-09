export function EventSkeleton() {
  return (
    <div className="flex h-full flex-col overflow-hidden rounded-box border border-base-300 bg-base-100">
      <div className="skeleton h-48 w-full rounded-none" />
      <div className="space-y-3 p-5">
        <div className="skeleton h-6 w-3/4" />
        <div className="skeleton h-4 w-1/2" />
        <div className="skeleton h-4 w-2/3" />
        <div className="skeleton h-10 w-full" />
        <div className="skeleton h-10 w-full" />
      </div>
    </div>
  );
}

export function EventGridSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="event-grid">
      {Array.from({ length: count }).map((_, i) => (
        <EventSkeleton key={i} />
      ))}
    </div>
  );
}
