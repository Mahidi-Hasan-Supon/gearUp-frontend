"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import type { ProviderOrder } from "@/app/(dashboardGroup)/_action/getProviderOrders";
import { updateProviderOrderStatus } from "../_action/updateProviderOrdersStatus";

type ProviderOrdersTableProps = {
  orders: ProviderOrder[];
};

const statusStyles: Record<string, string> = {
  PLACED:
    "bg-yellow-100 text-yellow-700 dark:bg-yellow-500/20 dark:text-yellow-400",

  CONFIRMED: "bg-blue-100 text-blue-700 dark:bg-blue-500/20 dark:text-blue-400",

  PAID: "bg-purple-100 text-purple-700 dark:bg-purple-500/20 dark:text-purple-400",

  PICKED_UP:
    "bg-green-100 text-green-700 dark:bg-green-500/20 dark:text-green-400",

  RETURNED: "bg-gray-100 text-gray-700 dark:bg-gray-500/20 dark:text-gray-300",

  CANCELLED: "bg-red-100 text-red-700 dark:bg-red-500/20 dark:text-red-400",
};

export default function ProviderOrdersTable({
  orders,
}: ProviderOrdersTableProps) {
  const router = useRouter();

  const [loadingId, setLoadingId] = useState<string | null>(null);

  const handleStatusUpdate = async (orderId: string, status: string) => {
    setLoadingId(orderId);

    const result = await updateProviderOrderStatus(orderId, status);

    setLoadingId(null);

    if (!result.success) {
      toast.error(result.message);
      return;
    }

    toast.success(result.message);
    router.refresh();
  };

  return (
    <div className="overflow-hidden rounded-2xl border bg-background shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[1000px]">
          <thead className="border-b bg-muted/50">
            <tr>
              <th className="px-5 py-4 text-left text-sm font-semibold">
                Gear
              </th>

              <th className="px-5 py-4 text-left text-sm font-semibold">
                Customer
              </th>

              <th className="px-5 py-4 text-left text-sm font-semibold">
                Rental Period
              </th>

              <th className="px-5 py-4 text-left text-sm font-semibold">
                Total Price
              </th>

              <th className="px-5 py-4 text-left text-sm font-semibold">
                Status
              </th>

              <th className="px-5 py-4 text-right text-sm font-semibold">
                Action
              </th>
            </tr>
          </thead>

          <tbody>
            {orders.map((order) => {
              const isLoading = loadingId === order.id;

              return (
                <tr
                  key={order.id}
                  className="border-b transition hover:bg-muted/50 last:border-0"
                >
                  {/* Gear */}
                  <td className="px-5 py-4">
                    <p className="font-semibold">{order.gear.title}</p>

                    <p className="text-sm text-muted-foreground">
                      {order.gear.brand}
                    </p>
                  </td>

                  {/* Customer */}
                  <td className="px-5 py-4">
                    <p className="font-medium">{order.customer.name}</p>

                    <p className="text-sm text-muted-foreground">
                      {order.customer.email}
                    </p>
                  </td>

                  {/* Rental Period */}
                  <td className="px-5 py-4 text-sm">
                    <p>{new Date(order.startDate).toLocaleDateString()}</p>

                    <p className="text-muted-foreground">
                      to {new Date(order.endDate).toLocaleDateString()}
                    </p>

                    <p className="mt-1 text-xs text-muted-foreground">
                      {order.totalDays} days
                    </p>
                  </td>

                  {/* Price */}
                  <td className="px-5 py-4 font-semibold">
                    ${order.totalPrice}
                  </td>

                  {/* Status */}
                  <td className="px-5 py-4">
                    <span
                      className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                        statusStyles[order.status] ||
                        "bg-muted text-muted-foreground"
                      }`}
                    >
                      {order.status}
                    </span>
                  </td>

                  {/* Actions */}
                  <td className="px-5 py-4 text-right">
                    {/* PLACED */}
                    {order.status === "PLACED" && (
                      <div className="flex justify-end gap-2">
                        <button
                          disabled={isLoading}
                          onClick={() =>
                            handleStatusUpdate(order.id, "CONFIRMED")
                          }
                          className="rounded-lg bg-primary px-3 py-2 text-sm font-medium text-primary-foreground disabled:opacity-50"
                        >
                          {isLoading ? "Updating..." : "Confirm"}
                        </button>

                        <button
                          disabled={isLoading}
                          onClick={() =>
                            handleStatusUpdate(order.id, "CANCELLED")
                          }
                          className="rounded-lg bg-destructive px-3 py-2 text-sm font-medium text-destructive-foreground disabled:opacity-50"
                        >
                          Cancel
                        </button>
                      </div>
                    )}

                    {/* CONFIRMED */}
                    {order.status === "CONFIRMED" && (
                      <span className="text-sm text-muted-foreground">
                        Waiting for payment
                      </span>
                    )}

                    {/* PAID */}
                    {order.status === "PAID" && (
                      <button
                        disabled={isLoading}
                        onClick={() =>
                          handleStatusUpdate(order.id, "PICKED_UP")
                        }
                        className="rounded-lg bg-primary px-3 py-2 text-sm font-medium text-primary-foreground disabled:opacity-50"
                      >
                        {isLoading ? "Updating..." : "Mark Picked Up"}
                      </button>
                    )}

                    {/* PICKED_UP */}
                    {order.status === "PICKED_UP" && (
                      <button
                        disabled={isLoading}
                        onClick={() => handleStatusUpdate(order.id, "RETURNED")}
                        className="rounded-lg bg-primary px-3 py-2 text-sm font-medium text-primary-foreground disabled:opacity-50"
                      >
                        {isLoading ? "Updating..." : "Mark Returned"}
                      </button>
                    )}

                    {/* RETURNED */}
                    {order.status === "RETURNED" && (
                      <span className="text-sm font-medium text-green-600">
                        Completed ✓
                      </span>
                    )}

                    {/* CANCELLED */}
                    {order.status === "CANCELLED" && (
                      <span className="text-sm font-medium text-destructive">
                        Cancelled
                      </span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
