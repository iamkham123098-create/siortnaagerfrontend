import { createFileRoute, Outlet, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { isLoggedIn, login, logout } from "@/lib/api";
import logo from "@/assets/SIO_LOGO.jpeg";

export const Route = createFileRoute("/admin")({
  head: () => ({ meta: [{ title: "Admin — SIO R. T. Nagar" }] }),
  component: AdminShell,
});

function AdminShell() {
  const [authed, setAuthed] = useState(false);
  const [ready, setReady] = useState(false);
  useEffect(() => {
    setAuthed(isLoggedIn());
    setReady(true);
  }, []);
  if (!ready) return null;
  if (!authed) return <LoginScreen onSuccess={() => setAuthed(true)} />;
  return <AdminLayout onLogout={() => setAuthed(false)} />;
}

function LoginScreen({ onSuccess }: { onSuccess: () => void }) {
  const [u, setU] = useState("");
  const [p, setP] = useState("");
  const [err, setErr] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  return (
    <div className="min-h-screen flex items-center justify-center px-4 brand-gradient">
      <form
        onSubmit={async (e) => {
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
        }}
        className="w-full max-w-md bg-card rounded-2xl shadow-2xl p-8 space-y-5"
      >
        <div className="flex items-center gap-3">
          <img src={logo} alt="" className="h-12 w-12 rounded-full" />
          <div>
            <div className="font-display text-xl font-semibold">Admin Console</div>
            <div className="text-xs text-muted-foreground">SIO R. T. Nagar</div>
          </div>
        </div>
        <div>
          <label className="text-xs font-medium">Username</label>
          <input value={u} onChange={(e) => setU(e.target.value)} required className="w-full mt-1 px-3 py-2 rounded-md border bg-background" />
        </div>
        <div>
          <label className="text-xs font-medium">Password</label>
          <input value={p} onChange={(e) => setP(e.target.value)} type="password" required className="w-full mt-1 px-3 py-2 rounded-md border bg-background" />
        </div>
        {err && <p className="text-sm text-destructive">{err}</p>}
        <button disabled={loading} className="w-full brand-gradient text-white py-2.5 rounded-md font-medium disabled:opacity-60 cursor-pointer disabled:cursor-not-allowed">
          {loading ? "Signing in…" : "Sign in"}
        </button>
        <Link to="/" className="block text-center text-xs text-muted-foreground hover:text-foreground">← Back to site</Link>
      </form>
    </div>
  );
}

const tabs = [
  { to: "/admin", label: "Overview" },
  { to: "/admin/home", label: "Home" },
  { to: "/admin/bearers", label: "Office Bearers" },
  { to: "/admin/activities", label: "Activities" },
  { to: "/admin/books", label: "Books" },
  { to: "/admin/events", label: "Events" },
  { to: "/admin/announcements", label: "Announcements" },
  { to: "/admin/contact", label: "Contact" },
];

function AdminLayout({ onLogout }: { onLogout: () => void }) {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b bg-card">
        <div className="max-w-7xl mx-auto px-4 h-14 flex items-center justify-between">
          <Link to="/admin" className="flex items-center gap-2">
            <img src={logo} alt="" className="h-8 w-8 rounded-full" />
            <span className="font-display font-semibold">SIO Admin</span>
          </Link>
          <div className="flex items-center gap-2">
            <Link to="/" className="text-xs px-3 py-1.5 rounded-md border hover:bg-secondary cursor-pointer">View site</Link>
            <button
              onClick={() => {
                logout();
                onLogout();
                navigate({ to: "/admin" });
              }}
              className="text-xs px-3 py-1.5 rounded-md border hover:bg-secondary cursor-pointer"
            >
              Logout
            </button>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 overflow-x-auto">
          <div className="flex gap-1 py-2 whitespace-nowrap">
            {tabs.map((t) => (
              <Link
                key={t.to}
                to={t.to}
                activeOptions={{ exact: true }}
                activeProps={{ className: "brand-gradient text-white" }}
                inactiveProps={{ className: "hover:bg-secondary text-muted-foreground" }}
                className="px-3 py-1.5 rounded-md text-sm font-medium"
              >
                {t.label}
              </Link>
            ))}
          </div>
        </div>
      </header>
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 py-8">
        <Outlet />
      </main>
    </div>
  );
}
