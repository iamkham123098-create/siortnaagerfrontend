import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { SiteLayout } from "@/components/SiteLayout";
import { apiGet, type EventItem } from "@/lib/api";

export const Route = createFileRoute("/events/$id")({
  head: () => ({ meta: [{ title: "Event — SIO R. T. Nagar" }] }),
  component: EventDetail,
});

function EventDetail() {
  const { id } = Route.useParams();
  const q = useQuery({
    queryKey: ["event", id],
    queryFn: () => apiGet<EventItem>(`/events/${id}/`),
  });

  return (
    <SiteLayout>
      <section className="max-w-5xl mx-auto px-4 py-12">
        <Link to="/events" className="text-sm text-muted-foreground hover:text-foreground">← Back to events</Link>
        {q.isLoading && <p className="mt-6 text-muted-foreground">Loading…</p>}
        {q.isError && <p className="mt-6 text-destructive">Event not found.</p>}
        {q.data && (
          <article className="mt-6">
            <span className="text-xs font-bold uppercase tracking-wider text-brand-red">{q.data.event_type_display}</span>
            <h1 className="text-4xl md:text-5xl font-bold mt-2 mb-4">{q.data.title}</h1>
            <div className="text-sm text-muted-foreground space-y-1 mb-6">
              <div>🗓 {new Date(q.data.event_date).toLocaleString()}</div>
              <div>📍 {q.data.location}</div>
            </div>
            <p className="text-base whitespace-pre-line">{q.data.description}</p>
            {q.data.photos && q.data.photos.length > 0 && (
              <div className="mt-10">
                <h2 className="text-2xl font-bold mb-4">Photos</h2>
                <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
                  {q.data.photos.map((p) => (
                    <figure key={p.id} className="rounded-xl border overflow-hidden bg-card">
                      <img src={p.photo} alt={p.caption} className="aspect-video object-cover w-full" />
                      {p.caption && <figcaption className="text-xs p-3 text-muted-foreground">{p.caption}</figcaption>}
                    </figure>
                  ))}
                </div>
              </div>
            )}
          </article>
        )}
      </section>
    </SiteLayout>
  );
}
