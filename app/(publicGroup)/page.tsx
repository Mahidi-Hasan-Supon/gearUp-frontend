import GearCard from "./_components/GearCard";
import { Gear } from "./_action/getGear";

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

export default async function HomePage() {
  const gears = await getGears();

  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* Hero Section */}
      <section className="bg-muted px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-2xl">
            <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-primary">
              GearUp
            </p>

            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-6xl">
              Rent Sports & Outdoor Gear Instantly
            </h1>

            <p className="mt-6 text-lg text-muted-foreground">
              Find the perfect sports and outdoor equipment for your next
              adventure.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Gear */}
      <section className="bg-background px-6 py-16">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-foreground">
              Featured Gear
            </h2>

            <p className="mt-2 text-muted-foreground">
              Explore our available sports and outdoor equipment.
            </p>
          </div>

          {gears.length === 0 ? (
            <p className="text-muted-foreground">
              No gear available right now.
            </p>
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
