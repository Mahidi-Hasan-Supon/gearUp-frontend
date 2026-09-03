import MyRentalCard from "@/app/(dashboardGroup)/_compunents/myRentalCard";
import { getMyRentals } from "@/app/(publicGroup)/_action/getMyRentals";

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

export default async function MyRentalsPage() {
  const result = await getMyRentals();

  const rentals: Rental[] = result.data ?? [];

  return (
    <div className="mx-auto max-w-7xl p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">My Rentals</h1>

        <p className="mt-2 text-muted-foreground">
          Manage and track all your rental orders.
        </p>
      </div>

      {rentals.length === 0 ? (
        <div className="rounded-xl border p-10 text-center">
          <h2 className="text-xl font-semibold">
            No rentals found
          </h2>

          <p className="mt-2 text-muted-foreground">
            You haven rented any gear yet.
          </p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {rentals.map((rental) => (
            <MyRentalCard
              key={rental.id}
              rental={rental}
            />
          ))}
        </div>
      )}
    </div>
  );
}