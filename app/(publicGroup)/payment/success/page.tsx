"use client";

import { CheckCircle2, Loader2, XCircle } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { confirmPayment } from "../../_action/confirmPayment";

export default function PaymentSuccessPage() {
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const confirm = async () => {
      const params = new URLSearchParams(window.location.search);
      const sessionId = params.get("session_id");

      if (!sessionId) {
        setMessage("Payment session not found");
        setLoading(false);
        return;
      }

      const result = await confirmPayment(sessionId);

      if (result.success) {
        setSuccess(true);
        setMessage("Your payment has been completed successfully.");
      } else {
        setSuccess(false);
        setMessage(result.message);
      }

      setLoading(false);
    };

    confirm();
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center">
        <div className="text-center">
          <Loader2 className="mx-auto h-10 w-10 animate-spin" />

          <h1 className="mt-4 text-xl font-semibold">
            Confirming your payment...
          </h1>

          <p className="mt-2 text-muted-foreground">
            Please wait a moment.
          </p>
        </div>
      </div>
    );
  }

  if (!success) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center px-4">
        <div className="w-full max-w-md rounded-2xl border p-8 text-center shadow-sm">
          <XCircle className="mx-auto h-16 w-16 text-destructive" />

          <h1 className="mt-4 text-2xl font-bold">
            Payment Confirmation Failed
          </h1>

          <p className="mt-2 text-muted-foreground">
            {message}
          </p>

          <Link
            href="/dashboard/customer/rentals"
            className="mt-6 inline-block rounded-xl bg-primary px-6 py-3 font-medium text-primary-foreground"
          >
            Go to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-[70vh] items-center justify-center px-4">
      <div className="w-full max-w-md rounded-2xl border p-8 text-center shadow-sm">
        <CheckCircle2 className="mx-auto h-16 w-16 text-green-600" />

        <h1 className="mt-4 text-2xl font-bold">
          Payment Successful!
        </h1>

        <p className="mt-2 text-muted-foreground">
          {message}
        </p>

        <Link
          href="/dashboard/customer"
          className="mt-6 inline-block rounded-xl bg-primary px-6 py-3 font-medium text-primary-foreground"
        >
          Go to My Rentals
        </Link>
      </div>
    </div>
  );
}