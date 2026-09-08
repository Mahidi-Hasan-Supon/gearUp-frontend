
import Link from "next/link";
import { ArrowRight, Compass, ShieldCheck } from "lucide-react";

export default function FinalCTA() {
  return (
    <section className="bg-muted/30 px-6 py-20">
      <div className="mx-auto max-w-7xl">
        <div className="relative overflow-hidden rounded-3xl bg-primary px-6 py-14 text-primary-foreground sm:px-10 lg:px-16">
          {/* Decorative Elements */}
          <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
          <div className="absolute -bottom-24 -left-20 h-64 w-64 rounded-full bg-white/10 blur-3xl" />

          <div className="relative mx-auto max-w-3xl text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10">
              <Compass className="h-7 w-7" />
            </div>

            <p className="mt-6 text-sm font-semibold uppercase tracking-widest opacity-80">
              Ready For Your Next Adventure?
            </p>

            <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
              Find Your Gear.
              <br />
              Start Your Adventure.
            </h2>

            <p className="mx-auto mt-5 max-w-2xl leading-7 opacity-80">
              Explore quality sports and outdoor equipment, choose your dates,
              and get the gear you need for your next adventure.
            </p>

            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                href="/gear"
                className="group inline-flex items-center gap-2 rounded-xl bg-background px-6 py-3 text-sm font-semibold text-foreground shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg"
              >
                Explore Gear
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>

              <div className="flex items-center gap-2 text-sm opacity-80">
                <ShieldCheck className="h-4 w-4" />
                Secure & Easy Rental
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

