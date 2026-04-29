import { AppLayout } from "@/components/layout/app-layout";
import { ChartCard } from "@/components/shared/chart-card";
import { EmptyState } from "@/components/shared/empty-state";
import { LoadingCard } from "@/components/shared/loading-card";
import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderTitle
} from "@/components/shared/page-header";
import { StatCard } from "@/components/shared/stat-card";
import { Button } from "@/components/ui/button";
import { LoginPage } from "@/features/auth/login-page";
import { ProtectedRoute } from "@/features/auth/protected-route";
import { useAuthStore } from "@/features/auth/auth.store";
import { useDashboardOverviewQuery } from "@/features/dashboard/dashboard.queries";
import { SettingsPage } from "@/features/settings/settings-page";
import { UsersPage } from "@/features/users/users-page";
import { useMemo, useSyncExternalStore, useState } from "react";

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

function subscribeToLocationChange(listener: () => void) {
  window.addEventListener("popstate", listener);
  return () => window.removeEventListener("popstate", listener);
}

function useWindowPath() {
  return useSyncExternalStore(subscribeToLocationChange, readPath, () => "/dashboard");
}

function DashboardOverview() {
  const dashboardQuery = useDashboardOverviewQuery();
  const trafficTotal = useMemo(() => {
    return (dashboardQuery.data?.traffic ?? []).reduce((acc, item) => acc + item.visitors, 0);
  }, [dashboardQuery.data?.traffic]);

  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col gap-6">
      <PageHeader className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <PageHeaderTitle>Overview</PageHeaderTitle>
          <PageHeaderDescription>
            Track revenue performance, traffic quality, and team activity in one premium dashboard surface.
          </PageHeaderDescription>
        </div>
        <Button variant="outline">Apr 01 - Apr 29, 2026</Button>
      </PageHeader>

      {dashboardQuery.isLoading ? (
        <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <LoadingCard />
          <LoadingCard />
          <LoadingCard />
          <LoadingCard />
        </section>
      ) : (
        <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {dashboardQuery.data?.kpis.map((kpi) => (
            <StatCard
              key={kpi.label}
              label={kpi.label}
              value={kpi.value}
              trend={`${kpi.trend === "up" ? "+" : "-"}${kpi.change}% vs last period`}
            />
          ))}
        </section>
      )}

      <section className="grid gap-4 xl:grid-cols-[2fr_1fr]">
        <ChartCard title="Revenue vs Expenses" description="Monthly movement from mock async source.">
          <div className="space-y-1 text-xs text-slate-500">
            {(dashboardQuery.data?.revenue ?? []).map((point) => (
              <p key={point.month}>{`${point.month}: revenue $${point.revenue.toLocaleString()} / expenses $${point.expenses.toLocaleString()}`}</p>
            ))}
          </div>
        </ChartCard>

        <ChartCard title="Traffic Sources" description="Visitor distribution snapshot.">
          <div className="space-y-2 text-sm text-slate-600">
            {(dashboardQuery.data?.traffic ?? []).map((item) => {
              const pct = trafficTotal > 0 ? Math.round((item.visitors / trafficTotal) * 100) : 0;
              return (
                <div key={item.source} className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span>{item.source}</span>
                    <span>{pct}%</span>
                  </div>
                  <div className="h-2 rounded-full bg-slate-200">
                    <div className="h-2 rounded-full bg-slate-800" style={{ width: `${pct}%` }} />
                  </div>
                </div>
              );
            })}
          </div>
        </ChartCard>
      </section>

      <section className="grid gap-4 xl:grid-cols-[2fr_1fr]">
        <div className="rounded-[var(--radius-card)] border border-slate-200 bg-white p-5 shadow-[var(--shadow-soft)]">
          <div className="mb-3 flex items-center justify-between">
            <h3 className="text-base font-semibold text-slate-900">Recent Activity</h3>
            <Button variant="ghost" size="sm">
              View all
            </Button>
          </div>

          {(dashboardQuery.data?.activity?.length ?? 0) === 0 ? (
            <EmptyState title="No activity yet" description="Recent workspace events will appear here." />
          ) : (
            <ul className="space-y-3">
              {(dashboardQuery.data?.activity ?? []).map((item) => (
                <li key={item.id} className="rounded-[var(--radius-control)] border border-slate-200 bg-slate-50 p-3">
                  <p className="text-sm font-medium text-slate-800">{`${item.actor} ${item.action} ${item.target}`}</p>
                  <p className="text-xs text-slate-500">{item.createdAt}</p>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="rounded-[var(--radius-card)] border border-slate-200 bg-gradient-to-br from-slate-900 to-slate-700 p-5 text-white shadow-[var(--shadow-card)]">
          <p className="text-xs uppercase tracking-wide text-slate-300">Premium Insight</p>
          <h3 className="mt-2 text-xl font-semibold">Upgrade workspace analytics</h3>
          <p className="mt-2 text-sm text-slate-200">
            Unlock funnel attribution, cohort retention, and deeper conversion segmentation for leadership reporting.
          </p>
          <Button className="mt-4 bg-white text-slate-900 hover:bg-slate-100">Explore upgrade</Button>
        </div>
      </section>
    </div>
  );
}

export function App() {
  const [openDialog, setOpenDialog] = useState(false);
  const { isAuthenticated, login, logout } = useAuthStore();
  const path = useWindowPath();
  const displayPath = isAuthenticated ? path : "/login";

  if (displayPath === "/login") {
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
        title={path === "/users" ? "Users" : path === "/settings" ? "Settings" : "Dashboard"}
        navItems={navItems}
        currentPath={path}
        onLogout={() => {
          logout();
          navigate("/login");
        }}
      >
        {path === "/users" ? (
          <UsersPage onOpenDialog={() => setOpenDialog(true)} />
        ) : path === "/settings" ? (
          <SettingsPage />
        ) : (
          <DashboardOverview />
        )}
      </AppLayout>
    </ProtectedRoute>
  );
}
