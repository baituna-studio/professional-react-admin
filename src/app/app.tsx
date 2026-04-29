import { AppLayout } from "@/components/layout/app-layout";
import { ChartCard } from "@/components/shared/chart-card";
import { ConfirmDialog } from "@/components/shared/confirm-dialog";
import { EmptyState } from "@/components/shared/empty-state";
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
import { useState } from "react";

const navItems = [
  { label: "Dashboard", href: "/dashboard" },
  { label: "Analytics", href: "/analytics" },
  { label: "Users", href: "/users" },
  { label: "Settings", href: "/settings" }
];

function getCurrentPath() {
  if (typeof window === "undefined") {
    return "/dashboard";
  }

  const raw = window.location.pathname;
  return raw === "/" ? "/dashboard" : raw;
}

export function App() {
  const [open, setOpen] = useState(false);

  return (
    <AppLayout title="Admin Overview" navItems={navItems} currentPath={getCurrentPath()}>
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6">
        <PageHeader>
          <PageHeaderTitle>UI Component System Baseline</PageHeaderTitle>
          <PageHeaderDescription>
            Reusable primitive and shared components for dashboard feature development.
          </PageHeaderDescription>
        </PageHeader>

        <section className="grid gap-4 md:grid-cols-3">
          <StatCard label="Total Revenue" value="$128,450" trend="+14.2% from last month" />
          <StatCard label="Active Users" value="1,249" trend="+4.8% from last week" />
          <StatCard label="Open Tickets" value="32" trend="-2 resolved today" />
        </section>

        <section className="grid gap-4 lg:grid-cols-2">
          <ChartCard title="Revenue Trend" description="Placeholder chart container for upcoming Recharts integration.">
            <div className="flex h-full items-center justify-center text-sm text-slate-500">Chart area</div>
          </ChartCard>
          <EmptyState
            title="No notifications yet"
            description="When activity starts, this card can show summary notifications."
            actionLabel="Create sample"
          />
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
  );
}
