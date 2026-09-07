
import Link from "next/link";
import Image from "next/image";
import { Package, Tag, DollarSign } from "lucide-react";
import { Gear } from "../_action/getGear";

type GearCardProps = {
  gear: Gear;
};

export default function GearCard({ gear }: GearCardProps) {
  return (
    <div className="group overflow-hidden rounded-2xl border bg-background shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
      {/* Gear Image */}
      <div className="relative h-52 w-full overflow-hidden bg-muted">
        {gear.image ? (
          <Image
            src={gear.image}
            alt={gear.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center">
            <Package className="h-12 w-12 text-muted-foreground" />
          </div>
        )}

        {/* Status Badge */}
        <div className="absolute right-3 top-3">
          <span
            className={`rounded-full px-3 py-1 text-xs font-semibold ${
              gear.status === "AVAILABLE"
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {gear.status}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="space-y-4 p-5">
        {/* Title */}
        <div>
          <h2 className="line-clamp-1 text-lg font-bold">
            {gear.title}
          </h2>

          <p className="mt-1 text-sm text-muted-foreground">
            {gear.brand}
          </p>
        </div>

        {/* Category */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Tag className="h-4 w-4" />

          <span>{gear.category?.name || "Uncategorized"}</span>
        </div>

        {/* Price and Quantity */}
        <div className="flex items-center justify-between border-y py-3">
          <div>
            <p className="text-xs text-muted-foreground">
              Price / Day
            </p>

            <div className="flex items-center">
              <DollarSign className="h-4 w-4" />

              <span className="text-lg font-bold">
                {gear.pricePerDay}
              </span>
            </div>
          </div>

          <div className="text-right">
            <p className="text-xs text-muted-foreground">
              Available
            </p>

            <p className="font-semibold">
              {gear.quantity}
            </p>
          </div>
        </div>

        {/* Button */}
        <Link
          href={`/gear/${gear.id}`}
          className="block rounded-xl bg-primary px-4 py-2.5 text-center text-sm font-semibold text-primary-foreground transition hover:opacity-90"
        >
          View Details
        </Link>
      </div>
    </div>
  );
}

