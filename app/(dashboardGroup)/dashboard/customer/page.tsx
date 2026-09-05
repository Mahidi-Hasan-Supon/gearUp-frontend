import { getMyRentals } from "@/app/(publicGroup)/_action/getMyRentals";
import { CustomerRental } from "@/lib/types";
import {
  Package,
  CheckCircle,
  Clock,
  DollarSign,
} from "lucide-react";

export default async function CustomerDashboardPage() {
  const result = await getMyRentals();

  const rentals : CustomerRental[] = result.data || [];

  // Total Rentals
  const totalRentals = rentals.length;

  // Active Rentals
  const activeRentals = rentals.filter(
    (rental) =>
      rental.status === "PLACED" ||
      rental.status === "CONFIRMED" ||
      rental.status === "PAID" ||
      rental.status === "PICKED_UP",
  ).length;

  // Completed Rentals
  const completedRentals = rentals.filter(
    (rental) => rental.status === "RETURNED",
  ).length;

  // Total Spent (only paid rentals)
  const totalSpent = rentals.reduce((total, rental) => {
    const isPaid = rental.payment?.some(
      (payment) => payment.status === "PAID",
    );

    return isPaid ? total + rental.totalPrice : total;
  }, 0);

  // Recent Rentals
  const recentRentals = [...rentals]
    .sort(
      (a, b) =>
        new Date(b.startDate).getTime() -
        new Date(a.startDate).getTime(),
    )
    .slice(0, 5);

  return (
    <div className="space-y-8 p-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">
          Customer Dashboard
        </h1>

        <p className="mt-2 text-muted-foreground">
          Manage your rentals and track your orders.
        </p>
      </div>

      {/* Statistics */}
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-xl border p-5">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">
              Total Rentals
            </span>

            <Package className="h-5 w-5 text-muted-foreground" />
          </div>

          <p className="mt-3 text-3xl font-bold">
            {totalRentals}
          </p>
        </div>

        <div className="rounded-xl border p-5">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">
              Active Rentals
            </span>

            <Clock className="h-5 w-5 text-muted-foreground" />
          </div>

          <p className="mt-3 text-3xl font-bold">
            {activeRentals}
          </p>
        </div>

        <div className="rounded-xl border p-5">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">
              Completed
            </span>

            <CheckCircle className="h-5 w-5 text-muted-foreground" />
          </div>

          <p className="mt-3 text-3xl font-bold">
            {completedRentals}
          </p>
        </div>

        <div className="rounded-xl border p-5">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">
              Total Spent
            </span>

            <DollarSign className="h-5 w-5 text-muted-foreground" />
          </div>

          <p className="mt-3 text-3xl font-bold">
            ${totalSpent}
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
            Your latest rental activity.
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
                    {rental.gear.brand}
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