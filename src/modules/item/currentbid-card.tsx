import { toDollar } from "@/lib/utils";

interface IProps {
  currentbid: number;
}

export default function CurrentBidCard({ currentbid }: IProps) {
  return (
    <div className="flex items-center justify-center lg:justify-between flex-1 flex-wrap bg-[var(--card)] text-[var(--card-foreground)] rounded-2xl px-6 py-2 h-[60px] md:h-[50px] not-dark:shadow-sm">
      <p className="font-semibold text-sm text-[#7A798A]">Current Bid</p>
      <p className="text-sm">
        <span className="font-bold text-sm md:text-lg leading-1 md:leading-4">
          {currentbid}
        </span>
        <span className="font-light">= {toDollar(Number(currentbid))}</span>
      </p>
    </div>
  );
}
