import { Package, User, Mail, DollarSign, Boxes } from "lucide-react";

import type { AdminGear } from "@/app/(dashboardGroup)/_action/getAdminGears";

type AdminGearCardProps = {
  gear: AdminGear;
};

export default function AdminGearCard({
  gear,
}: AdminGearCardProps) {
  return (
    <div className="overflow-hidden rounded-xl border bg-background shadow-sm">
      {/* Image */}
      <div className="h-48 w-full bg-muted">
        {gear.image ? (
          <img
            src={gear.image}
            alt={gear.title}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full items-center justify-center">
            <Package className="h-12 w-12 text-muted-foreground" />
          </div>
        )}
      </div>

      <div className="p-5">
        {/* Gear Header */}
        <div className="flex items-start justify-between gap-3">
          <div>
            <h2 className="text-lg font-bold">
              {gear.title}
            </h2>

            <p className="text-sm text-muted-foreground">
              {gear.brand}
            </p>
          </div>

          <span
            className={`rounded-full px-3 py-1 text-xs font-semibold ${
              gear.status === "AVAILABLE"
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {gear.status}
          </span>
        </div>

        {/* Price & Quantity */}
        <div className="mt-5 grid grid-cols-2 gap-4 border-y py-4">
          <div className="flex items-center gap-2">
            <DollarSign className="h-4 w-4 text-muted-foreground" />

            <div>
              <p className="text-xs text-muted-foreground">
                Price / Day
              </p>

              <p className="font-semibold">
                ${gear.pricePerDay}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Boxes className="h-4 w-4 text-muted-foreground" />

            <div>
              <p className="text-xs text-muted-foreground">
                Quantity
              </p>

              <p className="font-semibold">
                {gear.quantity}
              </p>
            </div>
          </div>
        </div>

        {/* Provider */}
        <div className="mt-5">
          <p className="mb-3 text-sm font-semibold">
            Provider Information
          </p>

          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <User className="h-4 w-4 text-muted-foreground" />

              <span className="text-sm">
                {gear.provider.name}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-muted-foreground" />

              <span className="text-sm">
                {gear.provider.email}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}