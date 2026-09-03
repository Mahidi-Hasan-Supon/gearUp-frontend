"use client";

import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useState } from "react";
import { createPayment } from "@/app/(publicGroup)/_action/createPayment";

type PayNowButtonProps = {
  rentalId: string;
};

export default function PayNowButton({
  rentalId,
}: PayNowButtonProps) {
  const [loading, setLoading] = useState(false);

  const handlePayment = async () => {
    try {
      setLoading(true);

      const result = await createPayment(rentalId);

      if (!result.success) {
        toast.error(result.message);
        return;
      }

      const paymentUrl = result.data?.paymentUrl;

      if (!paymentUrl) {
        toast.error("Payment URL not found");
        return;
      }

      window.location.href = paymentUrl;
    } catch (error) {
      toast.error("Payment failed");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      onClick={handlePayment}
      disabled={loading}
      className="mt-5 w-full"
    >
      {loading ? "Processing..." : "Pay Now"}
    </Button>
  );
}