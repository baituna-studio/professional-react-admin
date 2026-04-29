import { delay } from "@/lib/mock-api/delay";
import { mockActivity, mockDashboardKpis, mockRevenuePoints, mockTrafficPoints } from "@/lib/mock-api/mock-dashboard";

export const dashboardApi = {
  overview: async () => {
    await delay(600);

    return {
      kpis: mockDashboardKpis,
      revenue: mockRevenuePoints,
      traffic: mockTrafficPoints,
      activity: mockActivity
    };
  }
};
