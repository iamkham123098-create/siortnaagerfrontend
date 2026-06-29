import { Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useState, type ReactNode } from "react";
import { Bell } from "lucide-react";
import logo from "@/assets/SIO_LOGO.jpeg";
import { apiGet, type ContactInfo } from "@/lib/api";
import { useNotifications } from "@/hooks/use-notifications";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const nav = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/activities", label: "Activities" },
  { to: "/library", label: "Library" },
  { to: "/events", label: "Events" },
  { to: "/announcements", label: "Announcements" },
  { to: "/contact", label: "Contact" },
];

// Convert Google Form link to embeddable URL
function getEmbedFormUrl(url: string | undefined): string {
  if (!url) return "";
  // If already has embedded=true, return as is
  if (url.includes("embedded=true")) return url;
  // Add embedded=true param
  const separator = url.includes("?") ? "&" : "?";
  return `${url}${separator}embedded=true`;
}

export function SiteLayout({ children }: { children: ReactNode }) {
  const [joinDialogOpen, setJoinDialogOpen] = useState(false);
  const [notificationOpen, setNotificationOpen] = useState(false);

  // Fetch contact info to get google_form_link
  const contactQuery = useQuery({
    queryKey: ["contact"],
    queryFn: () => apiGet<ContactInfo>("/contact/").catch(() => null),
    staleTime: 1000 * 60 * 10, // Cache for 10 minutes
  });

  const {
    totalNewCount,
    newAnnouncementsCount,
    newEventsCount,
    latestAnnouncements,
    latestEvents,
    markItemAsSeen,
    markAllAsSeen,
  } = useNotifications();

  const googleFormUrl = getEmbedFormUrl(contactQuery.data?.google_form_link);

  const handleNotificationOpen = (open: boolean) => {
    setNotificationOpen(open);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <header className="sticky top-0 z-40 bg-background/85 backdrop-blur border-b">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between gap-4">
          <Link to="/" className="flex items-center gap-3">
            <img src={logo} alt="SIO RT Nagar" className="h-10 w-10 rounded-full object-cover" />
            <div className="leading-tight">
              <div className="font-display text-lg font-semibold">SIO</div>
              <div className="text-[10px] tracking-widest text-muted-foreground uppercase">R. T. Nagar</div>
            </div>
          </Link>
          <nav className="hidden md:flex items-center gap-1">
            {nav.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                activeProps={{ className: "text-foreground bg-secondary" }}
                inactiveProps={{ className: "text-muted-foreground hover:text-foreground" }}
                className="px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                {n.label}
              </Link>
            ))}
            {googleFormUrl && (
              <button
                onClick={() => setJoinDialogOpen(true)}
                className="px-3 py-2 rounded-md text-sm font-medium transition-colors brand-gradient text-white cursor-pointer"
              >
                Join SIO
              </button>
            )}
          </nav>
          <div className="flex items-center gap-2">
            <Popover open={notificationOpen} onOpenChange={handleNotificationOpen}>
              <PopoverTrigger asChild>
                <button className="relative p-2 rounded-md hover:bg-secondary transition-colors cursor-pointer">
                  <Bell className="h-5 w-5" />
                  {totalNewCount > 0 && (
                    <span className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center text-xs font-bold text-white bg-brand-red rounded-full">
                      {totalNewCount > 9 ? "9+" : totalNewCount}
                    </span>
                  )}
                </button>
              </PopoverTrigger>
              <PopoverContent className="w-80 p-0" align="end">
                <div className="p-3 border-b font-semibold">Notifications</div>
                <div className="max-h-80 overflow-y-auto">
                  {totalNewCount === 0 ? (
                    <div className="p-4 text-center text-sm text-muted-foreground">
                      No new notifications
                    </div>
                  ) : (
                    <div className="divide-y">
                      {newAnnouncementsCount > 0 && (
                        <div className="p-3">
                          <div className="text-xs font-semibold text-brand-red uppercase mb-2">
                            New Announcements ({newAnnouncementsCount})
                          </div>
                          {latestAnnouncements.map((a) => (
                            <Link
                              key={a.id}
                              to="/announcements"
                              className="block py-1.5 text-sm hover:text-brand-blue"
                              onClick={() => {
                                markItemAsSeen("announcement", a.id);
                                setNotificationOpen(false);
                              }}
                            >
                              {a.title}
                            </Link>
                          ))}
                        </div>
                      )}
                      {newEventsCount > 0 && (
                        <div className="p-3">
                          <div className="text-xs font-semibold text-brand-blue uppercase mb-2">
                            New Events ({newEventsCount})
                          </div>
                          {latestEvents.map((e) => (
                            <Link
                              key={e.id}
                              to="/events/$id"
                              params={{ id: String(e.id) }}
                              className="block py-1.5 text-sm hover:text-brand-blue"
                              onClick={() => {
                                markItemAsSeen("event", e.id);
                                setNotificationOpen(false);
                              }}
                            >
                              {e.title}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>
                {totalNewCount > 0 && (
                  <div className="p-2 border-t">
                    <button
                      onClick={() => {
                        markAllAsSeen();
                        setNotificationOpen(false);
                      }}
                      className="w-full text-xs text-center text-muted-foreground hover:text-foreground cursor-pointer"
                    >
                      Mark all as read
                    </button>
                  </div>
                )}
              </PopoverContent>
            </Popover>
            <Link
              to="/admin"
              className="text-xs font-medium px-3 py-2 rounded-md border hover:bg-secondary"
            >
              Admin
            </Link>
          </div>
        </div>
        <div className="md:hidden border-t overflow-x-auto">
          <div className="flex gap-1 px-3 py-2 whitespace-nowrap">
            {nav.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                activeProps={{ className: "text-foreground bg-secondary" }}
                inactiveProps={{ className: "text-muted-foreground" }}
                className="px-3 py-1.5 rounded-md text-sm"
              >
                {n.label}
              </Link>
            ))}
            {googleFormUrl && (
              <button
                onClick={() => setJoinDialogOpen(true)}
                className="px-3 py-1.5 rounded-md text-sm brand-gradient text-white cursor-pointer"
              >
                Join SIO
              </button>
            )}
          </div>
        </div>
      </header>

      <Dialog open={joinDialogOpen} onOpenChange={setJoinDialogOpen}>
        <DialogContent className="max-w-3xl w-[95vw] h-[85vh] p-0">
          <DialogHeader className="p-4 border-b">
            <DialogTitle className="text-xl font-bold">Join SIO</DialogTitle>
          </DialogHeader>
          {googleFormUrl ? (
            <iframe
              src={googleFormUrl}
              className="w-full flex-1 border-0"
              style={{ height: "calc(85vh - 60px)" }}
              title="Join SIO Form"
            >
              Loading…
            </iframe>
          ) : (
            <div className="flex items-center justify-center h-full text-muted-foreground">
              Form not available
            </div>
          )}
        </DialogContent>
      </Dialog>

      <main className="flex-1">{children}</main>

      <footer className="border-t mt-16">
        <div className="max-w-7xl mx-auto px-4 py-10 grid gap-8 md:grid-cols-3">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <img src={logo} alt="" className="h-10 w-10 rounded-full" />
              <div>
                <div className="font-display text-lg">SIO R. T. Nagar</div>
                <div className="text-xs text-muted-foreground">Students Islamic Organisation</div>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">
              Building tomorrow's leaders through faith, knowledge & service.
            </p>
          </div>
          <div>
            <div className="font-semibold mb-3 text-sm">Explore</div>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {nav.slice(1).map((n) => (
                <li key={n.to}>
                  <Link to={n.to} className="hover:text-foreground">{n.label}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <div className="font-semibold mb-3 text-sm">Connect</div>
            <p className="text-sm text-muted-foreground">
              Visit the <Link to="/contact" className="underline">Contact</Link> page for office details and social channels.
            </p>
          </div>
        </div>
        <div className="border-t">
          <div className="max-w-7xl mx-auto px-4 py-4 text-xs text-muted-foreground flex justify-between">
            <span>© {new Date().getFullYear()} SIO R. T. Nagar</span>
            <span>Built For Ummah</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
