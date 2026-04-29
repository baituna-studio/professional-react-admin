export const AUTH_TOKEN_KEY = "admin_template_token";

export function getAuthToken() {
  if (typeof window === "undefined") {
    return null;
  }
  try {
    return localStorage.getItem(AUTH_TOKEN_KEY);
  } catch {
    return null;
  }
}

export function setAuthToken(token: string) {
  if (typeof window === "undefined") {
    return;
  }
  try {
    localStorage.setItem(AUTH_TOKEN_KEY, token);
  } catch {
    // Ignore storage failures in restricted environments.
  }
}

export function clearAuthToken() {
  if (typeof window === "undefined") {
    return;
  }
  try {
    localStorage.removeItem(AUTH_TOKEN_KEY);
  } catch {
    // Ignore storage failures in restricted environments.
  }
}
