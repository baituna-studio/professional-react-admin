import { delay } from "@/lib/mock-api/delay";
import { mockUsers } from "@/lib/mock-api/mock-users";
import type { UserStatus } from "@/lib/mock-api/types";

type ListParams = {
  search?: string;
  status?: UserStatus | "all";
  page?: number;
  pageSize?: number;
};

export const usersApi = {
  list: async (params: ListParams = {}) => {
    await delay(500);

    const search = params.search?.trim().toLowerCase() ?? "";
    const status = params.status ?? "all";
    const page = params.page ?? 1;
    const pageSize = params.pageSize ?? 5;

    const filtered = mockUsers.filter((user) => {
      const matchSearch =
        search.length === 0 ||
        user.name.toLowerCase().includes(search) ||
        user.email.toLowerCase().includes(search);

      const matchStatus = status === "all" || user.status === status;

      return matchSearch && matchStatus;
    });

    const start = (page - 1) * pageSize;
    const data = filtered.slice(start, start + pageSize);

    return {
      data,
      meta: {
        page,
        pageSize,
        total: filtered.length,
        totalPages: Math.max(1, Math.ceil(filtered.length / pageSize))
      }
    };
  },

  getById: async (id: string) => {
    await delay(350);
    return mockUsers.find((user) => user.id === id) ?? null;
  }
};
