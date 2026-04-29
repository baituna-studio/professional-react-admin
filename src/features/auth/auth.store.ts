import { clearAuthToken, getAuthToken, setAuthToken } from "@/lib/storage";
import { useSyncExternalStore } from "react";

type AuthState = {
  token: string | null;
};

const state: AuthState = {
  token: getAuthToken()
};

const listeners = new Set<() => void>();

function emit() {
  listeners.forEach((listener) => listener());
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function snapshot() {
  return { ...state };
}

export function useAuthStore() {
  const current = useSyncExternalStore(subscribe, snapshot, snapshot);

  return {
    token: current.token,
    isAuthenticated: Boolean(current.token),
    login: (token: string) => {
      setAuthToken(token);
      state.token = token;
      emit();
    },
    logout: () => {
      clearAuthToken();
      state.token = null;
      emit();
    }
  };
}
