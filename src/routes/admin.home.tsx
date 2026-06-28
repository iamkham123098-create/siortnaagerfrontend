import { createFileRoute } from "@tanstack/react-router";
import { ResourceManager } from "@/components/admin/ResourceManager";

export const Route = createFileRoute("/admin/home")({
  component: () => (
    <ResourceManager
      title="Home Page"
      endpoint="/admin/home/"
      multipart
      fields={[
        { name: "hero_title", label: "Hero Title" },
        { name: "hero_subtitle", label: "Hero Subtitle" },
        { name: "hero_banner_image", label: "Hero Image", type: "file" },
        { name: "introduction", label: "Introduction", type: "textarea" },
        { name: "vision", label: "Vision", type: "textarea" },
        { name: "mission", label: "Mission", type: "textarea" },
        { name: "cta_join_text", label: "CTA: Join text" },
        { name: "cta_events_text", label: "CTA: Events text" },
        { name: "is_active", label: "Active", type: "checkbox", defaultValue: true },
      ]}
      listFields={[
        { key: "hero_banner_image_url", label: "" },
        { key: "hero_title", label: "Title" },
        { key: "is_active", label: "Active" },
      ]}
    />
  ),
});
