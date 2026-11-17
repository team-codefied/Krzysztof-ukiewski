import { HOME } from "@/lib/content";
import { Reveal, ScrollWords, SplitHeading } from "@/components/ui/Motion";

export function AuthorVision() {
  const c = HOME.vision;
  return (
    <section className="section-pad relative">
      <div className="container-x">
        <div className="mx-auto max-w-4xl text-center">
          <Reveal><p className="t-eyebrow mb-8">{c.eyebrow}</p></Reveal>
          <SplitHeading text={c.heading} className="t-h2" />

          <Reveal className="mx-auto my-14 flex items-center justify-center gap-4" y={0}>
            <span className="h-px w-16 bg-gradient-to-r from-transparent to-cyan/70 md:w-28" />
            <span className="h-1.5 w-1.5 rotate-45 bg-cyan shadow-[0_0_14px_var(--color-cyan)]" />
            <span className="h-px w-16 bg-gradient-to-l from-transparent to-cyan/70 md:w-28" />
          </Reveal>

          <div className="mx-auto max-w-2xl space-y-6">
            <Reveal><p className="t-lead">{c.p1}</p></Reveal>
            <Reveal><p className="t-body">{c.p2}</p></Reveal>
            <Reveal><p className="t-body">{c.p3}</p></Reveal>
          </div>

          <Reveal className="mt-20"><p className="t-body">{c.p4}</p></Reveal>
          <ScrollWords text={c.message} as="h2" className="t-display glow-text mx-auto mt-8 max-w-4xl" />
        </div>
      </div>
    </section>
  );
}
