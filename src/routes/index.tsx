import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { SiteLayout } from "@/components/SiteLayout";
import { apiGet, type HomePage, type Announcement, type EventItem, type Paginated } from "@/lib/api";
import logo from "@/assets/SIO_LOGO.jpeg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "SIO R. T. Nagar — Home" },
      { name: "description", content: "Students Islamic Organisation, R. T. Nagar — building tomorrow's leaders today." },
    ],
  }),
  component: Index,
});

function Index() {
  const home = useQuery({
    queryKey: ["home"],
    queryFn: () => apiGet<HomePage>("/home/").catch(() => null),
  });
  const upcoming = useQuery({
    queryKey: ["events", "upcoming"],
    queryFn: () => apiGet<Paginated<EventItem>>("/events/?event_type=UPCOMING").catch(() => null),
  });
  const announcements = useQuery({
    queryKey: ["announcements", "home"],
    queryFn: () => apiGet<Paginated<Announcement>>("/announcements/").catch(() => null),
  });

  const h = home.data;

  // Combine upcoming events and announcements for the ticker
  const tickerItems = [
    ...(upcoming.data?.results.slice(0, 5).map((e) => ({
      type: "event" as const,
      title: e.title,
      date: new Date(e.event_date).toLocaleDateString(undefined, { dateStyle: "medium" }),
    })) ?? []),
    ...(announcements.data?.results.slice(0, 5).map((a) => ({
      type: "announcement" as const,
      title: a.title,
      date: new Date(a.created_at).toLocaleDateString(undefined, { dateStyle: "medium" }),
    })) ?? []),
  ];

  return (
    <SiteLayout>
      {/* Scrolling Ticker Banner */}
      {tickerItems.length > 0 && (
        <div className="bg-gradient-to-r from-brand-blue to-brand-red text-white overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 py-2 flex items-center gap-4">
            <span className="shrink-0 text-xs font-bold uppercase tracking-wider bg-white/20 px-2 py-1 rounded">
              Updates
            </span>
            <div className="overflow-hidden flex-1">
              <div className="animate-marquee whitespace-nowrap flex gap-8">
                {/* Duplicate items for seamless loop */}
                {[...tickerItems, ...tickerItems].map((item, idx) => (
                  <span key={idx} className="inline-flex items-center gap-2 text-sm">
                    <span className={`text-xs px-1.5 py-0.5 rounded ${item.type === "event" ? "bg-white/30" : "bg-white/20"}`}>
                      {item.type === "event" ? "📅 Event" : "📢 Notice"}
                    </span>
                    <span className="font-medium">{item.title}</span>
                    <span className="text-white/70">• {item.date}</span>
                    <span className="text-white/50 mx-4">|</span>
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute -top-32 -left-32 h-96 w-96 rounded-full bg-brand-blue/30 blur-3xl" />
          <div className="absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-brand-red/25 blur-3xl" />
        </div>
        <div className="max-w-7xl mx-auto px-4 py-20 md:py-28 grid md:grid-cols-2 gap-10 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border bg-card text-xs font-medium mb-6">
              <span className="h-2 w-2 rounded-full bg-brand-red" />
              SIO of India — R. T. Nagar
            </div>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
              <span className="brand-text-gradient">
                {h?.hero_title ?? "Welcome to SIO R. T. Nagar"}
              </span>
            </h1>
            <p className="mt-5 text-lg text-muted-foreground max-w-xl">
              {h?.hero_subtitle ?? "Building Tomorrow's Leaders Today — through faith, knowledge and service to humanity."}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/contact"
                className="brand-gradient text-white px-6 py-3 rounded-md font-medium shadow-lg shadow-brand-blue/20 hover:opacity-90"
              >
                {h?.cta_join_text ?? "Join Us"}
              </Link>
              <Link
                to="/events"
                className="px-6 py-3 rounded-md border font-medium hover:bg-secondary"
              >
                {h?.cta_events_text ?? "Upcoming Events"}
              </Link>
            </div>
          </div>
          <div className="relative flex justify-center">
            <div className="absolute inset-0 brand-gradient rounded-full blur-3xl opacity-20" />
            <img
              src={h?.hero_banner_image || logo}
              alt="SIO R. T. Nagar"
              className="relative w-72 h-72 md:w-96 md:h-96 object-cover rounded-full shadow-2xl border-8 border-white"
            />
          </div>
        </div>
      </section>

      {/* Intro / Vision / Mission */}
      {h && (
        <section className="max-w-7xl mx-auto px-4 py-16 grid md:grid-cols-3 gap-6">
          {[
            { title: "Who We Are", body: h.introduction },
            { title: "Our Vision", body: h.vision },
            { title: "Our Mission", body: h.mission },
          ].map((c) => (
            <div key={c.title} className="rounded-xl border bg-card p-6">
              <div className="h-1 w-12 brand-gradient rounded mb-4" />
              <h3 className="text-xl font-semibold mb-2">{c.title}</h3>
              <p className="text-sm text-muted-foreground whitespace-pre-line">{c.body}</p>
            </div>
          ))}
        </section>
      )}

      {/* Upcoming events */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex items-end justify-between mb-6">
          <div>
            <h2 className="text-3xl font-bold">Upcoming Events</h2>
            <p className="text-muted-foreground text-sm">Be part of what's next.</p>
          </div>
          <Link to="/events" className="text-sm font-medium text-primary hover:underline">View all →</Link>
        </div>
        <div className="grid gap-5 md:grid-cols-3">
          {upcoming.data?.results.slice(0, 3).map((e) => (
            <Link
              key={e.id}
              to="/events/$id"
              params={{ id: String(e.id) }}
              className="rounded-xl border bg-card p-5 hover:shadow-lg transition-shadow"
            >
              <div className="text-xs font-medium text-brand-red uppercase tracking-wider mb-2">
                {new Date(e.event_date).toLocaleDateString(undefined, { dateStyle: "medium" })}
              </div>
              <h3 className="font-semibold text-lg mb-1">{e.title}</h3>
              <p className="text-sm text-muted-foreground line-clamp-2">{e.description}</p>
              <div className="text-xs mt-3 text-muted-foreground">📍 {e.location}</div>
            </Link>
          )) ?? (
            <div className="col-span-3 text-sm text-muted-foreground">No upcoming events available.</div>
          )}
        </div>
      </section>

      {/* Announcements */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold mb-6">Latest Announcements</h2>
        <div className="grid gap-4 md:grid-cols-2">
          {announcements.data?.results.slice(0, 4).map((a) => (
            <div key={a.id} className="rounded-xl border bg-card p-5">
              <div className="flex items-center gap-2 mb-2">
                {a.is_pinned && (
                  <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-brand-red text-white">Pinned</span>
                )}
                <span className="text-xs text-muted-foreground">
                  {new Date(a.created_at).toLocaleDateString()}
                </span>
              </div>
              <h3 className="font-semibold mb-1">{a.title}</h3>
              <p className="text-sm text-muted-foreground line-clamp-3">{a.content}</p>
            </div>
          )) ?? (
            <div className="text-sm text-muted-foreground">No announcements available.</div>
          )}
        </div>
      </section>
    </SiteLayout>
  );
}
