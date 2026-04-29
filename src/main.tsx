import "./styles/globals.css";
import { App } from "./app/app";
import { createRoot } from "react-dom/client";
import { Component, type ErrorInfo, type ReactNode } from "react";

type AppErrorBoundaryState = {
  error: Error | null;
};

class AppErrorBoundary extends Component<{ children: ReactNode }, AppErrorBoundaryState> {
  state: AppErrorBoundaryState = { error: null };

  static getDerivedStateFromError(error: Error): AppErrorBoundaryState {
    return { error };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    // Keep error visible in devtools while still rendering a user-friendly fallback.
    console.error("App runtime error:", error, info);
  }

  render() {
    if (this.state.error) {
      return (
        <main style={{ minHeight: "100vh", padding: "24px", background: "#f7f8fa", color: "#0f172a" }}>
          <h1 style={{ margin: 0, fontSize: "24px" }}>App failed to render</h1>
          <p style={{ marginTop: "8px" }}>
            Refresh the page or check browser console for detailed error logs.
          </p>
          <pre style={{ marginTop: "16px", whiteSpace: "pre-wrap" }}>{this.state.error.message}</pre>
        </main>
      );
    }

    return this.props.children;
  }
}

createRoot(document.getElementById("root")!).render(
  <AppErrorBoundary>
    <App />
  </AppErrorBoundary>
);
