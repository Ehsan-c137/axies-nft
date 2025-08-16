import Image from "next/image";
import RefreshIcon from "@icons/refresh-icon";
import ShoppingBagIcon from "@icons/shopping-bag-icon";
import { Button } from "@ui/button";
import Link from "next/link";
import { TItem } from "@/services/item/item-service";

export function ExploreCard({
  name,
  image,
  price,
  createdBy,
  platform,
  slug,
}: TItem) {
  return (
    <div
      className="flex flex-col w-full gap-3 rounded-4xl p-4 bg-[var(--card)] text-[var(--card-foreground)] min-w-[284px] max-w-[320px] hover:-translate-y-2 transition ease-in-out duration-[350ms] not-dark:shadow-sm"
      data-testid="explore-card"
    >
      <div className="flex justify-center select-none relative group">
        <div className="w-[284px] h-[274px] rounded-4xl overflow-hidden select-none not-dark:shadow-sm relative">
          <Image
            className="select-none absolute w-full h-full object-cover"
            alt={`${name} image`}
            src={image!}
            width={284}
            height={274}
            unoptimized
            draggable={false}
          />
        </div>
        <Button
          className="absolute flex gap-1 bottom-5 z-1 group-hover:-translate-y-20 opacity-0 group-hover:opacity-100 transition-all duration-300"
          variant="contained"
        >
          <ShoppingBagIcon className="hover:fill-[#5142FB]" /> Place a bid
        </Button>
      </div>
      <p>{name}</p>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Image
            src={createdBy?.image ?? "/avatar_1.png"}
            alt={createdBy?.name}
            width={44}
            height={44}
            unoptimized
            draggable={false}
            className="rounded-full"
          />
          <div className="flex flex-col">
            <p className="font-bold">creator</p>
            <Link href={`/profile/${createdBy?.username}`}>
              {createdBy?.name}
            </Link>
          </div>
        </div>
        <div className="bg-[var(--primary)] rounded-full py-[1px] px-2">
          {platform}
        </div>
      </div>
      <span className="h-[2px] bg-[var(--secondary)]"></span>
      <div className="flex justify-between items-center">
        <div>
          <p className="font-bold">current bid</p>
          <p>{price}</p>
        </div>
        <Link
          href={`item/${slug}`}
          data-testid="explore-card-view-history-link"
          className="flex items-center gap-2 bg-[var(--background)] rounded-xl p-2 cursor-pointer"
        >
          <RefreshIcon /> view history
        </Link>
      </div>
    </div>
  );
}
