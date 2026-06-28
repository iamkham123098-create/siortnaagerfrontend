import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { SiteLayout } from "@/components/SiteLayout";
import { apiGet, type OfficeBearer, type Paginated } from "@/lib/api";

export const Route = createFileRoute("/about")({
  head: () => ({ meta: [{ title: "About — SIO R. T. Nagar" }, { name: "description", content: "Meet the office bearers leading SIO R. T. Nagar." }] }),
  component: About,
});

function About() {
  const q = useQuery({
    queryKey: ["office-bearers"],
    queryFn: () => apiGet<Paginated<OfficeBearer>>("/about/office-bearers/?ordering=display_order"),
  });
  return (
    <SiteLayout>
      <section className="max-w-7xl mx-auto px-4 py-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-3"><span className="brand-text-gradient">Office Bearers</span></h1>
        <p className="text-muted-foreground mb-10 max-w-2xl">The team leading SIO R. T. Nagar — committed to faith, knowledge and service.</p>
        {q.isLoading && <p className="text-muted-foreground">Loading…</p>}
        {q.isError && <p className="text-destructive">Unable to load office bearers.</p>}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {q.data?.results.map((p) => (
            <div key={p.id} className="rounded-xl border bg-card p-6 text-center">
              <div className="mx-auto w-28 h-28 rounded-full overflow-hidden brand-gradient p-1 mb-4">
                <div className="w-full h-full rounded-full overflow-hidden bg-muted flex items-center justify-center text-2xl font-display">
                  {p.photo ? (
                    <img src={p.photo} alt={p.name} className="w-full h-full object-cover" />
                  ) : (
                    p.name.charAt(0)
                  )}
                </div>
              </div>
              <h3 className="font-semibold text-lg">{p.name}</h3>
              <div className="text-sm text-brand-red font-medium mb-3">{p.position}</div>
              {p.email && <div className="text-xs text-muted-foreground">{p.email}</div>}
              {p.contact_number && <div className="text-xs text-muted-foreground">{p.contact_number}</div>}
            </div>
          ))}
        </div>
      </section>
    </SiteLayout>
  );
}
