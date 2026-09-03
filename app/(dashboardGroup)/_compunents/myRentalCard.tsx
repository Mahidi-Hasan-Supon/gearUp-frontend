import { CalendarDays, Package, Wallet } from "lucide-react";

type Rental = {
  id: string;
  startDate: string;
  endDate: string;
  totalDays: number;
  totalPrice: number;
  status: string;

  gear: {
    title: string;
    brand: string;
    image?: string;
    category?: {
      name: string;
    };
  };
};

type MyRentalCardProps = {
  rental: Rental;
};

export default function MyRentalCard({ rental }: MyRentalCardProps) {
  return (
    <div className="overflow-hidden rounded-2xl border bg-background shadow-sm transition hover:shadow-md">
      {/* Gear Image */}
      <div className="h-48 w-full bg-muted">
        {rental.gear.image ? (
          <img
            src={rental.gear.image}
            alt={rental.gear.title}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full items-center justify-center">
            <Package className="h-12 w-12 text-muted-foreground" />
          </div>
        )}
      </div>

      <div className="p-5">
        {/* Gear Information */}
        <div className="mb-5">
          <p className="text-sm text-muted-foreground">
            {rental.gear.category?.name || "Gear"}
          </p>

          <h2 className="mt-1 text-xl font-bold">{rental.gear.title}</h2>

          <p className="text-sm text-muted-foreground">{rental.gear.brand}</p>
        </div>

        {/* Rental Information */}
        <div className="space-y-4 border-y py-4">
          <div className="flex items-center gap-3">
            <CalendarDays className="h-5 w-5 text-muted-foreground" />

            <div>
              <p className="text-xs text-muted-foreground">Rental Period</p>

              <p className="text-sm font-medium">
                {new Date(rental.startDate).toLocaleDateString()}
                {" - "}
                {new Date(rental.endDate).toLocaleDateString()}
              </p>
            </div>
          </div>

          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Total Days</span>

            <span className="font-medium">{rental.totalDays} days</span>
          </div>
        </div>

        {/* Price */}
        <div className="flex items-center justify-between py-5">
          <div className="flex items-center gap-2">
            <Wallet className="h-5 w-5 text-muted-foreground" />

            <span className="text-sm text-muted-foreground">Total Price</span>
          </div>

          <span className="text-xl font-bold">৳{rental.totalPrice}</span>
        </div>

        {/* Status */}
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">Rental Status</span>

          <span className="rounded-full bg-yellow-100 px-3 py-1 text-xs font-semibold text-yellow-700">
            {rental.status}
          </span>
        </div>

        {/* Payment - পরে Stripe connect করব */}
        <button className="mt-5 w-full rounded-xl bg-primary py-2.5 font-medium text-primary-foreground transition hover:opacity-90">
          Pay Now
        </button>
      </div>
    </div>
  );
}
