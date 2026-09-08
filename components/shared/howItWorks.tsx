import Link from "next/link";
import { ArrowRight, CalendarDays, Search, ShieldCheck } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: Search,
    title: "Browse Your Gear",
    description:
      "Explore sports and outdoor equipment and find the gear that matches your adventure.",
  },
  {
    number: "02",
    icon: CalendarDays,
    title: "Choose Your Dates",
    description:
      "Select your rental dates and check availability before placing your rental.",
  },
  {
    number: "03",
    icon: ShieldCheck,
    title: "Rent & Enjoy",
    description:
      "Confirm your rental, make your payment, and get ready for your next adventure.",
  },
];

export default function HowItWorks() {
  return (
    <section className="bg-muted/30 px-6 py-20">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-primary">
            Simple & Easy
          </p>

          <h2 className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            How GearUp Works
          </h2>

          <p className="mt-3 text-muted-foreground">
            Getting the right gear for your adventure is simple. Just follow
            three easy steps.
          </p>
        </div>

        {/* Steps */}
        <div className="grid gap-6 md:grid-cols-3">
          {steps.map((step) => {
            const Icon = step.icon;

            return (
              <div
                key={step.number}
                className="group relative rounded-2xl border bg-background p-7 transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg"
              >
                {/* Number */}
                <span className="absolute right-6 top-5 text-4xl font-bold text-muted/60">
                  {step.number}
                </span>

                {/* Icon */}
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary transition-transform duration-300 group-hover:scale-105">
                  <Icon className="h-7 w-7" />
                </div>

                {/* Content */}
                <h3 className="mt-6 text-xl font-semibold text-foreground">
                  {step.title}
                </h3>

                <p className="mt-3 text-sm leading-6 text-muted-foreground">
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* CTA */}
        <div className="mt-10 text-center">
          <Link
            href="/gear"
            className="group inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition hover:opacity-90"
          >
            Start Exploring
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
}
