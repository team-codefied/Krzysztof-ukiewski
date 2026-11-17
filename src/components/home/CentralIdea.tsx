import { HOME } from "@/lib/content";
import { SimulationMotif } from "@/components/ui/Motifs";
import { Reveal, SplitHeading } from "@/components/ui/Motion";

export function CentralIdea() {
  const c = HOME.idea;
  return (
    <section id="vision" className="section-pad relative overflow-hidden">
      <div aria-hidden className="absolute inset-0 -z-10 bg-[radial-gradient(70%_60%_at_80%_40%,color-mix(in_srgb,var(--color-midnight)_90%,transparent),transparent)]" />
      <div className="hairline absolute inset-x-0 top-0" />

      <div className="container-x">
        <Reveal><p className="t-eyebrow mb-6">{c.eyebrow}</p></Reveal>
        <SplitHeading text={c.heading} className="t-h2 max-w-4xl" />

        <div className="mt-14 grid items-center gap-12 lg:grid-cols-12">
          <div className="space-y-7 lg:col-span-6">
            <Reveal><p className="t-lead">{c.p1}</p></Reveal>
            <Reveal><p className="t-body">{c.p2}</p></Reveal>
            <Reveal><p className="t-body">{c.p3}</p></Reveal>
          </div>

          <div className="relative mx-auto aspect-square w-full max-w-[34rem] lg:col-span-6 lg:max-w-none">
            <div aria-hidden className="absolute inset-[10%] rounded-full bg-cyan/10 blur-3xl" />
            <SimulationMotif className="relative h-full w-full" />
          </div>
        </div>

        <Reveal className="glass relative mt-16 overflow-hidden rounded-2xl p-8 shadow-[0_0_80px_-30px_var(--color-cyan)] md:mt-20 md:p-14">
          <span aria-hidden className="absolute inset-y-0 left-0 w-px bg-gradient-to-b from-transparent via-cyan to-transparent" />
          <p className="t-quote max-w-4xl font-medium text-offwhite glow-text">{c.question}</p>
        </Reveal>

        <Reveal className="mt-10 md:ml-[calc(100%/12*5)]">
          <p className="t-lead max-w-xl">{c.p4}</p>
        </Reveal>
      </div>
    </section>
  );
}
