import { useSyncExternalStore } from "react";

type UiState = {
  sidebarCollapsed: boolean;
  mobileSidebarOpen: boolean;
  commandMenuOpen: boolean;
};

const uiState: UiState = {
  sidebarCollapsed: false,
  mobileSidebarOpen: false,
  commandMenuOpen: false
};

const listeners = new Set<() => void>();

function emit() {
  listeners.forEach((listener) => listener());
}

function setState(partial: Partial<UiState>) {
  Object.assign(uiState, partial);
  emit();
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function getSnapshot() {
  return { ...uiState };
}

export function useUiStore() {
  const state = useSyncExternalStore(subscribe, getSnapshot, getSnapshot);

  return {
    ...state,
    toggleSidebar: () => setState({ sidebarCollapsed: !uiState.sidebarCollapsed }),
    setMobileSidebarOpen: (open: boolean) => setState({ mobileSidebarOpen: open }),
    setCommandMenuOpen: (open: boolean) => setState({ commandMenuOpen: open })
  };
}
