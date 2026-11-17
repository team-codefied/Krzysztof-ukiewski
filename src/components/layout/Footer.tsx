import Link from "next/link";
import { HOME } from "@/lib/content";
import { NAV, SITE } from "@/lib/site";
import { SocialIcons } from "@/components/ui/Social";

export function Footer() {
  const f = HOME.footer;
  return (
    <footer className="relative border-t border-cyan/10 bg-gradient-to-b from-transparent to-midnight/40">
      <div className="hairline absolute inset-x-0 top-0" />
      <div className="container-x grid gap-14 py-16 md:grid-cols-12 md:py-20">
        <div className="md:col-span-6 lg:col-span-5">
          <p className="font-display text-2xl font-medium tracking-tight sm:text-3xl">{SITE.title}</p>
          <p className="mt-1 font-display text-base italic text-cyan">{SITE.subtitle}</p>
          <p className="mt-6 max-w-md text-[0.95rem] leading-relaxed text-offwhite/65">{f.description}</p>
        </div>

        <nav aria-label="Footer" className="md:col-span-3 lg:col-start-8">
          <p className="t-eyebrow mb-5">{f.quickLinks}</p>
          <ul className="space-y-3">
            {NAV.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="inline-block text-offwhite/75 transition-all duration-500 hover:translate-x-1 hover:text-cyan"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="md:col-span-3 lg:col-span-2">
          <p className="t-eyebrow mb-5">Follow</p>
          <SocialIcons />
        </div>
      </div>

      <div className="border-t border-offwhite/10">
        <div className="container-x py-6 text-sm text-offwhite/55">{f.copyright}</div>
      </div>
    </footer>
  );
}
