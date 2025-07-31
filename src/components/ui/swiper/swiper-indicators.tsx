import styles from "./swiper.module.css";
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
          className={clsx(styles.swiper_indicator, {
            [styles.swiper_indicator_active]: index === activeIndex,
          })}
          onClick={() => onSelect(index)}
        ></li>
      ))}
    </ul>
  );
};
