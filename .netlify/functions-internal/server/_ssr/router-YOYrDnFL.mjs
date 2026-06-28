import { r as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { N as useRouter, c as HeadContent, d as Outlet, f as lazyRouteComponent, h as Link, m as createRootRouteWithContext, p as createFileRoute, s as Scripts, u as createRouter } from "../_libs/@tanstack/react-router+[...].mjs";
import { M as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { n as QueryClient } from "../_libs/tanstack__query-core.mjs";
import { n as QueryClientProvider } from "../_libs/tanstack__react-query.mjs";
import { t as Toaster } from "../_libs/sonner.mjs";
import { t as Route$17 } from "./events._id-Cl-w31Dl.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/router-YOYrDnFL.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var styles_default = "/assets/styles-sPXLr3dH.css";
var Toaster$1 = ({ ...props }) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toaster, {
		className: "toaster group",
		toastOptions: { classNames: {
			toast: "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
			description: "group-[.toast]:text-muted-foreground",
			actionButton: "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
			cancelButton: "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground"
		} },
		...props
	});
};
function reportLovableError(error, context = {}) {
	if (typeof window === "undefined") return;
	window.__lovableEvents?.captureException?.(error, {
		source: "react_error_boundary",
		route: window.location.pathname,
		...context
	}, {
		mechanism: "react_error_boundary",
		handled: false,
		severity: "error"
	});
}
function NotFoundComponent() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-7xl font-bold text-foreground",
					children: "404"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-4 text-xl font-semibold text-foreground",
					children: "Page not found"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "The page you're looking for doesn't exist or has been moved."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-6",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/",
						className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
						children: "Go home"
					})
				})
			]
		})
	});
}
function ErrorComponent({ error, reset }) {
	console.error(error);
	const router = useRouter();
	(0, import_react.useEffect)(() => {
		reportLovableError(error, { boundary: "tanstack_root_error_component" });
	}, [error]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-xl font-semibold tracking-tight text-foreground",
					children: "This page didn't load"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "Something went wrong on our end. You can try refreshing or head back home."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6 flex flex-wrap justify-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => {
							router.invalidate();
							reset();
						},
						className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
						children: "Try again"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: "/",
						className: "inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent",
						children: "Go home"
					})]
				})
			]
		})
	});
}
var Route$16 = createRootRouteWithContext()({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			},
			{ title: "SIO R. T. Nagar — Students Islamic Organisation" },
			{
				name: "description",
				content: "Official website of SIO R. T. Nagar — events, activities, digital library and more."
			},
			{
				property: "og:title",
				content: "SIO R. T. Nagar"
			},
			{
				property: "og:description",
				content: "Students Islamic Organisation of India, R. T. Nagar unit."
			},
			{
				property: "og:type",
				content: "website"
			},
			{
				name: "twitter:card",
				content: "summary"
			}
		],
		links: [
			{
				rel: "stylesheet",
				href: styles_default
			},
			{
				rel: "preconnect",
				href: "https://fonts.googleapis.com"
			},
			{
				rel: "preconnect",
				href: "https://fonts.gstatic.com",
				crossOrigin: "anonymous"
			},
			{
				rel: "stylesheet",
				href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Playfair+Display:wght@500;600;700;800&display=swap"
			}
		]
	}),
	shellComponent: RootShell,
	component: RootComponent,
	notFoundComponent: NotFoundComponent,
	errorComponent: ErrorComponent
});
function RootShell({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: "en",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("head", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", { children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})] })]
	});
}
function RootComponent() {
	const { queryClient } = Route$16.useRouteContext();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(QueryClientProvider, {
		client: queryClient,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toaster$1, {
			position: "top-right",
			richColors: true
		})]
	});
}
var $$splitComponentImporter$15 = () => import("./library-CHKxv0b5.mjs");
var Route$15 = createFileRoute("/library")({
	head: () => ({ meta: [{ title: "Digital Library — SIO R. T. Nagar" }, {
		name: "description",
		content: "Curated reading list — SIO literature & contemporary works."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$15, "component")
});
var $$splitComponentImporter$14 = () => import("./events-BmyuW2pM.mjs");
var Route$14 = createFileRoute("/events")({
	head: () => ({ meta: [{ title: "Events — SIO R. T. Nagar" }, {
		name: "description",
		content: "Upcoming and past events."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$14, "component")
});
var $$splitComponentImporter$13 = () => import("./contact-SikneTfE.mjs");
var Route$13 = createFileRoute("/contact")({
	head: () => ({ meta: [{ title: "Contact — SIO R. T. Nagar" }] }),
	component: lazyRouteComponent($$splitComponentImporter$13, "component")
});
var $$splitComponentImporter$12 = () => import("./announcements-kdx-e8a0.mjs");
var Route$12 = createFileRoute("/announcements")({
	head: () => ({ meta: [{ title: "Announcements — SIO R. T. Nagar" }] }),
	component: lazyRouteComponent($$splitComponentImporter$12, "component")
});
var $$splitComponentImporter$11 = () => import("./admin-BXUknR7O.mjs");
var Route$11 = createFileRoute("/admin")({
	head: () => ({ meta: [{ title: "Admin — SIO R. T. Nagar" }] }),
	component: lazyRouteComponent($$splitComponentImporter$11, "component")
});
var $$splitComponentImporter$10 = () => import("./activities-CPKGg3U1.mjs");
var Route$10 = createFileRoute("/activities")({
	head: () => ({ meta: [{ title: "Activities — SIO R. T. Nagar" }, {
		name: "description",
		content: "Recent activities organised by SIO R. T. Nagar."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$10, "component")
});
var $$splitComponentImporter$9 = () => import("./about-DaM9gEa2.mjs");
var Route$9 = createFileRoute("/about")({
	head: () => ({ meta: [{ title: "About — SIO R. T. Nagar" }, {
		name: "description",
		content: "Meet the office bearers leading SIO R. T. Nagar."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$9, "component")
});
var $$splitComponentImporter$8 = () => import("./routes-CguNCADr.mjs");
var Route$8 = createFileRoute("/")({
	head: () => ({ meta: [{ title: "SIO R. T. Nagar — Home" }, {
		name: "description",
		content: "Students Islamic Organisation, R. T. Nagar — building tomorrow's leaders today."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$8, "component")
});
var $$splitComponentImporter$7 = () => import("./admin.index-1s8aQfyJ.mjs");
var Route$7 = createFileRoute("/admin/")({ component: lazyRouteComponent($$splitComponentImporter$7, "component") });
var $$splitComponentImporter$6 = () => import("./admin.home-B0uwnmkr.mjs");
var Route$6 = createFileRoute("/admin/home")({ component: lazyRouteComponent($$splitComponentImporter$6, "component") });
var $$splitComponentImporter$5 = () => import("./admin.events-CFGJZ2vL.mjs");
var Route$5 = createFileRoute("/admin/events")({ component: lazyRouteComponent($$splitComponentImporter$5, "component") });
var $$splitComponentImporter$4 = () => import("./admin.contact-D-tVy7oT.mjs");
var Route$4 = createFileRoute("/admin/contact")({ component: lazyRouteComponent($$splitComponentImporter$4, "component") });
var $$splitComponentImporter$3 = () => import("./admin.books-Cxk0DWBN.mjs");
var Route$3 = createFileRoute("/admin/books")({ component: lazyRouteComponent($$splitComponentImporter$3, "component") });
var $$splitComponentImporter$2 = () => import("./admin.bearers-99QKWCkr.mjs");
var Route$2 = createFileRoute("/admin/bearers")({ component: lazyRouteComponent($$splitComponentImporter$2, "component") });
var $$splitComponentImporter$1 = () => import("./admin.announcements-Cf8QLXFO.mjs");
var Route$1 = createFileRoute("/admin/announcements")({ component: lazyRouteComponent($$splitComponentImporter$1, "component") });
var $$splitComponentImporter = () => import("./admin.activities-BqS5OZlf.mjs");
var Route = createFileRoute("/admin/activities")({ component: lazyRouteComponent($$splitComponentImporter, "component") });
var LibraryRoute = Route$15.update({
	id: "/library",
	path: "/library",
	getParentRoute: () => Route$16
});
var EventsRoute = Route$14.update({
	id: "/events",
	path: "/events",
	getParentRoute: () => Route$16
});
var ContactRoute = Route$13.update({
	id: "/contact",
	path: "/contact",
	getParentRoute: () => Route$16
});
var AnnouncementsRoute = Route$12.update({
	id: "/announcements",
	path: "/announcements",
	getParentRoute: () => Route$16
});
var AdminRoute = Route$11.update({
	id: "/admin",
	path: "/admin",
	getParentRoute: () => Route$16
});
var ActivitiesRoute = Route$10.update({
	id: "/activities",
	path: "/activities",
	getParentRoute: () => Route$16
});
var AboutRoute = Route$9.update({
	id: "/about",
	path: "/about",
	getParentRoute: () => Route$16
});
var IndexRoute = Route$8.update({
	id: "/",
	path: "/",
	getParentRoute: () => Route$16
});
var AdminIndexRoute = Route$7.update({
	id: "/",
	path: "/",
	getParentRoute: () => AdminRoute
});
var EventsIdRoute = Route$17.update({
	id: "/$id",
	path: "/$id",
	getParentRoute: () => EventsRoute
});
var AdminHomeRoute = Route$6.update({
	id: "/home",
	path: "/home",
	getParentRoute: () => AdminRoute
});
var AdminEventsRoute = Route$5.update({
	id: "/events",
	path: "/events",
	getParentRoute: () => AdminRoute
});
var AdminContactRoute = Route$4.update({
	id: "/contact",
	path: "/contact",
	getParentRoute: () => AdminRoute
});
var AdminBooksRoute = Route$3.update({
	id: "/books",
	path: "/books",
	getParentRoute: () => AdminRoute
});
var AdminBearersRoute = Route$2.update({
	id: "/bearers",
	path: "/bearers",
	getParentRoute: () => AdminRoute
});
var AdminAnnouncementsRoute = Route$1.update({
	id: "/announcements",
	path: "/announcements",
	getParentRoute: () => AdminRoute
});
var AdminRouteChildren = {
	AdminActivitiesRoute: Route.update({
		id: "/activities",
		path: "/activities",
		getParentRoute: () => AdminRoute
	}),
	AdminAnnouncementsRoute,
	AdminBearersRoute,
	AdminBooksRoute,
	AdminContactRoute,
	AdminEventsRoute,
	AdminHomeRoute,
	AdminIndexRoute
};
var AdminRouteWithChildren = AdminRoute._addFileChildren(AdminRouteChildren);
var EventsRouteChildren = { EventsIdRoute };
var rootRouteChildren = {
	IndexRoute,
	AboutRoute,
	ActivitiesRoute,
	AdminRoute: AdminRouteWithChildren,
	AnnouncementsRoute,
	ContactRoute,
	EventsRoute: EventsRoute._addFileChildren(EventsRouteChildren),
	LibraryRoute
};
var routeTree = Route$16._addFileChildren(rootRouteChildren)._addFileTypes();
var getRouter = () => {
	return createRouter({
		routeTree,
		context: { queryClient: new QueryClient() },
		scrollRestoration: true,
		defaultPreloadStaleTime: 0
	});
};
//#endregion
export { getRouter };
