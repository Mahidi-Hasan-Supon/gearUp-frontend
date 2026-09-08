
import { getAdminUsers } from "@/app/(dashboardGroup)/_action/getAdminUsers";
import AdminUsersTable from "../../_compunents/adminUserTable";

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

  return (
    <div className="space-y-8 p-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">
          User Management
        </h1>

        <p className="mt-2 text-muted-foreground">
          Search, manage and update user account status.
        </p>
      </div>

      <AdminUsersTable users={result.data} />
    </div>
  );
}

