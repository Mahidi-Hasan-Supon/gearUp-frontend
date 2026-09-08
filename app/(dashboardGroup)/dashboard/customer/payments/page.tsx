
import { getMyPayments } from "@/app/(dashboardGroup)/_action/getMyPayments";
import {
  CheckCircle,
  Clock,
  CreditCard,
  XCircle,
} from "lucide-react";

export default async function PaymentsPage() {
  const result = await getMyPayments();

  const payments = result.data ?? [];

  return (
    <div className="mx-auto max-w-7xl p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold">
          Payment History
        </h1>

        <p className="mt-2 text-muted-foreground">
          View your payment history and transaction details.
        </p>
      </div>

      {/* Empty State */}
      {payments.length === 0 ? (
        <div className="rounded-2xl border bg-background p-12 text-center shadow-sm">
          <CreditCard className="mx-auto h-12 w-12 text-muted-foreground" />

          <h2 className="mt-4 text-xl font-semibold">
            No payments found
          </h2>

          <p className="mt-2 text-sm text-muted-foreground">
            Your payment history will appear here.
          </p>
        </div>
      ) : (
        <div className="overflow-hidden rounded-2xl border bg-background shadow-sm">
          {/* Responsive Table */}
          <div className="overflow-x-auto">
            <table className="w-full min-w-[850px]">
              <thead className="border-b bg-muted/50">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold">
                    Payment ID
                  </th>

                  <th className="px-6 py-4 text-left text-sm font-semibold">
                    Rental ID
                  </th>

                  <th className="px-6 py-4 text-left text-sm font-semibold">
                    Date
                  </th>

                  <th className="px-6 py-4 text-left text-sm font-semibold">
                    Amount
                  </th>

                  <th className="px-6 py-4 text-left text-sm font-semibold">
                    Method
                  </th>

                  <th className="px-6 py-4 text-left text-sm font-semibold">
                    Status
                  </th>
                </tr>
              </thead>

              <tbody>
                {payments.map((payment) => {
                  const isPaid = payment.status === "PAID";
                  const isPending =
                    payment.status === "PENDING";

                  return (
                    <tr
                      key={payment.id}
                      className="border-b transition hover:bg-muted/50 last:border-0"
                    >
                      {/* Payment ID */}
                      <td className="px-6 py-4">
                        <div className="font-medium">
                          #{payment.id.slice(0, 8)}
                        </div>

                        {payment.transactionId && (
                          <div className="mt-1 text-xs text-muted-foreground">
                            TX: {payment.transactionId.slice(0, 12)}...
                          </div>
                        )}
                      </td>

                      {/* Rental ID */}
                      <td className="px-6 py-4 text-sm text-muted-foreground">
                        #{payment.rentalId.slice(0, 8)}
                      </td>

                      {/* Date */}
                      <td className="px-6 py-4 text-sm">
                        {new Date(
                          payment.createdAt,
                        ).toLocaleDateString()}
                      </td>

                      {/* Amount */}
                      <td className="px-6 py-4">
                        <span className="font-semibold">
                          ${payment.amount}
                        </span>

                        <span className="ml-1 text-xs text-muted-foreground uppercase">
                          {payment.currency}
                        </span>
                      </td>

                      {/* Payment Method */}
                      <td className="px-6 py-4 text-sm">
                        {payment.paymentMethod || "N/A"}
                      </td>

                      {/* Status */}
                      <td className="px-6 py-4">
                        {isPaid ? (
                          <div className="inline-flex items-center gap-2 rounded-full bg-green-100 px-3 py-1.5 text-sm font-medium text-green-700 dark:bg-green-500/20 dark:text-green-400">
                            <CheckCircle className="h-4 w-4" />
                            Paid
                          </div>
                        ) : isPending ? (
                          <div className="inline-flex items-center gap-2 rounded-full bg-yellow-100 px-3 py-1.5 text-sm font-medium text-yellow-700 dark:bg-yellow-500/20 dark:text-yellow-400">
                            <Clock className="h-4 w-4" />
                            Pending
                          </div>
                        ) : (
                          <div className="inline-flex items-center gap-2 rounded-full bg-red-100 px-3 py-1.5 text-sm font-medium text-red-700 dark:bg-red-500/20 dark:text-red-400">
                            <XCircle className="h-4 w-4" />
                            {payment.status}
                          </div>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

