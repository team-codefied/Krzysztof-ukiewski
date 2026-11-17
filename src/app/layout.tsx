import type { Metadata, Viewport } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { SITE } from "@/lib/site";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { MotionProvider } from "@/components/ui/Motion";
import { Starfield } from "@/components/ui/Starfield";
import { SocialIcons } from "@/components/ui/Social";

const display = Space_Grotesk({
  subsets: ["latin", "latin-ext"],
  variable: "--font-space-grotesk",
  display: "swap",
});
const sans = Inter({
  subsets: ["latin", "latin-ext"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.fullTitle} | ${SITE.author}`,
    template: `%s | ${SITE.title}`,
  },
  description: SITE.description,
  applicationName: SITE.title,
  authors: [{ name: SITE.author }],
  creator: SITE.author,
  openGraph: {
    type: "website",
    siteName: SITE.title,
    title: SITE.fullTitle,
    description: SITE.description,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: SITE.fullTitle,
    description: SITE.description,
  },
};

export const viewport: Viewport = {
  themeColor: "#071525",
  colorScheme: "dark",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${sans.variable}`}>
      <body className="min-h-screen antialiased">
        <MotionProvider>
          <Starfield />
          <a
            href="#main"
            className="sr-only z-[60] rounded-full bg-cyan px-5 py-3 font-medium text-navy focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
          >
            Skip to content
          </a>
          <Header social={<SocialIcons />} />
          <main id="main">{children}</main>
          <Footer />
        </MotionProvider>
      </body>
    </html>
  );
}
