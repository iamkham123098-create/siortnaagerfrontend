import { h as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { M as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin.index-1s8aQfyJ.js
var import_jsx_runtime = require_jsx_runtime();
var cards = [
	{
		to: "/admin/home",
		label: "Home Page",
		desc: "Hero, vision, mission and CTAs."
	},
	{
		to: "/admin/bearers",
		label: "Office Bearers",
		desc: "Manage team members."
	},
	{
		to: "/admin/activities",
		label: "Activities",
		desc: "Post recent activities."
	},
	{
		to: "/admin/books",
		label: "Books",
		desc: "Digital library entries."
	},
	{
		to: "/admin/events",
		label: "Events",
		desc: "Upcoming & past events."
	},
	{
		to: "/admin/announcements",
		label: "Announcements",
		desc: "Pin and publish."
	},
	{
		to: "/admin/contact",
		label: "Contact",
		desc: "Office info & socials."
	}
];
function Overview() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "text-3xl font-bold mb-2",
			children: "Welcome back"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-muted-foreground mb-8",
			children: "Manage every section of the SIO R. T. Nagar website."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "grid gap-4 sm:grid-cols-2 lg:grid-cols-3",
			children: cards.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: c.to,
				className: "rounded-xl border bg-card p-5 hover:shadow-lg transition-shadow",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-1 w-10 brand-gradient rounded mb-3" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "font-semibold",
						children: c.label
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-sm text-muted-foreground mt-1",
						children: c.desc
					})
				]
			}, c.to))
		})
	] });
}
//#endregion
export { Overview as component };
