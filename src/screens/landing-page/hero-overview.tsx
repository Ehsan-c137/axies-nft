import Wallet from "@icons/wallet-icon";
import Window from "@icons/window-icon";
import Bookmark from "@icons/bookmark";
import Picture from "@icons/picture-icon";
interface Iprops {
  ref: React.RefObject<HTMLElement[]>;
}

export function HeroOverview({ ref }: Iprops) {
  return (
    <div
      className="flex flex-col md:flex-row md:flex items-center gap-14 py-30 opacity-0 justify-between"
      ref={(el) => {
        if (el) {
          ref.current[0] = el;
        }
      }}
    >
      {Array.from({ length: 4 }).map((_, index) => {
        const colors = ["#5142FB", "#46A433", "#9835FB", "#DF4949"];
        const icons = [
          <Wallet key="wallet" width={20} height={20} />,
          <Window key="window" width={20} height={20} />,
          <Picture key="picture" width={20} height={20} />,
          <Bookmark key="bookmark" width={20} height={20} />,
        ];
        const title = [
          "Set Up Your Wallet",
          "Set Up Your Wallet",
          "Add Your NFTs",
          "List Them For Sale",
        ];
        return (
          <div
            className="flex flex-col gap-4 items-center rounded-2xl"
            key={index}
          >
            <div
              className="flex items-center justify-center rounded-2xl w-[50px] h-[50px]"
              style={{ backgroundColor: colors[index] }}
              key={index}
            >
              {icons[index]}
            </div>
            <p className="font-bold">{title[index]}</p>
            <p className="text-justify max-w-[300px] text-wrap">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Voluptatibus sint fuga id accusantium officiis dignissimos ea,
              veritatis ullam quod aperiam?
            </p>
          </div>
        );
      })}
    </div>
  );
}
