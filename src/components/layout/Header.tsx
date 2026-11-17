"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { NAV, SITE } from "@/lib/site";
import { EASE } from "@/components/ui/Motion";

function Brand() {
  return (
    <Link href="/" className="group flex items-center gap-3" aria-label={`${SITE.title} — home`}>
      <svg viewBox="0 0 24 24" className="h-6 w-6 text-cyan transition-transform duration-700 group-hover:rotate-90" aria-hidden>
        <path d="M12 1 13.4 10.6 23 12 13.4 13.4 12 23 10.6 13.4 1 12 10.6 10.6Z" fill="currentColor" />
      </svg>
      <span className="whitespace-nowrap font-display text-[0.7rem] font-medium uppercase tracking-[0.2em] text-offwhite sm:text-sm">
        {SITE.title}
      </span>
    </Link>
  );
}

export function Header({ social }: { social: React.ReactNode }) {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 24);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <>
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,backdrop-filter,border-color] duration-700 ${
        scrolled || open
          ? "border-b border-cyan/10 bg-navy/70 backdrop-blur-xl"
          : "border-b border-transparent bg-gradient-to-b from-navy/70 to-transparent"
      }`}
    >
      <div className="container-x flex h-[4.5rem] items-center justify-between">
        <Brand />

        <nav aria-label="Primary" className="hidden items-center gap-6 xl:gap-9 lg:flex">
          {NAV.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={`group relative whitespace-nowrap py-2 text-[0.75rem] xl:text-[0.8rem] font-medium uppercase tracking-[0.18em] transition-colors duration-500 ${
                  active ? "text-cyan" : "text-offwhite/75 hover:text-offwhite"
                }`}
              >
                {item.label}
                {active ? (
                  <motion.span
                    layoutId="nav-indicator"
                    className="absolute inset-x-0 -bottom-0.5 h-px bg-cyan shadow-[0_0_12px_var(--color-cyan)]"
                    transition={{ duration: 0.6, ease: EASE }}
                  />
                ) : (
                  <span className="absolute inset-x-0 -bottom-0.5 h-px origin-left scale-x-0 bg-offwhite/60 transition-transform duration-500 ease-[var(--ease-cine)] group-hover:scale-x-100" />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="hidden lg:block">{social}</div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          className="grid h-11 w-11 place-items-center rounded-full border border-cyan/25 text-offwhite transition-colors hover:border-cyan lg:hidden"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>
    </header>

      <AnimatePresence>
        {open ? (
          <motion.div
            id="mobile-menu"
            key="menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: EASE }}
            className="fixed inset-x-0 top-[4.5rem] bottom-0 z-40 overflow-y-auto bg-navy/95 backdrop-blur-2xl lg:hidden"
          >
            <nav aria-label="Mobile" className="container-x flex min-h-full flex-col justify-between py-10">
              <ul className="space-y-1">
                {NAV.map((item, i) => {
                  const active = pathname === item.href;
                  return (
                    <motion.li
                      key={item.href}
                      initial={{ opacity: 0, y: 24 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.7, ease: EASE, delay: 0.1 + i * 0.07 }}
                    >
                      <Link
                        href={item.href}
                        aria-current={active ? "page" : undefined}
                        className={`flex items-baseline gap-4 border-b border-offwhite/10 py-5 font-display text-3xl font-medium tracking-tight sm:text-4xl ${
                          active ? "text-cyan" : "text-offwhite"
                        }`}
                      >
                        <span className="text-xs tracking-[0.2em] text-cyan/70">0{i + 1}</span>
                        {item.label}
                      </Link>
                    </motion.li>
                  );
                })}
              </ul>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.6 }}
                className="pt-12"
              >
                {social}
              </motion.div>
            </nav>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
