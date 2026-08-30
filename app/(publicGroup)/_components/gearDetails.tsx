import Link from "next/link";
import { Gear } from "../_action/getGear";

type GearDetailsProps = {
  gear: Gear;
};

export default function GearDetails({ gear }: GearDetailsProps) {
  return (
    <div className="grid gap-8 md:grid-cols-2">
      {/* Image */}
      <div>
        <img
          src={gear.image || "/placeholder.jpg"}
          alt={gear.title}
          className="h-[400px] w-full rounded-xl object-cover"
        />
      </div>

      {/* Details */}
      <div className="space-y-5">
        <div>
          <h1 className="text-3xl font-bold">{gear.title}</h1>

          <p className="text-muted-foreground">{gear.brand}</p>
        </div>

        <p>{gear.description}</p>

        <div className="space-y-2">
          <p>
            <strong>Category:</strong> {gear.category.name}
          </p>

          <p>
            <strong>Price:</strong> ৳{gear.pricePerDay} / day
          </p>

          <p>
            <strong>Available Quantity:</strong> {gear.quantity}
          </p>

          <p>
            <strong>Status:</strong> {gear.status}
          </p>

          <p>
            <strong>Provider:</strong> {gear.provider.name}
          </p>
        </div>
        {gear.status === "AVAILABLE" ? (
          <Link
              href={`/gear/rental/${gear.id}`}
            className="mt-8 block w-full rounded-xl bg-primary px-5 py-3 text-center font-semibold text-          primary-foreground transition hover:opacity-90"
          >
            Rent Now
          </Link>
        ) : (
          <button
            disabled
            className="mt-8 w-full rounded-xl border px-5 py-3 font-semibold opacity-50"
          >
            Not Available
          </button>
        )}
      </div>
    </div>
  );
}
