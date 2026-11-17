"use client";

import { motion } from "framer-motion";

/**
 * Six bespoke, decorative SVG motifs — one per idea in "A Civilization With More Time".
 * All are aria-hidden; the adjacent text carries the meaning.
 */

const stroke = "var(--color-cyan)";
const dim = "color-mix(in srgb, var(--color-offwhite) 22%, transparent)";
const draw = {
  hidden: { pathLength: 0, opacity: 0 },
  show: { pathLength: 1, opacity: 1, transition: { duration: 1.8, ease: [0.22, 1, 0.36, 1] as const } },
};

function Frame({ children }: { children: React.ReactNode }) {
  return (
    <motion.svg
      viewBox="0 0 200 200"
      className="h-full w-full overflow-visible"
      aria-hidden
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "0px 0px -15% 0px" }}
      variants={{ show: { transition: { staggerChildren: 0.08 } } }}
    >
      {children}
    </motion.svg>
  );
}

/** 01 — resource network */
export function NetworkMotif() {
  const n = [
    [100, 28], [168, 66], [160, 140], [100, 174], [38, 140], [30, 66], [100, 100], [136, 100], [64, 100],
  ] as const;
  const edges = [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 0], [6, 0], [6, 2], [6, 4], [7, 1], [8, 5], [6, 7], [6, 8], [7, 3]] as const;
  return (
    <Frame>
      {edges.map(([a, b], i) => (
        <motion.line
          key={i}
          x1={n[a][0]} y1={n[a][1]} x2={n[b][0]} y2={n[b][1]}
          stroke={i % 3 === 0 ? stroke : dim} strokeWidth="1" variants={draw}
        />
      ))}
      {n.map(([x, y], i) => (
        <motion.circle
          key={i} cx={x} cy={y} r={i === 6 ? 7 : 4} fill="var(--color-navy)" stroke={stroke} strokeWidth="1.5"
          variants={{ hidden: { scale: 0, opacity: 0 }, show: { scale: 1, opacity: 1, transition: { duration: 0.8 } } }}
          style={{ transformOrigin: `${x}px ${y}px` }}
        />
      ))}
      <motion.circle
        cx="100" cy="100" r="7" fill={stroke}
        animate={{ opacity: [0.9, 0.25, 0.9], scale: [1, 2.4, 1] }}
        transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
        style={{ transformOrigin: "100px 100px" }}
      />
    </Frame>
  );
}

/** 02 — orbiting technology */
export function OrbitMotif() {
  return (
    <Frame>
      {[34, 62, 90].map((r, i) => (
        <motion.g
          key={r}
          animate={{ rotate: i % 2 ? -360 : 360 }}
          transition={{ duration: 28 + i * 14, repeat: Infinity, ease: "linear" }}
          style={{ transformOrigin: "100px 100px" }}
        >
          <motion.circle cx="100" cy="100" r={r} fill="none" stroke={i === 1 ? stroke : dim} strokeWidth="1" strokeDasharray={i === 1 ? "2 6" : "none"} variants={draw} />
          <circle cx={100 + r} cy="100" r={i === 2 ? 5 : 3.5} fill={stroke} />
        </motion.g>
      ))}
      <circle cx="100" cy="100" r="12" fill="none" stroke={stroke} strokeWidth="1.5" />
      <circle cx="100" cy="100" r="4" fill={stroke} />
    </Frame>
  );
}

/** 03 — closed loop, durable goods */
export function LoopMotif() {
  return (
    <Frame>
      <motion.g
        animate={{ rotate: 360 }}
        transition={{ duration: 36, repeat: Infinity, ease: "linear" }}
        style={{ transformOrigin: "100px 100px" }}
      >
        <motion.path d="M100 24 A76 76 0 0 1 176 100" fill="none" stroke={stroke} strokeWidth="1.6" strokeLinecap="round" variants={draw} />
        <motion.path d="M176 100 A76 76 0 0 1 100 176" fill="none" stroke={dim} strokeWidth="1.2" variants={draw} />
        <motion.path d="M100 176 A76 76 0 0 1 24 100" fill="none" stroke={stroke} strokeWidth="1.6" strokeLinecap="round" variants={draw} />
        <motion.path d="M24 100 A76 76 0 0 1 100 24" fill="none" stroke={dim} strokeWidth="1.2" variants={draw} />
        {[[100, 24, 0], [176, 100, 90], [100, 176, 180], [24, 100, 270]].map(([x, y, a]) => (
          <path key={`${x}-${y}`} d="M-6 -4 L2 0 L-6 4" fill="none" stroke={stroke} strokeWidth="1.6" transform={`translate(${x} ${y}) rotate(${a})`} />
        ))}
      </motion.g>
      <motion.path
        d="M100 70 L126 85 L126 115 L100 130 L74 115 L74 85 Z" fill="none" stroke={stroke} strokeWidth="1.5" variants={draw}
      />
      <motion.path d="M74 85 L100 100 L126 85 M100 100 V130" fill="none" stroke={dim} strokeWidth="1" variants={draw} />
    </Frame>
  );
}

