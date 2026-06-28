export const API_BASE_URL =
  (import.meta.env.VITE_API_BASE_URL as string | undefined) ?? "http://localhost:8000/api";

export interface Paginated<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

export interface HomePage {
  id: number;
  hero_banner_image: string | null;
  hero_title: string;
  hero_subtitle: string;
  introduction: string;
  vision: string;
  mission: string;
  cta_join_text: string;
  cta_events_text: string;
}

export interface OfficeBearer {
  id: number;
  name: string;
  position: string;
  photo: string | null;
  contact_number: string;
  email: string;
  display_order: number;
}

export interface Activity {
  id: number;
  title: string;
  description: string;
  photo: string | null;
  activity_date: string;
  created_at: string;
}

export interface Book {
  id: number;
  title: string;
  author: string;
  category: "SIO_LITERATURE" | "CONTEMPORARY";
  category_display: string;
  cover_image: string | null;
  drive_link: string;
  description: string;
}

export interface EventItem {
  id: number;
  title: string;
  description: string;
  event_date: string;
  location: string;
  event_type: "UPCOMING" | "PAST";
  event_type_display: string;
  photo_count?: number;
  photos?: { id: number; photo: string; caption: string }[];
  created_at: string;
}

export interface Announcement {
  id: number;
  title: string;
  content: string;
  is_pinned: boolean;
  created_at: string;
}

export interface ContactInfo {
  id: number;
  office_address: string;
  google_maps_embed_url: string;
  phone_numbers: string[];
  email: string;
  social_media_links: Record<string, string>;
  google_form_link: string;
}

function authHeaders(): Record<string, string> {
  if (typeof window === "undefined") return {};
  const t = localStorage.getItem("sio_access");
  return t ? { Authorization: `Bearer ${t}` } : {};
}

export async function apiGet<T>(path: string, withAuth = false): Promise<T> {
  const res = await fetch(`${API_BASE_URL}${path}`, {
    headers: { ...(withAuth ? authHeaders() : {}) },
  });
  if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
  return res.json();
}

export async function apiJson<T>(
  path: string,
  method: string,
  body?: unknown,
  withAuth = true,
): Promise<T> {
  const res = await fetch(`${API_BASE_URL}${path}`, {
    method,
    headers: {
      "Content-Type": "application/json",
      ...(withAuth ? authHeaders() : {}),
    },
    body: body ? JSON.stringify(body) : undefined,
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || `${res.status}`);
  }
  if (res.status === 204) return undefined as T;
  return res.json();
}

export async function apiForm<T>(
  path: string,
  method: string,
  data: FormData,
  withAuth = true,
): Promise<T> {
  const res = await fetch(`${API_BASE_URL}${path}`, {
    method,
    headers: { ...(withAuth ? authHeaders() : {}) },
    body: data,
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || `${res.status}`);
  }
  if (res.status === 204) return undefined as T;
  return res.json();
}

export async function login(username: string, password: string) {
  const data = await apiJson<{ access: string; refresh: string }>(
    "/admin/login/",
    "POST",
    { username, password },
    false,
  );
  localStorage.setItem("sio_access", data.access);
  localStorage.setItem("sio_refresh", data.refresh);
  return data;
}

export function logout() {
  localStorage.removeItem("sio_access");
  localStorage.removeItem("sio_refresh");
}

export function isLoggedIn() {
  if (typeof window === "undefined") return false;
  return !!localStorage.getItem("sio_access");
}
