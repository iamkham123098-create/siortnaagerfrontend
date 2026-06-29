import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { apiForm, apiGet, apiJson, type Paginated } from "@/lib/api";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

export interface FieldDef {
  name: string;
  label: string;
  type?: "text" | "textarea" | "number" | "date" | "datetime-local" | "url" | "email" | "file" | "select" | "checkbox";
  required?: boolean;
  options?: { value: string; label: string }[];
  defaultValue?: string | number | boolean;
}

interface Props {
  title: string;
  endpoint: string; // e.g. "/admin/activities/"
  fields: FieldDef[];
  // if any field is file, we use multipart
  multipart?: boolean;
  listFields: { key: string; label: string }[];
}

export function ResourceManager({ title, endpoint, fields, multipart, listFields }: Props) {
  const qc = useQueryClient();
  const [searchInput, setSearchInput] = useState("");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const queryParams = new URLSearchParams();
  if (search) queryParams.set("search", search);
  queryParams.set("page", String(page));

  const list = useQuery({
    queryKey: ["admin", endpoint, search, page],
    queryFn: () => apiGet<Paginated<Record<string, unknown>>>(`${endpoint}?${queryParams.toString()}`, true),
  });
  const [editing, setEditing] = useState<Record<string, unknown> | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<{ id: number; name: string } | null>(null);
  const [deleting, setDeleting] = useState(false);

  const MAX_FILE_SIZE_MB = 3;
  const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024;

  function validateFileSize(file: File): boolean {
    if (file.size > MAX_FILE_SIZE_BYTES) {
      toast.error(`File size must be less than ${MAX_FILE_SIZE_MB}MB. Selected file is ${(file.size / (1024 * 1024)).toFixed(2)}MB`);
      return false;
    }
    return true;
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file && !validateFileSize(file)) {
      e.target.value = "";
    }
  }

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErr(null);
    setBusy(true);
    const formEl = e.currentTarget;
    try {
      const id = editing?.id as number | undefined;
      const path = id ? `${endpoint}${id}/` : endpoint;
      const method = id ? "PATCH" : "POST";
      if (multipart) {
        const fd = new FormData(formEl);
        // Validate file sizes and remove empty file fields
        for (const f of fields) {
          if (f.type === "file") {
            const v = fd.get(f.name);
            if (v instanceof File) {
              if (v.size === 0) {
                fd.delete(f.name);
              } else if (v.size > MAX_FILE_SIZE_BYTES) {
                toast.error(`File size must be less than ${MAX_FILE_SIZE_MB}MB`);
                setBusy(false);
                return;
              }
            }
          }
          if (f.type === "checkbox") {
            fd.set(f.name, formEl.elements.namedItem(f.name) && (formEl.elements.namedItem(f.name) as HTMLInputElement).checked ? "true" : "false");
          }
        }
        await apiForm(path, method, fd);
      } else {
        const body: Record<string, unknown> = {};
        const formData = new FormData(formEl);
        fields.forEach((f) => {
          if (f.type === "checkbox") {
            body[f.name] = (formEl.elements.namedItem(f.name) as HTMLInputElement)?.checked ?? false;
          } else if (f.type === "number") {
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

  function handleSearch() {
    setSearch(searchInput.trim());
    setPage(1);
  }

  function clearSearch() {
    setSearchInput("");
    setSearch("");
    setPage(1);
  }

  function openDeleteModal(row: Record<string, unknown>) {
    const name = (row.title || row.name || `Item #${row.id}`) as string;
    setDeleteTarget({ id: row.id as number, name });
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">{title}</h1>
        <button
          onClick={() => { setEditing(null); setShowForm(true); setErr(null); }}
          className="brand-gradient text-white px-4 py-2 rounded-md text-sm font-medium cursor-pointer"
        >
          + New
        </button>
      </div>

      {list.isLoading && <p className="text-muted-foreground">Loading…</p>}
      {list.isError && <p className="text-destructive text-sm">Unable to load. Check that the API is reachable and you're authenticated.</p>}

      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between mb-4">
        <div className="flex-1 max-w-md">
          <label className="text-xs font-medium text-muted-foreground block mb-1">Search</label>
          <div className="flex gap-2">
            <input
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              placeholder={`Search ${title.toLowerCase()}...`}
              className="w-full px-3 py-2 rounded-md border bg-background text-sm"
            />
            <button onClick={handleSearch} className="px-3 py-2 rounded-md border text-sm hover:bg-secondary cursor-pointer">Search</button>
          </div>
        </div>
        {(search || searchInput) && (
          <button onClick={clearSearch} className="text-sm text-muted-foreground hover:text-foreground cursor-pointer">
            Clear
          </button>
        )}
      </div>

      {list.data && (
        <div className="rounded-xl border bg-card overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-secondary text-left">
              <tr>
                {listFields.map((f) => <th key={f.key} className="px-4 py-3 font-semibold">{f.label}</th>)}
                <th className="px-4 py-3 w-32"></th>
              </tr>
            </thead>
            <tbody>
              {list.data.results.map((row) => (
                <tr key={row.id as number} className="border-t">
                  {listFields.map((f) => (
                    <td key={f.key} className="px-4 py-3">
                      {renderCell(row[f.key])}
                    </td>
                  ))}
                  <td className="px-4 py-3 text-right space-x-2">
                    <button onClick={() => { setEditing(row); setShowForm(true); setErr(null); }} className="text-xs px-2 py-1 rounded border hover:bg-secondary cursor-pointer">Edit</button>
                    <button onClick={() => openDeleteModal(row)} className="text-xs px-2 py-1 rounded border border-destructive text-destructive hover:bg-destructive/10 cursor-pointer">Delete</button>
                  </td>
                </tr>
              ))}
              {list.data.results.length === 0 && (
                <tr><td className="px-4 py-8 text-center text-muted-foreground" colSpan={listFields.length + 1}>Nothing here yet.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {list.data && (
        <div className="flex items-center justify-between px-4 py-3 border-t text-sm text-muted-foreground">
          <div>{list.data.count} total</div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="px-3 py-1.5 rounded-md border text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-secondary cursor-pointer"
            >
              Previous
            </button>
            <span>Page {page}</span>
            <button
              onClick={() => setPage((p) => p + 1)}
              disabled={!list.data.next}
              className="px-3 py-1.5 rounded-md border text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-secondary cursor-pointer"
            >
              Next
            </button>
          </div>
        </div>
      )}

      {showForm && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setShowForm(false)}>
          <form
            onClick={(e) => e.stopPropagation()}
            onSubmit={submit}
            className="bg-card rounded-2xl max-w-xl w-full p-6 max-h-[90vh] overflow-y-auto space-y-4"
          >
            <h2 className="text-xl font-semibold">{editing ? "Edit" : "New"} {title}</h2>
            {fields.map((f) => {
              const val = editing?.[f.name];
              return (
                <div key={f.name}>
                  <label className="text-xs font-medium block mb-1">{f.label}{f.required && " *"}</label>
                  {f.type === "textarea" ? (
                    <textarea name={f.name} required={f.required} defaultValue={(val as string) ?? ""} rows={4} className="w-full px-3 py-2 rounded-md border bg-background text-sm" />
                  ) : f.type === "select" ? (
                    <select name={f.name} required={f.required} defaultValue={(val as string) ?? f.defaultValue ?? ""} className="w-full px-3 py-2 rounded-md border bg-background text-sm cursor-pointer">
                      <option value="">—</option>
                      {f.options?.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
                    </select>
                  ) : f.type === "checkbox" ? (
                    <input name={f.name} type="checkbox" defaultChecked={(val as boolean) ?? (f.defaultValue as boolean) ?? false} className="h-4 w-4 cursor-pointer" />
                  ) : f.type === "file" ? (
                    <div>
                      <input 
                        name={f.name} 
                        type="file" 
                        accept="image/*" 
                        onChange={handleFileChange}
                        className="w-full text-sm cursor-pointer file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-secondary file:text-foreground file:cursor-pointer hover:file:bg-secondary/80" 
                      />
                      <p className="text-xs text-muted-foreground mt-1">Max file size: {MAX_FILE_SIZE_MB}MB</p>
                    </div>
                  ) : (
                    <input
                      name={f.name}
                      type={f.type ?? "text"}
                      required={f.required}
                      defaultValue={formatValue(val, f.type)}
                      className="w-full px-3 py-2 rounded-md border bg-background text-sm"
                    />
                  )}
                </div>
              );
            })}
            {err && <p className="text-sm text-destructive whitespace-pre-wrap">{err}</p>}
            <div className="flex justify-end gap-2 pt-2">
              <button type="button" onClick={() => setShowForm(false)} className="px-4 py-2 rounded-md border text-sm cursor-pointer hover:bg-secondary">Cancel</button>
              <button disabled={busy} className="brand-gradient text-white px-4 py-2 rounded-md text-sm font-medium disabled:opacity-60 cursor-pointer disabled:cursor-not-allowed">
                {busy ? "Saving…" : "Save"}
              </button>
            </div>
          </form>
        </div>
      )}

      <AlertDialog open={!!deleteTarget} onOpenChange={(open) => !open && setDeleteTarget(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete {title.slice(0, -1)}</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete "{deleteTarget?.name}"? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={deleting} className="cursor-pointer disabled:cursor-not-allowed">Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDelete}
              disabled={deleting}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90 cursor-pointer disabled:cursor-not-allowed"
            >
              {deleting ? "Deleting…" : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

function renderCell(v: unknown) {
  if (v == null) return <span className="text-muted-foreground">—</span>;
  if (typeof v === "boolean") return v ? "Yes" : "No";
  if (typeof v === "string" && /^https?:\/\/.*\.(jpe?g|png|gif|webp)/i.test(v)) {
    return <img src={v} alt="" className="h-10 w-10 object-cover rounded" />;
  }
  if (typeof v === "string" && v.length > 80) return v.slice(0, 80) + "…";
  if (typeof v === "object") return JSON.stringify(v).slice(0, 80);
  return String(v);
}

function formatValue(v: unknown, type?: string) {
  if (v == null) return "";
  if (type === "datetime-local" && typeof v === "string") {
    return v.slice(0, 16);
  }
  return String(v);
}
