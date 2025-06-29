"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@ui/button";
import { Tabs } from "./tabs";
import EyeIcon from "@icons/eye-icon";
import SendIcon from "@icons/send-icon";
import HeartIcon from "@icons/heart-icon";
import EllipsisIcon from "@icons/ellipsis-icon";
import ShareIcon from "@icons/share-icon";
import { toast } from "sonner";
import { useCopyToClipboard } from "@/hooks/useCopyToClipboard";

export default function ItemDetailView({ id }: { id: string }) {
  const itemName = "Item Detail";
  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-2 lg:justify-between container mx-auto gap-5">
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
        <div className="flex flex-col gap-6 max-w-[620px]">
          <h2 className="font-bold lg:text-4xl text-2xl">
            The Fantasy Flower illustration
          </h2>
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <div className="items-center gap-2 flex px-2 py-1 rounded-full bg-[var(--accent)] color-[var(accent-foreground)]">
                <EyeIcon />
                225
              </div>
              <div className="items-center gap-2 flex px-2 py-1 rounded-full bg-[var(--accent)]">
                <HeartIcon />
                225
              </div>
            </div>
            <div className="flex items-center gap-2">
              <ShareButton />
              <Button
                variant="contained"
                className="rounded-full shadow-2xl w-9 h-9 bg-[var(--card)] text-[var(--card-foreground)]"
              >
                <EllipsisIcon />
              </Button>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex gap-4 bg-[var(--card)] text-[var(--card-foreground)] rounded-2xl p-3 not-dark:shadow-sm">
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
            <div className="flex gap-4 bg-[var(--card)] text-[var(--card-foreground)] rounded-2xl p-3 not-dark:shadow-sm">
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
            <div className="flex items-center justify-center lg:justify-between flex-1 flex-wrap bg-[var(--card)] text-[var(--card-foreground)] rounded-2xl px-6 py-2 h-[60px] md:h-[50px] not-dark:shadow-sm">
              <p className="font-semibold text-sm text-[#7A798A]">
                Current Bid
              </p>
              <p className="text-sm">
                <span className="font-bold text-sm md:text-lg leading-1 md:leading-4">
                  4.89 ETH
                </span>{" "}
                <span className="font-light"> = $12.246</span>
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 justify-items-center items-center justify-center lg:justify-between flex-1 bg-[var(--card)] text-[var(--card-foreground)] rounded-2xl px-6 py-2 h-[60px] md:h-[50px] not-dark:shadow-sm">
              <p className="font-semibold text-sm leading-1">Countdown</p>
              <p className="font-bold leading-1">4:19:31:58</p>
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

const ShareButton = () => {
  const { copy } = useCopyToClipboard();

  const handleShare = () => {
    copy(window.location.href).then(() => toast("address copied"));
  };

  return (
    <Button
      onClick={handleShare}
      variant="contained"
      className="rounded-full w-10 h-10 bg-[var(--card)] text-[var(--card-foreground)]"
    >
      <ShareIcon />
    </Button>
  );
};
