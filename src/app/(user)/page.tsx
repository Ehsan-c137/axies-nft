import { ReactNode } from "react";
import {
  TodayPick,
  TopSeller,
  PopularCollection,
  LiveAuctions,
  Hero,
  HeroOverview,
} from "@/screens/landing-page";

export default function Page() {
  return (
    <>
      <SectionWrapper>
        <Hero />
        <HeroOverview />
      </SectionWrapper>
      <LiveAuctions />
      <PopularCollection />
      <SectionWrapper>
        <TopSeller />
        <TodayPick />
      </SectionWrapper>
    </>
  );
}

const SectionWrapper = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}): React.ReactNode => (
  <section
    className={
      "container mx-auto px-4 md:px-6 lg:px-8 flex flex-col" + " " + className
    }
  >
    {children}
  </section>
);
