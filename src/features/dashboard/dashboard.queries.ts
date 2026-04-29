import { dashboardApi } from "@/features/dashboard/dashboard.api";
import type { DashboardOverview } from "@/features/dashboard/dashboard.types";
import { useEffect, useState } from "react";

type DashboardOverviewQuery = {
  data: DashboardOverview | null;
  isLoading: boolean;
  error: string | null;
};

export function useDashboardOverviewQuery(): DashboardOverviewQuery {
  const [data, setData] = useState<DashboardOverview | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    dashboardApi
      .overview()
      .then((result) => {
        if (!mounted) {
          return;
        }

        setData(result);
      })
      .catch((err) => {
        if (!mounted) {
          return;
        }

        setError(err instanceof Error ? err.message : "Failed to load dashboard overview");
      })
      .finally(() => {
        if (mounted) {
          setIsLoading(false);
        }
      });

    return () => {
      mounted = false;
    };
  }, []);

  return { data, isLoading, error };
}
