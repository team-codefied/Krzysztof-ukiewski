import { HOME } from "@/lib/content";
import { ContourMotif } from "@/components/ui/Motifs";
import { Parallax, Reveal, SplitHeading } from "@/components/ui/Motion";

export function DifferentFuture() {
  const c = HOME.different;
  const [mapLine, ...restOfP3] = c.p3.split(/(?<=\.)\s/);
  return (
    <section className="section-pad relative overflow-hidden">
      <div aria-hidden className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,transparent,color-mix(in_srgb,var(--color-midnight)_55%,transparent)_40%,transparent)]" />
      <Parallax speed={50} className="pointer-events-none absolute -right-[20%] top-[8%] -z-10 w-[120%] max-w-[70rem] opacity-70 md:-right-[8%] md:w-[70%]">
        <ContourMotif className="w-full" />
      </Parallax>

      <div className="container-x">
        <Reveal><p className="t-eyebrow mb-6">{c.eyebrow}</p></Reveal>
        <SplitHeading text={c.heading} className="t-h2 max-w-3xl" />

        <div className="mt-16 grid gap-14 lg:grid-cols-12">
          <div className="space-y-8 lg:col-span-6">
            <Reveal><p className="t-lead">{c.p1}</p></Reveal>
            <Reveal><p className="t-body">{c.p2}</p></Reveal>
            <Reveal className="border-l border-cyan/60 pl-6 md:pl-8">
              <p className="t-body">
                <span className="t-h3 block pb-3 text-offwhite glow-text">{mapLine}</span>
                {restOfP3.join(" ")}
              </p>
            </Reveal>
          </div>
        </div>

        <div className="mt-24 max-w-4xl space-y-4 md:mt-32">
          <Reveal><p className="t-lead">{c.p4}</p></Reveal>
          <Reveal delay={0.1}><p className="t-quote text-cyan glow-text">{c.p5}</p></Reveal>
        </div>
      </div>
    </section>
  );
}
