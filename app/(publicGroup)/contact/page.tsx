
import Footer from "@/components/shared/footer";
import {
  Mail,
  MapPin,
  Phone,
  Clock,
  Send,
} from "lucide-react";

const contactInfo = [
  {
    icon: Mail,
    title: "Email Us",
    value: "support@gearup.com",
    description: "We usually reply within 24 hours.",
  },
  {
    icon: Phone,
    title: "Call Us",
    value: "+880 1234-567890",
    description: "Available during business hours.",
  },
  {
    icon: MapPin,
    title: "Our Location",
    value: "Dhaka, Bangladesh",
    description: "Serving customers across Bangladesh.",
  },
  {
    icon: Clock,
    title: "Business Hours",
    value: "9:00 AM - 6:00 PM",
    description: "Saturday - Thursday",
  },
];

export default function ContactPage() {
  return (
    <main>
      {/* Hero */}
      <section className="border-b bg-muted/30">
        <div className="mx-auto max-w-7xl px-6 py-20 text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-primary">
            Contact Us
          </p>

          <h1 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">
            We&apos;d Love to Hear From You
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-muted-foreground">
            Have a question about GearUp, a rental, or becoming a
            provider? Get in touch with our team.
          </p>
        </div>
      </section>

      {/* Contact Content */}
      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="grid gap-12 lg:grid-cols-2">
          {/* Contact Information */}
          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-primary">
              Get In Touch
            </p>

            <h2 className="mt-3 text-3xl font-bold">
              How can we help?
            </h2>

            <p className="mt-4 max-w-xl leading-7 text-muted-foreground">
              Our team is here to help you with questions about
              equipment rentals, payments, accounts, providers, and
              anything else related to GearUp.
            </p>

            <div className="mt-8 grid gap-5 sm:grid-cols-2">
              {contactInfo.map((item) => {
                const Icon = item.icon;

                return (
                  <div
                    key={item.title}
                    className="rounded-2xl border bg-background p-5 shadow-sm"
                  >
                    <div className="inline-flex rounded-xl bg-primary/10 p-3">
                      <Icon className="h-5 w-5 text-primary" />
                    </div>

                    <h3 className="mt-4 font-semibold">
                      {item.title}
                    </h3>

                    <p className="mt-1 font-medium">
                      {item.value}
                    </p>

                    <p className="mt-1 text-sm text-muted-foreground">
                      {item.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Contact Form */}
          <div className="rounded-3xl border bg-background p-6 shadow-sm sm:p-8">
            <div className="mb-6">
              <h2 className="text-2xl font-bold">
                Send Us a Message
              </h2>

              <p className="mt-2 text-sm text-muted-foreground">
                Fill out the form and we&apos;ll get back to you as
                soon as possible.
              </p>
            </div>

            <form className="space-y-5">
              {/* Name */}
              <div>
                <label
                  htmlFor="name"
                  className="mb-2 block text-sm font-medium"
                >
                  Your Name
                </label>

                <input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Enter your name"
                  className="w-full rounded-xl border bg-background px-4 py-3 text-sm outline-none transition focus:ring-2 focus:ring-primary"
                />
              </div>

              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-medium"
                >
                  Email Address
                </label>

                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                  className="w-full rounded-xl border bg-background px-4 py-3 text-sm outline-none transition focus:ring-2 focus:ring-primary"
                />
              </div>

              {/* Subject */}
              <div>
                <label
                  htmlFor="subject"
                  className="mb-2 block text-sm font-medium"
                >
                  Subject
                </label>

                <input
                  id="subject"
                  name="subject"
                  type="text"
                  placeholder="What is this about?"
                  className="w-full rounded-xl border bg-background px-4 py-3 text-sm outline-none transition focus:ring-2 focus:ring-primary"
                />
              </div>

              {/* Message */}
              <div>
                <label
                  htmlFor="message"
                  className="mb-2 block text-sm font-medium"
                >
                  Message
                </label>

                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  placeholder="Write your message..."
                  className="w-full resize-none rounded-xl border bg-background px-4 py-3 text-sm outline-none transition focus:ring-2 focus:ring-primary"
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition hover:opacity-90"
              >
                <Send className="h-4 w-4" />
                Send Message
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* FAQ / Help CTA */}
      <section className="border-t bg-muted/30">
        <div className="mx-auto max-w-4xl px-6 py-16 text-center">
          <h2 className="text-3xl font-bold">
            Need Help With a Rental?
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            If you have questions about your rental order, payment,
            or equipment, our support team is ready to help.
          </p>
        </div>
      </section>
      <Footer></Footer>
    </main>
  );
}

