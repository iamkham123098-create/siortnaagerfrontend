//#region node_modules/.nitro/vite/services/ssr/assets/api-DzHwqZS_.js
var API_BASE_URL = "http://localhost:8000/api";
function authHeaders() {
	if (typeof window === "undefined") return {};
	const t = localStorage.getItem("sio_access");
	return t ? { Authorization: `Bearer ${t}` } : {};
}
async function apiGet(path, withAuth = false) {
	const res = await fetch(`${API_BASE_URL}${path}`, { headers: { ...withAuth ? authHeaders() : {} } });
	if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
	return res.json();
}
async function apiJson(path, method, body, withAuth = true) {
	const res = await fetch(`${API_BASE_URL}${path}`, {
		method,
		headers: {
			"Content-Type": "application/json",
			...withAuth ? authHeaders() : {}
		},
		body: body ? JSON.stringify(body) : void 0
	});
	if (!res.ok) {
		const text = await res.text();
		throw new Error(text || `${res.status}`);
	}
	if (res.status === 204) return void 0;
	return res.json();
}
async function apiForm(path, method, data, withAuth = true) {
	const res = await fetch(`${API_BASE_URL}${path}`, {
		method,
		headers: { ...withAuth ? authHeaders() : {} },
		body: data
	});
	if (!res.ok) {
		const text = await res.text();
		throw new Error(text || `${res.status}`);
	}
	if (res.status === 204) return void 0;
	return res.json();
}
async function login(username, password) {
	const data = await apiJson("/admin/login/", "POST", {
		username,
		password
	}, false);
	localStorage.setItem("sio_access", data.access);
	localStorage.setItem("sio_refresh", data.refresh);
	return data;
}
function logout() {
	localStorage.removeItem("sio_access");
	localStorage.removeItem("sio_refresh");
}
function isLoggedIn() {
	if (typeof window === "undefined") return false;
	return !!localStorage.getItem("sio_access");
}
//#endregion
export { login as a, isLoggedIn as i, apiGet as n, logout as o, apiJson as r, apiForm as t };
