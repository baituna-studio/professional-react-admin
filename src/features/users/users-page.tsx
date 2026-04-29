import { EmptyState } from "@/components/shared/empty-state";
import { LoadingCard } from "@/components/shared/loading-card";
import { PageHeader, PageHeaderDescription, PageHeaderTitle } from "@/components/shared/page-header";
import { StatusBadge } from "@/components/shared/status-badge";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { usersApi } from "@/features/users/users.api";
import { useUsersListQuery } from "@/features/users/users.queries";
import type { User, UserStatus } from "@/features/users/users.types";
import { useEffect, useMemo, useState } from "react";

type UsersPageProps = {
  onOpenDialog: () => void;
};

export function UsersPage({ onOpenDialog }: UsersPageProps) {
  const [searchDraft, setSearchDraft] = useState("");
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<UserStatus | "all">("all");
  const [page, setPage] = useState(1);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const query = useUsersListQuery({ search, status, page });
  const totalPages = Math.max(1, Math.ceil(query.total / 5));

  useEffect(() => {
    if (selectedUser && !query.data.find((user) => user.id === selectedUser.id)) {
      setSelectedUser(null);
    }
  }, [query.data, selectedUser]);

  const pageLabel = useMemo(() => `Page ${page} of ${totalPages}`, [page, totalPages]);

  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col gap-6">
      <PageHeader className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <PageHeaderTitle>Users</PageHeaderTitle>
          <PageHeaderDescription>Manage team members, statuses, and access overview.</PageHeaderDescription>
        </div>
        <Button onClick={onOpenDialog}>Add User</Button>
      </PageHeader>

      <section className="rounded-[var(--radius-card)] border border-slate-200 bg-white p-4 shadow-[var(--shadow-soft)] md:p-5">
        <div className="grid gap-3 md:grid-cols-[1fr_180px_auto]">
          <Input
            placeholder="Search by name or email"
            value={searchDraft}
            onChange={(e) => setSearchDraft(e.target.value)}
          />
          <select
            className="h-10 rounded-[var(--radius-control)] border border-slate-300 px-3 text-sm"
            value={status}
            onChange={(e) => {
              setStatus(e.target.value as UserStatus | "all");
              setPage(1);
            }}
          >
            <option value="all">All status</option>
            <option value="active">Active</option>
            <option value="invited">Invited</option>
            <option value="suspended">Suspended</option>
          </select>
          <Button
            variant="outline"
            onClick={() => {
              setSearch(searchDraft.trim());
              setPage(1);
            }}
          >
            Apply
          </Button>
        </div>
      </section>

      {query.isLoading ? (
        <LoadingCard />
      ) : query.data.length === 0 ? (
        <EmptyState
          title="No users found"
          description="Try adjusting search term or status filter to broaden results."
          actionLabel="Reset filters"
          onAction={() => {
            setSearch("");
            setSearchDraft("");
            setStatus("all");
            setPage(1);
          }}
        />
      ) : (
        <section className="overflow-hidden rounded-[var(--radius-card)] border border-slate-200 bg-white shadow-[var(--shadow-soft)]">
          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
                <tr>
                  <th className="px-4 py-3">User</th>
                  <th className="px-4 py-3">Role</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3">Last Active</th>
                  <th className="px-4 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {query.data.map((user) => (
                  <tr key={user.id} className="border-t border-slate-100 hover:bg-slate-50">
                    <td className="px-4 py-3">
                      <button className="text-left" onClick={() => setSelectedUser(user)}>
                        <p className="font-medium text-slate-800">{user.name}</p>
                        <p className="text-xs text-slate-500">{user.email}</p>
                      </button>
                    </td>
                    <td className="px-4 py-3">
                      <Badge>{user.role}</Badge>
                    </td>
                    <td className="px-4 py-3">
                      <StatusBadge status={user.status} />
                    </td>
                    <td className="px-4 py-3 text-slate-500">{new Date(user.lastActiveAt).toLocaleDateString()}</td>
                    <td className="px-4 py-3 text-right">
                      <Button variant="ghost" size="sm" onClick={() => setSelectedUser(user)}>
                        View
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex items-center justify-between border-t border-slate-100 px-4 py-3">
            <p className="text-xs text-slate-500">{pageLabel}</p>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" disabled={page <= 1} onClick={() => setPage((p) => p - 1)}>
                Previous
              </Button>
              <Button
                variant="outline"
                size="sm"
                disabled={page >= totalPages}
                onClick={() => setPage((p) => p + 1)}
              >
                Next
              </Button>
            </div>
          </div>
        </section>
      )}

      {selectedUser ? <UserDetailModal user={selectedUser} onClose={() => setSelectedUser(null)} /> : null}
    </div>
  );
}

type UserDetailModalProps = {
  user: User;
  onClose: () => void;
};

function UserDetailModal({ user, onClose }: UserDetailModalProps) {
  const [loading, setLoading] = useState(false);
  const [detail, setDetail] = useState<User | null>(user);

  useEffect(() => {
    setLoading(true);
    usersApi
      .getById(user.id)
      .then((result) => setDetail(result))
      .finally(() => setLoading(false));
  }, [user.id]);

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-slate-900/40">
      <aside className="h-full w-full max-w-md overflow-y-auto bg-white p-5 shadow-2xl">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-lg font-semibold text-slate-900">User Detail</h3>
          <Button variant="ghost" size="sm" onClick={onClose}>
            Close
          </Button>
        </div>

        {loading || !detail ? (
          <LoadingCard />
        ) : (
          <div className="space-y-3 text-sm">
            <DetailRow label="Name" value={detail.name} />
            <DetailRow label="Email" value={detail.email} />
            <DetailRow label="Role" value={detail.role} />
            <DetailRow label="Status" value={detail.status} />
            <DetailRow label="Location" value={detail.location} />
            <DetailRow label="Last Active" value={new Date(detail.lastActiveAt).toLocaleString()} />
            <DetailRow label="Created" value={new Date(detail.createdAt).toLocaleString()} />
          </div>
        )}
      </aside>
    </div>
  );
}

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-[var(--radius-control)] border border-slate-200 p-3">
      <p className="text-xs uppercase tracking-wide text-slate-500">{label}</p>
      <p className="mt-1 text-sm font-medium text-slate-800">{value}</p>
    </div>
  );
}
