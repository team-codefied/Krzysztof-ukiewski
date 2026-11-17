"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { HOME } from "@/lib/content";
import { LinkButton } from "@/components/ui/Button";
import { EASE, SplitHeading } from "@/components/ui/Motion";

export function Hero() {
  const h = HOME.hero;
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const earthY = useTransform(scrollYProgress, [0, 1], ["0%", "22%"]);
  const earthScale = useTransform(scrollYProgress, [0, 1], [1, 1.14]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "-14%"]);
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section ref={ref} className="relative isolate flex min-h-[100svh] items-center overflow-hidden pb-24 pt-32 md:pb-32">
      {/* Earth + horizon */}
      <motion.div style={{ y: earthY, scale: earthScale }} className="absolute inset-x-0 bottom-0 -z-10 h-[78%] min-h-[520px]">
        <motion.div
          initial={{ opacity: 0, scale: 1.08 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 2.4, ease: EASE }}
          className="absolute inset-0 [mask-image:linear-gradient(to_bottom,transparent,black_28%,black_72%,transparent)]"
        >
          <Image
            src="/images/earth.webp"
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover object-[50%_0%] opacity-90"
          />
        </motion.div>
      </motion.div>

      {/* Atmosphere */}
      <div aria-hidden className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,var(--color-navy)_0%,color-mix(in_srgb,var(--color-navy)_55%,transparent)_45%,transparent_80%)]" />
      <div aria-hidden className="absolute inset-x-0 bottom-0 -z-10 h-40 bg-gradient-to-t from-navy to-transparent" />
      <div aria-hidden className="beam-pulse absolute bottom-[34%] left-1/2 -z-10 hidden h-[60%] w-px -translate-x-1/2 bg-gradient-to-t from-cyan/60 via-offwhite/30 to-transparent md:block" />

      {/* Futuristic data details */}
      <svg aria-hidden viewBox="0 0 1200 600" preserveAspectRatio="xMidYMax slice" className="absolute inset-x-0 bottom-0 -z-10 h-[70%] w-full opacity-60">
        <motion.path
          d="M-50 560 Q 600 -140 1250 560"
          fill="none" stroke="var(--color-cyan)" strokeOpacity="0.35" strokeWidth="1"
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 3.2, ease: EASE, delay: 0.4 }}
        />
        <motion.path
          d="M-120 600 Q 600 -260 1320 600"
          fill="none" stroke="var(--color-cyan)" strokeOpacity="0.16" strokeWidth="1" strokeDasharray="2 8"
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 3.6, ease: EASE, delay: 0.6 }}
        />
      </svg>

      <motion.div style={{ y: textY, opacity: fade }} className="container-x relative">
        <div className="max-w-5xl">
          <SplitHeading as="h1" text={h.heading} className="t-display glow-text" delay={0.25} />

          <div className="mt-8 max-w-2xl space-y-5 md:mt-10">
            {h.paragraphs.map((p, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: EASE, delay: 1.0 + i * 0.18 }}
                className={i === 0 ? "t-lead" : "t-body"}
              >
                {p}
              </motion.p>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: EASE, delay: 1.7 }}
            className="mt-10 flex flex-col gap-4 sm:flex-row"
          >
            <LinkButton href="/about-the-book">{h.ctaPrimary}</LinkButton>
            <LinkButton href="#vision" variant="ghost">
              {h.ctaSecondary}
            </LinkButton>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
