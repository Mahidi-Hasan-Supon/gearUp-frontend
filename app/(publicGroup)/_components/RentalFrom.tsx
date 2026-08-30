"use client";

import { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { createRental } from "../_action/createRental";

type RentFormProps = {
  gearId: string;
  pricePerDay: number;
};

export default function RentForm({
  gearId,
  pricePerDay,
}: RentFormProps) {
  const router = useRouter();

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [loading, setLoading] = useState(false);

  const calculateDays = () => {
    if (!startDate || !endDate) return 0;

    const start = new Date(startDate);
    const end = new Date(endDate);

    const difference =
      end.getTime() - start.getTime();

    return Math.ceil(
      difference / (1000 * 60 * 60 * 24),
    );
  };

  const totalDays = calculateDays();
  const totalPrice =
    totalDays > 0 ? totalDays * pricePerDay : 0;

  const handleRent = async (
    e: React.FormEvent,
  ) => {
    e.preventDefault();

    if (!startDate || !endDate) {
      toast.error(
        "Please select start and end date",
      );
      return;
    }

    if (totalDays <= 0) {
      toast.error(
        "End date must be after start date",
      );
      return;
    }

    setLoading(true);

    const result = await createRental({
      gearId,
      startDate: new Date(
        `${startDate}T00:00:00`,
      ).toISOString(),
      endDate: new Date(
        `${endDate}T00:00:00`,
      ).toISOString(),
    });

    setLoading(false);

    if (!result.success) {
      toast.error(result.message);
      return;
    }

    toast.success(
      "Rental created successfully",
    );

    router.push("/dashboard/customer");
    router.refresh();
  };

  return (
    <form
      onSubmit={handleRent}
      className="space-y-6"
    >
      {/* Start Date */}
      <div className="space-y-2">
        <label
          htmlFor="startDate"
          className="text-sm font-medium"
        >
          Start Date
        </label>

        <input
          id="startDate"
          type="date"
          value={startDate}
          min={
            new Date()
              .toISOString()
              .split("T")[0]
          }
          onChange={(e) =>
            setStartDate(e.target.value)
          }
          required
          className="w-full rounded-lg border bg-background px-3 py-2.5"
        />
      </div>

      {/* End Date */}
      <div className="space-y-2">
        <label
          htmlFor="endDate"
          className="text-sm font-medium"
        >
          End Date
        </label>

        <input
          id="endDate"
          type="date"
          min={startDate || undefined}
          value={endDate}
          onChange={(e) =>
            setEndDate(e.target.value)
          }
          required
          className="w-full rounded-lg border bg-background px-3 py-2.5"
        />
      </div>

      {/* Rental Summary */}
      {totalDays > 0 && (
        <div className="rounded-xl border bg-muted/30 p-5 space-y-3">
          <h3 className="font-semibold">
            Rental Summary
          </h3>

          <div className="flex justify-between text-sm">
            <span>Price per day</span>
            <span>৳{pricePerDay}</span>
          </div>

          <div className="flex justify-between text-sm">
            <span>Total days</span>
            <span>{totalDays} days</span>
          </div>

          <div className="border-t pt-3 flex justify-between font-bold">
            <span>Total Price</span>
            <span>৳{totalPrice}</span>
          </div>
        </div>
      )}

      {/* Confirm */}
      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-xl bg-primary px-5 py-3 font-semibold text-primary-foreground transition hover:opacity-90 disabled:opacity-50"
      >
        {loading
          ? "Creating Rental..."
          : "Confirm Rental"}
      </button>
    </form>
  );
}