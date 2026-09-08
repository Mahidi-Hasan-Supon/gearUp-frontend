import { BadgeCheck, Boxes, FolderOpen, Users } from "lucide-react";

type StatisticsProps = {
  gearCount: number;
  categoryCount: number;
  providerCount: number;
};

export default function Statistics({
  gearCount,
  categoryCount,
  providerCount,
}: StatisticsProps) {
  const statistics = [
    {
      icon: Boxes,
      value: gearCount,
      label: "Available Gear",
    },
    {
      icon: FolderOpen,
      value: categoryCount,
      label: "Gear Categories",
    },
    {
      icon: Users,
      value: providerCount,
      label: "Trusted Providers",
    },
    {
      icon: BadgeCheck,
      value: "100%",
      label: "Secure Experience",
    },
  ];

  return (
    <section className="bg-muted/30 px-6 py-16">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {statistics.map((stat) => {
            const Icon = stat.icon;

            return (
              <div
                key={stat.label}
                className="group rounded-2xl border bg-background p-6 text-center transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg"
              >
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-transform duration-300 group-hover:scale-105">
                  <Icon className="h-6 w-6" />
                </div>

                <p className="mt-5 text-3xl font-bold tracking-tight text-foreground">
                  {stat.value}
                  {typeof stat.value === "number" && "+"}
                </p>

                <p className="mt-1 text-sm text-muted-foreground">
                  {stat.label}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
