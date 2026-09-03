import { XCircle } from "lucide-react";
import Link from "next/link";

export default function PaymentCancelPage() {
  return (
    <div className="flex min-h-[70vh] items-center justify-center px-4">
      <div className="w-full max-w-md rounded-2xl border bg-background p-8 text-center shadow-sm">
        <XCircle className="mx-auto h-16 w-16 text-destructive" />

        <h1 className="mt-4 text-2xl font-bold">
          Payment Cancelled
        </h1>

        <p className="mt-2 text-muted-foreground">
          Your payment was cancelled. No payment was completed.
          You can try again whenever you are ready.
        </p>

        <div className="mt-6 flex flex-col gap-3">
          <Link
            href="/dashboard/customer/rentals"
            className="rounded-xl bg-primary px-6 py-3 font-medium text-primary-foreground transition hover:opacity-90"
          >
            Go to My Rentals
          </Link>

          <Link
            href="/dashboard/customer"
            className="rounded-xl border px-6 py-3 font-medium transition hover:bg-muted"
          >
            Go to Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}