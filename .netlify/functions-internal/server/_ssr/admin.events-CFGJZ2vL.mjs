import { M as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { t as ResourceManager } from "./ResourceManager-dz9qHZNa.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin.events-CFGJZ2vL.js
var import_jsx_runtime = require_jsx_runtime();
var SplitComponent = () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResourceManager, {
	title: "Events",
	endpoint: "/admin/events/",
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
			name: "event_date",
			label: "Date & Time",
			type: "datetime-local",
			required: true
		},
		{
			name: "location",
			label: "Location",
			required: true
		},
		{
			name: "event_type",
			label: "Type",
			type: "select",
			required: true,
			options: [{
				value: "UPCOMING",
				label: "Upcoming"
			}, {
				value: "PAST",
				label: "Past"
			}]
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
			key: "event_date",
			label: "When"
		},
		{
			key: "location",
			label: "Location"
		},
		{
			key: "event_type_display",
			label: "Type"
		}
	]
});
//#endregion
export { SplitComponent as component };
