import type { AdminRental } from "@/app/(dashboardGroup)/_action/getAdminRentals";

type AdminRentalTableProps = {
  rentals: AdminRental[];
};

const getStatusStyle = (status: string) => {
  switch (status) {
    case "PLACED":
      return "bg-yellow-100 text-yellow-700";

    case "CONFIRMED":
      return "bg-blue-100 text-blue-700";

    case "PAID":
      return "bg-purple-100 text-purple-700";

    case "PICKED_UP":
      return "bg-green-100 text-green-700";

    case "RETURNED":
      return "bg-gray-100 text-gray-700";

    case "CANCELLED":
      return "bg-red-100 text-red-700";

    default:
      return "bg-muted text-muted-foreground";
  }
};

export default function AdminRentalTable({ rentals }: AdminRentalTableProps) {
  return (
    <div className="overflow-hidden rounded-xl border bg-background">
      <div className="overflow-x-auto">
        <table className="w-full">
          {/* Table Header */}
          <thead className="border-b bg-muted/50">
            <tr>
              <th className="px-5 py-4 text-left text-sm font-semibold">
                Gear
              </th>

              <th className="px-5 py-4 text-left text-sm font-semibold">
                Customer
              </th>

              <th className="px-5 py-4 text-left text-sm font-semibold">
                Provider
              </th>

              <th className="px-5 py-4 text-left text-sm font-semibold">
                Rental Period
              </th>

              <th className="px-5 py-4 text-center text-sm font-semibold">
                Days
              </th>

              <th className="px-5 py-4 text-right text-sm font-semibold">
                Total
              </th>

              <th className="px-5 py-4 text-center text-sm font-semibold">
                Status
              </th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody>
            {rentals.map((rental) => (
              <tr
                key={rental.id}
                className="border-b transition hover:bg-muted/40"
              >
                {/* Gear */}
                <td className="px-5 py-4">
                  <div>
                    <p className="font-semibold">{rental.gear.title}</p>

                    <p className="text-sm text-muted-foreground">
                      {rental.gear.brand}
                    </p>
                  </div>
                </td>

                {/* Customer */}
                <td className="px-5 py-4">
                  <p className="font-medium">{rental.customer.name}</p>

                  <p className="text-sm text-muted-foreground">
                    {rental.customer.email}
                  </p>
                </td>

                {/* Provider */}
                <td className="px-5 py-4">
                  <p className="font-medium">{rental.gear.provider.name}</p>

                  <p className="text-sm text-muted-foreground">
                    {rental.gear.provider.email}
                  </p>
                </td>

                {/* Rental Period */}
                <td className="px-5 py-4">
                  <p className="text-sm font-medium">
                    {new Date(rental.startDate).toLocaleDateString()}
                  </p>

                  <p className="text-sm text-muted-foreground">
                    to {new Date(rental.endDate).toLocaleDateString()}
                  </p>
                </td>

                {/* Days */}
                <td className="px-5 py-4 text-center">
                  <span className="font-medium">{rental.totalDays}</span>
                </td>

                {/* Total Price */}
                <td className="px-5 py-4 text-right">
                  <span className="font-semibold">${rental.totalPrice}</span>
                </td>

                {/* Status */}
                <td className="px-5 py-4 text-center">
                  <span
                    className={`inline-flex whitespace-nowrap rounded-full px-3 py-1 text-xs font-semibold ${getStatusStyle(
                      rental.status,
                    )}`}
                  >
                    {rental.status}
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
