import clsx from "clsx";

interface IIndicatorsProps {
  count: number;
  activeIndex: number;
  onSelect: (index: number) => void;
}
export const SwiperIndicators = ({
  count,
  activeIndex,
  onSelect,
}: IIndicatorsProps) => {
  if (count <= 1) {
    return null;
  }
  return (
    <ul className="flex items-center gap-2 md:gap-4 pb-2 pt-4">
      {Array.from({ length: count })?.map((_, index) => (
        <li
          data-testid="indicator"
          key={index}
          className={clsx(
            "bg-[#e0e0e0] w-2 h-2 transition-[background-color] cursor-pointer rounded",
            {
              "bg-[#dd8560]!": index === activeIndex,
            },
          )}
          onClick={() => onSelect(index)}
        ></li>
      ))}
    </ul>
  );
};
