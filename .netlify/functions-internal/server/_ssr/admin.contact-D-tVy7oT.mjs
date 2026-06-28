import { r as __toESM } from "../_runtime.mjs";
import { n as apiGet, r as apiJson } from "./api-DzHwqZS_.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { M as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { r as useQueryClient, t as useQuery } from "../_libs/tanstack__react-query.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin.contact-D-tVy7oT.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function ContactAdmin() {
	const qc = useQueryClient();
	const q = useQuery({
		queryKey: ["admin", "/admin/contact/"],
		queryFn: () => apiGet("/admin/contact/", true)
	});
	const current = q.data?.results[0];
	const [form, setForm] = (0, import_react.useState)({});
	const [phones, setPhones] = (0, import_react.useState)("");
	const [socials, setSocials] = (0, import_react.useState)("");
	const [err, setErr] = (0, import_react.useState)(null);
	const [busy, setBusy] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		if (current) {
			setForm(current);
			setPhones(current.phone_numbers?.join("\n") ?? "");
			setSocials(Object.entries(current.social_media_links ?? {}).map(([k, v]) => `${k}: ${v}`).join("\n"));
		}
	}, [current]);
	async function save(e) {
		e.preventDefault();
		setErr(null);
		setBusy(true);
		try {
			const social_media_links = {};
			socials.split("\n").map((l) => l.trim()).filter(Boolean).forEach((l) => {
				const i = l.indexOf(":");
				if (i > 0) social_media_links[l.slice(0, i).trim().toLowerCase()] = l.slice(i + 1).trim();
			});
			const payload = {
				...form,
				phone_numbers: phones.split("\n").map((s) => s.trim()).filter(Boolean),
				social_media_links,
				is_active: true
			};
			if (current?.id) await apiJson(`/admin/contact/${current.id}/`, "PATCH", payload);
			else await apiJson("/admin/contact/", "POST", payload);
			qc.invalidateQueries({ queryKey: ["admin", "/admin/contact/"] });
			qc.invalidateQueries({ queryKey: ["contact"] });
		} catch (e2) {
			setErr(e2 instanceof Error ? e2.message : "Failed");
		} finally {
			setBusy(false);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "text-3xl font-bold mb-6",
			children: "Contact Information"
		}),
		q.isLoading && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-muted-foreground",
			children: "Loading…"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
			onSubmit: save,
			className: "space-y-4 max-w-2xl",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "Office Address",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
						value: form.office_address ?? "",
						onChange: (e) => setForm({
							...form,
							office_address: e.target.value
						}),
						rows: 3,
						className: "w-full px-3 py-2 rounded-md border bg-background text-sm"
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "Google Maps Embed URL",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						value: form.google_maps_embed_url ?? "",
						onChange: (e) => setForm({
							...form,
							google_maps_embed_url: e.target.value
						}),
						className: "w-full px-3 py-2 rounded-md border bg-background text-sm"
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "Email",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						type: "email",
						value: form.email ?? "",
						onChange: (e) => setForm({
							...form,
							email: e.target.value
						}),
						className: "w-full px-3 py-2 rounded-md border bg-background text-sm"
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "Phone Numbers (one per line)",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
						value: phones,
						onChange: (e) => setPhones(e.target.value),
						rows: 3,
						className: "w-full px-3 py-2 rounded-md border bg-background text-sm"
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "Social Links (one per line — key: url)",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
						value: socials,
						onChange: (e) => setSocials(e.target.value),
						rows: 5,
						placeholder: "facebook: https://…\ninstagram: https://…",
						className: "w-full px-3 py-2 rounded-md border bg-background text-sm"
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "Google Form Link",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						value: form.google_form_link ?? "",
						onChange: (e) => setForm({
							...form,
							google_form_link: e.target.value
						}),
						className: "w-full px-3 py-2 rounded-md border bg-background text-sm"
					})
				}),
				err && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-destructive",
					children: err
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					disabled: busy,
					className: "brand-gradient text-white px-5 py-2.5 rounded-md font-medium disabled:opacity-60 cursor-pointer disabled:cursor-not-allowed",
					children: busy ? "Saving…" : current ? "Update" : "Create"
				})
			]
		})
	] });
}
function Field({ label, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
		className: "text-xs font-medium block mb-1",
		children: label
	}), children] });
}
//#endregion
export { ContactAdmin as component };