/** 04 — less labor, wider horizon */
export function FreedomMotif() {
  const heights = [88, 74, 60, 46, 34, 22, 12];
  return (
    <Frame>
      {heights.map((h, i) => (
        <motion.rect
          key={i} x={22 + i * 23} y={150 - h} width="10" height={h} fill={i > 3 ? "none" : dim}
          stroke={i > 3 ? stroke : "none"} strokeWidth="1"
          variants={{ hidden: { scaleY: 0, opacity: 0 }, show: { scaleY: 1, opacity: 1, transition: { duration: 1, ease: [0.22, 1, 0.36, 1] } } }}
          style={{ transformOrigin: `${27 + i * 23}px 150px` }}
        />
      ))}
      <motion.path d="M14 150 H186" stroke={stroke} strokeWidth="1" variants={draw} />
      <motion.path d="M14 40 Q100 -10 186 40" fill="none" stroke={stroke} strokeWidth="1.4" strokeDasharray="1 6" strokeLinecap="round" variants={draw} />
      <motion.circle
        cx="168" cy="30" r="5" fill={stroke}
        animate={{ opacity: [1, 0.35, 1] }} transition={{ duration: 4, repeat: Infinity }}
      />
    </Frame>
  );
}

/** 05 — a lit lattice of living needs */
export function LatticeMotif() {
  const cells = Array.from({ length: 25 }, (_, i) => i);
  return (
    <Frame>
      {cells.map((i) => {
        const cx = i % 5;
        const cy = Math.floor(i / 5);
        return (
          <motion.rect
            key={i} x={24 + cx * 33} y={24 + cy * 33} width="24" height="24" rx="3"
            fill="none" stroke={(cx + cy) % 3 === 0 ? stroke : dim} strokeWidth="1"
            variants={{ hidden: { opacity: 0, scale: 0.6 }, show: { opacity: 1, scale: 1, transition: { duration: 0.8, delay: (cx + cy) * 0.06 } } }}
            style={{ transformOrigin: `${36 + cx * 33}px ${36 + cy * 33}px` }}
          />
        );
      })}
      {cells.filter((i) => (i % 5 + Math.floor(i / 5)) % 3 === 0).map((i, k) => (
        <motion.rect
          key={`f${i}`} x={30 + (i % 5) * 33} y={30 + Math.floor(i / 5) * 33} width="12" height="12" rx="2" fill={stroke}
          animate={{ opacity: [0.15, 0.9, 0.15] }}
          transition={{ duration: 4.5, repeat: Infinity, delay: k * 0.45, ease: "easeInOut" }}
        />
      ))}
    </Frame>
  );
}

