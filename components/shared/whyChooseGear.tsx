
import {
  BadgeCheck,
  CreditCard,
  Headphones,
  ShieldCheck,
  Sparkles,
  Zap,
} from "lucide-react";

const features = [
  {
    icon: BadgeCheck,
    title: "Quality Gear",
    description:
      "Find reliable sports and outdoor equipment ready for your next adventure.",
  },
  {
    icon: ShieldCheck,
    title: "Safe & Secure",
    description:
      "Your account and rental experience are protected with secure authentication.",
  },
  {
    icon: CreditCard,
    title: "Secure Payments",
    description:
      "Make your rental payments securely through our trusted payment system.",
  },
  {
    icon: Zap,
    title: "Easy Booking",
    description:
      "Choose your gear, select your dates, and place your rental in just a few steps.",
  },
  {
    icon: Headphones,
    title: "Trusted Providers",
    description:
      "Connect with providers offering sports and outdoor equipment for different needs.",
  },
  {
    icon: Sparkles,
    title: "Adventure Ready",
    description:
      "Spend less time worrying about equipment and more time enjoying your adventure.",
  },
];

export default function WhyChooseGearUp() {
  return (
    <section className="bg-background px-6 py-20">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-primary">
            Why GearUp
          </p>

          <h2 className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Everything You Need For A Better Rental Experience
          </h2>

          <p className="mt-3 text-muted-foreground">
            We make renting sports and outdoor equipment simple, secure, and
            convenient.
          </p>
        </div>

        {/* Features */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <div
                key={feature.title}
                className="group rounded-2xl border bg-background p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-transform duration-300 group-hover:scale-105">
                  <Icon className="h-6 w-6" />
                </div>

                <h3 className="mt-5 text-lg font-semibold text-foreground">
                  {feature.title}
                </h3>

                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

