import { getMyPayments } from "@/app/(dashboardGroup)/_action/getMyPayments";
import { CheckCircle, Clock, CreditCard, XCircle } from "lucide-react";

export default async function PaymentsPage() {
  const result = await getMyPayments();

  const payments = result.data ?? [];

  return (
    <div className="mx-auto max-w-6xl p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold">My Payments</h1>

        <p className="mt-2 text-muted-foreground">
          View your payment history and transaction details.
        </p>
      </div>

      {/* Empty State */}
      {payments.length === 0 ? (
        <div className="rounded-2xl border bg-background p-12 text-center shadow-sm">
          <CreditCard className="mx-auto h-12 w-12 text-muted-foreground" />

          <h2 className="mt-4 text-xl font-semibold">No payments found</h2>

          <p className="mt-2 text-sm text-muted-foreground">
            Your payment history will appear here.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {payments.map((payment) => {
            const isPaid = payment.status === "PAID";
            const isPending = payment.status === "PENDING";

            return (
              <div
                key={payment.id}
                className="rounded-2xl border bg-background p-5 shadow-sm transition hover:shadow-md"
              >
                <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
                  {/* Payment Info */}
                  <div className="flex items-start gap-4">
                    <div className="rounded-xl bg-muted p-3">
                      <CreditCard className="h-6 w-6" />
                    </div>

                    <div>
                      <h2 className="font-semibold">
                        Payment #{payment.id.slice(0, 8)}
                      </h2>

                      <p className="mt-1 text-sm text-muted-foreground">
                        Rental ID: {payment.rentalId.slice(0, 8)}
                      </p>

                      <p className="mt-1 text-xs text-muted-foreground">
                        {new Date(payment.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>

                  {/* Amount + Status */}
                  <div className="flex items-center justify-between gap-8 md:justify-end">
                    <div className="text-right">
                      <p className="text-xs text-muted-foreground">Amount</p>

                      <p className="text-xl font-bold">${payment.amount}</p>
                    </div>

                    {isPaid ? (
                      <div className="flex items-center gap-2 rounded-full bg-green-100 px-3 py-1.5 text-sm font-medium text-green-700">
                        <CheckCircle className="h-4 w-4" />
                        Paid
                      </div>
                    ) : isPending ? (
                      <div className="flex items-center gap-2 rounded-full bg-yellow-100 px-3 py-1.5 text-sm font-medium text-yellow-700">
                        <Clock className="h-4 w-4" />
                        Pending
                      </div>
                    ) : (
                      <div className="flex items-center gap-2 rounded-full bg-red-100 px-3 py-1.5 text-sm font-medium text-red-700">
                        <XCircle className="h-4 w-4" />
                        {payment.status}
                      </div>
                    )}
                  </div>
                </div>

                {/* Bottom Info */}
                <div className="mt-5 flex flex-wrap gap-x-8 gap-y-2 border-t pt-4 text-sm">
                  <div>
                    <span className="text-muted-foreground">Method: </span>

                    <span className="font-medium">
                      {payment.paymentMethod || "N/A"}
                    </span>
                  </div>

                  <div>
                    <span className="text-muted-foreground">Currency: </span>

                    <span className="font-medium uppercase">
                      {payment.currency}
                    </span>
                  </div>

                  {payment.transactionId && (
                    <div>
                      <span className="text-muted-foreground">
                        Transaction:{" "}
                      </span>

                      <span className="font-medium">
                        {payment.transactionId.slice(0, 16)}...
                      </span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
