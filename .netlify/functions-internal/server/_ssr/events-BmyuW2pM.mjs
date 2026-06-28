import { r as __toESM } from "../_runtime.mjs";
import { n as apiGet } from "./api-DzHwqZS_.mjs";
import { t as cn } from "./utils-C_uf36nf.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { M as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { t as useQuery } from "../_libs/tanstack__react-query.mjs";
import { a as ChevronDown, n as ChevronUp, o as Check } from "../_libs/lucide-react.mjs";
import { a as SiteLayout, i as DialogTitle, n as DialogContent, r as DialogHeader, t as Dialog } from "./SiteLayout-DD3Cgzx3.mjs";
import { t as Button } from "./button-BkEeRci-.mjs";
import { a as PaginationNext, i as PaginationLink, n as PaginationContent, o as PaginationPrevious, r as PaginationItem, t as Pagination } from "./pagination-DyWqmueJ.mjs";
import { a as SelectItemIndicator, c as SelectPortal, d as SelectSeparator$1, f as SelectTrigger$1, i as SelectItem$1, l as SelectScrollDownButton$1, m as SelectViewport, n as SelectContent$1, o as SelectItemText, p as SelectValue$1, r as SelectIcon, s as SelectLabel$1, t as Select$1, u as SelectScrollUpButton$1 } from "../_libs/@radix-ui/react-select+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/events-BmyuW2pM.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var Select = Select$1;
var SelectValue = SelectValue$1;
var SelectTrigger = import_react.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectTrigger$1, {
	ref,
	className: cn("flex h-9 w-full items-center justify-between whitespace-nowrap rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-background cursor-pointer data-[placeholder]:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1", className),
	...props,
	children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectIcon, {
		asChild: true,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, { className: "h-4 w-4 opacity-50" })
	})]
}));
SelectTrigger.displayName = SelectTrigger$1.displayName;
var SelectScrollUpButton = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectScrollUpButton$1, {
	ref,
	className: cn("flex cursor-default items-center justify-center py-1", className),
	...props,
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronUp, { className: "h-4 w-4" })
}));
SelectScrollUpButton.displayName = SelectScrollUpButton$1.displayName;
var SelectScrollDownButton = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectScrollDownButton$1, {
	ref,
	className: cn("flex cursor-default items-center justify-center py-1", className),
	...props,
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, { className: "h-4 w-4" })
}));
SelectScrollDownButton.displayName = SelectScrollDownButton$1.displayName;
var SelectContent = import_react.forwardRef(({ className, children, position = "popper", ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectPortal, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent$1, {
	ref,
	className: cn("relative z-50 max-h-(--radix-select-content-available-height) min-w-[8rem] overflow-y-auto overflow-x-hidden rounded-md border bg-popover text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-(--radix-select-content-transform-origin)", position === "popper" && "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1", className),
	position,
	...props,
	children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectScrollUpButton, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectViewport, {
			className: cn("p-1", position === "popper" && "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]"),
			children
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectScrollDownButton, {})
	]
}) }));
SelectContent.displayName = SelectContent$1.displayName;
var SelectLabel = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectLabel$1, {
	ref,
	className: cn("px-2 py-1.5 text-sm font-semibold", className),
	...props
}));
SelectLabel.displayName = SelectLabel$1.displayName;
var SelectItem = import_react.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectItem$1, {
	ref,
	className: cn("relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-2 pr-8 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50", className),
	...props,
	children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: "absolute right-2 flex h-3.5 w-3.5 items-center justify-center",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItemIndicator, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "h-4 w-4" }) })
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItemText, { children })]
}));
SelectItem.displayName = SelectItem$1.displayName;
var SelectSeparator = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectSeparator$1, {
	ref,
	className: cn("-mx-1 my-1 h-px bg-muted", className),
	...props
}));
SelectSeparator.displayName = SelectSeparator$1.displayName;
var MONTHS = [
	{
		value: "",
		label: "All Months"
	},
	{
		value: "1",
		label: "January"
	},
	{
		value: "2",
		label: "February"
	},
	{
		value: "3",
		label: "March"
	},
	{
		value: "4",
		label: "April"
	},
	{
		value: "5",
		label: "May"
	},
	{
		value: "6",
		label: "June"
	},
	{
		value: "7",
		label: "July"
	},
	{
		value: "8",
		label: "August"
	},
	{
		value: "9",
		label: "September"
	},
	{
		value: "10",
		label: "October"
	},
	{
		value: "11",
		label: "November"
	},
	{
		value: "12",
		label: "December"
	}
];
var PAGE_SIZE = 12;
function Events() {
	const currentYear = (/* @__PURE__ */ new Date()).getFullYear();
	(/* @__PURE__ */ new Date()).getMonth() + 1;
	const [type, setType] = (0, import_react.useState)("UPCOMING");
	const [year, setYear] = (0, import_react.useState)(String(currentYear));
	const [month, setMonth] = (0, import_react.useState)("");
	const [page, setPage] = (0, import_react.useState)(1);
	const [selectedEventId, setSelectedEventId] = (0, import_react.useState)(null);
	const years = Array.from({ length: 8 }, (_, i) => currentYear - 5 + i);
	const q = useQuery({
		queryKey: [
			"events",
			type,
			year,
			month,
			page
		],
		queryFn: () => {
			const params = new URLSearchParams();
			params.append("event_type", type);
			if (year) params.append("year", year);
			if (month) params.append("month", month);
			params.append("page", String(page));
			return apiGet(`/events/?${params.toString()}`);
		}
	});
	const eventDetail = useQuery({
		queryKey: ["event", selectedEventId],
		queryFn: () => apiGet(`/events/${selectedEventId}/`),
		enabled: !!selectedEventId
	});
	const totalPages = q.data ? Math.ceil(q.data.count / PAGE_SIZE) : 0;
	const handleClearFilters = () => {
		setYear(String(currentYear));
		setMonth("");
		setType("UPCOMING");
		setPage(1);
	};
	const handleTypeChange = (value) => {
		setType(value);
		setPage(1);
	};
	const handleYearChange = (value) => {
		setYear(value);
		setPage(1);
	};
	const handleMonthChange = (value) => {
		setMonth(value);
		setPage(1);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SiteLayout, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "max-w-7xl mx-auto px-4 py-16",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-4xl md:text-5xl font-bold mb-3",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "brand-text-gradient",
					children: "Events"
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-muted-foreground mb-6",
				children: "Join us — or relive the moments."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap gap-4 items-end mb-8 p-4 rounded-lg border bg-card",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex rounded-md border overflow-hidden w-fit",
						children: ["UPCOMING", "PAST"].map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => handleTypeChange(t),
							className: `px-5 py-2 text-sm font-medium cursor-pointer ${type === t ? "brand-gradient text-white" : "hover:bg-secondary"}`,
							children: t === "UPCOMING" ? "Upcoming" : "Past"
						}, t))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-col gap-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: "text-sm font-medium",
							children: "Year"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
							value: year,
							onValueChange: handleYearChange,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
								className: "w-28",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, { placeholder: "Year" })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, { children: years.map((y) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
								value: String(y),
								children: y
							}, y)) })]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-col gap-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: "text-sm font-medium",
							children: "Month"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
							value: month,
							onValueChange: handleMonthChange,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
								className: "w-36",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, { placeholder: "All Months" })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, { children: MONTHS.map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
								value: m.value,
								children: m.label
							}, m.value || "all")) })]
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
				children: "No events found for the selected filters."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid gap-6 md:grid-cols-2 lg:grid-cols-3",
				children: q.data?.results.map((e) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					onClick: () => setSelectedEventId(e.id),
					className: "rounded-xl border bg-card p-6 hover:shadow-lg transition-shadow cursor-pointer",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between mb-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-xs font-bold uppercase tracking-wider text-brand-red",
								children: e.event_type_display
							}), e.photo_count ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "text-xs text-muted-foreground",
								children: ["📷 ", e.photo_count]
							}) : null]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "text-lg font-semibold mb-1",
							children: e.title
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-muted-foreground line-clamp-3 mb-3",
							children: e.description
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "text-xs text-muted-foreground space-y-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: ["🗓 ", new Date(e.event_date).toLocaleString()] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: ["📍 ", e.location] })]
						})
					]
				}, e.id))
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
						" events"
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
		open: !!selectedEventId,
		onOpenChange: (open) => !open && setSelectedEventId(null),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
			className: "max-w-4xl w-[95vw] max-h-[90vh] overflow-y-auto",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, {
					className: "text-2xl font-bold",
					children: eventDetail.data?.title
				}) }),
				eventDetail.isLoading && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-muted-foreground",
					children: "Loading…"
				}),
				eventDetail.isError && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-destructive",
					children: "Event not found."
				}),
				eventDetail.data && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-xs font-bold uppercase tracking-wider text-brand-red",
							children: eventDetail.data.event_type_display
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "text-sm text-muted-foreground space-y-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: ["🗓 ", new Date(eventDetail.data.event_date).toLocaleString()] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: ["📍 ", eventDetail.data.location] })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-base whitespace-pre-line",
							children: eventDetail.data.description
						}),
						eventDetail.data.photos && eventDetail.data.photos.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-6",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "text-xl font-bold mb-4",
								children: "Photos"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "grid gap-4 sm:grid-cols-2 md:grid-cols-3",
								children: eventDetail.data.photos.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("figure", {
									className: "rounded-xl border overflow-hidden bg-card",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
										src: p.photo,
										alt: p.caption,
										className: "aspect-video object-cover w-full"
									}), p.caption && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("figcaption", {
										className: "text-xs p-3 text-muted-foreground",
										children: p.caption
									})]
								}, p.id))
							})]
						})
					]
				})
			]
		})
	})] });
}
//#endregion
export { Events as component };
