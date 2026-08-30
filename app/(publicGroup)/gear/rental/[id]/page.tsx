import Image from "next/image";
import { getGearById } from "../../../_action/getGearById";
import RentForm from "@/app/(publicGroup)/_components/RentalFrom";

type RentPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function RentPage({ params }: RentPageProps) {
  const { id } = await params;

  const gear = await getGearById(id);

  return (
    <main className="mx-auto max-w-6xl px-6 py-10">
      <div className="mb-8">
        <p className="text-sm text-muted-foreground">GearUp Rental</p>

        <h1 className="mt-1 text-3xl font-bold">Rent Gear</h1>
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        {/* Gear Information */}
        <div className="rounded-2xl border p-6">
          <img
            src={gear.image || "/placeholder.jpg"}
            alt={gear.title}
            width={700}
            height={500}
            className="h-[350px] w-full rounded-xl object-cover"
          />

          <div className="mt-6 space-y-3">
            <div>
              <p className="text-sm text-muted-foreground">
                {gear.category.name}
              </p>

              <h2 className="text-2xl font-bold">{gear.title}</h2>

              <p className="text-muted-foreground">{gear.brand}</p>
            </div>

            <p className="text-sm text-muted-foreground">{gear.description}</p>

            <div className="flex justify-between border-t pt-4">
              <span>Price per day</span>

              <span className="font-bold">৳{gear.pricePerDay}</span>
            </div>

            <div className="flex justify-between">
              <span>Available quantity</span>

              <span className="font-semibold">{gear.quantity}</span>
            </div>
          </div>
        </div>

        {/* Rental Form */}
        <div className="rounded-2xl border p-6">
          <h2 className="mb-6 text-2xl font-bold">Select Rental Period</h2>

          <RentForm gearId={gear.id} pricePerDay={gear.pricePerDay} />
        </div>
      </div>
    </main>
  );
}
