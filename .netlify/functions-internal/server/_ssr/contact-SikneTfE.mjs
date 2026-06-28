import { r as __toESM } from "../_runtime.mjs";
import { n as apiGet } from "./api-DzHwqZS_.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { M as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { t as useQuery } from "../_libs/tanstack__react-query.mjs";
import { a as SiteLayout, i as DialogTitle, n as DialogContent, r as DialogHeader, t as Dialog } from "./SiteLayout-DD3Cgzx3.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/contact-SikneTfE.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function getEmbedFormUrl(url) {
	if (!url) return "";
	if (url.includes("embedded=true")) return url;
	return `${url}${url.includes("?") ? "&" : "?"}embedded=true`;
}
function Page() {
	const [formDialogOpen, setFormDialogOpen] = (0, import_react.useState)(false);
	const c = useQuery({
		queryKey: ["contact"],
		queryFn: () => apiGet("/contact/").catch(() => null)
	}).data;
	const googleFormUrl = getEmbedFormUrl(c?.google_form_link);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SiteLayout, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "max-w-7xl mx-auto px-4 py-16 grid md:grid-cols-2 gap-10",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-4xl md:text-5xl font-bold mb-3",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "brand-text-gradient",
					children: "Get in touch"
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-muted-foreground mb-8",
				children: "We'd love to hear from you — for membership, collaboration or any query."
			}),
			c ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "font-semibold mb-1",
						children: "Office"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted-foreground whitespace-pre-line",
						children: c.office_address
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "font-semibold mb-1",
						children: "Phone"
					}), c.phone_numbers.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: `tel:${p}`,
						className: "block text-sm text-muted-foreground hover:text-foreground",
						children: p
					}, p))] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "font-semibold mb-1",
						children: "Email"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: `mailto:${c.email}`,
						className: "text-sm text-brand-blue hover:underline",
						children: c.email
					})] }),
					c.social_media_links && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "font-semibold mb-2",
						children: "Follow Us"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex flex-wrap gap-2",
						children: Object.entries(c.social_media_links).map(([k, v]) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: v,
							target: "_blank",
							rel: "noreferrer",
							className: "px-3 py-1.5 rounded-md border text-xs font-medium capitalize hover:bg-secondary",
							children: k
						}, k))
					})] }),
					googleFormUrl && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => setFormDialogOpen(true),
						className: "inline-block brand-gradient text-white px-6 py-3 rounded-md font-medium cursor-pointer",
						children: "Join via Google Form"
					})
				]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-muted-foreground text-sm",
				children: "Contact information will appear here."
			})
		] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "min-h-[300px] rounded-xl border bg-card overflow-hidden",
			children: c?.google_maps_embed_url ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("iframe", {
				src: c.google_maps_embed_url,
				className: "w-full h-full min-h-[400px]",
				loading: "lazy"
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "w-full h-full min-h-[400px] flex items-center justify-center text-sm text-muted-foreground",
				children: "Map unavailable"
			})
		})]
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
		open: formDialogOpen,
		onOpenChange: setFormDialogOpen,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
			className: "max-w-3xl w-[95vw] h-[85vh] p-0",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogHeader, {
				className: "p-4 border-b",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, {
					className: "text-xl font-bold",
					children: "Join SIO"
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("iframe", {
				src: googleFormUrl,
				className: "w-full flex-1 border-0",
				style: { height: "calc(85vh - 60px)" },
				title: "Join SIO Form",
				children: "Loading…"
			})]
		})
	})] });
}
//#endregion
export { Page as component };
