import { HOME } from "@/lib/content";
import { Reveal, SplitHeading, Stagger, StaggerItem } from "@/components/ui/Motion";

export function Questions() {
  const c = HOME.matters;
  return (
    <section className="section-pad relative">
      <div className="hairline absolute inset-x-0 top-0" />
      <div className="container-x grid gap-14 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-32">
            <Reveal><p className="t-eyebrow mb-6">{c.eyebrow}</p></Reveal>
            <SplitHeading text={c.heading} className="t-h2" />
            <Reveal delay={0.1} className="mt-8"><p className="t-lead max-w-md">{c.intro}</p></Reveal>
          </div>
        </div>

        <div className="lg:col-span-7">
          <Stagger gap={0.1}>
            <ul>
              {c.questions.map((q, i) => (
                <StaggerItem as="li" key={q} className="group relative border-b border-offwhite/10 py-8 first:border-t md:py-10">
                  <span aria-hidden className="absolute inset-y-0 left-0 w-0 bg-gradient-to-r from-cyan/10 to-transparent transition-all duration-700 ease-[var(--ease-cine)] group-hover:w-full" />
                  <span aria-hidden className="absolute bottom-0 left-0 h-px w-0 bg-cyan shadow-[0_0_14px_var(--color-cyan)] transition-all duration-700 ease-[var(--ease-cine)] group-hover:w-full" />
                  <div className="relative flex gap-5 transition-transform duration-700 ease-[var(--ease-cine)] group-hover:translate-x-2 md:gap-8">
                    <span className="pt-2 font-display text-sm tracking-[0.2em] text-cyan/80">0{i + 1}</span>
                    <p className="t-h3 text-offwhite">{q}</p>
                  </div>
                </StaggerItem>
              ))}
            </ul>
          </Stagger>

          <Reveal className="mt-12"><p className="t-body max-w-xl">{c.outro}</p></Reveal>
        </div>
      </div>
    </section>
  );
}
