// =========================================================
// LeadScout API client
// Talks to the BDM Infotech Spring Boot backend (port 8080).
// Backend is NOT modified — these calls match the existing DTOs.
//
//   POST /auth/signup  { username, password, name, email }
//   POST /auth/login   { username, password }  -> { Jwt, userid, roles }
//   POST /api/scrape   { keyword, location, limit, find_emails }  (JWT required)
// =========================================================

const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:8080";

async function request(path, { method = "GET", body, token } = {}) {
  const res = await fetch(`${API_BASE}${path}`, {
    method,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  const text = await res.text();
  const data = text ? JSON.parse(text) : null;

  if (!res.ok) {
    const message = (data && (data.message || data.error)) || `Request failed (${res.status})`;
    throw new Error(message);
  }
  return data;
}

export const api = {
  // Auth
  signup: (payload) => request("/auth/signup", { method: "POST", body: payload }),
  login: (payload) => request("/auth/login", { method: "POST", body: payload }),

  // Scraper (requires the JWT returned by login)
  // payload: { keyword, location, limit, find_emails }
  scrape: (payload, token) =>
    request("/api/scrape", { method: "POST", body: payload, token }),
};

export default api;
