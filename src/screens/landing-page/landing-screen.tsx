"use client";

import {
  useAnimationPerformanceControl,
  DEFAULT_OPTIONS,
} from "@/hooks/useAnimationPerformanceControl";
import { TodayPick } from "./today-pick/today-pick-screen";
import { LiveAuctions } from "./live-auctions";
import { PopularCollection } from "./popular-collection";
import { TopSeller } from "./top-seller";
import { Hero } from "./hero";
import { HeroOverview } from "./hero-overview";
import { Suspense, useEffect, useRef } from "react";

export default function LandingScreen() {
  const isAnimationEnabled = useAnimationPerformanceControl(DEFAULT_OPTIONS);
  const InterSectionObserverCallback = (
    entries: IntersectionObserverEntry[],
  ) => {
    entries?.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show-animation");
      }
    });
  };

  const itemRef = useRef<HTMLElement[] | []>([]);
  useEffect(() => {
    if (!isAnimationEnabled) return;
    const targets = itemRef.current;
    const observer = new IntersectionObserver(InterSectionObserverCallback, {
      root: null,
      threshold: 0.3,
      rootMargin: "30px",
    });

    if (targets) {
      targets?.forEach((item) => {
        observer.observe(item);
      });
    }

    return () => {
      targets?.map((item) => {
        if (item) {
          observer.unobserve(item);
        }
      });
    };
  }, [isAnimationEnabled]);

  return (
    <div className="md:px-6">
      <SectionWrapper>
        <Hero />
        <HeroOverview ref={itemRef} />
      </SectionWrapper>
      <LiveAuctions ref={itemRef} />
      <PopularCollection ref={itemRef} />
      <SectionWrapper>
        <TopSeller ref={itemRef} />
        <Suspense>
          <TodayPick />
        </Suspense>
      </SectionWrapper>
    </div>
  );
}

const SectionWrapper = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}): React.ReactNode => (
  <section className={"container mx-auto flex flex-col" + " " + className}>
    {children}
  </section>
);
