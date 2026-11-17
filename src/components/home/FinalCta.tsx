import Image from "next/image";
import { HOME } from "@/lib/content";
import { SITE } from "@/lib/site";
import { BookCover } from "@/components/ui/BookCover";
import { LinkButton } from "@/components/ui/Button";
import { Reveal, SplitHeading } from "@/components/ui/Motion";

export function FinalCta() {
  const c = HOME.final;
  return (
    <section className="section-pad relative isolate overflow-hidden">
      <div aria-hidden className="absolute inset-x-0 bottom-0 -z-10 h-[85%] [mask-image:linear-gradient(to_bottom,transparent,black_40%)]">
        <Image src="/images/earth.webp" alt="" fill sizes="100vw" className="object-cover object-[50%_0%] opacity-50" />
      </div>
      <div aria-hidden className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,var(--color-navy),color-mix(in_srgb,var(--color-navy)_70%,transparent)_55%,transparent)]" />
      <div aria-hidden className="hairline absolute inset-x-0 top-0" />

      <div className="container-x grid items-center gap-16 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <SplitHeading text={c.heading} className="t-display glow-text" />
          <div className="mt-10 max-w-xl space-y-5">
            <Reveal><p className="t-lead">{c.p1}</p></Reveal>
            <Reveal delay={0.08}><p className="t-body">{c.p2}</p></Reveal>
          </div>
          <Reveal delay={0.16} className="mt-10">
            <LinkButton href="/about-the-book">{c.cta}</LinkButton>
          </Reveal>
        </div>

        <div className="mx-auto w-full max-w-[17rem] sm:max-w-xs lg:col-span-5 lg:max-w-sm">
          <BookCover sizes="(min-width: 1024px) 384px, 70vw" />
          <Reveal className="mt-10 text-center" delay={0.1}>
            <p className="font-display text-sm font-medium uppercase tracking-[0.28em] text-offwhite">{SITE.title}</p>
            <p className="mt-1 font-display text-sm italic text-cyan">{SITE.subtitle}</p>
            <p className="mt-3 text-xs uppercase tracking-[0.26em] text-offwhite/60">{c.byline}</p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
