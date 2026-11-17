import type { Metadata } from "next";
import { Mail, Phone } from "lucide-react";
import { SITE } from "@/lib/site";
import { ContactForm } from "@/components/contact/ContactForm";
import { Reveal, SplitHeading, Stagger, StaggerItem } from "@/components/ui/Motion";

const description = "Get in touch with Krzysztof Łukiewski, author of The World That Could Be: Future We Dare to Simulate.";

export const metadata: Metadata = {
  title: "Contact Us",
  description,
  alternates: { canonical: "/contact" },
  openGraph: { url: "/contact", title: `Contact Us | ${SITE.title}`, description },
};

export default function ContactPage() {
  return (
    <section className="relative isolate overflow-hidden pb-24 pt-36 md:pb-36 md:pt-48">
      {/* Transmission rings */}
      <div aria-hidden className="pointer-events-none absolute left-1/2 top-[18rem] -z-10 h-[46rem] w-[46rem] -translate-x-1/2 md:top-[20rem]">
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className="ring-out absolute inset-0 rounded-full border border-cyan/30"
            style={{ animationDelay: `${i * 2.3}s` }}
          />
        ))}
        <span className="absolute inset-[28%] rounded-full bg-cyan/10 blur-3xl" />
      </div>

      <div className="container-x">
        <div className="mx-auto max-w-4xl text-center">
          <SplitHeading as="h1" text="Contact Us" className="t-display glow-text" delay={0.1} />
          <Reveal delay={0.4} className="mx-auto mt-8 max-w-xl">
            <p className="t-lead">Have a question, a thought, or an idea about the book? Send a message and it will reach Krzysztof directly.</p>
          </Reveal>
        </div>

        <Stagger delay={0.5} gap={0.15} className="mx-auto mt-14 grid max-w-4xl gap-4 sm:grid-cols-2">
          <StaggerItem>
            <a
              href={`mailto:${SITE.email}`}
              className="group flex items-center gap-5 rounded-2xl border border-cyan/20 bg-navy/50 p-6 backdrop-blur transition-all duration-700 ease-[var(--ease-cine)] hover:-translate-y-1 hover:border-cyan hover:shadow-[0_0_50px_-15px_var(--color-cyan)]"
            >
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full border border-cyan/40 text-cyan transition-colors group-hover:bg-cyan group-hover:text-navy">
                <Mail className="h-5 w-5" aria-hidden />
              </span>
              <span className="min-w-0">
                <span className="block text-xs uppercase tracking-[0.24em] text-offwhite/55">Email</span>
                <span className="mt-1 block break-words font-display text-lg font-medium">{SITE.email}</span>
              </span>
            </a>
          </StaggerItem>
          <StaggerItem>
            <a
              href={`tel:${SITE.phoneHref}`}
              className="group flex items-center gap-5 rounded-2xl border border-cyan/20 bg-navy/50 p-6 backdrop-blur transition-all duration-700 ease-[var(--ease-cine)] hover:-translate-y-1 hover:border-cyan hover:shadow-[0_0_50px_-15px_var(--color-cyan)]"
            >
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full border border-cyan/40 text-cyan transition-colors group-hover:bg-cyan group-hover:text-navy">
                <Phone className="h-5 w-5" aria-hidden />
              </span>
              <span>
                <span className="block text-xs uppercase tracking-[0.24em] text-offwhite/55">Phone</span>
                <span className="mt-1 block font-display text-lg font-medium">{SITE.phone}</span>
              </span>
            </a>
          </StaggerItem>
        </Stagger>

        <Reveal delay={0.2} className="mx-auto mt-10 max-w-3xl">
          <ContactForm />
        </Reveal>
      </div>
    </section>
  );
}