/** 06 — time: the finale, used large */
export function TimeMotif() {
  const ticks = Array.from({ length: 60 }, (_, i) => i);
  return (
    <Frame>
      {ticks.map((i) => {
        const a = (i / 60) * Math.PI * 2;
        const big = i % 5 === 0;
        const r1 = big ? 82 : 87;
        return (
          <line
            key={i}
            x1={100 + Math.sin(a) * r1} y1={100 - Math.cos(a) * r1}
            x2={100 + Math.sin(a) * 94} y2={100 - Math.cos(a) * 94}
            stroke={big ? stroke : dim} strokeWidth={big ? 1.4 : 0.8}
          />
        );
      })}
      <motion.circle cx="100" cy="100" r="68" fill="none" stroke={dim} strokeWidth="1" variants={draw} />
      <motion.g
        animate={{ rotate: 360 }}
        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
        style={{ transformOrigin: "100px 100px" }}
      >
        <circle cx="100" cy="100" r="68" fill="none" stroke={stroke} strokeWidth="1.6" strokeLinecap="round" strokeDasharray="120 400" />
      </motion.g>
      <motion.line
        x1="100" y1="100" x2="100" y2="44" stroke={stroke} strokeWidth="1.6" strokeLinecap="round"
        animate={{ rotate: 360 }} transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
        style={{ transformOrigin: "100px 100px" }}
      />
      <motion.line
        x1="100" y1="100" x2="100" y2="62" stroke="var(--color-offwhite)" strokeWidth="2.4" strokeLinecap="round"
        animate={{ rotate: 360 }} transition={{ duration: 360, repeat: Infinity, ease: "linear" }}
        style={{ transformOrigin: "100px 100px" }}
      />
      <circle cx="100" cy="100" r="4" fill={stroke} />
    </Frame>
  );
}

/** Contour-map motif for "a map, not a mandate" */
export function ContourMotif({ className = "" }: { className?: string }) {
  const rings = [18, 34, 52, 72, 94, 118, 144];
  return (
    <motion.svg
      viewBox="-160 -130 320 260"
      className={className}
      aria-hidden
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      variants={{ show: { transition: { staggerChildren: 0.18 } } }}
    >
      {rings.map((r, i) => (
        <motion.path
          key={r}
          d={`M${-r} 0 C ${-r} ${-r * 0.78}, ${-r * 0.3} ${-r * 0.9}, ${r * 0.2} ${-r * 0.82} S ${r} ${-r * 0.3}, ${r} ${r * 0.1} S ${r * 0.4} ${r * 0.86}, ${-r * 0.1} ${r * 0.8} S ${-r} ${r * 0.6}, ${-r} 0 Z`}
          fill="none"
          stroke={i % 3 === 0 ? stroke : dim}
          strokeWidth={i % 3 === 0 ? 1.3 : 0.9}
          variants={{
            hidden: { pathLength: 0, opacity: 0 },
            show: { pathLength: 1, opacity: 1, transition: { duration: 2.2, ease: [0.22, 1, 0.36, 1] } },
          }}
        />
      ))}
      <motion.circle cx="0" cy="0" r="3.5" fill={stroke} animate={{ opacity: [1, 0.3, 1] }} transition={{ duration: 3, repeat: Infinity }} />
    </motion.svg>
  );
}

/** Concentric signal rings + node field for "The Central Idea" */
export function SimulationMotif({ className = "" }: { className?: string }) {
  const nodes = Array.from({ length: 28 }, (_, i) => {
    const ring = 1 + (i % 4);
    const a = (i * 137.5 * Math.PI) / 180;
    return { x: 200 + Math.cos(a) * ring * 44, y: 200 + Math.sin(a) * ring * 44, big: i % 7 === 0 };
  });
  return (
    <motion.svg
      viewBox="0 0 400 400"
      className={className}
      aria-hidden
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      variants={{ show: { transition: { staggerChildren: 0.05 } } }}
    >
      {[44, 88, 132, 176].map((r, i) => (
        <motion.circle
          key={r} cx="200" cy="200" r={r} fill="none" stroke={i === 3 ? stroke : dim} strokeWidth="1"
          strokeDasharray={i % 2 ? "3 7" : "none"} variants={draw}
        />
      ))}
      <motion.g animate={{ rotate: 360 }} transition={{ duration: 120, repeat: Infinity, ease: "linear" }} style={{ transformOrigin: "200px 200px" }}>
        {nodes.map((n, i) => (
          <g key={i}>
            {i > 0 ? <line x1={nodes[i - 1].x} y1={nodes[i - 1].y} x2={n.x} y2={n.y} stroke={dim} strokeWidth="0.6" /> : null}
            <circle cx={n.x} cy={n.y} r={n.big ? 4 : 2.2} fill={n.big ? stroke : "var(--color-offwhite)"} opacity={n.big ? 1 : 0.55} />
          </g>
        ))}
      </motion.g>
      <circle cx="200" cy="200" r="5" fill={stroke} />
    </motion.svg>
  );
}
