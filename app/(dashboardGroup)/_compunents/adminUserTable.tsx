"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

import type { AdminUser } from "@/app/(dashboardGroup)/_action/getAdminUsers";
import { updateUserStatus } from "../_action/updateUsersStatus";

type AdminUsersTableProps = {
  users: AdminUser[];
};

const USERS_PER_PAGE = 5;

export default function AdminUsersTable({ users }: AdminUsersTableProps) {
  const router = useRouter();

  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [loadingId, setLoadingId] = useState<string | null>(null);

  /* Search */
  const filteredUsers = useMemo(() => {
    const searchValue = search.toLowerCase();

    return users.filter(
      (user) =>
        user.name.toLowerCase().includes(searchValue) ||
        user.email.toLowerCase().includes(searchValue) ||
        user.role.toLowerCase().includes(searchValue),
    );
  }, [users, search]);

  /* Pagination */
  const totalPages = Math.ceil(filteredUsers.length / USERS_PER_PAGE);

  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * USERS_PER_PAGE,
    currentPage * USERS_PER_PAGE,
  );

  const handleStatusChange = async (user: AdminUser) => {
    const newStatus = user.status === "ACTIVE" ? "BLOCKED" : "ACTIVE";

    setLoadingId(user.id);

    const result = await updateUserStatus(user.id, newStatus);

    setLoadingId(null);

    if (!result.success) {
      toast.error(result.message);
      return;
    }

    toast.success(result.message);

    router.refresh();
  };

  const handleSearch = (value: string) => {
    setSearch(value);
    setCurrentPage(1);
  };

  return (
    <div className="space-y-5">
      {/* Top Section */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-muted-foreground">
          Total Users:{" "}
          <span className="font-semibold text-foreground">
            {filteredUsers.length}
          </span>
        </p>

        {/* Search */}
        <div className="relative w-full sm:max-w-sm">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

          <input
            value={search}
            onChange={(e) => handleSearch(e.target.value)}
            placeholder="Search users..."
            className="w-full rounded-lg border py-2.5 pl-10 pr-4 text-sm outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-xl border bg-background">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="border-b bg-muted/50">
              <tr>
                <th className="px-5 py-4 font-semibold">User</th>

                <th className="px-5 py-4 font-semibold">Email</th>

                <th className="px-5 py-4 font-semibold">Role</th>

                <th className="px-5 py-4 font-semibold">Status</th>

                <th className="px-5 py-4 text-right font-semibold">Action</th>
              </tr>
            </thead>

            <tbody>
              {paginatedUsers.length === 0 ? (
                <tr>
                  <td
                    colSpan={5}
                    className="px-5 py-12 text-center text-muted-foreground"
                  >
                    No users found.
                  </td>
                </tr>
              ) : (
                paginatedUsers.map((user) => (
                  <tr key={user.id} className="border-b last:border-0">
                    {/* User */}
                    <td className="px-5 py-4">
                      <div>
                        <p className="font-medium">{user.name}</p>

                        <p className="text-xs text-muted-foreground">
                          ID: {user.id.slice(0, 8)}...
                        </p>
                      </div>
                    </td>

                    {/* Email */}
                    <td className="px-5 py-4 text-muted-foreground">
                      {user.email}
                    </td>

                    {/* Role */}
                    <td className="px-5 py-4">
                      <span className="rounded-full bg-muted px-3 py-1 text-xs font-medium">
                        {user.role}
                      </span>
                    </td>

                    {/* Status */}
                    <td className="px-5 py-4">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold ${
                          user.status === "ACTIVE"
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {user.status}
                      </span>
                    </td>

                    {/* Action */}
                    <td className="px-5 py-4 text-right">
                      <button
                        disabled={loadingId === user.id}
                        onClick={() => handleStatusChange(user)}
                        className={`rounded-lg px-4 py-2 text-xs font-medium text-white transition disabled:opacity-50 ${
                          user.status === "ACTIVE"
                            ? "bg-destructive hover:opacity-90"
                            : "bg-primary hover:opacity-90"
                        }`}
                      >
                        {loadingId === user.id
                          ? "Updating..."
                          : user.status === "ACTIVE"
                            ? "Block"
                            : "Activate"}
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            Page {currentPage} of {totalPages}
          </p>

          <div className="flex gap-2">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((page) => page - 1)}
              className="rounded-lg border px-4 py-2 text-sm disabled:cursor-not-allowed disabled:opacity-50"
            >
              Previous
            </button>

            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((page) => page + 1)}
              className="rounded-lg border px-4 py-2 text-sm disabled:cursor-not-allowed disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
