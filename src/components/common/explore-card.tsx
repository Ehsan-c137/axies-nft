import { Image } from "@/components/ui/image";
import HeartIcon from "@icons/heart-icon";
import FireIcon from "@icons/fire-icon";
import RefreshIcon from "@icons/refresh-icon";
import ShoppingBagIcon from "@icons/shopping-bag-icon";
import { Button } from "@ui/button";

export function ExploreCard() {
  return (
    <div className="flex flex-col w-full gap-3 rounded-4xl p-4 bg-[var(--card)] text-[var(--card-foreground)] max-w-[320px] hover:-translate-y-2 transition ease-in-out duration-[350ms]">
      <div className="flex justify-center select-none relative group">
        <Image
          className="rounded-4xl select-none shadow-md"
          alt=""
          src="/assets/Rectangle.png"
          width={284}
          height={274}
          draggable={false}
        />
        <Button
          className="absolute flex gap-1 bottom-5 z-1 group-hover:-translate-y-20 opacity-0 group-hover:opacity-100 transition-all duration-300"
          variant="contained"
        >
          <ShoppingBagIcon className="hover:fill-[#5142FB]" /> Place a bid
        </Button>
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
            <p className="font-bold">creator</p>
            <p>Salvador Dali</p>
          </div>
        </div>
        <div className="bg-[#5142FB] rounded-full py-[1px] px-2">BSC</div>
      </div>
      <span className="h-[2px] bg-[var(--secondary)]"></span>
      <div className="flex justify-between items-center">
        <div>
          <p className="font-bold">current bid</p>
          <p>4.89 ETH</p>
        </div>
        <div className="flex items-center gap-2 bg-[var(--background)] rounded-xl p-2 cursor-pointer">
          <RefreshIcon /> view history
        </div>
      </div>
    </div>
  );
}

export function ExploreCardPlaceholder() {
  return (
    <div className="flex flex-col justify-between gap-3 h-[485px] w-[320px] rounded-4xl p-4 bg-[var(--card)]">
      <div className="flex flex-col gap-3">
        <div className="w-full h-[284px] rounded-4xl bg-[var(--ring)] animate-pulse"></div>
        <p className="w-full h-6 bg-[var(--ring)] animate-pulse rounded-md"></p>
        <div className="h-12 w-full animate-pulse bg-[var(--ring)] rounded-md"></div>
      </div>
      <div className="h-12 w-full animate-pulse bg-[var(--ring)] rounded-md"></div>
    </div>
  );
}
