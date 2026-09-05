import Link from "next/link";
import { Plus } from "lucide-react";
import { getProviderGears } from "../../_action/getProviderGears";
import ProviderGearCard from "../../_compunents/providerGearCard";


export default async function ProviderGearPage() {
  const result = await getProviderGears();

  const gears = result.data;

  return (
    <div className="p-6">

      {/* Header */}
      <div className="mb-8 flex items-center justify-between">

        <div>
          <h1 className="text-3xl font-bold">
            My Gears
          </h1>

          <p className="mt-1 text-muted-foreground">
            Manage your rental equipment from here.
          </p>
        </div>

        {/* Add Gear Button */}
        <Link
          href="/provider-dashboard/gear/new"
          className="flex items-center gap-2 rounded-xl bg-primary px-4 py-2.5 font-medium text-primary-foreground transition hover:opacity-90"
        >
          <Plus className="h-5 w-5" />

          Add Gear
        </Link>

      </div>

      {/* Error */}
      {!result.success && (
        <div className="rounded-xl border border-destructive/30 bg-destructive/10 p-4 text-destructive">
          {result.message}
        </div>
      )}

      {/* Empty State */}
      {result.success && gears.length === 0 && (
        <div className="rounded-2xl border p-10 text-center">

          <h2 className="text-xl font-semibold">
            No gear found
          </h2>

          <p className="mt-2 text-muted-foreground">
            Start by adding your first gear.
          </p>

        </div>
      )}

      {/* Gear List */}
      {result.success && gears.length > 0 && (
        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">

          {gears.map((gear) => (
            <ProviderGearCard
              key={gear.id}
              gear={gear}
            />
          ))}

        </div>
      )}

    </div>
  );
}