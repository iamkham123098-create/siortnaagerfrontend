import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { SiteLayout } from "@/components/SiteLayout";
import { apiGet, type Book, type Paginated } from "@/lib/api";
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

export const Route = createFileRoute("/library")({
  head: () => ({ meta: [{ title: "Digital Library — SIO R. T. Nagar" }, { name: "description", content: "Curated reading list — SIO literature & contemporary works." }] }),
  component: Library,
});

type Cat = "ALL" | "SIO_LITERATURE" | "CONTEMPORARY";

const PAGE_SIZE = 12;

// Convert Google Drive link to embeddable preview URL
function getEmbedUrl(driveLink: string): string {
  // Extract file ID from various Google Drive URL formats
  const patterns = [
    /\/file\/d\/([a-zA-Z0-9_-]+)/,
    /id=([a-zA-Z0-9_-]+)/,
    /\/d\/([a-zA-Z0-9_-]+)/,
  ];
  
  for (const pattern of patterns) {
    const match = driveLink.match(pattern);
    if (match) {
      return `https://drive.google.com/file/d/${match[1]}/preview`;
    }
  }
  
  // If no pattern matches, return original link
  return driveLink;
}

function Library() {
  const [cat, setCat] = useState<Cat>("ALL");
  const [search, setSearch] = useState("");
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [page, setPage] = useState(1);

  const q = useQuery({
    queryKey: ["books", cat, search, page],
    queryFn: () => {
      const params = new URLSearchParams();
      if (cat !== "ALL") params.set("category", cat);
      if (search) params.set("search", search);
      params.set("page", String(page));
      return apiGet<Paginated<Book>>(`/library/books/?${params.toString()}`);
    },
  });

  const totalPages = q.data ? Math.ceil(q.data.count / PAGE_SIZE) : 0;

  // Reset page when filters change
  const handleCatChange = (value: Cat) => {
    setCat(value);
    setPage(1);
  };

  const handleSearchChange = (value: string) => {
    setSearch(value);
    setPage(1);
  };

  return (
    <SiteLayout>
      <section className="max-w-7xl mx-auto px-4 py-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-3"><span className="brand-text-gradient">Digital Library</span></h1>
        <p className="text-muted-foreground mb-8 max-w-2xl">Read, reflect & grow. A curated collection of books available online.</p>

        <div className="flex flex-wrap gap-3 mb-8">
          <div className="flex rounded-md border overflow-hidden">
            {(["ALL", "SIO_LITERATURE", "CONTEMPORARY"] as Cat[]).map((c) => (
              <button
                key={c}
                onClick={() => handleCatChange(c)}
                className={`px-4 py-2 text-sm font-medium cursor-pointer ${cat === c ? "brand-gradient text-white" : "hover:bg-secondary"}`}
              >
                {c === "ALL" ? "All" : c === "SIO_LITERATURE" ? "SIO Literature" : "Contemporary"}
              </button>
            ))}
          </div>
          <input
            value={search}
            onChange={(e) => handleSearchChange(e.target.value)}
            placeholder="Search books, authors…"
            className="flex-1 min-w-[200px] px-4 py-2 rounded-md border bg-background text-sm"
          />
        </div>

        {q.isLoading && <p className="text-muted-foreground">Loading…</p>}
        {q.data?.results.length === 0 && !q.isLoading && (
          <p className="text-muted-foreground">No books found.</p>
        )}
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {q.data?.results.map((b) => (
            <button
              key={b.id}
              onClick={() => setSelectedBook(b)}
              className="rounded-xl border bg-card overflow-hidden flex flex-col hover:shadow-lg transition-shadow text-left cursor-pointer"
            >
              <div className="aspect-[3/4] bg-muted overflow-hidden">
                {b.cover_image ? (
                  <img src={b.cover_image} alt={b.title} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full brand-gradient flex items-center justify-center text-white font-display text-2xl p-4 text-center">{b.title}</div>
                )}
              </div>
              <div className="p-4 flex-1 flex flex-col">
                <span className="text-[10px] uppercase tracking-wider text-brand-blue font-semibold">{b.category_display}</span>
                <h3 className="font-semibold mt-1 line-clamp-2">{b.title}</h3>
                <p className="text-xs text-muted-foreground mt-1">by {b.author}</p>
                <span className="mt-3 text-xs font-medium text-brand-red">Read Book →</span>
              </div>
            </button>
          ))}
        </div>

        {totalPages > 1 && (
          <div className="mt-8 flex flex-col items-center gap-4">
            <p className="text-sm text-muted-foreground">
              Showing {((page - 1) * PAGE_SIZE) + 1} - {Math.min(page * PAGE_SIZE, q.data?.count ?? 0)} of {q.data?.count} books
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

      <Dialog open={!!selectedBook} onOpenChange={(open) => !open && setSelectedBook(null)}>
        <DialogContent className="max-w-5xl w-[95vw] h-[90vh] flex flex-col p-0">
          <DialogHeader className="p-4 border-b shrink-0">
            <DialogTitle className="flex items-center justify-between pr-8">
              <div>
                <span className="text-lg font-semibold">{selectedBook?.title}</span>
                <span className="text-sm text-muted-foreground ml-2">by {selectedBook?.author}</span>
              </div>
              <a
                href={selectedBook?.drive_link}
                target="_blank"
                rel="noreferrer"
                className="text-xs px-3 py-1.5 rounded-md border hover:bg-secondary cursor-pointer"
              >
                Open in Drive ↗
              </a>
            </DialogTitle>
          </DialogHeader>
          <div className="flex-1 min-h-0">
            {selectedBook && (
              <iframe
                src={getEmbedUrl(selectedBook.drive_link)}
                className="w-full h-full border-0"
                allow="autoplay"
                title={selectedBook.title}
              />
            )}
          </div>
        </DialogContent>
      </Dialog>
    </SiteLayout>
  );
}
