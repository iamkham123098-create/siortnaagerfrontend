import { r as __toESM } from "../_runtime.mjs";
import { n as apiGet, r as apiJson, t as apiForm } from "./api-DzHwqZS_.mjs";
import { t as cn } from "./utils-C_uf36nf.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { M as require_jsx_runtime, a as Overlay2, c as Title2, i as Description2, n as Cancel, o as Portal2, r as Content2, s as Root2, t as Action } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { r as useQueryClient, t as useQuery } from "../_libs/tanstack__react-query.mjs";
import { n as buttonVariants } from "./button-BkEeRci-.mjs";
import { n as toast } from "../_libs/sonner.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/ResourceManager-dz9qHZNa.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var AlertDialog = Root2;
var AlertDialogPortal = Portal2;
var AlertDialogOverlay = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Overlay2, {
	className: cn("fixed inset-0 z-50 bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0", className),
	...props,
	ref
}));
AlertDialogOverlay.displayName = Overlay2.displayName;
var AlertDialogContent = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogPortal, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogOverlay, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Content2, {
	ref,
	className: cn("fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 sm:rounded-lg", className),
	...props
})] }));
AlertDialogContent.displayName = Content2.displayName;
var AlertDialogHeader = ({ className, ...props }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	className: cn("flex flex-col space-y-2 text-center sm:text-left", className),
	...props
});
AlertDialogHeader.displayName = "AlertDialogHeader";
var AlertDialogFooter = ({ className, ...props }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	className: cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", className),
	...props
});
AlertDialogFooter.displayName = "AlertDialogFooter";
var AlertDialogTitle = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Title2, {
	ref,
	className: cn("text-lg font-semibold", className),
	...props
}));
AlertDialogTitle.displayName = Title2.displayName;
var AlertDialogDescription = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Description2, {
	ref,
	className: cn("text-sm text-muted-foreground", className),
	...props
}));
AlertDialogDescription.displayName = Description2.displayName;
var AlertDialogAction = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Action, {
	ref,
	className: cn(buttonVariants(), className),
	...props
}));
AlertDialogAction.displayName = Action.displayName;
var AlertDialogCancel = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cancel, {
	ref,
	className: cn(buttonVariants({ variant: "outline" }), "mt-2 sm:mt-0", className),
	...props
}));
AlertDialogCancel.displayName = Cancel.displayName;
function ResourceManager({ title, endpoint, fields, multipart, listFields }) {
	const qc = useQueryClient();
	const list = useQuery({
		queryKey: ["admin", endpoint],
		queryFn: () => apiGet(endpoint, true)
	});
	const [editing, setEditing] = (0, import_react.useState)(null);
	const [showForm, setShowForm] = (0, import_react.useState)(false);
	const [err, setErr] = (0, import_react.useState)(null);
	const [busy, setBusy] = (0, import_react.useState)(false);
	const [deleteTarget, setDeleteTarget] = (0, import_react.useState)(null);
	const [deleting, setDeleting] = (0, import_react.useState)(false);
	const MAX_FILE_SIZE_MB = 3;
	const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024;
	function validateFileSize(file) {
		if (file.size > MAX_FILE_SIZE_BYTES) {
			toast.error(`File size must be less than ${MAX_FILE_SIZE_MB}MB. Selected file is ${(file.size / (1024 * 1024)).toFixed(2)}MB`);
			return false;
		}
		return true;
	}
	function handleFileChange(e) {
		const file = e.target.files?.[0];
		if (file && !validateFileSize(file)) e.target.value = "";
	}
	async function submit(e) {
		e.preventDefault();
		setErr(null);
		setBusy(true);
		const formEl = e.currentTarget;
		try {
			const id = editing?.id;
			const path = id ? `${endpoint}${id}/` : endpoint;
			const method = id ? "PATCH" : "POST";
			if (multipart) {
				const fd = new FormData(formEl);
				for (const f of fields) {
					if (f.type === "file") {
						const v = fd.get(f.name);
						if (v instanceof File) {
							if (v.size === 0) fd.delete(f.name);
							else if (v.size > MAX_FILE_SIZE_BYTES) {
								toast.error(`File size must be less than ${MAX_FILE_SIZE_MB}MB`);
								setBusy(false);
								return;
							}
						}
					}
					if (f.type === "checkbox") fd.set(f.name, formEl.elements.namedItem(f.name) && formEl.elements.namedItem(f.name).checked ? "true" : "false");
				}
				await apiForm(path, method, fd);
			} else {
				const body = {};
				const formData = new FormData(formEl);
				fields.forEach((f) => {
					if (f.type === "checkbox") body[f.name] = formEl.elements.namedItem(f.name)?.checked ?? false;
					else if (f.type === "number") {
						const v = formData.get(f.name);
						body[f.name] = v === "" || v === null ? null : Number(v);
					} else {
						const v = formData.get(f.name);
						if (v !== null && v !== "") body[f.name] = v;
					}
				});
				await apiJson(path, method, body);
			}
			setShowForm(false);
			setEditing(null);
			qc.invalidateQueries({ queryKey: ["admin", endpoint] });
			toast.success(editing ? "Updated successfully" : "Created successfully");
		} catch (e2) {
			setErr(e2 instanceof Error ? e2.message : "Failed");
		} finally {
			setBusy(false);
		}
	}
	async function confirmDelete() {
		if (!deleteTarget) return;
		setDeleting(true);
		try {
			await apiJson(`${endpoint}${deleteTarget.id}/`, "DELETE");
			qc.invalidateQueries({ queryKey: ["admin", endpoint] });
			toast.success("Item deleted successfully");
			setDeleteTarget(null);
		} catch (e) {
			toast.error(e instanceof Error ? e.message : "Failed to delete");
		} finally {
			setDeleting(false);
		}
	}
	function openDeleteModal(row) {
		const name = row.title || row.name || `Item #${row.id}`;
		setDeleteTarget({
			id: row.id,
			name
		});
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center justify-between mb-6",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-3xl font-bold",
				children: title
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				onClick: () => {
					setEditing(null);
					setShowForm(true);
					setErr(null);
				},
				className: "brand-gradient text-white px-4 py-2 rounded-md text-sm font-medium cursor-pointer",
				children: "+ New"
			})]
		}),
		list.isLoading && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-muted-foreground",
			children: "Loading…"
		}),
		list.isError && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-destructive text-sm",
			children: "Unable to load. Check that the API is reachable and you're authenticated."
		}),
		list.data && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "rounded-xl border bg-card overflow-hidden",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
				className: "w-full text-sm",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
					className: "bg-secondary text-left",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [listFields.map((f) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
						className: "px-4 py-3 font-semibold",
						children: f.label
					}, f.key)), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { className: "px-4 py-3 w-32" })] })
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tbody", { children: [list.data.results.map((row) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
					className: "border-t",
					children: [listFields.map((f) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
						className: "px-4 py-3",
						children: renderCell(row[f.key])
					}, f.key)), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
						className: "px-4 py-3 text-right space-x-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => {
								setEditing(row);
								setShowForm(true);
								setErr(null);
							},
							className: "text-xs px-2 py-1 rounded border hover:bg-secondary cursor-pointer",
							children: "Edit"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => openDeleteModal(row),
							className: "text-xs px-2 py-1 rounded border border-destructive text-destructive hover:bg-destructive/10 cursor-pointer",
							children: "Delete"
						})]
					})]
				}, row.id)), list.data.results.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
					className: "px-4 py-8 text-center text-muted-foreground",
					colSpan: listFields.length + 1,
					children: "Nothing here yet."
				}) })] })]
			})
		}),
		showForm && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4",
			onClick: () => setShowForm(false),
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				onClick: (e) => e.stopPropagation(),
				onSubmit: submit,
				className: "bg-card rounded-2xl max-w-xl w-full p-6 max-h-[90vh] overflow-y-auto space-y-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
						className: "text-xl font-semibold",
						children: [
							editing ? "Edit" : "New",
							" ",
							title
						]
					}),
					fields.map((f) => {
						const val = editing?.[f.name];
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "text-xs font-medium block mb-1",
							children: [f.label, f.required && " *"]
						}), f.type === "textarea" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
							name: f.name,
							required: f.required,
							defaultValue: val ?? "",
							rows: 4,
							className: "w-full px-3 py-2 rounded-md border bg-background text-sm"
						}) : f.type === "select" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
							name: f.name,
							required: f.required,
							defaultValue: val ?? f.defaultValue ?? "",
							className: "w-full px-3 py-2 rounded-md border bg-background text-sm cursor-pointer",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "",
								children: "—"
							}), f.options?.map((o) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: o.value,
								children: o.label
							}, o.value))]
						}) : f.type === "checkbox" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							name: f.name,
							type: "checkbox",
							defaultChecked: val ?? f.defaultValue ?? false,
							className: "h-4 w-4 cursor-pointer"
						}) : f.type === "file" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							name: f.name,
							type: "file",
							accept: "image/*",
							onChange: handleFileChange,
							className: "w-full text-sm cursor-pointer file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-secondary file:text-foreground file:cursor-pointer hover:file:bg-secondary/80"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-xs text-muted-foreground mt-1",
							children: [
								"Max file size: ",
								MAX_FILE_SIZE_MB,
								"MB"
							]
						})] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							name: f.name,
							type: f.type ?? "text",
							required: f.required,
							defaultValue: formatValue(val, f.type),
							className: "w-full px-3 py-2 rounded-md border bg-background text-sm"
						})] }, f.name);
					}),
					err && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-destructive whitespace-pre-wrap",
						children: err
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex justify-end gap-2 pt-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => setShowForm(false),
							className: "px-4 py-2 rounded-md border text-sm cursor-pointer hover:bg-secondary",
							children: "Cancel"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							disabled: busy,
							className: "brand-gradient text-white px-4 py-2 rounded-md text-sm font-medium disabled:opacity-60 cursor-pointer disabled:cursor-not-allowed",
							children: busy ? "Saving…" : "Save"
						})]
					})
				]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialog, {
			open: !!deleteTarget,
			onOpenChange: (open) => !open && setDeleteTarget(null),
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogContent, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogTitle, { children: ["Delete ", title.slice(0, -1)] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogDescription, { children: [
				"Are you sure you want to delete \"",
				deleteTarget?.name,
				"\"? This action cannot be undone."
			] })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogFooter, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogCancel, {
				disabled: deleting,
				className: "cursor-pointer disabled:cursor-not-allowed",
				children: "Cancel"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogAction, {
				onClick: confirmDelete,
				disabled: deleting,
				className: "bg-destructive text-destructive-foreground hover:bg-destructive/90 cursor-pointer disabled:cursor-not-allowed",
				children: deleting ? "Deleting…" : "Delete"
			})] })] })
		})
	] });
}
function renderCell(v) {
	if (v == null) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: "text-muted-foreground",
		children: "—"
	});
	if (typeof v === "boolean") return v ? "Yes" : "No";
	if (typeof v === "string" && /^https?:\/\/.*\.(jpe?g|png|gif|webp)/i.test(v)) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
		src: v,
		alt: "",
		className: "h-10 w-10 object-cover rounded"
	});
	if (typeof v === "string" && v.length > 80) return v.slice(0, 80) + "…";
	if (typeof v === "object") return JSON.stringify(v).slice(0, 80);
	return String(v);
}
function formatValue(v, type) {
	if (v == null) return "";
	if (type === "datetime-local" && typeof v === "string") return v.slice(0, 16);
	return String(v);
}
//#endregion
export { ResourceManager as t };
