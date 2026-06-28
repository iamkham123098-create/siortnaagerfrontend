import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { SiteLayout } from "@/components/SiteLayout";
import { apiGet, type Activity, type Paginated } from "@/lib/api";
import { Input } from "@/components/ui/input";
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

export const Route = createFileRoute("/activities")({
  head: () => ({ meta: [{ title: "Activities — SIO R. T. Nagar" }, { name: "description", content: "Recent activities organised by SIO R. T. Nagar." }] }),
  component: Activities,
});

const PAGE_SIZE = 12;

function Activities() {
  const currentYear = new Date().getFullYear();
  const [fromDate, setFromDate] = useState(`${currentYear}-01-01`);
  const [toDate, setToDate] = useState(`${currentYear}-12-31`);
  const [page, setPage] = useState(1);
  const [selectedActivity, setSelectedActivity] = useState<Activity | null>(null);

  const q = useQuery({
    queryKey: ["activities", fromDate, toDate, page],
    queryFn: () => {
      const params = new URLSearchParams();
      if (fromDate) params.append("from_date", fromDate);
      if (toDate) params.append("to_date", toDate);
      params.append("page", String(page));
      return apiGet<Paginated<Activity>>(`/activities/?${params.toString()}`);
    },
  });

  const totalPages = q.data ? Math.ceil(q.data.count / PAGE_SIZE) : 0;

  const handleClearFilters = () => {
    setFromDate(`${currentYear}-01-01`);
    setToDate(`${currentYear}-12-31`);
    setPage(1);
  };

  // Reset page when filters change
  const handleFromDateChange = (value: string) => {
    setFromDate(value);
    setPage(1);
  };

  const handleToDateChange = (value: string) => {
    setToDate(value);
    setPage(1);
  };

  return (
    <SiteLayout>
      <section className="max-w-7xl mx-auto px-4 py-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-3"><span className="brand-text-gradient">Activities</span></h1>
        <p className="text-muted-foreground mb-6 max-w-2xl">What we've been doing — programs, study circles, workshops & community service.</p>
        
        <div className="flex flex-wrap gap-4 items-end mb-8 p-4 rounded-lg border bg-card">
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium">From Date</label>
            <Input
              type="date"
              value={fromDate}
              onChange={(e) => handleFromDateChange(e.target.value)}
              className="w-40"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium">To Date</label>
            <Input
              type="date"
              value={toDate}
              onChange={(e) => handleToDateChange(e.target.value)}
              className="w-40"
            />
          </div>
          <Button variant="outline" onClick={handleClearFilters}>
            Reset
          </Button>
        </div>

        {q.isLoading && <p className="text-muted-foreground">Loading…</p>}
        {q.data?.results.length === 0 && !q.isLoading && (
          <p className="text-muted-foreground">No activities found for the selected date range.</p>
        )}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {q.data?.results.map((a) => (
            <article 
              key={a.id} 
              onClick={() => setSelectedActivity(a)}
              className="rounded-xl border bg-card overflow-hidden flex flex-col cursor-pointer hover:shadow-lg transition-shadow"
            >
              {a.photo && <img src={a.photo} alt={a.title} className="aspect-video object-cover w-full" />}
              <div className="p-5 flex-1 flex flex-col">
                <div className="text-xs text-brand-red font-medium uppercase tracking-wider mb-2">
                  {new Date(a.activity_date).toLocaleDateString(undefined, { dateStyle: "medium" })}
                </div>
                <h3 className="font-semibold text-lg mb-2">{a.title}</h3>
                <p className="text-sm text-muted-foreground line-clamp-4">{a.description}</p>
              </div>
            </article>
          ))}
        </div>

        {totalPages > 1 && (
          <div className="mt-8 flex flex-col items-center gap-4">
            <p className="text-sm text-muted-foreground">
              Showing {((page - 1) * PAGE_SIZE) + 1} - {Math.min(page * PAGE_SIZE, q.data?.count ?? 0)} of {q.data?.count} activities
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

      <Dialog open={!!selectedActivity} onOpenChange={(open) => !open && setSelectedActivity(null)}>
        <DialogContent className="max-w-3xl w-[95vw] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold">{selectedActivity?.title}</DialogTitle>
          </DialogHeader>
          {selectedActivity && (
            <div className="space-y-4">
              <div className="text-sm text-brand-red font-medium uppercase tracking-wider">
                🗓 {new Date(selectedActivity.activity_date).toLocaleDateString(undefined, { dateStyle: "full" })}
              </div>
              {selectedActivity.photo && (
                <img 
                  src={selectedActivity.photo} 
                  alt={selectedActivity.title} 
                  className="w-full rounded-lg object-cover max-h-[400px]" 
                />
              )}
              <p className="text-base whitespace-pre-line text-muted-foreground">{selectedActivity.description}</p>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </SiteLayout>
  );
}
