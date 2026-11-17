import type { Metadata } from "next";
import { SITE } from "@/lib/site";
import { Hero } from "@/components/home/Hero";
import { Intro } from "@/components/home/Intro";
import { CentralIdea } from "@/components/home/CentralIdea";
import { FutureLooks } from "@/components/home/FutureLooks";
import { Story } from "@/components/home/Story";
import { Questions } from "@/components/home/Questions";
import { AuthorVision } from "@/components/home/AuthorVision";
import { DifferentFuture } from "@/components/home/DifferentFuture";
import { FinalCta } from "@/components/home/FinalCta";

export const metadata: Metadata = {
  title: { absolute: `${SITE.fullTitle} | ${SITE.author}` },
  description: SITE.description,
  alternates: { canonical: "/" },
  openGraph: { url: "/", title: SITE.fullTitle, description: SITE.description },
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <Intro />
      <CentralIdea />
      <FutureLooks />
      <Story />
      <Questions />
      <AuthorVision />
      <DifferentFuture />
      <FinalCta />
    </>
  );
}
