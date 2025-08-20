"use client";

import React, { useState, useRef, useEffect } from "react";
import clsx from "clsx";
import { useStateRef, getRefValue } from "@/lib/hooks";
import { getTouchEventData } from "@/lib/dom";
import { SwiperIndicators } from "./swiper-indicators";
import CardPlaceholder from "@/components/common/cards/card-placeholder";

interface IProps<TData extends object> {
  ItemCard: React.FC<TData>;
  datas: TData[];
  config: {
    itemPerPage: number;
  };
  isLoading: boolean;
}

const Swiper = <TData extends object>({
  isLoading,
  config,
  ItemCard,
  datas,
}: IProps<TData>) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const { itemPerPage } = config;
  const MIN_SWIPE_Required = 50;

  const LoadingContent = () => {
    return (
      <div className="w-full flex jusitfy-between">
        {Array.from({ length: itemPerPage }).map((_, index) => (
          <li
            key={index}
            className="flex flex-col items-center gap-2 w-full shrink-0 p-3 cursor-pointer"
            style={{
              width: `calc(100% / ${itemPerPage} )`,
              userSelect: "none",
            }}
          >
            <CardPlaceholder />
          </li>
        ))}
      </div>
    );
  };

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
    const pageWidth = getRefValue(containerWidthRef);
    let newOffsetX = getRefValue(offsetXRef);

    const diff = currentOffsetX - newOffsetX;

    if (Math.abs(diff) > MIN_SWIPE_Required) {
      if (diff > 0) {
        newOffsetX = Math.floor(newOffsetX / pageWidth) * pageWidth;
      } else {
        newOffsetX = Math.ceil(newOffsetX / pageWidth) * pageWidth;
      }
    } else {
      newOffsetX = Math.round(newOffsetX / pageWidth) * pageWidth;
    }

    setIsSwiping(false);
    setOffsetX(newOffsetX);
    setCurrentIndex(Math.abs(Math.round(newOffsetX / pageWidth)));

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
    <div className="flex flex-col justify-center items-center w-full max-w-full max-h-[600px] overflow-hidden touch-pan-y p-4 list-none">
      <ul
        ref={containerRef}
        aria-label="swiper-list"
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
        onMouseDown={onTouchStart}
        onMouseUp={onTouchEnd}
        style={{
          transform: `translateX(${offsetX}px)`,
        }}
        className={clsx(
          "transition-transform w-full flex flex-row list-none p-0 m-0",
          {
            "animate-pulse bg-inputBackground duration-[350]": isLoading,
            is_swiping: isSwiping,
          },
        )}
      >
        {isClient && isLoading ? (
          <LoadingContent />
        ) : (
          datas?.map((data, index) => {
            return (
              <li
                key={index}
                className="flex flex-col items-center gap-2 w-full shrink-0 p-3 cursor-pointer"
                style={{
                  width: `calc(100% / ${itemPerPage} )`,
                  userSelect: "none",
                }}
              >
                <ItemCard {...data} />
              </li>
            );
          })
        )}
      </ul>
      <SwiperIndicators
        count={Math.ceil(datas?.length / itemPerPage)}
        activeIndex={currentIndex}
        onSelect={indicatorOnClick}
      />
    </div>
  );
};

Swiper.Indicators = SwiperIndicators;
export default Swiper;
