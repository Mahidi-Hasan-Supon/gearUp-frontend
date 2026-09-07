import { getAllGears } from "../_action/getGear";
import GearCard from "../_components/GearCard";
import GearFilter from "../_components/gearFilter";


 type GearPageProps = {
  searchParams: Promise<{
    brand?: string;
    category?: string;
    minPrice?: string;
    maxPrice?: string;
    startDate?: string;
    endDate?: string;
  }>;
};


export default async function GearPage({ searchParams }: GearPageProps) {
  const params = await searchParams;

  const allGears = await getAllGears();

  const gears = await getAllGears({
    brand: params.brand,
    category: params.category,
    minPrice: params.minPrice,
    maxPrice: params.maxPrice,
  });

  // সব gear থেকে unique brand বের করা
  const brands = [...new Set(allGears.map((gear) => gear.brand))];

  // সব category থেকে unique category বের করা
  const categories = [
    ...new Set(allGears.map((gear) => gear.category?.name)),
  ].filter(Boolean) as string[];

  return (
    <main className="mx-auto max-w-7xl px-6 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Explore Gear</h1>

        <p className="text-muted-foreground">
          Find the perfect equipment for your next adventure.
        </p>
      </div>

      <GearFilter brands={brands} categories={categories} />

      {gears.length === 0 ? (
        <div className="rounded-xl border py-16 text-center">
          <h2 className="text-xl font-semibold">No gear found</h2>

          <p className="mt-2 text-muted-foreground">
            Try changing your filters.
          </p>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {gears.map((gear) => (
            <GearCard key={gear.id} gear={gear} />
          ))}
        </div>
      )}
    </main>
  );
}
