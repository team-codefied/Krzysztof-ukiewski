"use client";

import { useEffect, useRef } from "react";

type Star = { x: number; y: number; r: number; a: number; s: number; p: number };

/** Fixed, low-cost twinkling star layer. Static when reduced motion is requested. */
export function Starfield() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    let stars: Star[] = [];
    let w = 0;
    let h = 0;
    let raf = 0;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.min(220, Math.round((w * h) / 7500));
      stars = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        r: Math.random() * 1.15 + 0.2,
        a: Math.random() * 0.55 + 0.2,
        s: Math.random() * 0.0012 + 0.0004,
        p: Math.random() * Math.PI * 2,
      }));
      draw(0);
    };

    const draw = (t: number) => {
      ctx.clearRect(0, 0, w, h);
      for (const s of stars) {
        const tw = reduce.matches ? 1 : 0.55 + 0.45 * Math.sin(t * s.s * 6 + s.p);
        ctx.globalAlpha = s.a * tw;
        ctx.fillStyle = s.r > 1 ? "#36DDF5" : "#F2F5F7";
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    const loop = (t: number) => {
      draw(t);
      raf = requestAnimationFrame(loop);
    };

    const start = () => {
      cancelAnimationFrame(raf);
      if (!reduce.matches && !document.hidden) raf = requestAnimationFrame(loop);
    };

    resize();
    start();
    window.addEventListener("resize", resize);
    document.addEventListener("visibilitychange", start);
    reduce.addEventListener("change", start);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", start);
      reduce.removeEventListener("change", start);
    };
  }, []);

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 bg-navy">
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(120% 80% at 50% -10%, color-mix(in srgb, var(--color-midnight) 85%, transparent), transparent 60%), radial-gradient(80% 60% at 100% 100%, color-mix(in srgb, var(--color-midnight) 55%, transparent), transparent 70%)",
        }}
      />
      <canvas ref={ref} className="absolute inset-0 h-full w-full" />
    </div>
  );
}
