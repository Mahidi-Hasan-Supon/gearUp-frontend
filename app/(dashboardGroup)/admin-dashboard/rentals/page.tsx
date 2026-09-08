import { getAdminRentals } from "@/app/(dashboardGroup)/_action/getAdminRentals";
import AdminRentalTable from "../../_compunents/adminRentalTable";

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
        <h1 className="text-3xl font-bold">Rental Management</h1>

        <p className="mt-2 text-muted-foreground">
          Monitor all rental activities in the system.
        </p>
      </div>

      {/* Total Rentals */}
      <div className="text-sm text-muted-foreground">
        Total Rentals:{" "}
        <span className="font-semibold text-foreground">{rentals.length}</span>
      </div>

      {/* Rental Table */}
      {rentals.length === 0 ? (
        <div className="rounded-xl border p-10 text-center text-muted-foreground">
          No rentals found.
        </div>
      ) : (
        <AdminRentalTable rentals={rentals} />
      )}
    </div>
  );
}
