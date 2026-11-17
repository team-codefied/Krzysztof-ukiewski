"use client";

import {
  MotionConfig,
  motion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { useRef, type ReactNode } from "react";

export const EASE = [0.22, 1, 0.36, 1] as const;

/** Honours the visitor's reduced-motion preference for every animation below. */
export function MotionProvider({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}

type RevealTag = "div" | "p" | "li" | "span" | "section";

export function Reveal({
  children,
  delay = 0,
  y = 28,
  className,
  as = "div",
  once = true,
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  as?: RevealTag;
  once?: boolean;
}) {
  const M = motion[as] as typeof motion.div;
  return (
    <M
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin: "0px 0px -12% 0px" }}
      transition={{ duration: 1, ease: EASE, delay }}
    >
      {children}
    </M>
  );
}

/** Word-by-word masked heading reveal. Text stays real text for assistive tech. */
export function SplitHeading({
  text,
  as: Tag = "h2",
  className,
  delay = 0,
  stagger = 0.055,
}: {
  text: string;
  as?: "h1" | "h2" | "h3" | "p";
  className?: string;
  delay?: number;
  stagger?: number;
}) {
  const words = text.split(" ");
  return (
    <Tag className={className}>
      <motion.span
        className="inline"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "0px 0px -10% 0px" }}
        variants={{ show: { transition: { staggerChildren: stagger, delayChildren: delay } } }}
      >
        {words.map((w, i) => (
          <span key={i}>
            <span className="inline-block overflow-hidden align-bottom pb-[0.14em] -mb-[0.14em]">
              <motion.span
                className="inline-block will-change-transform"
                variants={{
                  hidden: { y: "115%", opacity: 0 },
                  show: { y: 0, opacity: 1, transition: { duration: 1, ease: EASE } },
                }}
              >
                {w}
              </motion.span>
            </span>
            {i < words.length - 1 ? " " : null}
          </span>
        ))}
      </motion.span>
    </Tag>
  );
}

/** Staggered group: children wrapped in <StaggerItem> animate in sequence. */
export function Stagger({
  children,
  className,
  gap = 0.12,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  gap?: number;
  delay?: number;
}) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      variants={{ show: { transition: { staggerChildren: gap, delayChildren: delay } } }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className,
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  as?: RevealTag;
}) {
  const M = motion[as] as typeof motion.div;
  return (
    <M
      className={className}
      variants={{
        hidden: { opacity: 0, y: 26 },
        show: { opacity: 1, y: 0, transition: { duration: 1, ease: EASE } },
      }}
    >
      {children}
    </M>
  );
}

/** Scroll-linked vertical drift. Wrap any visual layer. */
export function Parallax({
  children,
  speed = 60,
  className,
}: {
  children: ReactNode;
  speed?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [speed, -speed]);
  return (
    <div ref={ref} className={className}>
      <motion.div style={{ y }} className="will-change-transform">
        {children}
      </motion.div>
    </div>
  );
}

function Word({
  word,
  range,
  progress,
}: {
  word: string;
  range: [number, number];
  progress: MotionValue<number>;
}) {
  const opacity = useTransform(progress, range, [0.16, 1]);
  return (
    <motion.span style={{ opacity }} className="inline-block">
      {word}
    </motion.span>
  );
}

/** Words light up as the paragraph scrolls through the viewport. */
export function ScrollWords({
  text,
  className,
  as: Tag = "p",
}: {
  text: string;
  className?: string;
  as?: "p" | "h2" | "h3" | "div";
}) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.88", "start 0.38"] });
  const words = text.split(" ");
  const M = motion[Tag] as typeof motion.p;
  return (
    <M ref={ref as React.RefObject<HTMLParagraphElement>} className={className}>
      {words.map((w, i) => {
        const start = i / words.length;
        const end = Math.min(1, start + 2 / words.length);
        return (
          <span key={i}>
            <Word word={w} range={[start, end]} progress={scrollYProgress} />
            {i < words.length - 1 ? " " : null}
          </span>
        );
      })}
    </M>
  );
}

/** Vertical line whose fill follows scroll progress through its container. */
export function ScrollLine({ className }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.7", "end 0.5"] });
  return (
    <div ref={ref} className={className} aria-hidden>
      <div className="absolute inset-0 bg-offwhite/10" />
      <motion.div
        className="absolute inset-0 origin-top bg-cyan shadow-[0_0_18px_var(--color-cyan)]"
        style={{ scaleY: scrollYProgress }}
      />
    </div>
  );
}
