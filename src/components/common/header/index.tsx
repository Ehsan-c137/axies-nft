"use client";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { HEADER_HEIGHT } from "@/lib/constant/sizes";
import clsx from "clsx";
import { ThemedImage } from "@ui/image";
import { CommandSearchBox } from "./command-searchbox";
import { NavList } from "./nav-list";
import { Profile } from "./header-profile";
import BlurShape from "@illustrations/blur-shape";

const ThemeSwitch = dynamic(() => import("../theme-switcher"), {
  ssr: false,
  loading: () => (
    <div
      className="w-10 h-10 bg-[rgba(0,0,0,0.3)] border rounded-full animate-pulse"
      aria-label="loading"
    ></div>
  ),
});

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 200) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    });

    return () => {
      window.removeEventListener("scroll", () => {});
    };
  }, []);

  return (
    <>
      <header
        style={{ height: `${HEADER_HEIGHT}px` }}
        className={clsx(
          "absolute top-4 left-0 translate-y-0 w-full transition z-2",
          {
            "fixed w-full animate-fade-in-translate px-1": isScrolled,
            "translate-y-0": !isScrolled,
          },
        )}
      >
        <div
          className={clsx(
            "container flex items-center justify-between mx-auto px-4 md:px-8 py-2 ",
            {
              "border rounded-3xl dark:bg-[rgba(0,0,0,0.4)] bg-[rgba(255,255,255,0.4)] shadow-2xl":
                isScrolled,
            },
          )}
        >
          <Link href="/" className="h-[40px] relative">
            <ThemedImage
              srcLight="/assets/logo/logo_light.webp"
              srcDark="/assets/logo/logo_dark.webp"
              alt="axies nft logo"
              width={0}
              height={0}
              className="w-full h-full top-0 left-0 object-cover"
              unoptimized
            />
          </Link>

          <NavList />
          <div className="flex items-center gap-2">
            <CommandSearchBox />
            <ThemeSwitch key="theme-switcher-button" />
            <Profile />
            {!isScrolled && (
              <BlurShape
                tabIndex={-1}
                className="absolute right-0 -top-20 -z-1 select-none pointer-events-none"
                width={180}
                height={180}
              />
            )}
          </div>
        </div>
      </header>
    </>
  );
}
