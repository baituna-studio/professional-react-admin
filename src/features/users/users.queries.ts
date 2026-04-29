import { usersApi } from "@/features/users/users.api";
import type { User, UserStatus } from "@/features/users/users.types";
import { useEffect, useState } from "react";

type UsersQueryParams = {
  search?: string;
  status?: UserStatus | "all";
  page?: number;
};

type UsersQueryResult = {
  data: User[];
  isLoading: boolean;
  error: string | null;
  total: number;
};

export function useUsersListQuery(params: UsersQueryParams): UsersQueryResult {
  const [data, setData] = useState<User[]>([]);
  const [total, setTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    setIsLoading(true);

    usersApi
      .list(params)
      .then((result) => {
        if (!mounted) {
          return;
        }

        setData(result.data);
        setTotal(result.meta.total);
      })
      .catch((err) => {
        if (!mounted) {
          return;
        }

        setError(err instanceof Error ? err.message : "Failed to load users");
      })
      .finally(() => {
        if (mounted) {
          setIsLoading(false);
        }
      });

    return () => {
      mounted = false;
    };
  }, [params.page, params.search, params.status]);

  return { data, total, isLoading, error };
}
