import Link from "next/link";
import {
  ArrowUpRight,
  Globe,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="mx-auto max-w-7xl px-6 py-14">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="mt-6 flex items-center gap-3">
            {" "}
            <Link
              href="#"
              aria-label="Website"
              className="flex h-9 w-9 items-center justify-center rounded-full border text-muted-foreground transition hover:border-primary hover:bg-primary/10 hover:text-primary"
            >
              {" "}
              <Globe className="h-4 w-4" />{" "}
            </Link>{" "}
            <Link
              href="#"
              aria-label="Email"
              className="flex h-9 w-9 items-center justify-center rounded-full border text-muted-foreground transition hover:border-primary hover:bg-primary/10 hover:text-primary"
            >
              {" "}
              <Mail className="h-4 w-4" />{" "}
            </Link>{" "}
            <Link
              href="#"
              aria-label="Contact"
              className="flex h-9 w-9 items-center justify-center rounded-full border text-muted-foreground transition hover:border-primary hover:bg-primary/10 hover:text-primary"
            >
              {" "}
              <MessageCircle className="h-4 w-4" />{" "}
            </Link>{" "}
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-foreground">Quick Links</h3>

            <div className="mt-4 flex flex-col gap-3 text-sm">
              <Link
                href="/"
                className="text-muted-foreground transition hover:text-primary"
              >
                Home
              </Link>

              <Link
                href="/gear"
                className="text-muted-foreground transition hover:text-primary"
              >
                Browse Gear
              </Link>

              <Link
                href="/about"
                className="text-muted-foreground transition hover:text-primary"
              >
                About Us
              </Link>

              <Link
                href="/contact"
                className="text-muted-foreground transition hover:text-primary"
              >
                Contact
              </Link>
            </div>
          </div>

          {/* Account */}
          <div>
            <h3 className="font-semibold text-foreground">Account</h3>

            <div className="mt-4 flex flex-col gap-3 text-sm">
              <Link
                href="/login"
                className="text-muted-foreground transition hover:text-primary"
              >
                Login
              </Link>

              <Link
                href="/register"
                className="text-muted-foreground transition hover:text-primary"
              >
                Create Account
              </Link>

              <Link
                href="/dashboard/customer"
                className="text-muted-foreground transition hover:text-primary"
              >
                Customer Dashboard
              </Link>

              <Link
                href="/provider-dashboard"
                className="text-muted-foreground transition hover:text-primary"
              >
                Provider Dashboard
              </Link>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-foreground">Contact Us</h3>

            <div className="mt-4 space-y-4 text-sm">
              <div className="flex items-start gap-3 text-muted-foreground">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" />

                <span>Dhaka, Bangladesh</span>
              </div>

              <div className="flex items-center gap-3 text-muted-foreground">
                <Mail className="h-4 w-4 shrink-0 text-primary" />

                <span>support@gearup.com</span>
              </div>

              <div className="flex items-center gap-3 text-muted-foreground">
                <Phone className="h-4 w-4 shrink-0 text-primary" />

                <span>+880 1234-567890</span>
              </div>
            </div>

            <Link
              href="/gear"
              className="group mt-6 inline-flex items-center gap-2 text-sm font-semibold text-primary"
            >
              Start Exploring
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Link>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 flex flex-col gap-3 border-t pt-6 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} gearUP. All rights reserved.</p>

          <div className="flex gap-5">
            <Link href="#" className="transition hover:text-primary">
              Privacy Policy
            </Link>

            <Link href="#" className="transition hover:text-primary">
              Terms & Conditions
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
