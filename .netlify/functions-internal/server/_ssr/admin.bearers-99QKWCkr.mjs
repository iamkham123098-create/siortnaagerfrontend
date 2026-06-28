import { M as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { t as ResourceManager } from "./ResourceManager-dz9qHZNa.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin.bearers-99QKWCkr.js
var import_jsx_runtime = require_jsx_runtime();
var SplitComponent = () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResourceManager, {
	title: "Office Bearers",
	endpoint: "/admin/office-bearers/",
	multipart: true,
	fields: [
		{
			name: "name",
			label: "Name",
			required: true
		},
		{
			name: "position",
			label: "Position",
			required: true
		},
		{
			name: "photo",
			label: "Photo",
			type: "file"
		},
		{
			name: "contact_number",
			label: "Contact"
		},
		{
			name: "email",
			label: "Email",
			type: "email"
		},
		{
			name: "display_order",
			label: "Display order",
			type: "number",
			defaultValue: 0
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
			key: "photo_url",
			label: ""
		},
		{
			key: "name",
			label: "Name"
		},
		{
			key: "position",
			label: "Position"
		},
		{
			key: "display_order",
			label: "Order"
		}
	]
});
//#endregion
export { SplitComponent as component };
