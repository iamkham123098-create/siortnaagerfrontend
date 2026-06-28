import { r as __toESM } from "../_runtime.mjs";
import { a as login, i as isLoggedIn, o as logout } from "./api-DzHwqZS_.mjs";
import { t as SIO_LOGO_default } from "./SIO_LOGO-GuJJf_zx.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { M as useNavigate, d as Outlet, h as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { M as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin-BXUknR7O.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function AdminShell() {
	const [authed, setAuthed] = (0, import_react.useState)(false);
	const [ready, setReady] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		setAuthed(isLoggedIn());
		setReady(true);
	}, []);
	if (!ready) return null;
	if (!authed) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoginScreen, { onSuccess: () => setAuthed(true) });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminLayout, { onLogout: () => setAuthed(false) });
}
function LoginScreen({ onSuccess }) {
	const [u, setU] = (0, import_react.useState)("");
	const [p, setP] = (0, import_react.useState)("");
	const [err, setErr] = (0, import_react.useState)(null);
	const [loading, setLoading] = (0, import_react.useState)(false);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "min-h-screen flex items-center justify-center px-4 brand-gradient",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
			onSubmit: async (e) => {
				e.preventDefault();
				setErr(null);
				setLoading(true);
				try {
					await login(u, p);
					onSuccess();
				} catch {
					setErr("Invalid credentials or server unreachable.");
				} finally {
					setLoading(false);
				}
			},
			className: "w-full max-w-md bg-card rounded-2xl shadow-2xl p-8 space-y-5",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: SIO_LOGO_default,
						alt: "",
						className: "h-12 w-12 rounded-full"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "font-display text-xl font-semibold",
						children: "Admin Console"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-xs text-muted-foreground",
						children: "SIO R. T. Nagar"
					})] })]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
					className: "text-xs font-medium",
					children: "Username"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					value: u,
					onChange: (e) => setU(e.target.value),
					required: true,
					className: "w-full mt-1 px-3 py-2 rounded-md border bg-background"
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
					className: "text-xs font-medium",
					children: "Password"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					value: p,
					onChange: (e) => setP(e.target.value),
					type: "password",
					required: true,
					className: "w-full mt-1 px-3 py-2 rounded-md border bg-background"
				})] }),
				err && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-destructive",
					children: err
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					disabled: loading,
					className: "w-full brand-gradient text-white py-2.5 rounded-md font-medium disabled:opacity-60 cursor-pointer disabled:cursor-not-allowed",
					children: loading ? "Signing in…" : "Sign in"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/",
					className: "block text-center text-xs text-muted-foreground hover:text-foreground",
					children: "← Back to site"
				})
			]
		})
	});
}
var tabs = [
	{
		to: "/admin",
		label: "Overview"
	},
	{
		to: "/admin/home",
		label: "Home"
	},
	{
		to: "/admin/bearers",
		label: "Office Bearers"
	},
	{
		to: "/admin/activities",
		label: "Activities"
	},
	{
		to: "/admin/books",
		label: "Books"
	},
	{
		to: "/admin/events",
		label: "Events"
	},
	{
		to: "/admin/announcements",
		label: "Announcements"
	},
	{
		to: "/admin/contact",
		label: "Contact"
	}
];
function AdminLayout({ onLogout }) {
	const navigate = useNavigate();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen flex flex-col",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
			className: "border-b bg-card",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "max-w-7xl mx-auto px-4 h-14 flex items-center justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/admin",
					className: "flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: SIO_LOGO_default,
						alt: "",
						className: "h-8 w-8 rounded-full"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-display font-semibold",
						children: "SIO Admin"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/",
						className: "text-xs px-3 py-1.5 rounded-md border hover:bg-secondary cursor-pointer",
						children: "View site"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => {
							logout();
							onLogout();
							navigate({ to: "/admin" });
						},
						className: "text-xs px-3 py-1.5 rounded-md border hover:bg-secondary cursor-pointer",
						children: "Logout"
					})]
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "max-w-7xl mx-auto px-4 overflow-x-auto",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex gap-1 py-2 whitespace-nowrap",
					children: tabs.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: t.to,
						activeOptions: { exact: true },
						activeProps: { className: "brand-gradient text-white" },
						inactiveProps: { className: "hover:bg-secondary text-muted-foreground" },
						className: "px-3 py-1.5 rounded-md text-sm font-medium",
						children: t.label
					}, t.to))
				})
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
			className: "flex-1 max-w-7xl mx-auto w-full px-4 py-8",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {})
		})]
	});
}
//#endregion
export { AdminShell as component };
