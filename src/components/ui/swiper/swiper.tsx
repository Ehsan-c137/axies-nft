"use client";

import React, { useState, useRef } from "react";
import styles from "./Swiper.module.css";
import clsx from "clsx";
import { useStateRef, getRefValue } from "@/lib/hooks";
import { getTouchEventData } from "@/lib/dom";
import { LiveAuctionsCard } from "@/components/common/cards/live-auctions-card";

interface IIndicatorsProps {
  count: number;
  activeIndex: number;
  onSelect: (index: number) => void;
}
const SwiperIndicators = ({
  count,
  activeIndex,
  onSelect,
}: IIndicatorsProps) => {
  return (
    <ul className="flex items-center gap-4 pb-2 pt-4">
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

const MIN_SWIPE_Required = 50;

interface IProps {
  images: {
    src: string;
    name: string;
    slug: string;
    id: number;
  }[];
  config: {
    itemPerPage: number;
  };
  isLoading: boolean;
}

const Swiper = ({ images, isLoading, config }: IProps) => {
  const { itemPerPage } = config;
  const containerRef = useRef<HTMLUListElement>(null);
  const containerWidthRef = useRef(0);
  const minOffsetXRef = useRef(0);
  const currentOffsetXRef = useRef(0);
  const startXRef = useRef(0);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [offsetX, setOffsetX, offsetXRef] = useStateRef(0);
  const [isSwiping, setIsSwiping] = useState(false);

  const onTouchMove = (e: TouchEvent | MouseEvent) => {
    const currentX = getTouchEventData(e).clientX;
    const diff = getRefValue(startXRef) - currentX;
    let newOffsetX = getRefValue(currentOffsetXRef) - diff;

    const maxOffsetX = 0;
    const minOffsetX = getRefValue(minOffsetXRef);

    if (newOffsetX > maxOffsetX) {
      newOffsetX = maxOffsetX;
    }

    if (newOffsetX < minOffsetX) {
      newOffsetX = minOffsetX;
    }

    setOffsetX(newOffsetX);
  };

  const onTouchStart = (
    e: React.TouchEvent<HTMLElement> | React.MouseEvent<HTMLElement>,
  ) => {
    setIsSwiping(true);

    currentOffsetXRef.current = getRefValue(offsetXRef);
    startXRef.current = getTouchEventData(e.nativeEvent).clientX;

    const containerEl = getRefValue(containerRef);
    const containerWidth = containerEl!.offsetWidth;

    containerWidthRef.current = containerWidth;
    minOffsetXRef.current = containerWidth - containerEl!.scrollWidth;

    window.addEventListener("touchmove", onTouchMove);
    window.addEventListener("touchend", onTouchEnd);
    window.addEventListener("mouseup", onTouchEnd);
    window.addEventListener("mousemove", onTouchMove);
  };

  const onTouchEnd = () => {
    const currentOffsetX = getRefValue(currentOffsetXRef);
    const containerWidth = getRefValue(containerWidthRef) / itemPerPage;
    let newOffsetX = getRefValue(offsetXRef);

    const diff = currentOffsetX - newOffsetX;

    if (Math.abs(diff) > MIN_SWIPE_Required) {
      if (diff > 0) {
        newOffsetX = Math.floor(newOffsetX / containerWidth) * containerWidth;
      } else {
        newOffsetX = Math.ceil(newOffsetX / containerWidth) * containerWidth;
      }
    } else {
      newOffsetX = Math.round(newOffsetX / containerWidth) * containerWidth;
    }

    setIsSwiping(false);
    setOffsetX(newOffsetX);
    setCurrentIndex(Math.abs(newOffsetX / containerWidth));

    window.removeEventListener("touchmove", onTouchMove);
    window.removeEventListener("touchend", onTouchEnd);
    window.removeEventListener("mouseup", onTouchEnd);
    window.removeEventListener("mousemove", onTouchMove);
  };

  const indicatorOnClick = (index: number) => {
    const containerEl = getRefValue(containerRef);
    const containerWidth = containerEl!.offsetWidth;

    setCurrentIndex(index);
    setOffsetX(-(index * containerWidth));
  };

  return (
    <div className={styles.swiper_container}>
      <ul
        ref={containerRef}
        aria-label="swiper-container"
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
        onMouseDown={onTouchStart}
        onMouseUp={onTouchEnd}
        style={{
          transform: `translateX(${offsetX}px)`,
        }}
        className={clsx(styles.swiper_list, {
          "animate-pulse bg-inputBackground duration-[350]": isLoading,
          is_swiping: isSwiping,
        })}
      >
        {images?.map((image, index) => {
          return (
            <li
              key={index}
              className={styles.swiper_item}
              style={{
                width: `calc(100% / ${itemPerPage} )`,
                userSelect: "none",
              }}
            >
              <LiveAuctionsCard key={image.id} />
            </li>
          );
        })}
      </ul>
      <SwiperIndicators
        count={Math.ceil(images.length / itemPerPage)}
        activeIndex={currentIndex}
        onSelect={indicatorOnClick}
      />
    </div>
  );
};

Swiper.Indicators = SwiperIndicators;
export default Swiper;
