import {
  Users,
  Package,
  ClipboardList,
  UserCheck,
} from "lucide-react";

import { getAdminUsers } from "../_action/getAdminUsers";
import { getAdminGears } from "../_action/getAdminGears";
import { getAdminRentals } from "../_action/getAdminRentals";

export default async function AdminDashboardPage() {
  const [usersResult, gearsResult, rentalsResult] =
    await Promise.all([
      getAdminUsers(),
      getAdminGears(),
      getAdminRentals(),
    ]);

  const users = usersResult.data;
  const gears = gearsResult.data;
  const rentals = rentalsResult.data;

  const totalUsers = users.length;
  const totalGears = gears.length;
  const totalRentals = rentals.length;

  const activeUsers = users.filter(
    (user) => user.status === "ACTIVE",
  ).length;

  const recentRentals = rentals.slice(0, 5);

  return (
    <div className="space-y-8 p-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">
          Admin Dashboard
        </h1>

        <p className="mt-2 text-muted-foreground">
          Manage users, gear and rental activities.
        </p>
      </div>

      {/* Statistics */}
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">

        {/* Total Users */}
        <div className="rounded-xl border p-5">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">
              Total Users
            </span>

            <Users className="h-5 w-5 text-muted-foreground" />
          </div>

          <p className="mt-3 text-3xl font-bold">
            {totalUsers}
          </p>
        </div>

        {/* Active Users */}
        <div className="rounded-xl border p-5">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">
              Active Users
            </span>

            <UserCheck className="h-5 w-5 text-muted-foreground" />
          </div>

          <p className="mt-3 text-3xl font-bold">
            {activeUsers}
          </p>
        </div>

        {/* Total Gear */}
        <div className="rounded-xl border p-5">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">
              Total Gear
            </span>

            <Package className="h-5 w-5 text-muted-foreground" />
          </div>

          <p className="mt-3 text-3xl font-bold">
            {totalGears}
          </p>
        </div>

        {/* Total Rentals */}
        <div className="rounded-xl border p-5">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">
              Total Rentals
            </span>

            <ClipboardList className="h-5 w-5 text-muted-foreground" />
          </div>

          <p className="mt-3 text-3xl font-bold">
            {totalRentals}
          </p>
        </div>

      </div>

      {/* Recent Rentals */}
      <div className="rounded-xl border">
        <div className="border-b p-5">
          <h2 className="text-xl font-bold">
            Recent Rentals
          </h2>

          <p className="mt-1 text-sm text-muted-foreground">
            Latest rental activity in the system.
          </p>
        </div>

        {recentRentals.length === 0 ? (
          <div className="p-10 text-center text-muted-foreground">
            No rentals found.
          </div>
        ) : (
          <div className="divide-y">
            {recentRentals.map((rental) => (
              <div
                key={rental.id}
                className="flex items-center justify-between gap-4 p-5"
              >
                <div>
                  <h3 className="font-semibold">
                    {rental.gear.title}
                  </h3>

                  <p className="mt-1 text-sm text-muted-foreground">
                    Customer: {rental.customer.name}
                  </p>
                </div>

                <div className="text-right">
                  <p className="font-semibold">
                    ${rental.totalPrice}
                  </p>

                  <p className="mt-1 text-xs text-muted-foreground">
                    {rental.status}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}