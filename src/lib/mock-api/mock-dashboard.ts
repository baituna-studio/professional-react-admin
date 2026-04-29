import type { ActivityItem, DashboardKpi, RevenuePoint, TrafficPoint } from "@/lib/mock-api/types";

export const mockDashboardKpis: DashboardKpi[] = [
  { label: "Total Revenue", value: "$128,450", change: 14.2, trend: "up" },
  { label: "Active Users", value: "1,249", change: 4.8, trend: "up" },
  { label: "Conversion Rate", value: "6.3%", change: 0.7, trend: "up" },
  { label: "Open Tickets", value: "32", change: 2.1, trend: "down" }
];

export const mockRevenuePoints: RevenuePoint[] = [
  { month: "Jan", revenue: 14500, expenses: 7300 },
  { month: "Feb", revenue: 16200, expenses: 8100 },
  { month: "Mar", revenue: 18400, expenses: 9050 },
  { month: "Apr", revenue: 20300, expenses: 10100 },
  { month: "May", revenue: 21750, expenses: 11200 },
  { month: "Jun", revenue: 23200, expenses: 11900 }
];

export const mockTrafficPoints: TrafficPoint[] = [
  { source: "Organic", visitors: 4820 },
  { source: "Paid", visitors: 2140 },
  { source: "Referral", visitors: 1620 },
  { source: "Social", visitors: 980 }
];

export const mockActivity: ActivityItem[] = [
  { id: "act_1", actor: "Alex Morgan", action: "approved", target: "Q2 budget", createdAt: "2m ago" },
  { id: "act_2", actor: "Nora Kim", action: "invited", target: "Sophie Lee", createdAt: "15m ago" },
  { id: "act_3", actor: "Ivy Johnson", action: "updated", target: "workspace settings", createdAt: "1h ago" },
  { id: "act_4", actor: "Daniel Smith", action: "resolved", target: "ticket #482", createdAt: "3h ago" }
];
