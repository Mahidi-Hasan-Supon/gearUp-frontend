import GearCard from "./_components/GearCard";

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

type GearResponse = {
  success: boolean;
  statusCode: number;
  message: string;
  data: Gear[];
};

async function getGears(): Promise<Gear[]> {
  const response = await fetch(
    `${process.env.BACKEND_API_URL}/api/gear`,
    {
      cache: "no-store",
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch gears");
  }

  const result: GearResponse = await response.json();

  return result.data;
}

export default async function HomePage() {
  const gears = await getGears();

  return (
    <main>
      {/* Hero Section */}
      <section className="bg-gray-100 px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-2xl">
            <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-gray-600">
              GearUp
            </p>

            <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
              Rent Sports & Outdoor Gear Instantly
            </h1>

            <p className="mt-6 text-lg text-gray-600">
              Find the perfect sports and outdoor equipment for your
              next adventure.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Gear */}
      <section className="px-6 py-16">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8">
            <h2 className="text-3xl font-bold">
              Featured Gear
            </h2>

            <p className="mt-2 text-gray-500">
              Explore our available sports and outdoor equipment.
            </p>
          </div>

          {gears.length === 0 ? (
            <p className="text-gray-500">
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