import { HOME } from "@/lib/content";
import { BookCover } from "@/components/ui/BookCover";
import { Parallax, Reveal, SplitHeading } from "@/components/ui/Motion";

export function Intro() {
  const c = HOME.intro;
  return (
    <section className="section-pad relative">
      <div className="container-x grid items-center gap-14 lg:grid-cols-12 lg:gap-10">
        <div className="order-2 lg:order-1 lg:col-span-7 lg:pr-10">
          <SplitHeading text={c.heading} className="t-h2 max-w-3xl" />

          <div className="mt-10 grid gap-8 md:mt-14">
            <Reveal><p className="t-lead max-w-2xl">{c.p1}</p></Reveal>
            <Reveal delay={0.05}><p className="t-body max-w-xl">{c.p2}</p></Reveal>

            <Reveal className="relative my-2 border-l border-cyan/60 pl-6 md:pl-8">
              <p className="t-quote text-offwhite">{c.question}</p>
            </Reveal>

            <Reveal><p className="t-body max-w-2xl">{c.p4}</p></Reveal>
            <Reveal><p className="t-lead max-w-2xl text-offwhite">{c.p5}</p></Reveal>
          </div>
        </div>

        <div className="order-1 mx-auto w-full max-w-[17rem] sm:max-w-xs lg:order-2 lg:col-span-5 lg:max-w-sm">
          <Parallax speed={36}>
            <BookCover sizes="(min-width: 1024px) 384px, 70vw" />
          </Parallax>
        </div>
      </div>
    </section>
  );
}
