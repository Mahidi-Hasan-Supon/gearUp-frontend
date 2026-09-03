import ProceedPaymentButton from "@/app/(dashboardGroup)/_compunents/ProceedPaymentButton";
import { getRentalById } from "@/app/(publicGroup)/_action/getRentalById";
import { redirect } from "next/navigation";

type PayPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function PayPage({ params }: PayPageProps) {
  const { id } = await params;

  const result = await getRentalById(id);

  if (!result.success || !result.data) {
    redirect("/dashboard/customer/rentals");
  }

  const rental = result.data;

  return (
    <div className="mx-auto max-w-3xl p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Payment Details</h1>

        <p className="mt-2 text-muted-foreground">
          Review your rental details before payment.
        </p>
      </div>

      <div className="overflow-hidden rounded-2xl border bg-background shadow-sm">
        {/* Gear Information */}
        <div className="border-b p-6">
          <p className="text-sm text-muted-foreground">Gear</p>

          <h2 className="mt-1 text-2xl font-bold">{rental.gear.title}</h2>

          <p className="text-muted-foreground">{rental.gear.brand}</p>
        </div>

        {/* Payment Details */}
        <div className="space-y-5 p-6">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Start Date</span>

            <span className="font-medium">
              {new Date(rental.startDate).toLocaleDateString()}
            </span>
          </div>

          <div className="flex justify-between">
            <span className="text-muted-foreground">End Date</span>

            <span className="font-medium">
              {new Date(rental.endDate).toLocaleDateString()}
            </span>
          </div>

          <div className="flex justify-between">
            <span className="text-muted-foreground">Total Days</span>

            <span className="font-medium">{rental.totalDays} days</span>
          </div>

          <div className="border-t pt-5">
            <div className="flex items-center justify-between">
              <span className="text-lg font-semibold">Total Amount</span>

              <span className="text-2xl font-bold">${rental.totalPrice}</span>
            </div>
          </div>
        </div>

        {/* Payment Button */}
        <div className="border-t p-6">
          <ProceedPaymentButton rentalId={rental.id} />
        </div>
      </div>
    </div>
  );
}
