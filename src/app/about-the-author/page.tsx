import type { Metadata } from "next";
import Image from "next/image";
import { AUTHOR } from "@/lib/content";
import { SITE } from "@/lib/site";
import { LinkButton } from "@/components/ui/Button";
import { Parallax, Reveal, SplitHeading } from "@/components/ui/Motion";
import { ContourMotif } from "@/components/ui/Motifs";

const description = AUTHOR.paragraphs[0];

export const metadata: Metadata = {
  title: "About the Author",
  description,
  alternates: { canonical: "/about-the-author" },
  openGraph: { url: "/about-the-author", title: `About the Author | ${SITE.title}`, description },
};

export default function AboutAuthorPage() {
  const [intro, ...rest] = AUTHOR.paragraphs;
  const closing = rest[rest.length - 1];
  const middle = rest.slice(0, -1);
  return (
    <>
      <section className="relative isolate overflow-hidden pb-16 pt-36 md:pb-24 md:pt-48">
        <div aria-hidden className="absolute inset-0 -z-10 bg-[radial-gradient(65%_60%_at_20%_30%,color-mix(in_srgb,var(--color-midnight)_95%,transparent),transparent)]" />
        <Parallax speed={50} className="pointer-events-none absolute -right-[25%] top-10 -z-10 w-[110%] opacity-50 md:-right-[10%] md:w-[60%]">
          <ContourMotif className="w-full" />
        </Parallax>

        <div className="container-x">
          <Reveal y={0}>
            <Image
              src="/images/author-logo.webp"
              alt="Author Krzysztof Łukiewski logo: an open book beneath a glowing Earth and a bright star"
              width={900}
              height={378}
              priority
              sizes="(min-width: 768px) 360px, 70vw"
              className="mb-12 h-auto w-64 md:w-[22rem]"
            />
          </Reveal>
          <p className="t-eyebrow mb-6">{AUTHOR.heading}</p>
          <SplitHeading as="h1" text={AUTHOR.name} className="t-display glow-text max-w-5xl" delay={0.15} />
        </div>
      </section>

      <section className="relative pb-24 md:pb-36">
        <div className="hairline absolute inset-x-0 top-0" />
        <div className="container-x grid gap-12 pt-16 lg:grid-cols-12 lg:pt-24">
          <div className="space-y-8 lg:col-span-8 lg:col-start-3">
            <Reveal><p className="t-quote">{intro}</p></Reveal>
            {middle.map((p, i) => (
              <Reveal key={i}><p className={i === 0 ? "t-lead" : "t-body"}>{p}</p></Reveal>
            ))}
          </div>
        </div>

        <div className="container-x mt-24 md:mt-32">
          <Reveal className="glass relative mx-auto max-w-4xl overflow-hidden rounded-2xl p-8 text-center shadow-[0_0_80px_-30px_var(--color-cyan)] md:p-14">
            <span aria-hidden className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan to-transparent" />
            <p className="t-quote text-offwhite">{closing}</p>
            <div className="mt-10 flex justify-center">
              <LinkButton href="/about-the-book">Explore the Book</LinkButton>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
