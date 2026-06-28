import { r as __toESM } from "../_runtime.mjs";
import { n as apiGet } from "./api-DzHwqZS_.mjs";
import { t as SIO_LOGO_default } from "./SIO_LOGO-GuJJf_zx.mjs";
import { t as cn } from "./utils-C_uf36nf.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { h as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { M as require_jsx_runtime, d as DialogContent$1, f as DialogDescription$1, h as DialogTitle$1, l as Dialog$1, m as DialogPortal$1, p as DialogOverlay$1, u as DialogClose } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { t as useQuery } from "../_libs/tanstack__react-query.mjs";
import { s as Bell, t as X } from "../_libs/lucide-react.mjs";
import { i as Trigger, n as Portal, r as Root2, t as Content2 } from "../_libs/@radix-ui/react-popover+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/SiteLayout-DD3Cgzx3.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var LAST_SEEN_KEY = "sio_notifications_last_seen";
var NOTIFICATION_PERMISSION_KEY = "sio_notification_permission_asked";
function getLastSeenTimestamp() {
	if (typeof window === "undefined") return (/* @__PURE__ */ new Date()).toISOString();
	return localStorage.getItem(LAST_SEEN_KEY) || (/* @__PURE__ */ new Date(Date.now() - 10080 * 60 * 1e3)).toISOString();
}
function setLastSeenTimestamp(timestamp) {
	if (typeof window !== "undefined") localStorage.setItem(LAST_SEEN_KEY, timestamp);
}
async function requestNotificationPermission() {
	if (typeof window === "undefined" || !("Notification" in window)) return false;
	if (Notification.permission === "granted") return true;
	if (Notification.permission === "denied") return false;
	if (sessionStorage.getItem(NOTIFICATION_PERMISSION_KEY)) return Notification.permission === "granted";
	sessionStorage.setItem(NOTIFICATION_PERMISSION_KEY, "true");
	return await Notification.requestPermission() === "granted";
}
function sendBrowserNotification(title, body, url) {
	if (typeof window === "undefined" || !("Notification" in window)) return;
	if (Notification.permission !== "granted") return;
	const notification = new Notification(title, {
		body,
		icon: "/favicon.ico",
		tag: "sio-notification"
	});
	if (url) notification.onclick = () => {
		window.focus();
		window.location.href = url;
	};
}
function useNotifications() {
	const lastSeenRef = (0, import_react.useRef)(getLastSeenTimestamp());
	const previousCountRef = (0, import_react.useRef)(null);
	const announcementsQuery = useQuery({
		queryKey: ["announcements-notifications"],
		queryFn: () => apiGet("/announcements/?page=1").catch(() => ({
			results: [],
			count: 0
		})),
		refetchInterval: 1e3 * 60 * 5,
		staleTime: 1e3 * 60 * 2
	});
	const eventsQuery = useQuery({
		queryKey: ["events-notifications"],
		queryFn: () => apiGet("/events/?page=1").catch(() => ({
			results: [],
			count: 0
		})),
		refetchInterval: 1e3 * 60 * 5,
		staleTime: 1e3 * 60 * 2
	});
	const notificationData = (0, import_react.useCallback)(() => {
		const lastSeen = lastSeenRef.current;
		const announcements = announcementsQuery.data?.results || [];
		const events = eventsQuery.data?.results || [];
		const newAnnouncements = announcements.filter((a) => new Date(a.created_at) > new Date(lastSeen));
		const newEvents = events.filter((e) => new Date(e.created_at) > new Date(lastSeen));
		return {
			newAnnouncementsCount: newAnnouncements.length,
			newEventsCount: newEvents.length,
			totalNewCount: newAnnouncements.length + newEvents.length,
			latestAnnouncements: newAnnouncements.slice(0, 5),
			latestEvents: newEvents.slice(0, 5)
		};
	}, [announcementsQuery.data, eventsQuery.data])();
	(0, import_react.useEffect)(() => {
		const sendNotifications = async () => {
			if (previousCountRef.current === null) {
				previousCountRef.current = notificationData.totalNewCount;
				return;
			}
			if (notificationData.totalNewCount > previousCountRef.current) {
				if (await requestNotificationPermission()) {
					notificationData.totalNewCount - previousCountRef.current;
					if (notificationData.newAnnouncementsCount > 0) sendBrowserNotification("New Announcement - SIO R.T. Nagar", `${notificationData.latestAnnouncements[0]?.title || "Check out the latest announcements"}`, "/announcements");
					else if (notificationData.newEventsCount > 0) sendBrowserNotification("New Event - SIO R.T. Nagar", `${notificationData.latestEvents[0]?.title || "Check out the upcoming events"}`, "/events");
				}
			}
			previousCountRef.current = notificationData.totalNewCount;
		};
		sendNotifications();
	}, [notificationData]);
	const markAllAsSeen = (0, import_react.useCallback)(() => {
		const now = (/* @__PURE__ */ new Date()).toISOString();
		setLastSeenTimestamp(now);
		lastSeenRef.current = now;
		previousCountRef.current = 0;
	}, []);
	const isLoading = announcementsQuery.isLoading || eventsQuery.isLoading;
	return {
		...notificationData,
		isLoading,
		markAllAsSeen,
		requestPermission: requestNotificationPermission
	};
}
var Dialog = Dialog$1;
var DialogPortal = DialogPortal$1;
var DialogOverlay = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogOverlay$1, {
	ref,
	className: cn("fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0", className),
	...props
}));
DialogOverlay.displayName = DialogOverlay$1.displayName;
var DialogContent = import_react.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogPortal, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogOverlay, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent$1, {
	ref,
	className: cn("fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 sm:rounded-lg", className),
	...props,
	children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogClose, {
		className: "absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background cursor-pointer transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-4 w-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "sr-only",
			children: "Close"
		})]
	})]
})] }));
DialogContent.displayName = DialogContent$1.displayName;
var DialogHeader = ({ className, ...props }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	className: cn("flex flex-col space-y-1.5 text-center sm:text-left", className),
	...props
});
DialogHeader.displayName = "DialogHeader";
var DialogFooter = ({ className, ...props }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	className: cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", className),
	...props
});
DialogFooter.displayName = "DialogFooter";
var DialogTitle = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle$1, {
	ref,
	className: cn("text-lg font-semibold leading-none tracking-tight", className),
	...props
}));
DialogTitle.displayName = DialogTitle$1.displayName;
var DialogDescription = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription$1, {
	ref,
	className: cn("text-sm text-muted-foreground", className),
	...props
}));
DialogDescription.displayName = DialogDescription$1.displayName;
var Popover = Root2;
var PopoverTrigger = Trigger;
var PopoverContent = import_react.forwardRef(({ className, align = "center", sideOffset = 4, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Portal, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Content2, {
	ref,
	align,
	sideOffset,
	className: cn("z-50 w-72 rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-(--radix-popover-content-transform-origin)", className),
	...props
}) }));
PopoverContent.displayName = Content2.displayName;
var nav = [
	{
		to: "/",
		label: "Home"
	},
	{
		to: "/about",
		label: "About"
	},
	{
		to: "/activities",
		label: "Activities"
	},
	{
		to: "/library",
		label: "Library"
	},
	{
		to: "/events",
		label: "Events"
	},
	{
		to: "/announcements",
		label: "Announcements"
	},
	{
		to: "/contact",
		label: "Contact"
	}
];
function getEmbedFormUrl(url) {
	if (!url) return "";
	if (url.includes("embedded=true")) return url;
	return `${url}${url.includes("?") ? "&" : "?"}embedded=true`;
}
function SiteLayout({ children }) {
	const [joinDialogOpen, setJoinDialogOpen] = (0, import_react.useState)(false);
	const [notificationOpen, setNotificationOpen] = (0, import_react.useState)(false);
	const contactQuery = useQuery({
		queryKey: ["contact"],
		queryFn: () => apiGet("/contact/").catch(() => null),
		staleTime: 1e3 * 60 * 10
	});
	const { totalNewCount, newAnnouncementsCount, newEventsCount, latestAnnouncements, latestEvents, markAllAsSeen } = useNotifications();
	const googleFormUrl = getEmbedFormUrl(contactQuery.data?.google_form_link);
	const handleNotificationOpen = (open) => {
		setNotificationOpen(open);
		if (!open && totalNewCount > 0) markAllAsSeen();
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen flex flex-col",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "sticky top-0 z-40 bg-background/85 backdrop-blur border-b",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "max-w-7xl mx-auto px-4 h-16 flex items-center justify-between gap-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/",
							className: "flex items-center gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: SIO_LOGO_default,
								alt: "SIO RT Nagar",
								className: "h-10 w-10 rounded-full object-cover"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "leading-tight",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "font-display text-lg font-semibold",
									children: "SIO"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "text-[10px] tracking-widest text-muted-foreground uppercase",
									children: "R. T. Nagar"
								})]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
							className: "hidden md:flex items-center gap-1",
							children: [nav.map((n) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: n.to,
								activeProps: { className: "text-foreground bg-secondary" },
								inactiveProps: { className: "text-muted-foreground hover:text-foreground" },
								className: "px-3 py-2 rounded-md text-sm font-medium transition-colors",
								children: n.label
							}, n.to)), googleFormUrl && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => setJoinDialogOpen(true),
								className: "px-3 py-2 rounded-md text-sm font-medium transition-colors brand-gradient text-white cursor-pointer",
								children: "Join SIO"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Popover, {
								open: notificationOpen,
								onOpenChange: handleNotificationOpen,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PopoverTrigger, {
									asChild: true,
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										className: "relative p-2 rounded-md hover:bg-secondary transition-colors cursor-pointer",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bell, { className: "h-5 w-5" }), totalNewCount > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center text-xs font-bold text-white bg-brand-red rounded-full",
											children: totalNewCount > 9 ? "9+" : totalNewCount
										})]
									})
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PopoverContent, {
									className: "w-80 p-0",
									align: "end",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "p-3 border-b font-semibold",
											children: "Notifications"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "max-h-80 overflow-y-auto",
											children: totalNewCount === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "p-4 text-center text-sm text-muted-foreground",
												children: "No new notifications"
											}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "divide-y",
												children: [newAnnouncementsCount > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "p-3",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														className: "text-xs font-semibold text-brand-red uppercase mb-2",
														children: [
															"New Announcements (",
															newAnnouncementsCount,
															")"
														]
													}), latestAnnouncements.map((a) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
														to: "/announcements",
														className: "block py-1.5 text-sm hover:text-brand-blue",
														onClick: () => setNotificationOpen(false),
														children: a.title
													}, a.id))]
												}), newEventsCount > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "p-3",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														className: "text-xs font-semibold text-brand-blue uppercase mb-2",
														children: [
															"New Events (",
															newEventsCount,
															")"
														]
													}), latestEvents.map((e) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
														to: "/events",
														className: "block py-1.5 text-sm hover:text-brand-blue",
														onClick: () => setNotificationOpen(false),
														children: e.title
													}, e.id))]
												})]
											})
										}),
										totalNewCount > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "p-2 border-t",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
												onClick: () => {
													markAllAsSeen();
													setNotificationOpen(false);
												},
												className: "w-full text-xs text-center text-muted-foreground hover:text-foreground cursor-pointer",
												children: "Mark all as read"
											})
										})
									]
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/admin",
								className: "text-xs font-medium px-3 py-2 rounded-md border hover:bg-secondary",
								children: "Admin"
							})]
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "md:hidden border-t overflow-x-auto",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex gap-1 px-3 py-2 whitespace-nowrap",
						children: [nav.map((n) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: n.to,
							activeProps: { className: "text-foreground bg-secondary" },
							inactiveProps: { className: "text-muted-foreground" },
							className: "px-3 py-1.5 rounded-md text-sm",
							children: n.label
						}, n.to)), googleFormUrl && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => setJoinDialogOpen(true),
							className: "px-3 py-1.5 rounded-md text-sm brand-gradient text-white cursor-pointer",
							children: "Join SIO"
						})]
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
				open: joinDialogOpen,
				onOpenChange: setJoinDialogOpen,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
					className: "max-w-3xl w-[95vw] h-[85vh] p-0",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogHeader, {
						className: "p-4 border-b",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, {
							className: "text-xl font-bold",
							children: "Join SIO"
						})
					}), googleFormUrl ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("iframe", {
						src: googleFormUrl,
						className: "w-full flex-1 border-0",
						style: { height: "calc(85vh - 60px)" },
						title: "Join SIO Form",
						children: "Loading…"
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex items-center justify-center h-full text-muted-foreground",
						children: "Form not available"
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
				className: "flex-1",
				children
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("footer", {
				className: "border-t mt-16",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "max-w-7xl mx-auto px-4 py-10 grid gap-8 md:grid-cols-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-3 mb-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: SIO_LOGO_default,
								alt: "",
								className: "h-10 w-10 rounded-full"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "font-display text-lg",
								children: "SIO R. T. Nagar"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-xs text-muted-foreground",
								children: "Students Islamic Organisation"
							})] })]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-muted-foreground",
							children: "Building tomorrow's leaders through faith, knowledge & service."
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "font-semibold mb-3 text-sm",
							children: "Explore"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
							className: "space-y-2 text-sm text-muted-foreground",
							children: nav.slice(1).map((n) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: n.to,
								className: "hover:text-foreground",
								children: n.label
							}) }, n.to))
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "font-semibold mb-3 text-sm",
							children: "Connect"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-sm text-muted-foreground",
							children: [
								"Visit the ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/contact",
									className: "underline",
									children: "Contact"
								}),
								" page for office details and social channels."
							]
						})] })
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "border-t",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "max-w-7xl mx-auto px-4 py-4 text-xs text-muted-foreground flex justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
							"© ",
							(/* @__PURE__ */ new Date()).getFullYear(),
							" SIO R. T. Nagar"
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Built For Ummah" })]
					})
				})]
			})
		]
	});
}
//#endregion
export { SiteLayout as a, DialogTitle as i, DialogContent as n, DialogHeader as r, Dialog as t };
