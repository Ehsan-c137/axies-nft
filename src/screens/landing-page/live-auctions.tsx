"use client";

import { Button } from "@/components/ui/button";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import dynamic from "next/dynamic";
import { LiveAuctionsCard } from "@/components/common/cards/live-auctions-card";
import { useGetTodayPick } from "@/services/item/today-pick";
import { useGetItems } from "@/services/item/item-service";

const DynamicSwiper = dynamic(() => import("@/components/ui/swiper/swiper"), {
  ssr: false,
});

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

  const { data, isPending } = useGetItems();

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
        datas={data?.slice(0, 15)}
        ItemCard={LiveAuctionsCard}
        isLoading={isPending}
        config={swiper_config}
      />
    </section>
  );
}
