import { createFileRoute } from "@tanstack/react-router";
import { ResourceManager } from "@/components/admin/ResourceManager";

export const Route = createFileRoute("/admin/activities")({
  component: () => (
    <ResourceManager
      title="Activities"
      endpoint="/admin/activities/"
      multipart
      fields={[
        { name: "title", label: "Title", required: true },
        { name: "description", label: "Description", type: "textarea", required: true },
        { name: "activity_date", label: "Date", type: "date", required: true },
        { name: "photo", label: "Photo", type: "file" },
        { name: "is_active", label: "Active", type: "checkbox", defaultValue: true },
      ]}
      listFields={[
        { key: "photo_url", label: "" },
        { key: "title", label: "Title" },
        { key: "activity_date", label: "Date" },
      ]}
    />
  ),
});
