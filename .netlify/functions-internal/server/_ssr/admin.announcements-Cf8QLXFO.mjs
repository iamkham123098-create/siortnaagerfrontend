import { M as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { t as ResourceManager } from "./ResourceManager-dz9qHZNa.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin.announcements-Cf8QLXFO.js
var import_jsx_runtime = require_jsx_runtime();
var SplitComponent = () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResourceManager, {
	title: "Announcements",
	endpoint: "/admin/announcements/",
	fields: [
		{
			name: "title",
			label: "Title",
			required: true
		},
		{
			name: "content",
			label: "Content",
			type: "textarea",
			required: true
		},
		{
			name: "is_pinned",
			label: "Pin to top",
			type: "checkbox"
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
			key: "title",
			label: "Title"
		},
		{
			key: "is_pinned",
			label: "Pinned"
		},
		{
			key: "created_at",
			label: "Created"
		}
	]
});
//#endregion
export { SplitComponent as component };
