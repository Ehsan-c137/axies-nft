import { useState } from "react";
import { HEADER_HEIGHT } from "@/lib/constant/sizes";
import Breadcrumb from "@/components/common/breadcrumb";
import Link from "next/link";
import { Image } from "@ui/image";
import { Button } from "@ui/button";
import { Tabs } from "./tabs";
import EyeIcon from "@icons/eye-icon";
import SendIcon from "@icons/send-icon";
import HeartIcon from "@icons/heart-icon";
import EllipsisIcon from "@icons/ellipsis-icon";
import ShoppingIcon from "@icons/shopping-bag-icon";

export default function ItemDetailView({ id }: { id: string }) {
  const itemName = "Item Detail";
  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-2 lg:justify-between py-5 lg:py-20 px-4 lg:px-8 container mx-auto gap-10">
        <div className="max-w-[690px] max-h-[690px]">
          <Image
            unoptimized
            src="/assets/images-item-details.jpg"
            alt=""
            width="0"
            height="0"
            sizes="100vw"
            className="w-full h-auto rounded-xl"
          />
        </div>
        <div className="flex flex-col gap-4 max-w-[620px]">
          <h2 className="font-bold lg:text-4xl text-2xl">
            The Fantasy Flower illustration
          </h2>
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <div className="items-center gap-2 flex px-2 py-1 rounded-full bg-amber-950">
                <EyeIcon />
                225
              </div>
              <div className="items-center gap-2 flex px-2 py-1 rounded-full bg-amber-950">
                <HeartIcon />
                225
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="contained"
                className="rounded-full w-9 h-9 bg-[var(--popover)] text-[var(--popover-foreground)]"
              >
                <SendIcon />
              </Button>
              <Button className="rounded-full w-9 h-9 bg-[var(--popover)] text-[var(--popover-foreground)]">
                <EllipsisIcon />
              </Button>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex gap-4 bg-[var(--card)] text-[var(--card-foreground)] rounded-2xl p-3">
              <Image
                src="/avatar_1.png"
                width={48}
                height={48}
                unoptimized
                alt="profile"
                className="rounded-xl"
              />
              <div>
                <p className="text-sm font-light">Owned By</p>
                <Link className="font-bold" href={`profile/${123}`}>
                  <h6>Ralph Garraway</h6>
                </Link>
              </div>
            </div>
            <div className="flex gap-4 bg-[var(--card)] text-[var(--card-foreground)] rounded-2xl p-3">
              <Image
                src="/avatar_1.png"
                width={48}
                height={48}
                unoptimized
                alt="profile"
                className="rounded-xl"
              />
              <div>
                <p className="text-sm font-light">Created By</p>
                <Link className="font-bold" href={`profile/${123}`}>
                  <h6>Ralph Garraway</h6>
                </Link>
              </div>
            </div>
          </div>
          <p className="text-sm">
            Habitant sollicitudin faucibus cursus lectus pulvinar dolor non
            ultrices eget. Facilisi lobortisal morbi fringilla urna amet sed
            ipsum vitae ipsum malesuada. Habitant sollicitudin faucibus cursus
            lectus pulvinar dolor non ultrices eget. Facilisi lobortisal morbi
            fringilla urna amet sed ipsum
          </p>
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center justify-center lg:justify-between flex-1 flex-wrap bg-[var(--card)] text-[var(--card-foreground)] rounded-2xl px-6 py-3 h-[68px] ">
              <p className="font-semibold text-sm">Current Bid</p>
              <p className="text-sm">4.89 ETH = $12.246</p>
            </div>
            <div className="flex flex-wrap items-center justify-center lg:justify-between flex-1 bg-[var(--card)] text-[var(--card-foreground)] rounded-2xl px-6 py-3 h-[68px]">
              <p className="font-semibold text-sm">Countdown</p>
              <p>4:19:31:58</p>
            </div>
          </div>
          <Button className="h-[50px] font-semibold" variant="outline">
            Place a bid
          </Button>
          <Tabs />
        </div>
      </div>
    </>
  );
}
