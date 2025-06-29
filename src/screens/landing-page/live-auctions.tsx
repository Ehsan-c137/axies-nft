"use client";

import { Button } from "@/components/ui/button";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import dynamic from "next/dynamic";

const DynamicSwiper = dynamic(() => import("@/components/ui/swiper/swiper"), {
  ssr: false,
});

const imageArray = [
  {
    id: 1,
    src: "https://image.hm.com/assets/hm/48/e6/48e69ece4a2eb78b913df2402b9f8cdc630310e2.jpg",
    name: "1",
    slug: "/slug",
  },
  {
    id: 3,
    src: "https://image.hm.com/assets/hm/48/e6/48e69ece4a2eb78b913df2402b9f8cdc630310e2.jpg",
    name: "1",
    slug: "/slug",
  },
  {
    id: 2,
    src: "https://image.hm.com/assets/hm/48/e6/48e69ece4a2eb78b913df2402b9f8cdc630310e2.jpg",
    name: "1",
    slug: "/slug",
  },
  {
    id: 4,
    src: "https://image.hm.com/assets/hm/48/e6/48e69ece4a2eb78b913df2402b9f8cdc630310e2.jpg",
    name: "1",
    slug: "/slug",
  },
  {
    id: 5,
    src: "https://image.hm.com/assets/hm/48/e6/48e69ece4a2eb78b913df2402b9f8cdc630310e2.jpg",
    name: "1",
    slug: "/slug",
  },
];

interface Iprops {
  ref: React.RefObject<HTMLElement[]>;
}

export function LiveAuctions({ ref }: Iprops) {
  const isMobile = useMediaQuery("(max-width: 768px)", { defaultValue: true });
  const isTablet = useMediaQuery("(max-width: 1024px)", {
    defaultValue: false,
  });

  const swiper_config = {
    itemPerPage: isMobile ? 1 : isTablet ? 2 : 5,
  };

  return (
    <section
      className="flex flex-col gap-10 bg-[var(--background)] md:p-8 min-h-[725px] opacity-0"
      ref={(el) => {
        if (el) {
          ref.current[1] = el;
        }
      }}
    >
      <div className="flex items-center justify-between container mx-auto">
        <h3 className="text-xl lg:text-4xl font-bold">Live Auctions</h3>
        <Button className="explore_more text-sm lg:text-xl" variant="link">
          EXPLORE MORE
        </Button>
      </div>
      <DynamicSwiper
        images={imageArray}
        isLoading={false}
        config={swiper_config}
      />
    </section>
  );
}
