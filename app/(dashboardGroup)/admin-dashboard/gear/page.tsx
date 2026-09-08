import { getAdminGears } from "@/app/(dashboardGroup)/_action/getAdminGears";
import AdminGearTable from "../../_compunents/adminGearTable";

export default async function AdminGearPage() {
  const result = await getAdminGears();

  if (!result.success) {
    return (
      <div className="p-6">
        <div className="rounded-xl border border-destructive/30 bg-destructive/10 p-4 text-destructive">
          {result.message}
        </div>
      </div>
    );
  }

  const gears = result.data;

  return (
    <div className="space-y-8 p-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Gear Management</h1>

        <p className="mt-2 text-muted-foreground">
          View and monitor all gear available in the system.
        </p>
      </div>

      {/* Total */}
      <div className="text-sm text-muted-foreground">
        Total Gear:{" "}
        <span className="font-semibold text-foreground">{gears.length}</span>
      </div>

      {/* Gear Table */}
      {gears.length === 0 ? (
        <div className="rounded-xl border p-10 text-center text-muted-foreground">
          No gear found.
        </div>
      ) : (
        <AdminGearTable gears={gears} />
      )}
    </div>
  );
}
