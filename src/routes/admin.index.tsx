import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/admin/")({
  component: Overview,
});

const cards = [
  { to: "/admin/home", label: "Home Page", desc: "Hero, vision, mission and CTAs." },
  { to: "/admin/bearers", label: "Office Bearers", desc: "Manage team members." },
  { to: "/admin/activities", label: "Activities", desc: "Post recent activities." },
  { to: "/admin/books", label: "Books", desc: "Digital library entries." },
  { to: "/admin/events", label: "Events", desc: "Upcoming & past events." },
  { to: "/admin/announcements", label: "Announcements", desc: "Pin and publish." },
  { to: "/admin/contact", label: "Contact", desc: "Office info & socials." },
];

function Overview() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-2">Welcome back</h1>
      <p className="text-muted-foreground mb-8">Manage every section of the SIO R. T. Nagar website.</p>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map((c) => (
          <Link key={c.to} to={c.to} className="rounded-xl border bg-card p-5 hover:shadow-lg transition-shadow">
            <div className="h-1 w-10 brand-gradient rounded mb-3" />
            <div className="font-semibold">{c.label}</div>
            <div className="text-sm text-muted-foreground mt-1">{c.desc}</div>
          </Link>
        ))}
      </div>
    </div>
  );
}
