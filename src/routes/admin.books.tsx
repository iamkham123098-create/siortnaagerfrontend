import { createFileRoute } from "@tanstack/react-router";
import { ResourceManager } from "@/components/admin/ResourceManager";

export const Route = createFileRoute("/admin/books")({
  component: () => (
    <ResourceManager
      title="Books"
      endpoint="/admin/books/"
      multipart
      fields={[
        { name: "title", label: "Title", required: true },
        { name: "author", label: "Author", required: true },
        {
          name: "category", label: "Category", type: "select", required: true,
          options: [
            { value: "SIO_LITERATURE", label: "SIO Literature" },
            { value: "CONTEMPORARY", label: "Contemporary" },
          ],
        },
        { name: "drive_link", label: "Google Drive Link", type: "url", required: true },
        { name: "cover_image", label: "Cover", type: "file" },
        { name: "description", label: "Description", type: "textarea" },
        { name: "is_active", label: "Active", type: "checkbox", defaultValue: true },
      ]}
      listFields={[
        { key: "cover_image_url", label: "" },
        { key: "title", label: "Title" },
        { key: "author", label: "Author" },
        { key: "category_display", label: "Category" },
      ]}
    />
  ),
});
