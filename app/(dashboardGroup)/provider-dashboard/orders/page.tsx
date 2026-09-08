import { getProviderOrders } from "@/app/(dashboardGroup)/_action/getProviderOrders";
import ProviderOrdersTable from "../../_compunents/providerOrdersTable";

export default async function ProviderOrdersPage() {
  const result = await getProviderOrders();

  if (!result.success) {
    return <div className="p-6 text-destructive">{result.message}</div>;
  }

  return (
    <div className="mx-auto max-w-7xl p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Incoming Orders</h1>

        <p className="mt-2 text-muted-foreground">
          Manage and update your incoming gear rental orders.
        </p>
      </div>

      {result.data.length === 0 ? (
        <div className="rounded-xl border p-8 text-center text-muted-foreground">
          No orders found.
        </div>
      ) : (
        <ProviderOrdersTable orders={result.data} />
      )}
    </div>
  );
}
