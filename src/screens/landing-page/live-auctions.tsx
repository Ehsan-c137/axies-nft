"use client";

import { Button } from "@/components/ui/button";
import Swiper from "@/components/ui/swiper/swiper";
import image from "../../../public/assets/Rectangle.png";
import { LiveAuctionsCard } from "@/components/common/live-auctions-card-";
import { useMediaQuery } from "@/hooks/useMediaQuery";

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
export function LiveAuctions() {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const isTablet = useMediaQuery("(max-width: 1024px)");

  const swiper_config = {
    itemPerPage: isMobile ? 1 : isTablet ? 2 : 5,
  };

  return (
    <section className="flex flex-col gap-10 bg-black p-8 mt-[32px]">
      <div className="flex items-center justify-between">
        <h3 className="text-4xl font-bold">Live Auctions</h3>
        <Button variant="link">EXPLORE MORE</Button>
      </div>
      <Swiper images={imageArray} isLoading={false} config={swiper_config} />
    </section>
  );
}
