import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { SiteLayout } from "@/components/SiteLayout";
import { apiGet, type ContactInfo } from "@/lib/api";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export const Route = createFileRoute("/contact")({
  head: () => ({ meta: [{ title: "Contact — SIO R. T. Nagar" }] }),
  component: Page,
});

// Convert Google Form link to embeddable URL
function getEmbedFormUrl(url: string | undefined): string {
  if (!url) return "";
  if (url.includes("embedded=true")) return url;
  const separator = url.includes("?") ? "&" : "?";
  return `${url}${separator}embedded=true`;
}

function Page() {
  const [formDialogOpen, setFormDialogOpen] = useState(false);

  const q = useQuery({
    queryKey: ["contact"],
    queryFn: () => apiGet<ContactInfo>("/contact/").catch(() => null),
  });
  const c = q.data;
  const googleFormUrl = getEmbedFormUrl(c?.google_form_link);

  return (
    <SiteLayout>
      <section className="max-w-7xl mx-auto px-4 py-16 grid md:grid-cols-2 gap-10">
        <div>
          <h1 className="text-4xl md:text-5xl font-bold mb-3"><span className="brand-text-gradient">Get in touch</span></h1>
          <p className="text-muted-foreground mb-8">We'd love to hear from you — for membership, collaboration or any query.</p>
          {c ? (
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold mb-1">Office</h3>
                <p className="text-sm text-muted-foreground whitespace-pre-line">{c.office_address}</p>
              </div>
              <div>
                <h3 className="font-semibold mb-1">Phone</h3>
                {c.phone_numbers.map((p) => (
                  <a key={p} href={`tel:${p}`} className="block text-sm text-muted-foreground hover:text-foreground">{p}</a>
                ))}
              </div>
              <div>
                <h3 className="font-semibold mb-1">Email</h3>
                <a href={`mailto:${c.email}`} className="text-sm text-brand-blue hover:underline">{c.email}</a>
              </div>
              {c.social_media_links && (
                <div>
                  <h3 className="font-semibold mb-2">Follow Us</h3>
                  <div className="flex flex-wrap gap-2">
                    {Object.entries(c.social_media_links).map(([k, v]) => (
                      <a key={k} href={v} target="_blank" rel="noreferrer" className="px-3 py-1.5 rounded-md border text-xs font-medium capitalize hover:bg-secondary">
                        {k}
                      </a>
                    ))}
                  </div>
                </div>
              )}
              {googleFormUrl && (
                <button
                  onClick={() => setFormDialogOpen(true)}
                  className="inline-block brand-gradient text-white px-6 py-3 rounded-md font-medium cursor-pointer"
                >
                  Join via Google Form
                </button>
              )}
            </div>
          ) : (
            <p className="text-muted-foreground text-sm">Contact information will appear here.</p>
          )}
        </div>
        <div className="min-h-[300px] rounded-xl border bg-card overflow-hidden">
          {c?.google_maps_embed_url ? (
            <iframe src={c.google_maps_embed_url} className="w-full h-full min-h-[400px]" loading="lazy" />
          ) : (
            <div className="w-full h-full min-h-[400px] flex items-center justify-center text-sm text-muted-foreground">Map unavailable</div>
          )}
        </div>
      </section>

      <Dialog open={formDialogOpen} onOpenChange={setFormDialogOpen}>
        <DialogContent className="max-w-3xl w-[95vw] h-[85vh] p-0">
          <DialogHeader className="p-4 border-b">
            <DialogTitle className="text-xl font-bold">Join SIO</DialogTitle>
          </DialogHeader>
          <iframe
            src={googleFormUrl}
            className="w-full flex-1 border-0"
            style={{ height: "calc(85vh - 60px)" }}
            title="Join SIO Form"
          >
            Loading…
          </iframe>
        </DialogContent>
      </Dialog>
    </SiteLayout>
  );
}
