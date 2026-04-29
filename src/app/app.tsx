import { AppLayout } from "@/components/layout/app-layout";
import { ChartCard } from "@/components/shared/chart-card";
import { ConfirmDialog } from "@/components/shared/confirm-dialog";
import { EmptyState } from "@/components/shared/empty-state";
import { LoadingCard } from "@/components/shared/loading-card";
import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderTitle
} from "@/components/shared/page-header";
import { StatCard } from "@/components/shared/stat-card";
import { StatusBadge } from "@/components/shared/status-badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { LoginPage } from "@/features/auth/login-page";
import { ProtectedRoute } from "@/features/auth/protected-route";
import { useAuthStore } from "@/features/auth/auth.store";
import { useDashboardOverviewQuery } from "@/features/dashboard/dashboard.queries";
import { useUsersListQuery } from "@/features/users/users.queries";
import { useEffect, useState } from "react";

const navItems = [
  { label: "Dashboard", href: "/dashboard" },
  { label: "Analytics", href: "/analytics" },
  { label: "Users", href: "/users" },
  { label: "Settings", href: "/settings" }
];

function readPath() {
  const raw = window.location.pathname;
  return raw === "/" ? "/dashboard" : raw;
}

function navigate(path: string) {
  window.history.pushState({}, "", path);
  window.dispatchEvent(new PopStateEvent("popstate"));
}

export function App() {
  const [open, setOpen] = useState(false);
  const [path, setPath] = useState(() => (typeof window === "undefined" ? "/dashboard" : readPath()));
  const { isAuthenticated, login, logout } = useAuthStore();
  const dashboardQuery = useDashboardOverviewQuery();
  const usersQuery = useUsersListQuery({ status: "all", page: 1, search: "" });

  useEffect(() => {
    const onPopState = () => setPath(readPath());
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);

  useEffect(() => {
    if (!isAuthenticated && path !== "/login") {
      navigate("/login");
    }

    if (isAuthenticated && path === "/login") {
      navigate("/dashboard");
    }
  }, [isAuthenticated, path]);

  if (!isAuthenticated || path === "/login") {
    return (
      <LoginPage
        onSuccess={(token) => {
          login(token);
          navigate("/dashboard");
        }}
      />
    );
  }

  return (
    <ProtectedRoute isAuthenticated={isAuthenticated}>
      <AppLayout
        title="Admin Overview"
        navItems={navItems}
        currentPath={path}
        onLogout={() => {
          logout();
          navigate("/login");
        }}
      >
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-6">
          <PageHeader>
            <PageHeaderTitle>UI Component System Baseline</PageHeaderTitle>
            <PageHeaderDescription>
              Reusable primitive and shared components for dashboard feature development.
            </PageHeaderDescription>
          </PageHeader>

          {dashboardQuery.isLoading ? (
            <section className="grid gap-4 md:grid-cols-3">
              <LoadingCard />
              <LoadingCard />
              <LoadingCard />
            </section>
          ) : (
            <section className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {dashboardQuery.data?.kpis.map((kpi) => (
                <StatCard
                  key={kpi.label}
                  label={kpi.label}
                  value={kpi.value}
                  trend={`${kpi.trend === "up" ? "+" : "-"}${kpi.change}%`}
                />
              ))}
            </section>
          )}

          <section className="grid gap-4 lg:grid-cols-2">
            <ChartCard title="Revenue Trend" description="Mock async data loaded with simulated latency.">
              <div className="space-y-1 text-xs text-slate-500">
                {(dashboardQuery.data?.revenue ?? []).map((point) => (
                  <p key={point.month}>{`${point.month}: $${point.revenue.toLocaleString()}`}</p>
                ))}
              </div>
            </ChartCard>

            {usersQuery.isLoading ? (
              <LoadingCard />
            ) : usersQuery.data.length === 0 ? (
              <EmptyState
                title="No users found"
                description="This state appears when query returns empty data."
                actionLabel="Reload"
              />
            ) : (
              <div className="rounded-[var(--radius-card)] border border-slate-200 bg-white p-5 shadow-[var(--shadow-soft)]">
                <p className="text-sm font-semibold text-slate-700">Users sample ({usersQuery.total})</p>
                <ul className="mt-3 space-y-2 text-sm text-slate-600">
                  {usersQuery.data.slice(0, 4).map((user) => (
                    <li key={user.id} className="flex items-center justify-between gap-2">
                      <span>{user.name}</span>
                      <StatusBadge status={user.status} />
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </section>

          <section className="rounded-[var(--radius-card)] border border-slate-200 bg-white p-5 shadow-[var(--shadow-soft)]">
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <div className="space-y-1">
                <p className="text-sm text-slate-500">User Status Preview</p>
                <div className="flex items-center gap-2">
                  <StatusBadge status="active" />
                  <StatusBadge status="invited" />
                  <StatusBadge status="suspended" />
                </div>
              </div>
              <div className="flex w-full flex-col gap-2 md:w-72">
                <label htmlFor="search" className="text-xs font-medium text-slate-500">
                  Search users
                </label>
                <Input id="search" placeholder="Type name or email..." />
              </div>
            </div>

            <Separator />

            <div className="flex justify-end">
              <Button onClick={() => setOpen(true)}>Open Confirm Dialog</Button>
            </div>
          </section>
        </div>

        <ConfirmDialog
          open={open}
          title="Delete this sample card?"
          description="This confirms interaction states for the shared confirm dialog component."
          onCancel={() => setOpen(false)}
          onConfirm={() => setOpen(false)}
        />
      </AppLayout>
    </ProtectedRoute>
  );
}
