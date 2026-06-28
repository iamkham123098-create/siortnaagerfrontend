import { M as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { t as ResourceManager } from "./ResourceManager-dz9qHZNa.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin.home-B0uwnmkr.js
var import_jsx_runtime = require_jsx_runtime();
var SplitComponent = () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResourceManager, {
	title: "Home Page",
	endpoint: "/admin/home/",
	multipart: true,
	fields: [
		{
			name: "hero_title",
			label: "Hero Title"
		},
		{
			name: "hero_subtitle",
			label: "Hero Subtitle"
		},
		{
			name: "hero_banner_image",
			label: "Hero Image",
			type: "file"
		},
		{
			name: "introduction",
			label: "Introduction",
			type: "textarea"
		},
		{
			name: "vision",
			label: "Vision",
			type: "textarea"
		},
		{
			name: "mission",
			label: "Mission",
			type: "textarea"
		},
		{
			name: "cta_join_text",
			label: "CTA: Join text"
		},
		{
			name: "cta_events_text",
			label: "CTA: Events text"
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
			key: "hero_banner_image_url",
			label: ""
		},
		{
			key: "hero_title",
			label: "Title"
		},
		{
			key: "is_active",
			label: "Active"
		}
	]
});
//#endregion
export { SplitComponent as component };
