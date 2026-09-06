import Link from "next/link";
import { ArrowRight, Package, Plus, Tags, Boxes } from "lucide-react";

import { getProviderGears } from "@/app/(dashboardGroup)/_action/getProviderGears";

export default async function ProviderDashboardPage() {
  const result = await getProviderGears();

  const gears = result.data ?? [];

  const totalGear = gears.length;

  const totalQuantity = gears.reduce(
    (total, gear) => total + (gear.quantity || 0),
    0,
  );

  const availableGear = gears.filter(
    (gear) => gear.status === "AVAILABLE",
  ).length;

  const categories = new Set(
    gears.map((gear) => gear.category?.name).filter(Boolean),
  ).size;

  return (
    <div className="mx-auto max-w-7xl p-6">
      {/* Header */}
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold">Provider Dashboard</h1>

          <p className="mt-2 text-muted-foreground">
            Manage your gear and track your rental business.
          </p>
        </div>

        <Link
          href="/provider-dashboard/gear/new"
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition hover:opacity-90"
        >
          <Plus className="h-4 w-4" />
          Add New Gear
        </Link>
      </div>

      {/* Stats */}
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {/* Total Gear */}
        <div className="rounded-2xl border bg-background p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Total Gear</p>

              <p className="mt-2 text-3xl font-bold">{totalGear}</p>
            </div>

            <div className="rounded-xl bg-muted p-3">
              <Package className="h-6 w-6" />
            </div>
          </div>
        </div>

        {/* Total Quantity */}
        <div className="rounded-2xl border bg-background p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Total Quantity</p>

              <p className="mt-2 text-3xl font-bold">{totalQuantity}</p>
            </div>

            <div className="rounded-xl bg-muted p-3">
              <Boxes className="h-6 w-6" />
            </div>
          </div>
        </div>

        {/* Available */}
        <div className="rounded-2xl border bg-background p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Available Gear</p>

              <p className="mt-2 text-3xl font-bold">{availableGear}</p>
            </div>

            <div className="rounded-xl bg-muted p-3">
              <Package className="h-6 w-6" />
            </div>
          </div>
        </div>

        {/* Categories */}
        <div className="rounded-2xl border bg-background p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Categories</p>

              <p className="mt-2 text-3xl font-bold">{categories}</p>
            </div>

            <div className="rounded-xl bg-muted p-3">
              <Tags className="h-6 w-6" />
            </div>
          </div>
        </div>
      </div>

      {/* Gear Overview */}
      <div className="mt-8 rounded-2xl border bg-background p-6 shadow-sm">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold">Your Gear</h2>

            <p className="mt-1 text-sm text-muted-foreground">
              Manage your listed equipment.
            </p>
          </div>

          <Link
            href="/provider-dashboard/gear"
            className="flex items-center gap-2 text-sm font-medium text-primary hover:underline"
          >
            View All
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {gears.length === 0 ? (
          <div className="rounded-xl border border-dashed p-10 text-center">
            <Package className="mx-auto h-10 w-10 text-muted-foreground" />

            <h3 className="mt-4 font-semibold">No gear added yet</h3>

            <p className="mt-1 text-sm text-muted-foreground">
              Add your first gear to start renting.
            </p>

            <Link
              href="/provider-dashboard/gear/new"
              className="mt-4 inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground"
            >
              <Plus className="h-4 w-4" />
              Add Gear
            </Link>
          </div>
        ) : (
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {gears.slice(0, 3).map((gear) => (
              <div key={gear.id} className="overflow-hidden rounded-xl border">
                <div className="h-40 bg-muted">
                  {gear.image ? (
                    <img
                      src={gear.image}
                      alt={gear.title}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center">
                      <Package className="h-10 w-10 text-muted-foreground" />
                    </div>
                  )}
                </div>

                <div className="p-4">
                  <p className="text-xs text-muted-foreground">
                    {gear.category?.name || "Uncategorized"}
                  </p>

                  <h3 className="mt-1 font-semibold">{gear.title}</h3>

                  <p className="text-sm text-muted-foreground">{gear.brand}</p>

                  <div className="mt-4 flex items-center justify-between">
                    <span className="font-bold">${gear.pricePerDay}/day</span>

                    <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
                      {gear.status}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Quick Actions */}
      <div className="mt-8 grid gap-4 md:grid-cols-2">
        <Link
          href="/provider-dashboard/gear"
          className="group rounded-2xl border bg-background p-5 shadow-sm transition hover:shadow-md"
        >
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold">Manage Your Gear</h3>

              <p className="mt-1 text-sm text-muted-foreground">
                Add, edit or delete your equipment.
              </p>
            </div>

            <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
          </div>
        </Link>

        <Link
          href="/provider-dashboard/orders"
          className="group rounded-2xl border bg-background p-5 shadow-sm transition hover:shadow-md"
        >
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold">Manage Orders</h3>

              <p className="mt-1 text-sm text-muted-foreground">
                Confirm orders and manage rental status.
              </p>
            </div>

            <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
          </div>
        </Link>
      </div>
    </div>
  );
}
