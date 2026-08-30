import { getAllGears } from "../_action/getGear";
import GearCard from "../_components/GearCard";

export default async function GearPage() {
  const gears = await getAllGears();

  return (
    <main className="mx-auto max-w-7xl px-6 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">
          Explore Gear
        </h1>

        <p className="text-muted-foreground">
          Find the perfect equipment for your next adventure.
        </p>
      </div>

      {gears.length === 0 ? (
        <p>No gear available.</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {gears.map((gear) => (
            <GearCard
              key={gear.id}
              gear={gear}
            />
          ))}
        </div>
      )}
    </main>
  );
}