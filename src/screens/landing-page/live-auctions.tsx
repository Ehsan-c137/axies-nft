"use client";

import { Button } from "@/components/ui/button";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { LiveAuctionsCard } from "@/components/common/cards/live-auctions-card";
import { useGetItems } from "@/services/item/item-service";
import Swiper from "@ui/swiper/swiper";

interface Iprops {
  ref: React.RefObject<HTMLElement[]>;
}

export function LiveAuctions({ ref }: Iprops) {
  const LIVE_AUCTIONS_COUNT = 13;
  const isMobile = useMediaQuery("(max-width: 768px)", { defaultValue: false });
  const isTablet = useMediaQuery("(max-width: 1140px)", {
    defaultValue: false,
  });

  const swiper_config = {
    itemPerPage: isMobile ? 1 : isTablet ? 3 : 5,
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
      <Swiper
        datas={data?.slice(0, LIVE_AUCTIONS_COUNT)}
        ItemCard={LiveAuctionsCard}
        isLoading={isPending}
        config={swiper_config}
      />
    </section>
  );
}
