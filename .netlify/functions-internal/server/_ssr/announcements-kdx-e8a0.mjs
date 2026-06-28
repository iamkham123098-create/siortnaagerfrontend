import { r as __toESM } from "../_runtime.mjs";
import { n as apiGet } from "./api-DzHwqZS_.mjs";
import { t as cn } from "./utils-C_uf36nf.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { M as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { t as useQuery } from "../_libs/tanstack__react-query.mjs";
import { o as Check } from "../_libs/lucide-react.mjs";
import { n as CheckboxIndicator, t as Checkbox$1 } from "../_libs/@radix-ui/react-checkbox+[...].mjs";
import { a as SiteLayout } from "./SiteLayout-DD3Cgzx3.mjs";
import { t as Input } from "./input-B8Q2ztVi.mjs";
import { t as Button } from "./button-BkEeRci-.mjs";
import { a as PaginationNext, i as PaginationLink, n as PaginationContent, o as PaginationPrevious, r as PaginationItem, t as Pagination } from "./pagination-DyWqmueJ.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/announcements-kdx-e8a0.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var Checkbox = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Checkbox$1, {
	ref,
	className: cn("grid place-content-center peer h-4 w-4 shrink-0 rounded-sm border border-primary shadow cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground", className),
	...props,
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CheckboxIndicator, {
		className: cn("grid place-content-center text-current"),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "h-4 w-4" })
	})
}));
Checkbox.displayName = Checkbox$1.displayName;
var PAGE_SIZE = 10;
function Page() {
	const currentDate = /* @__PURE__ */ new Date();
	`${currentDate.getFullYear()}${String(currentDate.getMonth() + 1).padStart(2, "0")}`;
	const [fromDate, setFromDate] = (0, import_react.useState)("");
	const [pinnedOnly, setPinnedOnly] = (0, import_react.useState)(false);
	const [page, setPage] = (0, import_react.useState)(1);
	const q = useQuery({
		queryKey: [
			"announcements",
			fromDate,
			pinnedOnly,
			page
		],
		queryFn: () => {
			const params = new URLSearchParams();
			if (fromDate) params.append("from_date", fromDate);
			if (pinnedOnly) params.append("is_pinned", "true");
			params.append("page", String(page));
			return apiGet(`/announcements/?${params.toString()}`);
		}
	});
	const totalPages = q.data ? Math.ceil(q.data.count / PAGE_SIZE) : 0;
	const handleClearFilters = () => {
		setFromDate("");
		setPinnedOnly(false);
		setPage(1);
	};
	const handleFromDateChange = (value) => {
		setFromDate(value);
		setPage(1);
	};
	const handlePinnedChange = (checked) => {
		setPinnedOnly(checked);
		setPage(1);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteLayout, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "max-w-4xl mx-auto px-4 py-16",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-4xl md:text-5xl font-bold mb-3",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "brand-text-gradient",
					children: "Announcements"
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-muted-foreground mb-6",
				children: "Stay informed on the latest from SIO R. T. Nagar."
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
						className: "flex items-center gap-2 h-10",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Checkbox, {
							id: "pinned",
							checked: pinnedOnly,
							onCheckedChange: (checked) => handlePinnedChange(checked === true)
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							htmlFor: "pinned",
							className: "text-sm font-medium cursor-pointer",
							children: "Pinned Only"
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
				children: "No announcements found for the selected filters."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "space-y-4",
				children: q.data?.results.map((a) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
					className: `rounded-xl border bg-card p-6 ${a.is_pinned ? "border-brand-red/50" : ""}`,
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2 mb-2",
							children: [a.is_pinned && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-brand-red text-white",
								children: "Pinned"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-xs text-muted-foreground",
								children: new Date(a.created_at).toLocaleDateString()
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "text-xl font-semibold mb-2",
							children: a.title
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm whitespace-pre-line text-muted-foreground",
							children: a.content
						})
					]
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
						" announcements"
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
	}) });
}
//#endregion
export { Page as component };
