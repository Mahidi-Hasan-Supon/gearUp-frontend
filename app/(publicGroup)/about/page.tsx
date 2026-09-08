
import Footer from "@/components/shared/footer";
import {
  ShieldCheck,
  Package,
  Users,
  Target,
  CheckCircle,
} from "lucide-react";

const features = [
  {
    icon: Package,
    title: "Quality Gear",
    description:
      "Find reliable sports and outdoor equipment from trusted providers.",
  },
  {
    icon: ShieldCheck,
    title: "Safe & Secure",
    description:
      "We focus on secure rentals and a smooth experience for every user.",
  },
  {
    icon: Users,
    title: "Trusted Providers",
    description:
      "Connect with providers who make quality equipment easily accessible.",
  },
];

const values = [
  "Easy equipment discovery",
  "Flexible rental options",
  "Transparent pricing",
  "Reliable providers",
  "Simple and secure booking",
  "Convenient rental management",
];

export default function AboutPage() {
  return (
    <main>
      {/* Hero */}
      <section className="border-b bg-muted/30">
        <div className="mx-auto max-w-7xl px-6 py-20 text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-primary">
            About GearUp
          </p>

          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            Gear Up for Your Next Adventure
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-muted-foreground">
            GearUp makes it easy to discover, rent, and manage
            sports and outdoor equipment from trusted providers.
          </p>
        </div>
      </section>

      {/* About */}
      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="grid gap-12 md:grid-cols-2 md:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-primary">
              Who We Are
            </p>

            <h2 className="mt-3 text-3xl font-bold">
              Making outdoor equipment more accessible
            </h2>

            <p className="mt-5 leading-7 text-muted-foreground">
              GearUp is a sports and outdoor equipment rental
              platform designed to connect customers with providers
              offering quality gear for their adventures.
            </p>

            <p className="mt-4 leading-7 text-muted-foreground">
              Whether you are planning a weekend adventure,
              exploring a new sport, or simply need equipment for
              a short period, GearUp helps you find the right gear
              without the need to purchase everything yourself.
            </p>
          </div>

          <div className="rounded-3xl border bg-background p-8 shadow-sm">
            <div className="flex items-center gap-4">
              <div className="rounded-2xl bg-primary/10 p-4">
                <Target className="h-8 w-8 text-primary" />
              </div>

              <div>
                <h3 className="text-xl font-bold">
                  Our Mission
                </h3>

                <p className="mt-1 text-sm text-muted-foreground">
                  Making adventure easier for everyone.
                </p>
              </div>
            </div>

            <p className="mt-6 leading-7 text-muted-foreground">
              Our mission is to create a simple and trustworthy
              rental marketplace where customers can access the
              equipment they need while providers can grow their
              rental business.
            </p>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="bg-muted/30">
        <div className="mx-auto max-w-7xl px-6 py-20">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-semibold uppercase tracking-wider text-primary">
              Why GearUp
            </p>

            <h2 className="mt-3 text-3xl font-bold">
              Everything you need for a better rental experience
            </h2>

            <p className="mt-4 text-muted-foreground">
              GearUp brings customers and providers together through
              a simple and convenient rental platform.
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {features.map((feature) => {
              const Icon = feature.icon;

              return (
                <div
                  key={feature.title}
                  className="rounded-2xl border bg-background p-7 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
                >
                  <div className="inline-flex rounded-xl bg-primary/10 p-3">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>

                  <h3 className="mt-5 text-xl font-bold">
                    {feature.title}
                  </h3>

                  <p className="mt-3 leading-7 text-muted-foreground">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="grid gap-12 md:grid-cols-2 md:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-primary">
              What We Value
            </p>

            <h2 className="mt-3 text-3xl font-bold">
              Built around your experience
            </h2>

            <p className="mt-4 leading-7 text-muted-foreground">
              From discovering gear to completing a rental, we aim
              to keep every step simple, transparent, and convenient.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {values.map((value) => (
              <div
                key={value}
                className="flex items-center gap-3 rounded-xl border bg-background p-4"
              >
                <CheckCircle className="h-5 w-5 shrink-0 text-primary" />

                <span className="text-sm font-medium">
                  {value}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t bg-primary text-primary-foreground">
        <div className="mx-auto max-w-4xl px-6 py-16 text-center">
          <h2 className="text-3xl font-bold">
            Ready to Gear Up?
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-primary-foreground/80">
            Discover the equipment you need and start your next
            adventure with GearUp.
          </p>
        </div>
      </section>
      <Footer></Footer>
    </main>
  );
}

