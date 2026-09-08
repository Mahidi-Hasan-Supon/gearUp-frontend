import { Gear } from "@/app/(publicGroup)/_action/getGear";
import GearCard from "@/app/(publicGroup)/_components/GearCard";
import { ArrowRight, Package } from "lucide-react";
import Link from "next/link";

type GearResponse = {
  success: boolean;
  statusCode: number;
  message: string;
  data: Gear[];
};

async function getGears(): Promise<Gear[]> {
  const response = await fetch(`${process.env.BACKEND_API_URL}/api/gear`, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch gears");
  }

  const result: GearResponse = await response.json();

  return result.data;
}

export default async function FeaturedGear() {
  const gears = await getGears();

  return (
    <main className="min-h-screen bg-background text-foreground">

      {/* Featured Gear */}
      <section className="bg-muted/30 px-6 py-20">
        <div className="mx-auto max-w-7xl">
          {/* Section Header */}
          <div className="mb-10 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-widest text-primary">
                Explore Our Collection
              </p>

              <h2 className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                Featured Gear
              </h2>

              <p className="mt-3 max-w-2xl text-muted-foreground">
                Discover quality sports and outdoor equipment ready for your
                next adventure.
              </p>
            </div>

            {/* View All */}
            <Link
              href="/gear"
              className="group inline-flex items-center gap-2 text-sm font-semibold text-primary transition hover:opacity-80"
            >
              View All Gear
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          {/* Gear */}
          {gears.length === 0 ? (
            <div className="rounded-2xl border border-dashed bg-background px-6 py-16 text-center">
              <Package className="mx-auto h-12 w-12 text-muted-foreground" />

              <h3 className="mt-4 text-lg font-semibold text-foreground">
                No Gear Available
              </h3>

              <p className="mt-2 text-sm text-muted-foreground">
                We dont have any gear available for rental right now.
              </p>
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {gears.slice(0, 6).map((gear) => (
                <GearCard key={gear.id} gear={gear} />
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
