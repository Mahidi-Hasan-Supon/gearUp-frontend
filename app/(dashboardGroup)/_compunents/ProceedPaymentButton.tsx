"use client";

import { createPayment } from "@/app/(publicGroup)/_action/createPayment";
import { useState } from "react";
import { toast } from "sonner";

type ProceedPaymentButtonProps = {
  rentalId: string;
};

export default function ProceedPaymentButton({
  rentalId,
}: ProceedPaymentButtonProps) {
  const [loading, setLoading] = useState(false);

  const handlePayment = async () => {
    setLoading(true);

    try {
      const result = await createPayment(rentalId);

      if (!result.success) {
        toast.error(result.message);
        return;
      }

      const paymentUrl = result.data?.paymentUrl;

      if (!paymentUrl) {
        toast.error("Stripe payment URL not found");
        return;
      }

      toast.success("Redirecting to payment...");

      window.location.href = paymentUrl;
    } catch (error) {
      console.error(error);
      toast.error("Payment failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handlePayment}
      disabled={loading}
      className="w-full rounded-xl bg-primary py-3 font-semibold text-primary-foreground transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
    >
      {loading ? "Processing..." : "Proceed to Payment"}
    </button>
  );
}
