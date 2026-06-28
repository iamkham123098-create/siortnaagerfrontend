import { n as apiGet } from "./api-DzHwqZS_.mjs";
import { M as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { t as useQuery } from "../_libs/tanstack__react-query.mjs";
import { a as SiteLayout } from "./SiteLayout-DD3Cgzx3.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/about-DaM9gEa2.js
var import_jsx_runtime = require_jsx_runtime();
function About() {
	const q = useQuery({
		queryKey: ["office-bearers"],
		queryFn: () => apiGet("/about/office-bearers/?ordering=display_order")
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteLayout, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "max-w-7xl mx-auto px-4 py-16",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-4xl md:text-5xl font-bold mb-3",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "brand-text-gradient",
					children: "Office Bearers"
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-muted-foreground mb-10 max-w-2xl",
				children: "The team leading SIO R. T. Nagar — committed to faith, knowledge and service."
			}),
			q.isLoading && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-muted-foreground",
				children: "Loading…"
			}),
			q.isError && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-destructive",
				children: "Unable to load office bearers."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid gap-6 sm:grid-cols-2 lg:grid-cols-3",
				children: q.data?.results.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-xl border bg-card p-6 text-center",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mx-auto w-28 h-28 rounded-full overflow-hidden brand-gradient p-1 mb-4",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "w-full h-full rounded-full overflow-hidden bg-muted flex items-center justify-center text-2xl font-display",
								children: p.photo ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
									src: p.photo,
									alt: p.name,
									className: "w-full h-full object-cover"
								}) : p.name.charAt(0)
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "font-semibold text-lg",
							children: p.name
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-sm text-brand-red font-medium mb-3",
							children: p.position
						}),
						p.email && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-xs text-muted-foreground",
							children: p.email
						}),
						p.contact_number && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-xs text-muted-foreground",
							children: p.contact_number
						})
					]
				}, p.id))
			})
		]
	}) });
}
//#endregion
export { About as component };
