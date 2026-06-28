import { r as __toESM } from "../_runtime.mjs";
import { n as apiGet } from "./api-DzHwqZS_.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { M as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { t as useQuery } from "../_libs/tanstack__react-query.mjs";
import { a as SiteLayout, i as DialogTitle, n as DialogContent, r as DialogHeader, t as Dialog } from "./SiteLayout-DD3Cgzx3.mjs";
import { t as Input } from "./input-B8Q2ztVi.mjs";
import { t as Button } from "./button-BkEeRci-.mjs";
import { a as PaginationNext, i as PaginationLink, n as PaginationContent, o as PaginationPrevious, r as PaginationItem, t as Pagination } from "./pagination-DyWqmueJ.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/activities-CPKGg3U1.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var PAGE_SIZE = 12;
function Activities() {
	const currentYear = (/* @__PURE__ */ new Date()).getFullYear();
	const [fromDate, setFromDate] = (0, import_react.useState)(`${currentYear}-01-01`);
	const [toDate, setToDate] = (0, import_react.useState)(`${currentYear}-12-31`);
	const [page, setPage] = (0, import_react.useState)(1);
	const [selectedActivity, setSelectedActivity] = (0, import_react.useState)(null);
	const q = useQuery({
		queryKey: [
			"activities",
			fromDate,
			toDate,
			page
		],
		queryFn: () => {
			const params = new URLSearchParams();
			if (fromDate) params.append("from_date", fromDate);
			if (toDate) params.append("to_date", toDate);
			params.append("page", String(page));
			return apiGet(`/activities/?${params.toString()}`);
		}
	});
	const totalPages = q.data ? Math.ceil(q.data.count / PAGE_SIZE) : 0;
	const handleClearFilters = () => {
		setFromDate(`${currentYear}-01-01`);
		setToDate(`${currentYear}-12-31`);
		setPage(1);
	};
	const handleFromDateChange = (value) => {
		setFromDate(value);
		setPage(1);
	};
	const handleToDateChange = (value) => {
		setToDate(value);
		setPage(1);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SiteLayout, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "max-w-7xl mx-auto px-4 py-16",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-4xl md:text-5xl font-bold mb-3",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "brand-text-gradient",
					children: "Activities"
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-muted-foreground mb-6 max-w-2xl",
				children: "What we've been doing — programs, study circles, workshops & community service."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap gap-4 items-end mb-8 p-4 rounded-lg border bg-card",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-col gap-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: "text-sm font-medium",
							children: "From Date"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							type: "date",
							value: fromDate,
							onChange: (e) => handleFromDateChange(e.target.value),
							className: "w-40"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-col gap-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: "text-sm font-medium",
							children: "To Date"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							type: "date",
							value: toDate,
							onChange: (e) => handleToDateChange(e.target.value),
							className: "w-40"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "outline",
						onClick: handleClearFilters,
						children: "Reset"
					})
				]
			}),
			q.isLoading && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-muted-foreground",
				children: "Loading…"
			}),
			q.data?.results.length === 0 && !q.isLoading && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-muted-foreground",
				children: "No activities found for the selected date range."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid gap-6 md:grid-cols-2 lg:grid-cols-3",
				children: q.data?.results.map((a) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
					onClick: () => setSelectedActivity(a),
					className: "rounded-xl border bg-card overflow-hidden flex flex-col cursor-pointer hover:shadow-lg transition-shadow",
					children: [a.photo && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: a.photo,
						alt: a.title,
						className: "aspect-video object-cover w-full"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "p-5 flex-1 flex flex-col",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-xs text-brand-red font-medium uppercase tracking-wider mb-2",
								children: new Date(a.activity_date).toLocaleDateString(void 0, { dateStyle: "medium" })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "font-semibold text-lg mb-2",
								children: a.title
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm text-muted-foreground line-clamp-4",
								children: a.description
							})
						]
					})]
				}, a.id))
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
						" activities"
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
		open: !!selectedActivity,
		onOpenChange: (open) => !open && setSelectedActivity(null),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
			className: "max-w-3xl w-[95vw] max-h-[90vh] overflow-y-auto",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, {
				className: "text-2xl font-bold",
				children: selectedActivity?.title
			}) }), selectedActivity && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "text-sm text-brand-red font-medium uppercase tracking-wider",
						children: ["🗓 ", new Date(selectedActivity.activity_date).toLocaleDateString(void 0, { dateStyle: "full" })]
					}),
					selectedActivity.photo && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: selectedActivity.photo,
						alt: selectedActivity.title,
						className: "w-full rounded-lg object-cover max-h-[400px]"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-base whitespace-pre-line text-muted-foreground",
						children: selectedActivity.description
					})
				]
			})]
		})
	})] });
}
//#endregion
export { Activities as component };
