import Image from "next/image";
import { HOME } from "@/lib/content";
import { Parallax, Reveal, ScrollLine, ScrollWords, SplitHeading } from "@/components/ui/Motion";

export function Story() {
  const c = HOME.story;
  return (
    <section className="section-pad relative overflow-hidden">
      {/* Layered cinematic backdrop */}
      <div aria-hidden className="absolute inset-0 -z-10">
        <Parallax speed={80} className="absolute inset-x-0 top-1/4 h-[80%]">
          <div className="relative h-[120%] w-full opacity-30 [mask-image:radial-gradient(60%_60%_at_70%_50%,black,transparent)]">
            <Image src="/images/earth.webp" alt="" fill sizes="100vw" className="object-cover object-[70%_30%]" />
          </div>
        </Parallax>
        <div className="absolute inset-0 bg-gradient-to-b from-navy via-transparent to-navy" />
      </div>
      <Parallax speed={120} className="pointer-events-none absolute inset-x-0 top-[38%] -z-10 select-none">
        <p aria-hidden className="whitespace-nowrap text-center font-display text-[24vw] font-semibold uppercase leading-none tracking-tighter text-transparent opacity-[0.07] [-webkit-text-stroke:1px_var(--color-cyan)]">
          Christopher
        </p>
      </Parallax>

      <div className="container-x">
        <Reveal><p className="t-eyebrow mb-6">{c.eyebrow}</p></Reveal>
        <SplitHeading text={c.heading} className="t-h2 max-w-5xl" />

        <div className="relative mt-20 grid gap-10 md:mt-28 md:grid-cols-[3rem_1fr] lg:grid-cols-[6rem_1fr]">
          <ScrollLine className="relative hidden w-px justify-self-center md:block" />

          <div className="space-y-16 md:space-y-24">
            <ScrollWords text={c.p1} className="t-quote max-w-3xl" />

            <div className="relative">
              <span aria-hidden className="absolute -left-4 top-1/2 hidden h-px w-10 -translate-y-1/2 bg-cyan shadow-[0_0_14px_var(--color-cyan)] md:block lg:-left-24 lg:w-20" />
              <ScrollWords text={c.name} as="h3" className="t-display glow-text" />
            </div>

            <ScrollWords text={c.p3} className="t-lead max-w-2xl" />
            <ScrollWords text={c.p4} className="t-quote max-w-3xl" />
            <ScrollWords text={c.p5} className="t-lead max-w-2xl" />
            <ScrollWords text={c.p6} className="t-quote max-w-3xl" />
            <ScrollWords text={c.p7} className="t-lead max-w-2xl" />
            <ScrollWords text={c.p8} className="t-h2 max-w-4xl text-offwhite" />
          </div>
        </div>
      </div>
    </section>
  );
}
