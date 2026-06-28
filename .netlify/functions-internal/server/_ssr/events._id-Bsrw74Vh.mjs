import { n as apiGet } from "./api-DzHwqZS_.mjs";
import { h as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { M as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { t as useQuery } from "../_libs/tanstack__react-query.mjs";
import { a as SiteLayout } from "./SiteLayout-DD3Cgzx3.mjs";
import { t as Route } from "./events._id-Cl-w31Dl.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/events._id-Bsrw74Vh.js
var import_jsx_runtime = require_jsx_runtime();
function EventDetail() {
	const { id } = Route.useParams();
	const q = useQuery({
		queryKey: ["event", id],
		queryFn: () => apiGet(`/events/${id}/`)
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteLayout, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "max-w-5xl mx-auto px-4 py-12",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/events",
				className: "text-sm text-muted-foreground hover:text-foreground",
				children: "← Back to events"
			}),
			q.isLoading && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-6 text-muted-foreground",
				children: "Loading…"
			}),
			q.isError && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-6 text-destructive",
				children: "Event not found."
			}),
			q.data && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
				className: "mt-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-xs font-bold uppercase tracking-wider text-brand-red",
						children: q.data.event_type_display
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "text-4xl md:text-5xl font-bold mt-2 mb-4",
						children: q.data.title
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "text-sm text-muted-foreground space-y-1 mb-6",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: ["🗓 ", new Date(q.data.event_date).toLocaleString()] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: ["📍 ", q.data.location] })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-base whitespace-pre-line",
						children: q.data.description
					}),
					q.data.photos && q.data.photos.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-10",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "text-2xl font-bold mb-4",
							children: "Photos"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "grid gap-4 sm:grid-cols-2 md:grid-cols-3",
							children: q.data.photos.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("figure", {
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
	}) });
}
//#endregion
export { EventDetail as component };
