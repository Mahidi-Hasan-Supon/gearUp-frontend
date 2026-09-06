import { getAdminRentals } from "@/app/(dashboardGroup)/_action/getAdminRentals";
import AdminRentalCard from "../../_compunents/adminRentalCard";

export default async function AdminRentalsPage() {
  const result = await getAdminRentals();

  if (!result.success) {
    return (
      <div className="p-6">
        <div className="rounded-xl border border-destructive/30 bg-destructive/10 p-4 text-destructive">
          {result.message}
        </div>
      </div>
    );
  }

  const rentals = result.data;

  return (
    <div className="space-y-8 p-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">
          Rental Management
        </h1>

        <p className="mt-2 text-muted-foreground">
          Monitor all rental activities in the system.
        </p>
      </div>

      {/* Total Rentals */}
      <div className="text-sm text-muted-foreground">
        Total Rentals:{" "}
        <span className="font-semibold text-foreground">
          {rentals.length}
        </span>
      </div>

      {/* Rental List */}
      {rentals.length === 0 ? (
        <div className="rounded-xl border p-10 text-center text-muted-foreground">
          No rentals found.
        </div>
      ) : (
        <div className="grid gap-5 lg:grid-cols-2">
          {rentals.map((rental) => (
            <AdminRentalCard
              key={rental.id}
              rental={rental}
            />
          ))}
        </div>
      )}
    </div>
  );
}