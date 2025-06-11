import { Image } from "@/components/ui/image";
import HeartIcon from "@icons/heart-icon";
import FireIcon from "@icons/fire-icon";
import ShoppingBagIcon from "@icons/shopping-bag-icon";
import { Button } from "@ui/button";
import Link from "next/link";

export function LiveAuctionsCard() {
  return (
    <div className="flex flex-col w-full gap-3 rounded-4xl p-4 bg-[var(--card)] text-[var(--card-foreground)] max-w-[320px] animate-card-hover hover:-translate-y-2 transition ease-in-out duration-[350ms]">
      <div className="flex justify-center select-none relative group">
        <Image
          className="rounded-4xl select-none shadow-md"
          alt=""
          src="/assets/Rectangle.png"
          width={284}
          height={274}
          draggable={false}
        />
        <Link
          href={"item/123"}
          className="absolute flex gap-1 bottom-5 z-1 group-hover:-translate-y-20 opacity-0 group-hover:opacity-100 transition-all duration-300"
        >
          <Button variant="contained">
            <ShoppingBagIcon className="hover:fill-[#5142FB]" /> Place a bid
          </Button>
        </Link>
        <span className="flex items-center gap-2 absolute bottom-5 z-1 bg-[var(--card)] px-3 py-2 rounded-xl">
          <FireIcon />
          <p className="font-bold text-sm">5 : 23 : 22 : 08</p>
        </span>
      </div>
      <p>Hamlet Contemplates Yorick’s...</p>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Image
            src="/assets/avatar.png"
            alt=""
            width={44}
            height={44}
            draggable={false}
          />
          <div className="flex flex-col">
            <p>creator</p>
            <p>Salvador Dali</p>
          </div>
        </div>
        <div className="bg-[var(--primary)] text-white rounded-full py-[1px] px-2">
          BSC
        </div>
      </div>
      <span className="h-[2px] bg-[var(--secondary)]"></span>
      <div className="flex justify-between items-center">
        <div>
          <p>current bid</p>
          <p>4.89 ETH</p>
        </div>
        <div className="flex items-center gap-1 bg-[var(--background)] rounded-[8px] p-2 cursor-pointer">
          <HeartIcon width={18} height={18} />
          <p className="text-xs">100</p>
        </div>
      </div>
    </div>
  );
}
