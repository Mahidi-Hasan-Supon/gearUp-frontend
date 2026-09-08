import Link from "next/link";
import { ArrowRight, ShieldCheck, Star, TentTree } from "lucide-react";
import BecomeProviderButton from "../shared2/becomAProviderButton";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden border-b bg-background">
      {/* Background */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-primary/10 via-background to-background" />

      <div className="mx-auto grid min-h-[600px] max-w-7xl items-center gap-12 px-6 py-20 lg:grid-cols-2">
        {/* Left Content */}
        <div>
          {/* Badge */}
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border bg-background px-4 py-2 text-sm font-medium shadow-sm">
            <TentTree className="h-4 w-4 text-primary" />
            Your Adventure Starts Here
          </div>

          {/* Heading */}
          <h1 className="text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
            Rent The Right Gear For Every{" "}
            <span className="text-primary">Adventure.</span>
          </h1>

          {/* Description */}
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
            Discover quality sports and outdoor equipment for camping, cycling,
            hiking, football, and your next unforgettable adventure.
          </p>

          {/* Buttons */}
          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/gear"
              className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 font-semibold text-primary-foreground transition hover:opacity-90"
            >
              Explore Gear
              <ArrowRight className="h-5 w-5" />
            </Link>


            <BecomeProviderButton></BecomeProviderButton>
          </div>

          {/* Stats */}
          <div className="mt-12 flex flex-wrap gap-8">
            <div>
              <p className="text-2xl font-bold">500+</p>

              <p className="text-sm text-muted-foreground">Available Gear</p>
            </div>

            <div>
              <p className="text-2xl font-bold">100+</p>

              <p className="text-sm text-muted-foreground">Trusted Providers</p>
            </div>

            <div>
              <p className="text-2xl font-bold">4.9/5</p>

              <p className="flex items-center gap-1 text-sm text-muted-foreground">
                <Star className="h-4 w-4 fill-primary text-primary" />
                Customer Rating
              </p>
            </div>
          </div>
        </div>

        {/* Right Side */}
        <div className="relative hidden lg:block">
          <div className="relative mx-auto flex aspect-square max-w-lg items-center justify-center rounded-[3rem] border bg-muted/50 shadow-2xl">
            <TentTree className="h-40 w-40 text-primary" />

            {/* Verified Card */}
            <div className="absolute -left-8 top-16 rounded-2xl border bg-background p-4 shadow-lg">
              <div className="flex items-center gap-3">
                <div className="rounded-xl bg-primary/10 p-3">
                  <ShieldCheck className="h-6 w-6 text-primary" />
                </div>

                <div>
                  <p className="font-semibold">Verified Gear</p>

                  <p className="text-xs text-muted-foreground">
                    Quality you can trust
                  </p>
                </div>
              </div>
            </div>

            {/* Bottom Card */}
            <div className="absolute -bottom-6 right-4 rounded-2xl border bg-background p-4 shadow-lg">
              <p className="text-sm text-muted-foreground">Easy Rental</p>

              <p className="text-lg font-bold">Book in Minutes ⚡</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
