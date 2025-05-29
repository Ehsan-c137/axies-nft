import { Image } from "@/components/ui/image";
import HeartIcon from "@icons/heart-icon";

export function LiveAuctionsCard() {
  return (
    <div className="flex flex-col w-full gap-3 rounded-4xl p-4 bg-[var(--card)] max-w-[320px]">
      <div className="flex justify-center select-none">
        <Image
          className="rounded-4xl select-none shadow-md"
          alt=""
          src="/assets/Rectangle.png"
          width={284}
          height={274}
          draggable={false}
        />
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
        <div className="bg-[#5142FB] rounded-full py-[1px] px-2">BSC</div>
      </div>
      <span className="h-[2px] bg-[var(--secondary)]"></span>
      <div className="flex justify-between items-center">
        <div>
          <p>current bid</p>
          <p>4.89 ETH</p>
        </div>
        <div className="flex items-center gap-1 bg-[var(--background)] px-2 py-[1px] rounded-sm cursor-pointer">
          <HeartIcon width={11} height={11} />
          <p className="text-xs">100</p>
        </div>
      </div>
    </div>
  );
}
