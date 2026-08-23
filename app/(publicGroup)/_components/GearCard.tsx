"use client"
import Image from "next/image";
import Link from "next/link";

type Gear = {
  id: string;
  title: string;
  brand: string;
  pricePerDay: number;
  quantity: number;
  image: string;
  status: string;
  category: {
    id: string;
    name: string;
  };
};

type GearCardProps = {
  gear: Gear;
};

export default function GearCard({ gear }: GearCardProps) {
  return (
    <div className="overflow-hidden rounded-xl border bg-white shadow-sm">
      <div className="relative h-56 w-full">
        <Image
          src={gear.image}
          alt={gear.title}
          fill
          className="object-cover"
        />
      </div>

      <div className="space-y-3 p-4">
        <div>
          <h3 className="text-lg font-semibold">{gear.title}</h3>

          <p className="text-sm text-gray-500">
            {gear.brand}
          </p>
        </div>

        <div className="flex items-center justify-between">
          <span className="font-semibold">
            ৳{gear.pricePerDay}/day
          </span>

          <span className="rounded-full bg-green-100 px-3 py-1 text-xs text-green-700">
            {gear.status}
          </span>
        </div>

        <p className="text-sm text-gray-500">
          Category: {gear.category.name}
        </p>

        <Link
          href={`/gear/${gear.id}`}
          className="block rounded-lg bg-black px-4 py-2 text-center text-sm font-medium text-white"
        >
          View Details
        </Link>
      </div>
    </div>
  );
}