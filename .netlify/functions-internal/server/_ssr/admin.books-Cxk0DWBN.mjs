import { M as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { t as ResourceManager } from "./ResourceManager-dz9qHZNa.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin.books-Cxk0DWBN.js
var import_jsx_runtime = require_jsx_runtime();
var SplitComponent = () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResourceManager, {
	title: "Books",
	endpoint: "/admin/books/",
	multipart: true,
	fields: [
		{
			name: "title",
			label: "Title",
			required: true
		},
		{
			name: "author",
			label: "Author",
			required: true
		},
		{
			name: "category",
			label: "Category",
			type: "select",
			required: true,
			options: [{
				value: "SIO_LITERATURE",
				label: "SIO Literature"
			}, {
				value: "CONTEMPORARY",
				label: "Contemporary"
			}]
		},
		{
			name: "drive_link",
			label: "Google Drive Link",
			type: "url",
			required: true
		},
		{
			name: "cover_image",
			label: "Cover",
			type: "file"
		},
		{
			name: "description",
			label: "Description",
			type: "textarea"
		},
		{
			name: "is_active",
			label: "Active",
			type: "checkbox",
			defaultValue: true
		}
	],
	listFields: [
		{
			key: "cover_image_url",
			label: ""
		},
		{
			key: "title",
			label: "Title"
		},
		{
			key: "author",
			label: "Author"
		},
		{
			key: "category_display",
			label: "Category"
		}
	]
});
//#endregion
export { SplitComponent as component };
