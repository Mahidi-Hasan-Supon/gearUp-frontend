
import Link from "next/link";
import { ArrowRight, Mail, UserRound } from "lucide-react";

type Provider = {
  id: string;
  name: string;
  email: string;
};

type TopProvidersProps = {
  providers: Provider[];
};

export default function TopProviders({
  providers,
}: TopProvidersProps) {
  return (
    <section className="bg-muted/30 px-6 py-20">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-10 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-primary">
              Our Providers
            </p>

            <h2 className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Meet Our Trusted Providers
            </h2>

            <p className="mt-3 max-w-2xl text-muted-foreground">
              Discover gear from providers who help make your next adventure
              possible.
            </p>
          </div>

          <Link
            href="/gear"
            className="group inline-flex shrink-0 items-center gap-2 text-sm font-semibold text-primary transition hover:opacity-80"
          >
            Explore Gear
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Providers */}
        {providers.length === 0 ? (
          <div className="rounded-2xl border border-dashed bg-background px-6 py-12 text-center">
            <p className="text-muted-foreground">
              No providers available right now.
            </p>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {providers.slice(0, 6).map((provider) => (
              <div
                key={provider.id}
                className="group rounded-2xl border bg-background p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg"
              >
                {/* Avatar */}
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <UserRound className="h-7 w-7" />
                </div>

                {/* Provider Info */}
                <h3 className="mt-5 text-lg font-semibold text-foreground">
                  {provider.name}
                </h3>

                <div className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
                  <Mail className="h-4 w-4" />
                  <span className="truncate">{provider.email}</span>
                </div>

                {/* Role */}
                <div className="mt-5 inline-flex rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                  Verified Provider
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

