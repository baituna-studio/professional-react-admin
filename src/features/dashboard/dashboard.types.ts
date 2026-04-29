import type { ActivityItem, DashboardKpi, RevenuePoint, TrafficPoint } from "@/lib/mock-api/types";

export type DashboardOverview = {
  kpis: DashboardKpi[];
  revenue: RevenuePoint[];
  traffic: TrafficPoint[];
  activity: ActivityItem[];
};
