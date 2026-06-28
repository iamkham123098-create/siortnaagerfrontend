import { createFileRoute } from "@tanstack/react-router";
import { ResourceManager } from "@/components/admin/ResourceManager";

export const Route = createFileRoute("/admin/events")({
  component: () => (
    <ResourceManager
      title="Events"
      endpoint="/admin/events/"
      fields={[
        { name: "title", label: "Title", required: true },
        { name: "description", label: "Description", type: "textarea", required: true },
        { name: "event_date", label: "Date & Time", type: "datetime-local", required: true },
        { name: "location", label: "Location", required: true },
        {
          name: "event_type", label: "Type", type: "select", required: true,
          options: [
            { value: "UPCOMING", label: "Upcoming" },
            { value: "PAST", label: "Past" },
          ],
        },
        { name: "is_active", label: "Active", type: "checkbox", defaultValue: true },
      ]}
      listFields={[
        { key: "title", label: "Title" },
        { key: "event_date", label: "When" },
        { key: "location", label: "Location" },
        { key: "event_type_display", label: "Type" },
      ]}
    />
  ),
});
