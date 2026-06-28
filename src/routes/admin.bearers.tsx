import { createFileRoute } from "@tanstack/react-router";
import { ResourceManager } from "@/components/admin/ResourceManager";

export const Route = createFileRoute("/admin/bearers")({
  component: () => (
    <ResourceManager
      title="Office Bearers"
      endpoint="/admin/office-bearers/"
      multipart
      fields={[
        { name: "name", label: "Name", required: true },
        { name: "position", label: "Position", required: true },
        { name: "photo", label: "Photo", type: "file" },
        { name: "contact_number", label: "Contact" },
        { name: "email", label: "Email", type: "email" },
        { name: "display_order", label: "Display order", type: "number", defaultValue: 0 },
        { name: "is_active", label: "Active", type: "checkbox", defaultValue: true },
      ]}
      listFields={[
        { key: "photo_url", label: "" },
        { key: "name", label: "Name" },
        { key: "position", label: "Position" },
        { key: "display_order", label: "Order" },
      ]}
    />
  ),
});
