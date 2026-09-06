import {
  CalendarDays,
  Package,
  User,
  Mail,
  Store,
  DollarSign,
} from "lucide-react";

import type { AdminRental } from "@/app/(dashboardGroup)/_action/getAdminRentals";

type AdminRentalCardProps = {
  rental: AdminRental;
};

export default function AdminRentalCard({
  rental,
}: AdminRentalCardProps) {
  return (
    <div className="rounded-xl border bg-background p-5 shadow-sm">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Package className="h-5 w-5 text-muted-foreground" />

            <h2 className="text-lg font-bold">
              {rental.gear.title}
            </h2>
          </div>

          <p className="mt-1 text-sm text-muted-foreground">
            {rental.gear.brand}
          </p>
        </div>

        <span
          className={`rounded-full px-3 py-1 text-xs font-semibold ${
            rental.status === "RETURNED"
              ? "bg-green-100 text-green-700"
              : rental.status === "CANCELLED"
                ? "bg-red-100 text-red-700"
                : "bg-yellow-100 text-yellow-700"
          }`}
        >
          {rental.status}
        </span>
      </div>

      {/* Customer */}
      <div className="mt-5 border-t pt-4">
        <p className="mb-3 flex items-center gap-2 text-sm font-semibold">
          <User className="h-4 w-4" />
          Customer
        </p>

        <p className="font-medium">
          {rental.customer.name}
        </p>

        <div className="mt-1 flex items-center gap-2 text-sm text-muted-foreground">
          <Mail className="h-4 w-4" />
          {rental.customer.email}
        </div>
      </div>

      {/* Provider */}
      <div className="mt-5 border-t pt-4">
        <p className="mb-3 flex items-center gap-2 text-sm font-semibold">
          <Store className="h-4 w-4" />
          Provider
        </p>

        <p className="font-medium">
          {rental.gear.provider.name}
        </p>

        <div className="mt-1 flex items-center gap-2 text-sm text-muted-foreground">
          <Mail className="h-4 w-4" />
          {rental.gear.provider.email}
        </div>
      </div>

      {/* Rental Details */}
      <div className="mt-5 grid gap-4 border-y py-4 sm:grid-cols-2">
        <div>
          <div className="flex items-center gap-2">
            <CalendarDays className="h-4 w-4 text-muted-foreground" />

            <p className="text-xs text-muted-foreground">
              Rental Period
            </p>
          </div>

          <p className="mt-2 text-sm font-medium">
            {new Date(rental.startDate).toLocaleDateString()}
          </p>

          <p className="text-sm text-muted-foreground">
            to {new Date(rental.endDate).toLocaleDateString()}
          </p>
        </div>

        <div>
          <p className="text-xs text-muted-foreground">
            Total Days
          </p>

          <p className="mt-2 text-lg font-bold">
            {rental.totalDays} days
          </p>
        </div>
      </div>

      {/* Price */}
      <div className="mt-5 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <DollarSign className="h-5 w-5 text-muted-foreground" />

          <span className="text-sm text-muted-foreground">
            Total Price
          </span>
        </div>

        <span className="text-xl font-bold">
          ${rental.totalPrice}
        </span>
      </div>
    </div>
  );
}