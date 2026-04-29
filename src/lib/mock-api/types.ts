export type UserStatus = "active" | "invited" | "suspended";

export type User = {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
  role: "Admin" | "Manager" | "Designer" | "Developer" | "Support";
  status: UserStatus;
  location: string;
  lastActiveAt: string;
  createdAt: string;
};

export type DashboardKpi = {
  label: string;
  value: string;
  change: number;
  trend: "up" | "down";
};

export type RevenuePoint = {
  month: string;
  revenue: number;
  expenses: number;
};

export type TrafficPoint = {
  source: string;
  visitors: number;
};

export type ActivityItem = {
  id: string;
  actor: string;
  action: string;
  target: string;
  createdAt: string;
};
