import Image from "next/image";

type Props = {
  title?: string;
  creator?: string;
  price?: number;
  timeLeft?: string;
  imageUrl?: string;
};

export function PreviewCard({ title, creator, price, imageUrl }: Props) {
  return (
    <div className="flex flex-col w-full gap-3 rounded-4xl p-4 bg-[var(--card)] text-[var(--card-foreground)] max-w-[320px] not-dark:shadow-sm">
      <div className="flex justify-center select-none relative group">
        <div className="w-[284px] h-[274px] rounded-4xl overflow-hidden select-none not-dark:shadow-sm relative">
          <Image
            className="select-none absolute w-full h-full object-cover"
            alt=""
            src={imageUrl || "/assets/Rectangle.png"}
            width={284}
            height={274}
            unoptimized
            draggable={false}
            objectFit="cover"
          />
        </div>
      </div>
      <p>{title ? title : "Your Title..."}</p>
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
            <p>{creator ? creator : "your name"}</p>
          </div>
        </div>
        <div className="bg-[#5142FB] rounded-full py-[1px] px-2">BSC</div>
      </div>
      <span className="h-[2px] bg-[var(--secondary)]"></span>
      <div className="flex justify-between items-center">
        <div>
          <p className="font-bold">current bid</p>
          <p>{price ? price : "0.04.89 ETH"}</p>
        </div>
      </div>
    </div>
  );
}
