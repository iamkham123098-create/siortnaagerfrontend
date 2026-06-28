import { r as __toESM } from "../_runtime.mjs";
import { n as apiGet } from "./api-DzHwqZS_.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { M as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { t as useQuery } from "../_libs/tanstack__react-query.mjs";
import { a as SiteLayout, i as DialogTitle, n as DialogContent, r as DialogHeader, t as Dialog } from "./SiteLayout-DD3Cgzx3.mjs";
import { a as PaginationNext, i as PaginationLink, n as PaginationContent, o as PaginationPrevious, r as PaginationItem, t as Pagination } from "./pagination-DyWqmueJ.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/library-CHKxv0b5.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var PAGE_SIZE = 12;
function getEmbedUrl(driveLink) {
	for (const pattern of [
		/\/file\/d\/([a-zA-Z0-9_-]+)/,
		/id=([a-zA-Z0-9_-]+)/,
		/\/d\/([a-zA-Z0-9_-]+)/
	]) {
		const match = driveLink.match(pattern);
		if (match) return `https://drive.google.com/file/d/${match[1]}/preview`;
	}
	return driveLink;
}
function Library() {
	const [cat, setCat] = (0, import_react.useState)("ALL");
	const [search, setSearch] = (0, import_react.useState)("");
	const [selectedBook, setSelectedBook] = (0, import_react.useState)(null);
	const [page, setPage] = (0, import_react.useState)(1);
	const q = useQuery({
		queryKey: [
			"books",
			cat,
			search,
			page
		],
		queryFn: () => {
			const params = new URLSearchParams();
			if (cat !== "ALL") params.set("category", cat);
			if (search) params.set("search", search);
			params.set("page", String(page));
			return apiGet(`/library/books/?${params.toString()}`);
		}
	});
	const totalPages = q.data ? Math.ceil(q.data.count / PAGE_SIZE) : 0;
	const handleCatChange = (value) => {
		setCat(value);
		setPage(1);
	};
	const handleSearchChange = (value) => {
		setSearch(value);
		setPage(1);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SiteLayout, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "max-w-7xl mx-auto px-4 py-16",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-4xl md:text-5xl font-bold mb-3",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "brand-text-gradient",
					children: "Digital Library"
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-muted-foreground mb-8 max-w-2xl",
				children: "Read, reflect & grow. A curated collection of books available online."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap gap-3 mb-8",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex rounded-md border overflow-hidden",
					children: [
						"ALL",
						"SIO_LITERATURE",
						"CONTEMPORARY"
					].map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => handleCatChange(c),
						className: `px-4 py-2 text-sm font-medium cursor-pointer ${cat === c ? "brand-gradient text-white" : "hover:bg-secondary"}`,
						children: c === "ALL" ? "All" : c === "SIO_LITERATURE" ? "SIO Literature" : "Contemporary"
					}, c))
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					value: search,
					onChange: (e) => handleSearchChange(e.target.value),
					placeholder: "Search books, authors…",
					className: "flex-1 min-w-[200px] px-4 py-2 rounded-md border bg-background text-sm"
				})]
			}),
			q.isLoading && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-muted-foreground",
				children: "Loading…"
			}),
			q.data?.results.length === 0 && !q.isLoading && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-muted-foreground",
				children: "No books found."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4",
				children: q.data?.results.map((b) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					onClick: () => setSelectedBook(b),
					className: "rounded-xl border bg-card overflow-hidden flex flex-col hover:shadow-lg transition-shadow text-left cursor-pointer",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "aspect-[3/4] bg-muted overflow-hidden",
						children: b.cover_image ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: b.cover_image,
							alt: b.title,
							className: "w-full h-full object-cover"
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "w-full h-full brand-gradient flex items-center justify-center text-white font-display text-2xl p-4 text-center",
							children: b.title
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "p-4 flex-1 flex flex-col",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-[10px] uppercase tracking-wider text-brand-blue font-semibold",
								children: b.category_display
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "font-semibold mt-1 line-clamp-2",
								children: b.title
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-xs text-muted-foreground mt-1",
								children: ["by ", b.author]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "mt-3 text-xs font-medium text-brand-red",
								children: "Read Book →"
							})
						]
					})]
				}, b.id))
			}),
			totalPages > 1 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-8 flex flex-col items-center gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-sm text-muted-foreground",
					children: [
						"Showing ",
						(page - 1) * PAGE_SIZE + 1,
						" - ",
						Math.min(page * PAGE_SIZE, q.data?.count ?? 0),
						" of ",
						q.data?.count,
						" books"
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pagination, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PaginationContent, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PaginationItem, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PaginationPrevious, {
						onClick: () => setPage((p) => Math.max(1, p - 1)),
						className: page === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"
					}) }),
					Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
						let pageNum;
						if (totalPages <= 5) pageNum = i + 1;
						else if (page <= 3) pageNum = i + 1;
						else if (page >= totalPages - 2) pageNum = totalPages - 4 + i;
						else pageNum = page - 2 + i;
						return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PaginationItem, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PaginationLink, {
							onClick: () => setPage(pageNum),
							isActive: page === pageNum,
							className: "cursor-pointer",
							children: pageNum
						}) }, pageNum);
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PaginationItem, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PaginationNext, {
						onClick: () => setPage((p) => Math.min(totalPages, p + 1)),
						className: page === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"
					}) })
				] }) })]
			})
		]
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
		open: !!selectedBook,
		onOpenChange: (open) => !open && setSelectedBook(null),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
			className: "max-w-5xl w-[95vw] h-[90vh] flex flex-col p-0",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogHeader, {
				className: "p-4 border-b shrink-0",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogTitle, {
					className: "flex items-center justify-between pr-8",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-lg font-semibold",
						children: selectedBook?.title
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "text-sm text-muted-foreground ml-2",
						children: ["by ", selectedBook?.author]
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: selectedBook?.drive_link,
						target: "_blank",
						rel: "noreferrer",
						className: "text-xs px-3 py-1.5 rounded-md border hover:bg-secondary cursor-pointer",
						children: "Open in Drive ↗"
					})]
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex-1 min-h-0",
				children: selectedBook && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("iframe", {
					src: getEmbedUrl(selectedBook.drive_link),
					className: "w-full h-full border-0",
					allow: "autoplay",
					title: selectedBook.title
				})
			})]
		})
	})] });
}
//#endregion
export { Library as component };
