import Link from "next/link";
import {
  ArrowRight,
  Bike,
  Dumbbell,
  Fish,
  Footprints,
  TentTree,
  Waves,
} from "lucide-react";

type Category = {
  id: string;
  name: string;
};

type PopularCategoriesProps = {
  categories: Category[];
};

const categoryIcons = [TentTree, Dumbbell, Fish, Footprints, Bike, Waves];

export default function PopularCategories({
  categories,
}: PopularCategoriesProps) {
  return (
    <section className="bg-background px-6 py-20">
      <div className="mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="mb-10 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-primary">
              Explore Categories
            </p>

            <h2 className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Find Gear For Every Adventure
            </h2>

            <p className="mt-3 max-w-2xl text-muted-foreground">
              Explore our popular gear categories and find the right equipment
              for your next adventure.
            </p>
          </div>

          {/* View All Categories */}
          <Link
            href="/gear"
            className="group inline-flex shrink-0 items-center gap-2 text-sm font-semibold text-primary transition hover:opacity-80"
          >
            View All Categories
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Categories */}
        {categories.length === 0 ? (
          <div className="rounded-2xl border border-dashed bg-muted/30 px-6 py-12 text-center">
            <p className="text-muted-foreground">
              No categories available right now.
            </p>
          </div>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {categories.slice(0, 6).map((category, index) => {
              const Icon = categoryIcons[index % categoryIcons.length];

              return (
                <Link
                  key={category.id}
                  href={`/gear?category=${encodeURIComponent(category.name)}`}
                  className="group rounded-2xl border bg-background p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                      <Icon className="h-6 w-6" />
                    </div>

                    <ArrowRight className="h-5 w-5 text-muted-foreground transition-transform duration-300 group-hover:translate-x-1 group-hover:text-primary" />
                  </div>

                  <h3 className="mt-5 text-lg font-semibold text-foreground">
                    {category.name}
                  </h3>

                  <p className="mt-1 text-sm text-muted-foreground">
                    Explore {category.name.toLowerCase()} gear
                  </p>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
