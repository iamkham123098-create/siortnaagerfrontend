import { M as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { t as ResourceManager } from "./ResourceManager-dz9qHZNa.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin.activities-BqS5OZlf.js
var import_jsx_runtime = require_jsx_runtime();
var SplitComponent = () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResourceManager, {
	title: "Activities",
	endpoint: "/admin/activities/",
	multipart: true,
	fields: [
		{
			name: "title",
			label: "Title",
			required: true
		},
		{
			name: "description",
			label: "Description",
			type: "textarea",
			required: true
		},
		{
			name: "activity_date",
			label: "Date",
			type: "date",
			required: true
		},
		{
			name: "photo",
			label: "Photo",
			type: "file"
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
			key: "title",
			label: "Title"
		},
		{
			key: "activity_date",
			label: "Date"
		}
	]
});
//#endregion
export { SplitComponent as component };
