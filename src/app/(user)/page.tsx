"use client";

import {
  TodayPick,
  TopSeller,
  PopularCollection,
  LiveAuctions,
  Hero,
  HeroOverview,
} from "@/screens/landing-page";
import { useEffect, useRef } from "react";

export default function Page() {
  const callback = (entries: IntersectionObserverEntry[]) => {
    entries?.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show-animation");
      }
    });
  };

  const itemRef = useRef<HTMLElement[] | []>([]);
  useEffect(() => {
    const targets = itemRef.current;
    const observer = new IntersectionObserver(callback, {
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
  }, []);

  return (
    <>
      <SectionWrapper>
        <Hero />
        <HeroOverview ref={itemRef} />
      </SectionWrapper>
      <LiveAuctions ref={itemRef} />
      <PopularCollection ref={itemRef} />
      <SectionWrapper>
        <TopSeller ref={itemRef} />
        <TodayPick ref={itemRef} />
      </SectionWrapper>
    </>
  );
}

const SectionWrapper = ({
  children,
  className,
}: {
  children: React.ReactNode;
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
