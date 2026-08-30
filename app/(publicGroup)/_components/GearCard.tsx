import Link from "next/link";
import { Gear } from "../_action/getGear";

type GearCardProps = {
  gear: Gear;
};

export default function GearCard({ gear }: GearCardProps) {
  return (
    <div className="overflow-hidden rounded-xl border bg-background shadow-sm">
      <img
        src={gear.image || "/placeholder.jpg"}
        alt={gear.title}
        className="h-52 w-full object-cover"
      />

      <div className="space-y-3 p-4">
        <div>
          <h2 className="text-lg font-semibold">
            {gear.title}
          </h2>

          <p className="text-sm text-muted-foreground">
            {gear.brand}
          </p>
        </div>

        <p className="text-sm">
          Category: {gear.category.name}
        </p>

        <p className="font-semibold">
          ৳{gear.pricePerDay} / day
        </p>

        <p className="text-sm">
          Available: {gear.quantity}
        </p>

        <Link
          href={`/gear/${gear.id}`}
          className="block rounded-md bg-primary px-4 py-2 text-center text-primary-foreground"
        >
          View Details
        </Link>
      </div>
    </div>
  );
}