"use client";

import { useRef } from "react";
import { Button } from "@ui/button";
import Image from "next/image";
import Link from "next/link";
import { HEADER_HEIGHT } from "@/lib/constant/sizes";
import RocketIcon from "@icons/rocket-icon";
import Package from "@icons/package-icon";
import Elispse from "@illustrations/ellipse";
import ElispseOutline from "@illustrations/ellipse-outline";
import Star from "@/components/illustrations/star";
import { HeroCharacter } from "@/components/illustrations/hero-character";
import { ShootingStars } from "./shooting-stars";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import {
  useAnimationPerformanceControl,
  DEFAULT_OPTIONS,
} from "@/hooks/useAnimationPerformanceControl";
import clsx from "clsx";
import { useMediaQuery } from "@/hooks/useMediaQuery";

gsap.registerPlugin(useGSAP);

export function Hero() {
  const isDesktop = useMediaQuery("(min-width: 768px)", {
    initializeWithValue: false,
  });

  return (
    <div
      style={{
        height: isDesktop
          ? `calc(100vh - ${HEADER_HEIGHT}px)`
          : `calc(100vh - ${200}px)`,
      }}
      className={clsx(
        `flex flex-col xl:flex-row items-center justify-between gap-30 lg:gap-8 lg:pt-20`,
      )}
    >
      <div className="flex flex-col gap-8">
        <h1 className="max-w-[510px] font-bold text-3xl lg:text-5xl leading-10 lg:leading-16">
          Discover and collect extraordinary Monster NFTs
        </h1>
        <p>
          Marketplace for Moster Character Collectons Non Fungible Token NFTs
        </p>
        <div className="flex items-center gap-4 w-full justify-center lg:justify-start">
          <Link href="/explore">
            <Button variant="outline" aria-label="explore">
              <RocketIcon /> Explore
            </Button>
          </Link>
          <Link href="/item-creation">
            <Button variant="outline" aria-label="create">
              <Package /> Create
            </Button>
          </Link>
        </div>
      </div>
      <Character />
      <ShootingStars
        starColor="#9E00FF"
        trailColor="#2EB9DF"
        minSpeed={15}
        maxSpeed={35}
        minDelay={1000}
        maxDelay={3000}
      />
      <ShootingStars
        starColor="#FF0099"
        trailColor="#FFB800"
        minSpeed={10}
        maxSpeed={25}
        minDelay={2000}
        maxDelay={4000}
      />
    </div>
  );
}

function Character() {
  const animationEnabled = useAnimationPerformanceControl(DEFAULT_OPTIONS);
  const containerRef = useRef(null);
  const xRange = { min: 10, max: 20 };
  const yRange = { min: 20, max: 30 };
  const angleRange = { min: 8, max: 12 };
  const timeMoveRange = { min: 3, max: 5 };
  const timeRotateRange = { min: 5, max: 10 };

  useGSAP(
    () => {
      if (!animationEnabled) {
        return;
      }

      const targets = gsap.utils.toArray(
        ".ellipse-animated",
        containerRef.current,
      ) as HTMLElement[];

      if (targets.length === 0) {
        console.warn(
          "AnimatedElements: No target elements found with selector '.ellipse-animated .star-animated'.",
        );
        return;
      }

      function animateRotation(currentTarget: HTMLElement, direction: number) {
        if (!currentTarget) return;
        gsap.to(currentTarget, {
          rotation:
            gsap.utils.random(angleRange.min, angleRange.max) * direction,
          duration: gsap.utils.random(timeRotateRange.min, timeRotateRange.max),
          ease: "sine.inOut",
          onComplete: animateRotation,
          onCompleteParams: [currentTarget, direction * -1],
        });
      }

      function animateXY(
        currentTarget: HTMLElement,
        directionX: number,
        directionY: number,
      ) {
        if (!currentTarget) return;
        gsap.to(currentTarget, {
          x: gsap.utils.random(xRange.min, xRange.max) * directionX,
          y: gsap.utils.random(yRange.min, yRange.max) * directionY,
          duration: Math.round(
            gsap.utils.random(timeMoveRange.min, timeMoveRange.max),
          ),
          ease: "sine.inOut",
          onComplete: animateXY,
          onCompleteParams: [currentTarget, directionX * -1, directionY * -1],
        });
      }

      targets.forEach((individualElement) => {
        gsap.set(individualElement, {
          x: gsap.utils.random(xRange.min, xRange.max) * -1,
          y: gsap.utils.random(xRange.min, xRange.max) * 1, // Original used xRange for initial Y
          rotation: gsap.utils.random(angleRange.min, angleRange.max) * -1,
          force3D: true,
        });
        animateXY(individualElement, 1, -1);
        animateRotation(individualElement, 1);
      });
    },

    {
      scope: containerRef,
      revertOnUpdate: true,
    },
  );

  return (
    <div
      className="relative flex items-center justify-center z-1 pointer-events-none"
      ref={containerRef}
    >
      <EllipseContainer />
      <ElispseOutline className="absolute right-0 ellipse-animated" />
      <PlusContainer />
      <Image
        className="drop-shadow-[0px_0px_80px_var(--theme-primary)]"
        width={600}
        src={"/assets/hero/blob-shape.png"}
        alt=""
        height={0}
        sizes="100vw"
      />
      <HeroCharacter className="absolute ellipse-animated will-change-transform backface-hidden lg:w-[296px] lg:h-[480px] w-[196px] h-[384px]" />
      <Image
        className="absolute left-0 top-[20%] -z-1 opacity-10 w-40"
        src="/assets/hero/saturn.png"
        alt=""
        width={100}
        height={0}
        sizes="100vw"
      />
      <StarsContainer />
    </div>
  );
}

const StarsContainer = () => {
  const positions = [
    { left: "0px", top: "20%" },
    { right: "20%", top: "30%" },
    { right: "15%", top: "10%" },
    { left: "0%", top: "30%" },
  ];
  return Array.from({ length: 4 }).map((_, i) => (
    <Star
      key={i}
      style={positions[i]}
      className="absolute -z-1 opacity-20 w-2"
    />
  ));
};

const PlusContainer = () => {
  const positions = [
    { left: "30px", top: "50%" },
    { right: "20%", top: "50%" },
    { right: "15%", top: "80%" },
    { top: "30%", right: "50%" },
  ];
  return Array.from({ length: 4 }).map((_, index) => {
    return (
      <Image
        src={`/assets/hero/plus${index + 1}.png`}
        alt=""
        width={40}
        height={0}
        sizes="100vw"
        key={index}
        className="absolute z-1 ellipse-animated will-change-transform backface-hidden"
        style={{ ...positions[index] }}
      />
    );
  });
};

const EllipseContainer = () => {
  const positions = [
    { left: "30%", top: "10%" },
    { right: "30%", top: "30%" },
    { left: "30%", bottom: "10%" },
    { right: "30%", bottom: "50%" },
  ];
  return Array.from({ length: 4 }).map((_, index) => {
    return (
      <Elispse
        key={index}
        style={{ ...positions[index], width: 15 + index * index + 1 }}
        className="z-1 absolute ellipse-animated rounded-full will-change-transform backface-hidden"
      />
    );
  });
};
