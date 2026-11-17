import type { Metadata } from "next";
import { BookOpen, Headphones, Newspaper } from "lucide-react";
import { BOOK } from "@/lib/content";
import { LINKS, SITE } from "@/lib/site";
import { BookCover } from "@/components/ui/BookCover";
import { LinkButton } from "@/components/ui/Button";
import { Parallax, Reveal, SplitHeading, Stagger, StaggerItem } from "@/components/ui/Motion";

const description = BOOK.paragraphs[0];

export const metadata: Metadata = {
  title: "About the Book",
  description,
  alternates: { canonical: "/about-the-book" },
  openGraph: { url: "/about-the-book", title: `About the Book | ${SITE.fullTitle}`, description },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Book",
  name: SITE.fullTitle,
  author: { "@type": "Person", name: SITE.author },
  url: `${SITE.url}/about-the-book`,
  sameAs: [LINKS.kindle, LINKS.spotify, LINKS.pressRelease],
};

const destinations = [
  { href: LINKS.kindle, label: "Buy on Amazon Kindle", note: "Amazon Kindle Direct Publishing", Icon: BookOpen },
  { href: LINKS.spotify, label: "Listen on Spotify", note: "Audiobook", Icon: Headphones },
  { href: LINKS.pressRelease, label: "Read the Press Release", note: "OpenPR", Icon: Newspaper },
] as const;

export default function AboutBookPage() {
  const [lead, second, third, turn, fourth, human, time, notImposing, wealth, invitation] = BOOK.paragraphs;
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* Opening — cover and title */}
      <section className="relative isolate overflow-hidden pb-20 pt-36 md:pb-32 md:pt-44">
        <div aria-hidden className="absolute inset-0 -z-10 bg-[radial-gradient(60%_55%_at_75%_40%,color-mix(in_srgb,var(--color-midnight)_95%,transparent),transparent)]" />
        <div className="container-x grid items-center gap-16 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <SplitHeading as="h1" text={BOOK.heading} className="t-display glow-text" delay={0.15} />
            <Reveal delay={0.5} className="mt-8">
              <h2 className="font-display text-xl font-medium tracking-tight text-cyan sm:text-2xl md:text-3xl">{BOOK.subheading}</h2>
            </Reveal>
            <Reveal delay={0.7} className="mt-10 max-w-xl">
              <p className="t-lead">{lead}</p>
            </Reveal>
            <Reveal delay={0.85} className="mt-10 flex flex-col gap-4 sm:flex-row">
              <LinkButton href={LINKS.kindle} external>Buy on Amazon Kindle</LinkButton>
              <LinkButton href={LINKS.spotify} external variant="ghost">Listen on Spotify</LinkButton>
            </Reveal>
          </div>

          <div className="mx-auto w-full max-w-[18rem] sm:max-w-sm lg:col-span-5 lg:max-w-md">
            <BookCover priority sizes="(min-width: 1024px) 448px, 80vw" />
          </div>
        </div>
      </section>

      {/* Long-form */}
      <section className="relative pb-24 md:pb-36">
        <div className="hairline absolute inset-x-0 top-0" />
        <div className="container-x grid gap-12 pt-20 lg:grid-cols-12 lg:pt-28">
          <aside className="hidden lg:col-span-4 lg:block" aria-hidden>
            <Parallax speed={40} className="sticky top-40">
              <div className="border-l border-cyan/40 pl-6">
                <p className="t-eyebrow">The World That Could Be</p>
                <p className="mt-2 font-display text-lg italic text-offwhite/70">{SITE.subtitle}</p>
              </div>
            </Parallax>
          </aside>

          <article className="space-y-8 lg:col-span-7 lg:col-start-6">
            <Reveal><p className="t-body !text-offwhite/80 text-lg">{second}</p></Reveal>
            <Reveal><p className="t-body">{third}</p></Reveal>
            <Reveal><p className="t-h3 text-offwhite">{turn}</p></Reveal>
            <Reveal><p className="t-body">{fourth}</p></Reveal>

            <Reveal className="border-l border-cyan/60 py-2 pl-6 md:pl-8">
              <p className="t-quote">{human}</p>
            </Reveal>
            <Reveal><p className="t-lead text-offwhite">{time}</p></Reveal>

            <Reveal><p className="t-body">{notImposing}</p></Reveal>
            <Reveal><p className="t-body !text-offwhite">{wealth}</p></Reveal>
            <Reveal><p className="t-body">{invitation}</p></Reveal>

            <Reveal className="glass relative overflow-hidden rounded-2xl p-8 shadow-[0_0_80px_-30px_var(--color-cyan)] md:p-12">
              <span aria-hidden className="absolute inset-y-0 left-0 w-px bg-gradient-to-b from-transparent via-cyan to-transparent" />
              <p className="t-quote font-bold text-offwhite glow-text">{BOOK.closing}</p>
            </Reveal>
          </article>
        </div>
      </section>

      {/* Destinations */}
      <section className="section-pad relative border-t border-cyan/10 bg-gradient-to-b from-transparent to-midnight/40" aria-label="Get the book">
        <div className="container-x">
          <Stagger className="grid gap-5 md:grid-cols-3">
            {destinations.map(({ href, label, note, Icon }) => (
              <StaggerItem key={href}>
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glass group relative flex h-full flex-col justify-between gap-12 overflow-hidden rounded-2xl p-8 transition-all duration-700 ease-[var(--ease-cine)] hover:-translate-y-1 hover:border-cyan/60 hover:shadow-[0_0_60px_-18px_var(--color-cyan)]"
                >
                  <Icon className="h-7 w-7 text-cyan" aria-hidden />
                  <div>
                    <p className="text-xs uppercase tracking-[0.24em] text-offwhite/55">{note}</p>
                    <p className="mt-2 font-display text-2xl font-medium tracking-tight">{label}</p>
                  </div>
                  <span className="sr-only">(opens in a new tab)</span>
                </a>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>
    </>
  );
}
