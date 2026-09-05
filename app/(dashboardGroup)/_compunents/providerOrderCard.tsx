"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import type { ProviderOrder } from "@/app/(dashboardGroup)/_action/getProviderOrders";
import { updateProviderOrderStatus } from "../_action/updateProviderOrdersStatus";

type ProviderOrderCardProps = {
  order: ProviderOrder;
};

export default function ProviderOrderCard({ order }: ProviderOrderCardProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleStatusUpdate = async (status: string) => {
    setLoading(true);

    const result = await updateProviderOrderStatus(order.id, status);

    setLoading(false);

    if (!result.success) {
      toast.error(result.message);
      return;
    }

    toast.success(result.message);
    router.refresh();
  };

  return (
    <div className="rounded-xl border p-5">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold">{order.gear.title}</h2>

          <p className="text-sm text-muted-foreground">{order.gear.brand}</p>
        </div>

        <span className="rounded-full bg-yellow-100 px-3 py-1 text-sm font-medium text-yellow-700">
          {order.status}
        </span>
      </div>

      {/* Customer + Rental Info */}
      <div className="mt-5 grid gap-4 md:grid-cols-2">
        <div>
          <p className="text-sm text-muted-foreground">Customer</p>

          <p className="font-medium">{order.customer.name}</p>

          <p className="text-sm text-muted-foreground">
            {order.customer.email}
          </p>
        </div>

        <div>
          <p className="text-sm text-muted-foreground">Rental Period</p>

          <p className="font-medium">
            {new Date(order.startDate).toLocaleDateString()}
            {" - "}
            {new Date(order.endDate).toLocaleDateString()}
          </p>

          <p className="mt-1 text-sm text-muted-foreground">
            {order.totalDays} days
          </p>
        </div>
      </div>

      {/* Price */}
      <div className="mt-5 flex justify-between border-t pt-4">
        <span className="text-muted-foreground">Total Price</span>

        <span className="font-bold">${order.totalPrice}</span>
      </div>

      {/* Actions */}
      <div className="mt-5">
        {/* PLACED */}
        {order.status === "PLACED" && (
          <div className="flex gap-3">
            <button
              disabled={loading}
              onClick={() => handleStatusUpdate("CONFIRMED")}
              className="flex-1 rounded-lg bg-primary py-2 font-medium text-primary-foreground disabled:opacity-50"
            >
              Confirm Order
            </button>

            <button
              disabled={loading}
              onClick={() => handleStatusUpdate("CANCELLED")}
              className="flex-1 rounded-lg bg-destructive py-2 font-medium text-destructive-foreground disabled:opacity-50"
            >
              Cancel Order
            </button>
          </div>
        )}

        {/* CONFIRMED */}
        {order.status === "CONFIRMED" && (
          <p className="rounded-lg bg-muted p-3 text-center text-sm text-muted-foreground">
            Waiting for customer payment...
          </p>
        )}

        {/* PAID */}
        {order.status === "PAID" && (
          <button
            disabled={loading}
            onClick={() => handleStatusUpdate("PICKED_UP")}
            className="w-full rounded-lg bg-primary py-2 font-medium text-primary-foreground disabled:opacity-50"
          >
            {loading ? "Updating..." : "Mark as Picked Up"}
          </button>
        )}

        {/* PICKED_UP */}
        {order.status === "PICKED_UP" && (
          <button
            disabled={loading}
            onClick={() => handleStatusUpdate("RETURNED")}
            className="w-full rounded-lg bg-primary py-2 font-medium text-primary-foreground disabled:opacity-50"
          >
            {loading ? "Updating..." : "Mark as Returned"}
          </button>
        )}

        {/* RETURNED */}
        {order.status === "RETURNED" && (
          <p className="rounded-lg bg-muted p-3 text-center text-sm font-medium">
            Rental Completed ✓
          </p>
        )}

        {/* CANCELLED */}
        {order.status === "CANCELLED" && (
          <p className="rounded-lg bg-destructive/10 p-3 text-center text-sm font-medium text-destructive">
            Order Cancelled
          </p>
        )}
      </div>
    </div>
  );
}
