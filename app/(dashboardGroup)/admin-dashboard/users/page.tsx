import { getAdminUsers } from "@/app/(dashboardGroup)/_action/getAdminUsers";
import AdminUserCard from "../../_compunents/adminUserCard";

export default async function AdminUsersPage() {
  const result = await getAdminUsers();

  if (!result.success) {
    return (
      <div className="p-6">
        <div className="rounded-xl border border-destructive/30 bg-destructive/10 p-4 text-destructive">
          {result.message}
        </div>
      </div>
    );
  }

  const users = result.data;

  return (
    <div className="space-y-8 p-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">
          User Management
        </h1>

        <p className="mt-2 text-muted-foreground">
          Manage all users and their account status.
        </p>
      </div>

      {/* Users Count */}
      <div className="text-sm text-muted-foreground">
        Total Users:{" "}
        <span className="font-semibold text-foreground">
          {users.length}
        </span>
      </div>

      {/* Users */}
      {users.length === 0 ? (
        <div className="rounded-xl border p-10 text-center text-muted-foreground">
          No users found.
        </div>
      ) : (
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {users.map((user) => (
            <AdminUserCard
              key={user.id}
              user={user}
            />
          ))}
        </div>
      )}
    </div>
  );
}