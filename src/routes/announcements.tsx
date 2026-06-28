import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { SiteLayout } from "@/components/SiteLayout";
import { apiGet, type Announcement, type Paginated } from "@/lib/api";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

export const Route = createFileRoute("/announcements")({
  head: () => ({ meta: [{ title: "Announcements — SIO R. T. Nagar" }] }),
  component: Page,
});

const PAGE_SIZE = 10;

function Page() {
  const currentDate = new Date();
  const firstDayOfMonth = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, "0")}-01`;
  
  const [fromDate, setFromDate] = useState<string>("");
  const [pinnedOnly, setPinnedOnly] = useState<boolean>(false);
  const [page, setPage] = useState(1);

  const q = useQuery({
    queryKey: ["announcements", fromDate, pinnedOnly, page],
    queryFn: () => {
      const params = new URLSearchParams();
      if (fromDate) params.append("from_date", fromDate);
      if (pinnedOnly) params.append("is_pinned", "true");
      params.append("page", String(page));
      return apiGet<Paginated<Announcement>>(`/announcements/?${params.toString()}`);
    },
  });

  const totalPages = q.data ? Math.ceil(q.data.count / PAGE_SIZE) : 0;

  const handleClearFilters = () => {
    setFromDate("");
    setPinnedOnly(false);
    setPage(1);
  };

  // Reset page when filters change
  const handleFromDateChange = (value: string) => {
    setFromDate(value);
    setPage(1);
  };

  const handlePinnedChange = (checked: boolean) => {
    setPinnedOnly(checked);
    setPage(1);
  };

  return (
    <SiteLayout>
      <section className="max-w-4xl mx-auto px-4 py-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-3"><span className="brand-text-gradient">Announcements</span></h1>
        <p className="text-muted-foreground mb-6">Stay informed on the latest from SIO R. T. Nagar.</p>
        
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
          <div className="flex items-center gap-2 h-10">
            <Checkbox
              id="pinned"
              checked={pinnedOnly}
              onCheckedChange={(checked) => handlePinnedChange(checked === true)}
            />
            <label htmlFor="pinned" className="text-sm font-medium cursor-pointer">
              Pinned Only
            </label>
          </div>
          <Button variant="outline" onClick={handleClearFilters}>
            Reset
          </Button>
        </div>

        {q.isLoading && <p className="text-muted-foreground">Loading…</p>}
        {q.data?.results.length === 0 && !q.isLoading && (
          <p className="text-muted-foreground">No announcements found for the selected filters.</p>
        )}
        <div className="space-y-4">
          {q.data?.results.map((a) => (
            <article key={a.id} className={`rounded-xl border bg-card p-6 ${a.is_pinned ? "border-brand-red/50" : ""}`}>
              <div className="flex items-center gap-2 mb-2">
                {a.is_pinned && <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-brand-red text-white">Pinned</span>}
                <span className="text-xs text-muted-foreground">{new Date(a.created_at).toLocaleDateString()}</span>
              </div>
              <h2 className="text-xl font-semibold mb-2">{a.title}</h2>
              <p className="text-sm whitespace-pre-line text-muted-foreground">{a.content}</p>
            </article>
          ))}
        </div>

        {totalPages > 1 && (
          <div className="mt-8 flex flex-col items-center gap-4">
            <p className="text-sm text-muted-foreground">
              Showing {((page - 1) * PAGE_SIZE) + 1} - {Math.min(page * PAGE_SIZE, q.data?.count ?? 0)} of {q.data?.count} announcements
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
    </SiteLayout>
  );
}
