import { createFileRoute } from "@tanstack/react-router";
import { ResourceManager } from "@/components/admin/ResourceManager";

export const Route = createFileRoute("/admin/announcements")({
  component: () => (
    <ResourceManager
      title="Announcements"
      endpoint="/admin/announcements/"
      fields={[
        { name: "title", label: "Title", required: true },
        { name: "content", label: "Content", type: "textarea", required: true },
        { name: "is_pinned", label: "Pin to top", type: "checkbox" },
        { name: "is_active", label: "Active", type: "checkbox", defaultValue: true },
      ]}
      listFields={[
        { key: "title", label: "Title" },
        { key: "is_pinned", label: "Pinned" },
        { key: "created_at", label: "Created" },
      ]}
    />
  ),
});
