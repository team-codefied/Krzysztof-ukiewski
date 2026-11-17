"use client";

import Image from "next/image";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";

/** The original front cover with a pointer-driven 3D tilt, slow float and cyan halo. */
export function BookCover({
  priority = false,
  sizes = "(min-width: 1024px) 420px, 70vw",
  className = "",
  float = true,
}: {
  priority?: boolean;
  sizes?: string;
  className?: string;
  float?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 120, damping: 18 });
  const sy = useSpring(my, { stiffness: 120, damping: 18 });
  const rotateY = useTransform(sx, [-0.5, 0.5], [-12, 12]);
  const rotateX = useTransform(sy, [-0.5, 0.5], [10, -10]);
  const glareX = useTransform(sx, [-0.5, 0.5], ["15%", "85%"]);

  const onMove = (e: React.PointerEvent) => {
    if (e.pointerType !== "mouse" || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };
  const reset = () => {
    mx.set(0);
    my.set(0);
  };

  return (
    <div className={`relative ${className}`} style={{ perspective: 1200 }}>
      <div
        aria-hidden
        className="beam-pulse absolute -inset-[18%] -z-10 rounded-full bg-[radial-gradient(closest-side,color-mix(in_srgb,var(--color-cyan)_30%,transparent),transparent_70%)] blur-2xl"
      />
      <motion.div
        ref={ref}
        onPointerMove={onMove}
        onPointerLeave={reset}
        animate={float ? { y: [0, -12, 0] } : undefined}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
      >
        <motion.div
          style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
          className="relative overflow-hidden rounded-[3px] shadow-[0_40px_120px_-20px_rgba(0,0,0,0.9),0_0_0_1px_color-mix(in_srgb,var(--color-cyan)_25%,transparent)]"
        >
          <Image
            src="/images/cover-front.webp"
            alt="Front cover of The World That Could Be by Krzysztof Łukiewski: a glowing Earth at night under a golden horizon, overlaid with blue data visualizations."
            width={1024}
            height={1536}
            priority={priority}
            sizes={sizes}
            className="h-auto w-full"
          />
          <motion.span
            aria-hidden
            className="pointer-events-none absolute inset-0 mix-blend-soft-light"
            style={{
              background: "linear-gradient(110deg, transparent 30%, rgba(255,255,255,0.55) 50%, transparent 70%)",
              backgroundSize: "250% 100%",
              backgroundPositionX: glareX,
            }}
          />
        </motion.div>
      </motion.div>
    </div>
  );
}
