import { n as apiGet } from "./api-DzHwqZS_.mjs";
import { h as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { M as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { t as useQuery } from "../_libs/tanstack__react-query.mjs";
import { a as SiteLayout } from "./SiteLayout-DD3Cgzx3.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-CguNCADr.js
var import_jsx_runtime = require_jsx_runtime();
function Index() {
	const home = useQuery({
		queryKey: ["home"],
		queryFn: () => apiGet("/home/").catch(() => null)
	});
	const upcoming = useQuery({
		queryKey: ["events", "upcoming"],
		queryFn: () => apiGet("/events/?event_type=UPCOMING").catch(() => null)
	});
	const announcements = useQuery({
		queryKey: ["announcements", "home"],
		queryFn: () => apiGet("/announcements/").catch(() => null)
	});
	const h = home.data;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SiteLayout, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "relative overflow-hidden",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "absolute inset-0 -z-10",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute -top-32 -left-32 h-96 w-96 rounded-full bg-brand-blue/30 blur-3xl" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-brand-red/25 blur-3xl" })]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "max-w-7xl mx-auto px-4 py-20 md:py-28 grid md:grid-cols-2 gap-10 items-center",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "inline-flex items-center gap-2 px-3 py-1 rounded-full border bg-card text-xs font-medium mb-6",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-2 w-2 rounded-full bg-brand-red" }), "SIO of India — R. T. Nagar"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "text-4xl md:text-6xl font-bold tracking-tight",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "brand-text-gradient",
							children: h?.hero_title ?? "Welcome to SIO R. T. Nagar"
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-5 text-lg text-muted-foreground max-w-xl",
						children: h?.hero_subtitle ?? "Building Tomorrow's Leaders Today — through faith, knowledge and service to humanity."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-8 flex flex-wrap gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/contact",
							className: "brand-gradient text-white px-6 py-3 rounded-md font-medium shadow-lg shadow-brand-blue/20 hover:opacity-90",
							children: h?.cta_join_text ?? "Join Us"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/events",
							className: "px-6 py-3 rounded-md border font-medium hover:bg-secondary",
							children: h?.cta_events_text ?? "Upcoming Events"
						})]
					})
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative flex justify-center",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 brand-gradient rounded-full blur-3xl opacity-20" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: h?.hero_banner_image || "/assets/SIO_LOGO-Cqsz4Nzg.jpeg",
						alt: "SIO R. T. Nagar",
						className: "relative w-72 h-72 md:w-96 md:h-96 object-cover rounded-full shadow-2xl border-8 border-white"
					})]
				})]
			})]
		}),
		h && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "max-w-7xl mx-auto px-4 py-16 grid md:grid-cols-3 gap-6",
			children: [
				{
					title: "Who We Are",
					body: h.introduction
				},
				{
					title: "Our Vision",
					body: h.vision
				},
				{
					title: "Our Mission",
					body: h.mission
				}
			].map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-xl border bg-card p-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-1 w-12 brand-gradient rounded mb-4" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "text-xl font-semibold mb-2",
						children: c.title
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted-foreground whitespace-pre-line",
						children: c.body
					})
				]
			}, c.title))
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "max-w-7xl mx-auto px-4 py-12",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-end justify-between mb-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-3xl font-bold",
					children: "Upcoming Events"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-muted-foreground text-sm",
					children: "Be part of what's next."
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/events",
					className: "text-sm font-medium text-primary hover:underline",
					children: "View all →"
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid gap-5 md:grid-cols-3",
				children: upcoming.data?.results.slice(0, 3).map((e) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/events/$id",
					params: { id: String(e.id) },
					className: "rounded-xl border bg-card p-5 hover:shadow-lg transition-shadow",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-xs font-medium text-brand-red uppercase tracking-wider mb-2",
							children: new Date(e.event_date).toLocaleDateString(void 0, { dateStyle: "medium" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "font-semibold text-lg mb-1",
							children: e.title
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-muted-foreground line-clamp-2",
							children: e.description
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "text-xs mt-3 text-muted-foreground",
							children: ["📍 ", e.location]
						})
					]
				}, e.id)) ?? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "col-span-3 text-sm text-muted-foreground",
					children: "No upcoming events available."
				})
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "max-w-7xl mx-auto px-4 py-12",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "text-3xl font-bold mb-6",
				children: "Latest Announcements"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid gap-4 md:grid-cols-2",
				children: announcements.data?.results.slice(0, 4).map((a) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-xl border bg-card p-5",
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
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "font-semibold mb-1",
							children: a.title
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-muted-foreground line-clamp-3",
							children: a.content
						})
					]
				}, a.id)) ?? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "text-sm text-muted-foreground",
					children: "No announcements available."
				})
			})]
		})
	] });
}
//#endregion
export { Index as component };
