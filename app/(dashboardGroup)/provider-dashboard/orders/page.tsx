import { getProviderOrders } from "@/app/(dashboardGroup)/_action/getProviderOrders";
import ProviderOrderCard from "../../_compunents/providerOrderCard";

export default async function ProviderOrdersPage() {
  const result = await getProviderOrders();

  if (!result.success) {
    return (
      <div className="p-6 text-destructive">
        {result.message}
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">
          Incoming Orders
        </h1>

        <p className="mt-2 text-muted-foreground">
          Manage your gear rental orders.
        </p>
      </div>

      {result.data.length === 0 ? (
        <div className="rounded-xl border p-8 text-center text-muted-foreground">
          No orders found.
        </div>
      ) : (
        <div className="space-y-4">
          {result.data.map((order) => (
            <ProviderOrderCard
              key={order.id}
              order={order}
            />
          ))}
        </div>
      )}
    </div>
  );
}