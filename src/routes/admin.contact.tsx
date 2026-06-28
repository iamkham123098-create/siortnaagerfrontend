import { createFileRoute } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { apiGet, apiJson, type ContactInfo, type Paginated } from "@/lib/api";

export const Route = createFileRoute("/admin/contact")({
  component: ContactAdmin,
});

function ContactAdmin() {
  const qc = useQueryClient();
  const q = useQuery({
    queryKey: ["admin", "/admin/contact/"],
    queryFn: () => apiGet<Paginated<ContactInfo>>("/admin/contact/", true),
  });
  const current = q.data?.results[0];
  const [form, setForm] = useState<Partial<ContactInfo>>({});
  const [phones, setPhones] = useState("");
  const [socials, setSocials] = useState("");
  const [err, setErr] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (current) {
      setForm(current);
      setPhones(current.phone_numbers?.join("\n") ?? "");
      setSocials(Object.entries(current.social_media_links ?? {}).map(([k, v]) => `${k}: ${v}`).join("\n"));
    }
  }, [current]);

  async function save(e: React.FormEvent) {
    e.preventDefault();
    setErr(null);
    setBusy(true);
    try {
      const social_media_links: Record<string, string> = {};
      socials.split("\n").map((l) => l.trim()).filter(Boolean).forEach((l) => {
        const i = l.indexOf(":");
        if (i > 0) social_media_links[l.slice(0, i).trim().toLowerCase()] = l.slice(i + 1).trim();
      });
      const payload = {
        ...form,
        phone_numbers: phones.split("\n").map((s) => s.trim()).filter(Boolean),
        social_media_links,
        is_active: true,
      };
      if (current?.id) {
        await apiJson(`/admin/contact/${current.id}/`, "PATCH", payload);
      } else {
        await apiJson("/admin/contact/", "POST", payload);
      }
      qc.invalidateQueries({ queryKey: ["admin", "/admin/contact/"] });
      qc.invalidateQueries({ queryKey: ["contact"] });
    } catch (e2) {
      setErr(e2 instanceof Error ? e2.message : "Failed");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Contact Information</h1>
      {q.isLoading && <p className="text-muted-foreground">Loading…</p>}
      <form onSubmit={save} className="space-y-4 max-w-2xl">
        <Field label="Office Address">
          <textarea value={form.office_address ?? ""} onChange={(e) => setForm({ ...form, office_address: e.target.value })} rows={3} className="w-full px-3 py-2 rounded-md border bg-background text-sm" />
        </Field>
        <Field label="Google Maps Embed URL">
          <input value={form.google_maps_embed_url ?? ""} onChange={(e) => setForm({ ...form, google_maps_embed_url: e.target.value })} className="w-full px-3 py-2 rounded-md border bg-background text-sm" />
        </Field>
        <Field label="Email">
          <input type="email" value={form.email ?? ""} onChange={(e) => setForm({ ...form, email: e.target.value })} className="w-full px-3 py-2 rounded-md border bg-background text-sm" />
        </Field>
        <Field label="Phone Numbers (one per line)">
          <textarea value={phones} onChange={(e) => setPhones(e.target.value)} rows={3} className="w-full px-3 py-2 rounded-md border bg-background text-sm" />
        </Field>
        <Field label="Social Links (one per line — key: url)">
          <textarea value={socials} onChange={(e) => setSocials(e.target.value)} rows={5} placeholder="facebook: https://…&#10;instagram: https://…" className="w-full px-3 py-2 rounded-md border bg-background text-sm" />
        </Field>
        <Field label="Google Form Link">
          <input value={form.google_form_link ?? ""} onChange={(e) => setForm({ ...form, google_form_link: e.target.value })} className="w-full px-3 py-2 rounded-md border bg-background text-sm" />
        </Field>
        {err && <p className="text-sm text-destructive">{err}</p>}
        <button disabled={busy} className="brand-gradient text-white px-5 py-2.5 rounded-md font-medium disabled:opacity-60 cursor-pointer disabled:cursor-not-allowed">
          {busy ? "Saving…" : current ? "Update" : "Create"}
        </button>
      </form>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="text-xs font-medium block mb-1">{label}</label>
      {children}
    </div>
  );
}
