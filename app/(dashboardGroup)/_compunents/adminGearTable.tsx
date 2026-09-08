import Image from "next/image";
import { Package } from "lucide-react";

import type { AdminGear } from "@/app/(dashboardGroup)/_action/getAdminGears";

type AdminGearTableProps = {
  gears: AdminGear[];
};

export default function AdminGearTable({ gears }: AdminGearTableProps) {
  return (
    <div className="overflow-hidden rounded-xl border bg-background">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="border-b bg-muted/50">
            <tr>
              <th className="px-5 py-4 text-left text-sm font-semibold">
                Gear
              </th>

              <th className="px-5 py-4 text-left text-sm font-semibold">
                Provider
              </th>

              <th className="px-5 py-4 text-left text-sm font-semibold">
                Price / Day
              </th>

              <th className="px-5 py-4 text-center text-sm font-semibold">
                Quantity
              </th>

              <th className="px-5 py-4 text-center text-sm font-semibold">
                Status
              </th>
            </tr>
          </thead>

          <tbody>
            {gears.map((gear) => (
              <tr
                key={gear.id}
                className="border-b transition hover:bg-muted/40"
              >
                {/* Gear */}
                <td className="px-5 py-4">
                  <div className="flex items-center gap-3">
                    <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-lg bg-muted">
                      {gear.image ? (
                        <Image
                          src={gear.image}
                          alt={gear.title}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <div className="flex h-full items-center justify-center">
                          <Package className="h-5 w-5 text-muted-foreground" />
                        </div>
                      )}
                    </div>

                    <div>
                      <p className="font-semibold">{gear.title}</p>

                      <p className="text-sm text-muted-foreground">
                        {gear.brand}
                      </p>
                    </div>
                  </div>
                </td>

                {/* Provider */}
                <td className="px-5 py-4">
                  <p className="font-medium">{gear.provider.name}</p>

                  <p className="text-sm text-muted-foreground">
                    {gear.provider.email}
                  </p>
                </td>

                {/* Price */}
                <td className="px-5 py-4">
                  <span className="font-semibold">${gear.pricePerDay}</span>
                </td>

                {/* Quantity */}
                <td className="px-5 py-4 text-center">
                  <span className="font-medium">{gear.quantity}</span>
                </td>

                {/* Status */}
                <td className="px-5 py-4 text-center">
                  <span
                    className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                      gear.status === "AVAILABLE"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {gear.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
