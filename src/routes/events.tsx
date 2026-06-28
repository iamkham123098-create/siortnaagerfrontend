import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { SiteLayout } from "@/components/SiteLayout";
import { apiGet, type EventItem, type Paginated } from "@/lib/api";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

const MONTHS = [
  { value: "", label: "All Months" },
  { value: "1", label: "January" },
  { value: "2", label: "February" },
  { value: "3", label: "March" },
  { value: "4", label: "April" },
  { value: "5", label: "May" },
  { value: "6", label: "June" },
  { value: "7", label: "July" },
  { value: "8", label: "August" },
  { value: "9", label: "September" },
  { value: "10", label: "October" },
  { value: "11", label: "November" },
  { value: "12", label: "December" },
];

const PAGE_SIZE = 12;

export const Route = createFileRoute("/events")({
  head: () => ({ meta: [{ title: "Events — SIO R. T. Nagar" }, { name: "description", content: "Upcoming and past events." }] }),
  component: Events,
});

function Events() {
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth() + 1;
  
  const [type, setType] = useState<"UPCOMING" | "PAST">("UPCOMING");
  const [year, setYear] = useState<string>(String(currentYear));
  const [month, setMonth] = useState<string>("");
  const [page, setPage] = useState(1);
  const [selectedEventId, setSelectedEventId] = useState<number | null>(null);

  // Generate year options (current year - 5 to current year + 2)
  const years = Array.from({ length: 8 }, (_, i) => currentYear - 5 + i);

  const q = useQuery({
    queryKey: ["events", type, year, month, page],
    queryFn: () => {
      const params = new URLSearchParams();
      params.append("event_type", type);
      if (year) params.append("year", year);
      if (month) params.append("month", month);
      params.append("page", String(page));
      return apiGet<Paginated<EventItem>>(`/events/?${params.toString()}`);
    },
  });

  // Fetch event detail when an event is selected
  const eventDetail = useQuery({
    queryKey: ["event", selectedEventId],
    queryFn: () => apiGet<EventItem>(`/events/${selectedEventId}/`),
    enabled: !!selectedEventId,
  });

  const totalPages = q.data ? Math.ceil(q.data.count / PAGE_SIZE) : 0;

  const handleClearFilters = () => {
    setYear(String(currentYear));
    setMonth("");
    setType("UPCOMING");
    setPage(1);
  };

  // Reset page when filters change
  const handleTypeChange = (value: "UPCOMING" | "PAST") => {
    setType(value);
    setPage(1);
  };

  const handleYearChange = (value: string) => {
    setYear(value);
    setPage(1);
  };

  const handleMonthChange = (value: string) => {
    setMonth(value);
    setPage(1);
  };

  return (
    <SiteLayout>
      <section className="max-w-7xl mx-auto px-4 py-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-3"><span className="brand-text-gradient">Events</span></h1>
        <p className="text-muted-foreground mb-6">Join us — or relive the moments.</p>
        
        <div className="flex flex-wrap gap-4 items-end mb-8 p-4 rounded-lg border bg-card">
          <div className="flex rounded-md border overflow-hidden w-fit">
            {(["UPCOMING", "PAST"] as const).map((t) => (
              <button key={t} onClick={() => handleTypeChange(t)} className={`px-5 py-2 text-sm font-medium cursor-pointer ${type === t ? "brand-gradient text-white" : "hover:bg-secondary"}`}>
                {t === "UPCOMING" ? "Upcoming" : "Past"}
              </button>
            ))}
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium">Year</label>
            <Select value={year} onValueChange={handleYearChange}>
              <SelectTrigger className="w-28">
                <SelectValue placeholder="Year" />
              </SelectTrigger>
              <SelectContent>
                {years.map((y) => (
                  <SelectItem key={y} value={String(y)}>{y}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium">Month</label>
            <Select value={month} onValueChange={handleMonthChange}>
              <SelectTrigger className="w-36">
                <SelectValue placeholder="All Months" />
              </SelectTrigger>
              <SelectContent>
                {MONTHS.map((m) => (
                  <SelectItem key={m.value || "all"} value={m.value}>{m.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <Button variant="outline" onClick={handleClearFilters}>
            Reset
          </Button>
        </div>

        {q.isLoading && <p className="text-muted-foreground">Loading…</p>}
        {q.data?.results.length === 0 && !q.isLoading && (
          <p className="text-muted-foreground">No events found for the selected filters.</p>
        )}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {q.data?.results.map((e) => (
            <div
              key={e.id}
              onClick={() => setSelectedEventId(e.id)}
              className="rounded-xl border bg-card p-6 hover:shadow-lg transition-shadow cursor-pointer"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold uppercase tracking-wider text-brand-red">{e.event_type_display}</span>
                {e.photo_count ? <span className="text-xs text-muted-foreground">📷 {e.photo_count}</span> : null}
              </div>
              <h3 className="text-lg font-semibold mb-1">{e.title}</h3>
              <p className="text-sm text-muted-foreground line-clamp-3 mb-3">{e.description}</p>
              <div className="text-xs text-muted-foreground space-y-1">
                <div>🗓 {new Date(e.event_date).toLocaleString()}</div>
                <div>📍 {e.location}</div>
              </div>
            </div>
          ))}
        </div>

        {totalPages > 1 && (
          <div className="mt-8 flex flex-col items-center gap-4">
            <p className="text-sm text-muted-foreground">
              Showing {((page - 1) * PAGE_SIZE) + 1} - {Math.min(page * PAGE_SIZE, q.data?.count ?? 0)} of {q.data?.count} events
            </p>
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious 
                    onClick={() => setPage(p => Math.max(1, p - 1))}
                    className={page === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                  />
                </PaginationItem>
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  let pageNum: number;
                  if (totalPages <= 5) {
                    pageNum = i + 1;
                  } else if (page <= 3) {
                    pageNum = i + 1;
                  } else if (page >= totalPages - 2) {
                    pageNum = totalPages - 4 + i;
                  } else {
                    pageNum = page - 2 + i;
                  }
                  return (
                    <PaginationItem key={pageNum}>
                      <PaginationLink
                        onClick={() => setPage(pageNum)}
                        isActive={page === pageNum}
                        className="cursor-pointer"
                      >
                        {pageNum}
                      </PaginationLink>
                    </PaginationItem>
                  );
                })}
                <PaginationItem>
                  <PaginationNext 
                    onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                    className={page === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        )}
      </section>

      <Dialog open={!!selectedEventId} onOpenChange={(open) => !open && setSelectedEventId(null)}>
        <DialogContent className="max-w-4xl w-[95vw] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold">{eventDetail.data?.title}</DialogTitle>
          </DialogHeader>
          {eventDetail.isLoading && <p className="text-muted-foreground">Loading…</p>}
          {eventDetail.isError && <p className="text-destructive">Event not found.</p>}
          {eventDetail.data && (
            <div className="space-y-4">
              <span className="text-xs font-bold uppercase tracking-wider text-brand-red">{eventDetail.data.event_type_display}</span>
              <div className="text-sm text-muted-foreground space-y-1">
                <div>🗓 {new Date(eventDetail.data.event_date).toLocaleString()}</div>
                <div>📍 {eventDetail.data.location}</div>
              </div>
              <p className="text-base whitespace-pre-line">{eventDetail.data.description}</p>
              {eventDetail.data.photos && eventDetail.data.photos.length > 0 && (
                <div className="mt-6">
                  <h3 className="text-xl font-bold mb-4">Photos</h3>
                  <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
                    {eventDetail.data.photos.map((p) => (
                      <figure key={p.id} className="rounded-xl border overflow-hidden bg-card">
                        <img src={p.photo} alt={p.caption} className="aspect-video object-cover w-full" />
                        {p.caption && <figcaption className="text-xs p-3 text-muted-foreground">{p.caption}</figcaption>}
                      </figure>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </SiteLayout>
  );
}
