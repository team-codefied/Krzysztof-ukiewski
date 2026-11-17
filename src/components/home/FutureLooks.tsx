import { HOME } from "@/lib/content";
import {
  FreedomMotif,
  LatticeMotif,
  LoopMotif,
  NetworkMotif,
  OrbitMotif,
  TimeMotif,
} from "@/components/ui/Motifs";
import { Reveal, SplitHeading } from "@/components/ui/Motion";

const motifs = [NetworkMotif, OrbitMotif, LoopMotif, FreedomMotif, LatticeMotif] as const;

export function FutureLooks() {
  const c = HOME.future;
  const finale = c.items[5];
  return (
    <section className="section-pad relative overflow-hidden">
      <div className="container-x">
        <Reveal><p className="t-eyebrow mb-6">{c.eyebrow}</p></Reveal>
        <SplitHeading text={c.heading} className="t-h2 max-w-4xl" />
        <Reveal className="mt-8"><p className="t-lead max-w-2xl">{c.intro}</p></Reveal>

        <ol className="mt-20 md:mt-28">
          {c.items.slice(0, 5).map((item, i) => {
            const Motif = motifs[i];
            const flip = i % 2 === 1;
            return (
              <li key={item.title} className="group relative border-t border-offwhite/10 py-12 md:py-16">
                <span aria-hidden className="absolute inset-x-0 top-0 h-px origin-left scale-x-0 bg-cyan transition-transform duration-1000 ease-[var(--ease-cine)] group-hover:scale-x-100" />
                <div className="grid items-center gap-8 md:grid-cols-12 md:gap-12">
                  <Reveal className={`${flip ? "md:order-2 md:col-start-9" : ""} md:col-span-4`}>
                    <div className="mx-auto h-48 w-48 transition-transform duration-1000 ease-[var(--ease-cine)] group-hover:scale-105 md:h-56 md:w-56">
                      <Motif />
                    </div>
                  </Reveal>
                  <Reveal delay={0.1} className={`${flip ? "md:order-1 md:col-start-1" : "md:col-start-6"} md:col-span-7`}>
                    <p className="font-display text-sm tracking-[0.3em] text-cyan/80">0{i + 1}</p>
                    <h3 className="t-h3 mt-4 max-w-xl text-offwhite">{item.title}</h3>
                    <p className="t-body mt-5 max-w-xl">{item.text}</p>
                  </Reveal>
                </div>
              </li>
            );
          })}

          {/* Finale — time as the greatest wealth */}
          <li className="relative border-t border-offwhite/10 pt-16 md:pt-24">
            <div className="relative mx-auto flex max-w-3xl flex-col items-center text-center">
              <div aria-hidden className="absolute top-8 h-72 w-72 rounded-full bg-cyan/10 blur-3xl md:h-96 md:w-96" />
              <Reveal className="relative h-64 w-64 md:h-[26rem] md:w-[26rem]">
                <TimeMotif />
              </Reveal>
              <Reveal delay={0.1} className="relative mt-8">
                <p className="font-display text-sm tracking-[0.3em] text-cyan/80">06</p>
                <h3 className="t-h2 mt-4 glow-text">{finale.title}</h3>
                <p className="t-lead mx-auto mt-6 max-w-xl">{finale.text}</p>
              </Reveal>
            </div>
          </li>
        </ol>
      </div>
    </section>
  );
}
